# Ἑλληνικά — Greek Trainer

Tichý, soustředěný trenér moderní řečtiny ve třech vrstvách: **alfabeta**, **frekvenční slovní zásoba** a **gramatická kostra**. Žádná gamifikace, žádné notifikace, žádné maskoti.

Postaveno na Next.js 15 (App Router) + React 19 + TypeScript + Tailwind. Veškerá data jsou statická TS soubory, postup uživatele leží v `localStorage`. Žádná databáze, žádný backend.

---

## Funkce

- **Alfabeta** (`/alphabet`) – 24 písmen + 7 dvojhlásek + 5 digrafů; flashcards s 3D flipem; filtry pro „pasti“ (β, η, υ, ν…)
- **Slovní zásoba** (`/vocabulary`) – 130 slov v 11 frekvenčních kategoriích; obousměrné karty (řecky → česky i naopak); kategorické filtry
- **Gramatika** (`/grammar`) – referenční tabulky: členy, zájmena, είμαι/έχω, dva pravidelné vzory, systém časů a vidu
- **SRS** – Leitnerův box systém s 5 krabicemi (intervaly 1, 2, 4, 7, 14 dní); odděleně pro alfabetu a slovní zásobu
- **Streak tracker** – počítá pouze unikátní dny, vyžaduje řetězec bez přerušení

## Klávesové zkratky

- `Space` / `Enter` – otočit kartu
- `1` / `←` – nevěděl jsem (přesun do krabice 1)
- `2` / `→` – věděl jsem (posun o krabici výš)

---

## Instalace jako PWA (Progressive Web App)

Aplikace je plnohodnotná PWA – po nasazení na HTTPS (Vercel to dělá automaticky) ji můžeš nainstalovat na home screen a funguje **kompletně offline**. Service worker cachuje app shell, Next.js chunks i Google Fonts.

### iOS (Safari)
1. Otevři appku v Safari (jen Safari, Chrome na iOS PWA neumí)
2. Klepni na **Share** ikonu ⎙ (čtverec se šipkou)
3. Vyber **„Add to Home Screen / Přidat na plochu"**
4. App pak funguje fullscreen, bez prohlížečové lišty, s vlastní ikonou

> **Tip:** Po prvním načtení appku v Safari otevři ještě 1× online, aby si SW stihl precachovat všechny stránky. Pak ji můžeš používat v letadle.

### Android (Chrome / Edge / Brave)
1. Otevři appku v prohlížeči
2. Měla by se objevit vlastní install promptka v rohu obrazovky (po ~5 s)
3. Nebo manuálně: menu **⋮ → „Add to Home screen / Install app"**

### Desktop (Chrome / Edge)
1. V adresním řádku se vpravo objeví ikona ⊕
2. Klepni → **Install Greek Trainer**
3. App se otevírá jako samostatné okno bez tabů

### Update flow
SW kontroluje updaty při každém focus tabu. Když najde novou verzi, zobrazí se diskrétní toast „Nová verze k dispozici" → klepneš → SW se aktivuje → stránka se přenačte. Bez force-refresh, bez ztráty postupu (localStorage zůstává).

### Verifikace, že PWA funguje
V Chrome DevTools → **Application** tab:
- **Manifest** sekce → měl bys vidět ikonu, jméno, theme color
- **Service Workers** sekce → status „activated and is running"
- **Lighthouse** → spusť „Progressive Web App" audit → měl bys mít 100 ze 100

---

## Lokální spuštění

```bash
npm install
npm run dev
# otevři http://localhost:3000
```

## Deploy na Vercel

