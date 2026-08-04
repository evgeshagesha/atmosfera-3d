import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/privacy", destination: "/policy", permanent: true },
      { source: "/politika-pdn", destination: "/policy", permanent: true },
      { source: "/soglasie-pdn", destination: "/personal", permanent: true },
      { source: "/soglasie", destination: "/personal", permanent: true },
    ];
  },
};

export default nextConfig;
