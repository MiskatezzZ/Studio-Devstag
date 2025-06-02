/** @type {import('next').NextConfig} */
const nextConfig = {
  // Very minimal config to allow Vercel to handle the deployment
  reactStrictMode: true,
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;
