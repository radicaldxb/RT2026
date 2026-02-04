"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import SoftBackground from "@/components/SoftBackground";


export default function Home() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const router = useRouter();

  // 👇 handle user input (button / enter)
  const handleSubmit = () => {
    if (query.trim()) {
      router.push(`/chat?message=${encodeURIComponent(query)}`);
      setQuery(""); // clear
    } else {
      router.push("/chat");
    }
  };

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
    { src: "/logos/Kahulife-Logo.png", link: "https://kahulife.com" },
    { src: "/logos/Coming-Soon.svg", link: "#" },
    { src: "/logos/Coming-Soon.svg", link: "#" },
    { src: "/logos/Animal-Intelligence.svg", link: "https://animal-intelligence.ai" },
    { src: "/logos/Coming-Soon.svg", link: "#" },
  ];

  // For mobile, just reorder from desktop
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

  return (
    <main className="relative flex flex-col items-center w-full min-h-screen overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none gradient-background">
        <SoftBackground />
      </div>
      {/* ===== HERO / CHAT (id="chat") ===== */}
      <section id="chat" className="relative z-10 w-full md:min-h-[100dvh] flex flex-col items-center justify-start pt-16 pb-20 px-4 md:justify-center scroll-mt-24">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="z-10 space-y-10 max-w-3xl w-full">
          <div className="flex justify-center">
            <Link href="/">
              <Image src="/logos/RT-Logo-New.svg" alt="RT Logo" width={96} height={96} className="w-24 h-24 md:w-24 md:h-24" priority />
            </Link>
          </div>

          <div className="text-center space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-black">WE BRING BOLD IDEAS TO LIFE.</h1>
            <p className="text-lg md:text-xl text-black">AI NATIVE AT THE CORE, POWERED BY RADICAL THINKING.</p>
          </div>

          {/* Input with Search Icon */}
          <div
            className={`flex items-center bg-white px-4 md:px-10 py-4 rounded-full md:w-3/4 w-full h-18 mx-auto transition-all duration-300 border border-gray-300 ${focused ? "shadow-lg" : "shadow-sm"
              }`}
          >
            {/* <Image
              src="/logos/Search.svg"
              alt="Search"
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            /> */}
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Hi Radical Thinking, I would like to start an AI project"
              className="flex-1 text-sm md:text-xl bg-transparent outline-none text-black placeholder:text-black"
            />
          </div>

          {/* Button */}
          <div className="text-center">
            <button
              type="button"
              className="mt-1 bg-black text-white px-6 py-3 md:px-8 md:py-3 cursor-pointer rounded-full font-semibold hover:scale-105 active:scale-95 transition-transform duration-300"
              onClick={handleSubmit}
            >
              TALK TO US
            </button>
          </div>

        </motion.div>
      </section>
      {/* ===== IDEAS SHOWCASE (id="ideas") ===== */}
      <section id="ideas" className="relative z-10 w-full py-20 text-black hidden md:block scroll-mt-24">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-10 px-4">
          <h2 className="text-3xl md:text-4xl font-bold">IDEAS THAT WE MADE REAL</h2>
          <p className="text-lg mt-2">AND LIVED TO TELL THE TALE</p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-8 relative z-10">
            {desktopImages.slice(0, 3).map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                className="md:col-span-2 bg-white aspect-[4/3] rounded-2xl shadow-lg flex items-center justify-center p-6"
              >
                {item.src ? (
                  <Link href={item.link} target="_blank">
                    <Image
                      src={item.src}
                      alt={`Card ${i + 1}`}
                      width={220}
                      height={160}
                      className="object-contain w-auto h-auto max-w-full max-h-full"
                    />
                  </Link>
                ) : (
                  <span className="text-gray-600 text-lg font-semibold">
                    {/* COMING SOON! */}
                  </span>
                )}
              </motion.div>
            ))}

            {/* Bottom Row - Centered/Offset */}
            <motion.div
            custom={3}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true }}
            className="md:col-start-2 md:col-span-2 bg-white aspect-[4/3] rounded-2xl shadow-xl flex items-center justify-center p-6 z-30"
          >
              {desktopImages[3].src ? (
                <Link href={desktopImages[3].link} target="_blank">
                  <Image
                    src={desktopImages[3].src}
                    alt="Bottom Left"
                    width={220}
                    height={160}
                    className="object-contain w-auto h-auto max-w-full max-h-full"
                  />
                </Link>
              ) : (
                <span className="text-gray-600 text-lg font-semibold">
                  {/* COMING SOON! */}
                </span>
              )}
          </motion.div>

          <motion.div
            custom={4}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true }}
            className="md:col-span-2 bg-white aspect-[4/3] rounded-2xl shadow-xl flex items-center justify-center p-6"
          >
              {desktopImages[4].src ? (
                <Link href={desktopImages[4].link} target="_blank">
                  <Image
                    src={desktopImages[4].src}
                    alt="Bottom Right"
                    width={220}
                    height={160}
                    className="object-contain w-auto h-auto max-w-full max-h-full"
                  />
                </Link>
              ) : (
                <span className="text-gray-600 text-lg font-semibold">
                  {/* COMING SOON! */}
                </span>
              )}
          </motion.div>
          </div>
        </div>

      </section>
      {/* Mobile Ideas */}
      <section id="ideas-mobile" className="relative z-10 md:hidden w-full pt-24 pl-5 text-black scroll-mt-24">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-10 px-4">
          <h2 className="text-2xl font-bold">IDEAS THAT WE MADE REAL</h2>
          <p className="text-lg mt-1">AND LIVED TO TELL THE TALE</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 px-1">
            {mobileImages.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                transition={{ delay: index * 0.1, duration: 0.4, type: "spring" }}
                className="bg-white w-[220px] h-[180px] rounded-[22px] px-10 shadow-md flex items-center justify-center flex-shrink-0"
              >
                <Link href={item.link} target="_blank">
                  <Image src={item.src} alt={`Mobile Logo ${index + 1}`} width={150} height={100} className="max-h-[60%] w-auto object-contain" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
      {/* ===== EQUATION (id="equation") ===== */}
      <section id="equation" className="relative z-10 w-full px-4 py-20 md:py-28 flex flex-col items-center justify-center text-center scroll-mt-24">
        <motion.h2 
          className="text-4xl md:text-6xl font-bold mb-2 text-transparent bg-clip-text animate-gradient-loop" 
          style={{ backgroundImage: "linear-gradient(90deg, #1ACDEB, #6B17DA, #E18949, #1ACDEB)", backgroundSize: "200% auto" }}
          initial="hidden" 
          animate="visible" 
          variants={textFadeIn} 
          custom={0}
        >
          BI = C + Ex × T²
        </motion.h2>

        <motion.p className="text-sm md:text-base text-black mt-2" initial="hidden" animate="visible" variants={textFadeIn} custom={1}>
          BOLD IDEAS = CREATIVE + EXPERIENCE × TECHNOLOGY²
        </motion.p>

        <motion.div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-6xl" initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {[
            {
              title: "CREATIVE.",
              color: "#1ACDEB",
              content:
                "AI can generate a million ideas before you’ve finished your first coffee. But it can’t (yet) give an idea a soul. That’s where we come in. We add the human touch, the wit, and the “aha!” moment that turns a clever concept into something truly creative.",
            },
            {
              title: "EXPERIENCE.",
              color: "#E18949",
              content:
                "We’re obsessed with the entire experience—not just how it looks, but how it feels. How it sounds, what it makes you think, the impression it leaves long after you’ve walked away. We design for all the senses, creating unforgettable moments that connect with people on a human level.",
            },
            {
              title: "TECHNOLOGY.",
              color: "#6B17DA",
              content:
                "An idea without technology is just a thought. Technology is the amplifier, the engine, and the connector that makes it all happen. We take the most powerful tools—from foundational web tech to game-changing AI—and use them to give your bold ideas the muscle they need to make a real impact in the real world.",
            },
          ].map((item, i) => (
            <motion.div key={i} className="text-center px-6 bg-white/30 backdrop-blur-md shadow-lg hover:shadow-xl transition-all rounded-xl py-6 hover:scale-105 duration-300 border border-white/40" variants={textFadeIn} custom={i + 2}>
              <h3 className="text-xl font-bold mb-4" style={{ color: item.color }}>{item.title}</h3>
              <p className="text-black">{item.content}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
      {/* ===== RADICAL (id="radical") ===== */}
      <section id="radical" className="relative z-10 w-full flex justify-center items-center px-4 py-20 scroll-mt-24">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }} viewport={{ once: true }} className="w-full max-w-7xl rounded-[54px] px-6 md:px-20 py-16 text-center flex flex-col md:flex-row items-center justify-between gap-10" style={{ background: "linear-gradient(270deg, #E6FFFF 0%, #CCDEFF 52%, #EFF4FA 100%)" }}>
          <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} className="text-[72px] md:text-[96px] font-bold leading-none text-black">
            <div className="flex justify-center">
              <Image src="/logos/RT-Logo-New.svg" alt="RT Logo" width={112} height={112} className="w-20 h-20 md:w-28 md:h-28" />
            </div>
          </motion.div>

          <motion.div initial={{ x: 50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.2, ease: "easeOut" }} className="text-black text-lg md:text-xl leading-relaxed max-w-3xl text-center">
            <p className="mb-6">
              Let’s be honest, chasing the latest shiny tech trend is a full-time job. Good thing it’s our full-time job. The shiniest one right now is AI, and it’s about to change everything. So, we did what we always do—we took it apart, figured it out, and put it right at the center of our business. It lets us help our clients not just survive the change, but lead it.
            </p>
            <p className="font-bold text-lg">Radical Thinking</p>
          </motion.div>
        </motion.div>
      </section>
      <Footer />
    </main>
  );
}
