# Complete Setup Guide - Express Backend + React Frontend

This guide will help you set up the complete blog system with Express backend and React frontend.

## 🚀 Quick Start

### 1. Backend Setup

```bash
cd backend
npm install
cp env.example .env
# Edit .env with your Google OAuth credentials
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
cp env.example .env.local
# Edit .env.local with your API URL
npm run dev
```

## 🔐 Google OAuth Setup

1. **Create Google Cloud Project:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create new project or select existing
   - Enable Google+ API

2. **Create OAuth Credentials:**
   - Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
   - Application Type: "Web application"
   - Authorized redirect URIs:
     - `http://localhost:5000/auth/google/callback` (development)
     - `https://yourdomain.com/auth/google/callback` (production)

3. **Update Backend .env:**
   ```env
   GOOGLE_CLIENT_ID=your_client_id_here
   GOOGLE_CLIENT_SECRET=your_client_secret_here
   ALLOWED_ADMIN_EMAILS=admin@firstlytech.com,manager@firstlytech.com
   ```

## 📁 Project Structure

```
website-cms/
├── backend/
│   ├── config/
│   │   └── passport.js          # OAuth configuration
│   ├── data/
│   │   └── blog-posts.json      # Blog storage
│   ├── middleware/
│   │   └── auth.js              # Auth middleware
│   ├── routes/
│   │   ├── auth.js              # OAuth routes
│   │   ├── blog.js              # Blog API
│   │   └── upload.js            # File upload
│   ├── uploads/                 # Uploaded files
│   ├── server.js                # Main server
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/          # React components
    │   ├── pages/               # Page components
    │   ├── services/            # API service
    │   ├── contexts/            # Auth context
    │   └── utils/               # Utilities
    └── package.json
```

## 🔌 API Endpoints

### Authentication
- `GET /auth/google` - OAuth login
- `GET /auth/status` - Check auth status
- `GET /auth/logout` - Logout

### Blog Posts
- `GET /api/blog` - Get all posts
- `GET /api/blog/:id` - Get single post
- `POST /api/blog` - Create post (admin)
- `PUT /api/blog/:id` - Update post (admin)
- `DELETE /api/blog/:id` - Delete post (admin)

### File Upload
- `POST /api/upload/multiple` - Upload photos (admin)
- `GET /uploads/:filename` - Serve uploaded files

## 🎯 Features

### Backend
- ✅ Google OAuth authentication
- ✅ Email-based admin authorization
- ✅ File upload with Multer
- ✅ JSON file storage
- ✅ RESTful API
- ✅ CORS support
- ✅ Security middleware

### Frontend
- ✅ React 18 + Vite + TailwindCSS
- ✅ Google Analytics integration
- ✅ Authentication context
- ✅ Blog post management
- ✅ Photo gallery with auto-scroll
- ✅ Responsive design
- ✅ Admin panel

## 🔧 Configuration

### Backend Environment (.env)
```env
PORT=5000
NODE_ENV=development
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback
SESSION_SECRET=your_session_secret
ALLOWED_ADMIN_EMAILS=admin@firstlytech.com,manager@firstlytech.com
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp,image/gif
FRONTEND_URL=http://localhost:3000
```

### Frontend Environment (.env.local)
```env
VITE_API_URL=http://localhost:5000
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

## 🚀 Deployment

### Backend Deployment
1. **Heroku:**
   ```bash
   heroku create your-app-name
   git push heroku main
   ```

2. **Railway:**
   - Connect GitHub repository
   - Set environment variables
   - Deploy automatically

### Frontend Deployment
1. **Vercel:**
   ```bash
   npm run build
   vercel --prod
   ```

2. **Netlify:**
   - Connect GitHub repository
   - Build command: `npm run build`
   - Publish directory: `dist`

## 🔒 Security

- **OAuth Authentication** - Secure Google login
- **Email Authorization** - Only allowed emails can access admin
- **Session Management** - Secure session handling
- **File Upload Validation** - Type and size restrictions
- **CORS Protection** - Configured for specific origins

## 📸 File Upload

- **Supported Formats:** JPEG, PNG, WebP, GIF
- **Max Size:** 10MB per file
- **Max Files:** 10 per request
- **Storage:** Server uploads directory
- **URLs:** `/uploads/filename.ext`

## 🎨 Blog Features

- **Auto-scrolling Photo Gallery** - Automatic slideshow
- **Manual Navigation** - Arrows and dots
- **Play/Pause Controls** - User control
- **Responsive Design** - Mobile-friendly
- **Search Functionality** - Find posts easily

## 🔍 Troubleshooting

### Common Issues

1. **OAuth Error:**
   - Check Google credentials
   - Verify redirect URI
   - Ensure Google+ API enabled

2. **File Upload Error:**
   - Check file size limits
   - Verify file types
   - Ensure uploads directory exists

3. **CORS Error:**
   - Verify FRONTEND_URL in backend .env
   - Check credentials setting

4. **Authentication Error:**
   - Verify email in ALLOWED_ADMIN_EMAILS
   - Check session configuration

## 📝 Usage

### For Admin
1. Visit `/admin` on your website
2. Click "Login with Google"
3. Use authorized email to access
4. Create, edit, delete blog posts
5. Upload photos for posts

### For Visitors
1. Visit `/blog` to see all posts
2. Click on posts to read full content
3. Enjoy auto-scrolling photo galleries
4. Search for specific posts

## 🎯 Next Steps

1. **Set up Google OAuth credentials**
2. **Configure environment variables**
3. **Start backend server**
4. **Start frontend development server**
5. **Test authentication and blog features**
6. **Deploy to production**

---

This setup provides a complete blog system with secure authentication, file uploads, and a beautiful frontend interface!
