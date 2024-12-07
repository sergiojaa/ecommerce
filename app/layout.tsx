'use client'
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import { useState } from "react";
// import Footer from "./components/Footer";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(false)
  const open = ()=>{
    setIsOpen(!isOpen)
    console.log(isOpen)
}
  return (
    <html lang="en">
      
      <body
      >

        <Header open={open} isOpen={isOpen} />
        {isOpen && <div className="bg-red-600 w-[500px] h-[100vh] right-0 absolute top-[50px]     ">
          <ul className="flex bg-blue-100 w-full flex-col items-end justify-end">
            <li >
              cart
            </li>
            <li>
              cart
            </li>
            <li>
              cart
            </li>
            <li>
              cart
            </li>
          </ul>
          </div>}
        {children}
        {/* <Footer/> */}
      </body>
    </html>
  );
}
