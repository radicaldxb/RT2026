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
    const [messages, setMessages] = useState([{ 
        from: 'bot', 
        content: 'Hello! I am your Radical Thinking agent. How can I help you today? You can speak to me in any language!', 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (showChat) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
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
                body: JSON.stringify({ chatInput: msg }) 
            });
            const data = await res.json();
            setMessages(prev => [...prev, { 
                from: 'bot', 
                content: data.reply || data.output || 'No response received.', 
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
            }]);
        } catch (err) { 
            setMessages(prev => [...prev, { from: 'bot', content: 'Error contacting server.' }]); 
        }
        setLoading(false);
    };

    const quickMessages = ['I want to start a project', 'What AI solutions have you built?', 'I need help with an AI solution', 'Tell me about your services'];

    return (
        <div className="main-viewport w-full text-black">
            <div className="gradient-animated" />
            <SoftBackground />
            
            <header className="w-full max-w-7xl mx-auto p-6 z-20 flex justify-start">
                <Link href="/">
                    <img src="/logos/RT-Logo-New.svg" alt="Logo" className="w-12 h-12 cursor-pointer" />
                </Link>
            </header>

            <main className="flex-1 w-full max-w-2xl mx-auto px-4 z-10 flex flex-col min-h-[60vh]">
                <AnimatePresence>
                    {!showChat ? (
                        <div className="flex flex-col items-center justify-center flex-1 gap-10 my-10">
                            <div className="flex flex-col items-center">
                                <h1 className="text-3xl font-bold text-center tracking-tighter uppercase leading-tight">
                                    WE BRING BOLD IDEAS TO LIFE.
                                </h1>
                                <p className="text-sm font-normal text-center mt-2 opacity-70 uppercase tracking-widest">
                                    AI NATIVE AT THE CORE, POWERED BY RADICAL THINKING.
                                </p>
                            </div>
                            <img 
                                src="/logos/AI-Chat.svg" 
                                alt="Chat" 
                                onClick={() => setShowChat(true)} 
                                className="w-44 h-44 cursor-pointer rotate-slow" 
                            />
                        </div>
                    ) :
