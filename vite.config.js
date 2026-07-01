import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ isPreview }) => ({
  plugins: [react()],
  // Each route now has its own prerendered dist/<route>/index.html. `vite preview`
  // serves the real dist/ build, so switch it to 'mpa' mode there to serve the matching
  // per-route file instead of always falling back to the root index.html — this mirrors
  // how Vercel's static hosting already behaves. `vite dev` stays 'spa' (the default)
  // since no prerendered files exist yet during development.
  appType: isPreview ? 'mpa' : 'spa',
}))
