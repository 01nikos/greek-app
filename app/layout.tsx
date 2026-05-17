import "./globals.css";
import type { Metadata, Viewport } from "next";
import Nav from "@/components/Nav";
import SWRegister from "@/components/SWRegister";
import InstallPrompt from "@/components/InstallPrompt";

export const metadata: Metadata = {
  title: {
    default: "Ἑλληνικά — Greek Trainer",
    template: "%s · Ἑλληνικά",
  },
  description:
    "Tichý a soustředěný trenér moderní řečtiny: alfabeta, frekvenční slovní zásoba a gramatická kostra. Pracuje offline.",
  applicationName: "Ἑλληνικά",
  keywords: [
    "řečtina",
    "Greek",
    "moderní řečtina",
    "alfabeta",
    "Leitner",
    "SRS",
    "flashcards",
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Ἑλληνικά",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0F19",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body className="min-h-screen relative">
        <div className="relative z-10">
          <Nav />
          <main className="max-w-5xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
            {children}
          </main>
          <footer className="max-w-5xl mx-auto px-5 sm:px-8 py-10 text-center">
            <div className="hairline mb-6" />
            <p className="text-xs text-paper-mute tracking-wider">
              <span className="greek-mono text-paper-dim">μάθε ολίγον</span>
              <span className="mx-2">·</span>
              uč se každý den 20 minut · 90 dní bez přerušení &gt; 2 hodiny
              jednou týdně
            </p>
          </footer>
        </div>
        <SWRegister />
        <InstallPrompt />
      </body>
    </html>
  );
}
