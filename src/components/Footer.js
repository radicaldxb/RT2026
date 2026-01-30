"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Footer() {
  const pathname = usePathname();
  const handleHashClick = (e, hash) => {
    if (pathname === "/") {
      e.preventDefault();
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      else window.location.href = `/#${hash}`;
    }
  };
  return (
    <footer className="w-full text-black px-4 py-10 mt-10 z-20 relative">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-start gap-8 text-[10px] tracking-widest font-bold">
          <div className="flex gap-12">
            <div className="flex flex-col gap-2">
              <Link href="/chat">CHAT</Link>
              <Link href="/#ideas" onClick={(e) => handleHashClick(e, "ideas")}>IDEAS</Link>
              <Link href="/#equation" onClick={(e) => handleHashClick(e, "equation")}>BI=C+EX+CT2</Link>
              <Link href="/#radical" onClick={(e) => handleHashClick(e, "radical")}>RADICAL THINKING</Link>
            </div>
            <div className="flex flex-col gap-2">
              <Link href="/privacy-policy">PRIVACY</Link>
              <Link href="/terms-of-use">TERMS OF USE</Link>
            </div>
          </div>
        </div>
        <hr className="border-t border-black my-8" />
        <div className="flex justify-between items-center text-[10px]">
          <p>RADICAL THINKING © 2026</p>
          <Link href="/"><img src="/logos/RT-Logo-New.svg" alt="RT Logo" className="w-8 h-8 cursor-pointer" /></Link>
        </div>
      </div>
    </footer>
  );
}
