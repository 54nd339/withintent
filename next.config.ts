import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.hygraph.com',
      },
      {
        protocol: 'https',
        hostname: '**.hygraphusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.graphassets.com',
      },
    ],
  },
};

export default nextConfig;
