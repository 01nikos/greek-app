"use client";

import { useState } from "react";
import { GRAMMAR_SECTIONS, type GrammarSection } from "@/lib/data/grammar";

export default function GrammarPage() {
  const [activeId, setActiveId] = useState<string>(GRAMMAR_SECTIONS[0].id);

  const active =
    GRAMMAR_SECTIONS.find((s) => s.id === activeId) ?? GRAMMAR_SECTIONS[0];

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <header className="animate-slide-up">
        <div className="flex items-baseline gap-4 mb-3">
          <span className="text-[10px] tracking-[0.3em] uppercase text-aegean">
            vrstva 03
          </span>
          <span className="hairline flex-1" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-display text-paper tracking-tight">
          Gramatika{" "}
          <span className="greek-mono text-terracotta-light">Γραμματική</span>
        </h1>
        <p className="mt-3 text-paper-dim max-w-2xl">
          Minimum nutné pro parsing věty. Nepoužívej tyto tabulky k učení –
          používej je k vyhledávání, když narazíš na neznámý tvar v textu.
          Intuice přijde z četby, ne z drilu tabulek.
        </p>
      </header>

      {/* SECTION TABS */}
      <nav className="border-y border-paper/10 -mx-5 sm:-mx-8 px-5 sm:px-8 py-3 sticky top-[60px] backdrop-blur-xl bg-ink-900/80 z-30">
        <div className="flex gap-1 overflow-x-auto pb-1 -mb-1">
          {GRAMMAR_SECTIONS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActiveId(s.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-md text-sm tracking-wide transition-all ${
                activeId === s.id
                  ? "bg-ink-700 text-paper border border-aegean/30"
                  : "text-paper-mute hover:text-paper hover:bg-ink-800 border border-transparent"
              }`}
            >
              <span className="font-mono text-[10px] text-paper-mute mr-2">
                {String(i + 1).padStart(2, "0")}
              </span>
              {s.title}
            </button>
          ))}
        </div>
      </nav>

      {/* ACTIVE SECTION */}
      <section key={active.id} className="animate-fade-in space-y-8">
        <div className="border-l-2 border-aegean/50 pl-5">
          <h2 className="text-2xl sm:text-3xl font-display text-paper mb-2">
            {active.title}
          </h2>
          <p className="text-paper-dim text-sm sm:text-base leading-relaxed max-w-3xl">
            {active.intro}
          </p>
        </div>

        <div className="space-y-10">
          {active.tables.map((table) => (
            <GrammarTableCard key={table.id} table={table} />
          ))}
        </div>
      </section>

      {/* NAV between sections */}
      <SectionNav active={active} />
    </div>
  );
}

function GrammarTableCard({
  table,
}: {
  table: GrammarSection["tables"][number];
}) {
  return (
    <div className="bg-ink-800/40 border border-paper/10 rounded-2xl overflow-hidden">
      <div className="px-5 sm:px-7 py-5 border-b border-paper/10">
        <div className="flex items-baseline justify-between gap-4 mb-1">
          <h3 className="text-lg sm:text-xl font-display text-paper">
            {table.title}
          </h3>
          <span className="text-[10px] tracking-[0.2em] uppercase text-paper-mute">
            {table.subtitle}
          </span>
        </div>
        {table.description && (
          <p className="text-sm text-paper-dim leading-relaxed">
            {table.description}
          </p>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-paper/10">
              {table.columns.map((col, i) => (
                <th
                  key={i}
                  className={`px-4 sm:px-6 py-3 text-left text-[10px] tracking-[0.2em] uppercase text-paper-mute font-medium ${
                    i === 0 ? "" : "border-l border-paper/5"
                  }`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, ri) => (
              <tr
                key={ri}
                className="border-b border-paper/5 last:border-b-0 hover:bg-ink-700/40 transition-colors"
              >
                <td className="px-4 sm:px-6 py-3 text-sm text-paper-dim">
                  {row.label}
                </td>
                {row.cells.map((cell, ci) => (
                  <td
                    key={ci}
                    className="px-4 sm:px-6 py-3 border-l border-paper/5"
                  >
                    {isGreekCell(cell) ? (
                      <span className="greek-mono text-xl text-paper">
                        {cell}
                      </span>
                    ) : (
                      <span className="text-paper text-sm">{cell}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {table.notes && table.notes.length > 0 && (
        <div className="px-5 sm:px-7 py-4 border-t border-paper/10 bg-ink-900/40 space-y-1.5">
          {table.notes.map((note, i) => (
            <div
              key={i}
              className="text-xs text-paper-mute leading-relaxed flex gap-2"
            >
              <span className="text-terracotta-light flex-shrink-0">→</span>
              <span>{note}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SectionNav({ active }: { active: GrammarSection }) {
  const idx = GRAMMAR_SECTIONS.findIndex((s) => s.id === active.id);
  const prev = idx > 0 ? GRAMMAR_SECTIONS[idx - 1] : null;
  const next =
    idx < GRAMMAR_SECTIONS.length - 1 ? GRAMMAR_SECTIONS[idx + 1] : null;

  return (
    <div className="flex justify-between gap-4 pt-6 border-t border-paper/10">
      {prev ? (
        <button
          onClick={() => {
            const el = document.querySelector(
              `button[data-section="${prev.id}"]`
            );
            // Click the tab to navigate
            const tabs = document.querySelectorAll<HTMLButtonElement>("nav button");
            tabs.forEach((t) => {
              if (t.textContent?.includes(prev.title)) t.click();
            });
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="text-left group"
        >
          <div className="text-[10px] tracking-[0.2em] uppercase text-paper-mute mb-1">
            ← Předchozí
          </div>
          <div className="text-paper group-hover:text-aegean-light transition-colors">
            {prev.title}
          </div>
        </button>
      ) : (
        <div />
      )}
      {next ? (
        <button
          onClick={() => {
            const tabs = document.querySelectorAll<HTMLButtonElement>("nav button");
            tabs.forEach((t) => {
              if (t.textContent?.includes(next.title)) t.click();
            });
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="text-right group"
        >
          <div className="text-[10px] tracking-[0.2em] uppercase text-paper-mute mb-1">
            Další →
          </div>
          <div className="text-paper group-hover:text-aegean-light transition-colors">
            {next.title}
          </div>
        </button>
      ) : (
        <div />
      )}
    </div>
  );
}

function isGreekCell(text: string): boolean {
  return /[\u0370-\u03FF\u1F00-\u1FFF]/.test(text);
}
