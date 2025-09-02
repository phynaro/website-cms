import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Download, 
  Upload, 
  Search,
  Settings,
  Eye,
  LogOut,
  BarChart3,
  FileText
} from 'lucide-react'
import apiService from '../services/api'
import { useAuth } from '../contexts/AuthContext'
import BlogPostForm from './BlogPostForm'
import AnalyticsDashboard from './AnalyticsDashboard'

const AdminPanel = () => {
  const [posts, setPosts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingPost, setEditingPost] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPosts, setFilteredPosts] = useState([])
  const [activeTab, setActiveTab] = useState('analytics') // 'analytics' or 'blog'
  const { user, isAdmin, loading, loginWithGoogle, logout, refreshAuth } = useAuth()

  useEffect(() => {
    loadPosts()
  }, [])

  // Remove the automatic redirect since ProtectedRoute handles it

  useEffect(() => {
    if (searchTerm) {
      const filtered = posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.subtitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredPosts(filtered)
    } else {
      setFilteredPosts(posts)
    }
  }, [searchTerm, posts])

  const loadPosts = async () => {
    try {
      const posts = await apiService.getAllPosts()
      setPosts(posts)
      setFilteredPosts(posts)
    } catch (error) {
      console.error('Error loading posts:', error)
    }
  }

  const handleCreatePost = (postData) => {
    setPosts(prev => [postData, ...prev])
    setFilteredPosts(prev => [postData, ...prev])
    setShowForm(false)
  }

  const handleUpdatePost = (postData) => {
    setPosts(prev => prev.map(p => p.id === editingPost.id ? postData : p))
    setFilteredPosts(prev => prev.map(p => p.id === editingPost.id ? postData : p))
    setEditingPost(null)
    setShowForm(false)
  }

  const handleDeletePost = async (id) => {
    if (window.confirm('คุณแน่ใจหรือไม่ที่จะลบโพสต์นี้?')) {
      try {
        await apiService.deletePost(id)
        setPosts(prev => prev.filter(p => p.id !== id))
        setFilteredPosts(prev => prev.filter(p => p.id !== id))
      } catch (error) {
        console.error('Error deleting post:', error)
        
        // Check if it's an authentication error
        if (error.message.includes('Authentication Error') || error.message.includes('401')) {
          alert('เซสชันหมดอายุ กรุณาเข้าสู่ระบบใหม่')
          // Try to refresh auth status first
          await refreshAuth()
          // If still not authenticated, redirect to login
          if (!user || !isAdmin) {
            window.location.href = '/login'
          }
        } else {
          alert('เกิดข้อผิดพลาดในการลบโพสต์: ' + error.message)
        }
      }
    }
  }

  const handleExportPosts = () => {
    const dataStr = JSON.stringify(posts, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `blog-posts-${new Date().toISOString().split('T')[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleImportPosts = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const importedPosts = JSON.parse(e.target.result)
          setPosts(importedPosts)
          setFilteredPosts(importedPosts)
          alert('นำเข้าข้อมูลสำเร็จ')
        } catch (error) {
          alert('เกิดข้อผิดพลาดในการนำเข้าข้อมูล')
          console.error(error)
        }
      }
      reader.readAsText(file)
    }
  }

  const loadSampleData = () => {
    if (window.confirm('คุณแน่ใจหรือไม่ที่จะโหลดข้อมูลตัวอย่าง? ข้อมูลปัจจุบันจะถูกลบ')) {
      const samplePosts = [
        {
          id: Date.now(),
          title: 'ยินดีต้อนรับสู่ระบบจัดการบล็อก',
          subtitle: 'เริ่มต้นใช้งานระบบจัดการเนื้อหาของคุณ',
          body: 'นี่คือโพสต์ตัวอย่างสำหรับระบบจัดการบล็อก คุณสามารถแก้ไข ลบ หรือเพิ่มโพสต์ใหม่ได้ตามต้องการ',
          date: new Date().toISOString().split('T')[0],
          author: 'ระบบ',
          photos: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]
      setPosts(samplePosts)
      setFilteredPosts(samplePosts)
      alert('โหลดข้อมูลตัวอย่างสำเร็จ')
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="pt-16 lg:pt-20">
      {/* Header */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-blue-50">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                จัดการระบบ
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                จัดการเว็บไซต์และดูข้อมูลสถิติ
              </p>
            </motion.div>

            {/* User Info */}
            {user && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex items-center space-x-4"
              >
                <div className="flex items-center space-x-3">
                  {user.photos && user.photos[0] && (
                    <img
                      src={user.photos[0].value}
                      alt={user.displayName}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">{user.displayName}</p>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="text-gray-500 hover:text-red-600 transition-colors duration-200"
                  title="ออกจากระบบ"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'analytics'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </button>
            <button
              onClick={() => setActiveTab('blog')}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'blog'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <FileText className="w-4 h-4 mr-2" />
              จัดการบล็อก
            </button>
          </div>
        </div>
      </section>

      {/* Content based on active tab */}
      {activeTab === 'analytics' ? (
        <AnalyticsDashboard />
      ) : (
        <>
          {/* Blog Management Content */}
          {/* Admin Controls */}
          <section className="section-padding bg-white border-b">
            <div className="container-custom">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                {/* Search */}
                <div className="relative w-full lg:w-96">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="ค้นหาโพสต์..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setShowForm(true)}
                    className="btn-primary inline-flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    สร้างโพสต์ใหม่
                  </button>
                  
                  <button
                    onClick={handleExportPosts}
                    className="btn-secondary inline-flex items-center"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    ส่งออก
                  </button>
                  
                  <label className="btn-secondary inline-flex items-center cursor-pointer">
                    <Upload className="w-4 h-4 mr-2" />
                    นำเข้า
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportPosts}
                      className="hidden"
                    />
                  </label>
                  
                  <button
                    onClick={loadSampleData}
                    className="btn-secondary inline-flex items-center"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    ข้อมูลตัวอย่าง
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Blog Form */}
          {showForm && (
            <section className="section-padding bg-gray-50">
              <BlogPostForm
                onSubmit={editingPost ? handleUpdatePost : handleCreatePost}
                onCancel={() => {
                  setShowForm(false)
                  setEditingPost(null)
                }}
              />
            </section>
          )}

          {/* Posts List */}
          <section className="section-padding">
            <div className="container-custom">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  โพสต์ทั้งหมด ({filteredPosts.length})
                </h2>
                <p className="text-gray-600">
                  จัดการโพสต์บล็อกของคุณ
                </p>
              </div>

              {filteredPosts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {searchTerm ? 'ไม่พบโพสต์ที่ค้นหา' : 'ยังไม่มีโพสต์'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {searchTerm ? 'ลองเปลี่ยนคำค้นหาหรือล้างตัวกรอง' : 'เริ่มต้นสร้างโพสต์แรกของคุณ'}
                  </p>
                  {!searchTerm && (
                    <button
                      onClick={() => setShowForm(true)}
                      className="btn-primary inline-flex items-center"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      สร้างโพสต์แรก
                    </button>
                  )}
                </motion.div>
              ) : (
                <div className="grid gap-6">
                  {filteredPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                            {post.title}
                          </h3>
                          {post.subtitle && (
                            <p className="text-gray-600 mb-3 line-clamp-1">
                              {post.subtitle}
                            </p>
                          )}
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                            {post.body.substring(0, 200)}...
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>�� {formatDate(post.date)}</span>
                            {post.author && <span>👤 {post.author}</span>}
                            <span>📷 {post.photos?.length || 0} รูปภาพ</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <button
                            onClick={() => {
                              setEditingPost(post)
                              setShowForm(true)
                            }}
                            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                            title="แก้ไข"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                            title="ลบ"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  )
}

export default AdminPanel
