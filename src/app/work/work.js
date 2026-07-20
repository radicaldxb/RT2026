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

const CLIENT_ORDER = [
  "microsoft-ai",
  "bella-conversational-ai",
  "lenovo-campaigns",
  "1001-inventions-games",
  "kfas-1001-inventions",
  "payment-partners",
  "ai-networks",
  "simon-snelder",
  "webinarlife",
  "austability-web",
  "austability-branding",
  "austability-video",
  "influence-my-world",
  "crypto-x",
  "akshaak",
  "soundreaver",
  "flexxpay",
];

const EXPLORATION_ORDER = [
  "fluffyfriends",
  "kahulife",
  "tommy-ellie",
  "animal-intelligence",
];

const CARD_COPY = {
  "microsoft-ai":
    "AI chatbot as the automated registration flow for Microsoft's technical workshops.",
  "bella-conversational-ai":
    "Brand identity and positioning for an educational AI assistant, developed ahead of the generative AI wave.",
  "lenovo-campaigns":
    "B2B demand-generation campaigns with regional promotional compliance.",
  "1001-inventions-games":
    "Interactive multi-device installation combining physical creativity with real-time projection mapping.",
  "kfas-1001-inventions":
    "Progressive Web App for a regional technology festival.",
  "payment-partners":
    "Corporate brand and collateral system for a payments consultancy operating in regulated industries.",
  "ai-networks":
    "Brand identity and strategic guidelines for an AI collective.",
  "simon-snelder":
    "Brand and digital platform for an independent financial advisor.",
  webinarlife:
    "Managed virtual event platform for enterprise clients. Built and operated end-to-end.",
  "austability-web":
    "Corporate web platform on Umbraco CMS, built for institutional B2B lead generation.",
  "austability-branding":
    "Corporate brand overhaul for a multi-faceted industrial organisation.",
  "austability-video":
    "Cinematic corporate video translating industrial capabilities into clear commercial narrative.",
  "influence-my-world":
    "B2B platform matching global brands with targeted digital creators.",
  "crypto-x":
    "Visual identity and brand system for a digital asset exchange.",
  akshaak:
    "E-commerce marketplace for local artisanal merchants in the UAE.",
  soundreaver:
    "E-commerce brand spin-off transitioning a custom audio shop into a retail business.",
  flexxpay:
    "Animated promotional campaign for a financial wellness platform.",
  fluffyfriends:
    "Self-initiated AI product. Generative pet portrait studio, built and operated end-to-end using n8n and Google Gemini. Closed after commercial validation phase.",
  kahulife:
    "Concept for a next-generation pet management platform combining digital ecosystem and AI companion for pet guardians.",
  "tommy-ellie":
    "Exploratory venture testing print-on-demand generative art workflows.",
  "animal-intelligence":
    "Conceptual framework applying AI analytics to animal shelter management and adoption workflows.",
};

function projectHref(item) {
  if (item.link && item.link !== "#") return item.link;
  if (item.slug) return `/work/${item.slug}`;
  return "/work";
}

function projectsByOrder(order) {
  const bySlug = new Map(portfolio.map((item) => [item.slug, item]));
  return order.map((slug) => bySlug.get(slug)).filter(Boolean);
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

function ProjectCard({ item, index }) {
  const cardDescription = CARD_COPY[item.slug] || item.description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 + (index % 3) * 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.08, ease: E }}
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
          <h3
            className="text-lg font-bold text-black mb-1.5 leading-snug tracking-tight"
            style={serif}
          >
            {item.title}
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
            {cardDescription}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Work() {
  const [activeTag, setActiveTag] = useState("All");

  const clientProjects = projectsByOrder(CLIENT_ORDER);
  const explorationProjects = projectsByOrder(EXPLORATION_ORDER);

  const allTags = [
    "All",
    ...new Set(clientProjects.flatMap((item) => item.tags)),
  ].sort((a, b) => {
    if (a === "All") return -1;
    if (b === "All") return 1;
    return a.localeCompare(b);
  });
  const tagRows = splitTagsIntoRows(allTags);
  const filteredClient =
    activeTag === "All"
      ? clientProjects
      : clientProjects.filter((item) => item.tags.includes(activeTag));

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
            className="mb-10 md:mb-12 text-center md:text-left"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: E }}
          >
            <h1
              className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold text-black tracking-tight leading-[1.1]"
              style={serif}
            >
              Work
            </h1>
            <p className="text-base text-gray-600 leading-relaxed mt-3 max-w-[560px] mx-auto md:mx-0">
              Client engagements in AI, digital platforms, and brand strategy. Plus our own experiments in what AI can do next.
            </p>
          </motion.header>

          <section className="mb-14 md:mb-16" aria-labelledby="client-work-heading">
            <motion.div
              className="mb-6 md:mb-8 text-center md:text-left"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: E }}
              viewport={VP}
            >
              <h2
                id="client-work-heading"
                className="text-[clamp(1.35rem,2.5vw,1.75rem)] font-bold text-black leading-snug"
                style={serif}
              >
                Client Work
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mt-2 max-w-[560px] mx-auto md:mx-0">
                Delivered engagements across AI, digital, brand, and marketing.
              </p>
            </motion.div>

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
              {filteredClient.map((item, i) => (
                <ProjectCard key={item.slug || item.title} item={item} index={i} />
              ))}
            </div>
          </section>

          <section className="mb-4" aria-labelledby="explorations-heading">
            <motion.div
              className="mb-6 md:mb-8 text-center md:text-left"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: E }}
              viewport={VP}
            >
              <h2
                id="explorations-heading"
                className="text-[clamp(1.35rem,2.5vw,1.75rem)] font-bold text-black leading-snug"
                style={serif}
              >
                Explorations and R&D
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mt-2 max-w-[640px] mx-auto md:mx-0">
                Self-initiated experiments where we test what AI can do, build products end-to-end, and validate concepts before recommending them to clients.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {explorationProjects.map((item, i) => (
                <ProjectCard key={item.slug || item.title} item={item} index={i} />
              ))}
            </div>
          </section>

          <motion.div
            className="mt-12 md:mt-16 max-w-lg mx-auto text-center"
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
              Want the full story on any project?
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              Our agent has access to every case study: architecture, outcomes, and what we would do differently.
            </p>
            <Link
              href="/chat?ref=work&source=portfolio"
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
