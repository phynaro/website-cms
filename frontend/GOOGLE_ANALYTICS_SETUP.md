# Google Analytics API Integration Setup Guide

## Prerequisites
- Google Analytics 4 property set up
- Google Cloud Console access
- Node.js and npm installed

## Step-by-Step Setup

### 1. Google Cloud Console Setup

#### 1.1 Create/Select Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing project
3. Note down your Project ID

#### 1.2 Enable APIs
1. Go to "APIs & Services" > "Library"
2. Search for "Google Analytics Data API"
3. Click "Google Analytics Data API v1"
4. Click "Enable"

#### 1.3 Create Service Account
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Name: `analytics-api-service`
4. Description: `Service account for Google Analytics API access`
5. Click "Create and Continue"
6. Skip role assignment (click "Continue")
7. Click "Done"

#### 1.4 Generate JSON Key
1. Click on your service account
2. Go to "Keys" tab
3. Click "Add Key" > "Create new key"
4. Select "JSON"
5. Click "Create"
6. Download the JSON file

### 2. Google Analytics Setup

#### 2.1 Get Property ID
1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your property
3. Go to Admin (gear icon)
4. Click "Property Settings"
5. Copy the Property ID (format: `123456789`)

#### 2.2 Grant Service Account Access
1. In Google Analytics Admin
2. Go to "Property" > "Property Access Management"
3. Click the "+" button
4. Add your service account email: `analytics-api-service@your-project-id.iam.gserviceaccount.com`
5. Assign "Viewer" role
6. Click "Add"

### 3. Backend Setup

#### 3.1 Install Dependencies
```bash
cd backend
npm install googleapis
```

#### 3.2 Place Credentials File
1. Rename your downloaded JSON file to `analytics-credentials.json`
2. Place it in `backend/credentials/analytics-credentials.json`

#### 3.3 Update Environment Variables
Edit `backend/.env`:
```env
GA_PROPERTY_ID=your_actual_property_id_here
```

### 4. Frontend Setup

#### 4.1 Install Dependencies
```bash
cd frontend
npm install googleapis
```

#### 4.2 Update Environment Variables
Edit `frontend/.env`:
```env
VITE_API_URL=http://localhost:5001
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

### 5. Test the Integration

#### 5.1 Start Backend Server
```bash
cd backend
npm start
```

#### 5.2 Start Frontend Server
```bash
cd frontend
npm run dev
```

#### 5.3 Test Analytics Dashboard
1. Go to `http://localhost:3000/admin`
2. Login with your admin account
3. Click on "Analytics" tab
4. You should see real Google Analytics data

### 6. Troubleshooting

#### 6.1 Common Issues

**Error: "Analytics credentials file not found"**
- Make sure `analytics-credentials.json` is in `backend/credentials/`
- Check file permissions

**Error: "Property ID not found"**
- Verify `GA_PROPERTY_ID` is set in `backend/.env`
- Make sure Property ID is correct

**Error: "Access denied"**
- Check if service account has access to Google Analytics property
- Verify service account email is added to property access

**Error: "API not enabled"**
- Make sure Google Analytics Data API v1 is enabled in Google Cloud Console

#### 6.2 Debug Mode
To see detailed logs, check the backend console for:
- API request/response logs
- Error messages
- Authentication status

### 7. Production Deployment

#### 7.1 Environment Variables
Set these in your production environment:
```env
GA_PROPERTY_ID=your_property_id
NODE_ENV=production
```

#### 7.2 Security
- Keep credentials file secure
- Use environment variables for sensitive data
- Consider using Google Cloud Secret Manager for production

### 8. API Limitations

#### 8.1 Real-time Data
- GA4 Data API v1 doesn't support real-time data
- Real-time section shows mock data
- Consider using GA4 Real-time API (separate setup required)

#### 8.2 Rate Limits
- Google Analytics API has rate limits
- Implement caching for production use
- Monitor API usage in Google Cloud Console

## Support

If you encounter issues:
1. Check Google Cloud Console for API errors
2. Verify service account permissions
3. Check backend logs for detailed error messages
4. Ensure all environment variables are set correctly
