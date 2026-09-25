import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages is served under the repository name, while Vercel serves
  // this project from the domain root.
  base: process.env.VERCEL ? '/' : '/FoodOrdering/',
})
