import LandingV2 from "./landing";

export const metadata = {
  title: "Radical Thinking",
  description: "We bring bold ideas to life.",
  robots: { index: false, follow: false },
};

export default function LandingPage() {
  return <LandingV2 />;
}
