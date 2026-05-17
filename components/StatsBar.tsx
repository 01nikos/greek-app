"use client";

import { BOX_LABELS } from "@/lib/srs";

type Distribution = Record<0 | 1 | 2 | 3 | 4 | 5, number>;

export default function StatsBar({
  distribution,
  total,
  dueCount,
}: {
  distribution: Distribution;
  total: number;
  dueCount: number;
}) {
  const learned = total - distribution[0];
  const mastered = distribution[4] + distribution[5];

  return (
    <div className="w-full space-y-4">
      <div className="grid grid-cols-3 gap-3 text-center">
        <Stat label="Naučeno" value={`${learned}/${total}`} accent="aegean" />
        <Stat label="Zvládnuto" value={`${mastered}/${total}`} accent="olive" />
        <Stat label="K opakování" value={`${dueCount}`} accent="terracotta" />
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[10px] tracking-[0.2em] uppercase text-paper-mute">
          <span>Leitner boxy</span>
          <span>krabice · interval · počet</span>
        </div>
        <div className="grid grid-cols-6 gap-1 h-2">
          <BoxBar count={distribution[0]} total={total} colorClass="bg-paper-mute/40" />
          <BoxBar count={distribution[1]} total={total} colorClass="bg-terracotta/70" />
          <BoxBar count={distribution[2]} total={total} colorClass="bg-terracotta-light/70" />
          <BoxBar count={distribution[3]} total={total} colorClass="bg-aegean-light/70" />
          <BoxBar count={distribution[4]} total={total} colorClass="bg-aegean/80" />
          <BoxBar count={distribution[5]} total={total} colorClass="bg-olive/80" />
        </div>
        <div className="grid grid-cols-6 gap-1 text-[10px] text-paper-mute">
          <BoxLabel n={0} label="nová" count={distribution[0]} />
          <BoxLabel n={1} label={BOX_LABELS[1]} count={distribution[1]} />
          <BoxLabel n={2} label={BOX_LABELS[2]} count={distribution[2]} />
          <BoxLabel n={3} label={BOX_LABELS[3]} count={distribution[3]} />
          <BoxLabel n={4} label={BOX_LABELS[4]} count={distribution[4]} />
          <BoxLabel n={5} label={BOX_LABELS[5]} count={distribution[5]} />
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: "aegean" | "olive" | "terracotta";
}) {
  const colorMap = {
    aegean: "text-aegean-light",
    olive: "text-olive",
    terracotta: "text-terracotta-light",
  };
  return (
    <div className="bg-ink-800/60 border border-paper/5 rounded-lg px-3 py-3">
      <div className="text-[10px] tracking-[0.2em] uppercase text-paper-mute mb-1">
        {label}
      </div>
      <div className={`text-xl font-semibold ${colorMap[accent]} tabular-nums`}>
        {value}
      </div>
    </div>
  );
}

function BoxBar({
  count,
  total,
  colorClass,
}: {
  count: number;
  total: number;
  colorClass: string;
}) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="h-full bg-ink-800 rounded-full overflow-hidden relative">
      <div
        className={`absolute inset-y-0 left-0 transition-all duration-500 ${colorClass}`}
        style={{ width: `${Math.max(pct * 3, count > 0 ? 8 : 0)}%` }}
      />
    </div>
  );
}

function BoxLabel({
  n,
  label,
  count,
}: {
  n: number;
  label: string;
  count: number;
}) {
  return (
    <div className="text-center">
      <div className="font-mono text-paper-dim">{n}</div>
      <div className="text-[9px] truncate">{label}</div>
      <div className="font-mono text-paper">{count}</div>
    </div>
  );
}
