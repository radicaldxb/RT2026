"use client";

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
    label: "Step 1: The Pulse",
    headline: "Where are you, really?",
    body: [
      "Most organisations know something is not landing. Fewer know exactly what.",
      "We spend time inside your business. We talk to your team, look at how the work moves, and map what you set out to deliver versus what your customer actually experiences. We look at the idea, the experience, the technology, and the market it lives in. Then we identify the gap and where closing it would create the most impact.",
      "This is not a technology audit. It is a read on where your bold idea is versus where you intended it to be.",
    ],
    gets: [
      "A clear read on your business from the inside out",
      "The gap between intention and customer experience, mapped",
      "A prioritised recommendation for what to close first",
      "An honest assessment of where technology and AI can and cannot help",
    ],
    time: "Typically 5 to 10 working days",
    cta: "Start with The Pulse",
  },
  {
    num: "2",
    color: "#E18949",
    bg: "rgba(225,137,73,0.08)",
    label: "Step 2: The Bridge",
    headline: "Close the gap. Land the idea.",
    body: [
      "The Pulse tells you where the gap is. The Bridge is where we close it.",
      "Not by building one tool. By bringing together the creative, the experience, and the technology in the right ratio to make your bold idea land in the real world. That might be a narrative, a redesigned experience, a working system, or all three. The medium follows the problem.",
      "The output is not a deliverable sitting on a server. It is a functioning connection between where you were and where you intended to be. Something your team uses. Something your customers experience. Something that works.",
    ],
    gets: [
      "Production-ready work, not a prototype",
      "Creative, experience, and technology brought together as one",
      "Full documentation and team onboarding",
      "Built to survive the next market shift or AI update",
    ],
    time: "Typically 30 days, fixed price",
    cta: "Talk about The Bridge",
  },
  {
    num: "3",
    color: "#6B17DA",
    bg: "rgba(107,23,218,0.06)",
    label: "Step 3: The Navigator",
    headline: "Keep the direction true.",
    body: [
      "Bold ideas do not stand still. Markets shift. Customer expectations shift. New AI capability arrives every quarter. What we protect in the Navigator is not your technology. It is your direction.",
      "Monthly, we make sure your idea is still landing and your experience is still delivering. Quarterly, we reassess whether your direction still fits the market and your ambition. When technology needs to change, we change it. But we start with the compass, not the tools.",
      "This is not a maintenance contract. It is a continuous partnership that keeps the bold idea on course as everything around it evolves.",
    ],
    gets: [
      "Monthly review of what has changed in your market, your experience, and the AI landscape",
      "Quarterly directional reassessment",
      "Direct access when something breaks or something new emerges",
      "Proactive recommendations, not reactive fixes",
    ],
    time: "Monthly, cancel anytime",
    cta: "Ask about The Navigator",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does Radical Thinking work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Radical Thinking works in three engagement types, guided by the formula BI = C + Ex × T²: The Pulse maps the gap between your business intention and customer reality, The Bridge closes that gap by bringing creative, experience, and technology together, and The Navigator keeps your bold idea on course as markets, technology, and AI evolve.",
      },
    },
    {
      "@type": "Question",
      name: "How long does The Pulse take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Pulse typically takes 5 to 10 working days. It ends with a prioritised recommendation built around your specific situation and a clear read on what to close first.",
      },
    },
    {
      "@type": "Question",
      name: "How long does The Bridge take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Bridge is typically 30 days at a fixed price. It brings creative, experience, and technology together into a production-ready piece of work your team uses every day, fully documented and built to survive market and technology shifts.",
      },
    },
    {
      "@type": "Question",
      name: "What does The Navigator include?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Navigator includes monthly reviews of what has changed in your market, your experience, and the AI landscape, quarterly directional reassessments, and direct access when something breaks or something new emerges. It is a monthly commitment with no long-term contract required.",
      },
    },
    {
      "@type": "Question",
      name: "Do I have to start with The Pulse?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Pulse is the recommended starting point because it makes sure The Bridge closes the right gap. However, if you already have a clear read on where you are, we can discuss starting directly with The Bridge. Start a conversation to explore what makes sense for your situation.",
      },
    },
    {
      "@type": "Question",
      name: "What is the Radical Thinking formula?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "BI = C + Ex × T² means Bold Ideas equal Creative plus Experience multiplied by Technology squared. Technology alone does not create business impact. Every engagement applies Creative, Experience, and Technology in the right ratio so bold ideas land as real results.",
      },
    },
    {
      "@type": "Question",
      name: "How does Radical Thinking price its work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Radical Thinking does not publish fixed prices because every engagement is different. The Pulse and The Bridge are fixed-price engagements sized to the specific scope. Start a conversation to get a sense of what your situation would involve.",
      },
    },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "How Radical Thinking Works",
  provider: {
    "@type": "Organization",
    name: "Radical Thinking",
    url: "https://radical-thinking.net",
  },
  description:
    "Three engagement types: The Pulse, The Bridge, and The Navigator. From understanding where you are to keeping your direction true.",
  serviceType: "Business Strategy and Implementation",
  areaServed: {
    "@type": "Place",
    name: "Global",
  },
  url: "https://radical-thinking.net/how-we-work",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Engagement Types",
    itemListElement: [
      {
        "@type": "Offer",
        name: "The Pulse",
        description:
          "A clear read on your business from the inside out. Maps the gap between intention and customer experience. Typically 5 to 10 working days.",
      },
      {
        "@type": "Offer",
        name: "The Bridge",
        description:
          "Closes the gap by bringing creative, experience, and technology together. Typically 30 days, fixed price.",
      },
      {
        "@type": "Offer",
        name: "The Navigator",
        description:
          "Keeps your bold idea on course. Monthly reviews, quarterly directional reassessment, direct access.",
      },
    ],
  },
};

