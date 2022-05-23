/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MORALIS_URL: 'https://lkrlnbylo62k.usemoralis.com:2053/server',
    MORALIS_ID: 'R9F8LvZkauCUwaBD4tvBcXrzTxBwZVsL3wbAtrMZ',
    CONTRACT_ADDR: '0xc828ed3b23EcAB749B3DB2B7283139135719A5C3'
  }
}

module.exports = nextConfig
