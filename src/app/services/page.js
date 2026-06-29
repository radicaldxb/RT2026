import Services from "./services";

export const metadata = {
  title: "AI Strategy & Services | Radical Thinking",
  description:
    "Radical Thinking offers AI agents, digital platforms, branding, and immersive media — built AI-native from the ground up. Based in Dubai, working globally.",
  alternates: {
    canonical: "https://radical-thinking.net/services",
  },
  openGraph: {
    title: "AI Strategy & Services | Radical Thinking",
    description:
      "AI agents, digital platforms, branding, and immersive media — built AI-native from the ground up.",
    url: "https://radical-thinking.net/services",
    siteName: "Radical Thinking",
    images: [
      {
        url: "https://radical-thinking.net/Images/OG/OG-Services.webp",
        width: 1200,
        height: 630,
        alt: "Radical Thinking Services",
      },
    ],
  },
};

export default function ServicesPage() {
  return <Services />;
}