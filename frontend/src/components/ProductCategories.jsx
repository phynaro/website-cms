import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Syringe, 
  TestTube, 
  Leaf, 
  Building2, 
  Package, 
  Microscope 
} from 'lucide-react'

const ProductCategories = () => {
  const categories = [
    {
      icon: Syringe,
      title: 'เครื่องแบ่งบรรจุวัคซีนอัตโนมัติ',
      description: 'อุปกรณ์สำหรับการบรรจุวัคซีนอัตโนมัติที่มีความแม่นยำสูง',
      color: 'bg-blue-500',
      href: '/products/vaccine-filling'
    },
    {
      icon: TestTube,
      title: 'ผลิตภัณฑ์สำหรับสัตว์',
      description: 'สารเคมีและอุปกรณ์สำหรับการทดสอบและรักษาสัตว์',
      color: 'bg-green-500',
      href: '/products/animal-products'
    },
    {
      icon: Microscope,
      title: 'ชุดทดสอบและอุปกรณ์ทางการแพทย์',
      description: 'อุปกรณ์และชุดทดสอบสำหรับห้องปฏิบัติการทางการแพทย์',
      color: 'bg-purple-500',
      href: '/products/medical-equipment'
    },
    {
      icon: Leaf,
      title: 'ผลิตภัณฑ์สมุนไพร',
      description: 'ผลิตภัณฑ์จากสมุนไพรธรรมชาติคุณภาพสูง',
      color: 'bg-yellow-500',
      href: '/products/herbal-products'
    },
    {
      icon: Building2,
      title: 'เฟิร์สเมดิก คลินิกเทคนิกการแพทย์',
      description: 'บริการคลินิกและเทคนิกการแพทย์ครบครัน',
      color: 'bg-red-500',
      href: '/products/clinic-services'
    },
    {
      icon: Package,
      title: 'ผลิตภัณฑ์สินค้าส่งออก',
      description: 'สินค้าคุณภาพสูงสำหรับตลาดส่งออก',
      color: 'bg-indigo-500',
      href: '/products/export-products'
    }
  ]

  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            หมวดสินค้า
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            เรามีสินค้าคุณภาพสูงหลากหลายประเภทเพื่อตอบสนองความต้องการของลูกค้า
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                to={category.href}
                className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className={`w-16 h-16 ${category.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            to="/products"
            className="btn-primary text-lg px-8 py-3 inline-flex items-center"
          >
            ดูสินค้าทั้งหมด
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default ProductCategories
