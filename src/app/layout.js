import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Radical Thinking | AI-Native Agency in Dubai",
  description: "Radical Thinking is an AI-native agency that brings bold ideas to life with AI-driven solutions, innovation, and futuristic design.",
  keywords: ["AI Agency", "Artificial Intelligence", "AI Solutions", "Machine Learning", "AI Development", "AI Consulting", "Radical Thinking", "Dubai AI Agency"],
  authors: [{ name: "Radical Thinking" }],
  creator: "Radical Thinking",
  publisher: "Radical Thinking",
  metadataBase: new URL("https://radical-thinking.net"),
  openGraph: {
    type: "website",
    url: "https://radical-thinking.net",
    title: "Radical Thinking | AI-Native Agency in Dubai",
    description: "Radical Thinking is an AI-native agency that brings bold ideas to life with AI-driven solutions, innovation, and futuristic design.",
    siteName: "Radical Thinking",
    images: [{ url: "https://radical-thinking.net/images/social-share.jpg", width: 1200, height: 630, alt: "Radical Thinking Agency" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Radical Thinking | AI-Native Agency in Dubai",
    description: "Radical Thinking is an AI-native agency that brings bold ideas to life with AI-driven solutions, innovation, and futuristic design.",
    images: ["https://radical-thinking.net/images/social-share.jpg"],
  },
  icons: { icon: "/favicon-light.svg", apple: "/favicon-light.svg" },
  alternates: { canonical: "https://radical-thinking.net" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="geo.region" content="AE" />
        <meta name="geo.placename" content="Dubai" />
        <meta name="geo.position" content="25.276987;55.296249" />
        <meta name="ICBM" content="25.276987, 55.296249" />
      </head>
      <body className="antialiased m-0 p-0 min-h-full">
        {children}
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-FXY9Q2TXCL" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-FXY9Q2TXCL');`}
        </Script>
        <Script id="ld-json-org" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Radical Thinking",
            url: "https://radical-thinking.net",
            logo: "https://radical-thinking.net/images/logo.png",
            foundingDate: "2008",
            address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
            description: "An AI-native agency that brings bold ideas to life by combining creativity, experience, and technology.",
            contactPoint: { "@type": "ContactPoint", contactType: "customer support", email: "stephan@radical-thinking.net" },
            sameAs: ["https://www.linkedin.com/company/radicalthinking", "https://twitter.com/radicalthinking", "https://www.instagram.com/radicalthinking"],
            mainEntityOfPage: { "@type": "WebPage", "@id": "https://radical-thinking.net" },
            hasPart: [
              { "@type": "WebPage", name: "Talk to Our AI", url: "https://radical-thinking.net/chat", description: "Engage in a direct conversation with the official AI agent of Radical Thinking." },
              { "@type": "WebPage", name: "Privacy Policy", url: "https://radical-thinking.net/privacy-policy", description: "Understand how we collect, use, and protect your data." },
              { "@type": "WebPage", name: "Terms of Use", url: "https://radical-thinking.net/terms-of-use", description: "Official terms governing your access to the Radical Thinking services." }
            ],
          })}
        </Script>
      </body>
    </html>
  );
}
