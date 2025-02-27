'use client'
import Filters from '@/app/components/search/Filters'
import Pagination from '@/app/components/search/Pagination'
import ProductGrid from '@/app/components/search/ProductGrid'
import SearchBar from '@/app/components/search/Searchbar'
import SortDropdown from '@/app/components/search/SortDropdown'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'


type Category = {
    _id: string;
    name: string;
    subcategories: string[]
}

type Types = {
    type: string;
    price: string;
};

type Product = {
    _id: string;
    category: string;
    name: string;
    description: string[];
    price: number | string;
    image: string;
    types: Types[];
};

export default function page() {
    const searchParams = useSearchParams()

    const [categories, setCategories] = useState<Category[]>([])
    const [products, setProducts] = useState<Product[]>([])
    const [highestPrice, setHighestPrice] = useState(100)

    const [maxPrice, setMaxPrice] = useState('')
    const [category, setCategory] = useState('')

    useEffect(() => {
        getCategories()
        getProducts()
    }, [])

    useEffect(() => {
        const maxPriceQuery = searchParams.get('maxPrice') || ''
        setMaxPrice(maxPriceQuery)

        const categoryQuery = searchParams.get('category') || ''
        if (categories.find(cat => cat.name === categoryQuery)) {
            setCategory(categoryQuery)
        }

    }, [searchParams])

    const getCategories = async () => {
        try {
            const res = await axios.get('http://localhost:3001/products/categories')
            setCategories(res.data.categories || []);
        } catch (error) {
            console.error(error);
        }
    }

    const getProducts = async () => {
        const response = await axios.get('http://localhost:3001/products');
        setProducts(response.data.products)
        setHighestPrice(response.data.highestPrice)
    }

    return (
        <div className='min-h-screen bg-background font-sans'>
            <div className='container mx-auto px-4 py-8'>
                <h1 className='text-4xl font-bold mb-8 text-text-primary'>Discover Products</h1>
                <SearchBar />
                <div className='flex flex-col lg:flex-row gap-8'>
                    <aside className='w-full lg:w-1/3'>
                        <Filters maxPrice={maxPrice} setMaxPrice={setMaxPrice} highestPrice={highestPrice} setCategory={setCategory} category={category} categories={categories} />
                    </aside>
                    <main className='w-full lg:w-3/4'>
                        <div className='flex justify-end mb-6'>
                            <SortDropdown />
                        </div>
                        <ProductGrid products={products} />
                        <div className='mt-12'>
                            {/* <Pagination setCurrentPage={setCurrentPage} totalPages={totalPages} currentPage={currentPage} /> */}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}
