'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const images = [
    '/image3.jpg',
    '/image1.jpg',
    '/image4.jpg',
    '/image5.jpg',
    '/image6.jpg',
    '/image7.jpg'
];

export default function ImageSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    return (
        <div className="w-full  flex justify-center items-center">
            <div className="relative w-full h-[600px]">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <Image
                            src={image}
                            alt={`image-${index + 1}`}
                            width={1920}
                            height={600}
                            className="w-full h-full object-cover"
                        />
                        {/* Black Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                    </div>
                ))}
                {/* Text Overlay */}
                <div className="relative w-full h-[600px] flex flex-col justify-center gap-7 items-start  md:ml-10 xl:ml-16 ml-5">
                    <h1 className="font-bold pr-10 text-start text-white text-2xl w-full max-w-[580px]">
                        ყველაფერი, რაც ელექტროენერგიისთვის გჭირდება
                    </h1>

                    <h1 className="text-white text-start hidden md:block  text-xl w-full max-w-[580px]">
                        აღმოაჩინეთ ელექტრომომარაგების ფართო არჩევანი და თქვენთვის შესაფერისი გადაწყვეტილებები, რომლებიც სრულად დააკმაყოფილებს თქვენს მოთხოვნებს.
                    </h1>

                    <button className="text-black border text-md bg-white rounded-full px-5 py-3 w-auto max-w-[180px]">
                        შეიძინე ახლა
                    </button>
                </div>


            </div>
        </div>
    );
}
