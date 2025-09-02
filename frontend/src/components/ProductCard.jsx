import { motion } from 'framer-motion'
import { Star, ShoppingCart, Eye } from 'lucide-react'

const ProductCard = ({ product }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      {/* Product Image */}
      <div className="aspect-video bg-gradient-to-br from-primary-100 to-blue-100 flex items-center justify-center relative overflow-hidden">
        <div className="text-center">
          <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">
              {product.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {product.name}
          </h3>
        </div>
        
        {/* Overlay with actions */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-primary-100 transition-colors duration-200">
            <Eye className="w-5 h-5 text-gray-700" />
          </button>
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-primary-100 transition-colors duration-200">
            <ShoppingCart className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
            {product.name}
          </h3>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {product.description}
        </p>

        {/* Features */}
        {product.features && product.features.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {product.features.map((feature, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-primary-600">
            {product.price}
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors duration-200 text-sm">
              รายละเอียด
            </button>
            <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 text-sm flex items-center space-x-1">
              <ShoppingCart className="w-4 h-4" />
              <span>สั่งซื้อ</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard
