"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Roboto_Slab } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SoftBackground from "@/components/SoftBackground";

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const E = [0.16, 1, 0.3, 1];
const VP = { once: false, margin: "0px 0px -100px 0px" };
const VP1 = { once: true, margin: "0px 0px -100px 0px" };
const serif = { fontFamily: robotoSlab.style.fontFamily };

const formulaCards = [
  {
    letter: "C",
    label: "Creative",
    color: "#1ACDEB",
    badge: "The dream",
    badgeBg: "rgba(26,205,235,0.1)",
    title: "",
    body: "Every business starts here. A vision, something to make an impact. The creative spark is what makes your business worth building.",
    flipRange: [0.22, 0.42],
  },
  {
    letter: "Ex",
    label: "Experience",
    color: "#E18949",
    badge: "The reality",
    badgeBg: "rgba(225,137,73,0.1)",
    title: "",
    body: "How it feels. How it sounds. The lasting impression it leaves. That is what turns a good idea into a bold one.",
    flipRange: [0.44, 0.64],
  },
  {
    letter: "T²",
    label: "Technology",
    color: "#6B17DA",
    badge: "The amplifier",
    badgeBg: "rgba(107,23,218,0.08)",
    title: "",
    body: "Technology is the amplifier, the engine, and the connector of your bold idea.",
    flipRange: [0.66, 0.86],
  },
];

