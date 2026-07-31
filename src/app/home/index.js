"use client";

import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SoftBackground from "@/components/SoftBackground";
import { robotoSlab, serif } from "@/lib/fonts";

const E = [0.16, 1, 0.3, 1];
const VP = { once: false, margin: "0px 0px -100px 0px" };
const terminalMuted = "#a8a8a8";
const terminalChrome = "#8e8e8e";

const formulaCards = [
  {
    letter: "C",
    label: "Creative",
    color: "#1ACDEB",
    badge: "The dream",
    badgeBg: "rgba(26,205,235,0.1)",
    title: "",
    body: "Every business starts here. A vision, something to make an impact. The creative spark is what makes your business worth building.",
  },
  {
    letter: "Ex",
    label: "Experience",
    color: "#E18949",
    badge: "The reality",
    badgeBg: "rgba(225,137,73,0.1)",
    title: "",
    body: "How it feels. How it sounds. The lasting impression it leaves. That is what turns a good idea into a bold one.",
  },
  {
    letter: "T²",
    label: "Technology",
    color: "#6B17DA",
    badge: "The amplifier",
    badgeBg: "rgba(107,23,218,0.08)",
    title: "",
    body: "Technology is the amplifier, the engine, and the connector of your bold idea.",
  },
];

const howWeWorkRows = [
  {
    num: "01",
    color: "#1ACDEB",
    title: "The Pulse",
    body: "Understand where you really are, in 5 to 10 days.",
  },
  {
    num: "02",
    color: "#E18949",
    title: "The Bridge",
    body: "Close the gap and land the idea, in 30 days.",
  },
  {
    num: "03",
    color: "#6B17DA",
    title: "The Navigator",
    body: "Keep the direction true, monthly.",
  },
];

const insightArticles = [
  {
    date: "31 Jul 2026",
    title: "Your competitor is not the company using AI. Your competitor is AI.",
    desc: "Most risk assessments are pointed at the wrong threat. The real competitor is AI itself.",
    slug: "your-competitor-is-ai",
    image: "/Images/insights/ai-is-coming.webp",
    tags: ["Strategy", "AI Transformation"],
  },
  {
    date: "20 Apr 2026",
    title: "What Actually Works",
    desc: "Start small. Measure obsessively. Rebuild instead of retrofit. Push through Month 2.",
    slug: "what-actually-works",
    image: "/Images/insights/ai-that-works.webp",
    tags: ["Strategy", "AI Transformation"],
  },
  {
    date: "13 Apr 2026",
    title: "Why Most AI Rollouts Fail",
    desc: "Most companies are automating broken things instead of replacing them.",
    slug: "why-most-ai-rollouts-fail",
    image: "/Images/insights/ai-fail.webp",
    tags: ["Strategy", "AI Transformation"],
  },
];

const CLOSING_QUOTE =
  "Let's be honest, chasing the latest shiny tech trend is a full-time job. Good thing it's our full-time job. AI isn't a trend we spotted. It's the moment the tools finally caught up with how we've always worked. Fast, lean, and built to make bold ideas land. We took it apart, figured it out, and put it at the centre of everything. Not to survive the change. To be the reason our clients lead it.";

const b11StatColors = ["#1ACDEB", "#E18949", "#6B17DA"];

/** Sticky scroll narrative = beats 1–6. Flow sections follow in normal page scroll. */
const NARRATIVE_SCROLLABLE_VH = 1536;
const NARRATIVE_CONTAINER_VH = NARRATIVE_SCROLLABLE_VH + 100;

/** Desktop formula fan — scroll lane; card phase = original beat 7 (narrative 0.665–0.901). */
const DESKTOP_FORMULA_SCROLL_VH = 240;
const DESKTOP_CARD_SPREAD = 205;

function scrollToNarrativeProgress(scrolled, scrollable) {
  return Math.min(1, Math.max(0, scrolled / scrollable));
}

function mapProgress(p, inputRange, outputRange) {
  if (p <= inputRange[0]) return outputRange[0];
  if (p >= inputRange[inputRange.length - 1]) return outputRange[outputRange.length - 1];
  for (let i = 0; i < inputRange.length - 1; i++) {
    if (p >= inputRange[i] && p <= inputRange[i + 1]) {
      const t = (p - inputRange[i]) / (inputRange[i + 1] - inputRange[i]);
      return outputRange[i] + t * (outputRange[i + 1] - outputRange[i]);
    }
  }
  return outputRange[outputRange.length - 1];
}

