import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // This allows production builds to complete even if there are type errors.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
