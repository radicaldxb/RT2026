import TermsOfUse from './terms';
import Script from "next/script";

export const metadata = {
    title: "Terms of Use | Radical Thinking",
    description: "Read the Terms of Use for Radical Thinking. These terms govern your access to and use of our website and services.",
    alternates: {
        canonical: "https://radical-thinking.net/terms-of-use",
    },
    openGraph: {
        title: "Terms of Use | Radical Thinking",
        description: "Read the Terms of Use for Radical Thinking.",
        url: "https://radical-thinking.net/terms-of-use",
        siteName: "Radical Thinking",
        images: [
            {
                url: "https://radical-thinking.net/images/og/RT-Terms.webp",
                width: 1200,
                height: 630,
                alt: "Radical Thinking Terms of Use",
            },
        ],
    },
};

export default function TermsPage() {
    return (
        <main className="min-h-screen">
            <TermsOfUse />
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