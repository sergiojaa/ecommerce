'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard, { productType } from '../components/products/ProductCard';
import { useRouter } from 'next/navigation';
import { checkTokenValidity } from '../components/utils/checkTokenValidity';

export default function CategoryPage() {
  const [products, setProducts] = useState<productType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tokenValidity, setTokenValidity] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  useEffect(() => {
    if (category) {
      axios
        .get(`http://localhost:3001/products?category=${category}`)
        .then((response) => {
          setProducts(response.data.products);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching products:', err);
          setError('Failed to load products.');
          setLoading(false);
        });
    }
  }, [category]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    checkTokenValidity(String(token)).then((isValid) => {
      setTokenValidity(isValid);
    });
  }, []);

  const addtocart = (id: string) => {
    const token = localStorage.getItem('token');

    if (!tokenValidity) {
      router.push('/login');
      return;
    }

    setLoadingProduct(id);

    const MIN_LOADING_TIME = 1000;
    const startTime = Date.now();

    axios
      .post(
        'http://localhost:3001/cart/add-to-cart',
        { productId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log('Product added to cart:', res.data);
      })
      .catch((err) => {
        console.error('Error adding product to cart:', err);
      })
      .finally(() => {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);
        setTimeout(() => setLoadingProduct(null), remainingTime);
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div className='flex cursor items-center  '>
        <h1 className='font-bold text-secondary text-[20px]'>კატეგორია: {category}</h1>

      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 mx-[100px] gap-4 mt-4">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            loadingProduct={loadingProduct}
            setLoadingProduct={setLoadingProduct}
          />
        ))}
      </div>
    </div>
  );
}
