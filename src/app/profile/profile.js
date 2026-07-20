import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SoftBackground from "@/components/SoftBackground";
import { robotoSlab, serif } from "@/lib/fonts";
import {
  FORMULA_ADVISORY_LINE,
  FORMULA_EQUATION,
  FORMULA_EXPANDED,
  FORMULA_ROWS,
} from "@/lib/formula";
import "./profile.css";

const RT_BLUE = "#1ACDEB";
const RT_AMBER = "#E18949";
const RT_PURPLE = "#6B17DA";

const PLAYBOOK_CARDS = [
  {
    title: "The Pulse",
    color: RT_BLUE,
    bg: "rgba(26,205,235,0.08)",
    body: "Understand where you really are. We map the gap between what the business intends to deliver and what it actually does. Typically 5 to 10 working days, fixed price. Deliverable: a prioritised recommendation on what to close first.",
  },
  {
    title: "The Bridge",
    color: RT_AMBER,
    bg: "rgba(225,137,73,0.08)",
    body: "Close the gap and land the idea. Production-ready work from the Pulse findings. Typically 30 days, fixed price. Creative, experience, and technology brought together as one.",
  },
  {
    title: "The Navigator",
    color: RT_PURPLE,
    bg: "rgba(107,23,218,0.06)",
    body: "Keep the direction true. Ongoing partnership. Monthly reviews, quarterly directional reassessment, direct access. Bold ideas do not stand still. This keeps them on course.",
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

export default function Profile() {
  return (
    <main className="profile-page relative flex flex-col w-full min-h-screen overflow-x-clip">
      <span className={robotoSlab.className} hidden aria-hidden />

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
            className="text-[clamp(3rem,8vw,6rem)] font-bold leading-[1.05] tracking-tight text-black mb-4"
            style={serif}
          >
            Radical Thinking
          </h1>
          <p className="text-xs md:text-sm uppercase tracking-[0.28em] profile-muted text-[#8a8780] mb-8">
            AI Advisory
          </p>
          <p className="text-sm profile-muted text-[#8a8780] leading-relaxed max-w-md mx-auto">
            Dubai, UAE · radical-thinking.net
            <br />
            Founded 2009 · Turning bold ideas into real business impact
          </p>
        </section>

        <hr className="border-0 border-t border-[#e8e4dc]" style={{ borderTopWidth: "0.5px" }} />

        {/* Section 2: The positioning */}
        <section className="profile-section-print min-h-screen flex flex-col justify-center px-4 py-20 md:py-28">
          <div className="profile-section-inner max-w-3xl mx-auto w-full">
            <Eyebrow>The Gap</Eyebrow>
            <h2
              className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.15] text-black mb-6"
              style={serif}
            >
              The gap between AI capability and business reality.
            </h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4">
              Most organisations have access to the same AI tools. What separates results from
              experiments is the thinking that happens before the build, and the architecture that
              makes it work in production.
            </p>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-10">
              That gap is where Radical Thinking works.
            </p>

            <Eyebrow>The formula</Eyebrow>
            <h2
              className="profile-formula text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-snug mb-3 inline-block text-transparent bg-clip-text animate-gradient-loop"
              style={{
                ...serif,
                backgroundImage: "linear-gradient(90deg, #1ACDEB, #6B17DA, #E18949, #1ACDEB)",
              }}
            >
              {FORMULA_EQUATION}
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-2 max-w-2xl">
              {FORMULA_EXPANDED}
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mb-6 max-w-2xl">
              {FORMULA_ADVISORY_LINE}
            </p>

            <div className="rounded-2xl border border-[#e8e4dc]/90 bg-white p-6 md:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {FORMULA_ROWS.map((row) => (
                  <div key={row.num}>
                    <p
                      className="text-[1.75rem] font-bold leading-none mb-2"
                      style={{ ...serif, color: row.color }}
                    >
                      {row.num}
                    </p>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#8a8780] mb-1">
                      {row.eyebrow}
                    </p>
                    <h3
                      className="text-sm font-semibold text-black mb-2 tracking-tight"
                      style={serif}
                    >
                      {row.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{row.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: What RT does */}
        <section className="profile-section-print min-h-screen flex flex-col justify-center px-4 py-20 md:py-28">
          <div className="profile-section-inner max-w-[1400px] mx-auto w-full">
            <Eyebrow>How we work</Eyebrow>
            <h2
              className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.15] text-black mb-8"
              style={serif}
            >
              Three engagement types. One formula.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {PLAYBOOK_CARDS.map((card) => (
                <article
                  key={card.title}
                  className="rounded-2xl overflow-hidden border border-[#e8e4dc]/90 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
                >
                  <div className="h-1.5 w-full" style={{ backgroundColor: card.color }} />
                  <div className="p-6 md:p-8">
                    <h3
                      className="text-xl font-bold text-black mb-4"
                      style={{ ...serif, color: card.color }}
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
            <h2
              className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.15] text-black mb-2"
              style={serif}
            >
              FluffyFriends
            </h2>
            <p className="text-sm font-medium profile-muted text-[#8a8780] mb-6">
              Autonomous AI commerce platform. Built and operated by Radical Thinking.
            </p>
            <p className="text-base text-gray-600 leading-relaxed mb-10">
              An AI-powered pet portrait platform with zero human intervention in the fulfilment
              loop. From customer input to delivered output in under five minutes. Running in
              production since early 2026.
            </p>

            <div className="overflow-hidden rounded-2xl mb-10 border border-[#e8e4dc]/90 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#fafaf8]">
                    <th
                      className="text-left font-semibold text-black px-4 py-3 w-1/2"
                      style={{ borderBottom: "0.5px solid #e8e4dc" }}
                    >
                      Layer
                    </th>
                    <th
                      className="text-left font-semibold text-black px-4 py-3 w-1/2"
                      style={{ borderBottom: "0.5px solid #e8e4dc" }}
                    >
                      Technology
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ARCHITECTURE_ROWS.map(([layer, tech], i) => (
                    <tr key={layer}>
                      <td
                        className="px-4 py-3 text-gray-600"
                        style={
                          i < ARCHITECTURE_ROWS.length - 1
                            ? { borderBottom: "0.5px solid #e8e4dc" }
                            : undefined
                        }
                      >
                        {layer}
                      </td>
                      <td
                        className="px-4 py-3 text-black"
                        style={
                          i < ARCHITECTURE_ROWS.length - 1
                            ? { borderBottom: "0.5px solid #e8e4dc" }
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
            <Eyebrow>Partnership models</Eyebrow>
            <h2
              className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.15] text-black mb-8"
              style={serif}
            >
              How we work with partners
            </h2>
            <div className="space-y-6 mb-12">
              {PARTNERSHIP_MODELS.map((model) => (
                <div
                  key={model.title}
                  className="rounded-2xl border border-[#e8e4dc]/90 bg-white p-6 md:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
                  style={{ borderLeftWidth: "3px", borderLeftColor: model.color }}
                >
                  <h3 className="text-lg font-bold text-black mb-2" style={serif}>
                    {model.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{model.body}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-[#e8e4dc]/90 bg-white p-6 md:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8a8780] mb-3">
                On pricing
              </p>
              <h3 className="text-xl font-bold text-black mb-3" style={serif}>
                We do not publish fixed prices.
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                The Pulse and The Bridge are fixed-price engagements sized to the specific scope. You
                know the cost before we start. The Navigator is a monthly commitment with no
                long-term contract. Partnership terms with agencies and consultancies are discussed
                per engagement based on model and volume.
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
                className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold text-white mb-6"
                style={serif}
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
                href="/chat"
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
