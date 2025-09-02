// Simple blog data storage utility
// This replaces the need for a full CMS

export const BlogStorage = {
  // Get all posts
  getAllPosts: () => {
    try {
      const posts = localStorage.getItem('blogPosts')
      return posts ? JSON.parse(posts) : []
    } catch (error) {
      console.error('Error loading posts:', error)
      return []
    }
  },

  // Get single post by ID
  getPostById: (id) => {
    try {
      const posts = localStorage.getItem('blogPosts')
      if (posts) {
        const parsedPosts = JSON.parse(posts)
        return parsedPosts.find(post => post.id.toString() === id.toString())
      }
      return null
    } catch (error) {
      console.error('Error loading post:', error)
      return null
    }
  },

  // Create new post
  createPost: (postData) => {
    try {
      const posts = BlogStorage.getAllPosts()
      const newPost = {
        ...postData,
        id: Date.now(),
        createdAt: new Date().toISOString()
      }
      const updatedPosts = [newPost, ...posts]
      localStorage.setItem('blogPosts', JSON.stringify(updatedPosts))
      return newPost
    } catch (error) {
      console.error('Error creating post:', error)
      throw error
    }
  },

  // Update post
  updatePost: (id, updatedData) => {
    try {
      const posts = BlogStorage.getAllPosts()
      const updatedPosts = posts.map(post => 
        post.id.toString() === id.toString() 
          ? { ...post, ...updatedData, updatedAt: new Date().toISOString() }
          : post
      )
      localStorage.setItem('blogPosts', JSON.stringify(updatedPosts))
      return true
    } catch (error) {
      console.error('Error updating post:', error)
      return false
    }
  },

  // Delete post
  deletePost: (id) => {
    try {
      const posts = BlogStorage.getAllPosts()
      const filteredPosts = posts.filter(post => post.id.toString() !== id.toString())
      localStorage.setItem('blogPosts', JSON.stringify(filteredPosts))
      return true
    } catch (error) {
      console.error('Error deleting post:', error)
      return false
    }
  },

  // Export posts (for backup)
  exportPosts: () => {
    try {
      const posts = BlogStorage.getAllPosts()
      const dataStr = JSON.stringify(posts, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `blog-posts-${new Date().toISOString().split('T')[0]}.json`
      link.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error exporting posts:', error)
    }
  },

  // Import posts (for restore)
  importPosts: (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const posts = JSON.parse(e.target.result)
          localStorage.setItem('blogPosts', JSON.stringify(posts))
          resolve(posts)
        } catch (error) {
          reject(error)
        }
      }
      reader.onerror = reject
      reader.readAsText(file)
    })
  },

  // Clear all posts
  clearAllPosts: () => {
    try {
      localStorage.removeItem('blogPosts')
      return true
    } catch (error) {
      console.error('Error clearing posts:', error)
      return false
    }
  },

  // Get posts count
  getPostsCount: () => {
    return BlogStorage.getAllPosts().length
  },

  // Search posts
  searchPosts: (query) => {
    const posts = BlogStorage.getAllPosts()
    const searchTerm = query.toLowerCase()
    
    return posts.filter(post => 
      post.title.toLowerCase().includes(searchTerm) ||
      post.subtitle?.toLowerCase().includes(searchTerm) ||
      post.body.toLowerCase().includes(searchTerm) ||
      post.author?.toLowerCase().includes(searchTerm)
    )
  }
}

// Sample data for testing
export const samplePosts = [
  {
    id: 1,
    title: 'เปิดตัวผลิตภัณฑ์ใหม่',
    subtitle: 'เครื่องแบ่งบรรจุวัคซีนอัตโนมัติรุ่นล่าสุด',
    body: 'บริษัท เฟิร์สลี่เทค จำกัด ขอแนะนำเครื่องแบ่งบรรจุวัคซีนอัตโนมัติรุ่นล่าสุดที่มีความแม่นยำสูงและประสิทธิภาพดีเยี่ยม...',
    date: '2024-01-15',
    author: 'ทีมงาน Firstly Tech',
    createdAt: '2024-01-15T10:00:00.000Z',
    photos: []
  },
  {
    id: 2,
    title: 'ร่วมงานแสดงสินค้า Medical Fair 2024',
    subtitle: 'พบกับเราได้ที่บูธ A12 ในงาน Medical Fair 2024',
    body: 'บริษัท เฟิร์สลี่เทค จำกัด จะเข้าร่วมงานแสดงสินค้า Medical Fair 2024 ระหว่างวันที่ 20-22 มีนาคม 2024...',
    date: '2024-01-10',
    author: 'ทีมงาน Marketing',
    createdAt: '2024-01-10T14:30:00.000Z',
    photos: []
  }
]
