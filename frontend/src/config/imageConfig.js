// Sample image configuration for the website
// This file shows how to organize and reference images

export const IMAGE_CONFIG = {
  // Logo images
  logo: {
    main: '/images/logo/logo.webp',
    white: '/images/logo/logo-white.png',
    favicon: '/images/logo/favicon.ico'
  },

  // Team member photos
  team: {
    natphapat: '/images/team/natphapat-supatsaraphokin.webp',
    jakapan: '/images/team/jakapan-satoom.jpg',
    benyapa: '/images/team/benyapa-jobdee.webp',
    nattanan: '/images/team/nattanan-pussadetongchai.webp',
    yupatinee: '/images/team/yupatinee-jitsupho.webp',
    meentraporn: '/images/team/meentraporn-donbandranchoke.webp',
    kritsana: '/images/team/kritsana-thubuchakorn.webp',
    chiriphon: '/images/team/chiriphon-salangsing.webp'
  },

  // Product images by category
  products: {
    'vaccine-filling': {
      machineA: '/images/products/vaccine-filling/machine-model-a.jpg',
      machineB: '/images/products/vaccine-filling/machine-model-b.jpg'
    },
    'medical-equipment': {
      testKit: '/images/products/medical-equipment/covid-test-kit.jpg',
      chemicals: '/images/products/medical-equipment/lab-chemicals.jpg',
      tools: '/images/products/medical-equipment/lab-tools.jpg'
    },
    'animal-products': {
      petEquipment: '/images/products/animal-products/pet-equipment.jpg',
      animalFood: '/images/products/animal-products/animal-food.jpg'
    },
    'herbal-products': {
      herbal1: '/images/products/herbal-products/herbal-product-1.jpg',
      herbal2: '/images/products/herbal-products/herbal-product-2.jpg'
    },
    'clinic-services': {
      clinic: '/images/products/clinic-services/clinic-interior.jpg',
      equipment: '/images/products/clinic-services/medical-equipment.jpg'
    },
    'export-products': {
      export1: '/images/products/export-products/export-product-1.jpg',
      export2: '/images/products/export-products/export-product-2.jpg'
    }
  },

  // Hero section images
  hero: {
    background: '/images/hero/hero-bg.jpg',
    illustration: '/images/hero/hero-illustration.svg'
  },

  // About page images
  about: {
    office: '/images/about/office.jpg',
    teamPhoto: '/images/about/team-photo.webp',
    timeline: '/images/about/timeline-illustration.svg'
  },

  // Partner logos
  partners: {
    partner1: '/images/partners/partner1.png',
    partner2: '/images/partners/partner2.png',
    partner3: '/images/partners/partner3.png'
  }
}

// Usage example:
// import { IMAGE_CONFIG } from './imageConfig'
// <img src={IMAGE_CONFIG.logo.main} alt="Firstly Tech Logo" />
// <img src={IMAGE_CONFIG.team.natphapat} alt="Natphapat Supatsaraphokin" />
