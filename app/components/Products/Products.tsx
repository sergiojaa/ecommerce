'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import Search from '@/app/products/search/page';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Category = {
  name: string;
  subcategories: string[]
  _id: string;
}

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [loadingProduct, setLoadingProduct] = useState<string | null>(null);
  const [categoryData, setCategoryData] = useState<Category[]>([]);
  const router = useRouter();

  // Fetch all products and categories initially
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

  // Function to add product to cart
  const addtocart = (id: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login if not authenticated
      router.push('/login');
    }

    setLoadingProduct(id);
    axios
      .post("http://localhost:3001/cart/add-to-cart", { productId: id }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Product added to cart:", res.data);
      })
      .catch((err) => {
        console.error("Error adding product to cart:", err);
      })
      .finally(() => {
        setLoadingProduct(null);
      });
  };

  return (
    <div className="flex items-start justify-end">
      <div className="flex ml-10 flex-col gap-5">
        <div className="bg-[#FFFFFF] mt-50px border border-secondary mt-10 top-[83px] w-[270px] text-black">
          <ul className="flex gap-1 font-bold cursor-pointer w-full flex-col items-start justify-center">
            {categoryData.map((category) => (
              <Link
                key={category._id}
                href={`/category?category=${encodeURIComponent(category.name)}`}
                className="w-full border-b border-secondary"
                onClick={() => { }}
              >
                <li className="py-3 px-4 font-normal">{category.name}</li>
              </Link>
            ))}
          </ul>
        </div>
        <div>
          <Search setFilteredProducts={setFilteredProducts} />
        </div>
      </div>

      {/* Display the filtered products in the grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 mt-10 md:grid-cols-3 xl:grid-cols-3 gap-4 mx-[2rem] lg:mx-[6rem] font-[Bebas Neue]">
        {filteredProducts.slice(15, 23).map((product) => (
          <ProductCard key={product._id} product={product} loadingProduct={loadingProduct} addtocart={addtocart} />
        ))}
      </div>
    </div>
  );
}
