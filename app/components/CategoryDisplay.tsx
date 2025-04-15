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
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState<[]>([]);

    useEffect(() => {
        axios
            .get("https://trulaila-api-production.up.railway.app/products")
            .then((res) => {
                setProducts(res.data);
                setFilteredProducts(res.data);
                console.log(products)
                console.log(filteredProducts)
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
            });

        axios
            .get("https://trulaila-api-production.up.railway.app/products/categories")
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
                        href={`/products/search?category=${encodeURIComponent(category.name)}`}
                        className="flex justify-center"
                    >
                        <div className="bg-[#f7f7f7] w-full max-w-[300px] h-[250px] px-4 py-5 rounded-lg shadow-md flex flex-col items-center justify-between">
                            <img className="w-[120px]" src={category.image} alt={category.name} />

                            <li className="text-[16px] text-black text-center">{category.name}</li>
                        </div>
                    </Link>
                ))}
            </ul>
        </div>




    )
}
