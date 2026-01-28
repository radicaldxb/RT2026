// File: app/terms-of-use/page.js
import Terms from './terms'
import Script from "next/script";

export const metadata = {
    title: "Terms of Use | Radical Thinking",
    description:
        "Read the official Radical Thinking Terms of Use. This document governs your access to and use of our website, AI agent, and other services.",
    alternates: {
        canonical: "https://radical-thinking.net/terms-of-use",
    },
    openGraph: {
        type: "article",
        url: "https://radical-thinking.net/terms-of-use",
        title: "Terms of Use | Radical Thinking",
        description:
            "Official terms governing your access to and use of the Radical Thinking website, AI agent, and other services.",
        siteName: "Radical Thinking",
        images: [
            {
                url: "https://radical-thinking.net/images/legal-social-share.jpg",
                width: 1200,
                height: 630,
                alt: "Radical Thinking Terms of Use",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Terms of Use | Radical Thinking",
        description:
            "Official terms governing your access to and use of the Radical Thinking website, AI agent, and other services.",
        images: ["https://radical-thinking.net/images/legal-social-share.jpg"],
    },
};

export default function TermsOfUsePage() {
    return (
        <main className="min-h-screen">

            <Terms />
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
            <Script id="ld-json-terms" type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebPage",
                    name: "Terms of Use for Radical Thinking",
                    description:
                        "This page outlines the official terms and conditions for using the Radical Thinking website and its associated services, including our AI agent. It covers user responsibilities, intellectual property, and limitations of liability.",
                    url: "https://radical-thinking.net/terms-of-use",
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
