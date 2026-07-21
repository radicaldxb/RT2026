"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { robotoSlab, serif } from "@/lib/fonts";
import SoftBackground from "@/components/SoftBackground";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import ShareButtons from "@/components/ShareButtons";
import InsightMarkdownBody from "./InsightMarkdownBody";
import InsightStructuredBody from "./InsightStructuredBody";

const E = [0.16, 1, 0.3, 1];

function formatDateDDMMYYYY(iso) {
  if (!iso) return "";
  const [y, m, d] = String(iso).split("-");
  return d && m && y ? `${d}/${m}/${y}` : iso;
}

export default function InsightArticleLayout({ article, relatedArticles = [] }) {
  const isStructured = Array.isArray(article.sections) && article.sections.length > 0;

  return (
    <main className="relative flex flex-col w-full min-h-screen overflow-x-clip">
      <span className={robotoSlab.className} hidden aria-hidden />

      <div className="fixed inset-0 z-0 pointer-events-none gradient-background">
        <SoftBackground />
      </div>

      <Nav />

      <div className="relative z-10 w-full px-4 py-14 md:py-20 pt-24 md:pt-28">
        <article className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: E }}
          >
            <Link
              href="/insights"
              className="inline-flex items-center text-xs font-semibold uppercase tracking-[0.14em] text-[#8a8780] hover:text-black transition-colors mb-8"
            >
              ← Back to insights
            </Link>

            <header className="mb-8 md:mb-10">
              <span className="block text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-2">
                Insights
              </span>
              <h1
                className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-tight leading-[1.1] text-black text-balance"
                style={serif}
              >
                {article.title}
              </h1>
              <p className="text-base text-gray-600 leading-relaxed mt-4 max-w-[560px]">
                {article.description}
              </p>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#8a8780] mt-4">
                {article.readTime} · {formatDateDDMMYYYY(article.publishedDate)}
                {article.author ? ` · ${article.author}` : ""}
              </p>
              {(article.tags || []).length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-5">
                  {(article.tags || []).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex px-3 py-1 rounded-full text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#8a8780] border border-[#e8e4dc]/90 bg-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </header>
          </motion.div>

          {article.image ? (
            <motion.figure
              className={`relative w-full rounded-2xl overflow-hidden bg-[#f4f2ed] border border-[#e8e4dc]/90 shadow-[0_2px_12px_rgba(0,0,0,0.04)] mb-10 md:mb-12 ${
                article.imageFrame?.maxWidth || ""
              } ${article.imageFrame?.aspect || "aspect-[16/10]"}`}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: E }}
            >
              <Image
                src={article.image}
                alt=""
                fill
                className={`object-cover ${article.imageFrame?.objectPosition || ""}`}
                sizes="(max-width: 768px) 100vw, 768px"
                priority
                unoptimized
              />
            </motion.figure>
          ) : null}

          {isStructured ? (
            <InsightStructuredBody
              leadQuote={article.leadQuote}
              intro={article.intro}
              sections={article.sections}
              closing={article.closing}
              serif={serif}
            />
          ) : (
            <InsightMarkdownBody content={article.content} />
          )}

          <ShareButtons title={article.title} slug={article.slug} />

          {Array.isArray(relatedArticles) && relatedArticles.length > 0 ? (
            <motion.section
              className="mt-12 md:mt-16 pt-10 border-t border-[#e8e4dc]/90"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: E }}
              viewport={{ once: false, margin: "0px 0px -100px 0px" }}
            >
              <div className="flex items-end justify-between gap-4 mb-6">
                <div>
                  <span className="block text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-2">
                    Keep reading
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight text-black" style={serif}>
                    Read other articles
                  </h2>
                </div>
                <Link
                  href="/insights"
                  className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8a8780] hover:text-black transition-colors"
                >
                  All insights →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                {relatedArticles.slice(0, 4).map((item, i) => (
                  <motion.div
                    key={item.slug}
                    initial={{ opacity: 0, y: 26 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.75, delay: i * 0.06, ease: E }}
                    viewport={{ once: false, margin: "0px 0px -90px 0px" }}
                  >
                    <Link
                      href={`/insights/${item.slug}`}
                      className="block bg-white rounded-2xl overflow-hidden border border-[#e8e4dc]/90 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_18px_44px_rgba(0,0,0,0.1)] transition-shadow duration-300 h-full"
                    >
                      {item.image ? (
                        <div className="relative w-full overflow-hidden aspect-[16/9] bg-[#f4f2ed]">
                          <Image
                            src={item.image}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, 50vw"
                            unoptimized
                          />
                        </div>
                      ) : null}
                      <div className="p-5">
                        {(item.tags || []).length > 0 ? (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {(item.tags || []).slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex px-3 py-1 rounded-full text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#8a8780] border border-[#e8e4dc]/90 bg-white"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        ) : null}
                        <h3 className="text-base md:text-lg font-bold text-black mb-1.5 leading-snug tracking-tight" style={serif}>
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{item.description}</p>
                        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#8a8780] mt-4">
                          {item.readTime}
                          {item.publishedDate ? ` · ${formatDateDDMMYYYY(item.publishedDate)}` : ""}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ) : null}

          <motion.div
            className="mt-12 md:mt-16 pt-10 border-t border-[#e8e4dc]/90 text-center"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: E }}
            viewport={{ once: false, margin: "0px 0px -100px 0px" }}
          >
            <span className="block text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-3">
              Start a conversation
            </span>
            <h2
              className="text-[clamp(1.35rem,2.5vw,1.75rem)] font-bold text-black leading-snug mb-3"
              style={serif}
            >
              {article.ctaTitle || "Want to apply this to your business?"}
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-6 max-w-md mx-auto">
              {article.ctaBody || "Our agent has read this article and can connect it to your situation."}
            </p>
            <Link
              href={`/chat?ref=${article.slug}&source=insights`}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-black text-white rounded-full text-xs font-semibold uppercase tracking-widest hover:opacity-85 transition-opacity"
            >
              Start a conversation
            </Link>
          </motion.div>
        </article>
      </div>

      <Footer />

      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <Link
          href={`/chat?ref=${article.slug}&source=insights`}
          className="flex items-center justify-center w-14 h-14 bg-black text-white rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.18)] hover:opacity-90 transition-opacity"
          aria-label="Start a conversation"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </Link>
      </div>
    </main>
  );
}
