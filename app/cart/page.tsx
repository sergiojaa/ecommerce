'use client';
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { checkTokenValidity } from "../components/utils/checkTokenValidity";
import LeftSide from "../components/cart/LeftSide";
import RightSide from "../components/cart/RightSide";
import axios from "axios";
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
        router.push('/login');
      }
    });
  }, []);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    const token = localStorage.getItem('token');

    axios
      .get<CartResponse>("https://trulaila-api-production.up.railway.app/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
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

  const handleQuantityChange = (
    productId: string,
    typeId: string | undefined,
    operation: "increment" | "decrement"
  ) => {
    setLoadingProductId(productId); // Set the loading state for this product

    const MIN_LOADING_TIME = 1000; // Minimum loading time to simulate loading effect
    const startTime = Date.now(); // Record the start time

    const token = localStorage.getItem("token"); // Retrieve token from localStorage

    if (!token) return; // If no token is available, return early

    axios
      .post(
        "https://trulaila-api-production.up.railway.app/cart/change-quantity", // Your API endpoint
        { productId, typeId, operation }, // Request body
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
      .catch((err) => console.error("Error changing quantity:", err))
      .finally(() => {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);
        setTimeout(() => setLoadingProductId(null), remainingTime);

        getProducts();
      });
  };




  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="md:px-[50px] pb-[100px]">
      <h1 className="mx-[20px] text-3xl font-bold my-[50px]">
        შენს კალათაში {totalItems} ნივთია
      </h1>

      <div className="flex w-full h-screen-minus-header gap-[50px] flex-col lg:flex-row">
        <LeftSide
          products={products}
          loading={loading}
          loadingProductId={loadingProductId}
          removeItem={removeItem}
          handleQuantityChange={handleQuantityChange}
        />
        <RightSide totalItems={totalItems} price={price} products={products} />
      </div>
    </div>
  );
}
