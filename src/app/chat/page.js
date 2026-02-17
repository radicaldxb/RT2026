import { Suspense } from 'react';
import Chat from './chat';
import Script from "next/script";

export const metadata = {
    title: "Talk to Our AI | Radical Thinking",
    description: "Engage in a direct conversation with the official AI agent of Radical Thinking.",
    alternates: {
        canonical: "https://radical-thinking.net/chat",
    },
    openGraph: {
        title: "Talk to Our AI | Radical Thinking",
        description: "Engage in a direct conversation with the official AI agent of Radical Thinking.",
        url: "https://radical-thinking.net/chat",
        siteName: "Radical Thinking",
        images: [
            {
                url: "https://radical-thinking.net/Images/OG/RT-Chat.webp",
                width: 1200,
                height: 630,
                alt: "Radical Thinking AI Chat",
            },
        ],
    },
};

export default function ChatPage() {
    return (
        <main className="min-h-screen">
            <Suspense fallback={<div className="min-h-screen" />}>
                <Chat />
            </Suspense>
            
            {/* Google Analytics */}
            <Script
                strategy="afterInteractive"
                src="https://www.googletagmanager.com/gtag/js?id=G-FXY9Q2TXCL"
            />
            <Script id="gtag-init" strategy="afterInteractive">
                {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FXY9Q2TXCL');
            `}
            </Script>
        </main>
    );
}