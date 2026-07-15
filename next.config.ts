import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Permite que o JavaScript de desenvolvimento do Next.js passe pelo Localtunnel
  allowedDevOrigins: [
    '*.loca.lt'
  ],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'subpyramidical-shawnta-subpolygonally.ngrok-free.dev'
      },
      {
        protocol: 'http',
        hostname: 'festa-santa-luzia-api.ddev.site'
      },
      {
	 protocol: 'https',
      hostname: 'admin.santaluziamoreira.pt'
      },

    ],
  },
};

export default nextConfig;
