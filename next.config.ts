import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.ahmed.alaa1144.apis.mrbotusa.com',
        pathname: '/storage/images/**'
      },
      {
        protocol: 'https',
        hostname: 'new-portfolio1144.netlify.app',
        pathname: '/**'
      }
    ]
  }
};

export default nextConfig;
