import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep Turbopack rooted in this app (avoids picking up a parent package-lock).
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
