let selectedLang = null; // No language selected by default
let pendingGameLang = null;
let SPANISH_DICTIONARY = window.SPANISH_DICTIONARY || {};

const TRANSLATE_API = '/api/translate';

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
            const proxyUrlDef = `${TRANSLATE_API}?q=${encodeURIComponent(def)}&target=${encodeURIComponent(target)}`;
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
    // Spanish words are now loaded from GitHub, so this function is deprecated
    console.log('Spanish words loaded from GitHub instead of local file');
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
        "en-US": "https://englishflagtranslation.vercel.app/",
        "es-ES": "https://spanishflagtranslation.vercel.app/",
        "zh-CN": "https://mandarinflagtranslation.vercel.app/",
        "hi-IN": "https://hindiflagtranslation.vercel.app/",
        "fr-FR": "https://frenchflagtranslation.vercel.app/"
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
    "click": {
        "en-US": "Click",
        "es-ES": "Haz clic",
        "fr-FR": "Cliquez",
        "zh-CN": "点击",
        "hi-IN": "क्लिक करें"
    },
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

// Function to get flag image URL for a language code
function getFlagImageUrl(langCode) {
    const flagMap = {
        'en-US': 'https://flagcdn.com/w40/us.png',
        'es-ES': 'https://flagcdn.com/w40/es.png',
        'zh-CN': 'https://flagcdn.com/w40/cn.png',
        'hi-IN': 'https://flagcdn.com/w40/in.png',
        'fr-FR': 'https://flagcdn.com/w40/fr.png'
    };
    return flagMap[langCode] || '';
}

