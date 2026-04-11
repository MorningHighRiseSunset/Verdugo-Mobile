let selectedLang = null; // No language selected by default
let pendingGameLang = null;
let SPANISH_DICTIONARY = window.SPANISH_DICTIONARY || {};

// Helper: detect likely English definition text (simple heuristic)
function isProbablyEnglishText(text) {
    if (!text || typeof text !== 'string') return false;
    const t = text.toLowerCase();
    // if contains common English function words, likely English
    const common = [' the ', ' and ', ' to ', ' of ', ' a ', ' is ', ' in ', ' for ', ' that ', ' this ', ' be ', ' by '];
    for (const w of common) if (t.includes(w)) return true;
    // if it contains typical Spanish characters, treat as not English
    if (/[áéíóúñü¿¡]/i.test(text)) return false;
    // if it's short or contains mostly single-word glosses, assume not English
    if (t.split(' ').length <= 2 && t.length < 20) return false;
    // fallback: if contains only ascii letters and spaces, treat as English-ish
    if (/^[\x00-\x7F]+$/.test(text)) return true;
    return false;
}

// Heuristic: does the text look like it's already in `langShort`?
function textLooksLikeLang(text, langShort) {
    if (!text || typeof text !== 'string') return false;
    const t = text.toLowerCase();
    if (langShort === 'en') return isProbablyEnglishText(text);
    if (langShort === 'es') {
        // check for Spanish-specific characters or common Spanish words
        if (/[áéíóúñü¿¡]/i.test(text)) return true;
        const commonEs = [' el ', ' la ', ' de ', ' que ', ' y ', ' en ', ' para ', ' con ', ' por ', 'no '];
        for (const w of commonEs) if (t.includes(w)) return true;
        return false;
    }
    // naive fallback: treat as not matching
    return false;
}

// Simple transliteration for Devanagari (Hindi) -> Latin (IAST-like simplified)
function transliterateDevanagari(input) {
    if (!input || typeof input !== 'string') return '';
    // Basic mappings
    const vowels = {
        '\u0905': 'a', '\u0906': 'ā', '\u0907': 'i', '\u0908': 'ī', '\u0909': 'u', '\u090A': 'ū',
        '\u090F': 'e', '\u0910': 'ai', '\u0913': 'o', '\u0914': 'au', '\u0960': 'r̥'
    };
    const vowelSigns = {
        '\u093E': 'ā', '\u093F': 'i', '\u0940': 'ī', '\u0941': 'u', '\u0942': 'ū', '\u0947': 'e', '\u0948': 'ai', '\u094B': 'o', '\u094C': 'au', '\u0902': 'ṃ', '\u0903': 'ḥ'
    };
    const consonants = {
        '\u0915': 'k', '\u0916': 'kh', '\u0917': 'g', '\u0918': 'gh', '\u0919': 'ṅ',
        '\u091A': 'c', '\u091B': 'ch', '\u091C': 'j', '\u091D': 'jh', '\u091E': 'ñ',
        '\u091F': 'ṭ', '\u0920': 'ṭh', '\u0921': 'ḍ', '\u0922': 'ḍh', '\u0923': 'ṇ',
        '\u0924': 't', '\u0925': 'th', '\u0926': 'd', '\u0927': 'dh', '\u0928': 'n',
        '\u092A': 'p', '\u092B': 'ph', '\u092C': 'b', '\u092D': 'bh', '\u092E': 'm',
        '\u092F': 'y', '\u0930': 'r', '\u0932': 'l', '\u0935': 'v', '\u0936': 'ś', '\u0937': 'ṣ', '\u0938': 's', '\u0939': 'h',
        '\u0958': 'q', '\u0959': 'ḵ', '\u095A': 'ġ', '\u095B': 'z', '\u095C': 'ṛ', '\u095D': 'f'
    };
    const virama = '\u094D'; // halant

    let out = '';
    for (let i = 0; i < input.length; i++) {
        const ch = input[i];
        const code = ch;
        // independent vowel
        if (vowels[code]) {
            out += vowels[code];
            continue;
        }
        // consonant
        if (consonants[code]) {
            let cons = consonants[code];
            // look ahead for vowel sign or virama
            const next = input[i + 1];
            if (next === virama) {
                out += cons;
                i++; // skip virama
                continue;
            }
            if (vowelSigns[next]) {
                out += cons + vowelSigns[next];
                i++; // skip vowel sign
                continue;
            }
            // default implicit 'a'
            out += cons + 'a';
            continue;
        }
        // vowel sign (standalone) or diacritic
        if (vowelSigns[code]) {
            out += vowelSigns[code];
            continue;
        }
        // anusvara or others
        if (code === '\u0902') { out += 'ṃ'; continue; }
        if (code === '\u0903') { out += 'ḥ'; continue; }
        // whitespace or latin characters pass through
        if (/\s/.test(ch) || /[\u0000-\u007F]/.test(ch)) {
            out += ch;
            continue;
        }
        // fallback: try approximate by removing diacritics
        out += ch;
    }
    // simple cleanup: remove duplicated vowels like 'aa' -> 'ā' not handled here; keep raw
    return out.replace(/\u00A0/g, '');
}

function transliterate(text, fromLang) {
    if (!text) return '';
    const lang = (fromLang || '').toString().toLowerCase();
    if (lang.startsWith('hi')) return transliterateDevanagari(text);
    // other scripts could be added later
    return text;
}

// Extract first available definition and phonetic from a DictionaryAPI entry object.
// Handles multiple meanings/definitions so we don't miss valid definitions.
function extractFirstDefinition(entry) {
    if (!entry || typeof entry !== 'object') return { definition: '', phonetic: '' };
    let definition = '';
    const meanings = entry.meanings;
    if (Array.isArray(meanings)) {
        for (const m of meanings) {
            const defs = m && m.definitions;
            if (Array.isArray(defs)) {
                for (const d of defs) {
                    const text = (d && d.definition && String(d.definition).trim()) || '';
                    if (text && !/^No definition found/i.test(text)) {
                        definition = text;
                        break;
                    }
                }
                if (definition) break;
            }
        }
    }
    let phonetic = (entry.phonetic && String(entry.phonetic).trim()) || '';
    if (!phonetic && Array.isArray(entry.phonetics)) {
        const withText = entry.phonetics.find(p => p && p.text && String(p.text).trim());
        phonetic = withText ? String(withText.text).trim() : '';
    }
    return { definition, phonetic: phonetic || '' };
}

// Fetch definition from DictionaryAPI; returns { definition, phonetic } or null.
// Only treats response as valid when res.ok and body is an array of entries.
async function fetchDefinitionFromDictionaryApi(lang, word) {
    if (!word || !lang) return null;
    const langCode = (lang === 'zh-CN' || lang === 'zh') ? 'zh' : (String(lang).split('-')[0] || 'en');
    try {
        const url = `https://api.dictionaryapi.dev/api/v2/entries/${encodeURIComponent(langCode)}/${encodeURIComponent(String(word).trim())}`;
        const res = await fetch(url);
        if (!res.ok) return null;
        const data = await res.json();
        if (!Array.isArray(data) || !data[0]) return null;
        const out = extractFirstDefinition(data[0]);
        return out.definition ? out : null;
    } catch (e) {
        return null;
    }
}

// Fetch a first-sentence definition from Wiktionary (language-specific subdomain)
async function fetchWiktionaryDefinition(word, langShort = 'en') {
    if (!word) return null;
    const w = String(word).trim();
    if (!w) return null;
    try {
        const domain = `${langShort}.wiktionary.org`;
        const url = `https://${domain}/w/api.php?action=query&titles=${encodeURIComponent(w)}&prop=extracts&explaintext=1&exintro=1&exsentences=2&format=json&origin=*`;
        const res = await fetch(url);
        if (!res.ok) return null;
        const j = await res.json();
        const pages = j && j.query && j.query.pages;
        if (!pages) return null;
        const pageId = Object.keys(pages)[0];
        if (!pageId || pageId === '-1') return null;
        const extract = pages[pageId].extract || '';
        if (!extract) return null;
        const lines = extract.split(/\n+/).map(p => p.trim()).filter(Boolean);
        let para = lines.find(p => p.length > 10 && !/^redirect\s*:/i.test(p) && !/^#/i.test(p)) || lines[0] || '';
        if (!para) return null;
        const m = para.match(/[^\.\!\?]+[\.\!\?]?/);
        const sentence = (m ? m[0].trim() : para).replace(/\s*\[[^\]]+\]/g, '').replace(/\s*\([^\)]+\)/g, '').trim();
        return sentence.length > 3 ? sentence : null;
    } catch (e) {
        return null;
    }
}

