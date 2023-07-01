/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    COGNITO_REGION: process.env.COGNITO_REGION,
  },
};

module.exports = nextConfig;
