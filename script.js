let selectedLang = "en-US";
let pendingGameLang = "en-US";
let SPANISH_DICTIONARY = window.SPANISH_DICTIONARY || {};
const LANGUAGES = [
    {
        code: "en-US",
        flag: "🇺🇸",
        canonicalName: "English",
        names: { "en-US": "English", "es-ES": "Inglés", "fr-FR": "Anglais", "zh-CN": "英语", "hi-IN": "अंग्रेज़ी" }
    },
    {
        code: "es-ES",
        flag: "🇪🇸",
        canonicalName: "Spanish",
        names: { "en-US": "Spanish", "es-ES": "Español", "fr-FR": "Espagnol", "zh-CN": "西班牙语", "hi-IN": "स्पेनिश" }
    },
    {
        code: "zh-CN",
        flag: "🇨🇳",
        canonicalName: "Mandarin",
        names: { "en-US": "Mandarin", "es-ES": "Mandarín", "fr-FR": "Mandarin", "zh-CN": "普通话", "hi-IN": "मंदारिन" }
    },
    {
        code: "hi-IN",
        flag: "🇮🇳",
        canonicalName: "Hindi",
        names: { "en-US": "Hindi", "es-ES": "Hindi", "fr-FR": "Hindi", "zh-CN": "印地语", "hi-IN": "हिन्दी" }
    },
    {
        code: "fr-FR",
        flag: "🇫🇷",
        canonicalName: "French",
        names: { "en-US": "French", "es-ES": "Francés", "fr-FR": "Français", "zh-CN": "法语", "hi-IN": "फ्रेंच" }
    }
];

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

