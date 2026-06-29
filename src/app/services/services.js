/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import SoftBackground from "@/components/SoftBackground";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { robotoSlab, serif } from "@/lib/fonts";

const E = [0.16, 1, 0.3, 1];
const VP = { once: false, margin: "0px 0px -100px 0px" };

const servicesList = [
    {
        title: "Artificial Intelligence & Automation",
        subtitle: "The Engine Room",
        description: "We build AI agents and automation systems that work inside your business — not alongside it. From intelligent chatbots to fully autonomous workflows, we use large language models, RAG frameworks, and platforms like n8n to turn your data and processes into something that thinks, responds, and acts.",
        items: [
            "Custom AI Agents",
            "Generative AI & LLM Integration",
            "RAG Systems & Knowledge Bases",
            "Workflow Automation (n8n)",
            "Intelligent Chatbots & Virtual Assistants",
        ],
    },
    {
        title: "Digital Platforms & Ecosystems",
        subtitle: "Built to Scale",
        description: "A website is a product, not a brochure. We build high-performance digital platforms on React and Next.js — fast, secure, and designed with AI integration from the ground up. From MVPs to full e-commerce ecosystems, we build for where you're going, not just where you are.",
        items: [
            "Web Development (React / Next.js)",
            "Mobile App Development (iOS / Android)",
            "Headless E-commerce",
            "Prototyping & MVPs",
            "API & Systems Integration",
        ],
    },
    {
        title: "Strategic Branding & Design",
        subtitle: "Identity That Works",
        description: "Brand is the feeling someone has about you before they've spoken to you. We build visual identities, AI personas, and design systems that work across every touchpoint — from a logo to a full UI system. Human creativity directed by strategy, executed with AI.",
        items: [
            "Brand Identity & Naming",
            "UI/UX & Experience Design",
            "Graphic & Motion Design",
            "AI Persona Development",
            "Go-to-Market Strategy",
        ],
    },
    {
        title: "Immersive Narrative & Media",
        subtitle: "Content Worth Experiencing",
        description: "In a world of infinite content, attention is earned not bought. We produce video, podcast, AR and interactive experiences that people don't just scroll past — they stop, watch, and remember. High-fidelity production meets interactive technology.",
        items: [
            "Video Production & VFX",
            "Podcast Series Production",
            "Immersive AR/VR Experiences",
            "Game Development (Unity / Unreal Engine)",
            "Branded Content & Storytelling",
        ],
    },
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
        <main className="relative flex flex-col w-full min-h-screen overflow-x-clip">
            <span className={robotoSlab.className} hidden aria-hidden />

            <Script id="faq-schema" type="application/ld+json">
                {JSON.stringify(faqSchema)}
            </Script>

            <div className="fixed inset-0 z-0 pointer-events-none gradient-background">
                <SoftBackground />
            </div>

            <Nav />

            <div className="relative z-10 w-full px-4 py-14 md:py-20 pt-24 md:pt-28">
                <div className="max-w-6xl mx-auto">
                    <motion.header
                        className="mb-8 md:mb-10 text-center md:text-left"
                        initial={{ opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: E }}
                    >
                        <span className="block text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-2">
                            Services
                        </span>
                        <h1
                            className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold text-black tracking-tight leading-[1.1]"
                            style={serif}
                        >
                            Intelligence as a service
                        </h1>
                        <p className="text-base text-gray-600 leading-relaxed mt-3 max-w-[560px] mx-auto md:mx-0">
                            From AI agents to digital platforms, branding to immersive media — we build bold ideas and put AI at the centre of how they work.
                        </p>
                    </motion.header>

                    <motion.div
                        className="rounded-2xl border border-[#e8e4dc]/90 bg-white overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)] mb-10 md:mb-12"
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.85, ease: E }}
                        viewport={VP}
                    >
                        <div className="p-6 md:p-8 border-b border-[#e8e4dc]/90">
                            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-2">
                                Engagement models
                            </p>
                            <h2 className="text-[clamp(1.2rem,2.3vw,1.6rem)] font-bold text-black leading-snug" style={serif}>
                                Three ways to work with us
                            </h2>
                            <p className="text-sm text-gray-600 leading-relaxed mt-2 max-w-[560px]">
                                Pick one or combine. Benefit-led, no jargon.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#e8e4dc]/90">
                            <div className="p-6 md:p-8">
                                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#8a8780] mb-2">
                                    The playbook
                                </p>
                                <h3 className="text-base md:text-lg font-semibold text-black mb-2 tracking-tight" style={serif}>
                                    AI Playbook in 10 Days
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    A fast, no-nonsense audit and roadmap. We map where you are, where AI can help, and what to do first—in 10 days. No long consultancy; just clarity and next steps.
                                </p>
                                <div className="mt-5">
                                    <Link
                                        href="/playbook"
                                        className="inline-flex items-center justify-center px-6 py-2.5 bg-black text-white rounded-full text-xs font-semibold uppercase tracking-widest hover:opacity-85 transition-opacity"
                                    >
                                        See the Playbook
                                    </Link>
                                </div>
                            </div>
                            <div className="p-6 md:p-8">
                                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#8a8780] mb-2">
                                    Human + AI
                                </p>
                                <h3 className="text-base md:text-lg font-semibold text-black mb-2 tracking-tight" style={serif}>
                                    Agent-in-the-Loop
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    AI that works with your team, not instead of it. We design agents that handle the heavy lifting while humans stay in control and your brand stays on track.
                                </p>
                            </div>
                            <div className="p-6 md:p-8">
                                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#8a8780] mb-2">
                                    Autonomous
                                </p>
                                <h3 className="text-base md:text-lg font-semibold text-black mb-2 tracking-tight" style={serif}>
                                    Autonomous Experience Studio
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    End-to-end campaigns and experiences built and run with AI. We set up the systems; you get radical ideas and execution that scale—without losing the human touch.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="rounded-2xl border border-[#e8e4dc]/90 bg-white p-6 md:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)] mb-10 md:mb-12"
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.85, ease: E }}
                        viewport={VP}
                    >
                        <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-2 text-center md:text-left">
                            Safety
                        </p>
                        <h2
                            className="text-[clamp(1.35rem,2.5vw,1.75rem)] font-bold text-black leading-snug mb-3 text-center md:text-left"
                            style={serif}
                        >
                            How we keep AI safe & sane
                        </h2>
                        <p className="text-sm text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto md:mx-0 text-center md:text-left">
                            We don't hand you a black box. We build in guardrails, human approval, and controlled scale so you stay in control and your brand stays safe.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                            {[
                                {
                                    title: "Guardrails",
                                    body: "We build in checks so AI stays on-brand and on-brief. No surprise outputs; no off-script content.",
                                    icon: (
                                        <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    ),
                                },
                                {
                                    title: "Human approval",
                                    body: "Nothing goes live without a human green light where it matters. You decide what gets published and when.",
                                    icon: (
                                        <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    ),
                                },
                                {
                                    title: "Controlled scale",
                                    body: "We grow capability step by step so you're never overwhelmed. Start small, prove value, then scale.",
                                    icon: (
                                        <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                        </svg>
                                    ),
                                },
                            ].map((item) => (
                                <div
                                    key={item.title}
                                    className="rounded-2xl border border-[#e8e4dc]/90 bg-[#fafaf8] p-5 md:p-6"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-white border border-[#e8e4dc]/90 flex items-center justify-center mb-4" aria-hidden>
                                        {item.icon}
                                    </div>
                                    <h3 className="text-sm font-semibold text-black mb-2 tracking-tight" style={serif}>
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {servicesList.map((service, index) => (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 40 + (index % 2) * 6 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: (index % 2) * 0.08, ease: E }}
                                viewport={VP}
                            >
                                <div className="bg-white rounded-2xl overflow-hidden border border-[#e8e4dc]/90 shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-6 md:p-8 h-full">
                                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#8a8780] mb-2">
                                        {service.subtitle}
                                    </p>
                                    <h2 className="text-[clamp(1.15rem,2.2vw,1.5rem)] font-bold text-black mb-3 leading-snug tracking-tight" style={serif}>
                                        {service.title}
                                    </h2>
                                    <p className="text-sm text-gray-600 leading-relaxed mb-5">
                                        {service.description}
                                    </p>
                                    <ul className="space-y-2">
                                        {service.items.map((item) => (
                                            <li key={item} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                                                <span className="mt-2 w-1.5 h-1.5 bg-black rounded-full flex-shrink-0" aria-hidden />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        className="mt-12 md:mt-16 max-w-lg mx-auto text-center"
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: E }}
                        viewport={VP}
                    >
                        <span className="block text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-3">
                            Talk to Us
                        </span>
                        <h2
                            className="text-[clamp(1.35rem,2.5vw,1.75rem)] font-bold text-black leading-snug mb-3"
                            style={serif}
                        >
                            Not sure where to start?
                        </h2>
                        <p className="text-sm text-gray-600 leading-relaxed mb-6">
                            You don't need to arrive with a brief. Tell us what problem you're trying to solve and the agent will help figure out the rest.
                        </p>
                        <Link
                            href="/chat?ref=services&source=services"
                            className="inline-flex items-center justify-center px-8 py-3.5 bg-black text-white rounded-full text-xs font-semibold uppercase tracking-widest hover:opacity-85 transition-opacity"
                        >
                            Talk to the Agent
                        </Link>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </main>
    );
}