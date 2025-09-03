# Google Analytics Setup Guide

## Overview
This guide explains how to properly configure Google Analytics for your website CMS backend.

## Current Configuration

### Service Account Credentials
- **File**: `backend/credentials/analytics-credentials.json`
- **Service Account Email**: `analytic@firstlytech.iam.gserviceaccount.com`
- **Project ID**: `firstlytech`

### Property Configuration
- **GA4 Property ID**: `327097599`
- **Tracking ID**: `G-E89TCL8D1P`

## Environment Variables Required

Add the following to your `.env` file:

```bash
# Google Analytics Configuration
GA_PROPERTY_ID=327097599
```

## Troubleshooting Authentication Errors

### Error: "16 UNAUTHENTICATED: Request had invalid authentication credentials"

This error typically occurs when:

1. **Missing GA_PROPERTY_ID**: The environment variable is not set
2. **Service Account Permissions**: The service account doesn't have access to the GA4 property
3. **Property ID Mismatch**: The property ID doesn't match your GA4 property

### Solutions

#### 1. Verify Environment Variable
Ensure `GA_PROPERTY_ID=327097599` is set in your `.env` file.

#### 2. Check Service Account Permissions
1. Go to [Google Analytics Admin](https://analytics.google.com/analytics/web/#/admin)
2. Navigate to your property (327097599)
3. Go to **Property Access Management**
4. Ensure `analytic@firstlytech.iam.gserviceaccount.com` has at least **Viewer** permissions

#### 3. Verify Property ID
1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your property
3. Go to **Admin** → **Property Settings**
4. The Property ID should be `327097599`

## Testing the Setup

### 1. Check Environment Variables
```bash
# In your backend directory
echo $GA_PROPERTY_ID
```

### 2. Test Analytics Endpoint
```bash
# Make sure you're logged in as admin
curl -H "Authorization: Bearer YOUR_SESSION_TOKEN" \
     http://localhost:5001/api/analytics/data
```

### 3. Check Server Logs
Look for these success messages:
```
Google Analytics Data Client initialized successfully
Fetching analytics data for property: 327097599
Successfully fetched analytics data
```

## Common Issues and Solutions

### Issue: "Property not found"
- **Cause**: Wrong property ID
- **Solution**: Verify the property ID in Google Analytics Admin

### Issue: "Permission denied"
- **Cause**: Service account lacks permissions
- **Solution**: Add service account to GA4 property with Viewer role

### Issue: "Invalid credentials"
- **Cause**: Corrupted service account JSON
- **Solution**: Re-download the service account key from Google Cloud Console

## API Endpoints

### Analytics Data
- **URL**: `/api/analytics/data`
- **Method**: GET
- **Auth**: Admin required
- **Returns**: Page views, users, sessions, top pages

### Real-time Data
- **URL**: `/api/analytics/realtime`
- **Method**: GET
- **Auth**: Admin required
- **Returns**: Active users (mock data - GA4 Data API doesn't support real-time)

## Security Notes

1. **Never commit** `analytics-credentials.json` to version control
2. **Keep** the service account key secure
3. **Use** environment variables for sensitive configuration
4. **Limit** service account permissions to minimum required

## Additional Resources

- [Google Analytics Data API Documentation](https://developers.google.com/analytics/devguides/reporting/data/v1)
- [Service Account Setup Guide](https://cloud.google.com/iam/docs/service-accounts)
- [GA4 Property Management](https://support.google.com/analytics/answer/1009618)
