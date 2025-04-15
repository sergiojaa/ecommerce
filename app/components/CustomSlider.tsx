'use client'
import React, { useState, useEffect, useRef } from 'react';
import ProductCard from "./products/ProductCard";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Badge } from './Badge';
import { Button } from './Button';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

interface Product {
  _id: string;
  image: string;
  name: string;
  description: string;
  price: string;
  category: string;
}

export default function CustomSlider() {
  const router = useRouter()
  const sliderRef = useRef<Slider | null>(null)

  const [loadingProduct, setLoadingProduct] = useState<string | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    axios
      .get("http://localhost:3001/products")
      .then((res) => {
        setProducts(res.data.products)
        setError(false)
        console.log(loadingProduct)
      })
      .catch((err) => {
        console.error("Error fetching products:", err)
        setError(true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const addToCart = (id: string) => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }

    setLoadingProduct(id)
    axios
      .post(
        "http://localhost:3001/cart/add-to-cart",
        { productId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        console.log("Product added to cart:", res.data)
      })
      .catch((err) => {
        console.error("Error adding product to cart:", err)
      })
      .finally(() => {
        setLoadingProduct(null)
      })
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev()
    }
  }

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext()
    }
  }

  return (
    <div
      className="py-12 cursor-pointer px-4 md:px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
          {error && (
            <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-300">
              Using demo products
            </Badge>
          )}
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10"
              onClick={handlePrev}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10"
              onClick={handleNext}
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="relative">
            <Slider ref={sliderRef} {...settings} className="product-slider">
              {products.map((product) => (
                <div key={product._id} className="px-2">

                  <ProductCard product={product} addToCart={addToCart} isLoading={isLoading} />
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </div>
  )
}