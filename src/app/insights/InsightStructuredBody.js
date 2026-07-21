"use client";

import { motion } from "framer-motion";

const E = [0.16, 1, 0.3, 1];
const VP = { once: false, margin: "0px 0px -80px 0px" };

function InsightSection({ section, index, serif }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, delay: index * 0.04, ease: E }}
      viewport={VP}
      className={`py-8 md:py-10${index > 0 ? " border-t border-[#e8e4dc]/90" : ""}`}
    >
      <h2
        className="text-base md:text-lg font-semibold text-black mb-4 tracking-tight"
        style={serif}
      >
        {section.title}
      </h2>
      <div className="space-y-4 text-sm md:text-base text-gray-600 leading-relaxed">
        {(section.paragraphs || []).map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
      {section.quote ? (
        <blockquote className="mt-5 pl-4 border-l-[3px] border-black/80 text-sm md:text-base text-gray-800 font-medium leading-relaxed">
          {section.quote}
        </blockquote>
      ) : null}
    </motion.div>
  );
}

export default function InsightStructuredBody({
  leadQuote,
  intro,
  sections = [],
  closing,
  serif,
}) {
  return (
    <div className="mb-10 md:mb-12">
      {leadQuote ? (
        <motion.figure
          className="mb-6 md:mb-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: E }}
          viewport={VP}
        >
          <blockquote className="rounded-2xl border border-[#e8e4dc]/90 bg-white/95 px-5 py-5 md:px-6 md:py-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] text-center">
            <p
              className="text-base md:text-[1.05rem] font-medium text-black leading-snug text-balance"
              style={serif}
            >
              &ldquo;{leadQuote}&rdquo;
            </p>
            {intro ? (
              <p className="mt-3 text-sm md:text-[0.95rem] text-gray-600 leading-relaxed max-w-[540px] mx-auto">
                {intro}
              </p>
            ) : null}
          </blockquote>
        </motion.figure>
      ) : null}

      <div>
        {sections.map((section, index) => (
          <InsightSection key={section.title} section={section} index={index} serif={serif} />
        ))}
      </div>

      {closing ? (
        <motion.div
          className="mt-10 md:mt-12 pt-10 border-t border-[#e8e4dc]/90 text-center max-w-[560px] mx-auto"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: E }}
          viewport={VP}
        >
          {closing.title ? (
            <h2
              className="text-[clamp(1.35rem,2.5vw,1.75rem)] font-bold text-black leading-snug mb-4"
              style={serif}
            >
              {closing.title}
            </h2>
          ) : null}
          <div className="space-y-4 text-base text-gray-600 leading-relaxed">
            {(closing.paragraphs || []).map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          {closing.signature ? (
            <p className="mt-6 text-sm text-[#8a8780] italic">{closing.signature}</p>
          ) : null}
        </motion.div>
      ) : null}
    </div>
  );
}
