// src/app/playbook/playbook.js
"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SoftBackground from "@/components/SoftBackground";
import Script from "next/script";
import { robotoSlab, serif } from "@/lib/fonts";

const E = [0.16, 1, 0.3, 1];
const VP = { once: true, margin: "0px 0px -80px 0px" };

const steps = [
  {
    num: "1",
    color: "#1ACDEB",
    bg: "rgba(26,205,235,0.08)",
    label: "Step 1: The Inside Look",
    headline: "Find the real problem.",
    body: [
      "Most businesses know something is not working. Fewer know exactly what. The Audit is where we find out.",
      "We spend time inside your operation. We talk to your team, look at your workflows, and map what your business intends to deliver versus what it actually delivers at every touchpoint. We are not looking for a technology fix. We are looking for the gap between your bold idea and your customer's actual experience.",
      "The result is not a report. It is a prioritised action plan built around your specific reality, with a clear recommendation on what to build first and why.",
    ],
    gets: [
      "A reality audit of your business from the inside out",
      "A mapped gap between intention and customer experience",
      "A prioritised action plan with clear next steps",
      "An honest assessment of where AI can and cannot help",
    ],
    time: "Typically 5 to 10 working days",
    cta: "Start with The Inside Look",
  },
  {
    num: "2",
    color: "#E18949",
    bg: "rgba(225,137,73,0.08)",
    label: "Step 2: The Work",
    headline: "Build it properly. Not a pilot.",
    body: [
      "The Audit tells you what to build. The Build does it.",
      "We take the top priority from the Audit and build it to production standard. Not a proof of concept. Not a demo you show at a board meeting and then leave sitting on a server. Something your team uses every day, that your customers interact with, that works reliably and was built to survive the next model update.",
      "The medium depends on the gap. Sometimes it is an AI agent. Sometimes a platform, a content system, or a brand identity. The service category does not matter. The outcome does.",
    ],
    gets: [
      "A production-ready build, not a pilot or proof of concept",
      "Full documentation and handover",
      "Built to survive model updates and technology changes",
      "Team onboarding so it actually gets used",
    ],
    time: "Typically 30 days, fixed price",
    cta: "Talk about The Work",
  },
  {
    num: "3",
    color: "#6B17DA",
    bg: "rgba(107,23,218,0.06)",
    label: "Step 3: The Momentum",
    headline: "Stay ahead. Not catch up.",
    body: [
      "The AI landscape resets every few months. New models, new capabilities, new ways to close gaps you did not know existed. What you built in January needs reviewing by June.",
      "The Retainer is how businesses stay ahead rather than constantly catching up. We become your ongoing AI function. Monthly we review what has changed in the landscape and what that means for your stack. Quarterly we upgrade what needs upgrading. And when something breaks or something new emerges that you should know about, you have direct access.",
      "This is not a maintenance contract. It is a continuous commitment to making sure your technology keeps amplifying the right things as your business evolves.",
    ],
    gets: [
      "Monthly AI landscape review and relevance check",
      "Quarterly stack upgrades and improvements",
      "Direct access when something changes or breaks",
      "Proactive recommendations, not reactive fixes",
    ],
    time: "Monthly, cancel anytime",
    cta: "Ask about The Momentum",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the Radical Thinking Playbook?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Radical Thinking Playbook is a three-step process for AI implementation: The Inside Look maps the gap between your business intention and customer reality, The Work creates a production-ready solution to close the most important gap, and The Momentum keeps your AI operation current as the technology evolves.",
      },
    },
    {
      "@type": "Question",
      name: "How long does The Inside Look take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Inside Look typically takes 5 to 10 working days. It ends with a prioritised action plan built around your specific reality and a clear recommendation on what to build first.",
      },
    },
    {
      "@type": "Question",
      name: "How long does The Work take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Work is typically 30 days at a fixed price. It delivers a production-ready system your team uses every day, fully documented and built to survive technology changes.",
      },
    },
    {
      "@type": "Question",
      name: "What does The Momentum include?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Momentum includes a monthly AI landscape review, quarterly stack upgrades, and direct access when something changes or breaks. It is a monthly commitment with no long-term contract required.",
      },
    },
    {
      "@type": "Question",
      name: "Do I have to start with The Inside Look?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Inside Look is the recommended starting point because it ensures The Work solves the right problem. However, if you already have a clear diagnosis, we can discuss starting directly with The Work. Talk to the agent to explore what makes sense for your situation.",
      },
    },
    {
      "@type": "Question",
      name: "How does Radical Thinking price its work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Radical Thinking does not publish fixed prices because every engagement is different. The Inside Look and The Work are fixed-price engagements sized to the specific scope. Talk to the agent to get a sense of what your situation would involve.",
      },
    },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "The Radical Thinking Playbook",
  provider: {
    "@type": "Organization",
    name: "Radical Thinking",
    url: "https://radical-thinking.net",
  },
  description:
    "A three-step AI implementation process: Audit, Build, and Retainer. Designed to find the real problem, build something that lasts, and keep it current as AI evolves.",
  serviceType: "AI Implementation Consulting",
  areaServed: {
    "@type": "Place",
    name: "Global",
  },
  url: "https://radical-thinking.net/playbook",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Playbook Steps",
    itemListElement: [
      {
        "@type": "Offer",
        name: "The Audit",
        description:
          "A reality audit mapping the gap between your business intention and customer experience. Delivers a prioritised action plan.",
      },
      {
        "@type": "Offer",
        name: "The Build",
        description:
          "Production-ready AI implementation. Not a pilot. Something that works every day.",
      },
      {
        "@type": "Offer",
        name: "The Retainer",
        description:
          "Ongoing AI capability management. Monthly reviews, quarterly upgrades, direct access.",
      },
    ],
  },
};

