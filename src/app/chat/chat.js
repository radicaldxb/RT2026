/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from "react-markdown";
import { robotoSlab, serif } from "@/lib/fonts";
import SoftBackground from '@/components/SoftBackground';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import { useSearchParams } from 'next/navigation';

const ChatImage = ({ node, ...props }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
    return (
        <div className="relative my-2">
            {isLoading && (
                <div className="w-full h-48 bg-white/10 animate-pulse rounded-lg flex items-center justify-center">
                    <svg className="w-8 h-8 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
            )}
            <img
                {...props}
                className={`max-w-full h-auto rounded-lg cursor-pointer hover:opacity-90 transition-opacity ${isLoading ? 'opacity-0 absolute top-0 left-0' : 'opacity-100'}`}
                style={{ maxHeight: '300px', width: 'auto' }}
                alt={props.alt || 'Chat Image'}
                onLoad={() => setIsLoading(false)}
                onError={() => setIsLoading(false)}
                onClick={() => setIsOpen(true)}
            />
            {mounted && isOpen && createPortal(
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
                    onClick={() => setIsOpen(false)}
                >
                    <motion.img
                        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                        src={props.src} alt={props.alt || 'Full screen image'}
                        className="max-w-full max-h-[90vh] object-contain rounded-lg"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <button className="absolute top-5 right-5 text-white/60 hover:text-white p-2" onClick={() => setIsOpen(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </motion.div>,
                document.body
            )}
        </div>
    );
};

const quickMessages = [
    'I want to start a project',
    'What AI solutions have you built?',
    'Tell me about your services',
    'Show me your work',
];

export default function Chat() {
    const [query, setQuery] = useState('');
    const [showChat, setShowChat] = useState(false);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [darkMode, setDarkMode] = useState(true);
    const sessionIdRef = useRef('');
    const pageContextRef = useRef({ ref: null, source: null });
    const searchParams = useSearchParams();
    const hasRun = useRef(false);
    const lastMessageRef = useRef('');
    const repetitionCountRef = useRef(0);
    const lastMessageTimeRef = useRef(0);
    const rapidCountRef = useRef(0);
    const [isVerified, setIsVerified] = useState(false);
    const challengeRef = useRef({ q: "5 + 2 =", a: ["7", "seven"] });

    const generateChallenge = () => {
        const n1 = Math.floor(Math.random() * 9) + 1;
        const n2 = Math.floor(Math.random() * 9) + 1;
        const sum = n1 + n2;
        const numberWords = { 2:'two',3:'three',4:'four',5:'five',6:'six',7:'seven',8:'eight',9:'nine',10:'ten',11:'eleven',12:'twelve',13:'thirteen',14:'fourteen',15:'fifteen',16:'sixteen',17:'seventeen',18:'eighteen' };
        const answers = [sum.toString()];
        if (numberWords[sum]) answers.push(numberWords[sum]);
        return { q: `${n1} + ${n2} =`, a: answers };
    };

    function getTime() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    useEffect(() => {
        let storedSessionId = localStorage.getItem('rt_chat_session_id');
        if (!storedSessionId) {
            storedSessionId = typeof crypto !== 'undefined' && crypto.randomUUID
                ? crypto.randomUUID()
                : `session-${Date.now()}-${Math.random().toString(36).slice(2)}`;
            localStorage.setItem('rt_chat_session_id', storedSessionId);
        }
        sessionIdRef.current = storedSessionId;

        const storedVerified = localStorage.getItem('rt_chat_verified');
        if (storedVerified === 'true') setIsVerified(true);

        const storedMessages = localStorage.getItem('rt_chat_messages');
        if (storedMessages) {
            try {
                const parsed = JSON.parse(storedMessages);
                setMessages(parsed);
                if (parsed.length > 0) setShowChat(true);
            } catch (e) {
                console.error("Failed to parse chat history", e);
            }
        } else {
            setMessages((prev) => prev.map((msg, i) => i === 0 ? { ...msg, timestamp: getTime() } : msg));
        }

        const initialMessage = searchParams.get('message');
        const refParam = searchParams.get('ref');
        const sourceParam = searchParams.get('source');
        if (refParam || sourceParam) pageContextRef.current = { ref: refParam || null, source: sourceParam || null };

        if (!hasRun.current) {
            if (initialMessage) {
                hasRun.current = true;
                sendMessage(initialMessage);
            } else if (refParam) {
                hasRun.current = true;
                const projectContexts = {
                    'animal-intelligence': "I'd like to understand the Animal Intelligence animal welfare platform.",
                    'kahulife': "Tell me about the Kahulife pet management platform and AI companion.",
                    'tommy-ellie': "How does the Tommy & Ellie generative AI art studio work?",
                    'simon-snelder': "I'd like to learn about the premium branding and wealth management identity for Simon Snelder.",
                    'austability-web': "Tell me about the Austability enterprise web platform and digital infrastructure.",
                    austability: "Tell me about the Austability enterprise web platform and digital infrastructure.",
                    'austability-branding': "Tell me about the Austability brand identity and visual overhaul.",
                    'austability-video': "Tell me about the corporate storytelling approach in the Austability Video.",
                    'flexxpay': "How does the FlexxPay product video highlight fintech accessibility?",
                    'webinarlife': "What features make up the Webinarlife digital ecosystem?",
                    'ai-networks': "Tell me about the visual identity for AI Networks' hardware.",
                    'bella-conversational-ai': "How was the persona designed for Bella Conversational AI?",
                    'crypto-x': "What is the strategy behind the Crypto X visual identity?",
                    'influence-my-world': "How does Influence My World connect creators and brands?",
                    'kfas-1001-inventions': "Tell me about the educational web design for KFAS / 1001 Inventions.",
                    'microsoft-ai': "How does this project showcase Microsoft's AI capabilities?",
                    'lenovo-campaigns': "Tell me about the multi-channel strategy for Lenovo Campaigns.",
                    'payment-partners': "Tell me about the Payment Partners brand identity and corporate collateral.",
                    '1001-inventions-games': "How do the 1001 Inventions Games utilize gamification for education?",
                    'akshaak': "What is the marketplace strategy behind Akshaak?",
                    'soundreaver': "Tell me about the Soundreaver brand and e-commerce strategy.",
                    'ai-is-rocket-fuel': "I've just read the 'AI is Rocket Fuel' article and I'd like to debate or discuss the concepts mentioned.",
                    'fluffyfriends': "I'm interested in the FluffyFriends autonomous AI factory. How does the quality assurance and n8n workflow function?",
                };
                const startMsg = projectContexts[refParam] || `I'd like to learn more about the ${refParam.replace(/-/g, ' ')} project.`;
                sendMessage(startMsg);
            }
        }
    }, [searchParams]);

    useEffect(() => {
        if (messages.length > 0) localStorage.setItem('rt_chat_messages', JSON.stringify(messages.slice(-50)));
    }, [messages]);

    const handleKeyDown = (e) => { if (e.key === 'Enter') sendMessage(); };

    const sendMessage = async (customMessage) => {
        if (loading) return;
        const msg = (customMessage ?? query).trim();
        if (!msg) return;

        const userMsg = { id: `user-${Date.now()}-${Math.random().toString(36).slice(2)}`, from: 'user', type: 'text', content: msg, timestamp: getTime() };
        setMessages((prev) => [...prev, userMsg]);
        setQuery('');
        setShowChat(true);
        setLoading(true);

        const isSystemMessage = typeof customMessage === 'string' && customMessage.length > 0;

        if (!isVerified && !isSystemMessage) {
            const answer = msg.toLowerCase().trim();
            if (challengeRef.current.a.includes(answer)) {
                setIsVerified(true);
                localStorage.setItem('rt_chat_verified', 'true');
                setTimeout(() => {
                    setMessages((prev) => [...prev, { id: `bot-verified-${Date.now()}`, from: 'bot', type: 'text', content: "That is correct! How can I help you today?", timestamp: getTime() }]);
                    setLoading(false);
                }, 600);
            } else {
                const newChallenge = generateChallenge();
                challengeRef.current = newChallenge;
                setTimeout(() => {
                    setMessages((prev) => [...prev, { id: `bot-challenge-${Date.now()}`, from: 'bot', type: 'text', content: messages.length === 0 ? `Before we start let's make sure you are human. Please answer ${newChallenge.q}` : `That is incorrect. Please prove you are human: What is ${newChallenge.q}?`, timestamp: getTime() }]);
                    setLoading(false);
                }, 600);
            }
            return;
        }

        const now = Date.now();
        if (now - lastMessageTimeRef.current < 2000) { rapidCountRef.current += 1; } else { rapidCountRef.current = 0; }
        if (rapidCountRef.current >= 2) {
            if (rapidCountRef.current === 2) setMessages((prev) => [...prev, { id: `rapid-limit-${Date.now()}`, from: 'bot', type: 'text', content: "You're typing a bit too fast. Please slow down.", timestamp: getTime() }]);
            setLoading(false);
            return;
        }
        if (msg === lastMessageRef.current && (now - lastMessageTimeRef.current < 5000)) { repetitionCountRef.current += 1; } else { repetitionCountRef.current = 0; }
        lastMessageRef.current = msg;
        lastMessageTimeRef.current = now;
        if (repetitionCountRef.current >= 4) {
            if (repetitionCountRef.current === 4) setTimeout(() => { setMessages((prev) => [...prev, { id: `bot-spam-${Date.now()}`, from: 'bot', type: 'text', content: "I know a bot when I see one, I'll wait for now with responding.", timestamp: getTime() }]); setLoading(false); }, 600);
            else setLoading(false);
            return;
        }

        try {
            const metadata = {};
            if (pageContextRef.current.ref) metadata.ref = pageContextRef.current.ref;
            if (pageContextRef.current.source) metadata.source = pageContextRef.current.source;
            const res = await fetch('/api/chatbot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chatInput: msg, sessionId: sessionIdRef.current, ...(Object.keys(metadata).length > 0 && { metadata }) }),
            });
            if (res.status === 429) { setMessages((prev) => [...prev, { id: `rate-limit-${Date.now()}`, from: 'bot', type: 'text', content: "Whoa there! You're sending messages a bit too fast. Please take a breather and try again in a minute.", timestamp: getTime() }]); setLoading(false); return; }
            if (!res.ok) throw new Error(`Server error: ${res.status}`);
            const data = await res.json();
            let botReply = null;
            if (data) {
                if ('reply' in data) botReply = data.reply;
                else if ('output' in data) botReply = data.output;
                else if (typeof data === 'string') botReply = data;
                else if ('error' in data) botReply = `Error: ${data.error}`;
            }
            if (botReply === null || botReply === undefined) botReply = 'No response received.';
            const safeContent = typeof botReply === 'object' ? JSON.stringify(botReply) : String(botReply);
            setMessages((prev) => [...prev, { id: `bot-${Date.now()}-${Math.random().toString(36).slice(2)}`, from: 'bot', type: 'text', content: safeContent, timestamp: getTime() }]);
        } catch (err) {
            console.error('Error talking to API:', err);
            setMessages((prev) => [...prev, { id: `error-${Date.now()}-${Math.random().toString(36).slice(2)}`, from: 'bot', type: 'text', content: 'Error contacting server.', timestamp: getTime() }]);
        }
        setLoading(false);
    };

    const clearChat = () => {
        const newSessionId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `session-${Date.now()}-${Math.random().toString(36).slice(2)}`;
        sessionIdRef.current = newSessionId;
        localStorage.setItem('rt_chat_session_id', newSessionId);
        localStorage.removeItem('rt_chat_messages');
        localStorage.removeItem('rt_chat_verified');
        setIsVerified(false);
        setMessages([]);
        setShowChat(false);
    };

    const theme = {
        bg: darkMode ? '#0d0d0d' : '#fafaf8',
        surface: darkMode ? '#1a1a1a' : '#ffffff',
        border: darkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)',
        text: darkMode ? '#f2f2f2' : '#0a0a0a',
        subtle: darkMode ? 'rgba(255,255,255,0.72)' : 'rgba(0,0,0,0.72)',
        botLabel: '#1ACDEB',
        userLabel: darkMode ? '#E18949' : '#6B17DA',
        inputCaret: darkMode ? '#ffffff' : '#000000',
        blinker: darkMode ? '#ffffff' : '#000000',
        challenge: '#E18949',
    };

    const titleBarBtn = {
        background: 'rgba(255,255,255,0.2)',
        color: '#ffffff',
        border: '1px solid rgba(255,255,255,0.35)',
    };

    const markdownComponents = {
        ul: ({ node, ...props }) => <ul className="list-disc pl-5 space-y-1" {...props} />,
        ol: ({ node, ...props }) => <ol className="list-decimal pl-5 space-y-1" {...props} />,
        li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
        strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
        p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
        img: ChatImage,
        a: ({ node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-70 transition-opacity break-all" style={{ color: '#1ACDEB' }} />,
    };

    return (
        <main className="relative min-h-screen flex flex-col overflow-x-hidden">
            <span className={robotoSlab.className} hidden aria-hidden />

            <div className="fixed inset-0 z-0 pointer-events-none gradient-background">
                <SoftBackground />
            </div>

            <Nav />

            <section className="relative z-10 flex-1 w-full px-4 py-14 md:py-20 pt-24 md:pt-28 pb-12 md:pb-16">
                <div className="max-w-[700px] mx-auto text-center">
                    <span className="block text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-2">
                        Talk to Us
                    </span>
                    <h1
                        className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.1] text-black mb-4 text-balance"
                        style={serif}
                    >
                        Tell us about your bold idea.
                    </h1>
                    <p className="text-base text-gray-600 leading-relaxed mb-8 md:mb-10 max-w-[560px] mx-auto">
                        Our agent thinks the way we do. Ask it anything about your business, your challenge, or where to start. It will tell you honestly what it thinks.
                    </p>

                    <div
                        className="rounded-2xl text-left"
                        style={{
                            boxShadow: '0 32px 80px rgba(0,0,0,0.22), 0 12px 32px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.08)',
                        }}
                    >
                        <div className="rounded-2xl overflow-hidden">
                        {/* Terminal title bar */}
                        <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 flex-nowrap" style={{ background: '#181818' }}>
                            <div className="flex items-center gap-1.5 flex-shrink-0">
                                <span className="w-3 h-3 rounded-full bg-[#ff5f57] flex-shrink-0" />
                                <span className="w-3 h-3 rounded-full bg-[#ffbd2e] flex-shrink-0" />
                                <span className="w-3 h-3 rounded-full bg-[#28ca41] flex-shrink-0" />
                            </div>
                            <span className="ml-1 text-xs text-white tracking-wide whitespace-nowrap">RT Agent</span>
                            <div className="ml-auto flex items-center gap-1.5 flex-shrink-0">
                                <button
                                    type="button"
                                    onClick={() => setDarkMode(!darkMode)}
                                    aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                                    className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-widest transition-all duration-200 hover:opacity-90"
                                    style={titleBarBtn}
                                >
                                    <span>{darkMode ? '◑' : '●'}</span>
                                    <span className="hidden sm:inline">{darkMode ? 'Light' : 'Dark'}</span>
                                </button>
                                {(showChat || messages.length > 0) && (
                                    <button
                                        type="button"
                                        onClick={clearChat}
                                        aria-label="Clear chat"
                                        className="px-2.5 sm:px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-widest transition-all duration-200 hover:opacity-90"
                                        style={titleBarBtn}
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Terminal body */}
                        <div
                            className="flex flex-col transition-colors duration-300"
                            style={{
                                background: theme.bg,
                                color: theme.text,
                                minHeight: 'min(70vh, 560px)',
                                maxHeight: 'min(70vh, 560px)',
                            }}
                        >
                            <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex-1 overflow-y-auto flex flex-col-reverse px-4 md:px-6 py-5 gap-5 min-h-0 chat-scroll-container font-mono text-sm leading-relaxed"
                                >
                                    <div className="w-full flex justify-start">
                                        <div className="max-w-[85%] text-left">
                                            <div className="text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: theme.botLabel }}>
                                                › Radical Thinking
                                            </div>
                                            <div className="text-sm leading-relaxed" style={{ color: theme.text }}>
                                                Tell us about your bold idea.
                                                <span
                                                    className="inline-block w-2 h-4 ml-1 align-text-bottom"
                                                    style={{ background: theme.blinker, animation: 'rt-blink 1s step-end infinite' }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {loading && (
                                        <div className="w-full flex justify-start">
                                            <div className="flex items-center gap-2 max-w-[85%]" style={{ color: theme.botLabel }}>
                                                <span className="text-xs font-semibold uppercase tracking-wide">› Radical Thinking</span>
                                                <span className="inline-flex gap-1">
                                                    <span className="w-1 h-3 rounded-sm animate-bounce [animation-delay:-0.3s]" style={{ background: theme.text }} />
                                                    <span className="w-1 h-3 rounded-sm animate-bounce [animation-delay:-0.15s]" style={{ background: theme.text }} />
                                                    <span className="w-1 h-3 rounded-sm animate-bounce" style={{ background: theme.text }} />
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {[...messages].reverse().map((msg) => {
                                        const isUser = msg.from === 'user';
                                        const isChallenge = msg.from === 'bot' && (msg.id?.startsWith('bot-challenge') || msg.content?.includes('prove you are human'));
                                        const labelColor = isUser ? theme.userLabel : isChallenge ? theme.challenge : theme.botLabel;
                                        const label = isUser ? 'You ›' : '› Radical Thinking';

                                        return (
                                            <div key={msg.id} className={`w-full flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`max-w-[85%] ${isUser ? 'text-right' : 'text-left'}`}>
                                                    <div className="text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: labelColor }}>
                                                        {label}
                                                    </div>
                                                    <div className="text-sm leading-relaxed" style={{ color: theme.text, wordBreak: 'break-word' }}>
                                                        <ReactMarkdown components={markdownComponents}>
                                                            {msg.content}
                                                        </ReactMarkdown>
                                                    </div>
                                                    <div className="text-[10px] mt-1.5" style={{ color: theme.subtle }}>
                                                        {msg.timestamp}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </motion.div>
                            </div>

                            <div className="flex-none px-4 md:px-6 pt-3 pb-4 flex flex-col gap-3" style={{ borderTop: `0.5px solid ${theme.border}` }}>
                                {isVerified && (
                                    <div className="w-full overflow-x-auto no-scrollbar">
                                        <div className="flex gap-2 w-max md:w-full md:flex-wrap">
                                            {quickMessages.map((q, i) => (
                                                <button
                                                    key={i}
                                                    type="button"
                                                    onClick={() => sendMessage(q)}
                                                    className="flex-shrink-0 px-4 py-1.5 text-xs rounded-full transition-all duration-200 whitespace-nowrap"
                                                    style={{
                                                        background: theme.surface,
                                                        border: `0.5px solid ${theme.border}`,
                                                        color: theme.text,
                                                    }}
                                                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#1ACDEB'; }}
                                                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme.border; }}
                                                >
                                                    {q}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center gap-3">
                                    <span className="text-base flex-shrink-0 font-mono" style={{ color: theme.userLabel }}>›</span>
                                    <input
                                        type="text"
                                        aria-label="Chat input"
                                        placeholder="Start typing your answer..."
                                        className="flex-1 bg-transparent outline-none text-sm md:text-base font-mono"
                                        style={{ color: theme.text, caretColor: theme.inputCaret }}
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        onFocus={() => setIsFocused(true)}
                                        onBlur={() => setIsFocused(false)}
                                    />
                                    <div className="flex-shrink-0">
                                        <div
                                            className="rounded-full shadow-lg backdrop-blur-md transition-all duration-300"
                                            style={{
                                                backgroundImage: darkMode
                                                    ? 'linear-gradient(80deg, rgba(255,255,255,0.14), rgba(255,255,255,0.08), rgba(255,255,255,0.12), rgba(255,255,255,0.06))'
                                                    : 'linear-gradient(80deg, #DAE7F5, #EDF5E9BF, #FCF7D2E7, #FFF8FF)',
                                            }}
                                        >
                                            <button
                                                type="button"
                                                onClick={() => sendMessage()}
                                                aria-label="Send message"
                                                className="p-3 md:p-3.5 rounded-full hover:scale-105 transition-transform duration-200 active:scale-95"
                                            >
                                                <Image
                                                    src="/logos/Chat.svg"
                                                    alt=""
                                                    width={48}
                                                    height={48}
                                                    className={`w-7 h-7 md:w-8 md:h-8 transition-transform duration-200 hover:rotate-12 active:rotate-0 ${darkMode ? 'brightness-0 invert' : ''}`}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>

                    <p className="text-center text-[10px] tracking-wider uppercase text-[#8a8780] mt-6">
                        Talk to us in your preferred language
                    </p>
                </div>
            </section>

            <div className="relative z-10">
                <Footer />
            </div>
        </main>
    );
}
