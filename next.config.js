/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['butterboy.com.au'],
  },
  env: {
    STRIPE_KEY: process.env.STRIPE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_DB: process.env.MONGODB_DB,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  }
}

module.exports = nextConfig