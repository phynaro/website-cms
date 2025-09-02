const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const { isAuthenticatedOrPublic, isAdmin } = require('../middleware/auth');

const router = express.Router();
const BLOG_DATA_FILE = path.join(__dirname, '../data/blog-posts.json');

// Ensure data directory exists
fs.ensureDirSync(path.dirname(BLOG_DATA_FILE));

// Helper function to read blog posts
const readBlogPosts = async () => {
  try {
    if (await fs.pathExists(BLOG_DATA_FILE)) {
      const data = await fs.readFile(BLOG_DATA_FILE, 'utf8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
};

// Helper function to write blog posts
const writeBlogPosts = async (posts) => {
  try {
    await fs.writeJson(BLOG_DATA_FILE, posts, { spaces: 2 });
    return true;
  } catch (error) {
    console.error('Error writing blog posts:', error);
    return false;
  }
};

// Get all blog posts (public)
router.get('/', async (req, res) => {
  try {
    const posts = await readBlogPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

// Get single blog post by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const posts = await readBlogPosts();
    const post = posts.find(p => p.id.toString() === req.params.id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blog post' });
  }
});

// Create new blog post (admin only)
router.post('/', isAdmin, async (req, res) => {
  try {
    const { title, subtitle, body, date, author, photos } = req.body;
    
    if (!title || !body) {
      return res.status(400).json({ error: 'Title and body are required' });
    }

    const posts = await readBlogPosts();
    const newPost = {
      id: Date.now(),
      title,
      subtitle,
      body,
      date: date || new Date().toISOString().split('T')[0],
      author,
      photos: photos || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    posts.unshift(newPost);
    await writeBlogPosts(posts);

    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ error: 'Failed to create blog post' });
  }
});

// Update blog post (admin only)
router.put('/:id', isAdmin, async (req, res) => {
  try {
    const { title, subtitle, body, date, author, photos } = req.body;
    const posts = await readBlogPosts();
    const postIndex = posts.findIndex(p => p.id.toString() === req.params.id);

    if (postIndex === -1) {
      return res.status(404).json({ error: 'Post not found' });
    }

    posts[postIndex] = {
      ...posts[postIndex],
      title: title || posts[postIndex].title,
      subtitle: subtitle !== undefined ? subtitle : posts[postIndex].subtitle,
      body: body || posts[postIndex].body,
      date: date || posts[postIndex].date,
      author: author || posts[postIndex].author,
      photos: photos || posts[postIndex].photos,
      updatedAt: new Date().toISOString()
    };

    await writeBlogPosts(posts);
    res.json(posts[postIndex]);
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(500).json({ error: 'Failed to update blog post' });
  }
});

// Delete blog post (admin only)
router.delete('/:id', isAdmin, async (req, res) => {
  try {
    const posts = await readBlogPosts();
    const postIndex = posts.findIndex(p => p.id.toString() === req.params.id);

    if (postIndex === -1) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Remove photos from server if they exist
    const post = posts[postIndex];
    if (post.photos && post.photos.length > 0) {
      for (const photo of post.photos) {
        if (photo.filename) {
          const photoPath = path.join(__dirname, '../uploads', photo.filename);
          try {
            await fs.remove(photoPath);
          } catch (error) {
            console.error('Error deleting photo:', error);
          }
        }
      }
    }

    posts.splice(postIndex, 1);
    await writeBlogPosts(posts);

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ error: 'Failed to delete blog post' });
  }
});

// Search blog posts (public)
router.get('/search/:query', async (req, res) => {
  try {
    const posts = await readBlogPosts();
    const query = req.params.query.toLowerCase();
    
    const filteredPosts = posts.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.subtitle?.toLowerCase().includes(query) ||
      post.body.toLowerCase().includes(query) ||
      post.author?.toLowerCase().includes(query)
    );

    res.json(filteredPosts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search blog posts' });
  }
});

module.exports = router;
