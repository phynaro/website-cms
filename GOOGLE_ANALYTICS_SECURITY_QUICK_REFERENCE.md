# Google Analytics Security Quick Reference

## 🚨 IMMEDIATE ACTIONS REQUIRED

### 1. Revoke Exposed Credentials
Your current service account key has been exposed in the repository. **IMMEDIATELY**:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **IAM & Admin** → **Service Accounts**
3. Find `analytic@firstlytech.iam.gserviceaccount.com`
4. Delete the exposed key (ID: `7e0b3471c82b607fc3014939954ef1c77ef6951b`)

### 2. Generate New Secure Key
1. Create a new service account key
2. Download the JSON file
3. **NEVER commit it to version control**

### 3. Migrate to Secure Storage
Run the migration script:
```bash
./migrate-analytics-credentials.sh
```

## 🔐 Security Improvements Implemented

### ✅ Updated .gitignore
- Added `backend/credentials/` to prevent credential files from being committed
- Added `*.json` exclusion (with exceptions for config files)

### ✅ Secure Credential Handling
- **Environment Variables**: Store entire JSON as `GOOGLE_ANALYTICS_CREDENTIALS`
- **File Path**: Alternative option using `GOOGLE_ANALYTICS_CREDENTIALS_PATH`
- **Legacy Support**: Backward compatibility with existing file-based setup

### ✅ Enhanced Analytics Code
- Multiple credential loading methods with fallbacks
- Better error handling and logging
- Health check endpoint for monitoring

### ✅ Health Check Endpoint
- **URL**: `/api/analytics/health`
- **Method**: GET
- **Auth**: Admin required
- **Purpose**: Test Google Analytics connection and configuration

## 📋 Environment Variables

### Required
```bash
GA_PROPERTY_ID=327097599
```

### Choose ONE credential method:
```bash
# Option 1: Environment Variable (Recommended)
GOOGLE_ANALYTICS_CREDENTIALS='{"type":"service_account",...}'

# Option 2: File Path (Alternative)
GOOGLE_ANALYTICS_CREDENTIALS_PATH=/opt/credentials/analytics-credentials.json
```

## 🧪 Testing

### 1. Test Configuration
```bash
./test-analytics.sh
```

### 2. Test Health Endpoint
```bash
curl -H "Authorization: Bearer YOUR_SESSION_TOKEN" \
     http://localhost:5001/api/analytics/health
```

### 3. Test Analytics Data
```bash
curl -H "Authorization: Bearer YOUR_SESSION_TOKEN" \
     http://localhost:5001/api/analytics/data
```

## 🚀 Deployment Checklist

### Before Deployment
- [ ] Revoke old service account key
- [ ] Generate new service account key
- [ ] Run migration script
- [ ] Test configuration
- [ ] Update deployment scripts
- [ ] Remove credentials from git history

### After Deployment
- [ ] Verify health endpoint returns "healthy"
- [ ] Test analytics data retrieval
- [ ] Monitor logs for authentication errors
- [ ] Set up monitoring and alerting

## 🔧 Troubleshooting

### Error: "No Google Analytics credentials configured"
**Solution**: Set `GOOGLE_ANALYTICS_CREDENTIALS` environment variable

### Error: "Invalid JSON in credentials"
**Solution**: Check JSON format and escaping in environment variable

### Error: "Property not found"
**Solution**: Verify `GA_PROPERTY_ID` is correct

### Error: "Permission denied"
**Solution**: Ensure service account has access to GA4 property

## 📚 Additional Resources

- **Security Guide**: `backend/GOOGLE_ANALYTICS_SECURITY.md`
- **Setup Guide**: `backend/GOOGLE_ANALYTICS_SETUP.md`
- **Migration Script**: `migrate-analytics-credentials.sh`
- **Test Script**: `test-analytics.sh`

## 🆘 Emergency Contacts

If credentials are compromised:
1. **Immediately revoke** the key
2. **Generate new key** with minimal permissions
3. **Update all environments**
4. **Audit access logs**
5. **Document incident**

## 🔄 Regular Maintenance

### Monthly Tasks
- [ ] Review service account permissions
- [ ] Check for unused API keys
- [ ] Audit access logs
- [ ] Update security documentation

### Quarterly Tasks
- [ ] Rotate service account keys
- [ ] Review and update security policies
- [ ] Conduct security training
- [ ] Update incident response plan
