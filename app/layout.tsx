'use client'
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import { useState } from "react";
// import Footer from "./components/Footer";
import { Bebas_Neue, Inter } from 'next/font/google'
import Footer from "./components/Footer";
const data = [
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
        {isOpen && <div className="bg-red-600 w-[100%] z-10  lg:hidden  h-[100vh] right-0 fixed top-[50px]     ">
          <ul className="flex  w-full flex-col items-center justify-center">
            {data.map((category)=> (
              <li key={category.name}>{category.name}</li>
            ))}
            <li onClick={() => { setIsOpen(false) }}>X</li>

          </ul>
        </div>}
        {children}
        <Footer />
      </body>
    </html>
  );
}
