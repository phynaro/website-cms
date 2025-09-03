#!/bin/bash

# Local Docker Build Test Script
# This script tests the Docker builds locally before deployment

set -e

echo "🧪 Testing Docker builds locally..."

# Test frontend build
echo "🔨 Testing frontend build..."
docker build -f Dockerfile.frontend -t trazor-frontend-test ./frontend

if [ $? -eq 0 ]; then
    echo "✅ Frontend build successful!"
else
    echo "❌ Frontend build failed!"
    exit 1
fi

# Test backend build
echo "🔨 Testing backend build..."
docker build -f Dockerfile.backend -t trazor-backend-test ./backend

if [ $? -eq 0 ]; then
    echo "✅ Backend build successful!"
else
    echo "❌ Backend build failed!"
    exit 1
fi

echo "🎉 All builds successful!"
echo ""
echo "📝 To run the full stack locally:"
echo "  docker compose up -d"
echo ""
echo "📝 To view running containers:"
echo "  docker compose ps"
echo ""
echo "📝 To view logs:"
echo "  docker compose logs -f"
echo ""
echo "📝 To stop services:"
echo "  docker compose down"
