import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  // This disables the nft tracing which is causing the ENOENT error on Vercel
  // @ts-expect-error - outputFileTracing is valid in runtime but types might be missing in this version
  outputFileTracing: false, 

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
  }
};

export default nextConfig;
