import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig(({ isPreview }) => ({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'MG Installations',
        short_name: 'MG Installations',
        description: 'DStv, CCTV, and TV mounting installer serving Ladysmith and uMnambithi.',
        theme_color: '#F5F5F4',
        background_color: '#F5F5F4',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
      workbox: {
        // Precaches the app shell (JS/CSS/icons) plus the root index.html from the client
        // build. The other 8 routes' prerendered HTML files don't exist yet at this point
        // (prerender.js runs after this build step) — that's fine, since client-side <Link>
        // navigation never re-fetches a document once the bundle is loaded, and
        // navigateFallback below covers a hard/direct offline navigation to any other route.
        // Content photos are deliberately left out of the eager precache (they're runtime-
        // cached below instead) so a first visit doesn't force-download the whole gallery.
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'],
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/admin/],
        runtimeCaching: [
          {
            // Job photos build up in the cache as pages are actually visited, rather than
            // all being force-downloaded upfront.
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'mg-images',
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
          {
            // Self-hosting Lexend isn't worth it for one font, but without this the
            // branded typeface silently falls back to a system font while offline.
            urlPattern: ({ url }) => url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com',
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
        ],
      },
    }),
  ],
  // Each route now has its own prerendered dist/<route>/index.html. `vite preview`
  // serves the real dist/ build, so switch it to 'mpa' mode there to serve the matching
  // per-route file instead of always falling back to the root index.html — this mirrors
  // how Vercel's static hosting already behaves. `vite dev` stays 'spa' (the default)
  // since no prerendered files exist yet during development.
  appType: isPreview ? 'mpa' : 'spa',
}))
