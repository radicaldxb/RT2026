"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (pathname === "/chat") return null;

  const links = [
    { label: "The Formula", href: "/#formula" },
    { label: "How We Work", href: "/#how" },
    { label: "Playbook", href: "/#playbook" },
    { label: "Insights", href: "/insights" },
    { label: "Talk to Us", href: "/#agent" },
  ];

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 md:py-5 transition-all duration-500 ${
          scrolled ? "bg-white/90 backdrop-blur-md border-b border-[#e8e4dc]" : "bg-transparent"
        }`}
      >
        <Link href="/">
          <Image
            src="/logos/RT-Logo-New.svg"
            alt="Radical Thinking"
            width={44}
            height={44}
            className="w-10 h-10 md:w-11 md:h-11"
            priority
          />
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/#agent"
            className="hidden md:inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest hover:opacity-80 transition-opacity"
          >
            Talk to Us
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-black/15 text-xs font-semibold uppercase tracking-widest hover:bg-black/5 transition-colors"
          >
            {open ? "Close" : "Menu"}
            <span className="flex flex-col gap-[3.5px]">
              <span className={`block w-3.5 h-[1.5px] bg-black transition-all duration-300 ${open ? "rotate-45 translate-y-[5px]" : ""}`} />
              <span className={`block w-3.5 h-[1.5px] bg-black transition-all duration-300 ${open ? "-rotate-45 -translate-y-[0px]" : ""}`} />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-6 md:gap-8">
              {links.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-serif block text-[clamp(2.5rem,7vw,5rem)] font-bold text-black hover:text-[#8a8780] transition-colors leading-none"
                    style={{ fontFamily: "'DM Serif Display', serif" }}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-8 flex gap-8 text-xs uppercase tracking-widest text-[#8a8780]"
            >
              <Link href="/privacy-policy" onClick={() => setOpen(false)} className="hover:text-black transition-colors">Privacy</Link>
              <Link href="/terms-of-use" onClick={() => setOpen(false)} className="hover:text-black transition-colors">Terms</Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