function setUILanguage(langCode) {
    document.getElementById('start-btn').innerText = TRANSLATIONS.start_speaking[langCode] || "Start Speaking";
    document.getElementById('stop-btn').innerText = TRANSLATIONS.stop_speaking[langCode] || "Stop Speaking";
    document.getElementById('instructions-button').innerText = `| ${TRANSLATIONS.instructions[langCode] || "Instructions"} |`;
    document.querySelectorAll('.lang-btn').forEach((btn, idx) => {
        const lang = LANGUAGES[idx];
        // Show the language name in the UI language
        const langName = lang.names[langCode] || lang.canonicalName;
        const pickAlt = TRANSLATIONS.pick_alternate_language[langCode] || "Pick alternate language:";
        btn.innerHTML = `<span class="flag-emoji">${lang.flag}</span> ${langName}<br><small class="pick-alt-label">${pickAlt}</small>`;
    });
    const chooseLangTitle = document.getElementById('choose-lang-title');
    if (chooseLangTitle) {
        chooseLangTitle.innerText = TRANSLATIONS.choose_language[langCode] || "Choose your language";
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
        "music", "planet", "river", "forest", "window", "garden", "school", "friend", "family", "holiday",
        "orange", "pencil", "market", "animal", "doctor", "summer", "winter", "travel", "nature", "science"
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

    // --- FIX: Handle Spanish FIRST, before any random English word fetching ---
    if (language === 'Spanish') {
        // Only use local SPANISH_DICTIONARY
        const keys = Object.keys(SPANISH_DICTIONARY);
        if (keys.length === 0) {
            // Fallback if dictionary is empty
            word = "manzana";
            definition = "Fruta del manzano, comestible, de forma redonda y sabor dulce o ácido.";
            pronunciation = "man-za-na";
            englishEquivalent = "apple";
        } else {
            // Pick a random Spanish word from the dictionary
            const randomKey = keys[Math.floor(Math.random() * keys.length)];
            const entry = SPANISH_DICTIONARY[randomKey];
            word = randomKey;
            definition = entry.definition || '';
            pronunciation = entry.pronunciation || '';
            englishEquivalent = entry.englishEquivalent || entry.english || randomKey;
        }
        return { word, definition, pronunciation, englishEquivalent };
    }

    // --- Only fetch random English word for non-Spanish languages ---
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

    if (language === 'English') {
        word = baseWord;
        try {
            const dictRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            const dictData = await dictRes.json();
            if (Array.isArray(dictData) && dictData[0]) {
                definition = dictData[0].meanings?.[0]?.definitions?.[0]?.definition || '';
                pronunciation = dictData[0].phonetic || '';
            }
        } catch (e) {}
        englishEquivalent = word;
    } else {
        let langpair = 'en|es';
        let dictLangCode = 'es';
        if (language === 'Mandarin') { langpair = 'en|zh-CN'; dictLangCode = 'zh'; }
        if (language === 'Hindi') { langpair = 'en|hi'; dictLangCode = 'hi'; }
        if (language === 'French') { langpair = 'en|fr'; dictLangCode = 'fr'; }

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
    }

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
    }, { once: true });

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
        letters = englishLetters.concat(['Ñ','Á','É','Í','Ó','Ú']);
    } else if (language === 'hi-IN') {
        // Hindi: Hindi alphabet + English A-Z
        letters = [
            'अ','आ','इ','ई','उ','ऊ','ऋ','ए','ऐ','ओ','औ','अं','अः',
            'क','ख','ग','घ','ङ','च','छ','ज','झ','ञ','ट','ठ','ड','ढ','ण',
            'त','थ','द','ध','न','प','फ','ब','भ','म','य','र','ल','व','श','ष','स','ह'
        ].concat(englishLetters);
    } else if (language === 'zh-CN') {
        // Mandarin: Common Mandarin chars + English A-Z
        letters = [
            '的','一','是','不','了','人','我','在','有','他','这','个','们','中','来','上','大','为','和','国','地','到','以','说','时','要','就','出','会','可','也','你','对','生','能','而','子','那','得','于','着','下','自','之','年','过','发','后','作','里'
        ].concat(englishLetters);
    } else if (language === 'fr-FR') {
        // French: French accented letters + English A-Z
        letters = englishLetters.concat(['À','Â','Æ','Ç','É','È','Ê','Ë','Î','Ï','Ô','Œ','Ù','Û','Ü','Ÿ']);
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
    const stepsHtml = Array.isArray(steps)
        ? `<ol>${steps.map(step => `<li>${step}</li>`).join('')}</ol>`
        : `<p>${steps}</p>`;

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
    // Popup language selection (first language box)
    const popup = document.getElementById('lang-select-popup');
    const btnsDiv = document.getElementById('lang-select-buttons');
    btnsDiv.innerHTML = '';
    LANGUAGES.forEach(lang => {
        const btn = document.createElement('button');
        btn.innerHTML = `<span class="flag-emoji">${lang.flag}</span> <span>${lang.names[lang.code]}</span>`;
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
        btnsDiv.appendChild(btn);
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

    // Helper to update UI
async function updateUI(word, def, pron, ttsLang, uiLang) {
    const logContainer = document.getElementById('log-container');
    if (!logContainer) return;

    // If no definition, try to get English and translate
    if ((!def || def.includes('No definition')) && wordObj.englishEquivalent) {
        try {
            // 1. Get English definition
            let englishDef = '';
            const dictResEn = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(wordObj.englishEquivalent)}`);
            const dictDataEn = await dictResEn.json();
            if (Array.isArray(dictDataEn) && dictDataEn[0]) {
                englishDef = dictDataEn[0].meanings?.[0]?.definitions?.[0]?.definition || '';
            }
            // 2. Translate English definition to UI language if needed
            if (englishDef && uiLang !== 'en') {
                try {
                    const transDefRes = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(englishDef)}&langpair=en|${uiLang}`);
                    const transDefData = await transDefRes.json();
                    def = transDefData.responseData.translatedText;
                } catch (e) {
                    def = `<span style="color:orange;">No definition found for "${word}" in this language.</span>`;
                }
            } else if (englishDef) {
                def = englishDef;
            }
        } catch (e) {
            def = `<span style="color:orange;">No definition found for "${word}" in this language.</span>`;
        }
    }

    // Compare word and English equivalent for display
    const englishEquivalent = wordObj.englishEquivalent ?? '';
    const showEnglishEquivalent =
        englishEquivalent &&
        englishEquivalent.trim().toLowerCase() !== (word ?? '').trim().toLowerCase();

    // --- Get UI language code and translation for "Word:" ---
    let uiLangCode = selectedLang || 'en-US';
    let wordLabel = (TRANSLATIONS.word && TRANSLATIONS.word[uiLangCode]) || "Word";

    // Decide which word to show: UI language = English? Show English equivalent, else show word in that language
    let wordToShow = wordObj.word || word;

    logContainer.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
            <div>
                <strong>${wordLabel}:</strong> <span id="word-info-word">${wordToShow}</span>
            </div>
            <div>
                <strong>English Equivalent:</strong>
                ${
                    showEnglishEquivalent
                        ? englishEquivalent
                        : `<span style="color:#aaa;">(same)</span>`
                }
            </div>
        </div>
        <strong>Definition:</strong> <span id="word-info-def">${def}</span>
        <button id="show-def-in-btn" style="margin-left:10px;">🌐 Show definition in...</button>
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
                <option value="">${TRANSLATIONS.show_word && TRANSLATIONS.show_word[uiLangCode] ? TRANSLATIONS.show_word[uiLangCode] : "Show word in..."}</option>
                <option value="es">Spanish</option>
                <option value="zh-CN">Mandarin</option>
                <option value="hi">Hindi</option>
                <option value="fr">French</option>
            </select>
            <button id="show-in-btn">${TRANSLATIONS.show_word && TRANSLATIONS.show_word[uiLangCode] ? TRANSLATIONS.show_word[uiLangCode] : "Show"}</button>
        </div>
    `;
    document.getElementById('tts-btn').onclick = () => {
        const utter = new SpeechSynthesisUtterance(wordToShow);
        utter.lang = ttsLang;
        window.speechSynthesis.speak(utter);
    };

    // Handler for "Show definition in..." button
    document.getElementById('show-def-in-btn').onclick = async () => {
        const defLang = document.getElementById('def-lang-dropdown').value;
        let englishDef = '';
        try {
            const dictResEn = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(wordObj.englishEquivalent)}`);
            const dictDataEn = await dictResEn.json();
            if (Array.isArray(dictDataEn) && dictDataEn[0]) {
                englishDef = dictDataEn[0].meanings?.[0]?.definitions?.[0]?.definition || '';
            }
        } catch (e) {}
        if (!englishDef) {
            document.getElementById('word-info-def').innerHTML = `<span style="color:orange;">No English definition found to translate.</span>`;
            return;
        }
        if (defLang === 'en') {
            document.getElementById('word-info-def').innerText = englishDef;
        } else {
            try {
                const transDefRes = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(englishDef)}&langpair=en|${defLang}`);
                const transDefData = await transDefRes.json();
                const translatedDef = transDefData.responseData.translatedText;
                document.getElementById('word-info-def').innerText = translatedDef;
            } catch (e) {
                document.getElementById('word-info-def').innerHTML = `<span style="color:orange;">Could not translate definition.</span>`;
            }
        }
    };
}

    // Detect UI language code (e.g., 'zh-CN', 'es', etc.)
    let uiLang = selectedLang || 'en';
    if (uiLang === 'en-US') uiLang = 'en';
    if (uiLang === 'es-ES') uiLang = 'es';
    if (uiLang === 'fr-FR') uiLang = 'fr';
    if (uiLang === 'hi-IN') uiLang = 'hi';
    // Mandarin stays 'zh-CN'

    // Initial display
    updateUI(
        wordObj.word ?? '(none)',
        wordObj.definition ?? '<span style="color:orange;">No definition found in this language.</span>',
        wordObj.pronunciation ?? '<span style="color:orange;">No pronunciation available.</span>',
        uiLang + '-ES',
        uiLang
    );

    document.getElementById('show-in-btn').onclick = async () => {
        const lang = document.getElementById('show-in-lang').value;
        if (!lang) return;
        const englishWord = wordObj.englishEquivalent;

        // 1. Translate the English equivalent to the selected language
        let translated = '';
        try {
            const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(englishWord)}&langpair=en|${lang}`);
            const data = await res.json();
            translated = data.responseData.translatedText;
        } catch (e) {
            updateUI('Translation error', '', '', lang + '-ES', lang);
            return;
        }

        // 2. Try DictionaryAPI.dev for definition/pronunciation in target language
        let def = '', pron = '';
        try {
            const dictRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/${lang}/${encodeURIComponent(translated)}`);
            const dictData = await dictRes.json();
            if (Array.isArray(dictData) && dictData[0]) {
                def = dictData[0].meanings?.[0]?.definitions?.[0]?.definition || '';
                pron = dictData[0].phonetic || '';
            }
        } catch (e) {}

        // 3. If not found, get English definition and translate it
        if (!def) {
            try {
                const dictResEn = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(englishWord)}`);
                const dictDataEn = await dictResEn.json();
                if (Array.isArray(dictDataEn) && dictDataEn[0]) {
                    let englishDef = dictDataEn[0].meanings?.[0]?.definitions?.[0]?.definition || '';
                    // Translate the English definition to the target language
                    if (englishDef) {
                        const transDefRes = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(englishDef)}&langpair=en|${lang}`);
                        const transDefData = await transDefRes.json();
                        def = transDefData.responseData.translatedText;
                    }
                    pron = dictDataEn[0].phonetic || '';
                }
            } catch (e) {}
        }

        // 4. If still not found, try Glosbe for definition
        if (!def) {
            try {
                const glosbeRes = await fetch(`https://glosbe.com/gapi/translate?from=${lang}&dest=${lang}&format=json&phrase=${encodeURIComponent(translated)}`);
                const glosbeData = await glosbeRes.json();
                if (glosbeData.tuc && glosbeData.tuc.length > 0) {
                    def = glosbeData.tuc[0].meanings?.[0]?.text || def;
                }
            } catch (e) {}
        }

        // 5. Final fallback message
        if (!def) def = `<span style="color:orange;">No definition found for "${translated}" in this language.</span>`;
        if (!pron) pron = '<span style="color:orange;">No pronunciation available.</span>';

        // 6. Use browser TTS for pronunciation if not available
        updateUI(translated, def, pron, lang + '-ES', lang);
    };
    showRepeatButtons(wordObj);
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
        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
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

    document.body.style.backgroundImage = "url('https://64.media.tumblr.com/43891cae5450425ccd1f06c610b731b3/27bd7103dd700c5a-8e/s500x750/5d2563ae1f3a14bf6864b088a06c17b46c205e86.gif')";
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