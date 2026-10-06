/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isProd ? '/puthitech' : '',
  assetPrefix: isProd ? '/puthitech/' : '',
  images: {
    unoptimized: true,
  },
  experimental: {
    mdxRs: true,
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
}

module.exports = nextConfig
