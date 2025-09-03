#!/bin/bash

# Docker Compose Deployment Script for Trazor.cloud
# This script sets up the complete production environment

set -euo pipefail

echo "🚀 Starting Trazor.cloud deployment..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo "Please copy env.template to .env and configure your environment variables."
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

# Optional flag for Let's Encrypt staging environment (avoids rate limits)
CERTBOT_EXTRA_ARGS=""
if [[ "${1:-}" == "--staging" ]]; then
  CERTBOT_EXTRA_ARGS="--staging"
  echo "⚠️  Using Let's Encrypt STAGING environment (test certs)"
fi

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p nginx/conf.d
mkdir -p logs

# Pre-create SSL certificates if missing (so nginx can start with 443 block)
PROJECT_NAME=${COMPOSE_PROJECT_NAME:-$(basename "$PWD")}
CERTBOT_ETC_VOL="${PROJECT_NAME}_certbot-etc"
CERTBOT_VAR_VOL="${PROJECT_NAME}_certbot-var"

echo "🔒 Checking SSL certificates..."
if ! docker run --rm -v ${CERTBOT_ETC_VOL}:/etc/letsencrypt alpine sh -c 'test -f /etc/letsencrypt/live/trazor.cloud/fullchain.pem'; then
  echo "🔑 Obtaining initial SSL certificate (standalone)..."
  docker run --rm \
    -p 80:80 \
    -v ${CERTBOT_ETC_VOL}:/etc/letsencrypt \
    -v ${CERTBOT_VAR_VOL}:/var/lib/letsencrypt \
    certbot/certbot certonly --standalone \
    --email "$CERTBOT_EMAIL" --agree-tos --no-eff-email \
    -d trazor.cloud -d www.trazor.cloud ${CERTBOT_EXTRA_ARGS}
else
  echo "✅ SSL certificates found in volume ${CERTBOT_ETC_VOL}"
fi

# Build and start services
echo "🔨 Building Docker images..."
docker compose build

echo "🚀 Starting services..."
docker compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 30

# Check service health
echo "🏥 Checking service health..."
if docker compose ps | grep -q "unhealthy"; then
    echo "❌ Some services are unhealthy. Check logs with: docker compose logs"
    exit 1
fi

echo "✅ All services are healthy!"

# Get SSL certificate
echo "🔒 Obtaining SSL certificate..."
docker compose run --rm certbot

# Validate nginx config and reload to use SSL certificate
echo "🔄 Validating and reloading nginx..."
if docker compose exec nginx nginx -t; then
  docker compose exec nginx nginx -s reload
  echo "✅ Nginx reloaded"
else
  echo "❌ Nginx config test failed. Inspect logs: docker compose logs nginx"
  exit 1
fi

echo "🎉 Deployment completed successfully!"
echo ""
echo "🌐 Your website is now available at: https://trazor.cloud"
echo "📊 Health check: https://trazor.cloud/health"
echo ""
echo "📝 Useful commands:"
echo "  View logs: docker compose logs -f"
echo "  Stop services: docker compose down"
echo "  Update SSL: docker compose run --rm certbot renew && docker compose exec nginx nginx -s reload"
echo "  Restart services: docker compose restart"
