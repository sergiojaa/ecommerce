'use client'
import axios from 'axios';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
type Category = {
    name: string;
    subcategories: string[]
    _id: string;
    image: string
}
export default function CategoryDisplay() {
    const [categoryData, setCategoryData] = useState<Category[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

    useEffect(() => {
        axios
            .get("http://localhost:3001/products")
            .then((res) => {
                setProducts(res.data); // Set all products
                setFilteredProducts(res.data); // Initially display all products
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
            });

        axios
            .get("http://localhost:3001/products/categories") // Fetch categories
            .then((res) => {
                setCategoryData(res.data.categories);

            })
            .catch((err) => {
                console.error("Error fetching categories:", err);
            });
    }, []);

    return (
        <div className="max-w-[1280px]  mt-10 px-[40px] mx-auto">
            <ul className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryData.map((category) => (
                    <Link
                        key={category._id}
                        href={`/category?category=${encodeURIComponent(category.name)}`}
                        className="flex justify-center"
                    >
                        <div className="bg-[#f7f7f7] w-full max-w-[300px] h-[250px] px-4 py-5 rounded-lg shadow-md flex flex-col items-center justify-between">
                            {/* Image First */}
                            <img className="w-[120px]" src={category.image} alt={category.name} />

                            {/* Text Below (Centered) */}
                            <li className="text-[16px] text-black text-center">{category.name}</li>
                        </div>
                    </Link>
                ))}
            </ul>
        </div>




    )
}