function FormulaCardFaces({ card, compact = false }) {
  const letterClass = compact
    ? "font-bold text-[clamp(2.5rem,8vw,3.6rem)] leading-none mb-2"
    : "font-bold text-[clamp(4.5rem,12vw,6.5rem)] leading-none mb-3";
  const backLetterClass = compact ? "font-bold text-[1.55rem] leading-none mb-2" : "font-bold text-[3rem] leading-none mb-4";
  const backTitleClass = compact ? "text-[0.9rem] font-bold mb-2 leading-snug text-black" : "text-[1.2rem] font-bold mb-3 leading-snug text-black";
  const backBodyClass = compact ? "text-[0.75rem] text-gray-600 leading-relaxed mb-2.5" : "text-sm text-gray-600 leading-relaxed mb-4";
  const logoSize = compact ? 22 : 28;
  const logoPos = compact ? "top-4 left-4" : "top-5 left-5";
  const logoPosBr = compact ? "bottom-4 right-4" : "bottom-5 right-5";

  return (
    <>
      <div
        className="absolute inset-0 rounded-2xl bg-white overflow-hidden [backface-visibility:hidden]"
        style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)", border: "0.5px solid rgba(232,228,220,0.9)" }}
      >
        {!compact && (
          <>
            <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl" style={{ background: card.color }} />
            <div className="absolute bottom-0 left-0 right-0 h-1.5 rounded-b-2xl" style={{ background: card.color }} />
          </>
        )}
        <Image
          src="/logos/RT-Logo-New.svg"
          alt=""
          width={logoSize}
          height={logoSize}
          className={`absolute ${logoPos} opacity-80`}
          style={{ width: logoSize, height: logoSize }}
          aria-hidden
        />
        <Image
          src="/logos/RT-Logo-New.svg"
          alt=""
          width={logoSize}
          height={logoSize}
          className={`absolute ${logoPosBr} opacity-80 rotate-180`}
          style={{ width: logoSize, height: logoSize }}
          aria-hidden
        />
        <div className={`absolute inset-0 flex flex-col items-center justify-center text-center ${compact ? "px-4" : "px-6"}`}>
          <p className={letterClass} style={{ ...serif, color: card.color }}>
            {card.letter}
          </p>
          <p className={`font-semibold uppercase text-[#8a8780] ${compact ? "text-[0.65rem] tracking-[0.16em]" : "text-xs tracking-[0.18em]"}`}>
            {card.label}
          </p>
        </div>
      </div>
      <div
        className={`absolute inset-0 rounded-2xl bg-white overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)] ${compact ? "px-4 py-5 flex flex-col justify-center" : "px-8 py-9"}`}
        style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)", border: "0.5px solid rgba(232,228,220,0.9)" }}
      >
        <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl" style={{ background: card.color }} />
        <div className="absolute bottom-0 left-0 right-0 h-1.5 rounded-b-2xl" style={{ background: card.color }} />
        <p className={backLetterClass} style={{ ...serif, color: card.color }}>{card.letter}</p>
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#8a8780] mb-1.5">{card.label}</p>
        {card.title ? (
          <h3 className={backTitleClass} style={serif}>{card.title}</h3>
        ) : null}
        <p className={backBodyClass}>{card.body}</p>
        <span
          className={`inline-block font-semibold uppercase tracking-[0.1em] rounded-full ${compact ? "text-[0.5rem] px-2 py-0.5" : "text-[0.6rem] px-3 py-1"}`}
          style={{ background: card.badgeBg, color: card.color }}
        >
          {card.badge}
        </span>
      </div>
    </>
  );
}

function NarrativeFormulaCard({ card, x, y, rotateY, opacity, zIndex }) {
  return (
    <div
      className="absolute left-1/2 top-1/2 w-[min(38vw,200px)] h-[280px] md:h-[300px] [perspective:1200px]"
      style={{
        opacity,
        zIndex,
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
      }}
    >
      <div
        className="relative w-full h-full [transform-style:preserve-3d]"
        style={{ transform: `rotateY(${rotateY}deg)` }}
      >
        <FormulaCardFaces card={card} compact />
      </div>
    </div>
  );
}

