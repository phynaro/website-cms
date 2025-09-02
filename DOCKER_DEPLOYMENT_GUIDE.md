# Trazor.cloud Docker Deployment Guide

## Prerequisites

### Ubuntu Server Requirements
- Ubuntu 20.04+ with Docker and Docker Compose installed
- Domain `trazor.cloud` pointing to your server's IP address
- Ports 80 and 443 open in firewall

### Install Docker and Docker Compose
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Add user to docker group
sudo usermod -aG docker $USER
newgrp docker
```

## Configuration

### 1. Environment Variables
Create `.env` file in the project root:
```bash
# Backend Configuration
NODE_ENV=production
SESSION_SECRET=your-super-secure-session-secret-key-here-change-this
FRONTEND_URL=https://trazor.cloud

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=https://trazor.cloud/auth/google/callback

# Admin Access Control
ALLOWED_ADMIN_EMAILS=your-email@gmail.com,another-admin@example.com

# Frontend Configuration
VITE_API_URL=https://trazor.cloud
VITE_GA_TRACKING_ID=G-XXXXXXXXXX

# Let's Encrypt Configuration
CERTBOT_EMAIL=your-email@trazor.cloud

# File Upload Settings
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp,image/gif
```

### 2. Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized origins: `https://trazor.cloud`
6. Add authorized redirect URIs: `https://trazor.cloud/auth/google/callback`
7. Copy Client ID and Client Secret to `.env` file

## Deployment

### Quick Deployment
```bash
# Clone your repository
git clone <your-repo-url>
cd website-cms

# Configure environment
cp .env.example .env
# Edit .env with your values

# Run deployment script
./deploy.sh
```

### Manual Deployment
```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# Check service status
docker-compose ps

# View logs
docker-compose logs -f
```

## Architecture

```
┌─────────────────┐
│   Internet      │
└─────────┬───────┘
          │
┌─────────▼───────┐
│   Nginx (443)   │ ← SSL Termination
└─────────┬───────┘
          │
    ┌─────▼─────┐
    │ Frontend  │ ← React App
    └─────┬─────┘
          │
    ┌─────▼─────┐
    │ Backend   │ ← Node.js API
    └───────────┘
```

## Services

### Frontend (React)
- **Port**: 80 (internal)
- **Build**: Multi-stage Docker build
- **Serving**: Nginx static files
- **Features**: React Router, SEO optimization

### Backend (Node.js)
- **Port**: 5001 (internal)
- **Features**: API, Authentication, File uploads
- **Health Check**: `/health` endpoint

### Nginx (Reverse Proxy)
- **Ports**: 80, 443 (external)
- **Features**: SSL termination, load balancing, caching
- **Security**: Rate limiting, security headers

### Certbot (SSL)
- **Purpose**: Let's Encrypt SSL certificates
- **Auto-renewal**: Built-in cron job

## File Structure
```
website-cms/
├── docker-compose.yml
├── Dockerfile.backend
├── Dockerfile.frontend
├── deploy.sh
├── .env
├── nginx/
│   ├── nginx.conf
│   └── conf.d/
│       └── trazor.cloud.conf
├── backend/
│   ├── server.js
│   ├── routes/
│   └── uploads/
└── frontend/
    ├── src/
    └── dist/
```

## SSL Certificate Management

### Initial Certificate
```bash
# Get initial certificate
docker-compose run --rm certbot

# Reload nginx
docker-compose exec nginx nginx -s reload
```

### Auto-renewal
```bash
# Set up cron job for auto-renewal
echo "0 12 * * * /usr/local/bin/docker-compose -f /path/to/docker-compose.yml run --rm certbot renew --quiet && /usr/local/bin/docker-compose -f /path/to/docker-compose.yml exec nginx nginx -s reload" | sudo crontab -
```

## Monitoring and Maintenance

### Health Checks
```bash
# Check all services
docker-compose ps

# Check specific service
docker-compose exec backend curl http://localhost:5001/health

# Check nginx
docker-compose exec nginx nginx -t
```

### Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f nginx
```

### Backup
```bash
# Backup data
docker run --rm -v website-cms_backend_data:/data -v $(pwd):/backup alpine tar czf /backup/backend-data-$(date +%Y%m%d).tar.gz -C /data .

# Backup uploads
docker run --rm -v website-cms_backend_uploads:/data -v $(pwd):/backup alpine tar czf /backup/uploads-$(date +%Y%m%d).tar.gz -C /data .
```

### Updates
```bash
# Pull latest code
git pull

# Rebuild and restart
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Check health
docker-compose ps
```

## Troubleshooting

### Common Issues

1. **SSL Certificate Issues**
   ```bash
   # Check certificate status
   docker-compose exec nginx openssl s_client -connect localhost:443 -servername trazor.cloud
   
   # Renew certificate
   docker-compose run --rm certbot renew
   ```

2. **Image Upload Issues**
   ```bash
   # Check upload directory permissions
   docker-compose exec backend ls -la /app/uploads
   
   # Check nginx logs
   docker-compose logs nginx
   ```

3. **Authentication Issues**
   ```bash
   # Check backend logs
   docker-compose logs backend
   
   # Verify Google OAuth settings
   # Check .env file configuration
   ```

4. **Performance Issues**
   ```bash
   # Check resource usage
   docker stats
   
   # Check nginx access logs
   docker-compose exec nginx tail -f /var/log/nginx/access.log
   ```

## Security Considerations

### Firewall Configuration
```bash
# Allow only necessary ports
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS
sudo ufw enable
```

### Regular Updates
```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Update Docker images
docker-compose pull
docker-compose up -d
```

### Monitoring
- Set up log monitoring
- Monitor SSL certificate expiration
- Set up alerts for service failures
- Regular security audits

## Performance Optimization

### Nginx Caching
- Static assets cached for 1 year
- Images cached for 30 days
- API responses cached appropriately

### Docker Optimization
- Multi-stage builds for smaller images
- Health checks for better monitoring
- Resource limits for containers

### Database Considerations
- Current setup uses JSON files
- Consider PostgreSQL for larger scale
- Implement proper backup strategy