// Function to get flag display (always use images for Windows compatibility)
function getFlagDisplay(langCode) {
    const lang = LANGUAGES.find(l => l.code === langCode);
    if (!lang) return '';
    
    // Always use images for better Windows 11 compatibility
    const imageUrl = getFlagImageUrl(langCode);
    if (imageUrl) {
        return `<img src="${imageUrl}" alt="${lang.canonicalName} flag" class="flag-image" style="width: 24px; height: 18px; object-fit: cover; border-radius: 2px; vertical-align: middle; margin-right: 6px;">`;
    }
    
    // Fallback to emoji if image fails
    return lang.flag;
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
        
        // Build button content using DOM methods
        btn.innerHTML = '';
        
        // Just show the flag image, not clickable (only popup flags should be clickable)
        if (flagDisplay.includes('<img')) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = flagDisplay;
            const img = tempDiv.querySelector('img');
            if (img) {
                btn.appendChild(img);
            }
        } else {
            // Fallback to emoji span
            const flagSpan = document.createElement('span');
            flagSpan.className = 'flag-emoji';
            flagSpan.textContent = lang.flag;
            btn.appendChild(flagSpan);
        }
        
        const nameSpan = document.createElement('span');
        nameSpan.textContent = ' ' + langName;
        const br = document.createElement('br');
        const small = document.createElement('small');
        small.className = 'pick-alt-label';
        small.textContent = pickAlt;
        btn.appendChild(nameSpan);
        btn.appendChild(br);
        btn.appendChild(small);
    });
    const chooseLangTitle = document.getElementById('choose-lang-title');
    if (chooseLangTitle) {
        // Show each language with its correct flag and localized "choose language" text
        chooseLangTitle.innerHTML = LANGUAGES.map(l => {
            const flag = getFlagDisplay(l.code) || '';
            // Just show the flag, not clickable
            const flagHtml = flag;
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

// Advanced Phonetic Recognition System
// Uses phonetic-engine.js for accent-aware Spanish recognition
let phoneticEngine = null;

// Initialize the phonetic engine when the page loads
async function initPhoneticEngine() {
    if (typeof PhoneticEngine !== 'undefined') {
        phoneticEngine = new PhoneticEngine();
        await phoneticEngine.initialize();
        console.log('Advanced phonetic engine initialized');
    } else {
        console.warn('Phonetic engine not loaded, using fallback');
    }
}

// Legacy fallback maps (kept for compatibility)
const legacyPhoneticMap = {
    // Basic English alphabet for emergency fallback
    'a': 'A', 'b': 'B', 'c': 'C', 'd': 'D', 'e': 'E', 'f': 'F', 'g': 'G', 'h': 'H',
    'i': 'I', 'j': 'J', 'k': 'K', 'l': 'L', 'm': 'M', 'n': 'N', 'o': 'O', 'p': 'P',
    'q': 'Q', 'r': 'R', 's': 'S', 't': 'T', 'u': 'U', 'v': 'V', 'w': 'W', 'x': 'X',
    'y': 'Y', 'z': 'Z'
};

const legacySpanishMap = {
    // Basic Spanish alphabet for emergency fallback
    'a': 'A', 'be': 'B', 'ce': 'C', 'de': 'D', 'e': 'E', 'efe': 'F', 'ge': 'G', 'hache': 'H',
    'i': 'I', 'jota': 'J', 'ka': 'K', 'ele': 'L', 'eme': 'M', 'ene': 'N', 'eñe': 'Ñ', 'o': 'O',
    'pe': 'P', 'cu': 'Q', 'ere': 'R', 'ese': 'S', 'te': 'T', 'u': 'U', 'uve': 'V', 'equis': 'X', 
    'ye': 'Y', 'zeta': 'Z'
};

let voiceFeedbackTimer = null;
let iosUserWantsListen = false;

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function isSpanishUI() {
    return selectedLang === 'es-ES' || selectedLang === 'es';
}

function mapTranscriptToLetter(transcriptRaw, langCode) {
    if (!transcriptRaw) return null;
    const normalized = transcriptRaw.trim().toLowerCase();
    const langShort = (langCode || 'en-US').split('-')[0];

    let mapped = null;

    if (phoneticEngine && (langShort === 'es' || langShort === 'en')) {
        // Get game context for better recognition
        const context = {
            availableLetters: typeof letters !== 'undefined' ? letters : [],
            guessedLetters: typeof guessedLetters !== 'undefined' ? guessedLetters : []
        };
        mapped = phoneticEngine.recognizeLetter(normalized, context);
    }
    if (!mapped) {
        mapped = legacySpanishMap[normalized] || legacyPhoneticMap[normalized] || null;
    }
    if (!mapped && langShort === 'es') {
        const spanishCharMatch = normalized.match(/[a-záéíóúñü]/i);
        if (spanishCharMatch) {
            mapped = spanishCharMatch[0].toUpperCase();
        }
    }
    if (!mapped && langShort !== 'en') {
        const firstChar = normalized[0];
        if (firstChar && /[a-záéíóúñü]/i.test(firstChar)) {
            mapped = firstChar.toUpperCase();
        }
    }
    if (!mapped && normalized.length === 1 && /[a-zñáéíóúü]/i.test(normalized)) {
        mapped = normalized.toUpperCase();
    }

    return mapped;
}

function showVoiceFeedback(type, data = {}) {
    const resultEl = document.getElementById('result');
    const statusEl = document.getElementById('status');
    if (!resultEl) return;

    const es = isSpanishUI();
    let html = '';
    let statusText = '';

    switch (type) {
        case 'heard':
            html = es
                ? `<span class="voice-heard">🎤 Escuché: “${escapeHtml(data.heard)}”</span>`
                : `<span class="voice-heard">🎤 Heard: “${escapeHtml(data.heard)}”</span>`;
            break;
        case 'hearing':
            statusText = es ? 'Te escucho…' : 'Hearing you…';
            break;
        case 'correct':
            html = es
                ? `<span class="voice-ok">✓ Letra <strong>${escapeHtml(data.letter)}</strong> — ¡en la palabra!</span>`
                : `<span class="voice-ok">✓ Letter <strong>${escapeHtml(data.letter)}</strong> — in the word!</span>`;
            break;
        case 'wrong':
            html = es
                ? `<span class="voice-warn">Letra <strong>${escapeHtml(data.letter)}</strong> — no está en la palabra</span>`
                : `<span class="voice-warn">Letter <strong>${escapeHtml(data.letter)}</strong> — not in the word</span>`;
            break;
        case 'noMatch':
            html = es
                ? `<span class="voice-warn">🎤 “${escapeHtml(data.heard)}” — no es una letra. Di “a”, “be”, “ce”… o toca una letra abajo.</span>`
                : `<span class="voice-warn">🎤 “${escapeHtml(data.heard)}” — not a letter. Say “a”, “b”, “c”… or tap a letter below.</span>`;
            break;
        case 'listening':
            statusText = es ? 'Escuchando… ¡di una letra!' : 'Listening… say a letter!';
            break;
        case 'stopped':
            statusText = es
                ? 'Micrófono pausado. Toca “Start Speaking” o escribe abajo.'
                : 'Mic paused. Tap “Start Speaking” or type a letter below.';
            break;
        case 'reconnecting':
            statusText = es ? 'Sigo escuchando…' : 'Still listening…';
            break;
        default:
            break;
    }

    if (html) {
        resultEl.innerHTML = html;
        clearTimeout(voiceFeedbackTimer);
        const duration = type === 'noMatch' ? 4500 : 2800;
        voiceFeedbackTimer = setTimeout(() => {
            if (resultEl.innerHTML === html) {
                resultEl.innerHTML = '';
            }
        }, duration);
    }
    if (statusText && statusEl) {
        statusEl.innerHTML = `<span class="voice-status">${statusText}</span>`;
    }
}

function initIOSSpeechFallback() {
    const container = document.getElementById('ios-speech-container');
    const input = document.getElementById('ios-letter-input');
    const submit = document.getElementById('ios-letter-submit');
    const label = document.getElementById('ios-letter-label');
    if (!container || !input || !submit) return;

    const es = isSpanishUI();
    if (label) {
        label.textContent = es
            ? 'Si la voz falla, escribe una letra:'
            : 'If voice fails, type a letter:';
    }
    submit.textContent = es ? 'Enviar' : 'Submit';

    const doSubmit = () => {
        const val = input.value.trim();
        if (!val) return;
        if (typeof window.submitIosLetterFallback === 'function') {
            window.submitIosLetterFallback(val);
        } else {
            showVoiceFeedback('noMatch', { heard: val });
        }
        input.value = '';
    };

    submit.onclick = doSubmit;
    input.onkeydown = (e) => {
        if (e.key === 'Enter') doSubmit();
    };
}

// Load FreeDict Spanish-English dictionary (large vocabulary)
let FREEDICT_SPANISH_ENGLISH = {};
let SPANISH_WORDLIST = new Set(); // For word validation

// English dictionary and word list
let ENGLISH_DICTIONARY = {};
let ENGLISH_WORDLIST = new Set(); // For word validation

// Suppress CORS error messages
const originalConsoleError = console.error;
console.error = function(...args) {
    if (args[0] && args[0].includes && (
        args[0].includes('CORS policy') || 
        args[0].includes('sourceforge.net') ||
        args[0].includes('Access-Control-Allow-Origin')
    )) {
        return; // Suppress CORS errors and sourceforge.net related errors
    }
    originalConsoleError.apply(console, args);
};

// Load bilingual Spanish-English dictionary
let ES_EN_DICTIONARY = new Map();
let ES_EN_WORDLIST = new Set();

async function loadESEnDictionary() {
    try {
        const response = await fetch('es-en-dictionary.json');
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Loaded Spanish-English dictionary:', data.length, 'entries');
        
        // Process each entry
        data.forEach(entry => {
            if (entry.word && entry.definitions && entry.definitions.length > 0) {
                // Only include clean single words
                const cleanWord = entry.word.replace(/[.,\/\-\s]/g, '').trim();
                if (/^[a-zA-ZáéíóúñüÁÉÍÓÚÑÜ]+$/.test(cleanWord) && cleanWord.length > 1) {
                    // Clean up definitions - remove type codes in braces like {f}, {m}, {n}
                    const cleanDefinitions = entry.definitions.map(def => 
                        def.replace(/\s*\{[^}]*\}\s*/g, '').trim()
                    ).filter(def => def.length > 0);
                    
                    if (cleanDefinitions.length > 0) {
                        ES_EN_DICTIONARY.set(cleanWord.toLowerCase(), {
                            word: cleanWord,
                            definitions: cleanDefinitions,
                            types: entry.types || []
                        });
                        ES_EN_WORDLIST.add(cleanWord.toLowerCase());
                    }
                }
            }
        });
        
        console.log('Processed Spanish-English dictionary:', ES_EN_WORDLIST.size, 'Spanish words with English definitions');
        
    } catch (e) {
        console.error('Failed to load Spanish-English dictionary:', e);
        ES_EN_DICTIONARY = new Map();
        ES_EN_WORDLIST = new Set();
    }
}

// Load bilingual English-Spanish dictionary
let EN_ES_DICTIONARY = new Map();
let EN_ES_WORDLIST = new Set();

async function loadEnEsDictionary() {
    try {
        const response = await fetch('en-es-dictionary.json');
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Loaded English-Spanish dictionary:', data.length, 'entries');
        
        // Process each entry
        data.forEach(entry => {
            if (entry.word && entry.definitions && entry.definitions.length > 0) {
                // Only include clean single words
                const cleanWord = entry.word.replace(/[.,\/\-\s]/g, '').trim();
                if (/^[a-zA-Z]+$/.test(cleanWord) && cleanWord.length > 1) {
                    // Clean up definitions - remove type codes in braces like {f}, {m}, {n}
                    const cleanDefinitions = entry.definitions.map(def => 
                        def.replace(/\s*\{[^}]*\}\s*/g, '').trim()
                    ).filter(def => def.length > 0);
                    
                    if (cleanDefinitions.length > 0) {
                        EN_ES_DICTIONARY.set(cleanWord.toLowerCase(), {
                            word: cleanWord,
                            definitions: cleanDefinitions,
                            types: entry.types || []
                        });
                        EN_ES_WORDLIST.add(cleanWord.toLowerCase());
                    }
                }
            }
        });
        
        console.log('Processed English-Spanish dictionary:', EN_ES_WORDLIST.size, 'English words with Spanish definitions');
        
    } catch (e) {
        console.error('Failed to load English-Spanish dictionary:', e);
        EN_ES_DICTIONARY = new Map();
        EN_ES_WORDLIST = new Set();
    }
}

// Load comprehensive dictionary with both English and Spanish words
async function loadComprehensiveDictionary() {
    try {
        const response = await fetch('comprehensive_webster.json');
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const comprehensiveData = await response.json();
        console.log('Loaded comprehensive dictionary:', comprehensiveData.length, 'entries');
        
        // Initialize dictionaries
        ENGLISH_DICTIONARY = {};
        SPANISH_DICTIONARY = {};
        ENGLISH_WORDLIST = new Set();
        SPANISH_WORDLIST = new Set();
        
        // Process each entry
        comprehensiveData.forEach(entry => {
            if (entry.english && entry.spanish) {
                // English dictionary
                ENGLISH_DICTIONARY[entry.english.toLowerCase()] = {
                    definition: entry.english_definition || `English word: ${entry.english}`,
                    pronunciation: '', // Don't fake pronunciation
                    spanish: entry.spanish,
                    spanish_definition: entry.spanish_definition
                };
                ENGLISH_WORDLIST.add(entry.english.toLowerCase());
                
                // Spanish dictionary  
                SPANISH_DICTIONARY[entry.spanish.toLowerCase()] = {
                    definition: entry.spanish_definition || `Palabra española: ${entry.spanish}`,
                    pronunciation: '', // Don't fake pronunciation
                    english: entry.english,
                    english_definition: entry.english_definition
                };
                SPANISH_WORDLIST.add(entry.spanish.toLowerCase());
            }
        });
        
        console.log('Processed dictionaries:');
        console.log('- English words:', ENGLISH_WORDLIST.size);
        console.log('- Spanish words:', SPANISH_WORDLIST.size);
        
    } catch (e) {
        console.error('Failed to load comprehensive dictionary:', e);
        // Initialize empty dictionaries - we'll use API instead
        ENGLISH_DICTIONARY = {};
        SPANISH_DICTIONARY = {};
        ENGLISH_WORDLIST = new Set();
        SPANISH_WORDLIST = new Set();
    }
}

// Cache for API-fetched definitions
const DEFINITION_CACHE = new Map();

// Fetch definition from DictionaryAPI.dev
async function fetchDefinitionFromAPI(word, lang = 'en') {
    const cacheKey = `${lang}:${word.toLowerCase()}`;
    if (DEFINITION_CACHE.has(cacheKey)) {
        return DEFINITION_CACHE.get(cacheKey);
    }

    try {
        const cleanWord = word.split("(")[0].trim();
        const langCode = lang === 'es' ? 'es' : 'en';
        
        const response = await fetch(
            `https://api.dictionaryapi.dev/api/v2/entries/${langCode}/${cleanWord.toLowerCase()}`
        );
        
        if (!response.ok) {
            DEFINITION_CACHE.set(cacheKey, null);
            return null;
        }
        
        const data = await response.json();
        
        // Extract the first definition
        if (data && data[0] && data[0].meanings && data[0].meanings[0]) {
            const firstMeaning = data[0].meanings[0];
            const firstDef = firstMeaning.definitions && firstMeaning.definitions[0];
            const definition = firstDef ? firstDef.definition : null;
            
            // Get pronunciation if available
            const phonetic = data[0].phonetic || 
                           (data[0].phonetics && data[0].phonetics[0] && data[0].phonetics[0].text) || '';
            
            const result = {
                definition: definition || null,
                pronunciation: phonetic || ''
            };
            
            DEFINITION_CACHE.set(cacheKey, result);
            return result;
        }
        
        DEFINITION_CACHE.set(cacheKey, null);
        return null;
    } catch (error) {
        console.error(`Error fetching definition for ${word}:`, error);
        DEFINITION_CACHE.set(cacheKey, null);
        return null;
    }
}

// Initialize dictionary on page load
async function loadFreeDictSpanishEnglish() {
    try {
        // Download FreeDict Spanish-English dictionary
        const response = await fetch('https://sourceforge.net/projects/freedict/files/spa-eng/0.3/freedict-spa-eng-0.3.slob/download');
        if (response.ok) {
            const blob = await response.blob();
            // Parse SLOB format (simplified - in production would use proper SLOB parser)
            console.log('FreeDict Spanish-English dictionary loaded');
            // For now, fall back to common words until we implement SLOB parsing
            FREEDICT_SPANISH_ENGLISH = {
                'cocina': 'kitchen', 'casa': 'house', 'perro': 'dog', 'gato': 'cat',
                'agua': 'water', 'sol': 'sun', 'luna': 'moon', 'mesa': 'table',
                'silla': 'chair', 'libro': 'book', 'coche': 'car', 'árbol': 'tree',
                'flor': 'flower', 'comida': 'food', 'bebida': 'drink', 'familia': 'family',
                'amigo': 'friend', 'trabajo': 'work', 'escuela': 'school', 'hospital': 'hospital',
                'tienda': 'store', 'dinero': 'money', 'tiempo': 'time', 'día': 'day',
                'noche': 'night', 'mañana': 'morning', 'tarde': 'afternoon', 'grande': 'big',
                'pequeño': 'small', 'bueno': 'good', 'malo': 'bad', 'feliz': 'happy',
                'triste': 'sad', 'nuevo': 'new', 'viejo': 'old', 'rápido': 'fast',
                'lento': 'slow', 'caliente': 'hot', 'frío': 'cold', 'blanco': 'white',
                'negro': 'black', 'rojo': 'red', 'azul': 'blue', 'verde': 'green',
                'amarillo': 'yellow'
            };
        }
    } catch (e) {
        console.warn('Failed to load FreeDict, using fallback:', e);
        // Fallback dictionary
        FREEDICT_SPANISH_ENGLISH = {
            'cocina': 'kitchen', 'casa': 'house', 'perro': 'dog', 'gato': 'cat',
            'agua': 'water', 'sol': 'sun', 'luna': 'moon', 'mesa': 'table',
            'silla': 'chair', 'libro': 'book', 'coche': 'car', 'árbol': 'tree',
            'flor': 'flower', 'comida': 'food', 'bebida': 'drink', 'familia': 'family',
            'amigo': 'friend', 'trabajo': 'work', 'escuela': 'school', 'hospital': 'hospital',
            'tienda': 'store', 'dinero': 'money', 'tiempo': 'time', 'día': 'day',
            'noche': 'night', 'mañana': 'morning', 'tarde': 'afternoon', 'grande': 'big',
            'pequeño': 'small', 'bueno': 'good', 'malo': 'bad', 'feliz': 'happy',
            'triste': 'sad', 'nuevo': 'new', 'viejo': 'old', 'rápido': 'fast',
            'lento': 'slow', 'caliente': 'hot', 'frío': 'cold', 'blanco': 'white',
            'negro': 'black', 'rojo': 'red', 'azul': 'blue', 'verde': 'green',
            'amarillo': 'yellow',
            // MORE COMMON WORDS
            'estudiante': 'student', 'profesor': 'teacher', 'clase': 'class', 'examen': 'exam',
            'tarea': 'homework', 'libro': 'book', 'papel': 'paper', 'lápiz': 'pencil',
            'computadora': 'computer', 'teléfono': 'phone', 'carro': 'car', 'calle': 'street',
            'ciudad': 'city', 'país': 'country', 'mundo': 'world', 'gente': 'people',
            'niño': 'child', 'hombre': 'man', 'mujer': 'woman', 'padre': 'father',
            'madre': 'mother', 'hermano': 'brother', 'hermana': 'sister', 'hijo': 'son',
            'hija': 'daughter', 'abuelo': 'grandfather', 'abuela': 'grandmother',
            'comer': 'eat', 'beber': 'drink', 'dormir': 'sleep', 'trabajar': 'work',
            'estudiar': 'study', 'aprender': 'learn', 'enseñar': 'teach', 'hablar': 'speak',
            'escuchar': 'listen', 'leer': 'read', 'escribir': 'write', 'caminar': 'walk',
            'correr': 'run', 'saltar': 'jump', 'nadar': 'swim', 'volar': 'fly',
            'grande': 'big', 'pequeño': 'small', 'alto': 'tall', 'bajo': 'short',
            'gordo': 'fat', 'delgado': 'thin', 'fuerte': 'strong', 'débil': 'weak',
            'joven': 'young', 'viejo': 'old', 'nuevo': 'new', 'antiguo': 'ancient',
            'bueno': 'good', 'malo': 'bad', 'feliz': 'happy', 'triste': 'sad',
            'enojado': 'angry', 'calmado': 'calm', 'contento': 'content', 'preocupado': 'worried'
        };
    }
}

// Load Spanish wordlist for comprehensive vocabulary
async function loadSpanishWordlist() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/xavier-hernandez/spanish-wordlist/main/text/spanish_words.txt');
        if (response.ok) {
            const text = await response.text();
            const words = text.split('\n').filter(word => word.trim());
            words.forEach(word => {
                SPANISH_WORDLIST.add(word.trim().toLowerCase());
            });
            console.log(`Loaded ${SPANISH_WORDLIST.size} Spanish words from GitHub wordlist`);
        }
    } catch (e) {
        console.warn('Failed to load Spanish wordlist:', e);
    }
}

