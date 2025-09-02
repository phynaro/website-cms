import { motion } from 'framer-motion'
import { Calendar, User, Clock } from 'lucide-react'
import PhotoGallery from './PhotoGallery'

const BlogPost = ({ post }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('th-TH', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
    >
      {/* Photo Gallery */}
      {post.photos && post.photos.length > 0 && (
        <div className="mb-6">
          <PhotoGallery photos={post.photos} />
        </div>
      )}

      {/* Content */}
      <div className="p-8">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          
          {post.subtitle && (
            <p className="text-xl text-gray-600 mb-4">
              {post.subtitle}
            </p>
          )}

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 border-t border-gray-200 pt-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.date)}</span>
            </div>
            
            {post.author && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{formatTime(post.createdAt)}</span>
            </div>
          </div>
        </header>

        {/* Body */}
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {post.body}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>โพสต์โดย {post.author || 'Firstly Tech'}</span>
            <span>ID: {post.id}</span>
          </div>
        </footer>
      </div>
    </motion.article>
  )
}

export default BlogPost
