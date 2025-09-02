# Production Deployment Guide

## Prerequisites
- Node.js 18+ installed on production server
- Domain name configured with SSL certificate
- Google OAuth credentials configured for production domain

## Environment Setup

### Backend Environment Variables
Create `.env` file in `backend/` directory:
```bash
NODE_ENV=production
PORT=5001
SESSION_SECRET=your-strong-production-secret-key-here
FRONTEND_URL=https://your-production-domain.com
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=https://your-production-domain.com/auth/google/callback
```

### Frontend Environment Variables
Create `.env.production` file in `frontend/` directory:
```bash
VITE_API_URL=https://your-production-domain.com
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

## Deployment Steps

### 1. Backend Deployment
```bash
cd backend
npm install --production
npm run prod
```

### 2. Frontend Deployment
```bash
cd frontend
npm install
npm run build:prod
```

### 3. File Uploads
- Ensure `backend/uploads/` directory exists and is writable
- Update all hardcoded URLs in `backend/data/blog-posts.json` to use production domain

### 4. Reverse Proxy Setup (Nginx Example)
```nginx
server {
    listen 80;
    server_name your-production-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-production-domain.com;
    
    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;
    
    # Frontend
    location / {
        root /path/to/frontend/dist;
        try_files $uri $uri/ /index.html;
    }
    
    # Backend API
    location /api/ {
        proxy_pass http://localhost:5001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Auth routes
    location /auth/ {
        proxy_pass http://localhost:5001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Uploads
    location /uploads/ {
        proxy_pass http://localhost:5001;
    }
}
```

## Security Checklist
- [ ] SSL certificate installed and configured
- [ ] Strong session secret set
- [ ] Google OAuth configured for production domain
- [ ] CORS properly configured for production frontend URL
- [ ] Content Security Policy enabled
- [ ] Helmet security headers enabled
- [ ] Environment variables properly set
- [ ] No hardcoded localhost URLs remain

## Monitoring
- Set up process manager (PM2) for backend
- Configure logging
- Set up health checks
- Monitor file uploads directory size

## Backup Strategy
- Regular backups of `backend/data/` and `backend/uploads/`
- Database backups (if applicable)
- Environment configuration backups
