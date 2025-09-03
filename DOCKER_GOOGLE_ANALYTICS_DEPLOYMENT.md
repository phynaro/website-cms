# Docker Deployment with Google Analytics Security

## Overview
This guide explains how to deploy your application with secure Google Analytics credentials using Docker.

## Environment Variables Added

### Production Docker Compose (`docker-compose.yml`)
Added the following environment variables to the backend service:

```yaml
environment:
  - GA_PROPERTY_ID=${GA_PROPERTY_ID}
  - GOOGLE_ANALYTICS_CREDENTIALS=${GOOGLE_ANALYTICS_CREDENTIALS}
```

### Local Docker Compose (`docker-compose.local.yml`)
Uses `env_file: - .env` which automatically includes all environment variables from your `.env` file.

## Setup Instructions

### 1. Create Environment File
Copy the Docker environment template:
```bash
cp docker.env.template .env
```

### 2. Configure Google Analytics Credentials
Edit your `.env` file and set the Google Analytics credentials:

#### Option A: Environment Variable (Recommended)
```bash
# In your .env file
GA_PROPERTY_ID=327097599
GOOGLE_ANALYTICS_CREDENTIALS='{"type":"service_account","project_id":"firstlytech","private_key_id":"YOUR_NEW_PRIVATE_KEY_ID","private_key":"-----BEGIN PRIVATE KEY-----\nYOUR_NEW_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n","client_email":"analytic@firstlytech.iam.gserviceaccount.com","client_id":"116725801477508397596","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/analytic%40firstlytech.iam.gserviceaccount.com","universe_domain":"googleapis.com"}'
```

#### Option B: File Path (Alternative)
```bash
# In your .env file
GA_PROPERTY_ID=327097599
GOOGLE_ANALYTICS_CREDENTIALS_PATH=/app/credentials/analytics-credentials.json
```

**Note**: If using Option B, you'll need to mount the credentials file as a volume in Docker Compose.

### 3. Deploy with Docker

#### Local Development
```bash
# Start local development environment
docker-compose -f docker-compose.local.yml up -d
```

#### Production Deployment
```bash
# Start production environment
docker-compose up -d
```

## Security Features Implemented

### ✅ Dockerfile Security
- **Credentials Removal**: The Dockerfile automatically removes the `credentials/` directory during build
- **Non-root User**: Application runs as non-root user (`nodejs`)
- **Minimal Image**: Uses Alpine Linux for smaller attack surface

### ✅ Environment Variable Security
- **No File Storage**: Credentials are passed via environment variables, not files
- **Container Isolation**: Each container gets its own copy of environment variables
- **No Persistence**: Credentials are not persisted in Docker images

### ✅ Health Checks
- **Backend Health**: Monitors application health at `/health` endpoint
- **Analytics Health**: New `/api/analytics/health` endpoint for Google Analytics status

## Testing Your Deployment

### 1. Check Container Status
```bash
docker-compose ps
```

### 2. Check Backend Health
```bash
curl http://localhost:5001/health
```

### 3. Check Analytics Health (requires admin login)
```bash
# First, get a session token by logging in
curl -X POST http://localhost:5001/auth/google/callback \
  -H "Content-Type: application/json" \
  -d '{"email":"phynaro@gmail.com"}'

# Then test analytics health
curl -H "Authorization: Bearer YOUR_SESSION_TOKEN" \
     http://localhost:5001/api/analytics/health
```

### 4. Check Analytics Data
```bash
curl -H "Authorization: Bearer YOUR_SESSION_TOKEN" \
     http://localhost:5001/api/analytics/data
```

## Troubleshooting

### Issue: "No Google Analytics credentials configured"
**Solution**: Ensure `GOOGLE_ANALYTICS_CREDENTIALS` is set in your `.env` file

### Issue: "Invalid JSON in credentials"
**Solution**: Check that the JSON is properly escaped and on a single line

### Issue: "Property not found"
**Solution**: Verify `GA_PROPERTY_ID` is correct and service account has access

### Issue: "Permission denied"
**Solution**: Ensure service account has Viewer permissions on the GA4 property

## Production Deployment Checklist

### Before Deployment
- [ ] Revoke old service account key
- [ ] Generate new service account key
- [ ] Update `.env` file with new credentials
- [ ] Test locally with `docker-compose.local.yml`
- [ ] Verify all environment variables are set

### After Deployment
- [ ] Check container health: `docker-compose ps`
- [ ] Test backend health: `curl http://your-domain/health`
- [ ] Test analytics health: `curl http://your-domain/api/analytics/health`
- [ ] Monitor logs: `docker-compose logs backend`
- [ ] Verify analytics data is accessible

## Environment Variable Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `GA_PROPERTY_ID` | Yes | Google Analytics 4 Property ID |
| `GOOGLE_ANALYTICS_CREDENTIALS` | Yes* | Full JSON service account credentials |
| `GOOGLE_ANALYTICS_CREDENTIALS_PATH` | Yes* | Path to credentials file (alternative) |

*Choose one of the credential options

## Security Best Practices

1. **Never commit** `.env` files to version control
2. **Use secrets management** in production (Docker Secrets, Kubernetes Secrets, etc.)
3. **Rotate credentials** regularly (every 90 days)
4. **Monitor access logs** for unusual activity
5. **Use minimal permissions** for service accounts
6. **Encrypt credentials** at rest in production environments

## Additional Resources

- **Security Guide**: `backend/GOOGLE_ANALYTICS_SECURITY.md`
- **Quick Reference**: `GOOGLE_ANALYTICS_SECURITY_QUICK_REFERENCE.md`
- **Migration Script**: `migrate-analytics-credentials.sh`
- **Environment Template**: `docker.env.template`
