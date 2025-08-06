import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Basic configuration that works well with Vercel
  trailingSlash: false,
  // Ensure proper handling of external packages
  serverExternalPackages: [],
};

export default nextConfig;
