'use client'
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import { useState } from "react";
// import Footer from "./components/Footer";
import { Bebas_Neue, Inter } from 'next/font/google'


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
      <body
      >

        <Header open={open} isOpen={isOpen} />
        {isOpen && <div className="bg-red-600 w-[100%]   lg:hidden  h-[100vh] right-0 absolute top-[50px]     ">
          <ul className="flex  w-full flex-col items-center justify-center">
            <li>home</li>
            <li>about</li>
            <li>service</li>

            <li>products</li>
            <li>drinks</li>
            <li>contact</li>
            <li onClick={() => { setIsOpen(false) }}>X</li>

          </ul>
        </div>}
        {children}
        {/* <Footer/> */}
      </body>
    </html>
  );
}
