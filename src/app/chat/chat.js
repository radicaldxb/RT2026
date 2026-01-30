'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from "react-markdown";
import Footer from '../../components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import SoftBackground from '@/components/SoftBackground';

export default function Chat() {
    const [query, setQuery] = useState('');
    const [showChat, setShowChat] = useState(false);
    const [messages, setMessages] = useState([{ 
        from: 'bot', 
        content: 'Hello! I am your Radical Thinking agent. How can I help you today? You can speak to me in any language!', 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => { if (showChat) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

    const sendMessage = async (customMessage) => {
        const msg = (customMessage ?? query).trim();
        if (!msg) return;
        setMessages(prev => [...prev, { from: 'user', content: msg, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
        setQuery(''); setShowChat(true); setLoading(true);
        try {
            const res = await fetch(`/api/chatbot`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chatInput: msg }) });
            const data = await res.json();
            setMessages(prev => [...prev, { from: 'bot', content: data.reply || data.output || 'No response.', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
        } catch (err) { setMessages(prev => [...prev, { from: 'bot', content: 'Error contacting server.' }]); }
        setLoading(false);
    };

    const quickMessages = ['I want to start a project', 'What AI solutions have you built?', 'I need help with an AI solution', 'Tell me about your services'];

    return (
        <div className="main-viewport text-black">
            <SoftBackground />
            <header className="w-full p-6 z-20 shrink-0">
                <Link href="/"><img src="/logos/RT-Logo-New.svg" alt="RT Logo" className="w-12 h-12" /></Link>
            </header>
            <div className="chat-scroll-container w-full max-w-2xl mx-auto px-4">
                <AnimatePresence>
                    {!showChat ? (
                        <div className="flex flex-col items-center justify-center min-h-[55vh]">
                            <h1 className="text-4xl font-black text-center tracking-tighter mb-2 uppercase">WE BRING BOLD IDEAS TO LIFE.</h1>
                            <p className="formula-gradient text-xl mb-12 tracking-widest uppercase">BI = C + Ex × T²</p>
                            <img src="/logos/AI-Chat.svg" alt="AI Circle" onClick={() => setShowChat(true)} className="w-44 h-44 cursor-pointer rotate-slow" />
                        </div>
                    ) : (
                        <div className="space-y-6 pt-4">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex w-full ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`p-5 rounded-3xl max-w-[90%] shadow-sm ${msg.from === 'user' ? 'bg-[#E5FEEE]/90' : 'bg-white/90'}`}>
                                        <ReactMarkdown className="prose prose-sm text-black">{msg.content}</ReactMarkdown>
                                        <div className="text-[10px] mt-1 opacity-30">{msg.timestamp}</div>
                                    </div>
                                </div>
                            ))}
                            {loading && <div className="text-xs text-gray-400 animate-pulse px-2">Thinking...</div>}
                            <div ref={messagesEndRef} className="h-10" />
                        </div>
                    )}
                </AnimatePresence>
            </div>
            <div className="glass-bottom-tray shrink-0 px-4 pt-4 pb-2">
                <div className="max-w-2xl mx-auto">
                    <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4 px-1">
                        {quickMessages.map((q, i) => (
                            <button key={i} onClick={() => sendMessage(q)} className="whitespace-nowrap px-4 py-2 text-[10px] rounded-full bg-white text-black shadow-sm border border-black/5 font-bold shrink-0">{q}</button>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 bg-white rounded-full shadow-lg p-1 pl-5 border border-black/5 mb-2">
                        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()} placeholder="What’s on your mind?" className="flex-1 bg-transparent py-3 text-sm outline-none" />
                        <button onClick={() => sendMessage()} className="p-3 bg-gray-50 rounded-full" style={{ background: 'linear-gradient(80deg, #DAE7F5, #EDF5E9BF, #FCF7D2E7, #FFF8FF)' }}><Image src="/logos/Chat.svg" alt="Send" width={24} height={24} /></button>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}
