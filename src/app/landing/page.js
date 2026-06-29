import Home from "../home";

export const metadata = {
  title: "Radical Thinking",
  description: "We bring bold ideas to life.",
  robots: { index: false, follow: false },
};

/** Alias of `/` for staging and design review — same component, noindex. */
export default function LandingPage() {
  return <Home />;
}
