"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const isChat = pathname === '/chat';

  const handleHashClick = (e, hash) => {
    // If we're already on the homepage, prevent full navigation and scroll smoothly
    if (pathname === "/") {
      e.preventDefault();
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        // fallback: set location to anchor (will navigate)
        window.location.href = `/#${hash}`;
      }
    }
    // If not on homepage, let Link navigate (no preventDefault)
  };

  return (
    <section className="w-full flex justify-center items-center px-4 py-5 relative overflow-hidden">
      <motion.footer initial={{ opacity: 0, y: 40 }} whileInView={!isChat ? { opacity: 1, y: 0 } : undefined} animate={isChat ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 1, ease: "easeOut" }} viewport={{ once: true }} className="md:w-3/4 md:mx-auto w-full px-4 md:px-20 py-10 text-black">
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-start gap-8 md:gap-0">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={!isChat ? { opacity: 1, x: 0 } : undefined}
            animate={isChat ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-2 text-sm"
          >
            <Link href="/chat">CHAT</Link>
            <Link href="/#how" onClick={(e) => handleHashClick(e, "how")}>HOW WE WORK</Link>
            <Link href="/#playbook" onClick={(e) => handleHashClick(e, "playbook")}>PLAYBOOK</Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={!isChat ? { opacity: 1, y: 0 } : undefined}
            animate={isChat ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-2 text-sm"
          >
            <Link href="/insights">INSIGHTS</Link>
            <Link href="/portfolio">WORK</Link>
            <Link href="/#formula" onClick={(e) => handleHashClick(e, "formula")}>BI=C+EX×T²</Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={!isChat ? { opacity: 1, x: 0 } : undefined}
            animate={isChat ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col gap-2 text-sm"
          >
            <Link href="/#radical" onClick={(e) => handleHashClick(e, "radical")}>RADICAL THINKING</Link>
            <Link href="/privacy-policy">PRIVACY</Link>
            <Link href="/terms-of-use">TERMS OF USE</Link>
          </motion.div>

        </div>

        <hr className="border-t border-black my-6" />

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={!isChat ? { opacity: 1, y: 0 } : undefined} animate={isChat ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.6, delay: 0.6 }} className="flex justify-between items-center text-sm md:text-base">
          <p className="text-black">RADICAL THINKING © 2026</p>
          <div className="flex justify-center">
            <Link href="/" className="cursor-pointer">
              <Image src="/logos/RT-Logo-New.svg" alt="RT Logo" width={40} height={40} className="w-10 h-10" />
            </Link>
          </div>
        </motion.div>
      </motion.footer>
    </section>
  );
}