### Možnost A: Git + Vercel UI

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <tvůj-github-repo>
git push -u origin main
```

Pak na [vercel.com/new](https://vercel.com/new):
1. Import repo
2. Framework Preset → Next.js (autodetekce)
3. Deploy

### Možnost B: Vercel CLI (rychlejší)

```bash
npm i -g vercel
vercel
# následuj prompts; první deploy je preview, druhý `vercel --prod` produkce
```

Aplikace je 100 % statická z pohledu Vercelu – žádné env proměnné, žádné API routes, žádné externí závislosti. Build by měl proběhnout za ~30 sekund.

---

## Architektura

```
greek-trainer/
├── app/
│   ├── layout.tsx              # root layout + PWA metadata + SW register
│   ├── manifest.ts             # Next.js native manifest (PWA config)
│   ├── page.tsx                # dashboard se streak + module cards
│   ├── globals.css             # tailwind + custom CSS (3D flip, safe-area)
│   ├── alphabet/page.tsx       # alfabeta trainer
│   ├── vocabulary/page.tsx     # slovní zásoba trainer
│   └── grammar/page.tsx        # gramatika reference
├── components/
│   ├── Nav.tsx                 # sticky top nav
│   ├── FlashCard.tsx           # 3D flip card + keyboard handling
│   ├── StatsBar.tsx            # Leitner box distribution viz
│   ├── SWRegister.tsx          # service worker registration + update UI
│   └── InstallPrompt.tsx       # iOS/Android install prompts
├── public/
│   ├── sw.js                   # service worker (offline caching)
│   ├── icon-192.png            # PWA manifest icon
│   ├── icon-512.png            # PWA manifest icon (high-res)
│   ├── icon-maskable-512.png   # Android adaptive icon
│   ├── apple-touch-icon.png    # iOS home screen icon
│   └── favicon-*.png, favicon.ico
└── lib/
    ├── srs.ts                  # Leitner SRS + localStorage + streak
    └── data/
        ├── alphabet.ts         # 24 + 7 + 5 letter entries
        ├── vocabulary.ts       # 130 vocab entries
        └── grammar.ts          # 5 sections × multiple tables
```

## Customizace

### Přidat slova
Otevři `lib/data/vocabulary.ts` a přidej položku do pole `VOCABULARY`:

```ts
{
  id: "v131",           // unikátní ID (důležité – ID = klíč v SRS)
  greek: "βιβλίο",
  translit: "vivlío",
  czech: "kniha",
  category: "people",   // jedna z existujících kategorií, nebo přidej novou
}
```

### Přidat gramatickou sekci
`lib/data/grammar.ts` má strukturu `GrammarSection → GrammarTable`. Přidej nový objekt do `GRAMMAR_SECTIONS`.

### Změnit SRS intervaly
`lib/srs.ts` → `BOX_INTERVALS_MS`. Standardní Leitner je 1/2/4/7/14 dní, ale můžeš zpřísnit (např. 1/3/7/14/30).

### Změnit barvy / fonty
`tailwind.config.ts` má kompletní paletu (ink/paper/aegean/terracotta/olive). Fonty se loadují přes Google Fonts v `globals.css`.

---

## Designová filozofie

- **Bez gamifikace.** Žádné body, žádné odznáčky, žádný streak shaming. Streak slouží jako diagnostický nástroj, ne motivátor.
- **Dark first.** Tmavá paleta inspirovaná řeckým mořem za soumraku: ink slate, terracotta accent, aegean blue, olive green.
- **Typografie nese obsah.** Greek display: GFS Didot (klasický řecký font). UI: Manrope. Greek letters jsou ve velkém formátu – jsou subjektem, ne dekorací.
- **Žádný backend = žádná friction.** Vše v localStorage, instant load, offline-friendly. Cena: data nepřenosná mezi zařízeními. Vědomý trade-off.

---

## Co tato aplikace nedělá (a proč)

- **Poslech a výslovnost** – pro to je Language Transfer (zdarma) a Greek podcasts. TTS audio by bylo nekvalitní; lepší žádné než špatné.
- **Aktivní psaní řecky** – pro čtenářský cíl je to ztráta času. CS → GR mód existuje jako sanity check, ne primární trénink.
- **Kompletní gramatika** – Holton/Mackridge má 500 stran a je správné místo, kde to vyhledávat. Tahle aplikace dělá kostru, ne referenční manuál.
- **Extenzivní čtení** – to je vrstva 4 metody a vyžaduje autentické texty. Použij LingQ nebo Olly Richards „Short Stories in Greek“.

---

## Roadmap (volitelná)

Pokud bys to chtěl rozšířit:
- [ ] Export / import postupu (JSON dump localStorage)
- [ ] Audio přes Web Speech API (kvalitnější TTS v Chrome)
- [ ] Konjugační drill (vybere náhodný kmen + osobu → tvar)
- [ ] Mini-čítanka 50 vět s parallel CZ/EN translation
- [x] PWA manifest pro „Add to Home Screen" na mobilu
- [x] Service worker s offline cachingem
- [ ] Tmavý/světlý theme toggle

---

## Licence

MIT. Použij, fork, rozšiř, prodej. Bez záruk.
