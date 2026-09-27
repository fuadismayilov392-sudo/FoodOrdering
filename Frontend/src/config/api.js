import axios from 'axios';

// VITE_API_URL is set at build time. The fallback keeps local development simple.
export const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');

export const api = axios.create({ baseURL: API_URL });

// Also fixes image links that were saved before the backend was deployed.
export function assetUrl(url) {
  return url?.replace(/^http:\/\/localhost:5000(?=\/)/, API_URL);
}
