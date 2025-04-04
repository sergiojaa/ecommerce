'use client'
import "./globals.css";
import Header from "./components/Header";
import { useState } from "react";
// import Footer from "./components/Footer";
import Footer from "./components/Footer";
import MobileMenu from "./components/MobileMenu";
export type Category = {
  name: string;
  url: string;
  id: number;
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(false)
  const open = () => {
    setIsOpen(!isOpen)
  }

  return (
    <html lang="en" >
      <head>
        <title>Electro-hub</title>
        <link rel="icon" href="/logo.png" />

        <style>
          @import url('https://fonts.googleapis.com/css2?family=Istok+Web:ital,wght@0,400;0,700;1,400;1,700&display=swap');

        </style>
      </head>
      <body className={`${isOpen && 'overflow-hidden'}`}
      >

        <Header open={open} isOpen={isOpen} />

        {isOpen && <MobileMenu open={open} />}

        {children}
        <Footer />
      </body>
    </html>
  );
}
