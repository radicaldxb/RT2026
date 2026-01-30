"use client";
import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <footer className="w-full">
      <div className="flex flex-col border-t border-black/10">
        <button onClick={() => setIsOpen(!isOpen)} className="flex justify-between items-center py-3 text-[10px] tracking-widest font-black opacity-60 uppercase">
          <span>{isOpen ? "CLOSE MENU" : "MENU"}</span>
          <span className="text-lg leading-none">{isOpen ? "−" : "+"}</span>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="flex justify-between items-start text-[10px] tracking-widest font-bold pb-6 overflow-hidden">
              <div className="flex gap-10">
                <div className="flex flex-col gap-2">
                  <Link href="/chat">CHAT</Link>
                  <Link href="/#ideas">IDEAS</Link>
                  <Link href="/#equation">BI=C+EX+CT2</Link>
                </div>
                <div className="flex flex-col gap-2">
                  <Link href="/privacy-policy">PRIVACY</Link>
                  <Link href="/terms-of-use">TERMS OF USE</Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex justify-between items-center text-[8px] opacity-40 py-2">
        <p>RADICAL THINKING © 2026</p>
        <Link href="/"><img src="/logos/RT-Logo-New.svg" alt="RT" className="w-4 h-4" /></Link>
      </div>
    </footer>
  );
}
