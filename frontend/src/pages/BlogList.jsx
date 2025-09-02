import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, User, ArrowRight, Plus } from 'lucide-react'
import apiService from '../services/api'
import BlogPostForm from '../components/BlogPostForm'

const BlogList = () => {
  const [posts, setPosts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      const posts = await apiService.getAllPosts()
      setPosts(posts)
    } catch (error) {
      console.error('Error loading posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePost = (postData) => {
    setPosts(prev => [postData, ...prev])
    setShowForm(false)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getFirstPhoto = (photos) => {
    if (!photos || photos.length === 0) return null
    return photos[0].url || photos[0]
  }

  if (loading) {
    return (
      <div className="section-padding">
        <div className="container-custom text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">กำลังโหลด...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-blue-50">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                กิจกรรมและข่าวสาร
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                ติดตามกิจกรรมและข่าวสารล่าสุดของบริษัท เฟิร์สลี่เทค จำกัด
              </p>
            </motion.div>

            {/* <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              onClick={() => setShowForm(true)}
              className="btn-primary text-lg px-6 py-3 inline-flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              สร้างโพสต์ใหม่
            </motion.button> */}
          </div>
        </div>
      </section>

      {/* Blog Form */}
      {showForm && (
        <section className="section-padding bg-gray-50">
          <BlogPostForm
            onSubmit={handleCreatePost}
            onCancel={() => setShowForm(false)}
          />
        </section>
      )}

      {/* Blog Posts */}
      <section className="section-padding">
        <div className="container-custom">
          {posts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                ยังไม่มีโพสต์
              </h3>
              <p className="text-gray-600 mb-4">
                เริ่มต้นสร้างโพสต์แรกของคุณ
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="btn-primary inline-flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                สร้างโพสต์แรก
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                >
                  {/* Featured Image */}
                  {getFirstPhoto(post.photos) && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={getFirstPhoto(post.photos)}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                      {post.title}
                    </h2>
                    
                    {post.subtitle && (
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {post.subtitle}
                      </p>
                    )}

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                      {post.author && (
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                      )}
                    </div>

                    {/* Preview */}
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {post.body.substring(0, 150)}...
                    </p>

                    {/* Read More */}
                    <Link
                      to={`/blog/${post.id}`}
                      className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                    >
                      อ่านเพิ่มเติม
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default BlogList
