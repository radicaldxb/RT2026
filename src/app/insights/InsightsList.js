"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import SoftBackground from "@/components/SoftBackground";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

function formatDateDDMMYYYY(iso) {
  if (!iso) return "";
  const [y, m, d] = String(iso).split("-");
  return d && m && y ? `${d}/${m}/${y}` : iso;
}

export default function InsightsList({ articles = [] }) {
  const sortedArticles = [...(articles || [])].sort((a, b) => {
    const aDate = a?.publishedDate ? String(a.publishedDate) : "";
    const bDate = b?.publishedDate ? String(b.publishedDate) : "";
    // Newest first (publishedDate is stored as YYYY-MM-DD)
    return bDate.localeCompare(aDate);
  });

  return (
    <main className="min-h-screen bg-white text-black relative flex flex-col">
      <div className="fixed inset-0 z-0 pointer-events-none gradient-background">
        <SoftBackground />
      </div>

      <Nav />

      {/* Content: same max-w-3xl and padding as article page */}
      <div className="relative z-10 flex-1 w-full max-w-3xl mx-auto px-6 pt-20 md:pt-24 pb-8 md:pb-12">
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight text-balance max-w-2xl">
            RADICAL INSIGHTS
          </h1>
          <p className="text-lg text-gray-600 mt-3">
            AI, technology, and strategy from Radical Thinking.
          </p>
        </header>

        <ul className="space-y-10">
          {sortedArticles.map((article) => (
            <li key={article?.slug || article?.title}>
              <Link
                href={`/insights/${article?.slug ?? ""}`}
                className="group block rounded-2xl overflow-hidden transition-all shadow-sm hover:shadow-md border border-gray-200 hover:border-gray-300 bg-white/60 hover:bg-white/90 backdrop-blur-sm"
              >
                {/* Image: same aspect and style as article page hero */}
                {article?.image && (
                  <figure className="relative w-full aspect-video overflow-hidden bg-gray-100">
                    <Image
                      src={article.image}
                      alt=""
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 896px"
                      unoptimized
                    />
                  </figure>
                )}
                {/* Text: same spacing and typography as article header */}
                <div className="p-6 md:p-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(article?.tags || []).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-black/8 text-gray-700 border border-black/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight leading-tight text-balance max-w-2xl text-black group-hover:text-gray-800 transition-colors">
                    {article?.title}
                  </h2>
                  <p className="text-gray-600 mt-2 line-clamp-2 text-lg">
                    {article?.description}
                  </p>
                  <p className="text-sm text-gray-500 mt-4">
                    {formatDateDDMMYYYY(article?.publishedDate)}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative z-10 mt-auto">
        <Footer />
      </div>
    </main>
  );
}
