import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { articles } from "@/app/insights/articles";
import SoftBackground from "@/components/SoftBackground";
import Footer from "@/components/Footer";
import ShareButtons from "@/components/ShareButtons";

export function generateStaticParams() {
  return Array.isArray(articles) ? articles.map((a) => ({ slug: a.slug })) : [];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = Array.isArray(articles) ? articles.find((a) => a.slug === slug) : null;
  if (!article) return { title: "Article Not Found" };

  const baseUrl = "https://radical-thinking.net";
  const imageUrl = article.image && article.image.startsWith("http")
    ? article.image
    : `${baseUrl}${article.image}`;

  return {
    title: `${article.title} | Radical Thinking Insights`,
    description: article.description,
    alternates: {
      canonical: `${baseUrl}/insights/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `${baseUrl}/insights/${article.slug}`,
      siteName: "Radical Thinking",
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
    },
  };
}

export default async function InsightArticlePage({ params }) {
  const { slug } = await params;
  const article = Array.isArray(articles) ? articles.find((a) => a.slug === slug) : null;

  if (!article) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: article.image && article.image.startsWith("http")
      ? article.image
      : article.image ? `https://radical-thinking.net${article.image}` : undefined,
    datePublished: article.publishedDate,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Radical Thinking",
      url: "https://radical-thinking.net",
    },
  };

  const formatDateDDMMYYYY = (iso) => {
    if (!iso) return "";
    const [y, m, d] = String(iso).split("-");
    return d && m && y ? `${d}-${m}-${y}` : iso;
  };

  return (
    <main className="min-h-screen bg-white text-black relative flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="fixed inset-0 z-0 pointer-events-none gradient-background">
        <SoftBackground />
      </div>

      {/* Nav: RT logo top left */}
      <nav className="relative z-20 w-full px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" aria-label="Home">
          <Image
            src="/logos/RT-Logo-New.svg"
            alt="Radical Thinking Logo"
            width={48}
            height={48}
            className="w-12 h-12"
          />
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/insights"
            className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
          >
            ← Back to Insights
          </Link>
          <Link
            href={`/chat?ref=${article.slug}&source=insights`}
            className="hidden md:inline-block text-sm font-medium bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-all hover:scale-105"
          >
            Talk to the Agent
          </Link>
        </div>
      </nav>

      <div className="relative z-10 flex-1 w-full max-w-3xl mx-auto px-6 py-8 md:py-12">
        <article>
          <header className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              {(article.tags || []).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-black/8 text-gray-700 border border-black/10"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight text-balance max-w-2xl">
              {article.title}
            </h1>
            <p className="text-lg text-gray-600 mt-3">{article.description}</p>
            <p className="text-sm text-gray-500 mt-4">
              {article.readTime} · {formatDateDDMMYYYY(article.publishedDate)}
            </p>
          </header>

          {article.image && (
            <figure className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gray-100 mb-10 shadow-lg">
              <Image
                src={article.image}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 896px"
                priority
                unoptimized
              />
            </figure>
          )}

          <div className="rt-article-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {article.content ? String(article.content).trim() : ""}
            </ReactMarkdown>
          </div>

          <ShareButtons title={article.title} slug={article.slug} />
        </article>
      </div>

      <div className="relative z-10 mt-auto">
        <Footer />
      </div>

      {/* Mobile: Talk to the Agent */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <Link
          href={`/chat?ref=${article.slug}&source=insights`}
          className="flex items-center justify-center w-14 h-14 bg-black text-white rounded-full shadow-2xl hover:scale-110 transition-transform"
          aria-label="Talk to the Agent"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </Link>
      </div>
    </main>
  );
}
