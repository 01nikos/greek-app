"use client";

import { useState, useEffect, useMemo } from "react";
import {
  VOCABULARY,
  CATEGORY_LABELS,
  type VocabCategory,
  type VocabEntry,
} from "@/lib/data/vocabulary";
import {
  loadState,
  saveState,
  gradeCard,
  initCard,
  getDueCards,
  getBoxDistribution,
  resetState,
  recordReview,
  type SrsState,
} from "@/lib/srs";
import FlashCard from "@/components/FlashCard";
import StatsBar from "@/components/StatsBar";

type Direction = "gr-to-cs" | "cs-to-gr";
type Mode = "study" | "browse";
type CategoryFilter = "all" | VocabCategory;

const STORAGE_KEY = "vocabulary";

export default function VocabularyPage() {
  const [mode, setMode] = useState<Mode>("study");
  const [direction, setDirection] = useState<Direction>("gr-to-cs");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [srsState, setSrsState] = useState<SrsState>({});
  const [queue, setQueue] = useState<string[]>([]);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  const filteredEntries = useMemo<VocabEntry[]>(() => {
    if (category === "all") return VOCABULARY;
    return VOCABULARY.filter((v) => v.category === category);
  }, [category]);

  const filteredIds = useMemo(
    () => filteredEntries.map((e) => e.id),
    [filteredEntries]
  );

  useEffect(() => {
    setSrsState(loadState(STORAGE_KEY));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const due = getDueCards(srsState, filteredIds);
    const newIds = filteredIds.filter((id) => !srsState[id]);
    // Take due first, then up to 10 new
    const finalQueue = [...due, ...newIds.slice(0, 10)];
    setQueue(finalQueue);
    setCurrentId(finalQueue[0] ?? null);
  }, [hydrated, srsState, filteredIds]);

  const currentEntry = useMemo(
    () => VOCABULARY.find((e) => e.id === currentId) ?? null,
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

    const rest = queue.slice(1);
    setQueue(rest);
    setCurrentId(rest[0] ?? null);
  };

  const handleReset = () => {
    if (!confirm("Opravdu vymazat veškerý postup ve slovní zásobě?")) return;
    resetState(STORAGE_KEY);
    setSrsState({});
  };

  const distribution = useMemo(
    () => getBoxDistribution(srsState, VOCABULARY.map((e) => e.id)),
    [srsState]
  );
  const dueAll = useMemo(
    () => getDueCards(srsState, VOCABULARY.map((e) => e.id)).length,
    [srsState]
  );

  return (
    <div className="space-y-10">
      <header className="animate-slide-up">
        <div className="flex items-baseline gap-4 mb-3">
          <span className="text-[10px] tracking-[0.3em] uppercase text-aegean">
            vrstva 02
          </span>
          <span className="hairline flex-1" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-display text-paper tracking-tight">
          Slovní zásoba <span className="greek-mono text-terracotta-light">Λέξεις</span>
        </h1>
        <p className="mt-3 text-paper-dim max-w-2xl">
          130 nejčastějších slov v 11 kategoriích. Cíl: pasivní rozpoznávání,
          ne aktivní produkce. Pro čtení stačí směr <strong>řecky → česky</strong>.
        </p>
      </header>

      <StatsBar
        distribution={distribution}
        total={VOCABULARY.length}
        dueCount={dueAll}
      />

      {/* CONTROLS */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-1 bg-ink-800 p-1 rounded-lg border border-paper/5">
            <ModeBtn active={mode === "study"} onClick={() => setMode("study")}>
              Trénink
            </ModeBtn>
            <ModeBtn
              active={mode === "browse"}
              onClick={() => setMode("browse")}
            >
              Tabulka
            </ModeBtn>
          </div>

          <div className="flex gap-1 bg-ink-800 p-1 rounded-lg border border-paper/5">
            <ModeBtn
              active={direction === "gr-to-cs"}
              onClick={() => setDirection("gr-to-cs")}
            >
              GR → CS
            </ModeBtn>
            <ModeBtn
              active={direction === "cs-to-gr"}
              onClick={() => setDirection("cs-to-gr")}
            >
              CS → GR
            </ModeBtn>
          </div>
        </div>

        <div className="flex gap-1 flex-wrap">
          <FilterBtn
            active={category === "all"}
            onClick={() => setCategory("all")}
          >
            Vše
          </FilterBtn>
          {(Object.keys(CATEGORY_LABELS) as VocabCategory[]).map((cat) => (
            <FilterBtn
              key={cat}
              active={category === cat}
              onClick={() => setCategory(cat)}
            >
              {CATEGORY_LABELS[cat]}
            </FilterBtn>
          ))}
        </div>
      </div>

      {/* MAIN */}
      {mode === "study" ? (
        <div className="py-4">
          {currentEntry ? (
            <FlashCard
              key={currentEntry.id + direction}
              front={
                direction === "gr-to-cs" ? (
                  <div className="text-center">
                    <div className="text-[10px] tracking-[0.3em] uppercase text-paper-mute mb-4">
                      Co to znamená?
                    </div>
                    <div className="greek-mono text-[clamp(2.5rem,9vw,5rem)] leading-tight text-paper">
                      {currentEntry.greek}
                    </div>
                    <div className="mt-3 text-sm font-mono text-paper-mute">
                      [{currentEntry.translit}]
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-[10px] tracking-[0.3em] uppercase text-paper-mute mb-4">
                      Jak se to řekne řecky?
                    </div>
                    <div className="text-3xl sm:text-5xl font-display text-paper">
                      {currentEntry.czech}
                    </div>
                  </div>
                )
              }
              back={
                <div className="text-center max-w-md">
                  <div className="text-[10px] tracking-[0.3em] uppercase text-paper-mute mb-3">
                    {CATEGORY_LABELS[currentEntry.category]}
                  </div>
                  <div className="greek-mono text-3xl sm:text-4xl text-paper mb-1">
                    {currentEntry.greek}
                  </div>
                  <div className="text-sm font-mono text-aegean-light mb-3">
                    [{currentEntry.translit}]
                  </div>
                  <div className="text-xl text-paper-dim font-display italic mb-3">
                    {currentEntry.czech}
                  </div>
                  {currentEntry.note && (
                    <div className="text-xs text-paper-mute leading-relaxed italic border-t border-paper/10 pt-3 mt-3">
                      {currentEntry.note}
                    </div>
                  )}
                </div>
              }
              onCorrect={() => handleGrade("correct")}
              onWrong={() => handleGrade("wrong")}
              hint={`${queue.length} ve frontě · kategorie: ${
                category === "all" ? "všechny" : CATEGORY_LABELS[category]
              }`}
            />
          ) : (
            <EmptyState onReset={handleReset} />
          )}
        </div>
      ) : (
        <BrowseTable entries={filteredEntries} srsState={srsState} />
      )}

      {Object.keys(srsState).length > 0 && (
        <div className="text-center pt-4">
          <button
            onClick={handleReset}
            className="text-xs text-paper-mute hover:text-terracotta-light tracking-[0.2em] uppercase transition-colors"
          >
            Resetovat postup ve slovní zásobě
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

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="text-center py-16 animate-fade-in">
      <div className="greek-mono text-7xl text-olive mb-4">τέλος</div>
      <p className="text-paper-dim mb-2">
        Žádná slova k opakování (nebo nemáš naučená).
      </p>
      <p className="text-sm text-paper-mute">
        Zkus jinou kategorii, nebo{" "}
        <button onClick={onReset} className="text-terracotta-light underline">
          resetuj postup
        </button>
        .
      </p>
    </div>
  );
}

function BrowseTable({
  entries,
  srsState,
}: {
  entries: VocabEntry[];
  srsState: SrsState;
}) {
  const grouped = useMemo(() => {
    const out: Record<string, VocabEntry[]> = {};
    for (const e of entries) {
      if (!out[e.category]) out[e.category] = [];
      out[e.category].push(e);
    }
    return out;
  }, [entries]);

  return (
    <div className="space-y-8 animate-fade-in">
      {Object.entries(grouped).map(([cat, items]) => (
        <div key={cat}>
          <h3 className="text-[10px] tracking-[0.3em] uppercase text-aegean mb-3">
            {CATEGORY_LABELS[cat as VocabCategory]}
          </h3>
          <div className="grid sm:grid-cols-2 gap-2">
            {items.map((e) => {
              const card = srsState[e.id];
              const box = card?.box ?? 0;
              return (
                <div
                  key={e.id}
                  className="flex items-baseline justify-between gap-4 px-4 py-2.5 rounded-lg bg-ink-800/40 border border-paper/5 hover:bg-ink-800 hover:border-paper/15 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-3">
                      <span className="greek-mono text-lg text-paper">
                        {e.greek}
                      </span>
                      <span className="text-xs text-paper-mute font-mono truncate">
                        [{e.translit}]
                      </span>
                    </div>
                    <div className="text-sm text-paper-dim mt-0.5">
                      {e.czech}
                    </div>
                  </div>
                  <BoxBadge box={box} />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function BoxBadge({ box }: { box: number }) {
  const colorMap: Record<number, string> = {
    0: "bg-paper-mute/20 text-paper-mute",
    1: "bg-terracotta/20 text-terracotta-light",
    2: "bg-terracotta-light/20 text-terracotta-light",
    3: "bg-aegean-light/20 text-aegean-light",
    4: "bg-aegean/20 text-aegean-light",
    5: "bg-olive/20 text-olive",
  };
  return (
    <span
      className={`text-[10px] font-mono px-2 py-1 rounded ${colorMap[box]}`}
      title={`Krabice ${box}`}
    >
      {box === 0 ? "—" : `B${box}`}
    </span>
  );
}
