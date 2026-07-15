import Services from "./services";

export const metadata = {
  title: "Services | Radical Thinking",
  description:
    "Radical Thinking helps organisations turn AI experiments into results. Advisory, implementation, and delivery. Based in Dubai, working globally.",
  alternates: {
    canonical: "https://radical-thinking.net/services",
  },
  openGraph: {
    title: "Services | Radical Thinking",
    description:
      "Radical Thinking helps organisations turn AI experiments into results. Advisory, implementation, and delivery. Based in Dubai, working globally.",
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
  twitter: {
    card: "summary_large_image",
    title: "Services | Radical Thinking",
    description:
      "Radical Thinking helps organisations turn AI experiments into results. Advisory, implementation, and delivery. Based in Dubai, working globally.",
    images: ["https://radical-thinking.net/Images/OG/OG-Services.webp"],
  },
};

export default function ServicesPage() {
  return <Services />;
}
