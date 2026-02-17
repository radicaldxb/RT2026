"use client";

import React, { useState } from "react";
import Footer from "@/components/Footer";
import SoftBackground from "@/components/SoftBackground";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { portfolio } from "./projects";

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" }
    })
};

export default function Portfolio() {
    const [activeTag, setActiveTag] = useState("All");

    // Extract unique tags
    const allTags = ["All", ...new Set(portfolio.flatMap(item => item.tags))];

    // Filter portfolio
    const filteredPortfolio = activeTag === "All" ? portfolio : portfolio.filter(item => item.tags.includes(activeTag));

    return (
        <section className="relative w-full min-h-screen flex flex-col overflow-x-hidden">
            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none gradient-background">
                <SoftBackground />
            </div>

            {/* Back Button */}
            <div className="absolute top-6 left-6 z-20">
                <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    <span className="font-medium">Back to Home</span>
                </Link>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex-1 flex flex-col items-center pt-24 px-4 pb-20">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    className="w-full max-w-6xl space-y-12"
                >
                    {/* Header */}
                    <motion.div variants={fadeInUp} className="text-center space-y-6">
                        <Link href="/" className="inline-block">
                            <Image
                                src="/logos/RT-Logo-New.svg"
                                alt="Radical Thinking Logo"
                                width={96}
                                height={96}
                                className="w-24 h-24 mx-auto"
                            />
                        </Link>
                        <h1 className="text-4xl md:text-6xl font-bold text-black">
                            SELECTED WORK
                        </h1>
                        <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                            Where bold ideas meet execution.
                        </p>
                    </motion.div>

                    {/* Filter Buttons */}
                    <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-3 mb-12">
                        {allTags.map((tag, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveTag(tag)}
                                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                                    activeTag === tag 
                                    ? "bg-black text-white shadow-md scale-105" 
                                    : "bg-white/50 text-gray-600 hover:bg-white hover:text-black"
                                }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </motion.div>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {filteredPortfolio.map((item, index) => (
                            <motion.article
                                key={index}
                                custom={index + 1} 
                                variants={fadeInUp}
                                className="bg-white/40 backdrop-blur-md border border-white/50 shadow-sm rounded-3xl p-8 hover:shadow-md transition-all flex flex-col group"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">{item.category}</span>
                                        <h2 className="text-2xl font-bold text-black mt-1">{item.title}</h2>
                                    </div>
                                    {item.link !== "#" && (
                                        <Link 
                                            href={item.link} 
                                            target={item.link.startsWith("http") ? "_blank" : "_self"} 
                                            rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                                            className="p-2 bg-white/50 rounded-full hover:bg-white transition-colors"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M7 17l9.2-9.2M17 17V7H7"/>
                                            </svg>
                                        </Link>
                                    )}
                                </div>
                                <p className="text-gray-800 leading-relaxed">
                                    {item.description}
                                </p>
                            </motion.article>
                        ))}
                    </div>

                    {/* CTA */}
                    <motion.div variants={fadeInUp} custom={5} className="text-center pt-8">
                        <p className="text-lg mb-6">Want to see more?</p>
                        <Link href="/chat" className="inline-block bg-black text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform">
                            Ask our AI about our full portfolio
                        </Link>
                    </motion.div>

                </motion.div>
            </div>

            <Footer />
        </section>
    );
}