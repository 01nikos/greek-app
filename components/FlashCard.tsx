"use client";

import { useState, useEffect } from "react";

type FlashCardProps = {
  front: React.ReactNode;
  back: React.ReactNode;
  onCorrect: () => void;
  onWrong: () => void;
  onReset?: () => void;
  hint?: string;
};

export default function FlashCard({
  front,
  back,
  onCorrect,
  onWrong,
  hint,
}: FlashCardProps) {
  const [flipped, setFlipped] = useState(false);

  // Reset flip when card content changes
  useEffect(() => {
    setFlipped(false);
  }, [front, back]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setFlipped((f) => !f);
      } else if (e.key === "1" || e.key === "ArrowLeft") {
        if (flipped) onWrong();
      } else if (e.key === "2" || e.key === "ArrowRight") {
        if (flipped) onCorrect();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [flipped, onCorrect, onWrong]);

  return (
    <div className="flex flex-col items-center gap-6 animate-fade-in">
      <div
        className="card-perspective w-full max-w-xl aspect-[7/4] cursor-pointer select-none"
        onClick={() => setFlipped((f) => !f)}
      >
        <div
          className={`card-inner relative w-full h-full ${
            flipped ? "card-flipped" : ""
          }`}
        >
          <div className="card-face rounded-2xl bg-ink-800 border border-paper/10 shadow-2xl flex items-center justify-center p-8 overflow-hidden">
            <div
              className="absolute top-3 right-4 text-[10px] tracking-[0.25em] uppercase text-paper-mute"
            >
              přední
            </div>
            {front}
          </div>
          <div className="card-face card-back rounded-2xl bg-ink-700 border border-aegean/30 shadow-2xl flex items-center justify-center p-8 overflow-hidden">
            <div
              className="absolute top-3 right-4 text-[10px] tracking-[0.25em] uppercase text-paper-mute"
            >
              zadní
            </div>
            {back}
          </div>
        </div>
      </div>

      <div className="text-xs text-paper-mute tracking-wider">
        {flipped ? (
          <span>1 / ← chyba · 2 / → správně</span>
        ) : (
          <span>↓ klikni nebo stiskni <kbd className="px-1.5 py-0.5 rounded bg-ink-700 border border-paper/10 text-paper">mezerník</kbd> ↓</span>
        )}
      </div>

      {hint && !flipped && (
        <div className="text-sm text-paper-dim italic max-w-md text-center">
          {hint}
        </div>
      )}

      <div className="flex gap-3 w-full max-w-xl">
        <button
          onClick={onWrong}
          disabled={!flipped}
          className="flex-1 py-4 px-6 rounded-xl border border-terracotta/40 bg-terracotta/10 text-terracotta-light font-semibold tracking-wide hover:bg-terracotta/20 hover:border-terracotta transition-all disabled:opacity-25 disabled:cursor-not-allowed"
        >
          ✗ Nevěděl jsem
        </button>
        <button
          onClick={onCorrect}
          disabled={!flipped}
          className="flex-1 py-4 px-6 rounded-xl border border-olive/40 bg-olive/10 text-olive font-semibold tracking-wide hover:bg-olive/20 hover:border-olive transition-all disabled:opacity-25 disabled:cursor-not-allowed"
        >
          ✓ Věděl jsem
        </button>
      </div>
    </div>
  );
}
