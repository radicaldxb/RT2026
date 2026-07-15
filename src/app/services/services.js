/* eslint-disable react/no-unescaped-entities */
"use client";

import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import SoftBackground from "@/components/SoftBackground";
import { motion } from "framer-motion";
import Link from "next/link";
import Script from "next/script";
import { robotoSlab, serif } from "@/lib/fonts";

const E = [0.16, 1, 0.3, 1];
const VP = { once: false, margin: "0px 0px -100px 0px" };

const services = [
  {
    title: "AI-Augmented Marketing and Content Systems",
    description:
      "For organisations that need to modernise how marketing operations run. We design and oversee the implementation of AI-augmented systems that preserve brand safety, cultural relevance, and human judgment.",
    workOn: "content pipeline design, tooling selection, workflow integration, governance framework.",
    engage: "end-to-end implementation partnerships, from design through to launch and handover.",
    outcome: "a working system your team can operate, with the guardrails in place.",
  },
  {
    title: "AI Translation and Positioning",
    description:
      "For organisations that have invested in AI but struggle to turn capability into commercial narrative. We help you translate what your AI actually does into language that customers, boards, and markets understand and act on.",
    workOn: "brand narrative, executive messaging, customer communication, sales enablement.",
    engage: "from short focused sprints to embedded ongoing work.",
    outcome: "a coherent story your organisation tells externally, and the materials to tell it.",
  },
  {
    title: "AI Readiness and Roadmap",
    description:
      "For organisations exploring or piloting AI and unsure where to invest next. We assess your current state, identify highest-value opportunities, and produce a sequenced roadmap that fits your operational reality.",
    workOn: "capability audit, opportunity mapping, governance considerations, phased roadmap.",
    engage: "typically a focused assessment, followed by optional implementation support.",
    outcome: "a clear plan you can fund, sequence, and execute.",
  },
];

const capabilities = [
  "AI and automation (agents, LLMs, RAG systems, workflow automation)",
  "Digital platforms (web, mobile, e-commerce, integrations)",
  "Brand and experience design (identity, UI/UX, motion, AI personas)",
  "Content and media (video, podcast, immersive experiences)",
];

const safetyItems = [
  {
    title: "Guardrails",
    body: "We build in checks so AI stays on-brand and on-brief. No surprise outputs, no off-script content.",
    icon: (
      <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Human approval",
    body: "Nothing goes live without a human green light where it matters. You decide what gets published and when.",
    icon: (
      <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    title: "Controlled scale",
    body: "We grow capability step by step so you're never overwhelmed. Start small, prove value, then scale.",
    icon: (
      <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
];

export default function Services() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: services.map((service) => ({
      "@type": "Question",
      name: service.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: `${service.description} What we work on: ${service.workOn} How we engage: ${service.engage} Outcome: ${service.outcome}`,
      },
    })),
  };

  return (
    <main className="relative flex flex-col w-full min-h-screen overflow-x-clip">
      <span className={robotoSlab.className} hidden aria-hidden />

      <Script id="faq-schema" type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </Script>

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
              Services
            </span>
            <h1
              className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold text-black tracking-tight leading-[1.1]"
              style={serif}
            >
              How we work with you
            </h1>
            <p className="text-base text-gray-600 leading-relaxed mt-3 max-w-[560px] mx-auto md:mx-0">
              Three services, focused on turning AI capability into commercial outcomes. Every engagement runs through our formula: BI = C + Ex × T². Pick one, or combine them.
            </p>
          </motion.header>

          <div className="space-y-4 md:space-y-5 mb-10 md:mb-12">
            {services.map((service, index) => (
              <motion.article
                key={service.title}
                className="rounded-2xl border border-[#e8e4dc]/90 bg-white p-6 md:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, ease: E, delay: index * 0.05 }}
                viewport={VP}
              >
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#8a8780] mb-2">
                  Service {index + 1}
                </p>
                <h2
                  className="text-[clamp(1.2rem,2.3vw,1.6rem)] font-bold text-black leading-snug mb-3"
                  style={serif}
                >
                  {service.title}
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed mb-5 max-w-3xl">
                  {service.description}
                </p>
                <dl className="grid grid-cols-1 gap-3 text-sm leading-relaxed max-w-3xl">
                  <div>
                    <dt className="font-semibold text-black inline">What we work on: </dt>
                    <dd className="text-gray-600 inline">{service.workOn}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-black inline">How we engage: </dt>
                    <dd className="text-gray-600 inline">{service.engage}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-black inline">Outcome: </dt>
                    <dd className="text-gray-600 inline">{service.outcome}</dd>
                  </div>
                </dl>
              </motion.article>
            ))}
          </div>

          <motion.div
            className="rounded-2xl border border-[#e8e4dc]/90 bg-white p-6 md:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)] mb-10 md:mb-12"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: E }}
            viewport={VP}
          >
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-2 text-center md:text-left">
              Safety
            </p>
            <h2
              className="text-[clamp(1.35rem,2.5vw,1.75rem)] font-bold text-black leading-snug mb-3 text-center md:text-left"
              style={serif}
            >
              How we keep AI safe and sane
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto md:mx-0 text-center md:text-left">
              We don't hand you a black box. We build in guardrails, human approval, and controlled scale so you stay in control and your brand stays safe.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {safetyItems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[#e8e4dc]/90 bg-[#fafaf8] p-5 md:p-6"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#e8e4dc]/90 flex items-center justify-center mb-4" aria-hidden>
                    {item.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-black mb-2 tracking-tight" style={serif}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="rounded-2xl border border-[#e8e4dc]/90 bg-white p-6 md:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: E }}
            viewport={VP}
          >
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-2">
              Capabilities
            </p>
            <h2 className="text-[clamp(1.2rem,2.3vw,1.6rem)] font-bold text-black leading-snug mb-3" style={serif}>
              Capabilities we bring to delivery
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-6 max-w-2xl">
              Depending on the engagement, we mobilise the following through Radical Thinking and our network of specialists:
            </p>
            <ul className="space-y-3">
              {capabilities.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
                  <span className="mt-2 w-1.5 h-1.5 bg-black rounded-full flex-shrink-0" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

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
              Not sure which service fits?
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              Tell us what problem you're trying to solve.
            </p>
            <Link
              href="/chat?ref=services&source=services"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-black text-white rounded-full text-xs font-semibold uppercase tracking-widest hover:opacity-85 transition-opacity"
            >
              Book an appointment
            </Link>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
