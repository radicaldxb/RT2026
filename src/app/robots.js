export default function robots() {
  const baseUrl = "https://radical-thinking.net";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/brief/",
          "/landing",
          "/profile",
          "/unsubscribe",
          "/roadmap",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
