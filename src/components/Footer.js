"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Footer() {
  const [isOpen, setIsOpen] = useState(true);
  useEffect(() => { if (window.innerWidth < 768) setIsOpen(false); }, []);

  return (
    <footer className="w-full mt-4">
      <div className="border-t border-black/10">
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden w-full flex justify-between items-center py-4 text-[10px] tracking-widest font-black uppercase">
          <span>{isOpen ? "CLOSE MENU" : "MENU"}</span><span>{isOpen ? "−" : "+"}</span>
        </button>
        {isOpen && (
          <div className="flex gap-12 text-[10px] font-bold py-6 tracking-widest uppercase">
            <div className="flex flex-col gap-2"><Link href="/chat">CHAT</Link><Link href="/#ideas">IDEAS</Link><Link href="/#equation">BI=C+EX+CT2</Link></div>
            <div className="flex flex-col gap-2"><Link href="/privacy-policy">PRIVACY</Link><Link href="/terms-of-use">TERMS OF USE</Link></div>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center text-[9px] opacity-40 py-4 border-t border-black/5">
        <p>RADICAL THINKING © 2026</p>
        <Link href="/"><img src="/logos/RT-Logo-New.svg" alt="RT" className="w-5 h-5" /></Link>
      </div>
    </footer>
  );
}
