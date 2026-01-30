/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from "react-markdown";
import SoftBackground from '@/components/SoftBackground';
import Footer from '../../components/Footer';
import Link from 'next/link';
import './../globals.css';
import Image from 'next/image';
import Script from 'next/script';


export default function Chat() {
    const [query, setQuery] = useState('');
    const [showChat, setShowChat] = useState(false);
    const [messages, setMessages] = useState([
        {
            from: 'bot',
            type: 'text',
            content: 'Hello! This your Radical Thinking agent! How can I help you today?',
        },
    ]);
    const [loading, setLoading] = useState(false);

    const chatContainerRef = useRef(null);
    const scrollRef = useRef(null);
    const isAutoScrollRef = useRef(true); // track if user manually scrolled

    function getTime() {
        const now = new Date();
        return now.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    // add timestamp to first bot msg
    useEffect(() => {
        setMessages((prev) =>
            prev.map((msg, i) =>
                i === 0 ? { ...msg, timestamp: getTime() } : msg
            )
        );
    }, []);

    // handle auto-scroll only when new message added
    useEffect(() => {
        if (!isAutoScrollRef.current) return; // user is scrolling, don't force
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // detect manual scroll
    const handleScroll = () => {
        if (!chatContainerRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
        const isNearBottom = scrollHeight - scrollTop - clientHeight < 60;
        isAutoScrollRef.current = isNearBottom;
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') sendMessage();
    };

    const sendMessage = async (customMessage) => {
        const msg = (customMessage ?? query).trim();
        if (!msg) return;

        const userMsg = {
            from: 'user',
            type: 'text',
            content: msg,
            timestamp: getTime(),
        };
        setMessages((prev) => [...prev, userMsg]);
        setQuery('');
        setShowChat(true);
        setLoading(true);

        try {
            const res = await fetch(`${window.location.origin}/api/chatbot`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chatInput: msg }),
            });

            const data = await res.json();

            let botReply = null;
            if (data) {
                if (data.reply) botReply = data.reply;
                else if (data.output) botReply = data.output;
                else if (typeof data === 'string') botReply = data;
                else if (data.error) botReply = `Error: ${data.error}`;
            }
            if (!botReply) botReply = 'No response received.';

            setMessages((prev) => [
                ...prev,
                { from: 'bot', type: 'text', content: botReply, timestamp: getTime() },
            ]);
        } catch (err) {
            console.error('Error talking to API:', err);
            setMessages((prev) => [
                ...prev,
                { from: 'bot', type: 'text', content: 'Error contacting server.', timestamp: getTime() },
            ]);
        }

        setLoading(false);
    };

    const quickMessages = [
        'I want to start a project',
        'What AI solutions have you built?',
        'I need help with an AI solution',
        'Tell me about your services',
    ];

    useEffect(() => {
        if (showChat && window.createChat && !window.n8nChatInitialized) {
            window.n8nChatInitialized = true;
            window.createChat({
                webhookUrl: '/api/chat',
                webhookConfig: { method: 'POST', headers: {} },
                target: '#n8n-chat-embed',
                mode: 'fullscreen',
                chatInputKey: 'chatInput',
                chatSessionKey: 'sessionId',
                loadPreviousSession: true,
                metadata: {},
                showWelcomeScreen: false,
                defaultLanguage: 'en',
                initialMessages: [
                    'Hi there! 👋',
                    'My name is Nathan. How can I assist you today?',
                ],
                i18n: {
                    en: {
                        title: 'Hi there! 👋',
                        subtitle: "Start a chat. We're here to help you 24/7.",
                        footer: '',
                        getStarted: 'New Conversation',
                        inputPlaceholder: 'Type your question...',
                    },
                },
                enableStreaming: false,
            });
        }
    }, [showChat]);

    return (
        <main className="w-full flex flex-col items-center justify-between text-black p-3 relative overflow-hidden">
            <SoftBackground />

            <div className="md:w-3/4 md:mx-auto w-full px-4 md:px-20 z-10">
                <Link href="/" className="cursor-pointer">
                    <img
                        src="/logos/RT-Logo-New.svg"
                        alt="RT Logo"
                        className="w-12 h-12"
                    />
                </Link>
            </div>

            <section className="flex flex-col items-center justify-center text-center gap-6 mt-10 w-full px-4 z-10">
                <AnimatePresence>
                    {!showChat && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="flex flex-col items-center gap-6"
                        >
                            <h1 className="text-3xl sm:text-2xl md:text-4xl font-bold tracking-tight text-black">
                                LET’S BRING YOUR BOLD IDEA TO LIFE!
                            </h1>
                            <div className="relative">
                                <img
                                    src="/logos/AI-Chat.svg"
                                    alt="AI Chat"
                                    onClick={() => setShowChat(true)}
                                    className="cursor-pointer w-40 h-40 md:w-48 md:h-48 transition-all duration-500 rotate-slow"
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {showChat && (
                        <motion.div
                            key="chat"
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ duration: 0.5 }}
                            ref={chatContainerRef}
                            onScroll={handleScroll}
                            className="w-full max-w-2xl flex flex-col gap-4 items-start h-[28rem] p-6 overflow-y-auto"
                        >
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`flex w-full ${msg.from === "user" ? "justify-end" : "justify-start"
                                        }`}
                                >
                                    <div className="flex flex-col max-w-[75%]">
                                        <div
                                            className={`
                px-4 py-2 rounded-2xl text-[14px] leading-relaxed
                ${msg.from === "user"
                                                    ? "bg-[#E5FEEE] text-gray-800 rounded-br-none shadow-sm"
                                                    : "bg-[#FFFBEF] text-gray-900 rounded-bl-none shadow-sm text-left"
                                                }`}
                                            style={{
                                                wordBreak: "break-word",
                                            }}
                                        >
                                            <ReactMarkdown
                                                components={{
                                                    ul: ({ node, ...props }) => (
                                                        <ul className="list-disc pl-5 space-y-1" {...props} />
                                                    ),
                                                    ol: ({ node, ...props }) => (
                                                        <ol className="list-decimal pl-5 space-y-1" {...props} />
                                                    ),
                                                    li: ({ node, ...props }) => (
                                                        <li className="leading-relaxed" {...props} />
                                                    ),
                                                    strong: ({ node, ...props }) => (
                                                        <strong className="font-semibold" {...props} />
                                                    ),
                                                    p: ({ node, ...props }) => (
                                                        <p className="mb-2 last:mb-0" {...props} />
                                                    ),
                                                }}
                                            >
                                                {msg.content}
                                            </ReactMarkdown>
                                            {/* <div ref={scrollRef} /> */}
                                        </div>
                                        <div
                                            className={`text-[10px] mt-1 text-gray-500 ${msg.from === "user" ? "text-right" : "text-left"
                                                }`}
                                        >
                                            {msg.timestamp}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="flex justify-start items-center gap-1">
                                    <div className="px-2 py-2 rounded-2xl bg-[#FFFBEF]">
                                        <div className="flex space-x-1 items-center">
                                            <span className="w-[4px] h-[6px] bg-gray-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                            <span className="w-[4px] h-[6px] bg-gray-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                            <span className="w-[4px] h-[6px] bg-gray-600 rounded-full animate-bounce"></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Quick buttons */}
                <div className="flex flex-col gap-2 items-center w-full max-w-3xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-2 items-center w-full max-w-4xl justify-center">
                        {quickMessages.slice(0, 2).map((q, i) => (
                            <button
                                key={i}
                                onClick={() => sendMessage(q)}
                                className="px-4 py-2 md:px-6 text-base rounded-full cursor-pointer bg-[#FFFCFD] text-[#000] shadow-lg hover:shadow-xl transition-all text-center"
                            >
                                {q}
                            </button>
                        ))}
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 items-center w-full max-w-4xl justify-center">
                        {quickMessages.slice(2).map((q, i) => (
                            <button
                                key={i}
                                onClick={() => sendMessage(q)}
                                className="px-4 py-2 md:px-6 text-base rounded-full cursor-pointer bg-[#FFFCFD] text-[#000] shadow-lg hover:shadow-xl transition-all text-center"
                            >
                                {q}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Input */}
                <div className="w-full max-w-2xl">
                    <div className=" flex flex-row gap-2 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="w-full rounded-full shadow-lg backdrop-blur-md transition-all duration-300" id="animatedSearchBar">
                            <input
                                type="text"
                                placeholder="What’s on your mind?"
                                className="flex-1 bg-white shadow-2xl w-full max-w-2xl items-center px-4 py-2 md:py-4 md:px-6 rounded-full outline-none text-lg text-black placeholder:text-black pr-4"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                onFocus={() => {
                                    const bar = document.getElementById('animatedSearchBar');
                                    if (bar) bar.style.animation = 'animatedGradient 5s ease infinite';
                                }}
                                onBlur={() => {
                                    const bar = document.getElementById('animatedSearchBar');
                                    if (bar) bar.style.animation = '';
                                }}
                            />
                        </motion.div>
                        <div className="flex-shrink-0">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="rounded-full shadow-lg backdrop-blur-md transition-all duration-300"
                                style={{
                                    background:
                                        'linear-gradient(80deg, #DAE7F5, #EDF5E9BF, #FCF7D2E7, #FFF8FF)',
                                }}

                            >
                                <button
                                    onClick={() => sendMessage()}
                                    className="p-4 rounded-full hover:scale-105 transition-transform duration-200 active:scale-95"
                                    aria-label="Chat with us"
                                >
                                    <Image
                                        src="/logos/Chat.svg"
                                        alt="Chat Icon"
                                        width={48}
                                        height={48}
                                        className="w-12 h-12 cursor-pointer transition-transform duration-200 hover:rotate-12 active:rotate-0"
                                    />
                                </button>
                            </motion.div>
                        </div>
                    </div>
                    <div className="max-w-xl text-center mx-auto mt-4">
                        <p className="md:text-lg mt-2 text-black">
                            Talk to us in your preferred language and we’ll get you on your way!
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
            <link
                href="https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css"
                rel="stylesheet"
            />
            <Script
                src="https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.umd.js"
                strategy="afterInteractive"
                onLoad={() => console.log('n8n chat script loaded')}
            />
        </main>
    );
}
