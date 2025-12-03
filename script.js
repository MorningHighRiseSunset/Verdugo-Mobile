let selectedLang = "en-US";
let pendingGameLang = "en-US";
let SPANISH_DICTIONARY = window.SPANISH_DICTIONARY || {};
// Optional large spanish word list loader.
window.SPANISH_WORDS = window.SPANISH_WORDS || [];
async function loadSpanishWordList() {
    if (window.SPANISH_WORDS && window.SPANISH_WORDS.length > 0) return;
    try {
        const res = await fetch('spanishWords.txt');
        if (!res.ok) return;
        const text = await res.text();
        const words = text.split(/\r?\n/).map(w => w.trim()).filter(Boolean);
        // De-duplicate and keep unique list
        window.SPANISH_WORDS = Array.from(new Set(words));
        console.log('Loaded spanishWords.txt:', window.SPANISH_WORDS.length, 'words');
    } catch (e) {
        // file not present or blocked; silent fallback to SPANISH_DICTIONARY
    }
}
const LANGUAGES = [{
        code: "en-US",
        flag: "🇺🇸",
        canonicalName: "English",
        names: {
            "en-US": "English",
            "es-ES": "Inglés",
            "fr-FR": "Anglais",
            "zh-CN": "英语",
            "hi-IN": "अंग्रेज़ी"
        }
    },
    {
        code: "es-ES",
        flag: "🇪🇸",
        canonicalName: "Spanish",
        names: {
            "en-US": "Spanish",
            "es-ES": "Español",
            "fr-FR": "Espagnol",
            "zh-CN": "西班牙语",
            "hi-IN": "स्पेनिश"
        }
    },
    {
        code: "zh-CN",
        flag: "🇨🇳",
        canonicalName: "Mandarin",
        names: {
            "en-US": "Mandarin",
            "es-ES": "Mandarín",
            "fr-FR": "Mandarin",
            "zh-CN": "普通话",
            "hi-IN": "मंदारिन"
        }
    },
    {
        code: "hi-IN",
        flag: "🇮🇳",
        canonicalName: "Hindi",
        names: {
            "en-US": "Hindi",
            "es-ES": "Hindi",
            "fr-FR": "Hindi",
            "zh-CN": "印地语",
            "hi-IN": "हिन्दी"
        }
    },
    {
        code: "fr-FR",
        flag: "🇫🇷",
        canonicalName: "French",
        names: {
            "en-US": "French",
            "es-ES": "Francés",
            "fr-FR": "Français",
            "zh-CN": "法语",
            "hi-IN": "फ्रेंच"
        }
    }
];

// Helper function to get translator URL for each language
function getTranslatorUrl(langCode) {
    const translators = {
        "en-US": "https://english-ai-helper.netlify.app/",
        "es-ES": "https://spanish-ai-translator.netlify.app/",
        "zh-CN": "https://mandarin-ai-translator.netlify.app/",
        "hi-IN": "https://hindi-ai-translator.netlify.app/",
        "fr-FR": "https://french-ai-translator.netlify.app/"
    };
    return translators[langCode] || null;
}

const BANNED_WORDS = [
    "spic", "spics", "nigger", "niggers", "chink", "chinks", "kike", "kikes", "wetback", "wetbacks",
    "fag", "fags", "faggot", "faggots", "dyke", "dykes", "tranny", "trannies", "gook", "gooks",
    "coon", "coons", "beaner", "beaners", "cracker", "crackers", "jap", "japs", "slut", "sluts",
    "whore", "whores", "bitch", "bitches", "retard", "retards", "spastic", "spastics"
    // Add more as needed
];

const TRANSLATIONS = {
    "pick_alternate_language": {
        "en-US": "Pick alternate language:",
        "es-ES": "Elige idioma alternativo:",
        "fr-FR": "Choisir une langue alternative :",
        "zh-CN": "选择其他语言：",
        "hi-IN": "वैकल्पिक भाषा चुनें:"
    },
    "word": {
        "en-US": "Word",
        "es-ES": "Palabra",
        "fr-FR": "Mot",
        "zh-CN": "单词",
        "hi-IN": "शब्द"
    },
    "choose_language": {
        "en-US": "Choose your language",
        "es-ES": "Elige tu idioma",
        "fr-FR": "Choisissez votre langue",
        "zh-CN": "选择你的语言",
        "hi-IN": "अपनी भाषा चुनें"
    },
    "instructions": {
        "en-US": "Instructions",
        "es-ES": "Instrucciones",
        "fr-FR": "Instructions",
        "zh-CN": "说明",
        "hi-IN": "निर्देश"
    },
    "start_speaking": {
        "en-US": "Start Speaking",
        "es-ES": "Comenzar a hablar",
        "fr-FR": "Commencer à parler",
        "zh-CN": "开始说话",
        "hi-IN": "बोलना शुरू करें"
    },
    "stop_speaking": {
        "en-US": "Stop Speaking",
        "es-ES": "Detener",
        "fr-FR": "Arrêter",
        "zh-CN": "停止",
        "hi-IN": "रुकें"
    },
    "game_over": {
        "en-US": "Game Over! The word was:",
        "es-ES": "¡Juego terminado! La palabra era:",
        "fr-FR": "Partie terminée ! Le mot était :",
        "zh-CN": "游戏结束！单词是：",
        "hi-IN": "खेल समाप्त! शब्द था:"
    },
    "congratulations": {
        "en-US": "Congratulations! You guessed the word:",
        "es-ES": "¡Felicidades! Adivinaste la palabra:",
        "fr-FR": "Félicitations ! Vous avez deviné le mot :",
        "zh-CN": "恭喜你！你猜对了这个词：",
        "hi-IN": "बधाई हो! आपने शब्द सही पहचाना:"
    },
    "repeat": {
        "en-US": "Repeat",
        "es-ES": "Repetir",
        "fr-FR": "Répéter",
        "zh-CN": "重复",
        "hi-IN": "दोहराएं"
    },
    "repeat_in": {
        "en-US": "Repeat in...",
        "es-ES": "Repetir en...",
        "fr-FR": "Répéter en...",
        "zh-CN": "用...重复",
        "hi-IN": "...में दोहराएं"
    },
    "show_definition": {
        "en-US": "Show definition in...",
        "es-ES": "Mostrar definición en...",
        "fr-FR": "Afficher la définition en...",
        "zh-CN": "显示定义（用...）",
        "hi-IN": "परिभाषा दिखाएं..."
    },
    "show_word": {
        "en-US": "Show word in...",
        "es-ES": "Mostrar palabra en...",
        "fr-FR": "Afficher le mot en...",
        "zh-CN": "显示单词（用...）",
        "hi-IN": "शब्द दिखाएं..."
    },
    "yes": {
        "en-US": "Yes",
        "es-ES": "Sí",
        "fr-FR": "Oui",
        "zh-CN": "是",
        "hi-IN": "हाँ"
    },
    "no": {
        "en-US": "No",
        "es-ES": "No",
        "fr-FR": "Non",
        "zh-CN": "否",
        "hi-IN": "नहीं"
    },
    "status_listening": {
        "en-US": "Listening...",
        "es-ES": "Escuchando...",
        "fr-FR": "Écoute...",
        "zh-CN": "正在聆听...",
        "hi-IN": "सुन रहा है..."
    },
    "instructions_list": {
        "en-US": [
            "Choose a language to start the game.",
            "When hyphen button is flashing blue, please click.",
            "A word related to the chosen category will be selected randomly.",
            "Guess the word by selecting letters one at a time.",
            "If the letter is in the word, it will be revealed in its correct position(s).",
            "If the letter is not in the word, a part of the hangman will be drawn.",
            "You win if you guess the word before the hangman is fully drawn.",
            "You lose if the hangman is fully drawn before you guess the word.",
            "Click a language to start a new round.",
            "Access Mic permissions through website settings."
        ],
        "es-ES": [
            "Elige un idioma para comenzar el juego.",
            "Cuando el botón de guión parpadee en azul, haz clic.",
            "Se seleccionará aleatoriamente una palabra relacionada con la categoría elegida.",
            "Adivina la palabra seleccionando letras una a una.",
            "Si la letra está en la palabra, se mostrará en su posición correcta.",
            "Si la letra no está en la palabra, se dibujará una parte del ahorcado.",
            "Ganas si adivinas la palabra antes de que el ahorcado esté completo.",
            "Pierdes si el ahorcado se completa antes de adivinar la palabra.",
            "Haz clic en un idioma para comenzar una nueva ronda.",
            "Accede a los permisos del micrófono desde la configuración del sitio web."
        ],
        "fr-FR": [
            "Choisissez une langue pour commencer la partie.",
            "Lorsque le bouton tiret clignote en bleu, cliquez dessus.",
            "Un mot lié à la catégorie choisie sera sélectionné au hasard.",
            "Devinez le mot en sélectionnant les lettres une par une.",
            "Si la lettre est dans le mot, elle sera révélée à sa position.",
            "Si la lettre n'est pas dans le mot, une partie du pendu sera dessinée.",
            "Vous gagnez si vous devinez le mot avant que le pendu ne soit complet.",
            "Vous perdez si le pendu est complet avant d'avoir deviné le mot.",
            "Cliquez sur une langue pour commencer une nouvelle partie.",
            "Accédez aux autorisations du micro via les paramètres du site."
        ],
        "zh-CN": [
            "选择一种语言开始游戏。",
            "当连字符按钮闪烁蓝色时，请点击。",
            "将随机选择与所选类别相关的单词。",
            "通过依次选择字母来猜单词。",
            "如果字母在单词中，将显示在正确的位置。",
            "如果字母不在单词中，将画出绞刑架的一部分。",
            "如果你在绞刑架完全画出前猜出单词，你就赢了。",
            "如果绞刑架完全画出前没猜出单词，你就输了。",
            "点击一种语言开始新一轮。",
            "通过网站设置访问麦克风权限。"
        ],
        "hi-IN": [
            "खेल शुरू करने के लिए एक भाषा चुनें।",
            "जब हाइफ़न बटन नीला चमके, कृपया क्लिक करें।",
            "चयनित श्रेणी से संबंधित एक शब्द यादृच्छिक रूप से चुना जाएगा।",
            "एक-एक करके अक्षर चुनकर शब्द का अनुमान लगाएं।",
            "यदि अक्षर शब्द में है, तो वह अपनी सही स्थिति में प्रकट होगा।",
            "यदि अक्षर शब्द में नहीं है, तो फांसी का एक भाग बनाया जाएगा।",
            "यदि आप फांसी पूरी बनने से पहले शब्द का अनुमान लगा लेते हैं तो आप जीत जाते हैं।",
            "यदि फांसी पूरी बनने से पहले आप शब्द का अनुमान नहीं लगा पाते हैं तो आप हार जाते हैं।",
            "नई राउंड शुरू करने के लिए भाषा पर क्लिक करें।",
            "वेबसाइट सेटिंग्स से माइक्रोफोन अनुमति प्राप्त करें।"
        ]
    }
    // Add more keys as needed for your UI!
};

