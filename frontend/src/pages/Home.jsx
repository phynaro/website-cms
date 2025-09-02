import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Users, Award, Truck } from 'lucide-react'
import HeroSection from '../components/HeroSection'
import ProductCategories from '../components/ProductCategories'
import AboutPreview from '../components/AboutPreview'
import StatsSection from '../components/StatsSection'

const Home = () => {
  const features = [
    {
      icon: Shield,
      title: 'คุณภาพสูง',
      description: 'สินค้าคุณภาพดีจากซัพพลายเออร์ที่มีความน่าเชื่อถือทั่วทุกมุมโลก'
    },
    {
      icon: Users,
      title: 'บริการครบครัน',
      description: 'ให้คำปรึกษาและบริการหลังการขายอย่างมืออาชีพ'
    },
    {
      icon: Award,
      title: 'ประสบการณ์มากกว่า 10 ปี',
      description: 'ประสบการณ์การทำงานมากกว่า 10 ปีในอุตสาหกรรมวิทยาศาสตร์และแพทย์'
    },
    {
      icon: Truck,
      title: 'จัดส่งรวดเร็ว',
      description: 'บริการจัดส่งทั่วประเทศไทยด้วยความรวดเร็วและปลอดภัย'
    }
  ]

  return (
    <>
      <Helmet>
        <title>Firstly Tech - Distributor of Scientific and Medical Products</title>
        <meta name="description" content="บริษัท เฟิร์สลี่เทค จำกัด - ผู้จัดจำหน่ายอุปกรณ์ทางวิทยาศาสตร์และอุปกรณ์ทางการแพทย์ มากกว่า 10 ปี" />
        <meta name="keywords" content="อุปกรณ์วิทยาศาสตร์, อุปกรณ์ทางการแพทย์, ห้องปฏิบัติการ, สารเคมี, น้ำยา" />
      </Helmet>

      <div className="pt-16 lg:pt-20">
        {/* Hero Section */}
        <HeroSection />

        {/* Product Categories */}
        <ProductCategories />

        {/* About Preview */}
        <AboutPreview />

        {/* Features Section */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                ทำไมต้องเลือกเรา
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                เรามุ่งมั่นให้บริการลูกค้าด้วยสินค้าคุณภาพสูงและบริการที่เป็นเลิศ
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-8 h-8 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <StatsSection />

        {/* CTA Section */}
        <section className="section-padding bg-primary-600">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                พร้อมให้บริการคุณ
              </h2>
              <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                ติดต่อเราเพื่อรับคำปรึกษาและข้อมูลเพิ่มเติมเกี่ยวกับสินค้าของเรา
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/products"
                  className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
                >
                  ดูสินค้าทั้งหมด
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-6 rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
                >
                  ติดต่อเรา
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Home
