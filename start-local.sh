#!/bin/bash

# Local Development Start Script
# This script starts the services for local development

set -e

echo "🚀 Starting Trazor.cloud local development..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo "Please run ./setup-local.sh first to create the .env file."
    exit 1
fi

# Stop any existing containers
echo "🛑 Stopping existing containers..."
docker compose -f docker-compose.local.yml down

# Build and start services
echo "🔨 Building Docker images..."
docker compose -f docker-compose.local.yml build

echo "🚀 Starting services..."
docker compose -f docker-compose.local.yml up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check service health
echo "🏥 Checking service health..."
if docker compose -f docker-compose.local.yml ps | grep -q "unhealthy"; then
    echo "❌ Some services are unhealthy. Check logs with: docker compose -f docker-compose.local.yml logs"
    exit 1
fi

echo "✅ All services are healthy!"
echo ""
echo "🌐 Your local website is now available at: http://localhost"
echo "📊 Health check: http://localhost/health"
echo ""
echo "📝 Useful commands:"
echo "  View logs: docker compose -f docker-compose.local.yml logs -f"
echo "  Stop services: docker compose -f docker-compose.local.yml down"
echo "  Restart services: docker compose -f docker-compose.local.yml restart"
echo ""
echo "🔧 Development tips:"
echo "  - Frontend changes require rebuilding: docker compose -f docker-compose.local.yml build frontend"
echo "  - Backend changes require rebuilding: docker compose -f docker-compose.local.yml build backend"
echo "  - View backend logs: docker compose -f docker-compose.local.yml logs backend"
echo "  - View frontend logs: docker compose -f docker-compose.local.yml logs frontend"
