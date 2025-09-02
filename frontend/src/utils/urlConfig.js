// URL Configuration Utility
// This file centralizes all URL-related configuration

const getApiUrl = () => {
  // If VITE_API_URL is explicitly set, use it
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // In production, use the same domain as the frontend
  if (import.meta.env.PROD) {
    return window.location.origin;
  }
  
  // In development, use localhost
  return 'http://localhost:5001';
};

const getUploadUrl = (filename) => {
  const apiUrl = getApiUrl();
  return `${apiUrl}/uploads/${filename}`;
};

const getAuthUrl = (endpoint) => {
  const apiUrl = getApiUrl();
  return `${apiUrl}/auth/${endpoint}`;
};

const getApiEndpoint = (endpoint) => {
  const apiUrl = getApiUrl();
  return `${apiUrl}${endpoint}`;
};

// Environment detection
const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

export {
  getApiUrl,
  getUploadUrl,
  getAuthUrl,
  getApiEndpoint,
  isDevelopment,
  isProduction,
  isLocalhost
};
