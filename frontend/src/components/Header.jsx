import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, User, LogOut } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import ReactGA from 'react-ga4'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const { user, isAdmin, logout } = useAuth()

  const navigation = [
    { name: 'หน้าหลัก', href: '/' },
    { name: 'เกี่ยวกับเรา', href: '/about' },
    { name: 'สินค้า', href: '/products' },
    { name: 'ข่าวสาร', href: '/blog' },
    { name: 'ติดต่อเรา', href: '/contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (name) => {
    ReactGA.event({
      category: 'Navigation',
      action: 'Click',
      label: name
    })
    setIsMenuOpen(false)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-16 h-16 bg-transparent rounded-lg flex items-center justify-center">
              {/* Replace with actual logo when available */}
              {/* <span className="text-white font-bold text-lg">F</span> */}
              <img src="/images/logo/logo.webp" alt="Firstly Tech Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Firstly Tech</h1>
              <p className="text-xs text-gray-600 hidden sm:block">Distributor of Scientific & Medical Products</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => handleNavClick(item.name)}
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.href
                    ? 'text-primary-600'
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Phone className="w-4 h-4" />
              <span>061 665 0538</span>
            </div>
            
            {/* Admin Link */}
            {user && isAdmin ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/admin"
                  onClick={() => handleNavClick('Admin Panel')}
                  className="btn-secondary text-sm"
                >
                  จัดการ
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-500 hover:text-red-600 transition-colors duration-200"
                  title="ออกจากระบบ"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/contact"
                onClick={() => handleNavClick('Contact Button')}
                className="btn-primary"
              >
                ติดต่อเรา
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => handleNavClick(item.name)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === item.href
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Admin Link */}
              {user && isAdmin && (
                <div className="px-3 py-2 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <Link
                      to="/admin"
                      onClick={() => handleNavClick('Admin Panel Mobile')}
                      className="btn-secondary text-sm flex-1 text-center"
                    >
                      จัดการ
                    </Link>
                    <button
                      onClick={logout}
                      className="btn-secondary text-sm px-3"
                      title="ออกจากระบบ"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
              
              <div className="px-3 py-2">
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                  <Phone className="w-4 h-4" />
                  <span>061 665 0538</span>
                </div>
                <Link
                  to="/contact"
                  onClick={() => handleNavClick('Contact Button Mobile')}
                  className="btn-primary w-full text-center"
                >
                  ติดต่อเรา
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
