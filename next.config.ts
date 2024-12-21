import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:slug*",
        destination: process.env.BACKEND_URL + "/:slug*",
        basePath: false,
      },
    ];
  },
};

export default nextConfig;
