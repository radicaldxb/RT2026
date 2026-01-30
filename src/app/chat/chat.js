/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from "react-markdown";
import SoftBackground from '@/components/SoftBackground';
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
    const isAutoScrollRef = useRef(true);

    function getTime() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    useEffect(() => {
        setMessages((prev) =>
            prev.map((msg, i) => i === 0 ? { ...msg, timestamp: getTime() } : msg)
        );
    }, []);

    /* FIXED AUTO-SCROLL: Direct pixel calculation to snap to bottom */
    useEffect(() => {
        if (isAutoScrollRef.current && chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages, loading]);

    const handleScroll = () => {
        if (!chatContainerRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
        const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
        isAutoScrollRef.current = isNearBottom;
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') sendMessage();
    };

    const sendMessage = async (customMessage) => {
        const msg = (customMessage ?? query).trim();
        if (!msg) return;

        const userMsg = { from: 'user', type: 'text', content: msg, timestamp: getTime() };
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
            let botReply = data?.reply || data?.output || (typeof data === 'string' ? data : 'No response.');
            setMessages((prev) => [...prev, { from: 'bot', type: 'text', content: botReply, timestamp: getTime() }]);
        } catch (err) {
            setMessages((prev) => [...prev, { from: 'bot', type: 'text', content: 'Error contacting server.', timestamp: getTime() }]);
        }
        setLoading(false);
    };

    const quickMessages = ['I want to start a project', 'What AI solutions have you built?', 'I need help with an AI solution', 'Tell me about your services'];

    return (
        <main className="h-full w-full flex flex-col items-center text-black relative overflow-hidden">
            <SoftBackground />

            {/* HEADER AREA - shrink-0 keeps it from collapsing */}
            <div className="w-full px-6 py-4 z-20 shrink-0">
                <Link href="/" className="cursor-pointer">
                    <img src="/logos/RT-Logo-New.svg" alt="RT Logo" className="w-12 h-12" />
                </Link>
            </div>

            {/* MIDDLE SECTION - flex-1 expands to fill space */}
            <section className="flex-1 w-full flex flex-col items-center justify-center relative overflow-hidden z-10 min-h-0">
                <AnimatePresence>
                    {!showChat ? (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex flex-col items-center gap-6">
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-center px-4 text-black">LET’S BRING YOUR BOLD IDEA TO LIFE!</h1>
                            <img src="/logos/AI-Chat.svg" alt="AI Chat" onClick={() => setShowChat(true)} className="cursor-pointer w-40 h-40 rotate-slow" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            ref={chatContainerRef} onScroll={handleScroll}
                            /* pb-40 prevents the bot reply from hiding behind input bar */
                            className="w-full max-w-2xl flex-1 flex flex-col gap-4 items-start p-6 overflow-y-auto no-scrollbar pb-40"
                        >
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex w-full ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                                    <div className="flex flex-col max-w-[85%]">
                                        <div className={`px-4 py-2 rounded-2xl text-[14px] leading-relaxed shadow-sm ${msg.from === "user" ? "bg-[#E5FEEE] text-gray-800 rounded-br-none" : "bg-[#FFFBEF] text-gray-900 rounded-bl-none text-left"}`}>
                                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                                        </div>
                                        <div className={`text-[10px] mt-1 text-gray-500 ${msg.from === "user" ? "text-right" : "text-left"}`}>{msg.timestamp}</div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            {/* FOOTER INPUT AREA - Fixed at bottom */}
            <footer className="w-full max-w-3xl flex flex-col gap-3 p-4 shrink-0 z-20 bg-white/20 backdrop-blur-md">
                <div className="flex gap-2 overflow-x-auto no-scrollbar px-2">
                    {quickMessages.map((q, i) => (
                        <button key={i} onClick={() => sendMessage(q)} className="whitespace-nowrap px-4 py-1.5 text-xs rounded-full bg-white border border-gray-100 shadow-md shrink-0">
                            {q}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <input 
                        type="text" placeholder="What’s on your mind?"
                        className="flex-1 bg-white shadow-lg px-6 py-3 rounded-full outline-none text-md text-black border border-white/50"
                        value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKeyDown}
                    />
                    <button onClick={() => sendMessage()} className="p-3 rounded-full bg-white shadow-lg shrink-0">
                        <Image src="/logos/Chat.svg" alt="Send" width={32} height={32} className="w-8 h-8" />
                    </button>
                </div>
            </footer>

            <link href="https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css" rel="stylesheet" />
            <Script src="https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.umd.js" strategy="afterInteractive" />
        </main>
    );
}
