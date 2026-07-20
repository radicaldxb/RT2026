"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { robotoSlab, serif } from "@/lib/fonts";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import SoftBackground from "@/components/SoftBackground";
import {
  FORMULA_ADVISORY_LINE,
  FORMULA_EQUATION,
  FORMULA_EXPANDED,
  FORMULA_ROWS,
} from "@/lib/formula";

const E = [0.16, 1, 0.3, 1];
const VP = { once: false, margin: "0px 0px -100px 0px" };

const KEY_FACTS = [
  { label: "Founded", value: "2009, Dubai, UAE" },
  { label: "Founder", value: "Stephan van Wijk" },
  { label: "Formula", value: FORMULA_EQUATION },
  { label: "Location", value: "Dubai, United Arab Emirates" },
  {
    label: "Selected clients",
    value:
      "Microsoft, HP, Lenovo, UAE Ministry of Finance, UAE Ministry of Economy, Netherlands Government, 1001 Inventions, Payment Partners, AI Networks, and others.",
  },
  {
    label: "Services",
    value: "AI advisory, implementation, and delivery.",
    href: "/services",
    linkLabel: "See services page for detail.",
  },
  {
    label: "Commercial licence",
    value:
      "DET Commercial Licence 714580 (Radical Thinking Web Design L.L.C), licensed since 2014.",
  },
  { label: "Website", value: "radical-thinking.net", href: "https://radical-thinking.net" },
];

