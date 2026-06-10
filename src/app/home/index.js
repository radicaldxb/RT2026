"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import SoftBackground from "@/components/SoftBackground";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
  hover: { scale: 1.05, rotate: 1, transition: { type: "spring", stiffness: 300 } },
};

const desktopImages = [
  { src: "/logos/Kahulife-Logo.webp", link: "/portfolio/kahulife" },
  { src: "/logos/Tommy-Ellie-Logo.webp", link: "https://www.redbubble.com/people/Tommy-Ellie/shop" },
  { src: "/logos/FF-Logo.webp", link: "/portfolio/fluffyfriends" },
  { src: "/logos/Animal-Intelligence.svg", link: "/portfolio/animal-intelligence" },
  { src: "/logos/Coming-Soon.svg", link: "/portfolio", viewAll: true },
];

const mobileImages = [
  desktopImages[0],
  desktopImages[3],
  desktopImages[1],
  desktopImages[2],
  desktopImages[4],
];

const textFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({ opacity: 1, y: 0, transition: { delay: i * 0.3, duration: 0.6 } }),
};

const serif = { fontFamily: "'DM Serif Display', serif" };

export default function Home() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const router = useRouter();

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], [0, -80]);
  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);

  const formulaRef = useRef(null);
  const { scrollYProgress: formulaScroll } = useScroll({ target: formulaRef, offset: ["start end", "center center"] });
  const equationScale = useTransform(formulaScroll, [0, 1], [0.85, 1]);
  const equationOpacity = useTransform(formulaScroll, [0, 0.5], [0, 1]);

  const handleSubmit = () => {
    if (query.trim()) {
      router.push(`/chat?message=${encodeURIComponent(query)}`);
      setQuery("");
    } else {
      router.push("/chat");
    }
  };

  return (
    <main className="relative flex flex-col items-center w-full min-h-screen overflow-x-hidden">
      <Nav />
      <div className="fixed inset-0 z-0 pointer-events-none gradient-background">
        <SoftBackground />
      </div>

      {/* HERO */}
      <section
        id="chat"
        ref={heroRef}
        className="relative z-10 w-full min-h-[100svh] flex flex-col items-center justify-center text-center px-4 pt-24 pb-20 scroll-mt-24"
      >
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="z-10 w-full max-w-3xl space-y-6">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xs font-semibold tracking-[0.25em] uppercase text-[#8a8780]"
          >
            AI Native Agency, Dubai
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="text-[clamp(3rem,6.5vw,5.5rem)] font-bold leading-[1.04] tracking-tight text-black uppercase"
            style={serif}
          >
            We bring bold<br />ideas to life.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-[clamp(1rem,1.8vw,1.15rem)] text-gray-600 leading-relaxed max-w-[500px] mx-auto"
          >
            Every business started with one. A dream, a passion, something worth building. We make sure the formula that turns it into reality is actually working.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className={`flex items-center bg-white px-4 md:px-10 py-4 rounded-full w-full md:w-3/4 mx-auto border border-gray-300 transition-all duration-300 ${focused ? "shadow-lg" : "shadow-sm"}`}
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Tell us about your bold idea..."
              className="flex-1 text-sm md:text-lg bg-transparent outline-none text-black placeholder:text-gray-400"
            />
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-black text-white px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-widest hover:scale-105 active:scale-95 transition-transform duration-300 flex-shrink-0"
            >
              Talk to Us
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.0 }}>
            <a
              href="#roadmap"
              className="text-xs font-semibold uppercase tracking-[0.1em] text-black border-b border-black pb-[2px] hover:opacity-50 transition-opacity"
            >
              Get your free AI Roadmap
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.6 }}
            className="flex flex-col items-center gap-2 pt-12"
          >
            <span className="text-[0.6rem] uppercase tracking-[0.22em] text-[#8a8780]">Scroll to explore</span>
            <div className="rt-scroll-line" />
          </motion.div>
        </motion.div>
      </section>

      <div className="rt-divider" />

      {/* FORMULA */}
      <section id="formula" ref={formulaRef} className="relative z-10 w-full px-4 py-20 md:py-28 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <motion.span
            className="block text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-7"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            The Formula
          </motion.span>

          <motion.div style={{ scale: equationScale, opacity: equationOpacity }} className="text-center mb-2">
            <h2
              className="text-[clamp(2.8rem,7vw,5.5rem)] font-bold leading-[1.05] tracking-tight inline-block text-transparent bg-clip-text animate-gradient-loop uppercase"
              style={{ backgroundImage: "linear-gradient(90deg, #1ACDEB, #6B17DA, #E18949, #1ACDEB)", backgroundSize: "200% auto" }}
            >
              BI = C + Ex × T²
            </h2>
            <p className="text-xs tracking-[0.14em] uppercase text-[#8a8780] mt-1">
              Bold Ideas = Creative + Experience × Technology²
            </p>
          </motion.div>

          <motion.p
            className="text-[1.05rem] text-gray-600 leading-[1.85] max-w-[600px] mx-auto text-center mt-7 mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: true }}
          >
            Every bold idea that lands in the real world, the kind that actually changes how people feel, act, or buy, is the product of these three things working together. Most businesses have all three. They&apos;re just not connected.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                letter: "C",
                color: "#1ACDEB",
                category: "Creative",
                tag: "The dream",
                tagBg: "rgba(26,205,235,0.1)",
                title: "The idea. The dream. The passion.",
                body: "Every business starts here. A founder with a vision, something they want to create in the world. The creative spark is what makes your business worth building in the first place.",
              },
              {
                letter: "Ex",
                color: "#E18949",
                category: "Experience",
                tag: "The reality",
                tagBg: "rgba(225,137,73,0.1)",
                title: "The feeling your customer actually has.",
                body: "The pain, the stress, the delight, the loyalty. Every touchpoint is either proving your bold idea is real, or quietly undermining it. Most businesses have never mapped the gap.",
              },
              {
                letter: "T²",
                color: "#6B17DA",
                category: "Technology",
                tag: "The amplifier",
                tagBg: "rgba(107,23,218,0.08)",
                title: "The amplifier. For better or worse.",
                body: "Your CRM, website, app, AI, social media. Technology does not fix the gap between your dream and your customer's reality. It amplifies whatever is already there.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={textFadeIn}
                initial="hidden"
                whileInView="visible"
                custom={i + 1}
                viewport={{ once: true }}
                whileHover={{ y: -5, boxShadow: "0 20px 50px rgba(0,0,0,0.09)", transition: { type: "spring", stiffness: 300 } }}
                className="bg-white rounded-2xl px-8 py-9 relative overflow-hidden"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)", border: "0.5px solid rgba(232,228,220,0.9)" }}
              >
                <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: item.color }} />
                <p className="font-bold text-[3rem] leading-none mb-4" style={{ ...serif, color: item.color }}>{item.letter}</p>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8a8780] mb-2">{item.category}</p>
                <h3 className="text-[1.2rem] font-bold mb-3 leading-snug text-black uppercase tracking-tight" style={serif}>{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{item.body}</p>
                <span className="inline-block text-[0.6rem] font-semibold uppercase tracking-[0.12em] rounded-full px-3 py-1" style={{ background: item.tagBg, color: item.color }}>{item.tag}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AHA MOMENT */}
      <div
        className="relative z-10 py-20 md:py-24 px-4 text-center"
        style={{
          background: "linear-gradient(135deg,rgba(26,205,235,0.05),rgba(107,23,218,0.05),rgba(225,137,73,0.05))",
          borderTop: "0.5px solid #e8e4dc",
          borderBottom: "0.5px solid #e8e4dc",
        }}
      >
        <div className="max-w-3xl mx-auto">
          <motion.blockquote
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85 }}
            viewport={{ once: true }}
            className="text-[clamp(1.5rem,3.2vw,2.4rem)] font-bold leading-snug text-black mb-5 uppercase tracking-tight"
            style={{ ...serif, fontStyle: "italic" }}
          >
            &ldquo;When these three things are not designed together, technology does not solve the problem. It scales it.&rdquo;
          </motion.blockquote>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: true }}
            className="text-base text-gray-600 leading-relaxed"
          >
            Most digital transformations fail not because the tools were wrong, but because the tools were built on top of a business that was already misaligned. You scaled the disconnect.
          </motion.p>
        </div>
      </div>

      {/* HOW WE WORK */}
      <section id="how" className="relative z-10 w-full px-4 py-20 md:py-28 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <motion.span
            className="block text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            How We Work
          </motion.span>

          <motion.h2
            className="text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.1] tracking-tight text-black mb-3 uppercase"
            style={serif}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
          >
            We start inside the box.
          </motion.h2>

          <motion.p
            className="text-base text-gray-600 leading-relaxed max-w-[600px] mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Anyone can think outside the box. The hard work is understanding what is inside it first. The people, the processes, the gaps between intention and reality. That is where the real opportunity lives.
          </motion.p>

          <div>
            {[
              {
                num: "01",
                color: "#1ACDEB",
                title: "We map the gap.",
                body: "We look at your business from the inside. What does your bold idea intend to deliver? What does your customer actually experience? Where are the disconnects between the dream and the daily reality? This is not a technology audit. It is a reality audit.",
              },
              {
                num: "02",
                color: "#E18949",
                title: "We build the bridge.",
                body: "Once we know where the gap is, we figure out what closes it. Sometimes that is an AI agent. Sometimes a platform, a content system, or a brand overhaul. The service does not matter. The outcome does. We build it properly so it lasts.",
              },
              {
                num: "03",
                color: "#6B17DA",
                title: "We keep it honest.",
                body: "AI capability resets every few months. Your business evolves. What you built in January needs rethinking by June. We stay alongside you as both change, so your technology keeps amplifying the right things.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="grid gap-8 md:gap-12 py-10 border-b border-[#e8e4dc] md:grid-cols-[100px_1fr]"
                style={{ borderTop: i === 0 ? "0.5px solid #e8e4dc" : "none" }}
              >
                <p className="text-[3.5rem] md:text-[4rem] font-bold leading-none" style={{ ...serif, color: item.color }}>{item.num}</p>
                <div className="pt-1">
                  <h3 className="text-[1.2rem] font-semibold text-black mb-2 tracking-tight uppercase">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed max-w-[520px]">{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="rt-divider" />

      {/* PLAYBOOK */}
      <section id="playbook" className="relative z-10 w-full px-4 py-20 md:py-28 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="max-w-[600px] mb-16"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <span className="block text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-5">The Playbook</span>
            <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.1] tracking-tight text-black mb-3 uppercase" style={serif}>
              One process. Three steps. No shortcuts.
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              Whether you are building an AI agent, a digital platform, a brand, or a media production, the process is the same. Because the problem is always the same: intention and reality are out of alignment.
            </p>
          </motion.div>

          <div className="relative">
            <div className="pb-line hidden md:block" />

            {[
              {
                num: "1",
                color: "#1ACDEB",
                bg: "rgba(26,205,235,0.1)",
                label: "Step 1: The Audit",
                title: "Find the real problem.",
                body: "We spend time inside your operation. We talk to your team, your customers, and your data. We map what your business intends to deliver versus what it actually delivers at every touchpoint. Then we tell you honestly where AI can close the gap and where it cannot.",
                what: "You walk away with a prioritised action plan built around your reality, not a generic template. Fixed price. Fixed timeframe. No surprises.",
                cta: "Start with the Audit",
              },
              {
                num: "2",
                color: "#E18949",
                bg: "rgba(225,137,73,0.1)",
                label: "Step 2: The Build",
                title: "Build it properly. Not a pilot.",
                body: "We take the top priority from the Audit and build it to production standard. Not a demo. Not a proof of concept. Something your team uses every day, documented, and built to survive the next model update. The medium depends on the gap.",
                what: "30 days. Fixed price. One thing done right, running in your business.",
                cta: "Talk about the Build",
              },
              {
                num: "3",
                color: "#6B17DA",
                bg: "rgba(107,23,218,0.08)",
                label: "Step 3: The Retainer",
                title: "Stay ahead. Not catch up.",
                body: "The AI landscape resets every few months. New models, new capabilities, new ways to close gaps you did not know existed. The businesses that win are not the ones who built something once. They are the ones with a partner continuously asking if they are still building the right thing.",
                what: "Monthly capability review. Quarterly upgrades. Direct access when something changes or breaks. Cancel anytime.",
                cta: "Ask about the Retainer",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="relative z-10 grid gap-6 md:gap-8 pb-14 md:grid-cols-[56px_1fr]"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 relative z-10"
                  style={{ ...serif, background: item.bg, color: item.color }}
                >
                  {item.num}
                </div>
                <div className="pt-3">
                  <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.18em] mb-2" style={{ color: item.color }}>{item.label}</span>
                  <h3 className="text-[1.75rem] font-bold leading-[1.1] text-black mb-3 uppercase tracking-tight" style={serif}>{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed max-w-[520px] mb-4">{item.body}</p>
                  <p className="text-sm font-semibold text-gray-600 border-l-2 pl-4 leading-relaxed" style={{ borderColor: item.color }}>{item.what}</p>
                  <Link
                    href="/chat"
                    className="inline-flex items-center gap-1.5 mt-5 text-xs font-semibold uppercase tracking-widest px-5 py-3 rounded-full text-white hover:opacity-85 transition-opacity"
                    style={{ background: item.color }}
                  >
                    {item.cta} →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="rt-divider" />

      {/* WORK */}
      <section id="work" className="relative z-10 w-full px-4 py-20 md:py-28 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="flex items-end justify-between mb-8 flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div>
              <span className="block text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-2">Ideas That We Made Real</span>
              <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-black tracking-tight uppercase" style={serif}>Proof, not promises.</h2>
            </div>
            <Link href="/portfolio" className="text-xs font-semibold uppercase tracking-widest text-black border-b border-black pb-[2px] hover:opacity-50 transition-opacity">
              All Work
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { logo: "/logos/Kahulife-Logo.webp", href: "/portfolio/kahulife", alt: "Kahulife" },
              { logo: "/logos/FF-Logo.webp", href: "/portfolio/fluffyfriends", alt: "FluffyFriends" },
              { logo: "/logos/Animal-Intelligence.svg", href: "/portfolio/animal-intelligence", alt: "Animal Intelligence" },
              { logo: "/logos/Tommy-Ellie-Logo.webp", href: "https://www.redbubble.com/people/Tommy-Ellie/shop", alt: "Tommy & Ellie" },
              { logo: null, href: "/portfolio/microsoft-ai", alt: "Microsoft AI", label: "Microsoft AI" },
              { logo: null, href: null, alt: "Coming Soon", label: "Coming Soon", muted: true },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={textFadeIn}
                initial="hidden"
                whileInView="visible"
                custom={i + 1}
                viewport={{ once: true }}
                whileHover={item.href ? { y: -4, boxShadow: "0 18px 44px rgba(0,0,0,0.09)", transition: { type: "spring", stiffness: 300 } } : {}}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="bg-white rounded-2xl aspect-[4/3] flex items-center justify-center p-6"
                    style={{ border: "0.5px solid rgba(232,228,220,0.9)", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}
                  >
                    {item.logo ? (
                      <Image src={item.logo} alt={item.alt} width={160} height={100} className="max-w-[65%] max-h-[55%] object-contain" />
                    ) : (
                      <span className="text-sm font-semibold uppercase tracking-wide text-gray-600">{item.label}</span>
                    )}
                  </Link>
                ) : (
                  <div className="bg-white rounded-2xl aspect-[4/3] flex items-center justify-center p-6" style={{ border: "0.5px dashed #e8e4dc" }}>
                    <span className="text-sm font-semibold uppercase tracking-wide text-gray-400">{item.label}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="rt-divider" />

      {/* AGENT */}
      <section id="agent" className="relative z-10 w-full px-4 py-20 md:py-28 scroll-mt-24">
        <div className="max-w-[700px] mx-auto text-center">
          <motion.span
            className="block text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-5"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Talk to Us
          </motion.span>

          <motion.h2
            className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.2] text-black mb-4 uppercase tracking-tight"
            style={serif}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Tell me about your bold idea.<br />Where is it today versus<br />where you intended it to be?
          </motion.h2>

          <motion.p
            className="text-base text-gray-600 leading-relaxed mb-10 max-w-[440px] mx-auto"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Our agent thinks the way we do. Ask it anything about your business, your challenge, or where to start. It will tell you honestly what it thinks.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            whileHover={{ y: -4, boxShadow: "0 36px 90px rgba(0,0,0,0.2)", transition: { type: "spring", stiffness: 250 } }}
          >
            <Link href="/chat" className="block rounded-2xl overflow-hidden" style={{ boxShadow: "0 24px 70px rgba(0,0,0,0.14)" }}>
              <div className="flex items-center gap-2 px-4 py-3" style={{ background: "#181818" }}>
                <span className="w-3.5 h-3.5 rounded-full bg-[#ff5f57]" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#28ca41]" />
                <span className="ml-2 font-mono text-xs text-[#4a4a4a]">Radical Thinking / Agent</span>
              </div>
              <div className="p-6 md:p-8 text-left" style={{ background: "#0d0d0d" }}>
                <p className="font-mono text-sm text-[#6b6b6b] mb-1">Radical Thinking. AI Native Agency, Dubai.</p>
                <p className="font-mono text-base md:text-lg text-white leading-relaxed mt-5 mb-4" style={{ ...serif, fontStyle: "italic" }}>
                  &ldquo;Tell me about your bold idea. Where is it today versus where you intended it to be?&rdquo;
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <span className="text-[#28ca41] font-mono text-base">›</span>
                  <span className="font-mono text-sm text-[#6b6b6b]">Start typing your answer...</span>
                  <span className="rt-cursor" />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FREE ROADMAP */}
      <div
        id="roadmap"
        className="relative z-10 scroll-mt-24"
        style={{
          padding: "7rem 1rem",
          borderTop: "0.5px solid #e8e4dc",
          borderBottom: "0.5px solid #e8e4dc",
          background: "linear-gradient(160deg,rgba(26,205,235,0.04),rgba(107,23,218,0.04),rgba(225,137,73,0.04))",
        }}
      >
        <div className="max-w-[540px] mx-auto text-center">
          <motion.span
            className="block text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-5"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Free
          </motion.span>

          <motion.h2
            className="text-[clamp(2rem,3.5vw,2.75rem)] font-bold leading-[1.1] text-black mb-4 uppercase tracking-tight"
            style={serif}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Get your free AI Roadmap.
          </motion.h2>

          <motion.p
            className="text-base text-gray-600 leading-relaxed mb-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Not ready for a full conversation? Answer three questions and we will send you a personalised map of where AI can create real value in your business. No commitment, no sales call.
          </motion.p>

          <motion.div
            className="flex flex-col gap-3 text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <input type="text" placeholder="Your name" className="w-full bg-white border border-gray-300 rounded-full px-6 py-4 text-sm outline-none focus:border-gray-500 focus:shadow-md transition-all" />
            <input type="email" placeholder="Your email" className="w-full bg-white border border-gray-300 rounded-full px-6 py-4 text-sm outline-none focus:border-gray-500 focus:shadow-md transition-all" />
            <input type="text" placeholder="Describe your business in one sentence" className="w-full bg-white border border-gray-300 rounded-full px-6 py-4 text-sm outline-none focus:border-gray-500 focus:shadow-md transition-all" />
            <button type="button" className="w-full bg-black text-white rounded-full py-4 text-xs font-semibold uppercase tracking-widest mt-2 hover:opacity-85 active:scale-95 transition-all">
              Send me my Roadmap
            </button>
            <p className="text-center text-xs uppercase tracking-widest text-[#8a8780] mt-2">Delivered to your inbox in minutes.</p>
          </motion.div>
        </div>
      </div>

      {/* INSIGHTS */}
      <section id="insights" className="relative z-10 w-full px-4 py-20 md:py-28 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="flex items-end justify-between mb-10 flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div>
              <span className="block text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-2">Radical Insights</span>
              <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-black tracking-tight uppercase" style={serif}>
                One sharp idea, every Monday.
              </h2>
            </div>
            <Link href="/insights" className="text-xs font-semibold uppercase tracking-widest text-black border-b border-black pb-[2px] hover:opacity-50 transition-opacity">
              All Insights
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { date: "20 Apr 2026", title: "What Actually Works", desc: "Start small. Measure obsessively. Rebuild instead of retrofit. Push through Month 2.", slug: "what-actually-works", image: "/Images/insights/ai-that-works.webp", tags: ["Strategy", "AI Transformation"] },
              { date: "13 Apr 2026", title: "Why Most AI Rollouts Fail", desc: "Most companies are automating broken things instead of replacing them.", slug: "why-most-ai-rollouts-fail", image: "/Images/insights/ai-fail.webp", tags: ["Strategy", "AI Transformation"] },
              { date: "06 Apr 2026", title: "The Agency Is Not the Answer Anymore", desc: "The traditional agency model is breaking. Own your capability instead.", slug: "the-agency-is-not-the-answer-anymore", image: "/Images/insights/agency.webp", tags: ["Strategy", "Future of Work"] },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={textFadeIn}
                initial="hidden"
                whileInView="visible"
                custom={i + 1}
                viewport={{ once: true }}
                whileHover={{ y: -5, boxShadow: "0 18px 44px rgba(0,0,0,0.1)", transition: { type: "spring", stiffness: 300 } }}
              >
                <Link
                  href={`/insights/${item.slug}`}
                  className="block bg-white rounded-2xl overflow-hidden"
                  style={{ border: "0.5px solid rgba(232,228,220,0.9)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
                >
                  <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
                    <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <span className="block text-xs uppercase tracking-[0.12em] text-[#8a8780] mb-2">{item.date}</span>
                    <h3 className="text-lg font-bold text-black mb-2 leading-snug tracking-tight uppercase" style={serif}>{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">{item.desc}</p>
                    <div className="flex gap-2 flex-wrap">
                      {item.tags.map((t) => (
                        <span key={t} className="text-[0.6rem] font-semibold uppercase tracking-widest text-gray-600 border border-gray-200 rounded-full px-2.5 py-1">{t}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RADICAL CLOSING — unchanged */}
      <section id="radical" className="relative z-10 w-full flex justify-center items-center px-4 py-20 scroll-mt-24">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }} viewport={{ once: true }} className="w-full max-w-7xl rounded-[54px] px-6 md:px-20 py-16 text-center flex flex-col md:flex-row items-center justify-between gap-10" style={{ background: "linear-gradient(270deg, #E6FFFF 0%, #CCDEFF 52%, #EFF4FA 100%)" }}>
          <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} className="text-[72px] md:text-[96px] font-bold leading-none text-black">
            <div className="flex justify-center">
              <Image src="/logos/RT-Logo-New.svg" alt="RT Logo" width={112} height={112} className="w-20 h-20 md:w-28 md:h-28" />
            </div>
          </motion.div>

          <motion.div initial={{ x: 50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.2, ease: "easeOut" }} className="text-black text-lg md:text-xl leading-relaxed max-w-4xl text-center">
            <p className="mb-6">
              Let's be honest, chasing the latest shiny tech trend is a full-time job. Good thing it's our full-time job. AI isn't a trend we spotted — it's the moment the tools finally caught up with how we've always worked. Fast, lean, and built to make bold ideas land. We took it apart, figured it out, and put it at the centre of everything. Not to survive the change. To be the reason our clients lead it.
            </p>
            <p className="font-bold text-lg">Radical Thinking</p>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
