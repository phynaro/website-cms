import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react'
import apiService from '../services/api'
import BlogPost from '../components/BlogPost'

const BlogPostPage = () => {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadPost()
  }, [id])

  const loadPost = async () => {
    try {
      const foundPost = await apiService.getPostById(id)
      setPost(foundPost)
    } catch (error) {
      console.error('Error loading post:', error)
      setError('ไม่พบโพสต์ที่ต้องการ')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="pt-16 lg:pt-20 section-padding">
        <div className="container-custom text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">กำลังโหลด...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="pt-16 lg:pt-20 section-padding">
        <div className="container-custom text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {error}
          </h2>
          <p className="text-gray-600 mb-6">
            โพสต์ที่คุณกำลังค้นหาอาจถูกลบหรือไม่เคยมีอยู่
          </p>
          <Link
            to="/blog"
            className="btn-primary inline-flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            กลับไปยังบล็อก
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 lg:pt-20">
      {/* Navigation */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <Link
            to="/blog"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            กลับไปยังบล็อก
          </Link>
        </div>
      </section>

      {/* Blog Post */}
      <section className="section-padding">
        <div className="container-custom">
          <BlogPost post={post} />
        </div>
      </section>

      {/* Related Posts */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            โพสต์อื่นๆ
          </h2>
          <div className="text-center">
            <Link
              to="/blog"
              className="btn-primary inline-flex items-center"
            >
              ดูโพสต์ทั้งหมด
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BlogPostPage
