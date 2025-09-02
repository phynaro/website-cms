import { motion } from 'framer-motion'
import { Mail, Linkedin, Award } from 'lucide-react'

const ResearchTeamSection = () => {
  const researchMembers = [
    {
      name: 'คุณธรรศ ทังสมบัติ',
      title: 'กรรมการ สภาหอการค้าแห่งประเทศไทย',
      credentials: [
        'ประธาน คณะกรรมการสมาคมการค้ากลุ่มอาหารและเครื่องดื่ม',
        'รองประธาน คณะกรรมการธุรกิจอาหารแปรรูปและอาหารแห่งอนาคต'
      ],
      image: '/api/placeholder/300/300',
      email: 'thanas@firstlytech.com'
    },
    {
      name: 'รศ.ดร. วันดี ทาตระกูล',
      title: 'เชี่ยวชาญ โภชนศาสตร์สุกร และ โภชนศาสตร์สัตว์',
      credentials: [
        'การผลิตสุกร',
        'สารเสริมอาหารสัตว์'
      ],
      image: '/api/placeholder/300/300',
      email: 'wandee@firstlytech.com'
    },
    {
      name: 'ผศ.ดร. เหรียญทอง สิงห์จานุสงค์',
      title: 'เชี่ยวชาญ Food processing, เทคโนโลยีน้ำมัน และผลิตภัณฑ์อาหาร',
      credentials: [],
      image: '/api/placeholder/300/300',
      email: 'reanthong@firstlytech.com'
    },
    {
      name: 'รศ.ดร. ทศพร อินเจริญ',
      title: 'เชี่ยวชาญ โภชนศาสตร์สุกร และวัตถุดิบอาหาร และอาหารสัตว์',
      credentials: [
        'การผลิตสัตว์ปีก',
        'จุลกายวิภาคระบบทางเดินอาหารสัตว์'
      ],
      image: '/api/placeholder/300/300',
      email: 'tossaporn@firstlytech.com'
    },
    {
      name: 'Asst. Prof. Dr. Gareth Ross',
      title: 'อาจารย์ประจำภาควิชาเคมี คณะวิทยาศาสตร์ มหาวิทยาลัยนเรศวร',
      credentials: [
        'ผู้เชี่ยวชาญด้านพลาสติกชีวภาพและโคพอลิเมอร์ในการใช้งานด้านชีวการแพทย์'
      ],
      image: '/api/placeholder/300/300',
      email: 'gareth@firstlytech.com'
    },
    {
      name: 'ผศ.ดร.ศรารัตน์ มหาศรานนท์',
      title: 'อาจารย์ประจำสาขาภาควิชาเคมี คณะวิทยาศาสตร์ มหาวิทยาลัยนเรศวร',
      credentials: [
        'ผู้เชี่ยวชาญทางด้านฟิล์มและโฟมชีวภาพคอมโพสิต',
        'การแปรรูปพอลิเมอร์ การผสมพอลิเมอร์และคอมโพสิต',
        'วัสดุอะคูสติกและฉนวนความร้อน เทคโนโลยียาง'
      ],
      image: '/api/placeholder/300/300',
      email: 'sararat@firstlytech.com'
    },
    {
      name: 'รศ.ดร.สุกัญญา รอส',
      title: 'อาจารย์ประจำสาขาภาควิชาเคมี',
      credentials: [
        'ผู้อำนวยการศูนย์ความเป็นเลิศด้านวัสดุชีวภาพ',
        'รองคณบดีฝ่ายพัฒนากิจการต่างประเทศ คณะวิทยาศาสตร์ มหาวิทยาลัยนเรศวร'
      ],
      image: '/api/placeholder/300/300',
      email: 'sukanya@firstlytech.com'
    },
    {
      name: 'นายสืบสาย ผลสมบูรณ์',
      title: 'อดีตผู้อำนวยการกลุ่มส่งเสริมสหกรณ์ 2 สำนักสหกรณ์จังหวัดตาก',
      credentials: [
        'ดูแลพื้นที่ อำเภอแม่สอด แม่ระมาด ท่าสองยาง พบพระ และอุ้งผาง',
        'อดีตรักษาการณ์ ผู้อำนวยการนิคมสหกรณ์แม่สอด'
      ],
      image: '/api/placeholder/300/300',
      email: 'suebsai@firstlytech.com'
    },
    {
      name: 'ว่าที่ ร.ต. อดิศักดิ์ คงแก้ว',
      title: 'เชี่ยวชาญ โภชนศาสตร์สุกร การผลิตสุกร สารเสริมอาหารสัตว์',
      credentials: [
        'ระบบการจัดการโครงสร้างฟาร์ม'
      ],
      image: '/api/placeholder/300/300',
      email: 'adisak@firstlytech.com'
    },
    {
      name: 'นางเพ็ญนภา จันทรมณฑล',
      title: 'อดีตประธานกลุ่มส่งเสริม วิสาหกิจชุมชน ตลาดชุมชน เจดีย์โคะ อ.แม่สอด จ.ตาก',
      credentials: [
        'อดีตประธานกลุ่ม 67 สหกรณ์การเกษตร แม่สอด จำกัด อ.แม่สอด จ.ตาก',
        'อดีตเลขานุการสหกรณ์การเกษตร สกุลกือ จำกัด อ.พบพระ จ.ตาก',
        'อดีตผู้ประสานงานเครือข่ายการเมืองภาคพลเมือง 5 อ.ชายแดน จ.ตาก (ไทย-ม้ง) กองทัพภาคที่ 3'
      ],
      image: '/api/placeholder/300/300',
      email: 'penpapa@firstlytech.com'
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
            Research Team
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            ทีมวิจัยและที่ปรึกษาผู้เชี่ยวชาญที่มีความรู้และประสบการณ์สูง
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {researchMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                      <Award className="w-8 h-8 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {member.name}
                      </h3>
                      <p className="text-sm text-primary-600 font-medium">
                        {member.title}
                      </p>
                    </div>
                  </div>
                  
                  {member.credentials.length > 0 && (
                    <div className="mb-4">
                      <ul className="space-y-2">
                        {member.credentials.map((credential, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start">
                            <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {credential}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="flex justify-center">
                    <a
                      href={`mailto:${member.email}`}
                      className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary-100 transition-colors duration-200"
                      title="Email"
                    >
                      <Mail className="w-4 h-4 text-gray-600" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ResearchTeamSection
