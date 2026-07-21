import { Suspense } from "react";
import Chat from "./chat";

export const metadata = {
  title: "Start a Conversation | Radical Thinking",
  description:
    "Ask anything. The Radical Thinking agent knows the work, the story, and the thinking. Start a conversation about your bold idea.",
  alternates: {
    canonical: "https://radical-thinking.net/chat",
  },
  openGraph: {
    title: "Start a Conversation | Radical Thinking",
    description:
      "Ask anything. The Radical Thinking agent knows the work, the story, and the thinking. Start a conversation.",
    url: "https://radical-thinking.net/chat",
    siteName: "Radical Thinking",
    images: [
      {
        url: "https://radical-thinking.net/Images/OG/OG-Chat.webp",
        width: 1200,
        height: 630,
        alt: "Radical Thinking AI Chat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Start a Conversation | Radical Thinking",
    description:
      "Ask anything. The Radical Thinking agent knows the work, the story, and the thinking. Start a conversation.",
    images: ["https://radical-thinking.net/Images/OG/OG-Chat.webp"],
  },
};

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="min-h-screen gradient-background" />}>
      <Chat />
    </Suspense>
  );
}
