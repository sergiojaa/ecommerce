"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Product {
  _id: string;
  image: string;
  name: string;
  description: string;
  price: number;
  category: "vodka" | "whiskey" | "beer";
}

interface CartItem {
  product: Product;
  quantity: number;
  totalPrice: number;
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

  const getProducts = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    axios
      .get<CartResponse>("http://localhost:3001/products/cart", {
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
        console.log('hello')
      })
      .catch(() => {
        console.log("Cart Empty");
        setLoading(false);
      });
  };

  const handleQuantityChange = (productId: string, operation: "increment" | "decrement") => {
    setLoadingProductId(productId);
    const MIN_LOADING_TIME = 1000;
    const startTime = Date.now();

    axios
      .post(
        "http://localhost:3001/products/change-quantity",
        { productId, operation },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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

  const removeItem = (productId: string) => {
    setLoadingProductId(productId);
    const MIN_LOADING_TIME = 1000;
    const startTime = Date.now();

    axios
      .post(
        "http://localhost:3001/products/remove-from-cart",
        { productId },
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

  return (
    <div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        {products.map((item) => (
          <div key={item.product._id} className="border p-4 rounded shadow">
            <h2 className="font-bold">{item.product.name}</h2>
            <img
              className="w-full h-[150px] object-cover rounded"
              src={item.product.image}
              alt={item.product.name}
            />
            <p className="text-sm text-gray-600">{item.product.description}</p>
            <p className="font-semibold">
              ${item.product.price} x {item.quantity} = ${item.totalPrice}
            </p>
            <button
              onClick={() => handleQuantityChange(item.product._id, "increment")}
              disabled={loadingProductId === item.product._id}
              className={`bg-red-500 w-[40px] ${loadingProductId === item.product._id ? "opacity-50" : ""
                }`}
            >
              {loadingProductId === item.product._id ? "Adding..." : "+"}
            </button>
            <button
              onClick={() => handleQuantityChange(item.product._id, "decrement")}
              disabled={loadingProductId === item.product._id}
              className={`bg-yellow-500 w-[40px] ml-3 ${loadingProductId === item.product._id ? "opacity-50" : ""
                }`}
            >
              {loadingProductId === item.product._id ? "Updating..." : "-"}
            </button>
            <button
              onClick={() => removeItem(item.product._id)}
              disabled={loadingProductId === item.product._id}
              className={`bg-purple-600 ml-3 ${loadingProductId === item.product._id ? "opacity-50" : ""
                }`}
            >
              {loadingProductId === item.product._id ? "Removing..." : "Remove"}
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <p>Total Price: ${price}</p>
        <p>Total Items: {totalItems}</p>
      </div>
    </div>
  );
}
