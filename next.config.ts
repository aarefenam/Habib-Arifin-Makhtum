import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Allow dev server access from other devices on the local network (e.g. http://192.168.x.x:3000)
  allowedDevOrigins: ["*.*.*.*"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "framerusercontent.com",
      },
    ],
  },
}

export default nextConfig
