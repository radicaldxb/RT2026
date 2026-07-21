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

const RT_BLUE = "#1ACDEB";
const RT_AMBER = "#E18949";
const RT_PURPLE = "#6B17DA";

const services = [
  {
    eyebrow: "Creative",
    color: RT_BLUE,
    title: "Ideas and Positioning",
    body: "For organisations with a bold idea that needs to become a real business outcome. We help you find what is worth building, define the narrative that carries it, and set the strategy for how it lands in market.",
    workOn: [
      "Strategic positioning",
      "Brand narrative",
      "Market entry strategy",
      "Product launch strategy",
      "Campaign strategy",
    ],
    when: "When you have a new product, capability, or brand that needs to land in a market that has to notice. When your existing story has not caught up with what you actually do. When AI or another technology has changed what you offer and the narrative needs to catch up.",
  },
  {
    eyebrow: "Experience",
    color: RT_AMBER,
    title: "Experience and Design",
    body: "For organisations whose bold idea needs to feel right when people encounter it. We design the experiences, brand systems, and touchpoints that turn an idea into something people remember and return to.",
    workOn: [
      "Brand identity and design systems",
      "User and customer experience design",
      "Product and interface design",
      "Content systems and production",
      "Motion, video, and immersive experiences",
    ],
    when: "When your customer experience has fallen behind your brand promise. When you are launching a product or campaign that needs to be felt, not just understood. When your existing touchpoints do not reflect what you want your business to be.",
  },
  {
    eyebrow: "Technology",
    color: RT_PURPLE,
    title: "Implementation and Technology",
    body: "For organisations that need the technology and AI infrastructure to make their bold idea work at scale. We build the systems, integrations, and AI components that turn a strategy into something operational.",
    workOn: [
      "AI implementation and integration",
      "Digital platforms and web systems",
      "Workflow automation",
      "Data and content pipelines",
      "Product engineering",
    ],
    when: "When you have a strategy that requires working technology to deliver. When you have an AI capability that needs to be productionised. When your operations need to be reimagined around what AI and automation can now do.",
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
        text: `${service.body} What we work on: ${service.workOn.join(", ")}. When to hire us: ${service.when}`,
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
            className="mb-10 md:mb-14 text-center md:text-left"
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
              Three services. One formula. Whatever your bold idea needs.
            </h1>
            <p className="text-base text-gray-600 leading-relaxed mt-4 max-w-[620px] mx-auto md:mx-0">
              Our services map to the three legs of the formula. Creative that finds what is worth
              building. Experience that makes it land. Technology and AI that amplify both. Pick one.
              Combine them. Start where your idea needs help.
            </p>
          </motion.header>

          <div className="space-y-6 md:space-y-8 mb-12 md:mb-16">
            {services.map((service, index) => (
              <motion.article
                key={service.title}
                className="rounded-2xl border border-[#e8e4dc]/90 bg-white overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, ease: E, delay: index * 0.05 }}
                viewport={VP}
              >
                <div className="h-1.5 w-full" style={{ backgroundColor: service.color }} />
                <div className="p-6 md:p-8">
                  <p
                    className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] mb-2"
                    style={{ color: service.color }}
                  >
                    {service.eyebrow}
                  </p>
                  <h2
                    className="text-[clamp(1.35rem,2.5vw,1.75rem)] font-bold text-black leading-snug mb-4"
                    style={serif}
                  >
                    {service.title}
                  </h2>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-6 max-w-3xl">
                    {service.body}
                  </p>

                  <div className="mb-6">
                    <p className="text-sm font-semibold text-black mb-3">What we work on:</p>
                    <ul className="space-y-2">
                      {service.workOn.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed"
                        >
                          <span
                            className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: service.color }}
                            aria-hidden
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    className="rounded-xl p-5 md:p-6 max-w-3xl"
                    style={{
                      background: `${service.color}0f`,
                      border: `0.5px solid ${service.color}22`,
                    }}
                  >
                    <p
                      className="text-xs font-semibold uppercase tracking-[0.15em] mb-2"
                      style={{ color: service.color }}
                    >
                      When to hire us for this
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed">{service.when}</p>
                  </div>
                </div>
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
              We don't hand you a black box. We build in guardrails, human approval, and controlled
              scale so you stay in control and your brand stays safe.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {safetyItems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[#e8e4dc]/90 bg-[#fafaf8] p-5 md:p-6"
                >
                  <div
                    className="w-10 h-10 rounded-xl bg-white border border-[#e8e4dc]/90 flex items-center justify-center mb-4"
                    aria-hidden
                  >
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
            className="rounded-2xl border border-[#e8e4dc]/90 bg-white p-6 md:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)] mb-10 md:mb-12"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: E }}
            viewport={VP}
          >
            <h2
              className="text-[clamp(1.2rem,2.3vw,1.6rem)] font-bold text-black leading-snug mb-3"
              style={serif}
            >
              Capabilities we bring across engagements
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-6 max-w-2xl">
              Depending on the service and engagement, we mobilise the following through Radical
              Thinking and our network of specialists:
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
            className="rounded-2xl border border-[#e8e4dc]/90 bg-white p-6 md:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)] mb-12 md:mb-16"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: E }}
            viewport={VP}
          >
            <h2
              className="text-[clamp(1.35rem,2.5vw,1.75rem)] font-bold text-black leading-snug mb-3"
              style={serif}
            >
              How we engage
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-6 max-w-3xl">
              Every service can be delivered as one of three engagement types. Start with a Pulse to
              find the real problem. Move to a Bridge to close it. Continue with a Navigator to keep
              it current. Each service, each engagement type, sized to your specific situation.
            </p>
            <Link
              href="/how-we-work"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-black hover:opacity-70 transition-opacity"
            >
              See how we work →
            </Link>
          </motion.div>

          <motion.div
            className="max-w-lg mx-auto text-center"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: E }}
            viewport={VP}
          >
            <h2
              className="text-[clamp(1.35rem,2.5vw,1.75rem)] font-bold text-black leading-snug mb-3"
              style={serif}
            >
              Not sure which service fits your situation?
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              Tell us what problem you're trying to solve. We will figure out the rest together.
            </p>
            <Link
              href="/chat?ref=services&source=services"
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
