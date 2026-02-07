import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'grainy-gradients.vercel.app',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  trailingSlash: false,

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  // 🚀 Force redirect from root (/) to Persian home (/fa)
  async redirects() {
    return [
      {
        source: '/',
        destination: '/fa',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
