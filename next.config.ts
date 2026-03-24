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
      // Redirect www variants to bare domain
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
