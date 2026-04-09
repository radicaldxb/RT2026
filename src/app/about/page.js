import About from './about';
import Script from "next/script";

export const metadata = {
    title: "About Us | Radical Thinking AI Agency",
    description: "Radical Thinking is a Dubai-based AI-native agency founded in 2009. We combine 15+ years of experience with AI to build bold ideas that land.",
    alternates: {
        canonical: "https://radical-thinking.net/about",
    },
    openGraph: {
        title: "About Radical Thinking",
        description: "Discover how we combine human creativity with AI technology to build the future of digital experiences.",
        url: "https://radical-thinking.net/about",
        siteName: "Radical Thinking",
        images: [
            {
                url: "https://radical-thinking.net/Images/OG/RT-About.webp",
                width: 1200,
                height: 630,
                alt: "About Radical Thinking",
            },
        ],
    },
};

export default function AboutPage() {
    return (
        <main className="min-h-screen">
            <About />

            {/* AEO: Organization Structured Data */}
            <Script id="ld-json-about" type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "AboutPage",
                    "mainEntity": {
                        "@type": "Organization",
                        "name": "Radical Thinking",
                        "description": "An AI-native agency based in Dubai specializing in AI strategy, web design, and digital innovation.",
                        "foundingLocation": "Dubai, UAE",
                        "url": "https://radical-thinking.net"
                    }
                })}
            </Script>

            <Script id="ld-json-faq-about" type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    mainEntity: [
                        {
                            "@type": "Question",
                            name: "When was Radical Thinking founded?",
                            acceptedAnswer: {
                                "@type": "Answer",
                                text: "Radical Thinking was founded in 2009 in Dubai, UAE.",
                            },
                        },
                        {
                            "@type": "Question",
                            name: "Who founded Radical Thinking?",
                            acceptedAnswer: {
                                "@type": "Answer",
                                text: "Radical Thinking was founded by Stephan van Wijk, who first built relationships in Dubai during a Microsoft internship in 2005.",
                            },
                        },
                        {
                            "@type": "Question",
                            name: "Where is Radical Thinking based?",
                            acceptedAnswer: {
                                "@type": "Answer",
                                text: "Radical Thinking is headquartered in Dubai, United Arab Emirates, and works with clients globally.",
                            },
                        },
                        {
                            "@type": "Question",
                            name: "What does Radical Thinking do?",
                            acceptedAnswer: {
                                "@type": "Answer",
                                text: "Radical Thinking is an AI-native agency that builds AI agents, web platforms, automations, and digital experiences. It operates on the formula BI = C + Ex x T² — Bold Ideas equal Creative plus Experience multiplied by Technology squared.",
                            },
                        },
                        {
                            "@type": "Question",
                            name: "Is Radical Thinking a licensed business?",
                            acceptedAnswer: {
                                "@type": "Answer",
                                text: "Yes. Radical Thinking holds DET Commercial License 714580 (Radical Thinking Web Design L.L.C), licensed since 2014 in Dubai, UAE.",
                            },
                        },
                    ],
                })}
            </Script>
        </main>
    );
}