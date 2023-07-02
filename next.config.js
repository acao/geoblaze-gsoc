const withOffline = require('next-offline')

/** @type {import('next').NextConfig} */
const nextConfig = withOffline({
  experimental: {
    turbo: true,
    // urlImports: ['https://cdn.skypack.dev'],
    optimisticClientCache: true
  },
  async rewrites() {
    return [
      {
        source: "/googlestore/:path*",
        destination: "https://storage.googleapis.com/:path*",
      },
    ];
  },
  // this i will enable later for fun and accessiblity
  // i18n: {
  //   localeDetection: true,
  //   defaultLocale: 'en',
  //   locales: ['en', 'de', 'fr', 'pr'],
  // },
  
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'offlineCache',
        expiration: {
          maxEntries: 200
        }
      }
    }
  ]
});

module.exports = nextConfig;
