import { Suspense } from 'react';
import Chat from './chat';

export const metadata = {
    title: "Talk to the Agent | Radical Thinking",
    description: "Ask anything. The Radical Thinking agent knows the work, the story, and the thinking. Start a conversation.",
    alternates: {
        canonical: "https://radical-thinking.net/chat",
    },
    openGraph: {
        title: "Talk to the Agent | Radical Thinking",
        description: "Ask anything. The Radical Thinking agent knows the work, the story, and the thinking. Start a conversation.",
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
        </main>
    );
}