/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from "react-markdown";
import SoftBackground from '@/components/SoftBackground';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { createPortal } from 'react-dom';
import { useSearchParams } from 'next/navigation';

const ChatImage = ({ node, ...props }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="relative my-2">
            {isLoading && (
                <div className="w-full h-48 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center border border-gray-200">
                    <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                </div>
            )}
            <img
                {...props}
                className={`max-w-full h-auto rounded-lg shadow-sm cursor-pointer hover:opacity-95 transition-opacity ${isLoading ? 'opacity-0 absolute top-0 left-0' : 'opacity-100'}`}
                style={{ maxHeight: '300px', width: 'auto' }}
                alt={props.alt || 'Chat Image'}
                onLoad={() => setIsLoading(false)}
                onError={() => setIsLoading(false)}
                onClick={() => setIsOpen(true)}
            />

            {mounted && isOpen && createPortal(
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.img
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            src={props.src}
                            alt={props.alt || 'Full screen image'}
                            className="max-w-full max-h-[90vh] object-contain rounded-lg"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <button
                            className="absolute top-5 right-5 text-white/80 hover:text-white p-2"
                            onClick={() => setIsOpen(false)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </motion.div>,
                    document.body
            )}
        </div>
    );
};

const markdownComponents = {
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
    img: ChatImage,
    a: ({ node, ...props }) => (
        <a
            {...props}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline break-all"
        />
    ),
};

