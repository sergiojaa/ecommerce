import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

interface SearchbarProps {
    searchText: string;
    setSearchText: (text: string) => void;
    setProducts: (products: any[]) => void;
    inputOpen: boolean;
    setInputOpen: (open: boolean) => void;
}

export default function Searchbar({
    searchText,
    setSearchText,
    setProducts,
    inputOpen,
    setInputOpen,
}: SearchbarProps) {
    const toggleInputVisibility = () => {
        setInputOpen(!inputOpen);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchText(value);
        if (value.trim() !== '') {
            fetchProducts(value);
        } else {
            setProducts([]);
        }
    };

    const fetchProducts = async (query: string) => {
        try {
            const response = await fetch(`http://localhost:3001/products?name=${query}`);
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
                console.log(data);
            } else {
                console.log('Failed to fetch products');
            }
        } catch (error) {
            console.log('Error fetching products:', error);
        }
    };

    return (
        <div className="relative lg:mr-[100px] w-full flex items-center">
            <input
                type="text"
                value={searchText}
                onChange={handleInputChange}
                placeholder="რას ეძებთ?"
                className={`outline-none bg-red lg:ml-[200px] text-sm border border-gray-300 rounded p-2 w-full pl-2 pr-10 ${inputOpen || 'hidden'} md:block`}
            />
            <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className={`text-gray-500 text-xl block md:hidden cursor-pointer absolute right-2 ${inputOpen ? 'translate-x-0' : 'translate-x-6'} md:translate-x-0 top-1/2 transform -translate-y-1/2`}
                onClick={toggleInputVisibility}
            />
            <FontAwesomeIcon
                className="hidden md:block cursor-pointer text-gray-500 text-cl absolute right-2 top-1/4"
                icon={faMagnifyingGlass}
            />
        </div>
    );
}
