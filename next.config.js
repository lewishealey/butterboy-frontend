/** @type {import('next').NextConfig} */

const withPlugins = require("next-compose-plugins");
const shouldAnalyzeBundles = process.env.ANALYZE === true;

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["butterboy.com.au"],
  },
  env: {
    STRIPE_KEY: process.env.STRIPE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_DB: process.env.MONGODB_DB,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    KLAYVIO_API_KEY: process.env.KLAYVIO_API_KEY,
    DASHBOARD_PASSWORD: process.env.DASHBOARD_PASSWORD,
  },
};

if (shouldAnalyzeBundles) {
  const withNextBundleAnalyzer =
    require("next-bundle-analyzer")(/* options come there */);
  nextConfig = withNextBundleAnalyzer(nextConfig);
}

module.exports = withPlugins([], nextConfig);
