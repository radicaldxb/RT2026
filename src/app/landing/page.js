import Home from "../home";

export const metadata = {
  title: "Radical Thinking",
  description:
    "Radical Thinking is a partner for organisations working on bold ideas. Creative finds what is worth building, experience makes it land, technology and AI amplify both.",
  robots: { index: false, follow: false },
};

/** Alias of `/` for staging and design review — same component, noindex. */
export default function LandingPage() {
  return <Home />;
}
