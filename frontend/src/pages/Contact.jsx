import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react'
import ContactForm from '../components/ContactForm'

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const contactInfo = [
    {
      icon: Phone,
      title: 'โทรศัพท์',
      value: '061 665 0538',
      href: 'tel:0616650538',
      secondary: '061 654 6958'
    },
    {
      icon: Mail,
      title: 'อีเมล',
      value: 'marketting.firstlytech@gmail.com',
      href: 'mailto:marketting.firstlytech@gmail.com'
    },
    {
      icon: MapPin,
      title: 'ที่อยู่',
      value: '55/161 หมู่ 9 ตำบลลาดสวาย อำเภอลำลูกกา จังหวัดปทุมธานี 12150'
    },
    {
      icon: Clock,
      title: 'เวลาเปิดทำการ',
      value: 'เปิดบริการทุกวัน 9.00 - 17.00'
    }
  ]

  const handleFormSubmit = (formData) => {
    // In real app, this would send data to Strapi or email service
    console.log('Form submitted:', formData)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
    }, 3000)
  }

  return (
    <>
      <Helmet>
        <title>ติดต่อเรา - Firstly Tech</title>
        <meta name="description" content="ติดต่อบริษัท เฟิร์สลี่เทค จำกัด เพื่อสอบถามข้อมูลสินค้าและบริการ" />
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
                ติดต่อเรา
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                พร้อมให้บริการและคำปรึกษาเกี่ยวกับสินค้าของเรา
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <info.icon className="w-8 h-8 text-primary-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {info.title}
                    </h3>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-primary-600 hover:text-primary-700 transition-colors duration-200"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-gray-600">{info.value}</p>
                    )}
                    {info.secondary && (
                      <p className="text-gray-600 text-sm mt-1">{info.secondary}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form and Map */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  ส่งข้อความถึงเรา
                </h2>
                <p className="text-gray-600 mb-8">
                  กรอกข้อมูลด้านล่างเพื่อติดต่อเรา เราจะตอบกลับภายใน 24 ชั่วโมง
                </p>
                
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
                  >
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-green-800 mb-2">
                      ส่งข้อความสำเร็จ!
                    </h3>
                    <p className="text-green-700">
                      ขอบคุณที่ติดต่อเรา เราจะตอบกลับโดยเร็วที่สุด
                    </p>
                  </motion.div>
                ) : (
                  <ContactForm onSubmit={handleFormSubmit} />
                )}
              </motion.div>

              {/* Map and Additional Info */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  ที่ตั้งสำนักงาน
                </h2>
                
                {/* Map Placeholder */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                  <div className="aspect-video bg-gradient-to-br from-primary-100 to-blue-100 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-16 h-16 text-primary-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        สำนักงานใหญ่
                      </h3>
                      <p className="text-gray-600">
                        55/161 หมู่ 9 ตำบลลาดสวาย<br />
                        อำเภอลำลูกกา จังหวัดปทุมธานี 12150
                      </p>
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-primary-600" />
                    เวลาเปิดทำการ
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">จันทร์ - ศุกร์</span>
                      <span className="font-medium">9:00 - 17:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">เสาร์ - อาทิตย์</span>
                      <span className="font-medium">9:00 - 17:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">วันหยุดนักขัตฤกษ์</span>
                      <span className="font-medium">ปิดทำการ</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

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
                <a
                  href="tel:0616650538"
                  className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  โทรหาเรา
                </a>
                <a
                  href="mailto:marketting.firstlytech@gmail.com"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-6 rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  ส่งอีเมล
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Contact
