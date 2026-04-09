// File: app/layout.js
import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Radical Thinking | AI-Native Agency in Dubai",
  description:
    "Radical Thinking is an AI-native agency that brings bold ideas to life with AI-driven solutions, innovation, and futuristic design.",
  authors: [{ name: "Radical Thinking" }],
  creator: "Radical Thinking",
  publisher: "Radical Thinking",
  metadataBase: new URL("https://radical-thinking.net"),
  openGraph: {
    type: "website",
    url: "https://radical-thinking.net",
    title: "Radical Thinking | AI-Native Agency in Dubai",
    description:
      "Radical Thinking is an AI-native agency that brings bold ideas to life with AI-driven solutions, innovation, and futuristic design.",
    siteName: "Radical Thinking",
    images: [
      {
        url: "https://radical-thinking.net/Images/OG/RT-Social-Share.webp",
        width: 1200,
        height: 630,
        alt: "Radical Thinking Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Radical Thinking | AI-Native Agency in Dubai",
    description:
      "Radical Thinking is an AI-native agency that brings bold ideas to life with AI-driven solutions, innovation, and futuristic design.",
    images: ["https://radical-thinking.net/Images/OG/RT-Social-Share.webp"],
  },
  icons: {
    icon: "/favicon-light.svg",
    apple: "/favicon-light.svg",
  },
  alternates: {
    canonical: "https://radical-thinking.net",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Favicon & Manifest */}
        <link rel="manifest" href="/manifest.webmanifest" />

        {/* Extra SEO Geo Tags (Dubai targeting) */}
        <meta name="geo.region" content="AE" />
        <meta name="geo.placename" content="Dubai" />
        <meta name="geo.position" content="25.276987;55.296249" />
        <meta name="ICBM" content="25.276987, 55.296249" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {children}

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

        {/*  Global Structured Data (Organization + hasPart pages) */}
        <Script id="ld-json-org" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Radical Thinking",
            url: "https://radical-thinking.net",
            logo: "https://radical-thinking.net/logos/RT-Logo-New.svg",
            foundingDate: "2009",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Dubai",
              addressCountry: "AE",
            },
            description:
              "An AI-native agency that brings bold ideas to life by combining creativity, experience, and technology.",
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "customer support",
              email: "stephan@radical-thinking.net",
            },
            sameAs: [
              "https://www.linkedin.com/company/radicalthinking",
              "https://twitter.com/radicalthinking",
              "https://www.instagram.com/radicalthinking",
            ],
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://radical-thinking.net",
            },
            hasPart: [
              {
                "@type": "WebPage",
                name: "Talk to the Agent",
                url: "https://radical-thinking.net/chat",
                description:
                  "Ask anything. The Radical Thinking agent knows the work, the story, and the thinking.",
              },
              {
                "@type": "WebPage",
                name: "About Us",
                url: "https://radical-thinking.net/about",
                description:
                  "Learn about Radical Thinking, an AI-native agency bridging creativity and technology.",
              },
              {
                "@type": "WebPage",
                name: "Services",
                url: "https://radical-thinking.net/services",
                description:
                  "Explore our AI strategy, development, and design services.",
              },
              {
                "@type": "WebPage",
                name: "Portfolio",
                url: "https://radical-thinking.net/portfolio",
                description:
                  "View our selected work and case studies.",
              },
              {
                "@type": "WebPage",
                name: "Radical Insights",
                url: "https://radical-thinking.net/insights",
                description:
                  "Articles and insights on AI, technology, and strategy from Radical Thinking.",
              },
              {
                "@type": "WebPage",
                name: "Privacy Policy",
                url: "https://radical-thinking.net/privacy-policy",
                description:
                  "Understand how we collect, use, and protect your data when you interact with our website and AI-native services.",
              },
              {
                "@type": "WebPage",
                name: "Terms of Use",
                url: "https://radical-thinking.net/terms-of-use",
                description:
                  "Official terms governing your access to and use of the Radical Thinking website, AI agent, and other services.",
              },
            ],
          })}
        </Script>

        <Script id="ld-json-person" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Stephan van Wijk",
            jobTitle: "Founder",
            worksFor: {
              "@type": "Organization",
              name: "Radical Thinking",
              url: "https://radical-thinking.net",
            },
            url: "https://radical-thinking.net/about",
            sameAs: [
              "https://www.linkedin.com/in/stephansnelder",
            ],
          })}
        </Script>
      </body>
    </html>
  );
}
