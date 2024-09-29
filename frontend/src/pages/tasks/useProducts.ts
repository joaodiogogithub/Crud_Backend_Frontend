import { useState, useEffect } from 'react';
import api from '@/api/instance';

interface Products {
  id: number;
  name: string;
  desc: string;
  price: number;
}

export function useProducts() {
  const [products, setProducts] = useState<Products[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await api.get<Products[]>('/products/');
        setProducts(response.data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return { products, isLoading, error };
}