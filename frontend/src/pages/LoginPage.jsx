import { motion } from 'framer-motion'
import { User, Shield, ArrowRight } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const LoginPage = () => {
  const { loginWithGoogle } = useAuth()

  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-gradient-to-br from-primary-50 to-blue-50">
      <div className="container-custom">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-lg shadow-lg p-8 text-center"
          >
            {/* Icon */}
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-primary-600" />
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              เข้าสู่ระบบผู้ดูแล
            </h1>
            <p className="text-gray-600 mb-8">
              เข้าสู่ระบบเพื่อจัดการเนื้อหาและโพสต์ของเว็บไซต์
            </p>

            {/* Login Button */}
            <button
              onClick={loginWithGoogle}
              className="w-full btn-primary inline-flex items-center justify-center text-lg py-4"
            >
              <User className="w-5 h-5 mr-2" />
              เข้าสู่ระบบด้วย Google
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>

            {/* Info */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>หมายเหตุ:</strong> เฉพาะบัญชีที่ได้รับอนุญาตเท่านั้นที่สามารถเข้าสู่ระบบได้
              </p>
              <p className="text-xs text-gray-500 mt-2">
                หากคุณไม่มีสิทธิ์เข้าถึง กรุณาติดต่อผู้ดูแลระบบ
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
