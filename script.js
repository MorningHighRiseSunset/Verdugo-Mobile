// Check if the browser supports the Web Speech API
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US'; // Default to English

  const phoneticMap = {
      'a': 'A', 'ay': 'A', 'ah': 'A', 'alpha': 'A',
      'b': 'B', 'bee': 'B', 'bravo': 'B',
      'c': 'C', 'see': 'C', 'charlie': 'C',
      'd': 'D', 'dee': 'D', 'delta': 'D',
      'e': 'E', 'ee': 'E', 'echo': 'E',
      'f': 'F', 'ef': 'F', 'foxtrot': 'F',
      'g': 'G', 'gee': 'G', 'golf': 'G',
      'h': 'H', 'aitch': 'H', 'hotel': 'H',
      'i': 'I', 'eye': 'I', 'india': 'I',
      'j': 'J', 'jay': 'J', 'juliet': 'J',
      'k': 'K', 'kay': 'K', 'kilo': 'K',
      'l': 'L', 'el': 'L', 'lima': 'L',
      'm': 'M', 'em': 'M', 'mike': 'M',
      'n': 'N', 'en': 'N', 'november': 'N',
      'o': 'O', 'oh': 'O', 'oscar': 'O',
      'p': 'P', 'pee': 'P', 'papa': 'P',
      'q': 'Q', 'cue': 'Q', 'quebec': 'Q',
      'r': 'R', 'ar': 'R', 'romeo': 'R',
      's': 'S', 'es': 'S', 'sierra': 'S',
      't': 'T', 'tee': 'T', 'tango': 'T',
      'u': 'U', 'you': 'U', 'uniform': 'U',
      'v': 'V', 'vee': 'V', 'victor': 'V',
      'w': 'W', 'double-u': 'W', 'whiskey': 'W',
      'x': 'X', 'ex': 'X', 'x-ray': 'X',
      'y': 'Y', 'why': 'Y', 'yankee': 'Y',
      'z': 'Z', 'zee': 'Z', 'zulu': 'Z',
      'á': 'Á', 'é': 'É', 'í': 'Í', 'ó': 'Ó', 'ú': 'Ú', 'ñ': 'Ñ', 'ene': 'Ñ'
  };

  const spanishPhoneticMap = {
      'a': 'A', 'ah': 'A', 'á': 'Á', 'aa': 'A', 'aaa': 'A',
      'be': 'B', 'b': 'B', 'bay': 'B', 'beh': 'B', 'bee': 'B', 'bey': 'B',
      'ce': 'C', 'c': 'C', 'say': 'C', 'seh': 'C', 'see': 'C', 'cee': 'C',
      'che': 'CH', 'ch': 'CH', 'cheh': 'CH', 'chay': 'CH',
      'de': 'D', 'd': 'D', 'day': 'D', 'deh': 'D', 'dee': 'D', 'dah': 'D',
      'e': 'E', 'é': 'É', 'eh': 'E', 'ay': 'E', 'ee': 'E', 'ehh': 'E',
      'efe': 'F', 'f': 'F', 'effe': 'F', 'ef': 'F', 'eff': 'F',
      'ge': 'G', 'g': 'G', 'hey': 'G', 'geh': 'G', 'gee': 'G', 'guh': 'G',
      'hache': 'H', 'h': 'H', 'ahche': 'H', 'ache': 'H', 'hatch': 'H',
      'i': 'I', 'í': 'Í', 'ee': 'I', 'e': 'I', 'eye': 'I', 'aye': 'I',
      'jota': 'J', 'j': 'J', 'hotah': 'J', 'hoh': 'J', 'joh': 'J', 'jay': 'J',
      'ka': 'K', 'k': 'K', 'kah': 'K', 'kay': 'K', 'kaa': 'K',
      'ele': 'L', 'l': 'L', 'elle': 'L', 'el': 'L', 'ell': 'L', 'ellay': 'L',
      'elle': 'LL', 'll': 'LL', 'ehyeh': 'LL', 'elye': 'LL', 'yay': 'LL', 'yey': 'LL',
      'eme': 'M', 'm': 'M', 'emme': 'M', 'em': 'M', 'emm': 'M', 'meh': 'M',
      'ene': 'N', 'n': 'N', 'enne': 'N', 'en': 'N', 'enn': 'N', 'neh': 'N',
      'eñe': 'Ñ', 'ñ': 'Ñ', 'enye': 'Ñ', 'enyeh': 'Ñ', 'ny': 'Ñ', 'nyah': 'Ñ',
      'o': 'O', 'ó': 'Ó', 'oh': 'O', 'oo': 'O', 'owe': 'O', 'aw': 'O',
      'pe': 'P', 'p': 'P', 'pay': 'P', 'peh': 'P', 'pee': 'P', 'puh': 'P', 'p': 'P', 'papa': 'P',
      'cu': 'Q', 'q': 'Q', 'koo': 'Q', 'ku': 'Q', 'cue': 'Q', 'qu': 'Q',
      'erre': 'R', 'r': 'R', 'erreh': 'R', 'er': 'R', 'err': 'R', 'air': 'R',
      'ese': 'S', 's': 'S', 'esse': 'S', 'es': 'S', 'ess': 'S', 'seh': 'S',
      'te': 'T', 't': 'T', 'tay': 'T', 'teh': 'T', 'tee': 'T', 'tuh': 'T',
      'u': 'U', 'ú': 'Ú', 'oo': 'U', 'uh': 'U', 'you': 'U', 'yoo': 'U',
      'uve': 'V', 'v': 'V', 'vay': 'V', 'veh': 'V', 'vee': 'V', 'vuh': 'V',
      'doble ve': 'W', 'w': 'W', 'doble u': 'W', 'doble v': 'W', 'double ve': 'W', 'double u': 'W',
      'equis': 'X', 'x': 'X', 'ehkees': 'X', 'eks': 'X', 'ex': 'X', 'ecks': 'X',
      'i griega': 'Y', 'y': 'Y', 'yeh': 'Y', 'ee griega': 'Y', 'yay': 'Y', 'yuh': 'Y',
      'zeta': 'Z', 'z': 'Z', 'seta': 'Z', 'zeh': 'Z', 'zee': 'Z', 'zed': 'Z'
  };

  let options = {
    "Hangman": [
      {
    word: "seconding",
    definition: "Definition: To agree as a second person to (a proposal), usually to reach a necessary quorum of two. (See under #Etymology 3 for translations.)",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "seconding"
  },
  {
    word: "stiffly",
    definition: "Definition: In a stiff manner.",
    pronunciation: "/ˈstɪfli/",
    englishEquivalent: "stiffly"
  },
  {
    word: "duodecimos",
    definition: "Definition: A size of paper, so called because it is originally made by folding and cutting a single sheet from a printing press into 12 leaves; (5 by 7¾ inches): 6.5 to 7.5 inches high, approximately 4.5 inches wide.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "duodecimos"
  },
  {
    word: "deepwater",
    definition: "Definition: Having a great depth of water.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "deepwater"
  },
  {
    word: "synod",
    definition: "Definition: An ecclesiastic council or meeting to consult on church matters.",
    pronunciation: "/ˈsɪn.əd/",
    englishEquivalent: "synod"
  },
  {
    word: "brant",
    definition: "Definition: Any of several wild geese, of the genus Branta, that breed in the Arctic, but especially the brent goose, Branta bernicla.",
    pronunciation: "/bɹænt/",
    englishEquivalent: "brant"
  },
  {
    word: "underpart",
    definition: "Definition: A lower or underneath part",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "underpart"
  },
  {
    word: "conversazione",
    definition: "Definition: A formal gathering where something related to the arts is discussed.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "conversazione"
  },
  {
    word: "moonshiner",
    definition: "Definition: Someone who makes or distributes moonshine",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "moonshiner"
  },
  {
    word: "toast",
    definition: "Definition: Toasted bread.",
    pronunciation: "/təʊst/",
    englishEquivalent: "toast"
  },
  {
    word: "requiem",
    definition: "Definition: A mass (especially Catholic) to honor and remember a dead person.",
    pronunciation: "/ˈɹɛkwiɛm/",
    englishEquivalent: "requiem"
  },
  {
    word: "hocussing",
    definition: "Definition: To play a trick on, to trick (someone); to hoax; to cheat.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "hocussing"
  },
  {
    word: "sensitivity",
    definition: "Definition: The quality or state of being sensitive; sensitiveness.",
    pronunciation: "/ˌsɛnsɪˈtɪvɪti/",
    englishEquivalent: "sensitivity"
  },
  {
    word: "knight",
    definition: "Definition: A young servant or follower; a trained military attendant in service of a lord.",
    pronunciation: "/naɪt/",
    englishEquivalent: "knight"
  },
  {
    word: "trilobite",
    definition: "Definition: An extinct arthropod of the class Trilobita, whose body had three large lobes.",
    pronunciation: "/ˈtɹaɪ.ləˌbaɪt/",
    englishEquivalent: "trilobite"
  },
  {
    word: "executors",
    definition: "Definition: A person who carries out some task.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "executors"
  },
  {
    word: "briefcase",
    definition: "Definition: A case used for carrying documents, especially for business.",
    pronunciation: "/ˈbɹiːfˌkeɪs/",
    englishEquivalent: "briefcase"
  },
  {
    word: "elaborately",
    definition: "Definition: In an elaborate manner.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "elaborately"
  },
  {
    word: "chieftaincies",
    definition: "Definition: The position or period of rule of a chief.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "chieftaincies"
  },
  {
    word: "railbuses",
    definition: "Definition: A lightweight passenger rail vehicle, similar in appearance to a bus",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "railbuses"
  },
  {
    word: "reticule",
    definition: "Definition: A reticle; a grid in the eyepiece of an instrument.",
    pronunciation: "/ˈɹɛtɪkjuːl/",
    englishEquivalent: "reticule"
  },
  {
    word: "babying",
    definition: "Definition: To coddle; to pamper somebody like an infant.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "babying"
  },
  {
    word: "armiger",
    definition: "Definition: A person entitled to bear a coat of arms.",
    pronunciation: "/ˈɑːmɪdʒə/",
    englishEquivalent: "armiger"
  },
  {
    word: "scepters",
    definition: "Definition: An ornamental staff held by a ruling monarch as a symbol of power.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "scepters"
  },
  {
    word: "monoplane",
    definition: "Definition: An airplane that has a single pair of wings",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "monoplane"
  },
  {
    word: "aluminize",
    definition: "Definition: To coat with a layer of aluminium.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "aluminize"
  },
  {
    word: "restraining",
    definition: "Definition: To control or keep in check.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "restraining"
  },
  {
    word: "delineating",
    definition: "Definition: To sketch out, draw or trace an outline.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "delineating"
  },
  {
    word: "congestion",
    definition: "Definition: The hindrance or blockage of the passage of something, for example a fluid, mixture, traffic, people, etc. (due to an excess of this or due to a partial or complete obstruction), resulting in overfilling or overcrowding.",
    pronunciation: "/kʊnˈd͡ʒɛʃ.d͡ʒən/",
    englishEquivalent: "congestion"
  },
  {
    word: "sumps",
    definition: "Definition: A hollow or pit into which liquid drains, such as a cesspool, cesspit or sink.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sumps"
  },
  {
    word: "waterfowling",
    definition: "Definition: The sport of hunting waterfowl.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "waterfowling"
  },
  {
    word: "loads",
    definition: "Definition: A burden; a weight to be carried.",
    pronunciation: "/ləʊdz/",
    englishEquivalent: "loads"
  },
  {
    word: "checkmates",
    definition: "Definition: The conclusive victory in a game of chess that occurs when an opponent's king is threatened with unavoidable capture.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "checkmates"
  },
  {
    word: "stet",
    definition: "Definition: A symbol used by proofreaders and typesetters to indicate that a word or phrase that was crossed out should still remain.",
    pronunciation: "/stɛt/",
    englishEquivalent: "stet"
  },
  {
    word: "executor",
    definition: "Definition: A person who carries out some task.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "executor"
  },
  {
    word: "onerous",
    definition: "Definition: Imposing or constituting a physical, mental, or figurative load which can be borne only with effort; burdensome.",
    pronunciation: "/ˈɒnəɹəs/",
    englishEquivalent: "onerous"
  },
  {
    word: "manlike",
    definition: "Definition: Of or characteristic of grown men, as opposed to women or children; macho, mannish, virile.",
    pronunciation: "/ˈmanlʌɪk/",
    englishEquivalent: "manlike"
  },
  {
    word: "fine",
    definition: "Definition: Fine champagne; French brandy.",
    pronunciation: "/fæːn/",
    englishEquivalent: "fine"
  },
  {
    word: "formamides",
    definition: "Definition: The amide of formic acid HCO-NH2 or any N-substituted derivative; they are used in the synthesis of pharmaceuticals",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "formamides"
  },
  {
    word: "unimproved",
    definition: "Definition: Not improved",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unimproved"
  },
  {
    word: "woofer",
    definition: "Definition: An electronic speaker that produces low-frequency sound.",
    pronunciation: "/ˈwʊfɚ/",
    englishEquivalent: "woofer"
  },
  {
    word: "sauerbratens",
    definition: "Definition: A German dish of roasted marinated horsemeat or (now more frequently) beef or pork.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sauerbratens"
  },
  {
    word: "flamethrower",
    definition: "Definition: A device that projects a flame for starting fires, and sometimes also additional fuel to help ignition. Used either as a weapon or a tool.",
    pronunciation: "/ˈfleɪmˌθɹoʊ.ɚ/",
    englishEquivalent: "flamethrower"
  },
  {
    word: "hokes",
    definition: "Definition: Something contrived or artificial.",
    pronunciation: "/həʊks/",
    englishEquivalent: "hokes"
  },
  {
    word: "stridulous",
    definition: "Definition: Emitting a particularly harsh or shrill sound.",
    pronunciation: "/ˈstɹɪdjʊləs/",
    englishEquivalent: "stridulous"
  },
  {
    word: "zounds",
    definition: "Definition: (minced oath) Expressing anger, surprise, assertion etc.",
    pronunciation: "/zaʊndz/",
    englishEquivalent: "zounds"
  },
  {
    word: "cervices",
    definition: "Definition: The neck",
    pronunciation: "/ˈsɝvɨˌsiːz/",
    englishEquivalent: "cervices"
  },
  {
    word: "astral",
    definition: "Definition: Relating to or resembling the stars; starry.",
    pronunciation: "/ˈæstɹəl/",
    englishEquivalent: "astral"
  },
  {
    word: "groat",
    definition: "Definition: (chiefly in the plural) Hulled grain.",
    pronunciation: "/ɡɹəʊt/",
    englishEquivalent: "groat"
  },
  {
    word: "babysits",
    definition: "Definition: To watch or tend someone else's child for a period of time, often for money.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "babysits"
  },
  {
    word: "good",
    definition: "Definition: (of people)",
    pronunciation: "/ɡʊ(d)/",
    englishEquivalent: "good"
  },
  {
    word: "ingenues",
    definition: "Definition: An innocent, unsophisticated, naïve, wholesome girl or young woman.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "ingenues"
  },
  {
    word: "salesgirl",
    definition: "Definition: A young woman employed as a salesclerk.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "salesgirl"
  },
  {
    word: "shutoff",
    definition: "Definition: A valve used to turn off something.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "shutoff"
  },
  {
    word: "frees",
    definition: "Definition: Free transfer",
    pronunciation: "/fɹiːz/",
    englishEquivalent: "frees"
  },
  {
    word: "blackbirding",
    definition: "Definition: To enslave someone, especially through chicanery or force",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "blackbirding"
  },
  {
    word: "modiste",
    definition: "Definition: A person who makes or sells fashionable women's clothing, especially dresses or hats.",
    pronunciation: "/məʊˈdiːst/",
    englishEquivalent: "modiste"
  },
  {
    word: "blockading",
    definition: "Definition: To create a blockade against.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "blockading"
  },
  {
    word: "rhubarb",
    definition: "Definition: Any plant of the genus Rheum, especially Rheum rhabarbarum, having large leaves and long green or reddish acidic leafstalks that are edible, in particular when cooked (although the leaves are mildly poisonous).",
    pronunciation: "/ˈɹuːbɑːb/",
    englishEquivalent: "rhubarb"
  },
  {
    word: "homophobe",
    definition: "Definition: A person who is prejudiced against homosexuals and homosexuality.",
    pronunciation: "/[ˈhɒməˌfəʊb]/",
    englishEquivalent: "homophobe"
  },
  {
    word: "unexampled",
    definition: "Definition: Lacking prior examples; unprecedented.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unexampled"
  },
  {
    word: "citral",
    definition: "Definition: Either of a pair of terpenoids, geranial and neral, that have the molecular formula C10H16O and are used in perfumery and flavourings.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "citral"
  },
  {
    word: "chondrite",
    definition: "Definition: A meteorite consisting of rock containing chondrules.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "chondrite"
  },
  {
    word: "stringendo",
    definition: "Definition: A passage in music to be played gradually faster; a section of music with in which the tempo slowly increases.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "stringendo"
  },
  {
    word: "lam",
    definition: "Definition: To beat or thrash.",
    pronunciation: "/læm/",
    englishEquivalent: "lam"
  },
  {
    word: "battleground",
    definition: "Definition: A location where a battle may be fought, or has been fought.",
    pronunciation: "/ˈbætəlˌɡɹaʊnd/",
    englishEquivalent: "battleground"
  },
  {
    word: "colure",
    definition: "Definition: Either of two great circles (meridians) that intersect at the poles and either the equinoxes or solstices.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "colure"
  },
  {
    word: "citing",
    definition: "Definition: To quote; to repeat, as a passage from a book, or the words of another.",
    pronunciation: "/ˈsaɪtɪŋ/",
    englishEquivalent: "citing"
  },
  {
    word: "combiners",
    definition: "Definition: A person who or a thing that combines.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "combiners"
  },
  {
    word: "chevaliers",
    definition: "Definition: A cavalier; a knight.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "chevaliers"
  },
  {
    word: "prithee",
    definition: "Definition: Short for 'I pray thee', i.e. Please.",
    pronunciation: "/ˈpɹɪði/",
    englishEquivalent: "prithee"
  },
  {
    word: "aquatics",
    definition: "Definition: Any aquatic plant.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "aquatics"
  },
  {
    word: "decompose",
    definition: "Definition: To separate or break down something into its components; to disintegrate or fragment",
    pronunciation: "/ˌdiːkəmˈpəʊz/",
    englishEquivalent: "decompose"
  },
  {
    word: "minder",
    definition: "Definition: One who minds, tends, or watches something such as a child, a machine, or cattle; a keeper",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "minder"
  },
  {
    word: "brilliantly",
    definition: "Definition: In a brilliant manner; with brilliance.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "brilliantly"
  },
  {
    word: "sprig",
    definition: "Definition: A small shoot or twig of a tree or other plant; a spray.",
    pronunciation: "/spɹɪɡ/",
    englishEquivalent: "sprig"
  },
  {
    word: "jarheads",
    definition: "Definition: A US marine.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "jarheads"
  },
  {
    word: "previews",
    definition: "Definition: An experience of something in advance.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "previews"
  },
  {
    word: "cancan",
    definition: "Definition: A high-kicking chorus line dance originating in France.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "cancan"
  },
  {
    word: "molting",
    definition: "Definition: A molt; the shedding of skin, feathers, etc.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "molting"
  },
  {
    word: "photophobic",
    definition: "Definition: That thrives at a relatively low light level",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "photophobic"
  },
  {
    word: "refuting",
    definition: "Definition: To prove (something) to be false or incorrect.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "refuting"
  },
  {
    word: "dashed",
    definition: "Definition: To run quickly or for a short distance.",
    pronunciation: "/dæʃt/",
    englishEquivalent: "dashed"
  },
  {
    word: "zetas",
    definition: "Definition: The sixth letter of the modern Greek alphabet (Ζ, ζ) preceded by epsilon (Ε, ε) and followed by eta, (Η, η); or the seventh letter in the ancient Greek alphabet, in which it is preceded by digamma (Ϝ, ϝ)",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "zetas"
  },
  {
    word: "mineralises",
    definition: "Definition: To convert to a mineral; to petrify.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "mineralises"
  },
  {
    word: "thermopiles",
    definition: "Definition: An electronic device that converts thermal energy into electrical energy. Usually constructed using a series-combination of thermocouples",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "thermopiles"
  },
  {
    word: "outranking",
    definition: "Definition: To be of a higher rank than.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "outranking"
  },
  {
    word: "footnoted",
    definition: "Definition: To add footnotes to a text.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "footnoted"
  },
  {
    word: "snitches",
    definition: "Definition: A thief.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "snitches"
  },
  {
    word: "maximises",
    definition: "Definition: To make as large as possible",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "maximises"
  },
  {
    word: "orcs",
    definition: "Definition: Any of several large, ferocious sea creatures, now especially the killer whale.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "orcs"
  },
  {
    word: "concert",
    definition: "Definition: Agreement in a design or plan; union formed by mutual communication of opinions and views; accordance in a scheme; harmony; simultaneous action.",
    pronunciation: "/ˈkɒnsət/",
    englishEquivalent: "concert"
  },
  {
    word: "cowherds",
    definition: "Definition: A person who herds cattle; a cowboy.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "cowherds"
  },
  {
    word: "eggnog",
    definition: "Definition: A beverage based on milk, eggs, sugar, and nutmeg; often made alcoholic with rum, brandy or whisky; popular at Christmas.",
    pronunciation: "/ˈɛɡ.nɒɡ/",
    englishEquivalent: "eggnog"
  },
  {
    word: "cyclopedias",
    definition: "Definition: The circle or compass of the arts and sciences (originally, of the seven so-called liberal arts and sciences); circle of human knowledge.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "cyclopedias"
  },
  {
    word: "unthreading",
    definition: "Definition: To draw or remove a thread from.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unthreading"
  },
  {
    word: "bights",
    definition: "Definition: A corner, bend, or angle; a hollow",
    pronunciation: "/baɪts/",
    englishEquivalent: "bights"
  },
  {
    word: "nohow",
    definition: "Definition: In no way; not at all; by no available means.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "nohow"
  },
  {
    word: "intersected",
    definition: "Definition: To cut into or between; to cut or cross mutually; to divide into parts.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "intersected"
  },
  {
    word: "maximise",
    definition: "Definition: To make as large as possible",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "maximise"
  },
  {
    word: "thiamine",
    definition: "Definition: One of the constituents of vitamin B complex, found in meat, yeast and bran, that is necessary for the metabolism of carbohydrates.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "thiamine"
  },
  {
    word: "heckler",
    definition: "Definition: A worker who separated the coarse part of flax or hemp with a hackle; a flax-dresser",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "heckler"
  },
  {
    word: "meet",
    definition: "Definition: A sports competition, especially for track and field (a track meet) or swimming (a swim meet).",
    pronunciation: "/miːt/",
    englishEquivalent: "meet"
  },
  {
    word: "felicities",
    definition: "Definition: Happiness.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "felicities"
  },
  {
    word: "loosener",
    definition: "Definition: Something that loosens",
    pronunciation: "/ˈluːsn̩.ə(ɹ)/",
    englishEquivalent: "loosener"
  },
  {
    word: "unnumbered",
    definition: "Definition: Not identified with a number",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unnumbered"
  },
  {
    word: "peskier",
    definition: "Definition: Annoying, troublesome, irritating (usually of an animal or child).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "peskier"
  },
  {
    word: "worts",
    definition: "Definition: A plant; herb; vegetable.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "worts"
  },
  {
    word: "beginnings",
    definition: "Definition: The act of doing that which begins anything; commencement of an action, state, or space of time; entrance into being or upon a course; the first act, effort, or state of a succession of acts or states.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "beginnings"
  },
  {
    word: "agonized",
    definition: "Definition: To writhe with agony; to suffer violent anguish.",
    pronunciation: "/ˈæ.ɡən.aɪzd/",
    englishEquivalent: "agonized"
  },
  {
    word: "sodomy",
    definition: "Definition: Any of several forms of sexual intercourse held to be unnatural, particularly bestiality or historically homosexuality, but also (sometimes) anal or oral sex.",
    pronunciation: "/ˈsɒdəmi/",
    englishEquivalent: "sodomy"
  },
  {
    word: "seventieths",
    definition: "Definition: The person or thing in the seventieth position.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "seventieths"
  },
  {
    word: "devoutly",
    definition: "Definition: In a devout manner.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "devoutly"
  },
  {
    word: "trash",
    definition: "Definition: Useless things to be discarded; rubbish; refuse.",
    pronunciation: "/tɹæʃ/",
    englishEquivalent: "trash"
  },
  {
    word: "respecifies",
    definition: "Definition: To specify again; to alter an earlier specification",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "respecifies"
  },
  {
    word: "deepwater",
    definition: "Definition: Having a great depth of water.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "deepwater"
  },
  {
    word: "deposits",
    definition: "Definition: Sediment or rock that is not native to its present location or is different from the surrounding material. Sometimes refers to ore or gems.",
    pronunciation: "/dɪˈpɒzɪts/",
    englishEquivalent: "deposits"
  },
  {
    word: "guys",
    definition: "Definition: An effigy of a man burned on a bonfire on the anniversary of the Gunpowder Plot (5th November).",
    pronunciation: "/ɡaɪz/",
    englishEquivalent: "guys"
  },
  {
    word: "pontiff",
    definition: "Definition: A bishop of the early Church; now specifically, the Pope.",
    pronunciation: "/ˈpɒntɪf/",
    englishEquivalent: "pontiff"
  },
  {
    word: "jolt",
    definition: "Definition: An act of jolting.",
    pronunciation: "/dʒɒlt/",
    englishEquivalent: "jolt"
  },
  {
    word: "tendering",
    definition: "Definition: To make tender or delicate; to weaken.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tendering"
  },
  {
    word: "novelizing",
    definition: "Definition: To adapt something to a fictional form, especially to adapt into a novel.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "novelizing"
  },
  {
    word: "declaim",
    definition: "Definition: To object to something vociferously; to rail against in speech.",
    pronunciation: "/dɪˈkleɪm/",
    englishEquivalent: "declaim"
  },
  {
    word: "axels",
    definition: "Definition: A jump that includes one (or more than one) complete turn and a half turn while in the air.",
    pronunciation: "/ˈæksəlz/",
    englishEquivalent: "axels"
  },
  {
    word: "multitude",
    definition: "Definition: A great amount or number, often of people; abundance, myriad, profusion.",
    pronunciation: "/ˈmʌltɪtjuːd/",
    englishEquivalent: "multitude"
  },
  {
    word: "shriveling",
    definition: "Definition: To collapse inward; to crumble.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "shriveling"
  },
  {
    word: "polymerises",
    definition: "Definition: To convert a monomer to a polymer by polymerization.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "polymerises"
  },
  {
    word: "dalmatic",
    definition: "Definition: Related to Dalmatia and its language and culture; Dalmatian.",
    pronunciation: "/dalˈmatɪk/",
    englishEquivalent: "dalmatic"
  },
  {
    word: "hardhat",
    definition: "Definition: A helmet, usually made from rigid plastic, used on construction sites to protect the head from falling objects.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "hardhat"
  },
  {
    word: "scuppers",
    definition: "Definition: A drainage hole on the deck of a ship.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "scuppers"
  },
  {
    word: "rattlesnakes",
    definition: "Definition: Any of various venomous American snakes, of genera Crotalus and Sistrurus, having a rattle at the end of its tail.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "rattlesnakes"
  },
  {
    word: "dozier",
    definition: "Definition: Quite sleepy or tired.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "dozier"
  },
  {
    word: "lurdanes",
    definition: "Definition: A lazy, stupid person; a sluggard.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "lurdanes"
  },
  {
    word: "damson",
    definition: "Definition: A subspecies of plum tree, Prunus domestica subsp. insititia, native to Eurasia.",
    pronunciation: "/ˈdæmzən/",
    englishEquivalent: "damson"
  },
  {
    word: "sticklers",
    definition: "Definition: A referee or adjudicator at a fight, wrestling match, duel, etc. who ensures fair play.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sticklers"
  },
  {
    word: "homecoming",
    definition: "Definition: The act or event of returning home.",
    pronunciation: "/ˈhoʊmˌkʌmɪŋ/",
    englishEquivalent: "homecoming"
  },
  {
    word: "polynomials",
    definition: "Definition: (strict sense) An expression consisting of a sum of a finite number of terms, each term being the product of a constant coefficient and one or more variables raised to a non-negative integer power, such as a_n x^n + a_{n-1}x^{n-1} + ... + a_0 x^0.",
    pronunciation: "/pɑ.lə.noʊ.mi.l/",
    englishEquivalent: "polynomials"
  },
  {
    word: "boners",
    definition: "Definition: An erect penis.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "boners"
  },
  {
    word: "veena",
    definition: "Definition: A plucked stringed instrument with five or seven steel strings stretched on a long fretted finger-board over two gourds, used mostly in Carnatic Indian classical music.",
    pronunciation: "/ˈviːnə/",
    englishEquivalent: "veena"
  },
  {
    word: "comestibles",
    definition: "Definition: (chiefly in the plural) Anything that can be eaten; food.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "comestibles"
  },
  {
    word: "boughten",
    definition: "Definition: Having been purchased or bought (rather than homemade).",
    pronunciation: "/ˈbɔːtən/",
    englishEquivalent: "boughten"
  },
  {
    word: "oddment",
    definition: "Definition: A part of something that is left over, such as a piece of cloth.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "oddment"
  },
  {
    word: "perfusates",
    definition: "Definition: The fluid used in perfusion",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "perfusates"
  },
  {
    word: "hocusing",
    definition: "Definition: To play a trick on, to trick (someone); to hoax; to cheat.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "hocusing"
  },
  {
    word: "sortied",
    definition: "Definition: To sally.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sortied"
  },
  {
    word: "clippers",
    definition: "Definition: Anything that clips.",
    pronunciation: "/ˈklɪpɹ̩z/",
    englishEquivalent: "clippers"
  },
  {
    word: "studio",
    definition: "Definition: An artist’s or photographer’s workshop or the room in which an artist works.",
    pronunciation: "/ˈstjuːdiəʊ/",
    englishEquivalent: "studio"
  },
  {
    word: "okes",
    definition: "Definition: A deciduous tree with distinctive deeply lobed leaves, acorns, and notably strong wood, typically of England and northeastern North America, included in genus Quercus.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "okes"
  },
  {
    word: "mariculture",
    definition: "Definition: Aquaculture using seawater",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "mariculture"
  },
  {
    word: "desired",
    definition: "Definition: To want; to wish for earnestly.",
    pronunciation: "/dɪˈzaɪəd/",
    englishEquivalent: "desired"
  },
  {
    word: "fanfic",
    definition: "Definition: Fan fiction",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "fanfic"
  },
  {
    word: "addled",
    definition: "Definition: (provincial) To earn, earn by labor; earn money or one's living.",
    pronunciation: "/ˈæ.dəld/",
    englishEquivalent: "addled"
  },
  {
    word: "narthexes",
    definition: "Definition: A western vestibule leading to the nave in some Christian churches.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "narthexes"
  },
  {
    word: "eternised",
    definition: "Definition: To make or render eternal.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "eternised"
  },
  {
    word: "sneer",
    definition: "Definition: A facial expression where one slightly raises one corner of the upper lip, generally indicating scorn.",
    pronunciation: "/snɪə̯/",
    englishEquivalent: "sneer"
  },
  {
    word: "doodlebug",
    definition: "Definition: The V-1 flying bomb.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "doodlebug"
  },
  {
    word: "grandnieces",
    definition: "Definition: A granddaughter of one's sibling; a daughter of one's nephew or niece. (Brother's granddaughter: fraternal grandniece. Sister's granddaughter: sororal grandniece.)",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "grandnieces"
  },
  {
    word: "achondrite",
    definition: "Definition: Any stony meteorite that contains no chondrules",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "achondrite"
  },
  {
    word: "renominating",
    definition: "Definition: To nominate again.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "renominating"
  },
  {
    word: "trued",
    definition: "Definition: To straighten.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "trued"
  },
  {
    word: "overwriting",
    definition: "Definition: To destroy (older data) by recording new data over it.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "overwriting"
  },
  {
    word: "moonsets",
    definition: "Definition: The setting of the moon below the horizon",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "moonsets"
  },
  {
    word: "perique",
    definition: "Definition: A kind of tobacco with medium-sized leaf, small stem, and tough and gummy fiber, raised in Louisiana and cured in its own juices, so as to be very dark in color. It is marketed in tightly wrapped rolls called carottes.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "perique"
  },
  {
    word: "determiners",
    definition: "Definition: (grammar) A member of a class of words functioning in a noun phrase to identify or distinguish a referent without describing or modifying it.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "determiners"
  },
  {
    word: "mandragoras",
    definition: "Definition: Mandrake (genus Mandragora); often specifically mandrake root, traditionally used as a narcotic.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "mandragoras"
  },
  {
    word: "repellents",
    definition: "Definition: Someone who repels.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "repellents"
  },
  {
    word: "gleaned",
    definition: "Definition: To collect (grain, grapes, etc.) left behind after the main harvest or gathering.",
    pronunciation: "/ɡliːnd/",
    englishEquivalent: "gleaned"
  },
  {
    word: "flushing",
    definition: "Definition: To cause to take flight from concealment.",
    pronunciation: "/ˈflʌʃɪŋ/",
    englishEquivalent: "flushing"
  },
  {
    word: "sanctity",
    definition: "Definition: Holiness of life or disposition; saintliness",
    pronunciation: "/ˈsæŋktɪti/",
    englishEquivalent: "sanctity"
  },
  {
    word: "terra",
    definition: "Definition: (astrogeology) A rough upland or mountainous region of the Moon with a relatively high albedo.",
    pronunciation: "/ˈtɛɹə/",
    englishEquivalent: "terra"
  },
  {
    word: "boozers",
    definition: "Definition: One who drinks habitually; a drunkard.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "boozers"
  },
  {
    word: "insanity",
    definition: "Definition: The state of being insane; madness.",
    pronunciation: "/ɪnˈsænɪti/",
    englishEquivalent: "insanity"
  },
  {
    word: "tittuped",
    definition: "Definition: To prance or frolic; of a horse, to canter easily.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tittuped"
  },
  {
    word: "holistic",
    definition: "Definition: Related to holism.",
    pronunciation: "/həʊˈlɪs.tɪk/",
    englishEquivalent: "holistic"
  },
  {
    word: "reveler",
    definition: "Definition: One who attends revels; a partygoer.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "reveler"
  },
  {
    word: "iffiest",
    definition: "Definition: Of dubious authenticity, legitimacy or legality.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "iffiest"
  },
  {
    word: "recrudesces",
    definition: "Definition: To recur, or break out anew after a dormant period.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "recrudesces"
  },
  {
    word: "gasbag",
    definition: "Definition: A bag or bladder to hold a reservoir of gas, as in a hot-air balloon.",
    pronunciation: "/ˈɡæsbæɡ/",
    englishEquivalent: "gasbag"
  },
  {
    word: "dairyman",
    definition: "Definition: A man who works in a dairy.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "dairyman"
  },
  {
    word: "nonissue",
    definition: "Definition: A matter of no concern, especially one that had been of concern.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "nonissue"
  },
  {
    word: "cervices",
    definition: "Definition: The neck",
    pronunciation: "/ˈsɝvɨˌsiːz/",
    englishEquivalent: "cervices"
  },
  {
    word: "thymi",
    definition: "Definition: A ductless gland, consisting mainly of lymphatic tissue, located behind the top of the breastbone. It is most active during puberty, after which it shrinks in size. It plays an important role in the development of the immune system and produces lymphocytes.",
    pronunciation: "/ˈθaɪmaɪ/",
    englishEquivalent: "thymi"
  },
  {
    word: "curtsey",
    definition: "Definition: A small bow, generally performed by a woman or a girl, where she crosses one calf of her leg behind the other and briefly bends her knees and lowers her body in deference.",
    pronunciation: "/ˈkɜːtsɪ/",
    englishEquivalent: "curtsey"
  },
  {
    word: "roping",
    definition: "Definition: To tie (something) with rope.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "roping"
  },
  {
    word: "epochs",
    definition: "Definition: A particular period of history, especially one considered noteworthy or remarkable.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "epochs"
  },
  {
    word: "tailwaters",
    definition: "Definition: The water located immediately downstream from a hydraulic structure, such as a dam, bridge, or culvert.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tailwaters"
  },
  {
    word: "insalubrious",
    definition: "Definition: Unhealthful, not providing or promoting health.",
    pronunciation: "/ɪnsəˈluːbɹɪəs/",
    englishEquivalent: "insalubrious"
  },
  {
    word: "performed",
    definition: "Definition: To do something; to execute.",
    pronunciation: "/pə.ˈfɔːmd/",
    englishEquivalent: "performed"
  },
  {
    word: "burlesque",
    definition: "Definition: A derisive art form that mocks by imitation; a parody.",
    pronunciation: "/bə(ɹ)ˈlɛsk/",
    englishEquivalent: "burlesque"
  },
  {
    word: "capos",
    definition: "Definition: A movable bar placed across the fingerboard of a guitar used to raise the pitch of all strings.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "capos"
  },
  {
    word: "reticulocyte",
    definition: "Definition: An immature red blood cell, having a reticular network of RNA",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "reticulocyte"
  },
  {
    word: "redialled",
    definition: "Definition: To dial again",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "redialled"
  },
  {
    word: "neural",
    definition: "Definition: Of, or relating to the nerves, neurons or the nervous system.",
    pronunciation: "/ˈnjəɹəl/",
    englishEquivalent: "neural"
  },
  {
    word: "relate",
    definition: "Definition: To tell in a descriptive way.",
    pronunciation: "/ɹiˈleɪt/",
    englishEquivalent: "relate"
  },
  {
    word: "pepperboxes",
    definition: "Definition: A peppershaker.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pepperboxes"
  },
  {
    word: "quantified",
    definition: "Definition: Measured",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "quantified"
  },
  {
    word: "episcopate",
    definition: "Definition: Bishops seen as a group.",
    pronunciation: "/ɪˈpɪskəpət/",
    englishEquivalent: "episcopate"
  },
  {
    word: "infolding",
    definition: "Definition: To fold inwards.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "infolding"
  },
  {
    word: "ornithology",
    definition: "Definition: The branch of zoology that deals with the scientific study of birds.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "ornithology"
  },
  {
    word: "syphoned",
    definition: "Definition: To transfer (liquid) by means of a siphon.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "syphoned"
  },
  {
    word: "unconstrained",
    definition: "Definition: Not constrained",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unconstrained"
  },
  {
    word: "tragicomedy",
    definition: "Definition: The genre of drama that combines elements of tragedy and comedy.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tragicomedy"
  },
  {
    word: "draftsman",
    definition: "Definition: A person skilled at drawing engineering or architectural plans.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "draftsman"
  },
  {
    word: "stripteases",
    definition: "Definition: The act of slowly taking off one's clothes to sexually arouse the viewer, often accompanied by music and in exchange for money.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "stripteases"
  },
  {
    word: "podzolize",
    definition: "Definition: To transform into podzol.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "podzolize"
  },
  {
    word: "cornucopias",
    definition: "Definition: A goat's horn endlessly overflowing with fruit, flowers and grain; or full of whatever its owner wanted.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "cornucopias"
  },
  {
    word: "carnivore",
    definition: "Definition: An organism that feeds chiefly on animals; an animal that feeds on meat as the main part of its diet.",
    pronunciation: "/ˈkɑːnɪvɔː/",
    englishEquivalent: "carnivore"
  },
  {
    word: "boustrophedon",
    definition: "Definition: (of writing) Writing that is right-to-left and left-to-right on alternate lines.",
    pronunciation: "/ˌbuːstɹəˈfiːdən/",
    englishEquivalent: "boustrophedon"
  },
  {
    word: "mainlining",
    definition: "Definition: To inject (a drug) directly into a vein.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "mainlining"
  },
  {
    word: "palling",
    definition: "Definition: To cloak or cover with, or as if with, a pall.",
    pronunciation: "/pɔːlɪŋ/",
    englishEquivalent: "palling"
  },
  {
    word: "gambol",
    definition: "Definition: An instance of running or skipping about playfully.",
    pronunciation: "/ˈɡæm.bəl/",
    englishEquivalent: "gambol"
  },
  {
    word: "drugmakers",
    definition: "Definition: A pharmaceutical manufacturer",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "drugmakers"
  },
  {
    word: "overcommitted",
    definition: "Definition: To make excessive commitments, either beyond one's ability or beyond what is reasonable",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "overcommitted"
  },
  {
    word: "neutralise",
    definition: "Definition: To make even, inactive or ineffective.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "neutralise"
  },
  {
    word: "outspreading",
    definition: "Definition: To spread out; expand; extend.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "outspreading"
  },
  {
    word: "paranoiacs",
    definition: "Definition: Somebody who has paranoia, a paranoid person.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "paranoiacs"
  },
  {
    word: "fatheads",
    definition: "Definition: An idiot; a fool.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "fatheads"
  },
  {
    word: "chernozem",
    definition: "Definition: A fertile black soil containing a very high percentage of humus (3% to 15%) and high percentages of phosphoric acids, phosphorus and ammonia.",
    pronunciation: "/ˈt͡ʃɜː(ɹ)nəˌzɛm/",
    englishEquivalent: "chernozem"
  },
  {
    word: "fuji",
    definition: "Definition: A plain spun silk fabric.",
    pronunciation: "/fuːdʒi/",
    englishEquivalent: "fuji"
  },
  {
    word: "apostrophise",
    definition: "Definition: To address using the form of rhetoric called the apostrophe.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "apostrophise"
  },
  {
    word: "incases",
    definition: "Definition: To enclose, as in a case.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "incases"
  },
  {
    word: "editions",
    definition: "Definition: A written work edited and published, as by a certain editor or in a certain manner.",
    pronunciation: "/ɪˈdɪʃənz/",
    englishEquivalent: "editions"
  },
  {
    word: "misguiding",
    definition: "Definition: To guide poorly or incorrectly.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "misguiding"
  },
  {
    word: "autobiography",
    definition: "Definition: A self-written biography; the story of one's own life.",
    pronunciation: "/ˌɔː.tə.baɪˈɒɡ.ɹə.fi/",
    englishEquivalent: "autobiography"
  },
  {
    word: "gentrifies",
    definition: "Definition: To renovate or improve something, especially housing or district, to make it more appealing to the middle classes (often with the negative association of pricing out existing residents)",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "gentrifies"
  },
  {
    word: "inflorescence",
    definition: "Definition: Flower cluster; a group or cluster of flowers arranged on a stem that is composed of a main branch or a complicated arrangement of branches.",
    pronunciation: "/ˌɪnflɔːˈɹɛsəns/",
    englishEquivalent: "inflorescence"
  },
  {
    word: "microfilming",
    definition: "Definition: To reproduce documents on such film",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "microfilming"
  },
  {
    word: "stotin",
    definition: "Definition: A former currency unit of Slovenia, one hundredth of a tolar.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "stotin"
  },
  {
    word: "basketwork",
    definition: "Definition: Material woven in the style of a basket.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "basketwork"
  },
  {
    word: "otherwhere",
    definition: "Definition: In or at some other place.",
    pronunciation: "/ˈʌðəwɛː/",
    englishEquivalent: "otherwhere"
  },
  {
    word: "dickering",
    definition: "Definition: To bargain, haggle or negotiate over a sale.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "dickering"
  },
  {
    word: "punchiest",
    definition: "Definition: Having a punch; effective; forceful; spirited; vigorous.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "punchiest"
  },
  {
    word: "sartorius",
    definition: "Definition: A long, thin muscle that runs down the length of the thigh; the longest muscle in the human body.",
    pronunciation: "/sɑː(ɹ)ˈtɔːɹ.i.əs/",
    englishEquivalent: "sartorius"
  },
  {
    word: "mycosis",
    definition: "Definition: An infection caused by a fungus.",
    pronunciation: "/maɪˈkoʊsɪs/",
    englishEquivalent: "mycosis"
  },
  {
    word: "commissaries",
    definition: "Definition: A store primarily serving persons in an institution, most often soldiers or prisoners.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "commissaries"
  },
  {
    word: "nidification",
    definition: "Definition: The building of a nest.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "nidification"
  },
  {
    word: "word",
    definition: "Definition: The smallest unit of language that has a particular meaning and can be expressed by itself; the smallest discrete, meaningful unit of language. (contrast morpheme.)",
    pronunciation: "/wɜːd/",
    englishEquivalent: "word"
  },
  {
    word: "concessions",
    definition: "Definition: The act of conceding.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "concessions"
  },
  {
    word: "dressage",
    definition: "Definition: The schooling of a horse.",
    pronunciation: "/ˈdɹɛs.ɑːʒ/",
    englishEquivalent: "dressage"
  },
  {
    word: "mouthy",
    definition: "Definition: Overly talkative, insolent, and loud.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "mouthy"
  },
  {
    word: "arthritics",
    definition: "Definition: A person with arthritis.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "arthritics"
  },
  {
    word: "coastward",
    definition: "Definition: Towards the coast",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "coastward"
  },
  {
    word: "duckling",
    definition: "Definition: A young duck.",
    pronunciation: "/ˈdʌklɪŋ/",
    englishEquivalent: "duckling"
  },
  {
    word: "excuse",
    definition: "Definition: Explanation designed to avoid or alleviate guilt or negative judgment; a plea offered in extenuation of a fault.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "excuse"
  },
  {
    word: "trackers",
    definition: "Definition: Agent noun of track; one who, or that which, tracks or pursues, as a man or dog that follows game.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "trackers"
  },
  {
    word: "resuspending",
    definition: "Definition: To undergo (or cause to undergo) resuspension",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "resuspending"
  },
  {
    word: "darkly",
    definition: "Definition: With a dark appearance.",
    pronunciation: "/ˈdɑːkli/",
    englishEquivalent: "darkly"
  },
  {
    word: "preprint",
    definition: "Definition: A preliminary form of a scientific paper that has not yet been published in a journal",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "preprint"
  },
  {
    word: "salpingitis",
    definition: "Definition: Inflammation of the Fallopian tube or the Eustachian tube as a result of infection",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "salpingitis"
  },
  {
    word: "simian",
    definition: "Definition: An ape or monkey, especially an anthropoid.",
    pronunciation: "/ˈsɪm.i.ən/",
    englishEquivalent: "simian"
  },
  {
    word: "anguishes",
    definition: "Definition: Extreme pain, either of body or mind; excruciating distress.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "anguishes"
  },
  {
    word: "downplayed",
    definition: "Definition: To de-emphasize; to present or portray as less important or consequential.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "downplayed"
  },
  {
    word: "pronating",
    definition: "Definition: To turn or rotate one’s hand and forearm so that the palm faces down if the forearm is horizontal, back if the arm is pointing down, or forward if the forearm is pointing up; to twist the right forearm counterclockwise or the left forearm clockwise.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pronating"
  },
  {
    word: "undercut",
    definition: "Definition: A cut made in the lower part of something; the material so removed.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "undercut"
  },
  {
    word: "disowning",
    definition: "Definition: To refuse to own, or to refuse to acknowledge one’s own.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "disowning"
  },
  {
    word: "roads",
    definition: "Definition: A way used for travelling between places, originally one wide enough to allow foot passengers and horses to travel, now (US) usually one surfaced with asphalt or concrete and designed to accommodate many vehicles travelling in both directions. In the UK both senses are heard: a country road is the same as a country lane.",
    pronunciation: "/ɹəʊdz/",
    englishEquivalent: "roads"
  },
  {
    word: "renumber",
    definition: "Definition: To number again, to assign new numbers to.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "renumber"
  },
  {
    word: "francophone",
    definition: "Definition: A person who speaks French, especially as their mother tongue.",
    pronunciation: "/ˈfɹæŋkɒfəʊn/",
    englishEquivalent: "francophone"
  },
  {
    word: "gallinaceous",
    definition: "Definition: Related to the genus Gallus, poultry; notably said of the order Galliformes.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "gallinaceous"
  },
  {
    word: "northern",
    definition: "Definition: An inhabitant of the northern regions.",
    pronunciation: "/ˈnɔːðn̩/",
    englishEquivalent: "northern"
  },
  {
    word: "isothermal",
    definition: "Definition: An isotherm",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "isothermal"
  },
  {
    word: "spaceship",
    definition: "Definition: A vehicle that flies through space.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "spaceship"
  },
  {
    word: "territorial",
    definition: "Definition: A non-professional member of a territorial army.",
    pronunciation: "/ˌtɛ.ɹɪˈtɔː.ɹi.əl/",
    englishEquivalent: "territorial"
  },
  {
    word: "tall",
    definition: "Definition: (possibly nonstandard) Someone or something that is tall.",
    pronunciation: "/tɔːl/",
    englishEquivalent: "tall"
  },
  {
    word: "seriated",
    definition: "Definition: To arrange in serial order.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "seriated"
  },
  {
    word: "bogeys",
    definition: "Definition: One who robs others in a lawless area, especially as part of a group.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "bogeys"
  },
  {
    word: "paths",
    definition: "Definition: A trail for the use of, or worn by, pedestrians.",
    pronunciation: "/pɑːðz/",
    englishEquivalent: "paths"
  },
  {
    word: "shimmering",
    definition: "Definition: To shine with a veiled, tremulous, or intermittent light; to gleam faintly.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "shimmering"
  },
  {
    word: "hands",
    definition: "Definition: The part of the forelimb below the forearm or wrist in a human, and the corresponding part in many other animals.",
    pronunciation: "/hæn(d)z/",
    englishEquivalent: "hands"
  },
  {
    word: "kymograph",
    definition: "Definition: A device that gives a graphical representation of a variation in a phenomenon such as blood pressure over time, using a pen on a rotating drum.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "kymograph"
  },
  {
    word: "gradate",
    definition: "Definition: To change imperceptibly from one gradation of tone etc. to another.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "gradate"
  },
  {
    word: "romping",
    definition: "Definition: To play about roughly, energetically or boisterously.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "romping"
  },
  {
    word: "crude",
    definition: "Definition: Any substance in its natural state.",
    pronunciation: "/kɹʉd/",
    englishEquivalent: "crude"
  },
  {
    word: "recti",
    definition: "Definition: Any of several straight muscles in various parts of the body, as of the abdomen, thigh, eye etc.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "recti"
  },
  {
    word: "pot",
    definition: "Definition: A flat-bottomed vessel (usually metal) used for cooking food.",
    pronunciation: "/pɒt/",
    englishEquivalent: "pot"
  },
  {
    word: "millionth",
    definition: "Definition: The person or thing in the millionth position.",
    pronunciation: "/ˈmɪljənθ/",
    englishEquivalent: "millionth"
  },
  {
    word: "unbraid",
    definition: "Definition: To disentangle the strands of a braid",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unbraid"
  },
  {
    word: "gastric",
    definition: "Definition: Of or relating to the stomach.",
    pronunciation: "/ˈɡæstɹɪk/",
    englishEquivalent: "gastric"
  },
  {
    word: "magnify",
    definition: "Definition: To praise, glorify (someone or something, especially God).",
    pronunciation: "/ˈmaɡnɪfaɪ/",
    englishEquivalent: "magnify"
  },
  {
    word: "siliconized",
    definition: "Definition: Treated or coated with silicone.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "siliconized"
  },
  {
    word: "rebelled",
    definition: "Definition: To resist or become defiant toward an authority.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "rebelled"
  },
  {
    word: "deduce",
    definition: "Definition: To reach a conclusion by applying rules of logic to given premises.",
    pronunciation: "/dɪˈdjuːs/",
    englishEquivalent: "deduce"
  },
  {
    word: "euphuism",
    definition: "Definition: An ornate style of writing (in Elizabethan England) marked by the excessive use of alliteration, antithesis and mythological similes.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "euphuism"
  },
  {
    word: "explicates",
    definition: "Definition: To explain meticulously or in great detail; to elucidate; to analyze.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "explicates"
  },
  {
    word: "reflations",
    definition: "Definition: The act of restoring a deflated general level of prices to a previous or desired level.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "reflations"
  },
  {
    word: "clerking",
    definition: "Definition: To act as a clerk, to perform the duties or functions of a clerk",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "clerking"
  },
  {
    word: "handlists",
    definition: "Definition: A list with very little detail applied to each point.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "handlists"
  },
  {
    word: "cylindric",
    definition: "Definition: Of or relating to cylinders; shaped like a cylinder.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "cylindric"
  },
  {
    word: "subtotal",
    definition: "Definition: The total for a part of a list of numbers being summed.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "subtotal"
  },
  {
    word: "miscopies",
    definition: "Definition: An imperfect copy.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "miscopies"
  },
  {
    word: "blotto",
    definition: "Definition: A person who is (very) drunk or intoxicated.",
    pronunciation: "/ˈblɒtəʊ/",
    englishEquivalent: "blotto"
  },
  {
    word: "semitones",
    definition: "Definition: The musical interval equal (exactly or approximately) to half a tone or one-twelfth of an octave",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "semitones"
  },
  {
    word: "journeys",
    definition: "Definition: A set amount of travelling, seen as a single unit; a discrete trip, a voyage.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "journeys"
  },
  {
    word: "tension",
    definition: "Definition: The condition of being held in a state between two or more forces, which are acting in opposition to each other.",
    pronunciation: "/ˈtɛnʃən/",
    englishEquivalent: "tension"
  },
  {
    word: "firmness",
    definition: "Definition: The state of being firm; strength; permanence; stability; hardness; resolution.",
    pronunciation: "/ˈfɜːmnəs/",
    englishEquivalent: "firmness"
  },
  {
    word: "rising",
    definition: "Definition: To move, or appear to move, physically upwards relative to the ground.",
    pronunciation: "/ˈɹaɪzɪŋ/",
    englishEquivalent: "rising"
  },
  {
    word: "witty",
    definition: "Definition: Wise, having good judgement.",
    pronunciation: "/ˈwɪti/",
    englishEquivalent: "witty"
  },
  {
    word: "demarked",
    definition: "Definition: To demarcate.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "demarked"
  },
  {
    word: "telekinesis",
    definition: "Definition: The ability to move objects with the power of one's mind.",
    pronunciation: "/ˌtɛləkɪˈniːsɪs/",
    englishEquivalent: "telekinesis"
  },
  {
    word: "zig",
    definition: "Definition: A sudden or sharp turn or change of direction.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "zig"
  },
  {
    word: "rearranging",
    definition: "Definition: To change the order or arrangement of (one or more items).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "rearranging"
  },
  {
    word: "steamroller",
    definition: "Definition: A steam-powered heavy road roller",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "steamroller"
  },
  {
    word: "slotted",
    definition: "Definition: To bar, bolt or lock a door or window.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "slotted"
  },
  {
    word: "reflux",
    definition: "Definition: The backwards flow of any fluid.",
    pronunciation: "/ˈɹiː.flʌks/",
    englishEquivalent: "reflux"
  },
  {
    word: "networker",
    definition: "Definition: One who engages in networking",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "networker"
  },
  {
    word: "guests",
    definition: "Definition: A recipient of hospitality, specifically someone staying by invitation at the house of another.",
    pronunciation: "/ɡɛsts/",
    englishEquivalent: "guests"
  },
  {
    word: "moose",
    definition: "Definition: The largest member of the deer family (Alces americanus, sometimes included in Alces alces), of which the male has very large, palmate antlers.",
    pronunciation: "/muːs/",
    englishEquivalent: "moose"
  },
  {
    word: "hoodwinks",
    definition: "Definition: To deceive by disguise; to dupe, bewile, mislead.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "hoodwinks"
  },
  {
    word: "transposons",
    definition: "Definition: A segment of DNA that can move to a different position within a genome.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "transposons"
  },
  {
    word: "relived",
    definition: "Definition: To experience (something) again; to live over again.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "relived"
  },
  {
    word: "twirling",
    definition: "Definition: To perform a twirl.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "twirling"
  },
  {
    word: "treehoppers",
    definition: "Definition: An insect of the family Membracidae.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "treehoppers"
  },
  {
    word: "linkups",
    definition: "Definition: A connection.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "linkups"
  },
  {
    word: "sinfonietta",
    definition: "Definition: A small-scale symphony (either in length or size of orchestra needed).",
    pronunciation: "/sɪnfəʊˈnjɛtə/",
    englishEquivalent: "sinfonietta"
  },
  {
    word: "curdled",
    definition: "Definition: To form curds so that it no longer flows smoothly; to cause to form such curds. (usually said of milk)",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "curdled"
  },
  {
    word: "carioca",
    definition: "Definition: An inhabitant of Rio de Janeiro.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "carioca"
  },
  {
    word: "spicas",
    definition: "Definition: A spike.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "spicas"
  },
  {
    word: "puled",
    definition: "Definition: To whimper or whine.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "puled"
  },
  {
    word: "unevolved",
    definition: "Definition: Not evolved; yet to evolve.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unevolved"
  },
  {
    word: "phosphor",
    definition: "Definition: Any of various compounds of transition metals or of rare earths that exhibit phosphorescence.",
    pronunciation: "/ˈfɒsfə/",
    englishEquivalent: "phosphor"
  },
  {
    word: "crossbow",
    definition: "Definition: A mechanised weapon, based on the bow and arrow, that shoots bolts.",
    pronunciation: "/ˈkɹɒsbəʊ/",
    englishEquivalent: "crossbow"
  },
  {
    word: "pareira",
    definition: "Definition: Chondrodendron tomentosum, a large tropical liana native to Central and South America, and a source of tubocurare.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pareira"
  },
  {
    word: "fractionalized",
    definition: "Definition: To separate into parts or fractions; to fractionate",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "fractionalized"
  },
  {
    word: "overran",
    definition: "Definition: To defeat an enemy and invade in great numbers, seizing the enemy positions conclusively.",
    pronunciation: "/oʊ.vɚ.ɹan/",
    englishEquivalent: "overran"
  },
  {
    word: "barn",
    definition: "Definition: A building, often found on a farm, used for storage or keeping animals such as cattle.",
    pronunciation: "/[baːn]/",
    englishEquivalent: "barn"
  },
  {
    word: "carpetbag",
    definition: "Definition: A traveling bag made from scraps of carpet and used primarily in the United States in the 19th century.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "carpetbag"
  },
  {
    word: "kinged",
    definition: "Definition: To crown king, to make (a person) king.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "kinged"
  },
  {
    word: "lixiviated",
    definition: "Definition: To separate (a substance) into soluble and insoluble components through percolation; to leach.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "lixiviated"
  },
  {
    word: "corkscrewing",
    definition: "Definition: To wind or twist in the manner of a corkscrew; to move with much horizontal and vertical shifting.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "corkscrewing"
  },
  {
    word: "breeds",
    definition: "Definition: All animals or plants of the same species or subspecies.",
    pronunciation: "/bɹiːdz/",
    englishEquivalent: "breeds"
  },
  {
    word: "wormier",
    definition: "Definition: Of or like a worm or worms; shaped like a worm or worms.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "wormier"
  },
  {
    word: "synchrony",
    definition: "Definition: Synchronicity, the state of two or more events occurring at the same time.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "synchrony"
  },
  {
    word: "demonstrations",
    definition: "Definition: The act of demonstrating; showing or explaining something.",
    pronunciation: "/dɛmənˈstɹeɪʃənz/",
    englishEquivalent: "demonstrations"
  },
  {
    word: "jam",
    definition: "Definition: A sweet mixture of fruit boiled with sugar and allowed to congeal. Often spread on bread or toast or used in jam tarts.",
    pronunciation: "/ˈdʒæːm/",
    englishEquivalent: "jam"
  },
  {
    word: "reshowing",
    definition: "Definition: To show again.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "reshowing"
  },
  {
    word: "allomorph",
    definition: "Definition: Any of the different crystalline forms of a substance.",
    pronunciation: "/ˈæl.ə.mɔːf/",
    englishEquivalent: "allomorph"
  },
  {
    word: "androgynous",
    definition: "Definition: Possessing the sex organs of both sexes.",
    pronunciation: "/ænˈdɹɒd͡ʒ.ɪn.əs/",
    englishEquivalent: "androgynous"
  },
  {
    word: "butterballs",
    definition: "Definition: A round lump of a coagulated fat used in cooking such as butter, margarine, or a spread",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "butterballs"
  },
  {
    word: "hemistichs",
    definition: "Definition: An approximate half-line of verse, separated from another by a caesura, often for dramatic effect",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "hemistichs"
  },
  {
    word: "animated",
    definition: "Definition: To impart motion or the appearance of motion to.",
    pronunciation: "/ˈæn.ɪ.meɪ.tɪd/",
    englishEquivalent: "animated"
  },
  {
    word: "hunkier",
    definition: "Definition: Exhibiting strong, masculine beauty.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "hunkier"
  },
  {
    word: "outspent",
    definition: "Definition: To spend more than some limit or than another entity.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "outspent"
  },
  {
    word: "modernizing",
    definition: "Definition: To make (something old or outdated) up to date, or modern in style or function by adding or changing equipment, designs, etc.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "modernizing"
  },
  {
    word: "unnumbered",
    definition: "Definition: Not identified with a number",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unnumbered"
  },
  {
    word: "subsoiler",
    definition: "Definition: A type of plough that loosens the subsoil.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "subsoiler"
  },
  {
    word: "decathlon",
    definition: "Definition: An athletic contest consisting of ten events which includes sprinting, hurdling, jumping, and throwing over a span of two days.",
    pronunciation: "/diːˈkæθlɒn/",
    englishEquivalent: "decathlon"
  },
  {
    word: "derailed",
    definition: "Definition: To cause to come off the tracks.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "derailed"
  },
  {
    word: "proximity",
    definition: "Definition: Closeness; the state of being near as in space, time, or relationship.",
    pronunciation: "/pɹɑkˈsɪ.mɪ.ti/",
    englishEquivalent: "proximity"
  },
  {
    word: "renters",
    definition: "Definition: A male prostitute, typically young and gay.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "renters"
  },
  {
    word: "mudflaps",
    definition: "Definition: A rectangular flap mounted near the wheel of a truck to prevent mud from being thrown up onto the vehicle.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "mudflaps"
  },
  {
    word: "astrakhan",
    definition: "Definition: Closely-curled black or grey fleece of very young karakul lambs from Astrakhan.",
    pronunciation: "/æstɹəˈkæn/",
    englishEquivalent: "astrakhan"
  },
  {
    word: "volvox",
    definition: "Definition: Any of the genus Volvox of chlorophytes.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "volvox"
  },
  {
    word: "urbanizes",
    definition: "Definition: To make something more urban in character.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "urbanizes"
  },
  {
    word: "colocynth",
    definition: "Definition: A viny plant, Citrullus colocynthis, native to the Mediterranean Basin and Asia. It produces a lemon-sized, yellowish, green-mottled, spongy, and extremely bitter fruit.",
    pronunciation: "/kɒl.əˈsɪnθ/",
    englishEquivalent: "colocynth"
  },
  {
    word: "malted",
    definition: "Definition: To convert a cereal grain into malt by causing it to sprout (by soaking in water) and then halting germination (by drying with hot air) in order to develop enzymes that can break down starches and proteins in the grain.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "malted"
  },
  {
    word: "storeyed",
    definition: "Definition: Much talked or written about",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "storeyed"
  },
  {
    word: "curviest",
    definition: "Definition: Having curves.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "curviest"
  },
  {
    word: "grotesques",
    definition: "Definition: A style of ornamentation characterized by fanciful combinations of intertwined forms.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "grotesques"
  },
  {
    word: "mike",
    definition: "Definition: A microphone.",
    pronunciation: "/ˈmaɪk/",
    englishEquivalent: "mike"
  },
  {
    word: "duckwalks",
    definition: "Definition: A type of loaded walk in which the sportsman squats somewhat and steps forward or backward with his knees alternatingly while optionally carrying a dumbbell or kettlebell on each side or a kettlebell or cupped dumbbell between the legs.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "duckwalks"
  },
  {
    word: "talismanic",
    definition: "Definition: Of, relating to, or like, a talisman.",
    pronunciation: "/ˌtælɪzˈmænɪk/",
    englishEquivalent: "talismanic"
  },
  {
    word: "pentamidine",
    definition: "Definition: An antimicrobial medication used to prevent or treat pneumocystosis.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pentamidine"
  },
  {
    word: "quebracho",
    definition: "Definition: Any of several trees of southern South America with produce very hard wood rich in tannin, especially those of the genus Schinopsis.",
    pronunciation: "/kɪˈbɹɑːt͡ʃəʊ/",
    englishEquivalent: "quebracho"
  },
  {
    word: "transfused",
    definition: "Definition: To administer a transfusion of.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "transfused"
  },
  {
    word: "exanthemata",
    definition: "Definition: A widespread rash usually occurring in children.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "exanthemata"
  },
  {
    word: "cataracts",
    definition: "Definition: A waterspout",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "cataracts"
  },
  {
    word: "violas",
    definition: "Definition: A stringed instrument of the violin family, somewhat larger than a violin, played under the chin, and having a deeper tone.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "violas"
  },
  {
    word: "durbar",
    definition: "Definition: A ceremonial gathering held by a ruler in India.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "durbar"
  },
  {
    word: "skyrocketing",
    definition: "Definition: To increase suddenly and extremely; to shoot up; to surge or spike.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "skyrocketing"
  },
  {
    word: "behaviour",
    definition: "Definition: The way a living creature behaves or acts.",
    pronunciation: "/bɪˈheɪvjə/",
    englishEquivalent: "behaviour"
  },
  {
    word: "judgments",
    definition: "Definition: The act of judging.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "judgments"
  },
  {
    word: "mammary",
    definition: "Definition: A mamma (milk-secreting organ of a woman or a female animal).",
    pronunciation: "/ˈmæməɹi/",
    englishEquivalent: "mammary"
  },
  {
    word: "chancery",
    definition: "Definition: In England, formerly, the highest court of judicature next to the Parliament, exercising jurisdiction at law, but chiefly in equity; but under the jurisdiction act of 1873 it became the chancery division of the High Court of Justice, and now exercises jurisdiction only in equity.",
    pronunciation: "/ˈt͡ʃansəɹi/",
    englishEquivalent: "chancery"
  },
  {
    word: "weevers",
    definition: "Definition: Any of the usually brown fish in family Trachinidae, which catch prey by burying themselves in the sand and snatching them as they go past.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "weevers"
  },
  {
    word: "bioregion",
    definition: "Definition: An eco-region.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "bioregion"
  },
  {
    word: "clucked",
    definition: "Definition: To make such a sound.",
    pronunciation: "/klʌkt/",
    englishEquivalent: "clucked"
  },
  {
    word: "simply",
    definition: "Definition: (manner) In a simple way or state; considered in or by itself; without addition; alone.",
    pronunciation: "/ˈsɪmpli/",
    englishEquivalent: "simply"
  },
  {
    word: "biryanis",
    definition: "Definition: A spiced dish of rice, blended with meat and/or vegetables.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "biryanis"
  },
  {
    word: "gouging",
    definition: "Definition: To make a groove, hole, or mark in by scooping with or as if with a gouge.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "gouging"
  },
  {
    word: "pistoled",
    definition: "Definition: To shoot (at) a target with a pistol.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pistoled"
  },
  {
    word: "milder",
    definition: "Definition: Gentle and not easily angered.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "milder"
  },
  {
    word: "admixtures",
    definition: "Definition: An instance of admixing, a mixing in of something.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "admixtures"
  },
  {
    word: "butanes",
    definition: "Definition: A hydrocarbon (either of the two isomers of C4H10 n-butane, and 2-methyl-propane) found in gaseous petroleum fractions.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "butanes"
  },
  {
    word: "outwearing",
    definition: "Definition: To wear out.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "outwearing"
  },
  {
    word: "overpraising",
    definition: "Definition: To praise to an excessive degree.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "overpraising"
  },
  {
    word: "inveighing",
    definition: "Definition: (with against or occasionally about, formerly also with on, at, upon) To complain loudly, to give voice to one's censure or criticism",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "inveighing"
  },
  {
    word: "torque",
    definition: "Definition: A rotational or twisting effect of a force; a moment of force, defined for measurement purposes as an equivalent straight line force multiplied by the distance from the axis of rotation (SI unit newton metre or Nm; imperial unit pound-foot or lb·ft, not to be confused with the foot pound-force, commonly 'foot-pound', a unit of work or energy)",
    pronunciation: "/tɔːk/",
    englishEquivalent: "torque"
  },
  {
    word: "deriving",
    definition: "Definition: To obtain or receive (something) from something else.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "deriving"
  },
  {
    word: "undermining",
    definition: "Definition: To dig underneath (something), to make a passage for destructive or military purposes; to sap.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "undermining"
  },
  {
    word: "maturate",
    definition: "Definition: To bring to ripeness or maturity; to ripen.",
    pronunciation: "/ˈmætjʊɹeɪt/",
    englishEquivalent: "maturate"
  },
  {
    word: "superoxides",
    definition: "Definition: A peroxide",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "superoxides"
  },
  {
    word: "stabilises",
    definition: "Definition: To make stable.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "stabilises"
  },
  {
    word: "ruff",
    definition: "Definition: A circular frill or ruffle on a garment, especially a starched, fluted frill at the neck in Elizabethan and Jacobean England (1560s–1620s).",
    pronunciation: "/ɹʌf/",
    englishEquivalent: "ruff"
  },
  {
    word: "dismayed",
    definition: "Definition: To cause to feel apprehension; great sadness, or fear; to deprive of energy",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "dismayed"
  },
  {
    word: "brownest",
    definition: "Definition: Having a brown colour.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "brownest"
  },
  {
    word: "parishioner",
    definition: "Definition: A member of a parish.",
    pronunciation: "/pəˈɹɪʃnə(ɹ)/",
    englishEquivalent: "parishioner"
  },
  {
    word: "narghiles",
    definition: "Definition: A large Oriental tobacco pipe wherein the smoke is drawn through water to filter and cool it.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "narghiles"
  },
  {
    word: "bison",
    definition: "Definition: A wild ox, Bison bonasus.",
    pronunciation: "/ˈbaɪ̯sən/",
    englishEquivalent: "bison"
  },
  {
    word: "giantesses",
    definition: "Definition: A female giant.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "giantesses"
  },
  {
    word: "outthinking",
    definition: "Definition: To best an opponent by thinking.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "outthinking"
  },
  {
    word: "brushback",
    definition: "Definition: A pitch that comes very close to the batter, forcing them to move back from the plate.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "brushback"
  },
  {
    word: "wort",
    definition: "Definition: A plant; herb; vegetable.",
    pronunciation: "/wɜːt/",
    englishEquivalent: "wort"
  },
  {
    word: "synched",
    definition: "Definition: To synchronize, especially in the senses of data synchronization, time synchronization, or synchronizing music with video.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "synched"
  },
  {
    word: "filigree",
    definition: "Definition: A delicate and intricate ornamentation made from gold or silver (or sometimes other metal) twisted wire.",
    pronunciation: "/ˈfɪl.ɪ.ɡɹiː/",
    englishEquivalent: "filigree"
  },
  {
    word: "inkle",
    definition: "Definition: To hint at; disclose.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "inkle"
  },
  {
    word: "refections",
    definition: "Definition: Mental or spiritual refreshment.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "refections"
  },
  {
    word: "commissaries",
    definition: "Definition: A store primarily serving persons in an institution, most often soldiers or prisoners.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "commissaries"
  },
  {
    word: "dipterocarps",
    definition: "Definition: Any member of the family Dipterocarpaceae of tropical rainforest trees having two-winged fruits",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "dipterocarps"
  },
  {
    word: "schlepps",
    definition: "Definition: To carry, drag, or lug.",
    pronunciation: "/ʃlɛps/",
    englishEquivalent: "schlepps"
  },
  {
    word: "hypocrisies",
    definition: "Definition: The contrivance of a false appearance of virtue or goodness, while concealing real character or inclinations, especially with respect to religious and moral beliefs; hence in general sense, dissimulation, pretence, sham.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "hypocrisies"
  },
  {
    word: "turkey",
    definition: "Definition: The guinea fowl (family Numididae).",
    pronunciation: "/ˈtɜːki/",
    englishEquivalent: "turkey"
  },
  {
    word: "parallel",
    definition: "Definition: One of a set of parallel lines.",
    pronunciation: "/ˈpæɹəˌlɛl/",
    englishEquivalent: "parallel"
  },
  {
    word: "oraches",
    definition: "Definition: The saltbush: any of several plants, of the genus Atriplex, especially Atriplex hortensis or Atriplex patula, found in dry habitats, that have edible leaves resembling spinach.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "oraches"
  },
  {
    word: "probables",
    definition: "Definition: Something that is likely.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "probables"
  },
  {
    word: "waterproofed",
    definition: "Definition: To make waterproof or water-resistant.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "waterproofed"
  },
  {
    word: "encourages",
    definition: "Definition: To mentally support; to motivate, give courage, hope or spirit.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "encourages"
  },
  {
    word: "enchantress",
    definition: "Definition: A woman, especially an attractive one, skilled at using magic; an alluring witch.",
    pronunciation: "/-ɹəs/",
    englishEquivalent: "enchantress"
  },
  {
    word: "burin",
    definition: "Definition: A chisel with a sharp point, used for engraving; a graver.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "burin"
  },
  {
    word: "wormier",
    definition: "Definition: Of or like a worm or worms; shaped like a worm or worms.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "wormier"
  },
  {
    word: "dilettanti",
    definition: "Definition: An amateur, someone who dabbles in a field out of casual interest rather than as a profession or serious interest.",
    pronunciation: "/dɪlɪˈtæntiː/",
    englishEquivalent: "dilettanti"
  },
  {
    word: "expeditionary",
    definition: "Definition: (chiefly in the plural) One who goes on expeditions, especially one who is a member of an expeditionary military force.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "expeditionary"
  },
  {
    word: "sidecars",
    definition: "Definition: A one-wheeled attachment to a motorcycle to allow for a separate seat for a passenger or cargo space.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sidecars"
  },
  {
    word: "blub",
    definition: "Definition: The act of blubbing.",
    pronunciation: "/blʌb/",
    englishEquivalent: "blub"
  },
  {
    word: "inwrapped",
    definition: "Definition: To wrap around, surround; to envelop",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "inwrapped"
  },
  {
    word: "always",
    definition: "Definition: At all times; throughout all time; since the beginning.",
    pronunciation: "/ˈɔː(l).weɪz/",
    englishEquivalent: "always"
  },
  {
    word: "gripping",
    definition: "Definition: To take hold of, particularly with the hand.",
    pronunciation: "/ˈɡɹɪpɪŋ/",
    englishEquivalent: "gripping"
  },
  {
    word: "veracious",
    definition: "Definition: True.",
    pronunciation: "/vɛ.ˈɹeɪ.ʃəs/",
    englishEquivalent: "veracious"
  },
  {
    word: "affluent",
    definition: "Definition: Somebody who is wealthy.",
    pronunciation: "/ˈæf.lu.ənt/",
    englishEquivalent: "affluent"
  },
  {
    word: "bushels",
    definition: "Definition: A dry measure, containing four pecks, eight gallons, or thirty-two quarts.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "bushels"
  },
  {
    word: "scherzando",
    definition: "Definition: A piece of music to be played in a playful or sportive manner.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "scherzando"
  },
  {
    word: "storeys",
    definition: "Definition: A building; an edifice.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "storeys"
  },
  {
    word: "habits",
    definition: "Definition: An action performed on a regular basis.",
    pronunciation: "/ˈhæbɪts/",
    englishEquivalent: "habits"
  },
  {
    word: "encumbrance",
    definition: "Definition: Something that encumbers; a burden that must be carried.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "encumbrance"
  },
  {
    word: "envoys",
    definition: "Definition: A short stanza at the end of a poem, used either to address a person or to comment on the preceding body of the poem.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "envoys"
  },
  {
    word: "sip",
    definition: "Definition: To ooze or pass slowly through pores or other small openings, and in overly small quantities; said of liquids, etc.",
    pronunciation: "/sɪp/",
    englishEquivalent: "sip"
  },
  {
    word: "flaws",
    definition: "Definition: A flake, fragment, or shiver.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "flaws"
  },
  {
    word: "jocose",
    definition: "Definition: Given to jesting; habitually jolly",
    pronunciation: "/dʒəˈkəʊs/",
    englishEquivalent: "jocose"
  },
  {
    word: "underreported",
    definition: "Definition: To report a number falsely, making it smaller than it ought to be, especially to do so intentionally",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "underreported"
  },
  {
    word: "novitiates",
    definition: "Definition: The period during which a novice of a religious order undergoes training",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "novitiates"
  },
  {
    word: "harborside",
    definition: "Definition: An area (especially a residential area) near a harbor (often in the form of converted warehouses etc)",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "harborside"
  },
  {
    word: "grading",
    definition: "Definition: To assign scores to the components of an academic test.",
    pronunciation: "/ˈɡɹeɪdɪŋ/",
    englishEquivalent: "grading"
  },
  {
    word: "virginity",
    definition: "Definition: The state or characteristic of being a virgin.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "virginity"
  },
  {
    word: "secretly",
    definition: "Definition: In secret, covertly.",
    pronunciation: "/ˈsi.kɹət.li/",
    englishEquivalent: "secretly"
  },
  {
    word: "salinometers",
    definition: "Definition: A salimeter.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "salinometers"
  },
  {
    word: "unclamped",
    definition: "Definition: Not clamped.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unclamped"
  },
  {
    word: "expediencies",
    definition: "Definition: The quality of being fit or suitable to effect some desired end or the purpose intended; suitability for particular circumstance or situation.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "expediencies"
  },
  {
    word: "cloverleaves",
    definition: "Definition: (with plural cloverleaves) The leaf of a clover plant",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "cloverleaves"
  },
  {
    word: "metricates",
    definition: "Definition: To express physical quantities using the metric system.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "metricates"
  },
  {
    word: "glory",
    definition: "Definition: Great or overwhelming beauty or splendour.",
    pronunciation: "/ˈɡlo(ː)ɹi/",
    englishEquivalent: "glory"
  },
  {
    word: "statins",
    definition: "Definition: Any of a class of drugs (chiefly lactones or pyrroles) that lower the amount of cholesterol in the blood by inhibiting an enzyme involved in its biosynthesis.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "statins"
  },
  {
    word: "spilth",
    definition: "Definition: A spillage; spilled material.",
    pronunciation: "/spɪlθ/",
    englishEquivalent: "spilth"
  },
  {
    word: "bleeps",
    definition: "Definition: A brief high-pitched sound, as from some electronic device.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "bleeps"
  },
  {
    word: "fossorial",
    definition: "Definition: Any digging animal (such as a mole)",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "fossorial"
  },
  {
    word: "unalloyed",
    definition: "Definition: (of metal) Not alloyed; not in mixture with other metals; pure.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unalloyed"
  },
  {
    word: "pedestaling",
    definition: "Definition: To set or support on (or as if on) a pedestal.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pedestaling"
  },
  {
    word: "kickbacks",
    definition: "Definition: A backward kick, a retrograde movement of an extremity.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "kickbacks"
  },
  {
    word: "multistoried",
    definition: "Definition: Multi-storey.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "multistoried"
  },
  {
    word: "discharger",
    definition: "Definition: Someone or something that discharges something, such as pollution or a firearm",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "discharger"
  },
  {
    word: "tessellations",
    definition: "Definition: The property or fact of tessellating.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tessellations"
  },
  {
    word: "arthrodesis",
    definition: "Definition: The fusion of a joint between two or more bones so that the joint can no longer move.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "arthrodesis"
  },
  {
    word: "seasons",
    definition: "Definition: Each of the four divisions of a year: spring, summer, autumn (fall) and winter",
    pronunciation: "/ˈsiːzn̩z/",
    englishEquivalent: "seasons"
  },
  {
    word: "auburn",
    definition: "Definition: A dark reddish-brown colour, often used to describe hair colour.",
    pronunciation: "/ˈɔ.bɚn/",
    englishEquivalent: "auburn"
  },
  {
    word: "arrays",
    definition: "Definition: Clothing and ornamentation.",
    pronunciation: "/əˈɹeɪz/",
    englishEquivalent: "arrays"
  },
  {
    word: "megaron",
    definition: "Definition: The rectangular great hall in a Mycenaean building, usually supported with pillars.",
    pronunciation: "/ˈmeɡəɹɒn/",
    englishEquivalent: "megaron"
  },
  {
    word: "storied",
    definition: "Definition: Much talked or written about",
    pronunciation: "/ˈstɔːɹid/",
    englishEquivalent: "storied"
  },
  {
    word: "alluvial",
    definition: "Definition: A deposition of sediment over a long period of time by a river; an alluvial layer.",
    pronunciation: "/əˈluː.vi.əl/",
    englishEquivalent: "alluvial"
  },
  {
    word: "ebooks",
    definition: "Definition: (authorship) Electronic book, a book published in electronic form.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "ebooks"
  },
  {
    word: "octyl",
    definition: "Definition: Any of very many isomeric univalent hydrocarbon radicals, C8H17, formally derived from octane by the loss of a hydrogen atom",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "octyl"
  },
  {
    word: "recompiling",
    definition: "Definition: To compile again.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "recompiling"
  },
  {
    word: "ostracises",
    definition: "Definition: To ban a person from a city for five or ten years through the procedure of ostracism.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "ostracises"
  },
  {
    word: "disaffection",
    definition: "Definition: Discontent; unrest.",
    pronunciation: "/dɪsəˈfɛkʃən/",
    englishEquivalent: "disaffection"
  },
  {
    word: "biopsy",
    definition: "Definition: The removal and examination of a sample of tissue, cells, or bodily fluid from a living body for diagnostic purposes.",
    pronunciation: "/ˈbaɪɑpsi/",
    englishEquivalent: "biopsy"
  },
  {
    word: "tulle",
    definition: "Definition: A kind of silk lace or light netting, used for clothing, veils, etc.",
    pronunciation: "/tuːl/",
    englishEquivalent: "tulle"
  },
  {
    word: "peching",
    definition: "Definition: To pant, to struggle for breath.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "peching"
  },
  {
    word: "ducktail",
    definition: "Definition: A hairstyle in which the hair is swept back into an upturned point at the back.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "ducktail"
  },
  {
    word: "minor",
    definition: "Definition: A person who is below the age of majority, consent, criminal responsibility or other adult responsibilities and accountabilities.",
    pronunciation: "/ˈmaɪnɚ/",
    englishEquivalent: "minor"
  },
  {
    word: "outbraves",
    definition: "Definition: To stand out bravely against; to face up to courageously.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "outbraves"
  },
  {
    word: "venue",
    definition: "Definition: A theater, auditorium, arena, or other area designated for sporting or entertainment events.",
    pronunciation: "/ˈvɛnjuː/",
    englishEquivalent: "venue"
  },
  {
    word: "lighted",
    definition: "Definition: To start (a fire).",
    pronunciation: "/ˈlaɪtəd/",
    englishEquivalent: "lighted"
  },
  {
    word: "roman",
    definition: "Definition: One of the main three types used for the Latin alphabet (the others being italics and blackletter), in which the ascenders are mostly straight.",
    pronunciation: "/ˈɹəʊmən/",
    englishEquivalent: "roman"
  },
  {
    word: "supplest",
    definition: "Definition: Pliant, flexible, easy to bend",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "supplest"
  },
  {
    word: "appealing",
    definition: "Definition: To call upon another to decide a question controverted, to corroborate a statement, to vindicate one's rights, etc.",
    pronunciation: "/əˈpiː.lɪŋ/",
    englishEquivalent: "appealing"
  },
  {
    word: "midfielder",
    definition: "Definition: A player who operates behind the attackers and in front of the defence.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "midfielder"
  },
  {
    word: "haplologies",
    definition: "Definition: The process of deleting one of two almost identical syllables within a word.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "haplologies"
  },
  {
    word: "ramshackle",
    definition: "Definition: To ransack.",
    pronunciation: "/ˈɹæmˌʃæk.əl/",
    englishEquivalent: "ramshackle"
  },
  {
    word: "frame",
    definition: "Definition: The structural elements of a building or other constructed object.",
    pronunciation: "/fɹeɪm/",
    englishEquivalent: "frame"
  },
  {
    word: "colatitude",
    definition: "Definition: The complement, in spherical coordinates, of a latitude (the difference between a latitude and 90°).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "colatitude"
  },
  {
    word: "obbligatos",
    definition: "Definition: An obbligato section; a prominent countermelody, often written to be played or sung above the principal theme (in a higher pitch range).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "obbligatos"
  },
  {
    word: "fractionated",
    definition: "Definition: To separate (a mixture) into its individual constituents by exploiting differences in some chemical or physical property, such as boiling point, particle size, solubility etc.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "fractionated"
  },
  {
    word: "faineants",
    definition: "Definition: An irresponsible or lazy person.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "faineants"
  },
  {
    word: "pucker",
    definition: "Definition: A fold or wrinkle.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pucker"
  },
  {
    word: "glomerular",
    definition: "Definition: Of, pertaining to or affecting a glomerulus.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "glomerular"
  },
  {
    word: "coups",
    definition: "Definition: A quick, brilliant, and highly successful act.",
    pronunciation: "/kuːz/",
    englishEquivalent: "coups"
  },
  {
    word: "hollers",
    definition: "Definition: To yell or shout.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "hollers"
  },
  {
    word: "goodness",
    definition: "Definition: The state or characteristic of being good.",
    pronunciation: "/ˈɡʊdnəs/",
    englishEquivalent: "goodness"
  },
  {
    word: "sanitaria",
    definition: "Definition: An institution that treats chronic diseases, and provides supervised recuperation and convalescence.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sanitaria"
  },
  {
    word: "unrecoverable",
    definition: "Definition: Not recoverable; that cannot be recovered.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unrecoverable"
  },
  {
    word: "culled",
    definition: "Definition: To pick or take someone or something (from a larger group).",
    pronunciation: "/kʌld/",
    englishEquivalent: "culled"
  },
  {
    word: "interdigitated",
    definition: "Definition: To fold or lock together, as when the fingers of one hand are laced between those of the other.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "interdigitated"
  },
  {
    word: "regarded",
    definition: "Definition: To look at; to observe.",
    pronunciation: "/ɹɪˈɡɑːdɪd/",
    englishEquivalent: "regarded"
  },
  {
    word: "dreamy",
    definition: "Definition: As in a dream; resembling a dream.",
    pronunciation: "/ˈdɹiː.mi/",
    englishEquivalent: "dreamy"
  },
  {
    word: "pittances",
    definition: "Definition: A small allowance of food and drink; a scanty meal.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pittances"
  },
  {
    word: "praiseworthy",
    definition: "Definition: Meriting praise; worthy of high praise",
    pronunciation: "/ˈpɹeɪz.wɜː.ði/",
    englishEquivalent: "praiseworthy"
  },
  {
    word: "bushpig",
    definition: "Definition: An African pig of the genus Potamochoerus; Potamochoerus porcus or Potamochoerus larvatus.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "bushpig"
  },
  {
    word: "lacewings",
    definition: "Definition: Any of a number of gauzy-winged insects of certain families within the order Neuroptera.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "lacewings"
  },
  {
    word: "reverses",
    definition: "Definition: The opposite of something.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "reverses"
  },
  {
    word: "snapper",
    definition: "Definition: One who, or that which, snaps.",
    pronunciation: "/ˈsnæpɚ/",
    englishEquivalent: "snapper"
  },
  {
    word: "dipsos",
    definition: "Definition: A dipsomaniac; an alcoholic; a drunk.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "dipsos"
  },
  {
    word: "misprizes",
    definition: "Definition: To despise or hold in contempt; to undervalue.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "misprizes"
  },
  {
    word: "sostenutos",
    definition: "Definition: A note or passage marked to be sustained",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sostenutos"
  },
  {
    word: "buries",
    definition: "Definition: To ritualistically inter in a grave or tomb.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "buries"
  },
  {
    word: "disclaimer",
    definition: "Definition: One who disclaims, disowns, or renounces.",
    pronunciation: "/dɪsˈkleɪm.ə/",
    englishEquivalent: "disclaimer"
  },
  {
    word: "frigging",
    definition: "Definition: To fidget, to wriggle around",
    pronunciation: "/ˈfɹɪɡɪŋ/",
    englishEquivalent: "frigging"
  },
  {
    word: "mechanism",
    definition: "Definition: (within a machine or machinery) Any mechanical means for the conversion or control of motion, or the transmission or control of power.",
    pronunciation: "/ˈmɛkənɪzm/",
    englishEquivalent: "mechanism"
  },
  {
    word: "ichneumons",
    definition: "Definition: The Egyptian mongoose, Herpestes ichneumon, found in Africa and southern Europe.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "ichneumons"
  },
  {
    word: "pteranodons",
    definition: "Definition: A member of Pteranodon, a genus of large pterosaurs, the males of which had a bony crest on the back of the head.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pteranodons"
  },
  {
    word: "episodic",
    definition: "Definition: Relating to an episode",
    pronunciation: "/ˌɛpɪˈsɑdɪk/",
    englishEquivalent: "episodic"
  },
  {
    word: "boffed",
    definition: "Definition: To have sexual intercourse (with someone)",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "boffed"
  },
  {
    word: "postmen",
    definition: "Definition: Someone (implied male) who delivers the post (mail) to, and/or collects the post from, residential or commercial addresses, or from public mailboxes.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "postmen"
  },
  {
    word: "gastrulae",
    definition: "Definition: A stage in the development of embryos of most animals consisting of a three-layered sac of ectoderm, mesoderm and endoderm.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "gastrulae"
  },
  {
    word: "fluorescents",
    definition: "Definition: A fluorescent light.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "fluorescents"
  },
  {
    word: "flowmeter",
    definition: "Definition: Any of various devices used to measure the flow of a fluid through a pipe, etc.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "flowmeter"
  },
  {
    word: "ceremony",
    definition: "Definition: A ritual, with religious or cultural significance.",
    pronunciation: "/ˈsɛɹɪməni/",
    englishEquivalent: "ceremony"
  },
  {
    word: "fussiest",
    definition: "Definition: Anxious or particular about petty details.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "fussiest"
  },
  {
    word: "cautious",
    definition: "Definition: Careful; using or exercising caution; tentative",
    pronunciation: "/ˈkɔːʃəs/",
    englishEquivalent: "cautious"
  },
  {
    word: "woolshed",
    definition: "Definition: A shed where sheep are shorn.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "woolshed"
  },
  {
    word: "sculptors",
    definition: "Definition: A person who sculpts; an artist who produces sculpture.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sculptors"
  },
  {
    word: "punish",
    definition: "Definition: To cause to suffer for crime or misconduct, to administer disciplinary action.",
    pronunciation: "/ˈpʌnɪʃ/",
    englishEquivalent: "punish"
  },
  {
    word: "al",
    definition: "Definition: The Indian mulberry, Morinda citrifolia, especially as used to make dye.",
    pronunciation: "/æl/",
    englishEquivalent: "al"
  },
  {
    word: "progestins",
    definition: "Definition: A synthetic progestagen intended to mimic the effects of progesterone, often for contraceptive purposes.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "progestins"
  },
  {
    word: "omnipotence",
    definition: "Definition: Unlimited power; commonly attributed to a deity or deities.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "omnipotence"
  },
  {
    word: "denigrating",
    definition: "Definition: To criticise so as to besmirch; traduce, disparage or defame.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "denigrating"
  },
  {
    word: "apostle",
    definition: "Definition: A missionary, or leader of a religious mission, especially one in the early Christian Church (but see Apostle).",
    pronunciation: "/əˈpɒs(ə)l/",
    englishEquivalent: "apostle"
  },
  {
    word: "bohrium",
    definition: "Definition: A transuranic chemical element (symbol Bh) with an atomic number of 107.",
    pronunciation: "/ˈbɔːɹiəm/",
    englishEquivalent: "bohrium"
  },
  {
    word: "vestryman",
    definition: "Definition: A member of a parochial vestry",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "vestryman"
  },
  {
    word: "goldbricks",
    definition: "Definition: Something fraudulent or nonexistent offered for sale; a swindle or con.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "goldbricks"
  },
  {
    word: "circumambient",
    definition: "Definition: Including all aspects of; encompassing.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "circumambient"
  },
  {
    word: "intonating",
    definition: "Definition: To intone or recite (words), especially emphatically or in a chanting manner.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "intonating"
  },
  {
    word: "chiliasts",
    definition: "Definition: One who believes that Jesus will reign over Earth for a thousand years.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "chiliasts"
  },
  {
    word: "madame",
    definition: "Definition: A polite form of address for a woman or lady.",
    pronunciation: "/məˈdɑːm/",
    englishEquivalent: "madame"
  },
  {
    word: "overblown",
    definition: "Definition: To cover with blossoms or flowers.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "overblown"
  },
  {
    word: "eaters",
    definition: "Definition: One who eats.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "eaters"
  },
  {
    word: "format",
    definition: "Definition: The layout of a publication or document.",
    pronunciation: "/ˈfɔː(ɹ).mæt/",
    englishEquivalent: "format"
  },
  {
    word: "proctor",
    definition: "Definition: A person who supervises students as they take an examination, in the United States at the college/university level; often the department secretary, or a fellow/graduate student; an invigilator.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "proctor"
  },
  {
    word: "tragi",
    definition: "Definition: The small piece of thick cartilage of the external ear that is immediately in front of the ear canal.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tragi"
  },
  {
    word: "peroxiding",
    definition: "Definition: To treat (something) with hydrogen peroxide, especially hair in order to bleach it",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "peroxiding"
  },
  {
    word: "lucked",
    definition: "Definition: To succeed by chance.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "lucked"
  },
  {
    word: "petards",
    definition: "Definition: A small, hat-shaped explosive device, used to breach a door or wall.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "petards"
  },
  {
    word: "lithology",
    definition: "Definition: The study of rocks, with particular emphasis on their description and classification.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "lithology"
  },
  {
    word: "phraseology",
    definition: "Definition: Study of set or fixed expressions.",
    pronunciation: "/fɹeɪziˈɒlədʒɪ/",
    englishEquivalent: "phraseology"
  },
  {
    word: "damaging",
    definition: "Definition: To impair the soundness, goodness, or value of; to harm or cause destruction.",
    pronunciation: "/ˈdæmɪdʒɪŋ/",
    englishEquivalent: "damaging"
  },
  {
    word: "recharging",
    definition: "Definition: To charge an electric battery after its power has been consumed.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "recharging"
  },
  {
    word: "traipses",
    definition: "Definition: A long or tiring walk.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "traipses"
  },
  {
    word: "footloose",
    definition: "Definition: Tending to travel or do as one pleases; readily without many commitments or responsibility.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "footloose"
  },
  {
    word: "whitewall",
    definition: "Definition: A tyre/tire with white sidewalls.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "whitewall"
  },
  {
    word: "keypunching",
    definition: "Definition: To use such a device or machine",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "keypunching"
  },
  {
    word: "trustier",
    definition: "Definition: Reliable or trustworthy.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "trustier"
  },
  {
    word: "imp",
    definition: "Definition: A small, mischievous sprite, or a malevolent supernatural creature, somewhat comparable to a demon but smaller and less powerful.",
    pronunciation: "/ɪmp/",
    englishEquivalent: "imp"
  },
  {
    word: "upreared",
    definition: "Definition: To raise something up; to rise up; to erect",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "upreared"
  },
  {
    word: "siliqua",
    definition: "Definition: A weight of four grains; a carat.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "siliqua"
  },
  {
    word: "resumed",
    definition: "Definition: To take back possession of (something).",
    pronunciation: "/ɹɪˈzjuːmd/",
    englishEquivalent: "resumed"
  },
  {
    word: "selfishly",
    definition: "Definition: In a selfish manner; with regard to private interest only or chiefly.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "selfishly"
  },
  {
    word: "pericarps",
    definition: "Definition: The outermost layer, or skin, of a ripe fruit or ovary.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pericarps"
  },
  {
    word: "subantarctic",
    definition: "Definition: Pertaining to a region in the Southern Hemisphere immediately north of Antarctica and covering the many islands of the southern parts of the Indian Ocean, Atlantic Ocean and Pacific Ocean, which are north of the Antarctic Convergence.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "subantarctic"
  },
  {
    word: "greenbelt",
    definition: "Definition: An area of agricultural land around an urban area that is protected from large-scale housing",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "greenbelt"
  },
  {
    word: "knighted",
    definition: "Definition: To confer knighthood upon.",
    pronunciation: "/ˈnaɪtɪd/",
    englishEquivalent: "knighted"
  },
  {
    word: "component",
    definition: "Definition: A smaller, self-contained part of a larger entity. Often refers to a manufactured object that is part of a larger device.",
    pronunciation: "/kʌmˈpoʊnənt/",
    englishEquivalent: "component"
  },
  {
    word: "portobellos",
    definition: "Definition: The large, mature form of the crimini mushroom (Agaricus bisporus)",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "portobellos"
  },
  {
    word: "damaging",
    definition: "Definition: To impair the soundness, goodness, or value of; to harm or cause destruction.",
    pronunciation: "/ˈdæmɪdʒɪŋ/",
    englishEquivalent: "damaging"
  },
  {
    word: "innumerates",
    definition: "Definition: One who lacks numeracy skills.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "innumerates"
  },
  {
    word: "encroached",
    definition: "Definition: To seize, appropriate",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "encroached"
  },
  {
    word: "apocalyptic",
    definition: "Definition: One who predicts apocalypse.",
    pronunciation: "/əˈpɒ.kə.lɪp.tɪk/",
    englishEquivalent: "apocalyptic"
  },
  {
    word: "typing",
    definition: "Definition: To put text on paper using a typewriter.",
    pronunciation: "/ˈtaɪpɪŋ/",
    englishEquivalent: "typing"
  },
  {
    word: "adaption",
    definition: "Definition: The process of adapting something or becoming adapted to a situation; adjustment, modification.",
    pronunciation: "/əˈdæpʃən/",
    englishEquivalent: "adaption"
  },
  {
    word: "tepees",
    definition: "Definition: Alternative form of teepee",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tepees"
  },
  {
    word: "expulsions",
    definition: "Definition: The act of expelling or the state of being expelled.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "expulsions"
  },
  {
    word: "countryman",
    definition: "Definition: Somebody from a certain country.",
    pronunciation: "/ˈkʌntɹimən/",
    englishEquivalent: "countryman"
  },
  {
    word: "epoxying",
    definition: "Definition: To glue with epoxy.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "epoxying"
  },
  {
    word: "deficiencies",
    definition: "Definition: Inadequacy or incompleteness.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "deficiencies"
  },
  {
    word: "workbenches",
    definition: "Definition: A sturdy bench or table at which manual work is done by a carpenter, machinist, etc.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "workbenches"
  },
  {
    word: "nosewheel",
    definition: "Definition: A wheel, or retractable landing gear, located near the nose of an aircraft",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "nosewheel"
  },
  {
    word: "carjack",
    definition: "Definition: To steal an automobile forcibly from (someone).",
    pronunciation: "/ˈkɑː(ɹ).dʒæk/",
    englishEquivalent: "carjack"
  },
  {
    word: "ahi",
    definition: "Definition: Yellowfin tuna",
    pronunciation: "/ˈɑ.hi/",
    englishEquivalent: "ahi"
  },
  {
    word: "tutor",
    definition: "Definition: One who teaches another (usually called a student, learner, or tutee) in a one-on-one or small-group interaction.",
    pronunciation: "/ˈtjuːtə/",
    englishEquivalent: "tutor"
  },
  {
    word: "bounded",
    definition: "Definition: To surround a territory or other geographical entity.",
    pronunciation: "/ˈbaʊndɪd/",
    englishEquivalent: "bounded"
  },
  {
    word: "eyepieces",
    definition: "Definition: The lens (or combination of lenses) at the eye end of a microscope or telescope by which the image is viewed.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "eyepieces"
  },
  {
    word: "prorated",
    definition: "Definition: To divide proportionately, especially by day; to divide pro rata.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "prorated"
  },
  {
    word: "precaution",
    definition: "Definition: Previous caution or care; caution previously employed to prevent misfortune or to secure good",
    pronunciation: "/pɹiːˈkɔːʃən/",
    englishEquivalent: "precaution"
  },
  {
    word: "aetiology",
    definition: "Definition: The establishment of a cause, origin, or reason for something.",
    pronunciation: "/iːtɪˈɒlədʒi/",
    englishEquivalent: "aetiology"
  },
  {
    word: "homestays",
    definition: "Definition: A system whereby students, visiting a foreign country to study, board with a local family at an affordable price.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "homestays"
  },
  {
    word: "dermis",
    definition: "Definition: The tissue of the skin underlying the epidermis.",
    pronunciation: "/ˈdɜː.mɪs/",
    englishEquivalent: "dermis"
  },
  {
    word: "sensationalize",
    definition: "Definition: To glorify or inflate the importance of a piece of news; to artificially create a sensation.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sensationalize"
  },
  {
    word: "photogeology",
    definition: "Definition: The use of aerial photography to interpret geologic features",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "photogeology"
  },
  {
    word: "corsets",
    definition: "Definition: A woman's foundation garment, reinforced with stays, that supports the waistline, hips and bust.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "corsets"
  },
  {
    word: "tiebacks",
    definition: "Definition: A loop of cloth, cord, etc., which is placed around a curtain to hold it open to one side.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tiebacks"
  },
  {
    word: "lineage",
    definition: "Definition: Descent in a line from a common progenitor; progeny; descending line of offspring or ascending line of parentage.",
    pronunciation: "/ˈlɪ.ni.ɪdʒ/",
    englishEquivalent: "lineage"
  },
  {
    word: "detoxicates",
    definition: "Definition: (of a person) To remove poison (or its effects) from.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "detoxicates"
  },
  {
    word: "athelings",
    definition: "Definition: A prince, especially an Anglo-Saxon prince or royal heir.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "athelings"
  },
  {
    word: "oblanceolate",
    definition: "Definition: (of leaves) Of a reversed lanceolate shape: attached to the stem by the pointed end, with the other end rounded.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "oblanceolate"
  },
  {
    word: "unmake",
    definition: "Definition: To destroy or take apart; to cause (a made article) to lose its nature.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unmake"
  },
  {
    word: "metalize",
    definition: "Definition: To coat, treat or impregnate a non-metallic object with metal.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "metalize"
  },
  {
    word: "page",
    definition: "Definition: One of the many pieces of paper bound together within a book or similar document.",
    pronunciation: "/peɪd͡ʒ/",
    englishEquivalent: "page"
  },
  {
    word: "admires",
    definition: "Definition: To be amazed at; to view with surprise; to marvel at.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "admires"
  },
  {
    word: "pasteboard",
    definition: "Definition: (usually uncountable) Card stock.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pasteboard"
  },
  {
    word: "mizzenmasts",
    definition: "Definition: The aftmost mast on a ship having three or more masts.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "mizzenmasts"
  },
  {
    word: "approach",
    definition: "Definition: The act of drawing near; a coming or advancing near.",
    pronunciation: "/əˈpɹəʊt͡ʃ/",
    englishEquivalent: "approach"
  },
  {
    word: "presbyopia",
    definition: "Definition: Inability of the eye, due to ageing, to focus on nearby objects; farsightedness",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "presbyopia"
  },
  {
    word: "babble",
    definition: "Definition: Idle talk; senseless prattle",
    pronunciation: "/ˈbæb.l̩/",
    englishEquivalent: "babble"
  },
  {
    word: "polysulfide",
    definition: "Definition: Any compound of general formula RSnR having a chain of more than two sulfur atoms; any derivative of a polysulfane.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "polysulfide"
  },
  {
    word: "crane",
    definition: "Definition: Any bird of the family Gruidae, large birds with long legs and a long neck which is extended during flight.",
    pronunciation: "/kɹeɪn/",
    englishEquivalent: "crane"
  },
  {
    word: "bartizan",
    definition: "Definition: A parapet with battlements projecting from the top of a tower in a castle or church.",
    pronunciation: "/bɑːtɪˈzæn/",
    englishEquivalent: "bartizan"
  },
  {
    word: "hemichordate",
    definition: "Definition: Any of many marine worms, of the phylum Hemichordata, that have a primitive notochord",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "hemichordate"
  },
  {
    word: "storax",
    definition: "Definition: Any member of the genus Styrax of trees and shrubs.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "storax"
  },
  {
    word: "lithology",
    definition: "Definition: The study of rocks, with particular emphasis on their description and classification.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "lithology"
  },
  {
    word: "lastly",
    definition: "Definition: (sequence) Used to mark the beginning of the last in a list of items or propositions.",
    pronunciation: "/ˈlɑːstli/",
    englishEquivalent: "lastly"
  },
  {
    word: "persecutors",
    definition: "Definition: A person or thing that persecutes or harasses.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "persecutors"
  },
  {
    word: "burner",
    definition: "Definition: A participant in the Burning Man festival.",
    pronunciation: "/ˈbɜːnə/",
    englishEquivalent: "burner"
  },
  {
    word: "chautauqua",
    definition: "Definition: A place in the state of New York where people go over in the summer for vacation to enjoy artistic events.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "chautauqua"
  },
  {
    word: "manque",
    definition: "Definition: Unable to fully realise one's ambitions; would-be",
    pronunciation: "/mɒŋˈkeɪ/",
    englishEquivalent: "manque"
  },
  {
    word: "brattles",
    definition: "Definition: To rattle; to make a scampering noise.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "brattles"
  },
  {
    word: "unharmful",
    definition: "Definition: Not harmful.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unharmful"
  },
  {
    word: "limeys",
    definition: "Definition: An Englishman or other Briton, or a person of British descent.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "limeys"
  },
  {
    word: "iodinate",
    definition: "Definition: To treat, or to combine, with iodine",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "iodinate"
  },
  {
    word: "loggerheads",
    definition: "Definition: A stupid person; a blockhead, a dolt.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "loggerheads"
  },
  {
    word: "declined",
    definition: "Definition: To move downwards, to fall, to drop.",
    pronunciation: "/dɪˈklaɪnd/",
    englishEquivalent: "declined"
  },
  {
    word: "ohs",
    definition: "Definition: An utterance of oh; a spoken expression of surprise, acknowledgement, etc.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "ohs"
  },
  {
    word: "dariole",
    definition: "Definition: A dessert consisting of puff pastry filled with almond cream, baked in an oven.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "dariole"
  },
  {
    word: "popovers",
    definition: "Definition: A light hollow muffin, resembling an individual Yorkshire pudding.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "popovers"
  },
  {
    word: "outboxing",
    definition: "Definition: To box better than.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "outboxing"
  },
  {
    word: "outfights",
    definition: "Definition: To fight or battle better than.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "outfights"
  },
  {
    word: "chalkier",
    definition: "Definition: Consisting of or containing chalk.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "chalkier"
  },
  {
    word: "boners",
    definition: "Definition: An erect penis.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "boners"
  },
  {
    word: "ketonuria",
    definition: "Definition: A medical condition in which ketone bodies are present in the urine.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "ketonuria"
  },
  {
    word: "gradations",
    definition: "Definition: A sequence of gradual, successive stages; a systematic progression.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "gradations"
  },
  {
    word: "drawbacks",
    definition: "Definition: A disadvantage; something that detracts or takes away.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "drawbacks"
  },
  {
    word: "deeming",
    definition: "Definition: To judge, to pass judgment on; to doom, to sentence.",
    pronunciation: "/ˈdiːmɪŋ/",
    englishEquivalent: "deeming"
  },
  {
    word: "congeal",
    definition: "Definition: To change from a liquid to solid state perhaps by cold",
    pronunciation: "/kənˈdʒiːl/",
    englishEquivalent: "congeal"
  },
  {
    word: "juvenescence",
    definition: "Definition: The state of becoming young or juvenile.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "juvenescence"
  },
  {
    word: "rhamnose",
    definition: "Definition: A methyl-pentose, 6-deoxy-L-mannose, which occurs in the leaves and flowers of poison ivy and is a constituent of many plant glycosides.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "rhamnose"
  },
  {
    word: "ling",
    definition: "Definition: Any of various marine food fish, of the genus Molva, resembling the cod.",
    pronunciation: "/lɪŋ/",
    englishEquivalent: "ling"
  },
  {
    word: "braid",
    definition: "Definition: A sudden movement; a jerk, a wrench.",
    pronunciation: "/bɹeɪd/",
    englishEquivalent: "braid"
  },
  {
    word: "mandataries",
    definition: "Definition: One who receives a mandate.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "mandataries"
  },
  {
    word: "blanquette",
    definition: "Definition: A white meat stew in which neither the meat nor the sauce is browned.",
    pronunciation: "/blɒ̃ˈkɛt/",
    englishEquivalent: "blanquette"
  },
  {
    word: "bolts",
    definition: "Definition: A (usually) metal fastener consisting of a cylindrical body that is threaded, with a larger head on one end. It can be inserted into an unthreaded hole up to the head, with a nut then threaded on the other end; a heavy machine screw.",
    pronunciation: "/bəʊlts/",
    englishEquivalent: "bolts"
  },
  {
    word: "amulets",
    definition: "Definition: A kind of protective charm or ornament, often bearing magical symbols, worn for protection against ill will, negative influences or evil spirits.",
    pronunciation: "/ˈæm.jə.lɪts/",
    englishEquivalent: "amulets"
  },
  {
    word: "sucrase",
    definition: "Definition: Any of a number of enzymes that catalyze the hydrolysis of sucrose to fructose and glucose or to their respective homopolysaccharides",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sucrase"
  },
  {
    word: "bucketing",
    definition: "Definition: A data pre-processing technique in which original data values fall into a small interval ('bin') and are replaced by a value representative of that interval, often the central value. Wp",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "bucketing"
  },
  {
    word: "insomnia",
    definition: "Definition: A sleeping disorder that is known for its symptoms of unrest and the inability to sleep.",
    pronunciation: "/ɪnˈsɒmniə/",
    englishEquivalent: "insomnia"
  },
  {
    word: "coexists",
    definition: "Definition: (of two or more things, people, concepts, etc.) To exist contemporaneously or in the same area.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "coexists"
  },
  {
    word: "businesspeople",
    definition: "Definition: A person in business, or one who works at a commercial institution.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "businesspeople"
  },
  {
    word: "crocks",
    definition: "Definition: A stoneware or earthenware jar or storage container.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "crocks"
  },
  {
    word: "polymath",
    definition: "Definition: A person with extraordinarily broad and comprehensive knowledge.",
    pronunciation: "/ˈpɒlɪmæθ/",
    englishEquivalent: "polymath"
  },
  {
    word: "presoaks",
    definition: "Definition: An initial soak.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "presoaks"
  },
  {
    word: "limits",
    definition: "Definition: A restriction; a bound beyond which one may not go.",
    pronunciation: "/ˈlɪmɪts/",
    englishEquivalent: "limits"
  },
  {
    word: "yokes",
    definition: "Definition: Frame around the neck, and related senses.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "yokes"
  },
  {
    word: "stationary",
    definition: "Definition: One who, or that which, is stationary, such as a planet when apparently it has neither progressive nor retrograde motion.",
    pronunciation: "/ˈsteɪʃ(ə)n(ə)ɹi/",
    englishEquivalent: "stationary"
  },
  {
    word: "photosynthates",
    definition: "Definition: Any compound that is a product of photosynthesis.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "photosynthates"
  },
  {
    word: "pulls",
    definition: "Definition: An act of pulling (applying force)",
    pronunciation: "/pʊlz/",
    englishEquivalent: "pulls"
  },
  {
    word: "superglues",
    definition: "Definition: A very strong and instant glue, generally cyanoacrylate.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "superglues"
  },
  {
    word: "disentitle",
    definition: "Definition: To deprive of title, right or claim.",
    pronunciation: "/[ˌdɪs.ɪnˈtaɪtəɫ]/",
    englishEquivalent: "disentitle"
  },
  {
    word: "unsanctioned",
    definition: "Definition: Not sanctioned; not approved by a sanctioning body.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unsanctioned"
  },
  {
    word: "consults",
    definition: "Definition: The act of consulting or deliberating; consultation",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "consults"
  },
  {
    word: "accrediting",
    definition: "Definition: To ascribe; attribute; credit with.",
    pronunciation: "/əˈkɹɛdɪtɪŋ/",
    englishEquivalent: "accrediting"
  },
  {
    word: "omits",
    definition: "Definition: To leave out or exclude.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "omits"
  },
  {
    word: "mesoderm",
    definition: "Definition: One of the three tissue layers in the embryo of a metazoan animal. Through embryonic development, it will produce many internal organs of the adult, e.g. muscles, spine and circulatory system.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "mesoderm"
  },
  {
    word: "sulphureous",
    definition: "Definition: Sulphurous.",
    pronunciation: "/sʌlˈf(j)ɔːɹɪəs/",
    englishEquivalent: "sulphureous"
  },
  {
    word: "cummerbunds",
    definition: "Definition: A broad sash, especially one that is pleated lengthwise and worn as an article of formal dress, as around a man's waist together with a tuxedo or dinner jacket.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "cummerbunds"
  },
  {
    word: "wattling",
    definition: "Definition: An interwoven mesh of twigs; wattle.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "wattling"
  },
  {
    word: "aikido",
    definition: "Definition: A Japanese martial art developed from jujitsu and making use of holds and throws.",
    pronunciation: "/aɪˈkiːdəʊ/",
    englishEquivalent: "aikido"
  },
  {
    word: "selenium",
    definition: "Definition: A nonmetallic chemical element (symbol Se) with an atomic number of 34, used mainly in glassmaking and pigments and as a semiconductor.",
    pronunciation: "/səˈliː.ni.əm/",
    englishEquivalent: "selenium"
  },
  {
    word: "electrification",
    definition: "Definition: The act of electrifying, or the state of being charged with electricity.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "electrification"
  },
  {
    word: "cloddish",
    definition: "Definition: Like a clod, a person who is foolish, stupid or parochial.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "cloddish"
  },
  {
    word: "unraveling",
    definition: "Definition: To separate the threads (of); disentangle.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unraveling"
  },
  {
    word: "replevied",
    definition: "Definition: To return goods to their rightful owner by replevin; to recover goods.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "replevied"
  },
  {
    word: "unversed",
    definition: "Definition: Inexperienced, untrained.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unversed"
  },
  {
    word: "ire",
    definition: "Definition: Iron.",
    pronunciation: "/aɪ.ə(ɹ)/",
    englishEquivalent: "ire"
  },
  {
    word: "taming",
    definition: "Definition: To make (an animal) tame; to domesticate.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "taming"
  },
  {
    word: "tasty",
    definition: "Definition: Having a pleasant or satisfying flavor; delicious.",
    pronunciation: "/ˈteɪsti/",
    englishEquivalent: "tasty"
  },
  {
    word: "shebangs",
    definition: "Definition: The character string '#!' used at the beginning of a computer file to indicate which interpreter can process the commands in the file, chiefly used in Unix and related operating systems.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "shebangs"
  },
  {
    word: "traumas",
    definition: "Definition: Any serious injury to the body, often resulting from violence or an accident.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "traumas"
  },
  {
    word: "turbogenerators",
    definition: "Definition: A turbine directly connected to an electric generator in order to generate power.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "turbogenerators"
  },
  {
    word: "milch",
    definition: "Definition: (of a cow, animal, etc.) Giving milk; in note",
    pronunciation: "/mɪltʃ/",
    englishEquivalent: "milch"
  },
  {
    word: "pelerines",
    definition: "Definition: A woman's tippet or cape with long ends coming down in front.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pelerines"
  },
  {
    word: "delirium",
    definition: "Definition: A temporary mental state with a sudden onset, usually reversible, including symptoms of confusion, inability to concentrate, disorientation, anxiety, and sometimes hallucinations. Causes can include dehydration, drug intoxication, and severe infection.",
    pronunciation: "/dɪˈlɪɹɪəm/",
    englishEquivalent: "delirium"
  },
  {
    word: "anergia",
    definition: "Definition: Dilute or disorganized energy, which cannot be transformed into work.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "anergia"
  },
  {
    word: "cheated",
    definition: "Definition: To violate rules in order to gain advantage from a situation.",
    pronunciation: "/[ˈt͡ʃiɾɨd]/",
    englishEquivalent: "cheated"
  },
  {
    word: "midpoint",
    definition: "Definition: A point equidistant between two extremes.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "midpoint"
  },
  {
    word: "democratically",
    definition: "Definition: In a democratic way.",
    pronunciation: "/dɛməˈkɹætɪkəli/",
    englishEquivalent: "democratically"
  },
  {
    word: "weedier",
    definition: "Definition: Abounding with weeds.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "weedier"
  },
  {
    word: "ileum",
    definition: "Definition: The last, and usually the longest, division of the small intestine; the part between the jejunum and large intestine.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "ileum"
  },
  {
    word: "purist",
    definition: "Definition: An advocate of purism.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "purist"
  },
  {
    word: "indwell",
    definition: "Definition: To exist within, especially as a spirit or driving force.",
    pronunciation: "/ɪnˈdwɛl/",
    englishEquivalent: "indwell"
  },
  {
    word: "teaches",
    definition: "Definition: To show (someone) the way; to guide, conduct; to point, indicate.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "teaches"
  },
  {
    word: "soloists",
    definition: "Definition: A person who performs a solo.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "soloists"
  },
  {
    word: "eddied",
    definition: "Definition: To form an eddy; to move in, or as if in, an eddy; to move in a circle.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "eddied"
  },
  {
    word: "boozing",
    definition: "Definition: To drink alcohol.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "boozing"
  },
  {
    word: "radicals",
    definition: "Definition: (historical: 19th-century Britain) A member of the most progressive wing of the Liberal Party; someone favouring social reform (but generally stopping short of socialism).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "radicals"
  },
  {
    word: "sals",
    definition: "Definition: Shorea robusta, a dipterocarpaceous tree.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sals"
  },
  {
    word: "closes",
    definition: "Definition: An end or conclusion.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "closes"
  },
  {
    word: "inspirit",
    definition: "Definition: To strengthen or hearten; give impetus or vigour.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "inspirit"
  },
  {
    word: "burst",
    definition: "Definition: An act or instance of bursting.",
    pronunciation: "/bɜːst/",
    englishEquivalent: "burst"
  },
  {
    word: "staining",
    definition: "Definition: To discolour.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "staining"
  },
  {
    word: "incongruities",
    definition: "Definition: The state of being incongruous, or lacking congruence.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "incongruities"
  },
  {
    word: "juiceheads",
    definition: "Definition: An alcoholic.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "juiceheads"
  },
  {
    word: "denturist",
    definition: "Definition: A person who makes and fits dentures",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "denturist"
  },
  {
    word: "frail",
    definition: "Definition: A basket made of rushes, used chiefly to hold figs and raisins.",
    pronunciation: "/fɹeɪl/",
    englishEquivalent: "frail"
  },
  {
    word: "fallacies",
    definition: "Definition: Deceptive or false appearance; that which misleads the eye or the mind.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "fallacies"
  },
  {
    word: "dissimulations",
    definition: "Definition: The act of concealing the truth; hypocrisy or deception.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "dissimulations"
  },
  {
    word: "pedaler",
    definition: "Definition: One who pedals; a cyclist (bicycle rider).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pedaler"
  },
  {
    word: "defend",
    definition: "Definition: To ward off attacks against; to fight to protect; to guard.",
    pronunciation: "/dɪˈfɛnd/",
    englishEquivalent: "defend"
  },
  {
    word: "immunising",
    definition: "Definition: To make someone or something immune to something.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "immunising"
  },
  {
    word: "polluted",
    definition: "Definition: To make something harmful, especially by the addition of some unwanted product.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "polluted"
  },
  {
    word: "stonechat",
    definition: "Definition: Any of various small Old World passerine birds of the genus Saxicola that feed on insects.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "stonechat"
  },
  {
    word: "priestesses",
    definition: "Definition: A woman with religious duties and responsibilities in certain non-Christian religions.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "priestesses"
  },
  {
    word: "evanesces",
    definition: "Definition: To disappear into a mist or dissipate in vapor",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "evanesces"
  },
  {
    word: "jarhead",
    definition: "Definition: A US marine.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "jarhead"
  },
  {
    word: "leukotomies",
    definition: "Definition: Lobotomy",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "leukotomies"
  },
  {
    word: "perturbed",
    definition: "Definition: To disturb; to bother or unsettle.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "perturbed"
  },
  {
    word: "mimosas",
    definition: "Definition: A plant belonging to the genus Mimosa usually found in tropical climates, their leaves are usually prickly and sensitive to touch or light, and have small white or pink flowers.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "mimosas"
  },
  {
    word: "cinemas",
    definition: "Definition: A movie theatre, a movie house",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "cinemas"
  },
  {
    word: "mew",
    definition: "Definition: A gull, seagull.",
    pronunciation: "/mjuː/",
    englishEquivalent: "mew"
  },
  {
    word: "rudiments",
    definition: "Definition: (often in the plural) A fundamental principle or skill, especially in a field of learning.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "rudiments"
  },
  {
    word: "preorder",
    definition: "Definition: An order for goods or services placed in advance.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "preorder"
  },
  {
    word: "shopping",
    definition: "Definition: To visit stores or shops to browse or explore merchandise, especially with the intention of buying such merchandise.",
    pronunciation: "/ˈʃɒpɪŋ/",
    englishEquivalent: "shopping"
  },
  {
    word: "periodontics",
    definition: "Definition: The study of supporting structures of teeth—gums, alveolar bone, cementum, and the periodontal ligament—and diseases and conditions that affect them.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "periodontics"
  },
  {
    word: "pilothouse",
    definition: "Definition: A wheelhouse.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pilothouse"
  },
  {
    word: "breaststroke",
    definition: "Definition: A swimming stroke in which the swimmer lies face down, the arms being swept forward, outward and back under the water and the legs are kicked like a frog's",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "breaststroke"
  },
  {
    word: "ownerships",
    definition: "Definition: The state of having complete legal control of something; possession; proprietorship.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "ownerships"
  },
  {
    word: "desegregate",
    definition: "Definition: To the end segregation of (something).",
    pronunciation: "/diːˈsɛɡɹəɡeɪt/",
    englishEquivalent: "desegregate"
  },
  {
    word: "foramina",
    definition: "Definition: An opening, an orifice; a short passage.",
    pronunciation: "/fəˈɹæmɪnə/",
    englishEquivalent: "foramina"
  },
  {
    word: "tapestry",
    definition: "Definition: A heavy woven cloth, often with decorative pictorial designs, normally hung on walls.",
    pronunciation: "/ˈtæpəstɹi/",
    englishEquivalent: "tapestry"
  },
  {
    word: "soliciting",
    definition: "Definition: To persistently endeavor to obtain an object, or bring about an event.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "soliciting"
  },
  {
    word: "vestige",
    definition: "Definition: The mark of the foot left on the earth.",
    pronunciation: "/ˈvɛ.stɪd͡ʒ/",
    englishEquivalent: "vestige"
  },
  {
    word: "tetrachords",
    definition: "Definition: Any set of four different pitch classes.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tetrachords"
  },
  {
    word: "babydoll",
    definition: "Definition: A child's doll designed to look like a baby.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "babydoll"
  },
  {
    word: "pigskins",
    definition: "Definition: Leather made from the skin of a pig.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pigskins"
  },
  {
    word: "climaxing",
    definition: "Definition: To reach or bring to a climax.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "climaxing"
  },
  {
    word: "hobby",
    definition: "Definition: An activity that one enjoys doing in one's spare time.",
    pronunciation: "/ˈhɒ.bi/",
    englishEquivalent: "hobby"
  },
  {
    word: "remonstrate",
    definition: "Definition: To object; to express disapproval (with, against).",
    pronunciation: "/ˈɹɛ.mən.stɹeɪt/",
    englishEquivalent: "remonstrate"
  },
  {
    word: "jouks",
    definition: "Definition: To play dance music, or to dance, in a juke",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "jouks"
  },
  {
    word: "leveraging",
    definition: "Definition: To use; to exploit; to manipulate in order to take full advantage (of something).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "leveraging"
  },
  {
    word: "stumps",
    definition: "Definition: The remains of something that has been cut off; especially the remains of a tree, the remains of a limb.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "stumps"
  },
  {
    word: "recolors",
    definition: "Definition: To color again or differently.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "recolors"
  },
  {
    word: "ladybirds",
    definition: "Definition: Any of the Coccinellidae family of beetles, typically having a round shape and red or yellow spotted elytra.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "ladybirds"
  },
  {
    word: "unlocks",
    definition: "Definition: The act of unlocking something.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unlocks"
  },
  {
    word: "royalties",
    definition: "Definition: The rank, status, power or authority of a monarch.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "royalties"
  },
  {
    word: "gibberellins",
    definition: "Definition: Any of a class of diterpene plant growth hormones first isolated from the fungus Gibberella fujikuroi.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "gibberellins"
  },
  {
    word: "correlation",
    definition: "Definition: A reciprocal, parallel or complementary relationship between two or more comparable objects.",
    pronunciation: "/kɒɹəˈleɪʃən/",
    englishEquivalent: "correlation"
  },
  {
    word: "parodying",
    definition: "Definition: To make a parody of something.",
    pronunciation: "/ˈpæɹədaɪ.ɪŋ/",
    englishEquivalent: "parodying"
  },
  {
    word: "leaned",
    definition: "Definition: To incline, deviate, or bend, from a vertical position; to be in a position thus inclining or deviating.",
    pronunciation: "/liːnd/",
    englishEquivalent: "leaned"
  },
  {
    word: "kayoed",
    definition: "Definition: To knock someone out, or render them unconscious or senseless.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "kayoed"
  },
  {
    word: "scanted",
    definition: "Definition: To limit in amount or share; to stint.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "scanted"
  },
  {
    word: "assaulting",
    definition: "Definition: To attack, physically or figuratively.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "assaulting"
  },
  {
    word: "endearing",
    definition: "Definition: To make (something) more precious or valuable.",
    pronunciation: "/ɛn-/",
    englishEquivalent: "endearing"
  },
  {
    word: "tightfisted",
    definition: "Definition: Reluctant to spend money; miserly or stingy",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tightfisted"
  },
  {
    word: "charitably",
    definition: "Definition: In a charitable manner.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "charitably"
  },
  {
    word: "barhopped",
    definition: "Definition: To drink at a number of bars during a single day or evening.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "barhopped"
  },
  {
    word: "neutralise",
    definition: "Definition: To make even, inactive or ineffective.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "neutralise"
  },
  {
    word: "schedules",
    definition: "Definition: A slip of paper; a short note.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "schedules"
  },
  {
    word: "loveseat",
    definition: "Definition: A small sofa for two people, British: two-seater settee.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "loveseat"
  },
  {
    word: "mountainside",
    definition: "Definition: The sloping side of a mountain.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "mountainside"
  },
  {
    word: "luxate",
    definition: "Definition: To dislocate.",
    pronunciation: "/ˈlʌk.seɪt/",
    englishEquivalent: "luxate"
  },
  {
    word: "crepuscle",
    definition: "Definition: Twilight.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "crepuscle"
  },
  {
    word: "wrights",
    definition: "Definition: A builder or maker of something.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "wrights"
  },
  {
    word: "littler",
    definition: "Definition: Small in size.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "littler"
  },
  {
    word: "advancements",
    definition: "Definition: The act of advancing, ; promotion to a higher place or dignity",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "advancements"
  },
  {
    word: "carefully",
    definition: "Definition: Sorrowfully.",
    pronunciation: "/ˈkɛːfli/",
    englishEquivalent: "carefully"
  },
  {
    word: "mac",
    definition: "Definition: A waterproof long coat made of rubberized cloth.",
    pronunciation: "/mæk/",
    englishEquivalent: "mac"
  },
  {
    word: "ethicized",
    definition: "Definition: To make ethical.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "ethicized"
  },
  {
    word: "offends",
    definition: "Definition: To hurt the feelings of; to displease; to make angry; to insult.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "offends"
  },
  {
    word: "panhandles",
    definition: "Definition: The handle of a pan.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "panhandles"
  },
  {
    word: "gossiped",
    definition: "Definition: To talk about someone else's private or personal business, especially in a manner that spreads the information.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "gossiped"
  },
  {
    word: "fens",
    definition: "Definition: A type of wetland fed by ground water and runoff, containing peat below the waterline, characteristically alkaline.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "fens"
  },
  {
    word: "autobiography",
    definition: "Definition: A self-written biography; the story of one's own life.",
    pronunciation: "/ˌɔː.tə.baɪˈɒɡ.ɹə.fi/",
    englishEquivalent: "autobiography"
  },
  {
    word: "rust",
    definition: "Definition: The deteriorated state of iron or steel as a result of moisture and oxidation.",
    pronunciation: "/ɹʌst/",
    englishEquivalent: "rust"
  },
  {
    word: "outraging",
    definition: "Definition: To cause or commit an outrage upon; to treat with violence or abuse.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "outraging"
  },
  {
    word: "wizard",
    definition: "Definition: Someone, usually male, who uses (or has skill with) magic, mystic items, and magical and mystical practices.",
    pronunciation: "/ˈwɪ.zəd/",
    englishEquivalent: "wizard"
  },
  {
    word: "sanatoria",
    definition: "Definition: An institution that treats chronic diseases, and provides supervised recuperation and convalescence.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sanatoria"
  },
  {
    word: "refuelling",
    definition: "Definition: To refill with fuel.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "refuelling"
  },
  {
    word: "justifiable",
    definition: "Definition: That can be justified.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "justifiable"
  },
  {
    word: "ciao",
    definition: "Definition: A greeting or farewell using the word 'ciao'.",
    pronunciation: "/tʃaʊ/",
    englishEquivalent: "ciao"
  },
  {
    word: "hesitating",
    definition: "Definition: To stop or pause respecting decision or action; to be in suspense or uncertainty as to a determination.",
    pronunciation: "/ˈhɛzɪteɪtɪŋ/",
    englishEquivalent: "hesitating"
  },
  {
    word: "outsets",
    definition: "Definition: The beginning or initial stage of something.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "outsets"
  },
  {
    word: "productions",
    definition: "Definition: The act of producing, making or creating something.",
    pronunciation: "/pɹəˈdʌkʃənz/",
    englishEquivalent: "productions"
  },
  {
    word: "teflon",
    definition: "Definition: Polytetrafluoroethylene, PTFE",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "teflon"
  },
  {
    word: "ferrel",
    definition: "Definition: A band or cap (usually metal) placed around a shaft to reinforce it or to prevent splitting.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "ferrel"
  },
  {
    word: "flics",
    definition: "Definition: A data file containing computer animations.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "flics"
  },
  {
    word: "explicated",
    definition: "Definition: To explain meticulously or in great detail; to elucidate; to analyze.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "explicated"
  },
  {
    word: "bookkeeping",
    definition: "Definition: To do bookkeeping.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "bookkeeping"
  },
  {
    word: "stiffs",
    definition: "Definition: An average person, usually male, of no particular distinction, skill, or education, often a working stiff or lucky stiff.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "stiffs"
  },
  {
    word: "fits",
    definition: "Definition: The degree to which something fits.",
    pronunciation: "/fɪts/",
    englishEquivalent: "fits"
  },
  {
    word: "shrubs",
    definition: "Definition: A woody plant smaller than a tree, and usually with several stems from the same base.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "shrubs"
  },
  {
    word: "valedictions",
    definition: "Definition: A speech made when leaving or parting company.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "valedictions"
  },
  {
    word: "armories",
    definition: "Definition: Heraldry",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "armories"
  },
  {
    word: "wallopings",
    definition: "Definition: A series of wallops (blows.)",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "wallopings"
  },
  {
    word: "retrogressed",
    definition: "Definition: To return to an earlier, simpler or worse condition; to regress.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "retrogressed"
  },
  {
    word: "omnivores",
    definition: "Definition: An animal which is able to consume both plants (like a herbivore) and meat (like a carnivore).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "omnivores"
  },
  {
    word: "renovation",
    definition: "Definition: An act, or the process, of renovating.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "renovation"
  },
  {
    word: "segue",
    definition: "Definition: An instance of segueing, a transition.",
    pronunciation: "/ˈsɛɡweɪ/",
    englishEquivalent: "segue"
  },
  {
    word: "talesman",
    definition: "Definition: The (male) author or relater of a tale; storyteller.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "talesman"
  },
  {
    word: "eggnog",
    definition: "Definition: A beverage based on milk, eggs, sugar, and nutmeg; often made alcoholic with rum, brandy or whisky; popular at Christmas.",
    pronunciation: "/ˈɛɡ.nɒɡ/",
    englishEquivalent: "eggnog"
  },
  {
    word: "sickbays",
    definition: "Definition: A place used as a hospital on board a ship, on a spaceship (in science fiction).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sickbays"
  },
  {
    word: "guitarfishes",
    definition: "Definition: Any of the fish in the Rhinobatidae family of rays.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "guitarfishes"
  },
  {
    word: "recirculating",
    definition: "Definition: To circulate again.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "recirculating"
  },
  {
    word: "epigones",
    definition: "Definition: A follower or disciple.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "epigones"
  },
  {
    word: "pentads",
    definition: "Definition: A group or series of five things.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pentads"
  },
  {
    word: "photofinishing",
    definition: "Definition: The commercial developing and printing of photographs",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "photofinishing"
  },
  {
    word: "euphemise",
    definition: "Definition: To utter one or more euphemisms; to speak euphemistically.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "euphemise"
  },
  {
    word: "hitch",
    definition: "Definition: A sudden pull.",
    pronunciation: "/hɪtʃ/",
    englishEquivalent: "hitch"
  },
  {
    word: "infest",
    definition: "Definition: Hostility.",
    pronunciation: "/ɪnˈfɛst/",
    englishEquivalent: "infest"
  },
  {
    word: "minidiscs",
    definition: "Definition: A disc/disk in MiniDisc format",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "minidiscs"
  },
  {
    word: "percolates",
    definition: "Definition: A liquid that has been percolated.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "percolates"
  },
  {
    word: "ditzes",
    definition: "Definition: A scatterbrained person, especially a woman.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "ditzes"
  },
  {
    word: "fluorochrome",
    definition: "Definition: Any of various fluorescent dyes used to stain biological material before microscopic examination",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "fluorochrome"
  },
  {
    word: "expansionist",
    definition: "Definition: An advocate of expansionism.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "expansionist"
  },
  {
    word: "receptacles",
    definition: "Definition: A container.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "receptacles"
  },
  {
    word: "genotypes",
    definition: "Definition: The part (DNA sequence) of the genetic makeup of an organism which determines a specific characteristic (phenotype) of that organism.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "genotypes"
  },
  {
    word: "vesicle",
    definition: "Definition: A membrane-bound compartment found in a cell.",
    pronunciation: "/ˈviːsɪkəl/",
    englishEquivalent: "vesicle"
  },
  {
    word: "utopianism",
    definition: "Definition: The belief in a system for an ideal society, usually regarded as unrealistic.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "utopianism"
  },
  {
    word: "petition",
    definition: "Definition: A formal, written request made to an official person or organized body, often containing many signatures.",
    pronunciation: "/pəˈtɪ.ʃən/",
    englishEquivalent: "petition"
  },
  {
    word: "edict",
    definition: "Definition: A proclamation of law or other authoritative command.",
    pronunciation: "/ˈiː.dɪkt/",
    englishEquivalent: "edict"
  },
  {
    word: "excoriated",
    definition: "Definition: To wear off the skin of; to chafe or flay.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "excoriated"
  },
  {
    word: "acrophobia",
    definition: "Definition: Fear of heights.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "acrophobia"
  },
  {
    word: "bobbing",
    definition: "Definition: To move gently and vertically, in either a single motion or repeatedly up and down, at or near the surface of a body of water, or similar medium.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "bobbing"
  },
  {
    word: "locked",
    definition: "Definition: To become fastened in place.",
    pronunciation: "/lɒkt/",
    englishEquivalent: "locked"
  },
  {
    word: "bolts",
    definition: "Definition: A (usually) metal fastener consisting of a cylindrical body that is threaded, with a larger head on one end. It can be inserted into an unthreaded hole up to the head, with a nut then threaded on the other end; a heavy machine screw.",
    pronunciation: "/bəʊlts/",
    englishEquivalent: "bolts"
  },
  {
    word: "manlike",
    definition: "Definition: Of or characteristic of grown men, as opposed to women or children; macho, mannish, virile.",
    pronunciation: "/ˈmanlʌɪk/",
    englishEquivalent: "manlike"
  },
  {
    word: "homestays",
    definition: "Definition: A system whereby students, visiting a foreign country to study, board with a local family at an affordable price.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "homestays"
  },
  {
    word: "reassignments",
    definition: "Definition: The act of reassigning; a second or subsequent assignment.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "reassignments"
  },
  {
    word: "colocynths",
    definition: "Definition: A viny plant, Citrullus colocynthis, native to the Mediterranean Basin and Asia. It produces a lemon-sized, yellowish, green-mottled, spongy, and extremely bitter fruit.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "colocynths"
  },
  {
    word: "cozy",
    definition: "Definition: A padded or knit covering put on an item to keep it warm, especially a teapot or egg.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "cozy"
  },
  {
    word: "noosed",
    definition: "Definition: To tie or catch in a noose; to entrap or ensnare.",
    pronunciation: "/nuːst/",
    englishEquivalent: "noosed"
  },
  {
    word: "surfperch",
    definition: "Definition: Any of the family Embiotocidae of viviparous perciform fishes, found mainly in the northeast Pacific Ocean.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "surfperch"
  },
  {
    word: "stoppers",
    definition: "Definition: Agent noun of stop, someone or something that stops something.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "stoppers"
  },
  {
    word: "vacillated",
    definition: "Definition: To sway unsteadily from one side to the other; oscillate.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "vacillated"
  },
  {
    word: "magnitude",
    definition: "Definition: The absolute or relative size, extent or importance of something.",
    pronunciation: "/ˈmæɡnɪtjuːd/",
    englishEquivalent: "magnitude"
  },
  {
    word: "spleens",
    definition: "Definition: In vertebrates, including humans, a ductless vascular gland, located in the left upper abdomen near the stomach, which destroys old red blood cells, removes debris from the bloodstream, acts as a reservoir of blood, and produces lymphocytes.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "spleens"
  },
  {
    word: "recurs",
    definition: "Definition: To have recourse (to) someone or something for assistance, support etc.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "recurs"
  },
  {
    word: "relaying",
    definition: "Definition: To lay (for example, flooring or railroad track) again.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "relaying"
  },
  {
    word: "adulteress",
    definition: "Definition: A female adulterer, a married woman or wife who commits adultery.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "adulteress"
  },
  {
    word: "peds",
    definition: "Definition: Pediatric medicine, pediatric nursing, and so on; a medical or other specialty dealing with child patients.",
    pronunciation: "/piːdz/",
    englishEquivalent: "peds"
  },
  {
    word: "assemblyman",
    definition: "Definition: A male member of an assembly.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "assemblyman"
  },
  {
    word: "gratification",
    definition: "Definition: The act of gratifying, or pleasing, either the mind, the taste, or the appetite.",
    pronunciation: "/ˌɡɹætɪfɪˈkeɪʃən/",
    englishEquivalent: "gratification"
  },
  {
    word: "septupled",
    definition: "Definition: To multiply by seven.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "septupled"
  },
  {
    word: "dodoes",
    definition: "Definition: A large, flightless bird, †Raphus cucullatus, related to the pigeon, that is now extinct (since the 1600s) and was native to Mauritius.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "dodoes"
  },
  {
    word: "spermatogonia",
    definition: "Definition: Any of the undifferentiated cells in the male gonads that become spermatocytes; a spermatoblast",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "spermatogonia"
  },
  {
    word: "brose",
    definition: "Definition: Oatmeal mixed with boiling water or milk.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "brose"
  },
  {
    word: "leveraging",
    definition: "Definition: To use; to exploit; to manipulate in order to take full advantage (of something).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "leveraging"
  },
  {
    word: "siliqua",
    definition: "Definition: A weight of four grains; a carat.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "siliqua"
  },
  {
    word: "dreidls",
    definition: "Definition: A four-sided spinning top, inscribed with the four Hebrew letters נ, ג, ה, and ש or פ on each side, associated with and often used during Hanukkah.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "dreidls"
  },
  {
    word: "sundowner",
    definition: "Definition: An itinerant worker, such as a swagman, who arrives at a farm too late in the day to do any work, but readily accepts food and lodging.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sundowner"
  },
  {
    word: "built",
    definition: "Definition: To form (something) by combining materials or parts.",
    pronunciation: "/ˈbɪlt/",
    englishEquivalent: "built"
  },
  {
    word: "shiftless",
    definition: "Definition: Lazy, unmotivated",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "shiftless"
  },
  {
    word: "schnozzes",
    definition: "Definition: Nose.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "schnozzes"
  },
  {
    word: "bankrolling",
    definition: "Definition: To fund a project; to underwrite something.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "bankrolling"
  },
  {
    word: "epaulets",
    definition: "Definition: An ornamentation, worn on the shoulders of a military uniform, as a sign of rank",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "epaulets"
  },
  {
    word: "prepared",
    definition: "Definition: To make ready for a specific future purpose; to set up; to assemble or equip.",
    pronunciation: "/pɹɪˈpɛəd/",
    englishEquivalent: "prepared"
  },
  {
    word: "eyewear",
    definition: "Definition: A vision aid or similar device worn over the eyes, such as eyeglasses, contact lenses, or protective goggles.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "eyewear"
  },
  {
    word: "nonets",
    definition: "Definition: A composition for nine instruments or nine voices.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "nonets"
  },
  {
    word: "deified",
    definition: "Definition: To make a god of (something or someone).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "deified"
  },
  {
    word: "cataclysms",
    definition: "Definition: A sudden, violent event.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "cataclysms"
  },
  {
    word: "chokiest",
    definition: "Definition: Reminiscent of choking.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "chokiest"
  },
  {
    word: "defocussing",
    definition: "Definition: To cause (a lens, or a beam of light or particles, etc.) to be out of focus.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "defocussing"
  },
  {
    word: "pledge",
    definition: "Definition: A solemn promise to do something.",
    pronunciation: "/plɛdʒ/",
    englishEquivalent: "pledge"
  },
  {
    word: "overstimulate",
    definition: "Definition: To stimulate to an excessive degree; to expose to excessive stimulation.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "overstimulate"
  },
  {
    word: "pluckier",
    definition: "Definition: Having or showing pluck, courage or spirit in trying circumstances.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pluckier"
  },
  {
    word: "tympanums",
    definition: "Definition: A triangular space between the sides of a pediment.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tympanums"
  },
  {
    word: "teapoy",
    definition: "Definition: Originally, a three-legged decorative stand or table; sometimes also having a tea chest for holding a tea service.",
    pronunciation: "/ˈtiː.pɔɪ/",
    englishEquivalent: "teapoy"
  },
  {
    word: "indicted",
    definition: "Definition: To accuse of wrongdoing; charge.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "indicted"
  },
  {
    word: "allocutions",
    definition: "Definition: A formal speech, especially one which is regarded as authoritative and forceful.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "allocutions"
  },
  {
    word: "coalesced",
    definition: "Definition: (of separate elements) To join into a single mass or whole.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "coalesced"
  },
  {
    word: "cheerio",
    definition: "Definition: A small saveloy often consumed with tomato sauce at parties.",
    pronunciation: "/ˈtʃɪəɹ.i.əʊ/",
    englishEquivalent: "cheerio"
  },
  {
    word: "cinematic",
    definition: "Definition: A cut scene.",
    pronunciation: "/sɪnəˈmætɪk/",
    englishEquivalent: "cinematic"
  },
  {
    word: "rhachis",
    definition: "Definition: The spinal column, or the vertebrae of the spine.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "rhachis"
  },
  {
    word: "sanctimonious",
    definition: "Definition: Making a show of being morally better than others, especially hypocritically pious.",
    pronunciation: "/ˌsæŋk.təˈməʊ.ni.əs/",
    englishEquivalent: "sanctimonious"
  },
  {
    word: "hashed",
    definition: "Definition: To chop into small pieces, to make into a hash.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "hashed"
  },
  {
    word: "cwms",
    definition: "Definition: A valley head created through glacial erosion and with a shape similar to an amphitheatre.",
    pronunciation: "/kuːmz/",
    englishEquivalent: "cwms"
  },
  {
    word: "dipping",
    definition: "Definition: To lower into a liquid.",
    pronunciation: "/ˈdɪpɪŋ/",
    englishEquivalent: "dipping"
  },
  {
    word: "novices",
    definition: "Definition: A beginner; one who is not very familiar or experienced in a particular subject.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "novices"
  },
  {
    word: "calculation",
    definition: "Definition: The act or process of calculating.",
    pronunciation: "/kælkjuˈleɪʃən/",
    englishEquivalent: "calculation"
  },
  {
    word: "resinated",
    definition: "Definition: To treat with resin, e.g. by impregnation in order to impart flavour, typically of wine",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "resinated"
  },
  {
    word: "petticoats",
    definition: "Definition: A tight, usually padded undercoat worn by men over a shirt and under the doublet.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "petticoats"
  },
  {
    word: "flint",
    definition: "Definition: A hard, fine-grained quartz that fractures conchoidally and generates sparks when struck.",
    pronunciation: "/flɪnt/",
    englishEquivalent: "flint"
  },
  {
    word: "phenoms",
    definition: "Definition: Someone or something that is phenomenal, especially a young player in sports like baseball, American football, basketball, tennis, and golf.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "phenoms"
  },
  {
    word: "steamed",
    definition: "Definition: To cook with steam.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "steamed"
  },
  {
    word: "tagmemes",
    definition: "Definition: (grammar, tagmemics) The smallest functional element in the grammatical structure of a sentence.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tagmemes"
  },
  {
    word: "spindle",
    definition: "Definition: (spinning) A rod used for spinning and then winding natural fibres (especially wool), usually consisting of a shaft and a circular whorl positioned at either the upper or lower end of the shaft when suspended vertically from the forming thread.",
    pronunciation: "/ˈspɪndəl/",
    englishEquivalent: "spindle"
  },
  {
    word: "mortgagee",
    definition: "Definition: One who provides a loan secured upon the borrowers' property, the lender in a mortgage agreement.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "mortgagee"
  },
  {
    word: "tarots",
    definition: "Definition: (singular or plural) A card game played in various different variations.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tarots"
  },
  {
    word: "unpressed",
    definition: "Definition: Not pressed.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unpressed"
  },
  {
    word: "saucier",
    definition: "Definition: Similar to sauce; having the consistency or texture of sauce.",
    pronunciation: "/ˈsɔːsɪə/",
    englishEquivalent: "saucier"
  },
  {
    word: "lymphadenitis",
    definition: "Definition: Lymphadenopathy.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "lymphadenitis"
  },
  {
    word: "fluorescents",
    definition: "Definition: A fluorescent light.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "fluorescents"
  },
  {
    word: "efficient",
    definition: "Definition: A cause; something that causes an effect",
    pronunciation: "/əˈfɪʃənt/",
    englishEquivalent: "efficient"
  },
  {
    word: "parliamentarian",
    definition: "Definition: A member of a parliament, congress or an elected national legislative body of another name.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "parliamentarian"
  },
  {
    word: "midget",
    definition: "Definition: A little sandfly.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "midget"
  },
  {
    word: "gallon",
    definition: "Definition: A unit of volume, equivalent to eight pints",
    pronunciation: "/ˈɡælən/",
    englishEquivalent: "gallon"
  },
  {
    word: "confessions",
    definition: "Definition: The open admittance of having done something (especially something bad).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "confessions"
  },
  {
    word: "coxing",
    definition: "Definition: To act as coxswain for.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "coxing"
  },
  {
    word: "recalculating",
    definition: "Definition: To calculate again.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "recalculating"
  },
  {
    word: "agamas",
    definition: "Definition: Any of the various small, long-tailed lizards of the subfamily Agaminae of family Agamidae, especially in genera Acanthocercus, Agama, Dendragama, Laudakia, Phrynocephalus, Trapelus and Xenagama.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "agamas"
  },
  {
    word: "blighted",
    definition: "Definition: To affect with blight; to blast; to prevent the growth and fertility of.",
    pronunciation: "/ˈblaɪtɪd/",
    englishEquivalent: "blighted"
  },
  {
    word: "woolman",
    definition: "Definition: A man who deals in wool.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "woolman"
  },
  {
    word: "bedabbles",
    definition: "Definition: To dabble about or all over with moisture; make something wet by sprinkling or spattering water, paint, or other liquid on it.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "bedabbles"
  },
  {
    word: "colonial",
    definition: "Definition: A person from a country that is or was controlled by another.",
    pronunciation: "/kəˈləʊ.ni.əl/",
    englishEquivalent: "colonial"
  },
  {
    word: "disestablish",
    definition: "Definition: To deprive (an established church, military squadron, operations base, etc.) of its official status.",
    pronunciation: "/dɪsɪˈstæblɪʃ/",
    englishEquivalent: "disestablish"
  },
  {
    word: "carefully",
    definition: "Definition: Sorrowfully.",
    pronunciation: "/ˈkɛːfli/",
    englishEquivalent: "carefully"
  },
  {
    word: "heraldic",
    definition: "Definition: Of, or relating to heraldry or heralds.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "heraldic"
  },
  {
    word: "bilgewater",
    definition: "Definition: Water which collects in the bilges of a ship.",
    pronunciation: "/ˈbɪldʒwɔtɚ/",
    englishEquivalent: "bilgewater"
  },
  {
    word: "outstation",
    definition: "Definition: A station or post in a remote position; an outpost.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "outstation"
  },
  {
    word: "coachman",
    definition: "Definition: A man who drives a horse-drawn coach, a male coach driver.",
    pronunciation: "/ˈkəʊt͡ʃmən/",
    englishEquivalent: "coachman"
  },
  {
    word: "kilovolt",
    definition: "Definition: One thousand ( 103 ) volts. Symbol: kV or KV.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "kilovolt"
  },
  {
    word: "feuding",
    definition: "Definition: To carry on a feud.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "feuding"
  },
  {
    word: "intent",
    definition: "Definition: A purpose; something that is intended.",
    pronunciation: "/ɪnˈtɛnt/",
    englishEquivalent: "intent"
  },
  {
    word: "disguisement",
    definition: "Definition: Disguise (deceptive appearance)",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "disguisement"
  },
  {
    word: "inculcating",
    definition: "Definition: To teach by repeated instruction.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "inculcating"
  },
  {
    word: "alway",
    definition: "Definition: At all times; throughout all time; since the beginning.",
    pronunciation: "/ˈɔːl.weɪ/",
    englishEquivalent: "alway"
  },
  {
    word: "ditsiest",
    definition: "Definition: Silly or scatterbrained, usually of a young woman.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "ditsiest"
  },
  {
    word: "noisemakers",
    definition: "Definition: A person or device that produces a great deal of noise, especially one used in a celebration or sporting event.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "noisemakers"
  },
  {
    word: "congeners",
    definition: "Definition: A plant or animal of the same taxonomic genus as another.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "congeners"
  },
  {
    word: "nautiloid",
    definition: "Definition: A mollusc resembling a nautilus; specifically, a cephalopod of the subclass Nautiloidea.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "nautiloid"
  },
  {
    word: "raftsman",
    definition: "Definition: A person who transports a raft of floating logs downstream to a sawmill; a rafter.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "raftsman"
  },
  {
    word: "actuating",
    definition: "Definition: To activate, or to put into motion; to animate.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "actuating"
  },
  {
    word: "loftier",
    definition: "Definition: High, tall, having great height or stature",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "loftier"
  },
  {
    word: "desalinates",
    definition: "Definition: To remove the salt from something, especially from seawater for use in a domestic water supply",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "desalinates"
  },
  {
    word: "wrigglers",
    definition: "Definition: Anything that wriggles.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "wrigglers"
  },
  {
    word: "legators",
    definition: "Definition: A donor.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "legators"
  },
  {
    word: "recurs",
    definition: "Definition: To have recourse (to) someone or something for assistance, support etc.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "recurs"
  },
  {
    word: "planting",
    definition: "Definition: To place (a seed or plant) in soil or other substrate in order that it may live and grow.",
    pronunciation: "/ˈplɑːntɪŋ/",
    englishEquivalent: "planting"
  },
  {
    word: "percipiences",
    definition: "Definition: Perception",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "percipiences"
  },
  {
    word: "murther",
    definition: "Definition: The crime of deliberately killing another person without justification.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "murther"
  },
  {
    word: "ratfishes",
    definition: "Definition: A fish of any of the species in family Chimaeridae.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "ratfishes"
  },
  {
    word: "painstaking",
    definition: "Definition: The application of careful and attentive effort.",
    pronunciation: "/ˈpeɪnzˌteɪkɪŋ/",
    englishEquivalent: "painstaking"
  },
  {
    word: "diurnal",
    definition: "Definition: A flower that opens only in the day.",
    pronunciation: "/daɪˈɜːnəɫ/",
    englishEquivalent: "diurnal"
  },
  {
    word: "reprints",
    definition: "Definition: A book, pamphlet or other printed matter that has been published once before but is now being released again.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "reprints"
  },
  {
    word: "peyote",
    definition: "Definition: A small, spineless cactus (Lophophora williamsii) found from southwest United States to central Mexico that produces buttonlike tubercles that can be chewed for its psychedelic effect, primarily from the drug mescaline.",
    pronunciation: "/peɪˈjoʊti/",
    englishEquivalent: "peyote"
  },
  {
    word: "tenias",
    definition: "Definition: A ribbon worn in the hair in ancient Greece.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tenias"
  },
  {
    word: "villanella",
    definition: "Definition: An old rustic dance, accompanied by singing.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "villanella"
  },
  {
    word: "microprocessors",
    definition: "Definition: The entire CPU of a computer on a single integrated circuit (chip).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "microprocessors"
  },
  {
    word: "hexachords",
    definition: "Definition: A series of six tones denoted with the syllables ut-re-mi-fa-sol-la separated by seconds, the only of which that is a minor second being mi-fa.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "hexachords"
  },
  {
    word: "lambasting",
    definition: "Definition: To scold, reprimand or criticize harshly.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "lambasting"
  },
  {
    word: "uncrumpled",
    definition: "Definition: To return something that has been crumpled closer to its original state.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "uncrumpled"
  },
  {
    word: "pretrial",
    definition: "Definition: A preliminary trial held in advance of a court trial.",
    pronunciation: "/pɹɪˈtɹaɪəl/",
    englishEquivalent: "pretrial"
  },
  {
    word: "daring",
    definition: "Definition: To have enough courage (to do something).",
    pronunciation: "/ˈdɛəɹɪŋ/",
    englishEquivalent: "daring"
  },
  {
    word: "throne",
    definition: "Definition: An impressive seat used by a monarch, often on a raised dais in a throne room and reserved for formal occasions.",
    pronunciation: "/[θɹəʊn]/",
    englishEquivalent: "throne"
  },
  {
    word: "overthrows",
    definition: "Definition: A removal, especially of a ruler or government, by force or threat of force.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "overthrows"
  },
  {
    word: "ticker",
    definition: "Definition: One who makes a tick mark.",
    pronunciation: "/tɪkə(ɹ)/",
    englishEquivalent: "ticker"
  },
  {
    word: "multiplicand",
    definition: "Definition: A number that is to be multiplied by another (the multiplier).",
    pronunciation: "/ˌmʌltəplɪˈkænd/",
    englishEquivalent: "multiplicand"
  },
  {
    word: "platelet",
    definition: "Definition: A small colorless disk-shaped particle found in the blood of mammals, which plays an important role in the formation of blood clots.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "platelet"
  },
  {
    word: "houseplant",
    definition: "Definition: A plant that is grown indoors in places such as a house or office for decorative purposes.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "houseplant"
  },
  {
    word: "reputations",
    definition: "Definition: What somebody is known for.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "reputations"
  },
  {
    word: "vises",
    definition: "Definition: An instrument consisting of two jaws, closing by a screw, lever, cam, or the like, for holding work, as in filing.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "vises"
  },
  {
    word: "chastening",
    definition: "Definition: To punish (in order to bring about improvement in behavior, attitude, etc.); to restrain, moderate.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "chastening"
  },
  {
    word: "mariculture",
    definition: "Definition: Aquaculture using seawater",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "mariculture"
  },
  {
    word: "headstalls",
    definition: "Definition: The part of a bridle that fits over a horse's head and supports other elements.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "headstalls"
  },
  {
    word: "blathering",
    definition: "Definition: To talk rapidly without making much sense.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "blathering"
  },
  {
    word: "unswathing",
    definition: "Definition: To remove a swathe from.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unswathing"
  },
  {
    word: "estaminets",
    definition: "Definition: A small café or bar.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "estaminets"
  },
  {
    word: "overexploited",
    definition: "Definition: To exploit excessively",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "overexploited"
  },
  {
    word: "litany",
    definition: "Definition: A ritual liturgical prayer in which a series of prayers recited by a leader are alternated with responses from the congregation.",
    pronunciation: "/ˈlɪtəni/",
    englishEquivalent: "litany"
  },
  {
    word: "papule",
    definition: "Definition: A small, inflammatory, irritated spot on the skin, similar in appearance to a pimple, but not containing pus.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "papule"
  },
  {
    word: "overissues",
    definition: "Definition: To issue shares or banknotes to an extent beyond the ability to pay, or in excess of authorization",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "overissues"
  },
  {
    word: "heavenwards",
    definition: "Definition: Upwards, in the direction of the sky or heavens.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "heavenwards"
  },
  {
    word: "hypocrisies",
    definition: "Definition: The contrivance of a false appearance of virtue or goodness, while concealing real character or inclinations, especially with respect to religious and moral beliefs; hence in general sense, dissimulation, pretence, sham.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "hypocrisies"
  },
  {
    word: "engage",
    definition: "Definition: (heading) To interact socially.",
    pronunciation: "/ɛnˈɡeɪdʒ/",
    englishEquivalent: "engage"
  },
  {
    word: "unmooring",
    definition: "Definition: To unfix or unsecure (a moored boat).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unmooring"
  },
  {
    word: "dewclaw",
    definition: "Definition: A vestigial digit, hoof or claw that does not reach the ground.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "dewclaw"
  },
  {
    word: "spondaic",
    definition: "Definition: Having or relating to spondees.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "spondaic"
  },
  {
    word: "cumulonimbus",
    definition: "Definition: A cloud, with a tall structure and a flat base, that is often associated with thunderstorms.",
    pronunciation: "/ˌkjuːmələʊˈnɪmbəs/",
    englishEquivalent: "cumulonimbus"
  },
  {
    word: "scares",
    definition: "Definition: A minor fright.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "scares"
  },
  {
    word: "obsolescing",
    definition: "Definition: To become obsolete.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "obsolescing"
  },
  {
    word: "disc",
    definition: "Definition: A thin, flat, circular plate or similar object.",
    pronunciation: "/dɪsk/",
    englishEquivalent: "disc"
  },
  {
    word: "counteracted",
    definition: "Definition: To have a contrary or opposing effect or force on",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "counteracted"
  },
  {
    word: "soloist",
    definition: "Definition: A person who performs a solo.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "soloist"
  },
  {
    word: "bronchogenic",
    definition: "Definition: Originating in the bronchus.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "bronchogenic"
  },
  {
    word: "ganoid",
    definition: "Definition: One of the Ganoidei, a disused taxonomic grouping of fishes, including the bowfin, gars, and sturgeons.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "ganoid"
  },
  {
    word: "velodromes",
    definition: "Definition: An indoor arena, having an oval banked track for bicycle racing.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "velodromes"
  },
  {
    word: "payed",
    definition: "Definition: To give money or other compensation to in exchange for goods or services.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "payed"
  },
  {
    word: "unthreaded",
    definition: "Definition: To draw or remove a thread from.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unthreaded"
  },
  {
    word: "dace",
    definition: "Definition: The shoal-forming fish Leuciscus leuciscus common in fast-flowing rivers in England and Wales and in Europe.",
    pronunciation: "/deɪs/",
    englishEquivalent: "dace"
  },
  {
    word: "relicenses",
    definition: "Definition: To issue a renewed license",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "relicenses"
  },
  {
    word: "glamourize",
    definition: "Definition: To make or give the appearance of being glamorous.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "glamourize"
  },
  {
    word: "obliged",
    definition: "Definition: To constrain someone by force or by social, moral or legal means.",
    pronunciation: "/əˈblaɪdʒd/",
    englishEquivalent: "obliged"
  },
  {
    word: "perique",
    definition: "Definition: A kind of tobacco with medium-sized leaf, small stem, and tough and gummy fiber, raised in Louisiana and cured in its own juices, so as to be very dark in color. It is marketed in tightly wrapped rolls called carottes.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "perique"
  },
  {
    word: "choreas",
    definition: "Definition: An Ancient Greek circular dance accompanied by a chorus.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "choreas"
  },
  {
    word: "plainsong",
    definition: "Definition: A form of monophonic chant in unison using the Gregorian scale, sung in various Christian churches.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "plainsong"
  },
  {
    word: "fornicated",
    definition: "Definition: To engage in fornication; to have sex, especially illicit sex.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "fornicated"
  },
  {
    word: "carnivals",
    definition: "Definition: Any of a number of festivals held just before the beginning of Lent.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "carnivals"
  },
  {
    word: "befriends",
    definition: "Definition: To become a friend of, to make friends with.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "befriends"
  },
  {
    word: "reasonably",
    definition: "Definition: In accordance with reason.",
    pronunciation: "/ˈɹiː.zən.ə.bli/",
    englishEquivalent: "reasonably"
  },
  {
    word: "juvenescence",
    definition: "Definition: The state of becoming young or juvenile.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "juvenescence"
  },
  {
    word: "anathematize",
    definition: "Definition: To cause to be, or to declare as, an anathema or evil.",
    pronunciation: "/əˈnæ.θə.mə.taɪz/",
    englishEquivalent: "anathematize"
  },
  {
    word: "catacombs",
    definition: "Definition: (often plural) An underground system of tunnels and chambers with recesses for graves, used (in former times) as a cemetery; a tunnel system used for burying the dead, as in Paris or Ancient Rome.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "catacombs"
  },
  {
    word: "develop",
    definition: "Definition: To change with a specific direction, progress.",
    pronunciation: "/dɛˈvɛ.ləp/",
    englishEquivalent: "develop"
  },
  {
    word: "spheroplasts",
    definition: "Definition: A cell from which the cell wall has been removed",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "spheroplasts"
  },
  {
    word: "churring",
    definition: "Definition: To make the prolonged trilling sound of an insect (e.g. a grasshopper, a cicada).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "churring"
  },
  {
    word: "fossiliferous",
    definition: "Definition: Containing fossils.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "fossiliferous"
  },
  {
    word: "inhalations",
    definition: "Definition: The act of inhaling; inbreathing.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "inhalations"
  },
  {
    word: "ripening",
    definition: "Definition: To grow ripe; to become mature (said of grain, fruit, flowers etc.)",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "ripening"
  },
  {
    word: "wallets",
    definition: "Definition: A small case, often flat and often made of leather, for keeping money (especially paper money), credit cards, etc.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "wallets"
  },
  {
    word: "trumped",
    definition: "Definition: To play on (a card of another suit) with a trump.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "trumped"
  },
  {
    word: "sceptres",
    definition: "Definition: An ornamental staff held by a ruling monarch as a symbol of power.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sceptres"
  },
  {
    word: "lyase",
    definition: "Definition: Any of many classes of enzyme that catalyze the breaking of a specific form of bond",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "lyase"
  },
  {
    word: "hillside",
    definition: "Definition: The side of a hill.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "hillside"
  },
  {
    word: "automatize",
    definition: "Definition: To make or become automatic.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "automatize"
  },
  {
    word: "disconfirms",
    definition: "Definition: To establish the falsity of a claim or belief; to show or to tend to show that a theory or hypothesis is not valid.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "disconfirms"
  },
  {
    word: "cunner",
    definition: "Definition: A marine European fish (Symphodus melops).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "cunner"
  },
  {
    word: "chokey",
    definition: "Definition: Reminiscent of choking.",
    pronunciation: "/ˈtʃəʊki/",
    englishEquivalent: "chokey"
  },
  {
    word: "fragging",
    definition: "Definition: To deliberately kill (one's superior officer) with a fragmentation grenade.",
    pronunciation: "/ˈfɹæɡɪŋ/",
    englishEquivalent: "fragging"
  },
  {
    word: "retextured",
    definition: "Definition: To give a new texture to.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "retextured"
  },
  {
    word: "precedency",
    definition: "Definition: Precedence; superiority.",
    pronunciation: "/ˈpɹɛsɪdənsi/",
    englishEquivalent: "precedency"
  },
  {
    word: "nonperformance",
    definition: "Definition: A failure to perform a task, especially a task that one was legally bound to do.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "nonperformance"
  },
  {
    word: "campaigners",
    definition: "Definition: A person who has served in a military campaign.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "campaigners"
  },
  {
    word: "dandiest",
    definition: "Definition: Like a dandy, foppish.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "dandiest"
  },
  {
    word: "jebel",
    definition: "Definition: A hill, a mountain (especially in the Middle East or North Africa).",
    pronunciation: "/ˈdʒɛbəl/",
    englishEquivalent: "jebel"
  },
  {
    word: "obelia",
    definition: "Definition: Any of various colonial marine hydroids of the genus Obelia.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "obelia"
  },
  {
    word: "fobs",
    definition: "Definition: A little pocket near the waistline of a pair of trousers or in a waistcoat or vest to hold a pocketwatch; a watch pocket.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "fobs"
  },
  {
    word: "straddle",
    definition: "Definition: A posture in which one straddles something.",
    pronunciation: "/ˈstɹæd.əl/",
    englishEquivalent: "straddle"
  },
  {
    word: "stadia",
    definition: "Definition: A level staff or graduated rod used by surveyors to measure differences in level, or to measure horizontal distances by sighting the stadia hairs (graduations) through a telescope.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "stadia"
  },
  {
    word: "undecideds",
    definition: "Definition: A voter etc. who has not yet come to a decision.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "undecideds"
  },
  {
    word: "sinks",
    definition: "Definition: A basin used for holding water for washing.",
    pronunciation: "/sɪŋks/",
    englishEquivalent: "sinks"
  },
  {
    word: "woolpacks",
    definition: "Definition: A bag of wool, traditionally weighing 240 pounds.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "woolpacks"
  },
  {
    word: "wee",
    definition: "Definition: A short time or short distance.",
    pronunciation: "/wiː/",
    englishEquivalent: "wee"
  },
  {
    word: "delirium",
    definition: "Definition: A temporary mental state with a sudden onset, usually reversible, including symptoms of confusion, inability to concentrate, disorientation, anxiety, and sometimes hallucinations. Causes can include dehydration, drug intoxication, and severe infection.",
    pronunciation: "/dɪˈlɪɹɪəm/",
    englishEquivalent: "delirium"
  },
  {
    word: "kasha",
    definition: "Definition: A porridge made from boiled buckwheat groats, or sometimes from other cereal groats.",
    pronunciation: "/ˈkɑʃə/",
    englishEquivalent: "kasha"
  },
  {
    word: "solarise",
    definition: "Definition: To subject to solarization.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "solarise"
  },
  {
    word: "biffed",
    definition: "Definition: To punch or hit.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "biffed"
  },
  {
    word: "handedness",
    definition: "Definition: The property that distinguishes an asymmetric object from its mirror image. For example, the essential difference between a left and right glove.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "handedness"
  },
  {
    word: "coppices",
    definition: "Definition: A grove of small growth; a thicket of brushwood; a wood cut at certain times for fuel or other purposes, typically managed to promote growth and ensure a reliable supply of timber. See copse.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "coppices"
  },
  {
    word: "whirl",
    definition: "Definition: An act of whirling.",
    pronunciation: "/ʍɪɾ(ə̯)l/",
    englishEquivalent: "whirl"
  },
  {
    word: "superposed",
    definition: "Definition: To place (one thing) on top of another.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "superposed"
  },
  {
    word: "sectarianized",
    definition: "Definition: To imbue with sectarian feelings; to subject to the control of a sect.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sectarianized"
  },
  {
    word: "squishing",
    definition: "Definition: To squeeze, compress, or crush (especially something moist).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "squishing"
  },
  {
    word: "nonalignments",
    definition: "Definition: The condition of being nonaligned",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "nonalignments"
  },
  {
    word: "insanity",
    definition: "Definition: The state of being insane; madness.",
    pronunciation: "/ɪnˈsænɪti/",
    englishEquivalent: "insanity"
  },
  {
    word: "cigarillo",
    definition: "Definition: A thin cigar, differing from a cigarette in being wrapped with tobacco leaves rather than paper.",
    pronunciation: "/ˌsɪɡəˈɹɪloʊ/",
    englishEquivalent: "cigarillo"
  },
  {
    word: "belabor",
    definition: "Definition: To labour about; labour over; work hard upon; ply diligently.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "belabor"
  },
  {
    word: "moggy",
    definition: "Definition: A young cow or bull.",
    pronunciation: "/ˈmɒɡi/",
    englishEquivalent: "moggy"
  },
  {
    word: "badminton",
    definition: "Definition: A racquet sport played indoors on a court by two opposing players (singles) or two opposing pairs of players (doubles), in which a shuttlecock is volleyed over a net and the competitions are presided by an umpire in British English and a referee in American English.",
    pronunciation: "/ˈbæd.mɪn.tən/",
    englishEquivalent: "badminton"
  },
  {
    word: "wassailing",
    definition: "Definition: To toast, to drink to the health of another.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "wassailing"
  },
  {
    word: "monteith",
    definition: "Definition: A bowl used for the cooling or washing of wine glasses.",
    pronunciation: "/mɒnˈtiːθ/",
    englishEquivalent: "monteith"
  },
  {
    word: "refurnishes",
    definition: "Definition: To furnish again; to get new furniture for.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "refurnishes"
  },
  {
    word: "warm",
    definition: "Definition: Having a temperature slightly higher than usual, but still pleasant; mildly hot.",
    pronunciation: "/wɔːm/",
    englishEquivalent: "warm"
  },
  {
    word: "distributed",
    definition: "Definition: To divide into portions and dispense.",
    pronunciation: "/dɪsˈtɹɪbjutɪd/",
    englishEquivalent: "distributed"
  },
  {
    word: "groups",
    definition: "Definition: A number of things or persons being in some relation to one another.",
    pronunciation: "/ɡɹuːps/",
    englishEquivalent: "groups"
  },
  {
    word: "pepper",
    definition: "Definition: A plant of the family Piperaceae.",
    pronunciation: "/ˈpɛpə/",
    englishEquivalent: "pepper"
  },
  {
    word: "penetrates",
    definition: "Definition: To enter into; to make way into the interior of; to pierce.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "penetrates"
  },
  {
    word: "tonier",
    definition: "Definition: Stylish, high-toned, upscale.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tonier"
  },
  {
    word: "acidify",
    definition: "Definition: To make something (more) acidic or sour; to convert into an acid.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "acidify"
  },
  {
    word: "learns",
    definition: "Definition: To acquire, or attempt to acquire knowledge or an ability to do something.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "learns"
  },
  {
    word: "hematites",
    definition: "Definition: An iron ore, mainly peroxide of iron, Fe2O3.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "hematites"
  },
  {
    word: "bleepers",
    definition: "Definition: Something or someone that bleeps.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "bleepers"
  },
  {
    word: "credos",
    definition: "Definition: A belief system.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "credos"
  },
  {
    word: "hater",
    definition: "Definition: One who hates.",
    pronunciation: "/ˈheɪtə(ɹ)/",
    englishEquivalent: "hater"
  },
  {
    word: "tactics",
    definition: "Definition: A maneuver, or action calculated to achieve some end.",
    pronunciation: "/ˈtæktɪks/",
    englishEquivalent: "tactics"
  },
  {
    word: "cablegrams",
    definition: "Definition: A telegram transmitted via a submarine cable.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "cablegrams"
  },
  {
    word: "motherfuckers",
    definition: "Definition: (strongly vulgar) An extremely contemptible or mean person.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "motherfuckers"
  },
  {
    word: "jazzes",
    definition: "Definition: To destroy.",
    pronunciation: "/ˈdʒæzɪz/",
    englishEquivalent: "jazzes"
  },
  {
    word: "hassium",
    definition: "Definition: An artificially-produced transuranic chemical element (symbol Hs) with atomic number 108.",
    pronunciation: "/ˈhæsiəm/",
    englishEquivalent: "hassium"
  },
  {
    word: "pyrolusite",
    definition: "Definition: A dark coloured mineral, consisting of manganese dioxide (MnO2), that is an important ore of manganese.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pyrolusite"
  },
  {
    word: "reparations",
    definition: "Definition: (usually in the plural) A payment of time, effort or money to undo past transgression(s).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "reparations"
  },
  {
    word: "sacrilege",
    definition: "Definition: Desecration, profanation, misuse or violation of something regarded as sacred.",
    pronunciation: "/ˈsækɹɪlɪd͡ʒ/",
    englishEquivalent: "sacrilege"
  },
  {
    word: "lassoing",
    definition: "Definition: To catch with a lasso.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "lassoing"
  },
  {
    word: "naevi",
    definition: "Definition: A pigmented, raised or otherwise abnormal area on the skin. Naevi may be congenital or acquired, and are always benign.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "naevi"
  },
  {
    word: "parceners",
    definition: "Definition: A coheir, or one of two or more heirs to an estate that descends jointly, and by whom it is held as a single estate.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "parceners"
  },
  {
    word: "dualisms",
    definition: "Definition: Duality; the condition of being double.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "dualisms"
  },
  {
    word: "viscountess",
    definition: "Definition: The wife of a viscount.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "viscountess"
  },
  {
    word: "pirouette",
    definition: "Definition: A whirling or turning on the toes in dancing, primarily in ballet.",
    pronunciation: "/ˌpɪ.ɹuːˈɛt/",
    englishEquivalent: "pirouette"
  },
  {
    word: "preselect",
    definition: "Definition: To select in advance.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "preselect"
  },
  {
    word: "rovers",
    definition: "Definition: (usually in the plural) A randomly selected target.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "rovers"
  },
  {
    word: "esters",
    definition: "Definition: A compound most often formed by the condensation of an alcohol and an acid, with elimination of water, which contains the functional group carbon-oxygen double bond joined via carbon to another oxygen atom.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "esters"
  },
  {
    word: "integrand",
    definition: "Definition: The function that is to be integrated",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "integrand"
  },
  {
    word: "albacore",
    definition: "Definition: A large marine fish Thunnus alalunga of warm seas, having edible flesh.",
    pronunciation: "/ˈæl.bə.kɔɹ/",
    englishEquivalent: "albacore"
  },
  {
    word: "basipetal",
    definition: "Definition: That develops, matures or opens from the apex towards the base in sequence",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "basipetal"
  },
  {
    word: "nonvegetarian",
    definition: "Definition: One who is not a vegetarian.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "nonvegetarian"
  },
  {
    word: "ancones",
    definition: "Definition: The corner of a wall or rafter.",
    pronunciation: "/æŋˈkəʊniːz/",
    englishEquivalent: "ancones"
  },
  {
    word: "purpling",
    definition: "Definition: To turn purple in colour.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "purpling"
  },
  {
    word: "impudences",
    definition: "Definition: The quality of being impudent, not showing due respect.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "impudences"
  },
  {
    word: "coded",
    definition: "Definition: To write software programs.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "coded"
  },
  {
    word: "barkeeps",
    definition: "Definition: A bartender",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "barkeeps"
  },
  {
    word: "parcels",
    definition: "Definition: A package wrapped for shipment.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "parcels"
  },
  {
    word: "graved",
    definition: "Definition: To dig.",
    pronunciation: "/ɡɹeɪvd/",
    englishEquivalent: "graved"
  },
  {
    word: "presoak",
    definition: "Definition: An initial soak.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "presoak"
  },
  {
    word: "maudlin",
    definition: "Definition: The Magdalene; Mary Magdalene.",
    pronunciation: "/ˈmɔːd.lɪn/",
    englishEquivalent: "maudlin"
  },
  {
    word: "entamebae",
    definition: "Definition: Any of many parasitic amoebas, of the genus Entamoeba, that cause dysentery etc.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "entamebae"
  },
  {
    word: "urgencies",
    definition: "Definition: The quality or condition of being urgent",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "urgencies"
  },
  {
    word: "nosedives",
    definition: "Definition: A headfirst fall or jump.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "nosedives"
  },
  {
    word: "erythroid",
    definition: "Definition: Having a red colour; reddish",
    pronunciation: "/ɪˈɹɪθɹɔɪd/",
    englishEquivalent: "erythroid"
  },
  {
    word: "outacted",
    definition: "Definition: To act (play a role in theatre, film etc.) better than.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "outacted"
  },
  {
    word: "disallows",
    definition: "Definition: To refuse to allow",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "disallows"
  },
  {
    word: "indicates",
    definition: "Definition: To point out; to discover; to direct to a knowledge of; to show; to make known.",
    pronunciation: "/ˈɪndɪkeɪts/",
    englishEquivalent: "indicates"
  },
  {
    word: "uncontradicted",
    definition: "Definition: Not contradicted; without contradiction; unquestioned.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "uncontradicted"
  },
  {
    word: "mixer",
    definition: "Definition: One who, or a device that, mixes or merges things together.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "mixer"
  },
  {
    word: "sarsen",
    definition: "Definition: Any of various blocks of sandstone found in various locations in southern England.",
    pronunciation: "/ˈsɑː(ɹ)sən/",
    englishEquivalent: "sarsen"
  },
  {
    word: "ivories",
    definition: "Definition: The keys of a piano.",
    pronunciation: "/ˈaɪvəɹiːz/",
    englishEquivalent: "ivories"
  },
  {
    word: "parachute",
    definition: "Definition: A device, generally constructed from fabric, that is designed to employ air resistance to control the fall of an object.",
    pronunciation: "/ˈpæɹəʃuːt/",
    englishEquivalent: "parachute"
  },
  {
    word: "disinherited",
    definition: "Definition: To exclude from inheritance; to disown.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "disinherited"
  },
  {
    word: "inotropic",
    definition: "Definition: An inotropic heart drug.",
    pronunciation: "/ˌɪn.əˈtɹɒp.ɪk/",
    englishEquivalent: "inotropic"
  },
  {
    word: "inundations",
    definition: "Definition: The act of inundating; an overflow; a flood; a rising and spreading of water over grounds.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "inundations"
  },
  {
    word: "disc",
    definition: "Definition: A thin, flat, circular plate or similar object.",
    pronunciation: "/dɪsk/",
    englishEquivalent: "disc"
  },
  {
    word: "chastening",
    definition: "Definition: To punish (in order to bring about improvement in behavior, attitude, etc.); to restrain, moderate.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "chastening"
  },
  {
    word: "letterform",
    definition: "Definition: The shape of an individual letter",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "letterform"
  },
  {
    word: "exuded",
    definition: "Definition: To discharge through pores or incisions, as moisture or other liquid matter; to give out.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "exuded"
  },
  {
    word: "epigrams",
    definition: "Definition: An inscription in stone.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "epigrams"
  },
  {
    word: "sylphs",
    definition: "Definition: An invisible being of the air.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sylphs"
  },
  {
    word: "hotted",
    definition: "Definition: (with up) To heat; to make or become hot.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "hotted"
  },
  {
    word: "overtrumps",
    definition: "Definition: To play a higher trump card than the previous one in a trick",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "overtrumps"
  },
  {
    word: "unwillingness",
    definition: "Definition: The property of being unwilling.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unwillingness"
  },
  {
    word: "some",
    definition: "Definition: Of a measurement: approximately, roughly.",
    pronunciation: "/sɐm/",
    englishEquivalent: "some"
  },
  {
    word: "girning",
    definition: "Definition: To grimace; to snarl.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "girning"
  },
  {
    word: "contributed",
    definition: "Definition: To give something that is or becomes part of a larger whole.",
    pronunciation: "/ˈkɒntɹɪˌbjuːtɪd/",
    englishEquivalent: "contributed"
  },
  {
    word: "selectees",
    definition: "Definition: A person who is selected.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "selectees"
  },
  {
    word: "tenacity",
    definition: "Definition: The quality or state of being tenacious, or persistence of purpose; tenaciousness.",
    pronunciation: "/təˈnæs.ɪ.ti/",
    englishEquivalent: "tenacity"
  },
  {
    word: "corn",
    definition: "Definition: The main cereal plant grown for its grain in a given region, such as oats in parts of Scotland and Ireland, and wheat or barley in England and Wales.",
    pronunciation: "/kɔɹn/",
    englishEquivalent: "corn"
  },
  {
    word: "regilds",
    definition: "Definition: To gild again.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "regilds"
  },
  {
    word: "paradiddle",
    definition: "Definition: A percussive exercise (one of 26 drum rudiments) which involves playing four even strokes in the order ‘right left right right’ or ‘left right left left’",
    pronunciation: "/ˈpæɹəˌdɪdəl/",
    englishEquivalent: "paradiddle"
  },
  {
    word: "variously",
    definition: "Definition: In various ways; diversely.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "variously"
  },
  {
    word: "chipboard",
    definition: "Definition: A building material made from wood chips compressed and bound with synthetic resin.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "chipboard"
  },
  {
    word: "rapacious",
    definition: "Definition: Voracious; avaricious.",
    pronunciation: "/ɹəˈpeɪ.ʃəs/",
    englishEquivalent: "rapacious"
  },
  {
    word: "falsehoods",
    definition: "Definition: The property of being false.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "falsehoods"
  },
  {
    word: "performing",
    definition: "Definition: To do something; to execute.",
    pronunciation: "/pəˈfɔːmɪŋ/",
    englishEquivalent: "performing"
  },
  {
    word: "grim",
    definition: "Definition: Specter, ghost, haunting spirit",
    pronunciation: "/ɡɹɪm/",
    englishEquivalent: "grim"
  },
  {
    word: "laneway",
    definition: "Definition: A narrow roadway; a lane",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "laneway"
  },
  {
    word: "misprinting",
    definition: "Definition: To make a misprint.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "misprinting"
  },
  {
    word: "molars",
    definition: "Definition: A back tooth having a broad surface used for grinding one's food.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "molars"
  },
  {
    word: "quarrelling",
    definition: "Definition: To disagree.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "quarrelling"
  },
  {
    word: "cenacle",
    definition: "Definition: A dining room, especially one on an upper floor (traditionally the room in which the Last Supper took place).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "cenacle"
  },
  {
    word: "vizier",
    definition: "Definition: A high-ranking official or minister in an Islamic government, especially in the Ottoman Empire.",
    pronunciation: "/vɪˈzɪə/",
    englishEquivalent: "vizier"
  },
  {
    word: "teratology",
    definition: "Definition: The study of teratogenesis, congenital malformations or grossly deformed individuals.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "teratology"
  },
  {
    word: "porpoising",
    definition: "Definition: Said of an air-breathing aquatic animal such as a porpoise or penguin: To repeatedly jump out of the water to take a breath and dive back in a continuous motion.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "porpoising"
  },
  {
    word: "bluestockings",
    definition: "Definition: A scholarly, literary, or cultured woman.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "bluestockings"
  },
  {
    word: "hunches",
    definition: "Definition: A hump; a protuberance.",
    pronunciation: "/ˈhʌntʃɪz/",
    englishEquivalent: "hunches"
  },
  {
    word: "chernozem",
    definition: "Definition: A fertile black soil containing a very high percentage of humus (3% to 15%) and high percentages of phosphoric acids, phosphorus and ammonia.",
    pronunciation: "/ˈt͡ʃɜː(ɹ)nəˌzɛm/",
    englishEquivalent: "chernozem"
  },
  {
    word: "homolog",
    definition: "Definition: Something homologous; a homologous organ or part, chemical compound or chromosome.",
    pronunciation: "/ˈhɒməlɒɡ/",
    englishEquivalent: "homolog"
  },
  {
    word: "resemblers",
    definition: "Definition: A person who resembles another.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "resemblers"
  },
  {
    word: "spadices",
    definition: "Definition: A fleshy spike (inflorescence) with reduced flowers, usually enclosed by a spathe, characteristic of aroids.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "spadices"
  },
  {
    word: "elephantiasis",
    definition: "Definition: A complication of chronic filariasis, in which nematode worms block the lymphatic vessels, usually in the legs or scrotum, causing extreme enlargement of the infected area.",
    pronunciation: "/ˌɛlɪfənˈtaɪəsɪs/",
    englishEquivalent: "elephantiasis"
  },
  {
    word: "respiring",
    definition: "Definition: To breathe in and out; to engage in the process of respiration.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "respiring"
  },
  {
    word: "unobtrusively",
    definition: "Definition: In an unobtrusive manner; in a manner that is not noticeable or blatant.",
    pronunciation: "/ˌʌn.əbˈtɹuː.sɪv.li/",
    englishEquivalent: "unobtrusively"
  },
  {
    word: "whelps",
    definition: "Definition: A young offspring of a canid (ursid, felid, pinniped), especially of a dog or a wolf, the young of a bear or similar mammal (lion, tiger, seal); a pup, wolf cub.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "whelps"
  },
  {
    word: "spoiling",
    definition: "Definition: To strip (someone who has been killed or defeated) of their arms or armour.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "spoiling"
  },
  {
    word: "structuration",
    definition: "Definition: A theory proposed by Anthony Giddens in an attempt to reconcile theoretical dichotomies of social systems such as agency/structure, subjective/objective, and micro/macro perspectives.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "structuration"
  },
  {
    word: "navigating",
    definition: "Definition: To plan, control and record the position and course of a vehicle, ship, aircraft, etc., on a journey; to follow a planned course.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "navigating"
  },
  {
    word: "puffball",
    definition: "Definition: Any of various fungi that produce a cloud of brown dust-like spores from their mature fruiting bodies.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "puffball"
  },
  {
    word: "vacationers",
    definition: "Definition: Someone who is on vacation",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "vacationers"
  },
  {
    word: "microloans",
    definition: "Definition: A small loan, especially one extended to a poor person as part of a microcredit program of such lending intended to alleviate poverty.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "microloans"
  },
  {
    word: "infamous",
    definition: "Definition: Having a bad reputation, disreputable; notoriously bad, unpleasant or evil; widely known, especially for something bad.",
    pronunciation: "/ˈɪnfəməs/",
    englishEquivalent: "infamous"
  },
  {
    word: "chamise",
    definition: "Definition: An evergreen shrub native to California, Adenostoma fasciculatum in the botanical family Rosaceae",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "chamise"
  },
  {
    word: "fluidised",
    definition: "Definition: To give particles of solid the properties of a fluid, either by shaking or by injecting gas",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "fluidised"
  },
  {
    word: "resentful",
    definition: "Definition: Inclined to resent, who tends to harbor resentment, when wronged.",
    pronunciation: "/ɹɪˈzɛntfəl/",
    englishEquivalent: "resentful"
  },
  {
    word: "laburnum",
    definition: "Definition: Any tree of genus Laburnum. They have bright yellow flowers and are poisonous.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "laburnum"
  },
  {
    word: "watercourse",
    definition: "Definition: Any channel, either natural or artificial, through which water flows.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "watercourse"
  },
  {
    word: "crypto",
    definition: "Definition: A secret supporter or follower.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "crypto"
  },
  {
    word: "redeveloped",
    definition: "Definition: To develop again or differently.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "redeveloped"
  },
  {
    word: "cheesecakes",
    definition: "Definition: A pie made of sweetened and flavoured cottage cheese or cream cheese, eggs and milk on a crunchy base.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "cheesecakes"
  },
  {
    word: "dogeared",
    definition: "Definition: To fold the corner of a book's page.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "dogeared"
  },
  {
    word: "brashest",
    definition: "Definition: (of people or behaviour) Overly bold or self-assertive to the point of being insensitive, tactless or impudent; shameless.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "brashest"
  },
  {
    word: "articulates",
    definition: "Definition: To make clear or effective.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "articulates"
  },
  {
    word: "handrail",
    definition: "Definition: A rail which can be held, such as on the side of a staircase, ramp or other walkway, and serving as a support or guard.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "handrail"
  },
  {
    word: "kindle",
    definition: "Definition: To start (a fire) or light (a torch, a match, coals, etc.).",
    pronunciation: "/ˈkɪndl/",
    englishEquivalent: "kindle"
  },
  {
    word: "teasels",
    definition: "Definition: Any of several plants of the genus Dipsacus.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "teasels"
  },
  {
    word: "twelfths",
    definition: "Definition: One of twelve equal parts of a whole.",
    pronunciation: "/twɛlftθs/",
    englishEquivalent: "twelfths"
  },
  {
    word: "sequester",
    definition: "Definition: Sequestration; separation",
    pronunciation: "/səˈkwɛs.tə/",
    englishEquivalent: "sequester"
  },
  {
    word: "jokingly",
    definition: "Definition: In a joking manner.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "jokingly"
  },
  {
    word: "postmaster",
    definition: "Definition: The head of a post office.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "postmaster"
  },
  {
    word: "polity",
    definition: "Definition: An organizational structure of the government of a state, church, etc.",
    pronunciation: "/ˈpɑ.lɪ.ti/",
    englishEquivalent: "polity"
  },
  {
    word: "liaised",
    definition: "Definition: To establish a liaison.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "liaised"
  },
  {
    word: "horsewhipped",
    definition: "Definition: To flog or lash with a horsewhip.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "horsewhipped"
  },
  {
    word: "futhorc",
    definition: "Definition: The Runic alphabet as used to write Old English.",
    pronunciation: "/ˈfuːθɔːk/",
    englishEquivalent: "futhorc"
  },
  {
    word: "balkanized",
    definition: "Definition: To break up into small, mutually hostile units, especially on a political basis.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "balkanized"
  },
  {
    word: "tricornes",
    definition: "Definition: A three-sided hat with the brim turned up",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tricornes"
  },
  {
    word: "hoopsters",
    definition: "Definition: A basketball player.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "hoopsters"
  },
  {
    word: "pipette",
    definition: "Definition: A small tube, often with an enlargement or bulb in the middle, and usually graduated, used for transferring or delivering measured quantities of a liquid.",
    pronunciation: "/pɪˈpɛt/",
    englishEquivalent: "pipette"
  },
  {
    word: "violator",
    definition: "Definition: One who violates (a rule, a boundary, another person's body, etc.); offender",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "violator"
  },
  {
    word: "softwoods",
    definition: "Definition: The wood from any conifer (or from Ginkgo), without regard to how soft this wood is.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "softwoods"
  },
  {
    word: "purplest",
    definition: "Definition: Having a colour/color that is a dark blend of red and blue.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "purplest"
  },
  {
    word: "dairyman",
    definition: "Definition: A man who works in a dairy.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "dairyman"
  },
  {
    word: "squireen",
    definition: "Definition: (originally Ireland) A minor squire; a small landowner.",
    pronunciation: "/skwaɪəˈɹiːn/",
    englishEquivalent: "squireen"
  },
  {
    word: "decided",
    definition: "Definition: To resolve (a contest, problem, dispute, etc.); to choose, determine, or settle",
    pronunciation: "/dɪˈsaɪdəd/",
    englishEquivalent: "decided"
  },
  {
    word: "interconversion",
    definition: "Definition: Reciprocal or mutual conversion.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "interconversion"
  },
  {
    word: "sterilised",
    definition: "Definition: To deprive of the ability to procreate.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sterilised"
  },
  {
    word: "collyria",
    definition: "Definition: A lotion or liquid wash used as a cleanser for the eyes; an eye-salve.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "collyria"
  },
  {
    word: "chatelains",
    definition: "Definition: A castle-keeper, castellan.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "chatelains"
  },
  {
    word: "threshed",
    definition: "Definition: To separate the grain from the straw or husks (chaff) by mechanical beating, with a flail or machinery.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "threshed"
  },
  {
    word: "precipitins",
    definition: "Definition: Any antibody that reacts with an antigen to form a precipitate.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "precipitins"
  },
  {
    word: "lepta",
    definition: "Definition: A coin used since ancient times in Greece, serving in modern times as one hundredth of a phoenix, a drachma, and a euro (as the Greek form of the Eurocent).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "lepta"
  },
  {
    word: "quitting",
    definition: "Definition: To pay (a debt, fine etc.).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "quitting"
  },
  {
    word: "bribes",
    definition: "Definition: Something (usually money) given in exchange for influence or as an inducement to dishonesty.",
    pronunciation: "/bɹaɪbz/",
    englishEquivalent: "bribes"
  },
  {
    word: "blagging",
    definition: "Definition: To obtain (something) for free, particularly by guile or persuasion.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "blagging"
  },
  {
    word: "dent",
    definition: "Definition: A shallow deformation in the surface of an object, produced by an impact.",
    pronunciation: "/dɛnt/",
    englishEquivalent: "dent"
  },
  {
    word: "thunderhead",
    definition: "Definition: The top portion of a cumulonimbus cloud, which tends to be flattened or fibery in appearance, and may be indicative of thunderstorm activity.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "thunderhead"
  },
  {
    word: "memories",
    definition: "Definition: The ability of the brain to record information or impressions with the facility of recalling them later at will.",
    pronunciation: "/ˈmɛm(ə)ɹiz/",
    englishEquivalent: "memories"
  },
  {
    word: "dasher",
    definition: "Definition: A person who dashes; a fast runner.",
    pronunciation: "/ˈdæʃə(ɹ)/",
    englishEquivalent: "dasher"
  },
  {
    word: "decrescendos",
    definition: "Definition: An instruction to play gradually more softly.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "decrescendos"
  },
  {
    word: "cause",
    definition: "Definition: (often with of, typically of adverse results) The source of, or reason for, an event or action; that which produces or effects a result.",
    pronunciation: "/kɔːz/",
    englishEquivalent: "cause"
  },
  {
    word: "chancer",
    definition: "Definition: A scheming opportunist.",
    pronunciation: "/ˈtʃæn.sə(ɹ)/",
    englishEquivalent: "chancer"
  },
  {
    word: "fuller",
    definition: "Definition: Containing the maximum possible amount that can fit in the space available.",
    pronunciation: "/ˈfʊlə(ɹ)/",
    englishEquivalent: "fuller"
  },
  {
    word: "projectionist",
    definition: "Definition: A person who operates a film projector, especially one who does so as an occupation at a movie theatre or drive-in theatre.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "projectionist"
  },
  {
    word: "mucrones",
    definition: "Definition: A pointed end, often sharp, abruptly terminating an organ, such as a projection at the tip of a leaf; the posterior tip of a cuttlebone; or the distal part of the furcula in Collembola.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "mucrones"
  },
  {
    word: "sees",
    definition: "Definition: (stative) To perceive or detect with the eyes, or as if by sight.",
    pronunciation: "/siːz/",
    englishEquivalent: "sees"
  },
  {
    word: "circumstance",
    definition: "Definition: That which attends, or relates to, or in some way affects, a fact or event; an attendant thing or state of things.",
    pronunciation: "/-æns/",
    englishEquivalent: "circumstance"
  },
  {
    word: "maltster",
    definition: "Definition: A person who makes malt; a malter.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "maltster"
  },
  {
    word: "months",
    definition: "Definition: A period into which a year is divided, historically based on the phases of the moon.",
    pronunciation: "/mʌnθs/",
    englishEquivalent: "months"
  },
  {
    word: "labs",
    definition: "Definition: A laboratory.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "labs"
  },
  {
    word: "jitterbugged",
    definition: "Definition: To dance the jitterbug.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "jitterbugged"
  },
  {
    word: "captivities",
    definition: "Definition: The state of being captive.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "captivities"
  },
  {
    word: "choreas",
    definition: "Definition: An Ancient Greek circular dance accompanied by a chorus.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "choreas"
  },
  {
    word: "backpedalling",
    definition: "Definition: To pedal backwards on a bicycle.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "backpedalling"
  },
  {
    word: "monsignor",
    definition: "Definition: An ecclesiastic title bestowed on some Roman Catholic clerics by the Pope",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "monsignor"
  },
  {
    word: "prosimians",
    definition: "Definition: A primate that is not a monkey or an ape, generally nocturnal with large eyes and ears. Such primates were formerly grouped in the suborder Prosimii, but are now considered a paraphyletic group and not a clade.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "prosimians"
  },
  {
    word: "arithmetic",
    definition: "Definition: The mathematics of numbers (integers, rational numbers, real numbers, or complex numbers) under the operations of addition, subtraction, multiplication, and division.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "arithmetic"
  },
  {
    word: "rencountering",
    definition: "Definition: To meet, encounter, come into contact with.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "rencountering"
  },
  {
    word: "stills",
    definition: "Definition: A period of calm or silence.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "stills"
  },
  {
    word: "sloganeered",
    definition: "Definition: To make and disseminate slogans; often contrasted with substantive debate",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sloganeered"
  },
  {
    word: "chose",
    definition: "Definition: To pick; to make the choice of; to select.",
    pronunciation: "/tʃəʊz/",
    englishEquivalent: "chose"
  },
  {
    word: "lebkuchen",
    definition: "Definition: A traditional German Christmas biscuit form of gingerbread.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "lebkuchen"
  },
  {
    word: "unrecognizable",
    definition: "Definition: That cannot be recognized, especially because of substantial changes",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unrecognizable"
  },
  {
    word: "knights",
    definition: "Definition: A young servant or follower; a trained military attendant in service of a lord.",
    pronunciation: "/naɪts/",
    englishEquivalent: "knights"
  },
  {
    word: "reactivates",
    definition: "Definition: To activate again.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "reactivates"
  },
  {
    word: "eye",
    definition: "Definition: An organ through which animals see (perceive surroundings via light).",
    pronunciation: "/aɪ/",
    englishEquivalent: "eye"
  },
  {
    word: "meritocracies",
    definition: "Definition: Rule by merit, and talent.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "meritocracies"
  },
  {
    word: "epitomising",
    definition: "Definition: To make an epitome of; to shorten; to condense.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "epitomising"
  },
  {
    word: "okas",
    definition: "Definition: A former Turkish, Egyptian, Hungarian, and Romanian unit of weight, usually of a little more than a kilogram.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "okas"
  },
  {
    word: "speculates",
    definition: "Definition: To think, meditate or reflect on a subject; to consider, to deliberate or cogitate.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "speculates"
  },
  {
    word: "shinned",
    definition: "Definition: (as 'shin up') To climb a mast, tree, rope, or the like, by embracing it alternately with the arms and legs, without help of steps, spurs, or the like.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "shinned"
  },
  {
    word: "indued",
    definition: "Definition: To pass food into the stomach; to digest; also figuratively, to take on, absorb.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "indued"
  },
  {
    word: "fianchettoed",
    definition: "Definition: To play a fianchetto.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "fianchettoed"
  },
  {
    word: "dories",
    definition: "Definition: A small flat-bottomed boat with pointed or somewhat pointed ends, used for fishing both offshore and on rivers.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "dories"
  },
  {
    word: "interviewing",
    definition: "Definition: To ask questions of (somebody); to have an interview.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "interviewing"
  },
  {
    word: "unlawful",
    definition: "Definition: Prohibited; not permitted by law (either civil or criminal law; see illegal).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unlawful"
  },
  {
    word: "languages",
    definition: "Definition: A body of words, and set of methods of combining them (called a grammar), understood by a community and used as a form of communication.",
    pronunciation: "/ˈlæŋɡwɪd͡ʒɪz/",
    englishEquivalent: "languages"
  },
  {
    word: "tetraploids",
    definition: "Definition: A tetraploid cell.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tetraploids"
  },
  {
    word: "keratinized",
    definition: "Definition: To convert into keratin.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "keratinized"
  },
  {
    word: "catchwords",
    definition: "Definition: A word under the right-hand side of the last line on a book page that repeats the first word on the following page.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "catchwords"
  },
  {
    word: "pure",
    definition: "Definition: One who, or that which, is pure.",
    pronunciation: "/ˈpjɔː/",
    englishEquivalent: "pure"
  },
  {
    word: "patulous",
    definition: "Definition: Open; spread; exposed",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "patulous"
  },
  {
    word: "banyans",
    definition: "Definition: An Indian trader, merchant, cashier, or money changer.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "banyans"
  },
  {
    word: "assaulting",
    definition: "Definition: To attack, physically or figuratively.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "assaulting"
  },
  {
    word: "deckhands",
    definition: "Definition: A member of the crew of a merchant ship who performs manual labour.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "deckhands"
  },
  {
    word: "vibists",
    definition: "Definition: A vibraphone player; someone that plays the vibraphone.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "vibists"
  },
  {
    word: "pukes",
    definition: "Definition: Vomit.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pukes"
  },
  {
    word: "crispers",
    definition: "Definition: A cooled food storage container, used to cool items that do not require complete refrigeration.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "crispers"
  },
  {
    word: "activates",
    definition: "Definition: To encourage development or induce increased activity; to stimulate.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "activates"
  },
  {
    word: "waived",
    definition: "Definition: To relinquish (a right etc.); to give up claim to; to forego.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "waived"
  },
  {
    word: "manducated",
    definition: "Definition: To chew; to masticate.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "manducated"
  },
  {
    word: "aspirated",
    definition: "Definition: To remove a liquid or gas by means of suction.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "aspirated"
  },
  {
    word: "seignior",
    definition: "Definition: A feudal lord; a nobleman who held his lands by feudal grant; any lord (holder) of a manor",
    pronunciation: "/ˈseɪnjə/",
    englishEquivalent: "seignior"
  },
  {
    word: "oust",
    definition: "Definition: To expel; to remove.",
    pronunciation: "/ʌʊst/",
    englishEquivalent: "oust"
  },
  {
    word: "aquariums",
    definition: "Definition: A tank, often made of glass, for keeping live fish or other aquatic animals.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "aquariums"
  },
  {
    word: "yakitori",
    definition: "Definition: A Japanese shish kebab-type dish made with small pieces of chicken or other ingredients cooked on skewers, often marinated in soy sauce or seasoned with salt.",
    pronunciation: "/jækɪˈtɔəɹi/",
    englishEquivalent: "yakitori"
  },
  {
    word: "hope",
    definition: "Definition: To want something to happen, with a sense of expectation that it might.",
    pronunciation: "/həʊp/",
    englishEquivalent: "hope"
  },
  {
    word: "caramelises",
    definition: "Definition: To convert (sugar) into caramel.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "caramelises"
  },
  {
    word: "earthnut",
    definition: "Definition: Any of various roots, tubers, or pods that grow underground.",
    pronunciation: "/ˈɜː(ɹ)ɵ.nʌt/",
    englishEquivalent: "earthnut"
  },
  {
    word: "tentacles",
    definition: "Definition: An elongated, boneless, flexible organ or limb of some animals, such as the octopus and squid.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tentacles"
  },
  {
    word: "flimsier",
    definition: "Definition: Likely to bend or break under pressure.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "flimsier"
  },
  {
    word: "festers",
    definition: "Definition: To become septic; to become rotten.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "festers"
  },
  {
    word: "invaginated",
    definition: "Definition: To fold up or enclose into a sheath-like or pouch-like structure, either naturally or as part of a surgical procedure.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "invaginated"
  },
  {
    word: "bacteriostat",
    definition: "Definition: A biological or chemical agent that causes bacteriostasis.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "bacteriostat"
  },
  {
    word: "calibrating",
    definition: "Definition: To check or adjust by comparison with a standard.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "calibrating"
  },
  {
    word: "emplaned",
    definition: "Definition: To board an airplane",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "emplaned"
  },
  {
    word: "panacea",
    definition: "Definition: A remedy believed to cure all disease and prolong life that was originally sought by alchemists; a cure-all.",
    pronunciation: "/ˌpæn.əˈsiː.ə/",
    englishEquivalent: "panacea"
  },
  {
    word: "hetairai",
    definition: "Definition: A highly cultivated hired female companion who would entertain upper-class male clients and might perform sex acts for them.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "hetairai"
  },
  {
    word: "epacts",
    definition: "Definition: The time (number of days) by which a solar year exceeds twelve lunar months; it is used in the calculation of the date of Easter",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "epacts"
  },
  {
    word: "enhancement",
    definition: "Definition: Improvement.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "enhancement"
  },
  {
    word: "dilapidate",
    definition: "Definition: To fall into ruin or disuse.",
    pronunciation: "/dəˈlæp.ə.deɪt/",
    englishEquivalent: "dilapidate"
  },
  {
    word: "decayed",
    definition: "Definition: To deteriorate, to get worse, to lose strength or health, to decline in quality.",
    pronunciation: "/dɪˈkeɪd/",
    englishEquivalent: "decayed"
  },
  {
    word: "funnily",
    definition: "Definition: In a funny or amusing manner.",
    pronunciation: "/ˈfʌnəli/",
    englishEquivalent: "funnily"
  },
  {
    word: "tandems",
    definition: "Definition: A carriage pulled by two or more draught animals (generally draught horses) harnessed one behind the other, both providing the pulling power but only the animal in front able to steer.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tandems"
  },
  {
    word: "analysts",
    definition: "Definition: Someone who analyzes.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "analysts"
  },
  {
    word: "fertilizers",
    definition: "Definition: A natural substance that is used to make the ground more suitable for growing plants.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "fertilizers"
  },
  {
    word: "homesite",
    definition: "Definition: The plot of land on which a house is or can be built",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "homesite"
  },
  {
    word: "puberty",
    definition: "Definition: A developmental phase brought about by the action of hormones as part of the maturing process. For humans, there are three in total.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "puberty"
  },
  {
    word: "dated",
    definition: "Definition: To note the time or place of writing or executing; to express in an instrument the time of its execution.",
    pronunciation: "/ˈdeɪtɪd/",
    englishEquivalent: "dated"
  },
  {
    word: "jackknifing",
    definition: "Definition: To fold in the middle, as a jackknife does.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "jackknifing"
  },
  {
    word: "hooper",
    definition: "Definition: One who applies hoops to casks or tubs.",
    pronunciation: "/huːpəɹ/",
    englishEquivalent: "hooper"
  },
  {
    word: "superinfection",
    definition: "Definition: An infection which follows or occurs during another infection or disease process",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "superinfection"
  },
  {
    word: "alabaster",
    definition: "Definition: A fine-grained white or lightly-tinted variety of gypsum, used ornamentally.",
    pronunciation: "/ˈæl.əˌbæs.tə/",
    englishEquivalent: "alabaster"
  },
  {
    word: "continuo",
    definition: "Definition: The bass line of music, especially for a keyboard instrument, that continues throughout a work; basso continuo.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "continuo"
  },
  {
    word: "vicissitudes",
    definition: "Definition: Regular change or succession from one thing to another, or one part of a cycle to the next; alternation; mutual succession; interchange.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "vicissitudes"
  },
  {
    word: "undesignated",
    definition: "Definition: Not designated.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "undesignated"
  },
  {
    word: "birthwort",
    definition: "Definition: Any plant species of the genus Aristolochia.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "birthwort"
  },
  {
    word: "openhanded",
    definition: "Definition: Done with the hand open rather than clenched",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "openhanded"
  },
  {
    word: "circuses",
    definition: "Definition: A traveling company of performers that may include acrobats, clowns, trained animals, and other novelty acts, that gives shows usually in a circular tent.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "circuses"
  },
  {
    word: "scuzzball",
    definition: "Definition: Someone who does nasty things or plays harmful tricks; a person of very low ethics; a lowlife.",
    pronunciation: "/skʌzbɔl/",
    englishEquivalent: "scuzzball"
  },
  {
    word: "severest",
    definition: "Definition: Very bad or intense.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "severest"
  },
  {
    word: "biologically",
    definition: "Definition: In a biological manner",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "biologically"
  },
  {
    word: "deprived",
    definition: "Definition: To take something away from (someone) and keep it away; to deny someone something.",
    pronunciation: "/dɪˈpɹaɪvd/",
    englishEquivalent: "deprived"
  },
  {
    word: "mojarras",
    definition: "Definition: A perciform fish in the family Gerreidae, often used as bait.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "mojarras"
  },
  {
    word: "multiracial",
    definition: "Definition: An individual of more than one race.",
    pronunciation: "/ˌmʌltiˈɹeɪʃəl/",
    englishEquivalent: "multiracial"
  },
  {
    word: "babying",
    definition: "Definition: To coddle; to pamper somebody like an infant.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "babying"
  },
  {
    word: "boozers",
    definition: "Definition: One who drinks habitually; a drunkard.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "boozers"
  },
  {
    word: "nudnick",
    definition: "Definition: A person who is very annoying; a pest, a nag, a jerk. (Also used attributively.)",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "nudnick"
  },
  {
    word: "linages",
    definition: "Definition: Descent in a line from a common progenitor; progeny; descending line of offspring or ascending line of parentage.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "linages"
  },
  {
    word: "pellagra",
    definition: "Definition: A disease characterised by skin lesions and mental confusion, primarily caused by a niacin deficiency.",
    pronunciation: "/pɛˈlaɡɹə/",
    englishEquivalent: "pellagra"
  },
  {
    word: "dystrophies",
    definition: "Definition: A wasting of body tissues, of either genetic origin or due to inadequate or defective nutrition.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "dystrophies"
  },
  {
    word: "gelatine",
    definition: "Definition: A protein derived through partial hydrolysis of the collagen extracted from animal skin, bones, cartilage, ligaments, etc.",
    pronunciation: "/ˈdʒɛlətiːn/",
    englishEquivalent: "gelatine"
  },
  {
    word: "rash",
    definition: "Definition: Acting too quickly without considering the risks and consequences; not careful; hasty.",
    pronunciation: "/ɹæʃ/",
    englishEquivalent: "rash"
  },
  {
    word: "recompensed",
    definition: "Definition: To reward or repay (someone) for something done, given etc.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "recompensed"
  },
  {
    word: "chert",
    definition: "Definition: Massive, usually dull-colored and opaque, quartzite, hornstone, impure chalcedony, or other flint-like mineral.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "chert"
  },
  {
    word: "lamaseries",
    definition: "Definition: A monastery for lamas.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "lamaseries"
  },
  {
    word: "paronomasias",
    definition: "Definition: A pun or play on words.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "paronomasias"
  },
  {
    word: "girlfriends",
    definition: "Definition: A female partner in an unmarried romantic relationship.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "girlfriends"
  },
  {
    word: "eternity",
    definition: "Definition: Existence without end, infinite time.",
    pronunciation: "/ɪˈtɜː.nə.ti/",
    englishEquivalent: "eternity"
  },
  {
    word: "allomorph",
    definition: "Definition: Any of the different crystalline forms of a substance.",
    pronunciation: "/ˈæl.ə.mɔːf/",
    englishEquivalent: "allomorph"
  },
  {
    word: "sandbars",
    definition: "Definition: A ridge of sand caused by the action of waves along a shore.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sandbars"
  },
  {
    word: "rand",
    definition: "Definition: The border of an area of land, especially marshland.",
    pronunciation: "/ɹænd/",
    englishEquivalent: "rand"
  },
  {
    word: "suited",
    definition: "Definition: To make proper or suitable; to adapt or fit.",
    pronunciation: "/ˈsuːtɪd/",
    englishEquivalent: "suited"
  },
  {
    word: "heroizing",
    definition: "Definition: To make someone into a hero.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "heroizing"
  },
  {
    word: "hardihood",
    definition: "Definition: Unyielding boldness and daring; firmness in doing something that exposes one to difficulty, danger, or calamity; intrepidness.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "hardihood"
  },
  {
    word: "colics",
    definition: "Definition: Severe pains that grip the abdomen or the disease that causes such pains (due to intestinal or bowel-related problems).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "colics"
  },
  {
    word: "dematerialized",
    definition: "Definition: To disappear by becoming immaterial.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "dematerialized"
  },
  {
    word: "shitless",
    definition: "Definition: Having an empty bowel; greatly frightened; see usage notes below.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "shitless"
  },
  {
    word: "backpedalling",
    definition: "Definition: To pedal backwards on a bicycle.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "backpedalling"
  },
  {
    word: "appestats",
    definition: "Definition: The area of the brain (possibly in the hypothalamus) supposed to control appetite and regulate food intake",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "appestats"
  },
  {
    word: "capote",
    definition: "Definition: A long coat or cloak with a hood.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "capote"
  },
  {
    word: "cutey",
    definition: "Definition: A cute person or animal.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "cutey"
  },
  {
    word: "disentitled",
    definition: "Definition: To deprive of title, right or claim.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "disentitled"
  },
  {
    word: "consented",
    definition: "Definition: To express willingness, to give permission.",
    pronunciation: "/kənˈsɛntɪd/",
    englishEquivalent: "consented"
  },
  {
    word: "folksingers",
    definition: "Definition: A person who sings folk songs.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "folksingers"
  },
  {
    word: "mulling",
    definition: "Definition: (usually with over) To work (over) mentally; to cogitate; to ruminate.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "mulling"
  },
  {
    word: "moviemakers",
    definition: "Definition: A person who makes movies as a profession; a cinematographer",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "moviemakers"
  },
  {
    word: "spheroplasts",
    definition: "Definition: A cell from which the cell wall has been removed",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "spheroplasts"
  },
  {
    word: "grunge",
    definition: "Definition: Dirt or filth, especially when difficult to clean.",
    pronunciation: "/ɡɹʌndʒ/",
    englishEquivalent: "grunge"
  },
  {
    word: "pressurize",
    definition: "Definition: To put pressure on; to put under pressure.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pressurize"
  },
  {
    word: "chimichanga",
    definition: "Definition: A deep-fried wet burrito",
    pronunciation: "/tʃimiˈtʃaŋɡa/",
    englishEquivalent: "chimichanga"
  },
  {
    word: "demeaned",
    definition: "Definition: To debase; to lower; to degrade.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "demeaned"
  },
  {
    word: "parenchyma",
    definition: "Definition: The functional tissue of an organ as distinguished from the connective and supporting tissue.",
    pronunciation: "/pəˈɹɛŋ.kɪm.ə/",
    englishEquivalent: "parenchyma"
  },
  {
    word: "privatized",
    definition: "Definition: To release government control of (a business or industry) to private industry.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "privatized"
  },
  {
    word: "eiderdown",
    definition: "Definition: The down of the eider duck, used for stuffing pillows and quilts.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "eiderdown"
  },
  {
    word: "meister",
    definition: "Definition: A person of great skill or authority in a particular field",
    pronunciation: "/ˈmaɪ̯stə(r)/",
    englishEquivalent: "meister"
  },
  {
    word: "growingly",
    definition: "Definition: To a growing or increasing degree",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "growingly"
  },
  {
    word: "crab",
    definition: "Definition: A crustacean of the infraorder Brachyura, having five pairs of legs, the foremost of which are in the form of claws, and a carapace.",
    pronunciation: "/kɹæb/",
    englishEquivalent: "crab"
  },
  {
    word: "unremarkable",
    definition: "Definition: Not remarkable.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unremarkable"
  },
  {
    word: "girlfriends",
    definition: "Definition: A female partner in an unmarried romantic relationship.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "girlfriends"
  },
  {
    word: "boosted",
    definition: "Definition: To lift or push from behind (one who is endeavoring to climb); to push up.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "boosted"
  },
  {
    word: "splay",
    definition: "Definition: A slope or bevel, especially of the sides of a door or window, by which the opening is made larger at one face of the wall than at the other, or larger at each of the faces than it is between them.",
    pronunciation: "/spleɪ/",
    englishEquivalent: "splay"
  },
  {
    word: "aphasia",
    definition: "Definition: A partial or total loss of language skills due to brain damage. Usually, damage to the left perisylvian region, including Broca's area and Wernicke's area, causes aphasia.",
    pronunciation: "/əˈfeɪzɪə/",
    englishEquivalent: "aphasia"
  },
  {
    word: "uncarpeted",
    definition: "Definition: Not carpeted.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "uncarpeted"
  },
  {
    word: "tangible",
    definition: "Definition: A physical object, something that can be touched.",
    pronunciation: "/ˈtæn(d)ʒɪb(ə)l/",
    englishEquivalent: "tangible"
  },
  {
    word: "stringiest",
    definition: "Definition: Composed of, or resembling, string or strings.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "stringiest"
  },
  {
    word: "reconcile",
    definition: "Definition: To restore a friendly relationship; to bring back to harmony.",
    pronunciation: "/ˈɹɛkənsaɪl/",
    englishEquivalent: "reconcile"
  },
  {
    word: "mustiest",
    definition: "Definition: Having a stale odor.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "mustiest"
  },
  {
    word: "rakish",
    definition: "Definition: Dashingly, carelessly, or sportingly unconventional or stylish; jaunty; characterized by a devil-may-care unconventionality; having a somewhat disreputable quality or appearance.",
    pronunciation: "/ˈɹeɪkɪʃ/",
    englishEquivalent: "rakish"
  },
  {
    word: "relicenses",
    definition: "Definition: To issue a renewed license",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "relicenses"
  },
  {
    word: "mountainside",
    definition: "Definition: The sloping side of a mountain.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "mountainside"
  },
  {
    word: "motorizes",
    definition: "Definition: To fit something with a motor.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "motorizes"
  },
  {
    word: "nominalism",
    definition: "Definition: A doctrine that universals do not have an existence except as names for classes of concrete objects.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "nominalism"
  },
  {
    word: "simulacrums",
    definition: "Definition: An image or representation.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "simulacrums"
  },
  {
    word: "quarterages",
    definition: "Definition: A quarterly payment or allowance, tax, pension, or wage paid or received.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "quarterages"
  },
  {
    word: "horsewhip",
    definition: "Definition: A whip for use on horses.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "horsewhip"
  },
  {
    word: "irradiance",
    definition: "Definition: The act of irradiating; emission of rays of light.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "irradiance"
  },
  {
    word: "secludes",
    definition: "Definition: To shut off or keep apart, as from company, society, etc.; withdraw (oneself) from society or into solitude.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "secludes"
  },
  {
    word: "hugely",
    definition: "Definition: Greatly; to a huge extent",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "hugely"
  },
  {
    word: "prowls",
    definition: "Definition: To rove over, through, or about in a stealthy manner; especially, to search in, as for prey or booty.",
    pronunciation: "/pɹaʊlz/",
    englishEquivalent: "prowls"
  },
  {
    word: "quinol",
    definition: "Definition: The diphenol para-dihydroxy benzene, used as a mild reducing agent in photographic developing; isomeric with catechol and resorcinol.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "quinol"
  },
  {
    word: "tetters",
    definition: "Definition: Any of various pustular skin conditions.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tetters"
  },
  {
    word: "legislate",
    definition: "Definition: To pass laws (including the amending or repeal of existing laws).",
    pronunciation: "/ˈlɛdʒɪsˌleɪt/",
    englishEquivalent: "legislate"
  },
  {
    word: "punchiest",
    definition: "Definition: Having a punch; effective; forceful; spirited; vigorous.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "punchiest"
  },
  {
    word: "strabismus",
    definition: "Definition: A defect of vision in which one eye cannot focus with the other on an object because of imbalance of the eye muscles; a squint.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "strabismus"
  },
  {
    word: "swaddling",
    definition: "Definition: To bind (a baby) with long narrow strips of cloth.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "swaddling"
  },
  {
    word: "hoser",
    definition: "Definition: One who operates a hose, e.g. a fire hose or a garden hose.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "hoser"
  },
  {
    word: "muniments",
    definition: "Definition: A deed, or other official document kept as proof of ownership or rights or privileges; an archived document.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "muniments"
  },
  {
    word: "prioresses",
    definition: "Definition: A nun in charge of a priory (usually lower in rank than an abbess); mother superior.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "prioresses"
  },
  {
    word: "gardening",
    definition: "Definition: To grow plants in a garden; to create or maintain a garden.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "gardening"
  },
  {
    word: "witticisms",
    definition: "Definition: A witty remark",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "witticisms"
  },
  {
    word: "reticulation",
    definition: "Definition: A network of criss-crossing lines, strands, cables or pipes.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "reticulation"
  },
  {
    word: "liane",
    definition: "Definition: A climbing woody vine, usually tropical.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "liane"
  },
  {
    word: "unsolved",
    definition: "Definition: Not yet solved.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unsolved"
  },
  {
    word: "abyss",
    definition: "Definition: Hell; the bottomless pit; primeval chaos; a confined subterranean ocean.",
    pronunciation: "/əˈbɪs/",
    englishEquivalent: "abyss"
  },
  {
    word: "lam",
    definition: "Definition: To beat or thrash.",
    pronunciation: "/læm/",
    englishEquivalent: "lam"
  },
  {
    word: "vanilla",
    definition: "Definition: Any tropical, climbing orchid of the genus Vanilla (especially Vanilla planifolia), bearing podlike fruit yielding an extract used in flavoring food or in perfumes.",
    pronunciation: "/vəˈnɛlə/",
    englishEquivalent: "vanilla"
  },
  {
    word: "craws",
    definition: "Definition: The stomach of an animal.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "craws"
  },
  {
    word: "catechized",
    definition: "Definition: To give oral instruction, especially of religion; now specifically by the formal question-and-answer method; in the Church of England, to teach the catechism as preparation for confirmation.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "catechized"
  },
  {
    word: "repossessed",
    definition: "Definition: To reclaim ownership of property for which payment remains due.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "repossessed"
  },
  {
    word: "chlordane",
    definition: "Definition: A very toxic chlorinated polycyclic hydrocarbon once used as an insecticide.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "chlordane"
  },
  {
    word: "retentive",
    definition: "Definition: That which retains or confines; a restraint.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "retentive"
  },
  {
    word: "rollouts",
    definition: "Definition: An act of rolling out; deployment.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "rollouts"
  },
  {
    word: "scarlet",
    definition: "Definition: A brilliant red colour tinged with orange.",
    pronunciation: "/ˈskɐːlət/",
    englishEquivalent: "scarlet"
  },
  {
    word: "flumps",
    definition: "Definition: The dull sound so produced.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "flumps"
  },
  {
    word: "sported",
    definition: "Definition: To amuse oneself, to play.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sported"
  },
  {
    word: "egomaniac",
    definition: "Definition: A person obsessed with their own (supposed) importance.",
    pronunciation: "/iɡoʊˈmeɪniæk/",
    englishEquivalent: "egomaniac"
  },
  {
    word: "deadeye",
    definition: "Definition: A wooden disk having holes through which the lanyard is passed, used for tightening shrouds.",
    pronunciation: "/ˈdɛdaɪ/",
    englishEquivalent: "deadeye"
  },
  {
    word: "discolor",
    definition: "Definition: To change or lose color.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "discolor"
  },
  {
    word: "aggress",
    definition: "Definition: Aggression.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "aggress"
  },
  {
    word: "fraudulently",
    definition: "Definition: In a fraudulent manner.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "fraudulently"
  },
  {
    word: "identically",
    definition: "Definition: In an identical manner.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "identically"
  },
  {
    word: "acidhead",
    definition: "Definition: A person who uses the hallucinogenic drug LSD.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "acidhead"
  },
  {
    word: "headlines",
    definition: "Definition: The heading or title of a magazine or newspaper article.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "headlines"
  },
  {
    word: "trending",
    definition: "Definition: To have a particular direction; to run; to stretch; to tend.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "trending"
  },
  {
    word: "beliefs",
    definition: "Definition: Mental acceptance of a claim as true.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "beliefs"
  },
  {
    word: "racketeers",
    definition: "Definition: One who commits crimes (especially fraud, bribery, loansharking, extortion etc.) to aid in running a shady or illegal business.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "racketeers"
  },
  {
    word: "hobnob",
    definition: "Definition: A toast made while touching glasses together.",
    pronunciation: "/ˈhɒbnɒb/",
    englishEquivalent: "hobnob"
  },
  {
    word: "moldering",
    definition: "Definition: To decay or rot.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "moldering"
  },
  {
    word: "downing",
    definition: "Definition: To knock (someone or something) down; to cause to come down, to fell.",
    pronunciation: "/ˈdaʊnɪŋ/",
    englishEquivalent: "downing"
  },
  {
    word: "isoclinal",
    definition: "Definition: A line connecting places of equal inclination or dip.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "isoclinal"
  },
  {
    word: "tabooed",
    definition: "Definition: To mark as taboo.",
    pronunciation: "/tæ.ˈbuːd/",
    englishEquivalent: "tabooed"
  },
  {
    word: "kisses",
    definition: "Definition: To touch with the lips or press the lips against, usually to show love or affection or passion, or as part of a greeting.",
    pronunciation: "/ˈkɪsɪz/",
    englishEquivalent: "kisses"
  },
  {
    word: "brooms",
    definition: "Definition: To clean (e.g. a ship's bottom of clinging shells, seaweed, etc.) by the application of fire and scraping.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "brooms"
  },
  {
    word: "interfusing",
    definition: "Definition: To fuse or blend together",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "interfusing"
  },
  {
    word: "elevate",
    definition: "Definition: To raise (something) to a higher position.",
    pronunciation: "/ˈɛləveɪt/",
    englishEquivalent: "elevate"
  },
  {
    word: "pellicles",
    definition: "Definition: A thin skin or film.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pellicles"
  },
  {
    word: "franchisee",
    definition: "Definition: A holder of a franchise; a person who is granted a franchise.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "franchisee"
  },
  {
    word: "revivify",
    definition: "Definition: To reanimate, bring back to life.",
    pronunciation: "/ɹiːˈvɪvɪfʌɪ/",
    englishEquivalent: "revivify"
  },
  {
    word: "speedboat",
    definition: "Definition: A fast boat, usually small (for 1-8 people).",
    pronunciation: "/ˈspidˌboʊt/",
    englishEquivalent: "speedboat"
  },
  {
    word: "elope",
    definition: "Definition: (of a married person) To run away from home with a paramour.",
    pronunciation: "/ɛˈləʊp/",
    englishEquivalent: "elope"
  },
  {
    word: "durned",
    definition: "Definition: Darned.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "durned"
  },
  {
    word: "chroming",
    definition: "Definition: To plate with chrome.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "chroming"
  },
  {
    word: "isoenzymes",
    definition: "Definition: Any of a group of enzymes that catalyze the same reaction but have different structures and physical, biochemical and immunological properties.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "isoenzymes"
  },
  {
    word: "ugliest",
    definition: "Definition: Displeasing to the eye; not aesthetically pleasing.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "ugliest"
  },
  {
    word: "papilloma",
    definition: "Definition: An epithelial tumour, usually benign, with the appearance of a papilla",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "papilloma"
  },
  {
    word: "subordinating",
    definition: "Definition: To make subservient.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "subordinating"
  },
  {
    word: "kadis",
    definition: "Definition: A civil judge in certain Islamic countries.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "kadis"
  },
  {
    word: "piper",
    definition: "Definition: A musician who plays a pipe.",
    pronunciation: "/ˈpaɪ.pə/",
    englishEquivalent: "piper"
  },
  {
    word: "floruit",
    definition: "Definition: The time period during which a person, group, culture, etc. is at its peak.",
    pronunciation: "/ˈflɒɹʊɪt/",
    englishEquivalent: "floruit"
  },
  {
    word: "likens",
    definition: "Definition: (followed by to or unto) To compare; to state that (something) is like (something else).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "likens"
  },
  {
    word: "regrouped",
    definition: "Definition: To pause and get organized before trying again.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "regrouped"
  },
  {
    word: "improvident",
    definition: "Definition: Failing to provide for the future; reckless",
    pronunciation: "/ɪmˈpɹɒvɪdənt/",
    englishEquivalent: "improvident"
  },
  {
    word: "suttee",
    definition: "Definition: The traditional custom of a Hindu woman giving herself up to be cremated on her husband’s funeral pyre as a sign of her devotion.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "suttee"
  },
  {
    word: "crosstown",
    definition: "Definition: Extending across a city or town.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "crosstown"
  },
  {
    word: "trilithons",
    definition: "Definition: A structure consisting of two stone pillars supporting a horizontal stone.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "trilithons"
  },
  {
    word: "invaginated",
    definition: "Definition: To fold up or enclose into a sheath-like or pouch-like structure, either naturally or as part of a surgical procedure.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "invaginated"
  },
  {
    word: "morpho",
    definition: "Definition: Any of the genus Morpho of large tropical American butterflies.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "morpho"
  },
  {
    word: "hurdlers",
    definition: "Definition: An athlete who competes in the hurdling event.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "hurdlers"
  },
  {
    word: "bulimia",
    definition: "Definition: A chronic eating disorder characterized by a binge-and-purge cycle - extreme overeating followed by self-induced vomiting.",
    pronunciation: "/bjuˈlimi.ə/",
    englishEquivalent: "bulimia"
  },
  {
    word: "memory",
    definition: "Definition: The ability of the brain to record information or impressions with the facility of recalling them later at will.",
    pronunciation: "/ˈmɛm(ə)ɹi/",
    englishEquivalent: "memory"
  },
  {
    word: "adipocytes",
    definition: "Definition: A type of cell, present in adipose tissue, where fat is stored as a source of energy",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "adipocytes"
  },
  {
    word: "billhooks",
    definition: "Definition: A medieval polearm with a similar construct, fitted to a long handle, sometimes with an L-shaped tine or a spike protruding from the side or the end of the blade for tackling the opponent; a bill",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "billhooks"
  },
  {
    word: "crowding",
    definition: "Definition: To press forward; to advance by pushing.",
    pronunciation: "/ˈkɹaʊdɪŋ/",
    englishEquivalent: "crowding"
  },
  {
    word: "chorioid",
    definition: "Definition: The pigmented vascular layer of the eyeball between the retina and the sclera.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "chorioid"
  },
  {
    word: "ensheath",
    definition: "Definition: To cover with or as if with a sheath.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "ensheath"
  },
  {
    word: "business",
    definition: "Definition: A specific commercial enterprise or establishment.",
    pronunciation: "/ˈbɪd.nəs/",
    englishEquivalent: "business"
  },
  {
    word: "palankeens",
    definition: "Definition: A covered type of litter for a stretched-out passenger, carried on four poles on the shoulders of four or more bearers, as formerly used (also by colonials) in eastern Asia.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "palankeens"
  },
  {
    word: "paternosters",
    definition: "Definition: The Lord's prayer, especially in a Roman Catholic context.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "paternosters"
  },
  {
    word: "steatites",
    definition: "Definition: Soapstone",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "steatites"
  },
  {
    word: "sanguinary",
    definition: "Definition: A bloodthirsty person.",
    pronunciation: "/ˈsæŋɡwɪnəɹi/",
    englishEquivalent: "sanguinary"
  },
  {
    word: "relocate",
    definition: "Definition: To move (something) from one place to another.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "relocate"
  },
  {
    word: "screeching",
    definition: "Definition: To make such a sound.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "screeching"
  },
  {
    word: "cheeks",
    definition: "Definition: The soft skin on each side of the face, below the eyes; the outer surface of the sides of the oral cavity.",
    pronunciation: "/tʃiːks/",
    englishEquivalent: "cheeks"
  },
  {
    word: "easeful",
    definition: "Definition: Full of ease, restful, comfortable",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "easeful"
  },
  {
    word: "vestal",
    definition: "Definition: A virgin consecrated to Vesta, and to the service of watching the sacred fire, which was to be perpetually kept burning upon her altar; a vestal virgin.",
    pronunciation: "/ˈvɛs.t(ə)l/",
    englishEquivalent: "vestal"
  },
  {
    word: "pilafs",
    definition: "Definition: A dish made by browning grain, typically rice, in oil and then cooking it with a seasoned broth, to which meat and/or vegetables may be added.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pilafs"
  },
  {
    word: "cosmopolises",
    definition: "Definition: An important city, such as a capital city, inhabited by people from a diverse range of cultural backgrounds.",
    pronunciation: "/kɒzˈmɒ.pɒ.lɪs.ɪz/",
    englishEquivalent: "cosmopolises"
  },
  {
    word: "aubrietias",
    definition: "Definition: A creeping perennial plant native to southeastern Europe, Aubrieta deltoidea, grown as a groundcover and in rock gardens for its dense foliage and purple, pink or white flowers.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "aubrietias"
  },
  {
    word: "hypoglycemia",
    definition: "Definition: A too low level of blood glucose.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "hypoglycemia"
  },
  {
    word: "fluxions",
    definition: "Definition: The derivative of a function.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "fluxions"
  },
  {
    word: "rehired",
    definition: "Definition: To hire again.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "rehired"
  },
  {
    word: "reupholster",
    definition: "Definition: To upholster again; to replace the attached fabric covering on furniture.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "reupholster"
  },
  {
    word: "unthreading",
    definition: "Definition: To draw or remove a thread from.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unthreading"
  },
  {
    word: "schoolboy",
    definition: "Definition: A boy attending school.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "schoolboy"
  },
  {
    word: "odorize",
    definition: "Definition: To add an odorant to (especially a gas, so that leaks can be more easily detected).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "odorize"
  },
  {
    word: "vision",
    definition: "Definition: The sense or ability of sight.",
    pronunciation: "/ˈvɪ.ʒ(ə)n/",
    englishEquivalent: "vision"
  },
  {
    word: "nitriles",
    definition: "Definition: Any of a class of organic compounds containing a cyano functional group -C≡N; they are named as derivatives of the appropriate carboxylic acid",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "nitriles"
  },
  {
    word: "carjacks",
    definition: "Definition: To steal an automobile forcibly from (someone).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "carjacks"
  },
  {
    word: "unloose",
    definition: "Definition: To free (someone or something) from a constraint.",
    pronunciation: "/ˌʌnˈluːs/",
    englishEquivalent: "unloose"
  },
  {
    word: "frit",
    definition: "Definition: A fused mixture of materials used to make glass.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "frit"
  },
  {
    word: "encases",
    definition: "Definition: To enclose, as in a case.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "encases"
  },
  {
    word: "optatives",
    definition: "Definition: (grammar) A mood of verbs found in some languages (e.g. Sanskrit, Old Prussian, Ancient Greek), used to express a wish. English does not have inflectional optative forms.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "optatives"
  },
  {
    word: "cringing",
    definition: "Definition: To shrink, cower, tense or recoil, as in fear, disgust or embarrassment.",
    pronunciation: "/ˈkɹɪndʒɪŋ/",
    englishEquivalent: "cringing"
  },
  {
    word: "strigil",
    definition: "Definition: A grooming tool used to scrape away dead skin, oil, dirt, etc.",
    pronunciation: "/ˈstɹɪd͡ʒɪl/",
    englishEquivalent: "strigil"
  },
  {
    word: "telecasts",
    definition: "Definition: A television broadcast, especially outside of a studio.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "telecasts"
  },
  {
    word: "charism",
    definition: "Definition: A power or authority, generally of a spiritual nature, believed to be a freely given gift by the grace of God.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "charism"
  },
  {
    word: "unheroic",
    definition: "Definition: Not heroic",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unheroic"
  },
  {
    word: "diphenhydramine",
    definition: "Definition: An antihistamine and anticholinergic drug that blocks the effect of histamine at H1 receptor sites, relieving allergy symptoms. Diphenhydramine also reduces smooth muscle contraction, increases heart rate, and sedates the user by blocking muscarinic acetylcholine receptors (mAChRs).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "diphenhydramine"
  },
  {
    word: "limbered",
    definition: "Definition: To cause to become limber; to make flexible or pliant.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "limbered"
  },
  {
    word: "amebas",
    definition: "Definition: A member of the genus Amoeba of unicellular protozoa that moves by means of temporary projections called pseudopodia.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "amebas"
  },
  {
    word: "richening",
    definition: "Definition: To make or render rich or richer.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "richening"
  },
  {
    word: "slobbers",
    definition: "Definition: To allow saliva or liquid to run from one's mouth; to drool.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "slobbers"
  },
  {
    word: "thickness",
    definition: "Definition: The property of being thick (in dimension).",
    pronunciation: "/ˈθɪknəs/",
    englishEquivalent: "thickness"
  },
  {
    word: "mokes",
    definition: "Definition: A donkey.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "mokes"
  },
  {
    word: "resuming",
    definition: "Definition: To take back possession of (something).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "resuming"
  },
  {
    word: "formicaries",
    definition: "Definition: An ant colony, a pile of earth built by ants in which they nest.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "formicaries"
  },
  {
    word: "biotopes",
    definition: "Definition: A geographical area that has a uniform biological environment and a uniform distribution of plants and animals",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "biotopes"
  },
  {
    word: "melodramatic",
    definition: "Definition: Of or pertaining to melodrama; like or suitable to a melodrama; unnatural in situation or action.",
    pronunciation: "/ˌmɛl.ə.dɹəˈmæt.ɪk/",
    englishEquivalent: "melodramatic"
  },
  {
    word: "thundering",
    definition: "Definition: To produce thunder; to sound, rattle, or roar, as a discharge of atmospheric electricity; often used impersonally.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "thundering"
  },
  {
    word: "choking",
    definition: "Definition: To be unable to breathe because of obstruction of the windpipe (for instance food or other objects that go down the wrong way, or fumes or particles in the air that cause the throat to constrict).",
    pronunciation: "/ˈtʃəʊkɪŋ/",
    englishEquivalent: "choking"
  },
  {
    word: "decolletages",
    definition: "Definition: A low neckline on a woman's dress, especially one that reveals or emphasizes her cleavage.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "decolletages"
  },
  {
    word: "sterilised",
    definition: "Definition: To deprive of the ability to procreate.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sterilised"
  },
  {
    word: "calcaneum",
    definition: "Definition: The calcaneus.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "calcaneum"
  },
  {
    word: "joyful",
    definition: "Definition: Feeling or causing joy.",
    pronunciation: "/ˈdʒɔɪfəl/",
    englishEquivalent: "joyful"
  },
  {
    word: "brazed",
    definition: "Definition: To join two metal pieces, without melting them, using heat and diffusion of a jointing alloy of capillary thickness.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "brazed"
  },
  {
    word: "wholistic",
    definition: "Definition: Related to holism.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "wholistic"
  },
  {
    word: "amalgam",
    definition: "Definition: An alloy containing mercury.",
    pronunciation: "/əˈmæl.ɡəm/",
    englishEquivalent: "amalgam"
  },
  {
    word: "granulomata",
    definition: "Definition: An inflammatory nodule found in many diseases, consisting of histiocytes (macrophages) attempting to wall off substances they perceive as foreign but are unable to eliminate, such as certain infectious organisms as well as other materials such as suture fragments",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "granulomata"
  },
  {
    word: "prajna",
    definition: "Definition: Wisdom; understanding; insight.",
    pronunciation: "/ˈpɹɑːd͡ʒnə/",
    englishEquivalent: "prajna"
  },
  {
    word: "proximity",
    definition: "Definition: Closeness; the state of being near as in space, time, or relationship.",
    pronunciation: "/pɹɑkˈsɪ.mɪ.ti/",
    englishEquivalent: "proximity"
  },
  {
    word: "allocutions",
    definition: "Definition: A formal speech, especially one which is regarded as authoritative and forceful.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "allocutions"
  },
  {
    word: "gigahertz",
    definition: "Definition: One billion hertz, 109 Hz.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "gigahertz"
  },
  {
    word: "turnovers",
    definition: "Definition: The amount of money taken as sales transacted in a given period.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "turnovers"
  },
  {
    word: "gismos",
    definition: "Definition: Something, generally a device, for which one does not know the proper term.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "gismos"
  },
  {
    word: "violinist",
    definition: "Definition: A person who plays the violin",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "violinist"
  },
  {
    word: "pestilent",
    definition: "Definition: Highly injurious or destructive to life: deadly.",
    pronunciation: "/ˈpɛstlənt/",
    englishEquivalent: "pestilent"
  },
  {
    word: "smushed",
    definition: "Definition: To mash; or push; especially to push down or in; compress",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "smushed"
  },
  {
    word: "grisailles",
    definition: "Definition: In painting, a method of working which employs only varying values of gray to create form. Often a preliminary step in a fully colored painting.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "grisailles"
  },
  {
    word: "gobbles",
    definition: "Definition: Fellatio; blowjob",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "gobbles"
  },
  {
    word: "tidier",
    definition: "Definition: One who tidies.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tidier"
  },
  {
    word: "jutted",
    definition: "Definition: To stick out.",
    pronunciation: "/ˈdʒʌtɪd/",
    englishEquivalent: "jutted"
  },
  {
    word: "inconsistencies",
    definition: "Definition: The state of being inconsistent.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "inconsistencies"
  },
  {
    word: "portobello",
    definition: "Definition: The large, mature form of the crimini mushroom (Agaricus bisporus)",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "portobello"
  },
  {
    word: "moult",
    definition: "Definition: The process of shedding or losing a covering of fur, feathers or skin etc.",
    pronunciation: "/mɒlt/",
    englishEquivalent: "moult"
  },
  {
    word: "pepper",
    definition: "Definition: A plant of the family Piperaceae.",
    pronunciation: "/ˈpɛpə/",
    englishEquivalent: "pepper"
  },
  {
    word: "trilithons",
    definition: "Definition: A structure consisting of two stone pillars supporting a horizontal stone.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "trilithons"
  },
  {
    word: "nidification",
    definition: "Definition: The building of a nest.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "nidification"
  },
  {
    word: "labs",
    definition: "Definition: A laboratory.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "labs"
  },
  {
    word: "postfixed",
    definition: "Definition: To suffix.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "postfixed"
  },
  {
    word: "quizzical",
    definition: "Definition: Questioning or suggesting puzzlement.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "quizzical"
  },
  {
    word: "pedalos",
    definition: "Definition: A small boat propelled by pedals that directly turn external paddles, used for recreation.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pedalos"
  },
  {
    word: "conjecture",
    definition: "Definition: A statement or an idea which is unproven, but is thought to be true; a guess.",
    pronunciation: "/kənˈd͡ʒɛk.t͡ʃə(ɹ)/",
    englishEquivalent: "conjecture"
  },
  {
    word: "el",
    definition: "Definition: The name of the Latin-script letter L.",
    pronunciation: "/ɛl/",
    englishEquivalent: "el"
  },
  {
    word: "precatory",
    definition: "Definition: Expressing a wish.",
    pronunciation: "/ˈpɹɛ.kə.tə.ɹi/",
    englishEquivalent: "precatory"
  },
  {
    word: "outlanders",
    definition: "Definition: A foreigner or alien.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "outlanders"
  },
  {
    word: "cooperage",
    definition: "Definition: The art or trade of a cooper.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "cooperage"
  },
  {
    word: "stops",
    definition: "Definition: A (usually marked) place where buses, trams or trains halt to let passengers get on and off, usually smaller than a station.",
    pronunciation: "/stɑps/",
    englishEquivalent: "stops"
  },
  {
    word: "menace",
    definition: "Definition: A perceived threat or danger.",
    pronunciation: "/ˈmɛnɪs/",
    englishEquivalent: "menace"
  },
  {
    word: "developers",
    definition: "Definition: A person or entity engaged in the creation or improvement of certain classes of products.",
    pronunciation: "/dɪˈvɛləpə(ɹ)z/",
    englishEquivalent: "developers"
  },
  {
    word: "impactor",
    definition: "Definition: Any of several machines or devices in which a part impacts on another, or on a material.",
    pronunciation: "/ɪmˈpæktə/",
    englishEquivalent: "impactor"
  },
  {
    word: "kilims",
    definition: "Definition: A flat tapestry-woven carpet or rug.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "kilims"
  },
  {
    word: "demitasse",
    definition: "Definition: A small cup of strong black coffee.",
    pronunciation: "/ˈdɛmɪtæs/",
    englishEquivalent: "demitasse"
  },
  {
    word: "divines",
    definition: "Definition: One skilled in divinity; a theologian.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "divines"
  },
  {
    word: "tussah",
    definition: "Definition: A deep gold-coloured silk produced from larvae of several species of silk worms belonging to the moth genus Antheraea",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tussah"
  },
  {
    word: "adiabatic",
    definition: "Definition: (of a process) That occurs without gain or loss of heat (and thus with no change in entropy, in the quasistatic approximation).",
    pronunciation: "/ˌeɪdaɪəˈbætɪk/",
    englishEquivalent: "adiabatic"
  },
  {
    word: "elating",
    definition: "Definition: To make joyful or proud.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "elating"
  },
  {
    word: "rehearsing",
    definition: "Definition: To repeat, as what has been already said; to tell over again; to recite.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "rehearsing"
  },
  {
    word: "pyroelectric",
    definition: "Definition: A pyroelectric substance",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pyroelectric"
  },
  {
    word: "bayonet",
    definition: "Definition: A pointed instrument of the dagger kind fitted on the muzzle of a musket or rifle, so as to give the soldier increased means of offence and defence. Originally, the bayonet was made with a handle, which needed to be fitted into the bore of the musket after the soldier had fired.",
    pronunciation: "/ˈbeɪə(ʊ)nɛt/",
    englishEquivalent: "bayonet"
  },
  {
    word: "finalized",
    definition: "Definition: To make final or firm; to finish or complete.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "finalized"
  },
  {
    word: "lists",
    definition: "Definition: A strip of fabric, especially from the edge of a piece of cloth.",
    pronunciation: "/lɪsts/",
    englishEquivalent: "lists"
  },
  {
    word: "dehort",
    definition: "Definition: To dissuade.",
    pronunciation: "/diː-/",
    englishEquivalent: "dehort"
  },
  {
    word: "denaturalizing",
    definition: "Definition: To revoke or deny the citizenship of.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "denaturalizing"
  },
  {
    word: "statins",
    definition: "Definition: Any of a class of drugs (chiefly lactones or pyrroles) that lower the amount of cholesterol in the blood by inhibiting an enzyme involved in its biosynthesis.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "statins"
  },
  {
    word: "rounds",
    definition: "Definition: A circular or spherical object or part of an object.",
    pronunciation: "/ˈɹaʊndz/",
    englishEquivalent: "rounds"
  },
  {
    word: "geranial",
    definition: "Definition: One of the two isomers of citral",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "geranial"
  },
  {
    word: "tubercular",
    definition: "Definition: Of, pertaining to, or having tuberculosis.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tubercular"
  },
  {
    word: "unattended",
    definition: "Definition: Not attended; without persons present.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unattended"
  },
  {
    word: "interject",
    definition: "Definition: To insert something between other things.",
    pronunciation: "/ɪn.təˈdʒɛkt/",
    englishEquivalent: "interject"
  },
  {
    word: "sandarac",
    definition: "Definition: Realgar; red sulphide of arsenic.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sandarac"
  },
  {
    word: "wildcatting",
    definition: "Definition: To drill for oil in an area where no oil has been found before.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "wildcatting"
  },
  {
    word: "splatting",
    definition: "Definition: To hit a flat surface and deform into an irregular shape.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "splatting"
  },
  {
    word: "unlabeled",
    definition: "Definition: Not labeled; having no label.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unlabeled"
  },
  {
    word: "grumped",
    definition: "Definition: To complain.",
    pronunciation: "/ɡɹʌmpt/",
    englishEquivalent: "grumped"
  },
  {
    word: "opercula",
    definition: "Definition: A covering flap in animals, such as a gill cover.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "opercula"
  },
  {
    word: "unaspirated",
    definition: "Definition: Not aspirated.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unaspirated"
  },
  {
    word: "feodary",
    definition: "Definition: An accomplice.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "feodary"
  },
  {
    word: "korunas",
    definition: "Definition: The currency of the former Czechoslovakia, divided into 100 hellers.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "korunas"
  },
  {
    word: "addicts",
    definition: "Definition: A person who is addicted, especially to a harmful drug",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "addicts"
  },
  {
    word: "disposing",
    definition: "Definition: (used with 'of') To eliminate or to get rid of something.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "disposing"
  },
  {
    word: "encashing",
    definition: "Definition: To convert a financial instrument or funding source into cash.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "encashing"
  },
  {
    word: "sentinel",
    definition: "Definition: A sentry, watch, or guard.",
    pronunciation: "/ˈsɛntɪnəl/",
    englishEquivalent: "sentinel"
  },
  {
    word: "outriggers",
    definition: "Definition: Any of various projecting beams or spars that provide support for a sailing ship's mast.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "outriggers"
  },
  {
    word: "fructification",
    definition: "Definition: The act of forming or producing fruit; the act of fructifying, or rendering productive of fruit; fecundation.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "fructification"
  },
  {
    word: "colt",
    definition: "Definition: A young male horse.",
    pronunciation: "/kɒlt/",
    englishEquivalent: "colt"
  },
  {
    word: "vetoed",
    definition: "Definition: To use a veto against.",
    pronunciation: "/ˈviːtəʊd/",
    englishEquivalent: "vetoed"
  },
  {
    word: "precipitators",
    definition: "Definition: One who or that which precipitates (causes something to happen or urges it on with vehemence or rashness).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "precipitators"
  },
  {
    word: "multiplet",
    definition: "Definition: A spectral line that has multiple components.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "multiplet"
  },
  {
    word: "squinches",
    definition: "Definition: A structure constructed between two adjacent walls to aid in the transition from a polygonal to a circular structure, as when a dome is constructed on top of a square room.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "squinches"
  },
  {
    word: "flavanol",
    definition: "Definition: Any of a class of flavonoids that use the 2-phenyl-3,4-dihydro-2H-chromen-3-ol molecular skeleton",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "flavanol"
  },
  {
    word: "pedestaling",
    definition: "Definition: To set or support on (or as if on) a pedestal.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pedestaling"
  },
  {
    word: "encases",
    definition: "Definition: To enclose, as in a case.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "encases"
  },
  {
    word: "totalities",
    definition: "Definition: The state of being total.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "totalities"
  },
  {
    word: "agitations",
    definition: "Definition: The act of agitating, or the state of being agitated; the state of being moved with violence, or with irregular action; commotion.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "agitations"
  },
  {
    word: "curtained",
    definition: "Definition: To cover (a window) with a curtain; to hang curtains.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "curtained"
  },
  {
    word: "dud",
    definition: "Definition: A device or machine that is useless because it does not work properly or has failed to work, such as a bomb, or explosive projectile.",
    pronunciation: "/dʌd/",
    englishEquivalent: "dud"
  },
  {
    word: "annuity",
    definition: "Definition: A right to receive amounts of money regularly over a certain fixed period, in perpetuity, or, especially, over the remaining life or lives of one or more beneficiaries.",
    pronunciation: "/əˈn(j)uɪti/",
    englishEquivalent: "annuity"
  },
  {
    word: "exaction",
    definition: "Definition: The act of demanding with authority, and compelling to pay or yield; compulsion to give or furnish; a levying by force",
    pronunciation: "/ɪɡˈzækʃən/",
    englishEquivalent: "exaction"
  },
  {
    word: "respectful",
    definition: "Definition: Marked or characterized by respect",
    pronunciation: "/ɹɪˈspɛktfəl/",
    englishEquivalent: "respectful"
  },
  {
    word: "numbness",
    definition: "Definition: Absent or reduced sensitivity to cutaneous stimulation.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "numbness"
  },
  {
    word: "imparked",
    definition: "Definition: To enclose or confine in, or as if in, a park.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "imparked"
  },
  {
    word: "genealogists",
    definition: "Definition: A person who studies or practises genealogy, an expert in genealogy.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "genealogists"
  },
  {
    word: "pronunciations",
    definition: "Definition: The formal or informal way in which a word is made to sound when spoken.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pronunciations"
  },
  {
    word: "catholicize",
    definition: "Definition: To make Catholic; to convert to Catholicism.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "catholicize"
  },
  {
    word: "carryovers",
    definition: "Definition: Something whose duration has been extended or that has been transferred to another time.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "carryovers"
  },
  {
    word: "circus",
    definition: "Definition: A traveling company of performers that may include acrobats, clowns, trained animals, and other novelty acts, that gives shows usually in a circular tent.",
    pronunciation: "/ˈsɜːkəs/",
    englishEquivalent: "circus"
  },
  {
    word: "dogsleds",
    definition: "Definition: A sled, pulled by dogs over ice and snow.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "dogsleds"
  },
  {
    word: "lithe",
    definition: "Definition: To go.",
    pronunciation: "/laɪð/",
    englishEquivalent: "lithe"
  },
  {
    word: "enclose",
    definition: "Definition: To surround with a wall, fence, etc.",
    pronunciation: "/ənˈkloʊz/",
    englishEquivalent: "enclose"
  },
  {
    word: "unblock",
    definition: "Definition: To remove or clear a block or obstruction from.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unblock"
  },
  {
    word: "coatracks",
    definition: "Definition: A rack or stand with hooks or pegs for holding hats and coats, often placed near an entrance for temporary use",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "coatracks"
  },
  {
    word: "hydraulic",
    definition: "Definition: To mine using the technique of hydraulic mining.",
    pronunciation: "/haɪˈdɹɒlɪk/",
    englishEquivalent: "hydraulic"
  },
  {
    word: "reels",
    definition: "Definition: A shaky or unsteady gait.",
    pronunciation: "/ɹiːlz/",
    englishEquivalent: "reels"
  },
  {
    word: "implicative",
    definition: "Definition: Tending to implicate or to imply; pertaining to implication.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "implicative"
  },
  {
    word: "sopraninos",
    definition: "Definition: A musical instrument, especially a saxophone or recorder, that is a pitch higher than the soprano instrument of its class",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sopraninos"
  },
  {
    word: "bamboo",
    definition: "Definition: A grass of the Poaceae family, characterised by its woody, hollow, round, straight, jointed stem, all of which are in the Bambuseae tribe.",
    pronunciation: "/bæmˈbu/",
    englishEquivalent: "bamboo"
  },
  {
    word: "domical",
    definition: "Definition: Of, pertaining to, resembling or having a dome",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "domical"
  },
  {
    word: "transship",
    definition: "Definition: To transfer something from one vessel or conveyance to another for onward shipment.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "transship"
  },
  {
    word: "inadvertent",
    definition: "Definition: Not intentional; not on purpose; not conscious.",
    pronunciation: "/ˌɪnədˈvɜːtn̩t/",
    englishEquivalent: "inadvertent"
  },
  {
    word: "intromissions",
    definition: "Definition: The state of being allowed to enter; admittance",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "intromissions"
  },
  {
    word: "wattlebirds",
    definition: "Definition: Any of a group of Australian birds in the genus Anthochaera of the honeyeater family Meliphagidae.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "wattlebirds"
  },
  {
    word: "candelabras",
    definition: "Definition: A single candelabrum.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "candelabras"
  },
  {
    word: "swiftlet",
    definition: "Definition: Any of the various tropical and subtropical birds of the four genera Aerodramus, Hydrochous, Schoutedenapus, and Collocalia in the swift family, many of which can navigate in darkness using echolocation.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "swiftlet"
  },
  {
    word: "traverse",
    definition: "Definition: A route used in mountaineering, specifically rock climbing, in which the descent occurs by a different route than the ascent.",
    pronunciation: "/tɹəˈvɜːs/",
    englishEquivalent: "traverse"
  },
  {
    word: "hexing",
    definition: "Definition: To cast a spell on (specifically an evil spell), to bewitch.",
    pronunciation: "/ˈhɛksɪŋ/",
    englishEquivalent: "hexing"
  },
  {
    word: "allegorise",
    definition: "Definition: To create an allegory from some event or situation.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "allegorise"
  },
  {
    word: "skep",
    definition: "Definition: A basket.",
    pronunciation: "/ˈskɛp/",
    englishEquivalent: "skep"
  },
  {
    word: "octuplet",
    definition: "Definition: A multiplet of eight related things.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "octuplet"
  },
  {
    word: "numbness",
    definition: "Definition: Absent or reduced sensitivity to cutaneous stimulation.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "numbness"
  },
  {
    word: "unlaces",
    definition: "Definition: To remove the knot from laces; to undo laces.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unlaces"
  },
  {
    word: "lambada",
    definition: "Definition: (preceded by definite article) A fast-paced, erotic Brazilian dance in which couples dance with their stomachs touching.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "lambada"
  },
  {
    word: "eventual",
    definition: "Definition: Finally resulting or occuring (after a period of time).",
    pronunciation: "/ə-/",
    englishEquivalent: "eventual"
  },
  {
    word: "feta",
    definition: "Definition: A variety of curd cheese made from sheep’s or goat’s milk and originating from Greece.",
    pronunciation: "/ˈfɛtə/",
    englishEquivalent: "feta"
  },
  {
    word: "tuxes",
    definition: "Definition: A tuxedo.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tuxes"
  },
  {
    word: "microfungus",
    definition: "Definition: A fungus of microscopic size.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "microfungus"
  },
  {
    word: "glochidia",
    definition: "Definition: The larva or young of the mussel.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "glochidia"
  },
  {
    word: "camporee",
    definition: "Definition: A gathering of Scouts in which accommodation is in tents",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "camporee"
  },
  {
    word: "imprecated",
    definition: "Definition: To call down by prayer, as something hurtful or calamitous.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "imprecated"
  },
  {
    word: "chiaroscuro",
    definition: "Definition: An artistic technique developed during the Renaissance, referring to the use of exaggerated light contrasts in order to create the illusion of volume.",
    pronunciation: "/ˌkjɒɹəˈskuɹoʊ/",
    englishEquivalent: "chiaroscuro"
  },
  {
    word: "generator",
    definition: "Definition: One who, or that which, generates, begets, causes, or produces.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "generator"
  },
  {
    word: "monochrome",
    definition: "Definition: A black and white image, especially such a photograph.",
    pronunciation: "/ˈmɒn.ə.kɹəʊm/",
    englishEquivalent: "monochrome"
  },
  {
    word: "paroles",
    definition: "Definition: The release of a former prisoner under condition of compliance with specific terms.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "paroles"
  },
  {
    word: "breakevens",
    definition: "Definition: The level of revenues sufficient to cover costs.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "breakevens"
  },
  {
    word: "kvass",
    definition: "Definition: A type of traditional fermented Russian beverage with little or no alcohol, made from bread, often flavored with fruit.",
    pronunciation: "/kvɑːs/",
    englishEquivalent: "kvass"
  },
  {
    word: "debarring",
    definition: "Definition: To exclude or shut out; to bar.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "debarring"
  },
  {
    word: "memsahib",
    definition: "Definition: (as a respectful term of address) A white European woman in colonial India.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "memsahib"
  },
  {
    word: "pharaohs",
    definition: "Definition: The supreme ruler of Ancient Egypt; a formal address for the sovereign seat of power as personified by the 'king' in an institutional role of Horus son of Osiris; often used by metonymy for Ancient Egyptian sovereignty",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pharaohs"
  },
  {
    word: "nauseous",
    definition: "Definition: Causing nausea; sickening or disgusting.",
    pronunciation: "/ˈnɑːʃəs/",
    englishEquivalent: "nauseous"
  },
  {
    word: "squirted",
    definition: "Definition: (of a liquid) To be thrown out, or ejected, in a rapid stream, from a narrow orifice.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "squirted"
  },
  {
    word: "stinging",
    definition: "Definition: To hurt, usually by introducing poison or a sharp point, or both.",
    pronunciation: "/ˈstɪŋɪŋ/",
    englishEquivalent: "stinging"
  },
  {
    word: "souffles",
    definition: "Definition: A murmuring or blowing sound.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "souffles"
  },
  {
    word: "radiotelephones",
    definition: "Definition: A device that allows two-way communication via radio",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "radiotelephones"
  },
  {
    word: "campaniles",
    definition: "Definition: A bell tower (now especially when freestanding), often associated with a church or other public building, especially in Italy.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "campaniles"
  },
  {
    word: "foliage",
    definition: "Definition: The leaves of plants.",
    pronunciation: "/ˈfəʊliɪdʒ/",
    englishEquivalent: "foliage"
  },
  {
    word: "aches",
    definition: "Definition: Continued dull pain, as distinguished from sudden twinges, or spasmodic pain.",
    pronunciation: "/eɪks/",
    englishEquivalent: "aches"
  },
  {
    word: "laywoman",
    definition: "Definition: A woman who is a layperson, one who has not taken a religious oath (such as becoming a nun).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "laywoman"
  },
  {
    word: "loitering",
    definition: "Definition: To stand about without any aim or purpose; to stand about idly.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "loitering"
  },
  {
    word: "stockjobbers",
    definition: "Definition: A stock exchange worker who deals only with brokers.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "stockjobbers"
  },
  {
    word: "superficial",
    definition: "Definition: (chiefly in plural) A surface detail.",
    pronunciation: "/ˌs(j)uːpəˈfɪʃəl/",
    englishEquivalent: "superficial"
  },
  {
    word: "labs",
    definition: "Definition: A laboratory.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "labs"
  },
  {
    word: "immunising",
    definition: "Definition: To make someone or something immune to something.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "immunising"
  },
  {
    word: "accreditation",
    definition: "Definition: The giving of credentials.",
    pronunciation: "/[əˌkɹɛd.ɪˈteɪ.ʃən]/",
    englishEquivalent: "accreditation"
  },
  {
    word: "bungee",
    definition: "Definition: An elastic fabric-bound strap with a hook at each end, used for securing luggage.",
    pronunciation: "/ˈbʌn.d͡ʒi/",
    englishEquivalent: "bungee"
  },
  {
    word: "practicals",
    definition: "Definition: A part of an exam or series of exams in which the candidate has to demonstrate their practical ability",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "practicals"
  },
  {
    word: "aquaculture",
    definition: "Definition: The cultivation of aquatic produce such as aquatic plants, fish and other aquatic animals.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "aquaculture"
  },
  {
    word: "lemonades",
    definition: "Definition: A flavoured beverage consisting of water, lemon, and sweetener, sometimes ice, served mainly as a refreshment.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "lemonades"
  },
  {
    word: "supers",
    definition: "Definition: Short for superannuation.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "supers"
  },
  {
    word: "expiration",
    definition: "Definition: The act of expiring.",
    pronunciation: "/ˌɛk.spəˈɹeɪ.ʃən/",
    englishEquivalent: "expiration"
  },
  {
    word: "paler",
    definition: "Definition: Light in color.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "paler"
  },
  {
    word: "pilaus",
    definition: "Definition: A dish made by browning grain, typically rice, in oil and then cooking it with a seasoned broth, to which meat and/or vegetables may be added.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pilaus"
  },
  {
    word: "demanded",
    definition: "Definition: To request forcefully.",
    pronunciation: "/dɪˈmɑːndɪd/",
    englishEquivalent: "demanded"
  },
  {
    word: "valise",
    definition: "Definition: A piece of hand luggage such as a suitcase or travelling bag.",
    pronunciation: "/vəˈliːz/",
    englishEquivalent: "valise"
  },
  {
    word: "autonomic",
    definition: "Definition: Acting or occurring involuntarily, without conscious control.",
    pronunciation: "/ˌɔː.tə.ˈnɒm.ɪk/",
    englishEquivalent: "autonomic"
  },
  {
    word: "epidural",
    definition: "Definition: An injection of anaesthetic into the epidural space of the spine, especially associated with pain relief during childbirth.",
    pronunciation: "/ɛpɪˈdjɔːɹəl/",
    englishEquivalent: "epidural"
  },
  {
    word: "counterstaining",
    definition: "Definition: To stain with a counterstain",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "counterstaining"
  },
  {
    word: "cosines",
    definition: "Definition: In a right triangle, the ratio of the length of the side adjacent to an acute angle to the length of the hypotenuse. Symbol: cos",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "cosines"
  },
  {
    word: "unconfirmed",
    definition: "Definition: Not finally established, settled or confirmed.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unconfirmed"
  },
  {
    word: "cissies",
    definition: "Definition: A cisgender or cissexual person.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "cissies"
  },
  {
    word: "mortal",
    definition: "Definition: A human; someone susceptible to death.",
    pronunciation: "/ˈmɔːtəl/",
    englishEquivalent: "mortal"
  },
  {
    word: "official",
    definition: "Definition: An office holder invested with powers and authorities.",
    pronunciation: "/əˈfɪʃəl/",
    englishEquivalent: "official"
  },
  {
    word: "octane",
    definition: "Definition: Any of the eighteen isomeric aliphatic hydrocarbons (C8H18) found in petroleum, especially an iso-octane 2,2,4 trimethyl-pentane; they are used as fuels and solvents.",
    pronunciation: "/ˈɒk.teɪn/",
    englishEquivalent: "octane"
  },
  {
    word: "intersected",
    definition: "Definition: To cut into or between; to cut or cross mutually; to divide into parts.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "intersected"
  },
  {
    word: "colocynth",
    definition: "Definition: A viny plant, Citrullus colocynthis, native to the Mediterranean Basin and Asia. It produces a lemon-sized, yellowish, green-mottled, spongy, and extremely bitter fruit.",
    pronunciation: "/kɒl.əˈsɪnθ/",
    englishEquivalent: "colocynth"
  },
  {
    word: "consented",
    definition: "Definition: To express willingness, to give permission.",
    pronunciation: "/kənˈsɛntɪd/",
    englishEquivalent: "consented"
  },
  {
    word: "cumulated",
    definition: "Definition: To accumulate; to amass.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "cumulated"
  },
  {
    word: "maculae",
    definition: "Definition: An oval yellow spot near the center of the retina of the human eye, histologically defined as having two or more layers of ganglion cells, responsible for detailed central vision.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "maculae"
  },
  {
    word: "studbooks",
    definition: "Definition: In livestock breeding, a written record of the genealogy of animals.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "studbooks"
  },
  {
    word: "kalimba",
    definition: "Definition: A type of thumb piano, similar to a mbira.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "kalimba"
  },
  {
    word: "semipermeable",
    definition: "Definition: Permeable to some things and not to others, as a cell membrane which allows some molecules through but blocks other substances.",
    pronunciation: "/ˌsɛmaɪ-/",
    englishEquivalent: "semipermeable"
  },
  {
    word: "bankings",
    definition: "Definition: The business of managing a bank.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "bankings"
  },
  {
    word: "winegrowers",
    definition: "Definition: A person or company that owns a vineyard and produces wine.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "winegrowers"
  },
  {
    word: "bios",
    definition: "Definition: Biographical sketch",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "bios"
  },
  {
    word: "famine",
    definition: "Definition: Extreme shortage of food in a region.",
    pronunciation: "/ˈfæmɪn/",
    englishEquivalent: "famine"
  },
  {
    word: "tittupping",
    definition: "Definition: To prance or frolic; of a horse, to canter easily.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tittupping"
  },
  {
    word: "additional",
    definition: "Definition: Something added.",
    pronunciation: "/əˈdɪʃənəl/",
    englishEquivalent: "additional"
  },
  {
    word: "roughies",
    definition: "Definition: A fish in family Trachichthyidae",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "roughies"
  },
  {
    word: "berate",
    definition: "Definition: To chide or scold vehemently",
    pronunciation: "/bɪˈɹeɪt/",
    englishEquivalent: "berate"
  },
  {
    word: "oceanology",
    definition: "Definition: Oceanography",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "oceanology"
  },
  {
    word: "cottier",
    definition: "Definition: A pin or wedge inserted through a slot to hold machine parts together.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "cottier"
  },
  {
    word: "woodlander",
    definition: "Definition: A dweller in a woodland.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "woodlander"
  },
  {
    word: "retroact",
    definition: "Definition: To act backward, or in return; to act in opposition; to be retrospective.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "retroact"
  },
  {
    word: "affluent",
    definition: "Definition: Somebody who is wealthy.",
    pronunciation: "/ˈæf.lu.ənt/",
    englishEquivalent: "affluent"
  },
  {
    word: "stoppers",
    definition: "Definition: Agent noun of stop, someone or something that stops something.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "stoppers"
  },
  {
    word: "microprism",
    definition: "Definition: Any of many very small prisms used, either to form a reflective surface, or to form an area in a camera's viewfinder that blurs if the image is not precisely in focus",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "microprism"
  },
  {
    word: "cicelies",
    definition: "Definition: Myrrhis odorata, a plant in the genus Myrrhis, in the family Apiaceae.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "cicelies"
  },
  {
    word: "fibers",
    definition: "Definition: A single elongated piece of a given material, roughly round in cross-section, often twisted with other fibers to form thread.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "fibers"
  },
  {
    word: "levitated",
    definition: "Definition: To cause to rise in the air and float, as if in defiance of gravity.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "levitated"
  },
  {
    word: "biotopes",
    definition: "Definition: A geographical area that has a uniform biological environment and a uniform distribution of plants and animals",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "biotopes"
  },
  {
    word: "chapmen",
    definition: "Definition: A dealer or merchant, especially an itinerant one.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "chapmen"
  },
  {
    word: "oompah",
    definition: "Definition: A genre of Germanic music (especially Bavarian music) typically involving brass instruments.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "oompah"
  },
  {
    word: "nitrates",
    definition: "Definition: Any salt or ester of nitric acid.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "nitrates"
  },
  {
    word: "handcraft",
    definition: "Definition: Handicraft",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "handcraft"
  },
  {
    word: "nodes",
    definition: "Definition: A knot, knob, protuberance or swelling.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "nodes"
  },
  {
    word: "elating",
    definition: "Definition: To make joyful or proud.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "elating"
  },
  {
    word: "plaudits",
    definition: "Definition: (often in the plural) A mark or expression of applause; praise bestowed.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "plaudits"
  },
  {
    word: "altimetry",
    definition: "Definition: The science of measuring altitude",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "altimetry"
  },
  {
    word: "abreast",
    definition: "Definition: Side by side, facing forward.",
    pronunciation: "/əˈbɹɛst/",
    englishEquivalent: "abreast"
  },
  {
    word: "eavesdropping",
    definition: "Definition: To hear a conversation one is not intended to hear; to listen in.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "eavesdropping"
  },
  {
    word: "descents",
    definition: "Definition: An instance of descending; act of coming down.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "descents"
  },
  {
    word: "intercrosses",
    definition: "Definition: The act or product of intercrossing",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "intercrosses"
  },
  {
    word: "reguli",
    definition: "Definition: An impure metal formed beneath slag during the smelting of ores.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "reguli"
  },
  {
    word: "jaywalk",
    definition: "Definition: To behave as a jaywalker; to violate pedestrian traffic regulations by crossing a street away from a designated crossing or to walk in the part of the street intended for vehicles rather than on the sidewalk.",
    pronunciation: "/ˈdʒeɪ.wɔːk/",
    englishEquivalent: "jaywalk"
  },
  {
    word: "electrum",
    definition: "Definition: Amber.",
    pronunciation: "/ɪˈlɛktɹəm/",
    englishEquivalent: "electrum"
  },
  {
    word: "monosome",
    definition: "Definition: The chromosome whose homologous counterpart is missing in monosomy.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "monosome"
  },
  {
    word: "chairman",
    definition: "Definition: A person presiding over a meeting.",
    pronunciation: "/ˈtʃɛːmən/",
    englishEquivalent: "chairman"
  },
  {
    word: "odors",
    definition: "Definition: Any smell, whether fragrant or offensive.",
    pronunciation: "/ˈoʊ.dɚz/",
    englishEquivalent: "odors"
  },
  {
    word: "equinox",
    definition: "Definition: The intersection of the apparent path of the sun in the sky (the ecliptic) with the celestial equator.",
    pronunciation: "/ˈiːkwɪˌnɒks/",
    englishEquivalent: "equinox"
  },
  {
    word: "ideate",
    definition: "Definition: To apprehend in thought so as to fix and hold in the mind; to memorize.",
    pronunciation: "/ˈaɪdieɪt/",
    englishEquivalent: "ideate"
  },
  {
    word: "stratagem",
    definition: "Definition: A tactic or artifice designed to gain the upper hand, especially one involving underhanded dealings or deception.",
    pronunciation: "/ˈstɹæt.ə.dʒəm/",
    englishEquivalent: "stratagem"
  },
  {
    word: "replay",
    definition: "Definition: The replaying of (something), for example of televised footage.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "replay"
  },
  {
    word: "subagents",
    definition: "Definition: A person employed by an agent to transact the whole, or a part, of the business entrusted to the latter.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "subagents"
  },
  {
    word: "transcend",
    definition: "Definition: To pass beyond the limits of something.",
    pronunciation: "/tɹæn(t)ˈsɛnd/",
    englishEquivalent: "transcend"
  },
  {
    word: "cohune",
    definition: "Definition: A species of palm, Attalea cohune, native to South America, that produces large nuts.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "cohune"
  },
  {
    word: "divorces",
    definition: "Definition: The legal dissolution of a marriage.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "divorces"
  },
  {
    word: "dock",
    definition: "Definition: Any of the genus Rumex of coarse weedy plants with small green flowers related to buckwheat, especially common dock, and used as potherbs and in folk medicine, especially in curing nettle rash.",
    pronunciation: "/dɒk/",
    englishEquivalent: "dock"
  },
  {
    word: "leaded",
    definition: "Definition: To cover, fill, or affect with lead",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "leaded"
  },
  {
    word: "hypoblasts",
    definition: "Definition: A type of tissue that forms from the inner cell mass and later is incorporated into the endoderm",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "hypoblasts"
  },
  {
    word: "fanciful",
    definition: "Definition: Imaginative or fantastic.",
    pronunciation: "/ˈfænsɪfəl/",
    englishEquivalent: "fanciful"
  },
  {
    word: "decolouring",
    definition: "Definition: To deprive of colour; to bleach.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "decolouring"
  },
  {
    word: "malinger",
    definition: "Definition: To feign illness, injury, or incapacitation in order to avoid work, obligation, or perilous risk.",
    pronunciation: "/məˈlɪŋɡə/",
    englishEquivalent: "malinger"
  },
  {
    word: "vaporise",
    definition: "Definition: To turn into vapor.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "vaporise"
  },
  {
    word: "brilliantly",
    definition: "Definition: In a brilliant manner; with brilliance.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "brilliantly"
  },
  {
    word: "backpedalling",
    definition: "Definition: To pedal backwards on a bicycle.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "backpedalling"
  },
  {
    word: "docketing",
    definition: "Definition: To enter or inscribe in a docket, or list of causes for trial.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "docketing"
  },
  {
    word: "dribble",
    definition: "Definition: Drool; saliva.",
    pronunciation: "/dɹɪ.bl̩/",
    englishEquivalent: "dribble"
  },
  {
    word: "schematizing",
    definition: "Definition: To organize according to a scheme.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "schematizing"
  },
  {
    word: "countercharges",
    definition: "Definition: An accusation against an opponent in an argument in response to the opponent's accusations.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "countercharges"
  },
  {
    word: "yeses",
    definition: "Definition: An affirmative expression; an answer that shows agreement or acceptance.",
    pronunciation: "/jɛsɪz/",
    englishEquivalent: "yeses"
  },
  {
    word: "semifitted",
    definition: "Definition: Partially fitted (with appliances etc)",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "semifitted"
  },
  {
    word: "subtle",
    definition: "Definition: Hard to grasp; not obvious or easily understood; barely noticeable.",
    pronunciation: "/ˈsʌt(ə)l/",
    englishEquivalent: "subtle"
  },
  {
    word: "paperclips",
    definition: "Definition: A small, folded, wire or plastic device used to hold sheets of paper together.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "paperclips"
  },
  {
    word: "unfolds",
    definition: "Definition: To undo a folding.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unfolds"
  },
  {
    word: "eclogite",
    definition: "Definition: A coarse-grained metamorphic rock, a mixture of pyroxene, quartz, and feldspar with inclusions of red garnet.",
    pronunciation: "/ˈɛklədʒʌɪt/",
    englishEquivalent: "eclogite"
  },
  {
    word: "preppiest",
    definition: "Definition: Relating to things (such as clothing) that are typical of students at prep schools",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "preppiest"
  },
  {
    word: "ape",
    definition: "Definition: A primate of the clade Hominoidea, generally larger than monkeys and distinguished from them by having no tail.",
    pronunciation: "/eɪp/",
    englishEquivalent: "ape"
  },
  {
    word: "ranting",
    definition: "Definition: To speak or shout at length in uncontrollable anger.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "ranting"
  },
  {
    word: "undercards",
    definition: "Definition: A list of minor or supporting contests printed on the same bill as the main event (primarily fighting or racing, such as the main fight at a boxing match or wrestling, horse or car racing, etc.), occurring before or after the main event.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "undercards"
  },
  {
    word: "schistosome",
    definition: "Definition: A parasitic flatworm which needs two hosts to complete its life cycle. The immature form infests freshwater snails and the adult lives in the blood vessels of birds and mammals, causing bilharzia in humans.",
    pronunciation: "/ˈʃɪ.stə(ʊ)ˌsəʊm/",
    englishEquivalent: "schistosome"
  },
  {
    word: "appositions",
    definition: "Definition: (grammar) A construction in which one noun or noun phrase is placed with another as an explanatory equivalent, both of them having the same syntactic function in the sentence.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "appositions"
  },
  {
    word: "monomanias",
    definition: "Definition: Excessive interest or concentration on a singular object or subject.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "monomanias"
  },
  {
    word: "jugulate",
    definition: "Definition: To cut the throat of.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "jugulate"
  },
  {
    word: "clerical",
    definition: "Definition: A member of the clergy.",
    pronunciation: "/ˈklɛɹɪkəl/",
    englishEquivalent: "clerical"
  },
  {
    word: "allowanced",
    definition: "Definition: To put upon a fixed allowance (especially of provisions and drink).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "allowanced"
  },
  {
    word: "devas",
    definition: "Definition: A god in Vedic mythology, Hinduism and Buddhism.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "devas"
  },
  {
    word: "oxford",
    definition: "Definition: A variety of shoe, typically made of heavy leather.",
    pronunciation: "/ˈɒksfəd/",
    englishEquivalent: "oxford"
  },
  {
    word: "tilapias",
    definition: "Definition: Any of various edible fish, of the genus Tilapia, native to Africa and the Middle East but naturalized worldwide.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tilapias"
  },
  {
    word: "embryo",
    definition: "Definition: In the reproductive cycle, the stage after the fertilization of the egg that precedes the development into a fetus.",
    pronunciation: "/ˈɛmbɹi.əʊ/",
    englishEquivalent: "embryo"
  },
  {
    word: "stinkiest",
    definition: "Definition: Having a strong, unpleasant smell; stinking.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "stinkiest"
  },
  {
    word: "smothering",
    definition: "Definition: To suffocate; stifle; obstruct, more or less completely, the respiration of something or someone.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "smothering"
  },
  {
    word: "gang",
    definition: "Definition: To go; walk; proceed.",
    pronunciation: "/ɡæŋ/",
    englishEquivalent: "gang"
  },
  {
    word: "volcanos",
    definition: "Definition: A vent or fissure on the surface of a planet (usually in a mountainous form) with a magma chamber attached to the mantle of a planet or moon, periodically erupting forth lava and volcanic gases onto the surface.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "volcanos"
  },
  {
    word: "recharging",
    definition: "Definition: To charge an electric battery after its power has been consumed.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "recharging"
  },
  {
    word: "nabbed",
    definition: "Definition: To seize, arrest or take into custody (a criminal or fugitive).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "nabbed"
  },
  {
    word: "tailing",
    definition: "Definition: To follow and observe surreptitiously.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tailing"
  },
  {
    word: "unaffordable",
    definition: "Definition: Too expensive to be afforded.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unaffordable"
  },
  {
    word: "pinups",
    definition: "Definition: A photograph, printed in a magazine or other publication, of a sexually attractive person (often nude or provocatively dressed), and intended to be removed and pinned up on a wall.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pinups"
  },
  {
    word: "nawab",
    definition: "Definition: A Muslim official in South Asia acting as a provincial deputy ruler under the Mughal empire; a local governor.",
    pronunciation: "/nəˈwɑːb/",
    englishEquivalent: "nawab"
  },
  {
    word: "misreads",
    definition: "Definition: An instance of reading wrongly.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "misreads"
  },
  {
    word: "borough",
    definition: "Definition: A fortified town.",
    pronunciation: "/ˈbʌɹə/",
    englishEquivalent: "borough"
  },
  {
    word: "discoing",
    definition: "Definition: To dance disco-style dances.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "discoing"
  },
  {
    word: "pried",
    definition: "Definition: To look where one is not welcome; to be nosy.",
    pronunciation: "/pɹɑjd/",
    englishEquivalent: "pried"
  },
  {
    word: "tickseeds",
    definition: "Definition: A seed or fruit resembling a tick in shape, or in clinging to the skin or hair/fur.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tickseeds"
  },
  {
    word: "valley",
    definition: "Definition: An elongated depression between hills or mountains, often with a river flowing through it.",
    pronunciation: "/ˈvæli/",
    englishEquivalent: "valley"
  },
  {
    word: "prill",
    definition: "Definition: A rill, a small stream",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "prill"
  },
  {
    word: "crybaby",
    definition: "Definition: A baby who cries excessively.",
    pronunciation: "/ˈkɹaɪˌbeɪbi/",
    englishEquivalent: "crybaby"
  },
  {
    word: "exanthemata",
    definition: "Definition: A widespread rash usually occurring in children.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "exanthemata"
  },
  {
    word: "deduce",
    definition: "Definition: To reach a conclusion by applying rules of logic to given premises.",
    pronunciation: "/dɪˈdjuːs/",
    englishEquivalent: "deduce"
  },
  {
    word: "libellous",
    definition: "Definition: Defamatory, libeling, referring to something that causes harm to someone's reputation especially with malice or disregard.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "libellous"
  },
  {
    word: "ram",
    definition: "Definition: A male sheep, typically uncastrated",
    pronunciation: "/ɹæm/",
    englishEquivalent: "ram"
  },
  {
    word: "dyking",
    definition: "Definition: The process of building a dike.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "dyking"
  },
  {
    word: "habit",
    definition: "Definition: An action performed on a regular basis.",
    pronunciation: "/ˈhæbət/",
    englishEquivalent: "habit"
  },
  {
    word: "allied",
    definition: "Definition: Joined as allies.",
    pronunciation: "/əˈlaɪd/",
    englishEquivalent: "allied"
  },
  {
    word: "electronics",
    definition: "Definition: The study and use of electrical devices that operate by controlling the flow of electrons or other electrically charged particles or by converting the flow of charged particles to or from other forms of energy.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "electronics"
  },
  {
    word: "tended",
    definition: "Definition: (Old English law) To make a tender of; to offer or tender.",
    pronunciation: "/ˈtɛndɪd/",
    englishEquivalent: "tended"
  },
  {
    word: "techies",
    definition: "Definition: One who works with, or has an interest in, technology or computers.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "techies"
  },
  {
    word: "eels",
    definition: "Definition: Any freshwater or marine fish of the order Anguilliformes, which are elongated and resemble snakes.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "eels"
  },
  {
    word: "reprisal",
    definition: "Definition: An act of retaliation.",
    pronunciation: "/ɹɪˈpɹaɪzəl/",
    englishEquivalent: "reprisal"
  },
  {
    word: "palinode",
    definition: "Definition: A poem in which the author retracts something said in an earlier poem.",
    pronunciation: "/ˈpælɪnəʊd/",
    englishEquivalent: "palinode"
  },
  {
    word: "ammoniacal",
    definition: "Definition: Pertaining to or containing ammonia.",
    pronunciation: "/aməˈnʌɪəkəl/",
    englishEquivalent: "ammoniacal"
  },
  {
    word: "minuends",
    definition: "Definition: A number or quantity from which another is to be subtracted.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "minuends"
  },
  {
    word: "graveyards",
    definition: "Definition: A tract of land in which the dead are buried.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "graveyards"
  },
  {
    word: "compression",
    definition: "Definition: An increase in density; the act of compressing, or the state of being compressed; compaction.",
    pronunciation: "/kɒm.pɹɛʃ.ən/",
    englishEquivalent: "compression"
  },
  {
    word: "glassy",
    definition: "Definition: Glass marble.",
    pronunciation: "/ɡlɑːsi/",
    englishEquivalent: "glassy"
  },
  {
    word: "reposal",
    definition: "Definition: The act or state of reposing.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "reposal"
  },
  {
    word: "auditive",
    definition: "Definition: Of or relating to hearing; auditory.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "auditive"
  },
  {
    word: "latchet",
    definition: "Definition: A small lever action crossbow with the cocking lever built into the top of the stock and a top mounted trigger.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "latchet"
  },
  {
    word: "bothers",
    definition: "Definition: Fuss, ado.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "bothers"
  },
  {
    word: "boxfish",
    definition: "Definition: Any of the family Ostraciidae of often colorful, squared, bony fishes.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "boxfish"
  },
  {
    word: "dishdashas",
    definition: "Definition: An ankle-length robe with long sleeves worn by some Arab men.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "dishdashas"
  },
  {
    word: "splintering",
    definition: "Definition: To come apart into long sharp fragments.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "splintering"
  },
  {
    word: "pods",
    definition: "Definition: A seed case for legumes (e.g. peas, beans, peppers); a seedpod.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pods"
  },
  {
    word: "plasticize",
    definition: "Definition: To make something more plastic, especially by adding a plasticizer",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "plasticize"
  },
  {
    word: "vaticinator",
    definition: "Definition: One who vaticinates; a prophet.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "vaticinator"
  },
  {
    word: "soldi",
    definition: "Definition: An Italian coin, formerly one-twentieth of a lira.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "soldi"
  },
  {
    word: "itinerant",
    definition: "Definition: One who travels from place to place.",
    pronunciation: "/aɪˈtɪnɚənt/",
    englishEquivalent: "itinerant"
  },
  {
    word: "faraday",
    definition: "Definition: The quantity of electricity required to deposit or liberate 1 gram equivalent weight of a substance during electrolysis; approximately −96,487 coulombs.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "faraday"
  },
  {
    word: "literatures",
    definition: "Definition: The body of all written works.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "literatures"
  },
  {
    word: "cheapened",
    definition: "Definition: To decrease the value of; to make cheap",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "cheapened"
  },
  {
    word: "vorticella",
    definition: "Definition: Any protozoan of the genus Vorticella.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "vorticella"
  },
  {
    word: "worrying",
    definition: "Definition: To be troubled; to give way to mental anxiety or doubt.",
    pronunciation: "/ˈwʌɹijˌɪŋ/",
    englishEquivalent: "worrying"
  },
  {
    word: "prokaryotes",
    definition: "Definition: An organism whose cell (or cells) are characterized by the absence of a nucleus or any other membrane-bound organelles.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "prokaryotes"
  },
  {
    word: "filterable",
    definition: "Definition: Able to be separated by filtration",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "filterable"
  },
  {
    word: "fuzz",
    definition: "Definition: A frizzy mass of hair or fibre.",
    pronunciation: "/fʌz/",
    englishEquivalent: "fuzz"
  },
  {
    word: "swoons",
    definition: "Definition: To faint, to lose consciousness.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "swoons"
  },
  {
    word: "roughrider",
    definition: "Definition: A horsebreaker.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "roughrider"
  },
  {
    word: "reattempted",
    definition: "Definition: To attempt again.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "reattempted"
  },
  {
    word: "insisted",
    definition: "Definition: (with on or upon or (that + ordinary verb form)) To hold up a claim emphatically.",
    pronunciation: "/ɪnˈsɪstɪd/",
    englishEquivalent: "insisted"
  },
  {
    word: "clarinetists",
    definition: "Definition: Someone who plays the clarinet.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "clarinetists"
  },
  {
    word: "deodorant",
    definition: "Definition: Any agent acting to eliminate, reduce, mask, or control odor.",
    pronunciation: "/diˈəʊdəɹənt/",
    englishEquivalent: "deodorant"
  },
  {
    word: "overthinking",
    definition: "Definition: To think about; think over",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "overthinking"
  },
  {
    word: "disused",
    definition: "Definition: To cease the use of.",
    pronunciation: "/ˌdɪsˈjuːzd/",
    englishEquivalent: "disused"
  },
  {
    word: "bellflowers",
    definition: "Definition: Any of many plants that produce flowers that are bell-like.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "bellflowers"
  },
  {
    word: "clangers",
    definition: "Definition: Something that clangs; an alarm bell (also figuratively).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "clangers"
  },
  {
    word: "oversoul",
    definition: "Definition: (especially in transcendentalism) A supreme reality or mind; the spiritual unity of all being.",
    pronunciation: "/ˈəʊvəˌsəʊl/",
    englishEquivalent: "oversoul"
  },
  {
    word: "stokehole",
    definition: "Definition: The aperture through which a furnace is fed or tended.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "stokehole"
  },
  {
    word: "brail",
    definition: "Definition: A small rope used to truss up sails.",
    pronunciation: "/bɹeɪl/",
    englishEquivalent: "brail"
  },
  {
    word: "straggler",
    definition: "Definition: A person who straggles, or departs from the direct or proper course, or from the company to which they belong.",
    pronunciation: "/ˈstɹæɡlə/",
    englishEquivalent: "straggler"
  },
  {
    word: "family",
    definition: "Definition: A group of people who are closely related to one another (by blood, marriage or adoption); kin; for example, a set of parents and their children; an immediate family.",
    pronunciation: "/ˈfɛm(ɘ)li/",
    englishEquivalent: "family"
  },
  {
    word: "dappling",
    definition: "Definition: To mark or become marked with mottling or spots.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "dappling"
  },
  {
    word: "parted",
    definition: "Definition: To leave the company of.",
    pronunciation: "/pɑːtɪd/",
    englishEquivalent: "parted"
  },
  {
    word: "pooves",
    definition: "Definition: A male homosexual, especially one who is effeminate.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pooves"
  },
  {
    word: "schistosomes",
    definition: "Definition: A parasitic flatworm which needs two hosts to complete its life cycle. The immature form infests freshwater snails and the adult lives in the blood vessels of birds and mammals, causing bilharzia in humans.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "schistosomes"
  },
  {
    word: "dulled",
    definition: "Definition: To render dull; to remove or blunt an edge or something that was sharp.",
    pronunciation: "/dəld/",
    englishEquivalent: "dulled"
  },
  {
    word: "cloister",
    definition: "Definition: A covered walk with an open colonnade on one side, running along the walls of buildings that face a quadrangle; especially:",
    pronunciation: "/ˈklɔɪstə/",
    englishEquivalent: "cloister"
  },
  {
    word: "privileges",
    definition: "Definition: (ecclesiastical law) An exemption from certain laws granted by the Pope.",
    pronunciation: "/ˈpɹɪv(ɪ)lɪdʒɪz/",
    englishEquivalent: "privileges"
  },
  {
    word: "waistlines",
    definition: "Definition: A line around the body at the waist; its measurement",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "waistlines"
  },
  {
    word: "colorist",
    definition: "Definition: One who colors; an artist with a talent for coloring.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "colorist"
  },
  {
    word: "sourwoods",
    definition: "Definition: A North American deciduous shrubby tree, of the genus Oxydendrum, having deep fissures in its bark, and sour-tasting leaves.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sourwoods"
  },
  {
    word: "subacute",
    definition: "Definition: A patient whose condition is less than acute.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "subacute"
  },
  {
    word: "aftermost",
    definition: "Definition: Nearest the stern of a vessel; hindmost.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "aftermost"
  },
  {
    word: "spry",
    definition: "Definition: Having great power of leaping or running; nimble; active.",
    pronunciation: "/spɹaɪ/",
    englishEquivalent: "spry"
  },
  {
    word: "futzes",
    definition: "Definition: To be frivolous and waste time",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "futzes"
  },
  {
    word: "pascal",
    definition: "Definition: In the International System of Units, the derived unit of pressure and stress; one newton per square metre. Symbol: Pa.",
    pronunciation: "/ˈpæskl̩/",
    englishEquivalent: "pascal"
  },
  {
    word: "maras",
    definition: "Definition: A nightmare; a spectre or wraith-like creature in Germanic and particularly Scandinavian folklore; a female demon who torments people in sleep by crouching on their chests or stomachs, or by causing terrifying visions.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "maras"
  },
  {
    word: "compactions",
    definition: "Definition: The process of compacting something, or something that has been compacted.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "compactions"
  },
  {
    word: "gynarchies",
    definition: "Definition: A government ruled by a woman or women.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "gynarchies"
  },
  {
    word: "pushchairs",
    definition: "Definition: A small carriage in which a baby or child is pushed around; a stroller or baby buggy",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pushchairs"
  },
  {
    word: "renumber",
    definition: "Definition: To number again, to assign new numbers to.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "renumber"
  },
  {
    word: "steals",
    definition: "Definition: To take illegally, or without the owner's permission, something owned by someone else.",
    pronunciation: "/stiːlz/",
    englishEquivalent: "steals"
  },
  {
    word: "preheated",
    definition: "Definition: To heat something in preparation for further action, especially cooking",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "preheated"
  },
  {
    word: "quarryman",
    definition: "Definition: A man involved in quarrying (mining for stone).",
    pronunciation: "/ˈkwɔɹ.i.mən/",
    englishEquivalent: "quarryman"
  },
  {
    word: "biosystematics",
    definition: "Definition: Taxonomy based upon statistical data of the evolution of organisms",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "biosystematics"
  },
  {
    word: "visitatorial",
    definition: "Definition: Visitorial",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "visitatorial"
  },
  {
    word: "stockkeepers",
    definition: "Definition: A keeper of stock or cattle; a herdsman.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "stockkeepers"
  },
  {
    word: "mowers",
    definition: "Definition: A lawnmower, a machine used to cut grass.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "mowers"
  },
  {
    word: "outlets",
    definition: "Definition: A vent or similar passage to allow the escape of something.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "outlets"
  },
  {
    word: "bulldozes",
    definition: "Definition: To destroy with a bulldozer.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "bulldozes"
  },
  {
    word: "flavorless",
    definition: "Definition: Lacking taste or flavor; without seasoning, spice, or discernible qualities of taste.",
    pronunciation: "/ˈfleɪvələs/",
    englishEquivalent: "flavorless"
  },
  {
    word: "spoliates",
    definition: "Definition: To plunder",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "spoliates"
  },
  {
    word: "decayed",
    definition: "Definition: To deteriorate, to get worse, to lose strength or health, to decline in quality.",
    pronunciation: "/dɪˈkeɪd/",
    englishEquivalent: "decayed"
  },
  {
    word: "presoaks",
    definition: "Definition: An initial soak.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "presoaks"
  },
  {
    word: "chokey",
    definition: "Definition: Reminiscent of choking.",
    pronunciation: "/ˈtʃəʊki/",
    englishEquivalent: "chokey"
  },
  {
    word: "disambiguate",
    definition: "Definition: To remove ambiguities from; to make less ambiguous; to clarify or specify which of multiple possibilities, e.g. possible meanings of an ambiguous statement, applies, or to invite or require this.",
    pronunciation: "/dɪ.samˈbɪɡjuːeɪt/",
    englishEquivalent: "disambiguate"
  },
  {
    word: "galloped",
    definition: "Definition: (of a horse, etc) To run at a gallop.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "galloped"
  },
  {
    word: "sudoriferous",
    definition: "Definition: Sweaty or sweating, bearing sweat.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sudoriferous"
  },
  {
    word: "passersby",
    definition: "Definition: A person who is passing by (that is, walking past).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "passersby"
  },
  {
    word: "pinfeathers",
    definition: "Definition: A developing feather as it emerges through the skin",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pinfeathers"
  },
  {
    word: "cosmopolis",
    definition: "Definition: An important city, such as a capital city, inhabited by people from a diverse range of cultural backgrounds.",
    pronunciation: "/kɒzˈmɒ.pɒ.lɪs/",
    englishEquivalent: "cosmopolis"
  },
  {
    word: "descend",
    definition: "Definition: To pass from a higher to a lower place; to move downwards; to come or go down in any way, for example by falling, flowing, walking, climbing etc.",
    pronunciation: "/dɪˈsɛnd/",
    englishEquivalent: "descend"
  },
  {
    word: "sharpshooters",
    definition: "Definition: A person trained to shoot precisely with a rifle; a marksman.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sharpshooters"
  },
  {
    word: "earldom",
    definition: "Definition: The rank of being an earl.",
    pronunciation: "/ˈəɹldəm/",
    englishEquivalent: "earldom"
  },
  {
    word: "chasing",
    definition: "Definition: To pursue.",
    pronunciation: "/ˈtʃeɪsɪŋ/",
    englishEquivalent: "chasing"
  },
  {
    word: "bandmate",
    definition: "Definition: Someone with whom one shares membership in a band.",
    pronunciation: "/ˈbændˌmeɪt/",
    englishEquivalent: "bandmate"
  },
  {
    word: "private",
    definition: "Definition: A soldier of the lowest rank in the army.",
    pronunciation: "/ˈpɹaɪvət/",
    englishEquivalent: "private"
  },
  {
    word: "depolarizing",
    definition: "Definition: To remove the polarization from something.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "depolarizing"
  },
  {
    word: "planetoids",
    definition: "Definition: An asteroid of any size",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "planetoids"
  },
  {
    word: "expulsions",
    definition: "Definition: The act of expelling or the state of being expelled.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "expulsions"
  },
  {
    word: "nabes",
    definition: "Definition: Neighborhood.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "nabes"
  },
  {
    word: "divorcee",
    definition: "Definition: A person divorced.",
    pronunciation: "/dɪvɔːˈsiː/",
    englishEquivalent: "divorcee"
  },
  {
    word: "pentodes",
    definition: "Definition: A thermionic valve similar to a tetrode with the addition of a third grid, the suppressor grid; was/is used in high quality audio and radio products",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pentodes"
  },
  {
    word: "curls",
    definition: "Definition: A piece or lock of curling hair; a ringlet.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "curls"
  },
  {
    word: "hoofed",
    definition: "Definition: To trample with hooves.",
    pronunciation: "/hʊft/",
    englishEquivalent: "hoofed"
  },
  {
    word: "postdoctorate",
    definition: "Definition: Postdoctoral",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "postdoctorate"
  },
  {
    word: "extralegal",
    definition: "Definition: Occurring outside the law; not governed by law; lawless.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "extralegal"
  },
  {
    word: "authorise",
    definition: "Definition: To grant (someone) the permission or power necessary to do (something).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "authorise"
  },
  {
    word: "sinuosities",
    definition: "Definition: The property of being sinuous.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sinuosities"
  },
  {
    word: "gyrated",
    definition: "Definition: To revolve round a central point; to move spirally about an axis, as a tornado; to revolve.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "gyrated"
  },
  {
    word: "quantize",
    definition: "Definition: To limit the number of possible values of a quantity, or states of a system, by applying the rules of quantum mechanics",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "quantize"
  },
  {
    word: "haughtiness",
    definition: "Definition: The state or property of being haughty; arrogance, snobbery.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "haughtiness"
  },
  {
    word: "unnecessarily",
    definition: "Definition: In an unnecessary way; not by necessity.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unnecessarily"
  },
  {
    word: "ransom",
    definition: "Definition: Money paid for the freeing of a hostage.",
    pronunciation: "/ˈɹænsəm/",
    englishEquivalent: "ransom"
  },
  {
    word: "planting",
    definition: "Definition: To place (a seed or plant) in soil or other substrate in order that it may live and grow.",
    pronunciation: "/ˈplɑːntɪŋ/",
    englishEquivalent: "planting"
  },
  {
    word: "untogether",
    definition: "Definition: That which is untogether.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "untogether"
  },
  {
    word: "hermetic",
    definition: "Definition: (chiefly with capital initial) Pertaining to Hermes Trismegistus or the writings attributed to him.",
    pronunciation: "/hə(ɹ)ˈmɛtɪk/",
    englishEquivalent: "hermetic"
  },
  {
    word: "uncrossed",
    definition: "Definition: To move something, especially one's arms or legs, from a crossed position.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "uncrossed"
  },
  {
    word: "pestled",
    definition: "Definition: To pound, crush, rub or grind, as in a mortar with a pestle.",
    pronunciation: "/ˈpɛsəld/",
    englishEquivalent: "pestled"
  },
  {
    word: "kernes",
    definition: "Definition: Any part of a letter which extends into the space used by another letter.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "kernes"
  },
  {
    word: "grecizing",
    definition: "Definition: To render Grecian, or cause (a word or phrase in another language) to take a Greek form.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "grecizing"
  },
  {
    word: "pluckiest",
    definition: "Definition: Having or showing pluck, courage or spirit in trying circumstances.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pluckiest"
  },
  {
    word: "empanels",
    definition: "Definition: To enrol (jurors), e.g. from a jury pool; to register (the names of jurors) on a 'panel' or official list.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "empanels"
  },
  {
    word: "exams",
    definition: "Definition: The act of examining.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "exams"
  },
  {
    word: "roundworms",
    definition: "Definition: An invertebrate animal of the phylum Nematoda and other similar phyla. Many species of roundworms are parasites.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "roundworms"
  },
  {
    word: "steamrolling",
    definition: "Definition: To flatten, as if with a steamroller.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "steamrolling"
  },
  {
    word: "shewbread",
    definition: "Definition: Twelve loaves of bread placed on the alter in Jewish Temples and renewed periodically. See showbread.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "shewbread"
  },
  {
    word: "playbacks",
    definition: "Definition: The replaying of something previously recorded, especially sound or moving images.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "playbacks"
  },
  {
    word: "ascarids",
    definition: "Definition: Any phasmid nematode of the family Ascarididae (Ascaridae)",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "ascarids"
  },
  {
    word: "habits",
    definition: "Definition: An action performed on a regular basis.",
    pronunciation: "/ˈhæbɪts/",
    englishEquivalent: "habits"
  },
  {
    word: "contemplatives",
    definition: "Definition: Someone who has dedicated themselves to religious contemplation.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "contemplatives"
  },
  {
    word: "sulfonamide",
    definition: "Definition: Any amide of a sulfonic acid RS(=O)2NR'2",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sulfonamide"
  },
  {
    word: "pathology",
    definition: "Definition: The branch of medicine concerned with the study of the nature of disease and its causes, processes, development, and consequences.",
    pronunciation: "/pəˈθɒlədʒi/",
    englishEquivalent: "pathology"
  },
  {
    word: "horror",
    definition: "Definition: An intense distressing emotion of fear or repugnance.",
    pronunciation: "/ˈhɔɹɚ/",
    englishEquivalent: "horror"
  },
  {
    word: "arranger",
    definition: "Definition: One who arranges.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "arranger"
  },
  {
    word: "uncrowns",
    definition: "Definition: To deprive of the monarchy or other authority or status.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "uncrowns"
  },
  {
    word: "fishtails",
    definition: "Definition: The tail of a fish, or an object resembling this.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "fishtails"
  },
  {
    word: "yerked",
    definition: "Definition: To stab.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "yerked"
  },
  {
    word: "picrites",
    definition: "Definition: A variety of high-magnesium olivine basalt.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "picrites"
  },
  {
    word: "pepping",
    definition: "Definition: To inject with energy and enthusiasm.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pepping"
  },
  {
    word: "beached",
    definition: "Definition: Having a beach.",
    pronunciation: "/biːtʃt/",
    englishEquivalent: "beached"
  },
  {
    word: "ignoramuses",
    definition: "Definition: A totally ignorant person—unknowledgeable, uneducated, or uninformed; a fool.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "ignoramuses"
  },
  {
    word: "ultramarathons",
    definition: "Definition: A running race over a distance longer than 42.195 km, the length of a standard marathon.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "ultramarathons"
  },
  {
    word: "wafts",
    definition: "Definition: To (cause to) float easily or gently through the air.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "wafts"
  },
  {
    word: "premodify",
    definition: "Definition: To modify in advance",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "premodify"
  },
  {
    word: "lambkin",
    definition: "Definition: A young lamb, a very young sheep.",
    pronunciation: "/ˈlæmkɪn/",
    englishEquivalent: "lambkin"
  },
  {
    word: "millionth",
    definition: "Definition: The person or thing in the millionth position.",
    pronunciation: "/ˈmɪljənθ/",
    englishEquivalent: "millionth"
  },
  {
    word: "intercrossing",
    definition: "Definition: To cross back over one another",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "intercrossing"
  },
  {
    word: "gaboons",
    definition: "Definition: A receptacle for spit; a spittoon, a spitbox; a spit bucket.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "gaboons"
  },
  {
    word: "fibula",
    definition: "Definition: An ancient kind of brooch used to hold clothing together, similar in function to the modern safety pin.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "fibula"
  },
  {
    word: "oxidases",
    definition: "Definition: Any of many enzymes which catalyze oxidation reactions, especially ones using molecular oxygen.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "oxidases"
  },
  {
    word: "planetesimals",
    definition: "Definition: Any of many small, solid astronomical objects that orbit a star and form protoplanets through mutual gravitational attraction.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "planetesimals"
  },
  {
    word: "umbra",
    definition: "Definition: The fully shaded inner region of a shadow cast by an opaque object.",
    pronunciation: "/ˈʌmbɹə/",
    englishEquivalent: "umbra"
  },
  {
    word: "riffs",
    definition: "Definition: A repeated instrumental melody line in a song.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "riffs"
  },
  {
    word: "biomarkers",
    definition: "Definition: A substance used as an indicator of a biological state, most commonly disease.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "biomarkers"
  },
  {
    word: "enviro",
    definition: "Definition: An ecofreak.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "enviro"
  },
  {
    word: "false",
    definition: "Definition: One of two options on a true-or-false test.",
    pronunciation: "/fɒls/",
    englishEquivalent: "false"
  },
  {
    word: "sartorius",
    definition: "Definition: A long, thin muscle that runs down the length of the thigh; the longest muscle in the human body.",
    pronunciation: "/sɑː(ɹ)ˈtɔːɹ.i.əs/",
    englishEquivalent: "sartorius"
  },
  {
    word: "glimpse",
    definition: "Definition: A brief look, glance, or peek.",
    pronunciation: "/ɡlɪmps/",
    englishEquivalent: "glimpse"
  },
  {
    word: "lunatic",
    definition: "Definition: An insane person.",
    pronunciation: "/ˈluːnətɪk/",
    englishEquivalent: "lunatic"
  },
  {
    word: "thermopiles",
    definition: "Definition: An electronic device that converts thermal energy into electrical energy. Usually constructed using a series-combination of thermocouples",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "thermopiles"
  },
  {
    word: "vitally",
    definition: "Definition: In a manner that imparts vitality",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "vitally"
  },
  {
    word: "minsters",
    definition: "Definition: A monastic church.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "minsters"
  },
  {
    word: "miradors",
    definition: "Definition: A tower that offers a panoramic view",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "miradors"
  },
  {
    word: "frenetic",
    definition: "Definition: One who is frenetic.",
    pronunciation: "/fɹəˈnɛt.ɪk/",
    englishEquivalent: "frenetic"
  },
  {
    word: "catamount",
    definition: "Definition: A wild animal of the family Felidae, especially cougar, puma or lynx.",
    pronunciation: "/ˈkætəmaʊnt/",
    englishEquivalent: "catamount"
  },
  {
    word: "carabineers",
    definition: "Definition: A cavalry soldier",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "carabineers"
  },
  {
    word: "blips",
    definition: "Definition: To emit one or more bleeps.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "blips"
  },
  {
    word: "meanness",
    definition: "Definition: The condition, or quality, of being mean (any of its definitions)",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "meanness"
  },
  {
    word: "influential",
    definition: "Definition: A person who has influence",
    pronunciation: "/ɪnfluˈɛnʃəl/",
    englishEquivalent: "influential"
  },
  {
    word: "microbrew",
    definition: "Definition: A beer produced by a small local brewery, or microbrewery.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "microbrew"
  },
  {
    word: "parathormone",
    definition: "Definition: Parathyroid hormone",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "parathormone"
  },
  {
    word: "scores",
    definition: "Definition: The total number of goals, points, runs, etc. earned by a participant in a game.",
    pronunciation: "/skɔɹz/",
    englishEquivalent: "scores"
  },
  {
    word: "havering",
    definition: "Definition: To hem and haw",
    pronunciation: "/ˈheɪvəɹɪŋ/",
    englishEquivalent: "havering"
  },
  {
    word: "elutriate",
    definition: "Definition: To decant; to purify something by straining it",
    pronunciation: "/ɪˈluːtɹɪeɪt/",
    englishEquivalent: "elutriate"
  },
  {
    word: "polity",
    definition: "Definition: An organizational structure of the government of a state, church, etc.",
    pronunciation: "/ˈpɑ.lɪ.ti/",
    englishEquivalent: "polity"
  },
  {
    word: "gossiped",
    definition: "Definition: To talk about someone else's private or personal business, especially in a manner that spreads the information.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "gossiped"
  },
  {
    word: "fascinator",
    definition: "Definition: A fascinating person",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "fascinator"
  },
  {
    word: "colognes",
    definition: "Definition: A type of perfume consisting of 2-5% essential oils, 70-90 % alcohol and water.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "colognes"
  },
  {
    word: "mutation",
    definition: "Definition: Any alteration or change.",
    pronunciation: "/mjuˈteɪʃən/",
    englishEquivalent: "mutation"
  },
  {
    word: "committees",
    definition: "Definition: A body of one or more persons convened for the accomplishment of some specific purpose, typically with formal protocols.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "committees"
  },
  {
    word: "wheelwright",
    definition: "Definition: A person who builds and repairs wheels, especially wooden spoked ones.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "wheelwright"
  },
  {
    word: "rinsed",
    definition: "Definition: To wash (something) quickly using water and no soap.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "rinsed"
  },
  {
    word: "superabounded",
    definition: "Definition: To abound very much; to be superabundant.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "superabounded"
  },
  {
    word: "shiftier",
    definition: "Definition: Subject to frequent changes in direction.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "shiftier"
  },
  {
    word: "irradiant",
    definition: "Definition: That radiates light",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "irradiant"
  },
  {
    word: "plagiarises",
    definition: "Definition: To use, and pass off as one's own, someone else's writing, speech, ideas, or other intellectual or creative work, especially in an academic context; to commit plagiarism.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "plagiarises"
  },
  {
    word: "granita",
    definition: "Definition: An Italian dessert of fruit purée etc. on crushed ice.",
    pronunciation: "/ɡɹəˈniːtə/",
    englishEquivalent: "granita"
  },
  {
    word: "seedling",
    definition: "Definition: A young plant grown from seed.",
    pronunciation: "/ˈsiːdlɪŋ/",
    englishEquivalent: "seedling"
  },
  {
    word: "now",
    definition: "Definition: The present time.",
    pronunciation: "/naʊ/",
    englishEquivalent: "now"
  },
  {
    word: "equidistant",
    definition: "Definition: Occupying a position midway between two ends or sides.",
    pronunciation: "/i.kwəˈdɪs.tənt/",
    englishEquivalent: "equidistant"
  },
  {
    word: "epicenters",
    definition: "Definition: The point on the land or water surface directly above the focus, or hypocentre, of an earthquake.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "epicenters"
  },
  {
    word: "milldam",
    definition: "Definition: A dam constructed across a river or stream to raise the water level so that it can turn a millwheel; also, the millpond so created.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "milldam"
  },
  {
    word: "sunshine",
    definition: "Definition: The direct rays, light or warmth of the sun.",
    pronunciation: "/ˈsʌnʃaɪn/",
    englishEquivalent: "sunshine"
  },
  {
    word: "galingales",
    definition: "Definition: Any of several east Asian plants of genera Alpinia and Kaempferia in the ginger family, used as a spice, but principally Alpinia galanga.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "galingales"
  },
  {
    word: "trivia",
    definition: "Definition: Insignificant trifles of little importance, especially items of unimportant information",
    pronunciation: "/ˈtɹɪvi.ə/",
    englishEquivalent: "trivia"
  },
  {
    word: "pornier",
    definition: "Definition: Reminiscent of pornography; somewhat pornographic.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pornier"
  },
  {
    word: "etherealize",
    definition: "Definition: To make ethereal.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "etherealize"
  },
  {
    word: "spotted",
    definition: "Definition: To see, find; to pick out, notice, locate, distinguish or identify.",
    pronunciation: "/ˈspɒtɨd/",
    englishEquivalent: "spotted"
  },
  {
    word: "monteith",
    definition: "Definition: A bowl used for the cooling or washing of wine glasses.",
    pronunciation: "/mɒnˈtiːθ/",
    englishEquivalent: "monteith"
  },
  {
    word: "bedding",
    definition: "Definition: The textiles associated with a bed, e.g., sheets, pillowcases, bedspreads, blankets, etc.",
    pronunciation: "/ˈbɛdɪŋ/",
    englishEquivalent: "bedding"
  },
  {
    word: "artisan",
    definition: "Definition: A skilled manual worker who uses tools and machinery in a particular craft.",
    pronunciation: "/ˈɑː(ɹ)tɪzæn/",
    englishEquivalent: "artisan"
  },
  {
    word: "individualize",
    definition: "Definition: To give something its own individuality; to characterize or differentiate.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "individualize"
  },
  {
    word: "kept",
    definition: "Definition: To continue in (a course or mode of action); not to intermit or fall from; to uphold or maintain.",
    pronunciation: "/ˈkɛpt/",
    englishEquivalent: "kept"
  },
  {
    word: "duststorms",
    definition: "Definition: Phenomenon in which gale- to hurricane-force winds blow particles up in a planet's atmosphere.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "duststorms"
  },
  {
    word: "forelady",
    definition: "Definition: The female equivalent of a foreman",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "forelady"
  },
  {
    word: "zig",
    definition: "Definition: A sudden or sharp turn or change of direction.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "zig"
  },
  {
    word: "forgettable",
    definition: "Definition: Easily forgotten",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "forgettable"
  },
  {
    word: "requires",
    definition: "Definition: To ask (someone) for something; to request.",
    pronunciation: "/ɹɪˈkwaɪəz/",
    englishEquivalent: "requires"
  },
  {
    word: "nomothetic",
    definition: "Definition: Relating to the underlying laws of a subject",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "nomothetic"
  },
  {
    word: "vermis",
    definition: "Definition: A narrow, worm-like structure found in animal brains between the hemispheres of the cerebellum; it is the site of termination of the spinocerebellar pathways that carry subconscious proprioception.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "vermis"
  },
  {
    word: "classed",
    definition: "Definition: To assign to a class; to classify.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "classed"
  },
  {
    word: "crosstrees",
    definition: "Definition: A light timber or metal spreader fixed athwartships part way up a mast to spread the shrouds from higher up",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "crosstrees"
  },
  {
    word: "soundboxes",
    definition: "Definition: The open chamber (resonator) of a stringed musical instrument, which intensifies its tone.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "soundboxes"
  },
  {
    word: "anatomist",
    definition: "Definition: One who studies, teaches, writes on, or does research on anatomy and anatomical structures.",
    pronunciation: "/əˈnæt.ə.mɪst/",
    englishEquivalent: "anatomist"
  },
  {
    word: "salvo",
    definition: "Definition: An exception; a reservation; an excuse.",
    pronunciation: "/ˈsælvəʊ/",
    englishEquivalent: "salvo"
  },
  {
    word: "potentiometer",
    definition: "Definition: A user-adjustable 3 terminal variable resistor that can be used as a voltage divider.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "potentiometer"
  },
  {
    word: "pharynx",
    definition: "Definition: The part of the alimentary canal and respiratory tract that extends from the back of the mouth and nasal cavity to the larynx and esophagus.",
    pronunciation: "/ˈfæɹɪŋks/",
    englishEquivalent: "pharynx"
  },
  {
    word: "unbaked",
    definition: "Definition: Not baked or cooked.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unbaked"
  },
  {
    word: "scuta",
    definition: "Definition: A scutum.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "scuta"
  },
  {
    word: "flock",
    definition: "Definition: A large number of birds, especially those gathered together for the purpose of migration.",
    pronunciation: "/flɒk/",
    englishEquivalent: "flock"
  },
  {
    word: "overdrunk",
    definition: "Definition: To drink to excess",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "overdrunk"
  },
  {
    word: "orientating",
    definition: "Definition: To face a given direction.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "orientating"
  },
  {
    word: "stager",
    definition: "Definition: An actor on the stage.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "stager"
  },
  {
    word: "tiebreaks",
    definition: "Definition: A tiebreaker, a game or an extension to a game played to resolve a tied score.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tiebreaks"
  },
  {
    word: "inters",
    definition: "Definition: To bury in a grave.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "inters"
  },
  {
    word: "brainstormed",
    definition: "Definition: To investigate something, or solve a problem using brainstorming.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "brainstormed"
  },
  {
    word: "technocracy",
    definition: "Definition: A system of governance where people who are skilled or proficient govern in their respective areas of expertise.",
    pronunciation: "/tɛkˈnɒkɹəsi/",
    englishEquivalent: "technocracy"
  },
  {
    word: "gimmicking",
    definition: "Definition: To rig or set up with a trick or device.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "gimmicking"
  },
  {
    word: "antsy",
    definition: "Definition: Restless, apprehensive and fidgety",
    pronunciation: "/ˈæn.tsi/",
    englishEquivalent: "antsy"
  },
  {
    word: "benevolence",
    definition: "Definition: Disposition to do good.",
    pronunciation: "/bəˈnɛvələns/",
    englishEquivalent: "benevolence"
  },
  {
    word: "enforcements",
    definition: "Definition: The act of enforcing; compulsion.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "enforcements"
  },
  {
    word: "preppies",
    definition: "Definition: A student of a prep school.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "preppies"
  },
  {
    word: "wee",
    definition: "Definition: A short time or short distance.",
    pronunciation: "/wiː/",
    englishEquivalent: "wee"
  },
  {
    word: "simply",
    definition: "Definition: (manner) In a simple way or state; considered in or by itself; without addition; alone.",
    pronunciation: "/ˈsɪmpli/",
    englishEquivalent: "simply"
  },
  {
    word: "petards",
    definition: "Definition: A small, hat-shaped explosive device, used to breach a door or wall.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "petards"
  },
  {
    word: "isoenzymes",
    definition: "Definition: Any of a group of enzymes that catalyze the same reaction but have different structures and physical, biochemical and immunological properties.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "isoenzymes"
  },
  {
    word: "aquatics",
    definition: "Definition: Any aquatic plant.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "aquatics"
  },
  {
    word: "omnivores",
    definition: "Definition: An animal which is able to consume both plants (like a herbivore) and meat (like a carnivore).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "omnivores"
  },
  {
    word: "lymphadenitis",
    definition: "Definition: Lymphadenopathy.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "lymphadenitis"
  },
  {
    word: "hairlines",
    definition: "Definition: The line along one's forehead where hair starts growing.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "hairlines"
  },
  {
    word: "cub",
    definition: "Definition: A young fox.",
    pronunciation: "/kʌb/",
    englishEquivalent: "cub"
  },
  {
    word: "grimed",
    definition: "Definition: To begrime; to cake with dirt.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "grimed"
  },
  {
    word: "polyandry",
    definition: "Definition: The having of a plurality of husbands at the same time; usually, the marriage of a woman to more than one man, or the practice of having several husbands, at the same time.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "polyandry"
  },
  {
    word: "malingerers",
    definition: "Definition: A person who malingers.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "malingerers"
  },
  {
    word: "entitling",
    definition: "Definition: To give a title to.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "entitling"
  },
  {
    word: "vibrating",
    definition: "Definition: To shake with small, rapid movements to and fro.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "vibrating"
  },
  {
    word: "irrupted",
    definition: "Definition: To break into.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "irrupted"
  },
  {
    word: "denturists",
    definition: "Definition: A person who makes and fits dentures",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "denturists"
  },
  {
    word: "oribis",
    definition: "Definition: Ourebia ourebi, a species of antelope.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "oribis"
  },
  {
    word: "nonallergic",
    definition: "Definition: Not allergic.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "nonallergic"
  },
  {
    word: "revulsion",
    definition: "Definition: Abhorrence, a sense of loathing, intense aversion, repugnance, repulsion, horror.",
    pronunciation: "/ɹəvʌˈlʃən/",
    englishEquivalent: "revulsion"
  },
  {
    word: "wursts",
    definition: "Definition: A German- or Austrian-style sausage.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "wursts"
  },
  {
    word: "microfilm",
    definition: "Definition: A continuous roll of film containing photographs of documents at a greatly reduced size",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "microfilm"
  },
  {
    word: "perversity",
    definition: "Definition: The quality of being perverse.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "perversity"
  },
  {
    word: "mentalists",
    definition: "Definition: A practitioner of mentalism.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "mentalists"
  },
  {
    word: "moots",
    definition: "Definition: A moot court.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "moots"
  },
  {
    word: "lovelinesses",
    definition: "Definition: The property of being lovely, of attractiveness, beauty, appearing to be lovable.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "lovelinesses"
  },
  {
    word: "meantime",
    definition: "Definition: The time spent waiting for another event; time in between.",
    pronunciation: "/ˈmiːntaɪm/",
    englishEquivalent: "meantime"
  },
  {
    word: "scandalise",
    definition: "Definition: To cause great offense to (someone).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "scandalise"
  },
  {
    word: "understands",
    definition: "Definition: To grasp a concept fully and thoroughly, especially (of words, statements, art, etc.) to be aware of the meaning of and (of people) to be aware of the intent of.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "understands"
  },
  {
    word: "alphabetizes",
    definition: "Definition: To arrange words or items in order of the first (and then subsequent) letters as they occur in the alphabet.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "alphabetizes"
  },
  {
    word: "pettiest",
    definition: "Definition: Little, small, secondary in rank or importance.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pettiest"
  },
  {
    word: "lisping",
    definition: "Definition: To pronounce the consonant ‘s’ imperfectly; to give ‘s’ and ‘z’ the sounds of ‘th’ (/θ/). This is a speech impediment common among children.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "lisping"
  },
  {
    word: "mac",
    definition: "Definition: A waterproof long coat made of rubberized cloth.",
    pronunciation: "/mæk/",
    englishEquivalent: "mac"
  },
  {
    word: "lurdans",
    definition: "Definition: A lazy, stupid person; a sluggard.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "lurdans"
  },
  {
    word: "overoptimism",
    definition: "Definition: Excessive optimism.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "overoptimism"
  },
  {
    word: "dejecting",
    definition: "Definition: Make sad or dispirited.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "dejecting"
  },
  {
    word: "oraches",
    definition: "Definition: The saltbush: any of several plants, of the genus Atriplex, especially Atriplex hortensis or Atriplex patula, found in dry habitats, that have edible leaves resembling spinach.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "oraches"
  },
  {
    word: "personality",
    definition: "Definition: A set of non-physical psychological and social qualities that make a person (or thing) distinct from another.",
    pronunciation: "/-i/",
    englishEquivalent: "personality"
  },
  {
    word: "francophone",
    definition: "Definition: A person who speaks French, especially as their mother tongue.",
    pronunciation: "/ˈfɹæŋkɒfəʊn/",
    englishEquivalent: "francophone"
  },
  {
    word: "kid",
    definition: "Definition: A young goat.",
    pronunciation: "/kɪd/",
    englishEquivalent: "kid"
  },
  {
    word: "briquette",
    definition: "Definition: A small brick, typically made of charcoal and used for fuel.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "briquette"
  },
  {
    word: "roved",
    definition: "Definition: To shoot with arrows (at).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "roved"
  },
  {
    word: "sacral",
    definition: "Definition: Any of the sacral bones that make up the sacrum.",
    pronunciation: "/ˈseɪkɹəl/",
    englishEquivalent: "sacral"
  },
  {
    word: "ritzy",
    definition: "Definition: Elegant and luxurious.",
    pronunciation: "/ˈɹɪ.t͡si/",
    englishEquivalent: "ritzy"
  },
  {
    word: "blastocyst",
    definition: "Definition: The mammalian blastula",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "blastocyst"
  },
  {
    word: "tocopherols",
    definition: "Definition: Any of several isomers of the principal component of vitamin E, each containing a chromanol ring and an isoprene side-chain.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tocopherols"
  },
  {
    word: "tocopherol",
    definition: "Definition: Any of several isomers of the principal component of vitamin E, each containing a chromanol ring and an isoprene side-chain.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tocopherol"
  },
  {
    word: "newsmen",
    definition: "Definition: A reporter; a person in the profession of providing news.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "newsmen"
  },
  {
    word: "hazier",
    definition: "Definition: Thick or obscured with haze.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "hazier"
  },
  {
    word: "regelated",
    definition: "Definition: To undergo regelation.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "regelated"
  },
  {
    word: "swotting",
    definition: "Definition: To study with effort or determination (object of study indicated by 'up on').",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "swotting"
  },
  {
    word: "bluegills",
    definition: "Definition: A North American sunfish; Lepomis macrochirus.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "bluegills"
  },
  {
    word: "homolog",
    definition: "Definition: Something homologous; a homologous organ or part, chemical compound or chromosome.",
    pronunciation: "/ˈhɒməlɒɡ/",
    englishEquivalent: "homolog"
  },
  {
    word: "tailender",
    definition: "Definition: One of the last four or five batsmen in the batting order, normally bowlers with limited batting ability; a member of the tail.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tailender"
  },
  {
    word: "truanted",
    definition: "Definition: To play truant.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "truanted"
  },
  {
    word: "teem",
    definition: "Definition: To be stocked to overflowing.",
    pronunciation: "/tiːm/",
    englishEquivalent: "teem"
  },
  {
    word: "rechecking",
    definition: "Definition: To check again.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "rechecking"
  },
  {
    word: "duplex",
    definition: "Definition: A house made up of two dwelling units.",
    pronunciation: "/ˈduplɛks/",
    englishEquivalent: "duplex"
  },
  {
    word: "mammoth",
    definition: "Definition: Any species of the extinct genus Mammuthus, of large, usually hairy, elephant-like mammals with long curved tusks and an inclined back, which became extinct with the last retreat of ice age glaciers during the late Pleistocene period, and are known from fossils, frozen carcasses, and Paleolithic cave paintings found in North America and Eurasia.",
    pronunciation: "/ˈmæməθ/",
    englishEquivalent: "mammoth"
  },
  {
    word: "hornbeams",
    definition: "Definition: A tree of the genus Carpinus, having a smooth gray bark and a ridged trunk, the wood being white and very hard, common along the banks of streams in the United States.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "hornbeams"
  },
  {
    word: "worldview",
    definition: "Definition: One's personal view of the world and how one interprets it.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "worldview"
  },
  {
    word: "monotonous",
    definition: "Definition: Having an unvarying tone or pitch.",
    pronunciation: "/məˈnɒtənəs/",
    englishEquivalent: "monotonous"
  },
  {
    word: "unlearning",
    definition: "Definition: The process by which something is unlearned.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unlearning"
  },
  {
    word: "experiments",
    definition: "Definition: A test under controlled conditions made to either demonstrate a known truth, examine the validity of a hypothesis, or determine the efficacy of something previously untried.",
    pronunciation: "/ɪkˈspɛɹ.ɪ.mənts/",
    englishEquivalent: "experiments"
  },
  {
    word: "watercourses",
    definition: "Definition: Any channel, either natural or artificial, through which water flows.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "watercourses"
  },
  {
    word: "valorising",
    definition: "Definition: To assess (something) as being valuable or admirable.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "valorising"
  },
  {
    word: "stigmatization",
    definition: "Definition: The process or act of stigmatizing.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "stigmatization"
  },
  {
    word: "tesla",
    definition: "Definition: In the International System of Units, the derived unit of magnetic flux density or magnetic inductivity. Symbol: T",
    pronunciation: "/ˈtɛslə/",
    englishEquivalent: "tesla"
  },
  {
    word: "rumbled",
    definition: "Definition: To make a low, heavy, continuous sound.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "rumbled"
  },
  {
    word: "retaking",
    definition: "Definition: To take something again",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "retaking"
  },
  {
    word: "cashing",
    definition: "Definition: To exchange (a check/cheque) for money in the form of notes/bills.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "cashing"
  },
  {
    word: "inappreciative",
    definition: "Definition: Unappreciative.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "inappreciative"
  },
  {
    word: "hypermarket",
    definition: "Definition: A combination of department store and supermarket.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "hypermarket"
  },
  {
    word: "motif",
    definition: "Definition: A recurring or dominant element; a theme.",
    pronunciation: "/moʊˈtiːf/",
    englishEquivalent: "motif"
  },
  {
    word: "tired",
    definition: "Definition: To become sleepy or weary.",
    pronunciation: "/taɪəd/",
    englishEquivalent: "tired"
  },
  {
    word: "uremia",
    definition: "Definition: Blood poisoning resulting from the retention of waste products usually excreted as urine.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "uremia"
  },
  {
    word: "hornier",
    definition: "Definition: Hard or bony, like an animal's horn.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "hornier"
  },
  {
    word: "carcass",
    definition: "Definition: The body of a dead animal.",
    pronunciation: "/ˈkɑːkəs/",
    englishEquivalent: "carcass"
  },
  {
    word: "reconnoitring",
    definition: "Definition: To perform a reconnaissance (of an area; an enemy position); to scout with the aim of gaining information.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "reconnoitring"
  },
  {
    word: "cornball",
    definition: "Definition: A ball of popped corn stuck together with soft candy from molasses or sugar.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "cornball"
  },
  {
    word: "cambric",
    definition: "Definition: A finely-woven fabric made originally from linen but often now from cotton.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "cambric"
  },
  {
    word: "modesties",
    definition: "Definition: The quality of being modest; having a limited and not overly high opinion of oneself and one's abilities.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "modesties"
  },
  {
    word: "sanitizing",
    definition: "Definition: To rid of microorganisms by cleaning or disinfecting.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sanitizing"
  },
  {
    word: "greenlighted",
    definition: "Definition: To approve; to permit to proceed.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "greenlighted"
  },
  {
    word: "tea",
    definition: "Definition: A drug smoked or ingested for euphoric effect, cannabis.",
    pronunciation: "/tiː/",
    englishEquivalent: "tea"
  },
  {
    word: "countenancing",
    definition: "Definition: To tolerate, support, sanction, patronise or approve of something.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "countenancing"
  },
  {
    word: "frailty",
    definition: "Definition: The condition quality of being frail, physically, mentally, or morally; weakness of resolution; liability to be deceived or seduced.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "frailty"
  },
  {
    word: "disentitled",
    definition: "Definition: To deprive of title, right or claim.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "disentitled"
  },
  {
    word: "groat",
    definition: "Definition: (chiefly in the plural) Hulled grain.",
    pronunciation: "/ɡɹəʊt/",
    englishEquivalent: "groat"
  },
  {
    word: "schlepps",
    definition: "Definition: To carry, drag, or lug.",
    pronunciation: "/ʃlɛps/",
    englishEquivalent: "schlepps"
  },
  {
    word: "minidiscs",
    definition: "Definition: A disc/disk in MiniDisc format",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "minidiscs"
  },
  {
    word: "veracity",
    definition: "Definition: (of a person) The quality of speaking or stating the truth; truthfulness.",
    pronunciation: "/vəˈɹæ.sɪ.ti/",
    englishEquivalent: "veracity"
  },
  {
    word: "payoff",
    definition: "Definition: A payment.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "payoff"
  },
  {
    word: "soignee",
    definition: "Definition: Showing elegance and sophistication.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "soignee"
  },
  {
    word: "perimeter",
    definition: "Definition: The sum of the distance of all the lengths of the sides of an object.",
    pronunciation: "/pəˈɹɪmɪtə(ɹ)/",
    englishEquivalent: "perimeter"
  },
  {
    word: "clematises",
    definition: "Definition: Any plant of the genus Clematis, vigorous climbing lianas found throughout the temperate zones.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "clematises"
  },
  {
    word: "contrails",
    definition: "Definition: An artificial cloud made by the exhaust of jet aircraft or wingtip vortices that precipitate a stream of tiny ice crystals in moist, frigid upper air.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "contrails"
  },
  {
    word: "halyards",
    definition: "Definition: A rope used to raise or lower a sail, flag, spar or yard.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "halyards"
  },
  {
    word: "fuglemen",
    definition: "Definition: The member of a military group who leads the way or demonstrates drill; hence, someone who keeps the beat or timing, and/or demonstrates motions in other contexts.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "fuglemen"
  },
  {
    word: "blurred",
    definition: "Definition: To make indistinct or hazy, to obscure or dim.",
    pronunciation: "/blɜːd/",
    englishEquivalent: "blurred"
  },
  {
    word: "eaten",
    definition: "Definition: To ingest; to be ingested.",
    pronunciation: "/ˈiːt(ə)n/",
    englishEquivalent: "eaten"
  },
  {
    word: "whitecaps",
    definition: "Definition: Any of several birds having a white patch on the head.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "whitecaps"
  },
  {
    word: "capacity",
    definition: "Definition: The ability to hold, receive or absorb",
    pronunciation: "/kəˈpæsɪti/",
    englishEquivalent: "capacity"
  },
  {
    word: "official",
    definition: "Definition: An office holder invested with powers and authorities.",
    pronunciation: "/əˈfɪʃəl/",
    englishEquivalent: "official"
  },
  {
    word: "pucker",
    definition: "Definition: A fold or wrinkle.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pucker"
  },
  {
    word: "polysulfide",
    definition: "Definition: Any compound of general formula RSnR having a chain of more than two sulfur atoms; any derivative of a polysulfane.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "polysulfide"
  },
  {
    word: "purist",
    definition: "Definition: An advocate of purism.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "purist"
  },
  {
    word: "bulldozer",
    definition: "Definition: A tractor with an attached blade for pushing earth and building debris for coarse preliminary surface grading, demolishing building structures, etc.",
    pronunciation: "/ˈbʊldoʊzɚ/",
    englishEquivalent: "bulldozer"
  },
  {
    word: "castrates",
    definition: "Definition: To remove the testicles of an animal.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "castrates"
  },
  {
    word: "roves",
    definition: "Definition: To shoot with arrows (at).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "roves"
  },
  {
    word: "phalanges",
    definition: "Definition: A phalanx (of soldiers, people etc.).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "phalanges"
  },
  {
    word: "guernsey",
    definition: "Definition: A seaman's knitted woolen sweater, similar to a jersey.",
    pronunciation: "/ˈɡɜːnzi/",
    englishEquivalent: "guernsey"
  },
  {
    word: "sacring",
    definition: "Definition: To consecrate",
    pronunciation: "/ˈseɪkɹɪŋ/",
    englishEquivalent: "sacring"
  },
  {
    word: "chuggers",
    definition: "Definition: A street fundraiser, especially a private contractor, working on behalf of a charity, who is aggressive or invasive.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "chuggers"
  },
  {
    word: "spinthariscopes",
    definition: "Definition: An early device for observing individual nuclear disintegrations.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "spinthariscopes"
  },
  {
    word: "selkies",
    definition: "Definition: A seal which can magically transform into a human by shedding its skin.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "selkies"
  },
  {
    word: "bookkeeper",
    definition: "Definition: A person responsible for keeping records or documents, such as of a business.",
    pronunciation: "/bʌʔˈkiː.pə(ɹ)/",
    englishEquivalent: "bookkeeper"
  },
  {
    word: "lumberyards",
    definition: "Definition: A facility dedicated to the preparation and/or sale of lumber.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "lumberyards"
  },
  {
    word: "badging",
    definition: "Definition: To mark or distinguish with a badge.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "badging"
  },
  {
    word: "heaping",
    definition: "Definition: To pile in a heap.",
    pronunciation: "/ˈhiːpɪŋ/",
    englishEquivalent: "heaping"
  },
  {
    word: "clung",
    definition: "Definition: To hold very tightly, as to not fall off.",
    pronunciation: "/ˈklʌŋ/",
    englishEquivalent: "clung"
  },
  {
    word: "rudely",
    definition: "Definition: In a rude manner",
    pronunciation: "/ˈɹuːdli/",
    englishEquivalent: "rudely"
  },
  {
    word: "macumba",
    definition: "Definition: A religious cult, having elements of sorcery, ritual dance and fetishes, from Brazil",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "macumba"
  },
  {
    word: "goodness",
    definition: "Definition: The state or characteristic of being good.",
    pronunciation: "/ˈɡʊdnəs/",
    englishEquivalent: "goodness"
  },
  {
    word: "assiduous",
    definition: "Definition: Hard-working, diligent or regular (in attendance or work); industrious.",
    pronunciation: "/əˈsɪdjuːəs/",
    englishEquivalent: "assiduous"
  },
  {
    word: "interpreting",
    definition: "Definition: To explain or tell the meaning of; to translate orally into intelligible or familiar language or terms. applied especially to language, but also to dreams, signs, conduct, mysteries, etc.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "interpreting"
  },
  {
    word: "immersion",
    definition: "Definition: The act of immersing or the condition of being immersed.",
    pronunciation: "/ɪˈmɝʒən/",
    englishEquivalent: "immersion"
  },
  {
    word: "endeavour",
    definition: "Definition: A sincere attempt; a determined or assiduous effort towards a specific goal; assiduous or persistent activity.",
    pronunciation: "/ɪnˈdɛv.ə/",
    englishEquivalent: "endeavour"
  },
  {
    word: "springtide",
    definition: "Definition: The tide which occurs when the moon is new or full; the effects of the Sun and moon being reinforced so that this tide is of maximum range.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "springtide"
  },
  {
    word: "combustion",
    definition: "Definition: The act or process of burning.",
    pronunciation: "/kəmˈbʌs.tʃən/",
    englishEquivalent: "combustion"
  },
  {
    word: "underestimate",
    definition: "Definition: An estimate that is too low.",
    pronunciation: "/ʌndɚˈɛs.tɨ.meɪt/",
    englishEquivalent: "underestimate"
  },
  {
    word: "rack",
    definition: "Definition: A series of one or more shelves, stacked one above the other",
    pronunciation: "/ɹæk/",
    englishEquivalent: "rack"
  },
  {
    word: "moulin",
    definition: "Definition: A cylindrical, vertical shaft that extends through a glacier and is carved by meltwater from the glacier’s surface.",
    pronunciation: "/ˈmuːlan/",
    englishEquivalent: "moulin"
  },
  {
    word: "totals",
    definition: "Definition: An amount obtained by the addition of smaller amounts.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "totals"
  },
  {
    word: "shindig",
    definition: "Definition: A noisy party or festivities.",
    pronunciation: "/ˈʃɪn.dɪɡ/",
    englishEquivalent: "shindig"
  },
  {
    word: "sticklebacks",
    definition: "Definition: Any one of numerous species of small fish of the family Gasterosteidae. The back is armed with two or more sharp spines. They inhabit both salt and brackish water, and construct nests from weeds.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sticklebacks"
  },
  {
    word: "reutilize",
    definition: "Definition: To use or utilize something again, or for another purpose",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "reutilize"
  },
  {
    word: "ostracodes",
    definition: "Definition: Any of many small crustaceans, of the class Ostracoda, that resemble a shrimp enclosed in a bivalve shell.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "ostracodes"
  },
  {
    word: "redding",
    definition: "Definition: To free from entanglement.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "redding"
  },
  {
    word: "al",
    definition: "Definition: The Indian mulberry, Morinda citrifolia, especially as used to make dye.",
    pronunciation: "/æl/",
    englishEquivalent: "al"
  },
  {
    word: "visitation",
    definition: "Definition: The act of visiting, or an instance of being visited.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "visitation"
  },
  {
    word: "join",
    definition: "Definition: An intersection of piping or wiring; an interconnect.",
    pronunciation: "/ˈdʒɔɪn/",
    englishEquivalent: "join"
  },
  {
    word: "impostor",
    definition: "Definition: Someone who attempts to deceive by using an assumed name or identity.",
    pronunciation: "/ɪmˈpɒstə/",
    englishEquivalent: "impostor"
  },
  {
    word: "holystones",
    definition: "Definition: A piece of soft sandstone used for scouring the wooden decks of ships, usually with sand and seawater.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "holystones"
  },
  {
    word: "hadron",
    definition: "Definition: A composite particle that comprises two or more quarks held together by the strong force and (consequently) can interact with other particles via said force; a meson or a baryon.",
    pronunciation: "/ˈhæd.ɹɑn/",
    englishEquivalent: "hadron"
  },
  {
    word: "attesting",
    definition: "Definition: To affirm to be correct, true, or genuine.",
    pronunciation: "/əˈtɛstɪŋ/",
    englishEquivalent: "attesting"
  },
  {
    word: "fistful",
    definition: "Definition: The amount that can be held in a closed fist",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "fistful"
  },
  {
    word: "unbarring",
    definition: "Definition: To remove an impediment that obstructs the passage of (someone or something).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unbarring"
  },
  {
    word: "toothworts",
    definition: "Definition: Any of several species of flowering plants, of the genus Lathraea.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "toothworts"
  },
  {
    word: "chum",
    definition: "Definition: A friend; a pal.",
    pronunciation: "/tʃʌm/",
    englishEquivalent: "chum"
  },
  {
    word: "regatta",
    definition: "Definition: A series of boat races, or sometimes a single race.",
    pronunciation: "/ɹɪˈɡætə/",
    englishEquivalent: "regatta"
  },
  {
    word: "madding",
    definition: "Definition: To be or become mad.",
    pronunciation: "/ˈmædɪŋ/",
    englishEquivalent: "madding"
  },
  {
    word: "heist",
    definition: "Definition: A robbery or burglary, especially from an institution such as a bank or museum.",
    pronunciation: "/ˈhaɪst/",
    englishEquivalent: "heist"
  },
  {
    word: "abscission",
    definition: "Definition: The act or process of cutting off.",
    pronunciation: "/æbˈsɪ.ʃn̩/",
    englishEquivalent: "abscission"
  },
  {
    word: "capacitances",
    definition: "Definition: The property of an electric circuit or its element that permits it to store charge, defined as the ratio of stored charge to potential over that element or circuit (Q/V); SI unit: farad (F).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "capacitances"
  },
  {
    word: "overbuying",
    definition: "Definition: To buy excessively, especially to buy more than one needs or can afford",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "overbuying"
  },
  {
    word: "parados",
    definition: "Definition: Generally a screen or embankment to protect the rear of a position from enemy attack, from bomb splinters from behind, from enemy fire from a commanding height, or fire from flanking positions. In common English usage since World War II, the term 'parados', particularly in trench warfare, has largely been discarded in favour of 'rear parapet', which, etymologically speaking, is a contradiction in terms. In some contexts the term 'rear traverse' is preferred, but no usage is exclusive. In fortifications that were enfiladed by enemy in positions commanding the fort, an internal parados could defilade the enemy, serving as physical protection and blindage. Usages of the term have varied inconsistently according to times and sources. Some sources use parados as a synonym for a traverse; some other sources represent parados as a special class of traverse and not necessarily at the back of any particular position. In trench warfare parados referred to a bank of earth or similar material behind the rear of the trench, opposite the parapet, affording protection from explosions and fragments when shells or bombs overshot the trench.",
    pronunciation: "/ˈpaɹədɒs/",
    englishEquivalent: "parados"
  },
  {
    word: "upchuck",
    definition: "Definition: Vomit.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "upchuck"
  },
  {
    word: "shrewdly",
    definition: "Definition: In a shrewd manner.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "shrewdly"
  },
  {
    word: "blockade",
    definition: "Definition: The physical blocking or surrounding of a place, especially a port, in order to prevent commerce and traffic in or out.",
    pronunciation: "/blɒˈkeɪd/",
    englishEquivalent: "blockade"
  },
  {
    word: "oolite",
    definition: "Definition: A rock consisting of spherical grains within a mineral cortex accreted around a nucleus, often of quartz grains.",
    pronunciation: "/ˈəʊəlʌɪt/",
    englishEquivalent: "oolite"
  },
  {
    word: "floodtide",
    definition: "Definition: The period between low tide and the next high tide in which the sea is rising.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "floodtide"
  },
  {
    word: "preservice",
    definition: "Definition: Occurring prior to the provision of a service.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "preservice"
  },
  {
    word: "typecast",
    definition: "Definition: To cast an actor in the same kind of role repeatedly.",
    pronunciation: "/ˈtaɪp.kɑːst/",
    englishEquivalent: "typecast"
  },
  {
    word: "tubes",
    definition: "Definition: Anything that is hollow and cylindrical in shape.",
    pronunciation: "/tjuːbz/",
    englishEquivalent: "tubes"
  },
  {
    word: "writhed",
    definition: "Definition: To twist, to wring (something).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "writhed"
  },
  {
    word: "orectic",
    definition: "Definition: Of or pertaining to desire or appetite",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "orectic"
  },
  {
    word: "sleepiest",
    definition: "Definition: Tired; feeling the need for sleep.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sleepiest"
  },
  {
    word: "fornications",
    definition: "Definition: Sexual intercourse by people who are not married, or which is considered illicit in another way.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "fornications"
  },
  {
    word: "query",
    definition: "Definition: A question, an inquiry (US), an enquiry (UK).",
    pronunciation: "/ˈkwɪə.ɹi/",
    englishEquivalent: "query"
  },
  {
    word: "roads",
    definition: "Definition: A way used for travelling between places, originally one wide enough to allow foot passengers and horses to travel, now (US) usually one surfaced with asphalt or concrete and designed to accommodate many vehicles travelling in both directions. In the UK both senses are heard: a country road is the same as a country lane.",
    pronunciation: "/ɹəʊdz/",
    englishEquivalent: "roads"
  },
  {
    word: "enterococcus",
    definition: "Definition: Any of a group of streptococci bacteria, of the genus Enterococcus, that inhabit the human gastrointestinal tract and have great resistance to antibiotics",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "enterococcus"
  },
  {
    word: "heresy",
    definition: "Definition: A doctrine held by a member of a religion at variance with established religious beliefs, especially dissension from Roman Catholic dogma.",
    pronunciation: "/ˈhɛɹəsi/",
    englishEquivalent: "heresy"
  },
  {
    word: "corselet",
    definition: "Definition: Armor for the body, as, the body breastplate and backpiece taken together.",
    pronunciation: "/ˈkɔːslət/",
    englishEquivalent: "corselet"
  },
  {
    word: "monogeneans",
    definition: "Definition: Any of the many trematode flatworms of the class Monogenea, mostly ectoparasites on fish",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "monogeneans"
  },
  {
    word: "tyrannicide",
    definition: "Definition: The killing of a tyrant.",
    pronunciation: "/taɪˈɹænɪsaɪd/",
    englishEquivalent: "tyrannicide"
  },
  {
    word: "westerly",
    definition: "Definition: A westerly wind or storm.",
    pronunciation: "/ˈwɛstə(ɹ)li/",
    englishEquivalent: "westerly"
  },
  {
    word: "aigrette",
    definition: "Definition: A feather or plume, or feather-shaped item, used as an adornment or ornament.",
    pronunciation: "/ˈeɪ.ɡɹɪt/",
    englishEquivalent: "aigrette"
  },
  {
    word: "tartars",
    definition: "Definition: A red compound deposited during wine making; mostly potassium hydrogen tartrate - a source of cream of tartar.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tartars"
  },
  {
    word: "parasail",
    definition: "Definition: A wing-shaped parachute that lifts a rider in a harness when towed by a motorboat etc",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "parasail"
  },
  {
    word: "chiffoniers",
    definition: "Definition: A tall, elegant chest of drawers, often with a mirror attached.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "chiffoniers"
  },
  {
    word: "tootled",
    definition: "Definition: To make a soft toot sound.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tootled"
  },
  {
    word: "phasing",
    definition: "Definition: Movement through phases; arrangement of a sequence or cycle.",
    pronunciation: "/ˈfeɪzɪŋ/",
    englishEquivalent: "phasing"
  },
  {
    word: "cubing",
    definition: "Definition: To raise to the third power; to determine the result of multiplying by itself twice.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "cubing"
  },
  {
    word: "forepeak",
    definition: "Definition: The part of the hold of a ship within the angle of the bow",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "forepeak"
  },
  {
    word: "browser",
    definition: "Definition: A person or animal who browses.",
    pronunciation: "/ˈbɹaʊzə(ɹ)/",
    englishEquivalent: "browser"
  },
  {
    word: "icebox",
    definition: "Definition: A box or compartment containing ice.",
    pronunciation: "/ˈʌɪsbɒks/",
    englishEquivalent: "icebox"
  },
  {
    word: "cots",
    definition: "Definition: A simple bed, especially one for portable or temporary purposes.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "cots"
  },
  {
    word: "berates",
    definition: "Definition: To chide or scold vehemently",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "berates"
  },
  {
    word: "tottered",
    definition: "Definition: To walk, move or stand unsteadily or falteringly; threatening to fall.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tottered"
  },
  {
    word: "baroque",
    definition: "Definition: Ornate, intricate, decorated, laden with detail.",
    pronunciation: "/bæˈɹɒk/",
    englishEquivalent: "baroque"
  },
  {
    word: "warehouseman",
    definition: "Definition: A person who manages, or works in, a warehouse.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "warehouseman"
  },
  {
    word: "catholicized",
    definition: "Definition: To make Catholic; to convert to Catholicism.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "catholicized"
  },
  {
    word: "nomarchies",
    definition: "Definition: Nome",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "nomarchies"
  },
  {
    word: "happily",
    definition: "Definition: By chance; perhaps.",
    pronunciation: "/ˈha.pə.li/",
    englishEquivalent: "happily"
  },
  {
    word: "botheration",
    definition: "Definition: The act of bothering, or state of being bothered; cause of trouble",
    pronunciation: "/ˌbɒðəˈreɪʃən/",
    englishEquivalent: "botheration"
  },
  {
    word: "exempts",
    definition: "Definition: One who has been released from something.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "exempts"
  },
  {
    word: "infesting",
    definition: "Definition: To inhabit a place in unpleasantly large numbers; to plague, harass.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "infesting"
  },
  {
    word: "reinvestments",
    definition: "Definition: The condition of being reinvested",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "reinvestments"
  },
  {
    word: "enamor",
    definition: "Definition: (mostly in the passive, followed by 'of' or 'with') To cause to be in love.",
    pronunciation: "/ɪˈnæmə(ɹ)/",
    englishEquivalent: "enamor"
  },
  {
    word: "foley",
    definition: "Definition: The creation of sound effects, and their addition to film and TV images",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "foley"
  },
  {
    word: "consists",
    definition: "Definition: To be.",
    pronunciation: "/kənˈsɪsts/",
    englishEquivalent: "consists"
  },
  {
    word: "alleges",
    definition: "Definition: To state under oath, to plead.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "alleges"
  },
  {
    word: "pokes",
    definition: "Definition: A prod, jab, or thrust.",
    pronunciation: "/pəʊks/",
    englishEquivalent: "pokes"
  },
  {
    word: "consular",
    definition: "Definition: Of or pertaining to a consul, or the office thereof.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "consular"
  },
  {
    word: "acetal",
    definition: "Definition: Any diether of a geminal diol, R2C(OR')2 (where R' is not H).",
    pronunciation: "/ˈæsɪˌtæl/",
    englishEquivalent: "acetal"
  },
  {
    word: "statehoods",
    definition: "Definition: The property of being a state.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "statehoods"
  },
  {
    word: "practices",
    definition: "Definition: Repetition of an activity to improve a skill.",
    pronunciation: "/ˈpɹæktɪsɪz/",
    englishEquivalent: "practices"
  },
  {
    word: "histolysis",
    definition: "Definition: Breakdown of bodily tissues",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "histolysis"
  },
  {
    word: "immortality",
    definition: "Definition: The condition of being immortal.",
    pronunciation: "/ˌɪmɔːˈtæləti/",
    englishEquivalent: "immortality"
  },
  {
    word: "markdown",
    definition: "Definition: A reduction in price in order to stimulate sales.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "markdown"
  },
  {
    word: "rosarians",
    definition: "Definition: An expert in the cultivation and propagation of roses",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "rosarians"
  },
  {
    word: "grater",
    definition: "Definition: A tool with which one grates, especially cheese, to facilitate getting small particles or shreds off a solid lump",
    pronunciation: "/ˈɡɹeɪtə/",
    englishEquivalent: "grater"
  },
  {
    word: "dognap",
    definition: "Definition: To abduct (a dog).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "dognap"
  },
  {
    word: "immunocompetent",
    definition: "Definition: Having a functioning immune system.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "immunocompetent"
  },
  {
    word: "brigandine",
    definition: "Definition: A coat of armor for the body, consisting of scales or plates, sometimes overlapping each other, generally of metal, and sewn to linen or other material.",
    pronunciation: "/ˈbɹɪɡəndiːn/",
    englishEquivalent: "brigandine"
  },
  {
    word: "brumby",
    definition: "Definition: A wild or feral horse.",
    pronunciation: "/ˈbɹʌmbi/",
    englishEquivalent: "brumby"
  },
  {
    word: "thwarts",
    definition: "Definition: A seat across a boat on which a rower may sit.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "thwarts"
  },
  {
    word: "hammock",
    definition: "Definition: A swinging couch or bed, usually made of netting or canvas about six feet wide, suspended by clews or cords at the ends.",
    pronunciation: "/ˈhæmək/",
    englishEquivalent: "hammock"
  },
  {
    word: "shortest",
    definition: "Definition: Having a small distance from one end or edge to another, either horizontally or vertically.",
    pronunciation: "/ˈʃɔːtɪst/",
    englishEquivalent: "shortest"
  },
  {
    word: "charnel",
    definition: "Definition: A chapel attached to a mortuary.",
    pronunciation: "/[tʃɑːnəl]/",
    englishEquivalent: "charnel"
  },
  {
    word: "globular",
    definition: "Definition: A globular cluster",
    pronunciation: "/ˈɡlɑb.jə.lɚ/",
    englishEquivalent: "globular"
  },
  {
    word: "beedi",
    definition: "Definition: A thin, often flavored, Indian cigarette made of tobacco wrapped in a tendu leaf.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "beedi"
  },
  {
    word: "pushchairs",
    definition: "Definition: A small carriage in which a baby or child is pushed around; a stroller or baby buggy",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pushchairs"
  },
  {
    word: "faggoting",
    definition: "Definition: A decoration of a fabric achieved by removing threads and tying others into bunches.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "faggoting"
  },
  {
    word: "cramming",
    definition: "Definition: To press, force, or drive, particularly in filling, or in thrusting one thing into another; to stuff; to fill to superfluity.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "cramming"
  },
  {
    word: "jewelers",
    definition: "Definition: A person whose job is making, repairing or selling jewelry.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "jewelers"
  },
  {
    word: "willfully",
    definition: "Definition: Willingly, of one's own free will.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "willfully"
  },
  {
    word: "horsing",
    definition: "Definition: To frolic, to act mischievously. (Usually followed by 'around'.)",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "horsing"
  },
  {
    word: "immortelle",
    definition: "Definition: Any of various papery flowers, often dried and used as decoration.",
    pronunciation: "/ɪmɔːˈtɛl/",
    englishEquivalent: "immortelle"
  },
  {
    word: "obtains",
    definition: "Definition: To get hold of; to gain possession of, to procure; to acquire, in any way.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "obtains"
  },
  {
    word: "khan",
    definition: "Definition: A ruler over various Turkish, Tatar and Mongol peoples in the Middle Ages.",
    pronunciation: "/kɑːn/",
    englishEquivalent: "khan"
  },
  {
    word: "marten",
    definition: "Definition: Any carnivorous mammal of the genus Martes in the family Mustelidae.",
    pronunciation: "/ˈmɑː.tən/",
    englishEquivalent: "marten"
  },
  {
    word: "polymer",
    definition: "Definition: A long or larger molecule consisting of a chain or network of many repeating units, formed by chemically bonding together many identical or similar small molecules called monomers. A polymer is formed by polymerization, the joining of many monomer molecules.",
    pronunciation: "/ˈpɒl.ɨ.mə/",
    englishEquivalent: "polymer"
  },
  {
    word: "rectrices",
    definition: "Definition: A governess; a rectoress.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "rectrices"
  },
  {
    word: "dribbled",
    definition: "Definition: (basketball, soccer) In various ball games, to move (with) the ball, controlling its path by kicking or bouncing it repeatedly",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "dribbled"
  },
  {
    word: "nephology",
    definition: "Definition: The branch of meteorology that studies clouds.",
    pronunciation: "/nɪˈfɒlədʒi/",
    englishEquivalent: "nephology"
  },
  {
    word: "quadrangles",
    definition: "Definition: A geometric shape with four angles and four straight sides; a four-sided polygon.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "quadrangles"
  },
  {
    word: "ovoid",
    definition: "Definition: Something that is oval in shape.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "ovoid"
  },
  {
    word: "discerned",
    definition: "Definition: To detect with the senses, especially with the eyes.",
    pronunciation: "/dɪˈsɜːnd/",
    englishEquivalent: "discerned"
  },
  {
    word: "sacral",
    definition: "Definition: Any of the sacral bones that make up the sacrum.",
    pronunciation: "/ˈseɪkɹəl/",
    englishEquivalent: "sacral"
  },
  {
    word: "pst",
    definition: "Definition: Implies that the speaker is sending secret or whispered information to another person.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pst"
  },
  {
    word: "synthetic",
    definition: "Definition: A synthetic compound.",
    pronunciation: "/sɪnˈθɛtɪk/",
    englishEquivalent: "synthetic"
  },
  {
    word: "boomier",
    definition: "Definition: Characterized by heavy bass sounds.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "boomier"
  },
  {
    word: "tubes",
    definition: "Definition: Anything that is hollow and cylindrical in shape.",
    pronunciation: "/tjuːbz/",
    englishEquivalent: "tubes"
  },
  {
    word: "rebbes",
    definition: "Definition: The spiritual leader of a Chassidic Jewish community.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "rebbes"
  },
  {
    word: "dudeen",
    definition: "Definition: A short-stemmed Irish pipe made out of clay.",
    pronunciation: "/duːˈdiːn/",
    englishEquivalent: "dudeen"
  },
  {
    word: "mans",
    definition: "Definition: An adult male human.",
    pronunciation: "/mænz/",
    englishEquivalent: "mans"
  },
  {
    word: "warmed",
    definition: "Definition: To make or keep warm.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "warmed"
  },
  {
    word: "ferocity",
    definition: "Definition: The condition of being ferocious.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "ferocity"
  },
  {
    word: "gamer",
    definition: "Definition: A person who plays any kind of game.",
    pronunciation: "/ˈɡeɪmɚ/",
    englishEquivalent: "gamer"
  },
  {
    word: "unite",
    definition: "Definition: A British gold coin worth 20 shillings, first produced during the reign of King James I, and bearing a legend indicating the king's intention of uniting the kingdoms of England and Scotland.",
    pronunciation: "/juˈnaɪt/",
    englishEquivalent: "unite"
  },
  {
    word: "eidola",
    definition: "Definition: An image or representation of an idea; a representation of an ideal form; an apparition of some actual or imaginary entity, or of some aspect of reality.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "eidola"
  },
  {
    word: "eggnog",
    definition: "Definition: A beverage based on milk, eggs, sugar, and nutmeg; often made alcoholic with rum, brandy or whisky; popular at Christmas.",
    pronunciation: "/ˈɛɡ.nɒɡ/",
    englishEquivalent: "eggnog"
  },
  {
    word: "clamors",
    definition: "Definition: A great outcry or vociferation; loud and continued shouting or exclamation.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "clamors"
  },
  {
    word: "transmuting",
    definition: "Definition: To change, transform or convert one thing to another, or from one state or form to another.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "transmuting"
  },
  {
    word: "trapezes",
    definition: "Definition: A trapezium.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "trapezes"
  },
  {
    word: "graupel",
    definition: "Definition: A precipitation that forms when supercooled droplets of water condense on a snowflake.",
    pronunciation: "/ˈɡɹaʊpəl/",
    englishEquivalent: "graupel"
  },
  {
    word: "wayfarer",
    definition: "Definition: A traveller, especially one on foot.",
    pronunciation: "/ˈweɪˌfɛəɹ.ə(ɹ)/",
    englishEquivalent: "wayfarer"
  },
  {
    word: "westerly",
    definition: "Definition: A westerly wind or storm.",
    pronunciation: "/ˈwɛstə(ɹ)li/",
    englishEquivalent: "westerly"
  },
  {
    word: "oxpecker",
    definition: "Definition: Either of two species of passerine bird in the genus Buphagus, in the monotypic family Buphagidae, endemic to sub-Saharan African savannah.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "oxpecker"
  },
  {
    word: "herl",
    definition: "Definition: A strand of hair",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "herl"
  },
  {
    word: "unhurt",
    definition: "Definition: Not hurt; unharmed or unscathed",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unhurt"
  },
  {
    word: "psychedelia",
    definition: "Definition: The subculture associated with those who take psychedelic drugs.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "psychedelia"
  },
  {
    word: "coxswains",
    definition: "Definition: In a ship's boat, the helmsman given charge of the boat's crew.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "coxswains"
  },
  {
    word: "palpably",
    definition: "Definition: In a palpable manner; tangibly",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "palpably"
  },
  {
    word: "enormously",
    definition: "Definition: Extremely, greatly: to an enormous degree.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "enormously"
  },
  {
    word: "springtide",
    definition: "Definition: The tide which occurs when the moon is new or full; the effects of the Sun and moon being reinforced so that this tide is of maximum range.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "springtide"
  },
  {
    word: "trains",
    definition: "Definition: Elongated portion.",
    pronunciation: "/tɹeɪnz/",
    englishEquivalent: "trains"
  },
  {
    word: "canasta",
    definition: "Definition: (games) A card game similar to rummy and played using two packs, where the object is to meld groups of the same rank.",
    pronunciation: "/kəˈnæstə/",
    englishEquivalent: "canasta"
  },
  {
    word: "ornithischian",
    definition: "Definition: Any of a group of dinosaurs, of the order Ornithischia, that have hips characteristic of birds.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "ornithischian"
  },
  {
    word: "denigrates",
    definition: "Definition: To criticise so as to besmirch; traduce, disparage or defame.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "denigrates"
  },
  {
    word: "haze",
    definition: "Definition: Very fine solid particles (smoke, dust) or liquid droplets (moisture) suspended in the air, slightly limiting visibility.",
    pronunciation: "/heɪz/",
    englishEquivalent: "haze"
  },
  {
    word: "span",
    definition: "Definition: The space from the thumb to the end of the little finger when extended; nine inches; an eighth of a fathom.",
    pronunciation: "/spæn/",
    englishEquivalent: "span"
  },
  {
    word: "protoplasts",
    definition: "Definition: The first-created human; Adam.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "protoplasts"
  },
  {
    word: "shiksa",
    definition: "Definition: (sometimes derogatory) A non-Jewish girl, especially one who is attractive and young.",
    pronunciation: "/ˈʃɪksə/",
    englishEquivalent: "shiksa"
  },
  {
    word: "mudflap",
    definition: "Definition: A rectangular flap mounted near the wheel of a truck to prevent mud from being thrown up onto the vehicle.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "mudflap"
  },
  {
    word: "indecorum",
    definition: "Definition: Indecorous behavior, or the state of being indecorous",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "indecorum"
  },
  {
    word: "shadchan",
    definition: "Definition: (Jewish) marriage broker, matchmaker",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "shadchan"
  },
  {
    word: "belabor",
    definition: "Definition: To labour about; labour over; work hard upon; ply diligently.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "belabor"
  },
  {
    word: "developers",
    definition: "Definition: A person or entity engaged in the creation or improvement of certain classes of products.",
    pronunciation: "/dɪˈvɛləpə(ɹ)z/",
    englishEquivalent: "developers"
  },
  {
    word: "palladia",
    definition: "Definition: A safeguard.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "palladia"
  },
  {
    word: "blasphemies",
    definition: "Definition: An act of irreverence or contempt toward a god or toward something considered sacred; an impious act, utterance, view, etc.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "blasphemies"
  },
  {
    word: "frons",
    definition: "Definition: In vertebrates, especially mammals, the forehead; the part of the cranium between the orbits and the vertex.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "frons"
  },
  {
    word: "gazette",
    definition: "Definition: A newspaper; a printed sheet published periodically; especially, the official journal published by the British government, containing legal and state notices.",
    pronunciation: "/ɡəˈzɛt/",
    englishEquivalent: "gazette"
  },
  {
    word: "handheld",
    definition: "Definition: A personal digital assistant or video game console that is small enough to be held in the hands.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "handheld"
  },
  {
    word: "daffs",
    definition: "Definition: A large frame drum, resembling a tambourine, used to accompany popular and classical music in the Middle East.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "daffs"
  },
  {
    word: "shallots",
    definition: "Definition: A vegetable in the onion family.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "shallots"
  },
  {
    word: "unwelcome",
    definition: "Definition: To treat as unwelcome.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unwelcome"
  },
  {
    word: "paternalism",
    definition: "Definition: The treatment of people in a fatherly manner, especially by caring for them and sometimes being stern with them.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "paternalism"
  },
  {
    word: "deprived",
    definition: "Definition: To take something away from (someone) and keep it away; to deny someone something.",
    pronunciation: "/dɪˈpɹaɪvd/",
    englishEquivalent: "deprived"
  },
  {
    word: "beached",
    definition: "Definition: Having a beach.",
    pronunciation: "/biːtʃt/",
    englishEquivalent: "beached"
  },
  {
    word: "kayoed",
    definition: "Definition: To knock someone out, or render them unconscious or senseless.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "kayoed"
  },
  {
    word: "unlearning",
    definition: "Definition: The process by which something is unlearned.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unlearning"
  },
  {
    word: "outfights",
    definition: "Definition: To fight or battle better than.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "outfights"
  },
  {
    word: "conodonts",
    definition: "Definition: Any of several extinct fish-like chordates having cone-like teeth.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "conodonts"
  },
  {
    word: "unmeasured",
    definition: "Definition: Not having been measured.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unmeasured"
  },
  {
    word: "alterations",
    definition: "Definition: The act of altering or making different.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "alterations"
  },
  {
    word: "bushes",
    definition: "Definition: A woody plant distinguished from a tree by its multiple stems and lower height, being usually less than six metres tall; a horticultural rather than strictly botanical category.",
    pronunciation: "/ˈbʊʃɪz/",
    englishEquivalent: "bushes"
  },
  {
    word: "shamefaced",
    definition: "Definition: Bashful, showing modesty or embarrassment.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "shamefaced"
  },
  {
    word: "mantels",
    definition: "Definition: The shelf above a fireplace which may be also a structural support for the masonry of the chimney.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "mantels"
  },
  {
    word: "headwaiters",
    definition: "Definition: A waiter who has a supervisory position over the other wait staff; chief waiter.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "headwaiters"
  },
  {
    word: "ratings",
    definition: "Definition: A position on a scale",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "ratings"
  },
  {
    word: "sublittoral",
    definition: "Definition: Under the shore.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sublittoral"
  },
  {
    word: "floruits",
    definition: "Definition: The time period during which a person, group, culture, etc. is at its peak.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "floruits"
  },
  {
    word: "noons",
    definition: "Definition: At noontimes.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "noons"
  },
  {
    word: "legislator",
    definition: "Definition: Someone who creates or enacts laws",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "legislator"
  },
  {
    word: "piebalds",
    definition: "Definition: An animal with piebald coloration.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "piebalds"
  },
  {
    word: "negligible",
    definition: "Definition: Able to be neglected, ignored or excluded from consideration; too small or unimportant to be of concern.",
    pronunciation: "/ˈnɛɡlɪdʒɪbəl/",
    englishEquivalent: "negligible"
  },
  {
    word: "rearguard",
    definition: "Definition: The rearmost part of a force, especially a detachment of troops that protect the rear of a retreating force.",
    pronunciation: "/ˈɹɪəɹˌɡɑɹd/",
    englishEquivalent: "rearguard"
  },
  {
    word: "homografts",
    definition: "Definition: An allograft",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "homografts"
  },
  {
    word: "underreported",
    definition: "Definition: To report a number falsely, making it smaller than it ought to be, especially to do so intentionally",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "underreported"
  },
  {
    word: "nuzzling",
    definition: "Definition: (of animals, lovers, etc) To touch someone or something with the nose.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "nuzzling"
  },
  {
    word: "oppositional",
    definition: "Definition: Of, pertaining to, or exhibiting opposition",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "oppositional"
  },
  {
    word: "professoriates",
    definition: "Definition: The office of a professor; professorship",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "professoriates"
  },
  {
    word: "artificially",
    definition: "Definition: In an artificial manner.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "artificially"
  },
  {
    word: "bluehead",
    definition: "Definition: The blunt-headed wrasse or blue-headed wrasse, a fish of the species Thalassoma amblycephalum or Thalassoma bifasciatum.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "bluehead"
  },
  {
    word: "divinities",
    definition: "Definition: A supernatural divine being; a god or goddess.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "divinities"
  },
  {
    word: "sciential",
    definition: "Definition: Of or pertaining to science or to knowledge.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sciential"
  },
  {
    word: "touchdowns",
    definition: "Definition: A six-point score occurring when the ball enters possession of a team's player in the opponent's end zone.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "touchdowns"
  },
  {
    word: "absents",
    definition: "Definition: To keep (oneself) away.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "absents"
  },
  {
    word: "kills",
    definition: "Definition: The act of killing.",
    pronunciation: "/kɪlz/",
    englishEquivalent: "kills"
  },
  {
    word: "airship",
    definition: "Definition: A lighter-than-air aircraft that can be propelled forward through the air as well as steered.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "airship"
  },
  {
    word: "fillets",
    definition: "Definition: A headband; a ribbon or other band used to tie the hair up, or keep a headdress in place, or for decoration.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "fillets"
  },
  {
    word: "mog",
    definition: "Definition: A young cow or bull.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "mog"
  },
  {
    word: "bogeys",
    definition: "Definition: One who robs others in a lawless area, especially as part of a group.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "bogeys"
  },
  {
    word: "allying",
    definition: "Definition: To unite, or form a connection between, as between families by marriage, or between princes and states by treaty, league, or confederacy.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "allying"
  },
  {
    word: "carp",
    definition: "Definition: Any of various freshwater fish of the family Cyprinidae, especially the common carp, Cyprinus carpio.",
    pronunciation: "/ˈkɑːp/",
    englishEquivalent: "carp"
  },
  {
    word: "parallelograms",
    definition: "Definition: A convex quadrilateral in which each pair of opposite edges are parallel and of equal length.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "parallelograms"
  },
  {
    word: "doggier",
    definition: "Definition: Suggestive of or in the manner of a dog.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "doggier"
  },
  {
    word: "forewing",
    definition: "Definition: (in an insect) Either member of the pair of wings closest to the head.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "forewing"
  },
  {
    word: "typo",
    definition: "Definition: A typographical error.",
    pronunciation: "/ˈtaɪpəʊ/",
    englishEquivalent: "typo"
  },
  {
    word: "dogwoods",
    definition: "Definition: Any of various small trees of the genus Cornus, especially the wild cornel and the flowering cornel",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "dogwoods"
  },
  {
    word: "franchisees",
    definition: "Definition: A holder of a franchise; a person who is granted a franchise.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "franchisees"
  },
  {
    word: "ruptures",
    definition: "Definition: A burst, split, or break.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "ruptures"
  },
  {
    word: "heterochromatic",
    definition: "Definition: Having more than one colour; relating to heterochromia",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "heterochromatic"
  },
  {
    word: "rachis",
    definition: "Definition: The spinal column, or the vertebrae of the spine.",
    pronunciation: "/ˈɹeɪkɪs/",
    englishEquivalent: "rachis"
  },
  {
    word: "peching",
    definition: "Definition: To pant, to struggle for breath.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "peching"
  },
  {
    word: "antipsychotic",
    definition: "Definition: Any of a group of drugs used to treat psychosis.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "antipsychotic"
  },
  {
    word: "babblings",
    definition: "Definition: A stage in child language acquisition, during which an infant appears to be experimenting with uttering sounds of language, but not yet producing any recognizable words",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "babblings"
  },
  {
    word: "swifts",
    definition: "Definition: A small plain-colored bird of the family Apodidae that resembles a swallow and is noted for its rapid flight.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "swifts"
  },
  {
    word: "anaglyphs",
    definition: "Definition: A decorative ornament worked in low relief or bas relief, such as a piece of cameo jewelry.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "anaglyphs"
  },
  {
    word: "oscine",
    definition: "Definition: Any bird of the suborder Passeri (the songbirds), which have better vocal control than other birds.",
    pronunciation: "/ˈɑsaɪn/",
    englishEquivalent: "oscine"
  },
  {
    word: "pests",
    definition: "Definition: A plague, pestilence, epidemic",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pests"
  },
  {
    word: "modernization",
    definition: "Definition: The process of modernizing.",
    pronunciation: "/ˌmɒdənaɪˈzeɪʃn̩/",
    englishEquivalent: "modernization"
  },
  {
    word: "quints",
    definition: "Definition: An interval of one fifth.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "quints"
  },
  {
    word: "whistled",
    definition: "Definition: To make a shrill, high-pitched sound by forcing air through the mouth. To produce a whistling sound, restrictions to the flow of air are created using the teeth, tongue and lips.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "whistled"
  },
  {
    word: "whistler",
    definition: "Definition: Someone or something that whistles, or who plays a whistle as a musical instrument.",
    pronunciation: "/ˈwɪslə(ɹ)/",
    englishEquivalent: "whistler"
  },
  {
    word: "fearful",
    definition: "Definition: Frightening.",
    pronunciation: "/ˈfɪəfəl/",
    englishEquivalent: "fearful"
  },
  {
    word: "schoolmates",
    definition: "Definition: A person who was a fellow attendee at one's school.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "schoolmates"
  },
  {
    word: "hobblebush",
    definition: "Definition: A low bush, Viburnum lantanoides, having long, straggling branches and pretty flowers, found in the Northern United States.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "hobblebush"
  },
  {
    word: "biddies",
    definition: "Definition: A woman, especially an old woman; especially one regarded as fussy or mean or a gossipy busybody.",
    pronunciation: "/ˈbɪdiz/",
    englishEquivalent: "biddies"
  },
  {
    word: "aerosolize",
    definition: "Definition: To disperse a material, usually a solid or liquid, as an aerosol.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "aerosolize"
  },
  {
    word: "prospered",
    definition: "Definition: To favor; to render successful.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "prospered"
  },
  {
    word: "propaedeutic",
    definition: "Definition: An introductory course of instruction.",
    pronunciation: "/ˌpɹoʊpiːˈdjuːtɪk/",
    englishEquivalent: "propaedeutic"
  },
  {
    word: "tired",
    definition: "Definition: To become sleepy or weary.",
    pronunciation: "/taɪəd/",
    englishEquivalent: "tired"
  },
  {
    word: "pericarps",
    definition: "Definition: The outermost layer, or skin, of a ripe fruit or ovary.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pericarps"
  },
  {
    word: "bouncier",
    definition: "Definition: Easily bounced.",
    pronunciation: "/ˈbaʊnsiə/",
    englishEquivalent: "bouncier"
  },
  {
    word: "scriptwriters",
    definition: "Definition: A person who writes scripts.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "scriptwriters"
  },
  {
    word: "leastwise",
    definition: "Definition: At least.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "leastwise"
  },
  {
    word: "materials",
    definition: "Definition: Matter which may be shaped or manipulated, particularly in making something.",
    pronunciation: "/məˈtɪəɹɪəlz/",
    englishEquivalent: "materials"
  },
  {
    word: "megaphone",
    definition: "Definition: A portable, usually hand-held, funnel-shaped device that is used to amplify a person’s natural voice toward a targeted direction.",
    pronunciation: "/ˈmɛɡ.əˌfəʊn/",
    englishEquivalent: "megaphone"
  },
  {
    word: "alow",
    definition: "Definition: Low down.",
    pronunciation: "/əˈləʊ/",
    englishEquivalent: "alow"
  },
  {
    word: "lodestones",
    definition: "Definition: A naturally occurring magnet.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "lodestones"
  },
  {
    word: "suggesting",
    definition: "Definition: To imply but stop short of saying explicitly.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "suggesting"
  },
  {
    word: "teredos",
    definition: "Definition: A shipworm (of genus Teredo).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "teredos"
  },
  {
    word: "funguses",
    definition: "Definition: Any member of the kingdom Fungi; a eukaryotic organism typically having chitin cell walls but no chlorophyll or plastids. Fungi may be unicellular or multicellular.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "funguses"
  },
  {
    word: "emollient",
    definition: "Definition: Something which softens or lubricates the skin; moisturizer.",
    pronunciation: "/ɪˈmɒl.ɪ.ənt/",
    englishEquivalent: "emollient"
  },
  {
    word: "scotch",
    definition: "Definition: A surface cut or abrasion.",
    pronunciation: "/skɒtʃ/",
    englishEquivalent: "scotch"
  },
  {
    word: "cope",
    definition: "Definition: To deal effectively with something, especially if difficult.",
    pronunciation: "/kəʊp/",
    englishEquivalent: "cope"
  },
  {
    word: "bentonite",
    definition: "Definition: Any of several impure clay minerals consisting mostly of montmorillonite.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "bentonite"
  },
  {
    word: "irreflexive",
    definition: "Definition: Of a binary relation R on X: such that no element of X is R-related to itself.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "irreflexive"
  },
  {
    word: "guardant",
    definition: "Definition: A guardian.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "guardant"
  },
  {
    word: "interfuse",
    definition: "Definition: To fuse or blend together",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "interfuse"
  },
  {
    word: "meandering",
    definition: "Definition: To wind or turn in a course or passage; to be intricate.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "meandering"
  },
  {
    word: "bacchant",
    definition: "Definition: A priest of Bacchus.",
    pronunciation: "/bəkant/",
    englishEquivalent: "bacchant"
  },
  {
    word: "feuilleton",
    definition: "Definition: A section of a European newspaper typically dedicated to arts, culture, criticism and light literature.",
    pronunciation: "/ˈfɜːjətɒn/",
    englishEquivalent: "feuilleton"
  },
  {
    word: "tenon",
    definition: "Definition: A projecting member left by cutting away the wood around it, and made to insert into a mortise, and in this way secure together the parts of a frame.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tenon"
  },
  {
    word: "tocopherol",
    definition: "Definition: Any of several isomers of the principal component of vitamin E, each containing a chromanol ring and an isoprene side-chain.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tocopherol"
  },
  {
    word: "yeses",
    definition: "Definition: An affirmative expression; an answer that shows agreement or acceptance.",
    pronunciation: "/jɛsɪz/",
    englishEquivalent: "yeses"
  },
  {
    word: "airmails",
    definition: "Definition: To send mail by air.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "airmails"
  },
  {
    word: "belabor",
    definition: "Definition: To labour about; labour over; work hard upon; ply diligently.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "belabor"
  },
  {
    word: "outpace",
    definition: "Definition: To go faster than; to exceed the pace of.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "outpace"
  },
  {
    word: "chantage",
    definition: "Definition: Blackmail; the extortion of money by threats of scandalous revelations",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "chantage"
  },
  {
    word: "generalize",
    definition: "Definition: To speak in generalities, or in vague terms.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "generalize"
  },
  {
    word: "duodecimo",
    definition: "Definition: A size of paper, so called because it is originally made by folding and cutting a single sheet from a printing press into 12 leaves; (5 by 7¾ inches): 6.5 to 7.5 inches high, approximately 4.5 inches wide.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "duodecimo"
  },
  {
    word: "chrysoprase",
    definition: "Definition: A variety of light-green translucent quartz.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "chrysoprase"
  },
  {
    word: "pirouetted",
    definition: "Definition: To perform a pirouette; to whirl on the toes, like a dancer.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pirouetted"
  },
  {
    word: "mistreating",
    definition: "Definition: To treat someone, or something roughly or badly.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "mistreating"
  },
  {
    word: "mechanic",
    definition: "Definition: A manual worker; a labourer or artisan.",
    pronunciation: "/məˈkænɪk/",
    englishEquivalent: "mechanic"
  },
  {
    word: "pins",
    definition: "Definition: To shape metal by striking it, especially with a peen.",
    pronunciation: "/pɪnz/",
    englishEquivalent: "pins"
  },
  {
    word: "blanquettes",
    definition: "Definition: A white meat stew in which neither the meat nor the sauce is browned.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "blanquettes"
  },
  {
    word: "levers",
    definition: "Definition: (except in generalized senses below) A crowbar.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "levers"
  },
  {
    word: "bushels",
    definition: "Definition: A dry measure, containing four pecks, eight gallons, or thirty-two quarts.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "bushels"
  },
  {
    word: "ooze",
    definition: "Definition: Tanning liquor, an aqueous extract of vegetable matter (tanbark, sumac, etc.) in a tanning vat used to tan leather.",
    pronunciation: "/uːz/",
    englishEquivalent: "ooze"
  },
  {
    word: "immunoglobulins",
    definition: "Definition: Any of the glycoproteins in blood serum that respond to invasion by foreign antigens and that protect the host by removing pathogens; an antibody.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "immunoglobulins"
  },
  {
    word: "spaghettini",
    definition: "Definition: A form of thin spaghetti",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "spaghettini"
  },
  {
    word: "orchils",
    definition: "Definition: Any of several lichens, especially those of the genera Roccella and Lecanora.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "orchils"
  },
  {
    word: "pliable",
    definition: "Definition: Soft, flexible, easily bent, formed, shaped, or molded.",
    pronunciation: "/ˈplaɪəbəl/",
    englishEquivalent: "pliable"
  },
  {
    word: "annulment",
    definition: "Definition: An act or instance of annulling.",
    pronunciation: "/əˈnʌl.mənt/",
    englishEquivalent: "annulment"
  },
  {
    word: "descriptors",
    definition: "Definition: That which describes; a word, phrase, etc. serving as a description.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "descriptors"
  },
  {
    word: "together",
    definition: "Definition: Coherent; well organized.",
    pronunciation: "/təˈɡɛð.ə(ɹ)/",
    englishEquivalent: "together"
  },
  {
    word: "irrational",
    definition: "Definition: A real number that can not be expressed as the quotient of two integers, an irrational number.",
    pronunciation: "/ɪˈɹæʃ.(ə.)nəl/",
    englishEquivalent: "irrational"
  },
  {
    word: "undergo",
    definition: "Definition: To go or move under or beneath.",
    pronunciation: "/ˌʌndəˈɡəʊ/",
    englishEquivalent: "undergo"
  },
  {
    word: "gelignite",
    definition: "Definition: An explosive mixture of nitroglycerine and nitrate absorbed onto a base of wood pulp.",
    pronunciation: "/dʒɛlɪɡ.naɪt/",
    englishEquivalent: "gelignite"
  },
  {
    word: "unveil",
    definition: "Definition: To remove a veil from; to uncover; to reveal something hidden.",
    pronunciation: "/ʌnˈveɪl/",
    englishEquivalent: "unveil"
  },
  {
    word: "sensitivities",
    definition: "Definition: The quality or state of being sensitive; sensitiveness.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sensitivities"
  },
  {
    word: "telefax",
    definition: "Definition: Fax",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "telefax"
  },
  {
    word: "overproduces",
    definition: "Definition: To produce more of something than one can use or sell.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "overproduces"
  },
  {
    word: "spotty",
    definition: "Definition: A common New Zealand fish, Notolabrus celidotus",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "spotty"
  },
  {
    word: "monochrome",
    definition: "Definition: A black and white image, especially such a photograph.",
    pronunciation: "/ˈmɒn.ə.kɹəʊm/",
    englishEquivalent: "monochrome"
  },
  {
    word: "breeds",
    definition: "Definition: All animals or plants of the same species or subspecies.",
    pronunciation: "/bɹiːdz/",
    englishEquivalent: "breeds"
  },
  {
    word: "cowbells",
    definition: "Definition: The lead cow in a herd.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "cowbells"
  },
  {
    word: "jane",
    definition: "Definition: A silver Genovese coin, first used in England in the 14th century.",
    pronunciation: "/dʒeɪn/",
    englishEquivalent: "jane"
  },
  {
    word: "laudable",
    definition: "Definition: Worthy of being lauded; praiseworthy; commendable",
    pronunciation: "/lɔːdəbl/",
    englishEquivalent: "laudable"
  },
  {
    word: "fogging",
    definition: "Definition: To become covered with or as if with fog.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "fogging"
  },
  {
    word: "yeggs",
    definition: "Definition: A person who breaks open safes; a burglar.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "yeggs"
  },
  {
    word: "polarity",
    definition: "Definition: The state of being a north pole or south pole; the magnetic equivalent of electric charge",
    pronunciation: "/pəˈlærɪti/",
    englishEquivalent: "polarity"
  },
  {
    word: "warrantless",
    definition: "Definition: (of a search, arrest, or the like) Performed without a warrant.",
    pronunciation: "/ˈwɒɹəntləs/",
    englishEquivalent: "warrantless"
  },
  {
    word: "charlies",
    definition: "Definition: An enemy; the Vietcong; short for Victor Charlie.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "charlies"
  },
  {
    word: "internalizes",
    definition: "Definition: To make something internal; to incorporate it in oneself.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "internalizes"
  },
  {
    word: "erewhile",
    definition: "Definition: Some time ago; beforehand; formerly.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "erewhile"
  },
  {
    word: "dishpans",
    definition: "Definition: A large basin or pan with a flat bottom in which dishes are washed.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "dishpans"
  },
  {
    word: "backdraft",
    definition: "Definition: Sudden, dangerous recombustion that occurs when there is a rapid reintroduction of oxygen to an enclosed space containing a fire.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "backdraft"
  },
  {
    word: "suicides",
    definition: "Definition: Intentional killing of oneself.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "suicides"
  },
  {
    word: "appealing",
    definition: "Definition: To call upon another to decide a question controverted, to corroborate a statement, to vindicate one's rights, etc.",
    pronunciation: "/əˈpiː.lɪŋ/",
    englishEquivalent: "appealing"
  },
  {
    word: "obtrudes",
    definition: "Definition: To proffer (something) by force; to impose (something) on someone or into some area.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "obtrudes"
  },
  {
    word: "moldy",
    definition: "Definition: Covered with mold.",
    pronunciation: "/ˈmoʊldi/",
    englishEquivalent: "moldy"
  },
  {
    word: "pemmican",
    definition: "Definition: A food made from meat which has been dried and beaten into a paste, mixed with berries and rendered fat, and shaped into little patties.",
    pronunciation: "/ˈpɛmɪkən/",
    englishEquivalent: "pemmican"
  },
  {
    word: "diaspores",
    definition: "Definition: A natural hydrate of aluminium, sometimes forming stalactites.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "diaspores"
  },
  {
    word: "marrying",
    definition: "Definition: To enter into the conjugal or connubial state; to take a husband or a wife.",
    pronunciation: "/ˈmæɹiɪŋ/",
    englishEquivalent: "marrying"
  },
  {
    word: "readability",
    definition: "Definition: The property of being capable of being read; legibility.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "readability"
  },
  {
    word: "chitchat",
    definition: "Definition: Light conversation; casual talk, usually about trivial matters.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "chitchat"
  },
  {
    word: "textile",
    definition: "Definition: (usually in the plural) Any material made of interlacing fibres, including carpeting and geotextiles.",
    pronunciation: "/ˈtɛks.taɪl/",
    englishEquivalent: "textile"
  },
  {
    word: "tressures",
    definition: "Definition: A narrow border near the edge of a shield or banner.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tressures"
  },
  {
    word: "anergia",
    definition: "Definition: Dilute or disorganized energy, which cannot be transformed into work.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "anergia"
  },
  {
    word: "fistful",
    definition: "Definition: The amount that can be held in a closed fist",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "fistful"
  },
  {
    word: "ballades",
    definition: "Definition: Any of various genres of single-movement musical pieces having lyrical and narrative elements.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "ballades"
  },
  {
    word: "leaked",
    definition: "Definition: To allow fluid or gas to pass through an opening that should be sealed.",
    pronunciation: "/liːkt/",
    englishEquivalent: "leaked"
  },
  {
    word: "leak",
    definition: "Definition: A crack, crevice, fissure, or hole which admits water or other fluid, or lets it escape.",
    pronunciation: "/liːk/",
    englishEquivalent: "leak"
  },
  {
    word: "mantilla",
    definition: "Definition: A lace veil of Spanish origin worn over a woman's hair and shoulders.",
    pronunciation: "/-ˈtiːjə/",
    englishEquivalent: "mantilla"
  },
  {
    word: "saxophones",
    definition: "Definition: A single-reed instrument musical instrument of the woodwind family, usually made of brass and with a distinctive loop bringing the bell upwards.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "saxophones"
  },
  {
    word: "breakthrough",
    definition: "Definition: An advance through and past enemy lines.",
    pronunciation: "/ˈbɹeɪkθɹuː/",
    englishEquivalent: "breakthrough"
  },
  {
    word: "commix",
    definition: "Definition: To mix separate things together.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "commix"
  },
  {
    word: "undone",
    definition: "Definition: Not done.",
    pronunciation: "/ʌnˈdʌn/",
    englishEquivalent: "undone"
  },
  {
    word: "yocks",
    definition: "Definition: A laugh, especially a loud or hearty one.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "yocks"
  },
  {
    word: "asthenosphere",
    definition: "Definition: The zone of the Earth's upper mantle, below the lithosphere.",
    pronunciation: "/asˈθɛnə(ʊ)sfɪə/",
    englishEquivalent: "asthenosphere"
  },
  {
    word: "discomforting",
    definition: "Definition: To cause annoyance or distress to.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "discomforting"
  },
  {
    word: "charlies",
    definition: "Definition: An enemy; the Vietcong; short for Victor Charlie.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "charlies"
  },
  {
    word: "dendrimers",
    definition: "Definition: Any polymer or oligomer having branches of atoms strung off a central spine.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "dendrimers"
  },
  {
    word: "minster",
    definition: "Definition: A monastic church.",
    pronunciation: "/ˈmɪnstə/",
    englishEquivalent: "minster"
  },
  {
    word: "coffining",
    definition: "Definition: To place in a coffin.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "coffining"
  },
  {
    word: "hugging",
    definition: "Definition: To crouch; huddle as with cold.",
    pronunciation: "/ˈhʌɡɪŋ/",
    englishEquivalent: "hugging"
  },
  {
    word: "verify",
    definition: "Definition: To substantiate or prove the truth of something",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "verify"
  },
  {
    word: "strays",
    definition: "Definition: Any domestic animal that has no enclosure, or its proper place and company, and wanders at large, or is lost; an estray.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "strays"
  },
  {
    word: "auklet",
    definition: "Definition: Any of several small seabirds in the genera Aethia, Cerorhinca and Ptychoramphus of the auk family Alcidae.",
    pronunciation: "/ˈɔːklət/",
    englishEquivalent: "auklet"
  },
  {
    word: "thuds",
    definition: "Definition: The sound of a dull impact.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "thuds"
  },
  {
    word: "regarded",
    definition: "Definition: To look at; to observe.",
    pronunciation: "/ɹɪˈɡɑːdɪd/",
    englishEquivalent: "regarded"
  },
  {
    word: "factions",
    definition: "Definition: A group of people, especially within a political organization, which expresses a shared belief or opinion different from people who are not part of the group.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "factions"
  },
  {
    word: "hyaline",
    definition: "Definition: Anything glassy, translucent or transparent; the sea or sky.",
    pronunciation: "/ˈhaɪəliːn/",
    englishEquivalent: "hyaline"
  },
  {
    word: "embargoing",
    definition: "Definition: To impose an embargo on trading certain goods with another country.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "embargoing"
  },
  {
    word: "unwaxed",
    definition: "Definition: Not waxed.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unwaxed"
  },
  {
    word: "tannin",
    definition: "Definition: Tannic acid or any of its derivatives.",
    pronunciation: "/ˈtænɪn/",
    englishEquivalent: "tannin"
  },
  {
    word: "pentoxides",
    definition: "Definition: Any oxide containing five oxygen atoms in each molecule",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pentoxides"
  },
  {
    word: "pocky",
    definition: "Definition: Covered in pock marks; specifically, pox-ridden, syphilitic.",
    pronunciation: "/pɒki/",
    englishEquivalent: "pocky"
  },
  {
    word: "ionized",
    definition: "Definition: To dissociate atoms or molecules into electrically charged species; to be thus dissociated.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "ionized"
  },
  {
    word: "underlines",
    definition: "Definition: A line placed underneath a piece of text in order to provide emphasis or to indicate that it should be viewed in italics or (in electronic documents) that it acts as a hyperlink.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "underlines"
  },
  {
    word: "improbably",
    definition: "Definition: In an improbable manner; without probability.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "improbably"
  },
  {
    word: "lollop",
    definition: "Definition: To walk or move with a bouncing or undulating motion and at an unhurried pace.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "lollop"
  },
  {
    word: "dysentery",
    definition: "Definition: A disease characterised by inflammation of the intestines, especially the colon (large intestine), accompanied by pus (white blood cells) in the feces, fever, pain in the abdomen, high volume of diarrhea, and possible blood in the feces.",
    pronunciation: "/ˈdɪsəntəɹi/",
    englishEquivalent: "dysentery"
  },
  {
    word: "treasurers",
    definition: "Definition: The government official in charge of the Treasury.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "treasurers"
  },
  {
    word: "sharpness",
    definition: "Definition: The cutting ability of an edge; keenness",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sharpness"
  },
  {
    word: "giantesses",
    definition: "Definition: A female giant.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "giantesses"
  },
  {
    word: "boonies",
    definition: "Definition: Boondocks",
    pronunciation: "/ˈbuːniz/",
    englishEquivalent: "boonies"
  },
  {
    word: "tinkers",
    definition: "Definition: An itinerant tinsmith and mender of household utensils made of metal.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tinkers"
  },
  {
    word: "deponents",
    definition: "Definition: A witness; especially one who gives information under oath, in a deposition concerning facts known to him or her.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "deponents"
  },
  {
    word: "lenited",
    definition: "Definition: To cause (a consonant) to undergo lenition.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "lenited"
  },
  {
    word: "planking",
    definition: "Definition: To cover something with planking.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "planking"
  },
  {
    word: "trimmer",
    definition: "Definition: Physically fit.",
    pronunciation: "/ˈtɹɪmə/",
    englishEquivalent: "trimmer"
  },
  {
    word: "pleadable",
    definition: "Definition: That may be pleaded",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pleadable"
  },
  {
    word: "dichotomizes",
    definition: "Definition: To separate into two parts or classifications.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "dichotomizes"
  },
  {
    word: "lune",
    definition: "Definition: A fit of lunacy or madness; a period of frenzy; a crazy or unreasonable freak.",
    pronunciation: "/luːn/",
    englishEquivalent: "lune"
  },
  {
    word: "decoctions",
    definition: "Definition: An extraction or essence of something, obtained by boiling it down.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "decoctions"
  },
  {
    word: "cochineal",
    definition: "Definition: A species of insect (Dactylopius coccus).",
    pronunciation: "/ˌkɒtʃɪˈniː(ə)l/",
    englishEquivalent: "cochineal"
  },
  {
    word: "reunited",
    definition: "Definition: To unite again.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "reunited"
  },
  {
    word: "ruckled",
    definition: "Definition: To crease or wrinkle.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "ruckled"
  },
  {
    word: "forefinger",
    definition: "Definition: The index finger: the first finger next to the thumb.",
    pronunciation: "/ˈfɔːˌfɪŋ.ɡə/",
    englishEquivalent: "forefinger"
  },
  {
    word: "shack",
    definition: "Definition: A crude, roughly built hut or cabin.",
    pronunciation: "/ʃæk/",
    englishEquivalent: "shack"
  },
  {
    word: "shazam",
    definition: "Definition: Used to indicate that a magic trick or other illusion has been performed.",
    pronunciation: "/ʃəˈzæm/",
    englishEquivalent: "shazam"
  },
  {
    word: "thrip",
    definition: "Definition: Optional singular for thrips, an insect of the order Thysanoptera.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "thrip"
  },
  {
    word: "waterlogs",
    definition: "Definition: To saturate with water.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "waterlogs"
  },
  {
    word: "purr",
    definition: "Definition: The vibrating sound made by a cat in its throat when contented.",
    pronunciation: "/pɜː(ɹ)/",
    englishEquivalent: "purr"
  },
  {
    word: "unluckier",
    definition: "Definition: Unfortunate, marked by misfortune.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unluckier"
  },
  {
    word: "unworthy",
    definition: "Definition: An inadequate person.",
    pronunciation: "/ʌnˈwɝði/",
    englishEquivalent: "unworthy"
  },
  {
    word: "sirdar",
    definition: "Definition: A high-ranking person in India and other areas of west-central Asia; a chief, a headman.",
    pronunciation: "/ˈsɜːdɑː/",
    englishEquivalent: "sirdar"
  },
  {
    word: "catboat",
    definition: "Definition: A sailing boat with a single sail, usually rigged on a gaff spar, used for fishing in New England and later adapted for racing and cruising. It has a single mast set near to the bow and a long boom which may extend over the stern.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "catboat"
  },
  {
    word: "besieged",
    definition: "Definition: To beset or surround with armed forces for the purpose of compelling to surrender, to lay siege to, beleaguer.",
    pronunciation: "/bəˈsiːd͡ʒd/",
    englishEquivalent: "besieged"
  },
  {
    word: "intron",
    definition: "Definition: A portion of a split gene that is included in pre-RNA transcripts but is removed during RNA processing and rapidly degraded.",
    pronunciation: "/ˈɪntɹɒn/",
    englishEquivalent: "intron"
  },
  {
    word: "tickles",
    definition: "Definition: The act of tickling.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tickles"
  },
  {
    word: "melancholy",
    definition: "Definition: Black bile, formerly thought to be one of the four 'cardinal humours' of animal bodies.",
    pronunciation: "/ˈmelənkəli/",
    englishEquivalent: "melancholy"
  },
  {
    word: "oppress",
    definition: "Definition: To keep down by unjust force.",
    pronunciation: "/əˈpɹɛs/",
    englishEquivalent: "oppress"
  },
  {
    word: "comedies",
    definition: "Definition: A choric song of celebration or revel, especially in Ancient Greece.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "comedies"
  },
  {
    word: "mamboes",
    definition: "Definition: A voodoo priestess (in Haiti)",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "mamboes"
  },
  {
    word: "genie",
    definition: "Definition: A jinn, a being descended from the jann, normally invisible to the human eye, but who may also appear in animal or human form.",
    pronunciation: "/ˈdʒiː.ni/",
    englishEquivalent: "genie"
  },
  {
    word: "feigns",
    definition: "Definition: To make a false show or pretence of; to counterfeit or simulate.",
    pronunciation: "/feɪnz/",
    englishEquivalent: "feigns"
  },
  {
    word: "simmers",
    definition: "Definition: To cook or undergo heating slowly at or below the boiling point.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "simmers"
  },
  {
    word: "pirogues",
    definition: "Definition: A canoe of shallow draft, made by hollowing a log.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pirogues"
  },
  {
    word: "pterodactyls",
    definition: "Definition: A pterosaur in the genus Pterodactylus.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pterodactyls"
  },
  {
    word: "deluge",
    definition: "Definition: A great flood or rain.",
    pronunciation: "/ˈdɛl.juːdʒ/",
    englishEquivalent: "deluge"
  },
  {
    word: "firehouses",
    definition: "Definition: A house containing a fire to heat it; a dwelling-house, as opposed to a barn, a stable, or other outhouse.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "firehouses"
  },
  {
    word: "unasked",
    definition: "Definition: Not asked about.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unasked"
  },
  {
    word: "tea",
    definition: "Definition: A drug smoked or ingested for euphoric effect, cannabis.",
    pronunciation: "/tiː/",
    englishEquivalent: "tea"
  },
  {
    word: "tegmina",
    definition: "Definition: A covering or integument, usually referring to a thin layer or membrane in an organism.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tegmina"
  },
  {
    word: "ostriches",
    definition: "Definition: A large flightless bird (Struthio camelus) native to Africa.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "ostriches"
  },
  {
    word: "megadeaths",
    definition: "Definition: One million deaths, especially as a unit of measure in reference to nuclear warfare.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "megadeaths"
  },
  {
    word: "glum",
    definition: "Definition: Despondent; moody; sullen",
    pronunciation: "/ɡlʌm/",
    englishEquivalent: "glum"
  },
  {
    word: "handsel",
    definition: "Definition: A lucky omen.",
    pronunciation: "/ˈhæn.səl/",
    englishEquivalent: "handsel"
  },
  {
    word: "throatiest",
    definition: "Definition: (of a sound) Produced in the throat; having a rough or coarse quality like a sound produced in the throat.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "throatiest"
  },
  {
    word: "unyoked",
    definition: "Definition: To release something from a yoke or harness.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unyoked"
  },
  {
    word: "stoic",
    definition: "Definition: Proponent of stoicism, a school of thought, from in 300 B.C.E. up to about the time of Marcus Aurelius, who holds that by cultivating an understanding of the logos, or natural law, one can be free of suffering.",
    pronunciation: "/ˈstəʊɪk/",
    englishEquivalent: "stoic"
  },
  {
    word: "monogeneans",
    definition: "Definition: Any of the many trematode flatworms of the class Monogenea, mostly ectoparasites on fish",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "monogeneans"
  },
  {
    word: "precooling",
    definition: "Definition: To cool in advance.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "precooling"
  },
  {
    word: "pathological",
    definition: "Definition: Pertaining to pathology.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pathological"
  },
  {
    word: "dicta",
    definition: "Definition: An authoritative statement; a dogmatic saying; a maxim, an apothegm.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "dicta"
  },
  {
    word: "telecom",
    definition: "Definition: Telecommunication or telecommunications.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "telecom"
  },
  {
    word: "evaluating",
    definition: "Definition: To draw conclusions from examining; to assess.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "evaluating"
  },
  {
    word: "curacoas",
    definition: "Definition: A liqueur, made from eau-de-vie, sugar and, as flavor, dried peel of sweet and sour oranges.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "curacoas"
  },
  {
    word: "totalising",
    definition: "Definition: To combine parts to make a total.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "totalising"
  },
  {
    word: "reascends",
    definition: "Definition: To ascend again.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "reascends"
  },
  {
    word: "subdominant",
    definition: "Definition: The fourth tone of a scale.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "subdominant"
  },
  {
    word: "bathwater",
    definition: "Definition: The water used in a bath (bathtub).",
    pronunciation: "/ˈbɑːθwɔːtə(ɹ)/",
    englishEquivalent: "bathwater"
  },
  {
    word: "erratically",
    definition: "Definition: In an erratic manner; unsteadily or randomly, unpredictably.",
    pronunciation: "/ɪˈɹæt.ɪk.li/",
    englishEquivalent: "erratically"
  },
  {
    word: "splendour",
    definition: "Definition: Great light, luster or brilliance.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "splendour"
  },
  {
    word: "horticulturists",
    definition: "Definition: A gardener; a person interested or practicing horticulture.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "horticulturists"
  },
  {
    word: "additional",
    definition: "Definition: Something added.",
    pronunciation: "/əˈdɪʃənəl/",
    englishEquivalent: "additional"
  },
  {
    word: "reallocating",
    definition: "Definition: To allocate (a resource) to another person or purpose.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "reallocating"
  },
  {
    word: "chowderheads",
    definition: "Definition: An idiot; a dummy.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "chowderheads"
  },
  {
    word: "draglines",
    definition: "Definition: A cable, cord, or rope used to drag an object; specifically, the line of a dragline excavator that drags the bucket.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "draglines"
  },
  {
    word: "palletises",
    definition: "Definition: To place on a pallet or pallets.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "palletises"
  },
  {
    word: "disapprove",
    definition: "Definition: To condemn; to consider wrong or inappropriate; used with of.",
    pronunciation: "/dɪsəˈpɹuːv/",
    englishEquivalent: "disapprove"
  },
  {
    word: "detestable",
    definition: "Definition: Stimulating disgust or detestation; offensive; shocking.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "detestable"
  },
  {
    word: "symmetrical",
    definition: "Definition: Exhibiting symmetry; having harmonious or proportionate arrangement of parts; having corresponding parts or relations.",
    pronunciation: "/sɪˈmɛtɹɪkəl/",
    englishEquivalent: "symmetrical"
  },
  {
    word: "introductory",
    definition: "Definition: Introducing; giving a preview or idea of.",
    pronunciation: "/ˌɪntrəˈdʌktəri/",
    englishEquivalent: "introductory"
  },
  {
    word: "electroless",
    definition: "Definition: (of a metal plating process) Without the use of an external electric current.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "electroless"
  },
  {
    word: "peroxide",
    definition: "Definition: A divalent radical or anion containing two oxygen atoms linked by a covalent bond; any substance containing this group which yields hydrogen peroxide when treated with an acid",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "peroxide"
  },
  {
    word: "shoddier",
    definition: "Definition: Of poor quality or construction",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "shoddier"
  },
  {
    word: "quota",
    definition: "Definition: A proportional part or share; the share or proportion assigned to each in a division.",
    pronunciation: "/ˈkwoʊtə/",
    englishEquivalent: "quota"
  },
  {
    word: "mercurials",
    definition: "Definition: Any of the plants known as mercury, especially the annual mercury or French mercury (Mercurialis annua).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "mercurials"
  },
  {
    word: "gutters",
    definition: "Definition: A prepared channel in a surface, especially at the side of a road adjacent to a curb, intended for the drainage of water.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "gutters"
  },
  {
    word: "decided",
    definition: "Definition: To resolve (a contest, problem, dispute, etc.); to choose, determine, or settle",
    pronunciation: "/dɪˈsaɪdəd/",
    englishEquivalent: "decided"
  },
  {
    word: "appears",
    definition: "Definition: To come or be in sight; to be in view; to become visible.",
    pronunciation: "/əˈpiːɹz/",
    englishEquivalent: "appears"
  },
  {
    word: "boarfishes",
    definition: "Definition: Any of a number of fish that have a projecting snout, in either of two families:",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "boarfishes"
  },
  {
    word: "monos",
    definition: "Definition: A bicycle or motorcycle trick where the front wheel is lifted off the ground while riding",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "monos"
  },
  {
    word: "straightlaced",
    definition: "Definition: Having narrow views on moral matters; prudish.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "straightlaced"
  },
  {
    word: "epidemics",
    definition: "Definition: A widespread disease that affects many individuals in a population.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "epidemics"
  },
  {
    word: "shopkeeper",
    definition: "Definition: A trader who sells goods in a shop, or by retail, in distinction from one who sells by wholesale, or sells door to door.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "shopkeeper"
  },
  {
    word: "lapdog",
    definition: "Definition: A small toy dog, kept as household pet, whose light weight and companionable temperament make it both suited and disposed to spend time resting in the comfort of its master's lap; a dog bred to behave in this manner.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "lapdog"
  },
  {
    word: "doubleton",
    definition: "Definition: A set containing precisely two elements.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "doubleton"
  },
  {
    word: "paled",
    definition: "Definition: To turn pale; to lose colour.",
    pronunciation: "/peɪld/",
    englishEquivalent: "paled"
  },
  {
    word: "beacons",
    definition: "Definition: A signal fire to notify of the approach of an enemy, or to give any notice, commonly of warning.",
    pronunciation: "/ˈbiːkənz/",
    englishEquivalent: "beacons"
  },
  {
    word: "eclairs",
    definition: "Definition: An oblong, chocolate-covered, cream-filled pastry.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "eclairs"
  },
  {
    word: "twee",
    definition: "Definition: Overly quaint, dainty, cute or nice.",
    pronunciation: "/twiː/",
    englishEquivalent: "twee"
  },
  {
    word: "tariffing",
    definition: "Definition: To levy a duty on (something)",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tariffing"
  },
  {
    word: "pasqueflower",
    definition: "Definition: Various deciduous perennial flowering plants, of the genus Pulsatilla, found in clumps in certain grassland areas.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pasqueflower"
  },
  {
    word: "rakish",
    definition: "Definition: Dashingly, carelessly, or sportingly unconventional or stylish; jaunty; characterized by a devil-may-care unconventionality; having a somewhat disreputable quality or appearance.",
    pronunciation: "/ˈɹeɪkɪʃ/",
    englishEquivalent: "rakish"
  },
  {
    word: "countenancing",
    definition: "Definition: To tolerate, support, sanction, patronise or approve of something.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "countenancing"
  },
  {
    word: "chomping",
    definition: "Definition: To bite or chew loudly or heavily.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "chomping"
  },
  {
    word: "jackals",
    definition: "Definition: Any of certain wild canids of the genus Canis, native to the tropical Old World and smaller than a wolf.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "jackals"
  },
  {
    word: "curbing",
    definition: "Definition: To check, restrain or control.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "curbing"
  },
  {
    word: "samaritans",
    definition: "Definition: A Good Samaritan",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "samaritans"
  },
  {
    word: "braved",
    definition: "Definition: To encounter with courage and fortitude, to defy, to provoke.",
    pronunciation: "/bɹeɪvd/",
    englishEquivalent: "braved"
  },
  {
    word: "nanometer",
    definition: "Definition: An SI subunit of length equal to 10-9 metres. Symbol: nm",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "nanometer"
  },
  {
    word: "ravaging",
    definition: "Definition: To devastate or destroy something.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "ravaging"
  },
  {
    word: "beneath",
    definition: "Definition: Below or underneath.",
    pronunciation: "/bɪˈniːθ/",
    englishEquivalent: "beneath"
  },
  {
    word: "repellent",
    definition: "Definition: Someone who repels.",
    pronunciation: "/ɹəˈpɛlənt/",
    englishEquivalent: "repellent"
  },
  {
    word: "scurvy",
    definition: "Definition: A disease caused by insufficient intake of vitamin C leading to the formation of livid spots on the skin, spongy gums, loosening of the teeth and bleeding into the skin and from almost all mucous membranes.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "scurvy"
  },
  {
    word: "stinkard",
    definition: "Definition: Any of various malodorous animals.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "stinkard"
  },
  {
    word: "deadhead",
    definition: "Definition: A fan of the rock band The Grateful Dead.",
    pronunciation: "/ˈdɛdhɛd/",
    englishEquivalent: "deadhead"
  },
  {
    word: "stridently",
    definition: "Definition: In a strident manner.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "stridently"
  },
  {
    word: "perspiring",
    definition: "Definition: To emit (sweat or perspiration) through the skin's pores.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "perspiring"
  },
  {
    word: "dentals",
    definition: "Definition: Cleaning and polishing of an animal's teeth.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "dentals"
  },
  {
    word: "shivaree",
    definition: "Definition: The noisy banging of pots and pans as a mock serenade to a newly married couple, or similar occasion.",
    pronunciation: "/ʃɪvəˈɹiː/",
    englishEquivalent: "shivaree"
  },
  {
    word: "snorter",
    definition: "Definition: One who snorts.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "snorter"
  },
  {
    word: "expressly",
    definition: "Definition: In an express or explicit manner.",
    pronunciation: "/ɪkˈspɹɛsli/",
    englishEquivalent: "expressly"
  },
  {
    word: "unilaterally",
    definition: "Definition: In a unilateral way.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unilaterally"
  },
  {
    word: "gratuities",
    definition: "Definition: Something (usually money) given in exchange for influence or as an inducement to dishonesty.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "gratuities"
  },
  {
    word: "sylphs",
    definition: "Definition: An invisible being of the air.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sylphs"
  },
  {
    word: "speared",
    definition: "Definition: To pierce with a spear.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "speared"
  },
  {
    word: "alkenes",
    definition: "Definition: An unsaturated, aliphatic hydrocarbon with one or more carbon–carbon double bonds",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "alkenes"
  },
  {
    word: "hydraulic",
    definition: "Definition: To mine using the technique of hydraulic mining.",
    pronunciation: "/haɪˈdɹɒlɪk/",
    englishEquivalent: "hydraulic"
  },
  {
    word: "ferula",
    definition: "Definition: A ferule.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "ferula"
  },
  {
    word: "predicative",
    definition: "Definition: (grammar) An element of the predicate of a sentence which supplements the subject or object by means of the verb. Predicatives may be nominal or adjectival.",
    pronunciation: "/pɹɪˈdɪk.ə.tɪv/",
    englishEquivalent: "predicative"
  },
  {
    word: "subhuman",
    definition: "Definition: Anything which is less than human.",
    pronunciation: "/[sʌbˈhjuːmən]/",
    englishEquivalent: "subhuman"
  },
  {
    word: "campos",
    definition: "Definition: A police officer assigned to a university campus.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "campos"
  },
  {
    word: "navaid",
    definition: "Definition: Any form of aid to navigation, particularly applying to shipping and aviation. Examples: lighthouse, or ILS (instrument landing system)",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "navaid"
  },
  {
    word: "synclines",
    definition: "Definition: A concave-upward fold in rock strata",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "synclines"
  },
  {
    word: "jackshafts",
    definition: "Definition: A common mechanical component used to transfer or synchronize rotational force in a machine.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "jackshafts"
  },
  {
    word: "arbitrations",
    definition: "Definition: The act or process of arbitrating.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "arbitrations"
  },
  {
    word: "unionize",
    definition: "Definition: To organize workers into a union.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unionize"
  },
  {
    word: "convulse",
    definition: "Definition: To violently shake or agitate.",
    pronunciation: "/kənˈvʌls/",
    englishEquivalent: "convulse"
  },
  {
    word: "rarefy",
    definition: "Definition: To make rare, thin, porous, or less dense",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "rarefy"
  },
  {
    word: "undersoil",
    definition: "Definition: The soil underneath the surface / topsoil and above the bedrock.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "undersoil"
  },
  {
    word: "diakineses",
    definition: "Definition: The last stage of prophase, in which the nucleolus and nuclear envelope disappear, spindle fibers form, and the chromosomes shorten in preparation for metaphase.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "diakineses"
  },
  {
    word: "multinational",
    definition: "Definition: A multinational company.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "multinational"
  },
  {
    word: "interconverts",
    definition: "Definition: To convert mutually one into another",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "interconverts"
  },
  {
    word: "handoffs",
    definition: "Definition: A pass made in a backward direction.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "handoffs"
  },
  {
    word: "devoicing",
    definition: "Definition: To pronounce a word with little movement of the vocal cords",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "devoicing"
  },
  {
    word: "reafforests",
    definition: "Definition: To reforest.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "reafforests"
  },
  {
    word: "midirons",
    definition: "Definition: An iron golf club with more lift than a driver.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "midirons"
  },
  {
    word: "tutor",
    definition: "Definition: One who teaches another (usually called a student, learner, or tutee) in a one-on-one or small-group interaction.",
    pronunciation: "/ˈtjuːtə/",
    englishEquivalent: "tutor"
  },
  {
    word: "manipulating",
    definition: "Definition: To move, arrange or operate something using the hands",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "manipulating"
  },
  {
    word: "antihero",
    definition: "Definition: A protagonist who proceeds in an unheroic manner, such as by criminal means, via cowardly actions, or for mercenary goals.",
    pronunciation: "/ˈæn.tɪˌhɪə.ɹəʊ/",
    englishEquivalent: "antihero"
  },
  {
    word: "ruffing",
    definition: "Definition: To shape (fabric, etc.) into a ruff; to adorn (a garment, etc.) with a ruff.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "ruffing"
  },
  {
    word: "domestically",
    definition: "Definition: In a domestic manner",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "domestically"
  },
  {
    word: "turncoats",
    definition: "Definition: A traitor; one who turns against a previous affiliation or allegiance.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "turncoats"
  },
  {
    word: "dramedies",
    definition: "Definition: A genre of film or television that lies somewhere between drama and comedy.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "dramedies"
  },
  {
    word: "airbag",
    definition: "Definition: A protective system in automobiles in which when a crash occurs, a bag containing nitrogen, formed by the explosive decomposition of sodium azide, quickly inflates in front of the driver or passenger, preventing injury to the head. Side air bags, including the back seat passengers, also prevent injury.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "airbag"
  },
  {
    word: "shallops",
    definition: "Definition: A kind of light boat; a dinghy.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "shallops"
  },
  {
    word: "naysay",
    definition: "Definition: A refusal, denial, or negation.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "naysay"
  },
  {
    word: "floozies",
    definition: "Definition: A vulgar or sexually promiscuous woman; a hussy or slattern.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "floozies"
  },
  {
    word: "unlabeled",
    definition: "Definition: Not labeled; having no label.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unlabeled"
  },
  {
    word: "kinara",
    definition: "Definition: A candle holder used in Kwanzaa celebrations.",
    pronunciation: "/kɪˈnɑː.ɹə/",
    englishEquivalent: "kinara"
  },
  {
    word: "rumored",
    definition: "Definition: (usually used in the passive voice) To tell a rumor about; to gossip.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "rumored"
  },
  {
    word: "granites",
    definition: "Definition: A group of igneous and plutonic rocks composed primarily of feldspar and quartz. Usually contains one or more dark minerals, which may be mica, pyroxene, or amphibole. Granite is quarried for building stone, road gravel, decorative stone, and tombstones. Common colors are gray, white, pink, and yellow-brown.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "granites"
  },
  {
    word: "reify",
    definition: "Definition: To regard something abstract as if it were a concrete material thing",
    pronunciation: "/ˈɹeɪ.ə.faɪ/",
    englishEquivalent: "reify"
  },
  {
    word: "samp",
    definition: "Definition: An article of food consisting of coarse ground maize, or a porridge made from it.",
    pronunciation: "/samp/",
    englishEquivalent: "samp"
  },
  {
    word: "multinational",
    definition: "Definition: A multinational company.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "multinational"
  },
  {
    word: "acquittance",
    definition: "Definition: A writing which is evidence of a discharge; a receipt in full, which bars a further demand.",
    pronunciation: "/əˈkwɪtəns/",
    englishEquivalent: "acquittance"
  },
  {
    word: "vandalizing",
    definition: "Definition: To needlessly destroy or deface other people’s property or public property; to commit vandalism.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "vandalizing"
  },
  {
    word: "lithoed",
    definition: "Definition: To lithograph.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "lithoed"
  },
  {
    word: "binaural",
    definition: "Definition: Of, relating to, affecting, or designed for use with two ears.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "binaural"
  },
  {
    word: "agreements",
    definition: "Definition: An understanding between entities to follow a specific course of conduct.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "agreements"
  },
  {
    word: "coparceners",
    definition: "Definition: Any of several people who share an inheritance; a parcener.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "coparceners"
  },
  {
    word: "siccing",
    definition: "Definition: To mark with a bracketed sic.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "siccing"
  },
  {
    word: "disinherited",
    definition: "Definition: To exclude from inheritance; to disown.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "disinherited"
  },
  {
    word: "heraldists",
    definition: "Definition: An expert in or practitioner of heraldry.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "heraldists"
  },
  {
    word: "projections",
    definition: "Definition: Something which projects, protrudes, juts out, sticks out, or stands out.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "projections"
  },
  {
    word: "genii",
    definition: "Definition: Someone possessing extraordinary intelligence or skill; especially somebody who has demonstrated this by a creative or original work in science, music, art etc.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "genii"
  },
  {
    word: "redshift",
    definition: "Definition: A change in the wavelength of light, in which the wavelength is longer than when it was emitted at the source.",
    pronunciation: "/ˈɹɛdˌʃɪft/",
    englishEquivalent: "redshift"
  },
  {
    word: "marsupials",
    definition: "Definition: A mammal of which the female has a pouch in which it rears its young, which are born immature, through early infancy, such as the kangaroo or koala, or else pouchless members of the Marsupialia like the shrew opossum.",
    pronunciation: "/mɑː.ˈsuː.pi.əlz/",
    englishEquivalent: "marsupials"
  },
  {
    word: "mercuric",
    definition: "Definition: Pertaining to or derived from mercury.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "mercuric"
  },
  {
    word: "paradiddles",
    definition: "Definition: A percussive exercise (one of 26 drum rudiments) which involves playing four even strokes in the order ‘right left right right’ or ‘left right left left’",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "paradiddles"
  },
  {
    word: "tetramers",
    definition: "Definition: An oligomer having four subunits",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tetramers"
  },
  {
    word: "paramos",
    definition: "Definition: A treeless grassland ecosystem covering extensive high areas of equatorial mountains, especially in South America.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "paramos"
  },
  {
    word: "whickered",
    definition: "Definition: Of a horse, to neigh softly, to make a breathy whinny.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "whickered"
  },
  {
    word: "splutters",
    definition: "Definition: To sputter.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "splutters"
  },
  {
    word: "seniti",
    definition: "Definition: A Tongan unit of currency equivalent to a hundredth of a pa'anga.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "seniti"
  },
  {
    word: "geomancy",
    definition: "Definition: A method of divination which interprets markings on the ground or how handfuls of dirt land when tossed.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "geomancy"
  },
  {
    word: "economizers",
    definition: "Definition: A person who avoids waste",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "economizers"
  },
  {
    word: "husbandry",
    definition: "Definition: The occupation or work of a husbandman or farmer; the cultivation of crops and the raising of livestock; agriculture.",
    pronunciation: "/ˈhʌzb(ə)ndɹi/",
    englishEquivalent: "husbandry"
  },
  {
    word: "unlatches",
    definition: "Definition: Remove from a latch",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unlatches"
  },
  {
    word: "spellbind",
    definition: "Definition: To captivate, or hold the attention of, as if by a magic spell; to entrance.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "spellbind"
  },
  {
    word: "lopes",
    definition: "Definition: An easy pace with long strides.",
    pronunciation: "/ləʊps/",
    englishEquivalent: "lopes"
  },
  {
    word: "azure",
    definition: "Definition: A blue colour on a coat of arms, represented in engraving by horizontal parallel lines.",
    pronunciation: "/æˈzjʊə/",
    englishEquivalent: "azure"
  },
  {
    word: "okays",
    definition: "Definition: Endorsement; approval.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "okays"
  },
  {
    word: "nullipara",
    definition: "Definition: A woman who has never given birth.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "nullipara"
  },
  {
    word: "obtrusion",
    definition: "Definition: An interference or intrusion.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "obtrusion"
  },
  {
    word: "dichasia",
    definition: "Definition: A cymose inflorescence with all branches below the terminal flower in regular opposite pairs.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "dichasia"
  },
  {
    word: "bolthole",
    definition: "Definition: A hole in an animal's den, or through a wall or fence, used for escape or emergency exit; i.e. a hole the animal may bolt through.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "bolthole"
  },
  {
    word: "functor",
    definition: "Definition: (grammar) A function word.",
    pronunciation: "/ˈfʌŋktə/",
    englishEquivalent: "functor"
  },
  {
    word: "puerile",
    definition: "Definition: Childish; trifling; silly.",
    pronunciation: "/ˈpjʊə.ɹaɪl/",
    englishEquivalent: "puerile"
  },
  {
    word: "giros",
    definition: "Definition: (in Europe) A transfer of funds between different account holders, carried out by the bank according to payer's written instructions.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "giros"
  },
  {
    word: "dadas",
    definition: "Definition: Father, dad.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "dadas"
  },
  {
    word: "elaborations",
    definition: "Definition: The act or process of producing or refining with labor; improvement by successive operations; refinement.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "elaborations"
  },
  {
    word: "centuple",
    definition: "Definition: To increase a hundredfold.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "centuple"
  },
  {
    word: "receivables",
    definition: "Definition: A debt owed, usually to a business, from the perspective of that business",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "receivables"
  },
  {
    word: "rays",
    definition: "Definition: A beam of light or radiation.",
    pronunciation: "/ɹeɪz/",
    englishEquivalent: "rays"
  },
  {
    word: "discovers",
    definition: "Definition: To find or learn something for the first time.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "discovers"
  },
  {
    word: "paving",
    definition: "Definition: To cover something with paving slabs.",
    pronunciation: "/ˈpeɪvɪŋ/",
    englishEquivalent: "paving"
  },
  {
    word: "punkiest",
    definition: "Definition: Of or pertaining to punk (touchwood) - soft or rotted.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "punkiest"
  },
  {
    word: "corporators",
    definition: "Definition: A member of a corporation, especially one of the original members.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "corporators"
  },
  {
    word: "veggies",
    definition: "Definition: A vegetable.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "veggies"
  },
  {
    word: "siphonostele",
    definition: "Definition: A type of stele in which the vascular tissue in the stem forms a cylinder surrounding a central pith and possessing leaf gaps.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "siphonostele"
  },
  {
    word: "mestizas",
    definition: "Definition: A female mestizo.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "mestizas"
  },
  {
    word: "kurus",
    definition: "Definition: A subdivision of currency, equal to one hundredth of a Turkish lira",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "kurus"
  },
  {
    word: "rehouse",
    definition: "Definition: To give a new house to; to relocate someone to a new house.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "rehouse"
  },
  {
    word: "threader",
    definition: "Definition: A device used to thread needles.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "threader"
  },
  {
    word: "glycoside",
    definition: "Definition: A molecule in which a sugar group (the glycone) is bound to a non-sugar group (the corresponding aglycone) by a nitrogen or oxygen atom. Glycosides yield a sugar after undergoing hydrolysis.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "glycoside"
  },
  {
    word: "harangues",
    definition: "Definition: An impassioned, disputatious public speech.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "harangues"
  },
  {
    word: "gossip",
    definition: "Definition: Someone who likes to talk about other people's private or personal business.",
    pronunciation: "/ˈɡɒs.ɪp/",
    englishEquivalent: "gossip"
  },
  {
    word: "martyries",
    definition: "Definition: A shrine in honor of a (usually religious, notably Christian) martyr, possibly at his grave. I",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "martyries"
  },
  {
    word: "calluses",
    definition: "Definition: A hardened area of the skin (especially on the foot or hand) caused by repeated friction, wear or use.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "calluses"
  },
  {
    word: "submersed",
    definition: "Definition: To submerge.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "submersed"
  },
  {
    word: "scrip",
    definition: "Definition: A small medieval bag used to carry food, money, utensils etc.",
    pronunciation: "/skɹɪp/",
    englishEquivalent: "scrip"
  },
  {
    word: "begin",
    definition: "Definition: Beginning; start.",
    pronunciation: "/biˈɡɪn/",
    englishEquivalent: "begin"
  },
  {
    word: "colatitudes",
    definition: "Definition: The complement, in spherical coordinates, of a latitude (the difference between a latitude and 90°).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "colatitudes"
  },
  {
    word: "unalleviated",
    definition: "Definition: Relentless",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unalleviated"
  },
  {
    word: "staggers",
    definition: "Definition: An unsteady movement of the body in walking or standing as if one were about to fall; a reeling motion",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "staggers"
  },
  {
    word: "veracious",
    definition: "Definition: True.",
    pronunciation: "/vɛ.ˈɹeɪ.ʃəs/",
    englishEquivalent: "veracious"
  },
  {
    word: "heightism",
    definition: "Definition: A prejudiced attitude about human height that often results in discrimination, based on the belief that unusually short or tall people are inferior and undesirable.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "heightism"
  },
  {
    word: "exterminating",
    definition: "Definition: To kill all of (a population of pests or undesirables), usually intentionally.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "exterminating"
  },
  {
    word: "routers",
    definition: "Definition: Someone who routes or directs items from one location to another.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "routers"
  },
  {
    word: "ebonised",
    definition: "Definition: To give wood the color or texture of ebony.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "ebonised"
  },
  {
    word: "rebellions",
    definition: "Definition: Armed resistance to an established government or ruler.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "rebellions"
  },
  {
    word: "hillier",
    definition: "Definition: (of a landscape) Abundant in hills; having many hills.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "hillier"
  },
  {
    word: "scallion",
    definition: "Definition: A spring onion, Allium fistulosum.",
    pronunciation: "/[ˈskæ.ljn̩]/",
    englishEquivalent: "scallion"
  },
  {
    word: "crannies",
    definition: "Definition: A small, narrow opening, fissure, crevice, or chink, as in a wall, or other substance.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "crannies"
  },
  {
    word: "sudd",
    definition: "Definition: (Central Africa) A floating mass of plant matter, such as reeds, which obstructs the passage of boats.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sudd"
  },
  {
    word: "chaws",
    definition: "Definition: Chewing tobacco.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "chaws"
  },
  {
    word: "tapered",
    definition: "Definition: To make thinner or narrower at one end.",
    pronunciation: "/ˈteɪ.pɚd/",
    englishEquivalent: "tapered"
  },
  {
    word: "chlorinating",
    definition: "Definition: To add chlorine to (something, especially water, to purify it; or an auriferous substance, to extract gold from it).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "chlorinating"
  },
  {
    word: "righto",
    definition: "Definition: Okay; all right.",
    pronunciation: "/ˈɹaɪtəʊ/",
    englishEquivalent: "righto"
  },
  {
    word: "flagman",
    definition: "Definition: A man who carries a flag, especially one used for signalling.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "flagman"
  },
  {
    word: "gratuitous",
    definition: "Definition: Given freely; unearned.",
    pronunciation: "/ɡɹəˈtjuː.ɪt.əs/",
    englishEquivalent: "gratuitous"
  },
  {
    word: "swampy",
    definition: "Definition: Soggy and marshy; wet like a swamp.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "swampy"
  },
  {
    word: "erratically",
    definition: "Definition: In an erratic manner; unsteadily or randomly, unpredictably.",
    pronunciation: "/ɪˈɹæt.ɪk.li/",
    englishEquivalent: "erratically"
  },
  {
    word: "punctilio",
    definition: "Definition: A fine point in exactness of conduct, ceremony or procedure. Strictness in observance of formalities.",
    pronunciation: "/pʌŋkˈtɪliˌoʊ/",
    englishEquivalent: "punctilio"
  },
  {
    word: "intercuts",
    definition: "Definition: An alternating sequence of this kind.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "intercuts"
  },
  {
    word: "kilocycles",
    definition: "Definition: A thousand cycles (of any periodic phenomenon)",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "kilocycles"
  },
  {
    word: "outsitting",
    definition: "Definition: To remain sitting, or in session, longer than, or beyond the time of; to outstay.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "outsitting"
  },
  {
    word: "jumps",
    definition: "Definition: The act of jumping; a leap; a spring; a bound.",
    pronunciation: "/dʒʌmps/",
    englishEquivalent: "jumps"
  },
  {
    word: "chopsocky",
    definition: "Definition: (film genre, sometimes derogatory) A genre of exaggerated martial arts films made primarily in Hong Kong and Taiwan during the 1960s and 1970s.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "chopsocky"
  },
  {
    word: "trillion",
    definition: "Definition: (short scale) A million million: 1 followed by twelve zeros, 1012.",
    pronunciation: "/ˈtɹɪljən/",
    englishEquivalent: "trillion"
  },
  {
    word: "wardrooms",
    definition: "Definition: The living quarters of a ship designated for the commissioned officers other than the captain.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "wardrooms"
  },
  {
    word: "fibrinogen",
    definition: "Definition: A protein that in humans plays a part in the forming of clots.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "fibrinogen"
  },
  {
    word: "schizonts",
    definition: "Definition: A cell that divides by schizogony.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "schizonts"
  },
  {
    word: "tailpieces",
    definition: "Definition: An appendage or appendix.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tailpieces"
  },
  {
    word: "victimising",
    definition: "Definition: To make someone a victim or sacrifice.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "victimising"
  },
  {
    word: "theatres",
    definition: "Definition: A place or building, consisting of a stage and seating, in which an audience gathers to watch plays, musical performances, public ceremonies, and so on.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "theatres"
  },
  {
    word: "babysits",
    definition: "Definition: To watch or tend someone else's child for a period of time, often for money.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "babysits"
  },
  {
    word: "faxes",
    definition: "Definition: The hair of the head.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "faxes"
  },
  {
    word: "curtail",
    definition: "Definition: A scroll termination, as of a step, etc.",
    pronunciation: "/kɜːˈteɪl/",
    englishEquivalent: "curtail"
  },
  {
    word: "indicating",
    definition: "Definition: To point out; to discover; to direct to a knowledge of; to show; to make known.",
    pronunciation: "/ˈɪndɪkeɪtɪŋ/",
    englishEquivalent: "indicating"
  },
  {
    word: "hydroplaning",
    definition: "Definition: To skim the surface of a body of water while moving at high speed.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "hydroplaning"
  },
  {
    word: "presuppose",
    definition: "Definition: To assume some truth without proof, usually for the purpose of reaching a conclusion based on that truth.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "presuppose"
  },
  {
    word: "tradable",
    definition: "Definition: An asset which can be traded.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tradable"
  },
  {
    word: "pluralize",
    definition: "Definition: To make plural.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pluralize"
  },
  {
    word: "wardresses",
    definition: "Definition: A female warder.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "wardresses"
  },
  {
    word: "whelping",
    definition: "Definition: (of she-dog, she-wolf, vixen, etc.) To give birth.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "whelping"
  },
  {
    word: "autoclaves",
    definition: "Definition: A strong, pressurized, heated vessel, as for laboratory experiments, sterilization, cooking or mineral processing.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "autoclaves"
  },
  {
    word: "windrows",
    definition: "Definition: A row of cut grain or hay allowed to dry in a field.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "windrows"
  },
  {
    word: "tonged",
    definition: "Definition: To use tongs.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tonged"
  },
  {
    word: "betonies",
    definition: "Definition: Any plant of the genus Stachys.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "betonies"
  },
  {
    word: "isobutane",
    definition: "Definition: A hydrocarbon, a particular isomer of C4H10 found in natural gas.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "isobutane"
  },
  {
    word: "discourtesy",
    definition: "Definition: Lack of courtesy; rudeness.",
    pronunciation: "/dɪsˈkɜːtəzi/",
    englishEquivalent: "discourtesy"
  },
  {
    word: "formularizing",
    definition: "Definition: To express as a formula, to formulate.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "formularizing"
  },
  {
    word: "intercrossing",
    definition: "Definition: To cross back over one another",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "intercrossing"
  },
  {
    word: "theatricalizing",
    definition: "Definition: To render suitable for the theatre.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "theatricalizing"
  },
  {
    word: "exudes",
    definition: "Definition: To discharge through pores or incisions, as moisture or other liquid matter; to give out.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "exudes"
  },
  {
    word: "montages",
    definition: "Definition: A composite work, particularly an artwork, created by assembling or putting together other elements such as pieces of music, pictures, texts, videos, etc.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "montages"
  },
  {
    word: "shadoof",
    definition: "Definition: A device used to gather water, consisting of a pivoted stick with a bucket on the end of it.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "shadoof"
  },
  {
    word: "diffusivities",
    definition: "Definition: A tendency to diffuse",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "diffusivities"
  },
  {
    word: "decarburized",
    definition: "Definition: To decarbonize.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "decarburized"
  },
  {
    word: "porcelains",
    definition: "Definition: The plant Smilax china, a liana of much of eastern Asia.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "porcelains"
  },
  {
    word: "coincident",
    definition: "Definition: Either of multiple simultaneous related incidents",
    pronunciation: "/ˈkəʊˌɪn.sɪ.dn̩t/",
    englishEquivalent: "coincident"
  },
  {
    word: "sickbeds",
    definition: "Definition: A bed used by a person who is sick.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sickbeds"
  },
  {
    word: "bloused",
    definition: "Definition: To hang a garment in loose folds.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "bloused"
  },
  {
    word: "reorientation",
    definition: "Definition: A new orientation.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "reorientation"
  },
  {
    word: "headquartering",
    definition: "Definition: To provide (an organization) with headquarters.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "headquartering"
  },
  {
    word: "pauperized",
    definition: "Definition: To make someone a pauper; to impoverish",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pauperized"
  },
  {
    word: "legibility",
    definition: "Definition: The property of being legible or easily readable.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "legibility"
  },
  {
    word: "swindled",
    definition: "Definition: To defraud.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "swindled"
  },
  {
    word: "myocarditis",
    definition: "Definition: Inflammation of the myocardium.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "myocarditis"
  },
  {
    word: "traipses",
    definition: "Definition: A long or tiring walk.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "traipses"
  },
  {
    word: "peppering",
    definition: "Definition: To add pepper to.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "peppering"
  },
  {
    word: "dummied",
    definition: "Definition: To make a mock-up or prototype version of something, without some or all off its intended functionality.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "dummied"
  },
  {
    word: "pics",
    definition: "Definition: A picture, especially a photographic image.",
    pronunciation: "/pɪks/",
    englishEquivalent: "pics"
  },
  {
    word: "sgraffito",
    definition: "Definition: A technique in ceramics, art and wall design, where the top layer of pigment or slip is scratched through to reveal an underlying layer.",
    pronunciation: "/skɹəˈfiːtoʊ/",
    englishEquivalent: "sgraffito"
  },
  {
    word: "metazoans",
    definition: "Definition: Any animal that undergoes development from an embryo stage with three tissue layers, namely the ectoderm, mesoderm, and endoderm.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "metazoans"
  },
  {
    word: "moans",
    definition: "Definition: A low, mournful cry of pain, sorrow or pleasure",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "moans"
  },
  {
    word: "crowbar",
    definition: "Definition: An iron or steel bar, often with a flattened end which may also be hook-shaped, to be used as a lever to manually force things apart.",
    pronunciation: "/ˈkɹoʊˌbɑɹ/",
    englishEquivalent: "crowbar"
  },
  {
    word: "teensier",
    definition: "Definition: Tiny",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "teensier"
  },
  {
    word: "mouldiest",
    definition: "Definition: Covered with mould.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "mouldiest"
  },
  {
    word: "detainer",
    definition: "Definition: The right to keep a person, or a person's goods or property, against his will. A type of custody.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "detainer"
  },
  {
    word: "splashdowns",
    definition: "Definition: The act of landing in water, as by a space capsule or rollercoaster.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "splashdowns"
  },
  {
    word: "calculated",
    definition: "Definition: To determine the value of something or the solution to something by a mathematical process.",
    pronunciation: "/ˈkælkjəleɪtɪd/",
    englishEquivalent: "calculated"
  },
  {
    word: "haole",
    definition: "Definition: A non-Hawaiian, usually specifically a Caucasian.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "haole"
  },
  {
    word: "clambered",
    definition: "Definition: To climb (something) with some difficulty, or in a haphazard fashion.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "clambered"
  },
  {
    word: "theatres",
    definition: "Definition: A place or building, consisting of a stage and seating, in which an audience gathers to watch plays, musical performances, public ceremonies, and so on.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "theatres"
  },
  {
    word: "grandnephews",
    definition: "Definition: A grandson of one's sibling; a son of one's nephew or niece. (Brother's grandson: fraternal grandnephew. Sister's grandson: sororal grandnephew.)",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "grandnephews"
  },
  {
    word: "slutty",
    definition: "Definition: Of or resembling a slut.",
    pronunciation: "/ˈslʌti/",
    englishEquivalent: "slutty"
  },
  {
    word: "symposiast",
    definition: "Definition: One engaged with others at a banquet or merrymaking.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "symposiast"
  },
  {
    word: "fornication",
    definition: "Definition: Sexual intercourse by people who are not married, or which is considered illicit in another way.",
    pronunciation: "/ˌfɔɹnɪˈkeɪʃən/",
    englishEquivalent: "fornication"
  },
  {
    word: "coquets",
    definition: "Definition: A flirtatious female; a coquette.",
    pronunciation: "/ˈkɒk.ɛts/",
    englishEquivalent: "coquets"
  },
  {
    word: "nakfa",
    definition: "Definition: The currency of Eritrea, divided into 100 cents.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "nakfa"
  },
  {
    word: "novelized",
    definition: "Definition: To adapt something to a fictional form, especially to adapt into a novel.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "novelized"
  },
  {
    word: "gambade",
    definition: "Definition: The leap of a horse",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "gambade"
  },
  {
    word: "radiator",
    definition: "Definition: Anything which radiates or emits rays.",
    pronunciation: "/ˈɹeɪ.diˌeɪ.tɚ/",
    englishEquivalent: "radiator"
  },
  {
    word: "amateurish",
    definition: "Definition: Suggesting or reflecting the efforts of an amateur; not seeming professional or polished.",
    pronunciation: "/ˈæ.mə.tjʊɚ.ɪʃ/",
    englishEquivalent: "amateurish"
  },
  {
    word: "frog",
    definition: "Definition: A small tailless amphibian of the order Anura that typically hops.",
    pronunciation: "/fɹɒɡ/",
    englishEquivalent: "frog"
  },
  {
    word: "indignation",
    definition: "Definition: An anger aroused by something perceived as an indignity, notably an offense or injustice.",
    pronunciation: "/ˌɪn.dɪɡ.ˈneɪ.ʃən/",
    englishEquivalent: "indignation"
  },
  {
    word: "massifs",
    definition: "Definition: A principal mountain mass.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "massifs"
  },
  {
    word: "apostrophised",
    definition: "Definition: To address using the form of rhetoric called the apostrophe.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "apostrophised"
  },
  {
    word: "tenth",
    definition: "Definition: The person or thing coming next after the ninth in a series; that which is in the tenth position.",
    pronunciation: "/tɛnθ/",
    englishEquivalent: "tenth"
  },
  {
    word: "promptbook",
    definition: "Definition: An annotated copy of a script used by a prompter",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "promptbook"
  },
  {
    word: "hocussing",
    definition: "Definition: To play a trick on, to trick (someone); to hoax; to cheat.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "hocussing"
  },
  {
    word: "possums",
    definition: "Definition: An opossum, a marsupial of the family Didelphidae of the Americas.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "possums"
  },
  {
    word: "hydrophilic",
    definition: "Definition: Having an affinity for water; able to absorb, or be wetted by water; water-loving.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "hydrophilic"
  },
  {
    word: "keened",
    definition: "Definition: To make cold, to sharpen.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "keened"
  },
  {
    word: "verbalism",
    definition: "Definition: The expression of a concept in words; the wording used in such an expression",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "verbalism"
  },
  {
    word: "fermentation",
    definition: "Definition: Any of many anaerobic biochemical reactions in which an enzyme (or several enzymes produced by a microorganism) catalyses the conversion of one substance into another; especially the conversion (using yeast) of sugars to alcohol or acetic acid with the evolution of carbon dioxide",
    pronunciation: "/ˌfɜː(ɹ)mənˈteɪʃən/",
    englishEquivalent: "fermentation"
  },
  {
    word: "taxied",
    definition: "Definition: To move an aircraft on the ground under its own power.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "taxied"
  },
  {
    word: "scriptures",
    definition: "Definition: A sacred writing or holy book.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "scriptures"
  },
  {
    word: "telson",
    definition: "Definition: The part of an arthropod or crustacean posterior to the last segment.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "telson"
  },
  {
    word: "fisherfolk",
    definition: "Definition: People who fish for a living.",
    pronunciation: "/ˈfɪʃə(ɹ)foʊk/",
    englishEquivalent: "fisherfolk"
  },
  {
    word: "unearthly",
    definition: "Definition: Not of the earth; non-terrestrial.",
    pronunciation: "/ʌnˈəːθ.li/",
    englishEquivalent: "unearthly"
  },
  {
    word: "mirepoix",
    definition: "Definition: A combination of diced onions, carrots, celery and herbs sautéed in oil or butter as used in French cooking.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "mirepoix"
  },
  {
    word: "overstep",
    definition: "Definition: A gait in which the hind foot touches ground in front of where the front foot touches the ground.",
    pronunciation: "/ˌəʊvəˈstɛp/",
    englishEquivalent: "overstep"
  },
  {
    word: "sysadmins",
    definition: "Definition: Systems administrator; a person whose job it is to maintain computer or network systems.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sysadmins"
  },
  {
    word: "dauntless",
    definition: "Definition: Invulnerable to fear or intimidation.",
    pronunciation: "/ˈdɔːntləs/",
    englishEquivalent: "dauntless"
  },
  {
    word: "spotlighted",
    definition: "Definition: To illuminate with a spotlight.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "spotlighted"
  },
  {
    word: "borosilicates",
    definition: "Definition: Any of various minerals whose structure is formally that of a dual salt of boric and silicic acids.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "borosilicates"
  },
  {
    word: "limbos",
    definition: "Definition: (Roman Catholic theology, since circa 400 A.D.) The place where innocent souls exist temporarily until they can enter heaven, notably those of the saints who died before the advent of Christ (limbus patruum) and those of unbaptized but innocent children (limbus infantum).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "limbos"
  },
  {
    word: "detonations",
    definition: "Definition: An explosion or sudden report made by the near-instantaneous decomposition or combustion of unstable substances. Specifically, combustion that spreads supersonically via shock compression.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "detonations"
  },
  {
    word: "sutta",
    definition: "Definition: A rule or thesis in Sanskrit grammar or Hindu law or philosophy.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sutta"
  },
  {
    word: "relearnt",
    definition: "Definition: To learn (something) again.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "relearnt"
  },
  {
    word: "counterspy",
    definition: "Definition: A spy working in counterintelligence.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "counterspy"
  },
  {
    word: "burglaries",
    definition: "Definition: The crime of unlawfully breaking into a vehicle, house, store, or other enclosure with the intent to steal.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "burglaries"
  },
  {
    word: "evergreen",
    definition: "Definition: A tree or shrub that does not shed its leaves or needles seasonally.",
    pronunciation: "/ˈɛvəɡɹiːn/",
    englishEquivalent: "evergreen"
  },
  {
    word: "palmyra",
    definition: "Definition: A palm, Borassus flabelliformis, with straight black upright trunk and palmate leaves, whose wood, fruit, and roots can be used for many purposes.",
    pronunciation: "/pælˈmaɪɹə/",
    englishEquivalent: "palmyra"
  },
  {
    word: "tribalists",
    definition: "Definition: A person who identifies with, or has loyalty to a tribe or similar group",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tribalists"
  },
  {
    word: "milder",
    definition: "Definition: Gentle and not easily angered.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "milder"
  },
  {
    word: "swirlier",
    definition: "Definition: Having swirls; swirling.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "swirlier"
  },
  {
    word: "wisest",
    definition: "Definition: Showing good judgement or the benefit of experience.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "wisest"
  },
  {
    word: "divulging",
    definition: "Definition: To make public or known; to communicate to the public; to tell (information, especially a secret) so that it may become generally known",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "divulging"
  },
  {
    word: "lacrimals",
    definition: "Definition: A lachrymal or lachrymatory (vase intended for collecting tears).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "lacrimals"
  },
  {
    word: "strives",
    definition: "Definition: Striving; earnest endeavor; hard work.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "strives"
  },
  {
    word: "larynxes",
    definition: "Definition: An organ of the neck of mammals situated just below where the tract of the pharynx splits into the trachea and the oesophagus (or esophagus). It is involved in breath control and protection of the trachea, and, because it houses the vocal cords, sound production.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "larynxes"
  },
  {
    word: "fragile",
    definition: "Definition: Easily broken or destroyed, and thus often of subtle or intricate structure.",
    pronunciation: "/ˈfɹædʒaɪl/",
    englishEquivalent: "fragile"
  },
  {
    word: "outfly",
    definition: "Definition: To fly better, faster, or further than.",
    pronunciation: "/aʊtˈflaɪ/",
    englishEquivalent: "outfly"
  },
  {
    word: "peskier",
    definition: "Definition: Annoying, troublesome, irritating (usually of an animal or child).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "peskier"
  },
  {
    word: "advisability",
    definition: "Definition: The quality of being advisable or prudent; advisableness.",
    pronunciation: "/ædˌvaɪz.əˈbɪl.ə.ti/",
    englishEquivalent: "advisability"
  },
  {
    word: "outsinging",
    definition: "Definition: To sing better, longer or louder than.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "outsinging"
  },
  {
    word: "downloading",
    definition: "Definition: To transfer data from a remote computer (server) to a local computer, usually via a network.",
    pronunciation: "/daʊnˈləʊdɪŋ/",
    englishEquivalent: "downloading"
  },
  {
    word: "orthoepy",
    definition: "Definition: Accepted or customary pronunciation.",
    pronunciation: "/ɔːˈθəʊɨpi/",
    englishEquivalent: "orthoepy"
  },
  {
    word: "voids",
    definition: "Definition: An empty space; a vacuum.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "voids"
  },
  {
    word: "tuckahoes",
    definition: "Definition: Any edible root of a plant used by Native Americans of colonial-era Virginia.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tuckahoes"
  },
  {
    word: "naysayers",
    definition: "Definition: One who consistently denies, criticizes, or doubts; a detractor.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "naysayers"
  },
  {
    word: "schooled",
    definition: "Definition: (of fish) To form into, or travel in a school.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "schooled"
  },
  {
    word: "weirdos",
    definition: "Definition: A strange, odd, eccentric person.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "weirdos"
  },
  {
    word: "viewers",
    definition: "Definition: Someone who views a spectacle; an onlooker or spectator.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "viewers"
  },
  {
    word: "dropped",
    definition: "Definition: To fall in droplets (of a liquid).",
    pronunciation: "/dɹɒpt/",
    englishEquivalent: "dropped"
  },
  {
    word: "floodtide",
    definition: "Definition: The period between low tide and the next high tide in which the sea is rising.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "floodtide"
  },
  {
    word: "descend",
    definition: "Definition: To pass from a higher to a lower place; to move downwards; to come or go down in any way, for example by falling, flowing, walking, climbing etc.",
    pronunciation: "/dɪˈsɛnd/",
    englishEquivalent: "descend"
  },
  {
    word: "lithe",
    definition: "Definition: To go.",
    pronunciation: "/laɪð/",
    englishEquivalent: "lithe"
  },
  {
    word: "airmails",
    definition: "Definition: To send mail by air.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "airmails"
  },
  {
    word: "lam",
    definition: "Definition: To beat or thrash.",
    pronunciation: "/læm/",
    englishEquivalent: "lam"
  },
  {
    word: "sarsen",
    definition: "Definition: Any of various blocks of sandstone found in various locations in southern England.",
    pronunciation: "/ˈsɑː(ɹ)sən/",
    englishEquivalent: "sarsen"
  },
  {
    word: "biddies",
    definition: "Definition: A woman, especially an old woman; especially one regarded as fussy or mean or a gossipy busybody.",
    pronunciation: "/ˈbɪdiz/",
    englishEquivalent: "biddies"
  },
  {
    word: "oversleeping",
    definition: "Definition: To sleep for longer than intended.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "oversleeping"
  },
  {
    word: "enamored",
    definition: "Definition: (mostly in the passive, followed by 'of' or 'with') To cause to be in love.",
    pronunciation: "/ɪˈnæməɹd/",
    englishEquivalent: "enamored"
  },
  {
    word: "shirttail",
    definition: "Definition: The single or split (then rather plural) bottom part of a shirt, below the waist, especially in the back, which, when not tucked into trousers or other vestment, hangs over the wearer's tail-end, like a tail.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "shirttail"
  },
  {
    word: "spooling",
    definition: "Definition: To wind on a spool or spools.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "spooling"
  },
  {
    word: "startups",
    definition: "Definition: The act or process of starting a process or machine.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "startups"
  },
  {
    word: "enwreathes",
    definition: "Definition: To surround or encompass as with a wreath.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "enwreathes"
  },
  {
    word: "pongid",
    definition: "Definition: Any primate once considered to belong in the family Pongidae; the great apes excluding humans",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pongid"
  },
  {
    word: "wheeler",
    definition: "Definition: A wheelwright, a wheelmaker.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "wheeler"
  },
  {
    word: "sculpt",
    definition: "Definition: A modification that can be applied to an object, like a texture, but changes the object's shape rather than its appearance.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sculpt"
  },
  {
    word: "externalism",
    definition: "Definition: Excessive regard to outward acts or appearances, especially in religion.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "externalism"
  },
  {
    word: "tootles",
    definition: "Definition: A soft toot sound.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tootles"
  },
  {
    word: "retrospect",
    definition: "Definition: Consideration of past times.",
    pronunciation: "/ˈɹɛtɹoˌspɛkt/",
    englishEquivalent: "retrospect"
  },
  {
    word: "epicotyl",
    definition: "Definition: In plants with seeds, that portion of the embryo or seedling above the cotyledons.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "epicotyl"
  },
  {
    word: "strabismus",
    definition: "Definition: A defect of vision in which one eye cannot focus with the other on an object because of imbalance of the eye muscles; a squint.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "strabismus"
  },
  {
    word: "kittenish",
    definition: "Definition: Having the qualities or likeness of a kitten.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "kittenish"
  },
  {
    word: "forerunning",
    definition: "Definition: To run in front.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "forerunning"
  },
  {
    word: "sierras",
    definition: "Definition: A rugged range of mountains.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sierras"
  },
  {
    word: "topees",
    definition: "Definition: A pith helmet.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "topees"
  },
  {
    word: "coiffing",
    definition: "Definition: To style or arrange hair.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "coiffing"
  },
  {
    word: "blub",
    definition: "Definition: The act of blubbing.",
    pronunciation: "/blʌb/",
    englishEquivalent: "blub"
  },
  {
    word: "copters",
    definition: "Definition: A helicopter.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "copters"
  },
  {
    word: "metastases",
    definition: "Definition: A change in nature, form, or quality.",
    pronunciation: "/mɪˈtæstəsiːz/",
    englishEquivalent: "metastases"
  },
  {
    word: "potted",
    definition: "Definition: To put (something) into a pot.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "potted"
  },
  {
    word: "conditionally",
    definition: "Definition: Under specified conditions",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "conditionally"
  },
  {
    word: "keelhauling",
    definition: "Definition: To punish by dragging under the keel of a ship.",
    pronunciation: "/ˈkiːlhɔːlɪŋ/",
    englishEquivalent: "keelhauling"
  },
  {
    word: "midfielder",
    definition: "Definition: A player who operates behind the attackers and in front of the defence.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "midfielder"
  },
  {
    word: "realtor",
    definition: "Definition: A person or business that sells or leases out real estate, acting as an agent for the property owner.",
    pronunciation: "/ˈɹi(ə)l.tɔɹ/",
    englishEquivalent: "realtor"
  },
  {
    word: "overstimulated",
    definition: "Definition: To stimulate to an excessive degree; to expose to excessive stimulation.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "overstimulated"
  },
  {
    word: "claim",
    definition: "Definition: A demand of ownership made for something.",
    pronunciation: "/kleɪm/",
    englishEquivalent: "claim"
  },
  {
    word: "devote",
    definition: "Definition: To give one's time, focus one's efforts, commit oneself, etc. entirely for, on, or to a certain matter",
    pronunciation: "/dɪˈvəʊt/",
    englishEquivalent: "devote"
  },
  {
    word: "stoic",
    definition: "Definition: Proponent of stoicism, a school of thought, from in 300 B.C.E. up to about the time of Marcus Aurelius, who holds that by cultivating an understanding of the logos, or natural law, one can be free of suffering.",
    pronunciation: "/ˈstəʊɪk/",
    englishEquivalent: "stoic"
  },
  {
    word: "elfish",
    definition: "Definition: Characteristic of an elf; elfin, elven.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "elfish"
  },
  {
    word: "blackmailing",
    definition: "Definition: To extort money or favors from (a person) by exciting fears of injury other than bodily harm, such as injury to reputation, distress of mind, false accusation, etc.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "blackmailing"
  },
  {
    word: "blackbirds",
    definition: "Definition: A common true thrush, Turdus merula, found in woods and gardens over much of Eurasia, and introduced elsewhere.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "blackbirds"
  },
  {
    word: "framing",
    definition: "Definition: To fit, as for a specific end or purpose; make suitable or comfortable; adapt; adjust.",
    pronunciation: "/ˈfɹeɪmɪŋ/",
    englishEquivalent: "framing"
  },
  {
    word: "slabbering",
    definition: "Definition: To let saliva or other liquid fall from the mouth carelessly; drivel; slaver.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "slabbering"
  },
  {
    word: "hydromedusa",
    definition: "Definition: The South American snake-necked turtle.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "hydromedusa"
  },
  {
    word: "thoughtful",
    definition: "Definition: Demonstrating thought or careful consideration.",
    pronunciation: "/ˈθɔːtfəl/",
    englishEquivalent: "thoughtful"
  },
  {
    word: "nominalism",
    definition: "Definition: A doctrine that universals do not have an existence except as names for classes of concrete objects.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "nominalism"
  },
  {
    word: "spritzed",
    definition: "Definition: To spray, sprinkle, or squirt lightly.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "spritzed"
  },
  {
    word: "aspic",
    definition: "Definition: A dish in which ingredients are set into a gelatine, jelly-like substance made from a meat stock or consommé.",
    pronunciation: "/ˈæspɪk/",
    englishEquivalent: "aspic"
  },
  {
    word: "hunkers",
    definition: "Definition: To crouch or squat close to the ground or lie down",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "hunkers"
  },
  {
    word: "ringer",
    definition: "Definition: Someone who rings, especially a bell ringer.",
    pronunciation: "/ˈɹɪŋə(ɹ)/",
    englishEquivalent: "ringer"
  },
  {
    word: "residence",
    definition: "Definition: The place where one lives; one's home.",
    pronunciation: "/ˈɹɛz.ɪ.dəns/",
    englishEquivalent: "residence"
  },
  {
    word: "succors",
    definition: "Definition: To give aid, assistance, or help.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "succors"
  },
  {
    word: "research",
    definition: "Definition: Diligent inquiry or examination to seek or revise facts, principles, theories, applications, etc.; laborious or continued search after truth.",
    pronunciation: "/ɹɪˈsɜːtʃ/",
    englishEquivalent: "research"
  },
  {
    word: "unfortunates",
    definition: "Definition: An unlucky person; one who has fallen into bad circumstances.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unfortunates"
  },
  {
    word: "catamenia",
    definition: "Definition: The female period; menstrual discharge.",
    pronunciation: "/kætəˈmiːnɪə/",
    englishEquivalent: "catamenia"
  },
  {
    word: "projectile",
    definition: "Definition: An object intended to be or having been fired from a weapon.",
    pronunciation: "/pɹə(ʊ)ˈdʒɛktɪl/",
    englishEquivalent: "projectile"
  },
  {
    word: "encrusted",
    definition: "Definition: To cover with a hard crust.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "encrusted"
  },
  {
    word: "linkups",
    definition: "Definition: A connection.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "linkups"
  },
  {
    word: "spadices",
    definition: "Definition: A fleshy spike (inflorescence) with reduced flowers, usually enclosed by a spathe, characteristic of aroids.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "spadices"
  },
  {
    word: "chemisettes",
    definition: "Definition: An item of women's clothing, popular in the 1860s and 1870s, worn to fill in the front and neckline of any garment.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "chemisettes"
  },
  {
    word: "myriapods",
    definition: "Definition: Any arthropod (such as centipedes and millipedes) of the subphylum Myriapoda",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "myriapods"
  },
  {
    word: "sadness",
    definition: "Definition: The state or emotion of being sad.",
    pronunciation: "/ˈsædnəs/",
    englishEquivalent: "sadness"
  },
  {
    word: "byte",
    definition: "Definition: A short sequence of bits (binary digits) that can be operated on as a unit by a computer; the smallest usable machine word.",
    pronunciation: "/baɪt/",
    englishEquivalent: "byte"
  },
  {
    word: "expressos",
    definition: "Definition: A concentrated coffee beverage brewed by forcing hot water under high pressure through finely ground coffee.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "expressos"
  },
  {
    word: "motherhood",
    definition: "Definition: The state of being a mother.",
    pronunciation: "/ˈmʌðəhʊd/",
    englishEquivalent: "motherhood"
  },
  {
    word: "checkmark",
    definition: "Definition: A mark (✓) made to indicate agreement, correctness or acknowledgement.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "checkmark"
  },
  {
    word: "captives",
    definition: "Definition: One who has been captured or is otherwise confined.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "captives"
  },
  {
    word: "protozoan",
    definition: "Definition: Any of the diverse group of eukaryotes, of the phylum Protozoa, that are primarily unicellular, existing singly or aggregating into colonies, are usually nonphotosynthetic, and are often classified further into phyla according to their capacity for and means of motility, as by pseudopods, flagella, or cilia.",
    pronunciation: "/ˌpɹəʊtəˈzəʊən/",
    englishEquivalent: "protozoan"
  },
  {
    word: "muffling",
    definition: "Definition: To wrap (a person, face etc.) in fabric or another covering, for warmth or protection; often with up.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "muffling"
  },
  {
    word: "skinner",
    definition: "Definition: Someone who skins animals.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "skinner"
  },
  {
    word: "pierced",
    definition: "Definition: To puncture; to break through",
    pronunciation: "/pɪəst/",
    englishEquivalent: "pierced"
  },
  {
    word: "caterwauls",
    definition: "Definition: To cry as cats in heat; to make a harsh, offensive noise.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "caterwauls"
  },
  {
    word: "jest",
    definition: "Definition: An act performed for amusement; a joke.",
    pronunciation: "/dʒɛst/",
    englishEquivalent: "jest"
  },
  {
    word: "expose",
    definition: "Definition: To reveal, uncover, make visible, bring to light, introduce to.",
    pronunciation: "/ɪkˈspəʊz/",
    englishEquivalent: "expose"
  },
  {
    word: "insetted",
    definition: "Definition: To set in; infix or implant.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "insetted"
  },
  {
    word: "streels",
    definition: "Definition: A disreputable woman, a slut.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "streels"
  },
  {
    word: "colure",
    definition: "Definition: Either of two great circles (meridians) that intersect at the poles and either the equinoxes or solstices.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "colure"
  },
  {
    word: "laboring",
    definition: "Definition: The act of one who labors; toil; work done.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "laboring"
  },
  {
    word: "whoopers",
    definition: "Definition: A person or animal that whoops.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "whoopers"
  },
  {
    word: "viroid",
    definition: "Definition: A short section of RNA but without the protein coat typical of viruses, that are plant pathogens",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "viroid"
  },
  {
    word: "angular",
    definition: "Definition: A bone in the base of the lower jaw of many birds, reptiles, and fishes.",
    pronunciation: "/-lɑɹ/",
    englishEquivalent: "angular"
  },
  {
    word: "overreach",
    definition: "Definition: An act of extending or reaching over, especially if too far or much; overextension.",
    pronunciation: "/ˈəʊvə(ˌ)ɹiːt͡ʃ/",
    englishEquivalent: "overreach"
  },
  {
    word: "consistories",
    definition: "Definition: A place of standing or staying together; hence, any solemn assembly or council.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "consistories"
  },
  {
    word: "undergrounds",
    definition: "Definition: An underground railway, especially for mass transit of people in urban areas.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "undergrounds"
  },
  {
    word: "repros",
    definition: "Definition: The proof prepared in offset printing, with all elements positioned on the page.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "repros"
  },
  {
    word: "identically",
    definition: "Definition: In an identical manner.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "identically"
  },
  {
    word: "hectic",
    definition: "Definition: A hectic fever.",
    pronunciation: "/ˈhɛktɪk/",
    englishEquivalent: "hectic"
  },
  {
    word: "entrant",
    definition: "Definition: A participant who enters something, such as a contest.",
    pronunciation: "/ˈɛntɹənt/",
    englishEquivalent: "entrant"
  },
  {
    word: "stimulated",
    definition: "Definition: To encourage into action.",
    pronunciation: "/ˈstɪmjʊleɪtɪd/",
    englishEquivalent: "stimulated"
  },
  {
    word: "chessboard",
    definition: "Definition: The square board used in the game of chess, subdivided into eight rows of eight squares each, the squares in each row and column being of alternating colours.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "chessboard"
  },
  {
    word: "autocracies",
    definition: "Definition: A form of government in which unlimited power is held by a single individual.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "autocracies"
  },
  {
    word: "plebiscites",
    definition: "Definition: A referendum, especially one that concerns changes in sovereignty",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "plebiscites"
  },
  {
    word: "umlauting",
    definition: "Definition: To place an umlaut over (a vowel).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "umlauting"
  },
  {
    word: "jewelfish",
    definition: "Definition: Any fish in the genus Hemichromis, native to Africa.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "jewelfish"
  },
  {
    word: "electioneer",
    definition: "Definition: To campaign for an elective office, on one's own behalf, or on behalf of another, particularly by direct contact.",
    pronunciation: "/ɪˌlɛk.ʃənˈɪə(ɹ)/",
    englishEquivalent: "electioneer"
  },
  {
    word: "evolves",
    definition: "Definition: To move in regular procession through a system.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "evolves"
  },
  {
    word: "impalas",
    definition: "Definition: An African antelope, Aepyceros melampus, noted for its leaping ability; the male has ridged, curved horns.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "impalas"
  },
  {
    word: "twinkies",
    definition: "Definition: A yellow cake with a creamy white filling, known for its artificiality and supposedly long shelf life.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "twinkies"
  },
  {
    word: "reflux",
    definition: "Definition: The backwards flow of any fluid.",
    pronunciation: "/ˈɹiː.flʌks/",
    englishEquivalent: "reflux"
  },
  {
    word: "flimflammer",
    definition: "Definition: A swindler; a con artist.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "flimflammer"
  },
  {
    word: "index",
    definition: "Definition: An alphabetical listing of items and their location.",
    pronunciation: "/ˈɪndɛks/",
    englishEquivalent: "index"
  },
  {
    word: "umbrellas",
    definition: "Definition: Cloth-covered frame used for protection against rain or sun.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "umbrellas"
  },
  {
    word: "backspin",
    definition: "Definition: Spin applied to a ball in order to slow it, change its flight, or stop it when it lands.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "backspin"
  },
  {
    word: "whit",
    definition: "Definition: The smallest part or particle imaginable; an iota.",
    pronunciation: "/wɪt/",
    englishEquivalent: "whit"
  },
  {
    word: "surly",
    definition: "Definition: Irritated, bad-tempered, unfriendly.",
    pronunciation: "/ˈsɜːli/",
    englishEquivalent: "surly"
  },
  {
    word: "glossaries",
    definition: "Definition: A list of terms in a particular domain of knowledge with their definitions.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "glossaries"
  },
  {
    word: "angostura",
    definition: "Definition: Angostura bitters",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "angostura"
  },
  {
    word: "politics",
    definition: "Definition: To engage in political activity; politick.",
    pronunciation: "/ˈpɒl.ɪ.tɪks/",
    englishEquivalent: "politics"
  },
  {
    word: "juiceheads",
    definition: "Definition: An alcoholic.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "juiceheads"
  },
  {
    word: "daffs",
    definition: "Definition: A large frame drum, resembling a tambourine, used to accompany popular and classical music in the Middle East.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "daffs"
  },
  {
    word: "stretchier",
    definition: "Definition: Capable of stretching; elastic.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "stretchier"
  },
  {
    word: "tosser",
    definition: "Definition: One who tosses or throws something.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tosser"
  },
  {
    word: "derates",
    definition: "Definition: To lower the rated capability of any rated equipment or material.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "derates"
  },
  {
    word: "marcel",
    definition: "Definition: A hairstyle characterized by deep waves made by a curling iron.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "marcel"
  },
  {
    word: "automatons",
    definition: "Definition: A machine or robot designed to follow a precise sequence of instructions.",
    pronunciation: "/ɔːˈtɒm.ə.tənz/",
    englishEquivalent: "automatons"
  },
  {
    word: "iodates",
    definition: "Definition: The anion IO3-; Any salt of iodic acid.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "iodates"
  },
  {
    word: "seising",
    definition: "Definition: To vest ownership of a freehold estate in (someone).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "seising"
  },
  {
    word: "elucidated",
    definition: "Definition: To make clear; to clarify; to shed light upon.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "elucidated"
  },
  {
    word: "ambiences",
    definition: "Definition: A particular mood or atmosphere of an environment or surrounding influence.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "ambiences"
  },
  {
    word: "warehouses",
    definition: "Definition: A place for storing large amounts of products. In logistics, a place where products go to from the manufacturer before going to the retailer.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "warehouses"
  },
  {
    word: "inspissating",
    definition: "Definition: To thicken, especially by boiling, evaporation, or condensation; condense.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "inspissating"
  },
  {
    word: "diffract",
    definition: "Definition: To cause diffraction",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "diffract"
  },
  {
    word: "wheatears",
    definition: "Definition: Any of various passerine birds of the genus Oenanthe that feed on insects,",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "wheatears"
  },
  {
    word: "earthly",
    definition: "Definition: (collective or in the plural) That which is of the earth or earthly; a terrestrial being.",
    pronunciation: "/ˈəːθli/",
    englishEquivalent: "earthly"
  },
  {
    word: "cumulonimbus",
    definition: "Definition: A cloud, with a tall structure and a flat base, that is often associated with thunderstorms.",
    pronunciation: "/ˌkjuːmələʊˈnɪmbəs/",
    englishEquivalent: "cumulonimbus"
  },
  {
    word: "chokes",
    definition: "Definition: A control on a carburetor to adjust the air/fuel mixture when the engine is cold.",
    pronunciation: "/tʃəʊks/",
    englishEquivalent: "chokes"
  },
  {
    word: "hostas",
    definition: "Definition: Any of several herbaceous Asiatic plants of the genus Hosta.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "hostas"
  },
  {
    word: "dopiness",
    definition: "Definition: The characteristic of being dopey.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "dopiness"
  },
  {
    word: "inferno",
    definition: "Definition: A place or situation resembling Hell.",
    pronunciation: "/ɪnˈfɝnoʊ/",
    englishEquivalent: "inferno"
  },
  {
    word: "climaxing",
    definition: "Definition: To reach or bring to a climax.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "climaxing"
  },
  {
    word: "recompensed",
    definition: "Definition: To reward or repay (someone) for something done, given etc.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "recompensed"
  },
  {
    word: "diaphysis",
    definition: "Definition: The central shaft of any long bone.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "diaphysis"
  },
  {
    word: "couchettes",
    definition: "Definition: A couch.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "couchettes"
  },
  {
    word: "dogfishes",
    definition: "Definition: Any of various small sharks",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "dogfishes"
  },
  {
    word: "packsaddle",
    definition: "Definition: A saddle designed to secure and carry goods on the back of an animal.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "packsaddle"
  },
  {
    word: "preset",
    definition: "Definition: Something that is set in advance.",
    pronunciation: "/priːˈsɛt/",
    englishEquivalent: "preset"
  },
  {
    word: "dolor",
    definition: "Definition: Sorrow, grief, misery or anguish.",
    pronunciation: "/ˈdoʊlə(ɹ)/",
    englishEquivalent: "dolor"
  },
  {
    word: "irritations",
    definition: "Definition: The act of irritating or annoying",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "irritations"
  },
  {
    word: "relic",
    definition: "Definition: That which remains; that which is left after loss or decay; a remaining portion.",
    pronunciation: "/ˈɹɛlɪk/",
    englishEquivalent: "relic"
  },
  {
    word: "disassembling",
    definition: "Definition: To take to pieces; to reverse the process of assembly.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "disassembling"
  },
  {
    word: "whammed",
    definition: "Definition: To strike or smash (into) something with great force or impact",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "whammed"
  },
  {
    word: "trabecula",
    definition: "Definition: A small supporting beam.",
    pronunciation: "/trəˈbɛkjʊlə/",
    englishEquivalent: "trabecula"
  },
  {
    word: "neonates",
    definition: "Definition: A newborn infant; recently born baby.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "neonates"
  },
  {
    word: "chopsticks",
    definition: "Definition: A particular East Asian eating utensil, used in pairs and held in the hand. The utensil is a stick, usually made of wood and measuring approximately 23cm (10 inches) in length.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "chopsticks"
  },
  {
    word: "pavonine",
    definition: "Definition: Tarnish found on some ores and metals which resembles the tail feathers of a peacock.",
    pronunciation: "/ˈpævəˌnaɪn/",
    englishEquivalent: "pavonine"
  },
  {
    word: "plaints",
    definition: "Definition: A lament or woeful cry.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "plaints"
  },
  {
    word: "statuses",
    definition: "Definition: A person’s condition, position or standing relative to that of others.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "statuses"
  },
  {
    word: "turions",
    definition: "Definition: A bud, produced by some aquatic plants, that becomes detached and dormant until the following spring",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "turions"
  },
  {
    word: "mornings",
    definition: "Definition: The part of the day from dawn to noon.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "mornings"
  },
  {
    word: "snakeheads",
    definition: "Definition: A family of perciform fish native to Africa and Asia, Channidae.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "snakeheads"
  },
  {
    word: "outpolled",
    definition: "Definition: To defeat in a poll.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "outpolled"
  },
  {
    word: "floral",
    definition: "Definition: A design involving flowers",
    pronunciation: "/ˈflɔːɹəl/",
    englishEquivalent: "floral"
  },
  {
    word: "pushchairs",
    definition: "Definition: A small carriage in which a baby or child is pushed around; a stroller or baby buggy",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pushchairs"
  },
  {
    word: "agleam",
    definition: "Definition: Glowing with subdued light.",
    pronunciation: "/əˈɡliːm/",
    englishEquivalent: "agleam"
  },
  {
    word: "farewell",
    definition: "Definition: A wish of happiness or safety at parting, especially a permanent departure",
    pronunciation: "/fɛəˈwɛl/",
    englishEquivalent: "farewell"
  },
  {
    word: "tabuing",
    definition: "Definition: To mark as taboo.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tabuing"
  },
  {
    word: "hath",
    definition: "Definition: To possess, own.",
    pronunciation: "/hæθ/",
    englishEquivalent: "hath"
  },
  {
    word: "drayman",
    definition: "Definition: A man who drives drays.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "drayman"
  },
  {
    word: "orchestrates",
    definition: "Definition: To arrange or score music for performance by an orchestra.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "orchestrates"
  },
  {
    word: "sicken",
    definition: "Definition: To make ill.",
    pronunciation: "/ˈsɪkən/",
    englishEquivalent: "sicken"
  },
  {
    word: "snowberries",
    definition: "Definition: A shrub bearing white berries:",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "snowberries"
  },
  {
    word: "fleshed",
    definition: "Definition: Having flesh; corpulent.",
    pronunciation: "/flɛʃt/",
    englishEquivalent: "fleshed"
  },
  {
    word: "arctangents",
    definition: "Definition: Any of several single-valued or multivalued functions that are inverses of the tangent function. Symbol: arctan, tan-1",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "arctangents"
  },
  {
    word: "tinkling",
    definition: "Definition: To make light metallic sounds, rather like a very small bell.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tinkling"
  },
  {
    word: "tosser",
    definition: "Definition: One who tosses or throws something.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tosser"
  },
  {
    word: "dories",
    definition: "Definition: A small flat-bottomed boat with pointed or somewhat pointed ends, used for fishing both offshore and on rivers.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "dories"
  },
  {
    word: "leaned",
    definition: "Definition: To incline, deviate, or bend, from a vertical position; to be in a position thus inclining or deviating.",
    pronunciation: "/liːnd/",
    englishEquivalent: "leaned"
  },
  {
    word: "agrestic",
    definition: "Definition: Of or pertaining to the fields; rural; unpolished.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "agrestic"
  },
  {
    word: "spleen",
    definition: "Definition: In vertebrates, including humans, a ductless vascular gland, located in the left upper abdomen near the stomach, which destroys old red blood cells, removes debris from the bloodstream, acts as a reservoir of blood, and produces lymphocytes.",
    pronunciation: "/spliːn/",
    englishEquivalent: "spleen"
  },
  {
    word: "condoning",
    definition: "Definition: To forgive, excuse or overlook (something that is considered morally wrong, offensive, or generally disliked).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "condoning"
  },
  {
    word: "lunate",
    definition: "Definition: A small stone artifact, probably an arrowhead, with a blunt straight edge and a sharpened, crescent-shaped back, especially characteristic of the Mesolithic Period",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "lunate"
  },
  {
    word: "flambeed",
    definition: "Definition: To cook with a showy technique where an alcoholic beverage, such as brandy, is added to hot food and then the fumes are ignited.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "flambeed"
  },
  {
    word: "humblest",
    definition: "Definition: Not pretentious or magnificent; unpretending; unassuming.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "humblest"
  },
  {
    word: "yod",
    definition: "Definition: A palatal approximant, /j/.",
    pronunciation: "/jɑd/",
    englishEquivalent: "yod"
  },
  {
    word: "blotched",
    definition: "Definition: To mark with blotches.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "blotched"
  },
  {
    word: "labrets",
    definition: "Definition: A body piercing consisting of an adornment attached to the lip.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "labrets"
  },
  {
    word: "released",
    definition: "Definition: To let go (of); to cease to hold or contain.",
    pronunciation: "/ɹɪˈliːst/",
    englishEquivalent: "released"
  },
  {
    word: "stringpieces",
    definition: "Definition: A long piece of timber, forming a margin or edge of any piece of construction; especially one of the longitudinal pieces supporting a flight or run of stairs.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "stringpieces"
  },
  {
    word: "skydiving",
    definition: "Definition: To be in freefall after jumping from an aircraft and landing safely by deploying a parachute.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "skydiving"
  },
  {
    word: "illogic",
    definition: "Definition: Lack of logic; unreasonableness; a fallacy.",
    pronunciation: "/ɪˈlɑdʒɪk/",
    englishEquivalent: "illogic"
  },
  {
    word: "bullfinches",
    definition: "Definition: The Eurasian bullfinch (Pyrrhula pyrrhula).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "bullfinches"
  },
  {
    word: "safari",
    definition: "Definition: A trip into any undeveloped area to see, photograph or hunt wild animals in their own environment.",
    pronunciation: "/səˈfɑːɹ.i/",
    englishEquivalent: "safari"
  },
  {
    word: "pandanus",
    definition: "Definition: Any of various palm-like plants in the genus Pandanus.",
    pronunciation: "/pænˈdeɪnəs/",
    englishEquivalent: "pandanus"
  },
  {
    word: "gazanias",
    definition: "Definition: Any flowering plant of the genus Gazania, native to southern Africa.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "gazanias"
  },
  {
    word: "draughty",
    definition: "Definition: Characterized by gusts of wind; windy.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "draughty"
  },
  {
    word: "describes",
    definition: "Definition: To represent in words.",
    pronunciation: "/dəˈskɹaɪbz/",
    englishEquivalent: "describes"
  },
  {
    word: "speedometer",
    definition: "Definition: A device that measures, and indicates the current speed of a vehicle.",
    pronunciation: "/spiːˈdɒm.ɪ.tə(ɹ)/",
    englishEquivalent: "speedometer"
  },
  {
    word: "gyrate",
    definition: "Definition: To revolve round a central point; to move spirally about an axis, as a tornado; to revolve.",
    pronunciation: "/ˈdʒaɪɹeɪt/",
    englishEquivalent: "gyrate"
  },
  {
    word: "handedness",
    definition: "Definition: The property that distinguishes an asymmetric object from its mirror image. For example, the essential difference between a left and right glove.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "handedness"
  },
  {
    word: "servility",
    definition: "Definition: The condition of being servile.",
    pronunciation: "/sə.ˈvɪ.lɪ.ti/",
    englishEquivalent: "servility"
  },
  {
    word: "phosphoniums",
    definition: "Definition: The tetravalent positively-charged phosphorus cation R4P+",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "phosphoniums"
  },
  {
    word: "absolves",
    definition: "Definition: To set free, release or discharge (from obligations, debts, responsibility etc.).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "absolves"
  },
  {
    word: "tawdrier",
    definition: "Definition: (of clothing, appearance, etc.) Cheap and gaudy; showy.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tawdrier"
  },
  {
    word: "deracinated",
    definition: "Definition: To pull up by the roots; to uproot; to extirpate.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "deracinated"
  },
  {
    word: "booklice",
    definition: "Definition: Any of the small insects who feed on bookbindings, especially those of the order Psocoptera.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "booklice"
  },
  {
    word: "consistories",
    definition: "Definition: A place of standing or staying together; hence, any solemn assembly or council.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "consistories"
  },
  {
    word: "housetops",
    definition: "Definition: The roof of a house.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "housetops"
  },
  {
    word: "divertimentos",
    definition: "Definition: Composition that has several short movements, a style that composers started to use in the 18th century.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "divertimentos"
  },
  {
    word: "rouleaux",
    definition: "Definition: A little roll; a roll of coins put up in paper, or something resembling such a roll.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "rouleaux"
  },
  {
    word: "lamer",
    definition: "Definition: Unable to walk properly because of a problem with one's feet or legs.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "lamer"
  },
  {
    word: "embattle",
    definition: "Definition: To arrange in order of battle; to array for battle",
    pronunciation: "/ɛmˈbætl̩/",
    englishEquivalent: "embattle"
  },
  {
    word: "corks",
    definition: "Definition: The bark of the cork oak, which is very light and porous and used for making bottle stoppers, flotation devices, and insulation material.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "corks"
  },
  {
    word: "coulombs",
    definition: "Definition: In the International System of Units, the derived unit of electric charge; the amount of electric charge carried by a current of 1 ampere flowing for 1 second. Symbol: C",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "coulombs"
  },
  {
    word: "tiddly",
    definition: "Definition: An alcoholic beverage.",
    pronunciation: "/tɪd.li/",
    englishEquivalent: "tiddly"
  },
  {
    word: "ejecting",
    definition: "Definition: To compel (a person or persons) to leave.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "ejecting"
  },
  {
    word: "endonuclease",
    definition: "Definition: Any enzyme which catalyzes the cleavage of nucleic acids so as to produce variously sized fragments.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "endonuclease"
  },
  {
    word: "frowziest",
    definition: "Definition: Having a dingy, neglected, and scruffy appearance.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "frowziest"
  },
  {
    word: "truanted",
    definition: "Definition: To play truant.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "truanted"
  },
  {
    word: "sodomy",
    definition: "Definition: Any of several forms of sexual intercourse held to be unnatural, particularly bestiality or historically homosexuality, but also (sometimes) anal or oral sex.",
    pronunciation: "/ˈsɒdəmi/",
    englishEquivalent: "sodomy"
  },
  {
    word: "lattices",
    definition: "Definition: A flat panel constructed with widely-spaced crossed thin strips of wood or other material, commonly used as a garden trellis.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "lattices"
  },
  {
    word: "bombshells",
    definition: "Definition: A bomb or artillery shell designed to explode on impact.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "bombshells"
  },
  {
    word: "counterfoils",
    definition: "Definition: The part of a cheque that is retained in the chequebook as a record; a stub",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "counterfoils"
  },
  {
    word: "heronry",
    definition: "Definition: A breeding woodland for herons; a heron rookery.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "heronry"
  },
  {
    word: "gormandising",
    definition: "Definition: To eat food in a gluttonous manner; to gorge; to make a pig of oneself.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "gormandising"
  },
  {
    word: "judges",
    definition: "Definition: A public official whose duty it is to administer the law, especially by presiding over trials and rendering judgments; a justice.",
    pronunciation: "/ˈdʒʌdʒɪz/",
    englishEquivalent: "judges"
  },
  {
    word: "canna",
    definition: "Definition: Any member of the genus Canna of tropical plants with large leaves and often showy flowers.",
    pronunciation: "/ˈkænə/",
    englishEquivalent: "canna"
  },
  {
    word: "polyphenol",
    definition: "Definition: Any of a large class of organic compounds, of plant origin, having more than one phenol group; they tend to be colourful and to have antioxidant properties",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "polyphenol"
  },
  {
    word: "coupling",
    definition: "Definition: To join (two things) together, or (one thing) to (another).",
    pronunciation: "/ˈkʌplɪŋ/",
    englishEquivalent: "coupling"
  },
  {
    word: "joshes",
    definition: "Definition: To tease someone in a kindly or friendly fashion.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "joshes"
  },
  {
    word: "pandered",
    definition: "Definition: To tempt with, to appeal or cater to (improper motivations, etc.); to assist in gratification.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pandered"
  },
  {
    word: "dromedaries",
    definition: "Definition: The single-humped camel (Camelus dromedarius).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "dromedaries"
  },
  {
    word: "appreciable",
    definition: "Definition: Large enough to be estimated; perceptible; considerable.",
    pronunciation: "/əˈpɹiːʃəbl/",
    englishEquivalent: "appreciable"
  },
  {
    word: "baneberries",
    definition: "Definition: A flowering plant of the genus Actaea, also called genus Cimicifuga.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "baneberries"
  },
  {
    word: "biphenyl",
    definition: "Definition: A colourless solid hydrocarbon, C12H10, consisting of two benzene rings linked together by a single bond",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "biphenyl"
  },
  {
    word: "colugos",
    definition: "Definition: An arboreal gliding mammal of the family Cynocephalidae native to South-east Asia.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "colugos"
  },
  {
    word: "safflower",
    definition: "Definition: A cultivated thistle-like plant, Carthamus tinctorius, family Asteraceae, now grown mainly for its oil.",
    pronunciation: "/ˈsæfˌlaʊə(ɹ)/",
    englishEquivalent: "safflower"
  },
  {
    word: "trued",
    definition: "Definition: To straighten.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "trued"
  },
  {
    word: "ostracodes",
    definition: "Definition: Any of many small crustaceans, of the class Ostracoda, that resemble a shrimp enclosed in a bivalve shell.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "ostracodes"
  },
  {
    word: "prenatal",
    definition: "Definition: A person who is expecting to give birth.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "prenatal"
  },
  {
    word: "frits",
    definition: "Definition: A fused mixture of materials used to make glass.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "frits"
  },
  {
    word: "kwachas",
    definition: "Definition: Malawi's major currency unit; 100 tambala = 1 kwacha.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "kwachas"
  },
  {
    word: "trichomoniasis",
    definition: "Definition: A common sexually transmitted disease caused by the parasite Trichomonas vaginalis and infecting the urinary tract or vagina.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "trichomoniasis"
  },
  {
    word: "tracheitis",
    definition: "Definition: Inflammation of the trachea.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tracheitis"
  },
  {
    word: "lineups",
    definition: "Definition: A physical or photographic queue of people allegedly involved in a crime, allowing a witness to identify them",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "lineups"
  },
  {
    word: "vindaloo",
    definition: "Definition: A blend of chilis, tamarind, ginger, cumin, and mustard seeds, originally from Goa.",
    pronunciation: "/vɪndəˈluː/",
    englishEquivalent: "vindaloo"
  },
  {
    word: "margravine",
    definition: "Definition: The wife of a margrave.",
    pronunciation: "/ˈmɑːɡɹəviːn/",
    englishEquivalent: "margravine"
  },
  {
    word: "unassailable",
    definition: "Definition: Something, such as a belief, that cannot be assailed.",
    pronunciation: "/ˌʌnəˈseɪləbl̩/",
    englishEquivalent: "unassailable"
  },
  {
    word: "sulfonate",
    definition: "Definition: Any salt or ester of a sulfonic acid.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sulfonate"
  },
  {
    word: "goosegrass",
    definition: "Definition: Any of various grasses, sometimes used as food for geese, principally in genus Eleusine.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "goosegrass"
  },
  {
    word: "kepis",
    definition: "Definition: A cap with a flat circular top and a visor, particularly associated with French uniforms.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "kepis"
  },
  {
    word: "bearberry",
    definition: "Definition: Any of three dwarf shrubs of the genus Arctostaphylos, which principally grow in arctic and subarctic regions and bear edible berries.",
    pronunciation: "/ˈbɛəb(ə)ɹi/",
    englishEquivalent: "bearberry"
  },
  {
    word: "gasholder",
    definition: "Definition: A large, telescopic cylindrical tank, with a water seal, used for storing domestic gas",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "gasholder"
  },
  {
    word: "coulombs",
    definition: "Definition: In the International System of Units, the derived unit of electric charge; the amount of electric charge carried by a current of 1 ampere flowing for 1 second. Symbol: C",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "coulombs"
  },
  {
    word: "victimises",
    definition: "Definition: To make someone a victim or sacrifice.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "victimises"
  },
  {
    word: "interrogations",
    definition: "Definition: The act of interrogating or questioning; examination by questions; inquiry.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "interrogations"
  },
  {
    word: "bargaining",
    definition: "Definition: To make a bargain; to make a deal or contract for the exchange of property or services; to negotiate",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "bargaining"
  },
  {
    word: "distractibility",
    definition: "Definition: The ease with which a person's concentration can be interfered with by external stimulation or by irrelevant thoughts",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "distractibility"
  },
  {
    word: "aoudad",
    definition: "Definition: The Barbary sheep, Ammotragus lervia.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "aoudad"
  },
  {
    word: "superannuate",
    definition: "Definition: To retire or put out of use due to age.",
    pronunciation: "/ˌsuːpəɹˈænjueɪt/",
    englishEquivalent: "superannuate"
  },
  {
    word: "kidnap",
    definition: "Definition: The crime, or an instance, of kidnapping.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "kidnap"
  },
  {
    word: "squirreling",
    definition: "Definition: To store in a secretive manner, to hide something for future use",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "squirreling"
  },
  {
    word: "younkers",
    definition: "Definition: A young man; a lad, youngster",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "younkers"
  },
  {
    word: "legionaries",
    definition: "Definition: A soldier belonging to a legion; a professional soldier of the ancient Roman army.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "legionaries"
  },
  {
    word: "hexanes",
    definition: "Definition: Any of five isomeric aliphatic hydrocarbons, C6H14. They are colorless, volatile liquids.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "hexanes"
  },
  {
    word: "hitting",
    definition: "Definition: (heading, physical) To strike.",
    pronunciation: "/ˈhɪtɪŋ/",
    englishEquivalent: "hitting"
  },
  {
    word: "meritocracies",
    definition: "Definition: Rule by merit, and talent.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "meritocracies"
  },
  {
    word: "pronating",
    definition: "Definition: To turn or rotate one’s hand and forearm so that the palm faces down if the forearm is horizontal, back if the arm is pointing down, or forward if the forearm is pointing up; to twist the right forearm counterclockwise or the left forearm clockwise.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pronating"
  },
  {
    word: "carp",
    definition: "Definition: Any of various freshwater fish of the family Cyprinidae, especially the common carp, Cyprinus carpio.",
    pronunciation: "/ˈkɑːp/",
    englishEquivalent: "carp"
  },
  {
    word: "haylofts",
    definition: "Definition: The upper storey of a barn used for storing hay",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "haylofts"
  },
  {
    word: "tubule",
    definition: "Definition: A small pipe or fistular body; a little tube.",
    pronunciation: "/ˈtjuːbjuːl/",
    englishEquivalent: "tubule"
  },
  {
    word: "kindhearted",
    definition: "Definition: Having an innately kind disposition or character.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "kindhearted"
  },
  {
    word: "ostentatiously",
    definition: "Definition: In an ostentatious manner; extravagantly or flamboyantly.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "ostentatiously"
  },
  {
    word: "maladministers",
    definition: "Definition: To administer wrongly or badly.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "maladministers"
  },
  {
    word: "weaselled",
    definition: "Definition: To achieve by clever or devious means.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "weaselled"
  },
  {
    word: "tranquillizer",
    definition: "Definition: That which tranquillizes or soothes.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tranquillizer"
  },
  {
    word: "ionomers",
    definition: "Definition: A polymer, or a biological macromolecule (such as a protein) in which a small but significant proportion of the constituent monomers have ionic groups",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "ionomers"
  },
  {
    word: "dedicates",
    definition: "Definition: To set apart for a deity or for religious purposes; consecrate.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "dedicates"
  },
  {
    word: "poppas",
    definition: "Definition: (sometimes childish) father, papa.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "poppas"
  },
  {
    word: "shebangs",
    definition: "Definition: The character string '#!' used at the beginning of a computer file to indicate which interpreter can process the commands in the file, chiefly used in Unix and related operating systems.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "shebangs"
  },
  {
    word: "clearers",
    definition: "Definition: Someone who or something which clears.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "clearers"
  },
  {
    word: "triangulating",
    definition: "Definition: To locate by means of triangulation",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "triangulating"
  },
  {
    word: "fractional",
    definition: "Definition: (grammar) An expression of a fractional number.",
    pronunciation: "/ˈfɹæk.ʃən.əl/",
    englishEquivalent: "fractional"
  },
  {
    word: "septuplets",
    definition: "Definition: One of a group of seven babies born at the same birth.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "septuplets"
  },
  {
    word: "trammeled",
    definition: "Definition: To entangle, as in a net.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "trammeled"
  },
  {
    word: "whoopees",
    definition: "Definition: To behave exuberantly; to make whoopee.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "whoopees"
  },
  {
    word: "charactered",
    definition: "Definition: To write (using characters); to describe.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "charactered"
  },
  {
    word: "kremlins",
    definition: "Definition: (Russian architecture) A fortified, central complex found in various Russian cities.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "kremlins"
  },
  {
    word: "underpopulated",
    definition: "Definition: Having an insufficient population for economic viability",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "underpopulated"
  },
  {
    word: "artisanship",
    definition: "Definition: The property of being an artisan.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "artisanship"
  },
  {
    word: "psychokinesis",
    definition: "Definition: The movement of physical systems and objects by the use of psychic power. Abbreviated as PK.",
    pronunciation: "/ˌsaɪkəʊkɪˈniːsɪs/",
    englishEquivalent: "psychokinesis"
  },
  {
    word: "sinkages",
    definition: "Definition: An amount of material involved in a sinking.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sinkages"
  },
  {
    word: "modernizations",
    definition: "Definition: The process of modernizing.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "modernizations"
  },
  {
    word: "undermining",
    definition: "Definition: To dig underneath (something), to make a passage for destructive or military purposes; to sap.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "undermining"
  },
  {
    word: "tourmalines",
    definition: "Definition: A complex black or dark-coloured borosilicate mineral, compounded with various chemical elements and considered a semi-precious stone.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tourmalines"
  },
  {
    word: "airbuses",
    definition: "Definition: A subsonic jet airliner, especially a wide-bodied one.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "airbuses"
  },
  {
    word: "divider",
    definition: "Definition: An object that separates.",
    pronunciation: "/dɪˈvaɪdə(ɹ)/",
    englishEquivalent: "divider"
  },
  {
    word: "electrocute",
    definition: "Definition: To kill by electric shock.",
    pronunciation: "/əˈlektɹəkjuːt/",
    englishEquivalent: "electrocute"
  },
  {
    word: "bistouries",
    definition: "Definition: A narrow-bladed surgical knife.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "bistouries"
  },
  {
    word: "vagarious",
    definition: "Definition: Subject to vagaries; erratic.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "vagarious"
  },
  {
    word: "songstress",
    definition: "Definition: A female singer.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "songstress"
  },
  {
    word: "thingamabobs",
    definition: "Definition: A thing or person whose actual name is unknown or forgotten.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "thingamabobs"
  },
  {
    word: "coat",
    definition: "Definition: An outer garment covering the upper torso and arms.Wp",
    pronunciation: "/kəʊt/",
    englishEquivalent: "coat"
  },
  {
    word: "pacific",
    definition: "Definition: Calm, peaceful.",
    pronunciation: "/pəˈsɪfɪk/",
    englishEquivalent: "pacific"
  },
  {
    word: "outlays",
    definition: "Definition: A laying out or expending; that which is laid out or expended.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "outlays"
  },
  {
    word: "almighty",
    definition: "Definition: (sometimes postpositive) Unlimited in might; omnipotent; all-powerful",
    pronunciation: "/ɔːlˈmaɪti/",
    englishEquivalent: "almighty"
  },
  {
    word: "gondola",
    definition: "Definition: A small long, narrow boat with a high prow and stern, propelled with a single oar, especially in Venice.",
    pronunciation: "/ˈɡɒn.də.lə/",
    englishEquivalent: "gondola"
  },
  {
    word: "tramlines",
    definition: "Definition: The rails that a tram runs on.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tramlines"
  },
  {
    word: "monochromatic",
    definition: "Definition: Having only one color, represented by differing hues and tints. For example shades in a black and white television.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "monochromatic"
  },
  {
    word: "negligible",
    definition: "Definition: Able to be neglected, ignored or excluded from consideration; too small or unimportant to be of concern.",
    pronunciation: "/ˈnɛɡlɪdʒɪbəl/",
    englishEquivalent: "negligible"
  },
  {
    word: "corn",
    definition: "Definition: The main cereal plant grown for its grain in a given region, such as oats in parts of Scotland and Ireland, and wheat or barley in England and Wales.",
    pronunciation: "/kɔɹn/",
    englishEquivalent: "corn"
  },
  {
    word: "rollouts",
    definition: "Definition: An act of rolling out; deployment.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "rollouts"
  },
  {
    word: "pericarps",
    definition: "Definition: The outermost layer, or skin, of a ripe fruit or ovary.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pericarps"
  },
  {
    word: "divinities",
    definition: "Definition: A supernatural divine being; a god or goddess.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "divinities"
  },
  {
    word: "dribble",
    definition: "Definition: Drool; saliva.",
    pronunciation: "/dɹɪ.bl̩/",
    englishEquivalent: "dribble"
  },
  {
    word: "prenatal",
    definition: "Definition: A person who is expecting to give birth.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "prenatal"
  },
  {
    word: "activates",
    definition: "Definition: To encourage development or induce increased activity; to stimulate.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "activates"
  },
  {
    word: "emulated",
    definition: "Definition: To attempt to equal or be the same as.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "emulated"
  },
  {
    word: "backstages",
    definition: "Definition: The area behind a stage out of view of the audience where performers wait to give their show; especially that of the dressing rooms.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "backstages"
  },
  {
    word: "reunion",
    definition: "Definition: The process or act of reuniting.",
    pronunciation: "/ɹiːˈjuːnjən/",
    englishEquivalent: "reunion"
  },
  {
    word: "infelicitous",
    definition: "Definition: Unhappy or unfortunate.",
    pronunciation: "/ˌɪn.fəˈlɪs.ɪ.təs/",
    englishEquivalent: "infelicitous"
  },
  {
    word: "wheals",
    definition: "Definition: A small raised swelling on the skin, often itchy, caused by a blow from a whip or an insect bite etc.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "wheals"
  },
  {
    word: "puss",
    definition: "Definition: (often as a term of address) A cat.",
    pronunciation: "/pʊs/",
    englishEquivalent: "puss"
  },
  {
    word: "somatic",
    definition: "Definition: Part of, or relating to the body of an organism.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "somatic"
  },
  {
    word: "copier",
    definition: "Definition: A machine that copies graphical material; a duplicator.",
    pronunciation: "/ˈkɒpɪə/",
    englishEquivalent: "copier"
  },
  {
    word: "cornballs",
    definition: "Definition: A ball of popped corn stuck together with soft candy from molasses or sugar.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "cornballs"
  },
  {
    word: "werwolves",
    definition: "Definition: A person who is transformed or can transform into a wolf or a wolflike human, often said to transform during a full moon.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "werwolves"
  },
  {
    word: "infantilized",
    definition: "Definition: To reduce (a person) to the state or status of an infant.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "infantilized"
  },
  {
    word: "outbred",
    definition: "Definition: To breed from parents not closely related.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "outbred"
  },
  {
    word: "glowworm",
    definition: "Definition: The larva or wingless grub-like female of a beetle from the families Phengodidae or Lampyridae that gives out a green light from its abdomen.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "glowworm"
  },
  {
    word: "tillered",
    definition: "Definition: To produce new shoots from the root or from around the bottom of the original stalk; stool.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tillered"
  },
  {
    word: "riffling",
    definition: "Definition: To flow over a swift, shallow part of a stream.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "riffling"
  },
  {
    word: "underwire",
    definition: "Definition: A semicircular wire placed in a bra to support the breasts.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "underwire"
  },
  {
    word: "humanises",
    definition: "Definition: To make human; to give or cause to have the fundamental properties of a human.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "humanises"
  },
  {
    word: "blitz",
    definition: "Definition: A sudden attack, especially an air raid; usually with reference to the Blitz.",
    pronunciation: "/blɪts/",
    englishEquivalent: "blitz"
  },
  {
    word: "phraseology",
    definition: "Definition: Study of set or fixed expressions.",
    pronunciation: "/fɹeɪziˈɒlədʒɪ/",
    englishEquivalent: "phraseology"
  },
  {
    word: "onuses",
    definition: "Definition: A legal obligation.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "onuses"
  },
  {
    word: "congregational",
    definition: "Definition: Of or pertaining to a congregation",
    pronunciation: "/kɒŋɡɹəˈɡeɪʃənəl/",
    englishEquivalent: "congregational"
  },
  {
    word: "kinkajou",
    definition: "Definition: Potos flavus, a carnivorous mammal of Central America and South America with a long, prehensile tail, related to the raccoon.",
    pronunciation: "/ˈkɪŋkəˌdʒuː/",
    englishEquivalent: "kinkajou"
  },
  {
    word: "repugnance",
    definition: "Definition: Extreme aversion, repulsion.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "repugnance"
  },
  {
    word: "relive",
    definition: "Definition: To experience (something) again; to live over again.",
    pronunciation: "/ɹiːˈlɪv/",
    englishEquivalent: "relive"
  },
  {
    word: "silverfishes",
    definition: "Definition: Certain insects",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "silverfishes"
  },
  {
    word: "velodromes",
    definition: "Definition: An indoor arena, having an oval banked track for bicycle racing.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "velodromes"
  },
  {
    word: "sissiest",
    definition: "Definition: Effeminate.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sissiest"
  },
  {
    word: "stirred",
    definition: "Definition: To incite to action",
    pronunciation: "/stɜːd/",
    englishEquivalent: "stirred"
  },
  {
    word: "chipmunk",
    definition: "Definition: A squirrel-like rodent of the genus Tamias, native mainly to North America.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "chipmunk"
  },
  {
    word: "questionnaire",
    definition: "Definition: A form containing a list of questions; a means of gathering information for a survey",
    pronunciation: "/ˌk(w)estjəˈnɛə/",
    englishEquivalent: "questionnaire"
  },
  {
    word: "laundered",
    definition: "Definition: To wash; to wash, and to smooth with a flatiron or mangle; to wash and iron.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "laundered"
  },
  {
    word: "bootstrap",
    definition: "Definition: A loop (leather or other material) sewn at the side or top rear of a boot to help in pulling the boot on.",
    pronunciation: "/ˈbuːtˌstɹæp/",
    englishEquivalent: "bootstrap"
  },
  {
    word: "sundrops",
    definition: "Definition: Evening primrose",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sundrops"
  },
  {
    word: "boxcar",
    definition: "Definition: An enclosed railroad freight car, especially one with a sliding door.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "boxcar"
  },
  {
    word: "escalation",
    definition: "Definition: An increase or rise, especially one to counteract a perceived discrepancy",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "escalation"
  },
  {
    word: "buzzards",
    definition: "Definition: Any of several Old World birds of prey of the genus Buteo with broad wings and a broad tail.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "buzzards"
  },
  {
    word: "refix",
    definition: "Definition: To fix again.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "refix"
  },
  {
    word: "patriciate",
    definition: "Definition: The rank of a patrician",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "patriciate"
  },
  {
    word: "hut",
    definition: "Definition: A small, simple one-storey dwelling or shelter, often with just one room, and generally built of readily available local materials.",
    pronunciation: "/hʌt/",
    englishEquivalent: "hut"
  },
  {
    word: "espresso",
    definition: "Definition: A concentrated coffee beverage brewed by forcing hot water under high pressure through finely ground coffee.",
    pronunciation: "/ɛˈspɹɛsəʊ/",
    englishEquivalent: "espresso"
  },
  {
    word: "putrefied",
    definition: "Definition: To become filled with a pus-like or bile-like substance.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "putrefied"
  },
  {
    word: "rebuilding",
    definition: "Definition: To build again.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "rebuilding"
  },
  {
    word: "glaive",
    definition: "Definition: A light lance with a long, sharp-pointed head.",
    pronunciation: "/ɡleɪv/",
    englishEquivalent: "glaive"
  },
  {
    word: "acidulous",
    definition: "Definition: Slightly sour; sub-acid; sourish.",
    pronunciation: "/əˈsɪdjʊləs/",
    englishEquivalent: "acidulous"
  },
  {
    word: "stagestruck",
    definition: "Definition: Enamored of the theatre, the craft of acting or of actors/actresses.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "stagestruck"
  },
  {
    word: "sables",
    definition: "Definition: A small carnivorous mammal of the Old World that resembles a weasel, Martes zibellina, from cold regions in Eurasia and the North Pacific islands, valued for its dark brown fur (Wikipedia).",
    pronunciation: "/ˈseɪbəlz/",
    englishEquivalent: "sables"
  },
  {
    word: "sundowns",
    definition: "Definition: Sunset.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sundowns"
  },
  {
    word: "oxycodone",
    definition: "Definition: A synthetic analgesic drug (trademark OxyContin) that is similar to morphine in its effects.",
    pronunciation: "/ˌɒk.sɪˈkəʊ.dəʊn/",
    englishEquivalent: "oxycodone"
  },
  {
    word: "shitless",
    definition: "Definition: Having an empty bowel; greatly frightened; see usage notes below.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "shitless"
  },
  {
    word: "birthdays",
    definition: "Definition: The anniversary of the day on which someone is born.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "birthdays"
  },
  {
    word: "proximity",
    definition: "Definition: Closeness; the state of being near as in space, time, or relationship.",
    pronunciation: "/pɹɑkˈsɪ.mɪ.ti/",
    englishEquivalent: "proximity"
  },
  {
    word: "chiliad",
    definition: "Definition: A group of 1000 things.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "chiliad"
  },
  {
    word: "depersonalized",
    definition: "Definition: To remove a sense of personal identity or individual character from something.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "depersonalized"
  },
  {
    word: "kulaks",
    definition: "Definition: A prosperous peasant in the Russian Empire or the Soviet Union, who owned land and could hire workers.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "kulaks"
  },
  {
    word: "mucous",
    definition: "Definition: Pertaining to mucus",
    pronunciation: "/ˈmjuːkəs/",
    englishEquivalent: "mucous"
  },
  {
    word: "pauperized",
    definition: "Definition: To make someone a pauper; to impoverish",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pauperized"
  },
  {
    word: "gusted",
    definition: "Definition: To blow in gusts.",
    pronunciation: "/ˈɡʌstɪd/",
    englishEquivalent: "gusted"
  },
  {
    word: "aftertastes",
    definition: "Definition: A taste of something that persists when it is no longer present.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "aftertastes"
  },
  {
    word: "jackeroo",
    definition: "Definition: A white man living outside of a white settlement.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "jackeroo"
  },
  {
    word: "dextrorotatory",
    definition: "Definition: (of an optically active compound or crystal) That rotates the plane of polarized light to the right, or clockwise.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "dextrorotatory"
  },
  {
    word: "octothorps",
    definition: "Definition: The hash or square symbol (#), used mainly in telephony and computing.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "octothorps"
  },
  {
    word: "unintellectual",
    definition: "Definition: (of a person) Not intellectual.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unintellectual"
  },
  {
    word: "grew",
    definition: "Definition: To become larger, to increase in magnitude.",
    pronunciation: "/ɡɹuː/",
    englishEquivalent: "grew"
  },
  {
    word: "bisque",
    definition: "Definition: A thick creamy soup made from fish, shellfish, meat or vegetables.",
    pronunciation: "/bɪsk/",
    englishEquivalent: "bisque"
  },
  {
    word: "irradiation",
    definition: "Definition: An act of irradiating, or state of being irradiated.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "irradiation"
  },
  {
    word: "het",
    definition: "Definition: A heterosexual person.",
    pronunciation: "/hɛt/",
    englishEquivalent: "het"
  },
  {
    word: "moonlights",
    definition: "Definition: To work on the side (at a secondary job), often in the evening or during the night.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "moonlights"
  },
  {
    word: "flatworms",
    definition: "Definition: Any of very many parasitic or free-living worms, of the phylum Platyhelminthes, having a flattened body with no skeleton or body cavity.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "flatworms"
  },
  {
    word: "caesura",
    definition: "Definition: A pause or interruption in a poem, music, building, or other work of art.",
    pronunciation: "/sɪˈzjʊəɹə/",
    englishEquivalent: "caesura"
  },
  {
    word: "marketplaces",
    definition: "Definition: An open area in a town housing a public market.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "marketplaces"
  },
  {
    word: "copyedited",
    definition: "Definition: To correct the spelling, grammar, formatting, etc. of printed material and prepare it for typesetting, printing, or online publishing.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "copyedited"
  },
  {
    word: "apostatised",
    definition: "Definition: To give up or renounce one's position or belief.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "apostatised"
  },
  {
    word: "marrying",
    definition: "Definition: To enter into the conjugal or connubial state; to take a husband or a wife.",
    pronunciation: "/ˈmæɹiɪŋ/",
    englishEquivalent: "marrying"
  },
  {
    word: "backup",
    definition: "Definition: A reserve or substitute.",
    pronunciation: "/ˈbækˌʌp/",
    englishEquivalent: "backup"
  },
  {
    word: "capitulating",
    definition: "Definition: To surrender; to end all resistance, to give up; to go along with or comply.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "capitulating"
  },
  {
    word: "sops",
    definition: "Definition: Something entirely soaked.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sops"
  },
  {
    word: "west",
    definition: "Definition: One of the four principal compass points, specifically 270°, conventionally directed to the left on maps; the direction of the setting sun at an equinox, abbreviated as W.",
    pronunciation: "/wɛst/",
    englishEquivalent: "west"
  },
  {
    word: "histogeneses",
    definition: "Definition: The formation and development of the tissues of an organism from embryonic cells",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "histogeneses"
  },
  {
    word: "ecotage",
    definition: "Definition: The commission of usually illegal acts of sabotage motivated by environmentalism.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "ecotage"
  },
  {
    word: "tectum",
    definition: "Definition: The dorsal portion of the midbrain of vertebrates; in mammals, containing the superior colliculus and inferior colliculus",
    pronunciation: "/ˈtɛk.təm/",
    englishEquivalent: "tectum"
  },
  {
    word: "catfish",
    definition: "Definition: Any fish of the order Siluriformes, mainly found in fresh water, lacking scales, and having barbels like whiskers around the mouth",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "catfish"
  },
  {
    word: "inoculants",
    definition: "Definition: The active material used in an inoculation; an inoculum",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "inoculants"
  },
  {
    word: "aerobics",
    definition: "Definition: A form of exercise, designed to enhance one's cardiovascular fitness, normally performed to music.",
    pronunciation: "/əˈɹoʊbɪks/",
    englishEquivalent: "aerobics"
  },
  {
    word: "reluctant",
    definition: "Definition: Opposing; offering resistance (to).",
    pronunciation: "/ɹɪˈlʌktənt/",
    englishEquivalent: "reluctant"
  },
  {
    word: "doghouses",
    definition: "Definition: Any small house or structure or enclosure used to house a dog.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "doghouses"
  },
  {
    word: "prosimians",
    definition: "Definition: A primate that is not a monkey or an ape, generally nocturnal with large eyes and ears. Such primates were formerly grouped in the suborder Prosimii, but are now considered a paraphyletic group and not a clade.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "prosimians"
  },
  {
    word: "fornication",
    definition: "Definition: Sexual intercourse by people who are not married, or which is considered illicit in another way.",
    pronunciation: "/ˌfɔɹnɪˈkeɪʃən/",
    englishEquivalent: "fornication"
  },
  {
    word: "recuperating",
    definition: "Definition: To recover, especially from an illness; to get better from an illness.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "recuperating"
  },
  {
    word: "blowier",
    definition: "Definition: Windy or breezy.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "blowier"
  },
  {
    word: "mitogen",
    definition: "Definition: Any substance that stimulates mitosis",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "mitogen"
  },
  {
    word: "protective",
    definition: "Definition: Something that protects.",
    pronunciation: "/pɹoʊtɛktɪv/",
    englishEquivalent: "protective"
  },
  {
    word: "anchored",
    definition: "Definition: To connect an object, especially a ship or a boat, to a fixed point.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "anchored"
  },
  {
    word: "wigs",
    definition: "Definition: A head of real or synthetic hair worn on the head to disguise baldness, for cultural or religious reasons, for fashion, or by actors to help them better resemble the character they are portraying.",
    pronunciation: "/wɪɡz/",
    englishEquivalent: "wigs"
  },
  {
    word: "batching",
    definition: "Definition: To aggregate things together into a batch.",
    pronunciation: "/ˈbætʃɪŋ/",
    englishEquivalent: "batching"
  },
  {
    word: "watched",
    definition: "Definition: To look at, see, or view for a period of time.",
    pronunciation: "/wɒtʃt/",
    englishEquivalent: "watched"
  },
  {
    word: "tunicated",
    definition: "Definition: Tunicate",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tunicated"
  },
  {
    word: "stirrup",
    definition: "Definition: A ring or hoop suspended by a rope or strap from the saddle, for a horseman's foot while mounting or riding.",
    pronunciation: "/ˈstɪɹəp/",
    englishEquivalent: "stirrup"
  },
  {
    word: "solacing",
    definition: "Definition: To give solace to; comfort; cheer; console.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "solacing"
  },
  {
    word: "immobilizing",
    definition: "Definition: To render motionless; to stop moving or stop from moving.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "immobilizing"
  },
  {
    word: "worldview",
    definition: "Definition: One's personal view of the world and how one interprets it.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "worldview"
  },
  {
    word: "acidhead",
    definition: "Definition: A person who uses the hallucinogenic drug LSD.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "acidhead"
  },
  {
    word: "adumbrating",
    definition: "Definition: To foreshadow vaguely.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "adumbrating"
  },
  {
    word: "panzer",
    definition: "Definition: A tank, especially a German one of World War II.",
    pronunciation: "/ˈpæntsə(ɹ)/",
    englishEquivalent: "panzer"
  },
  {
    word: "hormones",
    definition: "Definition: Any substance produced by one tissue and conveyed by the bloodstream to another to effect physiological activity.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "hormones"
  },
  {
    word: "monadnocks",
    definition: "Definition: A hill or mountain standing isolated above a predominantly flat plain.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "monadnocks"
  },
  {
    word: "waterbucks",
    definition: "Definition: A species of antelope endemic to Africa, Kobus ellipsiprymnus.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "waterbucks"
  },
  {
    word: "flanneled",
    definition: "Definition: Covered or wrapped in flannel.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "flanneled"
  },
  {
    word: "prowls",
    definition: "Definition: To rove over, through, or about in a stealthy manner; especially, to search in, as for prey or booty.",
    pronunciation: "/pɹaʊlz/",
    englishEquivalent: "prowls"
  },
  {
    word: "optician",
    definition: "Definition: A person who makes or dispenses lenses, spectacles.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "optician"
  },
  {
    word: "dayrooms",
    definition: "Definition: A common room in a barracks or dormitory where the inhabitants can mingle and socialize.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "dayrooms"
  },
  {
    word: "reconstructed",
    definition: "Definition: To construct again; to restore.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "reconstructed"
  },
  {
    word: "interferons",
    definition: "Definition: Any of a group of glycoproteins, produced by the immune system, that prevent viral replication in infected cells.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "interferons"
  },
  {
    word: "underestimate",
    definition: "Definition: An estimate that is too low.",
    pronunciation: "/ʌndɚˈɛs.tɨ.meɪt/",
    englishEquivalent: "underestimate"
  },
  {
    word: "genie",
    definition: "Definition: A jinn, a being descended from the jann, normally invisible to the human eye, but who may also appear in animal or human form.",
    pronunciation: "/ˈdʒiː.ni/",
    englishEquivalent: "genie"
  },
  {
    word: "slugger",
    definition: "Definition: A boxer who tends to deliver hard punches",
    pronunciation: "/ˈslʌɡɚ/",
    englishEquivalent: "slugger"
  },
  {
    word: "fireplugs",
    definition: "Definition: A fire hydrant.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "fireplugs"
  },
  {
    word: "internuclear",
    definition: "Definition: Acting between nuclei",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "internuclear"
  },
  {
    word: "souks",
    definition: "Definition: A street market, particularly in Arabic- and Somali-speaking countries; a place where people buy and sell goods.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "souks"
  },
  {
    word: "stuccoed",
    definition: "Definition: To coat or decorate with stucco.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "stuccoed"
  },
  {
    word: "conservancies",
    definition: "Definition: The conservation of a resource.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "conservancies"
  },
  {
    word: "sipe",
    definition: "Definition: Slit in a tire to drain away surface water and improve traction.",
    pronunciation: "/saɪp/",
    englishEquivalent: "sipe"
  },
  {
    word: "yardmen",
    definition: "Definition: A worker in a railway yard.",
    pronunciation: "/ˈjɑɹdmɛn/",
    englishEquivalent: "yardmen"
  },
  {
    word: "untamable",
    definition: "Definition: Incapable of being controlled, subdued, or tamed.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "untamable"
  },
  {
    word: "multifaceted",
    definition: "Definition: Having multiple facets.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "multifaceted"
  },
  {
    word: "grange",
    definition: "Definition: A granary.",
    pronunciation: "/ɡɹeɪndʒ/",
    englishEquivalent: "grange"
  },
  {
    word: "calliopes",
    definition: "Definition: A musical organ, consisting of steam whistles played with a keyboard. Often used with merry-go-rounds.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "calliopes"
  },
  {
    word: "stardom",
    definition: "Definition: The status or position of a performer acknowledged to be a star; fame; celebrity.",
    pronunciation: "/ˈstɑɹdəm/",
    englishEquivalent: "stardom"
  },
  {
    word: "myrrh",
    definition: "Definition: A red-brown resinous material, the dried sap of a tree of the species Commiphora myrrha.",
    pronunciation: "/[mɜː(ɹ)]/",
    englishEquivalent: "myrrh"
  },
  {
    word: "ballerinas",
    definition: "Definition: A female ballet dancer",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "ballerinas"
  },
  {
    word: "stall",
    definition: "Definition: A compartment for a single animal in a stable or cattle shed.",
    pronunciation: "/stɔːl/",
    englishEquivalent: "stall"
  },
  {
    word: "alevin",
    definition: "Definition: Newly hatched fish, especially salmon.",
    pronunciation: "/ˈæl.ə.vən/",
    englishEquivalent: "alevin"
  },
  {
    word: "mentor",
    definition: "Definition: A wise and trusted counselor or teacher",
    pronunciation: "/ˈmɛn.tɔː/",
    englishEquivalent: "mentor"
  },
  {
    word: "oversupply",
    definition: "Definition: An excessive supply.",
    pronunciation: "/əʊvəsəˈplʌɪ/",
    englishEquivalent: "oversupply"
  },
  {
    word: "pasteurized",
    definition: "Definition: To heat food for the purpose of killing harmful organisms such as bacteria, viruses, protozoa, molds, and yeasts.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pasteurized"
  },
  {
    word: "preferable",
    definition: "Definition: Better than some other option; preferred.",
    pronunciation: "/pɹəˈfɜːɹəb(ə)l/",
    englishEquivalent: "preferable"
  },
  {
    word: "ironize",
    definition: "Definition: To use irony",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "ironize"
  },
  {
    word: "revved",
    definition: "Definition: To increase the speed of a motor, or to operate at a higher speed.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "revved"
  },
  {
    word: "differing",
    definition: "Definition: Not to have the same traits or characteristics; to be unalike or distinct.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "differing"
  },
  {
    word: "bridge",
    definition: "Definition: A construction or natural feature that spans a divide.",
    pronunciation: "/bɹɪd͡ʒ/",
    englishEquivalent: "bridge"
  },
  {
    word: "ladrone",
    definition: "Definition: A robber; a pirate; a rascal or rogue.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "ladrone"
  },
  {
    word: "caressed",
    definition: "Definition: To touch or kiss lovingly; to fondle.",
    pronunciation: "/kəˈɹɛst/",
    englishEquivalent: "caressed"
  },
  {
    word: "snowberries",
    definition: "Definition: A shrub bearing white berries:",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "snowberries"
  },
  {
    word: "elaborate",
    definition: "Definition: To develop in detail or complexity",
    pronunciation: "/ɪˈlæbəɹeɪt/",
    englishEquivalent: "elaborate"
  },
  {
    word: "plunking",
    definition: "Definition: To drop or throw something heavily onto or into something else, so that it makes a dull sound.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "plunking"
  },
  {
    word: "doodled",
    definition: "Definition: To draw or scribble aimlessly.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "doodled"
  },
  {
    word: "radicals",
    definition: "Definition: (historical: 19th-century Britain) A member of the most progressive wing of the Liberal Party; someone favouring social reform (but generally stopping short of socialism).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "radicals"
  },
  {
    word: "yell",
    definition: "Definition: A shout.",
    pronunciation: "/jɛl/",
    englishEquivalent: "yell"
  },
  {
    word: "enveloped",
    definition: "Definition: To surround or enclose.",
    pronunciation: "/ɪnˈvɛləpt/",
    englishEquivalent: "enveloped"
  },
  {
    word: "yabby",
    definition: "Definition: A freshwater Australian crayfish of the genus Cherax, especially Cherax destructor.",
    pronunciation: "/ˈjæb.i/",
    englishEquivalent: "yabby"
  },
  {
    word: "pleasantry",
    definition: "Definition: A casual, courteous remark.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pleasantry"
  },
  {
    word: "stinker",
    definition: "Definition: A person who stinks.",
    pronunciation: "/stɪŋ.kə(ɹ)/",
    englishEquivalent: "stinker"
  },
  {
    word: "sleeked",
    definition: "Definition: To make smooth or glossy; to polish or cause to be attractive.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sleeked"
  },
  {
    word: "datebooks",
    definition: "Definition: A book in which appointments are kept, each listed beside the day when it occurs.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "datebooks"
  },
  {
    word: "monarchist",
    definition: "Definition: An advocate of, or believer in, monarchy.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "monarchist"
  },
  {
    word: "campgrounds",
    definition: "Definition: An area where tents are pitched.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "campgrounds"
  },
  {
    word: "whetting",
    definition: "Definition: To hone or rub on with some substance, as a piece of stone, for the purpose of sharpening – see whetstone.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "whetting"
  },
  {
    word: "apostatise",
    definition: "Definition: To give up or renounce one's position or belief.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "apostatise"
  },
  {
    word: "phosphite",
    definition: "Definition: Any salt or ester of phosphorous acid",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "phosphite"
  },
  {
    word: "guaranteed",
    definition: "Definition: To give an assurance that something will be done right.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "guaranteed"
  },
  {
    word: "biophilia",
    definition: "Definition: Hypochondria.",
    pronunciation: "/ˈbaɪəʊˌfɪil.i.ə/",
    englishEquivalent: "biophilia"
  },
  {
    word: "vitriolic",
    definition: "Definition: Of or pertaining to vitriol; derived from or resembling vitriol.",
    pronunciation: "/vɪtɹɪˈɒlɪk/",
    englishEquivalent: "vitriolic"
  },
  {
    word: "vaporetto",
    definition: "Definition: A public water bus, originally steam-powered, found especially in Venice.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "vaporetto"
  },
  {
    word: "girdling",
    definition: "Definition: To gird, encircle, or constrain by such means.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "girdling"
  },
  {
    word: "shears",
    definition: "Definition: A cutting tool similar to scissors, but often larger.",
    pronunciation: "/ˈʃɪəz/",
    englishEquivalent: "shears"
  },
  {
    word: "diffuser",
    definition: "Definition: Any person or thing that diffuses.",
    pronunciation: "/dɪˈfjuːzə(ɹ)/",
    englishEquivalent: "diffuser"
  },
  {
    word: "estreats",
    definition: "Definition: To extract or take out from the records of a court, and send up to the court of exchequer to be enforced; said of a forfeited recognizance.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "estreats"
  },
  {
    word: "madrepore",
    definition: "Definition: A coral of the genus Madrepora or of the larger group Madreporaria.",
    pronunciation: "/ˈmædɹɪpɔː(ɹ)/",
    englishEquivalent: "madrepore"
  },
  {
    word: "northwestern",
    definition: "Definition: Of or pertaining to the northwest; from or to in such a direction.",
    pronunciation: "/nɔːθˈwɛst.ə(ɹ)n/",
    englishEquivalent: "northwestern"
  },
  {
    word: "corbeled",
    definition: "Definition: Having corbels.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "corbeled"
  },
  {
    word: "sensorineural",
    definition: "Definition: Of or pertaining to the sensory nerves",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "sensorineural"
  },
  {
    word: "oaters",
    definition: "Definition: (entertainment) A movie or television show about cowboy or frontier life; a western movie.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "oaters"
  },
  {
    word: "tiger",
    definition: "Definition: Panthera tigris, a large predatory mammal of the cat family, indigenous to Asia.",
    pronunciation: "/ˈtaɪɡə/",
    englishEquivalent: "tiger"
  },
  {
    word: "snowflakes",
    definition: "Definition: A crystal of snow, having approximate hexagonal symmetry.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "snowflakes"
  },
  {
    word: "draw",
    definition: "Definition: The result of a contest that neither side has won; a tie.",
    pronunciation: "/dɹɔː/",
    englishEquivalent: "draw"
  },
  {
    word: "disabusing",
    definition: "Definition: To free (someone) of a misconception or misapprehension; to unveil a falsehood held by (somebody).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "disabusing"
  },
  {
    word: "haloing",
    definition: "Definition: To encircle with a halo.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "haloing"
  },
  {
    word: "reverberates",
    definition: "Definition: To ring or sound with many echos.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "reverberates"
  },
  {
    word: "cook",
    definition: "Definition: A person who prepares food.",
    pronunciation: "/kuːk/",
    englishEquivalent: "cook"
  },
  {
    word: "obliterated",
    definition: "Definition: To remove completely, leaving no trace; to wipe out; to destroy.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "obliterated"
  },
  {
    word: "teraph",
    definition: "Definition: An image of a Semitic household god.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "teraph"
  },
  {
    word: "counsellors",
    definition: "Definition: A professional who counsels people, especially on personal problems.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "counsellors"
  },
  {
    word: "muffling",
    definition: "Definition: To wrap (a person, face etc.) in fabric or another covering, for warmth or protection; often with up.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "muffling"
  },
  {
    word: "cope",
    definition: "Definition: To deal effectively with something, especially if difficult.",
    pronunciation: "/kəʊp/",
    englishEquivalent: "cope"
  },
  {
    word: "recriminate",
    definition: "Definition: To accuse in return, state an accusation in return.",
    pronunciation: "/ɹɪˈkɹɪmɪneɪt/",
    englishEquivalent: "recriminate"
  },
  {
    word: "supernatural",
    definition: "Definition: A supernatural being",
    pronunciation: "/ˌs(j)ʉːpɘˈnɛtʃɹɯ(l)/",
    englishEquivalent: "supernatural"
  },
  {
    word: "shortsighted",
    definition: "Definition: Near-sighted; myopic; unable to focus on distant objects.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "shortsighted"
  },
  {
    word: "specie",
    definition: "Definition: Type or kind, in various uses of the phrase in specie.",
    pronunciation: "/ˈspiːʃi/",
    englishEquivalent: "specie"
  },
  {
    word: "telic",
    definition: "Definition: Tending or directed towards a goal or specific end.",
    pronunciation: "/ˈtiːlɪk/",
    englishEquivalent: "telic"
  },
  {
    word: "overmaster",
    definition: "Definition: To overpower or overwhelm.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "overmaster"
  },
  {
    word: "woolen",
    definition: "Definition: An item of clothing made from wool",
    pronunciation: "/ˈwʊlən/",
    englishEquivalent: "woolen"
  },
  {
    word: "genres",
    definition: "Definition: A kind; a stylistic category or sort, especially of literature or other artworks.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "genres"
  },
  {
    word: "crofters",
    definition: "Definition: One who has the tenure of a croft, usually also the occupant and user.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "crofters"
  },
  {
    word: "remounting",
    definition: "Definition: To go up again; to rise another time.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "remounting"
  },
  {
    word: "ineffaceable",
    definition: "Definition: Incapable of being effaced.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "ineffaceable"
  },
  {
    word: "logged",
    definition: "Definition: To cut trees into logs.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "logged"
  },
  {
    word: "spazzes",
    definition: "Definition: A stupid or incompetent person.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "spazzes"
  },
  {
    word: "splurging",
    definition: "Definition: To (cause to) gush; to flow or move in a rush.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "splurging"
  },
  {
    word: "rootle",
    definition: "Definition: (of an animal) to dig into the ground, with the snout.",
    pronunciation: "/ˈɹuːtəl/",
    englishEquivalent: "rootle"
  },
  {
    word: "undercool",
    definition: "Definition: To cool insufficiently",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "undercool"
  },
  {
    word: "overlaying",
    definition: "Definition: To lay, spread, or apply something over or across; cover.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "overlaying"
  },
  {
    word: "prophage",
    definition: "Definition: The latent form of a bacteriophage in which the viral genome is inserted into the host chromosome.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "prophage"
  },
  {
    word: "tyrannosauruses",
    definition: "Definition: A large carnivorous dinosaur, of the genus Tyrannosaurus, found in North America during the late Cretaceous period.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tyrannosauruses"
  },
  {
    word: "speared",
    definition: "Definition: To pierce with a spear.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "speared"
  },
  {
    word: "swaps",
    definition: "Definition: To exchange or give (something) in an exchange (for something else).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "swaps"
  },
  {
    word: "masterminds",
    definition: "Definition: A person with an extraordinary intellect or skill that is markedly superior to his or her peers.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "masterminds"
  },
  {
    word: "kittens",
    definition: "Definition: A young cat, especially before sexual maturity (reached at about seven months).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "kittens"
  },
  {
    word: "vocational",
    definition: "Definition: Of or pertaining to a vocation.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "vocational"
  },
  {
    word: "covin",
    definition: "Definition: Fraud, deception.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "covin"
  },
  {
    word: "paintbrush",
    definition: "Definition: A thin brush for applying paint.",
    pronunciation: "/ˈpeɪntˌbɹʌʃ/",
    englishEquivalent: "paintbrush"
  },
  {
    word: "comelier",
    definition: "Definition: (of a person) Pleasing or attractive to the eye.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "comelier"
  },
  {
    word: "howffs",
    definition: "Definition: Tavern; public house",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "howffs"
  },
  {
    word: "kohlrabi",
    definition: "Definition: Brassica oleracea var. gongylodes, a variety of the cabbage, having a turnip-shaped edible stem.",
    pronunciation: "/kəʊlˈɹɑː.bi/",
    englishEquivalent: "kohlrabi"
  },
  {
    word: "vervets",
    definition: "Definition: A small African monkey, Cercopithecus aethiops or Chlorocebus pygerythrus, having a long tail, a black face with white cheek tufts and a greenish-brown coat",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "vervets"
  },
  {
    word: "unwholesome",
    definition: "Definition: Not wholesome; unfavorable to health; unhealthful.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "unwholesome"
  },
  {
    word: "orectic",
    definition: "Definition: Of or pertaining to desire or appetite",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "orectic"
  },
  {
    word: "tipsiest",
    definition: "Definition: Slightly drunk, fuddled, staggering, foolish as a result of drinking alcoholic beverages",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tipsiest"
  },
  {
    word: "consuetudes",
    definition: "Definition: Custom, familiarity.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "consuetudes"
  },
  {
    word: "oka",
    definition: "Definition: A former Turkish, Egyptian, Hungarian, and Romanian unit of weight, usually of a little more than a kilogram.",
    pronunciation: "/ˈɒkə/",
    englishEquivalent: "oka"
  },
  {
    word: "catheterizes",
    definition: "Definition: To introduce a catheter into part of the body.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "catheterizes"
  },
  {
    word: "indulges",
    definition: "Definition: (often followed by "in"): To yield to a temptation or desire.",
    pronunciation: "/ɪnˈdʌldʒɪz/",
    englishEquivalent: "indulges"
  },
  {
    word: "levers",
    definition: "Definition: (except in generalized senses below) A crowbar.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "levers"
  },
  {
    word: "heraldic",
    definition: "Definition: Of, or relating to heraldry or heralds.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "heraldic"
  },
  {
    word: "differentially",
    definition: "Definition: In a differential manner",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "differentially"
  },
  {
    word: "futurism",
    definition: "Definition: An early 20th century avant-garde art movement focused on speed, the mechanical, and the modern, which took a deeply antagonistic attitude to traditional artistic conventions.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "futurism"
  },
  {
    word: "mazuma",
    definition: "Definition: Cash, money.",
    pronunciation: "/məˈzuːmə/",
    englishEquivalent: "mazuma"
  },
  {
    word: "coroners",
    definition: "Definition: A public official who presides over an inquest into unnatural deaths, cases of treasure trove, and debris from shipwrecks.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "coroners"
  },
  {
    word: "liquefactions",
    definition: "Definition: Process of being, or state of having been, made liquid (from either a solid or a gas)",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "liquefactions"
  },
  {
    word: "corncobs",
    definition: "Definition: The central cylindrical core of an ear of corn (maize) on which the kernels are attached in rows.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "corncobs"
  },
  {
    word: "draw",
    definition: "Definition: The result of a contest that neither side has won; a tie.",
    pronunciation: "/dɹɔː/",
    englishEquivalent: "draw"
  },
  {
    word: "tittered",
    definition: "Definition: To laugh or giggle in a somewhat subdued or restrained way, as from nervousness or poorly-suppressed amusement.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tittered"
  },
  {
    word: "volvuluses",
    definition: "Definition: Obstruction of the bowel in which a loop of bowel has abnormally twisted on itself.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "volvuluses"
  },
  {
    word: "caterwauling",
    definition: "Definition: To cry as cats in heat; to make a harsh, offensive noise.",
    pronunciation: "/ˈkætəɹˌwɑlɪŋ/",
    englishEquivalent: "caterwauling"
  },
  {
    word: "startups",
    definition: "Definition: The act or process of starting a process or machine.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "startups"
  },
  {
    word: "swindle",
    definition: "Definition: An instance of swindling.",
    pronunciation: "/ˈswɪnd(ə)l/",
    englishEquivalent: "swindle"
  },
  {
    word: "tiglons",
    definition: "Definition: A fertile hybrid cross between a male tiger (Panthera tigris) and a lioness (Panthera leo).",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tiglons"
  },
  {
    word: "visibility",
    definition: "Definition: The condition of being visible.",
    pronunciation: "/ˌvɪz.əˈbɪl.ə.ti/",
    englishEquivalent: "visibility"
  },
  {
    word: "flimsier",
    definition: "Definition: Likely to bend or break under pressure.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "flimsier"
  },
  {
    word: "chinch",
    definition: "Definition: The bedbug (Cimex lectularius).",
    pronunciation: "/tʃɪntʃ/",
    englishEquivalent: "chinch"
  },
  {
    word: "nuns",
    definition: "Definition: A member of a Christian religious community of women who live by certain vows and usually wear a habit, (specifically) those living together in a cloister.",
    pronunciation: "/nʌnz/",
    englishEquivalent: "nuns"
  },
  {
    word: "recrudescences",
    definition: "Definition: The condition or state being recrudescent; the condition of something (often undesirable) breaking out again, or re-emerging after temporary abatement or suppression.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "recrudescences"
  },
  {
    word: "grouchier",
    definition: "Definition: (originally student slang) Irritable; easily upset; angry; tending to complain.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "grouchier"
  },
  {
    word: "reassures",
    definition: "Definition: To assure anew; to restore confidence to; to free from fear or self-doubt.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "reassures"
  },
  {
    word: "variation",
    definition: "Definition: The act of varying; a partial change in the form, position, state, or qualities of a thing.",
    pronunciation: "/ˌvɛəɹɪˈeɪʃn̩/",
    englishEquivalent: "variation"
  },
  {
    word: "dramatized",
    definition: "Definition: To adapt a literary work so that it can be performed in the theatre, or on radio or television",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "dramatized"
  },
  {
    word: "waistlines",
    definition: "Definition: A line around the body at the waist; its measurement",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "waistlines"
  },
  {
    word: "washout",
    definition: "Definition: An appliance designed to wash something out.",
    pronunciation: "/ˈwɒʃaʊt/",
    englishEquivalent: "washout"
  },
  {
    word: "crescendoed",
    definition: "Definition: To increase in intensity; to reach or head for a crescendo.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "crescendoed"
  },
  {
    word: "bearish",
    definition: "Definition: Resembling or likened to a bear, typically in being rough, surly, or clumsy.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "bearish"
  },
  {
    word: "coigns",
    definition: "Definition: A projecting corner or angle; a cornerstone.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "coigns"
  },
  {
    word: "jogged",
    definition: "Definition: To push slightly; to move or shake with a push or jerk, as to gain the attention of; to jolt.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "jogged"
  },
  {
    word: "eyas",
    definition: "Definition: A young hawk or falcon in the nest, or that has not yet fledged, especially one that will be trained for falconry.",
    pronunciation: "/ˈaɪəs/",
    englishEquivalent: "eyas"
  },
  {
    word: "acidifications",
    definition: "Definition: The act or process of making something sour (acidifying), or changing into an acid.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "acidifications"
  },
  {
    word: "quaternary",
    definition: "Definition: A quaternary compound.",
    pronunciation: "/kwəˈtɜːnəɹi/",
    englishEquivalent: "quaternary"
  },
  {
    word: "drunker",
    definition: "Definition: Intoxicated as a result of excessive alcohol consumption, usually by drinking alcoholic beverages.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "drunker"
  },
  {
    word: "autarky",
    definition: "Definition: National economic self-sufficiency.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "autarky"
  },
  {
    word: "pozzolana",
    definition: "Definition: A type of volcanic ash used for mortar or for cement which sets under water.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pozzolana"
  },
  {
    word: "poseurs",
    definition: "Definition: One who affects some behaviour, style, attitude or other condition, often to impress or influence others.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "poseurs"
  },
  {
    word: "purpura",
    definition: "Definition: The appearance of red or purple discolorations on the skin that do not blanch when pressure is applied, caused by subdermal bleeding.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "purpura"
  },
  {
    word: "tamperproof",
    definition: "Definition: Resistant to tampering",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "tamperproof"
  },
  {
    word: "teenager",
    definition: "Definition: A person between 13 and 19 years of age; an adolescent.",
    pronunciation: "/ˈtiːnˌeɪ.dʒə(ɹ)/",
    englishEquivalent: "teenager"
  },
  {
    word: "indicted",
    definition: "Definition: To accuse of wrongdoing; charge.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "indicted"
  },
  {
    word: "floppy",
    definition: "Definition: A floppy disk.",
    pronunciation: "/ˈflɒ.pi/",
    englishEquivalent: "floppy"
  },
  {
    word: "barratry",
    definition: "Definition: The act of persistently instigating lawsuits, often groundless ones.",
    pronunciation: "/ˈbæɹətɹi/",
    englishEquivalent: "barratry"
  },
  {
    word: "chubbiest",
    definition: "Definition: Of a person: slightly overweight, somewhat fat, and hence plump, rounded, and soft.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "chubbiest"
  },
  {
    word: "timeouts",
    definition: "Definition: A short break in the action of a sport, for substitution, consultation, etc.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "timeouts"
  },
  {
    word: "galumphing",
    definition: "Definition: To move heavily and clumsily, or with a sense of prancing and triumph.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "galumphing"
  },
  {
    word: "firmest",
    definition: "Definition: Steadfast, secure, solid (in position)",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "firmest"
  },
  {
    word: "dreariest",
    definition: "Definition: Drab; dark, colorless, or cheerless.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "dreariest"
  },
  {
    word: "whitewood",
    definition: "Definition: Any of several deciduous trees that are used for furniture, especially the tulip tree.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "whitewood"
  },
  {
    word: "skipjack",
    definition: "Definition: Any of several unrelated fish.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "skipjack"
  },
  {
    word: "pomanders",
    definition: "Definition: A mixture of aromatic substances, made into a ball and carried by a person to impart a sweet smell or as a protection against infection.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "pomanders"
  },
  {
    word: "gibed",
    definition: "Definition: Alternative spelling of gybe",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "gibed"
  },
  {
    word: "hyaline",
    definition: "Definition: Anything glassy, translucent or transparent; the sea or sky.",
    pronunciation: "/ˈhaɪəliːn/",
    englishEquivalent: "hyaline"
  },
  {
    word: "boosted",
    definition: "Definition: To lift or push from behind (one who is endeavoring to climb); to push up.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "boosted"
  },
  {
    word: "bacteriostat",
    definition: "Definition: A biological or chemical agent that causes bacteriostasis.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "bacteriostat"
  },
  {
    word: "statins",
    definition: "Definition: Any of a class of drugs (chiefly lactones or pyrroles) that lower the amount of cholesterol in the blood by inhibiting an enzyme involved in its biosynthesis.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "statins"
  },
  {
    word: "extraditing",
    definition: "Definition: To remove a person from one state to another by legal process.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "extraditing"
  },
  {
    word: "graben",
    definition: "Definition: An elongated block of the Earth's crust, bounded by faults, that has dropped relative to the surrounding area.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "graben"
  },
  {
    word: "accoutrement",
    definition: "Definition: The act of accoutering.",
    pronunciation: "/əˈku.tɚ.mənt/",
    englishEquivalent: "accoutrement"
  },
  {
    word: "trochaics",
    definition: "Definition: A poetical composition of this kind.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "trochaics"
  },
  {
    word: "docs",
    definition: "Definition: A doctor.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "docs"
  },
  {
    word: "jeroboam",
    definition: "Definition: A bottle of champagne or Burgundy wine containing 3 liters of fluid, four times the volume of a standard bottle.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "jeroboam"
  },
  {
    word: "bibbing",
    definition: "Definition: To dress (somebody) in a bib.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "bibbing"
  },
  {
    word: "chandlers",
    definition: "Definition: A person who makes or sells candles",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "chandlers"
  },
  {
    word: "lifestyle",
    definition: "Definition: A style of living that reflects the attitudes and values of a person or group.",
    pronunciation: "/ˈlaɪfˌstaɪl/",
    englishEquivalent: "lifestyle"
  },
  {
    word: "assurance",
    definition: "Definition: The act of assuring; a declaration tending to inspire full confidence; that which is designed to give confidence.",
    pronunciation: "/əˈʃɔːɹəns/",
    englishEquivalent: "assurance"
  },
  {
    word: "stooging",
    definition: "Definition: To act as a straight man.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "stooging"
  },
  {
    word: "kickbacks",
    definition: "Definition: A backward kick, a retrograde movement of an extremity.",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "kickbacks"
  },
  {
    word: "reutilize",
    definition: "Definition: To use or utilize something again, or for another purpose",
    pronunciation: "/No pronunciation available/",
    englishEquivalent: "reutilize"
  },
    ],
    "Verdugo": [
        {
            word: "lágrima",
            definition: "Definition of tear: A hole or break caused by tearing. - (Un agujero o rotura causado por un desgarro.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "tear"
          },
          {
            word: "gratitud",
            definition: "Definition of gratitude: The state of being grateful. - (El estado de estar agradecido.)",
            pronunciation: "/ˈɡɹætɪt(j)ud/",
            englishEquivalent: "gratitude"
          },
          {
            word: "marino",
            definition: "Definition of Blue: The colour of the clear sky or the deep sea, between green and violet in the visible spectrum, and one of the primary additive colours for transmitted light; the colour obtained by subtracting red and green from white light using magenta and cyan filters; or any colour resembling this. - (El color del cielo claro o del mar profundo, entre el verde y el violeta en el espectro visible, y uno de los colores aditivos primarios para la luz transmitida; el color obtenido restando el rojo y el verde de la luz blanca utilizando filtros magenta y cian; o cualquier color que se parezca a este.)",
            pronunciation: "/bluː/",
            englishEquivalent: "Blue"
          },
          {
            word: "delincuentes",
            definition: "Definition of Criminals: A person who is guilty of a crime, notably breaking the law. - (Una persona que es culpable de un delito, en particular de infringir la ley.)",
            pronunciation: "/ˈkɹɪmɪnəlz/",
            englishEquivalent: "Criminals"
          },
          {
            word: "desolación",
            definition: "Definition of desolation: The act of desolating or laying waste; destruction of inhabitants; depopulation. - (El acto de desolación o devastación; destrucción de habitantes; despoblación.)",
            pronunciation: "/ˌdɛsəˈleɪʃən/",
            englishEquivalent: "desolation"
          },
          {
            word: "octarquía",
            definition: "Definition of octarchy: A group of eight states. - (Un grupo de ocho estados.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "octarchy"
          },
          {
            word: "aromatización",
            definition: "Definition of flavouring: To add flavoring to something. - (Para añadir sabor a algo.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "flavouring"
          },
          {
            word: "rapaz",
            definition: "Definition of predatory: Of, or relating to a predator. - (Perteneciente o relacionado con un depredador.)",
            pronunciation: "/ˈpɹedətəɹi/",
            englishEquivalent: "predatory"
          },
          {
            word: "ciegamente",
            definition: "Definition of blindly: In a blind manner; without sight; sightlessly. - (De manera ciega; sin vista; ciegos.)",
            pronunciation: "/ˈblaɪndli/",
            englishEquivalent: "blindly"
          },
          {
            word: "exageración",
            definition: "Definition of elevation: The act of raising from a lower place, condition, or quality to a higher; said of material things, persons, the mind, the voice, etc. - (El acto de elevarse de un lugar, condición o cualidad inferior a una más alta; dicho de las cosas materiales, las personas, la mente, la voz, etc.)",
            pronunciation: "/ˌɛlɪˈveɪʃən/",
            englishEquivalent: "elevation"
          },
          {
            word: "mujeres",
            definition: "Definition of women: An adult female human. - (Una mujer humana adulta.)",
            pronunciation: "/ˈwɪmən/",
            englishEquivalent: "women"
          },
          {
            word: "recaídas",
            definition: "Definition of Relapses: To fall back again; to slide or turn back into a former state or practice. - (Volver a caer; deslizarse o volver a un estado o práctica anterior.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "Relapses"
          },
          {
            word: "conformidad",
            definition: "Definition of accordance: Agreement; harmony; conformity; compliance. - (Acuerdo; armonía; conformidad; cumplimiento.)",
            pronunciation: "/ə.ˈkɔɹd.əns/",
            englishEquivalent: "accordance"
          },
          {
            word: "soborno",
            definition: "Definition of bribery: The making of illegal payment, or bribes, to persons in official positions as a means of influencing their decisions - (La realización de pagos ilegales, o sobornos, a personas en puestos oficiales como medio de influir en sus decisiones)",
            pronunciation: "/ˈbɹaɪbəɹi/",
            englishEquivalent: "bribery"
          },
          {
            word: "acumulado",
            definition: "Definition of accumulated: To heap up in a mass; to pile up; to collect or bring together (either literally or figuratively) - (Para amontonarse en una masa; para amontonarse; para recoger o reunir (ya sea literal o figurativamente))",
            pronunciation: "/əˈkjuːmjʊleɪtɪd/",
            englishEquivalent: "accumulated"
          },
          {
            word: "superando",
            definition: "Definition of Overcoming: To surmount (a physical or abstract obstacle); to prevail over, to get the better of. - (Superar (un obstáculo físico o abstracto); prevalecer sobre, sacar lo mejor de.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "Overcoming"
          },
          {
            word: "espeluznante",
            definition: "Definition of spooky: Eerie, or suggestive of ghosts or the supernatural. - (Extraño, o sugestivo de fantasmas o lo sobrenatural.)",
            pronunciation: "/spuːki/",
            englishEquivalent: "spooky"
          },
          {
            word: "mascones",
            definition: "Definition of mascons: A region within a solid astronomical body that is of higher density than the surrounding material. - (Una región dentro de un cuerpo astronómico sólido que es de mayor densidad que el material circundante.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "mascons"
          },
          {
            word: "ociosos",
            definition: "Definition of Loungers: One who lounges; an idler. - (Uno que descansa; un holgazán.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "Loungers"
          },
          {
            word: "frijoles",
            definition: "Definition of kidney beans: A variety of common bean, Phaseolus vulgaris, with a dark-red skin. - (Una variedad de frijol común, Phaseolus vulgaris, con una piel de color rojo oscuro.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "kidney beans"
          },
          {
            word: "carteles",
            definition: "Definition of posters: A picture of a celebrity, an event etc., intended to be attached to a wall. - (Una imagen de una celebridad, un evento, etc., destinada a ser pegada a una pared.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "posters"
          },
          {
            word: "encantador",
            definition: "Definition of lovely: An attractive, lovely person, especially a (professional) beauty. - (Una persona atractiva y encantadora, especialmente una belleza (profesional).)",
            pronunciation: "/ˈlʌvli/",
            englishEquivalent: "lovely"
          },
          {
            word: "carlingas",
            definition: "Definition of cockpits: The driver's compartment in a racing car (or, by extension, in a sports car or other automobile). - (El compartimento del conductor en un coche de carreras (o, por extensión, en un coche deportivo u otro automóvil).)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "cockpits"
          },
          {
            word: "asiduidad",
            definition: "Definition of assiduity: Great and persistent toil or effort. - (Gran y persistente trabajo o esfuerzo.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "assiduity"
          },
          {
            word: "Maltrato",
            definition: "Definition of Abuse: Improper treatment or usage; application to a wrong or bad purpose; an unjust, corrupt or wrongful practice or custom. - (Tratamiento o uso indebido; aplicación a un propósito incorrecto o malo; una práctica o costumbre injusta, corrupta o ilícita.)",
            pronunciation: "/əˈbjuːs/",
            englishEquivalent: "Abuse"
          },
          {
            word: "reapariciones",
            definition: "Definition of reappearances: The act of appearing again following absence - (El acto de comparecer de nuevo tras la ausencia)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "reappearances"
          },
          {
            word: "transpirado",
            definition: "Definition of transpired: To give off (vapour, waste matter etc.); to exhale (an odour etc.). - (Para desprender (vapor, materia de desecho, etc.); para exhalar (un olor, etc.).)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "transpired"
          },
          {
            word: "superposición",
            definition: "Definition of flash: A device that produces a short flash of light to help illuminate a scene, mostly for night-time or indoors photography. - (Un dispositivo que produce un breve destello de luz para ayudar a iluminar una escena, principalmente para la fotografía nocturna o en interiores.)",
            pronunciation: "/flæʃ/",
            englishEquivalent: "flash"
          },
          {
            word: "conquistado",
            definition: "Definition of conquered: To defeat in combat; to subjugate. - (Derrotar en combate; subyugar.)",
            pronunciation: "/ˈkɒŋkəd/",
            englishEquivalent: "conquered"
          },
          {
            word: "Reconocimiento",
            definition: "Definition of Acknowledgement: The act of acknowledging - (El acto de reconocer)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "Acknowledgement"
          },
          {
            word: "domiciliarios",
            definition: "Definition of Domiciliary: : A person who legally resides in a particular place. - (: Una persona que reside legalmente en un lugar en particular.)",
            pronunciation: "/ˌdɒmɪˈsɪli.əɹi/",
            englishEquivalent: "Domiciliary"
          },
          {
            word: "robo",
            definition: "Definition of Stealing: To take illegally, or without the owner's permission, something owned by someone else. - (Tomar ilegalmente, o sin el permiso del propietario, algo propiedad de otra persona.)",
            pronunciation: "/ˈstiːlɪŋ/",
            englishEquivalent: "Stealing"
          },
          {
            word: "etécnica",
            definition: "Definition of technical: A pickup truck with a gun mounted on it. - (Una camioneta con una pistola montada en ella.)",
            pronunciation: "/ˈtɛk.nɪk.əl/",
            englishEquivalent: "technical"
          },
          {
            word: "cofradías",
            definition: "Definition of Brotherhoods: The state of being brothers or a brother. - (El estado de ser hermanos o un hermano.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "Brotherhoods"
          },
          {
            word: "articulación",
            definition: "Definition of articulation: A joint or the collection of joints at which something is articulated, or hinged, for bending. - (Una junta o la colección de juntas en las que algo está articulado, o articulado, para doblarse.)",
            pronunciation: "/ɑːˌtɪk.jəˈleɪ.ʃən/",
            englishEquivalent: "articulation"
          },
          {
            word: "escolares",
            definition: "Definition of escolars: (also known as school children : a child attending school ) Lepidocybium flavobrunneum, one of the snake mackerels. - (Lepidocybium flavobrunneum, una de las caballas serpiente.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "escolars"
          },
          {
            word: "Empieza",
            definition: "Definition of Get started: To begin an activity - (Para comenzar una actividad)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "Get started"
          },
          {
            word: "solemnemente",
            definition: "Definition of solemnly: In a solemn manner. - (De manera solemne.)",
            pronunciation: "/ˈsɒləmli/",
            englishEquivalent: "solemnly"
          },
          {
            word: "espumada",
            definition: "Definition of foamed: To form or emit foam. - (Para formar o emitir espuma.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "foamed"
          },
          {
            word: "divisionistas",
            definition: "Definition of divisive: Having a quality that divides or separates - (Tener una cualidad que divide o separa)",
            pronunciation: "/dɪˈvɪsɪv/",
            englishEquivalent: "divisive"
          },
          {
            word: "pansexuales",
            definition: "Definition of pansexual: Someone who is attracted to all types of people regardless of gender. - (Alguien que se siente atraído por todo tipo de personas, independientemente de su género.)",
            pronunciation: "/pænˈsɛkʃuəl/",
            englishEquivalent: "pansexual"
          },
          {
            word: "injerto",
            definition: "Definition of graft: A small shoot or scion of a tree inserted in another tree, the stock of which is to support and nourish it. The two unite and become one tree, but the graft determines the kind of fruit. - (Un pequeño brote o vástago de un árbol insertado en otro árbol, cuyo tronco es para apoyarlo y nutrirlo. Los dos se unen y se convierten en un árbol, pero el injerto determina el tipo de fruta.)",
            pronunciation: "/ɡɹæft/",
            englishEquivalent: "graft"
          },
          {
            word: "personal",
            definition: "Definition of required: To ask (someone) for something; to request. - (Pedirle algo a (alguien); pedir.)",
            pronunciation: "/ɹɪˈkwaɪəd/",
            englishEquivalent: "required"
          },
          {
            word: "Reído",
            definition: "Definition of Laughed: To show mirth, satisfaction, or derision, by peculiar movement of the muscles of the face, particularly of the mouth, causing a lighting up of the face and eyes, and usually accompanied by the emission of explosive or chuckling sounds from the chest and throat; to indulge in laughter. - (Para mostrar alegría, satisfacción o burla, por el movimiento peculiar de los músculos de la cara, particularmente de la boca, causando una iluminación de la cara y los ojos, y generalmente acompañado por la emisión de sonidos explosivos o de risa desde el pecho y la garganta; para disfrutar de la risa.)",
            pronunciation: "/lɑːft/",
            englishEquivalent: "Laughed"
          },
          {
            word: "progresistas",
            definition: "Definition of Progressivism: A political ideology that favours progress towards better conditions in society. - (Una ideología política que favorece el progreso hacia mejores condiciones en la sociedad.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "Progressivism"
          },
          {
            word: "ortodox",
            definition: "Definition of orthodox: Conforming to the accepted, established, or traditional doctrines of a given faith, religion, or ideology. - (Conforme a las doctrinas aceptadas, establecidas o tradicionales de una fe, religión o ideología determinada.)",
            pronunciation: "/ˈɔːθədɒks/",
            englishEquivalent: "orthodox"
          },
          {
            word: "Fallo",
            definition: "Definition of Fail: Poor quality; substandard workmanship. - (Mala calidad; mano de obra deficiente.)",
            pronunciation: "/feɪl/",
            englishEquivalent: "Fail"
          },
          {
            word: "escoria",
            definition: "Definition of clinker: A very hard brick used for paving customarily made in the Netherlands. - (Un ladrillo muy duro utilizado para pavimentar hecho habitualmente en los Países Bajos.)",
            pronunciation: "/klɪŋkə/",
            englishEquivalent: "clinker"
          },
          {
            word: "ellipsoide",
            definition: "Definition of ellipsoid: A surface, all of whose cross sections are elliptic or circular (including the sphere), that generalises the ellipse and in Cartesian coordinates (x, y, z) is a quadric with equation x2/a2 + y2/b2 + z2/c2 = 0. - (Una superficie, todas cuyas secciones transversales son elípticas o circulares (incluida la esfera), que generaliza la elipse y en coordenadas cartesianas (x, y, z) es una cuádrica con la ecuación x2/a2 + y2/b2 + z2/c2 = 0.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "ellipsoid"
          },
          {
            word: "cronógrafos",
            definition: "Definition of chronographs: A chronogram. - (Un cronograma.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "chronographs"
          },
          {
            word: "hada",
            definition: "Definition of Fairy: The realm of faerie; enchantment, illusion. - (El reino de las hadas; encantamiento, ilusión.)",
            pronunciation: "/ˈfɛə̯ɹi/",
            englishEquivalent: "Fairy"
          },
          {
            word: "ficciones",
            definition: "Definition of Fictions: Literary type using invented or imaginative writing, instead of real facts, usually written as prose. - (Tipo literario que utiliza escritura inventada o imaginativa, en lugar de hechos reales, generalmente escritos en prosa.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "Fictions"
          },
          {
            word: "petrogénesis",
            definition: "Definition of petrogenesis: The branch of petrology dealing with the origin of igneous rocks. - (La rama de la petrología que se ocupa del origen de las rocas ígneas.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "petrogenesis"
          },
          {
            word: "mujer",
            definition: "Definition of women: An adult female human. - (Una mujer humana adulta.)",
            pronunciation: "/ˈwɪmən/",
            englishEquivalent: "women"
          },
          {
            word: "vigilantes",
            definition: "Definition of watchers: Someone who watches or observes. - (Alguien que mira u observa.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "watchers"
          },
          {
            word: "colosales",
            definition: "Definition of colossal: Extremely large or on a great scale. - (Extremadamente grande o a gran escala.)",
            pronunciation: "/kəˈlɒsəl/",
            englishEquivalent: "colossal"
          },
          {
            word: "subescalas",
            definition: "Definition of Subscales: A subdivision of a scale. - (Una subdivisión de una escala.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "Subscales"
          },
          {
            word: "automatismo",
            definition: "Definition of automatism: Acting automatically or involuntarily. - (Actuar de forma automática o involuntaria.)",
            pronunciation: "/ɔːˈtɒmətɪzəm/",
            englishEquivalent: "automatism"
          },
          {
            word: "glucanes",
            definition: "Definition of glucans: Any polysaccharide that is a polymer of glucose - (Cualquier polisacárido que sea un polímero de glucosa)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "glucans"
          },
          {
            word: "necesitado",
            definition: "Definition of needful: Ready money; wherewithal. - (Dinero listo; con qué medios.)",
            pronunciation: "/ˈniːdfəl/",
            englishEquivalent: "needful"
          },
          {
            word: "Cuarto",
            definition: "Definition of Fourth: (not used in the plural) The person or thing in the fourth position. - ((no se usa en plural) La persona o cosa en la cuarta posición.)",
            pronunciation: "/fɔːθ/",
            englishEquivalent: "Fourth"
          },
          {
            word: "alergistas",
            definition: "Definition of allergists: A doctor who specializes in the treatment of allergies. - (Médico especializado en el tratamiento de alergias.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "allergists"
          },
          {
            word: "anestesia",
            definition: "Definition of anaesthesia: An artificial method of preventing sensation, used to eliminate pain without causing loss of vital functions, by the administration of one or more agents which block pain impulses before transmitted to the brain. - (Un método artificial para prevenir la sensación, utilizado para eliminar el dolor sin causar pérdida de funciones vitales, mediante la administración de uno o más agentes que bloquean los impulsos de dolor antes de transmitirlos al cerebro.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "anaesthesia"
          },
          {
            word: "plegables",
            definition: "Definition of Accordions: A small, portable, keyed wind instrument, whose tones are generated by play of the wind from a squeezed bellows upon free metallic reeds. - (Un instrumento de viento pequeño, portátil y con teclas, cuyos tonos se generan por el juego del viento a partir de un fuelle apretado sobre lengüetas metálicas libres.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "Accordions"
          },
          {
            word: "superávit",
            definition: "Definition of surplus: That which remains when use or need is satisfied, or when a limit is reached; excess; overplus. - (Lo que queda cuando se satisface el uso o la necesidad, o cuando se alcanza un límite; exceso; sobreexceso.)",
            pronunciation: "/ˈsɜːpləs/",
            englishEquivalent: "surplus"
          },
          {
            word: "adductores",
            definition: "Definition of adductors: A muscle which draws a limb or part of the body toward the middle line of the body, or closes extended parts of the body; -- opposed to abductor - (Un músculo que atrae una extremidad o parte del cuerpo hacia la línea media del cuerpo, o cierra partes extendidas del cuerpo; -- opuesto al abductor)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "adductors"
          },
          {
            word: "mujer",
            definition: "Definition of women: An adult female human. - (Una mujer humana adulta.)",
            pronunciation: "/ˈwɪmən/",
            englishEquivalent: "women"
          },
          {
            word: "digresiones",
            definition: "Definition of Digression: An aside, an act of straying from the main subject in speech or writing. - (Un aparte, un acto de alejamiento del tema principal en el habla o la escritura.)",
            pronunciation: "/dɪˈɡɹɛʃən/",
            englishEquivalent: "Digression"
          },
          {
            word: "calumnias",
            definition: "Definition of Slander: A false or unsupported, malicious statement (spoken, not written), especially one which is injurious to a person's reputation; the making of such a statement. - (Una declaración falsa o no respaldada, maliciosa (hablada, no escrita), especialmente una que es perjudicial para la reputación de una persona; la realización de dicha declaración.)",
            pronunciation: "/ˈslændɚ/",
            englishEquivalent: "Slander"
          },
          {
            word: "estratagemas",
            definition: "Definition of stratagems: A tactic or artifice designed to gain the upper hand, especially one involving underhanded dealings or deception. - (Una táctica o artificio diseñado para ganar ventaja, especialmente uno que involucra tratos o engaños solapados.)",
            pronunciation: "/ˈstɹæt.ə.dʒəmz/",
            englishEquivalent: "stratagems"
          },
          {
            word: "resistente",
            definition: "Definition of resistant: A person who resists; especially a member of a resistance movement. - (Una persona que se resiste; especialmente un miembro de un movimiento de resistencia.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "resistant"
          },
          {
            word: "implosivo",
            definition: "Definition of Implosion: The inrush of air in forming a suction stop. - (La entrada de aire en la formación de un tope de succión.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "Implosion"
          },
          {
            word: "sucio",
            definition: "Definition of dirty: To make (something) dirty. - (Para ensuciar (algo).)",
            pronunciation: "/ˈdɜːti/",
            englishEquivalent: "dirty"
          },
          {
            word: "histriónico",
            definition: "Definition of Histrionic: Of or relating to actors or acting. - (Perteneciente o relativo a actores o actores.)",
            pronunciation: "/hɪstɹiːˈɒnɪk/",
            englishEquivalent: "Histrionic"
          },
          {
            word: "tranquilizado",
            definition: "Definition of relieved: To ease (a person, person's thoughts etc.) from mental distress; to stop (someone) feeling anxious or worried, to alleviate the distress of. - (Para aliviar (una persona, los pensamientos de la persona, etc.) de la angustia mental; para evitar que (alguien) se sienta ansioso o preocupado, para aliviar la angustia de.)",
            pronunciation: "/ɹɪˈliːvd/",
            englishEquivalent: "relieved"
          },
          {
            word: "Fecha-límite",
            definition: "Definition of Deadline: A time limit in the form of a date on or before which something must be completed. - (Un límite de tiempo en forma de una fecha en o antes de la cual se debe completar algo.)",
            pronunciation: "/ˈdɛdˌlaɪn/",
            englishEquivalent: "Deadline"
          },
          {
            word: "misericordia",
            definition: "Definition of mercy: Relenting; forbearance to cause or allow harm to another. - (Ceder; abstenerse de causar o permitir daño a otro.)",
            pronunciation: "/ˈmɜːsi/",
            englishEquivalent: "mercy"
          },
          {
            word: "inalterable",
            definition: "Definition of unalterable: Incapable of changing or being altered - (Incapaz de cambiar o ser alterado)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "unalterable"
          },
          {
            word: "destitución",
            definition: "Definition of dismissal: The act of sending someone away. - (El acto de enviar a alguien lejos.)",
            pronunciation: "/[dɪsˈmɪsəɫ]/",
            englishEquivalent: "dismissal"
          },
          {
            word: "entretejidos",
            definition: "Definition of interwoven: To combine through weaving. - (Para combinar a través del tejido.)",
            pronunciation: "/ˈɪntəɹwəʊvən/",
            englishEquivalent: "interwoven"
          },
          {
            word: "concursante",
            definition: "Definition of Contestant: A participant in a contest; specifically, a person who plays a game, as on a TV game show. - (Un participante en un concurso; específicamente, una persona que juega un juego, como en un programa de juegos de televisión.)",
            pronunciation: "/kənˈtɛstənt/",
            englishEquivalent: "Contestant"
          },
          {
            word: "saturnismo",
            definition: "Definition of lead poisoning: A chronic intoxication produced by the absorption of lead into the body, characterized by severe colicky pains, a dark line along the gums, and local muscular paralysis. - (Una intoxicación crónica producida por la absorción de plomo en el cuerpo, caracterizada por fuertes dolores cólicos, una línea oscura a lo largo de las encías y parálisis muscular local.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "lead poisoning"
          },
          {
            word: "druida",
            definition: "Definition of Druid: One of an order of priests among certain groups of Celts before the adoption of Abrahamic religions. - (Uno de una orden de sacerdotes entre ciertos grupos de celtas antes de la adopción de las religiones abrahámicas.)",
            pronunciation: "/ˈdɹuː.ɪd/",
            englishEquivalent: "Druid"
          },
          {
            word: "barbarie",
            definition: "Definition of Barbarian: A non-Greek or a non-Roman. - (Un no griego o un no romano.)",
            pronunciation: "/bɑː(ɹ).ˈbɛə.ɹi.ən/",
            englishEquivalent: "Barbarian"
          },
          {
            word: "velas",
            definition: "Definition of candles: A light source consisting of a wick embedded in a solid, flammable substance such as wax, tallow, or paraffin. - (Una fuente de luz que consiste en una mecha incrustada en una sustancia sólida inflamable como cera, sebo o parafina.)",
            pronunciation: "/ˈkændl̩z/",
            englishEquivalent: "candles"
          },
          {
            word: "monoplano",
            definition: "Definition of monoplane: An airplane that has a single pair of wings - (Un avión que tiene un solo par de alas)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "monoplane"
          },
          {
            word: "estivada",
            definition: "Definition of summery: Relating to the summer. - (En relación con el verano.)",
            pronunciation: "/ˈsʌməɹi/",
            englishEquivalent: "summery"
          },
          {
            word: "mielomas",
            definition: "Definition of myelomas: A malignant tumour arising from cells of the bone marrow, specifically plasma cells. - (Un tumor maligno que surge de las células de la médula ósea, específicamente de las células plasmáticas.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "myelomas"
          },
          {
            word: "Actualmente",
            definition: "Definition of Currently: At this moment, at present, now. - (En este momento, en el presente, ahora.)",
            pronunciation: "/ˈkʌɹəntli/",
            englishEquivalent: "Currently"
          },
          {
            word: "heterocíclica",
            definition: "Definition of heterocyclic: A heterocycle - (Un heterociclo)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "heterocyclic"
          },
          {
            word: "gramática",
            definition: "Definition of grammar: A system of rules and principles for speaking and writing a language. - (Un sistema de reglas y principios para hablar y escribir un idioma.)",
            pronunciation: "/ˈɡɹæm.ə(ɹ)/",
            englishEquivalent: "grammar"
          },
          {
            word: "Pates",
            definition: "Definition of PÂTÉS: A finely-ground paste of meat, fish or vegetables, sometimes with the addition of alcohol. - (Una pasta finamente molida de carne, pescado o verduras, a veces con la adición de alcohol.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "PÂTÉS"
          },
          {
            word: "impotencias",
            definition: "Definition of impotence: Powerlessness; incapacity. - (Impotencia; incapacidad.)",
            pronunciation: "/ˈɪmpətəns/",
            englishEquivalent: "impotence"
          },
          {
            word: "montañoso",
            definition: "Definition of mountainous: Having many mountains; characterized by mountains; of the nature of a mountain; rough (terrain); rocky. - (Tener muchas montañas; caracterizado por montañas; de la naturaleza de una montaña; áspero (terreno); rocoso.)",
            pronunciation: "/ˈmaʊntɪnəs/",
            englishEquivalent: "mountainous"
          },
          {
            word: "curvatura",
            definition: "Definition of crown: A royal, imperial or princely headdress; a diadem. - (Un tocado real, imperial o principesco; una diadema.)",
            pronunciation: "/kɹaʊn/",
            englishEquivalent: "crown"
          },
          {
            word: "sobornos",
            definition: "Definition of kickbacks: An elicit payment. Bribe. - (Un pago para obtener. Soborno.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "kickbacks"
          },
          {
            word: "paratiroides",
            definition: "Definition of parathyroid: The parathyroid gland. - (La glándula paratiroides.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "parathyroid"
          },
          {
            word: "clandestino",
            definition: "Definition of clandestine: Done or kept in secret, sometimes to conceal an illicit or improper purpose. - (Hecho o mantenido en secreto, a veces para ocultar un propósito ilícito o inapropiado.)",
            pronunciation: "/klænˈdɛstɪn/",
            englishEquivalent: "clandestine"
          },
          {
            word: "cónyuge",
            definition: "Definition of spouse: A person in a marriage or marital relationship. - (Una persona en un matrimonio o relación matrimonial.)",
            pronunciation: "/spaʊs/",
            englishEquivalent: "spouse"
          },
          {
            word: "casados",
            definition: "Definition of Married: A married person. - (Casados)",
            pronunciation: "/ˈmæɹ.ɪd/",
            englishEquivalent: "Married"
          },
          {
            word: "preponderancias",
            definition: "Definition of preponderances: Excess or superiority of weight, influence, or power, etc.; an outweighing. - (Exceso o superioridad de peso, influencia o poder, etc.; un peso superior.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "preponderances"
          },
          {
            word: "fotogénica",
            definition: "Definition of photogenic: Generated or caused by light. - (Generado o causado por la luz.)",
            pronunciation: "/ˌfəʊ.təʊˈdʒɛn.ɪk/",
            englishEquivalent: "photogenic"
          },
          {
            word: "deformación",
            definition: "Definition of deflection: The act of deflecting or something deflected. - (El acto de desviar o algo desviado.)",
            pronunciation: "/dɪˈflɛkʃən/",
            englishEquivalent: "deflection"
          },
          {
            word: "Salvador",
            definition: "Definition of hosted: To perform the role of a host. - (Desempeñar el papel de anfitrión.)",
            pronunciation: "/ˈhəʊstɪd/",
            englishEquivalent: "hosted"
          },
          {
            word: "lácteos",
            definition: "Definition of products: A commodity offered for sale. - (Una mercancía ofrecida a la venta.)",
            pronunciation: "/ˈpɹɒd.əkts/",
            englishEquivalent: "products"
          },
          {
            word: "faraones",
            definition: "Definition of Pharaoh: The supreme ruler of Ancient Egypt; a formal address for the sovereign seat of power as personified by the 'king' in an institutional role of Horus son of Osiris; often used by metonymy for Ancient Egyptian sovereignty - (El gobernante supremo del Antiguo Egipto; un discurso formal para la sede soberana del poder personificado por el 'rey' en un papel institucional de Horus, hijo de Osiris; a menudo utilizado por la metonimia para la soberanía del Antiguo Egipto)",
            pronunciation: "/ˈfɛəɹəʊ/",
            englishEquivalent: "Pharaoh"
          },
          {
            word: "masacres",
            definition: "Definition of Massacres: The killing of a considerable number (usually limited to people) where little or no resistance can be made, with indiscriminate violence, without necessity, and contrary to civilized norms. - (El asesinato de un número considerable (generalmente limitado a personas) donde se puede hacer poca o ninguna resistencia, con violencia indiscriminada, sin necesidad y en contra de las normas civilizadas.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "Massacres"
          },
          {
            word: "venenoso",
            definition: "Definition of three-spined stickleback: Gasterosteus aculeatus, a small fish of coastal and inland waters of the Northern Hemisphere, that can make its spines erect when threatened, which makes it hard to swallow. - (Gasterosteus aculeatus, un pequeño pez de aguas costeras e interiores del hemisferio norte, que puede hacer que sus espinas se erijan cuando se ve amenazado, lo que dificulta su deglución.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "three-spined stickleback"
          },
          {
            word: "irritaciones",
            definition: "Definition of Irritations: The act of irritating or annoying - (El acto de irritar o molestar)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "Irritations"
          },
          {
            word: "acreditabilidad",
            definition: "Definition of credibility: Reputation impacting one's ability to be believed. - (Reputación que afecta la capacidad de creer.)",
            pronunciation: "/kɹɛd.ə.ˈbɪ.ɫɪ.ti/",
            englishEquivalent: "credibility"
          },
          {
            word: "ingenioso",
            definition: "Definition of Ingenious: Displaying genius or brilliance; tending to invent. - (Mostrar genio o brillantez; tender a inventar.)",
            pronunciation: "/ɪnˈdʒiːniəs/",
            englishEquivalent: "Ingenious"
          },
          {
            word: "inservible",
            definition: "Definition of Flooded: To overflow, as by water from excessive rainfall. - (Al desbordamiento, como por agua de precipitaciones excesivas.)",
            pronunciation: "/ˈflʌdɪd/",
            englishEquivalent: "Flooded"
          },
          {
            word: "hectáreas",
            definition: "Definition of hectares: A unit of surface area (symbol ha) equal to 100 ares (that is, 10,000 square metres, one hundredth of a square kilometre, or approximately 2.5 acres), used for measuring the areas of geographical features such as land and bodies of water. - (Una unidad de superficie (símbolo ha) igual a 100 áreas (es decir, 10.000 metros cuadrados, una centésima de kilómetro cuadrado, o aproximadamente 2,5 acres), utilizada para medir las áreas de características geográficas como tierras y cuerpos de agua.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "hectares"
          },
          {
            word: "intendentes",
            definition: "Definition of intendants: Administrator of an opera house or theater. - (Administrador de un teatro de ópera o teatro.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "intendants"
          },
          {
            word: "congeladores",
            definition: "Definition of freezers: An appliance or room used to store food or other perishable items at temperatures below 0° Celsius (32° Fahrenheit). - (Un electrodoméstico o habitación utilizada para almacenar alimentos u otros artículos perecederos a temperaturas inferiores a 0° Celsius (32° Fahrenheit).)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "freezers"
          },
          {
            word: "cucharadas",
            definition: "Definition of tablespoons: A large spoon, used for eating food from a bowl. - (Una cuchara grande, utilizada para comer alimentos de un tazón.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "tablespoons"
          },
          {
            word: "prorrateo",
            definition: "Definition of Apportionment: The act of apportioning or the state of being apportioned. - (El acto de prorratear o el estado de ser prorrateado.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "Apportionment"
          },
          {
            word: "terroríficamente",
            definition: "Definition of terrifyingly: In a terrifying manner. - (De una manera aterradora.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "terrifyingly"
          },
          {
            word: "retroactivo",
            definition: "Definition of retroactive: Extending in scope, effect, application or influence to a prior time or to prior conditions - (Extensión en alcance, efecto, aplicación o influencia a un tiempo previo o a condiciones previas)",
            pronunciation: "/ˌɹɛt.ɹəʊˈæk.tɪv/",
            englishEquivalent: "retroactive"
          },
          {
            word: "anelástico",
            definition: "Definition of inelastic: Lacking elasticity; inflexible, unyielding - (Falta de elasticidad; inflexible, inflexible)",
            pronunciation: "/ˌɪnəˈlæstɪk/",
            englishEquivalent: "inelastic"
          },
          {
            word: "astuto",
            definition: "Definition of wily: Sly, cunning, full of tricks - (Astuto, astuto, lleno de trucos)",
            pronunciation: "/waɪ.li/",
            englishEquivalent: "wily"
          },
          {
            word: "cuantificable",
            definition: "Definition of Measurable: That which can be measured; a metric. - (Lo que se puede medir; una métrica.)",
            pronunciation: "/ˈmɛʒəɹəbəl/",
            englishEquivalent: "Measurable"
          },
          {
            word: "alcaloides",
            definition: "Definition of Alkaloid: Any of many organic heterocyclic bases that occur in nature and often have medicinal properties. - (Cualquiera de las muchas bases heterocíclicas orgánicas que se producen en la naturaleza y que a menudo tienen propiedades medicinales.)",
            pronunciation: "/ˈæl.kə.lɔɪd/",
            englishEquivalent: "Alkaloid"
          },
          {
            word: "evacuados",
            definition: "Definition of evacuees: A person who has been evacuated, especially a civilian evacuated from a dangerous place in time of war - (Una persona que ha sido evacuada, especialmente un civil evacuado de un lugar peligroso en tiempo de guerra)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "evacuees"
          },
          {
            word: "rebaño",
            definition: "Definition of flock: A large number of birds, especially those gathered together for the purpose of migration. - (Un gran número de aves, especialmente las reunidas con fines de migración.)",
            pronunciation: "/flɒk/",
            englishEquivalent: "flock"
          },
          {
            word: "confesor",
            definition: "Definition of confessor: One who confesses faith in Christianity in the face of persecution, but who is not martyred. - (Uno que confiesa la fe en el cristianismo frente a la persecución, pero que no es martirizado.)",
            pronunciation: "/kənˈfɛsə/",
            englishEquivalent: "confessor"
          },
          {
  word: "Ojos",
  definition: "Definition of Eyes: An organ through which animals see (perceive surroundings via light). - (Un órgano a través del cual los animales ven (perciben el entorno a través de la luz).)",
  pronunciation: "/aɪz/",
  englishEquivalent: "Eyes"
},
{
  word: "mañana",
  definition: "Definition of morning: The part of the day from dawn to noon. - (La parte del día desde el amanecer hasta el mediodía.)",
  pronunciation: "/ˈmɔːnɪŋ/",
  englishEquivalent: "morning"
},
{
  word: "sedimentados",
  definition: "Definition of sedimented: To deposit material as a sediment. - (Depositar material como sedimento.)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "sedimented"
},
{
  word: "peripatetico",
  definition: "Definition of peripatetic: One who walks about; a pedestrian; an itinerant. - (Uno que camina; un peatón; un itinerante.)",
  pronunciation: "/ˌpɛɹ.ə.pəˈtɛt.ɪk/",
  englishEquivalent: "peripatetic"
},
{
  word: "escoba",
  definition: "Definition of broom: A domestic utensil with fibers bound together at the end of a long handle, used for sweeping. - (Un utensilio doméstico con fibras unidas al final de un mango largo, utilizado para barrer.)",
  pronunciation: "/bɹuːm/",
  englishEquivalent: "broom"
},
{
  word: "organizadores",
  definition: "Definition of hosts: One which receives or entertains a guest, socially, commercially, or officially. - (Una que recibe o entretiene a un huésped, social, comercial u oficialmente.)",
  pronunciation: "/həʊsts/",
  englishEquivalent: "hosts"
},
{
  word: "lentitud",
  definition: "Definition of Slowness: The quality or state of being slow. - (La calidad o el estado de ser lento.)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "Slowness"
},
{
  word: "hipocondriac",
  definition: "Definition of hypochondriac: A person affected with hypochondria. - (Una persona afectada con hipocondría.)",
  pronunciation: "/ˌhaɪpəʊˈkɒndɹiæk/",
  englishEquivalent: "hypochondriac"
},
{
  word: "asistente",
  definition: "Definition of Assistant: Someone who is present; a bystander, a witness. - (Alguien que está presente; un espectador, un testigo.)",
  pronunciation: "/əˈsɪstənt/",
  englishEquivalent: "Assistant"
},
{
  word: "folicular",
  definition: "Definition of follicular: Of, pertaining to, having or resembling follicles. - (De, perteneciente a, que tiene o se asemeja a los folículos.)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "follicular"
},
{
  word: "gemoteas",
  definition: "Definition of gems: A precious stone, usually of substantial monetary value or prized for its beauty or shine. - (Una piedra preciosa, generalmente de valor monetario sustancial o apreciada por su belleza o brillo.)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "gems"
},
{
  word: "ponderado",
  definition: "Definition of weighted: To add weight to something; to make something heavier. - (Para añadir peso a algo; para hacer algo más pesado.)",
  pronunciation: "/ˈweɪt.ɪd/",
  englishEquivalent: "weighted"
},
{
  word: "gótico",
  definition: "Definition of Gothic: Of or relating to the Goths or their language. - (Perteneciente o relativo a los godos o a su idioma.)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "Gothic"
},
{
  word: "agarre",
  definition: "Definition of silicone: Any of a class of inert, semi-inorganic polymeric compounds (polysiloxanes), that have a wide range of thermal stability and extreme water repellence, used in a very wide range of industrial applications, and in prosthetic replacements for body parts. - (Cualquiera de una clase de compuestos poliméricos semiinorgánicos inertes (polisiloxanos), que tienen una amplia gama de estabilidad térmica y extrema repelencia al agua, utilizados en una gama muy amplia de aplicaciones industriales y en reemplazos protésicos de partes del cuerpo.)",
  pronunciation: "/ˈsɪlɪkəʊn/",
  englishEquivalent: "silicone"
},
{
  word: "facciones",
  definition: "Definition of Factions: A group of people, especially within a political organization, which expresses a shared belief or opinion different from people who are not part of the group. - (Un grupo de personas, especialmente dentro de una organización política, que expresa una creencia u opinión compartida diferente de las personas que no forman parte del grupo.)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "Factions"
},
{
  word: "parodias",
  definition: "Definition of parodies: A work or performance that imitates another work or performance with ridicule or irony. - (Una obra o performance que imita otra obra o performance con ridículo o ironía.)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "parodies"
},
{
  word: "rapidez",
  definition: "Definition of Speed: The state of moving quickly or the capacity for rapid motion; rapidity. - (El estado de movimiento rápido o la capacidad de movimiento rápido; rapidez.)",
  pronunciation: "/spiːd/",
  englishEquivalent: "Speed"
},
{
  word: "pasto",
  definition: "Definition of grazing: To feed or supply (cattle, sheep, etc.) with grass; to furnish pasture for. - (Para alimentar o abastecer (ganado, ovejas, etc.) con pasto; para proporcionar pastos para.)",
  pronunciation: "/ˈɡɹeɪzɪŋ/",
  englishEquivalent: "grazing"
},
{
  word: "maldiciones",
  definition: "Definition of curses: A supernatural detriment or hindrance; a bane. - (Un detrimento u obstáculo sobrenatural; una pesadilla.)",
  pronunciation: "/ˈkɜːsɪz/",
  englishEquivalent: "curses"
},
{
  word: "donde-sea",
  definition: "Definition of Anywhere: In or at any location or an unknown location. - (En o en cualquier lugar o en un lugar desconocido.)",
  pronunciation: "/ˈɛn.iː.(h)wɛə(ɹ)/",
  englishEquivalent: "Anywhere"
},
{
  word: "leche",
  definition: "Definition of milk: A white liquid produced by the mammary glands of female mammals to nourish their young. From certain animals, especially cows, it is also called dairy milk and is a common food for humans as a beverage or used to produce various dairy products such as butter, cheese, and yogurt. - (Líquido blanco producido por las glándulas mamarias de las hembras de los mamíferos para alimentar a sus crías. De ciertos animales, especialmente las vacas, también se llama leche de vaca y es un alimento común para los humanos como bebida o utilizado para producir diversos productos lácteos como mantequilla, queso y yogur.)",
  pronunciation: "/[mɛlk]/",
  englishEquivalent: "milk"
},
{
  word: "ministerio",
  definition: "Definition of ministry: Government department, at the administrative level normally headed by a minister (or equivalent rank, e.g. secretary of state), who holds it as portfolio, especially in a constitutional monarchy, but also as a polity - (Departamento de gobierno, a nivel administrativo normalmente encabezado por un ministro (o rango equivalente, por ejemplo, secretario de estado), que lo tiene como cartera, especialmente en una monarquía constitucional, pero también como una entidad política)",
  pronunciation: "/ˈmɪnɪstɹi/",
  englishEquivalent: "ministry"
},
{
  word: "Cálculos",
  definition: "Definition of Calculations: The act or process of calculating. - (El acto o proceso de cálculo.)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "Calculations"
},
{
  word: "biografía",
  definition: "Definition of biography: A person's life story, especially one published. - (La historia de vida de una persona, especialmente una publicada.)",
  pronunciation: "/baɪˈɒɡɹəfi/",
  englishEquivalent: "biography"
},
{
  word: "Reconocimiento",
  definition: "Definition of Acknowledgement: The act of acknowledging - (El acto de reconocer)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "Acknowledgement"
},
{
  word: "piridina",
  definition: "Definition of pyridine: Any of a class of aromatic heterocyclic compounds containing a ring of five carbon atoms and an nitrogen atom; especially the simplest one, C5H5N. - (Cualquiera de una clase de compuestos heterocíclicos aromáticos que contienen un anillo de cinco átomos de carbono y un átomo de nitrógeno; especialmente el más simple, C5H5N.)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "pyridine"
},
{
  word: "cabañas",
  definition: "Definition of rooms: Opportunity or scope (to do something). - (Oportunidad o alcance (para hacer algo).)",
  pronunciation: "/ɹuːmz/",
  englishEquivalent: "rooms"
},
{
  word: "injertos",
  definition: "Definition of Graft: A small shoot or scion of a tree inserted in another tree, the stock of which is to support and nourish it. The two unite and become one tree, but the graft determines the kind of fruit. - (Un pequeño brote o vástago de un árbol insertado en otro árbol, cuyo tronco es para apoyarlo y nutrirlo. Los dos se unen y se convierten en un árbol, pero el injerto determina el tipo de fruta.)",
  pronunciation: "/ɡɹæft/",
  englishEquivalent: "Graft"
},
{
  word: "Impresionante",
  definition: "Definition of Impressive: Making, or tending to make, a positive impression; having power to impress - (Hacer, o tender a hacer, una impresión positiva; tener el poder de impresionar)",
  pronunciation: "/ɪmˈpɹɛsɪv/",
  englishEquivalent: "Impressive"
},
{
  word: "escarabajo",
  definition: "Definition of beetle: A small car, the Volkswagen Beetle (original version made 1938–2003, similar models made 1997–2010 and since 2011) - (Un coche pequeño, el Volkswagen Beetle (versión original fabricada 1938–2003, modelos similares fabricados 1997–2010 y desde 2011))",
  pronunciation: "/[ˈbiɾəɫ]/",
  englishEquivalent: "beetle"
},
{
  word: "insolventes",
  definition: "Definition of insolvent: One who is insolvent; an insolvent debtor. - (Uno que es insolvente; un deudor insolvente.)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "insolvent"
},
{
  word: "cerdos",
  definition: "Definition of pigs: Any of several intelligent mammalian species of the genus Sus, having cloven hooves, bristles and a nose adapted for digging; especially the domesticated animal Sus scrofa. - (Cualquiera de varias especies de mamíferos inteligentes del género Sus, con pezuñas hendidas, cerdas y una nariz adaptada para cavar; especialmente el animal domesticado Sus scrofa.)",
  pronunciation: "/pɪɡz/",
  englishEquivalent: "pigs"
},
{
  word: "pasivo",
  definition: "Definition of charges: The amount of money levied for a service. - (La cantidad de dinero recaudada por un servicio.)",
  pronunciation: "/ˈt͡ʃɑːd͡ʒɪz/",
  englishEquivalent: "charges"
},
{
  word: "reaparición",
  definition: "Definition of Reappearance: The act of appearing again following absence - (El acto de comparecer de nuevo tras la ausencia)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "Reappearance"
},
{
  word: "maricas",
  definition: "Definition of brands: A conflagration; a flame. - (Una conflagración; una llama.)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "brands"
},
{
  word: "corporales",
  definition: "Definition of physical: Physical examination. - (Exploración física.)",
  pronunciation: "/ˈfɪzɪkəl/",
  englishEquivalent: "physical"
},
{
  word: "piroelectricidad",
  definition: "Definition of Pyroelectric: A pyroelectric substance - (Una sustancia piroeléctrica)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "Pyroelectric"
},
{
  word: "infatuado",
  definition: "Definition of infatuated: To inspire with unreasoning love, attachment or enthusiasm. - (Inspirar con amor irracional, apego o entusiasmo.)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "infatuated"
},
{
  word: "intereses",
  definition: "Definition of interest: The price paid for obtaining, or price received for providing, money or goods in a credit transaction, calculated as a fraction of the amount or value of what was borrowed. - (El precio pagado por obtener, o el precio recibido por proporcionar, dinero o bienes en una transacción de crédito, calculado como una fracción de la cantidad o el valor de lo que se tomó prestado.)",
  pronunciation: "/ˈɪntəɹɪst/",
  englishEquivalent: "interest"
},
{
  word: "agregados",
  definition: "Definition of aggregates: A mass, assemblage, or sum of particulars; something consisting of elements but considered as a whole. - (Una masa, conjunto o suma de detalles; algo que consiste en elementos pero que se considera como un todo.)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "aggregates"
},
{
  word: "selecciones",
  definition: "Definition of Selections: A process by which heritable traits conferring survival and reproductive advantage to individuals, or related individuals, tend to be passed on to succeeding generations and become more frequent in a population, whereas other less favourable traits tend to become eliminated; the differential survival and reproduction of phenotypes. - (Un proceso por el cual los rasgos hereditarios que confieren supervivencia y ventaja reproductiva a los individuos, o individuos relacionados, tienden a transmitirse a las generaciones sucesivas y se vuelven más frecuentes en una población, mientras que otros rasgos menos favorables tienden a eliminarse; la supervivencia diferencial y la reproducción de fenotipos.)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "Selections"
},
{
  word: "encarcerating",
  definition: "Definition of incarcerating: To lock away; to imprison, especially for breaking the law. - (Encerrar; encarcelar, especialmente por violar la ley.)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "incarcerating"
},
{
  word: "desalentamiento",
  definition: "Definition of discouragement: The loss of confidence or enthusiasm. - (La pérdida de confianza o entusiasmo.)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "discouragement"
},
{
  word: "ventajosa",
  definition: "Definition of advantageous: Being of advantage, beneficial. - (Ser ventajoso, beneficioso.)",
  pronunciation: "/ˌædvənˈteɪd͡ʒəs/",
  englishEquivalent: "advantageous"
},
{
  word: "previstos",
  definition: "Definition of Planned: To design (a building, machine, etc.). - (Para diseñar (un edificio, máquina, etc.).)",
  pronunciation: "/plænd/",
  englishEquivalent: "Planned"
},
{
  word: "organizadores",
  definition: "Definition of hosts: One which receives or entertains a guest, socially, commercially, or officially. - (Una que recibe o entretiene a un huésped, social, comercial u oficialmente.)",
  pronunciation: "/həʊsts/",
  englishEquivalent: "hosts"
},
{
  word: "leche",
  definition: "Definition of milk: A white liquid produced by the mammary glands of female mammals to nourish their young. From certain animals, especially cows, it is also called dairy milk and is a common food for humans as a beverage or used to produce various dairy products such as butter, cheese, and yogurt. - (Líquido blanco producido por las glándulas mamarias de las hembras de los mamíferos para alimentar a sus crías. De ciertos animales, especialmente las vacas, también se llama leche de vaca y es un alimento común para los humanos como bebida o utilizado para producir diversos productos lácteos como mantequilla, queso y yogur.)",
  pronunciation: "/[mɛlk]/",
  englishEquivalent: "milk"
},
{
  word: "determinismo",
  definition: "Definition of determinism: The doctrine that all actions are determined by the current state and immutable laws of the universe, with no possibility of choice. - (La doctrina de que todas las acciones están determinadas por el estado actual y las leyes inmutables del universo, sin posibilidad de elección.)",
  pronunciation: "/dɪˈtɜːmɪnɪzəm/",
  englishEquivalent: "determinism"
},
{
  word: "amplificaciones",
  definition: "Definition of amplifications: The act, or result of amplifying, enlarging, extending or adding. - (El acto, o resultado de amplificar, ampliar, extender o sumar.)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "amplifications"
},
{
  word: "subculturas",
  definition: "Definition of subcultures: A portion of a culture distinguished by its customs or other features. - (Una parte de una cultura que se distingue por sus costumbres u otras características.)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "subcultures"
},
{
  word: "molinos",
  definition: "Definition of mills: A grinding apparatus for substances such as grains, seeds, etc. - (Un aparato de molienda para sustancias como granos, semillas, etc.)",
  pronunciation: "/mɪlz/",
  englishEquivalent: "mills"
},
{
  word: "prácticas",
  definition: "Definition of internships: A job taken by a student in order to learn a profession or trade. - (Un trabajo realizado por un estudiante con el fin de aprender una profesión u oficio.)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "internships"
},
{
  word: "intereses",
  definition: "Definition of interest: The price paid for obtaining, or price received for providing, money or goods in a credit transaction, calculated as a fraction of the amount or value of what was borrowed. - (El precio pagado por obtener, o el precio recibido por proporcionar, dinero o bienes en una transacción de crédito, calculado como una fracción de la cantidad o el valor de lo que se tomó prestado.)",
  pronunciation: "/ˈɪntəɹɪst/",
  englishEquivalent: "interest"
},
{
  word: "transitividad",
  definition: "Definition of Transitive: Making a transit or passage. - (Hacer un tránsito o pasaje.)",
  pronunciation: "/ˈtɹænzɪtɪv/",
  englishEquivalent: "Transitive"
},
{
  word: "de-aquí",
  definition: "Definition of x: Intersex or non-binary (in passports and identification documents). - (Intersexual o no binario (en pasaportes y documentos de identificación).)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "x"
},
{
  word: "campeón",
  definition: "Definition of champion: An ongoing winner in a game or contest. - (Un ganador continuo en un juego o concurso.)",
  pronunciation: "/ˈtʃæmpiən/",
  englishEquivalent: "champion"
},
{
  word: "aplásico",
  definition: "Definition of aplastic: Relating to aplasia. - (Relativo a la aplasia.)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "aplastic"
},
{
  word: "calambres",
  definition: "Definition of cramping: (of a muscle) To contract painfully and uncontrollably. - ((de un músculo) Contraerse dolorosa e incontrolablemente.)",
  pronunciation: "/ˈkɹæmpɪŋ/",
  englishEquivalent: "cramping"
},
{
  word: "bombardeos",
  definition: "Definition of Bombing: To attack using one or more bombs; to bombard. - (Atacar usando una o más bombas; bombardear.)",
  pronunciation: "/ˈbɒmɪŋ/",
  englishEquivalent: "Bombing"
},
{
  word: "no-autorizada",
  definition: "Definition of unauthorized: Not having any authority - (No tener ninguna autoridad)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "unauthorized"
},
{
  word: "desmoviliza",
  definition: "Definition of demobilize: To release someone from military duty, especially after a war. - (Liberar a alguien del servicio militar, especialmente después de una guerra.)",
  pronunciation: "/diːˈməʊbɪlaɪz/",
  englishEquivalent: "demobilize"
},
{
  word: "rejuvenecimiento",
  definition: "Definition of rejuvenation: The process of rendering young again. - (El proceso de volver a ser joven.)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "rejuvenation"
},
{
  word: "intoxicaciones",
  definition: "Definition of greater: Relatively large in scale, size, extent, number (i.e. having many parts or members) or duration (i.e. relatively long); very big. - (Relativamente grande en escala, tamaño, extensión, número (es decir, tener muchas partes o miembros) o duración (es decir, relativamente largo); muy grande.)",
  pronunciation: "/ˈɡɹeɪ.tə(ɹ)/",
  englishEquivalent: "greater"
},
{
  word: "elípticos",
  definition: "Definition of Elliptical: An elliptical galaxy. - (Una galaxia elíptica.)",
  pronunciation: "/ɪˈlɪp.tɪk.əl/",
  englishEquivalent: "Elliptical"
},
{
  word: "ficciones",
  definition: "Definition of Fictions: Literary type using invented or imaginative writing, instead of real facts, usually written as prose. - (Tipo literario que utiliza escritura inventada o imaginativa, en lugar de hechos reales, generalmente escritos en prosa.)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "Fictions"
},
{
  word: "sin-ayuda",
  definition: "Definition of Unaided: Without the help, aid or assistance of someone or something. - (Sin la ayuda, ayuda o asistencia de alguien o algo.)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "Unaided"
},
{
  word: "lejos",
  definition: "Definition of far: Distant; remote in space. - (Distante; remoto en el espacio.)",
  pronunciation: "/fɑː/",
  englishEquivalent: "far"
},
{
  word: "alergista",
  definition: "Definition of Allergist: A doctor who specializes in the treatment of allergies. - (Médico especializado en el tratamiento de alergias.)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "Allergist"
},
{
  word: "bases-de-datos",
  definition: "Definition of databases: (general) A collection of (usually) organized information in a regular structure, usually but not necessarily in a machine-readable format accessible by a computer. - ((general) Una recopilación de información (generalmente) organizada en una estructura regular, generalmente pero no necesariamente en un formato legible por máquina accesible por un ordenador.)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "databases"
},
{
  word: "brillante",
  definition: "Definition of gloss: A surface shine or luster/lustre - (Un brillo superficial o lustre/lustre)",
  pronunciation: "/ɡlɑs/",
  englishEquivalent: "gloss"
},
{
  word: "carcasas",
  definition: "Definition of Enclosures: Something enclosed, i.e. inserted into a letter or similar package. - (Algo encerrado, es decir, insertado en una carta o paquete similar.)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "Enclosures"
},
{
  word: "Ejecución",
  definition: "Definition of Execution: The act, manner or style of executing (actions, maneuvers, performances). - (El acto, forma o estilo de ejecución (acciones, maniobras, actuaciones).)",
  pronunciation: "/ˌek.sɪˈkjuː.ʃən/",
  englishEquivalent: "Execution"
},
{
  word: "no-técnicos",
  definition: "Definition of non-technical: Not technical. - (No técnico.)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "non-technical"
},
{
  word: "parches",
  definition: "Definition of patch: A piece of cloth, or other suitable material, sewed or otherwise fixed upon a garment to repair or strengthen it, especially upon an old garment to cover a hole. - (Un trozo de tela, u otro material adecuado, cosido o fijado de otra manera sobre una prenda para repararla o fortalecerla, especialmente sobre una prenda vieja para cubrir un agujero.)",
  pronunciation: "/pætʃ/",
  englishEquivalent: "patch"
},
{
  word: "demasiado",
  definition: "Definition of too: (focus) Likewise. - ((foco) Así mismo.)",
  pronunciation: "/tuː/",
  englishEquivalent: "too"
},
{
  word: "cerebro",
  definition: "Definition of brain: The control center of the central nervous system of an animal located in the skull which is responsible for perception, cognition, attention, memory, emotion, and action. - (El centro de control del sistema nervioso central de un animal ubicado en el cráneo que es responsable de la percepción, la cognición, la atención, la memoria, la emoción y la acción.)",
  pronunciation: "/bɹeɪn/",
  englishEquivalent: "brain"
},
{
  word: "gobernanza",
  definition: "Definition of governance: The process, or the power, of governing; government or administration. - (El proceso, o el poder, de gobernar; gobierno o administración.)",
  pronunciation: "/ˈɡʌvənəns/",
  englishEquivalent: "governance"
},
{
  word: "clínicos",
  definition: "Definition of Department: A part, portion, or subdivision. - (Una parte, porción o subdivisión.)",
  pronunciation: "/dɪˈpɑːtm(ə)nt/",
  englishEquivalent: "Department"
},
{
  word: "pis",
  definition: "Definition of pee: Urine. - (Orina.)",
  pronunciation: "/piː/",
  englishEquivalent: "pee"
},
{
  word: "inseguro",
  definition: "Definition of insecure: Not secure. - (Sin seguridad)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "insecure"
},
{
  word: "previstos",
  definition: "Definition of Planned: To design (a building, machine, etc.). - (Para diseñar (un edificio, máquina, etc.).)",
  pronunciation: "/plænd/",
  englishEquivalent: "Planned"
},
{
  word: "--¿Qué?",
  definition: "Definition of What?: (Singlish) Used to contradict an underlying assumption held by the interlocutor. - ((Singlish) Se utiliza para contradecir una suposición subyacente sostenida por el interlocutor.)",
  pronunciation: "/wɔt/",
  englishEquivalent: "What?"
},
{
  word: "emisores",
  definition: "Definition of issuers: One who issues, emits, or publishes. - (Alguien que emite, emite o publica.)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "issuers"
},
{
  word: "candado",
  definition: "Definition of padlock: A detachable lock that can be used to secure something by means of a sliding or hinged shackle - (Una cerradura desmontable que se puede usar para asegurar algo por medio de un grillete deslizante o con bisagras)",
  pronunciation: "/ˈpadˌlɒk/",
  englishEquivalent: "padlock"
},
{
  word: "guantes",
  definition: "Definition of gloves: An item of clothing other than a mitten, covering all or part of the hand and fingers, but usually allowing independent movement of the fingers. - (Una prenda de vestir que no sea un guante, que cubre toda o parte de la mano y los dedos, pero que generalmente permite el movimiento independiente de los dedos.)",
  pronunciation: "/ɡlʌvz/",
  englishEquivalent: "gloves"
},
{
  word: "pipetas",
  definition: "Definition of pipettes: A small tube, often with an enlargement or bulb in the middle, and usually graduated, used for transferring or delivering measured quantities of a liquid. - (Un pequeño tubo, a menudo con una ampliación o bulbo en el medio, y generalmente graduado, utilizado para transferir o administrar cantidades medidas de un líquido.)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "pipettes"
},
{
  word: "implícitas",
  definition: "Definition of implicit: Implied indirectly, without being directly expressed - (Implícita indirectamente, sin ser expresada directamente)",
  pronunciation: "/ɪmˈplɪsɪt/",
  englishEquivalent: "implicit"
},
{
  word: "aniversario",
  definition: "Definition of special: A reduction in consumer cost (usually for a limited time) for items or services rendered. - (Una reducción en el costo para el consumidor (generalmente por un tiempo limitado) de los artículos o servicios prestados.)",
  pronunciation: "/ˈspɛ.ʃəl/",
  englishEquivalent: "special"
},
{
  word: "ridiculizar",
  definition: "Definition of ridicule: Derision; mocking or humiliating words or behaviour - (Escarnio; palabras o comportamientos burlones o humillantes)",
  pronunciation: "/ˈɹɪdɪkjuːl/",
  englishEquivalent: "ridicule"
},
{
  word: "Otoño",
  definition: "Definition of Autumn: Traditionally the third of the four seasons, when deciduous trees lose their leaves; typically regarded as being from September 24 to December 22 in parts of the Northern Hemisphere, and the months of March, April and May in the Southern Hemisphere. - (Tradicionalmente, la tercera de las cuatro estaciones, cuando los árboles de hoja caduca pierden sus hojas; típicamente se considera que es del 24 de septiembre al 22 de diciembre en partes del hemisferio norte, y los meses de marzo, abril y mayo en el hemisferio sur.)",
  pronunciation: "/ˈɔːtəm/",
  englishEquivalent: "Autumn"
},
{
  word: "fecundidad",
  definition: "Definition of fecundity: Ability to produce offspring. - (Capacidad para producir descendencia.)",
  pronunciation: "/fɪˈkʌndɪtɪ/",
  englishEquivalent: "fecundity"
},
{
  word: "conformidad",
  definition: "Definition of accordance: Agreement; harmony; conformity; compliance. - (Acuerdo; armonía; conformidad; cumplimiento.)",
  pronunciation: "/ə.ˈkɔɹd.əns/",
  englishEquivalent: "accordance"
},
{
  word: "envenenamiento",
  definition: "Definition of poisoning: To use poison to kill or paralyse (somebody). - (Usar veneno para matar o paralizar (a alguien).)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "poisoning"
},
{
  word: "presumidos",
  definition: "Definition of presumptuous: Going beyond what is right, proper, or appropriate because of an excess of self-confidence or arrogance. - (Ir más allá de lo que es correcto, apropiado o apropiado debido a un exceso de confianza en sí mismo o arrogancia.)",
  pronunciation: "/pɹəˈzʌmp.tjuː.əs/",
  englishEquivalent: "presumptuous"
},
{
  word: "festividad",
  definition: "Definition of Festivities : (often pluralized) A festival or similar celebration. - ((a menudo pluralizado) Un festival o celebración similar.)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "Festivities "
},
{
  word: "inquieto",
  definition: "Definition of restless: Not allowing or affording rest. - (No permitir o permitir el descanso.)",
  pronunciation: "/ˈɹɛstləs/",
  englishEquivalent: "restless"
},
{
  word: "subsistencia",
  definition: "Definition of survival: The fact or act of surviving; continued existence or life. - (El hecho o acto de sobrevivir; existencia o vida continuada.)",
  pronunciation: "/sɚˈvaɪvəl/",
  englishEquivalent: "survival"
},
{
  word: "Voy",
  definition: "Definition of I: The name of the Latin-script letter I. - (El nombre de la letra I del alfabeto latino.)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "I"
},
{
  word: "gripe",
  definition: "Definition of flu: Influenza. - (Gripe)",
  pronunciation: "/flʉː/",
  englishEquivalent: "flu"
},
{
  word: "complicación",
  definition: "Definition of complication: The act or process of complicating. - (El acto o proceso de complicar.)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "complication"
},
{
  word: "turpentida",
  definition: "Definition of turpentine: A volatile essential oil obtained from the wood of pine trees by steam distillation; it is a complex mixture of monoterpenes; it is used as a solvent and paint thinner. - (Aceite esencial volátil obtenido de la madera de los pinos por destilación al vapor; es una mezcla compleja de monoterpenos; se utiliza como disolvente y diluyente de pinturas.)",
  pronunciation: "/ˈtɜː.pən.ˌtaɪn/",
  englishEquivalent: "turpentine"
},
{
  word: "de-combustible",
  definition: "Definition of economy: Effective management of a community or system, or especially its resources. - (Gestión eficaz de una comunidad o sistema, o especialmente de sus recursos.)",
  pronunciation: "/iːˈkɒn.ə.mi/",
  englishEquivalent: "economy"
},
{
  word: "Paisaje",
  definition: "Definition of Landscape: A portion of land or territory which the eye can comprehend in a single view, including all the objects it contains. - (Una porción de tierra o territorio que el ojo puede comprender en una sola vista, incluidos todos los objetos que contiene.)",
  pronunciation: "/ˈlandskeɪp/",
  englishEquivalent: "Landscape"
},
{
  word: "redundancias",
  definition: "Definition of REDUNDANCIES: The state of being redundant - (El estado de ser redundante)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "REDUNDANCIES"
},
{
  word: "diques",
  definition: "Definition of dyke: (usually derogatory) A lesbian, particularly one with masculine or butch traits or behavior. - ((generalmente despectivo) Una lesbiana, particularmente una con rasgos o comportamientos masculinos o carnosos.)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "dyke"
},
{
  word: "sala-de-ventas",
  definition: "Definition of Salesroom: The room where sales are made - (La sala donde se realizan las ventas)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "Salesroom"
},
{
  word: "verde",
  definition: "Definition of green: Having green as its color. - (Tener el verde como color.)",
  pronunciation: "/ɡɹiːn/",
  englishEquivalent: "green"
},
{
  word: "enunciación",
  definition: "Definition of Utterance: An act of uttering. - (Un acto de pronunciación.)",
  pronunciation: "/ˈʌtəɹəns/",
  englishEquivalent: "Utterance"
},
{
  word: "Ganancias",
  definition: "Definition of Profits: Total income or cash flow minus expenditures. The money or other benefit a non-governmental organization or individual receives in exchange for products and services sold at an advertised price. - (Ingresos totales o flujo de efectivo menos gastos. El dinero u otro beneficio que una organización no gubernamental o individuo recibe a cambio de productos y servicios vendidos a un precio anunciado.)",
  pronunciation: "/ˈpɹɒfɪts/",
  englishEquivalent: "Profits"
},
{
  word: "almacenamiento",
  definition: "Definition of storage: The act of storing goods; the state of being stored. - (El acto de almacenar bienes; el estado de ser almacenado.)",
  pronunciation: "/ˈstɔ.ɹɪd͡ʒ/",
  englishEquivalent: "storage"
},
{
  word: "TODOS",
  definition: "Definition of ALL: (with a possessive pronoun) Everything that one is capable of. - ((con un pronombre posesivo) Todo lo que uno es capaz de hacer.)",
  pronunciation: "/ɔːl/",
  englishEquivalent: "ALL"
},
{
  word: "tropismo",
  definition: "Definition of tropism: The turning of an organism in response to a stimulus, either towards or away from the stimulus. - (El giro de un organismo en respuesta a un estímulo, ya sea hacia o lejos del estímulo.)",
  pronunciation: "/ˈtɹəʊpɪzəm/",
  englishEquivalent: "tropism"
},
{
  word: "subestimado",
  definition: "Definition of Understocked: To stock with an insufficient amount. - (Para almacenar una cantidad insuficiente.)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "Understocked"
},
{
  word: "contaminado",
  definition: "Definition of contaminated: To make something dangerous or toxic by introducing impurities or foreign matter. - (Hacer algo peligroso o tóxico introduciendo impurezas o materias extrañas.)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "contaminated"
},
{
  word: "ambiguo",
  definition: "Definition of ambiguous: Open to multiple interpretations. - (Abierto a múltiples interpretaciones.)",
  pronunciation: "/æmˈbɪɡjuəs/",
  englishEquivalent: "ambiguous"
},
{
  word: "platinoide",
  definition: "Definition of platinoid: Any of several metals that resemble platinum in their chemistry; especially osmium, iridium and palladium - (Cualquiera de varios metales que se asemejan al platino en su química; especialmente osmio, iridio y paladio)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "platinoid"
},
{
  word: "fuera-de-lugar",
  definition: "Definition of off-site: Away from a particular site - (Lejos de un sitio en particular)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "off-site"
},
{
  word: "orquestas",
  definition: "Definition of ORCHESTRAS: A large group of musicians who play together on various instruments, usually including some from strings, woodwind, brass and/or percussion; the instruments played by such a group. - (Un gran grupo de músicos que tocan juntos en varios instrumentos, generalmente incluyendo algunos de cuerdas, viento-madera, metal y/o percusión; los instrumentos tocados por dicho grupo.)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "ORCHESTRAS"
},
{
  word: "selecciones",
  definition: "Definition of Selections: A process by which heritable traits conferring survival and reproductive advantage to individuals, or related individuals, tend to be passed on to succeeding generations and become more frequent in a population, whereas other less favourable traits tend to become eliminated; the differential survival and reproduction of phenotypes. - (Un proceso por el cual los rasgos hereditarios que confieren supervivencia y ventaja reproductiva a los individuos, o individuos relacionados, tienden a transmitirse a las generaciones sucesivas y se vuelven más frecuentes en una población, mientras que otros rasgos menos favorables tienden a eliminarse; la supervivencia diferencial y la reproducción de fenotipos.)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "Selections"
},
{
  word: "subtil",
  definition: "Definition of subtle: Hard to grasp; not obvious or easily understood; barely noticeable. - (Difícil de entender; no es obvio ni fácil de entender; apenas se nota.)",
  pronunciation: "/ˈsʌt(ə)l/",
  englishEquivalent: "subtle"
},
{
  word: "caballos",
  definition: "Definition of horses: Any of several animals related to Equus ferus caballus. - (Cualquiera de varios animales relacionados con Equus ferus caballus.)",
  pronunciation: "/ˈhɔrsəs/",
  englishEquivalent: "horses"
},
{
  word: "escaleras",
  definition: "Definition of steps: An advance or movement made from one foot to the other; a pace. - (Un avance o movimiento realizado de un pie al otro; un paso.)",
  pronunciation: "/stɛps/",
  englishEquivalent: "steps"
},
{
  word: "sin-perdonar",
  definition: "Definition of unforgiving: Unwilling or unable to forgive or show mercy. - (No estar dispuesto o ser incapaz de perdonar o mostrar misericordia.)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "unforgiving"
},

          
    ],
};

  let selectedWord = '';
  let guessedLetters = [];
  let wrongGuesses = 0;
  const maxWrongGuesses = 6;
  let animationFrameId;

  function createKeyboard() {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÁÉÍÓÚÑ'.split('');
      const letterContainer = document.getElementById('letter-container');
      letterContainer.innerHTML = ''; // Clear previous keyboard

      // Add hyphen button if the selected word contains a hyphen
      if (selectedWord.includes('-')) {
          const hyphenButton = document.createElement('button');
          hyphenButton.innerText = '-';
          hyphenButton.classList.add('letter-button', 'hyphen-button', 'flashing-slow');
          hyphenButton.onclick = () => {
              handleGuess('-');
              hyphenButton.classList.add('guessed');
              setTimeout(() => {
                  hyphenButton.classList.remove('guessed');
                  hyphenButton.style.display = 'none'; // Hide the hyphen button
              }, 500); // Light blue briefly
          };
          letterContainer.appendChild(hyphenButton);
      }

      letters.forEach(letter => {
          const button = document.createElement('button');
          button.innerText = letter;
          button.classList.add('letter-button');
          button.onclick = () => {
              handleGuess(letter);
              button.classList.add('guessed');
              setTimeout(() => {
                  button.classList.remove('guessed');
              }, 500); // Light blue briefly
          };
          letterContainer.appendChild(button);
      });

      // Create the log container for correct and incorrect words
      const logContainer = document.getElementById('log-container');
      if (!logContainer) {
          const newLogContainer = document.createElement('div');
          newLogContainer.id = 'log-container';
          newLogContainer.style.marginTop = '20px';
          letterContainer.parentNode.appendChild(newLogContainer);
      }
  }

  function handleGuess(letter) {
      if (!guessedLetters.includes(letter)) {
          if (selectedWord.includes(letter)) {
              guessedLetters.push(letter);
          } else {
              wrongGuesses++;
              if (wrongGuesses === maxWrongGuesses) {
                  animateHangman();
              }
          }
          updateWordDisplay();
          drawHangman();
          checkGameStatus();
      }
  }

  function logWordResult(word, definition, isCorrect) {
      const logContainer = document.getElementById('log-container');
      const logEntry = document.createElement('div');
      logEntry.innerHTML = `<strong>${word}</strong>: ${definition}`;
      logEntry.style.color = isCorrect ? 'green' : 'red';
      logContainer.appendChild(logEntry);
  }

  function showTemporaryPopup(message, isCorrect) {
      const popup = document.createElement('div');
      popup.innerText = message;
      popup.style.position = 'fixed';
      popup.style.top = '50%';
      popup.style.left = '50%';
      popup.style.transform = 'translate(-50%, -50%)';
      popup.style.padding = '20px';
      popup.style.backgroundColor = isCorrect ? 'green' : 'red';
      popup.style.color = 'white';
      popup.style.borderRadius = '5px';
      document.body.appendChild(popup);

      setTimeout(() => {
          document.body.removeChild(popup);
      }, 2000);
  }

  const winSounds = ['correct-6033.mp3', 'sound-effect-twinklesparkle-115095.mp3']; // Add paths to win sound files
  const loseSounds = ['fail-144746.mp3', 'no-luck-too-bad-disappointing-sound-effect-112943.mp3', '050612_wild-west-1-36194.mp3']; // Add paths to lose sound files

  function playRandomSound(sounds) {
      const randomIndex = Math.floor(Math.random() * sounds.length);
      const audio = new Audio(sounds[randomIndex]);
      audio.play();
  }

  
  function speakText(text, lang) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang; // Set the language for the utterance
    window.speechSynthesis.speak(utterance);
}

function checkGameStatus() {
  if (selectedWord && wrongGuesses >= maxWrongGuesses) {
      cancelAnimationFrame(animationFrameId);
      showTemporaryPopup('Game Over! The word was: ' + selectedWord, false);
      logWordResult(selectedWord, getWordDefinition(selectedWord), false);
      playRandomSound(loseSounds); // Play a random lose sound

      // Show the repeat button with the word but without speaking it
      showRepeatButton(`La palabra es: ${selectedWord}`, `The word is: ${getEnglishEquivalent(selectedWord)}`);

      resetGame();
  } else if (selectedWord && selectedWord.split('').every(letter => guessedLetters.includes(letter))) {
      cancelAnimationFrame(animationFrameId);
      showTemporaryPopup('Congratulations! You guessed the word: ' + selectedWord, true);
      logWordResult(selectedWord, getWordDefinition(selectedWord), true);
      playRandomSound(winSounds); // Play a random win sound

      // Get the English equivalent of the word
      const englishEquivalent = getEnglishEquivalent(selectedWord);

      // Show the repeat button with the word but without speaking it
      showRepeatButton(`La palabra es: ${selectedWord}`, `The word is: ${englishEquivalent}`);

      resetGame();
  }
}

function showRepeatButton(spanishText, englishText) {
  let repeatSpanishButton = document.getElementById('repeat-spanish-btn');
  let repeatEnglishButton = document.getElementById('repeat-english-btn');

  if (!repeatSpanishButton) {
      repeatSpanishButton = document.createElement('button');
      repeatSpanishButton.id = 'repeat-spanish-btn';
      repeatSpanishButton.innerText = 'Repeat Spanish';
      document.body.appendChild(repeatSpanishButton);
  }

  if (!repeatEnglishButton) {
      repeatEnglishButton = document.createElement('button');
      repeatEnglishButton.id = 'repeat-english-btn';
      repeatEnglishButton.innerText = 'Repeat English';
      document.body.appendChild(repeatEnglishButton);
  }

  repeatSpanishButton.classList.remove('hide');
  repeatEnglishButton.classList.remove('hide');

  repeatSpanishButton.onclick = () => {
      if (spanishText) speakText(spanishText, 'es-ES');
  };

  repeatEnglishButton.onclick = () => {
      if (englishText) speakText(englishText, 'en-US');
  };
}

function getWordPronunciation(word) {
  for (const mode in options) {
      for (const wordObj of options[mode]) {
          if (wordObj.word.toUpperCase() === word) {
              return wordObj.pronunciation;
          }
      }
  }
  return '';
}

function getEnglishEquivalent(word) {
    for (const mode in options) {
        for (const wordObj of options[mode]) {
            if (wordObj.word.toUpperCase() === word) {
                return wordObj.englishEquivalent;
            }
        }
    }
    return word;
}


  function getWordDefinition(word) {
      for (const mode in options) {
          for (const wordObj of options[mode]) {
              if (wordObj.word.toUpperCase() === word) {
                  return wordObj.definition;
              }
          }
      }
      return '';
  }

  function resetGame() {
      selectedWord = '';
      guessedLetters = [];
      wrongGuesses = 0;
      updateWordDisplay();
      drawHangman();
      displayOptions(); // Show options again for a new game
  }

  function displayOptions() {
      const optionsContainer = document.getElementById('options-container');
      optionsContainer.innerHTML = ''; // Clear previous options
      for (const mode in options) {
          const button = document.createElement('button');
          button.innerText = mode;
          button.classList.add('option-button');
          button.onclick = () => {
              const wordObj = options[mode][Math.floor(Math.random() * options[mode].length)];
              selectedWord = wordObj.word.toUpperCase();
              guessedLetters = [];
              wrongGuesses = 0;
              updateWordDisplay();
              drawHangman();
              createKeyboard();
              optionsContainer.innerHTML = ''; // Clear options after selection

              // Switch recognition language based on category
              if (mode === 'Verdugo') {
                  recognition.lang = 'es-ES';
              } else {
                  recognition.lang = 'en-US';
              }
          };
          optionsContainer.appendChild(button);
      }
  }

  function updateWordDisplay() {
      const wordDisplay = document.getElementById('word-display');
      wordDisplay.innerText = selectedWord.split('').map(letter => (guessedLetters.includes(letter) ? letter : '_')).join(' ');
  }

  function drawHangman() {
      const canvas = document.getElementById('hangman-canvas');
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the base, pole, and beam
      context.beginPath();
      context.moveTo(10, 140);
      context.lineTo(190, 140);
      context.moveTo(30, 140);
      context.lineTo(30, 10);
      context.lineTo(110, 10);
      context.lineTo(110, 20);
      context.stroke();

      // Draw the hanging man parts based on the number of wrong guesses
      if (wrongGuesses > 0) {
          // Draw head
          context.beginPath();
          context.arc(110, 30, 10, 0, Math.PI * 2);
          context.stroke();
      }
      if (wrongGuesses > 1) {
          // Draw body
          context.beginPath();
          context.moveTo(110, 40);
          context.lineTo(110, 90);
          context.stroke();
      }
      if (wrongGuesses > 2) {
          // Draw left arm
          context.beginPath();
          context.moveTo(110, 50);
          context.lineTo(90, 70);
          context.stroke();
      }
      if (wrongGuesses > 3) {
          // Draw right arm
          context.beginPath();
          context.moveTo(110, 50);
          context.lineTo(130, 70);
          context.stroke();
      }
      if (wrongGuesses > 4) {
          // Draw left leg
          context.beginPath();
          context.moveTo(110, 90);
          context.lineTo(90, 110);
          context.stroke();
      }
      if (wrongGuesses > 5) {
          // Draw right leg
          context.beginPath();
          context.moveTo(110, 90);
          context.lineTo(130, 110);
          context.stroke();
      }
  }

  function animateHangman() {
      const canvas = document.getElementById('hangman-canvas');
      const context = canvas.getContext('2d');
      let shakeCount = 0;
      const maxShakes = 10;
      const shake = () => {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.save();
          context.translate(Math.random() * 5, Math.random() * 5);
          drawHangman();
          context.restore();
          shakeCount++;
          if (shakeCount < maxShakes) {
              requestAnimationFrame(shake);
          } else {
              strugglingAnimation();
          }
      };
      shake();
  }

  function strugglingAnimation() {
      const canvas = document.getElementById('hangman-canvas');
      const context = canvas.getContext('2d');
      let frame = 0;
      const maxFrames = 20;
      const animate = () => {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.save();
          context.translate(Math.sin(frame / 10) * 5, 0); // Slow horizontal movement
          drawHangman();
          context.restore();
          frame++;
          if (frame < maxFrames) {
              requestAnimationFrame(animate);
          }
      };
      animate();
  }

  recognition.onstart = function() {
      console.log('Speech recognition started');
      document.getElementById('status').innerText = 'Listening...';
      document.getElementById('start-btn').disabled = true;
      document.getElementById('stop-btn').disabled = false;
  };

  recognition.onresult = function(event) {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
          let transcript = event.results[i][0].transcript.trim().toLowerCase();
          console.log(`Recognized: ${transcript}`); // Log the recognized speech

          // Check if the transcript is a single letter or a phonetic equivalent
          if (transcript.length === 1 || phoneticMap[transcript] || spanishPhoneticMap[transcript]) {
              transcript = phoneticMap[transcript] || spanishPhoneticMap[transcript] || transcript.toUpperCase();
          } else {
              continue; // Skip non-letter inputs
          }

          if (event.results[i].isFinal) {
              finalTranscript += transcript;
          } else {
              interimTranscript += transcript;
          }
      }

      // Display the results
      document.getElementById('result').innerHTML = finalTranscript + '<i style="color:#999;">' + interimTranscript + '</i>';

      // Process the final transcript for the Hangman game
      if (finalTranscript) {
          const guessedLetter = finalTranscript.toUpperCase();
          handleGuess(guessedLetter);
      }

      // Suggest the letter
      if (interimTranscript) {
          suggestLetter(interimTranscript);
      }
  };

  function suggestLetter(interimTranscript) {
      const suggestion = phoneticMap[interimTranscript] || spanishPhoneticMap[interimTranscript] || null;
      const letterButtons = document.querySelectorAll('.letter-button');
      const resultElement = document.getElementById('result');

      if (suggestion) {
          resultElement.innerHTML = `Did you mean: <span style="color: lightgreen;">${suggestion}</span>? <button id="yes-btn">Yes</button> <button id="no-btn">No</button>`;

          document.getElementById('yes-btn').onclick = () => {
              letterButtons.forEach(button => {
                  if (button.innerText === suggestion) {
                      button.style.backgroundColor = 'lightgreen';
                      setTimeout(() => {
                          button.style.backgroundColor = '';
                          button.click(); // Simulate a click on the suggested button
                      }, 500); // Highlight the suggestion for 500ms
                  }
              });
              handleGuess(suggestion); // Ensure the guessed letter is processed
              resultElement.innerHTML = ''; // Clear the suggestion after confirmation
          };

          document.getElementById('no-btn').onclick = () => {
              resultElement.innerHTML = '';
          };
      } else {
          // If no valid suggestion, show what was said and ask for confirmation
          resultElement.innerHTML = `Did you mean: <span style="color: lightgreen;">${interimTranscript.toUpperCase()}</span>?`;
      }
  }

  recognition.onerror = function(event) {
      if (event.error === 'no-speech') {
          console.error('No speech was detected. Please try again.');
          alert('No speech was detected. Please try again.');
      } else if (event.error === 'network') {
          console.error('Network error occurred. Please check your internet connection.');
          alert('Network error occurred. Please check your internet connection.');
      } else if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          console.error('Microphone access was denied. Please allow microphone access.');
          alert('Microphone access was denied. Please allow microphone access.');
      } else {
          console.error('Speech recognition error', event);
      }
  };

  recognition.onend = function() {
      console.log('Speech recognition ended');
      document.getElementById('status').innerText = '';
      document.getElementById('start-btn').disabled = false;
      document.getElementById('stop-btn').disabled = true;
  };

  // Add this global variable
let audioStream = null; // Store the audio stream globally

// Modify the start button click handler
document.getElementById('start-btn').onclick = function() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        audioStream = stream; // Store the audio stream globally
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaStreamSource(stream);
        const gainNode = audioContext.createGain();
        gainNode.gain.value = 2; // Increase volume
        source.connect(gainNode).connect(audioContext.destination);
        recognition.start();
    }).catch(error => {
        console.error('Error accessing microphone:', error);
        alert('Error accessing microphone. Please check your microphone settings.');
    });
};

// Modify the stop button click handler
document.getElementById('stop-btn').onclick = function() {
    recognition.stop();
    if (audioStream) {
        audioStream.getTracks().forEach(track => track.stop()); // Stop all tracks of the audio stream
        audioStream = null; // Clear the audio stream
    }
};

  // Initialize the game
  displayOptions(); // Show options at the start

  // Add event listener for Ctrl + Q to auto-finish the word
  document.addEventListener('keydown', function(event) {
      if (event.ctrlKey && event.key === 'q') {
          autoFinishWord();
      }
  });

  function autoFinishWord() {
      selectedWord.split('').forEach(letter => {
          if (!guessedLetters.includes(letter)) {
              guessedLetters.push(letter);
          }
      });
      updateWordDisplay();
      checkGameStatus();
  }
} else {
  console.error('Web Speech API is not supported in this browser.');
  alert('Web Speech API is not supported in this browser. Please use a supported browser.');
}

document.addEventListener('DOMContentLoaded', () => {
  const instructionsPopup = document.getElementById('instructions-popup');
  const closePopup = document.getElementById('close-popup');
  const instructionsButton = document.getElementById('instructions-button');

  // Open the instructions popup
  instructionsButton.addEventListener('click', () => {
      instructionsPopup.classList.remove('hide');
  });

  // Close the instructions popup
  closePopup.addEventListener('click', () => {
      instructionsPopup.classList.add('hide');
  });

  // Close the popup when clicking outside of it
  window.addEventListener('click', (event) => {
      if (event.target === instructionsPopup) {
          instructionsPopup.classList.add('hide');
      }
  });

  // Set the background GIF
  document.body.style.backgroundImage = "url('https://64.media.tumblr.com/43891cae5450425ccd1f06c610b731b3/27bd7103dd700c5a-8e/s500x750/5d2563ae1f3a14bf6864b088a06c17b46c205e86.gif')";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = "center 20%"; // Shift down by 20%
  document.body.style.backgroundAttachment = "fixed";
});

const style = document.createElement('style');
style.innerHTML = `
.flashing {
  animation: flash 1s infinite;
}

.flashing-slow {
  animation: flash-slow 2s infinite;
}

@keyframes flash {
  0%, 100% { background-color: lightblue; }
  50% { background-color: white; }
}

@keyframes flash-slow {
  0%, 100% { background-color: lightblue; }
  50% { background-color: white; }
}

/* Add styles to ensure content is readable over the background */
body {
  color: white;
  text-shadow: 1px 1px 2px black;
}
`;
document.head.appendChild(style);
