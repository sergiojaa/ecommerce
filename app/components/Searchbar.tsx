import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

interface Product {
  id: number | string;
  name: string;
  price: number;
}

interface SearchbarProps {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  inputOpen: boolean;
  setInputOpen: React.Dispatch<React.SetStateAction<boolean>>;
  products: Product[];
}

const Searchbar: React.FC<SearchbarProps> = ({
  searchText,
  setSearchText,
  setProducts,
  inputOpen,
  setInputOpen,
  products,
}) => {
  const handleSearch = async (query: string) => {
    try {
      const response = await fetch(`http://localhost:3001/products?name=${query}`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    if (value.trim()) {
      handleSearch(value);
    } else {
      setProducts([]); // Clear the products if the search text is empty
    }
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center">
        <input
          type="text"
          value={searchText}
          onChange={handleInputChange}
          placeholder="რას ეძებთ?"
          className={`outline-none bg-red lg:ml-[200px] text-sm border border-gray-300 rounded p-2 w-full pl-2 pr-10 ${
            inputOpen || 'hidden'
          } md:block`}
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="absolute right-4 text-gray-500 cursor-pointer"
          onClick={() => setInputOpen(!inputOpen)}
        />
      </div>
      {products.length > 0 && (
        <ul className="absolute top-full left-0 bg-white border border-gray-300 w-full z-10">
          {products.map((product) => (
            <li key={product.id} className="p-2 hover:bg-gray-100">
              {product.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Searchbar;