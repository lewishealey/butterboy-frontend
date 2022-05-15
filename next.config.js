/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['butterboy.test','butterboy.live'],
  },
  env: {
    WOO_URL: process.env.WOO_URL,
    WOO_KEY: process.env.WOO_KEY,
    WOO_SECRET: process.env.WOO_SECRET,
    COOKIES_TAG: process.env.COOKIES_TAG,
    BOXES_TAG: process.env.BOXES_TAG,
    MERCH_TAG: process.env.MERCH_TAG,
    DRINKS_TAG: process.env.DRINKS_TAG,
    OTHER_TAG: process.env.OTHER_TAG,
    STRIPE_KEY: process.env.STRIPE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_DB: process.env.MONGODB_DB,
  }
}

module.exports = nextConfig