'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  name: string;
  description: string;
  price: number;
  image: string;
}

function App({ id }: { id: string | string[] | undefined }) {
  const [product, setProduct] = useState<Product>({
    name: '',
    description: '',
    price: 0,
    image: 'https://metalgroup.ge/public/uploads/all/sy58bA6BEf6UyKmiauOM5JDYlZBoarNhpJy0lAS7.jpg'
  });

  useEffect(() => {
    console.log(id)
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`https://trulaila-api-production.up.railway.app/products/${id}`);
          const data: Product = await response.json();
          setProduct({
            name: data.name || '', // Default empty string if undefined
            description: data.description || '', // Default empty string if undefined
            price: data.price || 0, // Default to 0 if undefined
            image: data.image || 'https://metalgroup.ge/public/uploads/all/sy58bA6BEf6UyKmiauOM5JDYlZBoarNhpJy0lAS7.jpg', // Default image URL if undefined
          });
        } catch (error) {
          // console.log(error)
        }
      };

      fetchProduct();
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    const token = localStorage.getItem('token');
    console.log(token)
    e.preventDefault();
    if (!token) {
      console.error('No token found');
      return;
    }

    try {

      const response = await axios.patch(
        `https://trulaila-api-production.up.railway.app/products/${id}`,
        {
          name: product.name,
          description: product.description,
          image: product.image,
          price: product.price
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      );
      console.log('Product updated successfully:', response.data);
    } catch (error) {
      // console.error('Error saving product:', error);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">პროდუქტის რედაქტირება</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                სათაური
              </label>
              <input
                type="text"
                name="name"
                value={product.name}
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
                name="image"
                value={product.image}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              რედაქტირება
            </button>
          </form>
        </div>

        <div className="flex items-start justify-center pt-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-sm w-full">
            <div className="relative pb-[100%]">
              <img
                src={product?.image}
                alt={product?.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="p-4">

              <h3 className="text-xl font-bold mb-2">{product.name}</h3>
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
