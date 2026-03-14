import Link from "next/link";
import Image from "next/image";
import SoftBackground from "@/components/SoftBackground";
import Footer from "@/components/Footer";
import ShareButtons from "@/components/ShareButtons";

export function PortfolioProjectCTA({ projectName, chatRef }) {
  if (!chatRef) return null;
  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 p-8 rounded-2xl rounded-br-none text-center space-y-6 my-12 shadow-sm">
      <h3 className="text-xl font-bold text-black">Curious about the technical details?</h3>
      <p className="text-gray-800">
        Why browse static specifications when you can have a conversation?
        Our AI agent has full access to the {projectName} case study, technical architecture, and impact metrics.
      </p>
      <div className="pt-2">
        <Link
          href={`/chat?ref=${chatRef}`}
          className="cta-button inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg no-underline"
          style={{ color: "#ffffff" }}
        >
          <span style={{ color: "inherit" }}>Talk to the Agent</span>
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

/**
 * Shared layout for portfolio project pages.
 * Matches insights article page: nav, header, figure, body, share, footer.
 */
export default function PortfolioProjectLayout({
  title,
  description,
  image,
  imageAlt,
  slug,
  tags = [],
  chatRef,
  children,
}) {
  const shareUrl = slug ? `https://radical-thinking.net/portfolio/${slug}` : "";

  return (
    <main className="min-h-screen bg-white text-black relative flex flex-col">
      <div className="fixed inset-0 z-0 pointer-events-none gradient-background">
        <SoftBackground />
      </div>

      {/* Nav: same as insights article */}
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
        <div className="flex items-center gap-4">
          <Link
            href="/portfolio"
            className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
          >
            ← Back to Portfolio
          </Link>
          {chatRef && (
            <Link
              href={`/chat?ref=${chatRef}`}
              className="hidden md:inline-block text-sm font-medium bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-all hover:scale-105"
            >
              Talk to the Agent
            </Link>
          )}
        </div>
      </nav>

      <div className="relative z-10 flex-1 w-full max-w-3xl mx-auto px-6 py-8 md:py-12">
        <article>
          <header className="mb-10">
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-black/8 text-gray-700 border border-black/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight text-balance max-w-2xl">
              {title}
            </h1>
            <p className="text-lg text-gray-600 mt-3">{description}</p>
          </header>

          {image && (
            <figure className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gray-100 mb-10 shadow-lg">
              <Image
                src={image}
                alt={imageAlt || title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 896px"
                priority
              />
            </figure>
          )}

          <div className="rt-article-body">
            {children}
          </div>

          {shareUrl && (
            <ShareButtons title={title} url={shareUrl} />
          )}
        </article>
      </div>

      <div className="relative z-10 mt-auto">
        <Footer />
      </div>

      {chatRef && (
        <div className="fixed bottom-6 right-6 z-50 md:hidden">
          <Link
            href={`/chat?ref=${chatRef}`}
            className="flex items-center justify-center w-14 h-14 bg-black text-white rounded-full shadow-2xl hover:scale-110 transition-transform"
            aria-label="Talk to Agent"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </Link>
        </div>
      )}
    </main>
  );
}
