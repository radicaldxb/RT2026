import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import SoftBackground from "@/components/SoftBackground";
import Footer from "@/components/Footer";

export const metadata = {
  title: "What is the Kahulife Platform? | Radical Thinking",
  description:
    "Kahulife is a comprehensive digital ecosystem for pet management, featuring secure medical passports, automated health tracking, and an AI-driven SOS network for missing animals.",
  openGraph: {
    title: "What is the Kahulife Platform?",
    description:
      "A comprehensive digital ecosystem for pet management and AI-driven SOS network.",
    url: "https://radical-thinking.net/portfolio/kahulife",
    images: [
      {
        url: "https://radical-thinking.net/images/portfolio/kahulife.webp",
        width: 1200,
        height: 630,
        alt: "Kahulife Platform Interface",
      },
    ],
  },
};

export default function KahulifePage() {
  const project = {
    name: "Kahulife",
    description:
      "Kahulife is a comprehensive digital ecosystem for pet management, featuring secure medical passports, automated health tracking, and an AI-driven SOS network for missing animals.",
    image: "/images/portfolio/kahulife.webp",
    ref: "kahulife",
  };

  return (
    <main className="min-h-screen bg-white text-black relative flex flex-col">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <SoftBackground />
      </div>

      {/* Navigation */}
      <nav className="relative z-20 w-full px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" aria-label="Home">
          <Image
            src="/logos/RT-Logo-New.svg"
            alt="Radical Thinking Logo"
            width={48}
            height={48}
            className="w-12 h-12"
          />
        </Link>
        <Link
          href={`/chat?ref=${project.ref}`}
          className="hidden md:inline-block text-sm font-medium bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-all hover:scale-105"
        >
          Talk to the Agent
        </Link>
      </nav>

      {/* Main Content */}
      <article className="relative z-10 flex-1 w-full max-w-3xl mx-auto px-6 py-12 md:py-20 flex flex-col gap-10">
        
        {/* Header Section & AEO H1 */}
        <header className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
            What is the {project.name} Platform?
          </h1>
          
          {/* Direct Answer Snippet (AEO Core) */}
          <div>
            <p className="text-lg md:text-xl leading-relaxed font-medium text-gray-900">
              {project.description}
            </p>
          </div>
        </header>

        {/* Project Image */}
        <figure className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl bg-gray-100">
          <Image
            src={project.image}
            alt={`${project.name} Interface`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            priority
          />
        </figure>

        {/* Ghost Hook / Content */}
        <section className="prose prose-lg max-w-none text-gray-700">
          <h2 className="text-2xl font-bold text-black mb-4">AI-Native Methodology</h2>
          <p className="mb-6">
            This platform was architected using Radical Thinking&apos;s proprietary AI-Native methodologies. 
            By integrating PetTech SaaS principles with Digital Passport technology, we&apos;ve created a system that 
            learns from health data to optimize pet care in real-time.
          </p>
          
          {/* In-Content CTA */}
          <div className="bg-gradient-to-b from-blue-50 to-blue-100 p-8 rounded-2xl rounded-br-none text-center space-y-6 my-12 shadow-sm">
            <h3 className="text-xl font-bold text-black">Curious about the technical details?</h3>
            <p className="text-gray-800">
              Why browse static specifications when you can have a conversation? 
              Our AI agent has full access to the {project.name} case study, technical architecture, and impact metrics.
            </p>
            <div className="pt-2">
              <Link 
                href={`/chat?ref=${project.ref}`}
                className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg"
              >
                <span>Talk to the Agent</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </article>

      {/* Footer */}
      <div className="relative z-10 mt-auto">
        <Footer />
      </div>

      {/* Mobile Floating CTA */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <Link 
          href={`/chat?ref=${project.ref}`}
          className="flex items-center justify-center w-14 h-14 bg-black text-white rounded-full shadow-2xl hover:scale-110 transition-transform"
          aria-label="Talk to Agent"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
          </svg>
        </Link>
      </div>

      {/* JSON-LD Schema */}
      <Script id="ld-json-project" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": project.name,
          "description": project.description,
          "applicationCategory": "EnterpriseApplication",
          "operatingSystem": "Cloud",
          "author": {
            "@type": "Organization",
            "name": "Radical Thinking",
            "url": "https://radical-thinking.net"
          },
          "image": project.image,
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        })}
      </Script>
    </main>
  );
}