function FormulaFlowCard({ card }) {
  return (
    <div
      className="relative h-[240px] md:h-[260px] max-w-[260px] mx-auto w-full rounded-2xl bg-white px-5 py-6 overflow-hidden border border-[#e8e4dc]/90 shadow-[0_2px_12px_rgba(0,0,0,0.04)] text-left"
    >
      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: card.color }} />
      <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl" style={{ background: card.color }} />
      <p className="font-bold text-[2rem] leading-none mb-2" style={{ ...serif, color: card.color }}>{card.letter}</p>
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#8a8780] mb-1.5">{card.label}</p>
      {card.title ? (
        <h3 className="text-base font-bold mb-2 leading-snug text-black" style={serif}>{card.title}</h3>
      ) : null}
      <p className="text-xs text-gray-600 leading-relaxed mb-3">{card.body}</p>
      <span
        className="inline-block text-[0.55rem] font-semibold uppercase tracking-[0.12em] rounded-full px-2.5 py-0.5"
        style={{ background: card.badgeBg, color: card.color }}
      >
        {card.badge}
      </span>
    </div>
  );
}

/** Reads sticky-section scroll progress every frame from viewport position. */
function useNarrativeProgress(containerRef) {
  const [progress, setProgress] = useState(0);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const viewport = window.innerHeight;
    const scrollable = el.offsetHeight - viewport;
    if (scrollable > 0) {
      const scrolled = -el.getBoundingClientRect().top;
      setProgress(Math.min(1, Math.max(0, scrollToNarrativeProgress(scrolled, scrollable))));
    }
  }, [containerRef]);

  useEffect(() => {
    let frame = 0;
    let display = 0;
    let last = -1;

    const el = containerRef.current;
    if (el) {
      const viewport = window.innerHeight;
      const scrollable = el.offsetHeight - viewport;
      if (scrollable > 0) {
        const scrolled = -el.getBoundingClientRect().top;
        display = Math.min(1, Math.max(0, scrollToNarrativeProgress(scrolled, scrollable)));
        last = display;
      }
    }

    const tick = () => {
      const el = containerRef.current;
      if (el) {
        const viewport = window.innerHeight;
        const scrollable = el.offsetHeight - viewport;
        if (scrollable > 0) {
          const scrolled = -el.getBoundingClientRect().top;
          const target = Math.min(1, Math.max(0, scrollToNarrativeProgress(scrolled, scrollable)));
          const blend = 0.18;
          display += (target - display) * blend;
          if (Math.abs(display - last) > 0.0003) {
            last = display;
            setProgress(display);
          }
        }
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [containerRef]);

  return progress;
}

function WhenTheyWorkTogetherMobile() {
  return (
    <div className="grid grid-cols-1 gap-4 max-w-4xl mx-auto">
      {formulaCards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 40 + i * 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: i * 0.08, ease: E }}
          viewport={VP}
        >
          <FormulaFlowCard card={card} />
        </motion.div>
      ))}
    </div>
  );
}

function WhenTheyWorkTogetherDesktop() {
  const containerRef = useRef(null);
  const p = useNarrativeProgress(containerRef);
  const spread = DESKTOP_CARD_SPREAD;

  // Original beat 7 keys (narrative 0.665–0.901) remapped to desktop scroll 0–1
  const bridgeOp = mapProgress(p, [0.064, 0.144], [0, 1]);
  const cardsOp = mapProgress(p, [0.144, 0.208], [0, 1]);
  const stackY = mapProgress(p, [0.208, 0.534], [1, 0]);
  const cY = 8 * stackY;
  const exY = 4 * stackY;
  const t2Y = 0;
  const t2X = mapProgress(p, [0.208, 0.390], [0, spread]);
  const exX = mapProgress(p, [0.292, 0.504], [12, 0]);
  const cX = mapProgress(p, [0.208, 0.534], [0, -spread]);
  const flipC = mapProgress(p, [0.678, 0.839], [0, 180]);
  const flipEx = mapProgress(p, [0.754, 0.920], [0, 180]);
  const flipT2 = mapProgress(p, [0.839, 1], [0, 180]);

  return (
    <div
      ref={containerRef}
      className="hidden md:block relative w-full"
      style={{ height: `${DESKTOP_FORMULA_SCROLL_VH}vh` }}
    >
      <div className="sticky top-0 z-10 h-svh w-full flex flex-col items-center justify-center overflow-hidden pt-20 px-4 md:px-6 text-center">
        <p
          className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8a8780] mb-5 md:mb-8 shrink-0"
          style={{ opacity: bridgeOp }}
        >
          When they all work together.
        </p>
        <div className="relative w-full h-[300px] md:h-[320px] max-w-4xl mx-auto">
          <NarrativeFormulaCard
            card={formulaCards[0]}
            x={cX}
            y={cY}
            rotateY={flipC}
            opacity={cardsOp}
            zIndex={1}
          />
          <NarrativeFormulaCard
            card={formulaCards[1]}
            x={exX}
            y={exY}
            rotateY={flipEx}
            opacity={cardsOp}
            zIndex={2}
          />
          <NarrativeFormulaCard
            card={formulaCards[2]}
            x={t2X}
            y={t2Y}
            rotateY={flipT2}
            opacity={cardsOp}
            zIndex={3}
          />
        </div>
      </div>
    </div>
  );
}

