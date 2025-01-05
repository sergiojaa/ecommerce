'use client'
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

interface IProps {
  inputOpen: boolean;
  setInputOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Searchbar({ inputOpen, setInputOpen }: IProps) {
  const desktopSearchbarRef = useRef<HTMLDivElement>(null);
  const mobileSearchbarRef = useRef<HTMLDivElement>(null);

  const [search, setSearch] = useState<string>('');
  const [searchedProducts, setSearchedProducts] = useState<any[]>([]);
  const [searchPromptOpen, setSearchPromptOpen] = useState<boolean>(false);

  useEffect(() => {
    // Reset search state when inputOpen changes
    setSearchPromptOpen(false);
    setSearchedProducts([]);
    setSearch('');
  }, [inputOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        (desktopSearchbarRef.current && desktopSearchbarRef.current.contains(event.target as Node)) ||
        (mobileSearchbarRef.current && mobileSearchbarRef.current.contains(event.target as Node))
      ) {
        setSearchPromptOpen(true);
      } else {
        setSearchPromptOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);

    if (searchTerm === '') {
      setSearchedProducts([]);
      return;
    }

    if (searchTerm.length < 3) {
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3001/products?name=${searchTerm}`);
      setSearchPromptOpen(true);
      setSearchedProducts(response.data.splice(0, 5));
    } catch (error) {
      setSearchedProducts([]);
      setSearchPromptOpen(false);
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div className="relative" ref={desktopSearchbarRef}>
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={handleSearch}
        className="border border-gray-300 rounded-md p-2 w-full mb-4"
      />

      {/* Search Results Dropdown */}
      {searchPromptOpen && searchedProducts.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 shadow-lg z-10 mt-1">
          {searchedProducts.map((product) => (
            <div
              key={product.id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                alert(`Selected: ${product.name}`);
                setSearch('');
                setSearchPromptOpen(false);
              }}
            >
              <h2 className="text-sm font-medium">{product.name}</h2>
              <p className="text-xs text-gray-500">{product.category}</p>
            </div>
          ))}
        </div>
      )}

      {/* No Results Message */}
      {searchPromptOpen && searchedProducts.length === 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 shadow-lg z-10 mt-1 p-2">
          <p className="text-gray-500 text-sm">No products found</p>
        </div>
      )}
    </div>
  );
}
