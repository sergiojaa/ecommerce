'use client'
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import { useState } from "react";
// import Footer from "./components/Footer";
import { Bebas_Neue, Inter } from 'next/font/google'
import Footer from "./components/Footer";
import Link from "next/link";
export type Category = {
  name: string;
  url: string;
};
export  const data = [
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(false)
  const open = () => {
    setIsOpen(!isOpen)
    console.log(isOpen)
  }

  return (
    <html lang="en" >
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Istok+Web:ital,wght@0,400;0,700;1,400;1,700&display=swap');

        </style>
      </head>
      <body className={`${isOpen && 'overflow-hidden'}`}
      >

        <Header open={open} isOpen={isOpen} />
        {isOpen && (
  <div className="bg-white top-[50px] w-full mt-6 text-black z-10 lg:hidden h-[100vh] right-0 fixed">
    <ul className="flex gap-1 font-bold cursor-pointer w-full flex-col items-start justify-center">
      {data.map((category) => (
        <Link key={category.name} href={category.url}>
          <li
            className="border-b  w-[1000%]  p-2 box-border"
            key={category.name}
          >
            {category.name}
          </li>
        </Link>
      ))}
    </ul>
  </div>
)}

        {children}
        <Footer />
      </body>
    </html>
  );
}
