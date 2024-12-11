"use client";
import { useEffect, useState } from "react";
import axios from "axios"
import { useRouter } from "next/navigation";

type ProductType = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

export default function Product({ params }: { params: Promise<{ id: string }> }) {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [loadingProduct, setLoadingProduct] = useState<string | null>(null); // Track the loading product

  const router = useRouter()

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

  const addToCart = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login'); // Redirect to login if no token
      return;
    }

    setLoadingProduct(id); // Start loading for the selected product

    const MIN_LOADING_TIME = 1000; // Minimum loading time in milliseconds
    const startTime = Date.now();

    axios.post(
      "http://localhost:3001/products/add-to-cart",
      { productId: id }, // The product ID to add to the cart
      {
        headers: {
          Authorization: `Bearer ${token}`, // Bearer token
        },
      }
    )
      .then((res) => {
        console.log("Product added to cart:", res.data);
      })
      .catch((err) => {
        console.error("Error adding product to cart:", err);
      })
      .finally(() => {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);
        setTimeout(() => setLoadingProduct(null), remainingTime); // Ensure at least MIN_LOADING_TIME passes
      });
  };

  return (
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
            <button
              onClick={addToCart}
              disabled={loadingProduct === product._id}
              className={`${loadingProduct === product._id ? 'bg-blue-300' : 'bg-blue-500'} px-3 py-4 rounded-md text-sm text-white w-full`}
            >
              {loadingProduct === product._id ? 'იტვირთება...' : 'კალათაში დამატება'}
            </button>
            <button className="bg-black px-3 py-4 rounded-md text-sm text-white w-full">ყიდვა</button>
          </div>
        </div>

      </div>
    </div>
  );
}
