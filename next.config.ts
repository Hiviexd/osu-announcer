import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    env: {
        OSU_CLIENT_ID: process.env.OSU_CLIENT_ID,
        OSU_CLIENT_SECRET: process.env.OSU_CLIENT_SECRET,
        OSU_CALLBACK_URL: process.env.OSU_CALLBACK_URL,
        PASSWORD: process.env.PASSWORD,
    },
    images: {
        domains: ["a.ppy.sh"],
    },
};

export default nextConfig;
