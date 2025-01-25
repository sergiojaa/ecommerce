import { faCartShopping } from '@fortawesome/free-solid-svg-icons/faCartShopping';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react'


export type productType = {
  _id: string;
  image: string;
  name: string;
  description: string;
  price: string;
  category: string;
}

type ProductCardProps = {
  product: productType;
  addtocart: (id: string) => void; // Assuming `addtocart` is a function that takes an id as a parameter
  loadingProduct: string | null; // Assumes loadingProduct is either a string (the ID of a product) or null
}

export default function ProductCard({ product, addtocart, loadingProduct }: ProductCardProps) {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="border w-[250px] p-4 rounded shadow  flex flex-col justify-between">
        <Link href={`/products/${product._id}`}>
          <div className="flex justify-center items-center">
            <img
              className="h-[200px] w-[200px] object-contain object-center rounded"
              src={product.image}
              alt={product.name}
            />
          </div>
          <h2 className="font-bold text-gray-500 text-[15px] mt-[0.5rem] w-full truncate overflow-hidden text-ellipsis">
            {product.name}
          </h2>
          <p className="text-sm  text-green-500 mt-[0.5rem] line-clamp-2">
            მარაგშია
          </p>
        </Link>
        <div className="flex items-center justify-between">
          {product.price !== 'ფასი შეთანხმებით' && <p className="font-semibold">{product.price} ₾</p>}
          {product.price === 'ფასი შეთანხმებით' && <p className="font-semibold text-xs">{product.price}</p>}
          <button
            onClick={() => addtocart(product._id)}
            className={`px-4 py-2 rounded ${loadingProduct === product._id ? 'bg-secondary' : 'bg-secondary'
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
    </div>
  )
}
