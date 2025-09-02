# Images Directory Structure

This directory contains all images used in the Firstly Tech website.

## Directory Structure

```
public/images/
├── logo/           # Company logos and branding
│   ├── logo.png    # Main company logo
│   ├── logo-white.png  # White version for dark backgrounds
│   └── favicon.ico # Website favicon
├── team/           # Team member photos
│   ├── natphapat-supatsaraphokin.webp
│   ├── jakapan-satoom.jpg
│   ├── benyapa-jobdee.webp
│   ├── nattanan-pussadetongchai.webp
│   ├── yupatinee-jitsupho.webp
│   ├── meentraporn-donbandranchoke.webp
│   ├── kritsana-thubuchakorn.webp
│   └── chiriphon-salangsing.webp
├── products/       # Product images
│   ├── vaccine-filling/
│   ├── medical-equipment/
│   ├── animal-products/
│   ├── herbal-products/
│   └── ...
├── hero/           # Hero section images
│   ├── hero-bg.jpg
│   └── hero-illustration.svg
├── about/          # About page images
│   ├── office.jpg
│   ├── team-photo.jpg
│   └── timeline-illustration.svg
└── partners/       # Partner and supplier logos
    ├── partner1.png
    ├── partner2.png
    └── ...
```

## Image Guidelines

### Logo Images
- **Format**: PNG with transparency
- **Size**: 
  - Main logo: 200x80px (minimum)
  - Favicon: 32x32px
- **Background**: Transparent for flexibility

### Team Photos
- **Format**: JPG or PNG
- **Size**: 400x400px (square)
- **Style**: Professional headshots
- **Background**: Clean, professional

### Product Images
- **Format**: JPG or PNG
- **Size**: 800x600px (4:3 ratio)
- **Style**: Clean, well-lit product photos
- **Background**: White or neutral

### Hero Images
- **Format**: JPG or SVG
- **Size**: 1920x800px (minimum)
- **Style**: High-quality, relevant to business

## File Naming Convention

- Use kebab-case: `company-logo.png`
- Include dimensions if needed: `hero-bg-1920x800.jpg`
- Use descriptive names: `vaccine-filling-machine.jpg`

## Optimization

Before adding images:
1. Compress images for web use
2. Use appropriate formats (JPG for photos, PNG for logos)
3. Consider using WebP format for better compression
4. Optimize file sizes for faster loading

## Usage in Components

```javascript
// Example usage in React components
import logo from '/images/logo/logo.png'
import teamPhoto from '/images/team/natphapat-supatsaraphokin.jpg'

// In JSX
<img src={logo} alt="Firstly Tech Logo" />
<img src={teamPhoto} alt="Natphapat Supatsaraphokin" />
```

## Strapi Integration

When using Strapi CMS:
1. Upload images through Strapi admin panel
2. Images will be stored in Strapi's media library
3. Use Strapi's image optimization features
4. Reference images via Strapi API URLs
