import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Award, Users, Globe } from 'lucide-react'

const AboutPreview = () => {
  const highlights = [
    {
      icon: Award,
      title: 'ก่อตั้งปี 2556',
      description: 'ประสบการณ์มากกว่า 10 ปีในอุตสาหกรรม'
    },
    {
      icon: Users,
      title: 'ทีมผู้เชี่ยวชาญ',
      description: 'ทีมงานที่มีความรู้และประสบการณ์สูง'
    },
    {
      icon: Globe,
      title: 'พันธมิตรทั่วโลก',
      description: 'ซัพพลายเออร์ที่มีความน่าเชื่อถือ'
    }
  ]

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              เกี่ยวกับบริษัท เฟิร์สลี่เทค จำกัด
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              บริษัท เฟิร์สลี่เทค จำกัด ได้ถูกก่อตั้งขึ้นในปี พ.ศ. 2556 โดยเป็นผู้จัดจำหน่ายอุปกรณ์ทางวิทยาศาสตร์และอุปกรณ์ทางการแพทย์ให้กับลูกค้าในประเทศไทย
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              จากประสบการณ์การทำงานมากกว่า 10 ปี บริษัทฯ ได้จัดหาสินค้าคุณภาพดีในราคาสมเหตุสมผลให้กับลูกค้า ปัจจุบัน บริษัทฯ ได้นำเข้าอุปกรณ์ที่ใช้ในห้องปฏิบัติการทางการแพทย์หลายอย่าง รวมถึงสารเคมีที่ใช้ในห้องปฏิบัติการ น้ำยา และอุปกรณ์ทางการแพทย์ จากซัพพลายเออร์ที่มีความน่าเชื่อถือทั่วทุกมุมโลก
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <highlight.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {highlight.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {highlight.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <Link
              to="/about"
              className="btn-primary inline-flex items-center"
            >
              เรียนรู้เพิ่มเติม
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="aspect-video bg-gradient-to-br from-primary-100 to-blue-100 rounded-xl flex items-center justify-center mb-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">F</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Firstly Tech Co., Ltd.
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Established 2013
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">ปีที่ก่อตั้ง</span>
                  <span className="font-semibold text-gray-900">2556</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">ประสบการณ์</span>
                  <span className="font-semibold text-gray-900">10+ ปี</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">ลูกค้า</span>
                  <span className="font-semibold text-gray-900">500+</span>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-400 rounded-full"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutPreview
