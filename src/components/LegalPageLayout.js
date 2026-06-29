"use client";

import { motion } from "framer-motion";
import { robotoSlab, serif } from "@/lib/fonts";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SoftBackground from "@/components/SoftBackground";

const E = [0.16, 1, 0.3, 1];

export default function LegalPageLayout({ eyebrow, title, date, children }) {
  return (
    <main className="relative flex flex-col w-full min-h-screen overflow-x-clip">
      <span className={robotoSlab.className} hidden aria-hidden />

      <div className="fixed inset-0 z-0 pointer-events-none gradient-background">
        <SoftBackground />
      </div>

      <Nav />

      <div className="relative z-10 w-full px-4 py-14 md:py-20 pt-24 md:pt-28">
        <article className="max-w-3xl mx-auto">
          <motion.header
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: E }}
          >
            <span className="block text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-2">
              {eyebrow}
            </span>
            <h1
              className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-tight leading-[1.1] text-black text-balance"
              style={serif}
            >
              {title}
            </h1>
            {date ? (
              <p className="text-sm text-[#8a8780] mt-3 tracking-wide">{date}</p>
            ) : null}
          </motion.header>

          <motion.div
            className="rt-article-body mt-8 md:mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.08, ease: E }}
          >
            {children}
          </motion.div>
        </article>
      </div>

      <Footer />
    </main>
  );
}
