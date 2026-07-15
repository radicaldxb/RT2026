import Privacy from "./privacy";

export const metadata = {
  title: "Privacy Policy | Radical Thinking",
  description:
    "Understand how Radical Thinking collects, uses, and protects your data when you interact with our website and AI agent.",
  alternates: {
    canonical: "https://radical-thinking.net/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Radical Thinking",
    description:
      "Understand how Radical Thinking collects, uses, and protects your data when you interact with our website and AI agent.",
    url: "https://radical-thinking.net/privacy-policy",
    siteName: "Radical Thinking",
    images: [
      {
        url: "https://radical-thinking.net/Images/OG/OG-Privacy.webp",
        width: 1200,
        height: 630,
        alt: "Radical Thinking Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Radical Thinking",
    description:
      "Understand how Radical Thinking collects, uses, and protects your data when you interact with our website and AI agent.",
    images: ["https://radical-thinking.net/Images/OG/OG-Privacy.webp"],
  },
};

export default function PrivacyPage() {
  return <Privacy />;
}
