/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MORALIS_URL: '',
    MORALIS_ID: '',
    CONTRACT_ADDR: ''
  }
}

module.exports = nextConfig
