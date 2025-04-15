'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../ProductCard';
import { useRouter } from 'next/navigation';

interface Product {
  _id: string;
  name: string;
  price: string;
  image: string;
  description: string;
  category: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loadingProduct, setLoadingProduct] = useState<string | null>(null);
  const [categoryData, setCategoryData] = useState<string[]>([]);

  const router = useRouter();

  useEffect(() => {
    axios
      .get("https://trulaila-api-production.up.railway.app/products")
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
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

  const addtocart = (id: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    setLoadingProduct(id);
    axios
      .post("https://trulaila-api-production.up.railway.app/cart/add-to-cart", { productId: id }, {
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
    <div>
      <div className="flex items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 mt-10 md:grid-cols-3 xl:grid-cols-4 gap-4 mx-[2rem] lg:mx-[6rem] font-[BebasNeue]">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                addToCart={addtocart}
                isLoading={loadingProduct === product._id}
              />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
