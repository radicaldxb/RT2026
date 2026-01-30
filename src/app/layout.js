import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Radical Thinking | AI-Native Agency in Dubai",
  description: "Why browse a static website when you can have a conversation?",
  metadataBase: new URL("https://radical-thinking.net"),
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased m-0 p-0 min-h-full bg-white font-light">
        {children}
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-FXY9Q2TXCL" />
      </body>
    </html>
  );
}
