import { notFound } from "next/navigation";
import Script from "next/script";
import { articles } from "@/app/insights/articles";
import InsightArticleLayout from "../InsightArticleLayout";

export function generateStaticParams() {
  return Array.isArray(articles) ? articles.map((a) => ({ slug: a.slug })) : [];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = Array.isArray(articles) ? articles.find((a) => a.slug === slug) : null;
  if (!article) return { title: "Article Not Found" };

  const baseUrl = "https://radical-thinking.net";
  const ogSrc = article.ogImage || article.image;
  const imageUrl = ogSrc && ogSrc.startsWith("http") ? ogSrc : `${baseUrl}${ogSrc}`;

  const pageUrl = `${baseUrl}/insights/${article.slug}`;

  return {
    title: `${article.title} | Radical Thinking Insights`,
    description: article.description,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      url: pageUrl,
      siteName: "Radical Thinking",
      publishedTime: article.publishedDate,
      authors: article.author ? [article.author] : undefined,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [imageUrl],
    },
  };
}

export default async function InsightArticlePage({ params }) {
  const { slug } = await params;
  const article = Array.isArray(articles) ? articles.find((a) => a.slug === slug) : null;

  if (!article) {
    notFound();
  }

  const byDateDesc = (a, b) => String(b?.publishedDate || "").localeCompare(String(a?.publishedDate || ""));
  const overlapCount = (aTags, bTags) => {
    const setA = new Set(aTags || []);
    let n = 0;
    (bTags || []).forEach((t) => {
      if (setA.has(t)) n += 1;
    });
    return n;
  };

  const relatedArticles = (Array.isArray(articles) ? articles : [])
    .filter((a) => a?.slug && a.slug !== slug)
    .sort((a, b) => {
      const oa = overlapCount(article.tags, a.tags);
      const ob = overlapCount(article.tags, b.tags);
      if (ob !== oa) return ob - oa;
      return byDateDesc(a, b);
    })
    .slice(0, 4);

  const pageUrl = `https://radical-thinking.net/insights/${article.slug}`;
  const imageUrl =
    (article.ogImage || article.image) && (article.ogImage || article.image).startsWith("http")
      ? article.ogImage || article.image
      : article.ogImage || article.image
        ? `https://radical-thinking.net${article.ogImage || article.image}`
        : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: imageUrl,
    datePublished: article.publishedDate,
    dateModified: article.publishedDate,
    author: {
      "@type": "Person",
      name: article.author,
      url: "https://radical-thinking.net/about",
    },
    publisher: {
      "@type": "Organization",
      name: "Radical Thinking",
      url: "https://radical-thinking.net",
      logo: {
        "@type": "ImageObject",
        url: "https://radical-thinking.net/logos/RT-Logo-New.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    url: pageUrl,
  };

  return (
    <>
      <Script id={`ld-json-insight-${slug}`} type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>
      <InsightArticleLayout article={article} relatedArticles={relatedArticles} />
    </>
  );
}
