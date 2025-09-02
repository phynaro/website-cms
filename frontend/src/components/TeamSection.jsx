import { motion } from 'framer-motion'
import { Mail, Linkedin } from 'lucide-react'

const TeamSection = () => {
  const teamMembers = [
    {
      name: 'MISS NATPHAPAT SUPATSARAPHOKIN',
      position: 'Managing Director',
      image: '/images/team/natphapat-supatsaraphokin.webp',
      email: 'natphapat@firstlytech.com',
      linkedin: 'https://linkedin.com/in/natphapat-supatsaraphokin'
    },
    {
      name: 'MR.JAKAPAN SATOOM',
      position: 'Managing Director Financial',
      image: '/images/team/jakapan-satoom.jpg',
      email: 'jakapan@firstlytech.com',
      linkedin: 'https://linkedin.com/in/jakapan-satoom'
    },
    {
      name: 'MISS BENYAPA JOBDEE',
      position: 'ACCOUNTING MANAGER',
      image: '/images/team/benyapa-jobdee.webp',
      email: 'benyapa@firstlytech.com',
      linkedin: 'https://linkedin.com/in/benyapa-jobdee'
    },
    {
      name: 'MISS NATTANAN PUSSADETONGCHAI',
      position: 'Product Manager',
      image: '/images/team/nattanan-pussadetongchai.webp',
      email: 'nattanan@firstlytech.com',
      linkedin: 'https://linkedin.com/in/nattanan-pussadetongchai'
    },
    {
      name: 'MISS YUPATINEE JITSUPHO',
      position: 'Applied Thai Traditional Medicine',
      image: '/images/team/yupatinee-jitsupho.webp',
      email: 'yupatinee@firstlytech.com',
      linkedin: 'https://linkedin.com/in/yupatinee-jitsupho'
    },
    {
      name: 'MISS MEENTRAPORN DONBANDRANCHOKE',
      position: 'Research and Development Manager',
      image: '/images/team/meentraporn-donbandranchoke.webp',
      email: 'meentraporn@firstlytech.com',
      linkedin: 'https://linkedin.com/in/meentraporn-donbandranchoke'
    },
    {
      name: 'MR.KRITSANA THUBUCHAKORN',
      position: 'Public Relations Manager',
      image: '/images/team/kritsana-thubuchakorn.webp',
      email: 'kritsana@firstlytech.com',
      linkedin: 'https://linkedin.com/in/kritsana-thubuchakorn'
    },
    {
      name: 'MISS CHIRIPHON SALANGSING',
      position: 'Secretary & Coordinator',
      image: '/images/team/chiriphon-salangsing.webp',
      email: 'chiriphon@firstlytech.com',
      linkedin: 'https://linkedin.com/in/chiriphon-salangsing'
    }
  ]

  return (
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
            Core Team
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            ทีมงานผู้เชี่ยวชาญที่มีประสบการณ์และความรู้ในด้านต่างๆ
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="aspect-square bg-gradient-to-br from-primary-100 to-blue-100 flex items-center justify-center relative overflow-hidden">
                  {/* Team Member Image */}
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to initials if image fails to load
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback Initials */}
                  <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 absolute inset-0 m-auto" style={{display: 'none'}}>
                    <span className="text-white text-xl font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 text-center">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-600 text-center mb-4">
                    {member.position}
                  </p>
                  <div className="flex justify-center space-x-3">
                    <a
                      href={`mailto:${member.email}`}
                      className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary-100 transition-colors duration-200"
                      title="Email"
                    >
                      <Mail className="w-4 h-4 text-gray-600" />
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary-100 transition-colors duration-200"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4 text-gray-600" />
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

export default TeamSection
