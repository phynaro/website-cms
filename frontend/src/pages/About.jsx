import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Award, Users, Globe, Target, Heart, Shield } from 'lucide-react'
import TeamSection from '../components/TeamSection'
import ResearchTeamSection from '../components/ResearchTeamSection'

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'มุ่งมั่นสู่ความเป็นเลิศ',
      description: 'เรามุ่งมั่นให้บริการลูกค้าด้วยสินค้าคุณภาพสูงและบริการที่เป็นเลิศ'
    },
    {
      icon: Heart,
      title: 'ใส่ใจลูกค้า',
      description: 'ให้ความสำคัญกับความต้องการของลูกค้าและมุ่งมั่นให้บริการที่ดีที่สุด'
    },
    {
      icon: Shield,
      title: 'ความน่าเชื่อถือ',
      description: 'สร้างความไว้วางใจด้วยความซื่อสัตย์และความรับผิดชอบต่อสังคม'
    },
    {
      icon: Users,
      title: 'ทำงานเป็นทีม',
      description: 'ส่งเสริมการทำงานร่วมกันและแบ่งปันความรู้เพื่อพัฒนาองค์กร'
    }
  ]

  const milestones = [
    { year: '2556', title: 'ก่อตั้งบริษัท', description: 'เริ่มต้นธุรกิจการจัดจำหน่ายอุปกรณ์วิทยาศาสตร์' },
    { year: '2558', title: 'ขยายธุรกิจ', description: 'เพิ่มผลิตภัณฑ์ทางการแพทย์และห้องปฏิบัติการ' },
    { year: '2560', title: 'พันธมิตรใหม่', description: 'ร่วมมือกับซัพพลายเออร์ชั้นนำจากทั่วโลก' },
    { year: '2563', title: 'บริการครบครัน', description: 'เปิดบริการคลินิกและเทคนิกการแพทย์' },
    { year: '2566', title: 'ครบ 10 ปี', description: 'ฉลองครบรอบ 10 ปีแห่งความสำเร็จ' }
  ]

  return (
    <>
      <Helmet>
        <title>เกี่ยวกับเรา - Firstly Tech</title>
        <meta name="description" content="เรียนรู้เกี่ยวกับบริษัท เฟิร์สลี่เทค จำกัด ประวัติความเป็นมา และทีมงานผู้เชี่ยวชาญ" />
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
                เกี่ยวกับเรา
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                บริษัท เฟิร์สลี่เทค จำกัด ได้ถูกก่อตั้งขึ้นในปี พ.ศ. 2556 โดยเป็นผู้จัดจำหน่ายอุปกรณ์ทางวิทยาศาสตร์และอุปกรณ์ทางการแพทย์ให้กับลูกค้าในประเทศไทย
              </p>
            </motion.div>
          </div>
        </section>

        {/* Company Story */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  เรื่องราวของเรา
                </h2>
                <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                  <p>
                    จากประสบการณ์การทำงานมากกว่า 10 ปี บริษัทฯ ได้จัดหาสินค้าคุณภาพดีในราคาสมเหตุสมผลให้กับลูกค้า
                  </p>
                  <p>
                    ปัจจุบัน บริษัทฯ ได้นำเข้าอุปกรณ์ที่ใช้ในห้องปฏิบัติการทางการแพทย์หลายอย่าง รวมถึงสารเคมีที่ใช้ในห้องปฏิบัติการ น้ำยา และอุปกรณ์ทางการแพทย์ จากซัพพลายเออร์ที่มีความน่าเชื่อถือทั่วทุกมุมโลก
                  </p>
                  <p>
                    เรามุ่งมั่นที่จะเป็นพันธมิตรที่เชื่อถือได้สำหรับลูกค้าทุกคน โดยให้บริการที่มีคุณภาพและตรงตามความต้องการ
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <div className="aspect-video bg-gradient-to-br from-primary-100 to-blue-100 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-36 h-36 bg-transparent rounded-full flex items-center justify-center mx-auto mb-4">
                        {/* <span className="text-white text-3xl font-bold">F</span> */}
                        <img src="/images/logo/logo.webp" alt="Firstly Tech Logo" className="w-full h-full object-contain" />
                      </div>
                      {/* <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Firstly Tech Co., Ltd.
                      </h3> */}
                      <p className="text-gray-600">
                        Established 2013
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
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
                ค่านิยมของเรา
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                ค่านิยมที่ขับเคลื่อนเราให้ก้าวไปข้างหน้าและสร้างความแตกต่าง
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-8 h-8 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Milestones */}
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
                เส้นทางแห่งความสำเร็จ
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                10 ปีแห่งการเติบโตและพัฒนาอย่างต่อเนื่อง
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-primary-200"></div>
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                      <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="text-2xl font-bold text-primary-600 mb-2">
                          {milestone.year}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-600">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Timeline dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-600 rounded-full border-4 border-white shadow-md"></div>
                    
                    <div className="w-1/2"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <TeamSection />

        {/* Research Team Section */}
        <ResearchTeamSection />
      </div>
    </>
  )
}

export default About
