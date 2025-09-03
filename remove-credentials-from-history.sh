#!/bin/bash

# Remove Credentials from Git History Script
# This script removes the exposed credentials from git history

set -e

echo "🔒 Remove Credentials from Git History"
echo "======================================"

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

print_warning "This script will remove exposed credentials from git history"
echo ""
echo "Files to be removed from history:"
echo "  - backend/.env (contains full credentials JSON)"
echo "  - backend/credentials/analytics-credentials.json (original credentials file)"
echo ""

read -p "Do you want to continue? (y/N): " confirm

if [[ $confirm != [yY] ]]; then
    print_status "Operation cancelled"
    exit 0
fi

print_status "Creating backup branch..."
git branch backup-before-cleanup

print_status "Removing backend/.env from history..."
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch backend/.env' \
  --prune-empty --tag-name-filter cat -- --all

print_status "Removing backend/credentials/analytics-credentials.json from history..."
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch backend/credentials/analytics-credentials.json' \
  --prune-empty --tag-name-filter cat -- --all

print_status "Cleaning up..."
git for-each-ref --format='delete %(refname)' refs/original | git update-ref --stdin
git reflog expire --expire=now --all
git gc --prune=now --aggressive

print_success "Credentials removed from git history!"
echo ""
print_warning "IMPORTANT: You need to force push to update the remote repository"
echo ""
echo "To push the cleaned history:"
echo "  git push origin main --force"
echo ""
print_warning "⚠️  WARNING: Force pushing will rewrite history for all collaborators!"
echo "Make sure to coordinate with your team before force pushing."
echo ""
echo "If you want to revert:"
echo "  git checkout backup-before-cleanup"
echo "  git branch -D main"
echo "  git checkout -b main"
echo "  git push origin main --force"
