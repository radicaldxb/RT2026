import Home from "../home";

export const metadata = {
  title: "Radical Thinking",
  description:
    "Your partner in turning AI experiments into results. Radical Thinking, Dubai.",
  robots: { index: false, follow: false },
};

/** Alias of `/` for staging and design review — same component, noindex. */
export default function LandingPage() {
  return <Home />;
}
