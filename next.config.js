/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')

const nextConfig = withPWA({
  pwa: {
    dest: 'public',
  },
  reactStrictMode: true,
  trailingSlash: true,
  disable: process.env.NODE_ENV === "development",
})

module.exports = nextConfig