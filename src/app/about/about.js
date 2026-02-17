/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import Footer from "@/components/Footer";
import SoftBackground from "@/components/SoftBackground";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" }
    })
};

export default function About() {
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
                    className="w-full max-w-5xl space-y-12"
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
                            WHO IS RADICAL THINKING?
                        </h1>
                        <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                            We are an AI-native agency based in Dubai, bridging the gap between human creativity and artificial intelligence.
                        </p>
                    </motion.div>

                    {/* Ghost Cards Container */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Card 1: Our Story */}
                        <motion.article 
                            custom={1} 
                            variants={fadeInUp}
                            className="md:col-span-2 bg-white/40 backdrop-blur-md border border-white/50 shadow-sm rounded-3xl p-8 hover:shadow-md transition-all"
                        >
                            <h2 className="text-2xl font-bold mb-4 text-black">Our Story</h2>
                            <div className="text-gray-800 leading-relaxed space-y-4">
                                <p>
                                    We started this thing back in 2008, bringing a bit of Dutch directness to the dynamism of the UAE. The plan was simple: do remarkable work with great partners. We’re proud to say that part hasn't changed.
                                </p>
                                <p>
                                    What has changed is the world. We believe radical thinking leads to radical results, and right now, that means going all-in on AI. Whether you're a startup with a fresh idea or an established brand navigating a new landscape, we have the tools, the team, and the experience to help you make a real impact.
                                </p>
                            </div>
                        </motion.article>

                        {/* Card 2: Mission */}
                        <motion.article 
                            custom={2} 
                            variants={fadeInUp}
                            className="bg-white/40 backdrop-blur-md border border-white/50 shadow-sm rounded-3xl p-8 hover:shadow-md transition-all"
                        >
                            <h2 className="text-2xl font-bold mb-4 text-black">Mission</h2>
                            <p className="text-gray-800 leading-relaxed">
                                Fueled by radical thinking and a powerful AI-native core, our mission is to bring bold ideas to life through intelligent, unforgettable experiences that captivate audiences and elevate brands.
                            </p>
                        </motion.article>

                        {/* Card 3: Vision */}
                        <motion.article 
                            custom={3} 
                            variants={fadeInUp}
                            className="bg-white/40 backdrop-blur-md border border-white/50 shadow-sm rounded-3xl p-8 hover:shadow-md transition-all"
                        >
                            <h2 className="text-2xl font-bold mb-4 text-black">Vision</h2>
                            <p className="text-gray-800 leading-relaxed">
                                To be the leader for our clients' success in the AI era. We strive to empower brands to not just participate in the digital world, but to transform it, creating a lasting impact through intelligent and unforgettable experiences.
                            </p>
                        </motion.article>

                        {/* Card 4: The Location (AEO for Local SEO) */}
                        <motion.article 
                            custom={4} 
                            variants={fadeInUp}
                            className="md:col-span-2 bg-white/40 backdrop-blur-md border border-white/50 shadow-sm rounded-3xl p-8 hover:shadow-md transition-all text-center"
                        >
                            <h2 className="text-2xl font-bold mb-4 text-black">Where are we located?</h2>
                            <p className="text-gray-800 leading-relaxed max-w-3xl mx-auto mb-4">
                                Radical Thinking is headquartered in <strong>Dubai, United Arab Emirates</strong>. We serve a global clientele, bringing the innovative spirit of the UAE to projects around the world.
                            </p>
                            <p className="text-gray-500 text-sm">
                                DET Commercial License 714580 (Radical Thinking Web Design L.L.C). Licensed since 2014
                            </p>
                        </motion.article>
                    </div>
                </motion.div>
            </div>

            <Footer />
        </section>
    );
}