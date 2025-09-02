import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, Facebook } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { name: 'หน้าหลัก', href: '/' },
    { name: 'เกี่ยวกับเรา', href: '/about' },
    { name: 'สินค้า', href: '/products' },
    { name: 'ติดต่อเรา', href: '/contact' },
  ]

  const contactInfo = [
    {
      icon: Phone,
      label: 'โทรศัพท์',
      value: '061 665 0538',
      href: 'tel:0616650538'
    },
    {
      icon: Phone,
      label: 'โทรศัพท์สำรอง',
      value: '061 654 6958',
      href: 'tel:0616546958'
    },
    {
      icon: Mail,
      label: 'อีเมล',
      value: 'marketting.firstlytech@gmail.com',
      href: 'mailto:marketting.firstlytech@gmail.com'
    },
    {
      icon: MapPin,
      label: 'ที่อยู่',
      value: '55/161 หมู่ 9 ตำบลลาดสวาย อำเภอลำลูกกา จังหวัดปทุมธานี 12150'
    },
    {
      icon: Clock,
      label: 'เวลาเปิดทำการ',
      value: 'เปิดบริการทุกวัน 9.00 - 17.00'
    }
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                {/* Replace with actual logo when available */}
                <span className="text-white font-bold text-lg">F</span>
                {/* <img src="/images/logo/logo-white.png" alt="Firstly Tech Logo" className="w-full h-full object-contain" /> */}
              </div>
              <div>
                <h3 className="text-xl font-bold">Firstly Tech</h3>
                <p className="text-sm text-gray-400">Distributor of Scientific & Medical Products</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              บริษัท เฟิร์สลี่เทค จำกัด ได้ถูกก่อตั้งขึ้นในปี พ.ศ. 2556 โดยเป็นผู้จัดจำหน่ายอุปกรณ์ทางวิทยาศาสตร์และอุปกรณ์ทางการแพทย์
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">เมนู</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">ข้อมูลติดต่อ</h4>
            <ul className="space-y-3">
              {contactInfo.slice(0, 3).map((item) => (
                <li key={item.label} className="flex items-start space-x-3">
                  <item.icon className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-400">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-gray-300">{item.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Hours & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-4">ข้อมูลเพิ่มเติม</h4>
            <ul className="space-y-3">
              {contactInfo.slice(3).map((item) => (
                <li key={item.label} className="flex items-start space-x-3">
                  <item.icon className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-400">{item.label}</p>
                    <p className="text-sm text-gray-300">{item.value}</p>
                  </div>
                </li>
              ))}
              <li className="flex items-center space-x-3">
                <Facebook className="w-4 h-4 text-primary-400" />
                <a
                  href="https://facebook.com/firstlytech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                >
                  ติดตามข่าวสาร
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {currentYear} บริษัท เฟิร์สลี่เทค จำกัด All rights reserved.
            </p>
            <p className="text-sm text-gray-400">
              Powered by <span className="text-primary-400">React + Strapi</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
