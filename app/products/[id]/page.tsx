'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { checkTokenValidity } from "@/app/components/utils/checkTokenValidity";

type TypeDetail = {
  type: string;
  price: string;
  _id?: string;
};

type ProductType = {
  _id: string;
  name: string;
  description: string[];
  price: number | string;
  image: string;
  types: TypeDetail[];
};

export default function Product({ params }: { params: Promise<{ id: string }> }) {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [loadingProduct, setLoadingProduct] = useState<string | null>(null);
  const [tokenValidity, setTokenValidity] = useState(false);
  const [selectedType, setSelectedType] = useState<TypeDetail | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    params.then((resolvedParams) => {
      setId(resolvedParams.id);
    });
  }, [params]);

  useEffect(() => {
    if (id) {
      fetch(`https://trulaila-api-production.up.railway.app/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          // Don't automatically set a selected type here
          // Let the user choose
        })
        .catch((err) => console.error("Error fetching product:", err));
    }
  }, [id]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    checkTokenValidity(String(token)).then((isValid) => {
      setTokenValidity(isValid);
    });
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  const addToCart = async () => {
    if (!tokenValidity) return router.push("/login");

    const token = localStorage.getItem("token");

    // Check if a type is selected for a product that has types
    if (product.types.length > 0 && !selectedType?._id) {
      alert("გთხოვთ აირჩიეთ პროდუქტის ტიპი");
      return;
    }

    setLoadingProduct(id);

    const MIN_LOADING_TIME = 1000;
    const startTime = Date.now();

    const requestData = {
      productId: id,
    };

    // Only include typeId if a type is selected
    if (selectedType?._id) {
      Object.assign(requestData, { typeId: selectedType._id });
    }

    axios
      .post(
        "https://trulaila-api-production.up.railway.app/cart/add-to-cart",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("Product added to cart:", res.data);
      })
      .catch((err) => {
        console.error("Error adding product to cart:", err);
      })
      .finally(() => {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);
        setTimeout(() => setLoadingProduct(null), remainingTime);
      });
  };

  const handleTypeSelection = (type: TypeDetail) => {
    setSelectedType(type);
    setDropdownOpen(false); // Close dropdown after selection
  };

  // Display prices correctly based on product and selected type
  const displayPrice = () => {
    if (selectedType && selectedType._id) {
      return selectedType.price === "ფასი შეთანხმებით"
        ? "ფასი შეთანხმებით"
        : `${selectedType.price}₾`;
    } else {
      return typeof product.price === 'string'
        ? product.price
        : `${product.price}₾`;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto text-md  py-12 flex flex-col px-5 md:px-0">
      <h1 className="md:block hidden text-left ml-4">{product.name}</h1>

      <div className="flex flex-col md:flex-row mt-12 gap-8">
        <div className="w-full md:flex-[2] max-w-xs mx-auto md:mx-0">
          <img
            className="w-full  object-contain"
            src={product.image}
            alt={product.name}
          />
        </div>

        <h1 className="md:hidden block text-left">{product.name}</h1>

        <div className="w-full flex-[3] xl:flex-[5] flex flex-col md:items-center">
          <ul className="space-y-2">
            {product.description.map((description, index) => (
              <li key={index}>
                <p className="">{description}</p>
              </li>
            ))}
          </ul>

          {product.types.length > 0 && (
            <div className="relative mt-4 w-[200px]">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="border w-full px-4 py-2 rounded-lg bg-gray-100 shadow-md hover:bg-gray-200 flex justify-between items-center"
              >
                <span>{selectedType?.type || "აირჩიე ტიპი"}</span>
                <svg
                  className={`w-5 h-5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute left-0 w-[250px] right-0 mt-2 bg-white shadow-lg border rounded-lg z-10 max-h-60 overflow-y-auto">
                  {product.types.map((type, index) => (
                    <div
                      key={index}
                      onClick={() => handleTypeSelection(type)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <div className="text-[16px]">
                        {`${type.type} | ფასი: ${type.price}`}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="w-full md:flex-[3] flex flex-col justify-between px-4 py-6 rounded-xl shadow-lg border border-gray-200 h-[270px]">
          <h1 className="font-bold text-2xl">
            {displayPrice()}
          </h1>
          <p className="font-normal text-sm text-gray-500 mt-2">
            უფასო მიწოდება
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={addToCart}
              disabled={loadingProduct === product._id}
              className={`${loadingProduct === product._id ? "bg-red-300" : "bg-secondary"
                } px-3 py-4 rounded-md text-sm text-white w-full`}
            >
              {loadingProduct === product._id
                ? "იტვირთება..."
                : "კალათაში დამატება"}
            </button>
            <button className="bg-black px-3 py-4 rounded-md text-sm text-white w-full">
              ყიდვა
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}