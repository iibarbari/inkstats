import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    resolveAlias: {
      fs: require.resolve("node:fs"),
    }
  },
};

export default nextConfig;
