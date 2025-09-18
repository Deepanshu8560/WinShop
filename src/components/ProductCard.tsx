import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  index: number;
  viewMode: 'grid' | 'list'; 
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, index, viewMode }) => {
  const isList = viewMode === 'list';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
      }}
      className={`bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300 
        ${isList ? 'flex h-48' : 'flex flex-col'}`}
      onClick={() => onClick(product)}
    >
      {/* Thumbnail */}
      <div className={`relative overflow-hidden ${isList ? 'w-1/3' : 'w-full'}`}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className={`object-cover transition-transform duration-500 group-hover:scale-110 
            ${isList ? 'h-full w-full' : 'w-full h-48'}`}
        />
        {product.discountPercentage > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            -{Math.round(product.discountPercentage)}%
          </div>
        )}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1 }}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg"
        >
          <ShoppingCart className="w-4 h-4 text-gray-700" />
        </motion.div>
      </div>

      {/* Details */}
      <div className={`p-6 flex flex-col justify-between ${isList ? 'w-2/3' : ''}`}>
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {product.title}
          </h3>
        </div>

        {/* Description: show more in list mode */}
        <p className={`text-sm text-gray-600 mb-3 ${isList ? 'line-clamp-3' : 'line-clamp-2'}`}>
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900">${product.price}</span>
              {product.discountPercentage > 0 && (
                <span className="text-sm text-gray-500 line-through">
                  ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-xs text-gray-500 capitalize">{product.brand}</span>
          </div>

          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-700 font-medium">{product.rating}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
