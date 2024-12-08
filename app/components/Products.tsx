'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';


export default function Products() {
  const router = useRouter();

  const addtocart = (id: string) => {
    const token = localStorage.getItem('token')

    if (!token) {
      router.push('/login'); // Assuming `/login` is your login page
    }

    // axios request
  }

  const [products, setProducts] = useState<
    { _id: string; image: string; name: string; description: string; price: number; category: string }[]
  >([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/products")
      .then((res) => {
        setProducts(res.data)
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, [])

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
      {products.map((product) => (
        <div key={product._id} className="border p-4 rounded shadow">
          <h2 className="font-bold">{product.name}</h2>
          <img className="w-full h-[150px] object-cover rounded" src={product.image} alt={product.name} />
          <p className="text-sm text-gray-600">{product.description}</p>
          <p className="font-semibold">${product.price}</p>
          <button
            onClick={() => addtocart(product._id)}
            className='bg-gray-300 px-4 py-2 rounded'>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  )
}
