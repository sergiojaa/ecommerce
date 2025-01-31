'use client'
import React, { useState, useEffect, useRef } from 'react';
import ProductCard from './products/ProductCard';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Product {
    _id: string;
    image: string;
    name: string;
    description: string;
    price: string;
    category: string;
}

export default function CustomSlider() {
    const router = useRouter();

    const [loadingProduct, setLoadingProduct] = useState<string | null>(null);
    const [products, setProducts] = useState<Product[]>([]);

    const sliderRef = useRef<Slider | null>(null);

    useEffect(() => {
        axios
            .get('http://localhost:3001/products')
            .then((res) => setProducts(res.data.products))
            .catch((err) => console.error('Error fetching products:', err));
    }, []);

    const addtocart = (id: string) => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        setLoadingProduct(id);
        axios
            .post(
                'http://localhost:3001/cart/add-to-cart',
                { productId: id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                console.log('Product added to cart:', res.data);
            })
            .catch((err) => {
                console.error('Error adding product to cart:', err);
            })
            .finally(() => {
                setLoadingProduct(null);
            });
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const handlePrev = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };

    const handleNext = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };

    return (
        <div>
            <div className="flex justify-end pt-5 mb-[-20px]  right-0  z-10 mr-10">
                <button
                    className="prev bg-secondary text-white p-2 mr-2  cursor-pointer w-[30px] h-[40px] shadow-md focus:outline-none"
                    onClick={handlePrev}
                >
                    <FaArrowLeft />
                </button>
                <button
                    className="next bg-secondary text-white p-2  cursor-pointer w-[30px] h-[40px] shadow-md focus:outline-none"
                    onClick={handleNext}
                >
                    <FaArrowRight />
                </button>
            </div>
            <div className="relative container mx-auto my-[30px]">


                {/* Slider Container */}
                <div className="relative w-full">
                    <Slider ref={sliderRef} {...settings}>
                        {products.map((product) => (
                            <ProductCard
                                key={product._id}
                                // addtocart={addtocart}
                                loadingProduct={loadingProduct}
                                product={product}
                                setLoadingProduct={setLoadingProduct}
                            />
                        ))}
                    </Slider>
                </div>
            </div>
        </div>






    );
}
