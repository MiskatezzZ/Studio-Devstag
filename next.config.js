/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [],
    unoptimized: process.env.NODE_ENV !== 'production',
  },
  // Enable output to work with both Vercel and static exports
  output: 'standalone',
};

module.exports = nextConfig;
