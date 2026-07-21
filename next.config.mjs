import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/api/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Cache-Control", value: "no-store" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
      { source: "/blog", destination: "/insights", permanent: true },
      { source: "/contact", destination: "/chat", permanent: true },
      { source: "/contact-us", destination: "/chat", permanent: true },
      { source: "/Contact", destination: "/chat", permanent: true },
      { source: "/our-work", destination: "/work", permanent: true },
      { source: "/portfolio", destination: "/work", permanent: true },
      { source: "/portfolio/:path*", destination: "/work/:path*", permanent: true },
      { source: "/work/austability", destination: "/work/austability-web", permanent: true },
      { source: "/category/:slug", destination: "/insights", permanent: true },
      { source: "/tag/:slug", destination: "/insights", permanent: true },
      { source: "/12-years-of-radical-thinking", destination: "/about", permanent: true },
      { source: "/shop", destination: "/work/fluffyfriends", permanent: true },
      { source: "/creative", destination: "/about", permanent: true },
      { source: "/experience", destination: "/about", permanent: true },
      { source: "/technology", destination: "/services", permanent: true },
      { source: "/roadmap", destination: "/chat", permanent: false },
      { source: "/playbook", destination: "/how-we-work", permanent: true },
    ];
  },
};

export default nextConfig;
