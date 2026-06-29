import Privacy from './privacy';

export const metadata = {
    title: "Privacy Policy | Radical Thinking",
    description: "Understand how Radical Thinking collects, uses, and protects your data when you interact with our website and AI-native services.",
    alternates: {
        canonical: "https://radical-thinking.net/privacy-policy",
    },
    openGraph: {
        title: "Privacy Policy | Radical Thinking",
        description: "Understand how Radical Thinking collects, uses, and protects your data when you interact with our website and AI-native services.",
        url: "https://radical-thinking.net/privacy-policy",
        siteName: "Radical Thinking",
        images: [
            {
                url: "https://radical-thinking.net/Images/OG/OG-Privacy.webp",
                width: 1200,
                height: 630,
                alt: "Radical Thinking Privacy Policy",
            },
        ],
    },
};

export default function PrivacyPage() {
    return <Privacy />;
}