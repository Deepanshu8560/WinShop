import { Category } from '../types/product';
import { useState, useEffect } from 'react';
import { fetchCategories } from '../utils/api';

export const useCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      
      try {
        setLoading(true);
        setError(null);
        const data = await fetchCategories();
        
       setCategories(
          data
            .filter((category: Category) => typeof category.name === "string")
            .map((category: Category) => category.name)
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);
  
  return { categories, loading, error };

};

