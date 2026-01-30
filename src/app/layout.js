import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Radical Thinking | AI-Native Agency in Dubai",
  description: "Why browse a static website when you can have a conversation? Talk directly to our AI agent to get the answers you need.",
  metadataBase: new URL("https://radical-thinking.net"),
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    url: "https://radical-thinking.net",
    title: "Radical Thinking | AI-Native Agency in Dubai",
    description: "AI-native agency bringing bold ideas to life.",
    images: [{ url: "https://radical-thinking.net/images/social-share.jpg" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="geo.region" content="AE" />
        <meta name="geo.placename" content="Dubai" />
      </head>
      <body className="antialiased m-0 p-0 min-h-full bg-white">
        {children}
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-FXY9Q2TXCL" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-FXY9Q2TXCL');`}
        </Script>
      </body>
    </html>
  );
}