// Fetch a short summary from Wikipedia as a last-resort definition source.
// Especially useful for proper nouns (countries, cities, names) where
// dictionary APIs often fail but Wikipedia has good coverage.
async function fetchWikipediaSummary(word, langShort = 'en') {
    if (!word) return null;
    const w = String(word).trim();
    if (!w) return null;
    try {
        const lang = langShort || 'en';
        const url = `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(w)}?redirect=true`;
        const res = await fetch(url);
        if (!res.ok) return null;
        const data = await res.json();
        const extract = (data && (data.extract || data.description)) || '';
        if (!extract || typeof extract !== 'string') return null;
        const text = extract.trim();
        return text.length > 5 ? text : null;
    } catch (e) {
        return null;
    }
}

// Finalize a word object before returning: if the definition appears to be English
// but the requested language is non-English, translate the definition server-side
// into the requested language so callers receive a definition in the correct language.
async function finalizeWordObj(obj, langName) {
    try {
        if (!obj || !obj.definition) return obj;
        // map language name (e.g., 'Spanish','English','Mandarin') to short code
        const map = { 'Spanish': 'es', 'English': 'en', 'Mandarin': 'zh-CN', 'Hindi': 'hi', 'French': 'fr' };
        const target = map[langName] || (typeof langName === 'string' && langName.split('-')[0]) || 'en';
        if (target === 'en') return obj; // nothing to do
        const def = (obj.definition || '').toString();
        if (!isProbablyEnglishText(def)) return obj;
        // call serverless proxy to translate the definition text into target
        try {
            const proxyUrlDef = `/.netlify/functions/translate?q=${encodeURIComponent(def)}&target=${encodeURIComponent(target)}`;
            const presDef = await fetch(proxyUrlDef);
            if (presDef.ok) {
                const pdataDef = await presDef.json();
                const candidate = pdataDef.definition || pdataDef.translated || pdataDef.translatedText || '';
                if (candidate && !/No definition found/i.test(candidate)) {
                    obj.definition = candidate;
                }
            }
        } catch (e) {
            // proxy failed, try direct MyMemory API as fallback
            try {
                const memoryUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(def)}&langpair=en|${target}`;
                const mres = await fetch(memoryUrl);
                if (mres.ok) {
                    const mdata = await mres.json();
                    const candidate = mdata.responseData.translatedText;
                    if (candidate && !/No definition found/i.test(candidate)) {
                        obj.definition = candidate;
                    }
                }
            } catch (me) {
                // Both failed, ignore and return original
            }
        }
    } catch (e) {
        // ignore and return original
    }
    return obj;
}
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

// Phonetic maps for voice recognition - defined in global scope
const phoneticMap = {
    // English phonetic alphabet
    'alpha': 'A', 'alfa': 'A', 'bravo': 'B', 'charlie': 'C', 'delta': 'D', 'echo': 'E',
    'foxtrot': 'F', 'golf': 'G', 'hotel': 'H', 'india': 'I', 'juliet': 'J', 'juliett': 'J',
    'kilo': 'K', 'lima': 'L', 'mike': 'M', 'michael': 'M', 'november': 'N', 'oscar': 'O',
    'papa': 'P', 'quebec': 'Q', 'romeo': 'R', 'sierra': 'S', 'tango': 'T', 'uniform': 'U',
    'victor': 'V', 'whiskey': 'W', 'x-ray': 'X', 'xray': 'X', 'yankee': 'Y', 'zulu': 'Z',
    // Common spoken variations
    'a': 'A', 'b': 'B', 'c': 'C', 'd': 'D', 'e': 'E', 'f': 'F', 'g': 'G', 'h': 'H',
    'i': 'I', 'j': 'J', 'k': 'K', 'l': 'L', 'm': 'M', 'n': 'N', 'o': 'O', 'p': 'P',
    'q': 'Q', 'r': 'R', 's': 'S', 't': 'T', 'u': 'U', 'v': 'V', 'w': 'W', 'x': 'X',
    'y': 'Y', 'z': 'Z',
    // Single letter pronunciations (common speech recognition outputs)
    'bi': 'B', 'ci': 'C', 'di': 'D', 'ei': 'A', 'ef': 'F', 'gi': 'G', 'eich': 'H', 
    'ai': 'I', 'jei': 'J', 'kei': 'K', 'el': 'L', 'em': 'M', 'en': 'N', 'ou': 'O',
    'pi': 'P', 'kyu': 'Q', 'ar': 'R', 'es': 'S', 'ti': 'T', 'iu': 'U', 'vi': 'V',
    'dabliu': 'W', 'ex': 'X', 'uai': 'Y', 'zi': 'Z',
    // More variations
    'bee': 'B', 'see': 'C', 'dee': 'D', 'gee': 'G', 'pee': 'P', 'tea': 'T', 'you': 'U', 'why': 'Y',
    // Common mispronunciations
    'for': 'F', 'are': 'R', 'eye': 'I', 'oh': 'O', 'queue': 'Q', 'you': 'U', 'double you': 'W', 'double u': 'W'
};

const spanishPhoneticMap = {
    // Authoritative Spanish alphabet pronunciations (from linguistic sources)
    'a': 'A', 'be': 'B', 'ce': 'C', 'de': 'D', 'e': 'E', 'efe': 'F', 'ge': 'G', 'hache': 'H',
    'i': 'I', 'jota': 'J', 'ka': 'K', 'ele': 'L', 'eme': 'M', 'ene': 'N', 'eñe': 'Ñ', 'o': 'O',
    'pe': 'P', 'cu': 'Q', 'ere': 'R', 'ese': 'S', 'te': 'T', 'u': 'U', 'uve': 'V', 'doble ve': 'W',
    'equis': 'X', 'ye': 'Y', 'zeta': 'Z',
    
    // Spanish letter variations (regional and common alternatives)
    'be larga': 'B', 'be corta': 'B', 'be de burro': 'B', 've de vaca': 'V',
    'erre': 'R', 'i griega': 'Y', 'doble uve': 'W', 'doble u': 'W',
    
    // Single letters (most common way Spanish speakers actually say letters)
    'a': 'A', 'b': 'B', 'c': 'C', 'd': 'D', 'e': 'E', 'f': 'F', 'g': 'G', 'h': 'H',
    'i': 'I', 'j': 'J', 'k': 'K', 'l': 'L', 'm': 'M', 'n': 'N', 'ñ': 'Ñ', 'o': 'O',
    'p': 'P', 'q': 'Q', 'r': 'R', 's': 'S', 't': 'T', 'u': 'U', 'v': 'V', 'w': 'W',
    'x': 'X', 'y': 'Y', 'z': 'Z',
    
    // Spanish letters with accents
    'á': 'Á', 'é': 'É', 'í': 'Í', 'ó': 'Ó', 'ú': 'Ú', 'ü': 'Ü', 'ñ': 'Ñ',
    
    // Spanish vowel sounds (the way they're actually pronounced)
    'ah': 'A', 'eh': 'E', 'ee': 'I', 'oh': 'O', 'oo': 'U',
    
    // Common Spanish speech recognition outputs
    'be': 'B', 'ce': 'C', 'de': 'D', 'efe': 'F', 'ge': 'G', 'ache': 'H', 'hache': 'H',
    'ka': 'K', 'ele': 'L', 'eme': 'M', 'ene': 'N', 'eñe': 'Ñ', 'pe': 'P', 'cu': 'Q',
    'ere': 'R', 'ese': 'S', 'te': 'T', 'uve': 'V', 'equis': 'X', 'ye': 'Y', 'zeta': 'Z',
    
    // English phonetic alphabet (for Spanish speakers who know it)
    'alfa': 'A', 'bravo': 'B', 'charlie': 'C', 'delta': 'D', 'eco': 'E', 'foxtrot': 'F',
    'golf': 'G', 'hotel': 'H', 'india': 'I', 'juliet': 'J', 'kilo': 'K', 'lima': 'L',
    'mike': 'M', 'noviembre': 'N', 'oscar': 'O', 'papa': 'P', 'quebec': 'Q', 'romeo': 'R',
    'sierra': 'S', 'tango': 'T', 'uniform': 'U', 'victor': 'V', 'whiskey': 'W', 'x-ray': 'X',
    'yanqui': 'Y', 'zulu': 'Z',
    
    // Common mispronunciations and variations
    'bi': 'B', 'ci': 'C', 'di': 'D', 'gi': 'G', 'li': 'L', 'mi': 'M', 'ni': 'N',
    'pi': 'P', 'qui': 'Q', 'ri': 'R', 'si': 'S', 'ti': 'T', 'vi': 'V', 'wi': 'W',
    'xi': 'X', 'yi': 'Y', 'zi': 'Z'
};

// Check if the browser supports the Web Speech API
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// iOS-specific speech recognition attempt
function initIOSSpeechRecognition() {
    if (isIOS && 'webkitSpeechRecognition' in window) {
        try {
            const recognition = new webkitSpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = 'en-US';
            return recognition;
        } catch (e) {
            console.warn('iOS WebKit speech recognition failed:', e);
            return null;
        }
    }
    return null;
}

// Show mobile warning if needed
function checkMobileSupport() {
    if (isIOS) {
        console.warn('iOS detected - attempting iOS-specific speech recognition');
        const statusEl = document.getElementById('status');
        if (statusEl) {
            statusEl.innerHTML = '<span style="color: orange;">iOS detected: Preparing speech recognition...</span>';
        }
        
        // Show iOS speech input immediately and try to start recognition
        const iosContainer = document.getElementById('ios-speech-container');
        if (iosContainer) {
            iosContainer.style.display = 'block';
            initIOSSpeechFallback();
        }
        
        // Try iOS-specific recognition first
        const iosRecognition = initIOSSpeechRecognition();
        if (iosRecognition) {
            setTimeout(() => {
                if (statusEl) {
                    const message = selectedLang === 'es-ES' || selectedLang === 'es' ? 
                        'Reconocimiento de voz iOS listo! Toca el botón Hablar arriba.' : 
                        'iOS speech recognition ready! Tap the Speak button above.';
                    statusEl.innerHTML = `<span style="color: green;">${message}</span>`;
                }
            }, 2000);
            return true; // Continue with iOS recognition
        }
        
        // Fallback to warning but then show the speech input
        setTimeout(() => {
            if (statusEl) {
                const message = selectedLang === 'es-ES' || selectedLang === 'es' ? 
                    'Usando entrada de voz arriba. Toca Hablar o escribe letras.' : 
                    'Using speech input above. Tap Speak button or type letters.';
                statusEl.innerHTML = `<span style="color: orange;">${message}</span>`;
            }
        }, 3000);
        return true; // Continue with fallback input
    }
    return true;
}

if (('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) && checkMobileSupport()) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US'; // Default to English

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
            'con', 'de', 'a', 'en', 'el', 'la', 'los', 'las', 'un', 'una', 'y', 'o', 'pero', 'por', 'para', 'al', 'del', 'le', 'les',
            'du', 'des', 'et', 'ou', 'mais', 'avec', 'dans', 'sur', 'par', 'chez', 'au', 'aux', 'ce', 'cette', 'ces',
            '是', '的', '了', '和', '在', '有', '我', '你', '他', '她', '它', '我们', '你们', '他们', '她们', '它们'
        ];

        function getRandomSafeWord() {
            return SAFE_WORDS[Math.floor(Math.random() * SAFE_WORDS.length)];
        }

        // Known Spanish words as fallback when translation fails (never show English as "Spanish word")
        const FALLBACK_SPANISH_WORDS = [
            { word: 'ventana', english: 'window' }, { word: 'manzana', english: 'apple' }, { word: 'libro', english: 'book' },
            { word: 'agua', english: 'water' }, { word: 'sol', english: 'sun' }, { word: 'casa', english: 'house' },
            { word: 'mesa', english: 'table' }, { word: 'puerta', english: 'door' }, { word: 'gato', english: 'cat' }
        ];

        // --- SPANISH: Use ONLY local SPANISH_DICTIONARY / API-driven flow ---
                if (language === 'Spanish') {
                    // Pick a base English word; retry with another if translation fails so we never show English as the Spanish word.
                    const maxTranslateTries = 4;
                    let baseWord = getRandomSafeWord();
                    let translated = '';
                    let defFromProxy = '';
                    let pronFromProxy = '';

                    for (let tryNum = 0; tryNum < maxTranslateTries && !translated; tryNum++) {
                        if (tryNum > 0) baseWord = getRandomSafeWord();
                        defFromProxy = '';
                        pronFromProxy = '';

                        // 1) Try Netlify function proxy
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
                            // proxy failed, try direct MyMemory API as fallback
                            try {
                                const memoryUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(baseWord)}&langpair=en|es`;
                                const mres = await fetch(memoryUrl);
                                if (mres.ok) {
                                    const mdata = await mres.json();
                                    translated = mdata.responseData.translatedText;
                                }
                            } catch (me) {}
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
                            } catch (e) {}
                        }

                        // 3) Fallback to MyMemory if still empty
                        if (!translated) {
                            try {
                                const transRes = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(baseWord)}&langpair=en|es`);
                                const transData = await transRes.json();
                                translated = transData.responseData.translatedText || '';
                            } catch (e) {}
                        }

                        // Reject if translation is same as English or looks like English (avoid showing "window" as Spanish word)
                        const trimmed = ('' + (translated || '')).trim().split(/[ ,.;:!?]/)[0];
                        if (trimmed && trimmed.toLowerCase() === baseWord.toLowerCase()) translated = '';
                        if (trimmed && /^[a-zA-Z]+$/.test(trimmed) && textLooksLikeLang && textLooksLikeLang(trimmed, 'en')) translated = '';
                    }

                    // If all translation attempts failed, use a known Spanish word so we never show English as "Spanish word"
                    if (!translated) {
                        const fallback = FALLBACK_SPANISH_WORDS[Math.floor(Math.random() * FALLBACK_SPANISH_WORDS.length)];
                        word = fallback.word;
                        englishEquivalent = fallback.english;
                        definition = '';
                        pronunciation = '';
                        defFromProxy = '';
                        pronFromProxy = '';
                    } else {
                        word = ('' + translated).split(/[ ,.;:!?]/)[0];
                        englishEquivalent = baseWord;
                    }

                    // Use definition from proxy if available
                    if (defFromProxy) {
                        definition = defFromProxy;
                        pronunciation = pronFromProxy || '/No pronunciation available/';
                    } else {
                        // Try to fetch a Spanish definition first, then English definition for the base word
                        let defFromEnglish = false;
                        let dictResult = await fetchDefinitionFromDictionaryApi('es', word);
                        if (dictResult) {
                            definition = dictResult.definition;
                            pronunciation = dictResult.phonetic || '';
                        }
                        if (!definition) {
                            dictResult = await fetchDefinitionFromDictionaryApi('en', englishEquivalent);
                            if (dictResult) {
                                definition = dictResult.definition;
                                pronunciation = dictResult.phonetic || '';
                                defFromEnglish = true;
                            }
                        }

                        // If we only found an English definition, translate that definition text into Spanish
                        if (defFromEnglish && definition) {
                            try {
                                const proxyDefUrl = `/.netlify/functions/translate?q=${encodeURIComponent(definition)}&target=es`;
                                const presDef = await fetch(proxyDefUrl);
                                if (presDef.ok) {
                                    const pdataDef = await presDef.json();
                                    const candidate = pdataDef.definition || pdataDef.translated || pdataDef.translatedText || '';
                                    if (candidate && !/No definition found/i.test(candidate)) {
                                        definition = candidate;
                                    }
                                }
                            } catch (e) {
                                // ignore translation failure; keep English definition as last resort
                            }
                        }
                    }

                    if (!definition) definition = `No definition found for "${word}".`;
                    if (!pronunciation) pronunciation = '/No pronunciation available/';

                    // Fallback: Try Wiktionary (Spanish) if still no definition
                    if (!definition || /^No definition found/i.test(definition)) {
                        try {
                            const wiktionaryDef = await fetchWiktionaryDefinition(word, 'es');
                            if (wiktionaryDef && !/^No definition found/i.test(wiktionaryDef)) {
                                definition = wiktionaryDef;
                            }
                        } catch (e) {}
                    }

                    // Final fallback: use English Wikipedia summary for the English equivalent.
                    // This helps when the word is a place/person/etc. and dictionaries are empty.
                    if (!definition || /^No definition found/i.test(definition)) {
                        const wikiDef = await fetchWikipediaSummary(englishEquivalent || word, 'en');
                        if (wikiDef) {
                            definition = wikiDef;
                        }
                    }

                    return await finalizeWordObj({ word, definition, pronunciation, englishEquivalent }, 'Spanish');

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
                        let dictResult = await fetchDefinitionFromDictionaryApi('en', englishEquivalent);
                        if (dictResult) {
                            definition = dictResult.definition;
                            pronunciation = dictResult.phonetic || '';
                        }
                        if (!definition) {
                            const wikEn = await fetchWiktionaryDefinition(englishEquivalent, 'en');
                            if (wikEn) definition = wikEn;
                        }
                        if (!definition) definition = `Definition for "${chosen}" not found locally.`;
                        if (!pronunciation) pronunciation = '/No pronunciation available/';
                        // If we only have an English definition for a Spanish word, translate it now
                        if (definition && !entry) {
                            try {
                                const proxyDefUrl2 = `/.netlify/functions/translate?q=${encodeURIComponent(definition)}&target=es`;
                                const presDef2 = await fetch(proxyDefUrl2);
                                if (presDef2.ok) {
                                    const pdataDef2 = await presDef2.json();
                                    const candidate2 = pdataDef2.definition || pdataDef2.translated || pdataDef2.translatedText || '';
                                    if (candidate2 && !/No definition found/i.test(candidate2)) {
                                        definition = candidate2;
                                    }
                                }
                            } catch (e) {
                                // ignore
                            }
                        }
                    }

                    return await finalizeWordObj({
                        word,
                        definition,
                        pronunciation,
                        englishEquivalent
                    }, 'Spanish');
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
            return await finalizeWordObj({
                word,
                definition,
                pronunciation,
                englishEquivalent
            }, language);
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

        let dictResult = await fetchDefinitionFromDictionaryApi(dictLangCode, word);
        if (dictResult) {
            definition = dictResult.definition;
            pronunciation = dictResult.phonetic || '';
        }
        if (!definition) {
            const wikLang = (dictLangCode === 'zh') ? 'zh' : dictLangCode;
            const wikDef = await fetchWiktionaryDefinition(word, wikLang);
            if (wikDef) definition = wikDef;
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

    // Helper to avoid "trivial" words where the learning-language word and
    // its English equivalent collapse to the same token (e.g. "BOLIVIA"
    // in both languages). We only apply this when the learning language
    // is non‑English so English‑learning mode still works.
    function normalizeForComparison(str) {
        if (!str) return '';
        return String(str)
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // strip accents
            .replace(/[^a-zA-Z]/g, '')       // keep only letters
            .toLowerCase();
    }

    function isTriviallySameCrossLang(word, englishEquivalent, gameLangCode) {
        if (!word || !englishEquivalent) return false;
        // Only filter when learning language is not English
        if (gameLangCode === 'en-US') return false;
        const a = normalizeForComparison(word);
        const b = normalizeForComparison(englishEquivalent);
        if (!a || !b) return false;
        return a === b;
    }

    async function fetchPlayableWord(gameLangCode, canonicalName, maxTries = 5) {
        let lastObj = null;
        for (let i = 0; i < maxTries; i++) {
            const obj = await fetchWordObject(canonicalName);
            if (!obj) continue;
            lastObj = obj;
            const played = obj.word || '';
            const eq = obj.englishEquivalent || '';
            if (!isTriviallySameCrossLang(played, eq, gameLangCode)) {
                obj.gameLangCode = gameLangCode;
                obj.gameLangName = canonicalName;
                return obj;
            }
        }
        if (lastObj) {
            lastObj.gameLangCode = gameLangCode;
            lastObj.gameLangName = canonicalName;
        }
        return lastObj;
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
    const loseSounds = ['fail-144746.mp3', '050612_wild-west-1-36194.mp3'];

    function playRandomSound(sounds) {
        try {
            const randomIndex = Math.floor(Math.random() * sounds.length);
            const audio = new Audio(sounds[randomIndex]);
            audio.play().catch(e => {
                console.log('Sound file not found or could not play:', sounds[randomIndex]);
                // Silently fail - don't break the game
            });
        } catch (e) {
            console.log('Error playing sound:', e);
            // Silently fail - don't break the game
        }
    }

    const phoneticReplacements = {
        "CARLINGAS": "car-ling-gas",
        "tocopherol": "to-co-fer-ol"
    };
    // Add a few common overrides for problematic compound words
    phoneticReplacements['SALESROOM'] = 'sales room';

    // Improved TTS helper that normalizes text, handles hyphens, selects a voice
    // and queues multiple utterances to create natural pauses for compound words.
    function speakText(text, lang) {
        if (!text) return;

        // Normalize incoming lang (accept 'en-US' or 'en') -> use full locale where possible
        let speechLang = (lang || 'en-US').toString();
        // Map short codes to common locales
        const langMap = {
            'en': 'en-US',
            'en-US': 'en-US',
            'es': 'es-ES',
            'es-ES': 'es-ES',
            'fr': 'fr-FR',
            'fr-FR': 'fr-FR',
            'zh-CN': 'zh-CN',
            'hi': 'hi-IN',
            'hi-IN': 'hi-IN'
        };
        // If lang like 'es-ES' passed, keep it; otherwise map short code
        const langKey = speechLang.split('-')[0];
        speechLang = langMap[speechLang] || langMap[langKey] || speechLang;

        // Apply phonetic replacements on whole words
        const normalized = text.replace(/[_]/g, ' ').trim();

        // If the whole phrase matches an override, use it
        const override = phoneticReplacements[normalized.toUpperCase()];
        let toSpeak = override || normalized;

        // Replace hyphens with space-separated parts to avoid mangled pronunciations
        // e.g., 'sales-room' -> ['sales', 'room'] queued as separate utterances
        const parts = toSpeak.split(/[-–—]/).map(p => p.trim()).filter(Boolean);

        // Further split very long concatenations by inserting spaces before common word boundaries
        // (simple heuristic: split where a lowercase letter is followed by an uppercase letter)
        const expandedParts = [];
        parts.forEach(p => {
            if (/[a-z][A-Z]/.test(p)) {
                // Insert space between camelCase boundaries
                const s = p.replace(/([a-z])([A-Z])/g, '$1 $2');
                expandedParts.push(s);
            } else {
                expandedParts.push(p);
            }
        });

        // Create utterances for each part (or the whole phrase if single)
        const utterances = [];
        expandedParts.forEach((part, idx) => {
            // Apply word-level phonetic replacements too
            const modified = part.replace(/\b\w+\b/g, word => {
                return phoneticReplacements[word.toUpperCase()] || word;
            });
            const u = new SpeechSynthesisUtterance(modified);
            u.lang = speechLang;
            // Slightly slow down for clarity
            u.rate = 0.95;
            utterances.push(u);
        });

        // Choose a voice that matches the language if available
        function chooseVoiceFor(u) {
            const voices = window.speechSynthesis.getVoices() || [];
            // prefer exact match, then prefix match
            let v = voices.find(v => v.lang && v.lang.toLowerCase() === u.lang.toLowerCase());
            if (!v) v = voices.find(v => v.lang && v.lang.toLowerCase().startsWith(u.lang.split('-')[0]));
            if (v) u.voice = v;
        }

        // If voices not yet loaded, wait briefly for onvoiceschanged
        const speakAll = () => {
            utterances.forEach(u => {
                try {
                    chooseVoiceFor(u);
                    window.speechSynthesis.speak(u);
                } catch (e) {
                    console.warn('TTS speak failed for', u.text, e);
                }
            });
        };

        const voices = window.speechSynthesis.getVoices();
        if (!voices || voices.length === 0) {
            // Wait for voices to load
            window.speechSynthesis.onvoiceschanged = () => {
                speakAll();
                // remove handler to avoid duplicate calls
                window.speechSynthesis.onvoiceschanged = null;
            };
            // Also set a fallback timeout to speak in case onvoiceschanged doesn't fire
            setTimeout(speakAll, 300);
        } else {
            speakAll();
        }
    }

    function checkGameStatus() {
        if (selectedWord && wrongGuesses >= maxWrongGuesses) {
            cancelAnimationFrame(animationFrameId);
            showTemporaryPopup('Game Over! The word was: ' + selectedWord, false);
            playRandomSound(loseSounds);
            showRepeatButtons(currentWordObj);
            showWordInfo(currentWordObj);
            // Always show definition after spelling (even if missing)
            setTimeout(() => {
                // Auto-start new game after 5 seconds in same language
                if (pendingGameLang) {
                    const langObj = LANGUAGES.find(l => l.code === pendingGameLang);
                    if (langObj && typeof fetchWordObject === "function") {
                        fetchPlayableWord(pendingGameLang, langObj.canonicalName).then(wordObj => {
                            if (!wordObj) return;
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
                }
            }, 5000);
            resetGame();
        } else if (selectedWord && selectedWord.split('').every(letter => guessedLetters.includes(letter))) {
            cancelAnimationFrame(animationFrameId);
            showTemporaryPopup('Congratulations! You guessed the word: ' + selectedWord, true);
            playRandomSound(winSounds);
            showRepeatButtons(currentWordObj);
            showWordInfo(currentWordObj);
            // Always show definition after spelling (even if missing)
            setTimeout(() => {
                // Auto-start new game after 5 seconds in same language
                if (pendingGameLang) {
                    const langObj = LANGUAGES.find(l => l.code === pendingGameLang);
                    if (langObj && typeof fetchWordObject === "function") {
                        fetchPlayableWord(pendingGameLang, langObj.canonicalName).then(wordObj => {
                            if (!wordObj) return;
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
                }
            }, 5000);
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
                // Set UI language only; actual game (word selection) will start
                // when the user picks a learning language from the main language
                // buttons below the microphone controls.
                selectedLang = lang.code;
                if (typeof recognition !== "undefined") recognition.lang = lang.code;
                setUILanguage(lang.code);
                popup.style.display = "none";

                // Highlight the corresponding button in the main UI so the user
                // sees which language is currently selected for the interface.
                document.querySelectorAll('.lang-btn').forEach((b, idx) => {
                    b.classList.toggle('active', LANGUAGES[idx].code === lang.code);
                });

                // Remember this as the default pending game language, and keep
                // the instructions popup in sync, but do NOT fetch a word yet.
                pendingGameLang = lang.code;
                updateInstructionsPopup(lang.code);
            };

            row.appendChild(label);
            row.appendChild(btn);
            btnsDiv.appendChild(row);
        });

        // Main UI language selection (second language box)
        document.querySelectorAll('.lang-btn').forEach((btn, idx) => {
            btn.onclick = function() {
                pendingGameLang = btn.getAttribute('data-value');
                // Do NOT set selectedLang here!
                document.querySelectorAll('.lang-btn').forEach((b, i) => {
                    b.classList.toggle('active', b.getAttribute('data-value') === pendingGameLang);
                });
                // Do NOT call setUILanguage(selectedLang) here!
                if (typeof recognition !== "undefined") recognition.lang = pendingGameLang;
                if (typeof fetchWordObject === "function") {
                    const langObj = LANGUAGES.find(l => l.code === pendingGameLang);
                    const langName = langObj ? langObj.canonicalName : "English";
                    fetchPlayableWord(pendingGameLang, langName).then(wordObj => {
                        if (!wordObj) return;
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

        // Do NOT set UI language or highlight any language on load. Wait for user selection.

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
    }

    // --- DYNAMIC LANGUAGE OPTIONS ---

    function showWordInfo(wordObj) {
        const logContainer = document.getElementById('log-container');
        if (!logContainer) return;

        // Show the log-container when displaying word info
        logContainer.style.setProperty('display', 'block', 'important');

        // Detect UI language code (e.g., 'zh-CN', 'es', etc.)
        let uiLang = selectedLang || 'en-US';
        let uiLangShort = uiLang.split('-')[0];
        if (uiLang === 'en-US') uiLangShort = 'en';
        if (uiLang === 'es-ES') uiLangShort = 'es';
        if (uiLang === 'fr-FR') uiLangShort = 'fr';
        if (uiLang === 'hi-IN') uiLangShort = 'hi';
        // Mandarin stays 'zh-CN'

        // Determine the learning/game language (the language of the played word).
        // Prefer the language attached to the current word object (set when the word
        // was fetched). Fall back to `pendingGameLang`.
        const learningLangCode = (currentWordObj && currentWordObj.gameLangCode) ? currentWordObj.gameLangCode : (pendingGameLang || 'en-US');
        let learningLangShort = learningLangCode.split('-')[0];
        if (learningLangCode === 'en-US') learningLangShort = 'en';
        if (learningLangCode === 'es-ES') learningLangShort = 'es';
        if (learningLangCode === 'fr-FR') learningLangShort = 'fr';
        if (learningLangCode === 'hi-IN') learningLangShort = 'hi';

        // DEBUG: Log the actual language values
        console.log(`DEBUG: selectedLang=${selectedLang}, pendingGameLang=${pendingGameLang}`);
        console.log(`DEBUG: uiLang=${uiLang}, uiLangShort=${uiLangShort}`);
        console.log(`DEBUG: learningLangCode=${learningLangCode}, learningLangShort=${learningLangShort}`);

        // Determine played word and equivalent
        let playedWord = wordObj.word;
        let equivalentWord = wordObj.englishEquivalent;

        // DEBUG: Log the word values after they're defined
        console.log(`DEBUG: playedWord=${playedWord}, equivalentWord=${equivalentWord}`);

        // Get the English-equivalent (or a UI-language translation of it).
        // Behavior:
        // - If the UI language is English, prefer a real English equivalent. If
        //   `equivalentWord` isn't an English-looking string, try to translate the
        //   played word from the learning language into English first.
        // - If the UI language is non-English, first ensure we have a reliable
        //   English equivalent (translating from the learning language when needed),
        //   then translate that English equivalent into the UI language. This avoids
        //   feeding raw romanizations like "phir" through en->es translation which
        //   can produce bizarre results.
        async function getEquivalentInUILang() {
            // Helper: try to fetch English equivalent by translating from learning language
            async function fetchEnglishFromPlayed() {
                try {
                    const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(playedWord)}&langpair=${encodeURIComponent(learningLangShort)}|en`);
                    const data = await res.json();
                    const txt = data && data.responseData && data.responseData.translatedText;
                    console.log(`fetchEnglishFromPlayed: translating "${playedWord}" from ${learningLangShort} to en, got: "${txt}"`);
                    if (txt) {
                        // Validate that the translation makes sense
                        // If we already have an englishEquivalent that looks like English, prefer it
                        if (equivalentWord && textLooksLikeLang(equivalentWord, 'en')) {
                            console.log(`Using existing englishEquivalent "${equivalentWord}" over API translation "${txt}"`);
                            return equivalentWord;
                        }
                        
                        // Additional validation: check for obviously wrong translations
                        const lowerTxt = txt.toLowerCase();
                        const lowerPlayed = playedWord.toLowerCase();
                        
                        // Common Spanish words with their correct English equivalents
                        const commonTranslations = {
                            'libro': 'book',
                            'casa': 'house', 
                            'agua': 'water',
                            'sol': 'sun',
                            'mesa': 'table',
                            'puerta': 'door',
                            'gato': 'cat',
                            'perro': 'dog',
                            'manzana': 'apple',
                            'ventana': 'window'
                        };
                        
                        // If this is a common Spanish word and the translation looks wrong, use the known correct one
                        if (commonTranslations[lowerPlayed] && 
                            (lowerTxt !== commonTranslations[lowerPlayed]) && 
                            (lowerTxt.includes('code') || lowerTxt.includes('civil') || lowerTxt.includes('legal'))) {
                            console.log(`API returned wrong translation "${txt}" for "${playedWord}", using known correct translation "${commonTranslations[lowerPlayed]}"`);
                            return commonTranslations[lowerPlayed];
                        }
                        
                        return txt;
                    }
                } catch (e) {
                    console.error('fetchEnglishFromPlayed error:', e);
                }
                return null;
            }

            // If UI language is English
            if (uiLangShort === 'en') {
                // If the existing equivalent looks like English, return it immediately
                if (equivalentWord && textLooksLikeLang(equivalentWord, 'en')) {
                    console.log(`Using existing englishEquivalent "${equivalentWord}" - looks like English`);
                    return equivalentWord;
                }

                // Otherwise try to fetch a proper English equivalent from the played word
                const fetched = await fetchEnglishFromPlayed();
                if (fetched) return fetched;

                // Fall back to whatever we have
                console.log(`Using fallback: equivalentWord="${equivalentWord}", playedWord="${playedWord}"`);
                return equivalentWord || playedWord;
            }

            // For non-English UI languages: ensure we have an English equivalent first
            let englishEq = equivalentWord && textLooksLikeLang(equivalentWord, 'en') ? equivalentWord : null;
            if (!englishEq) {
                englishEq = await fetchEnglishFromPlayed();
            }
            if (!englishEq) {
                // As a last resort, use playedWord (may be non-Latin); return that raw
                // since translating a garbage englishEquivalent will produce worse results.
                console.log(`No English equivalent found, using playedWord "${playedWord}"`);
                return equivalentWord || playedWord;
            }

            // Now translate the English equivalent into the UI language
            let translated = null;
            
            // Try Google Translate API first (if API key is available)
            if (window.GOOGLE_TRANSLATE_API_KEY) {
                try {
                    console.log(`Trying Google Translate: "${englishEq}" from English to ${uiLangShort}`);
                    const googleUrl = `https://translation.googleapis.com/language/translate/v2?key=${window.GOOGLE_TRANSLATE_API_KEY}&q=${encodeURIComponent(englishEq)}&source=en&target=${uiLangShort}&format=text`;
                    const googleRes = await fetch(googleUrl);
                    const googleData = await googleRes.json();
                    if (googleData.data && googleData.data.translations && googleData.data.translations[0]) {
                        translated = googleData.data.translations[0].translatedText;
                        console.log(`Google Translate successful: ${englishEq} → ${translated}`);
                    }
                } catch (e) {
                    console.error('Google Translate API error:', e);
                }
            }
            
            // Try LibreTranslate (free alternative)
            if (!translated && window.LIBRETRANSLATE_URL) {
                try {
                    console.log(`Trying LibreTranslate: "${englishEq}" from English to ${uiLangShort}`);
                    const libreUrl = `${window.LIBRETRANSLATE_URL}/translate`;
                    const libreRes = await fetch(libreUrl, {
                        method: 'POST',
                        body: JSON.stringify({
                            q: englishEq,
                            source: 'en',
                            target: uiLangShort,
                            format: 'text'
                        }),
                        headers: { 'Content-Type': 'application/json' }
                    });
                    const libreData = await libreRes.json();
                    if (libreData.translatedText) {
                        translated = libreData.translatedText;
                        console.log(`LibreTranslate successful: ${englishEq} → ${translated}`);
                    }
                } catch (e) {
                    console.error('LibreTranslate API error:', e);
                }
            }
            
            // Fallback to MyMemory if others fail
            if (!translated) {
                try {
                    console.log(`Trying MyMemory: "${englishEq}" from English to ${uiLangShort}`);
                    
                    // Skip translation if source and target are the same language
                    if (englishEq.toLowerCase() === playedWord.toLowerCase() && learningLangShort === uiLangShort) {
                        console.log(`Skipping translation: source and target are the same (${learningLangShort}|${uiLangShort})`);
                        return englishEq;
                    }
                    
                    const res2 = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(englishEq)}&langpair=en|${encodeURIComponent(uiLangShort)}`);
                    const data2 = await res2.json();
                    console.log('MyMemory API response:', data2);
                    const out = data2 && data2.responseData && data2.responseData.translatedText;
                    if (out && out !== englishEq && out !== 'SELECCIONA DOS IDIOMAS DISTINTOS') {
                        translated = out;
                        console.log(`MyMemory successful: ${englishEq} → ${translated}`);
                    } else {
                        console.log('MyMemory failed or returned invalid response');
                    }
                } catch (e) {
                    console.error('MyMemory API error:', e);
                }
            }
            
            // Return translation or fallback message
            if (translated) {
                return translated;
            } else {
                console.log('All translation APIs failed');
                if (uiLangShort !== 'en') {
                    return `${englishEq} (no ${uiLangShort} translation available)`;
                }
                return englishEq || equivalentWord || playedWord;
            }
        }

        // Get definition in UI language
        async function getDefinitionInUILang() {
            // Determine where to obtain the definition. Default to the UI language
            // (the language the user speaks) so they understand the definition.
            const targetDefLang = uiLangShort || 'en';

            // Helper: return formatted missing message
            const missingHtml = `<span style="color:orange;">No definition found.</span>`;

            // Try: 1) Get a reliable English definition first (DictionaryAPI then Wiktionary)
            let englishDef = '';
            const dictResultEn = await fetchDefinitionFromDictionaryApi('en', equivalentWord);
            if (dictResultEn) englishDef = dictResultEn.definition;
            if (!englishDef) {
                const wik = await fetchWiktionaryDefinition(equivalentWord, 'en');
                if (wik) englishDef = wik;
            }
            if (!englishDef) return missingHtml;

            // If UI language is English, return English definition directly
            if (targetDefLang === 'en') return englishDef;

            // Otherwise, translate the English definition into the UI language
            // Prefer: server-side proxy translating the English definition text itself
            try {
                const proxyUrlDef = `/.netlify/functions/translate?q=${encodeURIComponent(englishDef)}&target=${encodeURIComponent(targetDefLang)}`;
                const presDef = await fetch(proxyUrlDef);
                if (presDef.ok) {
                    const pdataDef = await presDef.json();
                    if (pdataDef.definition && !/No definition found/i.test(pdataDef.definition)) return pdataDef.definition;
                    if (pdataDef.translated && pdataDef.translated !== '') return pdataDef.translated;
                }
            } catch (e) {
                // ignore
            }

            // Fallback: client-side MyMemory translation of the English definition
            try {
                const transDefRes = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(englishDef)}&langpair=en|${targetDefLang}`);
                const transDefData = await transDefRes.json();
                if (transDefData && transDefData.responseData && transDefData.responseData.translatedText) {
                    return transDefData.responseData.translatedText;
                }
            } catch (e) {
                // ignore
            }

            // Last resort: use client-side Google Translate if the user provided a key (insecure)
            try {
                if (window.GOOGLE_API_KEY) {
                    const key = encodeURIComponent(window.GOOGLE_API_KEY);
                    const defUrl = `https://translation.googleapis.com/language/translate/v2?key=${key}&q=${encodeURIComponent(englishDef)}&target=${encodeURIComponent(targetDefLang)}&format=text`;
                    const defRes = await fetch(defUrl);
                    const defData = await defRes.json();
                    const translatedDef = defData?.data?.translations?.[0]?.translatedText || '';
                    if (translatedDef) return translatedDef;
                }
            } catch (e) {
                // ignore
            }

            // Give up: return English definition as a last resort (should be rare now)
            return englishDef;
        }

        // Fallback: If all translation methods fail, use the appropriate word based on user's learning language
        // This prevents the "PLEASE SELECT TWO DISTINCT LANGUAGES" error when APIs are down
        const getFallbackEquivalent = () => {
            // If user is learning English, show English word
            if (learningLangShort === 'en' && uiLangShort === 'es') {
                return playedWord; // Spanish speaker learning English = show English word
            }
            // If user is learning Spanish, show Spanish word
            if (learningLangShort === 'es' && uiLangShort === 'en') {
                return playedWord; // English speaker learning Spanish = show Spanish word
            }
            return equivalentWord || playedWord; // Fallback to whatever we have
        };

        // Get label for "Word" and the other-side word in UI language
        let playedLabel = (TRANSLATIONS.word && TRANSLATIONS.word[uiLang]) || "Word";
        let eqLabel;

        // If UI is English and learning language is one of our supported non‑English
        // languages, label the left/right explicitly, e.g. "Spanish word" and
        // "English translation".
        const learningNamesEn = {
            'es-ES': 'Spanish',
            'zh-CN': 'Mandarin',
            'hi-IN': 'Hindi',
            'fr-FR': 'French'
        };
        if (uiLangShort === 'en' && learningLangShort !== 'en') {
            const lname = learningNamesEn[learningLangCode] || 'Foreign';
            playedLabel = `${lname} word`;
            eqLabel = 'English translation';
        } else {
            const eqLabels = {
                'en': 'English equivalent',
                'es': 'Spanish equivalente',
                'fr': 'French equivalent',
                'zh-CN': 'Mandarin equivalent',
                'hi': 'Hindi equivalent'
            };
            eqLabel = eqLabels[uiLangShort] || 'Equivalent';
        }

        // Async update UI
        (async () => {
            const eqWord = await getEquivalentInUILang();
            // If translation failed, use fallback
            const finalEqWord = eqWord || getFallbackSpanishEquivalent();
            // Prefer the definition stored with this word object so it always matches the played word
            const storedDef = (wordObj.definition || '').toString().trim();
            const isPlaceholder = !storedDef || /no definition|fallback|not found|No hay diccionario|No dictionary/i.test(storedDef);
            let def = (!isPlaceholder && storedDef) ? storedDef : await getDefinitionInUILang();

            // If the played word uses non-Latin script (e.g., Devanagari) and the
            // UI language uses Latin characters, show a transliteration instead of
            // raw symbols so users see readable Latin letters.
            let displayedPlayedWord = playedWord;
            const containsNonLatin = /[^\x00-\x7F]/.test(playedWord || '');
            const uiUsesLatin = ['en', 'es', 'fr'].includes(uiLangShort);
            if (containsNonLatin && uiUsesLatin) {
                const t = transliterate(playedWord, learningLangShort || 'hi');
                // prefer transliteration if it produced ascii letters
                if (t && /[A-Za-z]/.test(t)) displayedPlayedWord = t;
            }

            logContainer.innerHTML = `
                <div style="margin:0;padding:0;">
                    <strong>${playedLabel}:</strong> <span id="word-info-word">${displayedPlayedWord}</span>
                    &nbsp;|&nbsp;
                    <strong>${eqLabel}:</strong> <span id="word-info-equivalent">${finalEqWord}</span>
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
                // Speak the displayed word in the game's language (learning language) so pronunciation
                // matches the word's language rather than the UI language.
                const gameLangCode = (typeof pendingGameLang === 'string' && pendingGameLang) ? pendingGameLang : currentLang || 'en-US';
                // Map codes like 'es-ES' or 'en-US' directly; fallback to 'en-US'.
                speakText(playedWord, gameLangCode);
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
                    const dictResultEn = await fetchDefinitionFromDictionaryApi('en', equivalentWord);
                    if (dictResultEn) englishDef = dictResultEn.definition;
                    if (!englishDef) {
                        const wikEn = await fetchWiktionaryDefinition(equivalentWord, 'en');
                        if (wikEn) englishDef = wikEn;
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
                const dictResult = await fetchDefinitionFromDictionaryApi(lang, translated);
                if (dictResult) {
                    def = dictResult.definition;
                    pron = dictResult.phonetic || '';
                }
                if (!def) {
                    const wikTarget = await fetchWiktionaryDefinition(translated, (lang === 'zh-CN' || lang === 'zh') ? 'zh' : lang);
                    if (wikTarget) def = wikTarget;
                }
                // If still not found, get English definition and translate it
                if (!def) {
                    let englishDef = '';
                    const dictResultEn = await fetchDefinitionFromDictionaryApi('en', equivalentWord);
                    if (dictResultEn) {
                        englishDef = dictResultEn.definition;
                        pron = dictResultEn.phonetic || '';
                    }
                    if (!englishDef) {
                        const wik = await fetchWiktionaryDefinition(equivalentWord, 'en');
                        if (wik) englishDef = wik;
                    }
                    if (englishDef) {
                        try {
                            const transDefRes = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(englishDef)}&langpair=en|${lang}`);
                            const transDefData = await transDefRes.json();
                            def = transDefData.responseData.translatedText;
                        } catch (e) {
                            def = englishDef;
                        }
                    }
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
                    // When showing a translated word, speak it using the target language code `lang`.
                    // If the shown word is the English equivalent, prefer an English voice.
                    const speakLang = (lang && typeof lang === 'string') ? lang : (pendingGameLang || 'en-US');
                    // If the translated text is actually the English equivalent, use en-US
                    const isEnglishEquivalent = (translated && translated.toLowerCase() === equivalentWord.toLowerCase());
                    speakText(translated, isEnglishEquivalent ? 'en-US' : speakLang);
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

        const currentRecLang = (typeof recognition !== 'undefined' && recognition.lang) ? recognition.lang : 'en-US';
        const currentRecShort = currentRecLang.split('-')[0];
        console.log(`Recognition language: ${currentRecLang}, short: ${currentRecShort}`);

        for (let i = event.resultIndex; i < event.results.length; ++i) {
            let transcriptRaw = event.results[i][0].transcript.trim().toLowerCase();
            console.log(`Recognized: "${transcriptRaw}" (confidence: ${event.results[i][0].confidence})`);

            let mapped = null;
            
            // Try English phonetic map first
            if (phoneticMap[transcriptRaw]) {
                mapped = phoneticMap[transcriptRaw];
                console.log(`Found in English phonetic map: ${transcriptRaw} -> ${mapped}`);
            }
            // Try Spanish phonetic map for Spanish or as fallback
            else if (spanishPhoneticMap[transcriptRaw]) {
                mapped = spanishPhoneticMap[transcriptRaw];
                console.log(`Found in Spanish phonetic map: ${transcriptRaw} -> ${mapped}`);
            }
            // Handle single character input
            else if (transcriptRaw.length === 1) {
                mapped = transcriptRaw.toUpperCase();
                console.log(`Single character: ${transcriptRaw} -> ${mapped}`);
            }

            // For Spanish recognition, be more forgiving with character extraction
            if (!mapped && currentRecShort === 'es') {
                // Extract first Spanish character
                const spanishCharMatch = transcriptRaw.match(/[a-záéíóúñü]/i);
                if (spanishCharMatch) {
                    mapped = spanishCharMatch[0].toUpperCase();
                    console.log(`Extracted Spanish character: ${transcriptRaw} -> ${mapped}`);
                }
            }
            // For other non-English languages, try basic character extraction
            else if (!mapped && currentRecShort !== 'en') {
                const firstChar = transcriptRaw[0];
                if (firstChar && /[a-záéíóúñü]/i.test(firstChar)) {
                    mapped = firstChar.toUpperCase();
                    console.log(`Extracted first character: ${transcriptRaw} -> ${mapped}`);
                }
            }

            if (!mapped) {
                console.log(`No mapping found for: "${transcriptRaw}"`);
                continue;
            }

            if (event.results[i].isFinal) {
                finalTranscript += mapped;
                console.log(`Final transcript: ${finalTranscript}`);
            } else {
                interimTranscript += mapped;
                console.log(`Interim transcript: ${interimTranscript}`);
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
        const statusEl = document.getElementById('status');
        const errorMsg = getMobileFriendlyError(event.error);
        if (statusEl) {
            statusEl.innerHTML = `<span style="color: red;">❌ ${errorMsg}</span>`;
        }
        // Remove error message after 3 seconds
        setTimeout(() => {
            if (statusEl && statusEl.innerHTML.includes(errorMsg)) {
                statusEl.innerHTML = '';
            }
        }, 3000);
    };

    function getMobileFriendlyError(error) {
        const errorMessages = {
            'not-allowed': '🎤 Microphone permission denied. Please allow mic access.',
            'not-found': '🎤 No microphone found. Please check your device.',
            'network': '🌐 Network error. Please check internet connection.',
            'no-speech': '🔊 No speech detected. Please speak clearly.',
            'aborted': '⏹️ Speech recognition was stopped.',
            'service-not-allowed': '🚫 Speech recognition not allowed on this device.',
            'service-not-supported': '🚫 Speech recognition not supported. Try Chrome browser.',
            'audio-capture': '🎤 Audio capture failed. Please check microphone settings.'
        };
        return errorMessages[error] || `Speech recognition error: ${error}`;
    }

    recognition.onend = function() {
        console.log('Speech recognition ended');
        document.getElementById('status').innerText = '';
        document.getElementById('start-btn').disabled = false;
        document.getElementById('stop-btn').disabled = true;
    };

    let audioStream = null;
let iosRecognition = null; // Make iOS recognition accessible to stop button

    document.getElementById('start-btn').onclick = function() {
        const statusEl = document.getElementById('status');
        
        // iOS-specific handling
        if (isIOS) {
            // Get language-appropriate messages
            const getIosMessage = (key) => {
                const messages = {
                    'starting': selectedLang === 'es-ES' || selectedLang === 'es' ? 
                        'Iniciando reconocimiento de voz en iOS...' : 'iOS speech recognition starting...',
                    'listening': selectedLang === 'es-ES' || selectedLang === 'es' ? 
                        'iOS escuchando... ¡Di letras!' : 'iOS listening... Speak letters!',
                    'not_supported': selectedLang === 'es-ES' || selectedLang === 'es' ? 
                        'Voz de iOS no compatible. Usa Chrome o escribe letras.' : 'iOS speech not supported. Use keyboard below.',
                    'failed': selectedLang === 'es-ES' || selectedLang === 'es' ? 
                        'Reconocimiento de voz iOS falló. Intenta escribir letras.' : 'iOS speech recognition failed. Try typing letters.'
                };
                return messages[key];
            };
            
            statusEl.innerHTML = `<span style="color: blue;">${getIosMessage('starting')}</span>`;
            
            // Try iOS speech recognition
            const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognitionClass) {
                iosRecognition = new SpeechRecognitionClass(); // Use global variable
                iosRecognition.continuous = true;
                iosRecognition.interimResults = true;
                iosRecognition.lang = selectedLang || 'en-US';
                
                iosRecognition.onstart = function() {
                    statusEl.innerHTML = `<span style="color: green;">${getIosMessage('listening')}</span>`;
                    document.getElementById('start-btn').disabled = true;
                    document.getElementById('stop-btn').disabled = false;
                };
                
                iosRecognition.onresult = function(event) {
                    let interimTranscript = '';
                    let finalTranscript = '';
                    
                    for (let i = event.resultIndex; i < event.results.length; ++i) {
                        let transcriptRaw = event.results[i][0].transcript.trim().toLowerCase();
                        console.log(`iOS Recognized: "${transcriptRaw}" (confidence: ${event.results[i][0].confidence}, isFinal: ${event.results[i].isFinal})`);
                        
                        let mapped = null;
                        
                        // Try English phonetic map first
                        if (phoneticMap[transcriptRaw]) {
                            mapped = phoneticMap[transcriptRaw];
                            console.log(`Found in English phonetic map: ${transcriptRaw} -> ${mapped}`);
                        }
                        // Try Spanish phonetic map for Spanish or as fallback
                        else if (spanishPhoneticMap[transcriptRaw]) {
                            mapped = spanishPhoneticMap[transcriptRaw];
                            console.log(`Found in Spanish phonetic map: ${transcriptRaw} -> ${mapped}`);
                        }
                        // Handle single character input
                        else if (transcriptRaw.length === 1) {
                            mapped = transcriptRaw.toUpperCase();
                            console.log(`Single character: ${transcriptRaw} -> ${mapped}`);
                        }
                        
                        // For Spanish recognition, be more forgiving with character extraction
                        if (!mapped && (selectedLang === 'es-ES' || selectedLang === 'es')) {
                            const spanishCharMatch = transcriptRaw.match(/[a-záéíóúñü]/i);
                            if (spanishCharMatch) {
                                mapped = spanishCharMatch[0].toUpperCase();
                                console.log(`Extracted Spanish character: ${transcriptRaw} -> ${mapped}`);
                            }
                        }
                        
                        if (!mapped) {
                            console.log(`No mapping found for: "${transcriptRaw}"`);
                            continue;
                        }
                        
                        if (event.results[i].isFinal) {
                            finalTranscript += mapped;
                            console.log(`Final transcript: ${finalTranscript}`);
                        } else {
                            interimTranscript += mapped;
                            console.log(`Interim transcript: ${interimTranscript}`);
                        }
                        
                        // iOS FIX: Submit letters immediately for iOS since it may not mark as final
                        if (isIOS && mapped) {
                            console.log(`iOS: Immediately submitting letter: ${mapped}`);
                            document.getElementById('result').innerHTML = mapped;
                            handleGuess(mapped);
                            return; // Submit first letter and stop processing
                        }
                    }
                    
                    document.getElementById('result').innerHTML = finalTranscript + '<i style="color:#999;">' + interimTranscript + '</i>';
                    
                    // Non-iOS: Only submit final results
                    if (!isIOS && finalTranscript) {
                        const guessedLetter = finalTranscript.toUpperCase();
                        console.log(`Non-iOS: Submitting final letter: ${guessedLetter}`);
                        handleGuess(guessedLetter);
                    }
                };
                
                iosRecognition.onerror = function(event) {
                    console.error('iOS speech recognition error:', event);
                    const errorMsg = getMobileFriendlyError(event.error);
                    statusEl.innerHTML = `<span style="color: red;">${errorMsg}</span>`;
                    document.getElementById('start-btn').disabled = false;
                    document.getElementById('stop-btn').disabled = true;
                };
                
                iosRecognition.onend = function() {
                    console.log('iOS speech recognition ended');
                    statusEl.innerHTML = '';
                    document.getElementById('start-btn').disabled = false;
                    document.getElementById('stop-btn').disabled = true;
                };
                
                // Start iOS recognition
                try {
                    iosRecognition.start();
                } catch (error) {
                    console.error('Failed to start iOS recognition:', error);
                    statusEl.innerHTML = `<span style="color: red;">${getIosMessage('failed')}</span>`;
                }
            } else {
                statusEl.innerHTML = `<span style="color: red;">${getIosMessage('not_supported')}</span>`;
            }
            return;
        }
        
        // Non-iOS handling (original code)
        statusEl.innerHTML = '<span style="color: blue;">Requesting microphone access...</span>';
        
        navigator.mediaDevices.getUserMedia({
            audio: {
                echoCancellation: true,
                noiseSuppression: true,
                autoGainControl: true
            }
        }).then(stream => {
            audioStream = stream;
            statusEl.innerHTML = '<span style="color: green;">Microphone active! Start speaking...</span>';
            
            // Try to create audio context with mobile-friendly options
            try {
                const AudioContextClass = window.AudioContext || window.webkitAudioContext;
                const audioContext = new AudioContextClass();
                
                // Only create audio nodes if context is running
                if (audioContext.state === 'running') {
                    const source = audioContext.createMediaStreamSource(stream);
                    const gainNode = audioContext.createGain();
                    gainNode.gain.value = isMobile ? 1.5 : 2; // Lower gain for mobile
                    source.connect(gainNode).connect(audioContext.destination);
                }
            } catch (audioError) {
                console.warn('Audio context creation failed, continuing without audio feedback:', audioError);
            }
            
            // Start speech recognition
            try {
                recognition.start();
                statusEl.innerHTML = '<span style="color: green;">Listening...</span>';
            } catch (recognitionError) {
                console.error('Failed to start recognition:', recognitionError);
                statusEl.innerHTML = '<span style="color: red;">Failed to start speech recognition</span>';
            }
        }).catch(error => {
            console.error('Error accessing microphone:', error);
            let errorMsg = 'Microphone access failed';
            
            if (error.name === 'NotAllowedError') {
                errorMsg = 'Microphone permission denied. Please allow mic access in browser settings.';
            } else if (error.name === 'NotFoundError') {
                errorMsg = 'No microphone found. Please check your device.';
            } else if (error.name === 'NotReadableError') {
                errorMsg = 'Microphone is being used by another app.';
            } else if (error.name === 'OverconstrainedError') {
                errorMsg = 'Microphone constraints not supported.';
            }
            
            statusEl.innerHTML = `<span style="color: red;">${errorMsg}</span>`;
            
            // Remove error message after 5 seconds
            setTimeout(() => {
                if (statusEl && statusEl.innerHTML.includes(errorMsg)) {
                    statusEl.innerHTML = '';
                }
            }, 5000);
        });
    };

    document.getElementById('stop-btn').onclick = function() {
        // Stop iOS recognition if it's active
        if (iosRecognition && isIOS) {
            try {
                iosRecognition.stop();
                iosRecognition = null; // Clear the reference
                console.log('iOS speech recognition stopped by user');
            } catch (e) {
                console.warn('Error stopping iOS recognition:', e);
            }
        }
        
        // Stop regular recognition if it's active
        try {
            recognition.stop();
        } catch (e) {
            console.warn('Error stopping regular recognition:', e);
        }
        
        // Stop audio stream
        if (audioStream) {
            audioStream.getTracks().forEach(track => track.stop());
            audioStream = null;
        }
        
        // Reset UI
        const statusEl = document.getElementById('status');
        if (statusEl) {
            const message = selectedLang === 'es-ES' || selectedLang === 'es' ? 
                'Reconocimiento de voz detenido.' : 'Speech recognition stopped.';
            statusEl.innerHTML = `<span style="color: orange;">${message}</span>`;
            
            // Clear message after 2 seconds
            setTimeout(() => {
                if (statusEl.innerHTML.includes(message)) {
                    statusEl.innerHTML = '';
                }
            }, 2000);
        }
        
        document.getElementById('start-btn').disabled = false;
        document.getElementById('stop-btn').disabled = true;
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
    
    // Show mobile-friendly message instead of alert
    const statusEl = document.getElementById('status');
    if (statusEl) {
        if (isIOS) {
            const message = selectedLang === 'es-ES' || selectedLang === 'es' ? 
                'Voz de iOS no compatible. Usa Chrome o escribe letras abajo.' : 
                'iOS speech not supported. Please use Chrome browser or type letters below.';
            statusEl.innerHTML = `<span style="color: red;">${message}</span>`;
        } else if (isMobile) {
            const message = selectedLang === 'es-ES' || selectedLang === 'es' ? 
                'Reconocimiento de voz no compatible. Toca letras abajo o prueba Chrome.' : 
                'Voice recognition not supported. Please tap letters below or try Chrome browser.';
            statusEl.innerHTML = `<span style="color: orange;">${message}</span>`;
        } else {
            const message = selectedLang === 'es-ES' || selectedLang === 'es' ? 
                'Reconocimiento de voz no compatible. Usa Chrome.' : 
                'Voice recognition not supported. Please use Chrome browser.';
            statusEl.innerHTML = `<span style="color: red;">${message}</span>`;
        }
    }
    
    // Add keyboard input fallback for mobile
    document.addEventListener('keydown', function(event) {
        const key = event.key.toUpperCase();
        if (/^[A-Z]$/.test(key)) {
            const letterButtons = document.querySelectorAll('.letter-button');
            letterButtons.forEach(button => {
                if (button.innerText === key) {
                    button.click();
                }
            });
        }
    });
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