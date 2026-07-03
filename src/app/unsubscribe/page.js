import { Suspense } from "react";
import UnsubscribeClient from "./unsubscribe";

export const metadata = {
  title: "Unsubscribe | Radical Thinking",
  description: "Unsubscribe from Radical Thinking email follow-ups.",
  robots: { index: false, follow: false },
  alternates: {
    canonical: "https://radical-thinking.net/unsubscribe",
  },
};

export default function UnsubscribePage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center text-gray-600">
          Loading...
        </main>
      }
    >
      <UnsubscribeClient />
    </Suspense>
  );
}
