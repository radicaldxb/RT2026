"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SoftBackground from "@/components/SoftBackground";
import { serif } from "@/lib/fonts";

export default function UnsubscribeClient() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(`/api/unsubscribe?token=${encodeURIComponent(token)}`);
        const data = await res.json();
        if (cancelled) return;
        setStatus(data.success ? "success" : "invalid");
      } catch {
        if (!cancelled) setStatus("invalid");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [token]);

  const isSuccess = status === "success";

  return (
    <main className="relative flex flex-col w-full min-h-screen overflow-x-clip">
      <div className="fixed inset-0 z-0 pointer-events-none gradient-background">
        <SoftBackground />
      </div>

      <Nav />

      <div className="relative z-10 flex flex-1 items-center justify-center px-4 py-24 md:py-32">
        <div className="w-full max-w-lg text-center">
          <Image
            src="/logos/RT-Logo-New.svg"
            alt="Radical Thinking"
            width={56}
            height={56}
            className="w-14 h-14 mx-auto mb-8"
          />

          {status === "loading" ? (
            <p className="text-gray-600">Processing your request...</p>
          ) : isSuccess ? (
            <>
              <h1
                className="text-2xl md:text-3xl font-bold text-black mb-4 tracking-tight"
                style={serif}
              >
                You have been unsubscribed.
              </h1>
              <p className="text-gray-600 leading-relaxed mb-8">
                You will not receive any further emails from Radical Thinking. If this was a
                mistake, you can restart the conversation at any time.
              </p>
            </>
          ) : (
            <>
              <h1
                className="text-2xl md:text-3xl font-bold text-black mb-4 tracking-tight"
                style={serif}
              >
                This unsubscribe link is not valid or has already been used.
              </h1>
            </>
          )}

          {status !== "loading" ? (
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-black text-white text-sm font-semibold tracking-wide hover:bg-gray-800 transition-colors"
            >
              Back to radical-thinking.net
            </Link>
          ) : null}
        </div>
      </div>

      <Footer />
    </main>
  );
}
