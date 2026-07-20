import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SoftBackground from "@/components/SoftBackground";
import { dmSerifDisplay, profileDisplay, profileSans } from "@/lib/fonts";
import "./profile.css";

const RT_BLUE = "#1ACDEB";
const RT_AMBER = "#E18949";
const RT_PURPLE = "#6B17DA";
const RT_MID = "#e8e4dc";
const RT_MUTED = "#8a8780";

const FORMULA_ROWS = [
  {
    symbol: "C",
    label: "Creative",
    color: RT_BLUE,
    desc: "The human soul of the idea",
  },
  {
    symbol: "Ex",
    label: "Experience",
    color: RT_AMBER,
    desc: "The feeling it leaves behind",
  },
  {
    symbol: "T²",
    label: "Technology",
    color: RT_PURPLE,
    desc: "The amplifier that carries and multiplies both",
  },
];

const PLAYBOOK_CARDS = [
  {
    title: "The Audit",
    color: RT_BLUE,
    body: "We map the gap between what the business intends to deliver and what it actually does. 5–10 working days. Fixed price. Deliverable: clear problem definition and build specification.",
  },
  {
    title: "The Build",
    color: RT_AMBER,
    body: "Production-ready AI implementation from the Audit findings. 30 days. Fixed price. Not a prototype. Something that works in your client's environment.",
  },
  {
    title: "The Retainer",
    color: RT_PURPLE,
    body: "Ongoing AI capability management. Monthly landscape reviews, quarterly upgrades, direct access. AI moves fast. This keeps it current.",
  },
];

const ARCHITECTURE_ROWS = [
  ["Orchestration", "n8n"],
  ["AI Generation", "Google Gemini"],
  ["Payments", "Stripe"],
  ["Media management", "Cloudinary"],
  ["Data layer", "Supabase"],
  ["Frontend", "Next.js"],
];

const PARTNERSHIP_MODELS = [
  {
    title: "White Label",
    color: RT_BLUE,
    body: "RT delivers under your brand. You own the client relationship, RT provides the capability. Suitable for agencies and consultancies expanding into AI services.",
  },
  {
    title: "Referral",
    color: RT_AMBER,
    body: "You identify the opportunity, RT delivers, you earn a referral margin. No delivery responsibility on your side.",
  },
  {
    title: "Co-delivery",
    color: RT_PURPLE,
    body: "RT works alongside your team on a named engagement. Suitable for system integrators and enterprise consultancies with existing client relationships.",
  },
];

function Eyebrow({ children }) {
  return (
    <span className="block text-xs font-semibold tracking-[0.22em] uppercase profile-muted text-[#8a8780] mb-4">
      {children}
    </span>
  );
}

function SectionHeadline({ children, className = "" }) {
  return (
    <h2
      className={`text-[clamp(1.75rem,3.5vw,2.75rem)] font-normal leading-[1.15] text-black ${className}`}
      style={profileDisplay}
    >
      {children}
    </h2>
  );
}