function WhenTheyWorkTogether() {
  return (
    <section
      id="formula"
      className="relative z-10 w-full scroll-mt-24"
    >
      <div className="md:hidden px-4 pt-14 pb-14">
        <motion.p
          className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8a8780] mb-8 text-center"
          initial={{ opacity: 0, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: E }}
          viewport={VP}
        >
          When they all work together.
        </motion.p>
        <WhenTheyWorkTogetherMobile />
      </div>

      <WhenTheyWorkTogetherDesktop />
    </section>
  );
}

const REALITY_BEAT = { start: 0.30, end: 0.43, moveStart: 0.315, moveEnd: 0.43 };

function AgentTerminal({ prompt, className = "max-w-lg mx-auto" }) {
  return (
    <Link
      href="/chat"
      className={`block w-full rounded-2xl overflow-hidden ${className}`}
      style={{ boxShadow: "0 10px 40px rgba(0, 0, 0, 0.14), 0 2px 8px rgba(0, 0, 0, 0.08)" }}
    >
      <div className="flex items-center gap-2 px-4 py-3" style={{ background: "#181818" }}>
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28ca41]" />
        <span className="ml-2 font-mono text-xs" style={{ color: terminalChrome }}>Radical Thinking / Agent</span>
      </div>
      <div className="p-6 md:p-8 text-left" style={{ background: "#0d0d0d" }}>
        <p
          className="text-base md:text-lg text-white leading-relaxed"
          style={{ ...serif, fontStyle: "italic" }}
        >
          {prompt}
        </p>
        <div className="flex items-center gap-2 mt-4">
          <span className="text-[#28ca41] font-mono">›</span>
          <span className="font-mono text-sm" style={{ color: terminalMuted }}>
            Start typing...
          </span>
          <span className="rt-cursor" />
        </div>
      </div>
    </Link>
  );
}

const REALITY_LABELS = [
  "ChatGPT",
  "AI Tools",
  "Copilot",
  "The CRM",
  "The ERP",
  "New Website",
  "Prompt Library",
  "Sales Campaign",
  "Tech Stack",
];

const REALITY_DRIFT_LABELS = REALITY_LABELS.map((label, i) => {
  const deg = -90 + i * 40;
  const rad = (deg * Math.PI) / 180;
  return {
    label,
    left: `${50 + 28 * Math.cos(rad)}%`,
    top: `${46 + 24 * Math.sin(rad)}%`,
    x: [0, Math.round(Math.cos(rad) * 55)],
    y: [0, Math.round(Math.sin(rad) * 45)],
    op: 0.38,
    delay: i * 0.011,
  };
});

function getRealityDriftStyle(p, item, beat) {
  const moveStart = beat.moveStart + item.delay * 0.4;
  const appearStart = beat.moveStart + item.delay;
  const appearEnd = appearStart + 0.024;
  const fadeOutStart = beat.end - 0.03;
  const opacity = mapProgress(p, [appearStart, appearEnd, fadeOutStart, beat.end], [0, item.op, item.op, 0]);
  const x = mapProgress(p, [moveStart, beat.moveEnd], item.x);
  const y = mapProgress(p, [moveStart, beat.moveEnd], item.y);
  return {
    opacity,
    transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
  };
}

