/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  // Keep it simple for Vercel
  distDir: '.next'
};

module.exports = nextConfig;