// Load both dictionaries when page loads
async function initializeDictionaries() {
    await Promise.all([
        loadFreeDictSpanishEnglish(),
        loadSpanishWordlist()
    ]);
}

// Initialize dictionaries
initializeDictionaries();

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
        }
        initIOSSpeechFallback();
        
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
        console.log(`DEBUG: fetchWordObject called with language="${language}"`);
        let word = '';
        let definition = '';
        let pronunciation = '';
        let englishEquivalent = '';

        // List of common short words to avoid as game words
        const BAD_TRANSLATIONS = [
            'con', 'de', 'a', 'en', 'el', 'la', 'los', 'las', 'un', 'una', 'y', 'o', 'pero', 'por', 'para', 'al', 'del', 'le', 'les',
            'du', 'des', 'et', 'ou', 'mais', 'avec', 'dans', 'sur', 'par', 'chez', 'au', 'aux', 'ce', 'cette', 'ces',
            '是', '的', '了', '和', '在', '有', '我', '你', '他', '她', '它', '我们', '你们', '他们', '她们', '它们'
        ];

        function getRandomSafeWord() {
            // Minimal fallback words - will rarely be used since we load from GitHub
            const minimalFallback = ['house', 'water', 'sun', 'moon', 'tree', 'book', 'car', 'school'];
            return minimalFallback[Math.floor(Math.random() * minimalFallback.length)];
        }



        // --- SPANISH: Use bilingual dictionaries ---
                if (language === 'Spanish') {
                    // Check if user is learning English (UI is Spanish) or learning Spanish (UI is English)
                    const uiLangShort = (typeof selectedLang === "string" && selectedLang) ? selectedLang.split('-')[0] : 'en';
                    
                    if (uiLangShort === 'es') {
                        // Spanish speaker learning English: select ENGLISH words with Spanish definitions
                        // Wait for English-Spanish dictionary to load if not ready
                        if (EN_ES_WORDLIST.size === 0) {
                            console.log('English-Spanish dictionary not loaded yet, waiting...');
                            await new Promise(resolve => setTimeout(resolve, 1000));
                        }

                        // Pick English words - use bilingual dictionary for translation, then fetch real definition
                        const maxTries = 20;
                        let chosen = '';
                        let englishEquivalent = '';
                        let definition = '';
                        let pronunciation = '';

                        // Convert wordlist to array for random selection
                        const enEsWordsArray = Array.from(EN_ES_WORDLIST);
                        console.log(`Selecting from ${enEsWordsArray.length} English words`);
                        
                        for (let tryNum = 0; tryNum < maxTries; tryNum++) {
                            if (enEsWordsArray.length > 0) {
                                chosen = enEsWordsArray[Math.floor(Math.random() * enEsWordsArray.length)];
                                const entry = EN_ES_DICTIONARY.get(chosen.toLowerCase());
                                
                                if (entry && entry.definitions && entry.definitions.length > 0) {
                                    // Get Spanish translation from bilingual dict
                                    const translation = entry.definitions[0].split(',')[0].trim();
                                    englishEquivalent = chosen; // The word itself is the English word
                                    
                                    // Fetch actual English definition from DictionaryAPI, then translate to Spanish
                                    const apiDef = await fetchDefinitionFromAPI(chosen, 'en');
                                    if (apiDef && apiDef.definition) {
                                        // Translate English definition to Spanish
                                        try {
                                            const transRes = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(apiDef.definition)}&langpair=en|es`);
                                            const transData = await transRes.json();
                                            const translated = transData.responseData.translatedText;
                                            if (translated && translated !== apiDef.definition) {
                                                definition = translated;
                                            } else {
                                                definition = translation; // Fallback to translation
                                            }
                                        } catch (e) {
                                            definition = translation; // Fallback to translation
                                        }
                                        pronunciation = apiDef.pronunciation || '';
                                    } else {
                                        // Fallback to translation if API fails
                                        definition = translation;
                                        pronunciation = '';
                                    }
                                    
                                    console.log(`Selected: "${chosen}" -> "${englishEquivalent}"`);
                                    break;
                                }
                                
                                // If no definition, try another word
                                if (tryNum < maxTries - 1) {
                                    continue;
                                }
                            }
                        }

                        return await finalizeWordObj({
                            word: chosen,
                            definition: definition,
                            pronunciation: pronunciation,
                            englishEquivalent: englishEquivalent
                        }, 'Spanish');
                    }
                    
                    // English speaker learning Spanish: select SPANISH words with English definitions
                    // Wait for Spanish-English dictionary to load if not ready
                    if (ES_EN_WORDLIST.size === 0) {
                        console.log('Spanish-English dictionary not loaded yet, waiting...');
                        await new Promise(resolve => setTimeout(resolve, 1000));
                    }

                    // Pick Spanish words - use bilingual dictionary for translation, then fetch real definition
                    const maxTries = 20;
                    let chosen = '';
                    let englishEquivalent = '';
                    let definition = '';
                    let pronunciation = '';

                    // Convert wordlist to array for random selection
                    const esEnWordsArray = Array.from(ES_EN_WORDLIST);
                    console.log(`Selecting from ${esEnWordsArray.length} Spanish words`);
                    
                    for (let tryNum = 0; tryNum < maxTries; tryNum++) {
                        if (esEnWordsArray.length > 0) {
                            chosen = esEnWordsArray[Math.floor(Math.random() * esEnWordsArray.length)];
                            const entry = ES_EN_DICTIONARY.get(chosen.toLowerCase());
                            
                            console.log(`Try ${tryNum}: checking "${chosen}"`);
                            
                            if (entry && entry.definitions && entry.definitions.length > 0) {
                                // Get English translation from bilingual dict
                                const translation = entry.definitions[0].split(',')[0].trim();
                                englishEquivalent = translation;
                                definition = translation; // Use translation as initial definition
                                pronunciation = '';
                                console.log(`Using translation as initial definition: "${definition}"`);
                                
                                // Fetch real definition asynchronously after returning the word
                                setTimeout(async () => {
                                    try {
                                        const apiDef = await fetchDefinitionFromAPI(englishEquivalent, 'en');
                                        if (apiDef && apiDef.definition) {
                                            // Update the definition in the log container
                                            const defElement = document.querySelector('#word-info-def');
                                            if (defElement) {
                                                defElement.textContent = apiDef.definition;
                                            }
                                            // Also update the word object for future reference
                                            if (currentWordObj && currentWordObj.word === chosen) {
                                                currentWordObj.definition = apiDef.definition;
                                            }
                                            console.log(`Updated definition to: "${apiDef.definition}"`);
                                        }
                                    } catch (e) {
                                        console.log('Could not fetch real definition, keeping translation');
                                    }
                                }, 100); // Small delay to not block UI
                                
                                console.log(`Selected: "${chosen}" -> "${englishEquivalent}"`);
                                break;
                            } else {
                                console.log(`No entry or definitions for "${chosen}"`);
                            }
                            
                            // If no definition, try another word
                            if (tryNum < maxTries - 1) {
                                continue;
                            }
                        }
                    }

                    console.log(`Final result: word="${chosen}", definition="${definition}", english="${englishEquivalent}"`);

                    return await finalizeWordObj({
                        word: chosen,
                        definition: definition,
                        pronunciation: pronunciation,
                        englishEquivalent: englishEquivalent
                    }, 'Spanish');
                }

        // --- ENGLISH: Use bilingual English-Spanish dictionary ---
        if (language === 'English') {
            // Check if user is learning English (UI is Spanish) or learning Spanish (UI is English)
            const uiLangShort = (typeof selectedLang === "string" && selectedLang) ? selectedLang.split('-')[0] : 'en';
            
            if (uiLangShort === 'es') {
                // Spanish speaker learning English: show English words with Spanish UI
                // This is correct - we want English words for them to learn
            } else {
                // English speaker learning Spanish: should select SPANISH words instead
                console.log('English speaker learning Spanish - redirecting to Spanish');
                return await fetchWordObject('Spanish');
            }
            
            // Wait for English-Spanish dictionary to load if not ready
            if (EN_ES_WORDLIST.size === 0) {
                console.log('English-Spanish dictionary not loaded yet, waiting...');
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            
            const maxTries = 20;
            
            for (let tryNum = 0; tryNum < maxTries; tryNum++) {
                // Convert wordlist to array for random selection
                const enEsWordsArray = Array.from(EN_ES_WORDLIST);
                
                if (enEsWordsArray.length > 0) {
                    word = enEsWordsArray[Math.floor(Math.random() * enEsWordsArray.length)];
                    const entry = EN_ES_DICTIONARY.get(word.toLowerCase());
                    
                    if (entry && entry.definitions && entry.definitions.length > 0) {
                        // Use the first definition (it's already in Spanish!)
                        definition = entry.definitions[0];
                        pronunciation = '';
                        englishEquivalent = entry.word; // The word itself is the English word
                        
                        console.log(`Selected: "${word}" -> "${englishEquivalent}"`);
                        break;
                    }
                    
                    // If no definition, try another word
                    if (tryNum < maxTries - 1) {
                        continue;
                    }
                }
            }
            
            return await finalizeWordObj({
                word,
                definition,
                pronunciation,
                englishEquivalent
            }, language);
        }

        // --- OTHER LANGUAGES: Use API-based fallback ---
        // Commented out non-working languages (French, Mandarin, Hindi)
        // Only Spanish is currently supported
        if (language === 'Mandarin' || language === 'Hindi' || language === 'French') {
            console.log(`DEBUG: ${language} not yet supported, using Spanish fallback`);
            // Fall back to Spanish for now
            language = 'Spanish';
            return fetchWordObject('Spanish');
        }
        
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

        let langpair = 'en|es';
        let dictLangCode = 'es';
        // Commented out non-working languages
        // if (language === 'Mandarin') {
        //     langpair = 'en|zh-CN';
        //     dictLangCode = 'zh';
        // }
        // if (language === 'Hindi') {
        //     langpair = 'en|hi';
        //     dictLangCode = 'hi';
        // }
        // if (language === 'French') {
        //     langpair = 'en|fr';
        //     dictLangCode = 'fr';
        // }

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

    // Validate that word has all required components
    function validateWordObject(obj, gameLangCode) {
        if (!obj) return false;
        
        const played = obj.word || '';
        const eq = obj.englishEquivalent || '';
        const definition = obj.definition || '';
        
        // Must have word and definition (translation is optional for RAE words)
        if (!played || !definition) {
            return false;
        }
        
        // Avoid trivial same-word translations (unless learning English)
        if (eq && isTriviallySameCrossLang(played, eq, gameLangCode)) {
            return false;
        }
        
        return true;
    }

    async function fetchPlayableWord(gameLangCode, canonicalName, maxTries = 10) {
        let lastObj = null;
        for (let i = 0; i < maxTries; i++) {
            const obj = await fetchWordObject(canonicalName);
            if (!obj) continue;
            lastObj = obj;
            
            // Validate word has all required components
            const isValid = validateWordObject(obj, gameLangCode);
            if (isValid) {
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
            button.setAttribute('data-letter', letter); // Add data attribute for easy selection
            
            // Check if letter is already guessed and disable if so
            const normalizedLetter = normalizeLetter(letter);
            if (guessedLetters.some(g => normalizeLetter(g) === normalizedLetter)) {
                button.disabled = true;
                button.style.backgroundColor = '#ccc';
                button.style.color = '#666';
                button.style.cursor = 'not-allowed';
            }
            
            button.onclick = () => {
                if (!button.disabled) {
                    handleGuess(letter);
                }
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

    function updateKeyboardState() {
        const letterButtons = document.querySelectorAll('.letter-button[data-letter]');
        letterButtons.forEach(button => {
            const letter = button.getAttribute('data-letter');
            const normalizedLetter = normalizeLetter(letter);
            
            if (guessedLetters.some(g => normalizeLetter(g) === normalizedLetter)) {
                button.disabled = true;
                button.style.backgroundColor = '#ccc';
                button.style.color = '#666';
                button.style.cursor = 'not-allowed';
            }
        });
    }

    function normalizeLetter(letter) {
        // Remove accents for comparison
        return letter.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
    }

    function flashLetterButton(letter) {
        const normalized = normalizeLetter(letter);
        document.querySelectorAll('.letter-button[data-letter]').forEach((button) => {
            if (normalizeLetter(button.getAttribute('data-letter')) === normalized) {
                button.style.backgroundColor = '#90ee90';
                button.style.transition = 'background-color 0.3s';
                setTimeout(() => {
                    button.style.backgroundColor = '';
                }, 600);
            }
        });
    }

    function processVoiceInput(transcriptRaw) {
        const heard = transcriptRaw.trim();
        if (!heard) return false;

        const langCode = pendingGameLang || selectedLang || (typeof recognition !== 'undefined' ? recognition.lang : 'en-US');
        showVoiceFeedback('heard', { heard });

        const letter = mapTranscriptToLetter(heard, langCode);
        if (!letter) {
            showVoiceFeedback('noMatch', { heard });
            return false;
        }

        const normalizedGuess = normalizeLetter(letter);
        if (guessedLetters.some((l) => normalizeLetter(l) === normalizedGuess)) {
            const es = isSpanishUI();
            const message = es
                ? `Ya usaste la letra ${letter}.`
                : `You already used ${letter}.`;
            showVoiceFeedback('wrong', { letter, heard });
            showTemporaryPopup(message, false);
            return false;
        }

        const isCorrect = selectedWord.split('').some((l) => normalizeLetter(l) === normalizedGuess);
        handleGuess(letter);
        flashLetterButton(letter);
        showVoiceFeedback(isCorrect ? 'correct' : 'wrong', { letter, heard });
        return true;
    }

    window.submitIosLetterFallback = processVoiceInput;

    function handleGuess(letter) {
        // Normalize guessed letter for comparison
        const normalizedGuess = normalizeLetter(letter);

        // Check if already guessed (by normalized value)
        if (guessedLetters.some(l => normalizeLetter(l) === normalizedGuess)) {
            // Show message for repeated letter
            const currentUILang = uiLangShort || 'en';
            const message = currentUILang === 'es' 
                ? `Ya dijiste la letra ${letter}. Intenta con otra letra.`
                : `You already said ${letter}. Try a different letter.`;
            showTemporaryPopup(message, false);
            return; // Exit early - no penalty
        }

        // Add to guessed letters first to prevent duplicate processing
        guessedLetters.push(letter);
        
        // Update keyboard to grey out used letters
        updateKeyboardState();

        // If any letter in selectedWord matches normalized guess, it's correct
        if (selectedWord.split('').some(l => normalizeLetter(l) === normalizedGuess)) {
            // Correct guess - no penalty
        } else {
            // Wrong guess - increment penalty
            wrongGuesses++;
            if (wrongGuesses === maxWrongGuesses) {
                animateHangman();
            }
        }
        
        updateWordDisplay();
        drawHangman();
        checkGameStatus();
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
            showWordInfo(currentWordObj);
            // Show repeat buttons after word info
            setTimeout(() => showRepeatButtons(currentWordObj), 100);
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
            showWordInfo(currentWordObj);
            // Show repeat buttons after word info
            setTimeout(() => showRepeatButtons(currentWordObj), 100);
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
        // Initialize advanced phonetic engine
        initPhoneticEngine();
        
        // Load bilingual dictionaries
        loadESEnDictionary();
        loadEnEsDictionary();
        
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
            const translatorUrl = getTranslatorUrl(lang.code);
            
            // Make the flag clickable to translator URL
            if (translatorUrl && flagDisplay.includes('<img')) {
                // If it's an image, wrap it in an anchor
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = flagDisplay;
                const img = tempDiv.querySelector('img');
                if (img) {
                    const flagLink = document.createElement('a');
                    flagLink.href = translatorUrl;
                    flagLink.target = '_blank';
                    flagLink.rel = 'noopener noreferrer';
                    flagLink.style.display = 'inline-block';
                    flagLink.style.textDecoration = 'none';
                    flagLink.style.position = 'relative';
                    
                    // Add "Click" text that's slanted and close to the flag
                    const clickText = document.createElement('span');
                    clickText.textContent = TRANSLATIONS.click[lang.code] || 'Click';
                    clickText.style.color = '#60a5fa';
                    clickText.style.fontWeight = 'bold';
                    clickText.style.fontSize = '11px';
                    clickText.style.fontStyle = 'italic';
                    clickText.style.transform = 'rotate(-15deg)';
                    clickText.style.display = 'inline-block';
                    clickText.style.position = 'absolute';
                    clickText.style.top = '-6px';
                    clickText.style.whiteSpace = 'nowrap';
                    // Adjust position for Chinese and English (further right)
                    if (lang.code === 'zh-CN') {
                        clickText.style.left = '-20px';
                    } else if (lang.code === 'en-US') {
                        clickText.style.left = '-18px';
                    } else {
                        clickText.style.left = '-28px';
                    }
                    
                    flagLink.appendChild(clickText);
                    flagLink.appendChild(img);
                    label.appendChild(flagLink);
                }
            } else {
                // Fallback to emoji span
                const flagSpan = document.createElement('span');
                flagSpan.className = 'flag-emoji';
                flagSpan.textContent = lang.flag;
                label.appendChild(flagSpan);
            }
            
            const labelText = document.createElement('span');
            labelText.textContent = ' ' + TRANSLATIONS.choose_language[lang.code];
            label.appendChild(labelText);
            label.style.minWidth = '180px';
            label.style.textAlign = 'right';

            // Create the button (always a plain button — the left label handles translator links)
            const btn = document.createElement('button');
            btn.innerHTML = '';
            
            // Add flag to button (NOT clickable - only popup flags should be clickable)
            if (flagDisplay.includes('<img')) {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = flagDisplay;
                const img = tempDiv.querySelector('img');
                if (img) {
                    btn.appendChild(img);
                }
            } else {
                const btnFlag = document.createElement('span');
                btnFlag.className = 'flag-emoji';
                btnFlag.textContent = lang.flag;
                btn.appendChild(btnFlag);
            }
            
            const btnName = document.createElement('span');
            btnName.textContent = ' ' + (lang.names[lang.code] || lang.canonicalName);
            btn.appendChild(btnName);
            btn.style.padding = '4px 16px 4px 10px'; // More right padding
            btn.style.fontSize = '15px';
            btn.style.minWidth = '80px';
            btn.style.width = 'auto';
            btn.style.maxWidth = '140px'; // Slightly wider for "Français"
            btn.style.overflow = 'hidden';
            btn.style.textOverflow = 'ellipsis';
            btn.onclick = function() {
                // Track language selection with Vercel Analytics
                const languageMap = {
                    'en-US': 'english',
                    'es-ES': 'spanish',
                    'zh-CN': 'mandarin',
                    'hi-IN': 'hindi',
                    'fr-FR': 'french'
                };
                const language = languageMap[lang.code] || lang.code;
                console.log('DEBUG: Language selection popup clicked - language:', language);
                if (window.va) {
                    console.log('DEBUG: Sending Vercel Analytics event:', language);
                    window.va('event', { name: language, data: { type: 'language_selection' } });
                }
                
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
                console.log(`DEBUG: Language button clicked - pendingGameLang=${btn.getAttribute('data-value')}`);
                pendingGameLang = btn.getAttribute('data-value');
                
                // Track language button click with Vercel Analytics
                const language = btn.getAttribute('data-language');
                console.log('DEBUG: Language attribute:', language);
                console.log('DEBUG: window.va available:', typeof window.va);
                if (window.va && language) {
                    console.log('DEBUG: Sending Vercel Analytics event:', language);
                    window.va('event', { name: language, data: { type: 'language_selection' } });
                } else {
                    console.log('DEBUG: Failed to send event - va:', !!window.va, 'language:', !!language);
                }
                
                if (typeof recognition !== 'undefined') recognition.lang = pendingGameLang;
                if (isIOS) initIOSSpeechFallback();

                // Immediately start game with selected language
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

        // Use the pre-fetched data from wordObj directly
        const playedWord = wordObj.word;
        const definition = wordObj.definition || 'No definition available';
        const pronunciation = wordObj.pronunciation;
        const englishEquivalent = wordObj.englishEquivalent || playedWord;

        // Create a clean display (definitions are already in the correct language from bilingual dicts)
        const wordInfoDiv = document.createElement('div');
        wordInfoDiv.style.marginTop = '12px';
        wordInfoDiv.style.padding = '12px';
        wordInfoDiv.style.backgroundColor = '#f8fafc';
        wordInfoDiv.style.borderRadius = '8px';
        wordInfoDiv.style.border = '1px solid #e2e8f0';

        let html = `
            <div style="font-size: 16px; font-weight: 600; color: #1e293b; margin-bottom: 8px;">
                ${playedWord} <span style="font-weight: 400; color: #64748b;">(${englishEquivalent})</span>
            </div>
            <div style="font-size: 14px; color: #334155; margin-bottom: 6px;">
                <strong>Definition:</strong> <span id="word-info-def">${definition}</span>
            </div>
        `;

        // Only show pronunciation if we have real data
        if (pronunciation && pronunciation !== '' && !pronunciation.includes('No pronunciation')) {
            html += `
                <div style="font-size: 14px; color: #334155;">
                    <strong>Pronunciation:</strong> ${pronunciation}
                </div>
            `;
        }

        wordInfoDiv.innerHTML = html;
        logContainer.appendChild(wordInfoDiv);
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
        showVoiceFeedback('listening');
        document.getElementById('start-btn').disabled = true;
        document.getElementById('stop-btn').disabled = false;
    };

    if (recognition.onspeechstart !== undefined) {
        recognition.onspeechstart = function() {
            showVoiceFeedback('hearing');
        };
    }

    recognition.onresult = function(event) {
        let interimTranscript = '';
        let finalTranscript = '';

        const currentRecLang = pendingGameLang || (typeof recognition !== 'undefined' && recognition.lang) || 'en-US';
        console.log(`Recognition language: ${currentRecLang}`);

        for (let i = event.resultIndex; i < event.results.length; ++i) {
            const transcriptRaw = event.results[i][0].transcript.trim();
            console.log(`Recognized: "${transcriptRaw}" (confidence: ${event.results[i][0].confidence}, isFinal: ${event.results[i].isFinal})`);

            if (isIOS) {
                processVoiceInput(transcriptRaw);
                return;
            }

            const mapped = mapTranscriptToLetter(transcriptRaw, currentRecLang);
            if (!mapped) {
                if (event.results[i].isFinal) {
                    showVoiceFeedback('noMatch', { heard: transcriptRaw });
                }
                continue;
            }

            if (event.results[i].isFinal) {
                finalTranscript += mapped;
            } else {
                interimTranscript += mapped;
            }
        }

        if (!isIOS) {
            document.getElementById('result').innerHTML = finalTranscript + '<i style="color:#999;">' + interimTranscript + '</i>';
        }

        if (finalTranscript) {
            processVoiceInput(finalTranscript);
        } else if (interimTranscript) {
            suggestLetter(interimTranscript);
        }
    };

    function suggestLetter(interimTranscript) {
        let suggestion = null;
        let confidence = 0;
        
        // Use advanced phonetic engine for suggestions with context
        if (phoneticEngine) {
            const context = {
                availableLetters: typeof letters !== 'undefined' ? letters : [],
                guessedLetters: typeof guessedLetters !== 'undefined' ? guessedLetters : []
            };
            const result = phoneticEngine.recognizeLetter(interimTranscript, context);
            if (result) {
                suggestion = result;
                confidence = phoneticEngine.calculateConfidence(interimTranscript, result);
            }
        }
        
        // Fallback to legacy maps
        if (!suggestion) {
            suggestion = legacyPhoneticMap[interimTranscript] || legacySpanishMap[interimTranscript] || null;
            confidence = 0.4; // Lower confidence for fallback
        }
        const letterButtons = document.querySelectorAll('.letter-button');
        const resultElement = document.getElementById('result');

        if (suggestion && confidence > 0.4) {
            const confidenceColor = confidence > 0.7 ? 'lightgreen' : confidence > 0.5 ? 'yellow' : 'orange';
            resultElement.innerHTML = `Did you mean: <span style="color: ${confidenceColor};">${suggestion}</span>? <button id="yes-btn">Yes</button> <button id="no-btn">No</button>`;

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
        if (isIOS && iosUserWantsListen) {
            showVoiceFeedback('reconnecting');
            setTimeout(() => {
                if (!iosUserWantsListen || !iosRecognition) return;
                try {
                    iosRecognition.start();
                } catch (e) {
                    console.warn('iOS recognition restart failed:', e);
                    showVoiceFeedback('stopped');
                    document.getElementById('start-btn').disabled = false;
                    document.getElementById('stop-btn').disabled = true;
                }
            }, 400);
            return;
        }
        showVoiceFeedback('stopped');
        document.getElementById('start-btn').disabled = false;
        document.getElementById('stop-btn').disabled = true;
    };

    let audioStream = null;
let iosRecognition = null; // Make iOS recognition accessible to stop button

    document.getElementById('start-btn').onclick = function() {
        const statusEl = document.getElementById('status');
        
        // iOS-specific handling
        if (isIOS) {
            const getIosMessage = (key) => {
                const es = isSpanishUI();
                const messages = {
                    starting: es ? 'Iniciando reconocimiento de voz…' : 'Starting speech recognition…',
                    not_supported: es
                        ? 'Voz no compatible en este iPhone. Usa el cuadro de letra abajo.'
                        : 'Voice not supported on this iPhone. Use the letter box below.',
                    failed: es
                        ? 'No se pudo iniciar la voz. Escribe una letra abajo.'
                        : 'Could not start voice. Type a letter below.'
                };
                return messages[key];
            };

            const iosContainer = document.getElementById('ios-speech-container');
            if (iosContainer) iosContainer.style.display = 'block';
            initIOSSpeechFallback();

            statusEl.innerHTML = `<span style="color: blue;">${getIosMessage('starting')}</span>`;
            iosUserWantsListen = true;

            const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognitionClass) {
                iosRecognition = new SpeechRecognitionClass();
                iosRecognition.continuous = true;
                iosRecognition.interimResults = true;
                iosRecognition.lang = pendingGameLang || selectedLang || 'en-US';

                iosRecognition.onstart = function() {
                    showVoiceFeedback('listening');
                    document.getElementById('start-btn').disabled = true;
                    document.getElementById('stop-btn').disabled = false;
                };

                if (iosRecognition.onspeechstart !== undefined) {
                    iosRecognition.onspeechstart = function() {
                        showVoiceFeedback('hearing');
                    };
                }

                iosRecognition.onresult = function(event) {
                    for (let i = event.resultIndex; i < event.results.length; ++i) {
                        const transcriptRaw = event.results[i][0].transcript.trim();
                        if (!transcriptRaw) continue;
                        console.log(`iOS Recognized: "${transcriptRaw}" (isFinal: ${event.results[i].isFinal})`);
                        processVoiceInput(transcriptRaw);
                        return;
                    }
                };

                iosRecognition.onerror = function(event) {
                    console.error('iOS speech recognition error:', event);
                    if (event.error === 'no-speech') {
                        showVoiceFeedback('listening');
                        return;
                    }
                    if (event.error === 'aborted') return;
                    const errorMsg = getMobileFriendlyError(event.error);
                    statusEl.innerHTML = `<span style="color: red;">${errorMsg}</span>`;
                    iosUserWantsListen = false;
                    document.getElementById('start-btn').disabled = false;
                    document.getElementById('stop-btn').disabled = true;
                };

                iosRecognition.onend = function() {
                    console.log('iOS speech recognition ended');
                    if (iosUserWantsListen) {
                        showVoiceFeedback('reconnecting');
                        setTimeout(() => {
                            if (!iosUserWantsListen) return;
                            try {
                                iosRecognition.start();
                            } catch (e) {
                                console.warn('iOS recognition restart failed:', e);
                                showVoiceFeedback('stopped');
                                document.getElementById('start-btn').disabled = false;
                                document.getElementById('stop-btn').disabled = true;
                            }
                        }, 400);
                    } else {
                        showVoiceFeedback('stopped');
                        document.getElementById('start-btn').disabled = false;
                        document.getElementById('stop-btn').disabled = true;
                    }
                };

                try {
                    iosRecognition.start();
                } catch (error) {
                    console.error('Failed to start iOS recognition:', error);
                    iosUserWantsListen = false;
                    statusEl.innerHTML = `<span style="color: red;">${getIosMessage('failed')}</span>`;
                }
            } else {
                iosUserWantsListen = false;
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
        iosUserWantsListen = false;

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
        
        showVoiceFeedback('stopped');
        
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
