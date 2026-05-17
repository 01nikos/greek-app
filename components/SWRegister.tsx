"use client";

import { useEffect, useState } from "react";

export default function SWRegister() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(
    null
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;
    if (process.env.NODE_ENV !== "production") return; // skip in dev

    const onLoad = async () => {
      try {
        const reg = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        });

        // Check for updates every time tab gains focus
        const onFocus = () => reg.update().catch(() => {});
        window.addEventListener("focus", onFocus);

        // Detect a new SW waiting to activate
        const checkWaiting = () => {
          if (reg.waiting) {
            setWaitingWorker(reg.waiting);
            setUpdateAvailable(true);
          }
        };
        checkWaiting();

        reg.addEventListener("updatefound", () => {
          const newWorker = reg.installing;
          if (!newWorker) return;
          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              setWaitingWorker(newWorker);
              setUpdateAvailable(true);
            }
          });
        });

        // Reload once the new SW takes control
        let refreshing = false;
        navigator.serviceWorker.addEventListener("controllerchange", () => {
          if (refreshing) return;
          refreshing = true;
          window.location.reload();
        });

        return () => window.removeEventListener("focus", onFocus);
      } catch (err) {
        // SW registration failed (e.g. localhost without HTTPS) — silent
      }
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }
  }, []);

  const applyUpdate = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: "SKIP_WAITING" });
    }
  };

  if (!updateAvailable) return null;

  return (
    <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-sm z-50 animate-slide-up">
      <div className="bg-ink-700 border border-aegean/40 rounded-xl p-4 shadow-2xl backdrop-blur-xl">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <div className="text-sm font-semibold text-paper mb-1">
              Nová verze je k dispozici
            </div>
            <div className="text-xs text-paper-dim leading-relaxed">
              Aktualizace aplikace je připravena. Načti znovu pro nejnovější verzi.
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => setUpdateAvailable(false)}
            className="flex-1 py-2 px-3 text-xs rounded-md text-paper-mute hover:text-paper hover:bg-ink-800 transition-colors"
          >
            Později
          </button>
          <button
            onClick={applyUpdate}
            className="flex-1 py-2 px-3 text-xs rounded-md bg-aegean/20 border border-aegean/40 text-aegean-light hover:bg-aegean/30 transition-colors font-semibold"
          >
            Načíst znovu
          </button>
        </div>
      </div>
    </div>
  );
}
