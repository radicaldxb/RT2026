export default function robots() {
  const baseUrl = "https://radical-thinking.net";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}