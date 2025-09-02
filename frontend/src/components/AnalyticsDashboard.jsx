import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Eye, 
  Activity, 
  Clock,
  BarChart3,
  RefreshCw
} from 'lucide-react'
import analyticsService from '../services/analytics'

const AnalyticsDashboard = () => {
  const [analyticsData, setAnalyticsData] = useState(null)
  const [realTimeData, setRealTimeData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(null)

  useEffect(() => {
    loadAnalyticsData()
    loadRealTimeData()
    
    // Refresh data every 30 seconds
    const interval = setInterval(() => {
      loadRealTimeData()
    }, 30000)
    
    return () => clearInterval(interval)
  }, [])

  const loadAnalyticsData = async () => {
    try {
      setLoading(true)
      const data = await analyticsService.getAnalyticsData()
      setAnalyticsData(data)
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Error loading analytics data:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadRealTimeData = async () => {
    try {
      const data = await analyticsService.getRealTimeData()
      setRealTimeData(data)
    } catch (error) {
      console.error('Error loading real-time data:', error)
    }
  }

  const formatNumber = (num) => {
    return new Intl.NumberFormat('th-TH').format(num)
  }

  const getTrendIcon = (trend) => {
    if (trend > 0) {
      return <TrendingUp className="w-4 h-4 text-green-500" />
    } else if (trend < 0) {
      return <TrendingDown className="w-4 h-4 text-red-500" />
    }
    return <Activity className="w-4 h-4 text-gray-500" />
  }

  const getTrendColor = (trend) => {
    if (trend > 0) return 'text-green-600'
    if (trend < 0) return 'text-red-600'
    return 'text-gray-600'
  }

  if (loading) {
    return (
      <div className="section-padding">
        <div className="container-custom text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">กำลังโหลดข้อมูล Analytics...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Real-time Stats */}
      {realTimeData && (
        <section className="section-padding bg-white border-b">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Activity className="w-6 h-6 mr-2 text-green-500" />
                ข้อมูลแบบ Real-time
              </h2>
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                onClick={loadAnalyticsData}
                className="btn-secondary text-sm px-4 py-2 inline-flex items-center"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                รีเฟรช
              </motion.button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-green-50 border border-green-200 rounded-lg p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">ผู้ใช้ที่ใช้งานอยู่</p>
                    <p className="text-3xl font-bold text-green-900">{realTimeData.activeUsers}</p>
                  </div>
                  <Users className="w-8 h-8 text-green-500" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-blue-50 border border-blue-200 rounded-lg p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">หน้าปัจจุบัน</p>
                    <p className="text-lg font-semibold text-blue-900">{realTimeData.currentPage}</p>
                  </div>
                  <Eye className="w-8 h-8 text-blue-500" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-purple-50 border border-purple-200 rounded-lg p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600">อัปเดตล่าสุด</p>
                    <p className="text-sm font-semibold text-purple-900">
                      {new Date(realTimeData.lastUpdated).toLocaleTimeString('th-TH')}
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-purple-500" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Main Stats */}
      {analyticsData && (
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <BarChart3 className="w-6 h-6 mr-2 text-primary-500" />
                สถิติการเข้าชม
              </h2>
              {lastUpdated && (
                <div className="text-sm text-gray-500 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  อัปเดตล่าสุด: {lastUpdated.toLocaleString('th-TH')}
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Page Views */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Page Views</h3>
                  <Eye className="w-6 h-6 text-blue-500" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">รวมทั้งหมด</span>
                    <span className="font-semibold">{formatNumber(analyticsData.pageViews.total)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">วันนี้</span>
                    <span className="font-semibold">{formatNumber(analyticsData.pageViews.today)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">สัปดาห์นี้</span>
                    <span className="font-semibold">{formatNumber(analyticsData.pageViews.thisWeek)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">เทรนด์</span>
                    <div className="flex items-center">
                      {getTrendIcon(analyticsData.pageViews.trend)}
                      <span className={`ml-1 font-semibold ${getTrendColor(analyticsData.pageViews.trend)}`}>
                        {analyticsData.pageViews.trend > 0 ? '+' : ''}{analyticsData.pageViews.trend}%
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Users */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Users</h3>
                  <Users className="w-6 h-6 text-green-500" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">รวมทั้งหมด</span>
                    <span className="font-semibold">{formatNumber(analyticsData.users.total)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">วันนี้</span>
                    <span className="font-semibold">{formatNumber(analyticsData.users.today)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">สัปดาห์นี้</span>
                    <span className="font-semibold">{formatNumber(analyticsData.users.thisWeek)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">เทรนด์</span>
                    <div className="flex items-center">
                      {getTrendIcon(analyticsData.users.trend)}
                      <span className={`ml-1 font-semibold ${getTrendColor(analyticsData.users.trend)}`}>
                        {analyticsData.users.trend > 0 ? '+' : ''}{analyticsData.users.trend}%
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Sessions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Sessions</h3>
                  <Activity className="w-6 h-6 text-purple-500" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">รวมทั้งหมด</span>
                    <span className="font-semibold">{formatNumber(analyticsData.sessions.total)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">วันนี้</span>
                    <span className="font-semibold">{formatNumber(analyticsData.sessions.today)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">สัปดาห์นี้</span>
                    <span className="font-semibold">{formatNumber(analyticsData.sessions.thisWeek)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">เทรนด์</span>
                    <div className="flex items-center">
                      {getTrendIcon(analyticsData.sessions.trend)}
                      <span className={`ml-1 font-semibold ${getTrendColor(analyticsData.sessions.trend)}`}>
                        {analyticsData.sessions.trend > 0 ? '+' : ''}{analyticsData.sessions.trend}%
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Top Pages */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">หน้าเพจยอดนิยม</h3>
                <div className="space-y-3">
                  {analyticsData.topPages.map((page, index) => (
                    <div key={page.path} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                          {index + 1}
                        </span>
                        <div>
                          <p className="font-medium text-gray-900">{page.title}</p>
                          <p className="text-sm text-gray-500">{page.path}</p>
                        </div>
                      </div>
                      <span className="font-semibold text-gray-900">{formatNumber(page.views)}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">กิจกรรมล่าสุด</h3>
                <div className="space-y-3">
                  {analyticsData.recentActivity.map((activity, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-500">{activity.page}</p>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(activity.time).toLocaleTimeString('th-TH')}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default AnalyticsDashboard
