import Services from "./services";

export const metadata = {
  title: "Services | Radical Thinking",
  description:
    "Radical Thinking helps organisations turn bold ideas into results. Three services aligned to the formula: Ideas and Positioning, Experience and Design, Implementation and Technology.",
  alternates: {
    canonical: "https://radical-thinking.net/services",
  },
  openGraph: {
    title: "Services | Radical Thinking",
    description:
      "Three services aligned to the formula: Ideas and Positioning, Experience and Design, Implementation and Technology.",
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
      "Radical Thinking services. Ideas and Positioning, Experience and Design, Implementation and Technology.",
    images: ["https://radical-thinking.net/Images/OG/OG-Services.webp"],
  },
};

export default function ServicesPage() {
  return <Services />;
}
