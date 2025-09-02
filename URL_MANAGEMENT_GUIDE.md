# Backend URL Management Guide

## Overview
This guide explains how to properly manage backend URLs when calling from the frontend in different environments.

## URL Configuration Strategies

### 1. **Same Domain Strategy (Recommended)**
When your frontend and backend are served from the same domain:

```
Frontend: https://yourdomain.com
Backend: https://yourdomain.com/api/
```

**Configuration:**
```bash
# Frontend .env.production
VITE_API_URL=  # Leave empty to use same domain
```

**Benefits:**
- No CORS issues
- Simpler SSL certificate management
- Better performance (no cross-origin requests)
- Shared cookies for authentication

### 2. **Subdomain Strategy**
When using separate subdomains:

```
Frontend: https://yourdomain.com
Backend: https://api.yourdomain.com
```

**Configuration:**
```bash
# Frontend .env.production
VITE_API_URL=https://api.yourdomain.com
```

### 3. **Separate Domain Strategy**
When using completely different domains:

```
Frontend: https://yourdomain.com
Backend: https://backend-server.com
```

**Configuration:**
```bash
# Frontend .env.production
VITE_API_URL=https://backend-server.com
```

## Implementation Details

### URL Resolution Logic
The `urlConfig.js` utility handles URL resolution automatically:

```javascript
const getApiUrl = () => {
  // If VITE_API_URL is explicitly set, use it
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // In production, use the same domain as the frontend
  if (import.meta.env.PROD) {
    return window.location.origin;
  }
  
  // In development, use localhost
  return 'http://localhost:5001';
};
```

### Usage Examples

#### API Calls
```javascript
import { getApiEndpoint } from '../utils/urlConfig';

// Automatically resolves to correct URL
const response = await fetch(getApiEndpoint('/api/blog'));
```

#### Authentication
```javascript
import { getAuthUrl } from '../utils/urlConfig';

// Redirects to correct auth endpoint
window.location.href = getAuthUrl('google');
```

#### File Uploads
```javascript
import { getUploadUrl } from '../utils/urlConfig';

// Gets correct upload URL
const imageUrl = getUploadUrl('blog-image.jpg');
```

## Production Deployment Scenarios

### Scenario 1: Single Server with Reverse Proxy
```
┌─────────────────┐
│   Nginx/Apache  │
│  (Reverse Proxy)│
├─────────────────┤
│ Frontend: /     │
│ Backend: /api/  │
└─────────────────┘
```

**Nginx Configuration:**
```nginx
server {
    listen 443 ssl;
    server_name yourdomain.com;
    
    # Frontend
    location / {
        root /path/to/frontend/dist;
        try_files $uri $uri/ /index.html;
    }
    
    # Backend API
    location /api/ {
        proxy_pass http://localhost:5001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    
    # Auth routes
    location /auth/ {
        proxy_pass http://localhost:5001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

**Environment Variables:**
```bash
# Frontend .env.production
VITE_API_URL=  # Empty - uses same domain

# Backend .env
FRONTEND_URL=https://yourdomain.com
```

### Scenario 2: Separate Servers
```
┌─────────────────┐    ┌─────────────────┐
│  Frontend Server│    │  Backend Server  │
│ yourdomain.com  │    │ api.yourdomain.com│
└─────────────────┘    └─────────────────┘
```

**Environment Variables:**
```bash
# Frontend .env.production
VITE_API_URL=https://api.yourdomain.com

# Backend .env
FRONTEND_URL=https://yourdomain.com
```

### Scenario 3: CDN + Backend
```
┌─────────────────┐    ┌─────────────────┐
│   CDN/Frontend  │    │  Backend Server  │
│ yourdomain.com  │    │ api.yourdomain.com│
└─────────────────┘    └─────────────────┘
```

**Environment Variables:**
```bash
# Frontend .env.production
VITE_API_URL=https://api.yourdomain.com
VITE_CDN_URL=https://cdn.yourdomain.com

# Backend .env
FRONTEND_URL=https://yourdomain.com
```

## Security Considerations

### CORS Configuration
For separate domains, ensure proper CORS setup in backend:

```javascript
// backend/server.js
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

### SSL/TLS
- Always use HTTPS in production
- Ensure SSL certificates are valid for all domains
- Set up proper redirects from HTTP to HTTPS

### Authentication
- Use secure cookies for session management
- Set proper cookie attributes:
  ```javascript
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    domain: process.env.NODE_ENV === 'production' ? '.yourdomain.com' : undefined
  }
  ```

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check `FRONTEND_URL` in backend environment
   - Ensure CORS is properly configured
   - Verify SSL certificates

2. **Authentication Failures**
   - Check cookie domain settings
   - Verify OAuth callback URLs
   - Ensure session configuration is correct

3. **File Upload Issues**
   - Check file permissions on upload directory
   - Verify upload URL resolution
   - Ensure proper MIME type handling

### Debug Tools
```javascript
// Add to your components for debugging
import { getApiUrl, isProduction, isDevelopment } from '../utils/urlConfig';

console.log('API URL:', getApiUrl());
console.log('Environment:', isProduction ? 'Production' : 'Development');
```

## Best Practices

1. **Environment Variables**
   - Never commit `.env` files to version control
   - Use `.env.example` files for documentation
   - Validate environment variables on startup

2. **URL Management**
   - Centralize URL configuration
   - Use utility functions instead of hardcoded URLs
   - Test URL resolution in all environments

3. **Security**
   - Always use HTTPS in production
   - Implement proper CORS policies
   - Use secure session management

4. **Monitoring**
   - Log API calls for debugging
   - Monitor CORS errors
   - Track authentication failures
