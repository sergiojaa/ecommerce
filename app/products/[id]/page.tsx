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
<<<<<<< Updated upstream
    <div className="w-full max-w-5xl mx-auto text-2xl font-bold py-12 flex flex-col px-5 md:px-0">
      <h1 className="md:block hidden text-left ml-4">{product.name}</h1>

      <div className="flex flex-col md:flex-row mt-12 gap-8">

        {/* Image */}
        <div className="w-full md:flex-[2] max-w-xs mx-auto md:mx-0">
          <img
            className="w-full h-auto object-contain"
            src={product.image}
            alt={product.name}
          />
        </div>

        <h1 className="md:hidden block text-left">{product.name}</h1>

        {/* Description List */}
        <div className="w-full flex-[3] xl:flex-[5] flex flex-col md:items-center">
          <ul className="md:list-disc font-normal space-y-2 ">
            <li><p className="text-sm">{product.description}</p></li>
            <li><p className="text-sm">ალკოჰოლის შემცველობა: 40%</p></li>
            <li><p className="text-sm">ქვეყანა: შვედეთი</p></li>
            <li><p className="text-sm">რეგიონი: აჰუსი</p></li>
            <li><p className="text-sm">არომატი: მშრალი ხილი.</p></li>
            <li><p className="text-sm">გემო: დაბალანსებული, სასიამოვნო.</p></li>
            <li><p className="text-sm">ბოთლის ტიპი: შუშა.</p></li>
            <li><p className="text-sm">ფერი: გამჭვირვალე.</p></li>
            <li><p className="text-sm">მოცულობა: 700 მლ.</p></li>
          </ul>
        </div>

        {/* Price and Buttons */}
        <div className="w-full md:flex-[3] flex flex-col justify-between px-4 py-6 rounded-xl shadow-lg border border-gray-200 h-[270px]">
          <h1 className="font-bold text-2xl">${product.price.toFixed(2)}</h1>
          <p className="font-normal text-sm text-gray-500 mt-2">უფასო მიწოდება მაზეგ</p>
          <div className="flex flex-col gap-3">
            <button className="bg-blue-500 px-3 py-4 rounded-md text-sm text-white w-full">კალათაში დამატება</button>
            <button className="bg-black px-3 py-4 rounded-md text-sm text-white w-full">ყიდვა</button>
          </div>
        </div>

      </div>
=======
    <div>
      <img className="w-[300px]" src={product.image} alt={product.name} />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>${product.price.toFixed(2)}</p>
>>>>>>> Stashed changes
    </div>
  );
}
