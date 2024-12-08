"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Product {
  _id: string; // Mongoose ObjectId is usually a string when it's serialized to JSON
  image: string; // Image URL as a string
  name: string; // Product name as a string
  description: string; // Product description as a string
  price: number; // Product price as a number
  category: "vodka" | "whiskey" | "beer"; // Enum of valid categories
}

interface CartItem {
  product: Product; // The product details
  quantity: number; // Quantity of the product in the cart
  totalPrice: number; // The total price for that quantity (price * quantity)
}

interface CartResponse {
  cartItems: CartItem[]; // List of products in the cart
  totalPrice: number; // Total price of all items in the cart
}

export default function Page() {
  const router = useRouter();
  const [products, setProducts] = useState<CartItem[]>([]); // Initialize as empty array
  const [price, setPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0); // State for the total number of items
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);

    if (!token) {
      router.push("/login"); // Redirect to login if no token
      return;
    }

    axios
      .get<CartResponse>("http://localhost:3001/products/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProducts(res.data.cartItems); // Set products from API response
        setPrice(res.data.totalPrice); // Set total price from response
        // Calculate total number of items (sum of quantities)
        const totalQuantity = res.data.cartItems.reduce(
          (acc, item) => acc + item.quantity,
          0
        );
        setTotalItems(totalQuantity);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false); // Set loading to false even on error
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading state
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
          </div>
        ))}
      </div>
      <div className="mt-4">
        <p>Total Price: ${price}</p>
        <p>Total Items: {totalItems}</p> {/* Display total number of items */}
      </div>
    </div>
  );
}
