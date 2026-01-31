import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/infwebcujae/**", // 👈 reemplaza "infwebcujae" con tu cloud_name
      },
    ],
  },
};

export default nextConfig;
