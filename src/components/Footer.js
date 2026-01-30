"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Footer() {
  const pathname = usePathname();
  const isChat = pathname === "/chat";
  return (
    <footer className={`w-full text-black px-4 ${isChat ? 'py-1' : 'py-10'}`}>
      <div className="max-w-2xl mx-auto flex justify-between items-center text-[9px] opacity-60">
        <p>RADICAL THINKING © 2025</p>
        <Link href="/"><img src="/logos/RT-Logo-New.svg" alt="RT" className="w-5 h-5" /></Link>
      </div>
    </footer>
  );
}
