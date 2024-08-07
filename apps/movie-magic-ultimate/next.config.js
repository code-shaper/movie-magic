/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
    dirs: ['.'],
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
  experimental: {
    /*
     * Disable client-side router cache
     * See https://nextjs.org/docs/app/api-reference/next-config-js/staleTimes
     */
    staleTimes: {
      dynamic: 0,
      static: 0,
    },
  },
};

module.exports = nextConfig;
