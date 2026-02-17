import About from './about';
import Script from "next/script";

export const metadata = {
    title: "About Us | Radical Thinking AI Agency",
    description: "Radical Thinking is a Dubai-based AI-native agency. We combine creativity, experience, and technology to build bold digital solutions.",
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
        </main>
    );
}