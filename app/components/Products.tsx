'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { checkTokenValidity } from './utils/checkTokenValidity';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, } from "@fortawesome/free-solid-svg-icons";
type ProductsProps = {
  cartCount: number;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
};
export default function Products() {
  const router = useRouter();

  const [loadingProduct, setLoadingProduct] = useState<string | null>(null); // Track the loading product
  const [products, setProducts] = useState<
    { _id: string; image: string; name: string; description: string; price: number; category: string }[]
  >([]);

  const addtocart = (id: string) => {

    const token = localStorage.getItem('token');


    if (checkTokenValidity(String(token)) !== true) {
      router.push('/login')
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
        // setCartCount((prevCount) => prevCount + 1);

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

  useEffect(() => {
    axios
      .get("http://localhost:3001/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        router.push('/login');
      });
  }, []);

  return (
    <div>
      <div className='mx-[2rem] lg:mx-[6rem]'>

        <div className='flex justify-start items-center mt-[2rem]'>
          <h1 className='text-[20px] text-black'>ახალი პროდუქცია</h1>
        </div>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30} // Space between cards
          slidesPerView={5} // Show 5 slides by default
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            1024: { slidesPerView: 5 }, // Desktop: 5 cards
            768: { slidesPerView: 2 }, // Tablet: 3 cards
            640: { slidesPerView: 1 }, // Mobile: 2 cards
            0: { slidesPerView: 1 }
          }}
          className="my-8 "
        >
          {products.slice(3, 13).map((product) => (
            <SwiperSlide key={product._id}>

              <div className="border p-6 rounded shadow flex flex-col justify-between">

                <Link href={`/products/${product._id}`}>

                  <img
                    className="w-full h-[200px] object-cover rounded mb-4" // Bigger image
                    src={product.image}
                    alt={product.name}
                  />
                  <h2 className="font-bold text-[18px] mt-2">{product.name}</h2> {/* Larger font */}
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>
                </Link>
                <div className="flex items-center justify-between mt-4">
                  <p className="font-semibold text-lg">${product.price}</p> {/* Larger price */}
                  <button
                    onClick={() => addtocart(product._id)}
                    className={`px-4 py-2 rounded ${loadingProduct === product._id ? 'bg-blue-300' : 'bg-blue-500'
                      }`}
                    disabled={loadingProduct === product._id}
                  >
                    <FontAwesomeIcon
                      icon={faCartShopping}
                      className="text-white text-xl cursor-pointer"
                    />
                    {loadingProduct === product._id && 'Adding...'}
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>

      <div className="lg:mx-[6rem] mx-[2rem] grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 font-[Bebas Neue]">
        {products.map((product) => (
          <div key={product._id} className=" border  p-4 rounded shadow flex flex-col justify-between">
            <Link href={`/products/${product._id}`}>
              <img
                className="w-full h-[150px] object-cover rounded"
                src={product.image}
                alt={product.name}
              />
              <h2 className="font-bold text-[15px] mt-[0.5rem]">{product.name}</h2> {/* Truncates long names */}
              <p className="text-sm text-gray-600 mt-[0.5rem] line-clamp-2">{product.description}</p> {/* Limits description */}
            </Link>
            <div className="flex items-center justify-between  ">
              <p className="font-semibold">${product.price}</p>
              <button
                onClick={() => addtocart(product._id)}
                className={`px-4 py-2 rounded ${loadingProduct === product._id ? 'bg-blue-300' : 'bg-blue-500'
                  }`}
                disabled={loadingProduct === product._id}
              >
                <Link href={"/cart"}>
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    className="text-white text-xl cursor-pointer"
                  />
                </Link>
                {loadingProduct === product._id && 'Adding...'}
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>

  );
}
