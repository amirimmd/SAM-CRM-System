import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  // Clean configuration without unsupported keys
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
  
  // Standard nested config for typescript and eslint
  typescript: {
    ignoreBuildErrors: true,
  },
  
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Use default output mode (NOT standalone) to avoid ENOENT errors on Vercel
  // No outputFileTracing config needed for default Vercel deployments
};

export default nextConfig;
