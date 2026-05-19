"use client";

import { useState, useEffect, useMemo } from "react";
import { ALPHABET, ALPHABET_BY_CATEGORY, type LetterEntry } from "@/lib/data/alphabet";
import {
  loadState,
  saveState,
  gradeCard,
  initCard,
  getDueCards,
  getBoxDistribution,
  resetState,
  recordReview,
  nextDueAt,
  formatTimeUntil,
  type SrsState,
} from "@/lib/srs";
import FlashCard from "@/components/FlashCard";
import StatsBar from "@/components/StatsBar";

type Mode = "study" | "browse";
type Filter = "all" | "letter" | "diphthong" | "digraph" | "traps";

const STORAGE_KEY = "alphabet";

export default function AlphabetPage() {
  const [mode, setMode] = useState<Mode>("study");
  const [filter, setFilter] = useState<Filter>("all");
  const [srsState, setSrsState] = useState<SrsState>({});
  const [queue, setQueue] = useState<string[]>([]);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Filter ids based on user selection
  const filteredEntries = useMemo<LetterEntry[]>(() => {
    if (filter === "all") return ALPHABET;
    if (filter === "traps") return ALPHABET.filter((l) => l.trap);
    return ALPHABET_BY_CATEGORY[filter];
  }, [filter]);

  const filteredIds = useMemo(
    () => filteredEntries.map((e) => e.id),
    [filteredEntries]
  );

  useEffect(() => {
    const state = loadState(STORAGE_KEY);
    setSrsState(state);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const due = getDueCards(srsState, filteredIds);
    // If nothing due, fall back to never-seen
    const newIds = filteredIds.filter((id) => !srsState[id]);
    const finalQueue = due.length > 0 ? due : newIds.length > 0 ? newIds : [];
    setQueue(finalQueue);
    setCurrentId(finalQueue[0] ?? null);
  }, [hydrated, srsState, filteredIds]);

  const currentEntry = useMemo(
    () => ALPHABET.find((e) => e.id === currentId) ?? null,
    [currentId]
  );

  const handleGrade = (result: "correct" | "wrong") => {
    if (!currentId) return;
    const existing = srsState[currentId] ?? initCard(currentId);
    const updated = gradeCard(existing, result);
    const nextState = { ...srsState, [currentId]: updated };
    setSrsState(nextState);
    saveState(STORAGE_KEY, nextState);
    recordReview();

    // advance queue
    const rest = queue.slice(1);
    setQueue(rest);
    setCurrentId(rest[0] ?? null);
  };

  const handleReset = () => {
    if (!confirm("Opravdu vymazat veškerý postup v alfabetě?")) return;
    resetState(STORAGE_KEY);
    setSrsState({});
  };

  const distribution = useMemo(
    () => getBoxDistribution(srsState, ALPHABET.map((e) => e.id)),
    [srsState]
  );
  const dueAll = useMemo(
    () => getDueCards(srsState, ALPHABET.map((e) => e.id)).length,
    [srsState]
  );

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <header className="animate-slide-up">
        <div className="flex items-baseline gap-4 mb-3">
          <span className="text-[10px] tracking-[0.3em] uppercase text-aegean">
            vrstva 01
          </span>
          <span className="hairline flex-1" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-display text-paper tracking-tight">
          Alfabeta <span className="greek-mono text-terracotta-light">Ἄλφα Βῆτα</span>
        </h1>
        <p className="mt-3 text-paper-dim max-w-2xl">
          Cíl: rozpoznat každé písmeno a jeho zvuk reflexivně. Filtruj „pasti“
          pro vizuálně podobná písmena (η, υ, ν, ρ…).
        </p>
      </header>

      {/* STATS */}
      <StatsBar
        distribution={distribution}
        total={ALPHABET.length}
        dueCount={dueAll}
      />

      {/* CONTROLS */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1 bg-ink-800 p-1 rounded-lg border border-paper/5">
          <ModeBtn active={mode === "study"} onClick={() => setMode("study")}>
            Trénink
          </ModeBtn>
          <ModeBtn active={mode === "browse"} onClick={() => setMode("browse")}>
            Tabulka
          </ModeBtn>
        </div>

        <div className="flex gap-1 flex-wrap">
          <FilterBtn active={filter === "all"} onClick={() => setFilter("all")}>
            Vše ({ALPHABET.length})
          </FilterBtn>
          <FilterBtn
            active={filter === "letter"}
            onClick={() => setFilter("letter")}
          >
            Písmena (24)
          </FilterBtn>
          <FilterBtn
            active={filter === "diphthong"}
            onClick={() => setFilter("diphthong")}
          >
            Dvojhlásky
          </FilterBtn>
          <FilterBtn
            active={filter === "digraph"}
            onClick={() => setFilter("digraph")}
          >
            Digrafy
          </FilterBtn>
          <FilterBtn
            active={filter === "traps"}
            onClick={() => setFilter("traps")}
          >
            Pasti ⚠
          </FilterBtn>
        </div>
      </div>

      {/* MAIN AREA */}
      {mode === "study" ? (
        <div className="py-4">
          {currentEntry ? (
            <FlashCard
              key={currentEntry.id}
              front={
                <div className="text-center">
                  <div className="text-[10px] tracking-[0.3em] uppercase text-paper-mute mb-4">
                    Jak se to čte?
                  </div>
                  <div className="greek-mono text-[clamp(5rem,18vw,9rem)] leading-none text-paper">
                    {currentEntry.upper}
                    <span className="text-aegean-light"> {currentEntry.lower}</span>
                  </div>
                  {currentEntry.trap && (
                    <div className="mt-4 inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase text-terracotta-light">
                      <span>⚠</span>
                      <span>past</span>
                    </div>
                  )}
                </div>
              }
              back={
                <div className="text-center max-w-md">
                  <div className="text-[10px] tracking-[0.3em] uppercase text-paper-mute mb-3">
                    {currentEntry.name}
                  </div>
                  <div className="text-3xl sm:text-4xl font-display text-aegean-light mb-3">
                    {currentEntry.czechSound}
                  </div>
                  <div className="text-xs text-paper-mute mb-4 font-mono">
                    [{currentEntry.transliteration}]
                  </div>
                  {currentEntry.note && (
                    <div className="text-sm text-paper-dim leading-relaxed italic">
                      {currentEntry.note}
                    </div>
                  )}
                </div>
              }
              onCorrect={() => handleGrade("correct")}
              onWrong={() => handleGrade("wrong")}
              hint={`${queue.length} ve frontě`}
            />
          ) : (
            <EmptyState
              onReset={handleReset}
              nextDue={nextDueAt(srsState, filteredIds)}
            />
          )}
        </div>
      ) : (
        <BrowseTable entries={filteredEntries} />
      )}

      {/* RESET */}
      {Object.keys(srsState).length > 0 && (
        <div className="text-center pt-4">
          <button
            onClick={handleReset}
            className="text-xs text-paper-mute hover:text-terracotta-light tracking-[0.2em] uppercase transition-colors"
          >
            Resetovat postup v alfabetě
          </button>
        </div>
      )}
    </div>
  );
}

