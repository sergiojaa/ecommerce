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
import { checkTokenValidity } from '../utils/checkTokenValidity';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, } from "@fortawesome/free-solid-svg-icons";
import ProductCard from './ProductCard';


export default function Products() {
  const router = useRouter();

  const [loadingProduct, setLoadingProduct] = useState<string | null>(null); // Track the loading product
  const [products, setProducts] = useState<
    { _id: string; image: string; name: string; description: string; price: string; category: string }[]
  >([]);
  const [tokenValidity, setTokenValidity] = useState(false)


  useEffect(() => {
    const token = localStorage.getItem('token');

    checkTokenValidity(String(token)).then((isValid) => {
      if (!isValid) {
        setTokenValidity(false)
      } else {
        setTokenValidity(true)
      }
    });

  }, [])

  const addtocart = (id: string) => {

    const token = localStorage.getItem('token');


    if (!tokenValidity) {
      router.push('/login')
    }

    setLoadingProduct(id); // Start loading for the selected product

    const MIN_LOADING_TIME = 1000; // Minimum loading time in milliseconds
    const startTime = Date.now();

    axios.post(
      "http://localhost:3001/cart/add-to-cart",
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
    <div className='mt-[50px]'>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mx-[2rem] lg:mx-[6rem] font-[Bebas Neue]"

      >
        {products.slice(15, 23).map((product) => (
          <ProductCard key={product._id} product={product} loadingProduct={loadingProduct} addtocart={addtocart} />
        ))}
      </div>

    </div>

  );
}
