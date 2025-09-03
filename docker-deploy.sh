#!/bin/bash

# Docker Google Analytics Deployment Helper Script

set -e

echo "🐳 Docker Google Analytics Deployment Helper"
echo "============================================="

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

# Check if .env file exists
if [ ! -f ".env" ]; then
    print_warning ".env file not found. Creating from template..."
    if [ -f "docker.env.template" ]; then
        cp docker.env.template .env
        print_success "Created .env file from docker.env.template"
    else
        cp env.template .env
        print_success "Created .env file from env.template"
    fi
    print_warning "Please edit .env file with your actual credentials before continuing"
    exit 1
fi

# Check required environment variables
print_status "Checking required environment variables..."

MISSING_VARS=()

if [ -z "$GA_PROPERTY_ID" ]; then
    MISSING_VARS+=("GA_PROPERTY_ID")
fi

if [ -z "$GOOGLE_ANALYTICS_CREDENTIALS" ] && [ -z "$GOOGLE_ANALYTICS_CREDENTIALS_PATH" ]; then
    MISSING_VARS+=("GOOGLE_ANALYTICS_CREDENTIALS or GOOGLE_ANALYTICS_CREDENTIALS_PATH")
fi

if [ ${#MISSING_VARS[@]} -ne 0 ]; then
    print_error "Missing required environment variables:"
    for var in "${MISSING_VARS[@]}"; do
        echo "  - $var"
    done
    print_warning "Please set these variables in your .env file"
    exit 1
fi

print_success "All required environment variables are set"

# Function to test Docker deployment
test_docker_deployment() {
    local compose_file=$1
    local environment=$2
    
    print_status "Testing $environment deployment with $compose_file..."
    
    # Build and start containers
    docker-compose -f "$compose_file" up -d --build
    
    # Wait for containers to start
    print_status "Waiting for containers to start..."
    sleep 30
    
    # Check container status
    if docker-compose -f "$compose_file" ps | grep -q "Up"; then
        print_success "Containers are running"
    else
        print_error "Containers failed to start"
        docker-compose -f "$compose_file" logs
        return 1
    fi
    
    # Test backend health
    print_status "Testing backend health..."
    if curl -f http://localhost:5001/health > /dev/null 2>&1; then
        print_success "Backend health check passed"
    else
        print_error "Backend health check failed"
        return 1
    fi
    
    # Test analytics health (if admin credentials available)
    print_status "Testing analytics health..."
    if curl -f http://localhost:5001/api/analytics/health > /dev/null 2>&1; then
        print_success "Analytics health check passed"
    else
        print_warning "Analytics health check failed (may require admin login)"
    fi
    
    print_success "$environment deployment test completed"
}

# Main menu
echo ""
echo "Choose an option:"
echo "1. Test local development deployment"
echo "2. Test production deployment"
echo "3. Deploy to production"
echo "4. Check deployment status"
echo "5. View logs"
echo "6. Stop all containers"
echo "7. Exit"

read -p "Enter your choice (1-7): " choice

case $choice in
    1)
        test_docker_deployment "docker-compose.local.yml" "local development"
        ;;
    2)
        test_docker_deployment "docker-compose.yml" "production"
        ;;
    3)
        print_status "Deploying to production..."
        docker-compose up -d --build
        print_success "Production deployment completed"
        print_status "Check status with: docker-compose ps"
        ;;
    4)
        print_status "Checking deployment status..."
        docker-compose ps
        ;;
    5)
        print_status "Showing backend logs..."
        docker-compose logs backend
        ;;
    6)
        print_status "Stopping all containers..."
        docker-compose down
        print_success "All containers stopped"
        ;;
    7)
        print_status "Exiting..."
        exit 0
        ;;
    *)
        print_error "Invalid choice"
        exit 1
        ;;
esac

echo ""
print_success "Script completed successfully!"
echo ""
echo "Useful commands:"
echo "  - View logs: docker-compose logs -f backend"
echo "  - Check status: docker-compose ps"
echo "  - Stop containers: docker-compose down"
echo "  - Restart: docker-compose restart backend"
