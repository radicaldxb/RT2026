"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const isChat = pathname === "/chat";

  const handleHashClick = (e, hash) => {
    if (pathname === "/") {
      e.preventDefault();
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      else window.location.href = `/#${hash}`;
    }
  };

  return (
    <footer className={`w-full text-black px-4 ${isChat ? 'py-2' : 'py-10'}`}>
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-start gap-4 text-[10px] md:text-xs tracking-widest font-bold">
          <div className="flex gap-6 md:gap-10">
            <div className="flex flex-col gap-1">
              <Link href="/chat">CHAT</Link>
              <Link href="/#ideas" onClick={(e) => handleHashClick(e, "ideas")}>IDEAS</Link>
              <Link href="/#equation" onClick={(e) => handleHashClick(e, "equation")}>BI=C+EX+CT2</Link>
            </div>
            <div className="flex flex-col gap-1">
              <Link href="/#radical" onClick={(e) => handleHashClick(e, "radical")}>RADICAL THINKING</Link>
              <Link href="/privacy-policy">PRIVACY</Link>
              <Link href="/terms-of-use">TERMS OF USE</Link>
            </div>
          </div>
        </div>
        <hr className="border-t border-black/10 my-3" />
        <div className="flex justify-between items-center text-[9px] opacity-60">
          <p>RADICAL THINKING © 2025</p>
          <Link href="/"><img src="/logos/RT-Logo-New.svg" alt="RT" className="w-6 h-6" /></Link>
        </div>
      </div>
    </footer>
  );
}
