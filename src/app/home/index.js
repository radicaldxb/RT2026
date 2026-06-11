"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import SoftBackground from "@/components/SoftBackground";

// Spring easing used throughout
const E = [0.16, 1, 0.3, 1];

// Viewport — elements animate when 100px inside the viewport
// once: false means they re-animate when scrolled back into view
const VP = { once: false, margin: "0px 0px -100px 0px" };
const VP1 = { once: true, margin: "0px 0px -100px 0px" };

const serif = { fontFamily: "HelveticaNeue, sans-serif" };

export default function Home() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const router = useRouter();

  // Hero scroll-linked parallax
  const heroRef = useRef(null);
  const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroP, [0, 1], [0, -120]);
  const heroOp = useTransform(heroP, [0, 0.65], [1, 0]);

  // Formula equation scroll-linked scale
  const formulaRef = useRef(null);
  const { scrollYProgress: fP } = useScroll({ target: formulaRef, offset: ["start end", "center center"] });
  const eqScale = useTransform(fP, [0, 1], [0.7, 1]);
  const eqOp = useTransform(fP, [0, 0.55], [0, 1]);

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
      <div className="fixed inset-0 z-0 pointer-events-none gradient-background">
        <SoftBackground />
      </div>

      <Nav />

      {/* ── HERO ── */}
      <section
        id="chat"
        ref={heroRef}
        className="relative z-10 w-full min-h-[100svh] flex flex-col items-center justify-center text-center px-4 pt-24 pb-20 scroll-mt-24"
      >
        <motion.div
          style={{ y: heroY, opacity: heroOp }}
          className="z-10 w-full max-w-3xl flex flex-col items-center gap-6"
        >
          <motion.p
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.2, ease: E }}
            className="text-xs font-semibold tracking-[0.25em] uppercase text-[#8a8780]"
          >
            AI Native Agency
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.35, ease: E }}
            className="text-[clamp(3rem,6.5vw,5.5rem)] font-bold leading-[1.04] tracking-tight text-black"
            style={serif}
          >
            We bring bold<br />ideas to life.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.55, ease: E }}
            className="text-[clamp(1rem,1.8vw,1.15rem)] text-gray-600 leading-relaxed max-w-[500px]"
          >
            Every business started with one. A dream, a passion, something worth building. We make sure the formula that turns it into reality is actually working.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.72, ease: E }}
            className="w-full md:w-3/4"
          >
            <button
              type="button"
              onClick={handleSubmit}
              className="md:hidden w-full bg-black text-white px-6 py-4 rounded-full text-xs font-semibold uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-transform duration-300"
            >
              Talk to Us
            </button>
            <div
              className={`hidden md:flex items-center bg-white px-10 py-4 rounded-full border border-gray-300 transition-all duration-300 ${focused ? "shadow-lg" : "shadow-sm"}`}
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Tell us about your bold idea..."
                className="flex-1 text-lg bg-transparent outline-none text-black placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-black text-white px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-widest hover:scale-105 active:scale-95 transition-transform duration-300 flex-shrink-0"
              >
                Talk to Us
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9, ease: E }}
          >
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
            transition={{ duration: 1, delay: 1.6, ease: E }}
            className="flex flex-col items-center gap-2 pt-10"
          >
            <span className="text-[0.6rem] uppercase tracking-[0.22em] text-[#8a8780]">Scroll to explore</span>
            <div className="rt-scroll-line" />
          </motion.div>
        </motion.div>
      </section>

      <div className="rt-divider" />

      {/* ── FORMULA ──
          Label: blur in
          Equation: scroll-linked scale (tied to scroll position, not viewport trigger)
          Intro: rises from below
          C card: arrives from left
          Ex card: rises from below (center)
          T² card: arrives from right
          They assemble the equation visually
      */}
      <section
        id="formula"
        ref={formulaRef}
        className="relative z-10 w-full px-4 py-20 md:py-28 scroll-mt-24"
      >
        <div className="max-w-6xl mx-auto">

          <motion.span
            className="block text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-7"
            initial={{ opacity: 0, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: E }}
            viewport={VP}
          >
            The Formula
          </motion.span>

          {/* Scroll-linked — tied directly to scroll position */}
          <motion.div style={{ scale: eqScale, opacity: eqOp }} className="text-center mb-2">
            <h2
              className="text-[clamp(2.8rem,7vw,5.5rem)] font-bold leading-[1.05] tracking-tight inline-block text-transparent bg-clip-text animate-gradient-loop"
              style={{
                backgroundImage: "linear-gradient(90deg, #1ACDEB, #6B17DA, #E18949, #1ACDEB)",
                backgroundSize: "200% auto",
              }}
            >
              BI = C + Ex × T²
            </h2>
            <p className="text-xs tracking-[0.14em] uppercase text-[#8a8780] mt-1">
              Bold Ideas = Creative + Experience × Technology²
            </p>
          </motion.div>

          <motion.p
            className="text-[1.05rem] text-gray-600 leading-[1.85] max-w-[600px] mx-auto text-center mt-7 mb-14"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: E }}
            viewport={VP}
          >
            Every bold idea that lands in the real world, the kind that actually changes how people feel, act, or buy, is the product of these three things working together. Most businesses have all three. They are just not connected.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {/* C — from left */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: E }}
              viewport={VP}
              whileHover={{ y: -6, boxShadow: "0 24px 56px rgba(0,0,0,0.1)", transition: { type: "spring", stiffness: 300 } }}
              className="bg-white rounded-2xl px-8 py-9 relative overflow-hidden"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)", border: "0.5px solid rgba(232,228,220,0.9)" }}
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: "#1ACDEB" }} />
              <p className="font-bold text-[3rem] leading-none mb-4" style={{ ...serif, color: "#1ACDEB" }}>C</p>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8a8780] mb-2">Creative</p>
              <h3 className="text-[1.2rem] font-bold mb-3 leading-snug text-black" style={serif}>The idea. The dream. The passion.</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">Every business starts here. A founder with a vision, something they want to create in the world. The creative spark is what makes your business worth building in the first place.</p>
              <span className="inline-block text-[0.6rem] font-semibold uppercase tracking-[0.12em] rounded-full px-3 py-1" style={{ background: "rgba(26,205,235,0.1)", color: "#1ACDEB" }}>The dream</span>
            </motion.div>

            {/* Ex — from below */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: E }}
              viewport={VP}
              whileHover={{ y: -6, boxShadow: "0 24px 56px rgba(0,0,0,0.1)", transition: { type: "spring", stiffness: 300 } }}
              className="bg-white rounded-2xl px-8 py-9 relative overflow-hidden"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)", border: "0.5px solid rgba(232,228,220,0.9)" }}
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: "#E18949" }} />
              <p className="font-bold text-[3rem] leading-none mb-4" style={{ ...serif, color: "#E18949" }}>Ex</p>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8a8780] mb-2">Experience</p>
              <h3 className="text-[1.2rem] font-bold mb-3 leading-snug text-black" style={serif}>The feeling your customer actually has.</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">The pain, the stress, the delight, the loyalty. Every touchpoint is either proving your bold idea is real, or quietly undermining it. Most businesses have never mapped the gap.</p>
              <span className="inline-block text-[0.6rem] font-semibold uppercase tracking-[0.12em] rounded-full px-3 py-1" style={{ background: "rgba(225,137,73,0.1)", color: "#E18949" }}>The reality</span>
            </motion.div>

            {/* T² — from right */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: E }}
              viewport={VP}
              whileHover={{ y: -6, boxShadow: "0 24px 56px rgba(0,0,0,0.1)", transition: { type: "spring", stiffness: 300 } }}
              className="bg-white rounded-2xl px-8 py-9 relative overflow-hidden"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)", border: "0.5px solid rgba(232,228,220,0.9)" }}
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: "#6B17DA" }} />
              <p className="font-bold text-[3rem] leading-none mb-4" style={{ ...serif, color: "#6B17DA" }}>T²</p>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8a8780] mb-2">Technology</p>
              <h3 className="text-[1.2rem] font-bold mb-3 leading-snug text-black" style={serif}>The amplifier. For better or worse.</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">Your CRM, website, app, AI, social media. Technology does not fix the gap between your dream and your customer's reality. It amplifies whatever is already there.</p>
              <span className="inline-block text-[0.6rem] font-semibold uppercase tracking-[0.12em] rounded-full px-3 py-1" style={{ background: "rgba(107,23,218,0.08)", color: "#6B17DA" }}>The amplifier</span>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── AHA MOMENT ──
          Quote: large rise from below
          Body: follows after
      */}
      <div
        className="relative z-10 py-20 md:py-24 px-4 text-center w-full"
        style={{
          background: "linear-gradient(135deg,rgba(26,205,235,0.05),rgba(107,23,218,0.05),rgba(225,137,73,0.05))",
          borderTop: "0.5px solid #e8e4dc",
          borderBottom: "0.5px solid #e8e4dc",
        }}
      >
        <div className="max-w-3xl mx-auto">
          <motion.blockquote
            className="text-[clamp(1.5rem,3.2vw,2.4rem)] font-bold leading-snug text-black mb-5"
            style={{ ...serif, fontStyle: "italic" }}
            initial={{ opacity: 0, y: 56 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: E }}
            viewport={VP}
          >
            "When these three things are not designed together, technology does not solve the problem. It scales it."
          </motion.blockquote>
          <motion.p
            className="text-base text-gray-600 leading-relaxed"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: E }}
            viewport={VP}
          >
            Most digital transformations fail not because the tools were wrong, but because the tools were built on top of a business that was already misaligned. You scaled the disconnect.
          </motion.p>
        </div>
      </div>

      {/* ── HOW WE WORK ──
          Label: blur in
          Headline: from below
          Rows: slide from LEFT, staggered one after another
      */}
      <section id="how" className="relative z-10 w-full px-4 py-20 md:py-28 scroll-mt-24">
        <div className="max-w-6xl mx-auto">

          <motion.span
            className="block text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-5"
            initial={{ opacity: 0, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: E }}
            viewport={VP}
          >
            How We Work
          </motion.span>

          <motion.h2
            className="text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.1] tracking-tight text-black mb-3"
            style={serif}
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: E }}
            viewport={VP}
          >
            We start inside the box.
          </motion.h2>

          <motion.p
            className="text-base text-gray-600 leading-relaxed max-w-[600px] mb-16"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: E }}
            viewport={VP}
          >
            Anyone can think outside the box. The hard work is understanding what is inside it first. The people, the processes, the gaps between intention and reality. That is where the real opportunity lives.
          </motion.p>

          <div>
            {[
              {
                num: "01", color: "#1ACDEB",
                title: "We map the gap.",
                body: "We look at your business from the inside. What does your bold idea intend to deliver? What does your customer actually experience? Where are the disconnects between the dream and the daily reality? This is not a technology audit. It is a reality audit.",
              },
              {
                num: "02", color: "#E18949",
                title: "We build the bridge.",
                body: "Once we know where the gap is, we figure out what closes it. Sometimes that is an AI agent. Sometimes a platform, a content system, or a brand overhaul. The service does not matter. The outcome does. We build it properly so it lasts.",
              },
              {
                num: "03", color: "#6B17DA",
                title: "We keep it honest.",
                body: "AI capability resets every few months. Your business evolves. What you built in January needs rethinking by June. We stay alongside you as both change, so your technology keeps amplifying the right things.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -64 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.85, delay: i * 0.14, ease: E }}
                viewport={{ once: false, margin: "0px 0px -80px 0px" }}
                className="grid py-10 border-b border-[#e8e4dc]"
                style={{
                  gridTemplateColumns: "100px 1fr",
                  gap: "2rem 3rem",
                  borderTop: i === 0 ? "0.5px solid #e8e4dc" : "none",
                }}
              >
                <p className="text-[3.5rem] md:text-[4rem] font-bold leading-none" style={{ ...serif, color: item.color }}>{item.num}</p>
                <div className="pt-1">
                  <h3 className="text-[1.2rem] font-semibold text-black mb-2 tracking-tight">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed max-w-[520px]">{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <div className="rt-divider" />

      {/* ── PLAYBOOK ──
          Intro: from below
          Steps: arrive from RIGHT (opposite to How We Work — creates rhythm)
      */}
      <section id="playbook" className="relative z-10 w-full px-4 py-20 md:py-28 scroll-mt-24">
        <div className="max-w-6xl mx-auto">

          <motion.div
            className="max-w-[600px] mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: E }}
            viewport={VP}
          >
            <span className="block text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-5">The Playbook</span>
            <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.1] tracking-tight text-black mb-3" style={serif}>
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
                num: "1", color: "#1ACDEB", bg: "rgba(26,205,235,0.1)",
                label: "Step 1: The Audit",
                title: "Find the real problem.",
                body: "We spend time inside your operation. We talk to your team, your customers, and your data. We map what your business intends to deliver versus what it actually delivers at every touchpoint. Then we tell you honestly where AI can close the gap and where it cannot.",
                what: "You walk away with a prioritised action plan built around your reality, not a generic template. Fixed price. Fixed timeframe. No surprises.",
                cta: "Start with the Audit",
              },
              {
                num: "2", color: "#E18949", bg: "rgba(225,137,73,0.1)",
                label: "Step 2: The Build",
                title: "Build it properly. Not a pilot.",
                body: "We take the top priority from the Audit and build it to production standard. Not a demo. Not a proof of concept. Something your team uses every day, documented, and built to survive the next model update. The medium depends on the gap.",
                what: "30 days. Fixed price. One thing done right, running in your business.",
                cta: "Talk about the Build",
              },
              {
                num: "3", color: "#6B17DA", bg: "rgba(107,23,218,0.08)",
                label: "Step 3: The Retainer",
                title: "Stay ahead. Not catch up.",
                body: "The AI landscape resets every few months. New models, new capabilities, new ways to close gaps you did not know existed. The businesses that win are not the ones who built something once. They are the ones with a partner continuously asking if they are still building the right thing.",
                what: "Monthly capability review. Quarterly upgrades. Direct access when something changes or breaks. Cancel anytime.",
                cta: "Ask about the Retainer",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 64 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.85, delay: i * 0.12, ease: E }}
                viewport={{ once: false, margin: "0px 0px -80px 0px" }}
                className="relative z-10 grid pb-14"
                style={{ gridTemplateColumns: "56px 1fr", gap: "1.5rem 2rem" }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 relative z-10"
                  style={{ ...serif, background: item.bg, color: item.color }}
                >
                  {item.num}
                </div>
                <div className="pt-3">
                  <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.18em] mb-2" style={{ color: item.color }}>{item.label}</span>
                  <h3 className="text-[1.75rem] font-bold leading-[1.1] text-black mb-3" style={serif}>{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed max-w-[520px] mb-4">{item.body}</p>
                  <p className="text-sm font-semibold text-gray-600 border-l-2 pl-4 leading-relaxed" style={{ borderColor: item.color }}>{item.what}</p>
                  <Link
                    href="/chat"
                    className="inline-flex items-center gap-1.5 mt-5 text-xs font-semibold uppercase tracking-widest px-5 py-3 rounded-full text-white hover:opacity-85 transition-opacity"
                    style={{ background: item.color }}
                  >
                    {item.cta}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <div className="rt-divider" />

      {/* ── WORK ──
          Header: from below
          Cards: wave from below, each one slightly more delayed
      */}
      <section id="work" className="relative z-10 w-full px-4 py-20 md:py-28 scroll-mt-24">
        <div className="max-w-6xl mx-auto">

          <motion.div
            className="flex items-end justify-between mb-8 flex-wrap gap-4"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: E }}
            viewport={VP}
          >
            <div>
              <span className="block text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-2">Ideas That We Made Real</span>
              <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-black tracking-tight" style={serif}>Proof, not promises.</h2>
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
              { logo: null, href: null, alt: "Coming Soon", label: "Coming Soon" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 + i * 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.07, ease: E }}
                viewport={VP}
                whileHover={item.href ? { y: -5, transition: { type: "spring", stiffness: 300 } } : {}}
                className={item.href ? "rounded-2xl" : undefined}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="bg-white rounded-2xl aspect-[4/3] relative flex items-center justify-center p-3 md:p-4 block border border-[#e8e4dc]/90 shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_18px_44px_rgba(0,0,0,0.09)] transition-shadow duration-300"
                  >
                    {item.logo ? (
                      <div className="relative w-full h-full">
                        <Image src={item.logo} alt={item.alt} fill className="object-contain" sizes="(max-width: 768px) 45vw, 18vw" />
                      </div>
                    ) : (
                      <span className="text-sm font-semibold uppercase tracking-wide text-gray-500">{item.label}</span>
                    )}
                  </Link>
                ) : (
                  <div className="bg-white rounded-2xl aspect-[4/3] flex items-center justify-center p-3 md:p-4" style={{ border: "0.5px dashed #e8e4dc" }}>
                    <span className="text-sm font-semibold uppercase tracking-wide text-gray-300">{item.label}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <div className="rt-divider" />

      {/* ── AGENT ──
          Label: blur in
          Headline: large rise from below
          Terminal: surfaces from far below — feels like it rises up
      */}
      <section id="agent" className="relative z-10 w-full px-4 py-20 md:py-28 scroll-mt-24">
        <div className="max-w-[700px] mx-auto text-center">

          <motion.span
            className="block text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-5"
            initial={{ opacity: 0, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: E }}
            viewport={VP}
          >
            Talk to Us
          </motion.span>

          <motion.h2
            className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.2] text-black mb-4"
            style={serif}
            initial={{ opacity: 0, y: 56 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.1, ease: E }}
            viewport={VP}
          >
            Tell us about your bold idea.
          </motion.h2>

          <motion.p
            className="text-base text-gray-600 leading-relaxed mb-10 max-w-[440px] mx-auto"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: E }}
            viewport={VP}
          >
            Our agent thinks the way we do. Ask it anything about your business, your challenge, or where to start. It will tell you honestly what it thinks.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: E }}
            viewport={VP}
            whileHover={{ y: -5, boxShadow: "0 40px 100px rgba(0,0,0,0.22)", transition: { type: "spring", stiffness: 200 } }}
          >
            <Link href="/chat" className="block rounded-2xl overflow-hidden" style={{ boxShadow: "0 24px 70px rgba(0,0,0,0.14)" }}>
              <div className="flex items-center gap-2 px-4 py-3" style={{ background: "#181818" }}>
                <span className="w-3.5 h-3.5 rounded-full bg-[#ff5f57]" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#28ca41]" />
                <span className="ml-2 font-mono text-xs text-[#4a4a4a]">Radical Thinking / Agent</span>
              </div>
              <div className="p-6 md:p-8 text-left" style={{ background: "#0d0d0d" }}>
                <p className="font-mono text-sm text-[#555] mb-1">Radical Thinking. AI Native Agency.</p>
                <p className="text-base md:text-lg text-white leading-relaxed mt-5 mb-4" style={serif}>
                  "Tell us about your bold idea."
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <span className="text-[#28ca41] font-mono text-base">›</span>
                  <span className="font-mono text-sm text-[#555]">Start typing your answer...</span>
                  <span className="rt-cursor" />
                </div>
              </div>
            </Link>
          </motion.div>

        </div>
      </section>

      {/* ── FREE ROADMAP ──
          Form inputs arrive one by one as you scroll
      */}
      <div
        id="roadmap"
        className="relative z-10 w-full px-4 py-20 md:py-28 scroll-mt-24"
        style={{
          borderTop: "0.5px solid #e8e4dc",
          borderBottom: "0.5px solid #e8e4dc",
          background: "linear-gradient(160deg,rgba(26,205,235,0.04),rgba(107,23,218,0.04),rgba(225,137,73,0.04))",
        }}
      >
        <div className="max-w-[540px] mx-auto text-center">

          <motion.span
            className="block text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-5"
            initial={{ opacity: 0, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: E }}
            viewport={VP}
          >
            Free
          </motion.span>

          <motion.h2
            className="text-[clamp(2rem,3.5vw,2.75rem)] font-bold leading-[1.1] text-black mb-4"
            style={serif}
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: E }}
            viewport={VP}
          >
            Get your free AI Roadmap.
          </motion.h2>

          <motion.p
            className="text-base text-gray-600 leading-relaxed mb-10"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: E }}
            viewport={VP}
          >
            Not ready for a full conversation? Answer three questions and we will send you a personalised map of where AI can create real value in your business. No commitment, no sales call.
          </motion.p>

          <div className="flex flex-col gap-3 text-left">
            {[
              { placeholder: "Your name", type: "text", delay: 0.3 },
              { placeholder: "Your email", type: "email", delay: 0.42 },
              { placeholder: "Describe your business in one sentence", type: "text", delay: 0.54 },
            ].map((f) => (
              <motion.input
                key={f.placeholder}
                type={f.type}
                placeholder={f.placeholder}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: f.delay, ease: E }}
                viewport={{ once: false, margin: "0px 0px -40px 0px" }}
                className="w-full bg-white border border-gray-300 rounded-full px-6 py-4 text-sm outline-none focus:border-gray-500 focus:shadow-md transition-all"
              />
            ))}
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.66, ease: E }}
              viewport={{ once: false, margin: "0px 0px -40px 0px" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-black text-white rounded-full py-4 text-xs font-semibold uppercase tracking-widest mt-2 hover:opacity-85 transition-opacity"
            >
              Send me my Roadmap
            </motion.button>
            <motion.p
              className="text-center text-xs uppercase tracking-widest text-[#8a8780] mt-1"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.78, ease: E }}
              viewport={{ once: false, margin: "0px 0px -40px 0px" }}
            >
              Delivered to your inbox in minutes.
            </motion.p>
          </div>

        </div>
      </div>

      {/* ── INSIGHTS ──
          Cards: staggered wave left to right
      */}
      <section id="insights" className="relative z-10 w-full px-4 py-20 md:py-28 scroll-mt-24">
        <div className="max-w-6xl mx-auto">

          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: E }}
            viewport={VP}
          >
            <span className="block text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-2">Radical Insights</span>
            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-black tracking-tight" style={serif}>Our Radical Thoughts</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { date: "20 Apr 2026", title: "What Actually Works", desc: "Start small. Measure obsessively. Rebuild instead of retrofit. Push through Month 2.", slug: "what-actually-works", image: "/Images/insights/ai-that-works.webp", tags: ["Strategy", "AI Transformation"] },
              { date: "13 Apr 2026", title: "Why Most AI Rollouts Fail", desc: "Most companies are automating broken things instead of replacing them.", slug: "why-most-ai-rollouts-fail", image: "/Images/insights/ai-fail.webp", tags: ["Strategy", "AI Transformation"] },
              { date: "06 Apr 2026", title: "The Agency Is Not the Answer Anymore", desc: "The traditional agency model is breaking. Own your capability instead.", slug: "the-agency-is-not-the-answer-anymore", image: "/Images/insights/agency.webp", tags: ["Strategy", "Future of Work"] },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: i * 0.12, ease: E }}
                viewport={VP}
                whileHover={{ y: -6, transition: { type: "spring", stiffness: 300 } }}
                className="rounded-2xl"
              >
                <Link
                  href={`/insights/${item.slug}`}
                  className="block bg-white rounded-2xl overflow-hidden border border-[#e8e4dc]/90 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_18px_44px_rgba(0,0,0,0.1)] transition-shadow duration-300"
                >
                  <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
                    <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <span className="block text-xs uppercase tracking-[0.12em] text-[#8a8780] mb-2">{item.date}</span>
                    <h3 className="text-lg font-bold text-black mb-2 leading-snug tracking-tight" style={serif}>{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4">{item.desc}</p>
                    <div className="flex gap-2 flex-wrap">
                      {item.tags.map((t) => (
                        <span key={t} className="text-[0.6rem] font-semibold uppercase tracking-widest text-gray-500 border border-gray-200 rounded-full px-2.5 py-1">{t}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-10 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: E }}
            viewport={VP}
          >
            <Link href="/insights" className="text-xs font-semibold uppercase tracking-widest text-black border-b border-black pb-[2px] hover:opacity-50 transition-opacity">
              All Insights
            </Link>
          </motion.div>

        </div>
      </section>

      {/* ── CLOSING ── */}
      <section id="radical" className="relative z-10 w-full px-4 py-20 md:py-24 scroll-mt-24" style={{ borderTop: "0.5px solid #e8e4dc" }}>
        <div className="max-w-[660px] mx-auto text-center">
          <motion.p
            className="text-base md:text-lg text-gray-600 leading-relaxed mb-6"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: E }}
            viewport={VP1}
          >
            Let's be honest, chasing the latest shiny tech trend is a full-time job. Good thing it's our full-time job. AI isn't a trend we spotted. It's the moment the tools finally caught up with how we've always worked. Fast, lean, and built to make bold ideas land. We took it apart, figured it out, and put it at the centre of everything. Not to survive the change. To be the reason our clients lead it.
          </motion.p>
          <motion.p
            className="font-bold text-lg text-black"
            style={serif}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: E }}
            viewport={VP1}
          >
            Radical Thinking.
          </motion.p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
