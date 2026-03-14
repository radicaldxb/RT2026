"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function InsightsError({ error, reset }) {
  useEffect(() => {
    console.error("Insights route error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full bg-white border border-red-200 rounded-lg shadow-lg p-8">
        <h1 className="text-xl font-bold text-red-700 mb-4">Something went wrong on Insights</h1>
        <p className="text-sm text-gray-600 mb-2 font-mono break-all">
          <strong>Message:</strong> {error?.message ?? "Unknown error"}
        </p>
        {error?.digest && (
          <p className="text-xs text-gray-500 mb-4 font-mono">Digest: {error.digest}</p>
        )}
        <p className="text-sm text-gray-600 mb-6">
          Copy the message above and share it so we can fix the cause.
        </p>
        <div className="flex gap-4">
          <button
            onClick={reset}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
