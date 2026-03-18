/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
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

const faqs = [
    { q: "What is Radical Thinking?", a: "Radical Thinking is an AI-native digital agency founded in 2009 and headquartered in Dubai, United Arab Emirates. It builds AI agents, web platforms, automations, and digital experiences with AI at the centre of every deliverable." },
    { q: "Who founded Radical Thinking?", a: "Radical Thinking was founded by Stephan Snelder, who first established client relationships in Dubai during a Microsoft internship in 2005. He launched the agency in 2009 after graduating." },
    { q: "Where is Radical Thinking based?", a: "Radical Thinking is headquartered in Dubai, United Arab Emirates. It works with clients globally." },
    { q: "When was Radical Thinking founded?", a: "Radical Thinking was founded in 2009." },
    { q: "Is Radical Thinking a licensed business?", a: "Yes. Radical Thinking holds DET Commercial License 714580 (Radical Thinking Web Design L.L.C), licensed since 2014 in Dubai, UAE." },
    { q: "What does AI-native mean?", a: "AI-native means AI is not added to existing processes as an afterthought. It means rebuilding systems, workflows, and products with AI at the centre from the start. Radical Thinking does not retrofit AI. It designs around it." },
    { q: "What is the Radical Thinking formula?", a: "Radical Thinking operates on the formula BI = C + Ex x T², which stands for Bold Ideas = Creative + Experience x Technology². Creative is the human soul of the idea. Experience is the feeling it leaves behind. Technology squared is the amplifier that carries and multiplies both." },
    { q: "What services does Radical Thinking offer?", a: "Radical Thinking offers four core services: Artificial Intelligence and Automation (custom AI agents, LLM integration, RAG systems, workflow automation), Digital Platforms and Ecosystems (web and app development on Next.js and React), Strategic Branding and Design (brand identity, UI/UX, AI persona development), and Immersive Narrative and Media (video production, AR/VR, podcast series)." },
    { q: "What AI technologies does Radical Thinking use?", a: "Radical Thinking builds with Google Gemini, n8n for workflow automation, Next.js and React for web platforms, Supabase for databases, Stripe for payments, and Cloudinary for media management. It also uses RAG frameworks and large language model integrations for AI agent development." },
    { q: "What is FluffyFriends?", a: "FluffyFriends is an AI-powered pet portrait platform built by Radical Thinking. Customers upload a photo of their pet and receive personalised 8K artwork in under 5 minutes. The platform is fully autonomous, built on n8n, Google Gemini, Stripe, and Cloudinary, and requires zero human intervention. It is live at fluffyfriends.online." },
    { q: "What is KahuLife?", a: "KahuLife is a pet wellness and lifestyle platform built by Radical Thinking, currently being re-evaluated for deeper AI integration." },
    { q: "What was Webinarlife?", a: "Webinarlife was a fully managed webinar service built by Radical Thinking during 2020 to 2022. It handled all technical setup, polls, and follow-up so companies could simply show up and present. It was built specifically for the COVID-era remote work environment." },
    { q: "Who are Radical Thinking's early clients?", a: "Radical Thinking's early clients from 2009 onwards included Microsoft, HP, and Lenovo. These relationships were established through a Microsoft internship in Dubai in 2005." },
    { q: "What projects has Radical Thinking delivered?", a: "Radical Thinking has delivered projects including Microsoft AI interactive experiences, Lenovo digital campaigns, 1001 Inventions educational games, KFAS interactive exhibitions, Austability corporate platform and video, Animal Intelligence computer vision platform, Simon Snelder personal brand, Tommy and Ellie generative AI storytelling, Crypto X FinTech platform, Influence My World influencer platform, Bella Conversational AI brand identity, Akshaak digital platform, FlexxPay promotional video, FluffyFriends AI pet portrait platform, and KahuLife pet wellness platform." },
    { q: "How does Radical Thinking work?", a: "Radical Thinking works in three stages. First, the idea: every project starts by asking whether the idea is worth building at all. Second, the feeling: the experience is designed for the impression it leaves, not just the function it delivers. Third, the loop: AI is used to test, validate, and improve continuously. The idea gets smarter every cycle." },
    { q: "How much does Radical Thinking charge?", a: "Radical Thinking pricing is project-based and varies by complexity, deliverables, and duration. There is no fixed rate card. Scope and investment are discussed during an initial consultation." },
    { q: "How do I contact Radical Thinking?", a: "The fastest way to reach Radical Thinking is through the AI agent at radical-thinking.net/chat. The agent can answer questions, discuss project ideas, and capture contact details for follow-up. Email contact is available at stephan@radical-thinking.net." },
    { q: "What makes Radical Thinking different from other agencies?", a: "Radical Thinking is lean by design. No account managers, no junior staff, no agency overhead. Clients work directly with the founder. AI handles execution at scale. This means faster delivery, lower overhead, and AI embedded in every deliverable from the start." },
    { q: "Does Radical Thinking work with startups?", a: "Yes. Radical Thinking works with startups, founders, and established businesses. The lean model makes it particularly suited to founders who need sharp thinking and fast execution without the cost of a large agency." },
    { q: "Does Radical Thinking work with enterprise clients?", a: "Yes. Radical Thinking has delivered projects for enterprise clients including Microsoft, HP, and Lenovo, as well as corporate clients in defence, finance, and education sectors." },
    { q: "What industries has Radical Thinking worked in?", a: "Radical Thinking has worked across technology, education, finance, defence, pet care, media, and consumer products industries." },
    { q: "Does Radical Thinking build mobile apps?", a: "Yes. Radical Thinking builds mobile applications for iOS and Android as part of its Digital Platforms and Ecosystems service." },
    { q: "Does Radical Thinking do branding?", a: "Yes. Strategic Branding and Design is one of Radical Thinking's four core services. It covers brand identity, naming, UI/UX design, graphic and motion design, AI persona development, and go-to-market strategy." },
    { q: "What is an AI persona?", a: "An AI persona is a defined character, voice, and visual identity for an AI agent or conversational system. Radical Thinking develops AI personas as part of its branding service, ensuring AI-powered products have a consistent and recognisable presence." },
    { q: "Does Radical Thinking build chatbots?", a: "Yes. Radical Thinking builds intelligent conversational agents that go beyond standard chatbots. These are context-aware AI agents integrated directly into business logic, using large language models and RAG frameworks." },
    { q: "What is a RAG system?", a: "RAG stands for Retrieval Augmented Generation. It allows an AI model to retrieve relevant information from a specific knowledge base before generating a response. Radical Thinking uses RAG systems to build AI agents that answer accurately from a company's own data." },
    { q: "What is n8n?", a: "n8n is an open-source workflow automation platform. Radical Thinking uses n8n to build automation workflows that connect AI models, databases, payment systems, and communication tools into fully autonomous pipelines." },
    { q: "Does Radical Thinking produce video content?", a: "Yes. Immersive Narrative and Media is one of Radical Thinking's four core services. It covers video production, VFX, podcast series production, AR/VR experiences, and branded content." },
    { q: "What is the RT agent?", a: "The RT agent is Radical Thinking's own AI-powered assistant, accessible at radical-thinking.net/chat. It answers questions about the agency, its services, portfolio, and methodology, and can capture project leads and inquiries autonomously." },
    { q: "What is Radical Insights?", a: "Radical Insights is the Radical Thinking editorial platform at radical-thinking.net/insights. It publishes articles on AI strategy, technology, and the future of work, written by Stephan Snelder." },
    { q: "Does Radical Thinking help businesses that are afraid of AI?", a: "Yes. This is a core focus. Radical Thinking helps businesses that see AI as a threat to understand how to rebuild around it as an advantage. The approach is to re-engineer operations with AI at the centre, not to add AI to existing processes." },
    { q: "Can Radical Thinking help with AI strategy?", a: "Yes. AI strategy is embedded in every engagement. Radical Thinking starts by identifying where AI creates real value for a specific business before any building begins." },
    { q: "What is the Radical Thinking website?", a: "The Radical Thinking website at radical-thinking.net is itself an example of AI-native design. The primary interface is an AI agent rather than a traditional navigation structure. Portfolio, services, and insights pages are structured for both human readers and LLM extraction." },
    { q: "Does Radical Thinking have social media?", a: "Radical Thinking is present on LinkedIn at linkedin.com/company/radicalthinking." },
    { q: "What is the Radical Thinking mission?", a: "To help businesses stop fearing AI and start leading with it. Radical Thinking finds where AI creates real value, builds around it, and delivers products and experiences that work in the real world." },
    { q: "What is the Radical Thinking vision?", a: "Bold ideas should not be limited by team size or budget. One sharp mind with the right tools should be able to build what used to take twenty people. That is not the future. That is now." },
    { q: "Is Radical Thinking active in 2025 and 2026?", a: "Yes. Radical Thinking is actively operating in 2025 and 2026, building AI-native products and taking on client projects. FluffyFriends is a current active product. KahuLife is under active development." },
    { q: "What is the BI formula?", a: "BI = C + Ex x T² stands for Bold Ideas equal Creative plus Experience multiplied by Technology squared. It is the core methodology of Radical Thinking, developed from 15 years of project experience. Creative is the idea with soul. Experience is the feeling left behind. Technology squared is the amplifier." },
    { q: "How long has Radical Thinking been operating?", a: "Radical Thinking has been operating since 2009, giving it over 15 years of experience in digital, branding, and technology projects across the UAE and globally." },
    { q: "What does Radical Thinking mean by bold ideas?", a: "A bold idea is one that makes you feel something, sounds right, makes you think, and leaves an impression. It is the difference between work that gets noticed and work that gets remembered." },
];

