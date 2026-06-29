import Script from "next/script";
import Intelligence from "./intelligence";
import { intelligenceFaqs } from "./intelligenceContent";

export const metadata = {
  title: "Intelligence | Radical Thinking",
  description:
    "A structured knowledge resource about Radical Thinking. Who we are, what we build, how we work, and what we have delivered. For humans and AI systems alike.",
  alternates: {
    canonical: "https://radical-thinking.net/intelligence",
  },
  openGraph: {
    title: "Intelligence | Radical Thinking",
    description:
      "Entity definition, services, methodology, work, and Q&A. Structured for humans and AI systems.",
    url: "https://radical-thinking.net/intelligence",
    siteName: "Radical Thinking",
    images: [
      {
        url: "https://radical-thinking.net/Images/OG/OG-Intelligence.webp",
        width: 1200,
        height: 630,
        alt: "Radical Thinking Intelligence Brief",
      },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: intelligenceFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Radical Thinking Intelligence Brief",
  description: "A structured knowledge resource about Radical Thinking AI-native agency.",
  url: "https://radical-thinking.net/intelligence",
  mainEntity: {
    "@type": "Organization",
    name: "Radical Thinking",
    url: "https://radical-thinking.net",
    foundingDate: "2009",
    founder: {
      "@type": "Person",
      name: "Stephan van Wijk",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
  },
};

export default function IntelligencePage() {
  return (
    <>
      <Intelligence />
      <Script id="ld-json-intelligence-faq" type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </Script>
      <Script id="ld-json-intelligence-about" type="application/ld+json">
        {JSON.stringify(aboutPageSchema)}
      </Script>
    </>
  );
}
