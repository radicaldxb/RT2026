'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="main-viewport flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-black uppercase">
          Radical Thinking
        </h1>

        <p className="formula-gradient text-2xl tracking-widest uppercase">
          BI = C + Ex × T²
        </p>

        <Link
          href="/chat"
          className="inline-block px-6 py-3 rounded-full bg-white shadow-lg font-bold"
        >
          Start Chat
        </Link>
      </div>
    </main>
  );
}
