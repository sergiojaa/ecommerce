'use client';
import ProductCard from '@/app/components/products/ProductCard';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type ProductType = {
  _id: string;
  name: string;
  description: string;
  category: string;
  types: string[];
  price: string;
  subcategory: string;
  image: string;
};

export default function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState<ProductType[]>([]);
  const [loadingProduct, setLoadingProduct] = useState<string | null>(null);
  const [inputVals, setInputVals] = useState<{ minPrice: string; maxPrice: string }>({
    minPrice: searchParams.get("minPrice") || "0",
    maxPrice: searchParams.get("maxPrice") || "0",
  });

  const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      params.set("minPrice", inputVals.minPrice);
      params.set("maxPrice", inputVals.maxPrice);
      router.push(`?${params.toString()}`, { scroll: false });
    }, 500);

    return () => clearTimeout(handler);
  }, [inputVals, router]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let query = `?minPrice=${inputVals.minPrice}&page=${currentPage}`;
        if (inputVals.maxPrice !== "0") query += `&maxPrice=${inputVals.maxPrice}`;

        const res = await axios.get(`http://localhost:3001/products${query}`);
        setProducts(res.data.products);
        setTotalPages(Math.ceil(res.data.totalProducts / 12));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [inputVals.minPrice, inputVals.maxPrice, currentPage]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, key: "minPrice" | "maxPrice") => {
    const value = event.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setInputVals((prev) => ({ ...prev, [key]: value }));
    }
  };

  const updatePage = (newPage: number) => {
    setCurrentPage(newPage);
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <div className='flex'>
        <div className="flex-1 py-4 h-screen flex items-center flex-col">
          <h1 className="text-xl">ფილტრაცია</h1>
          <div className='flex flex-col'>
            <div className="flex gap-20">
              <p className="text-[14px] mt-[20px]">ფასი</p>
            </div>
            <div className='mt-[10px] flex items-center justify-between w-[170px] gap-[20px]'>
              <div className='flex items-center gap-1'>
                <input
                  className="border w-full py-1 px-[2px] outline-none"
                  type="text"
                  value={inputVals.minPrice}
                  onChange={(event) => handleInputChange(event, 'minPrice')}
                />
                <label>ლ</label>
              </div>
              <div className='flex items-center gap-1'>
                <input
                  className="border w-full py-1 px-[2px] outline-none"
                  type="text"
                  value={inputVals.maxPrice}
                  onChange={(event) => handleInputChange(event, 'maxPrice')}
                />
                <label>ლ</label>
              </div>
            </div>
          </div>
        </div>
        <div className='flex-[6] min-h-screen'>
          <div className='grid grid-cols-4 gap-y-6'>
            {products.map((product) => (
              <div key={product._id}>
                <ProductCard loadingProduct={loadingProduct} setLoadingProduct={setLoadingProduct} product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-4 items-center pt-[95px]">
        <button
          className="px-4 py-2 bg-secondary text-white hover:opacity-50 transition ease-in-out rounded disabled:opacity-50"
          onClick={() => updatePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          წინა გვერდი
        </button>
        <p className='text-xl'>{currentPage}</p>
        <button
          className="px-4 py-2 bg-secondary text-white hover:opacity-50 transition ease-in-out rounded disabled:opacity-50"
          onClick={() => updatePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          მომდევნო გვერდი
        </button>
      </div>
    </>
  );
}
