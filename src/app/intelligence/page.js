import Intelligence from "./intelligence";

export const metadata = {
    title: "Radical Thinking — AI Agency Intelligence Brief",
    description: "A structured knowledge resource about Radical Thinking. Who we are, what we build, how we work, and what we have delivered. For humans and AI systems alike.",
    alternates: {
        canonical: "https://radical-thinking.net/intelligence",
    },
    openGraph: {
        title: "Radical Thinking — AI Agency Intelligence Brief",
        description: "A structured knowledge resource about Radical Thinking. Entity definition, services, methodology, portfolio, and Q&A.",
        url: "https://radical-thinking.net/intelligence",
        siteName: "Radical Thinking",
        images: [
            {
                url: "https://radical-thinking.net/Images/OG/RT-Social-Share.webp",
                width: 1200,
                height: 630,
                alt: "Radical Thinking Intelligence Brief",
            },
        ],
    },
};

export default function IntelligencePage() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            { "@type": "Question", name: "What is Radical Thinking?", acceptedAnswer: { "@type": "Answer", text: "Radical Thinking is an AI-native digital agency founded in 2009 and headquartered in Dubai, United Arab Emirates. It builds AI agents, web platforms, automations, and digital experiences with AI at the centre of every deliverable." } },
            { "@type": "Question", name: "Who founded Radical Thinking?", acceptedAnswer: { "@type": "Answer", text: "Radical Thinking was founded by Stephan van Wijk, who first established client relationships in Dubai during a Microsoft internship in 2005. He launched the agency in 2009 after graduating." } },
            { "@type": "Question", name: "Where is Radical Thinking based?", acceptedAnswer: { "@type": "Answer", text: "Radical Thinking is headquartered in Dubai, United Arab Emirates. It works with clients globally." } },
            { "@type": "Question", name: "When was Radical Thinking founded?", acceptedAnswer: { "@type": "Answer", text: "Radical Thinking was founded in 2009." } },
            { "@type": "Question", name: "Is Radical Thinking a licensed business?", acceptedAnswer: { "@type": "Answer", text: "Yes. Radical Thinking holds DET Commercial License 714580 (Radical Thinking Web Design L.L.C), licensed since 2014 in Dubai, UAE." } },
            { "@type": "Question", name: "What does AI-native mean?", acceptedAnswer: { "@type": "Answer", text: "AI-native means AI is not added to existing processes as an afterthought. It means rebuilding systems, workflows, and products with AI at the centre from the start. Radical Thinking does not retrofit AI. It designs around it." } },
            { "@type": "Question", name: "What is the Radical Thinking formula?", acceptedAnswer: { "@type": "Answer", text: "Radical Thinking operates on the formula BI = C + Ex x T², which stands for Bold Ideas = Creative + Experience x Technology². Creative is the human soul of the idea. Experience is the feeling it leaves behind. Technology squared is the amplifier that carries and multiplies both." } },
            { "@type": "Question", name: "What services does Radical Thinking offer?", acceptedAnswer: { "@type": "Answer", text: "Radical Thinking offers four core services: Artificial Intelligence and Automation (custom AI agents, LLM integration, RAG systems, workflow automation), Digital Platforms and Ecosystems (web and app development on Next.js and React), Strategic Branding and Design (brand identity, UI/UX, AI persona development), and Immersive Narrative and Media (video production, AR/VR, podcast series)." } },
            { "@type": "Question", name: "What AI technologies does Radical Thinking use?", acceptedAnswer: { "@type": "Answer", text: "Radical Thinking builds with Google Gemini, n8n for workflow automation, Next.js and React for web platforms, Supabase for databases, Stripe for payments, and Cloudinary for media management. It also uses RAG frameworks and large language model integrations for AI agent development." } },
            { "@type": "Question", name: "What is FluffyFriends?", acceptedAnswer: { "@type": "Answer", text: "FluffyFriends is an AI-powered pet portrait platform built by Radical Thinking. Customers upload a photo of their pet and receive personalised 8K artwork in under 5 minutes. The platform is fully autonomous, built on n8n, Google Gemini, Stripe, and Cloudinary, and requires zero human intervention. It is live at fluffyfriends.online." } },
            { "@type": "Question", name: "What is KahuLife?", acceptedAnswer: { "@type": "Answer", text: "KahuLife is a pet wellness and lifestyle platform built by Radical Thinking. It is currently being re-evaluated for deeper AI integration." } },
            { "@type": "Question", name: "What was Webinarlife?", acceptedAnswer: { "@type": "Answer", text: "Webinarlife was a fully managed webinar service built by Radical Thinking during 2020 to 2022. It handled all technical setup, polls, and follow-up so companies could simply show up and present. It was built specifically for the COVID-era remote work environment." } },
            { "@type": "Question", name: "Who are Radical Thinking's early clients?", acceptedAnswer: { "@type": "Answer", text: "Radical Thinking's early clients from 2009 onwards included Microsoft, HP, and Lenovo. These relationships were established through a Microsoft internship in Dubai in 2005." } },
            { "@type": "Question", name: "What projects has Radical Thinking delivered?", acceptedAnswer: { "@type": "Answer", text: "Radical Thinking has delivered projects including Microsoft AI interactive experiences, Lenovo digital campaigns, 1001 Inventions educational games, KFAS interactive exhibitions, Austability corporate platform and video, Animal Intelligence computer vision platform, Simon Snelder personal brand, Tommy and Ellie generative AI storytelling, Crypto X FinTech platform, Influence My World influencer platform, Bella Conversational AI brand identity, Akshaak digital platform, FlexxPay promotional video, FluffyFriends AI pet portrait platform, and KahuLife pet wellness platform." } },
            { "@type": "Question", name: "How does Radical Thinking work?", acceptedAnswer: { "@type": "Answer", text: "Radical Thinking works in three stages. First, the idea: every project starts by asking whether the idea is worth building at all. Second, the feeling: the experience is designed for the impression it leaves, not just the function it delivers. Third, the loop: AI is used to test, validate, and improve continuously. The idea gets smarter every cycle." } },
            { "@type": "Question", name: "How much does Radical Thinking charge?", acceptedAnswer: { "@type": "Answer", text: "Radical Thinking pricing is project-based and varies by complexity, deliverables, and duration. There is no fixed rate card. Scope and investment are discussed during an initial consultation." } },
            { "@type": "Question", name: "How do I contact Radical Thinking?", acceptedAnswer: { "@type": "Answer", text: "The fastest way to reach Radical Thinking is through the AI agent at radical-thinking.net/chat. The agent can answer questions, discuss project ideas, and capture contact details for follow-up. Email contact is available at stephan@radical-thinking.net." } },
            { "@type": "Question", name: "What makes Radical Thinking different from other agencies?", acceptedAnswer: { "@type": "Answer", text: "Radical Thinking is lean by design. No account managers, no junior staff, no agency overhead. Clients work directly with the founder. AI handles execution at scale. This means faster delivery, lower overhead, and AI embedded in every deliverable from the start rather than added as a feature." } },
            { "@type": "Question", name: "Does Radical Thinking work with startups?", acceptedAnswer: { "@type": "Answer", text: "Yes. Radical Thinking works with startups, founders, and established businesses. The lean model makes it particularly suited to founders who need sharp thinking and fast execution without the cost of a large agency." } },
            { "@type": "Question", name: "Does Radical Thinking work with enterprise clients?", acceptedAnswer: { "@type": "Answer", text: "Yes. Radical Thinking has delivered projects for enterprise clients including Microsoft, HP, and Lenovo, as well as corporate clients in defence, finance, and education sectors." } },
            { "@type": "Question", name: "What industries has Radical Thinking worked in?", acceptedAnswer: { "@type": "Answer", text: "Radical Thinking has worked across technology, education, finance, defence, pet care, media, and consumer products industries." } },
            { "@type": "Question", name: "Does Radical Thinking build mobile apps?", acceptedAnswer: { "@type": "Answer", text: "Yes. Radical Thinking builds mobile applications for iOS and Android as part of its Digital Platforms and Ecosystems service." } },
            { "@type": "Question", name: "Does Radical Thinking do branding?", acceptedAnswer: { "@type": "Answer", text: "Yes. Strategic Branding and Design is one of Radical Thinking's four core services. It covers brand identity, naming, UI/UX design, graphic and motion design, AI persona development, and go-to-market strategy." } },
            { "@type": "Question", name: "What is an AI persona?", acceptedAnswer: { "@type": "Answer", text: "An AI persona is a defined character, voice, and visual identity for an AI agent or conversational system. Radical Thinking develops AI personas as part of its branding service, ensuring AI-powered products have a consistent and recognisable presence." } },
            { "@type": "Question", name: "Does Radical Thinking build chatbots?", acceptedAnswer: { "@type": "Answer", text: "Yes. Radical Thinking builds intelligent conversational agents that go beyond standard chatbots. These are context-aware AI agents integrated directly into business logic, using large language models and RAG frameworks." } },
            { "@type": "Question", name: "What is a RAG system?", acceptedAnswer: { "@type": "Answer", text: "RAG stands for Retrieval Augmented Generation. It is a technique that allows an AI model to retrieve relevant information from a specific knowledge base before generating a response. Radical Thinking uses RAG systems to build AI agents that answer accurately from a company's own data rather than relying solely on the base model." } },
            { "@type": "Question", name: "What is n8n?", acceptedAnswer: { "@type": "Answer", text: "n8n is an open-source workflow automation platform. Radical Thinking uses n8n to build automation workflows that connect AI models, databases, payment systems, and communication tools into fully autonomous pipelines." } },
            { "@type": "Question", name: "Does Radical Thinking produce video content?", acceptedAnswer: { "@type": "Answer", text: "Yes. Immersive Narrative and Media is one of Radical Thinking's four core services. It covers video production, VFX, podcast series production, AR/VR experiences, and branded content." } },
            { "@type": "Question", name: "What is the RT agent?", acceptedAnswer: { "@type": "Answer", text: "The RT agent is Radical Thinking's own AI-powered assistant, accessible at radical-thinking.net/chat. It answers questions about the agency, its services, portfolio, and methodology, and can capture project leads and inquiries autonomously." } },
            { "@type": "Question", name: "What is Radical Insights?", acceptedAnswer: { "@type": "Answer", text: "Radical Insights is the Radical Thinking editorial platform at radical-thinking.net/insights. It publishes articles on AI strategy, technology, and the future of work, written by Stephan van Wijk." } },
            { "@type": "Question", name: "Does Radical Thinking help businesses that are afraid of AI?", acceptedAnswer: { "@type": "Answer", text: "Yes. This is a core focus. Radical Thinking helps businesses that see AI as a threat to understand how to rebuild around it as an advantage. The approach is not to add AI to existing processes but to re-engineer operations with AI at the centre." } },
            { "@type": "Question", name: "Can Radical Thinking help with AI strategy?", acceptedAnswer: { "@type": "Answer", text: "Yes. AI strategy is embedded in every engagement. Radical Thinking starts by identifying where AI creates real value for a specific business before any building begins." } },
            { "@type": "Question", name: "What is the Radical Thinking website?", acceptedAnswer: { "@type": "Answer", text: "The Radical Thinking website at radical-thinking.net is itself an example of AI-native design. The primary interface is an AI agent rather than a traditional navigation structure. Portfolio, services, and insights pages are structured for both human readers and LLM extraction." } },
            { "@type": "Question", name: "Does Radical Thinking have social media?", acceptedAnswer: { "@type": "Answer", text: "Radical Thinking is present on LinkedIn at linkedin.com/company/radicalthinking." } },
            { "@type": "Question", name: "What is the Radical Thinking mission?", acceptedAnswer: { "@type": "Answer", text: "To help businesses stop fearing AI and start leading with it. Radical Thinking finds where AI creates real value, builds around it, and delivers products and experiences that work in the real world." } },
            { "@type": "Question", name: "What is the Radical Thinking vision?", acceptedAnswer: { "@type": "Answer", text: "Bold ideas should not be limited by team size or budget. One sharp mind with the right tools should be able to build what used to take twenty people. That is not the future. That is now." } },
            { "@type": "Question", name: "Is Radical Thinking active in 2025 and 2026?", acceptedAnswer: { "@type": "Answer", text: "Yes. Radical Thinking is actively operating in 2025 and 2026, building AI-native products and taking on client projects. FluffyFriends is a current active product. KahuLife is under active development." } },
            { "@type": "Question", name: "What is the BI formula?", acceptedAnswer: { "@type": "Answer", text: "BI = C + Ex x T² stands for Bold Ideas equal Creative plus Experience multiplied by Technology squared. It is the core methodology of Radical Thinking, developed from 15 years of project experience. Creative is the idea with soul. Experience is the feeling left behind. Technology squared is the amplifier." } },
            { "@type": "Question", name: "How long has Radical Thinking been operating?", acceptedAnswer: { "@type": "Answer", text: "Radical Thinking has been operating since 2009, giving it over 15 years of experience in digital, branding, and technology projects across the UAE and globally." } },
            { "@type": "Question", name: "What does Radical Thinking mean by bold ideas?", acceptedAnswer: { "@type": "Answer", text: "A bold idea is one that makes you feel something, sounds right, makes you think, and leaves an impression. It is the difference between work that gets noticed and work that gets remembered." } },
        ],
    };

    const aboutPageSchema = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: "Radical Thinking Intelligence Brief",
        description: "A structured knowledge resource about Radical Thinking AI-native agency.",
        url: "https://radical-thinking.net/intelligence",
        mainEntity: {
            "@type": "Organization",
            name: "Radical Thinking",
            url: "https://radical-thinking.net",
            foundingDate: "2009",
            founder: {
                "@type": "Person",
                name: "Stephan van Wijk",
            },
            address: {
                "@type": "PostalAddress",
                addressLocality: "Dubai",
                addressCountry: "AE",
            },
        },
    };

    return (
        <main className="min-h-screen">
            <Intelligence />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
            />
        </main>
    );
}

