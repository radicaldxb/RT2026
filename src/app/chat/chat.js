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

export default function Chat() {
    const [query, setQuery] = useState('');
    const [showChat, setShowChat] = useState(false);
    const [messages, setMessages] = useState([{ from: 'bot', content: 'Hello! This your Radical Thinking agent! How can I help you today?', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    const [loading, setLoading] = useState(false);

    const messagesEndRef = useRef(null);

    // Resilient Auto-scroll
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (showChat) scrollToBottom();
    }, [messages, loading]);

    const sendMessage = async (customMessage) => {
        const msg = (customMessage ?? query).trim();
        if (!msg) return;

        setMessages(prev => [...prev, { from: 'user', content: msg, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
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
            setMessages(prev => [...prev, { from: 'bot', content: data.reply || data.output || 'No response.', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
        } catch (err) {
            setMessages(prev => [...prev, { from: 'bot', content: 'Error contacting server.' }]);
        }
        setLoading(false);
    };

    const quickMessages = ['I want to start a project', 'What AI solutions have you built?', 'I need help with an AI solution', 'Tell me about your services'];

    return (
        <div className="main-viewport w-full relative">
            <SoftBackground />
            <div className="gradient-animated" />

            <header className="w-full max-w-7xl mx-auto p-4 z-20">
                <Link href="/"><img src="/logos/RT-Logo-New.svg" alt="RT Logo" className="w-12 h-12" /></Link>
            </header>

            {/* Scrollable Conversation Pane */}
            <main className="flex-1 w-full max-w-2xl mx-auto px-4 overflow-y-auto no-scrollbar pb-32 z-10">
                <AnimatePresence>
                    {!showChat ? (
                        <div className="flex flex-col items-center gap-10 mt-10">
                            <h1 className="text-3xl font-bold text-center text-black">LET’S BRING YOUR BOLD IDEA TO LIFE!</h1>
                            <img src="/logos/AI-Chat.svg" alt="Chat" onClick={() => setShowChat(true)} className="w-40 h-40 cursor-pointer rotate-slow" />
                        </div>
                    ) : (
                        <div className="space-y-6 pt-6 text-black">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex w-full ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`p-4 rounded-2xl max-w-[85%] shadow-sm ${msg.from === 'user' ? 'bg-[#E5FEEE] text-gray-800' : 'bg-[#FFFBEF] text-gray-900'}`}>
                                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                                        <div className="text-[10px] mt-1 opacity-50">{msg.timestamp}</div>
                                    </div>
                                </div>
                            ))}
                            {loading && <div className="text-xs text-gray-400 animate-pulse">Thinking...</div>}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </AnimatePresence>
            </main>

            {/* Interaction Layer */}
            <div className="w-full max-w-2xl mx-auto p-4 z-30 sticky bottom-0 bg-white/40 backdrop-blur-md rounded-t-3xl border-t border-white/20">
                {/* Horizontal Suggestions */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4 px-1">
                    {quickMessages.map((q, i) => (
                        <button key={i} onClick={() => sendMessage(q)} className="whitespace-nowrap px-4 py-1.5 text-xs rounded-full bg-white text-black shadow-md border border-gray-100 font-medium">
                            {q}
                        </button>
                    ))}
                </div>

                {/* Emphasis on Text Input field */}
                <div className="flex items-center gap-2 bg-white rounded-full shadow-2xl p-1 pl-4 border border-gray-100">
                    <input 
                        type="text" value={query} onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="What’s on your mind?"
                        className="flex-1 bg-transparent py-3 text-base text-black outline-none placeholder:text-gray-400"
                    />
                    <button 
                        onClick={() => sendMessage()} 
                        className="p-3 bg-gray-50 rounded-full transition-transform hover:scale-105 active:scale-95 shrink-0"
                        style={{ background: 'linear-gradient(80deg, #DAE7F5, #EDF5E9BF, #FCF7D2E7, #FFF8FF)' }}
                    >
                        <Image src="/logos/Chat.svg" alt="Send" width={24} height={24} className="w-6 h-6" />
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
}