function ModeBtn({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-md text-sm transition-all ${
        active ? "bg-ink-600 text-paper" : "text-paper-mute hover:text-paper"
      }`}
    >
      {children}
    </button>
  );
}

function FilterBtn({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-md text-xs tracking-wider transition-all border ${
        active
          ? "bg-aegean/20 border-aegean/50 text-aegean-light"
          : "bg-transparent border-paper/10 text-paper-mute hover:text-paper hover:border-paper/30"
      }`}
    >
      {children}
    </button>
  );
}

function EmptyState({
  onReset,
  nextDue,
}: {
  onReset: () => void;
  nextDue: number | null;
}) {
  return (
    <div className="text-center py-16 animate-fade-in">
      <div className="greek-mono text-7xl text-olive mb-4">τέλος</div>
      <p className="text-paper-dim mb-2">Žádné karty k opakování.</p>
      <p className="text-sm text-paper-mute">
        {nextDue == null
          ? "Žádné další karty k učení. "
          : `Vrať se ${formatTimeUntil(nextDue)}, nebo `}
        <button onClick={onReset} className="text-terracotta-light underline">
          resetuj postup
        </button>
        .
      </p>
    </div>
  );
}

function BrowseTable({ entries }: { entries: LetterEntry[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 animate-fade-in">
      {entries.map((e) => (
        <div
          key={e.id}
          className={`relative rounded-xl p-4 border bg-ink-800/40 transition-all hover:bg-ink-800 ${
            e.trap
              ? "border-terracotta/30"
              : "border-paper/10 hover:border-paper/20"
          }`}
        >
          {e.trap && (
            <span className="absolute top-2 right-2 text-[9px] tracking-[0.15em] uppercase text-terracotta-light">
              ⚠
            </span>
          )}
          <div className="greek-mono text-4xl text-paper">
            {e.upper}
            <span className="text-aegean-light text-3xl ml-1">{e.lower}</span>
          </div>
          <div className="mt-2 text-xs text-paper-mute">{e.name}</div>
          <div className="mt-1 text-lg text-aegean-light font-display">
            {e.czechSound}
          </div>
          {e.note && (
            <div className="mt-2 text-[11px] text-paper-dim leading-snug">
              {e.note}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
