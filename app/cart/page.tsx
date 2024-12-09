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
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    const productId = e.currentTarget.id; // Get the product ID from the button's id attribute
    const token = localStorage.getItem("token"); // Retrieve token from local storage
  
    if (!token) {
      console.error("No token found. User might not be logged in.");
      return;
    }
  
    axios
      .post(
        "http://localhost:3001/products/remove-from-cart",
        { productId }, // Include productId in the request body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
            "Content-Type": "application/json", // Optional: Ensure content type is JSON
          },
        }
      )
      .then((res) => {
        console.log("Product removed successfully:", res.data);
  
        // Update the UI after successful deletion
        setProducts((prevProducts) => {
          const updatedProducts = prevProducts.filter(
            (item) => item.product._id !== productId
          );
          updateTotalPriceAndItems(updatedProducts); // Update total price and item count
          return updatedProducts;
        });
      })
      .catch((err) => {
        console.error("Error removing product from cart:", err.response?.data || err.message);
      });
  };
  
  // Function to update total price and total items
  const updateTotalPriceAndItems = (updatedProducts: CartItem[]) => {
    const updatedPrice = updatedProducts.reduce(
      (acc, item) => acc + item.totalPrice,
      0
    ); // Sum of all totalPrice in the cart
    const updatedTotalItems = updatedProducts.reduce(
      (acc, item) => acc + item.quantity,
      0
    ); // Sum of all quantities in the cart
  
    setPrice(updatedPrice); // Update total price state
    setTotalItems(updatedTotalItems); // Update total items state
  };
  
  const updateQuantity = (productId: string, operation: "increment" | "decrement") => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((item) => {
        if (item.product._id === productId) {
          // Determine updated quantity based on the operation
          const updatedQuantity =
            operation === "increment" ? item.quantity + 1 : Math.max(0, item.quantity - 1);
  
          return {
            ...item,
            quantity: updatedQuantity,
            totalPrice: updatedQuantity * item.product.price, // Update total price for this item
          };
        }
        return item;
      });
  
      updateTotalPriceAndItems(updatedProducts); // Update total price and item count
      return updatedProducts;
    });
  };
  
  
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
    <button id={item.product._id} onClick={handleDelete}>
      Delete
    </button>
    <button
      onClick={() => updateQuantity(item.product._id, "increment")}
      className="p-5 bg-red-500"
    >
      +
    </button>
    <button
      onClick={() => updateQuantity(item.product._id, "decrement")}
      className="p-5 bg-yellow-500"
    >
      -
    </button>
  </div>
))}

      </div>
      <div className="mt-4">
        <p>Total Price: ${price}</p>
        <p>Total Items: {totalItems}</p> {/* Display total number of items */}
      </div>
      <div>
      </div>
    </div>
  );
}
