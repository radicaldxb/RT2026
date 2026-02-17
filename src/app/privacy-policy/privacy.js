/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Privacy() {
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
                            Privacy Policy for Radical Thinking
                        </h1>
                        <p className="text-center text-gray-600">
                            Last updated: 14 June 2022
                        </p>

                        <section className="space-y-8">
                            {/* Introduction */}
                            <div className="border-b border-gray-300 pb-6">
                                <p className="leading-relaxed">
                                    At Radical Thinking Web Design, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard the data we gather when you interact with our website and services. By using our website and services, you consent to the practices described in this policy.
                                </p>
                            </div>

                            {/* Information Collection and Use */}
                            <div className="border-b border-gray-300 pb-6">
                                <h2 className="text-xl font-semibold mb-2">Information Collection and Use</h2>
                                <p className="leading-relaxed mb-4">
                                    We may collect certain personally identifiable information, such as your name, email address, and contact details when you voluntarily provide it to us. This information is used to communicate with you, fulfill your requests, and provide you with the best possible services.
                                </p>
                                <p className="leading-relaxed">
                                    We may also collect non-personally identifiable information, such as your IP address and browsing patterns, when you interact with our website and services. This information is used to analyze website traffic, enhance user experience, and improve our services.
                                </p>
                            </div>

                            {/* Cookies and Analytics */}
                            <div className="border-b border-gray-300 pb-6">
                                <h2 className="text-xl font-semibold mb-2">Cookies and Analytics</h2>
                                <p className="leading-relaxed mb-4">
                                    We use cookies and similar technologies to collect and store information when you visit our website. Cookies are small files that are stored on your computer or mobile device. They allow us to track your website activity and preferences, and to improve your experience on our website.
                                </p>
                                <p className="leading-relaxed">
                                    We use Google Analytics GA4, Google ReCaptcha, and Zoho PageSense to analyze website traffic, enhance user experience, and improve our services. These tools may collect anonymous data, such as your IP address and browsing patterns, through the use of cookies. You can adjust your browser settings to manage cookie preferences.
                                </p>
                            </div>

                            {/* Data Security */}
                            <div className="border-b border-gray-300 pb-6">
                                <h2 className="text-xl font-semibold mb-2">Data Security</h2>
                                <p className="leading-relaxed">
                                    We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, please note that no data transmission over the internet or electronic storage method can guarantee absolute security.
                                </p>
                            </div>

                            {/* Third-Party Disclosure */}
                            <div className="border-b border-gray-300 pb-6">
                                <h2 className="text-xl font-semibold mb-2">Third-Party Disclosure</h2>
                                <p className="leading-relaxed">
                                    We may share your personal information with trusted third-party service providers, such as hosting and analytics platforms, to assist us in delivering our services effectively. These third parties are bound by strict confidentiality agreements and are prohibited from using your information for any other purpose.
                                </p>
                            </div>

                            {/* Your Choices and Rights */}
                            <div className="border-b border-gray-300 pb-6">
                                <h2 className="text-xl font-semibold mb-2">Your Choices and Rights</h2>
                                <p className="leading-relaxed">
                                    You have the right to review, update, or delete your personal information held by us. If you wish to exercise these rights or have any questions regarding our Privacy Policy, please contact us using the provided contact information below.
                                </p>
                            </div>

                            {/* Updates to the Privacy Policy */}
                            <div className="border-b border-gray-300 pb-6">
                                <h2 className="text-xl font-semibold mb-2">Updates to the Privacy Policy</h2>
                                <p className="leading-relaxed">
                                    We reserve the right to modify or update this Privacy Policy from time to time. We encourage you to review this page periodically for any changes. Your continued use of our website and services after any modifications indicate your acceptance of the updated Privacy Policy.
                                </p>
                            </div>

                            {/* Contact Us */}
                            <div>
                                <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
                                <p className="leading-relaxed mb-2">
                                    If you have any concerns or inquiries regarding our Privacy Policy or the handling of your personal information, please <Link href="/chat" className="text-black hover:underline">contact us in the chat</Link>. We are dedicated to addressing your privacy concerns and ensuring the protection of your information.
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