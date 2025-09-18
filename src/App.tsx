import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { LoadingGrid } from './components/LoadingCard';
import { ErrorState } from './components/ErrorState';
import { Pagination } from './components/Pagination';
import { useProducts } from './hooks/useProducts';
import { useCategories } from './hooks/useCategories';
import { Product } from './types/product';

function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { 
    products, 
    loading, 
    error, 
    total, 
    skip, 
    limit, 
    filters, 
    updateFilters, 
    setSkip, 
    refetch 
  } = useProducts(20);
  
  const { categories, loading: categoriesLoading } = useCategories();

  // 🔹 New state for grid/list toggle
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const currentPage = Math.floor(skip / limit) + 1;
  const totalPages = Math.ceil(total / limit);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handlePageChange = (page: number) => {
    const newSkip = (page - 1) * limit;
    setSkip(newSkip);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ErrorState message={error} onRetry={refetch} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Amazing Products
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse through our carefully curated collection of premium products from top brands worldwide
          </p>
        </motion.div>

        {/* 🔹 Pass viewMode + setViewMode to FilterBar */}
        <FilterBar
          categories={categories}
          filters={filters}
          onFiltersChange={updateFilters}
          totalProducts={total}
          isLoading={loading || categoriesLoading}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        {loading ? (
          <LoadingGrid />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className={
              viewMode === 'grid'
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "flex flex-col gap-4"
            }
          >
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={handleProductClick}
                index={index}
                viewMode={viewMode}
              />
            ))}
          </motion.div>
        )}

        {products.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center py-16"
          >
            <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
              <span className="text-4xl">🔍</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Try adjusting your filters or browse all categories to find what you're looking for.
            </p>
          </motion.div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          isLoading={loading}
        />
      </main>

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
