"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { robotoSlab, serif } from "@/lib/fonts";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import SoftBackground from "@/components/SoftBackground";
import {
  entityFacts,
  formulaRows,
  intelligenceFaqs,
  intelligenceSections,
  products,
  projectHistory,
  services,
  techStackFacts,
} from "./intelligenceContent";
import {
  FORMULA_ADVISORY_LINE,
  FORMULA_EQUATION,
  FORMULA_EXPANDED,
} from "@/lib/formula";

const E = [0.16, 1, 0.3, 1];
const VP = { once: false, margin: "0px 0px -100px 0px" };

function FactGrid({ facts }) {
  return (
    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
      {facts.map((fact) => (
        <div key={fact.label}>
          <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#8a8780] mb-1">
            {fact.label}
          </dt>
          <dd className="text-sm text-gray-600 leading-relaxed">
            {fact.href ? (
              <a
                href={fact.href}
                target={fact.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={fact.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
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
  );
}

function ContentCard({ eyebrow, title, children, delay = 0 }) {
  return (
    <motion.div
      className="rounded-2xl border border-[#e8e4dc]/90 bg-white p-6 md:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, delay, ease: E }}
      viewport={VP}
    >
      {eyebrow ? (
        <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-3">{eyebrow}</p>
      ) : null}
      {title ? (
        <h2 className="text-base md:text-lg font-semibold text-black mb-4 tracking-tight" style={serif}>
          {title}
        </h2>
      ) : null}
      {children}
    </motion.div>
  );
}

function StoryRow({ row, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -48 : 48 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.85, delay: index * 0.06, ease: E }}
      viewport={{ once: false, margin: "0px 0px -80px 0px" }}
      className={`grid grid-cols-[52px_1fr] md:grid-cols-[72px_1fr] gap-x-4 md:gap-x-6 py-8 md:py-10${index > 0 ? " border-t border-[#e8e4dc]/90" : ""}`}
    >
      <p
        className={`font-bold leading-none ${
          String(row.num).length > 2
            ? "text-[1.15rem] md:text-[1.35rem] tracking-tight"
            : "text-[1.75rem] md:text-[2.25rem]"
        }`}
        style={{ ...serif, color: row.color }}
      >
        {row.num}
      </p>
      <div className="pt-0.5 md:pt-1">
        <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-2">{row.eyebrow}</p>
        <h3 className="text-base md:text-lg font-semibold text-black mb-2 tracking-tight" style={serif}>
          {row.title}
        </h3>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">{row.body}</p>
      </div>
    </motion.div>
  );
}

function FaqItem({ faq, index, open, onToggle }) {
  const isOpen = open === index;

  return (
    <div className="border border-[#e8e4dc]/90 rounded-2xl overflow-hidden bg-white">
      <button
        type="button"
        onClick={() => onToggle(isOpen ? null : index)}
        className="w-full text-left px-5 md:px-6 py-4 flex justify-between items-start gap-4 hover:bg-[#fafaf8] transition-colors"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-semibold text-black leading-snug">{faq.q}</span>
        <span className="text-[#8a8780] flex-shrink-0 text-lg leading-none pt-0.5" aria-hidden>
          {isOpen ? "−" : "+"}
        </span>
      </button>
      {isOpen ? (
        <div className="px-5 md:px-6 pb-4 border-t border-[#e8e4dc]/90">
          <p className="text-sm text-gray-600 leading-relaxed pt-4">{faq.a}</p>
        </div>
      ) : null}
    </div>
  );
}

export default function Intelligence() {
  const [openFaq, setOpenFaq] = useState(null);

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
              Intelligence
            </span>
            <h1
              className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-tight leading-[1.1] text-black text-balance"
              style={serif}
            >
              Intelligence brief
            </h1>
            <p className="text-base text-gray-600 leading-relaxed mt-4 max-w-[560px]">
              Structured knowledge about Radical Thinking. A partner for organisations working on bold
              ideas. For humans and AI systems alike.
            </p>
          </motion.header>

          <div className="mt-10 md:mt-12 space-y-6 md:space-y-8">
            <ContentCard eyebrow="Entity">
              <FactGrid facts={entityFacts} />
            </ContentCard>

            <ContentCard eyebrow="The formula" title={FORMULA_EQUATION} delay={0.04}>
              <p className="text-sm text-gray-600 leading-relaxed mb-2">
                {FORMULA_EXPANDED}
              </p>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {FORMULA_ADVISORY_LINE}
              </p>
              <div>
                {formulaRows.map((row, index) => (
                  <StoryRow key={row.num} row={row} index={index} />
                ))}
              </div>
            </ContentCard>

            <ContentCard eyebrow="Technology stack" delay={0.08}>
              <FactGrid facts={techStackFacts} />
            </ContentCard>

            <ContentCard eyebrow="Services" delay={0.1}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {services.map((service) => (
                  <div key={service.title}>
                    <h3 className="text-sm font-semibold text-black mb-2" style={serif}>
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{service.body}</p>
                  </div>
                ))}
              </div>
            </ContentCard>

            <ContentCard eyebrow="Explorations and R&D" delay={0.12}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {products.map((product) => (
                  <div key={product.title}>
                    <h3 className="text-sm font-semibold text-black mb-2" style={serif}>
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{product.body}</p>
                  </div>
                ))}
              </div>
            </ContentCard>

            <ContentCard eyebrow="Project history" delay={0.14}>
              <div>
                {projectHistory.map((row, index) => (
                  <StoryRow key={row.eyebrow} row={row} index={index} />
                ))}
              </div>
            </ContentCard>

            {intelligenceSections.map((section, sectionIndex) => (
              <ContentCard
                key={section.title}
                eyebrow={section.title}
                delay={0.16 + sectionIndex * 0.04}
              >
                <dl className="space-y-4">
                  {section.items.map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#8a8780] mb-1">
                        {label}
                      </dt>
                      <dd className="text-sm text-gray-600 leading-relaxed">
                        {value.startsWith("http") || value.startsWith("/") ? (
                          <a
                            href={value.startsWith("/") ? value : value}
                            className="text-black font-medium hover:opacity-70 transition-opacity"
                            {...(value.startsWith("http")
                              ? { target: "_blank", rel: "noopener noreferrer" }
                              : {})}
                          >
                            {value}
                          </a>
                        ) : (
                          value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </ContentCard>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: E }}
              viewport={VP}
            >
              <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-4">
                Frequently asked questions
              </p>
              <div className="space-y-3">
                {intelligenceFaqs.map((faq, index) => (
                  <FaqItem
                    key={faq.q}
                    faq={faq}
                    index={index}
                    open={openFaq}
                    onToggle={setOpenFaq}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div
              className="mt-12 md:mt-16 pt-10 border-t border-[#e8e4dc]/90 text-center"
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
                Have a question the brief did not answer?
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-6 max-w-md mx-auto">
                The agent has full access to everything Radical Thinking knows. Ask it anything.
              </p>
              <Link
                href="/chat?ref=intelligence&source=intelligence"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-black text-white rounded-full text-xs font-semibold uppercase tracking-widest hover:opacity-85 transition-opacity"
              >
                Start a conversation
              </Link>
            </motion.div>
          </div>
        </article>
      </div>

      <Footer />

      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <Link
          href="/chat?ref=intelligence&source=intelligence"
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
