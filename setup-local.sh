#!/bin/bash

# Local Development Setup Script
# This script sets up the environment for local testing

set -e

echo "🔧 Setting up local development environment..."

# Create .env file for local testing if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating local .env file..."
    cat > .env << EOF
# Local Development Environment Variables
NODE_ENV=development
PORT=5001
SESSION_SECRET=local-dev-secret-key
FRONTEND_URL=http://localhost:3000

# Google OAuth Configuration (use your actual values)
GOOGLE_CLIENT_ID=264403093552-bj0div99l15ne1flmoeb9r1sb9ejme0b.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
GOOGLE_CALLBACK_URL=http://localhost:5001/auth/google/callback

# Admin Access Control
ALLOWED_ADMIN_EMAILS=phynaro@gmail.com

# Frontend Configuration
VITE_API_URL=http://localhost:5001
VITE_GA_TRACKING_ID=G-E89TCL8D1P

# Let's Encrypt Configuration (not needed for local)
CERTBOT_EMAIL=phynaro@gmail.com

# File Upload Settings
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp,image/gif
EOF
    echo "✅ Created .env file for local development"
else
    echo "✅ .env file already exists"
fi

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p nginx/conf.d
mkdir -p logs

echo "✅ Local development environment setup completed!"
echo ""
echo "📝 Next steps:"
echo "  1. Test builds: ./test-build.sh"
echo "  2. Start services: docker compose -f docker-compose.local.yml up -d"
echo "  3. View logs: docker compose -f docker-compose.local.yml logs -f"
echo "  4. Stop services: docker compose -f docker-compose.local.yml down"
echo ""
echo "🌐 Local URLs:"
echo "  Frontend: http://localhost"
echo "  Backend API: http://localhost/api"
echo "  Health check: http://localhost/health"
