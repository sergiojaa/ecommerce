'use client'

import React, { useState } from 'react';

export default function Page() {
  const [image, setImage] = useState<File | null>(null); // Store the image as a File
  const [productName, setProductName] = useState<string>('');
  const [productDescription, setProductDescription] = useState<string>('');
  const [productPrice, setProductPrice] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file); // Store the selected file
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Get token from localStorage
    const token = localStorage.getItem('token'); // Adjust the key if it's different

    // Prepare FormData
    const formData = new FormData();
    formData.append('name', productName);
    formData.append('description', productDescription);
    formData.append('price', productPrice);

    // If there is an image, append it to FormData with the name 'singleFile'
    if (image) {
      formData.append('singleFile', image); // Append the file to FormData with the field name 'singleFile'
    }

    try {
      const response = await fetch('http://localhost:3001/products/create', {
        method: 'POST',
        body: formData, // Send the FormData
        headers: {
          // Send the Bearer token if it exists
          Authorization: token ? `Bearer ${token}` : '', // If token exists, add it to the header
        },
      });

      if (response.ok) {
        console.log('Product added successfully');
        // Optionally, clear the form
        setProductName('');
        setProductDescription('');
        setProductPrice('');
        setImage(null); // Clear the selected image
      } else {
        console.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <div>
        <form className="flex items-center mt-6 justify-center gap-3 flex-col" onSubmit={handleSubmit}>
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
    </div>
  );
}
