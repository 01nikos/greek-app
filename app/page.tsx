"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ALPHABET } from "@/lib/data/alphabet";
import { VOCABULARY } from "@/lib/data/vocabulary";
import {
  getBoxDistribution,
  getDueCards,
  loadState,
  loadStreak,
} from "@/lib/srs";

type ModuleStats = {
  total: number;
  due: number;
  learned: number;
  mastered: number;
};

export default function Home() {
  const [alphabetStats, setAlphabetStats] = useState<ModuleStats | null>(null);
  const [vocabStats, setVocabStats] = useState<ModuleStats | null>(null);
  const [streak, setStreak] = useState({
    currentStreak: 0,
    longestStreak: 0,
    totalReviews: 0,
  });

  useEffect(() => {
    const alphaState = loadState("alphabet");
    const alphaIds = ALPHABET.map((l) => l.id);
    const alphaDist = getBoxDistribution(alphaState, alphaIds);
    setAlphabetStats({
      total: alphaIds.length,
      due: getDueCards(alphaState, alphaIds).length,
      learned: alphaIds.length - alphaDist[0],
      mastered: alphaDist[4] + alphaDist[5],
    });

    const vocabState = loadState("vocabulary");
    const vocabIds = VOCABULARY.map((v) => v.id);
    const vocabDist = getBoxDistribution(vocabState, vocabIds);
    setVocabStats({
      total: vocabIds.length,
      due: getDueCards(vocabState, vocabIds).length,
      learned: vocabIds.length - vocabDist[0],
      mastered: vocabDist[4] + vocabDist[5],
    });

    const s = loadStreak();
    setStreak({
      currentStreak: s.currentStreak,
      longestStreak: s.longestStreak,
      totalReviews: s.totalReviews,
    });
  }, []);

  return (
    <div className="space-y-14">
      {/* HERO */}
      <section className="animate-slide-up">
        <div className="flex items-baseline gap-4 mb-3">
          <span className="text-[10px] tracking-[0.3em] uppercase text-aegean">
            νέα ελληνικά
          </span>
          <span className="hairline flex-1" />
        </div>
        <h1 className="greek-mono text-6xl sm:text-8xl font-normal text-paper leading-none tracking-tight">
          Ἑλληνικά
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-paper-dim max-w-2xl leading-relaxed">
          Tři vrstvy moderní řečtiny v jedné aplikaci. Bez gamifikace, bez
          pointů, bez maskotů. Jen{" "}
          <span className="text-paper">písmena</span>,{" "}
          <span className="text-paper">slova</span> a{" "}
          <span className="text-paper">kostra gramatiky</span> – s tichým
          Leitnerovým SRS na pozadí.
        </p>
      </section>

      {/* STREAK */}
      <section className="grid grid-cols-3 gap-4 sm:gap-6 animate-slide-up [animation-delay:120ms]">
        <StreakCard
          number={streak.currentStreak}
          label="dní v řadě"
          accent="terracotta"
        />
        <StreakCard
          number={streak.longestStreak}
          label="nejdelší streak"
          accent="aegean"
        />
        <StreakCard
          number={streak.totalReviews}
          label="celkem opakování"
          accent="olive"
        />
      </section>

      {/* MODULES */}
      <section className="space-y-4 animate-slide-up [animation-delay:240ms]">
        <h2 className="text-xs tracking-[0.3em] uppercase text-paper-mute mb-2">
          Tři vrstvy
        </h2>

        <ModuleCard
          href="/alphabet"
          number="01"
          greek="Α α"
          title="Alfabeta"
          description="24 písmen, 7 dvojhlásek a 5 digrafů. Rate-limiting step pro všechno ostatní. Cíl: 1–2 týdny."
          stats={alphabetStats}
        />
        <ModuleCard
          href="/vocabulary"
          number="02"
          greek="Λέξεις"
          title="Slovní zásoba"
          description="130 nejčastějších slov rozdělených podle kategorií. Top 1000 = 75 % textu. Cíl: 20–30 nových slov denně."
          stats={vocabStats}
        />
        <ModuleCard
          href="/grammar"
          number="03"
          greek="Γραμματική"
          title="Gramatická kostra"
          description="Minimum nutné pro parsing věty: členy, zájmena, είμαι/έχω, dva pravidelné vzory a časový systém. Reference, ne učebnice."
          stats={null}
          isReference
        />
      </section>

      {/* METHOD NOTE */}
      <section className="animate-slide-up [animation-delay:360ms]">
        <div className="border-l-2 border-terracotta/50 pl-5 py-2">
          <p className="text-sm text-paper-dim leading-relaxed">
            <span className="text-terracotta-light font-semibold">
              Inverze – co tady nehledat:
            </span>{" "}
            poslech, mluvení, psaní rukou, gamifikaci, leaderboardy, denní cíle,
            push notifikace. Tahle aplikace dělá tři věci a žádnou jinou. Pro
            extenzivní čtení (vrstva 4) jdi na LingQ nebo Olly Richards „Short
            Stories in Greek“.
          </p>
        </div>
      </section>
    </div>
  );
}

