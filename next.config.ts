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
      // Redirect all caantin.ai traffic to shylock.ai
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'caantin.ai' }],
        destination: 'https://shylock.ai/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.caantin.ai' }],
        destination: 'https://shylock.ai/:path*',
        permanent: true,
      },
      // Redirect all caantin.com traffic to shylock.ai
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'caantin.com' }],
        destination: 'https://shylock.ai/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.caantin.com' }],
        destination: 'https://shylock.ai/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
