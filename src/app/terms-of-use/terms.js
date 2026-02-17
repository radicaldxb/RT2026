/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";

export default function TermsOfUse() {
    return (
        <>
            <section className="relative md:min-h-screen w-full flex flex-col items-center justify-start pt-16 px-4 md:justify-center overflow-hidden scroll-mt-24 bg-white">
                <div className="absolute top-6 left-6 z-20">
                    <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                        <span className="font-medium">Back to Home</span>
                    </Link>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="z-10 space-y-10 w-full max-w-6xl mx-auto"
                >
                    {/* Logo */}
                    <div className="flex justify-center">
                        <Link href="/">
                            <img
                                src="/logos/RT-Logo-New.svg"
                                alt="RT Logo"
                                className="w-24 h-24"
                            />
                        </Link>
                    </div>

                    {/* Main Content */}
                    <main className="text-black space-y-10">
                        <h1 className="text-3xl font-bold text-center mb-2">
                            Terms of Use for Radical Thinking
                        </h1>
                        <p className="text-center text-gray-600">
                            Effective Date: August 11, 2025
                        </p>

                        <section className="space-y-8">
                            {/* Section Template */}
                            {/* 1. Agreement to Terms */}
                            <div className="border-b border-gray-300 pb-6">
                                <h2 className="text-xl font-semibold mb-2">1. Agreement to Terms</h2>
                                <p className="leading-relaxed mb-4">
                                    Welcome to Radical Thinking Web Design LLC ("Radical Thinking," "we," "us," or "our"). These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and Radical Thinking, concerning your access to and use of our website, as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the “Site”).
                                </p>
                                <p className="leading-relaxed">
                                    You agree that by accessing the Site, you have read, understood, and agreed to be bound by all of these Terms of Use.<br/> <span className="font-bold"> IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF USE, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SITE AND YOU MUST DISCONTINUE USE IMMEDIATELY.</span>
                                </p>
                            </div>

                            {/* 2. Intellectual Property Rights */}
                            <div className="border-b border-gray-300 pb-6">
                                <h2 className="text-xl font-semibold mb-2">2. Intellectual Property Rights</h2>
                                <p className="leading-relaxed">
                                    Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws. The Content and the Marks are provided on the Site “AS IS” for your information and personal use only. Except as expressly provided in these Terms of Use, no part of the Site and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
                                </p>
                            </div>

                            {/* 3. User Representations */}
                            <div className="border-b border-gray-300 pb-6">
                                <h2 className="text-xl font-semibold mb-2">3. User Representations</h2>
                                <p className="leading-relaxed">
                                    By using the Site, you represent and warrant that: (1) you have the legal capacity and you agree to comply with these Terms of Use; (2) you are not a minor in the jurisdiction in which you reside; (3) you will not access the Site through automated or non-human means, whether through a bot, script, or otherwise; (4) you will not use the Site for any illegal or unauthorized purpose; and (5) your use of the Site will not violate any applicable law or regulation.
                                </p>
                            </div>

                            {/* 4. Prohibited Activities */}
                            <div className="border-b border-gray-300 pb-6">
                                <h2 className="text-xl font-semibold mb-2">4. Prohibited Activities</h2>
                                <p className="leading-relaxed mb-4">
                                    You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
                                </p>
                                <p className="leading-relaxed mb-2">As a user of the Site, you agree not to:</p>
                                <ul className="list-disc ml-6 space-y-1">
                                    <li>Systematically retrieve data or other content from the Site to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
                                    <li>Use any information obtained from the Site in order to harass, abuse, or harm another person.</li>
                                    <li>Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools.</li>
                                    <li>Interfere with, disrupt, or create an undue burden on the Site or the networks or services connected to the Site.</li>
                                    <li>Attempt to impersonate another user or person.</li>
                                    <li>Use the Site as part of any effort to compete with us or otherwise use the Site and/or the Content for any revenue-generating endeavor or commercial enterprise.</li>
                                </ul>
                            </div>

                            {/* Continue the rest in same clean structure */}
                            {/* 5. Submissions */}
                            <div className="border-b border-gray-300 pb-6">
                                <h2 className="text-xl font-semibold mb-2">5. Submissions</h2>
                                <p className="leading-relaxed">
                                    You acknowledge and agree that any questions, comments, suggestions, ideas, feedback, or other information regarding the Site or our services ("Submissions") you provide to us are non-confidential and shall become our sole property. We shall own exclusive rights, including all intellectual property rights, and shall be entitled to the unrestricted use and dissemination of these Submissions for any lawful purpose, commercial or otherwise, without acknowledgment or compensation to you.
                                </p>
                            </div>

                            {/* 6. AI Agent and Interactive Features */}
                            <div className="border-b border-gray-300 pb-6">
                                <h2 className="text-xl font-semibold mb-2">6. AI Agent and Interactive Features</h2>
                                <p className="leading-relaxed mb-4">
                                    Our website features an artificial intelligence-powered conversational agent ("AI Agent") designed to assist you with information about our services, portfolio, and company. By using the AI Agent, you acknowledge and agree to the following:
                                </p>
                                
                                <h3 className="text-lg font-semibold mb-1">6.1. Nature of Interaction</h3>
                                <p className="leading-relaxed mb-4">
                                    You understand that you are interacting with an artificial intelligence, not a human. While we strive to ensure the AI Agent provides accurate and helpful information, it may occasionally produce incorrect, outdated, or "hallucinated" responses.
                                </p>

                                <h3 className="text-lg font-semibold mb-1">6.2. No Binding Advice or Contracts</h3>
                                <p className="leading-relaxed mb-2">Information provided by the AI Agent is for informational purposes only.</p>
                                <ul className="list-disc ml-6 space-y-1 mb-4">
                                    <li><span className="font-bold">No Professional Advice:</span> Responses from the AI Agent do not constitute professional, legal, or financial advice.</li>
                                    <li><span className="font-bold">No Binding Offers:</span> Any price estimates, timelines, or project scopes mentioned by the AI Agent are indicative only and do not constitute a binding offer or contract. A binding agreement is only formed through a formal proposal or contract signed by an authorized human representative of Radical Thinking.</li>
                                </ul>

                                <h3 className="text-lg font-semibold mb-1">6.3. User Input and Data</h3>
                                <ul className="list-disc ml-6 space-y-1 mb-4">
                                    <li><span className="font-bold">Do Not Share Sensitive Data:</span> You agree not to input sensitive personal information (such as passwords, financial details, or health data) or proprietary confidential trade secrets into the chat interface.</li>
                                    <li><span className="font-bold">Data Processing:</span> You acknowledge that your conversations with the AI Agent are processed by third-party AI providers (including Google Vertex AI) and may be stored by Radical Thinking for quality assurance, training, and lead generation purposes, in accordance with our Privacy Policy.</li>
                                </ul>

                                <h3 className="text-lg font-semibold mb-1">6.4. Limitation of Liability for AI Outputs</h3>
                                <p className="leading-relaxed">
                                    Radical Thinking is not liable for any actions you take based on the information provided by the AI Agent. We accept no responsibility for any loss or damage resulting from reliance on the AI Agent's outputs.
                                </p>
                            </div>

                            {/* 7. Third-Party Websites and Content */}
                            <div className="border-b border-gray-300 pb-6">
                                <h2 className="text-xl font-semibold mb-2">7. Third-Party Websites and Content</h2>
                                <p className="leading-relaxed">
                                    The Site may contain links to other websites ("Third-Party Websites") as well as articles, photographs, text, graphics, pictures, designs, music, sound, video, information, applications, software, and other content or items belonging to or originating from third parties ("Third-Party Content"). Such Third-Party Websites and Third-Party Content are not investigated, monitored, or checked for accuracy, appropriateness, or completeness by us, and we are not responsible for any Third-Party Websites accessed through the Site.
                                </p>
                            </div>

                            {/* 8. Site Management */}
                            <div className="border-b border-gray-300 pb-6">
                                <h2 className="text-xl font-semibold mb-2">8. Site Management</h2>
                                <p className="leading-relaxed">
                                    We reserve the right, but not the obligation, to: (1) monitor the Site for violations of these Terms of Use; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Terms of Use; (3) in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable any of your contributions or any portion thereof; and (4) otherwise manage the Site in a manner designed to protect our rights and property and to facilitate the proper functioning of the Site.
                                </p>
                            </div>

                            {/* 9. Term and Termination */}
                            <div className="border-b border-gray-300 pb-6">
                                <h2 className="text-xl font-semibold mb-2">9. Term and Termination</h2>
                                <p className="leading-relaxed">
                                    These Terms of Use shall remain in full force and effect while you use the Site. WITHOUT LIMITING ANY OTHER PROVISION OF THESE TERMS OF USE, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SITE (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON.
                                </p>
                            </div>

                            {/* 10. Governing Law */}
                            <div className="border-b border-gray-300 pb-6">
                                <h2 className="text-xl font-semibold mb-2">10. Governing Law</h2>
                                <p className="leading-relaxed">
                                    These Terms of Use and your use of the Site are governed by and construed in accordance with the laws of the United Arab Emirates as applied in the Emirate of Dubai, without regard to its conflict of law principles.
                                </p>
                            </div>

                            {/* 11. Dispute Resolution */}
                            <div className="border-b border-gray-300 pb-6">
                                <h2 className="text-xl font-semibold mb-2">11. Dispute Resolution</h2>
                                <p className="leading-relaxed">
                                    Any legal action of whatever nature brought by either you or us shall be commenced or prosecuted in the courts located in Dubai, United Arab Emirates, and the Parties hereby consent to, and waive all defenses of lack of personal jurisdiction and forum non conveniens with respect to venue and jurisdiction in such courts.
                                </p>
                            </div>

                            {/* 12. Disclaimer */}
                            <div className="border-b border-gray-300 pb-6">
                                <h2 className="text-xl font-semibold mb-2">12. Disclaimer</h2>
                                <p className="leading-relaxed uppercase">
                                    THE SITE IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SITE AND OUR SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SITE AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                                </p>
                            </div>

                            {/* 13. Limitation of Liability */}
                            <div className="border-b border-gray-300 pb-6">
                                <h2 className="text-xl font-semibold mb-2">13. Limitation of Liability</h2>
                                <p className="leading-relaxed uppercase">
                                    IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SITE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                                </p>
                            </div>

                            {/* 14. Indemnification */}
                            <div className="border-b border-gray-300 pb-6">
                                <h2 className="text-xl font-semibold mb-2">14. Indemnification</h2>
                                <p className="leading-relaxed">
                                    You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys’ fees and expenses, made by any third party due to or arising out of your use of the Site or breach of these Terms of Use.
                                </p>
                            </div>

                            {/* 15. Contact Us */}
                            <div>
                                <h2 className="text-xl font-semibold mb-2">15. Contact Us</h2>
                                <p className="leading-relaxed mb-2">To resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:</p>
                                <p className="leading-relaxed font-bold">
                                    Radical Thinking Web Design LLC
                                </p>
                                <p className="leading-relaxed">
                                    Dubai, UAE <br />
                                    <Link href="/chat" className="text-black hover:underline">Contact us in the chat</Link>
                                </p>
                            </div>
                        </section>
                    </main>
                </motion.div>

                {/* Footer */}
                <Footer />
            </section>
        </>
    );
}
