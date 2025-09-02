How to Set Up Node.js Express with the Google Analytics Data API
This guide provides a step-by-step recommendation for creating a Node.js Express application that connects to the Google Analytics 4 (GA4) Data API. This setup is ideal for building custom dashboards, automating reports, or integrating GA4 data into your own applications.

Prerequisites
Before you begin, ensure you have the following ready:

Node.js and npm: Installed on your system.

A Google Cloud Project: With the Google Analytics Data API enabled.

A GA4 Property ID: Your property ID for the GA4 account you wish to query.

A Service Account JSON Key: A key file downloaded from your Google Cloud project with the necessary permissions to access the GA4 property. It is a best practice to keep this file secure and not commit it to version control.

Step 1: Set Up Your Project
First, create a new directory for your project and navigate into it.

mkdir ga4-express-api
cd ga4-express-api
npm init -y

Next, install the required packages: express for the web server, @google-analytics/data for the API client, and dotenv to manage your environment variables securely.

npm install express @google-analytics/data dotenv

Step 2: Configure Environment Variables
Create a file named .env in the root of your project to store your sensitive credentials.

GOOGLE_APPLICATION_CREDENTIALS=path/to/your/service-account-key.json
GA4_PROPERTY_ID=YOUR_GA4_PROPERTY_ID

Replace path/to/your/service-account-key.json with the actual path to your downloaded JSON key file.

Replace YOUR_GA4_PROPERTY_ID with your GA4 Property ID.

Step 3: Create the Express Server
Create a file named index.js or server.js and add the following code. This script will set up a basic Express server with a single route to fetch and display GA4 data.

// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const { BetaAnalyticsDataClient } = require('@google-analytics/data');

const app = express();
const port = process.env.PORT || 3000;

// Initialize the Google Analytics Data Client with the service account key
// The GOOGLE_APPLICATION_CREDENTIALS environment variable is automatically used for authentication.
const analyticsDataClient = new BetaAnalyticsDataClient();

// The main API route to get analytics data
app.get('/analytics-data', async (req, res) => {
    try {
        const propertyId = process.env.GA4_PROPERTY_ID;
        if (!propertyId) {
            return res.status(500).json({ error: 'GA4_PROPERTY_ID is not set in environment variables.' });
        }

        const [report] = await analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dateRanges: [
                {
                    startDate: '30daysAgo',
                    endDate: 'today',
                },
            ],
            dimensions: [
                {
                    name: 'pagePath',
                },
            ],
            metrics: [
                {
                    name: 'sessions',
                },
                {
                    name: 'screenPageViews',
                },
            ],
        });

        // Map the report data into a more readable format
        const formattedData = report.rows.map(row => {
            const pagePath = row.dimensionValues[0].value;
            const sessions = row.metricValues[0].value;
            const pageViews = row.metricValues[1].value;
            return {
                pagePath,
                sessions,
                pageViews,
            };
        });

        res.json({
            message: 'Successfully fetched Google Analytics data.',
            data: formattedData,
        });

    } catch (error) {
        console.error('Error fetching data from Google Analytics:', error);
        res.status(500).json({
            error: 'Failed to fetch data from the Google Analytics Data API.',
            details: error.message,
        });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    console.log('Access analytics data at http://localhost:3000/analytics-data');
});

Step 4: Run the Application
Start your server from the terminal:

node index.js

You should see a confirmation message in your console indicating that the server is running. You can now visit http://localhost:3000/analytics-data in your web browser to see the JSON output of your GA4 data.

This guide provides a foundational setup. For a production environment, consider adding more robust error handling, caching mechanisms, and a more complex routing structure.