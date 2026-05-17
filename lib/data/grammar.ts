export type GrammarTable = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  columns: string[];
  rows: { label: string; cells: string[] }[];
  notes?: string[];
};

export type GrammarSection = {
  id: string;
  title: string;
  intro: string;
  tables: GrammarTable[];
};

export const GRAMMAR_SECTIONS: GrammarSection[] = [
  {
    id: "articles",
    title: "Členy (Άρθρα)",
    intro:
      "Členy jsou páteř řecké věty. Bez nich nepoznáš pád ani rod. Musíš je umět zpaměti – jsou nejčastější slova v celém jazyce.",
    tables: [
      {
        id: "definite-article",
        title: "Určitý člen",
        subtitle: "Singulár (jednotné číslo)",
        description:
          "Tři rody (mužský / ženský / střední). Vzor pro skloňování: pád → tvar.",
        columns: ["Pád", "Mužský", "Ženský", "Střední"],
        rows: [
          { label: "Nominativ (kdo, co)", cells: ["ο", "η", "το"] },
          { label: "Genitiv (koho, čeho)", cells: ["του", "της", "του"] },
          { label: "Akuzativ (koho, co)", cells: ["τον", "την", "το"] },
          { label: "Vokativ (oslovení)", cells: ["—", "—", "—"] },
        ],
        notes: [
          "V moderní řečtině má vokativ formu bez členu (jen Παύλο!).",
          "Akuzativ mužský končí na -ν jen před samohláskou nebo κ, π, τ, ξ, ψ, μπ, ντ, γκ, τσ, τζ.",
        ],
      },
      {
        id: "definite-article-plural",
        title: "Určitý člen",
        subtitle: "Plurál (množné číslo)",
        description: "Forma se mění méně, ale taky znát musíš.",
        columns: ["Pád", "Mužský", "Ženský", "Střední"],
        rows: [
          { label: "Nominativ", cells: ["οι", "οι", "τα"] },
          { label: "Genitiv", cells: ["των", "των", "των"] },
          { label: "Akuzativ", cells: ["τους", "τις", "τα"] },
        ],
        notes: [
          "Genitiv plurálu (των) je shodný pro všechny rody – příjemné zjednodušení.",
        ],
      },
      {
        id: "indefinite-article",
        title: "Neurčitý člen",
        subtitle: "Jen singulár (plurál neurčitý člen v řečtině nemá)",
        description: "Zároveň znamená „jeden / jedna / jedno“.",
        columns: ["Pád", "Mužský", "Ženský", "Střední"],
        rows: [
          { label: "Nominativ", cells: ["ένας", "μία / μια", "ένα"] },
          { label: "Genitiv", cells: ["ενός", "μιας", "ενός"] },
          { label: "Akuzativ", cells: ["έναν", "μία / μια", "ένα"] },
        ],
      },
    ],
  },
  {
    id: "pronouns",
    title: "Osobní zájmena",
    intro:
      "V řečtině se osobní zájmena (já, ty…) ve větě často vynechávají – sloveso samo nese informaci o osobě. Používají se hlavně pro důraz.",
    tables: [
      {
        id: "personal-pronouns",
        title: "Osobní zájmena – silné tvary",
        subtitle: "Pro zdůraznění („JÁ to udělám“)",
        description: "",
        columns: ["Osoba", "Nominativ", "Akuzativ", "Genitiv"],
        rows: [
          { label: "1. sg. (já)", cells: ["εγώ", "εμένα", "εμένα"] },
          { label: "2. sg. (ty)", cells: ["εσύ", "εσένα", "εσένα"] },
          { label: "3. sg. m. (on)", cells: ["αυτός", "αυτόν", "αυτού"] },
          { label: "3. sg. f. (ona)", cells: ["αυτή", "αυτήν", "αυτής"] },
          { label: "3. sg. n. (to)", cells: ["αυτό", "αυτό", "αυτού"] },
          { label: "1. pl. (my)", cells: ["εμείς", "εμάς", "εμάς"] },
          { label: "2. pl. (vy)", cells: ["εσείς", "εσάς", "εσάς"] },
          { label: "3. pl. m. (oni)", cells: ["αυτοί", "αυτούς", "αυτών"] },
          { label: "3. pl. f. (ony)", cells: ["αυτές", "αυτές", "αυτών"] },
          { label: "3. pl. n. (ona)", cells: ["αυτά", "αυτά", "αυτών"] },
        ],
      },
      {
        id: "weak-pronouns",
        title: "Klitická zájmena – slabé tvary",
        subtitle: "Běžnější ve větě, předcházejí sloveso",
        description: "Toto jsou tvary, které potkáš v textu nejčastěji.",
        columns: ["Osoba", "Akuzativ (mě/tě…)", "Genitiv (mi/ti…)"],
        rows: [
          { label: "1. sg.", cells: ["με", "μου"] },
          { label: "2. sg.", cells: ["σε", "σου"] },
          { label: "3. sg. m.", cells: ["τον", "του"] },
          { label: "3. sg. f.", cells: ["την", "της"] },
          { label: "3. sg. n.", cells: ["το", "του"] },
          { label: "1. pl.", cells: ["μας", "μας"] },
          { label: "2. pl.", cells: ["σας", "σας"] },
          { label: "3. pl. m.", cells: ["τους", "τους"] },
          { label: "3. pl. f.", cells: ["τις", "τους"] },
          { label: "3. pl. n.", cells: ["τα", "τους"] },
        ],
        notes: [
          "Pozice: před slovesem v indikativu (μου δίνει = dává mi), za slovesem v imperativu (δώσε μου = dej mi).",
        ],
      },
    ],
  },
  {
    id: "to-be-have",
    title: "Slovesa είμαι (být) a έχω (mít)",
    intro:
      "Dvě nejdůležitější slovesa. είμαι je nepravidelné, έχω se chová podle pravidelného -ω vzoru.",
    tables: [
      {
        id: "eimai-present",
        title: "είμαι — být",
        subtitle: "Přítomný čas",
        description: "Nepravidelné. Musí se naučit zpaměti.",
        columns: ["Osoba", "Tvar", "Překlad"],
        rows: [
          { label: "εγώ", cells: ["είμαι", "jsem"] },
          { label: "εσύ", cells: ["είσαι", "jsi"] },
          { label: "αυτός/ή/ό", cells: ["είναι", "je"] },
          { label: "εμείς", cells: ["είμαστε", "jsme"] },
          { label: "εσείς", cells: ["είστε / είσαστε", "jste"] },
          { label: "αυτοί/ές/ά", cells: ["είναι", "jsou"] },
        ],
      },
      {
        id: "eimai-past",
        title: "είμαι — být",
        subtitle: "Minulý čas (paratatikos)",
        description:
          "Řecký „minulý čas trvalý“. Pro „byl jsem“ ho použiješ skoro vždy.",
        columns: ["Osoba", "Tvar", "Překlad"],
        rows: [
          { label: "εγώ", cells: ["ήμουν / ήμουνα", "byl jsem"] },
          { label: "εσύ", cells: ["ήσουν / ήσουνα", "byl jsi"] },
          { label: "αυτός/ή/ό", cells: ["ήταν / ήτανε", "byl"] },
          { label: "εμείς", cells: ["ήμαστε / ήμασταν", "byli jsme"] },
          { label: "εσείς", cells: ["ήσαστε / ήσασταν", "byli jste"] },
          { label: "αυτοί/ές/ά", cells: ["ήταν / ήτανε", "byli"] },
        ],
      },
      {
        id: "echo-present",
        title: "έχω — mít",
        subtitle: "Přítomný čas (vzor pro pravidelná -ω slovesa)",
        description: "Naučíš se έχω a máš šablonu pro stovky dalších sloves.",
        columns: ["Osoba", "Tvar", "Překlad"],
        rows: [
          { label: "εγώ", cells: ["έχω", "mám"] },
          { label: "εσύ", cells: ["έχεις", "máš"] },
          { label: "αυτός/ή/ό", cells: ["έχει", "má"] },
          { label: "εμείς", cells: ["έχουμε", "máme"] },
          { label: "εσείς", cells: ["έχετε", "máte"] },
          { label: "αυτοί/ές/ά", cells: ["έχουν", "mají"] },
        ],
        notes: [
          "Stejný vzor: γράφω (psát), διαβάζω (číst), τρώω (jíst – mírně nepravidelné), δίνω (dávat).",
        ],
      },
    ],
  },
  {
    id: "regular-verbs",
    title: "Pravidelné sloveso vzoru -ω",
    intro:
      "Většina řeckých sloves končí v 1. osobě singuláru na -ω. Zde je univerzální vzor.",
    tables: [
      {
        id: "regular-pattern",
        title: "Pravidelný vzor -ω",
        subtitle: "Přítomný čas — koncovky",
        description:
          "Vezmi kmen slovesa (γράφ-, διαβάζ-, αγοράζ-) a přidej koncovky.",
        columns: ["Osoba", "Koncovka", "Příklad: γράφω (psát)"],
        rows: [
          { label: "εγώ", cells: ["-ω", "γράφω"] },
          { label: "εσύ", cells: ["-εις", "γράφεις"] },
          { label: "αυτός/ή/ό", cells: ["-ει", "γράφει"] },
          { label: "εμείς", cells: ["-ουμε", "γράφουμε"] },
          { label: "εσείς", cells: ["-ετε", "γράφετε"] },
          { label: "αυτοί/ές/ά", cells: ["-ουν", "γράφουν"] },
        ],
      },
      {
        id: "ao-pattern",
        title: "Druhá konjugace: vzor -άω / -ώ",
        subtitle: "Pro slovesa s přízvukem na koncovce",
        description:
          "Druhý nejčastější vzor. Příklady: αγαπώ (milovat), μιλάω (mluvit), περπατάω (chodit).",
        columns: ["Osoba", "Koncovka", "Příklad: αγαπώ"],
        rows: [
          { label: "εγώ", cells: ["-ώ / -άω", "αγαπώ"] },
          { label: "εσύ", cells: ["-άς", "αγαπάς"] },
          { label: "αυτός/ή/ό", cells: ["-ά / -άει", "αγαπά"] },
          { label: "εμείς", cells: ["-άμε / -ούμε", "αγαπάμε"] },
          { label: "εσείς", cells: ["-άτε", "αγαπάτε"] },
          { label: "αυτοί/ές/ά", cells: ["-ούν / -άνε", "αγαπούν"] },
        ],
      },
    ],
  },
  {
    id: "tenses",
    title: "Časový systém v kostce",
    intro:
      "Řečtina rozlišuje vid (aspekt) ostře jako čeština. Jeden tvar pro průběhové, jeden pro dokonavé.",
    tables: [
      {
        id: "tense-overview",
        title: "Časy a vid",
        subtitle: "Jak vznikají minulé a budoucí časy",
        description: "Zjednodušený přehled. Detaily přijdou s praxí.",
        columns: ["Čas", "Vid", "Tvorba", "Příklad"],
        rows: [
          {
            label: "Přítomný",
            cells: ["průběhový", "kmen + osobní koncovka", "γράφω (píšu)"],
          },
          {
            label: "Paratatikos",
            cells: [
              "průběhový minulý",
              "přízvuk + ε- + minulé koncovky",
              "έγραφα (psal jsem)",
            ],
          },
          {
            label: "Aorist",
            cells: [
              "dokonavý minulý",
              "změna kmene + ε- + koncovky",
              "έγραψα (napsal jsem)",
            ],
          },
          {
            label: "Budoucí průběhový",
            cells: ["průběhový", "θα + přítomný", "θα γράφω (budu psát)"],
          },
          {
            label: "Budoucí dokonavý",
            cells: [
              "dokonavý",
              "θα + aoristický kmen",
              "θα γράψω (napíšu)",
            ],
          },
        ],
        notes: [
          "θα je univerzální znak budoucího času – stačí ho přilepit před sloveso.",
          "Augmentum ε- před kmenem se v minulých časech přidává, když přízvuk padne na třetí slabiku od konce.",
          "Aoristický kmen je nepravidelný – musí se učit společně s každým slovesem (γράφω → έγραψα).",
        ],
      },
    ],
  },
];
