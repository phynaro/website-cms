// Google Analytics service for fetching analytics data
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

class GoogleAnalyticsService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method for making requests
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    console.log('Making analytics request to:', url);
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
      console.log('Analytics response status:', response.status);
      
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
      console.error('Analytics API request failed:', error);
      throw error;
    }
  }

  // Get analytics data from backend API
  async getAnalyticsData() {
    try {
      console.log('Fetching analytics data');
      console.log(await this.request('/api/analytics/data'));
      return await this.request('/api/analytics/data');
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      // Fallback to mock data if API fails
     // return this.getMockAnalyticsData();
    }
  }

  // Get real-time data from backend API
  async getRealTimeData() {
    try {
      console.log('Fetching real-time data');
    
      return await this.request('/api/analytics/realtime');
    } catch (error) {
      console.error('Error fetching real-time data:', error);
      // Fallback to mock data if API fails
      // return {
      //   activeUsers: Math.floor(Math.random() * 10) + 1,
      //   currentPage: window.location.pathname,
      //   lastUpdated: new Date().toISOString()
      // };
    }
  }

  // Mock analytics data for development (fallback)
  getMockAnalyticsData() {
    const now = new Date();
    const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    return {
      pageViews: {
        total: Math.floor(Math.random() * 1000) + 500,
        today: Math.floor(Math.random() * 50) + 10,
        thisWeek: Math.floor(Math.random() * 200) + 50,
        trend: Math.floor(Math.random() * 20) - 10 // -10 to +10
      },
      users: {
        total: Math.floor(Math.random() * 500) + 200,
        today: Math.floor(Math.random() * 30) + 5,
        thisWeek: Math.floor(Math.random() * 100) + 25,
        trend: Math.floor(Math.random() * 15) - 7
      },
      sessions: {
        total: Math.floor(Math.random() * 800) + 300,
        today: Math.floor(Math.random() * 40) + 8,
        thisWeek: Math.floor(Math.random() * 150) + 40,
        trend: Math.floor(Math.random() * 18) - 9
      },
      topPages: [
        { path: '/', views: Math.floor(Math.random() * 200) + 100, title: 'หน้าแรก' },
        { path: '/blog', views: Math.floor(Math.random() * 150) + 80, title: 'บล็อก' },
        { path: '/about', views: Math.floor(Math.random() * 100) + 50, title: 'เกี่ยวกับเรา' },
        { path: '/products', views: Math.floor(Math.random() * 80) + 40, title: 'ผลิตภัณฑ์' },
        { path: '/contact', views: Math.floor(Math.random() * 60) + 30, title: 'ติดต่อเรา' }
      ],
      recentActivity: [
        { time: new Date(now.getTime() - 5 * 60 * 1000), action: 'Page View', page: '/', user: 'Anonymous' },
        { time: new Date(now.getTime() - 12 * 60 * 1000), action: 'Page View', page: '/blog', user: 'Anonymous' },
        { time: new Date(now.getTime() - 18 * 60 * 1000), action: 'Page View', page: '/about', user: 'Anonymous' },
        { time: new Date(now.getTime() - 25 * 60 * 1000), action: 'Page View', page: '/', user: 'Anonymous' },
        { time: new Date(now.getTime() - 35 * 60 * 1000), action: 'Page View', page: '/products', user: 'Anonymous' }
      ]
    };
  }
}

const analyticsService = new GoogleAnalyticsService();
export default analyticsService;
