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
        <section className="relative w-full min-h-screen flex flex-col overflow-x-hidden">
            <Script id="faq-schema" type="application/ld+json">
                {JSON.stringify(faqSchema)}
            </Script>

            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none gradient-background">
                <SoftBackground />
            </div>

            <Nav />

            {/* Main Content */}
            <div className="relative z-10 flex-1 flex flex-col items-center pt-20 md:pt-24 px-4 pb-20">
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
                            From AI agents to digital platforms, branding to immersive media — we build bold ideas and put AI at the centre of how they work.
                        </p>
                    </motion.div>

                    {/* AI-Native Service Products */}
                    <motion.div variants={fadeInUp} custom={1} className="bg-white border border-gray-200 shadow-sm rounded-3xl overflow-hidden">
                        <div className="p-8 md:p-10 text-center border-b border-gray-100">
                            <h2 className="text-2xl md:text-3xl font-bold text-black mb-3">
                                AI-native service products
                            </h2>
                            <p className="text-gray-600 max-w-xl mx-auto">
                                Three ways to work with us—pick one or combine. Benefit-led, no jargon.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                            <div className="p-8 md:p-10 flex flex-col group hover:bg-gray-50/80 transition-colors">
                                <h3 className="text-xl font-bold text-black mb-3">AI Playbook in 10 Days</h3>
                                <p className="text-gray-600 text-sm leading-relaxed flex-1">
                                    A fast, no-nonsense audit and roadmap. We map where you are, where AI can help, and what to do first—in 10 days. No long consultancy; just clarity and next steps.
                                </p>
                            </div>
                            <div className="p-8 md:p-10 flex flex-col group hover:bg-gray-50/80 transition-colors">
                                <h3 className="text-xl font-bold text-black mb-3">Agent-in-the-Loop</h3>
                                <p className="text-gray-600 text-sm leading-relaxed flex-1">
                                    AI that works with your team, not instead of it. We design agents that handle the heavy lifting while humans stay in control and your brand stays on track.
                                </p>
                            </div>
                            <div className="p-8 md:p-10 flex flex-col group hover:bg-gray-50/80 transition-colors">
                                <h3 className="text-xl font-bold text-black mb-3">Autonomous Experience Studio</h3>
                                <p className="text-gray-600 text-sm leading-relaxed flex-1">
                                    End-to-end campaigns and experiences built and run with AI. We set up the systems; you get radical ideas and execution that scale—without losing the human touch.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* How We Keep AI Safe & Sane */}
                    <motion.div variants={fadeInUp} custom={2} className="bg-white border border-gray-200 shadow-sm rounded-3xl p-8 md:p-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-black mb-3 text-center">
                            How we keep AI safe & sane
                        </h2>
                        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
                            We don't hand you a black box. We build in guardrails, human approval, and controlled scale so you stay in control and your brand stays safe.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mx-auto mb-4" aria-hidden>
                                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                </div>
                                <h3 className="text-lg font-bold text-black mb-2">Guardrails</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    We build in checks so AI stays on-brand and on-brief. No surprise outputs; no off-script content.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mx-auto mb-4" aria-hidden>
                                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                </div>
                                <h3 className="text-lg font-bold text-black mb-2">Human approval</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Nothing goes live without a human green light where it matters. You decide what gets published and when.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mx-auto mb-4" aria-hidden>
                                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                                </div>
                                <h3 className="text-lg font-bold text-black mb-2">Controlled scale</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    We grow capability step by step so you're never overwhelmed. Start small, prove value, then scale.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {servicesList.map((service, index) => (
                            <motion.article 
                                key={index}
                                custom={index + 3} 
                                variants={fadeInUp}
                                className="bg-white border border-gray-200 shadow-sm rounded-3xl p-8 hover:shadow-md transition-all flex flex-col"
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
                    <motion.div variants={fadeInUp} custom={5} className="text-center pt-4 w-full">
                        <div className="bg-gradient-to-b from-blue-50 to-blue-100 rounded-2xl rounded-br-none p-8 text-center space-y-6 shadow-sm">
                            <h3 className="text-xl font-bold text-black">Not sure where to start?</h3>
                            <p className="text-gray-800">
                                You don't need to arrive with a brief. Tell us what problem you're trying to solve and the agent will help figure out the rest.
                            </p>
                            <div className="pt-2">
                                <Link
                                    href="/chat?ref=services"
                                    className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg"
                                >
                                    Talk to the Agent
                                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </motion.div>

                </motion.div>
            </div>

            <Footer />
        </section>
    );
}