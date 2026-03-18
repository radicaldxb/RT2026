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
                            An AI-native agency based in Dubai. Built different by design.
                        </p>
                    </motion.div>

                    {/* How We Work — light, scannable */}
                    <motion.div variants={fadeInUp} custom={1} className="bg-white/95 border border-gray-200 shadow-sm rounded-3xl overflow-hidden">
                        <div className="p-8 md:p-10 text-center border-b border-gray-100">
                            <h2 className="text-2xl md:text-3xl font-bold text-black mb-3">
                                How we work as an AI-native agency
                            </h2>
                            <p className="text-gray-600 max-w-xl mx-auto text-lg leading-relaxed">
                                Powered by Radical Thinking. AI-native at the core.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                            <div className="p-8 md:p-10 flex flex-col items-center text-center group hover:bg-gray-50/80 transition-colors">
                                <span className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center text-2xl font-bold mb-5 group-hover:scale-105 transition-transform" aria-hidden>1</span>
                                <h3 className="text-lg font-bold text-black mb-2">The idea</h3>
                                <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                                    Bold before buildable. We start with what would actually make a difference — not what's easiest to execute. Every project begins by asking whether the idea is worth building at all.
                                </p>
                            </div>
                            <div className="p-8 md:p-10 flex flex-col items-center text-center group hover:bg-gray-50/80 transition-colors">
                                <span className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center text-2xl font-bold mb-5 group-hover:scale-105 transition-transform" aria-hidden>2</span>
                                <h3 className="text-lg font-bold text-black mb-2">The feeling</h3>
                                <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                                    Not just used. Remembered. We design for the impression that stays after the screen closes, the campaign ends, or the conversation finishes. That feeling is what brings people back.
                                </p>
                            </div>
                            <div className="p-8 md:p-10 flex flex-col items-center text-center group hover:bg-gray-50/80 transition-colors">
                                <span className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center text-2xl font-bold mb-5 group-hover:scale-105 transition-transform" aria-hidden>3</span>
                                <h3 className="text-lg font-bold text-black mb-2">The loop</h3>
                                <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                                    This is where AI earns its square. We use it to test, validate, and improve — continuously. What's working gets pushed further. What isn't gets fixed. The idea gets smarter every cycle.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Ghost Cards Container */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Card 1: Our Story */}
                        <motion.article 
                            custom={1} 
                            variants={fadeInUp}
                            className="md:col-span-2 bg-white border border-gray-200 shadow-sm rounded-3xl p-8 hover:shadow-md transition-all"
                        >
                            <h2 className="text-2xl font-bold mb-4 text-black">Our Story</h2>
                            <div className="text-gray-800 leading-relaxed space-y-4">
                                <p>
                                    Radical Thinking didn't start in 2009. It started in 2005 — when a university intern walked into Microsoft's Dubai office and made himself impossible to forget. Four years later, freshly graduated and newly arrived in a city still shaking off the 2008 crash, that network opened the first doors. Microsoft, HP, Lenovo. Not bad for someone who'd never had a proper job.
                                </p>
                                <p>
                                    The crash that wiped out agencies became the launch platform. No overhead, no bloat — just sharp thinking and fast execution. For over a decade the agency punched above its weight, always at the front of the technology curve, building for some of the biggest tech brands in the region.
                                </p>
                                <p>
                                    Then AI arrived. And it changed the question. Not "how do we keep up?" but "what does an agency look like when the tools finally match the ambition?" Radical Thinking is the answer to that question. Lean by design. AI-native by conviction. Built to deliver what used to take a floor full of people — without the floor.
                                </p>
                            </div>
                        </motion.article>

                        {/* Card 2: Mission */}
                        <motion.article 
                            custom={2} 
                            variants={fadeInUp}
                            className="bg-white border border-gray-200 shadow-sm rounded-3xl p-8 hover:shadow-md transition-all"
                        >
                            <h2 className="text-2xl font-bold mb-4 text-black">Mission</h2>
                            <p className="text-gray-800 leading-relaxed">
                                To help businesses stop fearing AI and start leading with it. We find where AI creates real value, build around it, and deliver products and experiences that work in the real world.
                            </p>
                        </motion.article>

                        {/* Card 3: Vision */}
                        <motion.article 
                            custom={3} 
                            variants={fadeInUp}
                            className="bg-white border border-gray-200 shadow-sm rounded-3xl p-8 hover:shadow-md transition-all"
                        >
                            <h2 className="text-2xl font-bold mb-4 text-black">Vision</h2>
                            <p className="text-gray-800 leading-relaxed">
                                Bold ideas shouldn't be limited by team size or budget. One sharp mind with the right tools should be able to build what used to take twenty people. That's not the future — that's now.
                            </p>
                        </motion.article>

                        {/* CTA Card: Start the conversation */}
                        <motion.article
                            custom={4}
                            variants={fadeInUp}
                            className="md:col-span-2 bg-gradient-to-b from-blue-50 to-blue-100 rounded-2xl rounded-br-none p-8 text-center space-y-6 shadow-sm"
                        >
                            <h3 className="text-xl font-bold text-black">Ready to build something bold?</h3>
                            <p className="text-gray-800">
                                Why browse static pages when you can have a conversation? The agent knows everything about Radical Thinking and is ready to help.
                            </p>
                            <div className="pt-2">
                                <Link
                                    href="/chat"
                                    className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg"
                                >
                                    Start the Conversation
                                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                    </svg>
                                </Link>
                            </div>
                        </motion.article>

                        {/* Card 4: The Location (AEO for Local SEO) */}
                        <motion.article 
                            custom={5} 
                            variants={fadeInUp}
                            className="md:col-span-2 bg-white border border-gray-200 shadow-sm rounded-3xl p-8 hover:shadow-md transition-all text-center"
                        >
                            <h2 className="text-2xl font-bold mb-4 text-black">Where are we located?</h2>
                            <p className="text-gray-800 leading-relaxed max-w-3xl mx-auto mb-4">
                                Radical Thinking is headquartered in <strong>Dubai, United Arab Emirates</strong>. We serve a global clientele, bringing the innovative spirit of the UAE to projects around the world.
                            </p>
                            <p className="text-gray-500 text-sm">
                                DET Commercial License 714580 (Radical Thinking Web Design L.L.C). Licensed since 2014
                            </p>
                        </motion.article>

                        {/* Card 5: KEY FACTS */}
                        <motion.article 
                            custom={6} 
                            variants={fadeInUp}
                            className="md:col-span-2 bg-white border border-gray-200 shadow-sm rounded-3xl p-8 hover:shadow-md transition-all"
                        >
                            <h2 className="text-2xl font-bold mb-4 text-black">KEY FACTS</h2>
                            <div className="text-gray-800 leading-relaxed space-y-1">
                                <p><strong>Founded:</strong> 2009, Dubai, UAE</p>
                                <p><strong>Founder:</strong> Stephan van Wijk</p>
                                <p><strong>Clients supported:</strong> 1001 Inventions, Microsoft, The Netherlands Government, Lenovo, Ministry of Finance of the UAE, Ministry of Economy of the UAE, Simon Snelder, Payment Partners, AI Networks, HP, and more.</p>
                                <p><strong>Formula:</strong> BI = C + Ex × T² (Bold Ideas = Creative + Experience × Technology²)</p>
                                <p><strong>Services:</strong> AI Solutions, Web platforms, Automations, Strategy, branding, and digital.</p>
                                <p><strong>Radical Thinking products:</strong> FluffyFriends (AI pet portraits), KahuLife, Animal Intelligence, Webinarlife</p>
                                <p><strong>License:</strong> DET Commercial License 714580, Radical Thinking Web Design L.L.C, licensed since 2014</p>
                                <p><strong>Location:</strong> Dubai, United Arab Emirates</p>
                                <p><strong>Website:</strong> radical-thinking.net</p>
                            </div>
                        </motion.article>
                    </div>
                </motion.div>
            </div>

            <Footer />
        </section>
    );
}