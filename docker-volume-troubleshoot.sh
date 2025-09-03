#!/bin/bash

# Comprehensive Docker Volume Troubleshooting Script

set -e

echo "🔍 Docker Volume Troubleshooting"
echo "================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

echo ""
print_status "Step 1: Checking Docker Compose status..."
docker compose ps

echo ""
print_status "Step 2: Checking Docker volumes..."
echo "All volumes:"
docker volume ls

echo ""
echo "Trazor volumes (should exist):"
docker volume ls | grep trazor || echo "No trazor volumes found"

echo ""
print_status "Step 3: Checking Docker Compose configuration..."
echo "Volume definitions in docker-compose.yml:"
grep -A 10 "volumes:" docker-compose.yml

echo ""
print_status "Step 4: Checking container volume mounts..."
if docker compose ps | grep -q "Up"; then
    echo "Backend container volume mounts:"
    docker compose exec backend mount | grep -E "(data|uploads)" || echo "No data/uploads mounts found"
else
    print_warning "Backend container is not running"
fi

echo ""
print_status "Step 5: Checking container filesystem..."
if docker compose ps | grep -q "Up"; then
    echo "Backend container /app directory:"
    docker compose exec backend ls -la /app/
    
    echo ""
    echo "Backend container /app/data directory:"
    docker compose exec backend ls -la /app/data/ 2>/dev/null || echo "Data directory does not exist"
else
    print_warning "Backend container is not running"
fi

echo ""
print_status "Step 6: Checking Docker Compose logs..."
echo "Recent backend logs:"
docker compose logs --tail=20 backend

echo ""
echo "Choose an action:"
echo "1. Create volumes manually"
echo "2. Recreate containers with volumes"
echo "3. Copy local data to container"
echo "4. Check Docker daemon status"
echo "5. Exit"

read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        print_status "Creating volumes manually..."
        
        docker volume create trazor_backend_data
        docker volume create trazor_backend_uploads
        docker volume create trazor_certbot_etc
        docker volume create trazor_certbot_var
        docker volume create trazor_web_root
        
        print_success "Volumes created"
        echo "Volumes list:"
        docker volume ls | grep trazor
        ;;
    2)
        print_status "Recreating containers with volumes..."
        
        docker compose down
        docker compose up -d
        
        print_success "Containers recreated"
        ;;
    3)
        print_status "Copying local data to container..."
        
        # Create data directory if it doesn't exist
        docker compose exec backend mkdir -p /app/data
        
        # Copy local blog data if it exists
        if [ -f "backend/data/blog-posts.json" ]; then
            docker compose cp backend/data/blog-posts.json trazor-backend:/app/data/blog-posts.json
            docker compose exec backend chown nodejs:nodejs /app/data/blog-posts.json
            docker compose exec backend chmod 644 /app/data/blog-posts.json
            print_success "Blog data copied"
        else
            # Create empty blog data file
            docker compose exec backend sh -c 'echo "[]" > /app/data/blog-posts.json'
            docker compose exec backend chown nodejs:nodejs /app/data/blog-posts.json
            docker compose exec backend chmod 644 /app/data/blog-posts.json
            print_success "Empty blog data file created"
        fi
        ;;
    4)
        print_status "Checking Docker daemon status..."
        
        docker info | head -10
        echo ""
        echo "Docker version:"
        docker --version
        echo ""
        echo "Docker Compose version:"
        docker compose version
        ;;
    5)
        print_status "Exiting..."
        exit 0
        ;;
    *)
        print_error "Invalid choice"
        exit 1
        ;;
esac

echo ""
print_success "Troubleshooting completed!"
echo ""
print_warning "If volumes are still not working:"
echo "1. Check Docker daemon permissions"
echo "2. Verify Docker Compose version compatibility"
echo "3. Check disk space: df -h"
echo "4. Restart Docker daemon if needed"
