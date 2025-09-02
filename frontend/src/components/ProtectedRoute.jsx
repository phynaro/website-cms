import { useAuth } from '../contexts/AuthContext'
import { User } from 'lucide-react'

const ProtectedRoute = ({ children }) => {
  const { user, isAdmin, loading, loginWithGoogle } = useAuth()

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="pt-16 lg:pt-20 section-padding">
        <div className="container-custom text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">กำลังตรวจสอบการเข้าสู่ระบบ...</p>
        </div>
      </div>
    )
  }

  // Show login prompt if not authenticated or not admin
  if (!user || !isAdmin) {
    return (
      <div className="pt-16 lg:pt-20 section-padding">
        <div className="container-custom text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            ต้องเข้าสู่ระบบ
          </h2>
          <p className="text-gray-600 mb-6">
            คุณต้องเข้าสู่ระบบด้วยบัญชีที่ได้รับอนุญาต
          </p>
          <button
            onClick={loginWithGoogle}
            className="btn-primary inline-flex items-center"
          >
            <User className="w-4 h-4 mr-2" />
            เข้าสู่ระบบด้วย Google
          </button>
        </div>
      </div>
    )
  }

  // Render children if authenticated and admin
  return children
}

export default ProtectedRoute