// Function to detect if flag emojis are supported
function detectFlagEmojiSupport() {
    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 20;
        canvas.height = 20;
        
        // Test with a flag emoji
        ctx.font = '16px Arial';
        ctx.fillText('🇺🇸', 0, 16);
        
        const imageData = ctx.getImageData(0, 0, 20, 20);
        const data = imageData.data;
        
        // Check if the emoji was rendered (not just a placeholder)
        let hasColor = false;
        for (let i = 0; i < data.length; i += 4) {
            if (data[i] !== 0 || data[i + 1] !== 0 || data[i + 2] !== 0) {
                hasColor = true;
                break;
            }
        }
        
        return hasColor;
    } catch (e) {
        // If canvas detection fails, try a simpler approach
        return navigator.userAgent.includes('Windows') ? false : true;
    }
}

// Run detection once so other code can rely on the result
window.flagEmojiSupported = detectFlagEmojiSupport();

// Function to get flag display (emoji or fallback)
function getFlagDisplay(langCode) {
    const lang = LANGUAGES.find(l => l.code === langCode);
    if (!lang) return '';
    
    // If flag emojis are supported, use them
    if (window.flagEmojiSupported !== false) {
        return lang.flag;
    }
    
    // Fallback to country codes or symbols
    const fallbacks = {
        'en-US': '🇺🇸',
        'es-ES': '🇪🇸', 
        'zh-CN': '🇨🇳',
        'hi-IN': '🇮🇳',
        'fr-FR': '🇫🇷'
    };
    
    return fallbacks[langCode] || lang.flag;
}

function setUILanguage(langCode) {
    document.getElementById('start-btn').innerText = TRANSLATIONS.start_speaking[langCode] || "Start Speaking";
    document.getElementById('stop-btn').innerText = TRANSLATIONS.stop_speaking[langCode] || "Stop Speaking";
    document.getElementById('instructions-button').innerText = `| ${TRANSLATIONS.instructions[langCode] || "Instructions"} |`;
    document.querySelectorAll('.lang-btn').forEach((btn, idx) => {
        const lang = LANGUAGES[idx];
        // Show the language name in the UI language
        const langName = lang.names[langCode] || lang.canonicalName;
        const pickAlt = TRANSLATIONS.pick_alternate_language[langCode] || "Pick alternate language:";
        const flagDisplay = getFlagDisplay(lang.code);
        // Build button content using DOM methods (avoid innerHTML to prevent accidental anchors)
        btn.innerHTML = '';
        const flagSpan = document.createElement('span');
        flagSpan.className = 'flag-emoji';
        flagSpan.textContent = flagDisplay;
        const nameSpan = document.createElement('span');
        nameSpan.textContent = ' ' + langName;
        const br = document.createElement('br');
        const small = document.createElement('small');
        small.className = 'pick-alt-label';
        small.textContent = pickAlt;
        btn.appendChild(flagSpan);
        btn.appendChild(nameSpan);
        btn.appendChild(br);
        btn.appendChild(small);
    });
    const chooseLangTitle = document.getElementById('choose-lang-title');
    if (chooseLangTitle) {
        // Show each language with its correct flag and localized "choose language" text
        chooseLangTitle.innerHTML = LANGUAGES.map(l => {
            const flag = getFlagDisplay(l.code) || '';
            const translatorUrl = getTranslatorUrl(l.code);
            const flagHtml = translatorUrl
                ? `<a href="${translatorUrl}" target="_blank" rel="noopener noreferrer"><span class="flag-emoji">${flag}</span></a>`
                : `<span class="flag-emoji">${flag}</span>`;
            // Prefer the translation for that language code, fall back to canonical/case
            const text = TRANSLATIONS.choose_language[l.code] || l.names[selectedLang] || l.canonicalName;
            return `<div class="choose-lang-line">${flagHtml} <span>${text}</span></div>`;
        }).join('');
    }
    updateInstructionsPopup(langCode);
}

// Add translations for Start Game
TRANSLATIONS.start_game = {
    "en-US": "Start Game",
    "es-ES": "Comenzar juego",
    "fr-FR": "Démarrer le jeu",
    "zh-CN": "开始游戏",
    "hi-IN": "खेल शुरू करें"
};

