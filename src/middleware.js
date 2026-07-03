import { NextResponse } from "next/server";

function readCountry(request) {
  try {
    const code = globalThis.Netlify?.context?.geo?.country?.code;
    if (code) return code.toUpperCase();
  } catch {
    // Netlify global only exists on their edge/runtime
  }

  const fromHeader =
    request.headers.get("x-nf-country") ||
    request.headers.get("x-country") ||
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    "";

  return fromHeader ? fromHeader.toUpperCase() : "";
}

export function middleware(request) {
  const country = readCountry(request);
  const headers = new Headers(request.headers);

  if (country) {
    headers.set("x-rt-visitor-country", country);
  }

  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ["/api/chat", "/api/chatbot"],
};
