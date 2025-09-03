#!/bin/bash

# GitHub Push Protection Resolution Script
# This script helps resolve the blocked push due to exposed credentials

set -e

echo "🔒 GitHub Push Protection Resolution"
echo "===================================="

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
print_warning "GitHub has blocked your push due to exposed Google Cloud credentials!"
echo ""
echo "The following commits contain exposed credentials:"
echo "  - b871c44f: backend/.env:11 and backend/.env:12"
echo "  - 43c6435d: backend/credentials/analytics-credentials.json:1"
echo ""

echo "Choose your resolution method:"
echo "1. Interactive rebase (recommended - clean history)"
echo "2. Force push with allow-secret (quick fix)"
echo "3. Create new branch without history"
echo "4. Exit"

read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        print_status "Starting interactive rebase to remove credentials from history..."
        echo ""
        echo "You will be shown a list of commits. For each commit that contains credentials:"
        echo "  - Change 'pick' to 'edit' for commits with credentials"
        echo "  - Keep 'pick' for commits without credentials"
        echo ""
        echo "After editing each commit, you'll need to:"
        echo "  - Remove the credential lines from the files"
        echo "  - Run 'git add .' and 'git commit --amend --no-edit'"
        echo "  - Run 'git rebase --continue'"
        echo ""
        read -p "Press Enter to start interactive rebase..."
        
        git rebase -i HEAD~4
        ;;
    2)
        print_warning "This will allow the secret to be pushed (not recommended for security)"
        echo ""
        echo "Visit this URL to allow the secret:"
        echo "https://github.com/phynaro/website-cms/security/secret-scanning/unblock-secret/32Ax9dms0i7v0pCNvyM0mOt3LfG"
        echo ""
        echo "After allowing the secret, you can push with:"
        echo "git push origin main"
        ;;
    3)
        print_status "Creating new branch without credential history..."
        
        # Create new orphan branch
        git checkout --orphan clean-main
        
        # Add all current files
        git add .
        
        # Create initial commit
        git commit -m "Initial commit with secure Google Analytics setup"
        
        print_success "New branch 'clean-main' created without credential history"
        echo ""
        echo "To use this branch:"
        echo "1. Delete the old main branch: git branch -D main"
        echo "2. Rename this branch: git branch -m main"
        echo "3. Force push: git push origin main --force"
        ;;
    4)
        print_status "Exiting..."
        exit 0
        ;;
    *)
        print_error "Invalid choice"
        exit 1
        ;;
esac

echo ""
print_success "Resolution script completed!"
echo ""
print_warning "IMPORTANT: After resolving the push protection:"
echo "1. Revoke the exposed service account key immediately"
echo "2. Generate a new service account key"
echo "3. Update your .env file with the new credentials"
echo "4. Never commit credentials to version control again"
echo ""
echo "Use the migration script to set up secure credentials:"
echo "./migrate-analytics-credentials.sh"
