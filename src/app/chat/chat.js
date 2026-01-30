/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from "react-markdown";
import SoftBackground from '@/components/SoftBackground';
import Footer from '../../components/Footer'; // RESTORED: Critical navigation
import Link from 'next/link';
import './../globals.css';
import Image from 'next/image';
import Script from 'next/script';

export default function Chat() {
    const [query, setQuery] = useState('');
    const [showChat, setShowChat] = useState(false);
    const [messages, setMessages] = useState([{ from: 'bot', content: 'Hello! This your Radical Thinking agent! How can I help you today?', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    const [loading, setLoading] = useState(false);

    // This anchor ensures the latest message is always in view
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (showChat) scrollToBottom();
    }, [messages, loading]);

    const sendMessage = async (customMessage) => {
        const msg = (customMessage ?? query).trim();
        if (!msg) return;
        setMessages((prev) => [...prev, { from: 'user', content: msg, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
        setQuery('');
        setShowChat(true);
        setLoading(true);

        try {
            const res = await fetch(`/api/chatbot`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chatInput: msg }),
            });
            const data = await res.json();
            setMessages((prev) => [...prev, { from: 'bot', content: data.reply || data.output, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
        } catch (err) {
            setMessages((prev) => [...prev, { from: 'bot', content: 'Error contacting server.' }]);
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center w-full min-h-screen overflow-x-hidden">
            <SoftBackground />

            {/* Header */}
            <div className="w-full max-w-7xl px-6 py-6 z-20">
                <Link href="/"><img src="/logos/RT-Logo-New.svg" alt="RT" className="w-12 h-12" /></Link>
            </div>

            {/* Chat Area */}
            <section className="flex-1 w-full max-w-2xl px-4 z-10 pb-10">
                <AnimatePresence>
                    {!showChat ? (
                        <div className="flex flex-col items-center gap-10 mt-20">
                            <h1 className="text-3xl font-bold text-center text-black">LET’S BRING YOUR BOLD IDEA TO LIFE!</h1>
                            <img src="/logos/AI-Chat.svg" alt="Chat" onClick={() => setShowChat(true)} className="w-40 h-40 cursor-pointer rotate-slow" />
                        </div>
                    ) : (
                        <div className="space-y-6 pt-10">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex w-full ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`p-4 rounded-2xl max-w-[85%] shadow-sm ${msg.from === 'user' ? 'bg-[#E5FEEE] text-gray-800' : 'bg-[#FFFBEF] text-gray-900'}`}>
                                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                                        <div className="text-[10px] mt-1 opacity-50">{msg.timestamp}</div>
                                    </div>
                                </div>
                            ))}
                            {loading && <div className="text-sm text-gray-400 animate-pulse">Thinking...</div>}
                            <div ref={messagesEndRef} className="h-24" /> {/* Scroll Anchor */}
                        </div>
                    )}
                </AnimatePresence>
            </section>

            {/* Sticky Input Bar */}
            <div className="w-full max-w-2xl p-4 z-30 sticky bottom-0 bg-white/40 backdrop-blur-lg border-t border-white/50 rounded-t-3xl">
                <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4">
                    {['I want to start a project', 'Tell me about your services'].map((q, i) => (
                        <button key={i} onClick={() => sendMessage(q)} className="px-4 py-1.5 bg-white rounded-full text-xs shadow-md whitespace-nowrap">{q}</button>
                    ))}
                </div>
                <div className="flex items-center gap-2">
                    <input 
                        type="text" value={query} onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="What’s on your mind?"
                        className="flex-1 px-6 py-3 bg-white rounded-full shadow-lg outline-none border border-gray-100"
                    />
                    <button onClick={() => sendMessage()} className="p-3 bg-white rounded-full shadow-lg shrink-0">
                        <Image src="/logos/Chat.svg" alt="Send" width={32} height={32} />
                    </button>
                </div>
            </div>

            <Footer /> {/* RESTORED: Site Navigation */}
        </div>
    );
}