export default function Profile() {
  return (
    <main
      className="profile-page relative flex flex-col w-full min-h-screen overflow-x-clip bg-[#fafaf8]"
      style={profileSans}
    >
      <span className={dmSerifDisplay.className} hidden aria-hidden />

      <div className="profile-bg-screen fixed inset-0 z-0 pointer-events-none gradient-background">
        <SoftBackground />
      </div>

      <Nav />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto">
        {/* Section 1: Cover */}
        <section className="profile-cover min-h-screen flex flex-col items-center justify-center px-4 py-24 md:py-32 text-center">
          <Image
            src="/logos/RT-Logo-New.svg"
            alt="Radical Thinking"
            width={64}
            height={64}
            className="w-16 h-16 mb-10"
            priority
          />
          <h1
            className="text-[clamp(3rem,8vw,6rem)] font-normal leading-[1.05] tracking-tight text-black mb-4"
            style={profileDisplay}
          >
            Radical Thinking
          </h1>
          <p className="text-xs md:text-sm uppercase tracking-[0.28em] profile-muted text-[#8a8780] mb-8">
            AI-Native Digital Agency
          </p>
          <p className="text-sm profile-muted text-[#8a8780] leading-relaxed">
            Dubai, UAE · radical-thinking.net
            <br />
            Founded 2009 · AI practice established 2018
          </p>
        </section>

        <hr className="border-0 border-t border-[#e8e4dc]" style={{ borderTopWidth: "0.5px" }} />

        {/* Section 2: The positioning */}
        <section className="profile-section-print min-h-screen flex flex-col justify-center px-4 py-20 md:py-28">
          <div className="profile-section-inner max-w-3xl mx-auto w-full">
            <Eyebrow>The Gap</Eyebrow>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4">
              The gap between AI capability and business reality is where value is created or lost.
            </p>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-12">
              Most organisations have access to the same AI tools. What separates results from
              experiments is the thinking that happens before the build, and the architecture that
              makes it work in production.
            </p>

            <div className="mb-6">
              <p
                className="text-[clamp(2rem,5vw,3.25rem)] font-normal leading-none text-black mb-8"
                style={profileDisplay}
              >
                BI = C + Ex × T²
              </p>
              <ul className="space-y-5">
                {FORMULA_ROWS.map((row) => (
                  <li key={row.symbol} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                    <span className="text-lg font-medium shrink-0" style={{ color: row.color }}>
                      {row.symbol}
                    </span>
                    <span className="text-base text-black">
                      <span className="font-medium" style={{ color: row.color }}>
                        {row.label}
                      </span>
                      <span className="text-gray-600"> · {row.desc}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-sm profile-muted text-[#8a8780] leading-relaxed mt-10">
              Not a marketing formula. A working methodology for every engagement.
            </p>
          </div>
        </section>

        {/* Section 3: What RT does */}
        <section className="profile-section-print min-h-screen flex flex-col justify-center px-4 py-20 md:py-28">
          <div className="profile-section-inner max-w-[1400px] mx-auto w-full">
            <Eyebrow>The Playbook</Eyebrow>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {PLAYBOOK_CARDS.map((card) => (
                <article
                  key={card.title}
                  className="bg-white/60 backdrop-blur-sm rounded-lg overflow-hidden"
                  style={{ border: `0.5px solid ${RT_MID}` }}
                >
                  <div className="h-1.5 w-full" style={{ backgroundColor: card.color }} />
                  <div className="p-6 md:p-8">
                    <h3
                      className="text-xl font-normal text-black mb-4"
                      style={profileDisplay}
                    >
                      {card.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{card.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Built and shipped */}
        <section className="profile-section-print min-h-screen flex flex-col justify-center px-4 py-20 md:py-28">
          <div className="profile-section-inner max-w-3xl mx-auto w-full">
            <Eyebrow>Proof</Eyebrow>
            <SectionHeadline className="mb-2">Autonomous AI Commerce Platform</SectionHeadline>
            <p className="text-sm font-medium profile-muted text-[#8a8780] mb-6">
              Built and operated by Radical Thinking.
            </p>
            <p className="text-base text-gray-600 leading-relaxed mb-10">
              Zero human intervention in the fulfilment loop. From customer input to delivered output
              in under five minutes. Running in production since early 2026.
            </p>

            <div
              className="overflow-hidden rounded-lg mb-10"
              style={{ border: `0.5px solid ${RT_MID}` }}
            >
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-white/50">
                    <th
                      className="text-left font-semibold text-black px-4 py-3 w-1/2"
                      style={{ borderBottom: `0.5px solid ${RT_MID}` }}
                    >
                      Layer
                    </th>
                    <th
                      className="text-left font-semibold text-black px-4 py-3 w-1/2"
                      style={{ borderBottom: `0.5px solid ${RT_MID}` }}
                    >
                      Technology
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ARCHITECTURE_ROWS.map(([layer, tech], i) => (
                    <tr key={layer} className="bg-white/30">
                      <td
                        className="px-4 py-3 text-gray-600"
                        style={
                          i < ARCHITECTURE_ROWS.length - 1
                            ? { borderBottom: `0.5px solid ${RT_MID}` }
                            : undefined
                        }
                      >
                        {layer}
                      </td>
                      <td
                        className="px-4 py-3 text-black"
                        style={
                          i < ARCHITECTURE_ROWS.length - 1
                            ? { borderBottom: `0.5px solid ${RT_MID}` }
                            : undefined
                        }
                      >
                        {tech}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-base text-gray-600 leading-relaxed">
              What this demonstrates for partners: Radical Thinking builds and operates AI products,
              not just advises on them. Every engagement recommendation comes from direct production
              experience.
            </p>
          </div>
        </section>

        {/* Section 5: How we work together */}
        <section className="profile-section-print min-h-screen flex flex-col justify-center px-4 py-20 md:py-28">
          <div className="profile-section-inner max-w-3xl mx-auto w-full">
            <Eyebrow>Partnership Models</Eyebrow>
            <div className="space-y-8 mb-12">
              {PARTNERSHIP_MODELS.map((model) => (
                <div
                  key={model.title}
                  className="pl-5 py-1"
                  style={{ borderLeft: `3px solid ${model.color}` }}
                >
                  <h3
                    className="text-lg font-normal text-black mb-2"
                    style={profileDisplay}
                  >
                    {model.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{model.body}</p>
                </div>
              ))}
            </div>

            <div style={{ borderTop: `0.5px solid ${RT_MID}` }} className="pt-8">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-black mb-3">
                Pricing
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                All engagements are project-based. The Audit, Build, and Retainer are fixed-price
                stages. Partnership terms are discussed per engagement based on model and volume.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Contact */}
        <section className="profile-section-print min-h-screen flex flex-col justify-center px-4 py-20 md:py-28">
          <div className="profile-section-inner max-w-3xl mx-auto w-full">
            <Eyebrow>Get in touch</Eyebrow>

            <div className="profile-contact-band bg-black rounded-[28px] px-6 md:px-20 py-12 md:py-16 text-center">
              <h2
                className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-normal text-white mb-6"
                style={profileDisplay}
              >
                Radical Thinking
              </h2>
              <div
                className="space-y-2 text-sm leading-relaxed mb-8"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                <p>
                  <a
                    href="https://radical-thinking.net"
                    className="hover:opacity-80 transition-opacity"
                  >
                    radical-thinking.net
                  </a>
                </p>
                <p>
                  <a
                    href="mailto:hello@radical-thinking.net"
                    className="hover:opacity-80 transition-opacity"
                  >
                    hello@radical-thinking.net
                  </a>
                </p>
                <p>
                  <a
                    href="https://www.linkedin.com/company/radical-thinking"
                    className="hover:opacity-80 transition-opacity"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    linkedin.com/company/radical-thinking
                  </a>
                </p>
                <p>Dubai, United Arab Emirates</p>
              </div>
              <Link
                href="https://radical-thinking.net/chat"
                className="profile-cta inline-flex items-center justify-center px-8 py-3.5 bg-white text-black rounded-full text-xs font-semibold uppercase tracking-widest hover:opacity-90 transition-opacity"
              >
                Talk to the Radical Assistant →
              </Link>
            </div>

            <p className="profile-closing-note text-xs profile-muted text-[#8a8780] leading-relaxed text-center mt-8 max-w-xl mx-auto">
              For partnership enquiries, the Radical Assistant qualifies the conversation and gets
              the right information to Stephan before the first call.
            </p>
          </div>
        </section>
      </div>

      <div className="profile-site-footer relative z-10">
        <Footer />
      </div>
    </main>
  );
}
