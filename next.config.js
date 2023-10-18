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
        hostname: 'assets.nflxext.com',
        port: '',
        pathname: '/ffe/**',
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
  // fallbacks: {
  //   image: "/static/images/fallback.png",
  // },  
});

module.exports = withPWA(
  nextConfig
);
