/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

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
      <motion.footer initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }} viewport={{ once: true }} className="md:w-3/4 md:mx-auto w-full px-4 md:px-20 py-10 text-black">
        <div className="flex md:flex-row justify-between items-start md:items-center gap-6 md:gap-0">
          <div className="flex flex-row md:flex-row md:gap-16 gap-12 text-sm md:text-base">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-col gap-1">
              {/* use onClick to intercept when already on '/' */}
              <Link href="/chat">CHAT</Link>
              <Link href="/#ideas" onClick={(e) => handleHashClick(e, "ideas")}>IDEAS</Link>
              <Link href="/#equation" onClick={(e) => handleHashClick(e, "equation")}>BI=C+EX+CT2</Link>
              <Link href="/#radical" onClick={(e) => handleHashClick(e, "radical")}>RADICAL THINKING</Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex flex-col gap-1 justify-end md:ml-10 mt-2 md:mt-0">
              <Link href="/privacy-policy">
                PRIVACY
              </Link>
              <Link href="/terms-of-use">
                TERMS OF USE
              </Link>
            </motion.div>
          </div>
        </div>

        <hr className="border-t border-black my-6" />

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="flex justify-between items-center text-sm md:text-base">
          <p className="text-black">RADICAL THINKING © {new Date().getFullYear()} </p>
          <div className="flex justify-center">
            <Link href="/" className="cursor-pointer">
              <img src="/logos/RT-Logo-New.svg" alt="RT Logo" className="w-10 h-10" />
            </Link>
          </div>
        </motion.div>
      </motion.footer>
    </section>
  );
}
