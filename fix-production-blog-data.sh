#!/bin/bash

# Production Blog Data Fix Script
# This script helps fix missing blog data in production

set -e

echo "🔧 Production Blog Data Fix"
echo "==========================="

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
print_status "Checking current blog data status..."

# Check if blog-posts.json exists in container
if docker compose exec backend test -f /app/data/blog-posts.json; then
    print_success "Blog data file exists in container"
    docker compose exec backend cat /app/data/blog-posts.json | head -5
else
    print_warning "Blog data file does not exist in container"
fi

echo ""
echo "Choose an option:"
echo "1. Create empty blog data file"
echo "2. Copy blog data from local to production"
echo "3. Check Docker volumes"
echo "4. Restart containers"
echo "5. Exit"

read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        print_status "Creating empty blog data file..."
        
        # Create empty blog-posts.json
        docker compose exec backend sh -c 'echo "[]" > /app/data/blog-posts.json'
        
        # Set proper permissions
        docker compose exec backend chown nodejs:nodejs /app/data/blog-posts.json
        docker compose exec backend chmod 644 /app/data/blog-posts.json
        
        print_success "Empty blog data file created"
        ;;
    2)
        print_status "Copying blog data from local to production..."
        
        # Check if local file exists
        if [ -f "backend/data/blog-posts.json" ]; then
            # Copy the file to the container
            docker compose cp backend/data/blog-posts.json trazor-backend:/app/data/blog-posts.json
            
            # Set proper permissions
            docker compose exec backend chown nodejs:nodejs /app/data/blog-posts.json
            docker compose exec backend chmod 644 /app/data/blog-posts.json
            
            print_success "Blog data copied to production"
        else
            print_error "Local blog-posts.json not found"
            exit 1
        fi
        ;;
    3)
        print_status "Checking Docker volumes..."
        
        echo "Docker volumes:"
        docker volume ls | grep trazor
        
        echo ""
        echo "Volume details:"
        docker volume inspect trazor_backend_data
        
        echo ""
        echo "Container volume mounts:"
        docker compose exec backend mount | grep data
        ;;
    4)
        print_status "Restarting containers..."
        
        docker compose restart backend
        docker compose restart frontend
        
        print_success "Containers restarted"
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
print_success "Operation completed!"
echo ""
echo "To verify the fix:"
echo "1. Check blog data: docker compose exec backend cat /app/data/blog-posts.json"
echo "2. Test blog creation: Create a new blog post"
echo "3. Check persistence: Restart containers and verify data remains"
echo ""
print_warning "If the issue persists, check Docker volume permissions and storage"