export default function Chat() {
    const [query, setQuery] = useState('');
    const [showChat, setShowChat] = useState(false);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const sessionIdRef = useRef('');
    const searchParams = useSearchParams();
    const hasRun = useRef(false);
    const lastMessageRef = useRef('');
    const repetitionCountRef = useRef(0);
    const lastMessageTimeRef = useRef(0);
    const rapidCountRef = useRef(0);
    const [isVerified, setIsVerified] = useState(false);

    function getTime() {
        const now = new Date();
        return now.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    // Initialize session, load history, and handle incoming messages
    useEffect(() => {
        // 1. Restore or create Session ID
        let storedSessionId = localStorage.getItem('rt_chat_session_id');
        if (!storedSessionId) {
            storedSessionId = typeof crypto !== 'undefined' && crypto.randomUUID
                ? crypto.randomUUID()
                : `session-${Date.now()}-${Math.random().toString(36).slice(2)}`;
            localStorage.setItem('rt_chat_session_id', storedSessionId);
        }
        sessionIdRef.current = storedSessionId;

        // Restore verification status
        const storedVerified = localStorage.getItem('rt_chat_verified');
        if (storedVerified === 'true') {
            setIsVerified(true);
        }

        // 2. Restore Chat History
        const storedMessages = localStorage.getItem('rt_chat_messages');
        if (storedMessages) {
            try {
                setMessages(JSON.parse(storedMessages));
            } catch (e) {
                console.error("Failed to parse chat history", e);
            }
        } else {
            // Initialize default welcome message timestamp
            setMessages((prev) =>
                prev.map((msg, i) =>
                    i === 0 ? { ...msg, timestamp: getTime() } : msg
                )
            );
        }

        // 3. Handle Handoff from Homepage
        const initialMessage = searchParams.get('message');
        if (initialMessage && !hasRun.current) {
            hasRun.current = true;
            // We use a timeout to ensure state is ready if needed, though direct call is usually fine
            sendMessage(initialMessage);
        }
    }, [searchParams]);

    // Persist messages to localStorage whenever they change
    useEffect(() => {
        if (messages.length > 0) {
            // Keep only the last 50 messages to prevent localStorage quota errors
            localStorage.setItem('rt_chat_messages', JSON.stringify(messages.slice(-50)));
        }
    }, [messages]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') sendMessage();
    };

    const sendMessage = async (customMessage) => {
        if (loading) return;
        const msg = (customMessage ?? query).trim();
        if (!msg) return;

        const userMsg = {
            id: `user-${Date.now()}-${Math.random().toString(36).slice(2)}`,
            from: 'user',
            type: 'text',
            content: msg,
            timestamp: getTime(),
        };
        setMessages((prev) => [...prev, userMsg]);
        setQuery('');
        setShowChat(true);
        setLoading(true);

        // --- Verification Guardrail ---
        if (!isVerified) {
            const answer = msg.toLowerCase().trim();
            if (answer === '7' || answer === 'seven') {
                setIsVerified(true);
                localStorage.setItem('rt_chat_verified', 'true');
                setTimeout(() => {
                    setMessages((prev) => [
                        ...prev,
                        { id: `bot-verified-${Date.now()}`, from: 'bot', type: 'text', content: "That is correct! How can I help you today?", timestamp: getTime() },
                    ]);
                    setLoading(false);
                }, 600);
            } else {
                setTimeout(() => {
                    setMessages((prev) => [
                        ...prev,
                        { id: `bot-challenge-${Date.now()}`, from: 'bot', type: 'text', content: messages.length === 0 ? "Before we start lets make sure you are human. Please answer 5 + 2 =" : "That is incorrect. Please prove you are human: What is 5 + 2?", timestamp: getTime() },
                    ]);
                    setLoading(false);
                }, 600);
            }
            return;
        }

        // --- Client-Side Spam Protection ---
        const now = Date.now();

        if (now - lastMessageTimeRef.current < 2000) {
            rapidCountRef.current += 1;
        } else {
            rapidCountRef.current = 0;
        }

        if (rapidCountRef.current >= 2) {
            if (rapidCountRef.current === 2) {
                setMessages((prev) => [
                    ...prev,
                    { id: `rapid-limit-${Date.now()}`, from: 'bot', type: 'text', content: "You're typing a bit too fast. Please slow down.", timestamp: getTime() },
                ]);
            }
            setLoading(false);
            return;
        }

        if (msg === lastMessageRef.current && (now - lastMessageTimeRef.current < 5000)) {
            repetitionCountRef.current += 1;
        } else {
            repetitionCountRef.current = 0;
        }

        lastMessageRef.current = msg;
        lastMessageTimeRef.current = now;

        if (repetitionCountRef.current >= 4) {
            if (repetitionCountRef.current === 4) {
                setTimeout(() => {
                    setMessages((prev) => [
                        ...prev,
                        { id: `bot-spam-${Date.now()}`, from: 'bot', type: 'text', content: "I know a bot when I see one, I'll wait for now with responding.", timestamp: getTime() },
                    ]);
                    setLoading(false);
                }, 600); // Small delay to feel natural
            } else {
                setLoading(false);
            }
            return;
        }
        // -----------------------------------

        try {
            const res = await fetch('/api/chatbot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chatInput: msg, sessionId: sessionIdRef.current }),
            });

            if (res.status === 429) {
                setMessages((prev) => [
                    ...prev,
                    { id: `rate-limit-${Date.now()}`, from: 'bot', type: 'text', content: "Whoa there! You're sending messages a bit too fast. Please take a breather and try again in a minute.", timestamp: getTime() },
                ]);
                setLoading(false);
                return;
            }

            if (!res.ok) {
                throw new Error(`Server error: ${res.status}`);
            }

            const data = await res.json();

            let botReply = null;
            if (data) { // Check for data object
                if ('reply' in data) botReply = data.reply;
                else if ('output' in data) botReply = data.output;
                else if (typeof data === 'string') botReply = data;
                else if ('error' in data) botReply = `Error: ${data.error}`;
            }

            if (botReply === null || botReply === undefined) botReply = 'No response received.';

            // Ensure content is a string to prevent rendering crashes
            const safeContent = typeof botReply === 'object' ? JSON.stringify(botReply) : String(botReply);

            setMessages((prev) => [
                ...prev,
                { id: `bot-${Date.now()}-${Math.random().toString(36).slice(2)}`, from: 'bot', type: 'text', content: safeContent, timestamp: getTime() },
            ]);
        } catch (err) {
            console.error('Error talking to API:', err);
            setMessages((prev) => [
                ...prev,
                { id: `error-${Date.now()}-${Math.random().toString(36).slice(2)}`, from: 'bot', type: 'text', content: 'Error contacting server.', timestamp: getTime() },
            ]);
        }

        setLoading(false);
    };

    const clearChat = () => {
        // Reset Session ID
        const newSessionId = typeof crypto !== 'undefined' && crypto.randomUUID
            ? crypto.randomUUID()
            : `session-${Date.now()}-${Math.random().toString(36).slice(2)}`;
        sessionIdRef.current = newSessionId;
        localStorage.setItem('rt_chat_session_id', newSessionId);
        localStorage.removeItem('rt_chat_messages');
        localStorage.removeItem('rt_chat_verified');
        setIsVerified(false);
        setMessages([]);
        setShowChat(false);
    };

    const quickMessages = [
        'I want to start a project',
        'What AI solutions have you built?',
        'Tell me about your services',
        'Show me your work',
    ];

    return (
        <main className={`fixed inset-0 w-full h-[100dvh] flex flex-col bg-white text-black ${showChat ? 'overflow-hidden' : 'overflow-y-auto overflow-x-hidden'}`}>
            <div className="fixed inset-0 z-0 pointer-events-none gradient-background">
                <SoftBackground />
            </div>

            <div className="relative z-20 w-full p-2 flex-none flex justify-between items-center">
                <Link href="/" className="cursor-pointer">
                    <Image
                        src="/logos/RT-Logo-New.svg"
                        alt="RT Logo"
                        width={48}
                        height={48}
                        className="w-12 h-12"
                    />
                </Link>
                {showChat && (
                    <button
                        onClick={clearChat}
                        className="text-sm font-medium text-black bg-gray-100 hover:bg-gray-200 transition-colors px-4 py-2 rounded-full"
                    >
                        Clear Chat
                    </button>
                )}
            </div>

            <div className={`relative z-10 flex-1 w-full md:max-w-3xl max-w-2xl mx-auto flex flex-col ${showChat ? 'overflow-hidden' : ''}`}>
                <AnimatePresence mode="wait">
                    {!showChat && (
                        <motion.div
                            key="hero"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="flex-1 flex flex-col items-center justify-center gap-6 p-4 text-center"
                        >
                            <h1 className="text-3xl sm:text-2xl md:text-4xl font-bold tracking-tight text-black md:whitespace-nowrap">
                                LET’S BRING YOUR BOLD IDEA TO LIFE!
                            </h1>
                            <div className="relative">
                                <Image
                                    src="/logos/AI-Chat.svg"
                                    alt="AI Chat"
                                    width={192}
                                    height={192}
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
                            className="flex-1 overflow-y-auto flex flex-col-reverse p-6 chat-scroll-container min-h-0"
                        >
                            {loading && (
                                <div className="flex justify-start items-center gap-1 mb-4">
                                    <div className="px-2 py-2 rounded-2xl bg-[#FFFBEF]">
                                        <div className="flex space-x-1 items-center">
                                            <span className="w-[4px] h-[6px] bg-gray-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                            <span className="w-[4px] h-[6px] bg-gray-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                            <span className="w-[4px] h-[6px] bg-gray-600 rounded-full animate-bounce"></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {[...messages].reverse().map((msg) => {
                                const isChallenge = msg.from === 'bot' && (msg.id?.startsWith('bot-challenge') || msg.content?.includes('prove you are human'));
                                return (
                                    <div
                                        key={msg.id}
                                        className={`flex w-full ${msg.from === "user" ? "justify-end" : "justify-start"
                                            }`}
                                    >
                                        <div className="flex flex-col max-w-[75%]">
                                            <div
                                                className={`
                    px-4 py-2 rounded-2xl text-[14px] leading-relaxed
                    ${msg.from === "user"
                                                        ? "bg-[#E5FEEE] text-gray-800 rounded-br-none shadow-sm"
                                                        : isChallenge
                                                            ? "bg-orange-200 border border-orange-300 text-gray-900 rounded-bl-none shadow-sm text-left"
                                                            : "bg-[#FFFBEF] text-gray-900 rounded-bl-none shadow-sm text-left"
                                                    }`}
                                                style={{
                                                    wordBreak: "break-word",
                                                }}
                                            >
                                                <ReactMarkdown
                                                    components={markdownComponents}
                                                >
                                                    {msg.content}
                                                </ReactMarkdown>
                                            </div>
                                            <div
                                                className={`text-[10px] mt-1 text-gray-500 ${msg.from === "user" ? "text-right" : "text-left"
                                                    }`}
                                            >
                                                {msg.timestamp}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Input Tray + Footer */}
            <div className="relative z-20 w-full flex-none">
                <div className={`w-full max-w-2xl mx-auto px-4 pt-1 flex flex-col gap-1 ${showChat ? 'pb-4' : 'pb-1'}`}>
                    {/* Quick buttons */}
                    {isVerified && (
                        <div className="w-full overflow-x-auto no-scrollbar py-4 px-4">
                            <div className="flex gap-2 w-max mx-auto md:w-full md:flex-wrap md:justify-center">
                                {quickMessages.map((q, i) => (
                                    <button
                                        key={i}
                                        onClick={() => sendMessage(q)}
                                        className="flex-shrink-0 px-3 py-2 text-xs sm:text-sm md:text-base md:px-6 rounded-full cursor-pointer bg-[#FFFCFD] text-[#000] shadow-lg hover:shadow-xl transition-all text-center whitespace-nowrap"
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Input */}
                    <div className="w-full">
                    <div className=" flex flex-row gap-2 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className={`w-full rounded-full shadow-lg backdrop-blur-md transition-all duration-300 ${isFocused ? 'animate-gradient-loop' : ''}`}
                            style={{
                                backgroundImage: isFocused ? 'linear-gradient(90deg, #DAE7F5, #EDF5E9, #FCF7D2, #DAE7F5)' : 'none',
                                backgroundSize: '200% 100%'
                            }}
                        >
                            <input
                                type="text"
                                aria-label="Chat input"
                                placeholder="What’s on your mind?"
                                className="flex-1 bg-white shadow-2xl w-full items-center px-4 py-2 md:py-3 md:px-6 rounded-full outline-none text-lg text-black placeholder:text-black pr-4"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                            />
                        </motion.div>
                        <div className="flex-shrink-0">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="rounded-full shadow-lg backdrop-blur-md transition-all duration-300"
                                style={{
                                    backgroundImage:
                                        'linear-gradient(80deg, #DAE7F5, #EDF5E9BF, #FCF7D2E7, #FFF8FF)',
                                }}

                            >
                                <button
                                    onClick={() => sendMessage()}
                                    className="p-3 md:p-4 rounded-full hover:scale-105 transition-transform duration-200 active:scale-95"
                                    aria-label="Chat with us"
                                >
                                    <Image
                                        src="/logos/Chat.svg"
                                        alt="Chat Icon"
                                        width={48}
                                        height={48}
                                        className="w-6 h-6 md:w-12 md:h-12 cursor-pointer transition-transform duration-200 hover:rotate-12 active:rotate-0"
                                    />
                                </button>
                            </motion.div>
                        </div>
                    </div>
                        <div className="max-w-xl text-center mx-auto mt-4">
                            <p className="md:text-sm text-xs text-black opacity-60">
                            Talk to us in your preferred language <br className="md:hidden" /> and we’ll get you on your way!
                            {showChat && <span className="block sm:inline sm:ml-1 text-[10px] opacity-70">Radical Thinking © 2026</span>}
                        </p>
                    </div>
                </div>
                </div>
                <AnimatePresence>
                    {!showChat && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden pb-[50px]"
                        >
                            <Footer />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}
