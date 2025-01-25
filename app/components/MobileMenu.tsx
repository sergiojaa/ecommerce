import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Category {
    _id: string;
    name: string;
    subcategories: string[];
}

export default function MobileMenu({ open }: { open: () => void }) {
    const [categoryData, setCategoryData] = useState<Category[]>([]);

    useEffect(() => {
        axios
            .get("http://localhost:3001/products/categories")
            .then((res) => {
                setCategoryData(res.data.categories);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="bg-[#FFFFFF] top-[83px] w-full text-black md:hidden h-[100vh] right-0 fixed">
            <ul className="flex gap-1 font-bold cursor-pointer w-full flex-col items-start justify-center">
                {categoryData.map((category) => (
                    <Link
                        key={category._id}
                        href={`/category?category=${encodeURIComponent(category.name)}`}
                        className="w-full border-b"
                        onClick={open}
                    >
                        <li className="py-3 px-4 font-normal">{category.name}</li>
                    </Link>
                ))}
            </ul>
        </div>
    );
}
