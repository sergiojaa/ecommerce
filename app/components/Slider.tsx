'use client'
import React, { useState, useEffect, useRef } from 'react';
import ProductCard from './products/ProductCard';
import { useRouter } from 'next/navigation';
import axios from 'axios';

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

    // Properly type the ref to avoid null errors
    const sliderRef = useRef<Slider | null>(null);

    useEffect(() => {
        axios
            .get('http://localhost:3001/products')
            .then((res) => setProducts(res.data))
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
        dots: false,                 // Disable default navigation dots
        infinite: true,              // Infinite scrolling
        speed: 500,                  // Transition speed
        slidesToShow: 4,             // Number of slides visible at once
        slidesToScroll: 1,           // Number of slides to scroll at a time
        responsive: [
            {
                breakpoint: 1024,        // For screens larger than 1024px
                settings: {
                    slidesToShow: 3,       // Show 3 slides
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,         // For screens larger than 768px
                settings: {
                    slidesToShow: 2,       // Show 2 slides
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,         // For screens larger than 480px
                settings: {
                    slidesToShow: 1,       // Show 1 slide
                    slidesToScroll: 1
                }
            }
        ]
    };

    const handlePrev = () => {
        // Safe access of sliderRef
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };

    const handleNext = () => {
        // Safe access of sliderRef
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };

    return (
        <div className="relative my-[30px]">
            {/* Slider Container */}
            <Slider ref={sliderRef} {...settings}>
                {products.map((product) => (
                    <ProductCard
                        key={product._id}
                        addtocart={addtocart}
                        loadingProduct={loadingProduct}
                        product={product}
                    />
                ))}
            </Slider>

            {/* Custom Navigation Buttons */}
            <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2 px-4">
                <button
                    className="prev bg-secondary text-white p-2 rounded-[50%] w-[40px] h-[40px] shadow-md focus:outline-none"
                    onClick={handlePrev}
                >
                    {'<'}
                </button>
                <button
                    className="next bg-secondary text-white p-2 rounded-[50%] w-[40px] h-[40px] shadow-md focus:outline-none"
                    onClick={handleNext}
                >
                    {'>'}
                </button>
            </div>
        </div>
    );
}
