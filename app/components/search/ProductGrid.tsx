'use client'
import Link from "next/link";

type Types = {
  type: string;
  price: string;
};

type Product = {
  _id: string;
  category: string;
  name: string;
  description: string[];
  price: number | string;
  image: string;
  types: Types[];
};

type Props = {
  products: Product[];
  // setProducts: React.Dispatch<Product[]>
  // currentPage: number
};

export default function ProductGrid({ products }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <Link key={product._id} href={`/Products/${product._id}`}>
          <div className="bg-surface p-6 rounded-lg shadow-sm transition duration-300 ease-in-out hover:shadow-md cursor-pointer">
            <div className="aspect-w-1 aspect-h-1 mb-4 overflow-hidden rounded-lg">
              <img
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="object-cover w-full h-full transition duration-300 ease-in-out transform hover:scale-105"
              />
            </div>
            <h3 className="font-semibold mb-2 text-text-primary">{product.name}</h3>
            <p className="text-sm text-text-secondary mb-2">{product.category}</p>
            <p className="font-bold text-primary">${Number(product.price).toFixed(2)}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
