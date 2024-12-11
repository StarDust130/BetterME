import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Redirects all /api requests
        destination: "http://http://192.168.29.198/api/:path*", // The backend URL
      },
    ];
  },
  
};

export default nextConfig;
