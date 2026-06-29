"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { robotoSlab, serif } from "@/lib/fonts";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import SoftBackground from "@/components/SoftBackground";
import { portfolio } from "./projects";

const E = [0.16, 1, 0.3, 1];
const VP = { once: false, margin: "0px 0px -100px 0px" };

function projectHref(item) {
  if (item.link && item.link !== "#") return item.link;
  if (item.slug) return `/work/${item.slug}`;
  return "/work";
}

/** All first, then balanced split for two centered rows. */
function splitTagsIntoRows(tags) {
  const ordered = tags[0] === "All" ? [...tags] : ["All", ...tags];
  const rest = ordered.slice(1);
  const rowOneCount = Math.ceil(ordered.length / 2);
  const rowOne = ["All", ...rest.slice(0, rowOneCount - 1)];
  const rowTwo = rest.slice(rowOneCount - 1);
  return rowTwo.length > 0 ? [rowOne, rowTwo] : [rowOne];
}

function TagButton({ tag, active, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(tag)}
      className={`px-4 py-2 rounded-full text-[0.65rem] font-semibold uppercase tracking-[0.12em] transition-opacity whitespace-nowrap ${
        active
          ? "bg-black text-white"
          : "bg-white text-[#8a8780] border border-[#e8e4dc]/90 hover:text-black"
      }`}
    >
      {tag}
    </button>
  );
}

export default function Work() {
  const [activeTag, setActiveTag] = useState("All");

  const allTags = ["All", ...new Set(portfolio.flatMap((item) => item.tags))].sort((a, b) => {
    if (a === "All") return -1;
    if (b === "All") return 1;
    return a.localeCompare(b);
  });
  const tagRows = splitTagsIntoRows(allTags);
  const filtered =
    activeTag === "All" ? portfolio : portfolio.filter((item) => item.tags.includes(activeTag));

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
              Proof of formula
            </span>
            <h1
              className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold text-black tracking-tight leading-[1.1]"
              style={serif}
            >
              Work
            </h1>
            <p className="text-base text-gray-600 leading-relaxed mt-3 max-w-[560px] mx-auto md:mx-0">
              Bold ideas we built ourselves, and what we build for clients. AI-native products, platforms, and experiences.
            </p>
          </motion.header>

          <motion.div
            className="flex flex-col items-center gap-3 mb-8 md:mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: E }}
          >
            {tagRows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="flex flex-wrap justify-center gap-2 w-full max-w-3xl mx-auto"
              >
                {row.map((tag) => (
                  <TagButton
                    key={tag}
                    tag={tag}
                    active={activeTag === tag}
                    onSelect={setActiveTag}
                  />
                ))}
              </div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item, i) => (
              <motion.div
                key={item.slug || item.title}
                initial={{ opacity: 0, y: 40 + (i % 3) * 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease: E }}
                viewport={VP}
              >
                <Link
                  href={projectHref(item)}
                  target={item.link?.startsWith("http") ? "_blank" : undefined}
                  rel={item.link?.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="block bg-white rounded-2xl overflow-hidden border border-[#e8e4dc]/90 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_18px_44px_rgba(0,0,0,0.1)] transition-shadow duration-300 h-full"
                >
                  {item.image ? (
                    <div className="relative w-full overflow-hidden aspect-[16/9] bg-[#f4f2ed]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  ) : null}
                  <div className="p-5">
                    <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#8a8780] mb-1.5">
                      {item.category}
                    </span>
                    <h2
                      className="text-lg font-bold text-black mb-1.5 leading-snug tracking-tight"
                      style={serif}
                    >
                      {item.title}
                    </h2>
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">{item.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 md:mt-16 max-w-lg mx-auto text-center"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: E }}
            viewport={VP}
          >
            <span className="block text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-3">
              Talk to Us
            </span>
            <h2
              className="text-[clamp(1.35rem,2.5vw,1.75rem)] font-bold text-black leading-snug mb-3"
              style={serif}
            >
              Want the full story on any project?
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              Our agent has access to every case study: architecture, outcomes, and what we would do differently.
            </p>
            <Link
              href="/chat?ref=work&source=portfolio"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-black text-white rounded-full text-xs font-semibold uppercase tracking-widest hover:opacity-85 transition-opacity"
            >
              Talk to the Agent
            </Link>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
