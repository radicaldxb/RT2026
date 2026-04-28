export const articles = [
  {
    slug: "what-actually-works",
    title: "What Actually Works",
    description:
      "Most AI rollouts fail because they try to rebuild everything at once. The ones that work start with one workflow, measure obsessively, rebuild instead of retrofit, and push through the brutal Month 2 learning curve.",
    ogImage: "/Images/OG/OG-insight-ai-that-works.webp",
    image: "/Images/insights/ai-that-works.webp",
    publishedDate: "2026-04-20",
    author: "Stephan van Wijk",
    readTime: "6 mins",
    tags: ["Strategy", "AI Transformation", "Future of Work"],
    content: `
Last week I said most AI rollouts fail because people are automating broken things instead of replacing them.

The obvious follow-up is: so what does replacing look like?

I've watched enough implementations succeed and fail to see the pattern. It's not complicated. It's not even particularly surprising. But it's the opposite of what most people do.

## Start absurdly small

The ones that work start absurdly small.

Not "we'll automate our top 5 priorities."

One thing. A single workflow that's stealing time from what actually matters.

At Radical Thinking, it was lead qualification. We were spending hours deciding if an inquiry was worth a response. The bot just does that now.

At FluffyFriends, it was image generation. One thing. That's it.

Most failures come from the opposite: trying to rebuild the entire operation at once. Email handling **and** content generation **and** analytics in month one. By month three, when nothing works perfectly, people pull the plug.

The ones that work spend month one on one thing. They get it working. They measure it. Then they move to the next thing.

Why? Because you learn by doing, not by planning. And the learning is the most valuable part.

## Measure relentlessly

They measure relentlessly.

Not "this feels faster."

Actually measure it. Hours saved. Error rates. Consistency. How often does it need human intervention.

You'd be shocked how many companies think they're saving time but have no idea how much.

Here's what I see: once you measure, you often realise you've been solving the wrong problem.

> **"If we didn't have these old constraints, what would this look like?"** That's the question they ask when they're ready to replace, not retrofit.

We thought our bottleneck was response speed. Measurement showed us it was actually qualification accuracy. So we optimised for that instead. Different system entirely.

The businesses that win don't assume they know where the problem is. They measure and find out.

## Rebuild instead of retrofit

They rebuild instead of retrofit.

This is the hard part.

Your process exists because of constraints that don't exist anymore. You know that. But letting go of it is harder than it sounds.

We had an approval step in our workflow because feedback used to be slow. Now it's instant. We kept the approval step anyway.

Then I realised: we're not optimising, we're just adding AI to the old system. So we deleted the step. Built something new from scratch that didn't assume we needed approval at all.

The ones that fail try to make AI fit into their existing process. The ones that work ask what the system would look like without the old constraints. Then they build that.

## Expect Month 2 to be brutal

They expect Month 2 to be brutal.

Most rollouts have a pattern:

Month 1 is exciting. You get something working. It's fragile, but it works.

Month 2 is crushing. Every edge case you didn't plan for shows up. The system breaks in weird ways. You realise you don't understand the tool as well as you thought.

This is when people quit.

The ones that win know Month 2 is coming. They budget for it. They know that if they push through, Month 3 is when it clicks.

By Month 4 they can build the next thing because the foundation is solid.

The ones that fail see Month 2 and assume the whole thing is a waste of time.

It's not. Month 2 is just the learning curve. It sucks, but it's necessary.

## Have someone obsessed

They have someone obsessed.

Every working system has one person who genuinely cares about how it works.

Not a consultant. Not an external expert. Someone inside the company who's willing to spend the time learning the tool, fixing things when they break, and understanding why.

This person becomes irreplaceable because they're the only one who understands the system deeply enough to improve it.

You can't hire this. You have to grow it.

The person is usually not technical. They just care enough to learn.

## So what actually works?

Start with one thing.

Measure it obsessively.

Rebuild instead of retrofitting.

Budget for Month 2 being rough.

Find one person who's genuinely curious about how it all works.

That's it.

Not revolutionary. Not expensive. Not complicated.

Just disciplined about understanding before you scale.

---

*Radical Insights. One sharp idea every week.*
    `,
  },
  {
    slug: "why-most-ai-rollouts-fail",
    title: "Why Most AI Rollouts Fail",
    description:
      "Most companies don't fail at AI because the tech isn't ready. They fail because rollouts preserve the old workflow instead of the new capability. Here is the gap between access and understanding—and five patterns that give it away.",
    ogImage: "/Images/OG/OG-Insight-AI-Fail.webp",
    image: "/Images/insights/ai-fail.webp",
    publishedDate: "2026-04-13",
    author: "Stephan van Wijk",
    readTime: "7 mins",
    tags: ["Strategy", "AI Transformation", "Future of Work"],
    content: `
> **"What would this look like if we could do it however we wanted?"** That's the question most companies never ask. They're too busy automating the broken thing.

Last week I said the businesses building AI capabilities now will have a compounding advantage. That's true. But I should have added the caveat: most won't build them at all. They'll try, fail quietly, and go back to what they know.

Not because AI doesn't work. Because rollouts are designed to fail.

## The gap between "can" and "actually does"

There's a massive difference between "AI can do X" and "AI does X reliably in my workflow every week."

One is a possibility. The other is a system.

Most rollouts collapse in that gap. Someone reads about ChatGPT, gets excited, opens a tab, types a prompt, and gets a mediocre result. They try again. Different output. Nothing feels reliable, so they stop. The tool sits unused, and they tell themselves "AI just isn't ready yet."

What they're really saying is: "Nobody helped me build a system around it."

## The real problem: they don't actually know what AI can do

Here's what I see constantly: someone builds a three-step workflow to do something. They've optimised it, trained the team on it, it works. Then they try to automate it with AI so they build a three-step prompt sequence to match the three-step workflow.

The workflow exists because of tool constraints that no longer apply. Those three steps were never the right way to do it. They were the way to do it with email and spreadsheets and manual handoffs.

AI doesn't care about those constraints.

One prompt (with the right context and the right instructions) can do what took three workflows and four people to coordinate. But they never find that because they're still thinking inside the old system's shape.

They automate the broken thing instead of replacing it.

This is why rollouts fail. It's not discipline. It's **understanding**. Most people building with AI today don't actually grasp what the technology can do because they're still constrained by how they've always had to do it.

**The five patterns are symptoms of this gap:**

**1. They automate workflows instead of rethinking them.**

They take the process that exists and try to speed it up with AI. But the process exists because it had to, given the old constraints. AI removes those constraints. So they end up building elaborate prompt chains to replicate something that could be one sentence tomorrow.

**2. Inconsistency kills adoption because they're over-engineering.**

Prompt 1 feeds into Prompt 2 feeds into Prompt 3, with manual review in between. Each step adds fragility. Each handoff is a chance for the output to drift. They think they need complexity. They actually just need to step back and let AI do the whole thing at once.

**3. The person who benefits isn't learning what's possible.**

The owner wants their social posts done. But they never sit down and experiment with the AI themselves. So they don't discover that one good prompt can generate, refine, and schedule a whole week of posts. They just get told "the admin will handle it," and the admin is working from last year's mental model of what's possible.

**4. They're building systems that will be obsolete in three months.**

They deploy a workflow today that works. But next month the models get better. In six months, something that needed five steps works in one. Instead of staying curious about capability shifts, they freeze the system and move on. The gap between what's actually possible and what they built just keeps widening.

**5. Nobody's measuring what's actually available versus what they're using.**

They don't track: "This used to take four hours. Now it takes 30 minutes, but could it take five?" Because they're not comparing against the full capability, they're comparing against the old way of doing things. So they miss the gap entirely.

## The compounding advantage belongs to those who actually learn

Last week's thesis still holds: the businesses that start building AI capabilities now will have an edge.

But here's the thing: that edge doesn't come from moving faster. It comes from understanding what the technology can actually do and then having the courage to let go of the workflows it replaces.

Most rollouts fail because people are trying to preserve the shape of the old system. They're automating constraint, not capability.

The businesses that win are the ones that ask: "What would this look like if we could do it however we wanted?" And then they build that. Not the old way with AI on top. The new way, from scratch.

That takes understanding. Not discipline. Understanding takes time and curiosity and willingness to experiment.

The gap between "we have access to AI" and "we understand what it can do" is where most companies stay stuck. And every week they stay stuck, the gap between what's possible and what they've built gets wider.

---

*Radical Insights. One sharp idea every week.*
    `,
  },
  {
    slug: "the-agency-is-not-the-answer-anymore",
    title: "The Agency Is Not the Answer Anymore — But You Can Be",
    description:
      "The traditional agency model is being dismantled. Not by AI itself, but by the translation gap between knowing AI exists and knowing how to use it. Here is what that means for agencies and the clients they serve.",
    ogImage: "/Images/OG/OG-Insight-Agency.webp",
    image: "/Images/insights/agency.webp",
    publishedDate: "2026-04-06",
    author: "Stephan van Wijk",
    readTime: "5 mins",
    tags: ["Strategy", "AI Transformation", "Future of Work"],
    content: `
> **"If you have been running an agency for more than five years, you already know something is wrong. The pitches are taking longer to convert. Clients are asking questions they never used to ask."**

## Nobody is coming to save the old model

The traditional agency model — retainers, billable hours, a team of specialists for every discipline — was built for a world where the tools were complex, the access was exclusive, and the expertise was genuinely hard to find.

That world is gone.

Not because agencies stopped being good at what they do. But because the gap between what an agency can do and what a business owner can now do themselves has collapsed faster than anyone predicted. Strategy, copy, creative, campaigns, social content, analytics. A business owner with the right setup can now do in an afternoon what used to take a team of six and a six-week timeline.

That is not a prediction. That is Monday morning.

## The gap is not the technology. It is the translation.

Here is the thing nobody is saying clearly enough: most business owners do not want to become AI experts. That is not why they built their business. They are trying to run a great restaurant, grow their shop, or focus on the craft they have spent years developing.

AI can't cut hair. AI can't cook. AI can't build the kind of trust that keeps a local community coming back.

But AI *can* handle the 40% of the week that sits between a business owner and their core work. The social posts that never go out. The follow-up emails that pile up. The content calendar that exists only in someone's head. The admin that quietly eats the hours that should go toward the actual work.

The businesses that figure this out — even modestly, even imperfectly — will have a compounding advantage over the ones that wait. And the gap between a business using AI intelligently and one that is not is only going to widen from here.

That is where you come in.

## The agency that survives is the one that closes that gap

Your clients are not going to fire you because AI exists. They are going to fire you if someone else helps them understand it first.

The agencies that will still be here in five years are not the ones that ignored AI or the ones that panicked about it. They are the ones that rebuilt around it — quietly, practically, without making it the whole personality of the business.

Not AI for AI's sake. AI where it actually saves time, reduces cost, and produces better work. That is a completely different conversation from what most people are having right now.

> **"Your clients are not going to fire you because AI exists. They are going to fire you if someone else helps them understand it first."**

For years the agency model worked because the expertise was real and the tools were hard to access. Some of that is still true. But a growing portion of what agencies bill for is execution — production, content, management — that can now be handled differently. The agencies that acknowledge this and rebuild around it will be the ones clients trust with the work that still genuinely needs a human.

## Why this moment matters

The learning curve flattens fast once you are in it. The problem is most agency owners are too busy running the business to start.

That is not a criticism. It is the reality of running any service business. The urgent always beats the important.

But the cost of doing nothing is rising every week. Not dramatically, not all at once — just quietly, steadily, in the form of clients asking harder questions, margins getting thinner, and competitors who figured it out six months earlier starting to show up in your pitches.

You do not need to become a technology company. You need one person in your corner who has already done the work of figuring out where AI creates real value and where it does not — and can help you build it into how you operate without turning your business upside down.

That is exactly what Radical Thinking does.

---

*Radical Insights. One sharp idea every week.*
    `,
  },
  {
    slug: "ai-is-rocket-fuel",
    title: "Stop trying to put Rocket Fuel (AI) in a Honda Civic and expect it to fly.",
    description:
      "Why the traditional agency model is dead, and why adapting to AI requires rebuilding your entire business engine from the ground up.",
    ogImage: "/Images/OG/OG-Insight-Rocket.webp",
    image: "/Images/insights/rocket-fuel.webp",
    publishedDate: "2026-02-23",
    author: "Stephan van Wijk",
    readTime: "4 mins",
    tags: ["Strategy", "AI Transformation", "Future of Work"],
    content: `
> **"As the owner of a creative digital agency that has been at the forefront of technology since 2008, I've seen every hype cycle. But this isn't a cycle. It's an extinction-level event for the traditional agency model."**

## The End of the Billable Hour

Right now, artificial intelligence is an existential threat to the entire structure of the advertising and creative industries. Copywriters, app developers, web designers, and even the Hollywood movie industry are being exposed.

Why? Because of the sheer velocity of the technology. What took us weeks of client acquisition, concept building, and execution just a year ago can now be visualized and executed at lightning speed. A full-on, Hollywood-tier video production that required a massive crew and months of post-production can now be achieved in weeks—or even days—using AI video generation.

This breaks the traditional revenue model. How do you charge a client for three weeks of work when the actual execution now takes three hours? You can't.

## The Rocket Fuel Metaphor

The mistake most companies are making right now is treating AI like a software update. They are just plugging it into their existing, siloed workflows.

**Think of AI as rocket fuel.** If you pour rocket fuel into a standard car engine, it will go incredibly fast for a few seconds. And then, it will explode. The engine simply isn't built to handle the mechanics of that fuel.

If you really want to go faster and leverage this technology, you can't just change the fuel. **You have to re-engineer the entire engine.** You have to change how you acquire clients, how you price your value, and how your databases, CRM, and customer service interact.

## The Future Belongs to the Architects

Does this mean human jobs are gone? Yes and no. The roles of the "doers"—the pure coders, the baseline copywriters—are diminishing rapidly. AI can do that perfectly.

But what AI still struggles with is **System Logic**. You still need the Solution Architect. You need the visionary who understands the client's actual pain point, knows how the data flows, and can connect the nodes.

AI can write the code, but you need an architect to tell it *what* to code and to verify that the interconnected ecosystem is actually functioning. The value has shifted from the manual labor of typing code to the strategic capability of prompt engineering and system architecture.

## Adapt or Die

For anyone paying attention, the mandate is clear: adapt AI into your workflow today, or get left behind tomorrow. It will take jobs, but it creates massive new opportunities for those willing to learn how to operate the new machinery.

**"We stopped building Honda Civics. We re-engineered Radical Thinking to run on rocket fuel."**

---

*Radical Insights. One sharp idea every week.*
    `,
  },
  {
    slug: "our-pet-project",
    title: "The 80/20 AI Rule: Building a Zero-Touch Business in 4 Weeks",
    description:
      "You can generate AI images for free. But can you build an automated, self-correcting business out of it? Inside our ultimate 'Pet Project'.",
    ogImage: "/Images/OG/OG-Insight-Pet.webp",
    image: "/Images/insights/petproject.webp",
    publishedDate: "2026-03-30",
    author: "Stephan van Wijk",
    readTime: "5 mins",
    tags: ["Strategy", "AI Transformation", "Future of Work"],
    content: `
> **"Prompting isn't the product. Architecture is."**

The wellbeing of animals is a core passion at Radical Thinking. We have supported 1001Paws.com (an international non-profit for stray animals) for years. This commitment is the driving force behind upcoming initiatives like KahuLife and Animal Intelligence—and it led us to build our ultimate test case: **FluffyFriends**.

## The "I Can Do That For Free" Fallacy
Many people assume they can easily generate pet portraits using free tools like Gemini or ChatGPT.

However, consumer AI outputs often hallucinate (for example: floating paws, extra ears, warped anatomy) and they are not print-ready. We realized that true value architecture is required to bridge the gap between a "fun AI toy" and a flawless, premium physical product.

## The End-to-End Architecture
We transformed a process that usually gets users stuck into a fully automated flow:

1. **Computer Vision Validation:** Our AI instantly checks uploads and rejects unclear pet faces before the customer even pays.
2. **Theme Matching:** The system isolates the pet's exact features and integrates them into complex, pre-engineered themes.
3. **Identity Locking:** It automatically embeds the pet's specific name directly into the geometry of the artwork.
4. **Autonomous Quality Assurance:** A secondary AI checks the output for hallucinations. If it fails our quality standard, it silently retries the generation.
5. **8K Upscaling:** Approved images are rendered in massive, print-ready resolutions (portrait and landscape).
6. **Delivery:** The user receives the files alongside a print guide and template for local printing.

## The 80/20 Rule of AI Engineering
We built this entire product relying on an 80/20 split:

- **80%** is pure AI automation
- **20%** is human logic

It took us exactly **4 weeks**. While AI wrote the code and processes the images, a human **Solution Architect** was required to think through the business process, map edge cases, and guide the machine.

The value of an agency is no longer in typing the code—it is in guiding the machine.

> **"The value of an agency is no longer in typing the code. It is in guiding the machine."**

## Try it yourself

Visit **[FluffyFriends.online](https://fluffyfriends.online)** and use the code **Fluffy15** to get 15% off your first order.

---

*Radical Insights. One sharp idea every week.*
    `,
  },
];