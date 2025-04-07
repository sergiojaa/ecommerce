'use client'
import React, { useState } from 'react';

interface Product {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

function App() {
  const [product, setProduct] = useState<Product>({
    title: 'გოფრე',
    description: 'სერი320ბიტონიაარაალებადი',
    price: 0.8,
    imageUrl: 'https://example.com/product-image.jpg', // Replace with actual image URL
    category: 'სამშენტალო მოწყობილობები'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Saving product:', product);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Edit Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">პროდუქტის რედაქტირება</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                სათაური
              </label>
              <input
                type="text"
                name="title"
                value={product.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                აღწერა
              </label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ფასი
              </label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleInputChange}
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                სურათის URL
              </label>
              <input
                type="text"
                name="imageUrl"
                value={product.imageUrl}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                კატეგორია
              </label>
              <input
                type="text"
                name="category"
                value={product.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              შენახვა
            </button>
          </form>
        </div>

        {/* Preview Card */}
        <div className="flex items-start justify-center pt-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-sm w-full">
            <div className="relative pb-[100%]">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="bg-red-700 text-white px-3 py-1 rounded-md text-sm inline-block mb-2">
                {product.category}
              </div>
              <h3 className="text-xl font-bold mb-2">{product.title}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">${product.price}</span>
                <button className="bg-red-700 text-white px-6 py-2 rounded-md hover:bg-red-800 transition-colors">
                  კალათაში დამატება
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;