function StreakCard({
  number,
  label,
  accent,
}: {
  number: number;
  label: string;
  accent: "terracotta" | "aegean" | "olive";
}) {
  const colorMap = {
    terracotta: "text-terracotta-light",
    aegean: "text-aegean-light",
    olive: "text-olive",
  };
  return (
    <div className="bg-ink-800/40 border border-paper/5 rounded-xl px-4 py-5 backdrop-blur-sm">
      <div className={`text-4xl sm:text-5xl font-light ${colorMap[accent]} tabular-nums`}>
        {number}
      </div>
      <div className="text-[10px] tracking-[0.2em] uppercase text-paper-mute mt-2">
        {label}
      </div>
    </div>
  );
}

function ModuleCard({
  href,
  number,
  greek,
  title,
  description,
  stats,
  isReference,
}: {
  href: string;
  number: string;
  greek: string;
  title: string;
  description: string;
  stats: ModuleStats | null;
  isReference?: boolean;
}) {
  return (
    <Link
      href={href}
      className="group block border border-paper/10 hover:border-aegean/50 rounded-2xl p-6 sm:p-8 bg-ink-800/30 hover:bg-ink-800/60 transition-all duration-300"
    >
      <div className="flex items-start gap-5 sm:gap-8">
        <div className="hidden sm:flex flex-col items-center gap-2 w-16 flex-shrink-0">
          <span className="text-[10px] tracking-[0.3em] uppercase text-paper-mute">
            {number}
          </span>
          <span className="greek-mono text-3xl text-terracotta-light group-hover:text-terracotta transition-colors">
            {greek}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-4 mb-2">
            <h3 className="text-xl sm:text-2xl font-semibold text-paper tracking-tight">
              {title}
            </h3>
            <span className="text-paper-mute group-hover:text-aegean-light transition-colors text-sm tracking-wider">
              →
            </span>
          </div>
          <p className="text-sm text-paper-dim leading-relaxed mb-4">
            {description}
          </p>

          {isReference ? (
            <div className="text-[10px] tracking-[0.25em] uppercase text-paper-mute">
              Reference · bez SRS
            </div>
          ) : stats ? (
            <div className="flex items-center gap-4 sm:gap-6 text-xs">
              <Pair label="naučeno" value={`${stats.learned}/${stats.total}`} />
              <Pair
                label="zvládnuto"
                value={`${stats.mastered}/${stats.total}`}
              />
              <Pair
                label="k opakování"
                value={`${stats.due}`}
                highlight={stats.due > 0}
              />
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

function Pair({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <div className="text-[10px] tracking-[0.2em] uppercase text-paper-mute">
        {label}
      </div>
      <div
        className={`font-mono tabular-nums text-base mt-0.5 ${
          highlight ? "text-terracotta-light" : "text-paper"
        }`}
      >
        {value}
      </div>
    </div>
  );
}
