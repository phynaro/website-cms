# Firstly Tech Website

A modern company website built with React, Vite, TailwindCSS, and Strapi as a headless CMS.

## Features

- 🚀 **Modern Tech Stack**: React 18 + Vite + TailwindCSS
- 📱 **Responsive Design**: Mobile-first approach with beautiful UI
- 🎯 **Google Analytics**: Integrated GA4 for visitor tracking
- 🎨 **Animations**: Smooth animations with Framer Motion
- 🔍 **SEO Optimized**: Meta tags and structured data
- 📝 **Contact Form**: Functional contact form with validation
- 🛍️ **Product Catalog**: Product showcase with search and filtering
- 👥 **Team Section**: Company team and research team profiles
- 🌐 **Multi-language Ready**: Thai and English support structure

## Tech Stack

- **Frontend**: React 18, Vite, TailwindCSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Analytics**: Google Analytics 4
- **CMS**: Strapi (Headless CMS)
- **Routing**: React Router DOM
- **SEO**: React Helmet Async

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd website-cms/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Update the environment variables:
```env
# Google Analytics Tracking ID
VITE_GA_TRACKING_ID=G-XXXXXXXXXX

# Strapi API URL (for when you set up Strapi)
VITE_STRAPI_API_URL=http://localhost:1337
```

5. Start the development server:
```bash
npm run dev
```

The website will be available at `http://localhost:3000`

## Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Header.jsx      # Navigation header
│   │   ├── Footer.jsx      # Site footer
│   │   ├── HeroSection.jsx # Hero section component
│   │   ├── ProductCard.jsx # Product display card
│   │   └── ...
│   ├── pages/              # Page components
│   │   ├── Home.jsx        # Home page
│   │   ├── About.jsx       # About page
│   │   ├── Products.jsx    # Products page
│   │   └── Contact.jsx     # Contact page
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # App entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── index.html              # HTML template
├── package.json            # Dependencies
├── tailwind.config.js      # TailwindCSS config
├── vite.config.js          # Vite config
└── postcss.config.js       # PostCSS config
```

## Pages

### Home Page (`/`)
- Hero section with company introduction
- Product categories showcase
- Company highlights and features
- Statistics and achievements
- Call-to-action sections

### About Page (`/about`)
- Company story and history
- Core values and mission
- Timeline of achievements
- Core team profiles
- Research team profiles

### Products Page (`/products`)
- Product catalog with search functionality
- Category filtering
- Product cards with details
- Responsive grid layout

### Contact Page (`/contact`)
- Contact information display
- Contact form with validation
- Office location and business hours
- Multiple contact methods

## Google Analytics Setup

1. Create a Google Analytics 4 property
2. Get your Measurement ID (starts with G-)
3. Update `VITE_GA_TRACKING_ID` in your `.env.local` file
4. The analytics will automatically track:
   - Page views
   - Navigation clicks
   - Form submissions
   - Button clicks

## Strapi CMS Integration

The website is designed to work with Strapi as a headless CMS. To set up Strapi:

1. Create a new Strapi project
2. Set up content types for:
   - Products
   - Team Members
   - Company Information
   - Contact Messages
3. Update `VITE_STRAPI_API_URL` in your environment file
4. Implement API calls in the components

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Deployment

The website can be deployed to any static hosting service:

- **Vercel**: Connect your GitHub repository
- **Netlify**: Drag and drop the `dist/` folder
- **GitHub Pages**: Use GitHub Actions for deployment
- **AWS S3**: Upload the `dist/` folder

## Customization

### Colors
Update the primary and secondary colors in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    50: '#f0f9ff',
    // ... other shades
  },
  secondary: {
    // ... secondary colors
  }
}
```

### Content
- Update company information in the components
- Replace placeholder images with actual product images
- Update contact information and addresses

### Styling
- Modify TailwindCSS classes in components
- Add custom CSS in `src/index.css`
- Update animations in Framer Motion components

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact:
- Email: marketting.firstlytech@gmail.com
- Phone: 061 665 0538

---

Built with ❤️ by Firstly Tech Team
