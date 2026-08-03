import { portfolio } from "./projects";

const BASE_URL = "https://radical-thinking.net";

const WORK_OG_IMAGES = {
  fluffyfriends: "/Images/OG/OG-Work-Fluffyfriends.webp",
  kahulife: "/Images/OG/OG-Work-Kahulife.webp",
  "tommy-ellie": "/Images/OG/OG-Work-Tommy-Ellie.webp",
  "animal-intelligence": "/Images/OG/OG-Work-Animal.webp",
  "microsoft-ai": "/Images/OG/OG-Work-MS.webp",
  webinarlife: "/Images/OG/OG-Work-Webinarlife.webp",
  "simon-snelder": "/Images/OG/OG-Work-Simon.webp",
  "austability-web": "/Images/OG/OG-Work-Aus-web.webp",
  "austability-branding": "/Images/OG/OG-Work-Aus-logo.webp",
  "austability-video": "/Images/OG/OG-Work-Aus-vid.webp",
  "lenovo-campaigns": "/Images/OG/OG-Work-Lenovi.webp",
  "payment-partners": "/Images/OG/OG-Work-Payment.webp",
  "influence-my-world": "/Images/OG/OG-Work-Influence.webp",
  "crypto-x": "/Images/OG/OG-Work-CryptoX.webp",
  akshaak: "/Images/OG/OG-Work-Akshaak.webp",
  soundreaver: "/Images/OG/OG-Work-Soundreaver.webp",
  "1001-inventions-games": "/Images/OG/OG-Work-1001.webp",
  "kfas-1001-inventions": "/Images/OG/OG-Work-KFAS.webp",
  "1001-women": "/Images/OG/OG-Work-1001Women.webp",
  "ai-networks": "/Images/OG/OG-Work-AInetworks.webp",
  "bella-conversational-ai": "/Images/OG/OG-Work-Bella.webp",
  flexxpay: "/Images/OG/OG-Work-Flexxpay.webp",
};

function resolveImageUrl(src) {
  if (!src) return undefined;
  return src.startsWith("http") ? src : `${BASE_URL}${src}`;
}

export function getWorkProjectOgImage(project) {
  return WORK_OG_IMAGES[project.slug] ?? project.image;
}

export function getWorkProject(slug) {
  return portfolio.find((p) => p.slug === slug) ?? null;
}

export function getWorkProjectFacts(project) {
  if (project.facts?.length) return project.facts;

  const facts = [];
  if (project.category) facts.push({ label: "Category", value: project.category });
  if (project.tags?.length) facts.push({ label: "Focus", value: project.tags.join(", ") });
  if (project.live) {
    facts.push({
      label: "URL",
      value: project.live.replace(/^https?:\/\//, ""),
    });
  }
  return facts;
}

export function getWorkProjectOverview(project) {
  if (project.overview) return project.overview;
  return "";
}

export function buildWorkProjectMetadata(project) {
  const ogSrc = getWorkProjectOgImage(project);
  const imageUrl = resolveImageUrl(ogSrc);

  return {
    title: `${project.title} | Radical Thinking Work`,
    description: project.description,
    alternates: {
      canonical: `${BASE_URL}/work/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | Radical Thinking`,
      description: project.description,
      url: `${BASE_URL}/work/${project.slug}`,
      siteName: "Radical Thinking",
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: project.title,
            },
          ]
        : undefined,
    },
  };
}

export function buildWorkProjectJsonLd(project) {
  const image = resolveImageUrl(getWorkProjectOgImage(project));

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.description,
    applicationCategory: "EnterpriseApplication",
    operatingSystem: "Cloud",
    author: {
      "@type": "Organization",
      name: "Radical Thinking",
      url: BASE_URL,
    },
    ...(image ? { image } : {}),
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
}
