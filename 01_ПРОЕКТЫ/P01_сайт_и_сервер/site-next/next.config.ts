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
  async headers() {
    // Path-scoped CSP so Kinescope embeds on /testeg stay allowed if a broader CSP is added later.
    const kinescopeFrames =
      "frame-src 'self' https://kinescope.io https://*.kinescope.io; child-src 'self' https://kinescope.io https://*.kinescope.io";
    return [
      {
        source: "/testeg",
        headers: [{ key: "Content-Security-Policy", value: kinescopeFrames }],
      },
      {
        source: "/testeg/:path*",
        headers: [{ key: "Content-Security-Policy", value: kinescopeFrames }],
      },
    ];
  },
};

export default nextConfig;
