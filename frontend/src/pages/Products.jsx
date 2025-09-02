import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Search, Filter } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import ProductFilter from '../components/ProductFilter'

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  // Mock products data - in real app this would come from Strapi
  const products = [
    {
      id: 1,
      name: 'เครื่องแบ่งบรรจุวัคซีนอัตโนมัติ Model A',
      category: 'vaccine-filling',
      description: 'เครื่องบรรจุวัคซีนอัตโนมัติที่มีความแม่นยำสูง พร้อมระบบควบคุมอุณหภูมิ',
      price: '฿250,000',
      image: '/api/placeholder/400/300',
      features: ['ความแม่นยำสูง', 'ระบบควบคุมอุณหภูมิ', 'ใช้งานง่าย']
    },
    {
      id: 2,
      name: 'ชุดทดสอบ COVID-19 Rapid Test',
      category: 'medical-equipment',
      description: 'ชุดทดสอบ COVID-19 แบบรวดเร็ว ผลลัพธ์ภายใน 15 นาที',
      price: '฿150',
      image: '/api/placeholder/400/300',
      features: ['ผลลัพธ์รวดเร็ว', 'ความแม่นยำสูง', 'ใช้งานง่าย']
    },
    {
      id: 3,
      name: 'สารเคมีสำหรับห้องปฏิบัติการ',
      category: 'medical-equipment',
      description: 'สารเคมีคุณภาพสูงสำหรับใช้ในห้องปฏิบัติการทางการแพทย์',
      price: '฿500',
      image: '/api/placeholder/400/300',
      features: ['คุณภาพสูง', 'มาตรฐาน ISO', 'ปลอดภัย']
    },
    {
      id: 4,
      name: 'ผลิตภัณฑ์สมุนไพรธรรมชาติ',
      category: 'herbal-products',
      description: 'ผลิตภัณฑ์จากสมุนไพรธรรมชาติ 100% ไม่มีสารเคมี',
      price: '฿300',
      image: '/api/placeholder/400/300',
      features: ['ธรรมชาติ 100%', 'ไม่มีสารเคมี', 'ผ่านการรับรอง']
    },
    {
      id: 5,
      name: 'อุปกรณ์สำหรับสัตว์เลี้ยง',
      category: 'animal-products',
      description: 'อุปกรณ์และอาหารสำหรับสัตว์เลี้ยงคุณภาพสูง',
      price: '฿1,200',
      image: '/api/placeholder/400/300',
      features: ['คุณภาพสูง', 'ปลอดภัย', 'ครบครัน']
    },
    {
      id: 6,
      name: 'เครื่องมือห้องปฏิบัติการ',
      category: 'medical-equipment',
      description: 'เครื่องมือและอุปกรณ์สำหรับห้องปฏิบัติการครบครัน',
      price: '฿5,000',
      image: '/api/placeholder/400/300',
      features: ['ครบครัน', 'คุณภาพสูง', 'ทนทาน']
    }
  ]

  const categories = [
    { id: 'all', name: 'ทั้งหมด' },
    { id: 'vaccine-filling', name: 'เครื่องแบ่งบรรจุวัคซีน' },
    { id: 'medical-equipment', name: 'อุปกรณ์ทางการแพทย์' },
    { id: 'animal-products', name: 'ผลิตภัณฑ์สำหรับสัตว์' },
    { id: 'herbal-products', name: 'ผลิตภัณฑ์สมุนไพร' },
    { id: 'clinic-services', name: 'บริการคลินิก' },
    { id: 'export-products', name: 'สินค้าส่งออก' }
  ]

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <>
      <Helmet>
        <title>สินค้า - Firstly Tech</title>
        <meta name="description" content="สินค้าคุณภาพสูงจากบริษัท เฟิร์สลี่เทค จำกัด อุปกรณ์วิทยาศาสตร์ อุปกรณ์ทางการแพทย์ และผลิตภัณฑ์ต่างๆ" />
      </Helmet>

      <div className="pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-primary-50 to-blue-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                สินค้าของเรา
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                สินค้าคุณภาพสูงจากซัพพลายเออร์ที่มีความน่าเชื่อถือทั่วทุกมุมโลก
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="section-padding bg-white border-b">
          <div className="container-custom">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative w-full lg:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="ค้นหาสินค้า..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Filter Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <Filter className="w-5 h-5" />
                <span>กรองสินค้า</span>
              </button>
            </div>

            {/* Filter Options */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6"
              >
                <ProductFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                />
              </motion.div>
            )}
          </div>
        </section>

        {/* Products Grid */}
        <section className="section-padding">
          <div className="container-custom">
            {filteredProducts.length > 0 ? (
              <>
                <div className="mb-8">
                  <p className="text-gray-600">
                    พบสินค้า {filteredProducts.length} รายการ
                    {searchTerm && ` สำหรับ "${searchTerm}"`}
                    {selectedCategory !== 'all' && ` ในหมวดหมู่ "${categories.find(c => c.id === selectedCategory)?.name}"`}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  ไม่พบสินค้า
                </h3>
                <p className="text-gray-600 mb-4">
                  ลองเปลี่ยนคำค้นหาหรือหมวดหมู่สินค้า
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('all')
                  }}
                  className="btn-primary"
                >
                  ล้างตัวกรอง
                </button>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </>
  )
}

export default Products
