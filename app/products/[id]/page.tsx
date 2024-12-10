"use client";

export default async function Product({ params }: { params: { id: string } }) {
  const products = await fetch(`http://localhost:3001/products/${params.id}`).then((res) => res.json());
  
  return (
    <div>
      <h1>{products.name}</h1>
      <p>{products.description}</p>
    </div>
  );
}
