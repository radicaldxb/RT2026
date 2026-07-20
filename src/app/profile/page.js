import Profile from "./profile";

export const metadata = {
  title: "Company Profile | Radical Thinking",
  description:
    "Radical Thinking. Dubai-based AI advisory. Partner brief covering positioning, methodology, proof, and engagement models.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProfilePage() {
  return <Profile />;
}
