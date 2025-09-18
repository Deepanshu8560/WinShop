import { useState, useEffect } from 'react';
import { Product, ProductsResponse, FilterState } from '../types/product';
import { fetchProducts, fetchProductsByCategory } from '../utils/api';

export const useProducts = (limit: number = 20) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    sortBy: 'title-asc'
  });

  const loadProducts = async (skipCount: number = 0, category: string = '') => {
    try {
      setLoading(true);
      setError(null);
      
      let response: ProductsResponse;
      
      if (category) {
        response = await fetchProductsByCategory(category, limit, skipCount);
      } else {
        response = await fetchProducts(limit, skipCount);
      }
      
      setProducts(response.products);
      setTotal(response.total);
      setSkip(skipCount);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setSkip(0);
  };

  const sortProducts = (products: Product[], sortBy: string) => {
    return [...products].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
  };

  useEffect(() => {
    loadProducts(skip, filters.category);
  }, [skip, filters.category]);

  const sortedProducts = sortProducts(products, filters.sortBy);

  return {
    products: sortedProducts,
    loading,
    error,
    total,
    skip,
    limit,
    filters,
    updateFilters,
    setSkip,
    refetch: () => loadProducts(skip, filters.category)
  };
};