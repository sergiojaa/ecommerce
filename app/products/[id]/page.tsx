'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { checkTokenValidity } from "@/app/components/utils/checkTokenValidity";

type TypeDetail = {
  type: string;
  price: string;
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
  const [selectedType, setSelectedType] = useState<TypeDetail | null>(null); // Track selected type

  const router = useRouter();

  useEffect(() => {
    params.then((resolvedParams) => {
      setId(resolvedParams.id);
    });
  }, [params]);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          // Set default type only if no type has been selected yet
          if (!selectedType) {
            setSelectedType({ type: "Default", price: String(data.price) });
          }
        })
        .catch((err) => console.error("Error fetching product:", err));
    }
  }, [id, selectedType]);

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

    if (!selectedType) {
      console.error("No type selected");
      return;
    }

    setLoadingProduct(id);

    const MIN_LOADING_TIME = 1000;
    const startTime = Date.now();

    // Send the selected product type and price to the backend
    axios
      .post(
        "http://localhost:3001/cart/add-to-cart",
        {
          productId: id,
          type: selectedType.type,  // Send the selected type
          price: selectedType.price,  // Send the selected price
        },
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
    setSelectedType(type); // Update selected type when a button is clicked
  };

  return (
    <div className="w-full max-w-5xl mx-auto text-2xl font-bold py-12 flex flex-col px-5 md:px-0">
      <h1 className="md:block hidden text-left ml-4">{product.name}</h1>

      <div className="flex flex-col md:flex-row mt-12 gap-8">
        <div className="w-full md:flex-[2] max-w-xs mx-auto md:mx-0">
          <img
            className="w-full h-auto object-contain"
            src={product.image}
            alt={product.name}
          />
        </div>

        <h1 className="md:hidden block text-left">{product.name}</h1>

        <div className="w-full flex-[3] xl:flex-[5] flex flex-col md:items-center">
          <ul className="md:list-none  font-normal space-y-2">
            {product.description.map((description) => (
              <li key={description}>
                <p className="text-lg">{description}</p>
              </li>
            ))}
            {product.types.map((type, index) => (
              <button
                className={`border px-4 py-2 rounded-md ${selectedType?.type === type.type ? "bg-secondary text-white" : "bg-gray-100"
                  }`}
                key={index}
                onClick={() => handleTypeSelection(type)} // Pass type details
              >
                <p className="text-sm">{`${type.type} ფასი ${type.price}`}</p>
              </button>
            ))}
          </ul>
        </div>

        <div className="w-full md:flex-[3] flex flex-col justify-between px-4 py-6 rounded-xl shadow-lg border border-gray-200 h-[270px]">
          <h1 className="font-bold text-2xl">
            {selectedType?.price === "ფასი შეთანხმებით"
              ? "ფასი შეთანხმებით"
              : `${selectedType?.price}₾`}
          </h1>
          <p className="font-normal text-sm text-gray-500 mt-2">
            უფასო მიწოდება მაზეგ
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
