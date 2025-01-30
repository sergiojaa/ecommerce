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
        <div className="flex items-center justify-center">
            <div className="w-[600px] text-secondary">
                <ul className="grid grid-cols-3 gap-6">
                    {categoryData.map((category) => (
                        <div key={category._id} className="bg-[#f7f7f7] p-4 rounded-lg shadow-md">
                            <Link
                                href={`/category?category=${encodeURIComponent(category.name)}`}
                                className="flex flex-col items-center w-full"
                                onClick={() => { }}
                            >
                                {/* Image First */}
                                <img className="w-[80px]" src={category.image} alt={category.name} />

                                {/* Text Below (Centered) */}
                                <li className="py-3 px-4 text-[16px] text-center">{category.name}</li>
                            </Link>
                        </div>
                    ))}
                </ul>
            </div>
        </div>




    )
}
