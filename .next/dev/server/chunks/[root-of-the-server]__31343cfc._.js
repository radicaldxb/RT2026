module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/src/app/api/chatbot/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
// src/app/api/chatbot/route.js
const rateLimit = new Map();
async function POST(req) {
    try {
        // Rate Limiting
        let ip = req.headers.get("x-forwarded-for")?.split(',')[0]?.trim();
        if (!ip) ip = req.headers.get("x-real-ip")?.trim();
        if (!ip) ip = "unknown";
        const limit = 40; // requests
        const windowMs = 60 * 1000; // 1 minute
        if (!rateLimit.has(ip)) {
            rateLimit.set(ip, {
                count: 0,
                lastReset: Date.now()
            });
        }
        const ipData = rateLimit.get(ip);
        if (Date.now() - ipData.lastReset > windowMs) {
            ipData.count = 0;
            ipData.lastReset = Date.now();
        }
        if (ipData.count >= limit) {
            console.warn(`[API] Rate limit hit for IP: ${ip}`);
            return new Response(JSON.stringify({
                error: "Too many requests. Please try again later."
            }), {
                status: 429,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }
        ipData.count += 1;
        const body = await req.json();
        const chatInput = body.chatInput;
        const sessionId = body.sessionId || "test-123"; // default session
        const metadata = body.metadata || {};
        //  Validate chatInput
        if (!chatInput || typeof chatInput !== "string") {
            console.error("Invalid chatInput in request body:", body);
            return new Response(JSON.stringify({
                error: "chatInput must be a non-empty string"
            }), {
                status: 400,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }
        if (chatInput.length > 500) {
            return new Response(JSON.stringify({
                reply: "Message is too long. Please limit it to 500 characters."
            }), {
                status: 200,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }
        if ("TURBOPACK compile-time truthy", 1) {
            console.log("Received chatInput:", chatInput);
            console.log("Received sessionId:", sessionId);
        }
        // --- call n8n webhook ---
        const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
        if (!webhookUrl) {
            console.error("❌ Missing NEXT_PUBLIC_N8N_WEBHOOK_URL environment variable");
            return new Response(JSON.stringify({
                error: "Server configuration error: Missing Webhook URL"
            }), {
                status: 500,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }
        const n8nRes = await fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                chatInput,
                sessionId,
                metadata
            })
        });
        const rawText = await n8nRes.text();
        if ("TURBOPACK compile-time truthy", 1) {
            console.log("📨 n8n raw response:", rawText);
        }
        let data;
        try {
            const parsed = JSON.parse(rawText);
            // Handle n8n returning an array (common behavior) or object
            const item = Array.isArray(parsed) ? parsed[0] || {} : parsed || {};
            // Normalize to a single 'reply' field by checking common keys
            let reply = item.output || item.reply || item.text || item.message || item.content;
            // Ensure reply is a string to prevent client rendering errors
            if (typeof reply === 'object' && reply !== null) {
                reply = JSON.stringify(reply);
            } else if (reply === undefined || reply === null) {
                reply = typeof item === 'string' ? item : JSON.stringify(item);
            }
            data = {
                reply: String(reply)
            };
        } catch  {
            console.warn("n8n did not return valid JSON, sending raw text back");
            data = {
                reply: rawText || " No response from n8n"
            };
        }
        return new Response(JSON.stringify(data), {
            status: n8nRes.ok ? 200 : 502,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        console.error("API route crashed:", error);
        return new Response(JSON.stringify({
            error: error && error.message || "Internal Server Error"
        }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__31343cfc._.js.map