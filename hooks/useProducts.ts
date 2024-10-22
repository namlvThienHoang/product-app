'use client'
import useSWR from 'swr';
import { productService } from '../services/productService';
import { ProductResponse } from '@/types/product';  // Đảm bảo import đúng kiểu dữ liệu

export const useProducts = () => {
  const { data, error } = useSWR<ProductResponse>('products', () => productService.getProducts());

  return {
    products: data?.products || [], 
    isLoading: !error && !data,
    isError: !!error,
  };
};
