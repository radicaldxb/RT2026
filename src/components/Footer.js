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
      <motion.footer initial={{       <motion.footer whi      <motion.footer initial={{        } : undefined} a      <motion.footer icity:      <motion.footer initial={{ on={{ du      <motion.footer initi }}       <motion.footer initial=ssN      <motion.footer initial={{       <moti20 py-10 text-black">
        <div class        <div class        <div cet        <div class        <div c gap-6 m        <div class        <div class   x         <div class        <div class        <div cet        <div class        <diviv         <div class        -3        <div class     at         <div class        <div class     te={isC        <dicity: 1, x: 0 } : undefined} transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-col gap-1">
              {/* use onClick to intercept when already on '/' */}
              <Link href="/chat">CHAT</Link>
              <Link href="/#ideas" onClick={(e) => handleHashClick(e, "ideas")}>IDEAS</Link>
              <Link href="/#equation" onClick={(e) => handleHashClick(e, "equation")}>BI=C+EX+CT2</Link>
              <Link href="/#radical" onClick={(e) => handleHashClick(e, "radical")}>RADICAL THINKING</Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={!isChat ? { opacity: 1, x: 0 } : undefined} animate={isChat ? { opacity: 1            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={!isChat ? { opacity: 1, x: 0 } : undefined} animate={isChat ? { opacity: 1            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={!isChat ? { opacity: 1, x: 0 } : undefined} animate={isChat ? { opacity: 1            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={!isChat ? { opacity: 1, x: 0 } : undefined} animate={isChat ? { opacity: 1        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={!isChat ? { opacity: 1, y: 0 } : undefined} animate={i            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={!isChat ? { opacitassNam            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={!isChat ? { opacity: 1, x: 0 } : u THINKING © 2026</p>
          <div className="flex justify-center">
            <Link href="/" className="cu            <Lin             <Image src="/logos/RT-Logo-New.svg" alt="RT Logo" width={40} height={40} className="w-10 h-10" />
            </Link>
          </div>
        </motion.div>
      </motion.footer>
    </section>
  );
}
