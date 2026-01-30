import ChatUI from "./chat";
import Script from "next/script";

export const metadata = {
    title: "Talk to Our AI | The Radical Thinking Agent",
    description: "Why browse a static website when you can have a conversation? Talk directly to our AI agent to get the answers you need about our work, process, and how we can help.",
    alternates: { canonical: "https://radical-thinking.net/chat" },
    openGraph: {
        type: "website",
        url: "https://radical-thinking.net/chat",
        title: "Talk to the Radical Thinking AI",
        description: "Why browse a static website when you can have a conversation? Get the answers you need about our work and process directly from our AI agent.",
        siteName: "Radical Thinking",
        images: [{ url: "https://radical-thinking.net/images/chat-social-share.jpg", width: 1200, height: 630, alt: "Radical Thinking Chat AI" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Talk to the Radical Thinking AI",
        description: "Why browse a static website when you can have a conversation? Get the answers you need about our work and process directly from our AI agent.",
        images: ["https://radical-thinking.net/images/chat-social-share.jpg"],
    },
};

export default function ChatPage() {
    return (
        <main className="min-h-screen w-full relative">
            <ChatUI />
            <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-FXY9Q2TXCL" />
            <Script id="gtag-init" strategy="afterInteractive">
                {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-FXY9Q2TXCL');`}
            </Script>
        </main>
    );
}
