# Backend Server - Firstly Tech Website

Express.js backend server with Google OAuth authentication, file upload handling, and JSON-based blog management.

## 🚀 Features

- **Google OAuth Authentication** - Secure admin login with Gmail
- **Email-based Authorization** - Only allowed emails can access admin features
- **File Upload with Multer** - Handle image uploads for blog posts
- **JSON File Storage** - Simple blog data storage without database
- **RESTful API** - Complete CRUD operations for blog posts
- **CORS Support** - Cross-origin requests for frontend integration
- **Security Middleware** - Helmet, session management, input validation

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google OAuth credentials

## 🛠️ Installation

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   
   # Google OAuth Configuration
   GOOGLE_CLIENT_ID=your_google_client_id_here
   GOOGLE_CLIENT_SECRET=your_google_client_secret_here
   GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback
   
   # Session Configuration
   SESSION_SECRET=your_session_secret_here
   
   # Allowed Admin Emails (comma-separated)
   ALLOWED_ADMIN_EMAILS=admin@firstlytech.com,manager@firstlytech.com
   
   # File Upload Configuration
   MAX_FILE_SIZE=10485760
   ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp,image/gif
   
   # Frontend URL (for CORS)
   FRONTEND_URL=http://localhost:3000
   ```

## 🔐 Google OAuth Setup

1. **Create Google OAuth Credentials:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API
   - Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
   - Set Application Type to "Web application"
   - Add Authorized redirect URIs:
     - `http://localhost:5000/auth/google/callback` (development)
     - `https://yourdomain.com/auth/google/callback` (production)

2. **Update .env file:**
   - Copy Client ID and Client Secret to your `.env` file

## 🚀 Running the Server

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will start on `http://localhost:5000`

## 📁 Project Structure

```
backend/
├── config/
│   └── passport.js          # Passport OAuth configuration
├── data/
│   └── blog-posts.json      # Blog posts storage
├── middleware/
│   └── auth.js              # Authentication middleware
├── routes/
│   ├── auth.js              # OAuth routes
│   ├── blog.js              # Blog CRUD routes
│   └── upload.js            # File upload routes
├── uploads/                 # Uploaded files directory
├── server.js                # Main server file
├── package.json
└── env.example
```

## 🔌 API Endpoints

### Authentication
- `GET /auth/google` - Initiate Google OAuth login
- `GET /auth/google/callback` - OAuth callback
- `GET /auth/status` - Check authentication status
- `GET /auth/logout` - Logout user

### Blog Posts
- `GET /api/blog` - Get all posts (public)
- `GET /api/blog/:id` - Get single post (public)
- `POST /api/blog` - Create new post (admin only)
- `PUT /api/blog/:id` - Update post (admin only)
- `DELETE /api/blog/:id` - Delete post (admin only)
- `GET /api/blog/search/:query` - Search posts (public)

### File Upload
- `POST /api/upload/single` - Upload single file (admin only)
- `POST /api/upload/multiple` - Upload multiple files (admin only)
- `DELETE /api/upload/:filename` - Delete file (admin only)
- `GET /api/upload/:filename` - Get file info (public)
- `GET /api/upload` - List all files (admin only)

### Health Check
- `GET /health` - Server health status

## 🔒 Security Features

- **Email Authorization** - Only emails in `ALLOWED_ADMIN_EMAILS` can access admin features
- **Session Management** - Secure session handling with express-session
- **CORS Protection** - Configured for specific frontend origin
- **Input Validation** - File type and size validation
- **Helmet Security** - Security headers middleware
- **File Upload Limits** - Configurable file size and count limits

## 📸 File Upload

### Supported Formats
- JPEG (.jpg, .jpeg)
- PNG (.png)
- WebP (.webp)
- GIF (.gif)

### Upload Limits
- Max file size: 10MB (configurable)
- Max files per request: 10
- Files stored in `uploads/` directory
- Unique filenames with timestamps

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment | development |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | - |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret | - |
| `GOOGLE_CALLBACK_URL` | OAuth callback URL | - |
| `SESSION_SECRET` | Session encryption secret | - |
| `ALLOWED_ADMIN_EMAILS` | Comma-separated admin emails | - |
| `MAX_FILE_SIZE` | Max file upload size (bytes) | 10485760 |
| `ALLOWED_FILE_TYPES` | Comma-separated MIME types | image/* |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:3000 |

## 🚀 Deployment

### Production Considerations

1. **Environment Variables:**
   - Set `NODE_ENV=production`
   - Use strong `SESSION_SECRET`
   - Configure production URLs

2. **HTTPS:**
   - Enable HTTPS in production
   - Set `secure: true` in session config

3. **File Storage:**
   - Consider using cloud storage (AWS S3, Google Cloud Storage)
   - Implement file cleanup for unused uploads

4. **Security:**
   - Use environment-specific CORS origins
   - Implement rate limiting
   - Add request logging

### Deployment Options

- **Heroku** - Easy deployment with Git
- **Railway** - Simple Node.js hosting
- **DigitalOcean** - VPS deployment
- **AWS EC2** - Scalable cloud hosting

## 🔍 Troubleshooting

### Common Issues

1. **OAuth Error:**
   - Check Google OAuth credentials
   - Verify redirect URI matches exactly
   - Ensure Google+ API is enabled

2. **File Upload Error:**
   - Check file size limits
   - Verify file type is allowed
   - Ensure uploads directory exists

3. **CORS Error:**
   - Verify `FRONTEND_URL` is correct
   - Check if credentials are enabled

4. **Authentication Error:**
   - Verify email is in `ALLOWED_ADMIN_EMAILS`
   - Check session configuration

## 📝 License

MIT License - see LICENSE file for details
