"use client";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Page() {
  const router = useRouter();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);

    if (!token) {
      router.push('/login'); // Assuming `/login` is your login page
      return; // Prevent further execution if no token
    }

    axios
    .get("http://localhost:3001/products/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setProducts(res.data); // Set products from API response
      console.log(res.data); // Log the response data
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
    });
}, []);  // Dependency array ensures this runs once on component mount

  return (
    <div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
      {products.cartItems.map((product: { _id: React.Key | null | undefined; name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; image: string | undefined; description: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; price: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }) => (
        <div key={product._id} className="border p-4 rounded shadow">
          <h2 className="font-bold">{product.name}</h2>
          <img className="w-full h-[150px] object-cover rounded" src={product.image} alt={product.name} />
          <p className="text-sm text-gray-600">{product.description}</p>
          <p className="font-semibold">${product.price}</p>
          
          
        </div>
      ))}
    </div>
    </div>
  );
}


