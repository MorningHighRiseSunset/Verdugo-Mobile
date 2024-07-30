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
  word: "situses",
  definition: "Definition: The position, especially the usual, normal position, of a body part or part of a plant.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "situses"
},
{
  word: "unpersuasive",
  definition: "Definition: Not persuasive",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "unpersuasive"
},
{
  word: "extermination",
  definition: "Definition: The act of exterminating; total destruction or eradication",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "extermination"
},
{
  word: "hobo",
  definition: "Definition: A wandering homeless person, especially one illegally travelling by rail or a penniless, unemployed bum.",
  pronunciation: "/ˈhəʊ.bəʊ/",
  englishEquivalent: "hobo"
},
{
  word: "decries",
  definition: "Definition: To denounce as harmful.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "decries"
},
{
  word: "refroze",
  definition: "Definition: To freeze again.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "refroze"
},
{
  word: "apprentices",
  definition: "Definition: A trainee, especially in a skilled trade.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "apprentices"
},
{
  word: "utterance",
  definition: "Definition: An act of uttering.",
  pronunciation: "/ˈʌtəɹəns/",
  englishEquivalent: "utterance"
},
{
  word: "abscission",
  definition: "Definition: The act or process of cutting off.",
  pronunciation: "/æbˈsɪ.ʃn̩/",
  englishEquivalent: "abscission"
},
{
  word: "cravats",
  definition: "Definition: A wide fabric band worn as a necktie by men having long ends hanging in front.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "cravats"
},
{
  word: "fundraises",
  definition: "Definition: To raise funds for a specified cause or purpose.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "fundraises"
},
{
  word: "mellowest",
  definition: "Definition: To make mellow; to relax or soften.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "mellowest"
},
{
  word: "rogueries",
  definition: "Definition: Malicious or reckless behaviour",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "rogueries"
},
{
  word: "lasagna",
  definition: "Definition: A flat sheet of pasta.",
  pronunciation: "/ləˈzɑ.njə/",
  englishEquivalent: "lasagna"
},
{
  word: "physicist",
  definition: "Definition: A person whose occupation specializes in the science of physics, especially at a professional level.",
  pronunciation: "/ˈfɪz.ɪ.sɪst/",
  englishEquivalent: "physicist"
},
{
  word: "clevises",
  definition: "Definition: A U-shaped coupling having holes at each end, through which a bolt is run; used especially to fit attachments to a tractor or other vehicle as it allows a degree of rotation about the bolt.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "clevises"
},
{
  word: "beneficiate",
  definition: "Definition: To reduce (ores).",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "beneficiate"
},
{
  word: "mentorships",
  definition: "Definition: State of being a mentor",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "mentorships"
},
{
  word: "interethnic",
  definition: "Definition: Between ethnic groups, or their members.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "interethnic"
},
{
  word: "breathable",
  definition: "Definition: (of air) suitable for breathing",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "breathable"
},
{
  word: "dreamy",
  definition: "Definition: As in a dream; resembling a dream.",
  pronunciation: "/ˈdɹiː.mi/",
  englishEquivalent: "dreamy"
},
{
  word: "opaques",
  definition: "Definition: To make, render (more) opaque.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "opaques"
},
{
  word: "fluorimeter",
  definition: "Definition: An instrument used to detect and measure fluorescence.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "fluorimeter"
},
{
  word: "grippe",
  definition: "Definition: Influenza, the flu.",
  pronunciation: "/ɡɹɪp/",
  englishEquivalent: "grippe"
},
{
  word: "animadverted",
  definition: "Definition: To criticise, to censure.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "animadverted"
},
{
  word: "quartos",
  definition: "Definition: A size of paper (7.5"-10" x 10"-12.5" or 190-254 x 254-312 mm). Formed by folding and cutting one of several standard sizes of paper (15"-20" x 20"-25" or 381-508 x 508-635 mm) twice to form 4 leaves (eight sides).",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "quartos"
},
{
  word: "experiential",
  definition: "Definition: Of, related to, encountered in, or derived from experience.",
  pronunciation: "/ɛkˌspɪəɹiˈɛnʃəl/",
  englishEquivalent: "experiential"
},
{
  word: "players",
  definition: "Definition: One that plays",
  pronunciation: "/ˈpleɪəz/",
  englishEquivalent: "players"
},
{
  word: "conspiracies",
  definition: "Definition: The act of two or more persons, called conspirators, working secretly to obtain some goal, usually understood with negative connotations.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "conspiracies"
},
{
  word: "alibis",
  definition: "Definition: The plea or mode of defense under which a person on trial for a crime proves or attempts to prove being in another place when the alleged act was committed",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "alibis"
},
{
  word: "chutes",
  definition: "Definition: A framework, trough or tube, upon or through which objects are made to slide from a higher to a lower level, or through which water passes to a wheel.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "chutes"
},
{
  word: "siglum",
  definition: "Definition: A letter or other symbol that stands for a word or name.",
  pronunciation: "/ˈsɪɡləm/",
  englishEquivalent: "siglum"
},
{
  word: "dekaliters",
  definition: "Definition: Ten litres. Symbol: dal",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "dekaliters"
},
{
  word: "deaerated",
  definition: "Definition: To remove the air or gas from something",
  pronunciation: "/diːˈeəɹeɪtəd/",
  englishEquivalent: "deaerated"
},
{
  word: "veiled",
  definition: "Definition: To dress in, or decorate with, a veil.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "veiled"
},
{
  word: "galliass",
  definition: "Definition: A type of rowable vessel of the 16th and 17th centuries, similar to a galley but larger, and normally equipped with sails.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "galliass"
},
{
  word: "unstudied",
  definition: "Definition: Free of artifice or cunning; innocent, spontaneous and unaffected.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "unstudied"
},
{
  word: "emerge",
  definition: "Definition: To come into view.",
  pronunciation: "/iˈmɜːd͡ʒ/",
  englishEquivalent: "emerge"
},
{
  word: "lunks",
  definition: "Definition: A fool; an idiot; a lunkhead.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "lunks"
},
{
  word: "hereditary",
  definition: "Definition: A hereditary ruler; a hereditary peer in the House of Lords.",
  pronunciation: "/həˈɹɛdɪt(ə)ɹi/",
  englishEquivalent: "hereditary"
},
{
  word: "firelocks",
  definition: "Definition: A form of gunlock, in which the priming is ignited by a spark.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "firelocks"
},
{
  word: "rices",
  definition: "Definition: Cereal plants, Oryza sativa of the grass family whose seeds are used as food.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "rices"
},
{
  word: "sousliks",
  definition: "Definition: Any of several large Eurasian squirrels, of the genera Citellus or Spermophilus",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "sousliks"
},
{
  word: "balkline",
  definition: "Definition: Baulk line",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "balkline"
},
{
  word: "unicellular",
  definition: "Definition: A single-celled organism; a unicell.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "unicellular"
},
{
  word: "solifluction",
  definition: "Definition: Soil creep caused by waterlogged soil slowly moving downhill on top of an impermeable layer.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "solifluction"
},
{
  word: "vaporer",
  definition: "Definition: Any of several tussock moths (family Erebidae, subfamily Lymantriinae), especially of the genus Orgyia.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "vaporer"
},
{
  word: "ferity",
  definition: "Definition: The quality or fact of being wild or in a wild state; wildness, brutishness.",
  pronunciation: "/ˈfɛɹɪti/",
  englishEquivalent: "ferity"
},
{
  word: "coelenterates",
  definition: "Definition: Any simple aquatic animal formerly considered to belong to the phylum Coelenterata, now divided into the cnidarians and ctenophores.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "coelenterates"
},
{
  word: "executants",
  definition: "Definition: A person who executes a dance or piece of music; a performer.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "executants"
},
{
  word: "billfolds",
  definition: "Definition: A small, folding sleeve or case designed to hold paper currency, as well as credit cards, pictures, etc.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "billfolds"
},
{
  word: "overpromise",
  definition: "Definition: To promise more than is delivered",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "overpromise"
},
{
  word: "breath",
  definition: "Definition: The act or process of breathing.",
  pronunciation: "/bɹɛθ/",
  englishEquivalent: "breath"
},
{
  word: "shirty",
  definition: "Definition: Ill-tempered or annoyed.",
  pronunciation: "/ˈʃɜː.ti/",
  englishEquivalent: "shirty"
},
{
  word: "blip",
  definition: "Definition: To emit one or more bleeps.",
  pronunciation: "/blɪp/",
  englishEquivalent: "blip"
},
{
  word: "gastropods",
  definition: "Definition: Any member of a class of mollusks (Gastropoda) that includes snails and slugs; univalve mollusk.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "gastropods"
},
{
  word: "horror",
  definition: "Definition: An intense distressing emotion of fear or repugnance.",
  pronunciation: "/ˈhɔɹɚ/",
  englishEquivalent: "horror"
},
{
  word: "unpressed",
  definition: "Definition: Not pressed.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "unpressed"
},
{
  word: "rocamboles",
  definition: "Definition: The sand leek, Allium scorodoprasum",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "rocamboles"
},
{
  word: "direct",
  definition: "Definition: To manage, control, steer.",
  pronunciation: "/d(a)ɪˈɹɛkt/",
  englishEquivalent: "direct"
},
{
  word: "beneficiaries",
  definition: "Definition: One who benefits or receives an advantage.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "beneficiaries"
},
{
  word: "lazaretto",
  definition: "Definition: A medical facility specializing in the care for contagious patients.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "lazaretto"
},
{
  word: "invigorates",
  definition: "Definition: To impart vigor, strength, or vitality to.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "invigorates"
},
{
  word: "minkes",
  definition: "Definition: A minke whale, one of two species of baleen whales within Balaenoptera, the northern-dwelling species of which is often seen in coastal waters.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "minkes"
},
{
  word: "naves",
  definition: "Definition: The middle or body of a church, extending from the transepts to the principal entrances.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "naves"
},
{
  word: "companions",
  definition: "Definition: A friend, acquaintance, or partner; someone with whom one spends time or keeps company",
  pronunciation: "/kəmˈpænjənz/",
  englishEquivalent: "companions"
},
{
  word: "adhesives",
  definition: "Definition: A substance, such as glue, that provides or promotes adhesion",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "adhesives"
},
{
  word: "tithings",
  definition: "Definition: A tithe or tenth in its various senses, :",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "tithings"
},
{
  word: "mash",
  definition: "Definition: A mass of mixed ingredients reduced to a soft pulpy state by beating or pressure; a mass of anything in a soft pulpy state.",
  pronunciation: "/mæʃ/",
  englishEquivalent: "mash"
},
{
  word: "gristmills",
  definition: "Definition: A mill that grinds grain, especially grain brought by a farmer to be exchanged for the flour (less a percentage)",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "gristmills"
},
{
  word: "vigilante",
  definition: "Definition: A person who considers it their own responsibility to uphold the law in their neighborhood and often does so summarily and without legal jurisdiction.",
  pronunciation: "/vɪdʒɪˈlænti/",
  englishEquivalent: "vigilante"
},
{
  word: "optional",
  definition: "Definition: Something that is not compulsory, especially part of an academic course.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "optional"
},
{
  word: "decried",
  definition: "Definition: To denounce as harmful.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "decried"
},
{
  word: "tempest",
  definition: "Definition: A storm, especially one with severe winds.",
  pronunciation: "/ˈtɛmpəst/",
  englishEquivalent: "tempest"
},
{
  word: "wounded",
  definition: "Definition: To hurt or injure (someone) by cutting, piercing, or tearing the skin.",
  pronunciation: "/ˈwuːndɪd/",
  englishEquivalent: "wounded"
},
{
  word: "doorposts",
  definition: "Definition: Doorjamb",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "doorposts"
},
{
  word: "longeron",
  definition: "Definition: A thin strip of wood or metal, to which the skin of an aircraft is fastened.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "longeron"
},
{
  word: "crustal",
  definition: "Definition: Of, pertaining to, or forming a crust, especially the crust of the Earth or other planet.",
  pronunciation: "/ˈkɹʌstəl/",
  englishEquivalent: "crustal"
},
{
  word: "sobers",
  definition: "Definition: (often with up) To make or become sober.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "sobers"
},
{
  word: "elating",
  definition: "Definition: To make joyful or proud.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "elating"
},
{
  word: "fetes",
  definition: "Definition: A festival open to the public, the proceeds from which are often given to charity.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "fetes"
},
{
  word: "cloned",
  definition: "Definition: To create a clone of.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "cloned"
},
{
  word: "steps",
  definition: "Definition: An advance or movement made from one foot to the other; a pace.",
  pronunciation: "/stɛps/",
  englishEquivalent: "steps"
},
{
  word: "opes",
  definition: "Definition: To open.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "opes"
},
{
  word: "furs",
  definition: "Definition: The hairy coat of various mammal species, especially when fine, soft and thick.",
  pronunciation: "/fɜːz/",
  englishEquivalent: "furs"
},
{
  word: "outbreak",
  definition: "Definition: An eruption; the sudden appearance of a rash, disease, etc.",
  pronunciation: "/ˈaʊtbɹeɪk/",
  englishEquivalent: "outbreak"
},
{
  word: "cancelled",
  definition: "Definition: To cross out something with lines etc.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "cancelled"
},
{
  word: "paleography",
  definition: "Definition: The study of old or ancient forms of writing.",
  pronunciation: "/ˌpalɪˈɒɡɹəfi/",
  englishEquivalent: "paleography"
},
{
  word: "cliches",
  definition: "Definition: Something, most often a phrase or expression, that is overused or used outside its original context, so that its original impact and meaning are lost. A trite saying; a platitude.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "cliches"
},
{
  word: "flan",
  definition: "Definition: Baked tart with sweet or savoury filling in an open-topped pastry case. (Compare quiche.)",
  pronunciation: "/flæn/",
  englishEquivalent: "flan"
},
{
  word: "greenmail",
  definition: "Definition: Profiting from an attempted hostile takeover by forcing the target company to buy back the hostile bidder's shares at an inflated price.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "greenmail"
},
{
  word: "fauces",
  definition: "Definition: The narrow passage from the mouth to the pharynx, situated between the soft palate and the base of the tongue.",
  pronunciation: "/[fɔːsiːz]/",
  englishEquivalent: "fauces"
},
{
  word: "epiphyses",
  definition: "Definition: The pineal gland.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "epiphyses"
},
{
  word: "cesti",
  definition: "Definition: A leather fighting glove, frequently weighted with metal.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "cesti"
},
{
  word: "cowhands",
  definition: "Definition: One who tends free-range cattle, especially in the American West.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "cowhands"
},
{
  word: "candidas",
  definition: "Definition: A yeast of the genus Candida, usually specifically Candida albicans",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "candidas"
},
{
  word: "spoonful",
  definition: "Definition: The amount that a spoon will hold, either level or heaped.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "spoonful"
},
{
  word: "vernissages",
  definition: "Definition: A private viewing of an art exhibition before it opens to the public.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "vernissages"
},
{
  word: "incanted",
  definition: "Definition: To state solemnly, to chant.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "incanted"
},
{
  word: "buggered",
  definition: "Definition: To have anal sex with, sodomize.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "buggered"
},
{
  word: "horal",
  definition: "Definition: Of or relating to an hour, or to hours.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "horal"
},
{
  word: "lossy",
  definition: "Definition: Of a communication channel, subject to loss of signal strength.",
  pronunciation: "/ˈlɒsi/",
  englishEquivalent: "lossy"
},
{
  word: "drunks",
  definition: "Definition: One who is intoxicated with alcohol.",
  pronunciation: "/dɹʌŋks/",
  englishEquivalent: "drunks"
},
{
  word: "affiliates",
  definition: "Definition: Someone or something, especially, a television station, that is associated with a larger, related organization, such as a television network; a member of a group of associated things.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "affiliates"
},
{
  word: "welds",
  definition: "Definition: The joint made by welding.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "welds"
},
{
  word: "chunters",
  definition: "Definition: To speak in a soft, indistinct manner, mutter.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "chunters"
},
{
  word: "virga",
  definition: "Definition: A type of note used in plainsong notation, having a tail and representing a single tone.",
  pronunciation: "/ˈvɜːɡə/",
  englishEquivalent: "virga"
},
{
  word: "clampdown",
  definition: "Definition: A sudden repressive or punitive restriction or control",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "clampdown"
},
{
  word: "overcommits",
  definition: "Definition: To make excessive commitments, either beyond one's ability or beyond what is reasonable",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "overcommits"
},
{
  word: "implementers",
  definition: "Definition: A person who implements something.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "implementers"
},
{
  word: "municipalizes",
  definition: "Definition: To convert into a municipality",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "municipalizes"
},
{
  word: "rutting",
  definition: "Definition: To be in the annual rut or mating season.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "rutting"
},
{
  word: "smile",
  definition: "Definition: A facial expression comprised by flexing the muscles of both ends of one's mouth, often showing the front teeth, without vocalisation, and in humans is a common involuntary or voluntary expression of happiness, pleasure, amusement or anxiety.",
  pronunciation: "/ˈsmaɪ.əl/",
  englishEquivalent: "smile"
},
{
  word: "propriety",
  definition: "Definition: The particular character or essence of someone or something; individuality.",
  pronunciation: "/pɹəˈpɹaɪəti/",
  englishEquivalent: "propriety"
},
{
  word: "liquorice",
  definition: "Definition: The plant Glycyrrhiza glabra, or sometimes in North America the related American Licorice plant Glycyrrhiza lepidota.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "liquorice"
},
{
  word: "potpies",
  definition: "Definition: A pie, having pastry sides and bottom, and filled with meat etc",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "potpies"
},
{
  word: "pacemakers",
  definition: "Definition: One who sets the pace in a race, to guide the others.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "pacemakers"
},
{
  word: "contacted",
  definition: "Definition: To touch; to come into physical contact with.",
  pronunciation: "/kənˈtæktɪd/",
  englishEquivalent: "contacted"
},
{
  word: "adenovirus",
  definition: "Definition: Any virus of the family Adenoviridae, many of which are responsible for respiratory infections in humans",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "adenovirus"
},
{
  word: "indecisive",
  definition: "Definition: (of a person) Not decisive; not marked by promptness or decision.",
  pronunciation: "/ˌɪndɪˈsaɪsɪv/",
  englishEquivalent: "indecisive"
},
{
  word: "behindhand",
  definition: "Definition: (of a person) Late, tardy, overdue, behind (in accomplishing a task, etc.).",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "behindhand"
},
{
  word: "prolapses",
  definition: "Definition: A moving out of place, especially a protrusion of an internal organ",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "prolapses"
},
{
  word: "mongrelize",
  definition: "Definition: To breed a mongrel",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "mongrelize"
},
{
  word: "outmuscle",
  definition: "Definition: To surpass in a contest involving strength.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "outmuscle"
},
{
  word: "dirks",
  definition: "Definition: A long Scottish dagger with a straight blade.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "dirks"
},
{
  word: "gobbed",
  definition: "Definition: To gather into a lump.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "gobbed"
},
{
  word: "ostracod",
  definition: "Definition: Any of many small crustaceans, of the class Ostracoda, that resemble a shrimp enclosed in a bivalve shell.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "ostracod"
},
{
  word: "cadge",
  definition: "Definition: A circular frame on which cadgers carry hawks for sale.",
  pronunciation: "/kædʒ/",
  englishEquivalent: "cadge"
},
{
  word: "enjambed",
  definition: "Definition: To carry a sentence over to the next line without a pause.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "enjambed"
},
{
  word: "eluded",
  definition: "Definition: To evade, or escape from someone or something, especially by using cunning or skill",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "eluded"
},
{
  word: "marchers",
  definition: "Definition: An inhabitant of a march (border country); specifically, a marcher lord.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "marchers"
},
{
  word: "slates",
  definition: "Definition: A fine-grained homogeneous sedimentary rock composed of clay or volcanic ash which has been metamorphosed so that it cleaves easily into thin layers.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "slates"
},
{
  word: "unvarnished",
  definition: "Definition: Not having been coated with varnish (or a similar surface treatment).",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "unvarnished"
},
{
  word: "razoring",
  definition: "Definition: To shave with a razor.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "razoring"
},
{
  word: "irksome",
  definition: "Definition: Marked by irritation or annoyance; disagreeable; troublesome by reason of long continuance or repetition",
  pronunciation: "/ˈɚksəm/",
  englishEquivalent: "irksome"
},
{
  word: "singularized",
  definition: "Definition: To make singular.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "singularized"
},
{
  word: "carcases",
  definition: "Definition: The body of a dead animal.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "carcases"
},
{
  word: "hermeneutics",
  definition: "Definition: The study or theory of the methodical interpretation of text, especially holy texts.",
  pronunciation: "/hɜːɹməˈnjuːtɪks/",
  englishEquivalent: "hermeneutics"
},
{
  word: "paleography",
  definition: "Definition: The study of old or ancient forms of writing.",
  pronunciation: "/ˌpalɪˈɒɡɹəfi/",
  englishEquivalent: "paleography"
},
{
  word: "communicating",
  definition: "Definition: To impart",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "communicating"
},
{
  word: "cause",
  definition: "Definition: (often with of, typically of adverse results) The source of, or reason for, an event or action; that which produces or effects a result.",
  pronunciation: "/kɔːz/",
  englishEquivalent: "cause"
},
{
  word: "counterchange",
  definition: "Definition: An exchange of one thing for another.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "counterchange"
},
{
  word: "sonata",
  definition: "Definition: A musical composition for one or a few instruments, one of which is frequently a piano, in three or four movements that vary in key and tempo.",
  pronunciation: "/səˈnɑːtə/",
  englishEquivalent: "sonata"
},
{
  word: "tergiversate",
  definition: "Definition: To evade, to equivocate using subterfuge; to obfuscate in a deliberate manner.",
  pronunciation: "/ˈtɜːdʒɪvəseɪt/",
  englishEquivalent: "tergiversate"
},
{
  word: "cloudscapes",
  definition: "Definition: A work of art or other image depicting sky and clouds.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "cloudscapes"
},
{
  word: "knockers",
  definition: "Definition: A device, usually hinged with a striking plate, used for knocking on a door.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "knockers"
},
{
  word: "temps",
  definition: "Definition: A temporary employee, usually in an office.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "temps"
},
{
  word: "untracked",
  definition: "Definition: Not tracked.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "untracked"
},
{
  word: "zebu",
  definition: "Definition: A domesticated ox native to Asia and Africa, having a large fleshy hump on its back and a dewlap (Bos primigenius indicus).",
  pronunciation: "/ˈzeɪ.bjuː/",
  englishEquivalent: "zebu"
},
{
  word: "diving",
  definition: "Definition: To swim under water.",
  pronunciation: "/ˈdaɪvɪŋ/",
  englishEquivalent: "diving"
},
{
  word: "ferryboats",
  definition: "Definition: A boat used to ferry passengers, vehicles, or goods across open water, especially one that runs to a regular schedule",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "ferryboats"
},
{
  word: "barcarole",
  definition: "Definition: A Venetian folk song traditionally sung by gondoliers, often in 6/8 or 12/8 time with alternating strong and weak beats imitating a rowing motion.",
  pronunciation: "/ˈbɑːkəɹəʊl/",
  englishEquivalent: "barcarole"
},
{
  word: "ganglier",
  definition: "Definition: Tall and thin, especially so as to cause physical awkwardness.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "ganglier"
},
{
  word: "absolutized",
  definition: "Definition: To make absolute.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "absolutized"
},
{
  word: "grunting",
  definition: "Definition: (of a person) To make a grunt or grunts.",
  pronunciation: "/ˈɡɹʌntɪŋ/",
  englishEquivalent: "grunting"
},
{
  word: "emeritus",
  definition: "Definition: A person retired in this sense.",
  pronunciation: "/ɪˈmɛɹɪtəs/",
  englishEquivalent: "emeritus"
},
{
  word: "tsaddikim",
  definition: "Definition: A very righteous person, especially a Hassidic spiritual leader.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "tsaddikim"
},
{
  word: "peneplane",
  definition: "Definition: A low-relief plain representing the final stage of fluvial erosion during times of extended tectonic stability.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "peneplane"
},
{
  word: "wolfberries",
  definition: "Definition: Any of flowering species of the genus Lycium.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "wolfberries"
},
{
  word: "lobbed",
  definition: "Definition: To throw or hit a ball into the air in a high arch.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "lobbed"
},
{
  word: "disfigured",
  definition: "Definition: Change the appearance of something/someone to the negative.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "disfigured"
},
{
  word: "hepatitis",
  definition: "Definition: Inflammation of the liver, sometimes caused by a viral infection.",
  pronunciation: "/ˌhɛpəˈtaɪ̯tɪs/",
  englishEquivalent: "hepatitis"
},
{
  word: "mutilation",
  definition: "Definition: The act of mutilating or the state of being mutilated.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "mutilation"
},
{
  word: "gorier",
  definition: "Definition: Covered with blood, very bloody",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "gorier"
},
{
  word: "scatters",
  definition: "Definition: The act of scattering or dispersing.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "scatters"
},
{
  word: "pronunciamento",
  definition: "Definition: A manifesto or formal proclamation of rebellion, particularly in Spain, Portugal and Latin America.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "pronunciamento"
},
{
  word: "meatloaf",
  definition: "Definition: A dish of ground meat (usually made from ground beef, although lamb, pork, veal, venison, poultry and seafood are also used) formed into a loaf shape, mixed with egg and breadcrumbs, then baked or smoked, and usually served in slices.",
  pronunciation: "/ˈmiːtləʊf/",
  englishEquivalent: "meatloaf"
},
{
  word: "plasticizes",
  definition: "Definition: To make something more plastic, especially by adding a plasticizer",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "plasticizes"
},
{
  word: "bloods",
  definition: "Definition: A member of the Los Angeles gang The Bloods.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "bloods"
},
{
  word: "juking",
  definition: "Definition: To play dance music, or to dance, in a juke",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "juking"
},
{
  word: "chore",
  definition: "Definition: A task, especially a difficult, unpleasant, or routine one.",
  pronunciation: "/tʃɔː/",
  englishEquivalent: "chore"
},
{
  word: "dioptase",
  definition: "Definition: An intense emerald-green to bluish-green copper cyclosilicate mineral.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "dioptase"
},
{
  word: "disassemble",
  definition: "Definition: To take to pieces; to reverse the process of assembly.",
  pronunciation: "/dɪsəˈsɛmbəɫ/",
  englishEquivalent: "disassemble"
},
{
  word: "idolatry",
  definition: "Definition: The worship of idols.",
  pronunciation: "/aɪˈdɒl.ə.tɹiː/",
  englishEquivalent: "idolatry"
},
{
  word: "poos",
  definition: "Definition: Feces.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "poos"
},
{
  word: "amply",
  definition: "Definition: In an ample manner.",
  pronunciation: "/ˈæmp.li/",
  englishEquivalent: "amply"
},
{
  word: "resected",
  definition: "Definition: To remove (some part of an organ or structure) by surgical means.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "resected"
},
{
  word: "hulas",
  definition: "Definition: A form of chant and dance, which was developed in the Hawaiian Islands by the Polynesians who originally settled there.",
  pronunciation: "/ˈhuːləz/",
  englishEquivalent: "hulas"
},
{
  word: "reservation",
  definition: "Definition: The act of reserving, withholding or keeping back.",
  pronunciation: "/ˌɹɛzəˈveɪʃən/",
  englishEquivalent: "reservation"
},
{
  word: "rout",
  definition: "Definition: A noise, especially a loud one",
  pronunciation: "/[ɹʌʊt]/",
  englishEquivalent: "rout"
},
{
  word: "fireplace",
  definition: "Definition: An open hearth for holding a fire at the base of a chimney.",
  pronunciation: "/ˈfaɪəpleɪs/",
  englishEquivalent: "fireplace"
},
{
  word: "internalising",
  definition: "Definition: To make something internal; to incorporate it in oneself.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "internalising"
},
{
  word: "gromwell",
  definition: "Definition: Lithospermum arvense, a plant of the genus Lithospermum anciently used, because of its stony pericarp, in the cure of kidney stones.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "gromwell"
},
{
  word: "bloodstock",
  definition: "Definition: Thoroughbred animals in general, but especially horses.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "bloodstock"
},
{
  word: "antivenin",
  definition: "Definition: An antitoxin for treating bites from venomous animals as such as snakes and spiders.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "antivenin"
},
{
  word: "revisited",
  definition: "Definition: To visit again.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "revisited"
},
{
  word: "stopes",
  definition: "Definition: A mining excavation in the form of a terrace of steps.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "stopes"
},
{
  word: "amping",
  definition: "Definition: (usually with up) To amplify.",
  pronunciation: "/ˈæm.pɪŋ/",
  englishEquivalent: "amping"
},
{
  word: "wildly",
  definition: "Definition: In a wild, uncontrolled manner.",
  pronunciation: "/ˈwaɪldli/",
  englishEquivalent: "wildly"
},
{
  word: "unwell",
  definition: "Definition: Not in good health; not feeling well; somewhat ill",
  pronunciation: "/ʌnˈwɛl/",
  englishEquivalent: "unwell"
},
{
  word: "demoiselle",
  definition: "Definition: A damselfly of the family Calopterygidae.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "demoiselle"
},
{
  word: "mending",
  definition: "Definition: To repair, as anything that is torn, broken, defaced, decayed, or the like; to restore from partial decay, injury, or defacement.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "mending"
},
{
  word: "finery",
  definition: "Definition: Fineness; beauty.",
  pronunciation: "/ˈfaɪnəɹi/",
  englishEquivalent: "finery"
},
{
  word: "dropsies",
  definition: "Definition: Swelling, edema, often from chronic obstructive pulmonary disease (COPD).",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "dropsies"
},
{
  word: "refugia",
  definition: "Definition: Any local environment that has escaped regional ecological change and therefore provides a habitat for endangered species.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "refugia"
},
{
  word: "mainstreams",
  definition: "Definition: To popularize, to normalize, to render mainstream.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "mainstreams"
},
{
  word: "arming",
  definition: "Definition: To take by the arm; to take up in one's arms.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "arming"
},
{
  word: "surrejoinder",
  definition: "Definition: A plaintiff's answer to the defendant's rejoinder.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "surrejoinder"
},
{
  word: "transcultural",
  definition: "Definition: Extending through more than one human culture.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "transcultural"
},
{
  word: "technique",
  definition: "Definition: The practical aspects of a given art, occupation etc.; formal requirements.",
  pronunciation: "/tɛkˈniːk/",
  englishEquivalent: "technique"
},
{
  word: "bramble",
  definition: "Definition: Any of many closely related thorny plants in the genus Rubus including the blackberry and likely not including the raspberry proper.",
  pronunciation: "/ˈbɹæmbəl/",
  englishEquivalent: "bramble"
},
{
  word: "elitism",
  definition: "Definition: The belief that a society or system should be run by an elite.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "elitism"
},
{
  word: "yep",
  definition: "Definition: Yes.",
  pronunciation: "/jɛp/",
  englishEquivalent: "yep"
},
{
  word: "concomitants",
  definition: "Definition: Something happening or existing at the same time.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "concomitants"
},
{
  word: "monorchid",
  definition: "Definition: An individual having only one testicle within the scrotum.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "monorchid"
},
{
  word: "witenagemot",
  definition: "Definition: (history, usually uncountable, sometimes countable) Any of several assemblies which existed in Anglo-Saxon England from the 7th to the 11th century, initially with regional jurisdiction (there being different ones in Essex, Kent, Mercia, Northumbria, Sussex and Wessex), later with national jurisdiction, made up of important noblemen.",
  pronunciation: "/ˈwɪtənəjəməʊt/",
  englishEquivalent: "witenagemot"
},
{
  word: "scions",
  definition: "Definition: A descendant, especially a first-generation descendant of a distinguished family.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "scions"
},
{
  word: "sentinelling",
  definition: "Definition: To watch over as a guard.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "sentinelling"
},
{
  word: "derail",
  definition: "Definition: A device placed on railway tracks causing a train to derail.",
  pronunciation: "/dəˈɹeɪl/",
  englishEquivalent: "derail"
},
{
  word: "grooved",
  definition: "Definition: To cut a groove or channel in; to form into channels or grooves; to furrow.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "grooved"
},
{
  word: "multifoils",
  definition: "Definition: A symmetrical shape which forms the overall outline of a set of partially-overlapping circles of the same diameter.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "multifoils"
},
{
  word: "joshes",
  definition: "Definition: To tease someone in a kindly or friendly fashion.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "joshes"
},
{
  word: "derogated",
  definition: "Definition: To partially repeal (a law etc.).",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "derogated"
},
{
  word: "socialising",
  definition: "Definition: To interact with others",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "socialising"
},
{
  word: "mistakenly",
  definition: "Definition: Wrongly, erroneously",
  pronunciation: "/mɪˈsteɪ.kən.li/",
  englishEquivalent: "mistakenly"
},
{
  word: "succussed",
  definition: "Definition: To shake with vigor.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "succussed"
},
{
  word: "flesher",
  definition: "Definition: A person who removes the flesh from the skin during the making of leather.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "flesher"
},
{
  word: "breadths",
  definition: "Definition: The extent or measure of how broad or wide something is.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "breadths"
},
{
  word: "pricy",
  definition: "Definition: Expensive, dear.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "pricy"
},
{
  word: "piezoelectric",
  definition: "Definition: A piezoelectric material or device.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "piezoelectric"
},
{
  word: "withershins",
  definition: "Definition: Anti-clockwise, in the contrary direction, especially to the left or opposite to the direction of the sun.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "withershins"
},
{
  word: "campuses",
  definition: "Definition: The grounds or property of a school, college, university, business, church, or hospital, often understood to include buildings and other structures.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "campuses"
},
{
  word: "thunderheads",
  definition: "Definition: The top portion of a cumulonimbus cloud, which tends to be flattened or fibery in appearance, and may be indicative of thunderstorm activity.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "thunderheads"
},
{
  word: "stooge",
  definition: "Definition: One who knowingly allows himself or herself to be used for another's profit; a dupe.",
  pronunciation: "/stuːdʒ/",
  englishEquivalent: "stooge"
},
{
  word: "puri",
  definition: "Definition: A type of unleavened bread from India and Pakistan, usually deep-fried.",
  pronunciation: "/ˈpʊəɹi/",
  englishEquivalent: "puri"
},
{
  word: "revitalized",
  definition: "Definition: To give new life, energy, activity or success to something.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "revitalized"
},
{
  word: "fornix",
  definition: "Definition: An archlike structure or fold.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "fornix"
},
{
  word: "overpassing",
  definition: "Definition: To pass above something, as when flying or moving on a higher road.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "overpassing"
},
{
  word: "dogmatize",
  definition: "Definition: To treat something as dogma.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "dogmatize"
},
{
  word: "couplings",
  definition: "Definition: Act of joining together to form a couple",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "couplings"
},
{
  word: "credence",
  definition: "Definition: Acceptance of a belief or claim as true, especially on the basis of evidence.",
  pronunciation: "/ˈkɹiː.dəns/",
  englishEquivalent: "credence"
},
{
  word: "bikies",
  definition: "Definition: A motorcyclist who is a member of a club; a biker.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "bikies"
},
{
  word: "meandered",
  definition: "Definition: To wind or turn in a course or passage; to be intricate.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "meandered"
},
{
  word: "randomness",
  definition: "Definition: The property of all possible outcomes being equally likely.",
  pronunciation: "/ˈɹændəmnəs/",
  englishEquivalent: "randomness"
},
{
  word: "candidas",
  definition: "Definition: A yeast of the genus Candida, usually specifically Candida albicans",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "candidas"
},
{
  word: "pinpointed",
  definition: "Definition: To identify or locate precisely or with great accuracy.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "pinpointed"
},
{
  word: "nicknack",
  definition: "Definition: A small ornament of minor value.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "nicknack"
},
{
  word: "hereby",
  definition: "Definition: Near this place; nearby.",
  pronunciation: "/hɪəˈbʌɪ/",
  englishEquivalent: "hereby"
},
{
  word: "aspiration",
  definition: "Definition: The act of aspiring or ardently desiring; an ardent wish or desire, chiefly after what is elevated or spiritual (with common adjunct adpositions being to and of).",
  pronunciation: "/ˌæspəˈɹeɪʃən/",
  englishEquivalent: "aspiration"
},
{
  word: "permuted",
  definition: "Definition: Change the order of",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "permuted"
},
{
  word: "chiffonades",
  definition: "Definition: A culinary preparation of herbs or leafy vegetables cut into long, thin ribbons.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "chiffonades"
},
{
  word: "trusted",
  definition: "Definition: To place confidence in; to rely on, to confide, or have faith, in.",
  pronunciation: "/ˈtɹʌstɪd/",
  englishEquivalent: "trusted"
},
{
  word: "pupated",
  definition: "Definition: To become a pupa.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "pupated"
},
{
  word: "prelusive",
  definition: "Definition: Acting as a prelude; preliminary.",
  pronunciation: "/pɹɪˈluːsɪv/",
  englishEquivalent: "prelusive"
},
{
  word: "longtime",
  definition: "Definition: Having endured for a long period of time.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "longtime"
},
{
  word: "foresheet",
  definition: "Definition: One of the sheets (ropes) that controls the foresail",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "foresheet"
},
{
  word: "sort",
  definition: "Definition: A general type.",
  pronunciation: "/sɔːt/",
  englishEquivalent: "sort"
},
{
  word: "laded",
  definition: "Definition: To fill or load (related to cargo or a shipment).",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "laded"
},
{
  word: "brouhahas",
  definition: "Definition: A stir; a fuss or uproar.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "brouhahas"
},
{
  word: "employers",
  definition: "Definition: A person, firm or other entity which pays for or hires the services of another person.",
  pronunciation: "/No pronunciation available/",
  englishEquivalent: "employers"
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
