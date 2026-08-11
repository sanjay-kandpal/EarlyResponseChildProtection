import type { Metadata } from "next";
import "./globals.css";

// Clone renders with PrivaSapien's own compiled stylesheet + the same Google
// fonts the real site loads, so the captured markup styles exactly as-is.
const SITE_CSS = "https://privasapien.com/assets/index-dMP7BQeF.css";
const FONTS_CSS =
  "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap";

// Small keyframes block the original site injects inline in <head>.
const HEAD_KEYFRAMES = `.grecaptcha-badge{visibility:hidden}`;

export const metadata: Metadata = {
  title: "Early Warning Child System",
  description:
    "Design trust into your data and AI landscape. PrivaSapien builds privacy, responsible AI, and trusted agents directly into your systems so you can scale with confidence.",
  icons: { icon: "https://privasapien.com/favicon.png" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href={FONTS_CSS} />
        <link rel="stylesheet" href={SITE_CSS} />
        <style dangerouslySetInnerHTML={{ __html: HEAD_KEYFRAMES }} />
      </head>
      <body className="bg-navy text-white">{children}</body>
    </html>
  );
}