function ScrollNarrative() {
  const containerRef = useRef(null);
  const p = useNarrativeProgress(containerRef);

  // Beat 1: title line 1 → pause → line 2 → subhead; then fade for beat 2
  const b1Op = mapProgress(p, [0, 0.072, 0.088], [1, 1, 0]);
  const b1Line1Op = mapProgress(p, [0, 0.008], [1, 1]);
  const b1Line2Op = mapProgress(p, [0.028, 0.042], [0, 1]);
  const b1Line2Y = mapProgress(p, [0.028, 0.042], [18, 0]);
  const b1SubOp = mapProgress(p, [0.048, 0.062], [0, 1]);
  const b1SubY = mapProgress(p, [0.048, 0.062], [16, 0]);

  // Beat 2: 0.09 – 0.20 (third line needs room after headline)
  const b2Op = mapProgress(p, [0.09, 0.105, 0.175, 0.20], [0, 1, 1, 0]);
  const w2aOp = mapProgress(p, [0.11, 0.13], [0, 1]);
  const w2bOp = mapProgress(p, [0.13, 0.155], [0, 1]);
  const w2cOp = mapProgress(p, [0.155, 0.172], [0, 1]);
  const w2aY = mapProgress(p, [0.11, 0.13], [24, 0]);
  const w2bY = mapProgress(p, [0.13, 0.155], [24, 0]);
  const w2cY = mapProgress(p, [0.155, 0.172], [24, 0]);

  // Beat 3: 0.21 – 0.29
  const b3Op = mapProgress(p, [0.21, 0.225, 0.275, 0.29], [0, 1, 1, 0]);
  const b3Scale = mapProgress(p, [0.21, 0.25], [0.65, 1]);

  // Beat 4: 0.30 – 0.43 (fly-through keywords)
  const b4Op = mapProgress(p, [0.30, 0.315, 0.405, 0.43], [0, 1, 1, 0]);
  const b4Y = mapProgress(p, [0.30, 0.35], [40, 0]);

  // Beat 5: 0.44 – 0.53
  const b5Op = mapProgress(p, [0.44, 0.455, 0.515, 0.53], [0, 1, 1, 0]);
  const b5Y = mapProgress(p, [0.44, 0.48], [40, 0]);
  const b5bOp = mapProgress(p, [0.48, 0.51], [0, 1]);
  const b5bY = mapProgress(p, [0.48, 0.51], [20, 0]);

  // Beat 6: 0.54 – 1.0 (formula — holds until sticky releases)
  const b6Op = mapProgress(p, [0.54, 0.555, 0.615, 1], [0, 1, 1, 1]);
  const b6Y = mapProgress(p, [0.54, 0.57], [40, 0]);
  const eqBIOp = mapProgress(p, [0.558, 0.570], [0, 1]);
  const eqSignOp = mapProgress(p, [0.570, 0.580], [0, 1]);
  const eqCOp = mapProgress(p, [0.580, 0.590], [0, 1]);
  const eqPlusOp = mapProgress(p, [0.590, 0.598], [0, 1]);
  const eqExOp = mapProgress(p, [0.598, 0.606], [0, 1]);
  const eqXOp = mapProgress(p, [0.606, 0.614], [0, 1]);
  const eqT2Op = mapProgress(p, [0.614, 0.622], [0, 1]);
  const eqPayoffOp = mapProgress(p, [0.622, 0.630], [0, 1]);

  const scrollIndicatorOp = mapProgress(p, [0, 0.75, 0.88], [1, 1, 0]);

  return (
    <div ref={containerRef} className="relative z-10 w-full self-stretch" style={{ height: `${NARRATIVE_CONTAINER_VH}vh` }}>
      <div className="sticky top-0 z-20 h-svh w-full flex items-center justify-center overflow-hidden pt-20">

        {/* Beat 1 */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-10 gap-5"
          style={{ opacity: b1Op }}
        >
          <h1
            className="text-[clamp(1.85rem,4.8vw,3.75rem)] font-bold leading-[1.12] tracking-tight max-w-4xl"
            style={serif}
          >
            <span className="block text-black" style={{ opacity: b1Line1Op }}>
              The gap between bold ideas and real business impact.
            </span>
            <span
              className="block mt-2"
              style={{ opacity: b1Line2Op, transform: `translateY(${b1Line2Y}px)`, color: "#E18949" }}
            >
              We help you close it.
            </span>
          </h1>
          <p
            className="text-lg md:text-xl text-black max-w-2xl leading-relaxed"
            style={{ opacity: b1SubOp, transform: `translateY(${b1SubY}px)` }}
          >
            Creative finds what is worth building. Experience makes it land.
            <br />
            Technology and AI. They amplify both.
          </p>
        </div>

        {/* Beat 2 */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-10 gap-4"
          style={{ opacity: b2Op }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8a8780]"
            style={{ opacity: w2aOp, transform: `translateY(${w2aY}px)` }}
          >
            Every business started with one.
          </p>
          <h2
            className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.04] tracking-tight text-black"
            style={{ ...serif, opacity: w2bOp, transform: `translateY(${w2bY}px)` }}
          >
            A dream. A passion.<br />Something worth building.
          </h2>
          <p
            className="text-lg text-gray-600 max-w-xl leading-relaxed"
            style={{ opacity: w2cOp, transform: `translateY(${w2cY}px)` }}
          >
            The bold idea that made you start. The version of your business you held in your head before reality arrived.
          </p>
        </div>

        {/* Beat 3 */}
        <div
          className="absolute inset-0 flex items-center justify-center z-10"
          style={{ opacity: b3Op, transform: `scale(${b3Scale})` }}
        >
          <span className="text-[clamp(5rem,18vw,14rem)] font-bold tracking-tight leading-none" style={{ ...serif, color: "#E18949" }}>
            Then.
          </span>
        </div>

        {/* Beat 4 */}
        <div className="absolute inset-0 flex items-center justify-center z-10" style={{ opacity: b4Op }}>
          <div className="absolute inset-0 pointer-events-none">
            {REALITY_DRIFT_LABELS.map((item) => {
              const drift = getRealityDriftStyle(p, item, REALITY_BEAT);
              return (
                <span
                  key={item.label}
                  className="absolute text-sm font-semibold uppercase tracking-widest text-[#8a8780] whitespace-nowrap z-[1]"
                  style={{ left: item.left, top: item.top, ...drift }}
                >
                  {item.label}
                </span>
              );
            })}
          </div>
          <div className="text-center px-6 z-10" style={{ transform: `translateY(${b4Y}px)` }}>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.04] tracking-tight text-black" style={serif}>
              You brought in technology to fix it
            </h2>
            <p className="text-lg text-gray-600 mt-4 max-w-lg mx-auto leading-relaxed">
              It didn&apos;t fix the problem
            </p>
          </div>
        </div>

        {/* Beat 5 */}
        <div
          className="absolute inset-0 flex items-center justify-center px-6 text-center z-10"
          style={{ opacity: b5Op, transform: `translateY(${b5Y}px)` }}
        >
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8a8780] mb-6">The real problem</p>
            <h2 className="text-[clamp(1.75rem,4vw,3.5rem)] font-bold leading-[1.15] tracking-tight text-black" style={serif}>
              The Gap between what you intended and what your customers are experiencing.
            </h2>
            <p
              className="text-base text-gray-600 mt-6 max-w-xl mx-auto leading-relaxed"
              style={{ opacity: b5bOp, transform: `translateY(${b5bY}px)` }}
            >
              Technology doesn&apos;t fix that gap. It amplifies whatever is already there.
            </p>
          </div>
        </div>

        {/* Beat 6 — formula */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-10 gap-6"
          style={{ opacity: b6Op, transform: `translateY(${b6Y}px)` }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8a8780]">
            So we built a formula for that.
          </p>
          <h2
            className="text-[clamp(2.8rem,7vw,5.5rem)] font-bold leading-[1.05] tracking-tight inline-flex items-baseline justify-center gap-2 md:gap-3 flex-wrap text-transparent bg-clip-text animate-gradient-loop"
            style={{
              backgroundImage: "linear-gradient(90deg, #1ACDEB, #6B17DA, #E18949, #1ACDEB)",
              backgroundSize: "200% auto",
            }}
          >
            <span style={{ opacity: eqBIOp }}>BI</span>
            <span style={{ opacity: eqSignOp }}>=</span>
            <span style={{ opacity: eqCOp }}>C</span>
            <span style={{ opacity: eqPlusOp }}>+</span>
            <span style={{ opacity: eqExOp }}>Ex</span>
            <span style={{ opacity: eqXOp }}>×</span>
            <span style={{ opacity: eqT2Op }}>T²</span>
          </h2>
          <p className="text-xs tracking-[0.14em] uppercase text-[#8a8780]">
            Bold Ideas = Creative + Experience × Technology²
          </p>
          <p className="text-2xl font-bold text-black" style={{ ...serif, opacity: eqPayoffOp }}>
            Bold ideas land.
          </p>
        </div>

        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
          style={{ opacity: scrollIndicatorOp }}
        >
          <span className="text-[0.6rem] uppercase tracking-[0.22em] text-[#8a8780]">Scroll</span>
          <div className="rt-scroll-line" />
        </div>
      </div>
    </div>
  );
}

