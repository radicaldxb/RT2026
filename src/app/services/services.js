/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import Footer from "@/components/Footer";
import SoftBackground from "@/components/SoftBackground";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" }
    })
};

const servicesList = [
    {
        title: "Artificial Intelligence & Automation",
        subtitle: "The Engine Room",
        description: "We move beyond simple chatbots to build autonomous, context-aware AI agents that integrate directly into your business logic. Using advanced RAG frameworks and automation platforms like n8n, we turn static data into active intelligence.",
        items: ["Custom AI Agents", "Generative AI & LLM Setup", "RAG Systems", "Workflow Automation", "Intelligent Chatbots"]
    },
    {
        title: "Digital Platforms & Ecosystems",
        subtitle: "Scalable Infrastructure",
        description: "A website is no longer a brochure; it’s a product. We build high-performance, scalable digital ecosystems designed for speed, security, and deep AI integration. Whether it’s headless commerce or GovTech, we build for the future.",
        items: ["Web Development (React/Next.js)", "App Development (iOS/Android)", "Headless E-commerce", "Prototyping & MVPs"]
    },
    {
        title: "Strategic Branding & Design",
        subtitle: "Visual Identity",
        description: "We combine strategic human creativity with generative AI tools to create bespoke visual identities. We don't just design logos; we build \"AI Personas\" and visual systems that translate across every digital touchpoint.",
        items: ["Brand Identity & Naming", "Experience Design (UI/UX)", "Graphic & Motion Design", "Go-to-Market Strategy"]
    },
    {
        title: "Immersive Narrative & Media",
        subtitle: "Storytelling",
        description: "Attention is the scarcest resource. We capture it by blending high-fidelity production with interactive technology. From branded podcast series to AR experiences, we create content that audiences don't just consume—they inhabit.",
        items: ["Video Production & VFX", "Podcast Series Production", "Immersive AR/VR", "Game Development (Unity/UE)"]
    }
];

export default function Services() {
    // FAQ Schema for Services
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": servicesList.map(service => ({
            "@type": "Question",
            "name": service.title,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": service.description
            }
        }))
    };

    return (
        <section className="relative w-full min-h-screen flex flex-col overflow-x-hidden">
            <Script id="faq-schema" type="application/ld+json">
                {JSON.stringify(faqSchema)}
            </Script>

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
                            INTELLIGENCE AS A SERVICE.
                        </h1>
                        <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                            We don't just build software. We engineer digital ecosystems powered by AI and driven by radical strategy.
                        </p>
                    </motion.div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {servicesList.map((service, index) => (
                            <motion.article 
                                key={index}
                                custom={index + 1} 
                                variants={fadeInUp}
                                className="bg-white/40 backdrop-blur-md border border-white/50 shadow-sm rounded-3xl p-8 hover:shadow-md transition-all flex flex-col"
                            >
                                <h2 className="text-2xl font-bold mb-2 text-black">{service.title}</h2>
                                <p className="text-gray-600 text-sm mb-4 uppercase tracking-wider font-semibold">{service.subtitle}</p>
                                <p className="text-gray-800 leading-relaxed mb-6">
                                    {service.description}
                                </p>
                                <ul className="space-y-2 mt-auto">
                                    {service.items.map((item, i) => (
                                        <li key={i} className="flex items-center text-gray-700 text-sm">
                                            <span className="w-1.5 h-1.5 bg-black rounded-full mr-3 flex-shrink-0"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.article>
                        ))}
                    </div>

                    {/* CTA */}
                    <motion.div variants={fadeInUp} custom={5} className="text-center pt-12 max-w-3xl mx-auto">
                        <div className="bg-white/40 backdrop-blur-md border border-white/50 shadow-sm rounded-3xl p-10">
                            <h3 className="text-2xl font-bold text-black mb-4">Not sure which combination you need?</h3>
                            <p className="text-gray-800 mb-8">
                                You don't need to pick from a menu. Tell our AI Agent what problem you are trying to solve, and it will architect the right solution for you.
                            </p>
                            <Link href="/chat?ref=services" className="inline-block bg-black text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform">
                                Ask the Agent Strategy
                            </Link>
                        </div>
                    </motion.div>

                </motion.div>
            </div>

            <Footer />
        </section>
    );
}