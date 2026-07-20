import About from "./about";
import Script from "next/script";

export const metadata = {
  title: "About | Radical Thinking",
  description:
    "Radical Thinking is a Dubai-based AI advisory founded in 2009 by Stephan van Wijk. Guided by BI = C + Ex × T². 20+ years of enterprise experience, applied to AI-native problems.",
  alternates: {
    canonical: "https://radical-thinking.net/about",
  },
  openGraph: {
    title: "About | Radical Thinking",
    description:
      "An AI advisory based in Dubai. Guided by BI = C + Ex × T². 20+ years of enterprise experience, applied to AI-native problems.",
    url: "https://radical-thinking.net/about",
    siteName: "Radical Thinking",
    images: [
      {
        url: "https://radical-thinking.net/Images/OG/OG-About.webp",
        width: 1200,
        height: 630,
        alt: "About Radical Thinking",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Radical Thinking",
    description:
      "Radical Thinking. AI advisory based in Dubai. Guided by BI = C + Ex × T². Turning AI capability into commercial outcomes.",
    images: ["https://radical-thinking.net/Images/OG/OG-About.webp"],
  },
};

export default function AboutPage() {
  return (
    <>
      <About />

      <Script id="ld-json-about" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          mainEntity: {
            "@type": "Organization",
            name: "Radical Thinking",
            description:
              "An AI advisory based in Dubai. Guided by BI = C + Ex × T². 20+ years of enterprise experience, applied to AI-native problems.",
            foundingLocation: "Dubai, UAE",
            founder: {
              "@type": "Person",
              name: "Stephan van Wijk",
              image: "https://radical-thinking.net/Images/Stephanvanwijk.webp",
            },
            url: "https://radical-thinking.net",
          },
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
                text: "Radical Thinking is an AI advisory that helps organisations turn AI experiments into commercial outcomes through advisory, implementation, and delivery.",
              },
            },
            {
              "@type": "Question",
              name: "Is Radical Thinking a licensed business?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Radical Thinking holds DET Commercial Licence 714580 (Radical Thinking Web Design L.L.C), licensed since 2014 in Dubai, UAE.",
              },
            },
          ],
        })}
      </Script>
    </>
  );
}
