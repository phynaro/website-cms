#!/bin/bash

# Google Analytics Credentials Security Migration Script
# This script helps migrate from file-based credentials to secure environment variables

set -e

echo "🔐 Google Analytics Credentials Security Migration"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
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

# Check if credentials file exists
CREDENTIALS_FILE="backend/credentials/analytics-credentials.json"

if [ ! -f "$CREDENTIALS_FILE" ]; then
    print_error "Credentials file not found at $CREDENTIALS_FILE"
    exit 1
fi

print_status "Found credentials file: $CREDENTIALS_FILE"

# Check if .env file exists
if [ ! -f ".env" ]; then
    print_warning ".env file not found. Creating one from template..."
    cp env.template .env
    print_success "Created .env file from template"
fi

# Read current credentials
print_status "Reading current credentials..."
CREDENTIALS_JSON=$(cat "$CREDENTIALS_FILE")

# Validate JSON
if ! echo "$CREDENTIALS_JSON" | jq . > /dev/null 2>&1; then
    print_error "Invalid JSON in credentials file"
    exit 1
fi

print_success "Credentials JSON is valid"

# Create backup
BACKUP_FILE="backend/credentials/analytics-credentials.json.backup.$(date +%Y%m%d_%H%M%S)"
cp "$CREDENTIALS_FILE" "$BACKUP_FILE"
print_success "Created backup: $BACKUP_FILE"

# Escape the JSON for environment variable
ESCAPED_CREDENTIALS=$(echo "$CREDENTIALS_JSON" | jq -c . | sed 's/"/\\"/g')

# Update .env file
print_status "Updating .env file with secure credentials..."

# Remove existing GOOGLE_ANALYTICS_CREDENTIALS lines
sed -i.bak '/^GOOGLE_ANALYTICS_CREDENTIALS=/d' .env

# Add the new credentials line
echo "GOOGLE_ANALYTICS_CREDENTIALS=\"$ESCAPED_CREDENTIALS\"" >> .env

print_success "Updated .env file with secure credentials"

# Set proper permissions
chmod 600 .env
print_success "Set secure permissions on .env file"

# Test the configuration
print_status "Testing configuration..."

# Source the .env file
export $(grep -v '^#' .env | xargs)

# Test if the environment variable is set
if [ -z "$GOOGLE_ANALYTICS_CREDENTIALS" ]; then
    print_error "GOOGLE_ANALYTICS_CREDENTIALS environment variable is not set"
    exit 1
fi

print_success "Environment variable is set correctly"

# Create a test script
cat > test-analytics.sh << 'EOF'
#!/bin/bash
# Test script for Google Analytics credentials

echo "Testing Google Analytics configuration..."

# Source environment variables
if [ -f ".env" ]; then
    export $(grep -v '^#' .env | xargs)
fi

# Check if credentials are set
if [ -z "$GOOGLE_ANALYTICS_CREDENTIALS" ]; then
    echo "❌ GOOGLE_ANALYTICS_CREDENTIALS not set"
    exit 1
fi

# Check if property ID is set
if [ -z "$GA_PROPERTY_ID" ]; then
    echo "❌ GA_PROPERTY_ID not set"
    exit 1
fi

echo "✅ Environment variables configured"
echo "📊 Property ID: $GA_PROPERTY_ID"

# Test JSON parsing
if echo "$GOOGLE_ANALYTICS_CREDENTIALS" | jq . > /dev/null 2>&1; then
    echo "✅ Credentials JSON is valid"
    echo "📧 Service Account: $(echo "$GOOGLE_ANALYTICS_CREDENTIALS" | jq -r '.client_email')"
else
    echo "❌ Invalid JSON in credentials"
    exit 1
fi

echo "🎉 Configuration test completed successfully!"
EOF

chmod +x test-analytics.sh
print_success "Created test script: test-analytics.sh"

# Security recommendations
echo ""
echo "🔒 Security Recommendations:"
echo "============================"
echo "1. ✅ Credentials are now stored in environment variables"
echo "2. ✅ .env file has restricted permissions (600)"
echo "3. ⚠️  Remove the credentials file from version control:"
echo "   git rm --cached $CREDENTIALS_FILE"
echo "4. ⚠️  Revoke the old service account key in Google Cloud Console"
echo "5. ⚠️  Generate a new service account key with minimal permissions"
echo "6. ⚠️  Update your deployment scripts to use environment variables"
echo "7. ⚠️  Consider using a secrets manager for production"

echo ""
print_success "Migration completed successfully!"
echo ""
echo "Next steps:"
echo "1. Run: ./test-analytics.sh"
echo "2. Restart your backend server"
echo "3. Test the analytics endpoints"
echo "4. Remove the credentials file from git"
echo "5. Update your deployment configuration"

echo ""
print_warning "IMPORTANT: Don't forget to revoke the old service account key!"
echo "Visit: https://console.cloud.google.com/iam-admin/serviceaccounts"