export default function PlaybookClient() {
  return (
    <section className="relative w-full min-h-screen flex flex-col overflow-x-hidden">
      <span className={robotoSlab.className} hidden aria-hidden />
      <Script id="faq-schema" type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </Script>
      <Script id="service-schema" type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </Script>

      <div className="fixed inset-0 z-0 pointer-events-none gradient-background">
        <SoftBackground />
      </div>

      <Nav />

      <div className="relative z-10 flex-1 w-full max-w-5xl mx-auto px-4 pt-24 md:pt-32 pb-20">

        {/* Page header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: E }}
        >
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-4">
            The Playbook
          </p>
          <h1
            className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-black mb-4"
            style={serif}
          >
            One process.<br />Three steps.<br />No shortcuts.
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
            Whether you are building an AI agent, a digital platform, a brand, or a media system, the process is the same. Because the problem is always the same: intention and reality are out of alignment.
          </p>
        </motion.div>

        {/* The journey line + steps */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div
            className="absolute left-[27px] top-0 bottom-0 w-px hidden md:block"
            style={{ background: "#e8e4dc" }}
          />

          <div className="flex flex-col gap-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: 48 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0, ease: E }}
                viewport={VP}
                className="relative grid pb-16"
                style={{ gridTemplateColumns: "56px 1fr", gap: "1.5rem 2.5rem" }}
              >
                {/* Node */}
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0 relative z-10"
                  style={{ ...serif, background: step.bg, color: step.color, border: `1.5px solid ${step.color}` }}
                >
                  {step.num}
                </div>

                {/* Content */}
                <div className="pt-2">
                  <span
                    className="block text-[0.65rem] font-semibold uppercase tracking-[0.2em] mb-2"
                    style={{ color: step.color }}
                  >
                    {step.label}
                  </span>
                  <h2
                    className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-[1.1] text-black mb-5"
                    style={serif}
                  >
                    {step.headline}
                  </h2>

                  <div className="space-y-4 mb-6">
                    {step.body.map((para, pi) => (
                      <p key={pi} className="text-base text-gray-600 leading-relaxed max-w-[600px]">
                        {para}
                      </p>
                    ))}
                  </div>

                  {/* What you get */}
                  <div
                    className="rounded-2xl p-6 mb-6 max-w-[600px]"
                    style={{ background: step.bg, border: `0.5px solid ${step.color}22` }}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] mb-3" style={{ color: step.color }}>
                      What you get
                    </p>
                    <ul className="space-y-2">
                      {step.gets.map((item, gi) => (
                        <li key={gi} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: step.color }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-gray-500 mt-4 pt-4 border-t" style={{ borderColor: `${step.color}22` }}>
                      {step.time}
                    </p>
                  </div>

                  <Link
                    href="/chat"
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-5 py-3 rounded-full text-white hover:opacity-85 transition-opacity"
                    style={{ background: step.color }}
                  >
                    {step.cta} →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pricing note */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: E }}
          viewport={VP}
          className="rounded-3xl p-8 md:p-10 mb-16"
          style={{ background: "rgba(255,255,255,0.95)", border: "0.5px solid #e8e4dc" }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8a8780] mb-3">
            On pricing
          </p>
          <h3 className="text-2xl font-bold text-black mb-3" style={serif}>
            We do not publish fixed prices.
          </h3>
          <p className="text-base text-gray-600 leading-relaxed max-w-2xl mb-4">
            Every business is different. Every gap is different. The scope of an Audit for a five-person team looks nothing like the scope for a regional enterprise. The Build that closes one gap has nothing in common with the one that closes another.
          </p>
          <p className="text-base text-gray-600 leading-relaxed max-w-2xl mb-6">
            What we can tell you is that the Audit and the Build are fixed-price engagements. You know the cost before we start. The Retainer is a monthly commitment with no long-term contract. Talk to the agent to get a sense of what your situation would involve.
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-widest hover:opacity-85 transition-opacity"
          >
            Talk to the agent →
          </Link>
        </motion.div>

        {/* FAQ section for AEO */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: E }}
          viewport={VP}
          className="space-y-6"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8a8780] mb-6">
            Common questions
          </p>
          {faqSchema.mainEntity.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl p-6"
              style={{ background: "rgba(255,255,255,0.95)", border: "0.5px solid #e8e4dc" }}
            >
              <h3 className="text-base font-bold text-black mb-2">{faq.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </motion.div>

      </div>

      <Footer />
    </section>
  );
}
