"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { robotoSlab, serif } from "@/lib/fonts";
import SoftBackground from "@/components/SoftBackground";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import ShareButtons from "@/components/ShareButtons";

const E = [0.16, 1, 0.3, 1];
const VP = { once: false, margin: "0px 0px -100px 0px" };

const STORY_SECTIONS = [
  { key: "challenge", eyebrow: "The challenge", num: "01", color: "#E18949" },
  { key: "solution", eyebrow: "The solution", num: "02", color: "#1ACDEB" },
  { key: "outcome", eyebrow: "The outcome", num: "03", color: "#6B17DA" },
];

function StoryBlock({ section, body, index, showWhenEmpty = false }) {
  if (!body?.trim() && !showWhenEmpty) return null;

  const isPending = !body?.trim();

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -48 : 48 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.85, delay: index * 0.08, ease: E }}
      viewport={{ once: false, margin: "0px 0px -80px 0px" }}
      className={`grid grid-cols-[52px_1fr] md:grid-cols-[72px_1fr] gap-x-4 md:gap-x-6 py-8 md:py-10${index > 0 ? " border-t border-[#e8e4dc]/90" : ""}`}
    >
      <p className="text-[2.25rem] md:text-[2.75rem] font-bold leading-none" style={{ ...serif, color: section.color }}>
        {section.num}
      </p>
      <div className="pt-0.5 md:pt-1">
        <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-3">
          {section.eyebrow}
        </p>
        <p
          className={`text-sm md:text-base leading-relaxed${isPending ? " text-[#8a8780] italic" : " text-gray-600"}`}
        >
          {isPending ? "Case study copy coming soon." : body}
        </p>
      </div>
    </motion.div>
  );
}

function ProjectVideoCTA({ youtubeId, ctaLabel = "Watch on YouTube" }) {
  if (!youtubeId) return null;

  const watchUrl = `https://www.youtube.com/watch?v=${youtubeId}`;

  return (
    <motion.div
      className="mb-10 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: E }}
      viewport={VP}
    >
      <a
        href={watchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-black text-white rounded-full text-xs font-semibold uppercase tracking-widest hover:opacity-85 transition-opacity"
      >
        {ctaLabel}
        <span aria-hidden>→</span>
      </a>
    </motion.div>
  );
}

export function PortfolioProjectCTA({ projectName, chatRef }) {
  if (!chatRef) return null;

  return (
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
        Curious about {projectName}?
      </h2>
      <p className="text-sm text-gray-600 leading-relaxed mb-6 max-w-md mx-auto">
        Our agent has full access to this case study, technical architecture, and impact metrics.
      </p>
      <Link
        href={`/chat?ref=${chatRef}&source=portfolio`}
        className="inline-flex items-center justify-center px-8 py-3.5 bg-black text-white rounded-full text-xs font-semibold uppercase tracking-widest hover:opacity-85 transition-opacity"
      >
        Start a conversation
      </Link>
    </motion.div>
  );
}

export default function PortfolioProjectLayout({
  project,
  title,
  description,
  image,
  imageAlt,
  slug,
  tags = [],
  chatRef,
  category,
  children,
}) {
  const projectData = project || {};
  const shareUrl = slug ? `https://radical-thinking.net/work/${slug}` : "";
  const eyebrow = category || projectData.category;
  const overview =
    projectData.overview && projectData.overview !== description ? projectData.overview : "";
  const youtubeId = projectData.youtubeId;

  return (
    <main className="relative flex flex-col w-full min-h-screen overflow-x-clip">
      <span className={robotoSlab.className} hidden aria-hidden />

      <div className="fixed inset-0 z-0 pointer-events-none gradient-background">
        <SoftBackground />
      </div>

      <Nav />

      <div className="relative z-10 w-full px-4 py-14 md:py-20 pt-24 md:pt-28">
        <article className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: E }}
          >
            <Link
              href="/work"
              className="inline-flex items-center text-xs font-semibold uppercase tracking-[0.14em] text-[#8a8780] hover:text-black transition-colors mb-8"
            >
              ← Back to work
            </Link>

            {eyebrow ? (
              <span className="block text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-2">
                {eyebrow}
              </span>
            ) : null}

            {tags.length > 0 ? (
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex px-3 py-1 rounded-full text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#8a8780] border border-[#e8e4dc]/90 bg-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}

            <h1
              className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-tight leading-[1.1] text-black text-balance"
              style={serif}
            >
              {title}
            </h1>
            <p className="text-base text-gray-600 leading-relaxed mt-4 max-w-[560px]">{description}</p>
          </motion.div>

          {image ? (
            <motion.figure
              className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#f4f2ed] border border-[#e8e4dc]/90 shadow-[0_2px_12px_rgba(0,0,0,0.04)] mt-8 md:mt-10 mb-10 md:mb-12"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: E }}
            >
              <Image
                src={image}
                alt={imageAlt || title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </motion.figure>
          ) : null}

          {overview ? (
            <motion.p
              className="text-base text-gray-600 leading-relaxed mb-10 md:mb-12"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: E }}
              viewport={VP}
            >
              {overview}
            </motion.p>
          ) : null}

          <div className="mb-10 md:mb-12">
            {STORY_SECTIONS.map((section, index) => (
              <StoryBlock
                key={section.key}
                section={section}
                body={projectData[section.key]}
                index={index}
                showWhenEmpty={projectData.storyPending}
              />
            ))}
          </div>

          {projectData.facts && projectData.facts.length > 0 ? (
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
                {projectData.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#8a8780] mb-1">
                      {fact.label}
                    </dt>
                    <dd className="text-sm text-gray-600 leading-relaxed">
                      {fact.label === "URL" ? (
                        <a
                          href={fact.value.startsWith("http") ? fact.value : `https://${fact.value}`}
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
          ) : null}

          {projectData.live ? (
            <motion.div
              className="mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: E }}
              viewport={VP}
            >
              <Link
                href={projectData.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-black text-white rounded-full text-xs font-semibold uppercase tracking-widest hover:opacity-85 transition-opacity"
              >
                Visit live platform
              </Link>
            </motion.div>
          ) : null}

          {children}

          <ProjectVideoCTA youtubeId={youtubeId} ctaLabel={projectData.videoCtaLabel} />

          <PortfolioProjectCTA projectName={title} chatRef={chatRef} />

          {shareUrl ? (
            <div className="mt-10 pt-8 border-t border-[#e8e4dc]/90">
              <ShareButtons title={title} url={shareUrl} />
            </div>
          ) : null}
        </article>
      </div>

      <Footer />

      {chatRef ? (
        <div className="fixed bottom-6 right-6 z-50 md:hidden">
          <Link
            href={`/chat?ref=${chatRef}&source=portfolio`}
            className="flex items-center justify-center w-14 h-14 bg-black text-white rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.18)] hover:opacity-90 transition-opacity"
            aria-label="Start a conversation"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </Link>
        </div>
      ) : null}
    </main>
  );
}
