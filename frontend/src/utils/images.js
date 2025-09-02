// Image utility functions for the website

/**
 * Get the full path for a logo image
 * @param {string} filename - The logo filename
 * @returns {string} The full path to the logo
 */
export const getLogoPath = (filename) => {
  return `/images/logo/${filename}`
}

/**
 * Get the full path for a team member photo
 * @param {string} filename - The team member photo filename
 * @returns {string} The full path to the team photo
 */
export const getTeamPhotoPath = (filename) => {
  return `/images/team/${filename}`
}

/**
 * Get the full path for a product image
 * @param {string} category - The product category
 * @param {string} filename - The product image filename
 * @returns {string} The full path to the product image
 */
export const getProductImagePath = (category, filename) => {
  return `/images/products/${category}/${filename}`
}

/**
 * Get the full path for a hero image
 * @param {string} filename - The hero image filename
 * @returns {string} The full path to the hero image
 */
export const getHeroImagePath = (filename) => {
  return `/images/hero/${filename}`
}

/**
 * Get the full path for an about page image
 * @param {string} filename - The about image filename
 * @returns {string} The full path to the about image
 */
export const getAboutImagePath = (filename) => {
  return `/images/about/${filename}`
}

/**
 * Get the full path for a partner logo
 * @param {string} filename - The partner logo filename
 * @returns {string} The full path to the partner logo
 */
export const getPartnerLogoPath = (filename) => {
  return `/images/partners/${filename}`
}

/**
 * Generate a placeholder image URL for development
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @param {string} text - Text to display on placeholder
 * @returns {string} Placeholder image URL
 */
export const getPlaceholderImage = (width = 400, height = 300, text = 'Image') => {
  return `https://via.placeholder.com/${width}x${height}/0ea5e9/ffffff?text=${encodeURIComponent(text)}`
}

/**
 * Check if an image exists
 * @param {string} path - The image path
 * @returns {Promise<boolean>} Whether the image exists
 */
export const imageExists = async (path) => {
  try {
    const response = await fetch(path, { method: 'HEAD' })
    return response.ok
  } catch {
    return false
  }
}

/**
 * Get optimized image path for different screen sizes
 * @param {string} basePath - The base image path
 * @param {string} size - The size suffix (sm, md, lg, xl)
 * @returns {string} The optimized image path
 */
export const getOptimizedImagePath = (basePath, size = 'md') => {
  const sizes = {
    sm: '-300',
    md: '-600', 
    lg: '-900',
    xl: '-1200'
  }
  
  const extension = basePath.split('.').pop()
  const baseName = basePath.replace(`.${extension}`, '')
  
  return `${baseName}${sizes[size]}.${extension}`
}
