#!/bin/bash

# Docker Compose Deployment Script for Trazor.cloud
# This script sets up the complete production environment

set -e

echo "🚀 Starting Trazor.cloud deployment..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo "Please copy .env.example to .env and configure your environment variables."
    exit 1
fi

# Load environment variables
source .env

# Validate required environment variables
required_vars=(
    "SESSION_SECRET"
    "GOOGLE_CLIENT_ID"
    "GOOGLE_CLIENT_SECRET"
    "ALLOWED_ADMIN_EMAILS"
    "CERTBOT_EMAIL"
)

for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        echo "❌ Error: $var is not set in .env file"
        exit 1
    fi
done

echo "✅ Environment variables validated"

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p nginx/conf.d
mkdir -p logs

# Build and start services
echo "🔨 Building Docker images..."
docker-compose build

echo "🚀 Starting services..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 30

# Check service health
echo "🏥 Checking service health..."
if docker-compose ps | grep -q "unhealthy"; then
    echo "❌ Some services are unhealthy. Check logs with: docker-compose logs"
    exit 1
fi

echo "✅ All services are healthy!"

# Get SSL certificate
echo "🔒 Obtaining SSL certificate..."
docker-compose run --rm certbot

# Reload nginx to use SSL certificate
echo "🔄 Reloading nginx with SSL..."
docker-compose exec nginx nginx -s reload

echo "🎉 Deployment completed successfully!"
echo ""
echo "🌐 Your website is now available at: https://trazor.cloud"
echo "📊 Health check: https://trazor.cloud/health"
echo ""
echo "📝 Useful commands:"
echo "  View logs: docker-compose logs -f"
echo "  Stop services: docker-compose down"
echo "  Update SSL: docker-compose run --rm certbot renew"
echo "  Restart services: docker-compose restart"
