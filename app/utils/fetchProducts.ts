'use client';
import axios from 'axios';

export type FetchProductsParams = {
    page?: number;
    category?: string;
    maxPrice?: number;
};

export const fetchProducts = async (params: FetchProductsParams) => {
    try {
        const response = await axios.get('https://trulaila-api-production.up.railway.app/products', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return { products: [], totalProducts: 0, highestPrice: 1000 };
    }
};