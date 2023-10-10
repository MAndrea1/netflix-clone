/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/t/p/**',
      },
    ],
  },  
}

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  fallbacks: {
    // This is for images.
    image: "/static/images/fallback.png",
  },  
});

module.exports = withPWA(
  nextConfig
);
