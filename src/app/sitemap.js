// src/app/sitemap.js
import { portfolio } from "@/app/work/projects";
import { articles } from "@/app/insights/articles";

export default function sitemap() {
  const baseUrl = "https://radical-thinking.net";
  const now = new Date();

  const insightDates = (Array.isArray(articles) ? articles : [])
    .map((item) => (item.publishedDate ? new Date(item.publishedDate) : null))
    .filter(Boolean)
    .sort((a, b) => b - a);
  const newestInsight = insightDates[0] || now;

  const portfolioEntries = portfolio.map((item) => ({
    url: `${baseUrl}/work/${item.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const insightEntries = articles.map((item) => {
    const published = item.publishedDate ? new Date(item.publishedDate) : now;
    const isRecent =
      Number.isFinite(published.getTime()) &&
      now - published < 1000 * 60 * 60 * 24 * 60;

    return {
      url: `${baseUrl}/insights/${item.slug}`,
      lastModified: published,
      changeFrequency: isRecent ? "weekly" : "monthly",
      priority: isRecent ? 0.8 : 0.7,
    };
  });

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/how-we-work`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/insights`,
      lastModified: newestInsight,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    ...insightEntries,
    ...portfolioEntries,
    {
      url: `${baseUrl}/intelligence`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/chat`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/terms-of-use`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