export default function HowWeWork() {
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
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: E }}
        >
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-4">
            How We Work
          </p>
          <h1
            className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-black mb-4"
            style={serif}
          >
            We start inside the box.
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mb-4">
            Anyone can think outside the box. The hard work is understanding what is inside it first.
            The people, the processes, the gaps between intention and reality. That is where the real
            opportunity lives.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mb-4">
            Every engagement runs on BI = C + Ex × T². Creative, Experience, and Technology squared.
            That is how we make sure bold ideas land as real business impact, not just clever
            technology.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
            We work in three parts. Take your pulse. Build the bridge. Keep the direction true. Pick
            one. Combine them. Start where your idea needs help.
          </p>
        </motion.div>

        <div className="relative">
          <div
            className="absolute left-[27px] top-0 bottom-0 w-px hidden md:block"
            style={{ background: "#e8e4dc" }}
          />

          <div className="flex flex-col gap-0">
            {steps.map((step) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: 48 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0, ease: E }}
                viewport={VP}
                className="relative grid pb-16"
                style={{ gridTemplateColumns: "56px 1fr", gap: "1.5rem 2.5rem" }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0 relative z-10"
                  style={{
                    ...serif,
                    background: step.bg,
                    color: step.color,
                    border: `1.5px solid ${step.color}`,
                  }}
                >
                  {step.num}
                </div>

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

                  <div
                    className="rounded-2xl p-6 mb-6 max-w-[600px]"
                    style={{ background: step.bg, border: `0.5px solid ${step.color}22` }}
                  >
                    <p
                      className="text-xs font-semibold uppercase tracking-[0.15em] mb-3"
                      style={{ color: step.color }}
                    >
                      What you get
                    </p>
                    <ul className="space-y-2">
                      {step.gets.map((item, gi) => (
                        <li key={gi} className="flex items-start gap-2 text-sm text-gray-700">
                          <span
                            className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                            style={{ background: step.color }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p
                      className="text-xs text-gray-500 mt-4 pt-4 border-t"
                      style={{ borderColor: `${step.color}22` }}
                    >
                      {step.time}
                    </p>
                  </div>

                  <Link
                    href="/chat?ref=how-we-work"
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
            Every business is different. Every gap is different. The scope of a Pulse for a
            five-person team looks nothing like the scope for a regional enterprise. The Bridge that
            closes one gap has nothing in common with the one that closes another.
          </p>
          <p className="text-base text-gray-600 leading-relaxed max-w-2xl mb-6">
            What we can tell you is that The Pulse and The Bridge are fixed-price engagements. You
            know the cost before we start. The Navigator is a monthly commitment with no long-term
            contract. Start a conversation to get a sense of what your situation would involve.
          </p>
          <Link
            href="/chat?ref=how-we-work"
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-widest hover:opacity-85 transition-opacity"
          >
            Start a conversation →
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: E }}
          viewport={VP}
          className="space-y-6 mb-16"
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

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: E }}
          viewport={VP}
          className="text-center max-w-lg mx-auto"
        >
          <h2
            className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold text-black leading-snug mb-3"
            style={serif}
          >
            Ready to talk?
          </h2>
          <p className="text-base text-gray-600 leading-relaxed mb-6">
            Every engagement begins with a conversation about your specific situation.
          </p>
          <Link
            href="/chat?ref=how-we-work"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-black text-white rounded-full text-xs font-semibold uppercase tracking-widest hover:opacity-85 transition-opacity"
          >
            Start a conversation
          </Link>
        </motion.div>
      </div>

      <Footer />
    </section>
  );
}
