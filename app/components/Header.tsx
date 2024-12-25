import React, { useState } from 'react';
import Link from 'next/link';
import Searchbar from './Searchbar';

export interface Product {
  id: number | string;
  name: string;
  price: number;
}

interface PageProps {
  isOpen: boolean;
  open: () => void;
}

export default function Page({ isOpen, open }: PageProps) {
  const [inputOpen, setInputOpen] = useState(false);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState('');
  const toggleHamburgerOpen = () => {
    setHamburgerOpen(!hamburgerOpen);
  };

  return (
    <div className="mt-[17px]">
      <div className={`flex items-center md:justify-between ${!inputOpen && 'justify-between'}`}>
        <div className="flex items-center gap-2">
          <button onClick={open} className="lg:hidden">
            <div className="ml-[10px] translate-y-[-10%]">
              <div className="flex m-[6px] flex-col items-center justify-center space-y-1 w-6 cursor-pointer">
                {hamburgerOpen ? (
                  <div
                    className="text-xl border-b w-full cursor-pointer"
                    onClick={toggleHamburgerOpen}
                  >
                    X
                  </div>
                ) : (
                  <div className="flex flex-col gap-1 items-center" onClick={toggleHamburgerOpen}>
                    <div className="h-1 w-6 bg-[#69707D] rounded"></div>
                    <div className="h-1 w-6 bg-[#69707D] rounded"></div>
                    <div className="h-1 w-6 bg-[#69707D] rounded"></div>
                  </div>
                )}
              </div>
            </div>
          </button>
          {!inputOpen && (
            <div>
              <div className="w-[100px] lg:w-[150px] md:ml-[20px]">
                <Link href={'/'}>
                  <h1 className="lg:ml-[150px] cursor-pointer font-bold text-[20px]">
                    Ecommerce
                  </h1>
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center w-full gap-7 lg:pr-[70px]">
          <Searchbar
            searchText={searchText}
            setSearchText={setSearchText}
            setProducts={setProducts}
            inputOpen={inputOpen}
            setInputOpen={setInputOpen}
            products={products}
          />
        </div>
      </div>
    </div>
  );
}