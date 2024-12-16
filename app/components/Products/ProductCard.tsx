import { faCartShopping } from '@fortawesome/free-solid-svg-icons/faCartShopping';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react'


type productType = {
    _id: string;
    image: string;
    name: string;
    description: string;
    price: number;
    category: string;
}

type ProductCardProps = {
    product: productType;
    addtocart: (id: string) => void; // Assuming `addtocart` is a function that takes an id as a parameter
    loadingProduct: string | null; // Assumes loadingProduct is either a string (the ID of a product) or null
}

export default function ProductCard({ product, addtocart, loadingProduct }: ProductCardProps) {
    return (
        <div className=" border  p-4 rounded shadow flex flex-col justify-between">
            <Link href={`/products/${product._id}`}>
                <img
                    className="w-full h-[150px] object-cover rounded"
                    src={product.image}
                    alt={product.name}
                />
                <h2 className="font-bold text-[15px] mt-[0.5rem]">{product.name}</h2> {/* Truncates long names */}
                <p className="text-sm text-gray-600 mt-[0.5rem] line-clamp-2">{product.description}</p> {/* Limits description */}
            </Link>
            <div className="flex items-center justify-between  ">
                <p className="font-semibold">${product.price}</p>
                <button
                    onClick={() => addtocart(product._id)}
                    className={`px-4 py-2 rounded ${loadingProduct === product._id ? 'bg-blue-300' : 'bg-blue-500'
                        }`}
                    disabled={loadingProduct === product._id}
                >
                    <FontAwesomeIcon
                        icon={faCartShopping}
                        className="text-white text-xl cursor-pointer"
                    />
                    {loadingProduct === product._id && 'Adding...'}
                </button>
            </div>
        </div>
    )
}
