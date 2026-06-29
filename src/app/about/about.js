"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { robotoSlab, serif } from "@/lib/fonts";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import SoftBackground from "@/components/SoftBackground";

const E = [0.16, 1, 0.3, 1];
const VP = { once: false, margin: "0px 0px -100px 0px" };

const FORMULA_ROWS = [
  {
    num: "01",
    color: "#E18949",
    eyebrow: "Creative",
    title: "The idea",
    body: "Bold before buildable. We start with what would actually make a difference, not what is easiest to execute. Every project begins by asking whether the idea is worth building at all.",
  },
  {
    num: "02",
    color: "#1ACDEB",
    eyebrow: "Experience",
    title: "The feeling",
    body: "Not just used. Remembered. We design for the impression that stays after the screen closes, the campaign ends, or the conversation finishes. That feeling is what brings people back.",
  },
  {
    num: "03",
    color: "#6B17DA",
    eyebrow: "Technology",
    title: "The loop",
    body: "This is where AI earns its square. We use it to test, validate, and improve continuously. What is working gets pushed further. What is not gets fixed. The idea gets smarter every cycle.",
  },
];

const KEY_FACTS = [
  { label: "Founded", value: "2009, Dubai, UAE" },
  { label: "Founder", value: "Stephan van Wijk" },
  { label: "Formula", value: "BI = C + Ex × T²" },
  { label: "Location", value: "Dubai, United Arab Emirates" },
  {
    label: "Clients",
    value:
      "1001 Inventions, Microsoft, The Netherlands Government, Lenovo, Ministry of Finance of the UAE, Ministry of Economy of the UAE, Simon Snelder, Payment Partners, AI Networks, HP, and more.",
  },
  {
    label: "Products",
    value: "FluffyFriends, KahuLife, Animal Intelligence, Webinarlife",
  },
  {
    label: "Services",
    value: "AI solutions, web platforms, automations, strategy, branding, and digital.",
  },
  {
    label: "License",
    value: "DET Commercial License 714580 (Radical Thinking Web Design L.L.C), licensed since 2014",
  },
  { label: "Website", value: "radical-thinking.net" },
];

function StoryRow({ row, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -48 : 48 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.85, delay: index * 0.08, ease: E }}
      viewport={{ once: false, margin: "0px 0px -80px 0px" }}
      className={`grid grid-cols-[52px_1fr] md:grid-cols-[72px_1fr] gap-x-4 md:gap-x-6 py-8 md:py-10${index > 0 ? " border-t border-[#e8e4dc]/90" : ""}`}
    >
      <p className="text-[2.25rem] md:text-[2.75rem] font-bold leading-none" style={{ ...serif, color: row.color }}>
        {row.num}
      </p>
      <div className="pt-0.5 md:pt-1">
        <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-2">
          {row.eyebrow}
        </p>
        <h3 className="text-base md:text-lg font-semibold text-black mb-2 tracking-tight" style={serif}>
          {row.title}
        </h3>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">{row.body}</p>
      </div>
    </motion.div>
  );
}

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
              An AI-native agency based in Dubai. Built different by design.
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
                Then AI arrived. And it changed the question. Not &ldquo;how do we keep up?&rdquo; but &ldquo;what does an agency look like when the tools finally match the ambition?&rdquo; Radical Thinking is the answer to that question. Lean by design. AI-native by conviction. Built to deliver what used to take a floor full of people, without the floor.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="mb-10 md:mb-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: E }}
            viewport={VP}
          >
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-2">
              How we think
            </p>
            <h2
              className="text-[clamp(1.35rem,2.5vw,1.75rem)] font-bold text-black leading-snug mb-6"
              style={serif}
            >
              BI = C + Ex × T²
            </h2>
            {FORMULA_ROWS.map((row, index) => (
              <StoryRow key={row.num} row={row} index={index} />
            ))}
          </motion.div>

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
                To help businesses stop fearing AI and start leading with it. We find where AI creates real value, build around it, and deliver products and experiences that work in the real world.
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
                Bold ideas should not be limited by team size or budget. One sharp mind with the right tools should be able to build what used to take twenty people. That is not the future. That is now.
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
                <div key={fact.label}>
                  <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#8a8780] mb-1">
                    {fact.label}
                  </dt>
                  <dd className="text-sm text-gray-600 leading-relaxed">
                    {fact.label === "Website" ? (
                      <a
                        href="https://radical-thinking.net"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black font-medium hover:opacity-70 transition-opacity"
                      >
                        {fact.value}
                      </a>
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
