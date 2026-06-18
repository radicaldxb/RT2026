import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
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
      { source: "/our-work", destination: "/portfolio", permanent: true },
      { source: "/Services", destination: "/services", permanent: true },
      { source: "/category/:slug", destination: "/insights", permanent: true },
      { source: "/tag/:slug", destination: "/insights", permanent: true },
      { source: "/12-years-of-radical-thinking", destination: "/about", permanent: true },
      { source: "/shop", destination: "/portfolio/fluffyfriends", permanent: true },
      { source: "/creative", destination: "/about", permanent: true },
      { source: "/experience", destination: "/about", permanent: true },
      { source: "/technology", destination: "/services", permanent: true },
    ];
  },
};

export default nextConfig;
