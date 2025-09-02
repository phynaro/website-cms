// API service for backend communication
import { getApiUrl } from '../utils/urlConfig';

class ApiService {
  constructor() {
    this.baseURL = getApiUrl();
  }

  // Helper method for making requests
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    console.log('Making request to:', url);
    const config = {
      credentials: 'include', // Include cookies for session
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || `HTTP ${response.status}`;
        
        // Create a more specific error for authentication issues
        if (response.status === 401) {
          throw new Error(`Authentication Error: ${errorMessage}`);
        } else if (response.status === 403) {
          throw new Error(`Access Denied: ${errorMessage}`);
        } else {
          throw new Error(errorMessage);
        }
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication methods
  async getAuthStatus() {
    console.log('getAuthStatus called, baseURL:', this.baseURL);
    return this.request('/auth/status');
  }

  async refreshSession() {
    return this.request('/auth/refresh');
  }

  async logout() {
    return this.request('/auth/logout');
  }

  // Blog post methods
  async getAllPosts() {
    return this.request('/api/blog');
  }

  async getPostById(id) {
    return this.request(`/api/blog/${id}`);
  }

  async createPost(postData) {
    return this.request('/api/blog', {
      method: 'POST',
      body: JSON.stringify(postData),
    });
  }

  async updatePost(id, postData) {
    return this.request(`/api/blog/${id}`, {
      method: 'PUT',
      body: JSON.stringify(postData),
    });
  }

  async deletePost(id) {
    return this.request(`/api/blog/${id}`, {
      method: 'DELETE',
    });
  }

  async searchPosts(query) {
    return this.request(`/api/blog/search/${encodeURIComponent(query)}`);
  }

  // File upload methods
  async uploadSingleFile(file) {
    const formData = new FormData();
    formData.append('photo', file);

    const url = `${this.baseURL}/api/upload/single`;
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    return await response.json();
  }

  async uploadMultipleFiles(files) {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append('photos', file);
    });

    const url = `${this.baseURL}/api/upload/multiple`;
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    return await response.json();
  }

  async deleteFile(filename) {
    return this.request(`/api/upload/${filename}`, {
      method: 'DELETE',
    });
  }

  async getFileInfo(filename) {
    return this.request(`/api/upload/${filename}`);
  }

  async listFiles() {
    return this.request('/api/upload');
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
