"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISS_KEY = "greek-trainer:install-dismissed";
const DISMISS_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if already installed (standalone mode)
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      // iOS
      (window.navigator as any).standalone === true;
    setIsStandalone(standalone);
    if (standalone) return;

    // Check if dismissed recently
    const dismissed = localStorage.getItem(DISMISS_KEY);
    if (dismissed && Date.now() - parseInt(dismissed, 10) < DISMISS_DURATION_MS) {
      return;
    }

    // Detect iOS
    const ua = window.navigator.userAgent.toLowerCase();
    const ios = /iphone|ipad|ipod/.test(ua) && !(window as any).MSStream;
    setIsIOS(ios);

    // Listen for installable prompt (Android/Chrome/Edge)
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShow(true);
    };
    window.addEventListener("beforeinstallprompt", handler);

    // On iOS, show our manual prompt after a delay
    if (ios) {
      const t = setTimeout(() => setShow(true), 8000);
      return () => {
        clearTimeout(t);
        window.removeEventListener("beforeinstallprompt", handler);
      };
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
      setShow(false);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
    setShow(false);
  };

  if (isStandalone || !show) return null;

  // iOS: manual instructions
  if (isIOS && !deferredPrompt) {
    return (
      <PromptCard onDismiss={handleDismiss}>
        <div className="text-sm font-semibold text-paper mb-2">
          Přidat na plochu
        </div>
        <div className="text-xs text-paper-dim leading-relaxed">
          Klikni na{" "}
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-ink-800 rounded text-aegean-light font-mono">
            ⎙
          </span>{" "}
          v Safari a vyber{" "}
          <span className="text-paper font-semibold">„Přidat na plochu"</span>.
          App pak funguje i offline a v plné velikosti, bez prohlížečové lišty.
        </div>
      </PromptCard>
    );
  }

  // Android/Desktop: native prompt
  if (deferredPrompt) {
    return (
      <PromptCard onDismiss={handleDismiss}>
        <div className="text-sm font-semibold text-paper mb-1">
          Nainstaluj jako appku
        </div>
        <div className="text-xs text-paper-dim leading-relaxed mb-3">
          Otevírej se z plochy, funguje offline, bez prohlížečové lišty.
        </div>
        <button
          onClick={handleInstall}
          className="w-full py-2 px-3 text-xs rounded-md bg-aegean/20 border border-aegean/40 text-aegean-light hover:bg-aegean/30 transition-colors font-semibold tracking-wide"
        >
          Nainstalovat
        </button>
      </PromptCard>
    );
  }

  return null;
}

function PromptCard({
  children,
  onDismiss,
}: {
  children: React.ReactNode;
  onDismiss: () => void;
}) {
  return (
    <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-sm z-40 animate-slide-up">
      <div className="bg-ink-700/95 border border-paper/15 rounded-xl p-4 shadow-2xl backdrop-blur-xl relative">
        <button
          onClick={onDismiss}
          aria-label="Zavřít"
          className="absolute top-2 right-3 text-paper-mute hover:text-paper text-lg leading-none p-1"
        >
          ×
        </button>
        <div className="pr-4">{children}</div>
      </div>
    </div>
  );
}
