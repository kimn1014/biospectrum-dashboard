import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 't9018523380.p.clickup-attachments.com',
      },
    ],
  },
};

export default nextConfig;
