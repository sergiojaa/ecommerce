"use client";
import { useEffect, useState } from "react";

type ProductType = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

export default function Product({ params }: { params: Promise<{ id: string }> }) {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    // Unwrap the promise
    params.then((resolvedParams) => {
      setId(resolvedParams.id);
    });
  }, [params]);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data))
        .catch((err) => console.error("Error fetching product:", err));
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img src={product.image} alt={product.name} />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>${product.price.toFixed(2)}</p>
    </div>
  );
}
