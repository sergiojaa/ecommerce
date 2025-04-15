"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { checkTokenValidity } from "../components/utils/checkTokenValidity";

interface Product {
  _id: string;
  image: string;
  name: string;
  description: string;
  price: number | string;
  category: "vodka" | "whiskey" | "beer";
}

interface CartItem {
  product: Product;
  quantity: number;
  totalPrice: number;
  typeId?: string;
  typeName?: string;
}

interface CartResponse {
  cartItems: CartItem[];
  totalPrice: number;
}

export default function Page() {
  const router = useRouter();
  const [products, setProducts] = useState<CartItem[]>([]);
  const [price, setPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    checkTokenValidity(String(token)).then((isValid) => {
      if (!isValid) {
        router.push('/login')
      }
    });

  }, [])

  const getProducts = () => {
    const token = localStorage.getItem('token');

    axios
      .get<CartResponse>("https://trulaila-api-production.up.railway.app/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.cartItems)
        setProducts(res.data.cartItems);
        setPrice(res.data.totalPrice);
        const totalQuantity = res.data.cartItems.reduce(
          (acc, item) => acc + item.quantity,
          0
        );
        setTotalItems(totalQuantity);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching cart:", error);
        setLoading(false);
      });
  };

  const handleQuantityChange = (productId: string, typeId: string | undefined, operation: "increment" | "decrement") => {
    setLoadingProductId(productId);
    const MIN_LOADING_TIME = 1000;
    const startTime = Date.now();

    const token = localStorage.getItem("token")

    if (!token) return

    axios
      .post(
        "https://trulaila-api-production.up.railway.app/cart/change-quantity",
        { productId, typeId, operation },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);
        setTimeout(() => setLoadingProductId(null), remainingTime);

        getProducts()
      });
  };

  const removeItem = (productId: string, typeId: string | undefined) => {
    setLoadingProductId(productId);
    const MIN_LOADING_TIME = 1000;
    const startTime = Date.now();

    axios
      .post(
        "https://trulaila-api-production.up.railway.app/cart/remove-from-cart",
        { productId, typeId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        getProducts();
      })
      .catch((err) => console.error("Error removing item:", err))
      .finally(() => {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);
        setTimeout(() => setLoadingProductId(null), remainingTime);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Helper function to generate a unique identifier for each cart item
  const getCartItemKey = (product: CartItem) => {
    return `${product.product._id}-${product.typeId || "default"}`;
  };

  return (
    <div className="md:px-[50px] pb-[100px]">

      <h1 className="mx-[20px] text-3xl font-bold my-[50px]">შენს კალათაში {totalItems} ნივთია</h1>

      <div className="flex w-full h-screen-minus-header gap-[50px] flex-col lg:flex-row">

        {/* Left side */}

        <div className="flex-[2]">
          <div className="flex flex-col w-full h-full overflow-scroll gap-[25px]">
            {products.map((product) => (
              <div key={getCartItemKey(product)} className="px-4 pt-[10px] pb-[10px] rounded-xl md:shadow-md border md:border-gray-200 flex justify-between items-center">

                <img className="w-[100px] h-[100px]" src={product.product.image} alt={product.product.name} />

                <div className="flex flex-col items-start xl:flex-row w-full p-3">
                  <div className="flex flex-col">
                    <h1 className="">{product.product.name}</h1>
                    {product.typeName && (
                      <span className="text-sm text-gray-600">ტიპი: {product.typeName}</span>
                    )}
                  </div>

                  <div className="flex items-center justify-start gap-5 w-full md:ml-6">

                    <div className="flex justify-center gap-5 border-solid border-[1px] px-[13px] py-[5px] rounded-2xl">
                      <button
                        onClick={() => handleQuantityChange(product.product._id, product.typeId, "decrement")}
                        className="cursor-pointer">
                        -
                      </button>
                      <p>{product.quantity}</p>
                      <button
                        onClick={() => handleQuantityChange(product.product._id, product.typeId, "increment")}
                        className="cursor-pointer">
                        +
                      </button>
                    </div>

                    <h1 className="text-[17px] font-bold">
                      {typeof product.totalPrice === 'number'
                        ? `$${product.totalPrice}`
                        : product.totalPrice}
                    </h1>
                  </div>
                </div>

                <button className="scale-125" onClick={() => removeItem(product.product._id, product.typeId)} disabled={loadingProductId === product.product._id}>
                  <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 3.75H2.33333H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M4.33398 3.74992V2.41659C4.33398 2.06296 4.47446 1.72382 4.72451 1.47378C4.97456 1.22373 5.3137 1.08325 5.66732 1.08325H8.33398C8.68761 1.08325 9.02674 1.22373 9.27679 1.47378C9.52684 1.72382 9.66732 2.06296 9.66732 2.41659V3.74992M11.6673 3.74992V13.0833C11.6673 13.4369 11.5268 13.776 11.2768 14.0261C11.0267 14.2761 10.6876 14.4166 10.334 14.4166H3.66732C3.3137 14.4166 2.97456 14.2761 2.72451 14.0261C2.47446 13.776 2.33398 13.4369 2.33398 13.0833V3.74992H11.6673Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Left side */}


        {/* Right side */}

        <div className="flex-[1] flex items-start justify-center">
          <div className="px-4 py-6 rounded-xl shadow-lg border border-gray-200 mx-[25px] w-full">
            <div className="flex flex-col gap-[20px]">
              <h1 className="font-bold text-xl">გადახდა</h1>
              <span className="flex items-center justify-between font-[300] text-xs">
                <p>პროდუქტები ({totalItems})</p>
                <p >${price}</p>
              </span>
              <span className="flex items-center justify-between font-[300] text-xs">
                <p >ფასდაკლება </p>
                <p>-$0.00</p>
              </span>
              <div className="w-full h-[1px] bg-gray-300"></div>
              <span className="flex items-center justify-between font-[300] text-xs">
                <h1>ჯამური ღირებულება</h1>
                <h1>${price}</h1>
              </span>
              <div className="w-full h-[1px] bg-gray-300"></div>
              <button
                onClick={() => {
                  localStorage.setItem("invoiceData", JSON.stringify(products));
                  localStorage.setItem("invoiceTotal", JSON.stringify(price));
                  router.push("/invoice");
                }}
                className="px-3 py-5 rounded-md text-sm text-white w-full bg-secondary font-bold"
              >
                შეკვეთის გაფორმება
              </button>

            </div>
          </div>
        </div>

        {/* Right side */}

      </div>
    </div>
  );
}