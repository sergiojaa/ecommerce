'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

type ProductType = {
  _id: string;
  name: string;
  description: string[];
  category: string;
  price: number;
};

export default function Search({ setFilteredProducts }: { setFilteredProducts: React.Dispatch<React.SetStateAction<ProductType[]>> }) {
  const [inputVals, setInputVals] = useState({
    minPrice: 0,
    maxPrice: 0,
  });

  // Handle input changes for minPrice and maxPrice
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, key: string) => {
    let value = event.target.value;
    value = value === "" ? "0" : value; // Handle empty input and set to "0"
    const numericValue = Number(value); // Ensure it's a number
    setInputVals((prev) => ({
      ...prev,
      [key]: isNaN(numericValue) ? 0 : numericValue, // If NaN, set to 0
    }));
  };

  // Filter products by price range
  const filterProductsByPrice = async () => {
    const response = await axios.get(
      `http://localhost:3001/products?minPrice=${inputVals.minPrice}&maxPrice=${inputVals.maxPrice}`
    );
    setFilteredProducts(response.data); // Update the parent component's filtered products
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">ფილტრაცია ფასის მიხედვით</h1>
      <div>
        <div className="flex gap-20">
          <p className="text-[20px]">ფასი</p>
        </div>

        <div>
          <form className="flex gap-10">
            <div>
              <input
                className="border w-14 h-10"
                type="number"
                value={inputVals.minPrice || ""}
                onChange={(event) => handleInputChange(event, 'minPrice')}
              />
              <label>ლ</label>
            </div>
            <div>
              <input
                className="border w-14 h-10"
                type="number"
                value={inputVals.maxPrice || ""}
                onChange={(event) => handleInputChange(event, 'maxPrice')}
              />
              <label>ლ</label>
            </div>
          </form>
        </div>
        <div>
          <h1
            onClick={filterProductsByPrice}
            className="cursor-pointer bg-blue-500 p-2 w-[80px] text-white"
          >
            ძებნა
          </h1>
        </div>
      </div>
    </div>
  );
}