function FormulaFlipCard({ scrollYProgress, card }) {
  const rotateY = useTransform(scrollYProgress, card.flipRange, [0, 180]);

  return (
    <div className="relative h-[340px] md:h-[360px] [perspective:1200px]">
      <motion.div
        className="relative w-full h-full [transform-style:preserve-3d]"
        style={{ rotateY }}
      >
        <FormulaCardFaces card={card} />
      </motion.div>
    </div>
  );
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
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <p className={letterClass} style={{ ...serif, color: card.color }}>
            {card.letter}
          </p>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#8a8780]">
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

function parseRgba(str) {
  const match = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (!match) return { r: 0, g: 0, b: 0, a: 1 };
  return { r: +match[1], g: +match[2], b: +match[3], a: match[4] !== undefined ? +match[4] : 1 };
}

function mapProgressColor(p, inputRange, colors) {
  if (p <= inputRange[0]) return colors[0];
  if (p >= inputRange[inputRange.length - 1]) return colors[colors.length - 1];
  for (let i = 0; i < inputRange.length - 1; i++) {
    if (p >= inputRange[i] && p <= inputRange[i + 1]) {
      const t = (p - inputRange[i]) / (inputRange[i + 1] - inputRange[i]);
      const a = parseRgba(colors[i]);
      const b = parseRgba(colors[i + 1]);
      return `rgba(${Math.round(a.r + (b.r - a.r) * t)},${Math.round(a.g + (b.g - a.g) * t)},${Math.round(a.b + (b.b - a.b) * t)},${a.a + (b.a - a.a) * t})`;
    }
  }
  return colors[colors.length - 1];
}

const REALITY_BEAT = { start: 0.30, end: 0.43, moveStart: 0.315, moveEnd: 0.43 };

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

/** Reads sticky-section progress every frame from viewport position. */
function useNarrativeProgress(containerRef) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    let last = -1;

    const tick = () => {
      const el = containerRef.current;
      if (el) {
        const viewport = window.innerHeight;
        const scrollable = el.offsetHeight - viewport;
        if (scrollable > 0) {
          const next = Math.min(1, Math.max(0, -el.getBoundingClientRect().top / scrollable));
          if (Math.abs(next - last) > 0.0005) {
            last = next;
            setProgress(next);
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

function ScrollNarrative() {
  const containerRef = useRef(null);
  const p = useNarrativeProgress(containerRef);

  // Beat 1: 0.00 – 0.08 (gap before beat 2)
  const b1Op = mapProgress(p, [0, 0.015, 0.065, 0.08], [0, 1, 1, 0]);
  const b1Y = mapProgress(p, [0, 0.04], [40, 0]);

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

  // Beat 6: 0.54 – 0.655 (formula — first)
  const b6Op = mapProgress(p, [0.54, 0.555, 0.645, 0.655], [0, 1, 1, 0]);
  const b6Y = mapProgress(p, [0.54, 0.57], [40, 0]);
  const eqBIOp = mapProgress(p, [0.558, 0.570], [0, 1]);
  const eqSignOp = mapProgress(p, [0.570, 0.580], [0, 1]);
  const eqCOp = mapProgress(p, [0.580, 0.590], [0, 1]);
  const eqPlusOp = mapProgress(p, [0.590, 0.598], [0, 1]);
  const eqExOp = mapProgress(p, [0.598, 0.606], [0, 1]);
  const eqXOp = mapProgress(p, [0.606, 0.614], [0, 1]);
  const eqT2Op = mapProgress(p, [0.614, 0.622], [0, 1]);
  const eqPayoffOp = mapProgress(p, [0.622, 0.630], [0, 1]);

  // Beat 7: 0.665 – 0.955 (cards — second)
  const b7Op = mapProgress(p, [0.665, 0.680, 0.940, 0.955], [0, 1, 1, 0]);
  const b7Y = mapProgress(p, [0.665, 0.695], [40, 0]);
  const b7BridgeOp = mapProgress(p, [0.680, 0.699], [0, 1]);
  const cardsOp = mapProgress(p, [0.699, 0.714], [0, 1]);
  const stackY = mapProgress(p, [0.714, 0.791], [1, 0]);
  const cY = 8 * stackY;
  const exY = 4 * stackY;
  const t2Y = 0;
  const t2X = mapProgress(p, [0.714, 0.757], [0, 205]);
  const exX = mapProgress(p, [0.734, 0.784], [12, 0]);
  const cX = mapProgress(p, [0.714, 0.791], [0, -205]);
  const flipC = mapProgress(p, [0.825, 0.863], [0, 180]);
  const flipEx = mapProgress(p, [0.843, 0.882], [0, 180]);
  const flipT2 = mapProgress(p, [0.863, 0.901], [0, 180]);

  // Beat 8: 0.96 – 1.00 (typewriter title → terminal)
  const b8Op = mapProgress(p, [0.96, 0.965, 1], [0, 1, 1]);
  const b8Y = mapProgress(p, [0.96, 0.98], [40, 0]);
  const b8TypeProgress = mapProgress(p, [0.965, 0.978], [0, 1]);
  const b8TerminalOp = mapProgress(p, [0.988, 0.995], [0, 1]);

  const scrollIndicatorOp = mapProgress(p, [0, 0.94, 0.98], [1, 1, 0]);
  const bgBlue = mapProgressColor(
    p,
    [0, 0.20, 0.29, 0.43, 0.53, 0.655, 0.955, 1],
    [
      "rgba(26,205,235,0.04)",
      "rgba(26,205,235,0.06)",
      "rgba(225,137,73,0.06)",
      "rgba(107,23,218,0.06)",
      "rgba(107,23,218,0.04)",
      "rgba(26,205,235,0.06)",
      "rgba(225,137,73,0.05)",
      "rgba(107,23,218,0.04)",
    ]
  );

  const b8TitleText = "Let's get started";
  const b8CharCount = Math.min(
    b8TitleText.length,
    Math.floor(b8TypeProgress * b8TitleText.length + 0.001)
  );
  const b8Typed = b8TitleText.slice(0, b8CharCount);
  const b8TypingDone = b8CharCount >= b8TitleText.length;
  const b8ShowBlinkDot = b8TypingDone && p >= 0.978 && p < 0.988;

  return (
    <div ref={containerRef} className="relative z-10 w-full self-stretch h-[1700vh]">
      <div className="sticky top-0 z-20 h-svh w-full flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0 transition-none" style={{ background: bgBlue }} />

        {/* Beat 1 */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-10 gap-5"
          style={{ opacity: b1Op, transform: `translateY(${b1Y}px)` }}
        >
          <h1
            className="text-[clamp(1.85rem,4.8vw,3.75rem)] font-bold leading-[1.12] tracking-tight text-black max-w-4xl"
            style={serif}
          >
            The gap between AI capability and business reality.
            <br />
            We help you close it.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
            Your partner in turning AI experiments into results.
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

        {/* Beat 7 — cards */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-6 text-center z-10"
          style={{ opacity: b7Op, transform: `translateY(${b7Y}px)` }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8a8780] mb-5 md:mb-8"
            style={{ opacity: b7BridgeOp }}
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

        {/* Beat 8 */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 z-10 gap-6"
          style={{ opacity: b8Op, transform: `translateY(${b8Y}px)` }}
        >
          <h2
            className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight text-black text-center min-h-[1.2em]"
            style={serif}
          >
            {b8Typed}
            {!b8TypingDone && (
              <span
                className="inline-block w-[3px] h-[0.85em] bg-black ml-0.5 align-[-0.05em]"
                style={{ animation: "rt-blink 0.8s step-end infinite" }}
              />
            )}
            {b8ShowBlinkDot && (
              <span style={{ animation: "rt-blink 0.45s step-end infinite" }}>.</span>
            )}
            {b8TypingDone && !b8ShowBlinkDot && p >= 0.988 && "."}
          </h2>
          <Link
            href="/chat"
            className="block w-full max-w-lg rounded-2xl overflow-hidden"
            style={{
              opacity: b8TerminalOp,
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.14), 0 2px 8px rgba(0, 0, 0, 0.08)",
            }}
          >
            <div className="flex items-center gap-2 px-4 py-3" style={{ background: "#181818" }}>
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28ca41]" />
              <span className="ml-2 font-mono text-xs text-[#4a4a4a]">Radical Thinking / Agent</span>
            </div>
            <div className="px-6 py-6 text-left" style={{ background: "#0d0d0d" }}>
              <p className="text-base md:text-lg text-white leading-relaxed" style={{ ...serif, fontStyle: "italic" }}>
                &ldquo;Tell me about your bold idea. Where is it today versus where you intended it to be?&rdquo;
              </p>
              <div className="flex items-center gap-2 mt-4">
                <span className="text-[#28ca41] font-mono">›</span>
                <span className="font-mono text-sm text-[#555]">Start typing...</span>
                <span className="rt-cursor" />
              </div>
            </div>
          </Link>
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

function LandingMidSections() {
  const formulaRef = useRef(null);
  const { scrollYProgress: fP } = useScroll({ target: formulaRef, offset: ["start end", "center center"] });
  const eqScale = useTransform(fP, [0, 1], [0.7, 1]);
  const eqOp = useTransform(fP, [0, 0.55], [0, 1]);

  const cardsRef = useRef(null);
  const { scrollYProgress: cardsP } = useScroll({
    target: cardsRef,
    offset: ["start 0.8", "start 0.12"],
  });

  return (
    <>
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

          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {formulaCards.map((card) => (
              <FormulaFlipCard key={card.label} scrollYProgress={cardsP} card={card} />
            ))}
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
                  <h3 className="text-[1.2rem] font-semibold text-black mb-2 tracking-tight" style={serif}>{item.title}</h3>
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
            <span className="block text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-5">How We Work</span>
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
                cta: "Start with The Audit",
              },
              {
                num: "2", color: "#E18949", bg: "rgba(225,137,73,0.1)",
                label: "Step 2: The Build",
                title: "Build it properly. Not a pilot.",
                body: "We take the top priority from the Audit and build it to production standard. Not a demo. Not a proof of concept. Something your team uses every day, documented, and built to survive the next model update. The medium depends on the gap.",
                what: "30 days. Fixed price. One thing done right, running in your business.",
                cta: "Talk about The Build",
              },
              {
                num: "3", color: "#6B17DA", bg: "rgba(107,23,218,0.08)",
                label: "Step 3: The Partnership",
                title: "Stay ahead. Not catch up.",
                body: "The AI landscape resets every few months. New models, new capabilities, new ways to close gaps you did not know existed. The businesses that win are not the ones who built something once. They are the ones with a partner continuously asking if they are still building the right thing.",
                what: "Monthly capability review. Quarterly upgrades. Direct access when something changes or breaks. Cancel anytime.",
                cta: "Ask about The Partnership",
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
            <Link href="/work" className="text-xs font-semibold uppercase tracking-widest text-black border-b border-black pb-[2px] hover:opacity-50 transition-opacity">
              All Work
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { logo: "/logos/Kahulife-Logo.webp", href: "/work/kahulife", alt: "Kahulife" },
              { logo: "/logos/FF-Logo.webp", href: "/work/fluffyfriends", alt: "FluffyFriends" },
              { logo: "/logos/Animal-Intelligence.svg", href: "/work/animal-intelligence", alt: "Animal Intelligence" },
              { logo: "/logos/Tommy-Ellie-Logo.webp", href: "https://www.redbubble.com/people/Tommy-Ellie/shop", alt: "Tommy & Ellie" },
              { logo: null, href: "/work/microsoft-ai", alt: "Microsoft AI", label: "Microsoft AI" },
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
    </>
  );
}

export default function LandingV2() {
  return (
    <main className="relative flex flex-col items-stretch w-full min-h-screen overflow-x-clip">
      <span className={robotoSlab.className} hidden aria-hidden />
      <span className={robotoSlab.className} hidden aria-hidden />
      <div className="fixed inset-0 z-0 pointer-events-none gradient-background">
        <SoftBackground />
      </div>

      <Nav />

      <ScrollNarrative />

      <LandingMidSections />

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
