'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Products() {
  const router = useRouter();
  const [loadingProduct, setLoadingProduct] = useState<string | null>(null); // Track the loading product
  const [products, setProducts] = useState<
    { _id: string; image: string; name: string; description: string; price: number; category: string }[]
  >([]);

  const addtocart = (id: string) => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login'); // Redirect to login if no token
      return;
    }

    setLoadingProduct(id); // Start loading for the selected product

    const MIN_LOADING_TIME = 1000; // Minimum loading time in milliseconds
    const startTime = Date.now();

    axios.post(
      "http://localhost:3001/products/add-to-cart",
      { productId: id }, // The product ID to add to the cart
      {
        headers: {
          Authorization: `Bearer ${token}`, // Bearer token
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
        setTimeout(() => setLoadingProduct(null), remainingTime); // Ensure at least MIN_LOADING_TIME passes
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        router.push('/login');
      });
  }, []);

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
      {products.map((product) => (
        <div key={product._id} className="border p-4 rounded shadow">
          <h2 className="font-bold">{product.name}</h2>
          <img
            className="w-full h-[150px] object-cover rounded"
            src={product.image}
            alt={product.name}
          />
          <p className="text-sm text-gray-600">{product.description}</p>
          <p className="font-semibold">${product.price}</p>

          <button
            onClick={() => addtocart(product._id)}
            className={`px-4 py-2 rounded ${loadingProduct === product._id ? 'bg-gray-500' : 'bg-gray-300'
              }`}
            disabled={loadingProduct === product._id} // Disable button when loading
          >
            {loadingProduct === product._id ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      ))}
    </div>
  );
}
