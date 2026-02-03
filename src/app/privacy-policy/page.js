// File: app/privacy-policy/page.js
import Privacy from './privacy'
import Script from "next/script";

export const metadata = {
    title: "Privacy Policy | Radical Thinking",
    description:
        "Read the official Radical Thinking Privacy Policy. Learn how we collect, use, store, and protect your data when you interact with our website and AI-native services.",
    alternates: {
        canonical: "https://radical-thinking.net/privacy-policy",
    },
    openGraph: {
        type: "article",
        url: "https://radical-thinking.net/privacy-policy",
        title: "Privacy Policy | Radical Thinking",
        description:
            "Understand how Radical Thinking collects, uses, and protects your data when you interact with our AI-native services.",
        siteName: "Radical Thinking",
        images: [
            {
                url: "https://radical-thinking.net/images/legal-social-share.jpg",
                width: 1200,
                height: 630,
                alt: "Radical Thinking Privacy Policy",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Privacy Policy | Radical Thinking",
        description:
            "Understand how Radical Thinking collects, uses, and protects your data when you interact with our website and AI-native services.",
        images: ["https://radical-thinking.net/images/legal-social-share.jpg"],
    },
};

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen">
            <Privacy />
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
            {/* JSON-LD structured data */}
            <Script id="ld-json-privacy" type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebPage",
                    name: "Privacy Policy",
                    description:
                        "This page outlines the official privacy policy for Radical Thinking, including data collection, usage, storage, and user rights.",
                    url: "https://radical-thinking.net/privacy-policy",
                    publisher: {
                        "@type": "Organization",
                        name: "Radical Thinking",
                        url: "https://radical-thinking.net",
                        logo: {
                            "@type": "ImageObject",
                            url: "https://radical-thinking.net/images/logo.png",
                        },
                    },
                })}
            </Script>
        </main>
    );
}
