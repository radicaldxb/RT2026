export default function robots() {
  const baseUrl = "https://radical-thinking.net";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/insights/", "/llms.txt"],
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
