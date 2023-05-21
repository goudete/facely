/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'ai-avatar-generator.s3.amazonaws.com',
      'public-michelangelo-ai.s3.amazonaws.com'
    ],
  },
}

module.exports = nextConfig
