/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Footer from "om "framer-motion";
import Link from "next/link";

export default function TermsOfUse() {
    return (
        <>
            <section className="relative md:min-h-screen w-full flex flex-col items-center justify-start pt-16 px-4 md:justify-center overflow-hidden scroll-mt-24 bg-white">
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
                            Privacy Policy for Radical Thinking</h1>
                        <p className="text-center text-gray-600">
                            Effective Date: August 11, 2025
                        </p>

                        <section className="space-y-8">
                            {/* Section Template */}
                            <div className="border-b border-gray-300 pb-6">
                                <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
                                <p className="leading-relaxed">
                                    Welcome to Radical Thinking FZ-LLC ("Radical Thinking," "we," "us," or "our"). We are
                                    committed to protecting your privacy. This Privacy Policy explains how we collect, use,
                                    disclose, and safeguard your information when you visit our website, use our services,
                                    or interact with our AI-powered agents.
                                </p>
                                <p>By using our services, you agree to the collection and use of information in accordance with this policy.</p>
                            </div>

                            <div className="border-b border-gray-300 pb-6">
                                <h2 className="text-xl font-semibold mb-2">2. Information We Collect</h2>
                                <p className="leading-relaxed">
                                    We may collect information about you in a variety of ways. The information we may collect includes:
                                </p>
                                <ul className="list-disc ml-6 space-y-1">
                                    <li> <span className="font-bold">Personal Data:</span> Personally identifiable information, such as your name, email address, and telephone number, that you voluntarily give to us when you contact us, subscribe to our newsletter, or apply for a position.</li>
                                    <li> <span className="font-bold">Derivative Data:</span> Information our servers automatically collect when you access our website, such as your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the site.</li>
                                    <li> <span className="font-bold">AI Interaction Data:</span> When you interact with our AI agents or chatbots, we may collect and store the conversation logs, including your queries and the AI's responses. This data may be associated with a unique user identifier to maintain conversation history but is anonymized where possible for training purposes.</li>
                                </ul>
                            </div>

                            <div className="border-b border-gray-300 pb-6">
                                <h2 className="text-xl font-semibold mb-2">3. How We Use Your Information</h2>
                                <p className="leading-relaxed">
                                    Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you to:
                                </p>
                                <ul className="list-disc ml-6 space-y-1">
                                    <li>Provide and manage our services.</li>
                                    <li>Respond to your inquiries and offer support.

                                    </li>
                                    <li>Improve our website, services, and AI models through analysis and training.</li>
                                    <li>Process job applications.</li>
                                    <li>Send you newsletters or other marketing materials, from which you can opt-out at any time.</li>
                                    <li>Monitor and analyze usage and trends to improve your experience.</li>
                                    <li>Prevent fraudulent transactions, monitor against theft, and protect against criminal activity.</li>
                                </ul>
                            </div>

                            <div className="border-b border-gray-300 pb-6">
                                <h2 className="text-xl font-semibold mb-2">4. Disclosure of Your Information</h2>
                                <p className="leading-relaxed mb-3">We do not share your personal information with third parties except as described in this Privacy Policy. We may share information we have collected about you in certain situations:
                                </p>
                                <ul className="list-disc ml-6 space-y-1">
                                    <li> <span className="font-bold">With Third-Party Service Providers:</span> We may share your information with third parties that perform services for us or on our behalf, including data analysis, hosting services, and customer service. This includes AI service providers like Google for processing queries.</li>
                                    <li> <span className="font-bold">By Law or to Protect Rights:</span> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law.</li>
                                    <li> <span className="font-bold">Business Transfers:</span> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
                                </ul>
                            </div>

                            <div className="border-b border-gray-300 pb-6">
                                <h2 className="text-xl font-semibold mb-2">5. Data Security

                                </h2>
                                <p className="leading-relaxed">
                                    We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.                                </p>
                            </div>
                            <div className="border-b border-gray-300 pb-6">
                                <h2 className="text-xl font-semibold mb-2">6. Your Data Rights
                                </h2>
                                <p className="leading-relaxed">
                                    You have certain rights regarding your personal information. Depending on your location, you may have the right to:
                                </p>
                                <ul className="list-disc ml-6 space-y-1">
                                    <li>Request access to the personal data we hold about you.</li>
                                    <li>Request that we correct any inaccurate or incomplete data.</li>
                                    <li>Request that we delete your personal data.</li>
                                    <li>Object to our processing of your personal data.</li>
                                </ul>
                                <p className="leading-relaxed">
                                    To exercise these rights, please contact us using the contact information provided below.                                </p>
                            </div>

                            <div className="border-b border-gray-300 pb-6">
                                <h2 className="text-xl font-semibold mb-2">7. Policy for Children</h2>
                                <p className="leading-relaxed">
                                    We do not knowingly solicit information from or market to children under the age of 13. If you become aware of any data we have collected from children under age 13, please contact us using the contact information provided below.
                                </p>
                            </div>

                            <div className="border-b border-gray-300 pb-6">
                                <h2 className="text-xl font-semibold mb-2">8. Changes to This Privacy Policy</h2>
                                <p className="leading-relaxed">
                                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Effective Date" at the top. You are advised to review this Privacy Policy periodically for any changes.                                </p>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold mb-2">9. Contact Us</h2>
                                <p>To resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:</p>
                                <p className="leading-relaxed">
                                    Radical Thinking Webdesign FZ-LLC <br />
                                    Dubai, United Arab Emirates
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
