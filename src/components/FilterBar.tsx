import React from 'react';
import { motion } from 'framer-motion';
import { Filter, ArrowUpDown, X } from 'lucide-react';
import { FilterState, SortOption } from '../types/product';

interface FilterBarProps {
  categories: string[];
  filters: FilterState;
  onFiltersChange: (filters: Partial<FilterState>) => void;
  totalProducts: number;
  isLoading: boolean;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'title-asc', label: 'Name (A-Z)' },
  { value: 'title-desc', label: 'Name (Z-A)' },
  { value: 'price-asc', label: 'Price (Low-High)' },
  { value: 'price-desc', label: 'Price (High-Low)' }
];

export const FilterBar: React.FC<FilterBarProps> = ({
  categories,
  filters,
  onFiltersChange,
  totalProducts,
  isLoading
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl shadow-lg p-6 mb-8"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <span className="font-medium text-gray-900">
            {isLoading ? 'Loading...' : `${totalProducts} products found`}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <select
              value={filters.category}
              onChange={(e) => onFiltersChange({ category: e.target.value })}
              className="appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[180px]"
            >
              {categories.map((category) => (
                <option key={category} value={category === "All Categories" ? "" : category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            {filters.category && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onFiltersChange({ category: '' })}
                className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </motion.button>
            )}
          </div>

          <div className="relative">
            <ArrowUpDown className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={filters.sortBy}
              onChange={(e) => onFiltersChange({ sortBy: e.target.value as SortOption })}
              className="appearance-none bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[180px]"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
