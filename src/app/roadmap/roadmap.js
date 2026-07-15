// src/app/roadmap/roadmap.js
"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SoftBackground from "@/components/SoftBackground";
import Script from "next/script";

const E = [0.16, 1, 0.3, 1];
const VP = { once: true, margin: "0px 0px -80px 0px" };
const serif = { fontFamily: "HelveticaNeue, sans-serif" };

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is an AI roadmap?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An AI roadmap is a prioritised plan showing where artificial intelligence can create genuine value in a specific business. It maps your current workflows against what AI can realistically do, identifies the highest-impact opportunities, and recommends where to start. A good AI roadmap is specific to your business, not a generic list of AI tools.",
      },
    },
    {
      "@type": "Question",
      name: "Why is this AI roadmap free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The free AI roadmap from Radical Thinking is the entry point to how we work. We offer it without charge because we believe the best way to demonstrate how we think is to show you, not tell you. If the roadmap is useful, you will know whether working with us makes sense.",
      },
    },
    {
      "@type": "Question",
      name: "What makes this AI roadmap different?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most AI roadmaps are generic lists of AI tools and trends. The Radical Thinking roadmap starts from inside your business: your workflows, your team, your gaps. It is built on our inside-out methodology, which means we look at the gap between what your business intends to deliver and what it actually delivers before recommending any technology.",
      },
    },
    {
      "@type": "Question",
      name: "How do I get my AI roadmap?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Talk to the Radical Thinking agent. The agent will ask you a few questions about your business and produce a personalised roadmap based on your specific situation. No form to fill in, no waiting. The conversation is the process.",
      },
    },
    {
      "@type": "Question",
      name: "What happens after I get my AI roadmap?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your roadmap will show you what to build first. If you want to act on it, how we work starts with The Audit, which goes deeper into your specific situation and produces a prioritised action plan. There is no obligation to go further.",
      },
    },
  ],
};

const contrast = [
  {
    them: "Guessing which AI tools to try next",
    you: "Knowing exactly where AI creates value in your business",
    color: "#1ACDEB",
  },
  {
    them: "Running pilots that never make it to production",
    you: "A clear first move with a defined outcome",
    color: "#E18949",
  },
  {
    them: "Following generic AI trends that don't fit your context",
    you: "A roadmap built around your reality, not someone else's",
    color: "#6B17DA",
  },
];

const steps = [
  {
    num: "01",
    color: "#1ACDEB",
    title: "Tell us about your business.",
    body: "What you do, how big your team is, what you have already tried. No forms. Just a conversation.",
  },
  {
    num: "02",
    color: "#E18949",
    title: "We find the gaps.",
    body: "The agent maps where intention and reality diverge in your operation. That gap is where AI creates the most value.",
  },
  {
    num: "03",
    color: "#6B17DA",
    title: "You get your roadmap.",
    body: "Specific to your business. What to build first, what to avoid, and what the impact could be. Yours to keep.",
  },
];

