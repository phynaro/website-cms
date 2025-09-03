# Google Analytics Security Best Practices

## Current Security Issues

### ⚠️ CRITICAL: Exposed Private Key
Your Google Analytics service account private key is currently exposed in the repository. This is a **major security risk** that needs immediate attention.

## Immediate Actions Required

### 1. Revoke Current Credentials
**URGENT**: The current service account key has been exposed and should be revoked immediately.

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **IAM & Admin** → **Service Accounts**
3. Find `analytic@firstlytech.iam.gserviceaccount.com`
4. Go to **Keys** tab
5. **Delete** the current key (ID: `7e0b3471c82b607fc3014939954ef1c77ef6951b`)

### 2. Generate New Service Account Key
1. In the same service account, click **Add Key** → **Create new key**
2. Choose **JSON** format
3. Download the new key file
4. **IMPORTANT**: Never commit this file to version control

### 3. Secure Storage Options

#### Option A: Environment Variables (Recommended)
Store the entire JSON as an environment variable:

```bash
# In your .env file
GOOGLE_ANALYTICS_CREDENTIALS='{"type":"service_account","project_id":"firstlytech",...}'
```

#### Option B: Secure File Storage
Store the file outside the project directory:

```bash
# Example locations (choose one):
/opt/credentials/analytics-credentials.json
~/.config/website-cms/analytics-credentials.json
/var/secrets/analytics-credentials.json
```

## Updated Code Implementation

### 1. Environment Variable Approach
```javascript
// backend/routes/analytics.js
const initializeAnalytics = () => {
  try {
    let credentials;
    
    // Try environment variable first
    if (process.env.GOOGLE_ANALYTICS_CREDENTIALS) {
      credentials = JSON.parse(process.env.GOOGLE_ANALYTICS_CREDENTIALS);
    } else if (process.env.GOOGLE_ANALYTICS_CREDENTIALS_PATH) {
      // Fallback to file path
      const credentialsPath = process.env.GOOGLE_ANALYTICS_CREDENTIALS_PATH;
      if (!fs.existsSync(credentialsPath)) {
        throw new Error(`Credentials file not found at: ${credentialsPath}`);
      }
      credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));
    } else {
      throw new Error('No Google Analytics credentials configured');
    }
    
    const analyticsDataClient = new BetaAnalyticsDataClient({
      credentials: credentials
    });
    
    console.log('Google Analytics Data Client initialized successfully');
    return analyticsDataClient;
  } catch (error) {
    console.error('Error initializing Google Analytics Data Client:', error);
    return null;
  }
};
```

### 2. Environment Configuration
```bash
# .env file
GOOGLE_ANALYTICS_CREDENTIALS='{"type":"service_account",...}'
# OR
GOOGLE_ANALYTICS_CREDENTIALS_PATH=/opt/credentials/analytics-credentials.json
GA_PROPERTY_ID=327097599
```

## Security Best Practices

### 1. Access Control
- **Principle of Least Privilege**: Only grant necessary permissions
- **Regular Audits**: Review service account permissions monthly
- **Key Rotation**: Rotate keys every 90 days

### 2. Environment Security
- **Never commit** credentials to version control
- **Use environment variables** for sensitive data
- **Encrypt** credentials at rest
- **Limit file permissions**: `chmod 600 credentials.json`

### 3. Network Security
- **HTTPS only**: Always use HTTPS in production
- **IP restrictions**: Limit API access to specific IPs
- **Rate limiting**: Implement API rate limiting

### 4. Monitoring and Logging
- **Audit logs**: Monitor all API access
- **Alerting**: Set up alerts for unusual activity
- **Regular scans**: Scan for exposed credentials

## Docker Security

### 1. Multi-stage Builds
```dockerfile
# Dockerfile.backend
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS runtime
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .

# Don't copy credentials in Docker image
RUN rm -rf credentials/

# Use environment variables instead
ENV GOOGLE_ANALYTICS_CREDENTIALS=""
ENV GA_PROPERTY_ID=""

EXPOSE 5001
CMD ["node", "server.js"]
```

### 2. Docker Secrets
```yaml
# docker-compose.yml
version: '3.8'
services:
  backend:
    build: ./backend
    environment:
      - GOOGLE_ANALYTICS_CREDENTIALS_FILE=/run/secrets/ga_credentials
    secrets:
      - ga_credentials

secrets:
  ga_credentials:
    file: ./secrets/analytics-credentials.json
```

## Production Deployment Checklist

### Before Deployment
- [ ] Revoke old service account keys
- [ ] Generate new service account key
- [ ] Store credentials securely (environment variables or secrets)
- [ ] Update .gitignore to exclude credentials
- [ ] Remove credentials from repository history
- [ ] Set proper file permissions
- [ ] Configure environment variables
- [ ] Test authentication

### After Deployment
- [ ] Verify analytics data is accessible
- [ ] Monitor logs for authentication errors
- [ ] Set up monitoring and alerting
- [ ] Document credential management process

## Emergency Response

### If Credentials Are Compromised
1. **Immediately revoke** the compromised key
2. **Generate new key** with minimal permissions
3. **Update all environments** with new credentials
4. **Audit access logs** for unauthorized usage
5. **Notify stakeholders** if necessary
6. **Document incident** and lessons learned

## Additional Security Measures

### 1. Credential Encryption
```javascript
const crypto = require('crypto');

function encryptCredentials(credentials, key) {
  const cipher = crypto.createCipher('aes-256-cbc', key);
  let encrypted = cipher.update(credentials, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function decryptCredentials(encrypted, key) {
  const decipher = crypto.createDecipher('aes-256-cbc', key);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
```

### 2. Health Checks
```javascript
// Add to your analytics route
router.get('/health', isAdmin, async (req, res) => {
  try {
    const analyticsDataClient = initializeAnalytics();
    if (!analyticsDataClient) {
      return res.status(503).json({ status: 'unhealthy', error: 'Analytics client not initialized' });
    }
    
    // Test connection
    const propertyId = process.env.GA_PROPERTY_ID;
    await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: 'today', endDate: 'today' }],
      metrics: [{ name: 'screenPageViews' }],
      limit: 1
    });
    
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
  } catch (error) {
    res.status(503).json({ status: 'unhealthy', error: error.message });
  }
});
```

## Resources

- [Google Cloud Security Best Practices](https://cloud.google.com/security/best-practices)
- [Service Account Security](https://cloud.google.com/iam/docs/service-accounts)
- [Secret Management](https://cloud.google.com/secret-manager)
- [Environment Variables Best Practices](https://12factor.net/config)
