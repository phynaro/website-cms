import { motion } from 'framer-motion'

const ProductFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-gray-50 rounded-lg p-6"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">หมวดหมู่สินค้า</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              selectedCategory === category.id
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600 border border-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </motion.div>
  )
}

export default ProductFilter
