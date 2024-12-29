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

  const search = searchParams.get('search');
  const maxPrice = searchParams.get('maxPrice');
  const minPrice = searchParams.get('minPrice');
  const sort = searchParams.get('sort');
  const category = searchParams.get('category');

  const [products, setProducts] = useState<productType[]>([]);
  const [plus, setPlus] = useState(false);

  useEffect(() => {
    const fetchedProducts = fetchProducts();

    fetchedProducts.then((data) => {
      const maxPriceOfProducts = data.reduce((max: number, product: productType) => Math.max(max, product.price), 0)
      setInputVals((prev) => ({ ...prev, maxPrice: maxPriceOfProducts }))
    }
    )

  }, []);


  useEffect(() => {
    console.log('Search queries:', {
      search,
      maxPrice,
      minPrice,
      sort,
      category,
    });
  }, [search, maxPrice, minPrice, sort, category]);

  const [inputVals, setInputVals] = useState({
    minPrice: 0,
    maxPrice: 0,
  });

  const fetchProducts = async () => {
    const response = await axios.get('http://localhost:3001/products');
    setProducts(response.data);
    return response.data;
  }

  const changeIcon = () => {
    setPlus(!plus);
  };

  const handleInputChange = (event: any, key: string) => {
    setInputVals({
      ...inputVals,
      [key]: event.target.value,
    });
  }
  const  filterProductsByPrice = async  () =>{
    const filteredProducts = (await axios.get(`http://localhost:3001/products?minPrice=${inputVals.minPrice}&maxPrice=${inputVals.maxPrice}`)).data

    setProducts(filteredProducts)
  }


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
                    type="number"
                    value={inputVals.minPrice}
                    onChange={(event) => handleInputChange(event, 'minPrice')}
                  />
                  <label htmlFor="">ლ</label>
                </div>
                <div>
                  <input
                    className="border w-14 h-10"
                    type="number"
                    value={inputVals.maxPrice}
                    onChange={(event) => handleInputChange(event, 'maxPrice')}

                  />
                  <label htmlFor="">ლ</label>
                </div>
              </form>
            </div>
            <div>
              <h1 
              onClick={filterProductsByPrice}
              className="cursor-pointer bg-blue-500 p-2 w-[80px] text-white">
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
