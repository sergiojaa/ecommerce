'use client';
import { useEffect, useState } from 'react';
import SearchBar from '@/app/components/search/Searchbar';
import Filters from '@/app/components/search/Filters';
import SortDropdown from '@/app/components/search/SortDropdown';
import ProductGrid from '@/app/components/search/ProductGrid';
import Pagination from '@/app/components/search/Pagination';
import { useSearchParams } from 'next/navigation';
import { fetchProducts, FetchProductsParams } from '@/app/utils/fetchProducts';
import axios from 'axios';

type Category = {
  _id: string;
  name: string;
  subcategories: string[];
};

type Product = {
  _id: string;
  name: string;
  description: string[];
  price: number | string;
  image: string;
  category: string;
  types: { type: string; price: string }[];
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [highestPrice, setHighestPrice] = useState<number>(1000);
  const [maxPrice, setMaxPrice] = useState<number>(1000);

  useEffect(() => {
    fetchCategories();
    getQueriesOnLoad();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [currentPage, maxPrice]);

  useEffect(() => {
    if (categories.length > 0) {
      fetchOnCategoryChange();
    }
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:3001/products/categories')
      setCategories(res.data.categories || []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchOnCategoryChange = async () => {
    if (!selectedCategory) return;

    const category = categories.find((cat) => cat._id === selectedCategory);
    const params: FetchProductsParams = { page: currentPage, category: category?.name };

    try {
      const res = await fetchProducts(params);

      console.log('API Response:', res);
      console.log('New Highest Price:', res.highestPrice);

      setProducts(res.products);
      setTotalPages(Math.ceil(res.totalProducts / 12));

      if (res.highestPrice) {
        setHighestPrice(res.highestPrice);
        setMaxPrice(res.highestPrice);
      }
    } catch (error) {
      console.error(error);
    }
  };



  const loadProducts = async () => {
    const params: FetchProductsParams = { page: currentPage, maxPrice };
    const res = await fetchProducts(params);
    setProducts(res.products);
    setTotalPages(Math.ceil(res.totalProducts / 12));
  };

  const getQueriesOnLoad = () => {
    const page = Number(searchParams.get('page')) || 1;
    setCurrentPage(page);

    const categoryQuery = searchParams.get('category');
    if (categoryQuery) {
      const foundCategory = categories.find((cat) => cat._id === categoryQuery);
      setSelectedCategory(foundCategory ? foundCategory._id : null);
    }

    const maxPriceQuery = Number(searchParams.get('maxPrice'));
    if (maxPriceQuery) setMaxPrice(maxPriceQuery);
  };

  return (
    <div className='min-h-screen bg-background font-sans'>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-4xl font-bold mb-8 text-text-primary'>Discover Products</h1>
        <SearchBar />
        <div className='flex flex-col lg:flex-row gap-8'>
          <aside className='w-full lg:w-1/3'>
            <Filters
              setCurrentPage={setCurrentPage}
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              highestPrice={highestPrice}
              setHighestPrice={setHighestPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
            />
          </aside>
          <main className='w-full lg:w-3/4'>
            <div className='flex justify-end mb-6'>
              <SortDropdown />
            </div>
            <ProductGrid products={products} setProducts={setProducts} currentPage={currentPage} />
            <div className='mt-12'>
              <Pagination setCurrentPage={setCurrentPage} totalPages={totalPages} currentPage={currentPage} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
