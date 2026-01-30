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
  const [loading, setLoading] = useState(false);
  const [footerOpen, setFooterOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      from: 'bot',
      content:
        'Hello! I am your Radical Thinking agent. How can I help you today? You can speak to me in any language!',
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (showChat) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading, showChat]);

  const sendMessage = async (customMessage) => {
    const msg = (customMessage ?? query).trim();
    if (!msg) return;

    setMessages((prev) => [
      ...prev,
      {
        from: 'user',
        content: msg,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
    ]);

    setQuery('');
    setShowChat(true);
    setLoading(true);

    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatInput: msg }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          from: 'bot',
          content: data.reply || data.output || 'No response.',
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: 'bot', content: 'Error contacting server.' },
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

  return (
    <div className="main-viewport text-black">
      <SoftBackground />

      {/* HEADER */}
      <header className="w-full p-6 z-20 flex justify-start">
        <Link href="/">
          <img
            src="/logos/RT-Logo-New.svg"
            alt="RT Logo"
            className="w-14 h-14 object-contain"
          />
        </Link>
      </header>

      {/* CHAT CONTENT */}
      <div className="flex-1 w-full max-w-2xl mx-auto px-4 z-10 flex flex-col">
        <AnimatePresence>
          {!showChat ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 flex flex-col items-center justify-center text-center py-16"
            >
              <h1 className="text-4xl font-black tracking-tighter uppercase mb-4">
                WE BRING BOLD IDEAS TO LIFE.
              </h1>
              <p className="formula-gradient text-2xl mb-12 tracking-widest uppercase">
                BI = C + Ex × T²
              </p>
              <img
                src="/logos/AI-Chat.svg"
                alt="Chat"
                onClick={() => setShowChat(true)}
                className="w-48 h-48 cursor-pointer hover:scale-105 transition-transform"
              />
            </motion.div>
          ) : (
            <div className="chat-scroll-container flex-1 space-y-6 pt-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex w-full ${
                    msg.from === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div className="p-5 rounded-3xl max-w-[90%] bg-white/60 backdrop-blur-md border border-white/40 shadow-sm">
                    <ReactMarkdown className="prose prose-sm">
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} className="h-10" />
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* INPUT + SUGGESTIONS */}
      <div className="w-full max-w-2xl mx-auto p-4 z-30 sticky bottom-0">
        <div className="bg-white/40 backdrop-blur-2xl rounded-3xl border border-white/20 p-4 shadow-2xl">

          {/* SUGGESTIONS */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4 px-1 pb-2 snap-x snap-mandatory">
            {quickMessages.map((q, i) => (
              <button
                key={i}
                onClick={() => sendMessage(q)}
                className="whitespace-nowrap px-4 py-2 text-[10px] rounded-full bg-white text-black shadow-sm border border-black/5 font-bold shrink-0 snap-start"
              >
                {q}
              </button>
            ))}
          </div>

          {/* INPUT */}
          <div className="flex items-center gap-2 bg-white rounded-full shadow-lg p-1 pl-5 border border-black/5">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="What’s on your mind?"
              className="flex-1 bg-transparent py-3 text-sm outline-none font-bold"
            />
            <button
              onClick={() => sendMessage()}
              className="p-3 rounded-full shrink-0"
              style={{
                background:
                  'linear-gradient(80deg, #DAE7F5, #EDF5E9BF, #FCF7D2E7, #FFF8FF)',
              }}
            >
              <Image src="/logos/Chat.svg" alt="Send" width={24} height={24} />
            </button>
          </div>

          {/* FOOTER */}
          <div className="mt-4 hidden md:block">
            <Footer />
          </div>

          <div className="md:hidden mt-2">
            <button
              onClick={() => setFooterOpen(!footerOpen)}
              className="text-xs font-bold text-black opacity-60 mb-2"
            >
              {footerOpen ? 'Hide info' : 'Show info'}
            </button>

            <AnimatePresence>
              {footerOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Footer />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
