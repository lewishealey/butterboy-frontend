/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    //enter the domain or subdomain where you have WordPress installed
    domains: ['butterboy.test'],
  },
}

module.exports = nextConfig