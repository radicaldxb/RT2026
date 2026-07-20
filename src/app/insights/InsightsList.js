"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { robotoSlab, serif } from "@/lib/fonts";
import SoftBackground from "@/components/SoftBackground";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

const E = [0.16, 1, 0.3, 1];
const VP = { once: false, margin: "0px 0px -100px 0px" };

function formatDateDDMMYYYY(iso) {
  if (!iso) return "";
  const [y, m, d] = String(iso).split("-");
  return d && m && y ? `${d}/${m}/${y}` : iso;
}

export default function InsightsList({ articles = [] }) {
  const sortedArticles = [...(articles || [])].sort((a, b) => {
    const aDate = a?.publishedDate ? String(a.publishedDate) : "";
    const bDate = b?.publishedDate ? String(b.publishedDate) : "";
    return bDate.localeCompare(aDate);
  });

  return (
    <main className="relative flex flex-col w-full min-h-screen overflow-x-clip">
      <span className={robotoSlab.className} hidden aria-hidden />

      <div className="fixed inset-0 z-0 pointer-events-none gradient-background">
        <SoftBackground />
      </div>

      <Nav />

      <div className="relative z-10 w-full px-4 py-14 md:py-20 pt-24 md:pt-28">
        <div className="max-w-6xl mx-auto">
          <motion.header
            className="mb-8 md:mb-10 text-center md:text-left"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: E }}
          >
            <span className="block text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-2">
              Insights
            </span>
            <h1
              className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold text-black tracking-tight leading-[1.1]"
              style={serif}
            >
              Radical Insights
            </h1>
            <p className="text-base text-gray-600 leading-relaxed mt-3 max-w-[560px] mx-auto md:mx-0">
              AI, technology, and strategy from Radical Thinking.
            </p>
          </motion.header>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 list-none p-0 m-0">
            {sortedArticles.map((article, i) => (
              <motion.li
                key={article?.slug || article?.title}
                initial={{ opacity: 0, y: 40 + (i % 2) * 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: (i % 2) * 0.08, ease: E }}
                viewport={VP}
              >
                <Link
                  href={`/insights/${article?.slug ?? ""}`}
                  className="block bg-white rounded-2xl overflow-hidden border border-[#e8e4dc]/90 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_18px_44px_rgba(0,0,0,0.1)] transition-shadow duration-300 h-full"
                >
                  {article?.image ? (
                    <div className="relative w-full overflow-hidden aspect-[16/9] bg-[#f4f2ed]">
                      <Image
                        src={article.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        unoptimized
                      />
                    </div>
                  ) : null}
                  <div className="p-5">
                    {(article?.tags || []).length > 0 ? (
                      <div className="flex flex-wrap gap-2 mb-3">
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
                    <h2
                      className="text-lg font-bold text-black mb-1.5 leading-snug tracking-tight"
                      style={serif}
                    >
                      {article?.title}
                    </h2>
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                      {article?.description}
                    </p>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#8a8780] mt-4">
                      {article?.readTime}
                      {article?.publishedDate ? ` · ${formatDateDDMMYYYY(article.publishedDate)}` : ""}
                    </p>
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>

          <motion.div
            className="mt-12 md:mt-16 max-w-lg mx-auto text-center"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: E }}
            viewport={VP}
          >
            <span className="block text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-3">
              Start a conversation
            </span>
            <h2
              className="text-[clamp(1.35rem,2.5vw,1.75rem)] font-bold text-black leading-snug mb-3"
              style={serif}
            >
              Want to go deeper on any of this?
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              Our agent can connect what you have read here to your business, your stack, and your next move.
            </p>
            <Link
              href="/chat?ref=insights&source=insights"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-black text-white rounded-full text-xs font-semibold uppercase tracking-widest hover:opacity-85 transition-opacity"
            >
              Start a conversation
            </Link>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
