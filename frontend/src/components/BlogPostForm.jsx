import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Upload, Calendar, User, ArrowLeft, ArrowRight } from 'lucide-react'
import apiService from '../services/api'

const BlogPostForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    body: '',
    photos: [],
    author: '',
    date: new Date().toISOString().split('T')[0]
  })
  const [photoFiles, setPhotoFiles] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files)
    setPhotoFiles(prev => [...prev, ...files])
    
    // Create preview URLs
    const newPhotos = files.map(file => ({
      id: Date.now() + Math.random(),
      file: file,
      preview: URL.createObjectURL(file)
    }))
    
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...newPhotos]
    }))
  }

  const removePhoto = (photoId) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter(photo => photo.id !== photoId)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Upload photos to server
      let uploadedPhotos = []
      if (formData.photos.length > 0) {
        const photoFiles = formData.photos.map(photo => photo.file)
        uploadedPhotos = await apiService.uploadMultipleFiles(photoFiles)
      }

      const postData = {
        title: formData.title,
        subtitle: formData.subtitle,
        body: formData.body,
        date: formData.date,
        author: formData.author,
        photos: uploadedPhotos
      }

      const newPost = await apiService.createPost(postData)
      onSubmit(newPost)
      
      // Reset form
      setFormData({
        title: '',
        subtitle: '',
        body: '',
        photos: [],
        author: '',
        date: new Date().toISOString().split('T')[0]
      })
      setPhotoFiles([])
    } catch (error) {
      console.error('Error creating post:', error)
      alert('เกิดข้อผิดพลาดในการสร้างโพสต์: ' + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">สร้างโพสต์ใหม่</h2>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            หัวข้อ *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="กรอกหัวข้อโพสต์"
            required
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            หัวข้อรอง
          </label>
          <input
            type="text"
            value={formData.subtitle}
            onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="กรอกหัวข้อรอง (ไม่บังคับ)"
          />
        </div>

        {/* Date and Author */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              วันที่ *
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ผู้เขียน
            </label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="ชื่อผู้เขียน"
            />
          </div>
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            รูปภาพ (หลายรูปได้)
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 mb-2">คลิกเพื่อเลือกรูปภาพ</p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
              id="photo-upload"
            />
            <label
              htmlFor="photo-upload"
              className="btn-primary cursor-pointer inline-flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              เลือกรูปภาพ
            </label>
          </div>
        </div>

        {/* Photo Preview */}
        {formData.photos.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">รูปภาพที่เลือก:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.photos.map((photo) => (
                <div key={photo.id} className="relative">
                  <img
                    src={photo.preview}
                    alt="Preview"
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(photo.id)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Body */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            เนื้อหา *
          </label>
          <textarea
            value={formData.body}
            onChange={(e) => setFormData(prev => ({ ...prev, body: e.target.value }))}
            rows={8}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            placeholder="กรอกเนื้อหาโพสต์"
            required
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary"
          >
            ยกเลิก
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary disabled:opacity-50"
          >
            {isSubmitting ? 'กำลังสร้างโพสต์...' : 'สร้างโพสต์'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default BlogPostForm
