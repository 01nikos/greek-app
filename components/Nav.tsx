"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Přehled", greek: "Αρχή" },
  { href: "/alphabet", label: "Alfabeta", greek: "Άλφα" },
  { href: "/vocabulary", label: "Slovní zásoba", greek: "Λέξεις" },
  { href: "/grammar", label: "Gramatika", greek: "Γραμματική" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="sticky top-0 z-40 backdrop-blur-xl bg-ink-900/70 border-b border-paper/10">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between gap-6">
        <Link href="/" className="group flex items-center gap-3">
          <span className="greek-mono text-2xl text-terracotta tracking-tighter">
            Ἑλλ.
          </span>
          <span className="text-paper-dim text-xs tracking-[0.2em] uppercase hidden sm:inline">
            Trainer
          </span>
        </Link>
        <ul className="flex items-center gap-1 sm:gap-2">
          {items.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`px-3 py-2 text-sm rounded-md transition-all duration-200 ${
                    active
                      ? "text-paper bg-ink-700"
                      : "text-paper-mute hover:text-paper hover:bg-ink-800"
                  }`}
                >
                  <span className="hidden sm:inline">{item.label}</span>
                  <span className="sm:hidden greek-mono">{item.greek}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
