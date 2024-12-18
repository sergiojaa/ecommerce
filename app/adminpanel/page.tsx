'use client'
import React, { useState } from 'react';
import axios from 'axios';
import CategoryDropDownMenu from '../components/CategoryDropDownMenu';

export default function Page() {
  const [image, setImage] = useState<File | null>(null); // Store the image as a File
  const [productName, setProductName] = useState<string>('');
  const [productDescription, setProductDescription] = useState<string>('');
  const [productPrice, setProductPrice] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file); // Store the selected file
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = localStorage.getItem('token');

    // Create FormData object
    const formData = new FormData();
    if (image) {
      formData.append('singleFile', image); // Add the file to FormData
    }
    formData.append('name', productName);
    formData.append('description', productDescription);
    formData.append('price', productPrice);
    formData.append('category', selectedCategory || ''); // Use selectedCategory from the dropdown

    try {
      // Send a POST request to the backend with FormData
      const response = await axios.post('http://localhost:3001/products/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important to set this for file uploads
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('File uploaded successfully', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <form className="flex items-center mt-6 justify-center gap-3 flex-col" onSubmit={handleSubmit}>
        {/* Pass setSelectedCategory as a prop to CategoryDropDownMenu */}
        <CategoryDropDownMenu 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory} // Correctly passing setSelectedCategory here
        />

        <label htmlFor="product-name">პროდუქციის სახელი</label>
        <input
          id="product-name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="შეიყვანე პროდუქციის სახელი"
          className="border"
          type="text"
        />

        <label htmlFor="product-description">პროდუქციის აღწერა</label>
        <textarea
          id="product-description"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          className="border w-[300px] h-[100px]"
          placeholder="ჩაწერე"
        />

        <label htmlFor="product-price">ფასი</label>
        <input
          id="product-price"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          placeholder="პროდუქციის ფასი"
          className="border"
          type="text"
        />

        <input
          id="file-upload"
          className="hidden"
          type="file"
          onChange={handleFileChange}
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer border bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          ფაილის ატვირთვა
        </label>

        {image && (
          <div className="mt-4">
            <h3 className="text-center">ატვირთული ფოტო</h3>
            <img
              src={URL.createObjectURL(image)} // Display the image as a preview
              alt="Uploaded"
              className="w-[300px] h-auto border rounded shadow-md"
            />
            <button
              type="button"
              onClick={() => setImage(null)} // Clear the image preview
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              წაშლა
            </button>
          </div>
        )}

        <button type="submit" className="border w-[200px] text-white bg-red-400">
          დამატება
        </button>
      </form>
    </div>
  );
}
