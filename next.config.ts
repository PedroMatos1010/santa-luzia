import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Permite que o JavaScript de desenvolvimento do Next.js passe pelo Localtunnel
  allowedDevOrigins: [
    '*.loca.lt'
  ],
  images: {
    unoptimized: process.env.NODE_ENV === 'development',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'subpyramidical-shawnta-subpolygonally.ngrok-free.dev'
      },
      {
        protocol: 'http',
        hostname: 'festa-santa-luzia-api.ddev.site'
      },
    ],
  },
};

export default nextConfig;