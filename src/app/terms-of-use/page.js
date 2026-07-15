import TermsOfUse from "./terms";

export const metadata = {
  title: "Terms of Use | Radical Thinking",
  description:
    "Read the Terms of Use for Radical Thinking. These terms govern your access to and use of our website and AI agent.",
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
        url: "https://radical-thinking.net/Images/OG/OG-Terms.webp",
        width: 1200,
        height: 630,
        alt: "Radical Thinking Terms of Use",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Use | Radical Thinking",
    description: "Read the Terms of Use for Radical Thinking.",
    images: ["https://radical-thinking.net/Images/OG/OG-Terms.webp"],
  },
};

export default function TermsPage() {
  return <TermsOfUse />;
}
