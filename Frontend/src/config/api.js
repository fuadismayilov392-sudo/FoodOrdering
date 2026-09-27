import axios from 'axios';

// VITE_API_URL is set at build time. The fallback keeps local development simple.
export const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');

export const api = axios.create({ baseURL: API_URL });

// Old database records contain localhost image links. Normalize every API
// response so those existing records continue to work after deployment.
function normalizeAssetUrls(value) {
  if (typeof value === 'string') {
    return value.replace(/^http:\/\/localhost:5000(?=\/)/, API_URL);
  }
  if (Array.isArray(value)) return value.map(normalizeAssetUrls);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, normalizeAssetUrls(item)]));
  }
  return value;
}

api.interceptors.response.use((response) => {
  response.data = normalizeAssetUrls(response.data);
  return response;
});
