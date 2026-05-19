// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  poweredByHeader: false,

  compress: true,

  productionBrowserSourceMaps: false,

  experimental: {
    optimizePackageImports: ["lucide-react", "react-icons", "recharts"],
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",

        hostname: "res.cloudinary.com",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",

        headers: [
          {
            key: "X-Frame-Options",

            value: "DENY",
          },

          {
            key: "X-Content-Type-Options",

            value: "nosniff",
          },

          {
            key: "Referrer-Policy",

            value: "strict-origin-when-cross-origin",
          },

          {
            key: "Permissions-Policy",

            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
