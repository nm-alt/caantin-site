import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/wikipedia/commons/**',
      },
      {
        protocol: 'https',
        hostname: 'images.metmuseum.org',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      // Old pages → homepage
      { source: '/how-it-works', destination: '/', permanent: true },
      { source: '/results', destination: '/', permanent: true },
      { source: '/use-cases/:slug', destination: '/', permanent: true },
      { source: '/for/:slug', destination: '/', permanent: true },
      { source: '/caantin', destination: '/', permanent: true },
      // Redirect www variants
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.caantin.ai' }],
        destination: 'https://caantin.ai/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.caantin.com' }],
        destination: 'https://caantin.com/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