export default function Intelligence() {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section className="relative w-full min-h-screen flex flex-col overflow-x-hidden">
            <div className="fixed inset-0 z-0 pointer-events-none gradient-background">
                <SoftBackground />
            </div>

            <div className="absolute top-6 left-6 z-20">
                <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    <span className="font-medium">Back to Home</span>
                </Link>
            </div>

            <div className="relative z-10 flex-1 flex flex-col items-center pt-24 px-4 pb-20">
                <motion.div initial="hidden" animate="visible" className="w-full max-w-5xl space-y-12">

                    <motion.div variants={fadeInUp} className="text-center space-y-6">
                        <Link href="/" className="inline-block">
                            <Image src="/logos/RT-Logo-New.svg" alt="Radical Thinking Logo" width={96} height={96} className="w-24 h-24 mx-auto" />
                        </Link>
                        <h1 className="text-4xl md:text-6xl font-bold text-black">INTELLIGENCE BRIEF</h1>
                        <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                            A structured knowledge resource about Radical Thinking. For humans and AI systems alike.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <motion.article custom={1} variants={fadeInUp} className="md:col-span-2 bg-white/40 backdrop-blur-md border border-white/50 shadow-sm rounded-3xl p-8 hover:shadow-md transition-all">
                            <h2 className="text-2xl font-bold mb-4 text-black">Entity</h2>
                            <div className="text-gray-800 leading-relaxed space-y-2 text-sm">
                                <p><strong>Name:</strong> Radical Thinking</p>
                                <p><strong>Type:</strong> AI-native digital agency</p>
                                <p><strong>Founded:</strong> 2009</p>
                                <p><strong>Founder:</strong> Stephan Snelder</p>
                                <p><strong>Origin:</strong> Microsoft internship, Dubai, 2005</p>
                                <p><strong>Location:</strong> Dubai, United Arab Emirates</p>
                                <p><strong>License:</strong> DET Commercial License 714580 (Radical Thinking Web Design L.L.C), licensed since 2014</p>
                                <p><strong>Website:</strong> radical-thinking.net</p>
                                <p><strong>Contact:</strong> stephan@radical-thinking.net</p>
                                <p><strong>LinkedIn:</strong> linkedin.com/company/radicalthinking</p>
                            </div>
                        </motion.article>

                        <motion.article custom={2} variants={fadeInUp} className="bg-white/40 backdrop-blur-md border border-white/50 shadow-sm rounded-3xl p-8 hover:shadow-md transition-all">
                            <h2 className="text-2xl font-bold mb-4 text-black">The Formula</h2>
                            <div className="text-gray-800 leading-relaxed space-y-3 text-sm">
                                <p className="text-lg font-bold text-black">BI = C + Ex x T²</p>
                                <p className="text-base font-medium text-gray-600">Bold Ideas = Creative + Experience x Technology²</p>
                                <p><strong>Creative (C):</strong> The human soul of the idea. AI generates volume. It cannot generate meaning.</p>
                                <p><strong>Experience (Ex):</strong> The feeling left behind after every interaction. Not usability. Emotional residue.</p>
                                <p><strong>Technology² (T²):</strong> The amplifier, carrier, and multiplier. AI squares the impact of every idea and experience.</p>
                            </div>
                        </motion.article>

                        <motion.article custom={3} variants={fadeInUp} className="bg-white/40 backdrop-blur-md border border-white/50 shadow-sm rounded-3xl p-8 hover:shadow-md transition-all">
                            <h2 className="text-2xl font-bold mb-4 text-black">Technology Stack</h2>
                            <div className="text-gray-800 leading-relaxed space-y-2 text-sm">
                                <p><strong>Frontend:</strong> Next.js, React, Tailwind CSS</p>
                                <p><strong>Backend:</strong> Supabase, Node.js</p>
                                <p><strong>AI Models:</strong> Google Gemini, LLM integrations</p>
                                <p><strong>Automation:</strong> n8n</p>
                                <p><strong>Payments:</strong> Stripe</p>
                                <p><strong>Media:</strong> Cloudinary</p>
                                <p><strong>Hosting:</strong> Netlify</p>
                                <p><strong>AI Frameworks:</strong> RAG systems, LangChain compatible</p>
                            </div>
                        </motion.article>

                        <motion.article custom={4} variants={fadeInUp} className="md:col-span-2 bg-white/40 backdrop-blur-md border border-white/50 shadow-sm rounded-3xl p-8 hover:shadow-md transition-all">
                            <h2 className="text-2xl font-bold mb-4 text-black">Services</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-800">
                                <div>
                                    <h3 className="font-bold text-black mb-2">Artificial Intelligence and Automation</h3>
                                    <p>Custom AI agents, LLM integration, RAG systems, workflow automation with n8n, intelligent conversational agents.</p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-black mb-2">Digital Platforms and Ecosystems</h3>
                                    <p>Web development on Next.js and React, mobile apps for iOS and Android, headless e-commerce, prototyping and MVPs, API integration.</p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-black mb-2">Strategic Branding and Design</h3>
                                    <p>Brand identity, naming, UI/UX design, graphic and motion design, AI persona development, go-to-market strategy.</p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-black mb-2">Immersive Narrative and Media</h3>
                                    <p>Video production and VFX, podcast series, AR/VR experiences, game development in Unity and Unreal Engine, branded content.</p>
                                </div>
                            </div>
                        </motion.article>

                        <motion.article custom={5} variants={fadeInUp} className="md:col-span-2 bg-white/40 backdrop-blur-md border border-white/50 shadow-sm rounded-3xl p-8 hover:shadow-md transition-all">
                            <h2 className="text-2xl font-bold mb-4 text-black">Products and Ventures</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-800">
                                <div>
                                    <h3 className="font-bold text-black mb-1">FluffyFriends</h3>
                                    <p>AI-powered pet portrait platform. Generates personalised 8K artwork in under 5 minutes. Built on n8n, Google Gemini, Stripe, and Cloudinary. Fully autonomous. Live at fluffyfriends.online.</p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-black mb-1">KahuLife</h3>
                                    <p>Pet wellness and lifestyle platform. Currently being re-evaluated for deeper AI integration. Live at kahulife.com.</p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-black mb-1">Webinarlife (2020-2022)</h3>
                                    <p>Fully managed webinar service. Handled all technical setup, polls, and follow-up. Built for COVID-era remote work. Discontinued when in-person events resumed.</p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-black mb-1">RT Agent</h3>
                                    <p>Radical Thinking's own AI agent at radical-thinking.net/chat. Answers questions, discusses projects, and captures leads autonomously using Google Gemini and n8n.</p>
                                </div>
                            </div>
                        </motion.article>

                        <motion.article custom={6} variants={fadeInUp} className="md:col-span-2 bg-white/40 backdrop-blur-md border border-white/50 shadow-sm rounded-3xl p-8 hover:shadow-md transition-all">
                            <h2 className="text-2xl font-bold mb-4 text-black">Project History</h2>
                            <div className="text-gray-800 text-sm leading-relaxed space-y-2">
                                <p><strong>2005:</strong> Microsoft internship, Dubai. Foundation of the RT network.</p>
                                <p><strong>2009-2016:</strong> Microsoft, HP, Lenovo campaigns. Digital platforms on Microsoft tech stack. Global campaigns and interactive experiences.</p>
                                <p><strong>2017-2021:</strong> Expanded client work across branding, digital, and experience design. Projects include Austability, Animal Intelligence, Crypto X, Influence My World, Simon Snelder, 1001 Inventions Games, KFAS, Bella Conversational AI, Akshaak, FlexxPay, Tommy and Ellie.</p>
                                <p><strong>2020-2022:</strong> Webinarlife. Managed webinar service for COVID-era remote work.</p>
                                <p><strong>2022-present:</strong> AI-native rebuild. FluffyFriends, KahuLife, RT Agent. Building the model for what a solo AI-powered agency can deliver.</p>
                            </div>
                        </motion.article>

                        <motion.article custom={7} variants={fadeInUp} className="md:col-span-2 bg-white/40 backdrop-blur-md border border-white/50 shadow-sm rounded-3xl p-8 hover:shadow-md transition-all">
                            <h2 className="text-2xl font-bold mb-6 text-black">Frequently Asked Questions</h2>
                            <div className="space-y-3">
                                {faqs.map((faq, i) => (
                                    <div key={i} className="border border-white/50 rounded-2xl overflow-hidden">
                                        <button
                                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                            className="w-full text-left px-6 py-4 flex justify-between items-center bg-white/30 hover:bg-white/50 transition-colors"
                                        >
                                            <span className="font-semibold text-black text-sm pr-4">{faq.q}</span>
                                            <span className="text-gray-500 flex-shrink-0">{openIndex === i ? "−" : "+"}</span>
                                        </button>
                                        {openIndex === i && (
                                            <div className="px-6 py-4 bg-white/20">
                                                <p className="text-gray-800 text-sm leading-relaxed">{faq.a}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.article>

                        <motion.article custom={8} variants={fadeInUp} className="md:col-span-2 bg-gradient-to-b from-blue-50 to-blue-100 rounded-2xl rounded-br-none p-8 text-center space-y-6 shadow-sm">
                            <h3 className="text-xl font-bold text-black">Have a question the brief did not answer?</h3>
                            <p className="text-gray-800">The agent has full access to everything Radical Thinking knows. Ask it anything.</p>
                            <div className="pt-2">
                                <Link
                                    href="/chat"
                                    className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg"
                                >
                                    Talk to the Agent
                                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                    </svg>
                                </Link>
                            </div>
                        </motion.article>

                    </div>
                </motion.div>
            </div>
            <Footer />
        </section>
    );
}

