import { Product, ProductsResponse, Category } from '../types/product';

const BASE_URL = 'https://dummyjson.com';

export const fetchProducts = async (
  limit: number = 20,
  skip: number = 0
): Promise<ProductsResponse> => {
  const response = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
};

export const fetchProduct = async (id: number): Promise<Product> => {
  const response = await fetch(`${BASE_URL}/products/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }

  return response.json();
};

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${BASE_URL}/products/categories`);

  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }

  const categories: string[] = await response.json();

  // ✅ Add "All Categories" at the beginning
  return ['All Categories', ...categories];
};

export const fetchProductsByCategory = async (
  category: string,
  limit: number = 20,
  skip: number = 0
): Promise<ProductsResponse> => {
  // ✅ If "All Categories" is selected, fetch all products
  if (category === '' || category === 'All Categories') {
    return fetchProducts(limit, skip);
  }

  const response = await fetch(
    `${BASE_URL}/products/category/${category}?limit=${limit}&skip=${skip}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch products by category');
  }

  return response.json();
};
