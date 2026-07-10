export default function robots() {
  const baseUrl = "https://radical-thinking.net";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/brief/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}