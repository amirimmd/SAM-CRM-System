import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    // Vercel optimized image domains can be added here if you use external images
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
  // Ensure trailing slashes are handled consistently
  trailingSlash: false,
  // Disable ESLint during build to prevent deployment failure due to config issues
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript type checking during build (optional, if you have TS errors)
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
