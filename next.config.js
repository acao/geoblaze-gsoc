
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
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

};

module.exports = nextConfig;