export default function RoadmapClient() {
  return (
    <section className="relative w-full min-h-screen flex flex-col overflow-x-hidden">
      <Script id="faq-schema-roadmap" type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </Script>

      <div className="fixed inset-0 z-0 pointer-events-none gradient-background">
        <SoftBackground />
      </div>

      <Nav />

      {/* Hero */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 pt-24 md:pt-32 pb-0">
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: E }}
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "#1ACDEB" }}
            />
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780]">
              Free. Takes five minutes.
            </p>
          </div>

          <h1
            className="text-[clamp(2.8rem,6vw,4.5rem)] font-bold leading-[1.02] tracking-tight text-black mb-6"
            style={serif}
          >
            Every week without a plan,<br />
            your competitors<br />
            are building one.
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-xl">
            AI is not slowing down. The gap between companies that know where it fits and companies that are still figuring it out is widening every month. Your roadmap takes five minutes to get. There is no reason not to.
          </p>

          <Link
            href="/chat"
            className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-widest hover:opacity-85 transition-opacity"
          >
            Get my free roadmap
          </Link>

          <p className="text-xs uppercase tracking-widest text-[#8a8780] mt-4">
            No commitment. No sales call. No email required.
          </p>
        </motion.div>
      </div>

      {/* Contrast strip */}
      <div
        className="relative z-10 w-full mt-20 py-16 px-4"
        style={{ borderTop: "0.5px solid #e8e4dc", borderBottom: "0.5px solid #e8e4dc" }}
      >
        <div className="max-w-3xl mx-auto">
          <motion.p
            className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8a8780] mb-10 text-center"
            initial={{ opacity: 0, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: E }}
            viewport={VP}
          >
            Without a roadmap vs with one
          </motion.p>

          <div className="space-y-4">
            {contrast.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: E }}
                viewport={VP}
                className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 md:gap-4 items-center"
              >
                <div
                  className="rounded-2xl px-5 py-4 text-sm text-gray-500 line-through"
                  style={{ background: "rgba(0,0,0,0.03)", border: "0.5px solid #e8e4dc" }}
                >
                  {item.them}
                </div>

                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold mx-auto md:mx-0"
                  style={{ background: item.color }}
                >
                  →
                </div>

                <div
                  className="rounded-2xl px-5 py-4 text-sm font-medium text-black"
                  style={{ background: "rgba(255,255,255,0.95)", border: `0.5px solid ${item.color}44` }}
                >
                  {item.you}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 py-20">
        <motion.p
          className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8a8780] mb-12"
          initial={{ opacity: 0, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: E }}
          viewport={VP}
        >
          How it works
        </motion.p>

        <div className="relative">
          <div
            className="absolute left-[19px] top-0 bottom-0 w-px hidden md:block"
            style={{ background: "#e8e4dc" }}
          />

          <div className="space-y-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: E }}
                viewport={VP}
                className="relative grid gap-5"
                style={{ gridTemplateColumns: "40px 1fr" }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold relative z-10"
                  style={{ background: `${step.color}18`, color: step.color, border: `1px solid ${step.color}44` }}
                >
                  {step.num}
                </div>
                <div className="pt-1.5">
                  <h3 className="text-lg font-bold text-black mb-1" style={serif}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main CTA */}
      <div className="relative z-10 w-full px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: E }}
          viewport={VP}
          className="max-w-3xl mx-auto rounded-3xl p-10 md:p-14 text-center"
          style={{ background: "#0a0a0a" }}
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "#1ACDEB" }}
            />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#8a8780]">
              Agent is ready
            </span>
          </div>

          <h2
            className="text-[clamp(1.75rem,3.5vw,3rem)] font-bold text-white leading-snug mb-4"
            style={serif}
          >
            Five minutes from now<br />you could have a plan.
          </h2>

          <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-md mx-auto">
            Tell the agent about your business. It will ask the right questions and produce your personalised roadmap in the conversation. No email required. No follow-up unless you want one.
          </p>

          <Link
            href="/chat"
            className="inline-flex items-center gap-2 bg-white text-black px-10 py-4 rounded-full text-xs font-semibold uppercase tracking-widest hover:opacity-90 transition-opacity"
          >
            Get my free roadmap
          </Link>

          <p className="text-[#8a8780] text-xs uppercase tracking-widest mt-5">
            Free. No commitment. No sales call.
          </p>
        </motion.div>
      </div>

      {/* FAQ */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: E }}
          viewport={VP}
          className="space-y-3"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8a8780] mb-6">
            Common questions
          </p>
          {faqSchema.mainEntity.map((faq, i) => (
            <details
              key={i}
              className="group rounded-2xl px-6 py-5 cursor-pointer"
              style={{ background: "rgba(255,255,255,0.95)", border: "0.5px solid #e8e4dc" }}
            >
              <summary className="text-sm font-semibold text-black list-none flex items-center justify-between gap-4">
                {faq.name}
                <span className="text-[#8a8780] group-open:rotate-45 transition-transform duration-200 flex-shrink-0 text-lg leading-none">+</span>
              </summary>
              <p className="text-sm text-gray-600 leading-relaxed mt-3">
                {faq.acceptedAnswer.text}
              </p>
            </details>
          ))}
        </motion.div>
      </div>

      <Footer />
    </section>
  );
}
