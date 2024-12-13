import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import CategoryCard from './CategoryCard';

const data = [
    { name: "ყველა კატეგორია", url: "/categories" },
    { name: "ავტომატები", url: "/categories/circuit-breakers" },
    { name: "ელ. მაგნიტური გამშვი", url: "/categories/electric-magnetic-starter" },
    { name: "ელ. სამონტაჟო ყუთები", url: "/categories/electrical-installation-boxes" },
    { name: "ნათურები", url: "/categories/lightbulbs" },
    { name: "რელე", url: "/categories/relays" },
    { name: "სადენები", url: "/categories/wires" },
    { name: "ტრანსფორმატორები", url: "/categories/transformers" },
    { name: "ფანრები", url: "/categories/flashlights" },
    { name: "ქუჩის სანათები", url: "/categories/street-lights" },
    { name: "ჩამრთველები და როზეტები", url: "/categories/switches-and-sockets" },
    { name: "ძაბვის სტაბილიზატორი", url: "/categories/voltage-stabilizer" },
];


export default function CategorySlider() {
    return (
        <Swiper
            slidesPerView={7}
            modules={[Navigation]} // Pass the Navigation module here
            spaceBetween={100} // Adjust space between slides
            navigation // Enable navigation buttons
            breakpoints={{
                640: {
                    slidesPerView: 2, // On small screens, show 2 slides
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3, // On medium screens, show 3 slides
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 5, // On larger screens, show 5 slides
                    spaceBetween: 40,
                },
            }}
            className="mySwiper" // Add a class for custom styling
        >
            {data.map((category) => (
                <SwiperSlide key={category.name}>
                    <CategoryCard name={category.name} link={category.url} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}