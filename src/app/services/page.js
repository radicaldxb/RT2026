import Services from './services';
import Script from "next/script";

export const metadata = {
    title: "Intelligence as a Service | Radical Thinking Capabilities",
    description: "We don't just build software. We engineer digital ecosystems powered by AI and driven by radical strategy. Explore our capabilities in AI Agents, Branding, and Web Infrastructure.",
    alternates: {
        canonical: "https://radical-thinking.net/services",
    },
    openGraph: {
        title: "Radical Thinking Services",
        description: "AI Strategy, Development, and Design services for bold ideas.",
        url: "https://radical-thinking.net/services",
        siteName: "Radical Thinking",
        images: [
            {
                url: "https://radical-thinking.net/Images/OG/RT-Services.webp",
                width: 1200,
                height: 630,
                alt: "Radical Thinking Services",
            },
        ],
    },
};

export default function ServicesPage() {
    return (
        <main className="min-h-screen">
            <Services />
            
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

            {/* AEO: Service Structured Data */}
            <Script id="ld-json-services" type="application/ld+json">
                {JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Service",
                  "serviceType": "AI-Native Digital Agency Services",
                  "provider": {
                    "@type": "Organization",
                    "name": "Radical Thinking",
                    "url": "https://radical-thinking.net"
                  },
                  "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Radical Thinking Capabilities",
                    "itemListElement": [
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "AI & Automation",
                          "description": "Custom AI Agents, RAG Systems, LLM Setup, n8n Automation."
                        }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Digital Platforms",
                          "description": "Web Development, App Development, Headless Commerce, MVP Prototyping."
                        }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Branding & Design",
                          "description": "Brand Identity, UI/UX Design, Strategic Positioning, Data Visualization."
                        }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Immersive Media",
                          "description": "Video Production, Podcasting, AR/VR Experiences, Game Development."
                        }
                      }
                    ]
                  }
                })}
            </Script>
        </main>
    );
}
