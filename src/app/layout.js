// File: app/layout.js
import "./globals.css";
import Script from "next/script";
import { roboto, robotoSlab } from "@/lib/fonts";
import LegacyServiceWorkerCleanup from "@/components/LegacyServiceWorkerCleanup";

const GTM_ID = "GTM-W67J42";

export const metadata = {
  title: "Radical Thinking | Creative + Experience × Technology²",
  description:
    "Radical Thinking is a partner for organisations working on bold ideas. Creative finds what is worth building, experience makes it land, technology and AI amplify both.",
  authors: [{ name: "Radical Thinking" }],
  creator: "Radical Thinking",
  publisher: "Radical Thinking",
  metadataBase: new URL("https://radical-thinking.net"),
  openGraph: {
    type: "website",
    url: "https://radical-thinking.net",
    title: "Radical Thinking | Creative + Experience × Technology²",
    description:
      "Radical Thinking is a partner for organisations working on bold ideas. Creative finds what is worth building, experience makes it land, technology and AI amplify both.",
    siteName: "Radical Thinking",
    images: [
      {
        url: "https://radical-thinking.net/Images/OG/OG-Homepage.webp",
        width: 1200,
        height: 630,
        alt: "Radical Thinking",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Radical Thinking | Creative + Experience × Technology²",
    description:
      "Radical Thinking. A partner for organisations working on bold ideas. Creative, experience, technology, and AI in the right ratio.",
    images: ["https://radical-thinking.net/Images/OG/OG-Homepage.webp"],
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

        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      </head>
      <body className={`${roboto.className} antialiased font-light`} suppressHydrationWarning>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <span className={robotoSlab.className} hidden aria-hidden />
        <LegacyServiceWorkerCleanup />
        {children}

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
              "A Dubai-based partner for organisations working on bold ideas, guided by BI = C + Ex × T².",
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
                name: "Start a conversation",
                url: "https://radical-thinking.net/chat",
                description:
                  "Ask anything. The Radical Thinking assistant knows the work, the story, and the thinking.",
              },
              {
                "@type": "WebPage",
                name: "About Us",
                url: "https://radical-thinking.net/about",
                description:
                  "Radical Thinking is a UAE-based partner for organisations working on bold ideas. Founded in 2009 by Stephan van Wijk.",
              },
              {
                "@type": "WebPage",
                name: "Services",
                url: "https://radical-thinking.net/services",
                description:
                  "Ideas and Positioning, Experience and Design, and Implementation and Technology. Services aligned to the formula.",
              },
              {
                "@type": "WebPage",
                name: "How We Work",
                url: "https://radical-thinking.net/how-we-work",
                description:
                  "How Radical Thinking works: The Pulse finds where you are, The Bridge closes the gap, The Navigator keeps the direction true.",
              },
              {
                "@type": "WebPage",
                name: "Work",
                url: "https://radical-thinking.net/work",
                description:
                  "Client engagements and self-initiated experiments across strategy, experience, and implementation.",
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
                  "How we collect, use, and protect your data when you interact with our website and AI assistant.",
              },
              {
                "@type": "WebPage",
                name: "Terms of Use",
                url: "https://radical-thinking.net/terms-of-use",
                description:
                  "Official terms governing your access to and use of the Radical Thinking website, AI assistant, and other services.",
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
