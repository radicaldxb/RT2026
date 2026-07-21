"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const isChat = pathname === "/chat";

  return (
    <section className="w-full flex justify-center items-center px-4 py-5 relative overflow-hidden">
      <motion.footer initial={{ opacity: 0, y: 40 }} whileInView={!isChat ? { opacity: 1, y: 0 } : undefined} animate={isChat ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 1, ease: "easeOut" }} viewport={{ once: true }} className="md:w-3/4 md:mx-auto w-full px-4 md:px-20 py-10 text-black">
        <div className="flex flex-col md:flex-row md:justify-between items-start gap-8 md:gap-0">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={!isChat ? { opacity: 1, y: 0 } : undefined}
            animate={isChat ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-2 text-sm"
          >
            <Link href="/how-we-work">HOW WE WORK</Link>
            <Link href="/services">SERVICES</Link>
            <Link href="/chat">CHAT</Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={!isChat ? { opacity: 1, y: 0 } : undefined}
            animate={isChat ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-2 text-sm"
          >
            <Link href="/insights">INSIGHTS</Link>
            <Link href="/work">WORK</Link>
            <Link href="/about">ABOUT</Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={!isChat ? { opacity: 1, y: 0 } : undefined}
            animate={isChat ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col gap-2 text-sm"
          >
            <Link href="/intelligence">INTELLIGENCE</Link>
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
