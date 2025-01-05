'use client';
import { useEffect, useState } from 'react';

interface Product {
  id: number;
  description: string[];
  image: string;
  name: string;
  category: string;
  price: number;
}

export default function ProductEditor() {
  const [products, setProducts] = useState<Product[]>([]); // Array of products
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Filtered products for search
  const [searchTerm, setSearchTerm] = useState<string>(''); // Search term
  const [error, setError] = useState<string | null>(null); // Error handling

  // Fetch products from the backend
  const getProducts = async () => {
    const url = 'http://localhost:3001/products';
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json: Product[] = await response.json();
      setProducts(json);
      setFilteredProducts(json); // Initialize filtered products
    } catch (err: any) {
      setError(err.message);
      console.error(err);
    }
  };

  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(term)
      )
    );
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="flex-[2] p-4">
      <h1 className="text-lg font-bold mb-4">Product Editor</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={handleSearch}
        className="border border-gray-300 rounded-md p-2 w-full mb-4"
      />

      {/* Error Message */}
      {error && <div className="text-red-500 mb-4">Error: {error}</div>}

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id} // Ensure unique key
            className="border rounded-md p-4 shadow-md flex flex-col items-center"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-32 h-32 object-cover mb-2"
            />
            <h2 className="text-sm font-bold">{product.name}</h2>
            <h3 className="text-xs text-gray-500">{product.category}</h3>
            {/* Render each description with unique keys */}
            <p className="text-sm">
              {product.description.map((desc, index) => (
                <span key={`${product.id}-${index}`}>{desc}</span>
              ))}
            </p>
            <h4 className="text-green-500 font-bold">${product.price}</h4>
            <button
              className="mt-2 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
              onClick={() => alert(`Edit product: ${product.name}`)}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