// Check if the browser supports the Web Speech API
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US'; // Default to English

    // ...phoneticMap and spanishPhoneticMap unchanged...
    // (Keep your full phoneticMap and spanishPhoneticMap here)

    // --- DYNAMIC WORD GENERATION SECTION ---
    let selectedWord = '';
    let guessedLetters = [];
    let wrongGuesses = 0;
    const maxWrongGuesses = 6;
    let animationFrameId;
    let currentWordObj = null;
    let usedWords = new Set();

    // Fetch a random word and its data from real APIs
    async function fetchWordObject(language) {
        let word = '';
        let definition = '';
        let pronunciation = '';
        let englishEquivalent = '';

        // Local safe fallback words (not "apple")
        const SAFE_WORDS = [
            // Nouns
            "music", "planet", "river", "forest", "window", "garden", "school", "friend", "family", "holiday",
            "orange", "pencil", "market", "animal", "doctor", "summer", "winter", "travel", "nature", "science",
            "mountain", "ocean", "desert", "island", "village", "city", "country", "teacher", "student", "library",
            "computer", "bottle", "camera", "picture", "flower", "bridge", "castle", "cloud", "rainbow", "star",
            "moon", "sun", "tree", "leaf", "river", "beach", "forest", "desert", "valley", "hill", "lake", "park",
            "train", "bus", "car", "bicycle", "airplane", "boat", "ship", "road", "street", "tower", "house",
            "apartment", "kitchen", "bedroom", "bathroom", "livingroom", "door", "window", "roof", "wall", "floor",
            "table", "chair", "sofa", "bed", "lamp", "clock", "mirror", "phone", "television", "radio", "book",
            "magazine", "newspaper", "pen", "notebook", "bag", "wallet", "key", "ticket", "passport", "map",
            "glove", "hat", "scarf", "shirt", "pants", "dress", "shoes", "boots", "socks", "umbrella", "watch",
            "ring", "necklace", "bracelet", "earring", "pocket", "button", "zipper", "belt", "jacket", "coat",
            // Verbs
            "run", "jump", "swim", "read", "write", "draw", "sing", "dance", "cook", "bake", "drive", "fly",
            "walk", "climb", "paint", "play", "watch", "listen", "speak", "learn", "teach", "build", "fix",
            "open", "close", "start", "finish", "help", "carry", "throw", "catch", "buy", "sell", "find",
            "lose", "win", "grow", "cut", "clean", "wash", "dry", "fold", "pack", "unpack", "move", "stay",
            // Adjectives
            "happy", "sad", "angry", "brave", "calm", "clever", "funny", "kind", "lucky", "polite", "quiet",
            "quick", "slow", "strong", "weak", "young", "old", "new", "ancient", "modern", "rich", "poor",
            "tall", "short", "big", "small", "long", "wide", "narrow", "deep", "shallow", "hot", "cold",
            "warm", "cool", "bright", "dark", "clean", "dirty", "soft", "hard", "smooth", "rough", "sweet",
            "sour", "bitter", "salty", "fresh", "stale", "loud", "silent", "empty", "full", "safe", "dangerous"
        ];

        // List of common short words to avoid as game words
        const BAD_TRANSLATIONS = [
            'con', 'de', 'a', 'en', 'el', 'la', 'los', 'las', 'un', 'una', 'y', 'o', 'pero', 'por', 'para', 'sin', 'al', 'del', 'le', 'les',
            'du', 'des', 'et', 'ou', 'mais', 'avec', 'dans', 'sur', 'par', 'chez', 'au', 'aux', 'ce', 'cette', 'ces',
            '是', '的', '了', '和', '在', '有', '我', '你', '他', '她', '它', '我们', '你们', '他们', '她们', '它们'
        ];

        function getRandomSafeWord() {
            return SAFE_WORDS[Math.floor(Math.random() * SAFE_WORDS.length)];
        }

        // --- SPANISH: Use ONLY local SPANISH_DICTIONARY ---
                if (language === 'Spanish') {
                    // If a Google API key is provided in `window.GOOGLE_API_KEY`, prefer a
                    // real-time API-driven flow: fetch a random English base word and
                    // translate it into Spanish using Google Translate API (no local files
                    // required). WARNING: exposing API keys to the browser is insecure.
                    // Try server-side Netlify function first (recommended). If it fails,
                    // fall back to client-side Google key (insecure) or MyMemory.
                    // Get a base English word
                    let baseWord = '';
                    try {
                        const wordRes = await fetch('https://random-word-api.herokuapp.com/word?number=1');
                        const wordArr = await wordRes.json();
                        baseWord = wordArr && wordArr[0] ? wordArr[0] : '';
                    } catch (e) {
                        baseWord = '';
                    }
                    if (!baseWord || !/^[a-zA-Z]+$/.test(baseWord)) baseWord = SAFE_WORDS[Math.floor(Math.random() * SAFE_WORDS.length)];

                    // 1) Try Netlify function proxy
                    let translated = '';
                    let defFromProxy = '';
                    let pronFromProxy = '';
                    try {
                        const proxyUrl = `/.netlify/functions/translate?q=${encodeURIComponent(baseWord)}&target=es`;
                        const pres = await fetch(proxyUrl);
                        if (pres.ok) {
                            const pdata = await pres.json();
                            translated = pdata.translated || pdata.translatedText || '';
                            defFromProxy = pdata.definition || pdata.def || '';
                            pronFromProxy = pdata.pronunciation || pdata.pron || '';
                        }
                    } catch (e) {
                        // proxy failed, continue to other fallbacks
                    }

                    // 2) If proxy didn't return a translation, try client-side Google key (only if provided)
                    if (!translated && window.GOOGLE_API_KEY) {
                        try {
                            const key = encodeURIComponent(window.GOOGLE_API_KEY);
                            const q = encodeURIComponent(baseWord);
                            const url = `https://translation.googleapis.com/language/translate/v2?key=${key}&q=${q}&target=es&format=text`;
                            const gres = await fetch(url, { method: 'GET' });
                            const gdata = await gres.json();
                            translated = gdata?.data?.translations?.[0]?.translatedText || '';
                        } catch (e) {
                            translated = '';
                        }
                    }

                    // 3) Fallback to MyMemory if still empty
                    if (!translated) {
                        try {
                            const transRes = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(baseWord)}&langpair=en|es`);
                            const transData = await transRes.json();
                            translated = transData.responseData.translatedText || '';
                        } catch (e) {
                            translated = '';
                        }
                    }

                    if (!translated) translated = baseWord;

                    word = ('' + translated).split(/[ ,.;:!?]/)[0];
                    englishEquivalent = baseWord;

                    // Use definition from proxy if available
                    if (defFromProxy) {
                        definition = defFromProxy;
                        pronunciation = pronFromProxy || '/No pronunciation available/';
                    } else {
                        // Try to fetch a Spanish definition first, then English definition for the base word
                        try {
                            const dictRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/es/${encodeURIComponent(word)}`);
                            const dictData = await dictRes.json();
                            if (Array.isArray(dictData) && dictData[0]) {
                                definition = dictData[0].meanings?.[0]?.definitions?.[0]?.definition || '';
                                pronunciation = dictData[0].phonetic || '';
                            }
                        } catch (e) {}

                        if (!definition) {
                            try {
                                const dictResEn = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(englishEquivalent)}`);
                                const dictDataEn = await dictResEn.json();
                                if (Array.isArray(dictDataEn) && dictDataEn[0]) {
                                    definition = dictDataEn[0].meanings?.[0]?.definitions?.[0]?.definition || '';
                                    pronunciation = dictDataEn[0].phonetic || '';
                                }
                            } catch (e) {}
                        }
                    }

                    if (!definition) definition = `No definition found for "${word}".`;
                    if (!pronunciation) pronunciation = '/No pronunciation available/';

                    return { word, definition, pronunciation, englishEquivalent };

                    // No Google key: Prefer a pre-built word list `spanishWords.txt` (one word per line) if present.
                    // Fallback to `SPANISH_DICTIONARY` keys. If a chosen word is not in the
                    // local dictionary, try to get an English equivalent (MyMemory) and an
                    // English definition (DictionaryAPI.dev) as a best-effort fallback.
                    await loadSpanishWordList();

                    let chosen = '';
                    // Build a pool from the external wordlist if available, otherwise from the
                    // local SPANISH_DICTIONARY keys. Avoid repeating words already in `usedWords`.
                    const pool = (window.SPANISH_WORDS && window.SPANISH_WORDS.length > 0)
                        ? window.SPANISH_WORDS
                        : Object.keys(SPANISH_DICTIONARY).length > 0 ? Object.keys(SPANISH_DICTIONARY) : ['manzana'];

                    // Defensive: ensure pool is an array
                    const cleanPool = Array.isArray(pool) ? pool.map(p => (''+p).trim()).filter(Boolean) : ['manzana'];

                    if (cleanPool.length === 0) cleanPool.push('manzana');

                    // Try to pick a word not used in this session (usedWords stores uppercase values)
                    let tries = 0;
                    const maxTries = cleanPool.length;
                    let candidate = cleanPool[Math.floor(Math.random() * cleanPool.length)];
                    while (typeof usedWords !== 'undefined' && usedWords.has(candidate.toUpperCase()) && tries < maxTries) {
                        candidate = cleanPool[Math.floor(Math.random() * cleanPool.length)];
                        tries++;
                    }

                    // If we've exhausted the pool (tries >= maxTries) then clear usedWords to allow repeats
                    if (tries >= maxTries && typeof usedWords !== 'undefined') {
                        usedWords.clear();
                    }

                    chosen = candidate;
                    chosen = ('' + chosen).trim();
                    word = chosen;

                    const entry = SPANISH_DICTIONARY[chosen];
                    if (entry) {
                        definition = entry.definition || '';
                        pronunciation = entry.pronunciation || '';
                        englishEquivalent = entry.englishEquivalent || entry.english || '';
                    } else {
                        // Try translating the Spanish word to English (MyMemory as free fallback).
                        try {
                            const transRes = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(chosen)}&langpair=es|en`);
                            const transData = await transRes.json();
                            englishEquivalent = (transData && transData.responseData && transData.responseData.translatedText) || '';
                        } catch (e) {
                            englishEquivalent = '';
                        }

                        if (!englishEquivalent) {
                            englishEquivalent = chosen; // worst case
                        }

                        // Try to fetch an English definition for the English equivalent
                        try {
                            const dictRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(englishEquivalent)}`);
                            const dictData = await dictRes.json();
                            if (Array.isArray(dictData) && dictData[0]) {
                                definition = dictData[0].meanings?.[0]?.definitions?.[0]?.definition || '';
                                pronunciation = dictData[0].phonetic || '';
                            }
                        } catch (e) {
                            // ignore
                        }

                        if (!definition) definition = `Definition for "${chosen}" not found locally.`;
                        if (!pronunciation) pronunciation = '/No pronunciation available/';
                    }

                    return {
                        word,
                        definition,
                        pronunciation,
                        englishEquivalent
                    };
                }

        // --- ENGLISH: Use ONLY local ENGLISH_DICTIONARY.js ---
        if (language === 'English') {
            const ENGLISH_DICTIONARY = window.ENGLISH_DICTIONARY || window.dictionary || {};
            const keys = Object.keys(ENGLISH_DICTIONARY);
            if (keys.length === 0) {
                // Use a random safe word instead of always "music"
                word = SAFE_WORDS[Math.floor(Math.random() * SAFE_WORDS.length)];
                definition = "No dictionary available. This is a fallback word.";
                pronunciation = "/No pronunciation available/";
                englishEquivalent = word;
            } else {
                let randomKey = keys[Math.floor(Math.random() * keys.length)];
                let tries = 0;
                while (window.usedWords && window.usedWords.has(randomKey.toUpperCase()) && tries < keys.length) {
                    randomKey = keys[Math.floor(Math.random() * keys.length)];
                    tries++;
                }
                const entry = ENGLISH_DICTIONARY[randomKey];
                word = randomKey;
                definition = entry.definition || '';
                pronunciation = entry.pronunciation || '';
                englishEquivalent = entry.englishEquivalent || randomKey;
            }
            return {
                word,
                definition,
                pronunciation,
                englishEquivalent
            };
        }

        // --- OTHER LANGUAGES: Use API-based fallback ---
        let tries = 0;
        let maxTries = 30;
        let baseWord = '';

        while (tries < maxTries) {
            tries++;
            try {
                const wordRes = await fetch('https://random-word-api.herokuapp.com/word?number=1');
                const wordArr = await wordRes.json();
                baseWord = wordArr[0];
                if (
                    /^[a-zA-Z]+$/.test(baseWord) &&
                    !BANNED_WORDS.includes(baseWord.toLowerCase())
                ) {
                    break;
                }
            } catch (e) {}
            baseWord = '';
        }
        if (!baseWord) baseWord = getRandomSafeWord();

        let langpair = 'en|es';
        let dictLangCode = 'es';
        if (language === 'Mandarin') {
            langpair = 'en|zh-CN';
            dictLangCode = 'zh';
        }
        if (language === 'Hindi') {
            langpair = 'en|hi';
            dictLangCode = 'hi';
        }
        if (language === 'French') {
            langpair = 'en|fr';
            dictLangCode = 'fr';
        }

        let translatedWord = '';
        let translationTries = 0;
        let maxTranslationTries = 10;
        let translationSuccess = false;

        while (translationTries < maxTranslationTries && !translationSuccess) {
            translationTries++;
            try {
                const transRes = await fetch(`https://api.mymemory.translated.net/get?q=${baseWord}&langpair=${langpair}`);
                const transData = await transRes.json();
                translatedWord = transData.responseData.translatedText;
            } catch (e) {
                translatedWord = baseWord;
            }
            translatedWord = translatedWord.split(/[ ,.;:!?]/)[0];

            if (
                translatedWord &&
                translatedWord !== baseWord &&
                !BANNED_WORDS.includes(translatedWord.toLowerCase()) &&
                !BAD_TRANSLATIONS.includes(translatedWord.toLowerCase()) &&
                translatedWord.length >= 3
            ) {
                translationSuccess = true;
            } else {
                baseWord = getRandomSafeWord();
            }
        }

        if (
            !translatedWord ||
            translatedWord === baseWord ||
            BANNED_WORDS.includes(translatedWord.toLowerCase()) ||
            BAD_TRANSLATIONS.includes(translatedWord.toLowerCase()) ||
            translatedWord.length < 3
        ) {
            word = baseWord;
            englishEquivalent = baseWord;
        } else {
            word = translatedWord;
            englishEquivalent = baseWord;
        }

        try {
            const dictRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/${dictLangCode}/${encodeURIComponent(word)}`);
            const dictData = await dictRes.json();
            if (Array.isArray(dictData) && dictData[0]) {
                definition = dictData[0].meanings?.[0]?.definitions?.[0]?.definition || '';
                pronunciation = dictData[0].phonetic || '';
            }
        } catch (e) {
            definition = '';
            pronunciation = '/No pronunciation available/';
        }

        if (!definition) definition = `No definition found for "${word}" in ${language}.`;
        if (!pronunciation) pronunciation = '/No pronunciation available/';

        if (!word || word.length < 1 || /\s/.test(word)) {
            word = getRandomSafeWord();
            englishEquivalent = word;
        }

        return {
            word: word,
            definition: definition,
            pronunciation: pronunciation,
            englishEquivalent: englishEquivalent
        };
    }

    // --- UI & GAME LOGIC (mostly unchanged) ---

    document.addEventListener('gameStart', (event) => {
        recognition.lang = event.detail.language;
        const optionsContainer = document.getElementById('options-container');
        if (optionsContainer) {
            const buttons = optionsContainer.querySelectorAll('button');
            buttons.forEach(button => {
                if (button.innerText === event.detail.mode) {
                    button.click();
                }
            });
        }
    }, {
        once: true
    });

    function createKeyboard() {
        const letterContainer = document.getElementById('letter-container');
        letterContainer.innerHTML = '';

        let letters = [];
        // Use selectedLang as the source of truth for the keyboard language
        let language = typeof selectedLang === "string" && selectedLang ? selectedLang : (typeof recognition !== "undefined" && recognition.lang ? recognition.lang : "en-US");

        // Always include English A-Z
        const englishLetters = 'A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z'.split(',');

        if (language === 'es-ES') {
            // Spanish: Spanish letters + English A-Z
            letters = englishLetters.concat(['Ñ', 'Á', 'É', 'Í', 'Ó', 'Ú']);
        } else if (language === 'hi-IN') {
            // Hindi: Hindi alphabet + English A-Z
            letters = [
                'अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ए', 'ऐ', 'ओ', 'औ', 'अं', 'अः',
                'क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ', 'ट', 'ठ', 'ड', 'ढ', 'ण',
                'त', 'थ', 'द', 'ध', 'न', 'प', 'फ', 'ब', 'भ', 'म', 'य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह'
            ].concat(englishLetters);
        } else if (language === 'zh-CN') {
            // Mandarin: Common Mandarin chars + English A-Z
            letters = [
                '的', '一', '是', '不', '了', '人', '我', '在', '有', '他', '这', '个', '们', '中', '来', '上', '大', '为', '和', '国', '地', '到', '以', '说', '时', '要', '就', '出', '会', '可', '也', '你', '对', '生', '能', '而', '子', '那', '得', '于', '着', '下', '自', '之', '年', '过', '发', '后', '作', '里'
            ].concat(englishLetters);
        } else if (language === 'fr-FR') {
            // French: French accented letters + English A-Z
            letters = englishLetters.concat(['À', 'Â', 'Æ', 'Ç', 'É', 'È', 'Ê', 'Ë', 'Î', 'Ï', 'Ô', 'Œ', 'Ù', 'Û', 'Ü', 'Ÿ']);
        } else {
            // Default: English A-Z
            letters = englishLetters;
        }

        // Add hyphen button if needed
        if (selectedWord && selectedWord.includes('-')) {
            const hyphenButton = document.createElement('button');
            hyphenButton.innerText = '-';
            hyphenButton.classList.add('letter-button', 'hyphen-button', 'flashing-slow');
            hyphenButton.onclick = () => {
                handleGuess('-');
                hyphenButton.classList.add('guessed');
                setTimeout(() => {
                    hyphenButton.classList.remove('guessed');
                    hyphenButton.style.display = 'none';
                }, 500);
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
                }, 500);
            };
            letterContainer.appendChild(button);
        });

        // Ensure the container is scrollable if overflow
        letterContainer.style.overflowX = 'auto';
        letterContainer.style.whiteSpace = 'nowrap';

        // Log container logic unchanged
        const logContainer = document.getElementById('log-container');
        if (!logContainer) {
            const newLogContainer = document.createElement('div');
            newLogContainer.id = 'log-container';
            newLogContainer.style.marginTop = '20px';
            letterContainer.parentNode.appendChild(newLogContainer);
        }
    }

    function normalizeLetter(letter) {
        // Remove accents for comparison
        return letter.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
    }

    function handleGuess(letter) {
        // Normalize guessed letter for comparison
        const normalizedGuess = normalizeLetter(letter);

        // Check if already guessed (by normalized value)
        if (!guessedLetters.some(l => normalizeLetter(l) === normalizedGuess)) {
            // If any letter in selectedWord matches normalized guess, it's correct
            if (selectedWord.split('').some(l => normalizeLetter(l) === normalizedGuess)) {
                guessedLetters.push(letter); // Store the actual guessed letter
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

    const winSounds = ['correct-6033.mp3', 'sound-effect-twinklesparkle-115095.mp3'];
    const loseSounds = ['fail-144746.mp3', 'no-luck-too-bad-disappointing-sound-effect-112943.mp3', '050612_wild-west-1-36194.mp3'];

    function playRandomSound(sounds) {
        const randomIndex = Math.floor(Math.random() * sounds.length);
        const audio = new Audio(sounds[randomIndex]);
        audio.play();
    }

    const phoneticReplacements = {
        "CARLINGAS": "car-ling-gas",
        "tocopherol": "to-co-fer-ol"
    };

    function speakText(text, lang) {
        const modifiedText = text.replace(/\b\w+\b/g, word => phoneticReplacements[word.toUpperCase()] || word);
        const utterance = new SpeechSynthesisUtterance(modifiedText);
        utterance.lang = lang;
        utterance.onerror = function(event) {
            console.error('Speech synthesis error', event);
            alert(`Speech synthesis error: ${event.error}`);
        };
        window.speechSynthesis.speak(utterance);
    }

    function checkGameStatus() {
        if (selectedWord && wrongGuesses >= maxWrongGuesses) {
            cancelAnimationFrame(animationFrameId);
            showTemporaryPopup('Game Over! The word was: ' + selectedWord, false);
            // logWordResult(selectedWord, getWordDefinition(selectedWord), false); // REMOVE THIS LINE
            playRandomSound(loseSounds);
            showRepeatButtons(currentWordObj);
            showWordInfo(currentWordObj);
            resetGame();
        } else if (selectedWord && selectedWord.split('').every(letter => guessedLetters.includes(letter))) {
            cancelAnimationFrame(animationFrameId);
            showTemporaryPopup('Congratulations! You guessed the word: ' + selectedWord, true);
            // logWordResult(selectedWord, getWordDefinition(selectedWord), true); // REMOVE THIS LINE
            playRandomSound(winSounds);
            showRepeatButtons(currentWordObj);
            showWordInfo(currentWordObj);
            resetGame();
        }
    }

    function updateInstructionsPopup(langCode) {
        const instructionsPopup = document.getElementById('instructions-popup');
        if (!instructionsPopup) return;

        // Get translated title and steps
        const title = TRANSLATIONS.instructions[langCode] || "Instructions";
        const steps = TRANSLATIONS.instructions_list[langCode] || TRANSLATIONS.instructions_list["en-US"];

        // Update the popup content
        const popupContent = instructionsPopup.querySelector('.popup-content');
        if (!popupContent) return;

        // Build the steps as <ol>
        const stepsHtml = Array.isArray(steps) ?
            `<ol>${steps.map(step => `<li>${step}</li>`).join('')}</ol>` :
            `<p>${steps}</p>`;

        popupContent.innerHTML = `
        <span id="close-popup" class="close">&times;</span>
        <h2>${title}</h2>
        <p></p>
        ${stepsHtml}
    `;

        // Re-attach close handler
        const closePopup = popupContent.querySelector('#close-popup');
        if (closePopup) {
            closePopup.onclick = () => instructionsPopup.classList.add('hide');
        }
    }

    document.addEventListener("DOMContentLoaded", function() {
        // Initialize flag emoji support detection
        window.flagEmojiSupported = detectFlagEmojiSupport();
        console.log('Flag emoji support detected:', window.flagEmojiSupported);
        
        // Popup language selection (first language box)
        const popup = document.getElementById('lang-select-popup');
        const btnsDiv = document.getElementById('lang-select-buttons');
        btnsDiv.innerHTML = '';
        LANGUAGES.forEach(lang => {
            // Create a row for label + button
            const row = document.createElement('div');
            row.style.display = 'flex';
            row.style.alignItems = 'center';
            row.style.gap = '12px';
            row.style.marginBottom = '8px';

                // Create the label (use the language's flag instead of a globe)
                const label = document.createElement('span');
                const flagDisplay = getFlagDisplay(lang.code);
                // Make the flag a link to the translator tool for all languages
                const translatorUrl = getTranslatorUrl(lang.code);
                const flagHtml = translatorUrl
                    ? `<a href="${translatorUrl}" target="_blank" rel="noopener noreferrer"><span class="flag-emoji">${flagDisplay}</span></a>`
                    : `<span class="flag-emoji">${flagDisplay}</span>`;
                label.innerHTML = `${flagHtml} ${TRANSLATIONS.choose_language[lang.code]}`;
                label.style.minWidth = '180px';
                label.style.textAlign = 'right';

                // Create the button (always a plain button — the left label handles translator links)
                const btn = document.createElement('button');
                btn.innerHTML = '';
                const btnFlag = document.createElement('span');
                btnFlag.className = 'flag-emoji';
                btnFlag.textContent = flagDisplay;
                const btnName = document.createElement('span');
                btnName.textContent = ' ' + (lang.names[lang.code] || lang.canonicalName);
                btn.appendChild(btnFlag);
                btn.appendChild(btnName);
            btn.style.padding = '4px 16px 4px 10px'; // More right padding
            btn.style.fontSize = '15px';
            btn.style.minWidth = '80px';
            btn.style.width = 'auto';
            btn.style.maxWidth = '140px'; // Slightly wider for "Français"
            btn.style.overflow = 'hidden';
            btn.style.textOverflow = 'ellipsis';
            btn.onclick = function() {
                selectedLang = lang.code; // Set UI language
                if (typeof recognition !== "undefined") recognition.lang = lang.code;
                setUILanguage(lang.code);
                popup.style.display = "none";
                // Highlight the correct button in the main UI
                document.querySelectorAll('.lang-btn').forEach((b, idx) => {
                    b.classList.toggle('active', LANGUAGES[idx].code === lang.code);
                });
                pendingGameLang = lang.code; // Also set as pending game language
                updateInstructionsPopup(lang.code); // Update instructions popup language
            };

            row.appendChild(label);
            row.appendChild(btn);
            btnsDiv.appendChild(row);
        });

        // Main UI language selection (second language box)
        document.querySelectorAll('.lang-btn').forEach((btn, idx) => {
            btn.onclick = function() {
                pendingGameLang = LANGUAGES[idx].code;
                // Do NOT set selectedLang here!
                document.querySelectorAll('.lang-btn').forEach((b, i) => {
                    b.classList.toggle('active', i === idx);
                });
                // Do NOT call setUILanguage(selectedLang) here!
                if (typeof recognition !== "undefined") recognition.lang = pendingGameLang;
                if (typeof fetchWordObject === "function") {
                    const langObj = LANGUAGES.find(l => l.code === pendingGameLang);
                    const langName = langObj ? langObj.canonicalName : "English";
                    fetchWordObject(langName).then(wordObj => {
                        currentWordObj = wordObj;
                        selectedWord = wordObj.word.toUpperCase();
                        usedWords.add(selectedWord);
                        guessedLetters = [];
                        wrongGuesses = 0;
                        if (typeof updateWordDisplay === "function") updateWordDisplay();
                        if (typeof drawHangman === "function") drawHangman();
                        if (typeof createKeyboard === "function") createKeyboard();
                    });
                }
            };
        });

        setUILanguage(selectedLang);

        // (removed defensive click handler — main fix ensures `.lang-btn` never contains anchors)
    });

    function showRepeatButtons(wordObj) {
        let logContainer = document.getElementById('log-container');
        if (!logContainer) return;

        // Remove any previous repeat controls (optional, for cleanliness)
        const oldControls = logContainer.querySelector('.repeat-controls');
        if (oldControls) oldControls.remove();

        const currentLang = recognition.lang;
        const langMap = {
            'en-US': 'English',
            'es-ES': 'Spanish',
            'zh-CN': 'Mandarin',
            'hi-IN': 'Hindi',
            'fr-FR': 'French'
        };
        const langCodes = Object.keys(langMap);

        // Create wrapper for repeat controls
        const repeatControls = document.createElement('div');
        repeatControls.className = 'repeat-controls';
        repeatControls.style.marginTop = '12px';

        // Create dropdown
        const dropdown = document.createElement('select');
        dropdown.style.margin = '5px';
        dropdown.style.padding = '8px';
        dropdown.style.fontSize = '16px';
        dropdown.id = 'repeat-dropdown';

        // Add default option
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.innerText = 'Repeat in...';
        defaultOption.disabled = true;
        defaultOption.selected = true;
        dropdown.appendChild(defaultOption);

        // Add current language option
        const currentOption = document.createElement('option');
        currentOption.value = currentLang;
        currentOption.innerText = langMap[currentLang] || 'Current';
        dropdown.appendChild(currentOption);

        // Add other language options
        langCodes.forEach(code => {
            if (code !== currentLang) {
                const opt = document.createElement('option');
                opt.value = code;
                opt.innerText = langMap[code];
                dropdown.appendChild(opt);
            }
        });

        // --- Auto-resize repeat-dropdown ---
        function resizeRepeatDropdown() {
            const tempSpan = document.createElement('span');
            tempSpan.style.visibility = 'hidden';
            tempSpan.style.position = 'fixed';
            tempSpan.style.fontSize = window.getComputedStyle(dropdown).fontSize;
            tempSpan.style.fontFamily = window.getComputedStyle(dropdown).fontFamily;
            tempSpan.innerText = dropdown.options[dropdown.selectedIndex].text;
            document.body.appendChild(tempSpan);
            dropdown.style.width = (tempSpan.offsetWidth + 40) + 'px';
            document.body.removeChild(tempSpan);
        }
        dropdown.addEventListener('change', resizeRepeatDropdown);
        resizeRepeatDropdown();

        // Add a button to trigger repeat
        const repeatBtn = document.createElement('button');
        repeatBtn.innerText = 'Repeat';
        repeatBtn.style.margin = '5px';
        repeatBtn.id = 'repeat-btn';
        repeatBtn.onclick = () => {
            const selectedLang = dropdown.value;
            if (!selectedLang) return;
            let text = selectedLang === 'en-US' ? wordObj.englishEquivalent : wordObj.word;
            if (selectedLang !== 'en-US' && selectedLang !== currentLang) {
                // Translate if needed
                fetch(`https://api.mymemory.translated.net/get?q=${wordObj.englishEquivalent}&langpair=en|${selectedLang.split('-')[0]}`)
                    .then(res => res.json())
                    .then(data => {
                        const translated = data.responseData.translatedText;
                        speakText(translated, selectedLang);
                    })
                    .catch(() => {
                        speakText(text, selectedLang);
                    });
            } else {
                speakText(text, selectedLang);
            }
        };

        // Add controls to wrapper, then to logContainer
        repeatControls.appendChild(dropdown);
        repeatControls.appendChild(repeatBtn);
        logContainer.appendChild(repeatControls);
    }

    // --- DYNAMIC WORD INFO FUNCTIONS ---
    function getWordPronunciation(word) {
        return currentWordObj && currentWordObj.word.toUpperCase() === word ? currentWordObj.pronunciation : '';
    }

    function getEnglishEquivalent(word) {
        return currentWordObj && currentWordObj.word.toUpperCase() === word ? currentWordObj.englishEquivalent : word;
    }

    function getWordDefinition(word) {
        return currentWordObj && currentWordObj.word.toUpperCase() === word ? currentWordObj.definition : '';
    }

    function resetGame() {
        selectedWord = '';
        guessedLetters = [];
        wrongGuesses = 0;
        updateWordDisplay();
        drawHangman();
        // REMOVE or COMMENT OUT these lines:
        // const defBox = document.getElementById('definition-box');
        // if (defBox) defBox.remove();
    }

    // --- DYNAMIC LANGUAGE OPTIONS ---

    function showWordInfo(wordObj) {
        const logContainer = document.getElementById('log-container');
        if (!logContainer) return;

        // Detect UI language code (e.g., 'zh-CN', 'es', etc.)
        let uiLang = selectedLang || 'en-US';
        let uiLangShort = uiLang.split('-')[0];
        if (uiLang === 'en-US') uiLangShort = 'en';
        if (uiLang === 'es-ES') uiLangShort = 'es';
        if (uiLang === 'fr-FR') uiLangShort = 'fr';
        if (uiLang === 'hi-IN') uiLangShort = 'hi';
        // Mandarin stays 'zh-CN'

        // Determine played word and equivalent
        let playedWord = wordObj.word;
        let equivalentWord = wordObj.englishEquivalent;

        // If UI is not English, translate the equivalent to UI language
        async function getEquivalentInUILang() {
            if (uiLangShort === 'en') return equivalentWord;
            try {
                const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(equivalentWord)}&langpair=en|${uiLangShort}`);
                const data = await res.json();
                return data.responseData.translatedText || equivalentWord;
            } catch {
                return equivalentWord;
            }
        }

        // Get definition in UI language
        async function getDefinitionInUILang() {
            // Prefer a real English definition (not the placeholder) and translate it when needed.
            // First: try to fetch a reliable English definition for the English equivalent.
            let englishDef = '';

            // If wordObj.definition looks like a real definition (not a fallback message), prefer it
            const defText = (wordObj.definition || '').toString();
            const isPlaceholder = /no definition|fallback|not found|No hay diccionario|No dictionary/i.test(defText);
            if (defText && !isPlaceholder) {
                englishDef = defText;
            }

            // If we still don't have an English definition, fetch from DictionaryAPI.dev
            if (!englishDef) {
                try {
                    const dictResEn = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(equivalentWord)}`);
                    const dictDataEn = await dictResEn.json();
                    if (Array.isArray(dictDataEn) && dictDataEn[0]) {
                        englishDef = dictDataEn[0].meanings?.[0]?.definitions?.[0]?.definition || '';
                    }
                } catch (e) {
                    // ignore
                }
            }

            // If still no English definition, give up early
            if (!englishDef) return `<span style="color:orange;">No definition found.</span>`;

            // If UI language is English, return the English definition
            if (uiLangShort === 'en') return englishDef;

            // Try to use the server-side Netlify translate function to get a translated definition
            try {
                const proxyUrl = `/.netlify/functions/translate?q=${encodeURIComponent(equivalentWord)}&target=${encodeURIComponent(uiLangShort)}`;
                const pres = await fetch(proxyUrl);
                if (pres.ok) {
                    const pdata = await pres.json();
                    // If the proxy returned a helpful translated definition, use it
                    if (pdata.definition && !/No definition found/i.test(pdata.definition)) {
                        return pdata.definition;
                    }
                    // Otherwise if it returned a translated text, use that
                    if (pdata.translated && pdata.translated !== '') return pdata.translated;
                }
            } catch (e) {
                // proxy failed, fall back
            }

            // Fallback: translate the English definition via MyMemory
            try {
                const transDefRes = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(englishDef)}&langpair=en|${uiLangShort}`);
                const transDefData = await transDefRes.json();
                return transDefData.responseData.translatedText || englishDef;
            } catch {
                return englishDef;
            }
        }

        // Get label for "Word" and "Equivalent" in UI language
        const playedLabel = (TRANSLATIONS.word && TRANSLATIONS.word[uiLang]) || "Word";
        const eqLabels = {
            'en': 'English Equivalent',
            'es': 'Spanish Equivalente',
            'fr': 'French Equivalent',
            'zh-CN': 'Mandarin Equivalent',
            'hi': 'Hindi Equivalent'
        };
        const eqLabel = eqLabels[uiLangShort] || 'Equivalent';

        // Async update UI
        (async () => {
            const eqWord = await getEquivalentInUILang();
            const def = await getDefinitionInUILang();
            logContainer.innerHTML = `
                <div style="margin:0;padding:0;">
                    <strong>${playedLabel}:</strong> <span id="word-info-word">${playedWord}</span>
                    &nbsp;|&nbsp;
                    <strong>${eqLabel}:</strong> <span id="word-info-equivalent">${eqWord}</span>
                </div>
                <div style="margin:0;padding:0;">
                    <strong>Definition:</strong> <span id="word-info-def">${def}</span>
                    <br>
                    <button id="show-def-in-btn" style="margin-top:6px;margin-left:0;"><span class="flag-emoji">${getFlagDisplay(uiLang)}</span> ${TRANSLATIONS.show_definition && TRANSLATIONS.show_definition[uiLang] ? TRANSLATIONS.show_definition[uiLang] : 'Show definition in...'}</button>
                    <select id="def-lang-dropdown" style="margin-left:5px;margin-top:6px;">
                        <option value="es">Spanish</option>
                        <option value="en">English</option>
                        <option value="fr">French</option>
                        <option value="hi">Hindi</option>
                        <option value="zh-CN">Mandarin</option>
                    </select>
                    <br>
                    <strong>Pronunciation:</strong> <span id="word-info-pron">${wordObj.pronunciation ?? '<span style="color:orange;">No pronunciation available.</span>'}</span>
                    <button id="tts-btn" style="margin-left:10px;">🔊</button>
                    <br>
                    <div style="margin-top:10px;">
                        <select id="show-in-lang">
                            <option value="">${TRANSLATIONS.show_word && TRANSLATIONS.show_word[uiLang] ? TRANSLATIONS.show_word[uiLang] : "Show word in..."}</option>
                            <option value="es">Spanish</option>
                            <option value="zh-CN">Mandarin</option>
                            <option value="hi">Hindi</option>
                            <option value="fr">French</option>
                        </select>
                        <button id="show-in-btn">${TRANSLATIONS.show_word && TRANSLATIONS.show_word[uiLang] ? TRANSLATIONS.show_word[uiLang] : "Show"}</button>
                    </div>
                </div>
            `;
            document.getElementById('tts-btn').onclick = () => {
                const utter = new SpeechSynthesisUtterance(playedWord);
                utter.lang = uiLang;
                window.speechSynthesis.speak(utter);
            };

            // Handler for "Show definition in..." button
            document.getElementById('show-def-in-btn').onclick = async () => {
                const defLang = document.getElementById('def-lang-dropdown').value;
                // We want a real English definition to translate, not a placeholder message.
                let englishDef = '';
                const defText = (wordObj.definition || '').toString();
                const isPlaceholder = /no definition|fallback|not found|No hay diccionario|No dictionary/i.test(defText);
                if (defText && !isPlaceholder) englishDef = defText;

                if (!englishDef) {
                    try {
                        const dictResEn = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(equivalentWord)}`);
                        const dictDataEn = await dictResEn.json();
                        if (Array.isArray(dictDataEn) && dictDataEn[0]) {
                            englishDef = dictDataEn[0].meanings?.[0]?.definitions?.[0]?.definition || '';
                        }
                    } catch (e) {
                        // ignore
                    }
                }

                if (!englishDef) {
                    document.getElementById('word-info-def').innerHTML = `<span style="color:orange;">No English definition found to translate.</span>`;
                    return;
                }

                if (defLang === 'en') {
                    document.getElementById('word-info-def').innerText = englishDef;
                    return;
                }

                // Try server-side translation via Netlify function first
                try {
                    const proxyUrl = `/.netlify/functions/translate?q=${encodeURIComponent(equivalentWord)}&target=${encodeURIComponent(defLang)}`;
                    const pres = await fetch(proxyUrl);
                    if (pres.ok) {
                        const pdata = await pres.json();
                        if (pdata.definition && !/No definition found/i.test(pdata.definition)) {
                            document.getElementById('word-info-def').innerText = pdata.definition;
                            return;
                        }
                        if (pdata.translated && pdata.translated !== '') {
                            document.getElementById('word-info-def').innerText = pdata.translated;
                            return;
                        }
                    }
                } catch (e) {
                    // proxy failed, fall back
                }

                // Fallback to client-side translation of the English definition
                try {
                    const transDefRes = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(englishDef)}&langpair=en|${defLang}`);
                    const transDefData = await transDefRes.json();
                    const translatedDef = transDefData.responseData.translatedText;
                    document.getElementById('word-info-def').innerText = translatedDef;
                } catch (e) {
                    document.getElementById('word-info-def').innerHTML = `<span style="color:orange;">Could not translate definition.</span>`;
                }
            };

            // Handler for "Show word in..." button
            document.getElementById('show-in-btn').onclick = async () => {
                const lang = document.getElementById('show-in-lang').value;
                if (!lang) return;
                // Translate the English equivalent to the selected language
                let translated = '';
                try {
                    const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(equivalentWord)}&langpair=en|${lang}`);
                    const data = await res.json();
                    translated = data.responseData.translatedText;
                } catch {
                    translated = equivalentWord;
                }
                // Try DictionaryAPI.dev for definition/pronunciation in target language
                let def = '', pron = '';
                try {
                    const dictRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/${lang}/${encodeURIComponent(translated)}`);
                    const dictData = await dictRes.json();
                    if (Array.isArray(dictData) && dictData[0]) {
                        def = dictData[0].meanings?.[0]?.definitions?.[0]?.definition || '';
                        pron = dictData[0].phonetic || '';
                    }
                } catch {}
                // If not found, get English definition and translate it
                if (!def) {
                    try {
                        const dictResEn = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(equivalentWord)}`);
                        const dictDataEn = await dictResEn.json();
                        if (Array.isArray(dictDataEn) && dictDataEn[0]) {
                            let englishDef = dictDataEn[0].meanings?.[0]?.definitions?.[0]?.definition || '';
                            if (englishDef) {
                                const transDefRes = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(englishDef)}&langpair=en|${lang}`);
                                const transDefData = await transDefRes.json();
                                def = transDefData.responseData.translatedText;
                            }
                            pron = dictDataEn[0].phonetic || '';
                        }
                    } catch {}
                }
                if (!def) def = `<span style="color:orange;">No definition found for "${translated}" in this language.</span>`;
                if (!pron) pron = '<span style="color:orange;">No pronunciation available.</span>';
                // Update UI with translated word/definition
                logContainer.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                        <div>
                            <strong>${playedLabel}:</strong> <span id="word-info-word">${translated}</span>
                        </div>
                        <div>
                            <strong>${eqLabel}:</strong>
                            <span id="word-info-equivalent">${equivalentWord}</span>
                        </div>
                    </div>
                    <strong>Definition:</strong> <span id="word-info-def">${def}</span>
                    <button id="show-def-in-btn" style="margin-left:10px;"><span class="flag-emoji">${getFlagDisplay(uiLang)}</span> ${TRANSLATIONS.show_definition && TRANSLATIONS.show_definition[uiLang] ? TRANSLATIONS.show_definition[uiLang] : 'Show definition in...'}</button>
                    <select id="def-lang-dropdown" style="margin-left:5px;">
                        <option value="es">Spanish</option>
                        <option value="en">English</option>
                        <option value="fr">French</option>
                        <option value="hi">Hindi</option>
                        <option value="zh-CN">Mandarin</option>
                    </select>
                    <br>
                    <strong>Pronunciation:</strong> <span id="word-info-pron">${pron}</span>
                    <button id="tts-btn" style="margin-left:10px;">🔊</button>
                    <br>
                    <div style="margin-top:10px;">
                        <select id="show-in-lang">
                            <option value="">${TRANSLATIONS.show_word && TRANSLATIONS.show_word[uiLang] ? TRANSLATIONS.show_word[uiLang] : "Show word in..."}</option>
                            <option value="es">Spanish</option>
                            <option value="zh-CN">Mandarin</option>
                            <option value="hi">Hindi</option>
                            <option value="fr">French</option>
                        </select>
                        <button id="show-in-btn">${TRANSLATIONS.show_word && TRANSLATIONS.show_word[uiLang] ? TRANSLATIONS.show_word[uiLang] : "Show"}</button>
                    </div>
                `;
                document.getElementById('tts-btn').onclick = () => {
                    const utter = new SpeechSynthesisUtterance(translated);
                    utter.lang = lang;
                    window.speechSynthesis.speak(utter);
                };
            };
            showRepeatButtons(wordObj);
        })();
    }

    function updateWordDisplay() {
        const wordDisplay = document.getElementById('word-display');
        // If UI is English and word is Mandarin, show Mandarin char with guessed English letter in parentheses
        if (selectedLang === 'en-US' && pendingGameLang === 'zh-CN') {
            // Example: Assume you have a mapping for the current word
            // For demo, let's say currentWordObj.pinyin = ['A', 'B', 'C'] for each Mandarin char
            const pinyinArr = currentWordObj && currentWordObj.pinyin ? currentWordObj.pinyin : [];
            wordDisplay.innerHTML = selectedWord.split('').map((char, idx) => {
                // If guessed, show Mandarin char with (A) above if guessed letter matches pinyin
                const guessed = guessedLetters.some(g => g.toUpperCase() === (pinyinArr[idx] || '').toUpperCase());
                if (guessed) {
                    return `<div style="display:inline-block;text-align:center;">
                    <span style="font-size:0.8em;">(${pinyinArr[idx] || ''})</span><br>
                    <span>${char}</span>
                </div>`;
                } else {
                    return `<span style="margin:0 4px;">_</span>`;
                }
            }).join(' ');
        } else {
            // Default: show letters or underscores
            wordDisplay.innerText = selectedWord.split('').map(letter => {
                return guessedLetters.some(g => normalizeLetter(g) === normalizeLetter(letter)) ? letter : '_';
            }).join(' ');
        }
    }

    function drawHangman() {
        const canvas = document.getElementById('hangman-canvas');
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.beginPath();
        context.moveTo(10, 140);
        context.lineTo(190, 140);
        context.moveTo(30, 140);
        context.lineTo(30, 10);
        context.lineTo(110, 10);
        context.lineTo(110, 20);
        context.stroke();

        if (wrongGuesses > 0) {
            context.beginPath();
            context.arc(110, 30, 10, 0, Math.PI * 2);
            context.stroke();
        }
        if (wrongGuesses > 1) {
            context.beginPath();
            context.moveTo(110, 40);
            context.lineTo(110, 90);
            context.stroke();
        }
        if (wrongGuesses > 2) {
            context.beginPath();
            context.moveTo(110, 50);
            context.lineTo(90, 70);
            context.stroke();
        }
        if (wrongGuesses > 3) {
            context.beginPath();
            context.moveTo(110, 50);
            context.lineTo(130, 70);
            context.stroke();
        }
        if (wrongGuesses > 4) {
            context.beginPath();
            context.moveTo(110, 90);
            context.lineTo(90, 110);
            context.stroke();
        }
        if (wrongGuesses > 5) {
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
            context.translate(Math.sin(frame / 10) * 5, 0);
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
            console.log(`Recognized: ${transcript}`);

            if (transcript.length === 1 || phoneticMap[transcript] || spanishPhoneticMap[transcript]) {
                transcript = phoneticMap[transcript] || spanishPhoneticMap[transcript] || transcript.toUpperCase();
            } else {
                continue;
            }

            if (event.results[i].isFinal) {
                finalTranscript += transcript;
            } else {
                interimTranscript += transcript;
            }
        }

        document.getElementById('result').innerHTML = finalTranscript + '<i style="color:#999;">' + interimTranscript + '</i>';

        if (finalTranscript) {
            const guessedLetter = finalTranscript.toUpperCase();
            handleGuess(guessedLetter);
        }

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
                            button.click();
                        }, 500);
                    }
                });
                handleGuess(suggestion);
                resultElement.innerHTML = '';
            };

            document.getElementById('no-btn').onclick = () => {
                resultElement.innerHTML = '';
            };
        } else {
            resultElement.innerHTML = `Did you mean: <span style="color: lightgreen;">${interimTranscript.toUpperCase()}</span>?`;
        }
    }

    recognition.onerror = function(event) {
        console.error('Speech recognition error', event);
        alert(`Speech recognition error: ${event.error}`);
    };

    recognition.onend = function() {
        console.log('Speech recognition ended');
        document.getElementById('status').innerText = '';
        document.getElementById('start-btn').disabled = false;
        document.getElementById('stop-btn').disabled = true;
    };

    let audioStream = null;

    document.getElementById('start-btn').onclick = function() {
        navigator.mediaDevices.getUserMedia({
            audio: true
        }).then(stream => {
            audioStream = stream;
            const audioContext = new(window.AudioContext || window.webkitAudioContext)();
            const source = audioContext.createMediaStreamSource(stream);
            const gainNode = audioContext.createGain();
            gainNode.gain.value = 2;
            source.connect(gainNode).connect(audioContext.destination);
            recognition.start();
        }).catch(error => {
            console.error('Error accessing microphone:', error);
            alert('Error accessing microphone. Please check your microphone settings.');
        });
    };

    document.getElementById('stop-btn').onclick = function() {
        recognition.stop();
        if (audioStream) {
            audioStream.getTracks().forEach(track => track.stop());
            audioStream = null;
        }
    };

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

    if (instructionsButton && instructionsPopup) {
        instructionsButton.addEventListener('click', () => {
            updateInstructionsPopup(selectedLang); // Always update before showing
            instructionsPopup.classList.remove('hide');
        });
    }

    if (closePopup && instructionsPopup) {
        closePopup.addEventListener('click', () => {
            instructionsPopup.classList.add('hide');
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target === instructionsPopup) {
            instructionsPopup.classList.add('hide');
        }
    });

    document.body.style.backgroundImage = "url('watermark_cropped.gif')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center 20%";
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
body {
  color: black;
  /* Removed text-shadow for clarity */
  font-family: 'Segoe UI', Arial, Helvetica, sans-serif;
}
`;
document.head.appendChild(style);