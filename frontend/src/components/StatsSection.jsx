import { motion } from 'framer-motion'
import { Users, Award, Package, Globe } from 'lucide-react'

const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      number: '500+',
      label: 'ลูกค้าพึงพอใจ',
      description: 'ลูกค้าที่ไว้วางใจเรา'
    },
    {
      icon: Award,
      number: '10+',
      label: 'ปีประสบการณ์',
      description: 'ประสบการณ์ในอุตสาหกรรม'
    },
    {
      icon: Package,
      number: '1000+',
      label: 'สินค้าคุณภาพ',
      description: 'สินค้าคุณภาพสูง'
    },
    {
      icon: Globe,
      number: '50+',
      label: 'พันธมิตรทั่วโลก',
      description: 'ซัพพลายเออร์ที่เชื่อถือได้'
    }
  ]

  return (
    <section className="section-padding bg-primary-600">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            ตัวเลขที่น่าประทับใจ
          </h2>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            ความสำเร็จของเราในตลอด 10 ปีที่ผ่านมา
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  {stat.label}
                </h3>
                <p className="text-primary-100 text-sm">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection
