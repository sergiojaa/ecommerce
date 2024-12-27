'use client';
import Products from '@/app/components/products/Products';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type productType = {
  _id: string;
  name: string;
  description: string[];
  category: string;
  price: number;
};

export default function Page() {
  const searchParams = useSearchParams();

  // Extract query parameters
  const search = searchParams.get('search');
  const maxPrice = searchParams.get('maxPrice');
  const minPrice = searchParams.get('minPrice');
  const sort = searchParams.get('sort');
  const category = searchParams.get('category');

  const [products, setProducts] = useState<productType[]>([]);
  const [plus, setPlus] = useState(false);
  const [minPricee, setMinPricee] = useState<number>(minPrice ? parseInt(minPrice, 10) : 0);  // Use number type here
  const [maxPricee, setMaxPricee] = useState<number>(maxPrice ? parseInt(maxPrice, 10) : 0);  // Use number type here
  const [getMinimalPrice, setGetMinimalPrice] = useState<number>(minPrice ? parseInt(minPrice, 10) : 0);
  const [getMaximumPrice, setGetMaximumPrice] = useState<number>(maxPrice ? parseInt(maxPrice, 10) : 0);

  const changeIcon = () => {
    setPlus(!plus);
  };

  const fetchProducts = () => {
    axios
      .get('http://localhost:3001/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      setMaxPricee(
        products.reduce((max, product) => {
          return product.price > max ? product.price : max;
        }, 0)
      );
    }
  }, [products]);

  const getMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setGetMaximumPrice(value || 0);
    setMaxPricee(value || 0);  // Keep it as a number, not string
  };

  const getMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setGetMinimalPrice(value || 0);
    setMinPricee(value || 0);  // Keep it as a number, not string
  };

  useEffect(() => {
    console.log('Search queries:', {
      search,
      maxPrice,
      minPrice,
      sort,
      category,
    });
  }, [search, maxPrice, minPrice, sort, category]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Search Page</h1>
      <p>Query Parameters:</p>
      <div>
        <div className="flex gap-20">
          <p className="text-[20px]">ფასი</p>
          {plus ? (
            <div onClick={changeIcon} className="text-[20px] cursor-pointer">
              -
            </div>
          ) : (
            <div onClick={changeIcon} className="text-[20px] cursor-pointer">
              +
            </div>
          )}
        </div>

        {plus && (
          <div>
            <div>
              <form className="flex gap-10">
                <div>
                  <input
                    className="border w-14 h-10"
                    value={minPricee || ''} // Empty string if 0 or null
                    type="number"
                    onChange={getMinPrice}
                  />
                  <label htmlFor="">ლ</label>
                </div>
                <div>
                  <input
                    className="border w-14 h-10"
                    value={maxPricee || ''} // Empty string if 0 or null
                    type="number"
                    onChange={getMaxPrice}
                  />
                  <label htmlFor="">ლ</label>
                </div>
              </form>
            </div>
            <div>
              <h1 className="cursor-pointer bg-blue-500 p-2 w-[80px] text-white">
                ძებნა
              </h1>
            </div>
          </div>
        )}
      </div>

      <div>
        {products.slice(0, 25).map((product) => (
          <div key={product._id}>
            {product.price} ლარი
          </div>
        ))}
      </div>
    </div>
  );
}
