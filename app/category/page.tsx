import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { productType } from '../components/products/ProductCardd';

export default function CategoryPage() {
    const [products, setProducts] = useState<productType[]>([]);
    const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();
  const { category } = router.query; // Get the dynamic category from the URL

  useEffect(() => {
    if (category) {
      // Only fetch data after the `category` is available
      axios
        .get(`http://localhost:3001/products?category=${category}`)
        .then((response) => {
          setProducts(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching products:', err);
        //   setError('Failed to load products.');
          setLoading(false);
        });
    }
  }, [category]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>კატეგორია: {category}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded shadow">
            <img
              className="w-full h-40 object-cover rounded mb-2"
              src={product.image}
              alt={product.name}
            />
            <h2 className="text-lg font-bold">{product.name}</h2>
            <p className="text-gray-700">{product.description}</p>
            <p className="font-bold">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