export default function About() {
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
              About
            </span>
            <h1
              className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-tight leading-[1.1] text-black text-balance"
              style={serif}
            >
              Radical Thinking
            </h1>
            <p className="text-base text-gray-600 leading-relaxed mt-4 max-w-[560px]">
              An AI advisory based in Dubai. 20+ years of enterprise experience, turning AI experiments into results.
            </p>
          </motion.header>

          <motion.div
            className="mt-8 md:mt-10 mb-10 md:mb-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: E }}
            viewport={VP}
          >
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-4">
              Our story
            </p>
            <div className="space-y-4 text-base text-gray-600 leading-relaxed">
              <p>
                Radical Thinking did not start in 2009. It started in 2005, when a university intern walked into Microsoft&apos;s Dubai office and made himself impossible to forget. Four years later, freshly graduated and newly arrived in a city still shaking off the 2008 crash, that network opened the first doors. Microsoft, HP, Lenovo. Not bad for someone who had never had a proper job.
              </p>
              <p>
                The crash that wiped out agencies became the launch platform. No overhead, no bloat, just sharp thinking and fast execution. For over a decade the agency punched above its weight, always at the front of the technology curve, building for some of the biggest tech brands in the region.
              </p>
              <p>
                Then AI arrived. And it changed everything. Not the tools, the questions. Radical Thinking runs on a different principle now. Senior thinking, delivered with AI where AI belongs, and human judgment where it matters. Lean by design. Focused by choice. Built to solve the kind of problems that don&apos;t have off-the-shelf answers.
              </p>
            </div>
          </motion.div>

          <motion.section
            className="mb-10 md:mb-12"
            aria-labelledby="founder-heading"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: E }}
            viewport={VP}
          >
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-4">
              Founder
            </p>
            <div className="rounded-2xl border border-[#e8e4dc]/90 bg-white p-6 md:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <div className="flex flex-col sm:flex-row gap-6 md:gap-8">
                <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden border border-[#e8e4dc]/90 flex-shrink-0 bg-[#f4f2ed]">
                  <Image
                    src="/Images/Stephanvanwijk.webp"
                    alt="Stephan van Wijk, founder of Radical Thinking"
                    fill
                    sizes="128px"
                    className="object-cover object-center"
                    priority
                  />
                </div>
                <div className="min-w-0">
                  <h2
                    id="founder-heading"
                    className="text-[clamp(1.35rem,2.5vw,1.75rem)] font-bold text-black leading-snug mb-1"
                    style={serif}
                  >
                    Stephan van Wijk
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    Founder and principal of Radical Thinking. Twenty years of digital and AI experience across the Middle East, delivered for governments, ministries, and enterprise clients across the region.
                  </p>
                  <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                    <p>
                      Career highlights include work on the E-Dirham programme with the UAE Ministry of Finance, the EnergyAI programme, and most recently as Associate Director of Digital Engagement at EPAM. Along the way, projects with Microsoft, HP, Lenovo, 1001 Inventions, the Netherlands Government, the UAE Ministry of Economy, and others.
                    </p>
                    <p>
                      Radical Thinking was founded in 2009 as the vehicle for delivering senior digital and AI work independently. It now focuses on advisory, implementation, and delivery for organisations turning AI experiments into commercial outcomes.
                    </p>
                    <p className="text-black font-medium">
                      Based in Dubai. Working globally.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            className="mb-10 md:mb-12"
            aria-labelledby="formula-heading"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: E }}
            viewport={VP}
          >
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-2">
              The formula
            </p>
            <h2
              id="formula-heading"
              className="text-[clamp(1.35rem,2.5vw,1.75rem)] font-bold text-black leading-snug mb-3"
              style={serif}
            >
              {FORMULA_EQUATION}
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-2 max-w-2xl">
              {FORMULA_EXPANDED}
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mb-6 max-w-2xl">
              {FORMULA_ADVISORY_LINE}
            </p>
            <div className="rounded-2xl border border-[#e8e4dc]/90 bg-white p-6 md:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {FORMULA_ROWS.map((row) => (
                  <div key={row.num}>
                    <p
                      className="text-[1.75rem] font-bold leading-none mb-2"
                      style={{ ...serif, color: row.color }}
                    >
                      {row.num}
                    </p>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#8a8780] mb-1">
                      {row.eyebrow}
                    </p>
                    <h3 className="text-sm font-semibold text-black mb-2 tracking-tight" style={serif}>
                      {row.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{row.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-10 md:mb-12">
            <motion.div
              className="rounded-2xl border border-[#e8e4dc]/90 bg-white p-6 md:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: E }}
              viewport={VP}
            >
              <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-3">
                Mission
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                To help organisations turn AI capability into commercial outcomes. We find where AI creates real value, build around it, and deliver systems and strategies that work in the real world.
              </p>
            </motion.div>
            <motion.div
              className="rounded-2xl border border-[#e8e4dc]/90 bg-white p-6 md:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.08, ease: E }}
              viewport={VP}
            >
              <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-3">
                Vision
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Senior thinking, applied with the right tools, should be able to solve problems that used to require whole floors of specialists. Lean does not mean small. It means focused, senior, and directly accountable for the outcome.
              </p>
            </motion.div>
          </div>

          <motion.div
            className="rounded-2xl border border-[#e8e4dc]/90 bg-white p-6 md:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)] mb-10"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: E }}
            viewport={VP}
          >
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-5">
              Key facts
            </p>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {KEY_FACTS.map((fact) => (
                <div
                  key={fact.label}
                  className={
                    fact.label === "Selected clients" || fact.label === "Services"
                      ? "sm:col-span-2"
                      : undefined
                  }
                >
                  <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#8a8780] mb-1">
                    {fact.label}
                  </dt>
                  <dd className="text-sm text-gray-600 leading-relaxed">
                    {fact.label === "Website" ? (
                      <a
                        href={fact.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black font-medium hover:opacity-70 transition-opacity"
                      >
                        {fact.value}
                      </a>
                    ) : fact.label === "Services" ? (
                      <>
                        {fact.value}{" "}
                        <Link
                          href={fact.href}
                          className="text-black font-medium underline underline-offset-2 hover:opacity-70 transition-opacity"
                        >
                          {fact.linkLabel}
                        </Link>
                      </>
                    ) : (
                      fact.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <motion.div
            className="mt-12 md:mt-16 pt-10 border-t border-[#e8e4dc]/90 text-center"
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
              Ready to build something bold?
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-6 max-w-md mx-auto">
              Our agent knows everything about Radical Thinking and is ready to help.
            </p>
            <Link
              href="/chat?ref=about&source=about"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-black text-white rounded-full text-xs font-semibold uppercase tracking-widest hover:opacity-85 transition-opacity"
            >
              Talk to the Agent
            </Link>
          </motion.div>
        </article>
      </div>

      <Footer />

      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <Link
          href="/chat?ref=about&source=about"
          className="flex items-center justify-center w-14 h-14 bg-black text-white rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.18)] hover:opacity-90 transition-opacity"
          aria-label="Talk to Agent"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </Link>
      </div>
    </main>
  );
}
