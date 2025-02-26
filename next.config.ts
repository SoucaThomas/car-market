import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "g3gyyawfqt.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