function LandingFlowSections() {
  const flowSection = "relative z-10 w-full px-4 py-14 md:py-20 scroll-mt-24";

  return (
    <>
      <WhenTheyWorkTogether />

      <section id="get-started" className={flowSection}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight text-black mb-8 md:mb-10"
            style={serif}
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: E }}
            viewport={VP}
          >
            Let&apos;s get started
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.12, ease: E }}
            viewport={VP}
          >
            <AgentTerminal prompt="&ldquo;Tell me about your bold idea. Where is it today versus where you intended it to be?&rdquo;" />
          </motion.div>
        </div>
      </section>

      <section id="how" className={flowSection}>
        <div className="max-w-3xl mx-auto text-left">
          <motion.p
            className="text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-4"
            initial={{ opacity: 0, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: E }}
            viewport={VP}
          >
            How We Work
          </motion.p>
          <motion.h2
            className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.1] tracking-tight text-black mb-3"
            style={serif}
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: E }}
            viewport={VP}
          >
            We start inside the box.
          </motion.h2>
          <motion.p
            className="text-base text-gray-600 leading-relaxed mb-4 max-w-[560px]"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: E }}
            viewport={VP}
          >
            Anyone can think outside the box. The hard work is understanding what is inside it first. The people, the processes, the gaps between intention and reality. That is where the real opportunity lives.
          </motion.p>
          <motion.p
            className="text-base text-gray-600 leading-relaxed mb-10 md:mb-12 max-w-[560px]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.25, ease: E }}
            viewport={VP}
          >
            Three engagement types. One inside-out process. Guided by BI = C + Ex × T².
          </motion.p>
          <div className="space-y-0">
            {howWeWorkRows.map((item, i) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, x: -48 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.85, delay: i * 0.12, ease: E }}
                viewport={{ once: false, margin: "0px 0px -80px 0px" }}
                className="grid grid-cols-[52px_1fr] md:grid-cols-[72px_1fr] gap-x-4 md:gap-x-6 py-4 md:py-5"
                style={
                  i < howWeWorkRows.length - 1
                    ? { borderBottom: "0.5px solid #e8e4dc" }
                    : undefined
                }
              >
                <p
                  className="text-[2.5rem] md:text-[3rem] font-bold leading-none"
                  style={{ ...serif, color: item.color }}
                >
                  {item.num}
                </p>
                <div className="pt-0.5 md:pt-1">
                  <h3
                    className="text-lg md:text-xl font-semibold text-black mb-1.5 tracking-tight"
                    style={serif}
                  >
                    {item.title}
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed">{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="mt-8 md:mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: E }}
            viewport={VP}
          >
            <Link
              href="/how-we-work"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-black hover:opacity-70 transition-opacity"
            >
              See how we work →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Proof of formula — temporarily hidden */}
      {false && (
      <section className={flowSection}>
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <motion.p
              className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8a8780] mb-3"
              initial={{ opacity: 0, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: E }}
              viewport={VP}
            >
              Proof of formula
            </motion.p>
            <motion.h2
              className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold text-black leading-[1.1] tracking-tight"
              style={serif}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: E }}
              viewport={VP}
            >
              We did not wait for a client brief.
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 48, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.15, ease: E }}
            viewport={VP}
          >
            <Link
              href="/work/fluffyfriends"
              className="block rounded-2xl border border-[#e8e4dc]/90 bg-white p-3 md:p-4"
              style={{ boxShadow: "0 24px 64px rgba(0, 0, 0, 0.14), 0 8px 24px rgba(0, 0, 0, 0.08)" }}
            >
              <div className="relative w-full overflow-hidden rounded-xl aspect-[16/10]">
                <Image
                  src="/Images/Portfolio/fluffyfriends.webp"
                  alt="FluffyFriends — autonomous AI pet portraits"
                  fill
                  className="object-cover object-center rounded-xl"
                  sizes="(max-width: 768px) 92vw, 480px"
                />
              </div>
            </Link>
          </motion.div>

          <div className="grid grid-cols-3 gap-4 md:gap-6 mt-8 text-center">
            {[
              { num: "6", label: "Weeks to build", color: b11StatColors[0] },
              { num: "2", suffix: " min", label: "Photo to artwork", color: b11StatColors[1] },
              { num: "0", label: "Humans in the loop", color: b11StatColors[2] },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: E }}
                viewport={VP}
              >
                <p className="text-[clamp(1.75rem,5vw,2.75rem)] font-bold leading-none" style={{ ...serif, color: stat.color }}>
                  {stat.num}
                  {stat.suffix && <span className="text-[0.5em] align-baseline">{stat.suffix}</span>}
                </p>
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[#8a8780] mt-2 leading-snug">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="flex justify-center mt-8"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: E }}
            viewport={VP}
          >
            <Link
              href="/work/fluffyfriends"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-black text-white rounded-full text-xs font-semibold uppercase tracking-widest hover:opacity-85 transition-opacity"
            >
              See it in action
            </Link>
          </motion.div>
        </div>
      </section>
      )}

      <section id="insights" className={flowSection}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: E }}
            viewport={VP}
          >
            <span className="block text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-2">
              Radical Insights
            </span>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold text-black tracking-tight" style={serif}>
              Our Radical Thoughts
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {insightArticles.map((item, i) => (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, y: 40 + i * 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: E }}
                viewport={VP}
              >
                <Link
                  href={`/insights/${item.slug}`}
                  className="block bg-white rounded-2xl overflow-hidden border border-[#e8e4dc]/90 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_18px_44px_rgba(0,0,0,0.1)] transition-shadow duration-300"
                >
                  <div className="relative w-full overflow-hidden aspect-[16/9]">
                    <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <div className="p-5">
                    <span className="block text-[0.65rem] uppercase tracking-[0.12em] text-[#8a8780] mb-1.5">{item.date}</span>
                    <h3 className="text-lg font-bold text-black mb-1.5 leading-snug tracking-tight" style={serif}>{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{item.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: E }}
            viewport={VP}
          >
            <Link
              href="/insights"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-black text-white rounded-full text-xs font-semibold uppercase tracking-widest hover:opacity-85 transition-opacity"
            >
              All Insights
            </Link>
          </motion.div>
        </div>
      </section>

      <section id="agent" className={flowSection}>
        <div className="max-w-[700px] mx-auto text-center">
          <motion.span
            className="block text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-4"
            initial={{ opacity: 0, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: E }}
            viewport={VP}
          >
            Start a conversation
          </motion.span>
          <motion.h2
            className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.2] text-black mb-3"
            style={serif}
            initial={{ opacity: 0, y: 56 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.1, ease: E }}
            viewport={VP}
          >
            Let&apos;s get started
          </motion.h2>
          <motion.p
            className="text-base text-gray-600 leading-relaxed mb-8 max-w-[440px] mx-auto"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: E }}
            viewport={VP}
          >
            Our agent thinks the way we do. Talk to it about your business, your challenge or where to start.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.25, ease: E }}
            viewport={VP}
          >
            <AgentTerminal
              prompt="&ldquo;Tell us about your bold idea.&rdquo;"
              className="max-w-lg mx-auto"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default function Home() {
  return (
    <main className="relative flex flex-col items-stretch w-full min-h-screen overflow-x-clip">
      <span className={robotoSlab.className} hidden aria-hidden />
      <div className="fixed inset-0 z-0 pointer-events-none gradient-background">
        <SoftBackground />
      </div>

      <Nav />

      <ScrollNarrative />

      <LandingFlowSections />

      {/* What we think — temporarily hidden */}
      {false && (
      <section id="radical" className="relative z-10 w-full px-4 py-14 md:py-20 scroll-mt-24">
        <div className="max-w-[660px] mx-auto text-center">
          <motion.h2
            className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold text-black leading-[1.1] tracking-tight mb-6 md:mb-8"
            style={serif}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: E }}
            viewport={VP}
          >
            What we think
          </motion.h2>
          <motion.p
            className="text-base md:text-lg text-gray-600 leading-relaxed mb-6"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: E }}
            viewport={VP}
          >
            &ldquo;{CLOSING_QUOTE}&rdquo;
          </motion.p>
          <motion.p
            className="font-bold text-lg text-black"
            style={serif}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: E }}
            viewport={VP}
          >
            Radical Thinking.
          </motion.p>
        </div>
      </section>
      )}

      <Footer />
    </main>
  );
}
