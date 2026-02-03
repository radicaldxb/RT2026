"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import SoftBackground from "@/components/SoftBackground";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <main className="relative flex flex-col items-center w-full min-h-screen overflow-x-hidden text-black">
      <div className="fixed inset-0 z-0 pointer-events-none gradient-background">
        <SoftBackground />
      </div>

      <section className="relative z-10 flex flex-col items-center justify-center flex-grow w-full px-4 py-20">
        <div className="flex flex-col items-center max-w-4xl space-y-8 text-center">
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/images/RT-404-768x581.webp"
              alt="404 Page Not Found"
              width={768}
              height={581}
              className="w-full max-w-[600px] h-auto object-contain"
              priority
            />
          </motion.div>
          
          <div className="space-y-4">
            <h1 className="text-4xl font-bold md:text-5xl">404: Even our AI couldn&apos;t find this page.</h1>
            <p className="text-lg md:text-xl">
              It’s either a bold idea that hasn&apos;t been born yet, or you&apos;ve wandered off the grid
            </p>
          </div>

          <Link
            href="/"
            className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
          >
            BACK TO HOMEPAGE
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}