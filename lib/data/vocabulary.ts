export type VocabEntry = {
  id: string;
  greek: string;
  translit: string;
  czech: string;
  category: VocabCategory;
  note?: string;
};

export type VocabCategory =
  | "pronouns"
  | "questions"
  | "greetings"
  | "verbs"
  | "people"
  | "places"
  | "time"
  | "numbers"
  | "food"
  | "adjectives"
  | "connectors";

export const CATEGORY_LABELS: Record<VocabCategory, string> = {
  pronouns: "Zájmena a základ",
  questions: "Tázací slova",
  greetings: "Pozdravy a zdvořilost",
  verbs: "Slovesa",
  people: "Lidé a rodina",
  places: "Místa",
  time: "Čas",
  numbers: "Čísla",
  food: "Jídlo a pití",
  adjectives: "Přídavná jména",
  connectors: "Spojky a předložky",
};

export const VOCABULARY: VocabEntry[] = [
  // PRONOUNS & ESSENTIALS
  { id: "v001", greek: "εγώ", translit: "egó", czech: "já", category: "pronouns" },
  { id: "v002", greek: "εσύ", translit: "esý", czech: "ty", category: "pronouns" },
  { id: "v003", greek: "αυτός", translit: "aftós", czech: "on", category: "pronouns" },
  { id: "v004", greek: "αυτή", translit: "aftí", czech: "ona", category: "pronouns" },
  { id: "v005", greek: "αυτό", translit: "aftó", czech: "to", category: "pronouns" },
  { id: "v006", greek: "εμείς", translit: "emís", czech: "my", category: "pronouns" },
  { id: "v007", greek: "εσείς", translit: "esís", czech: "vy", category: "pronouns" },
  { id: "v008", greek: "ναι", translit: "ne", czech: "ano", category: "pronouns", note: "Pozor – zní jako české „ne“, ale znamená ANO!" },
  { id: "v009", greek: "όχι", translit: "óchi", czech: "ne", category: "pronouns" },

  // QUESTIONS
  { id: "v010", greek: "τι", translit: "ti", czech: "co", category: "questions" },
  { id: "v011", greek: "ποιος", translit: "pjos", czech: "kdo (muž)", category: "questions" },
  { id: "v012", greek: "ποια", translit: "pja", czech: "kdo (žena)", category: "questions" },
  { id: "v013", greek: "πότε", translit: "póte", czech: "kdy", category: "questions" },
  { id: "v014", greek: "πού", translit: "pú", czech: "kde / kam", category: "questions" },
  { id: "v015", greek: "πώς", translit: "pós", czech: "jak", category: "questions" },
  { id: "v016", greek: "πόσο", translit: "póso", czech: "kolik", category: "questions" },
  { id: "v017", greek: "γιατί", translit: "jatí", czech: "proč / protože", category: "questions" },

  // GREETINGS
  { id: "v018", greek: "γεια", translit: "ja", czech: "ahoj / čau", category: "greetings", note: "Univerzální pozdrav (γεια σου / γεια σας)." },
  { id: "v019", greek: "καλημέρα", translit: "kaliméra", czech: "dobré ráno / dobrý den", category: "greetings" },
  { id: "v020", greek: "καλησπέρα", translit: "kalispéra", czech: "dobrý večer", category: "greetings" },
  { id: "v021", greek: "καληνύχτα", translit: "kaliníchta", czech: "dobrou noc", category: "greetings" },
  { id: "v022", greek: "ευχαριστώ", translit: "efcharistó", czech: "děkuji", category: "greetings" },
  { id: "v023", greek: "παρακαλώ", translit: "parakaló", czech: "prosím / není zač", category: "greetings" },
  { id: "v024", greek: "συγγνώμη", translit: "siγnómi", czech: "promiňte / pardon", category: "greetings" },

  // VERBS
  { id: "v025", greek: "είμαι", translit: "íme", czech: "být (jsem)", category: "verbs" },
  { id: "v026", greek: "έχω", translit: "écho", czech: "mít", category: "verbs" },
  { id: "v027", greek: "κάνω", translit: "káno", czech: "dělat", category: "verbs" },
  { id: "v028", greek: "πάω", translit: "páo", czech: "jít / jet", category: "verbs" },
  { id: "v029", greek: "έρχομαι", translit: "érchome", czech: "přicházet", category: "verbs" },
  { id: "v030", greek: "βλέπω", translit: "vlépo", czech: "vidět / dívat se", category: "verbs" },
  { id: "v031", greek: "ακούω", translit: "akúo", czech: "slyšet / poslouchat", category: "verbs" },
  { id: "v032", greek: "ξέρω", translit: "kséro", czech: "vědět / znát", category: "verbs" },
  { id: "v033", greek: "θέλω", translit: "thélo", czech: "chtít", category: "verbs" },
  { id: "v034", greek: "μπορώ", translit: "boró", czech: "moci", category: "verbs" },
  { id: "v035", greek: "λέω", translit: "léo", czech: "říkat", category: "verbs" },
  { id: "v036", greek: "μιλάω", translit: "miláo", czech: "mluvit", category: "verbs" },
  { id: "v037", greek: "τρώω", translit: "tróo", czech: "jíst", category: "verbs" },
  { id: "v038", greek: "πίνω", translit: "píno", czech: "pít", category: "verbs" },
  { id: "v039", greek: "κοιμάμαι", translit: "kimáme", czech: "spát", category: "verbs" },
  { id: "v040", greek: "δουλεύω", translit: "dulévo", czech: "pracovat", category: "verbs" },
  { id: "v041", greek: "διαβάζω", translit: "diavázo", czech: "číst", category: "verbs" },
  { id: "v042", greek: "γράφω", translit: "γráfo", czech: "psát", category: "verbs" },
  { id: "v043", greek: "μένω", translit: "méno", czech: "bydlet / zůstávat", category: "verbs" },
  { id: "v044", greek: "αγαπώ", translit: "aγapó", czech: "milovat", category: "verbs" },
  { id: "v045", greek: "πρέπει", translit: "prépi", czech: "muset (musím)", category: "verbs" },
  { id: "v046", greek: "ζω", translit: "zo", czech: "žít", category: "verbs" },
  { id: "v047", greek: "παίρνω", translit: "pérno", czech: "brát / dostávat", category: "verbs" },
  { id: "v048", greek: "δίνω", translit: "díno", czech: "dávat", category: "verbs" },
  { id: "v049", greek: "αγοράζω", translit: "aγorázo", czech: "kupovat", category: "verbs" },
  { id: "v050", greek: "ξεκινάω", translit: "ksekináo", czech: "začínat", category: "verbs" },

  // PEOPLE
  { id: "v051", greek: "άνθρωπος", translit: "ánthropos", czech: "člověk", category: "people" },
  { id: "v052", greek: "άντρας", translit: "ándras", czech: "muž", category: "people" },
  { id: "v053", greek: "γυναίκα", translit: "jinéka", czech: "žena", category: "people" },
  { id: "v054", greek: "παιδί", translit: "pedí", czech: "dítě", category: "people" },
  { id: "v055", greek: "φίλος", translit: "fílos", czech: "přítel", category: "people" },
  { id: "v056", greek: "φίλη", translit: "fíli", czech: "přítelkyně", category: "people" },
  { id: "v057", greek: "οικογένεια", translit: "ikojénia", czech: "rodina", category: "people" },
  { id: "v058", greek: "μητέρα", translit: "mitéra", czech: "matka", category: "people" },
  { id: "v059", greek: "πατέρας", translit: "patéras", czech: "otec", category: "people" },
  { id: "v060", greek: "αδελφός", translit: "aðelfós", czech: "bratr", category: "people" },
  { id: "v061", greek: "αδελφή", translit: "aðelfí", czech: "sestra", category: "people" },
  { id: "v062", greek: "κορίτσι", translit: "korítsi", czech: "dívka", category: "people" },
  { id: "v063", greek: "αγόρι", translit: "aγóri", czech: "chlapec", category: "people" },

  // PLACES
  { id: "v064", greek: "σπίτι", translit: "spíti", czech: "dům / domov", category: "places" },
  { id: "v065", greek: "δουλειά", translit: "duljá", czech: "práce", category: "places" },
  { id: "v066", greek: "σχολείο", translit: "scholío", czech: "škola", category: "places" },
  { id: "v067", greek: "δρόμος", translit: "ðrómos", czech: "ulice / cesta", category: "places" },
  { id: "v068", greek: "πόλη", translit: "póli", czech: "město", category: "places" },
  { id: "v069", greek: "χωριό", translit: "choriό", czech: "vesnice", category: "places" },
  { id: "v070", greek: "χώρα", translit: "chóra", czech: "země / stát", category: "places" },
  { id: "v071", greek: "κόσμος", translit: "kósmos", czech: "svět", category: "places" },
  { id: "v072", greek: "εστιατόριο", translit: "estiatόrio", czech: "restaurace", category: "places" },
  { id: "v073", greek: "θάλασσα", translit: "thálasa", czech: "moře", category: "places" },
  { id: "v074", greek: "παραλία", translit: "paralía", czech: "pláž", category: "places" },
  { id: "v075", greek: "νησί", translit: "nisí", czech: "ostrov", category: "places" },
  { id: "v076", greek: "βουνό", translit: "vunó", czech: "hora", category: "places" },

  // TIME
  { id: "v077", greek: "χρόνος", translit: "chrónos", czech: "rok / čas", category: "time" },
  { id: "v078", greek: "μήνας", translit: "mínas", czech: "měsíc", category: "time" },
  { id: "v079", greek: "εβδομάδα", translit: "evðomáða", czech: "týden", category: "time" },
  { id: "v080", greek: "μέρα", translit: "méra", czech: "den", category: "time" },
  { id: "v081", greek: "νύχτα", translit: "níchta", czech: "noc", category: "time" },
  { id: "v082", greek: "πρωί", translit: "proí", czech: "ráno", category: "time" },
  { id: "v083", greek: "βράδυ", translit: "vráði", czech: "večer", category: "time" },
  { id: "v084", greek: "ώρα", translit: "óra", czech: "hodina", category: "time" },
  { id: "v085", greek: "σήμερα", translit: "símera", czech: "dnes", category: "time" },
  { id: "v086", greek: "αύριο", translit: "ávrio", czech: "zítra", category: "time" },
  { id: "v087", greek: "χθες", translit: "chthes", czech: "včera", category: "time" },
  { id: "v088", greek: "τώρα", translit: "tóra", czech: "teď", category: "time" },

  // NUMBERS
  { id: "v089", greek: "ένα", translit: "éna", czech: "jeden / jedna", category: "numbers" },
  { id: "v090", greek: "δύο", translit: "ðío", czech: "dva", category: "numbers" },
  { id: "v091", greek: "τρία", translit: "tría", czech: "tři", category: "numbers" },
  { id: "v092", greek: "τέσσερα", translit: "tésera", czech: "čtyři", category: "numbers" },
  { id: "v093", greek: "πέντε", translit: "pénde", czech: "pět", category: "numbers" },
  { id: "v094", greek: "έξι", translit: "éksi", czech: "šest", category: "numbers" },
  { id: "v095", greek: "εφτά", translit: "eftá", czech: "sedm", category: "numbers" },
  { id: "v096", greek: "οχτώ", translit: "ochtó", czech: "osm", category: "numbers" },
  { id: "v097", greek: "εννιά", translit: "enjá", czech: "devět", category: "numbers" },
  { id: "v098", greek: "δέκα", translit: "ðéka", czech: "deset", category: "numbers" },

  // FOOD
  { id: "v099", greek: "ψωμί", translit: "psomí", czech: "chléb", category: "food" },
  { id: "v100", greek: "νερό", translit: "neró", czech: "voda", category: "food" },
  { id: "v101", greek: "κρασί", translit: "krasí", czech: "víno", category: "food" },
  { id: "v102", greek: "καφές", translit: "kafés", czech: "káva", category: "food" },
  { id: "v103", greek: "φαγητό", translit: "fajitó", czech: "jídlo", category: "food" },
  { id: "v104", greek: "κρέας", translit: "kréas", czech: "maso", category: "food" },
  { id: "v105", greek: "ψάρι", translit: "psári", czech: "ryba", category: "food" },
  { id: "v106", greek: "τυρί", translit: "tirí", czech: "sýr", category: "food" },
  { id: "v107", greek: "γάλα", translit: "γála", czech: "mléko", category: "food" },

  // ADJECTIVES
  { id: "v108", greek: "καλός", translit: "kalós", czech: "dobrý", category: "adjectives" },
  { id: "v109", greek: "κακός", translit: "kakós", czech: "špatný", category: "adjectives" },
  { id: "v110", greek: "μεγάλος", translit: "meγálos", czech: "velký", category: "adjectives" },
  { id: "v111", greek: "μικρός", translit: "mikrós", czech: "malý", category: "adjectives" },
  { id: "v112", greek: "ωραίος", translit: "oréos", czech: "krásný / pěkný", category: "adjectives" },
  { id: "v113", greek: "νέος", translit: "néos", czech: "nový / mladý", category: "adjectives" },
  { id: "v114", greek: "παλιός", translit: "paljós", czech: "starý (věc)", category: "adjectives" },
  { id: "v115", greek: "ζεστός", translit: "zestós", czech: "horký / teplý", category: "adjectives" },
  { id: "v116", greek: "κρύος", translit: "kríos", czech: "studený", category: "adjectives" },
  { id: "v117", greek: "εύκολος", translit: "éfkolos", czech: "snadný", category: "adjectives" },
  { id: "v118", greek: "δύσκολος", translit: "ðískolos", czech: "obtížný", category: "adjectives" },
  { id: "v119", greek: "πολύς", translit: "polís", czech: "mnoho / hodně", category: "adjectives" },
  { id: "v120", greek: "λίγος", translit: "líγos", czech: "málo", category: "adjectives" },

  // CONNECTORS
  { id: "v121", greek: "και", translit: "ke", czech: "a", category: "connectors" },
  { id: "v122", greek: "ή", translit: "i", czech: "nebo", category: "connectors" },
  { id: "v123", greek: "αλλά", translit: "alá", czech: "ale", category: "connectors" },
  { id: "v124", greek: "αν", translit: "an", czech: "jestli / pokud", category: "connectors" },
  { id: "v125", greek: "ότι", translit: "óti", czech: "že", category: "connectors" },
  { id: "v126", greek: "σε", translit: "se", czech: "v / na / do", category: "connectors", note: "Univerzální předložka místa a směru." },
  { id: "v127", greek: "από", translit: "apó", czech: "od / z", category: "connectors" },
  { id: "v128", greek: "με", translit: "me", czech: "s", category: "connectors" },
  { id: "v129", greek: "για", translit: "ja", czech: "pro / o", category: "connectors" },
  { id: "v130", greek: "χωρίς", translit: "chorís", czech: "bez", category: "connectors" },
];
