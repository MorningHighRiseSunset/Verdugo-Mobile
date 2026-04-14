// Advanced Phonetic Recognition Engine for Spanish Voice Input
// Combines IPA data, fuzzy matching, and accent handling

class PhoneticEngine {
    constructor() {
        this.spanishIPAData = new Map();
        this.letterSoundMap = new Map();
        this.accentVariations = new Map();
        this.initialize();
    }

    async initialize() {
        await this.loadSpanishIPAData();
        this.buildLetterSoundMap();
        this.buildAccentVariations();
    }

    async loadSpanishIPAData() {
        // Load Spanish IPA data from the downloaded file
        try {
            const response = await fetch('es_ES.txt');
            const text = await response.text();
            const lines = text.split('\n');
            
            lines.forEach(line => {
                const [word, ipa] = line.split('\t');
                if (word && ipa) {
                    this.spanishIPAData.set(word.toLowerCase(), ipa.trim());
                }
            });
            
            console.log(`Loaded ${this.spanishIPAData.size} Spanish IPA entries`);
        } catch (error) {
            console.warn('Could not load Spanish IPA data, using fallback');
            this.loadFallbackData();
        }
    }

    loadFallbackData() {
        // Fallback Spanish IPA data for common words
        const fallbackIPA = {
            'a': '/a/',
            'b': '/be/', 'be': '/be/',
            'c': '/ce/', 'ce': '/ce/', 
            'd': '/de/', 'de': '/de/',
            'e': '/e/',
            'f': '/efe/', 'efe': '/efe/',
            'g': '/xe/', 'ge': '/xe/', 'je': '/xe/',
            'h': '/açe/', 'hache': '/açe/',
            'i': '/i/',
            'j': '/xota/', 'jota': '/xota/',
            'k': '/ka/', 'ka': '/ka/',
            'l': '/ele/', 'ele': '/ele/',
            'm': '/eme/', 'eme': '/eme/',
            'n': '/ene/', 'ene': '/ene/',
            'ñ': '/eñe/', 'eñe': '/eñe/',
            'o': '/o/',
            'p': '/pe/', 'pe': '/pe/',
            'q': '/ku/', 'cu': '/ku/',
            'r': '/ere/', 'ere': '/ere/',
            's': '/ese/', 'ese': '/ese/',
            't': '/te/', 'te': '/te/',
            'u': '/u/',
            'v': '/ube/', 'uve': '/ube/',
            'w': '/doble be/', 'doble ve': '/doble be/',
            'x': '/ekis/', 'equis': '/ekis/',
            'y': '/i griega/', 'ye': '/i griega/',
            'z': '/zeta/', 'zeta': '/zeta/'
        };

        Object.entries(fallbackIPA).forEach(([word, ipa]) => {
            this.spanishIPAData.set(word, ipa);
        });
    }

    buildLetterSoundMap() {
        // Map Spanish letters to their phonetic representations
        this.letterSoundMap.set('A', ['a', 'eh', 'ah']);
        this.letterSoundMap.set('B', ['be', 'be larga', 'be corta', 'bi']);
        this.letterSoundMap.set('C', ['ce', 'seh', 'theh', 'si']);
        this.letterSoundMap.set('D', ['de', 'deh', 'di']);
        this.letterSoundMap.set('E', ['e', 'eh']);
        this.letterSoundMap.set('F', ['efe', 'efeh', 'efe']);
        this.letterSoundMap.set('G', ['ge', 'xe', 'je', 'gi']);
        this.letterSoundMap.set('H', ['hache', 'ache', 'açe']);
        this.letterSoundMap.set('I', ['i', 'ee', 'i']);
        this.letterSoundMap.set('J', ['jota', 'xota', 'hota']);
        this.letterSoundMap.set('K', ['ka', 'kah']);
        this.letterSoundMap.set('L', ['ele', 'el', 'eli']);
        this.letterSoundMap.set('M', ['eme', 'emeh', 'emi']);
        this.letterSoundMap.set('N', ['ene', 'eneh', 'eni']);
        this.letterSoundMap.set('Ñ', ['eñe', 'eñeh', 'enye']);
        this.letterSoundMap.set('O', ['o', 'oh', 'oh']);
        this.letterSoundMap.set('P', ['pe', 'peh', 'pi']);
        this.letterSoundMap.set('Q', ['cu', 'ku', 'qu']);
        this.letterSoundMap.set('R', ['ere', 'erre', 'rei', 'ari']);
        this.letterSoundMap.set('S', ['ese', 'eseh', 'esi']);
        this.letterSoundMap.set('T', ['te', 'teh', 'ti']);
        this.letterSoundMap.set('U', ['u', 'oo', 'uh']);
        this.letterSoundMap.set('V', ['uve', 've', 'ube', 'vi']);
        this.letterSoundMap.set('W', ['doble ve', 'doble uve', 'doble be', 'doble u']);
        this.letterSoundMap.set('X', ['equis', 'ekis', 'xis']);
        this.letterSoundMap.set('Y', ['ye', 'i griega', 'ye']);
        this.letterSoundMap.set('Z', ['zeta', 'zeta', 'seta', 'theta']);
    }

    buildAccentVariations() {
        // Regional accent variations
        this.accentVariations.set('mexico', {
            'c': ['seh', 'se'],
            'z': ['seta', 's'],
            's': ['seh', 'es']
        });
        
        this.accentVariations.set('spain', {
            'c': ['theh', 'th'],
            'z': ['theta', 'th'],
            'll': ['lli', 'yi', 'shi']
        });
        
        this.accentVariations.set('argentina', {
            'll': ['sh', 'zh', 'y'],
            'y': ['sh', 'zh'],
            'r': ['rr', 'r']
        });
        
        this.accentVariations.set('caribbean', {
            'r': ['l', 'h', ''],
            's': ['h', ''],
            'd': ['']
        });
    }

    // Main recognition function
    recognizeLetter(transcript) {
        if (!transcript) return null;
        
        const normalized = transcript.toLowerCase().trim();
        console.log(`Recognizing: "${normalized}"`);
        
        // 1. Direct match first
        const directMatch = this.findDirectMatch(normalized);
        if (directMatch) {
            console.log(`Direct match: ${normalized} -> ${directMatch}`);
            return directMatch;
        }
        
        // 2. Fuzzy phonetic matching
        const fuzzyMatch = this.findFuzzyMatch(normalized);
        if (fuzzyMatch) {
            console.log(`Fuzzy match: ${normalized} -> ${fuzzyMatch}`);
            return fuzzyMatch;
        }
        
        // 3. Accent-aware matching
        const accentMatch = this.findAccentMatch(normalized);
        if (accentMatch) {
            console.log(`Accent match: ${normalized} -> ${accentMatch}`);
            return accentMatch;
        }
        
        // 4. Single character extraction
        const charMatch = this.extractSingleCharacter(normalized);
        if (charMatch) {
            console.log(`Character match: ${normalized} -> ${charMatch}`);
            return charMatch;
        }
        
        console.log(`No match found for: "${normalized}"`);
        return null;
    }

    findDirectMatch(transcript) {
        // Check against letter sound map
        for (const [letter, sounds] of this.letterSoundMap) {
            if (sounds.includes(transcript)) {
                return letter;
            }
        }
        
        // Check against IPA data
        for (const [word, ipa] of this.spanishIPAData) {
            if (word === transcript || ipa.includes(transcript)) {
                return this.wordToLetter(word);
            }
        }
        
        return null;
    }

    findFuzzyMatch(transcript) {
        // Use Levenshtein distance for fuzzy matching
        let bestMatch = null;
        let bestScore = Infinity;
        
        for (const [letter, sounds] of this.letterSoundMap) {
            for (const sound of sounds) {
                const distance = this.levenshteinDistance(transcript, sound);
                if (distance < bestScore && distance <= 2) {
                    bestScore = distance;
                    bestMatch = letter;
                }
            }
        }
        
        return bestMatch;
    }

    findAccentMatch(transcript) {
        // Try different accent variations
        for (const [region, variations] of this.accentVariations) {
            for (const [letter, sounds] of Object.entries(variations)) {
                for (const sound of sounds) {
                    if (transcript.includes(sound) || sound.includes(transcript)) {
                        return letter.toUpperCase();
                    }
                }
            }
        }
        return null;
    }

    extractSingleCharacter(transcript) {
        // Extract single letters from spoken input
        const letters = transcript.match(/[a-zñáéíóúü]/gi);
        if (letters && letters.length === 1) {
            return letters[0].toUpperCase();
        }
        
        // Handle cases where user says the letter name
        const letterNames = {
            'a': 'A', 'be': 'B', 'ce': 'C', 'de': 'D', 'e': 'E',
            'efe': 'F', 'ge': 'G', 'hache': 'H', 'i': 'I', 'jota': 'J',
            'ka': 'K', 'ele': 'L', 'eme': 'M', 'ene': 'N', 'eñe': 'Ñ',
            'o': 'O', 'pe': 'P', 'cu': 'Q', 'ere': 'R', 'ese': 'S',
            'te': 'T', 'u': 'U', 'uve': 'V', 'equis': 'X', 'ye': 'Y', 'zeta': 'Z'
        };
        
        return letterNames[transcript] || null;
    }

    wordToLetter(word) {
        // Convert Spanish word to corresponding letter
        const wordToLetterMap = {
            'a': 'A', 'be': 'B', 'ce': 'C', 'de': 'D', 'e': 'E',
            'efe': 'F', 'ge': 'G', 'hache': 'H', 'i': 'I', 'jota': 'J',
            'ka': 'K', 'ele': 'L', 'eme': 'M', 'ene': 'N', 'eñe': 'Ñ',
            'o': 'O', 'pe': 'P', 'cu': 'Q', 'ere': 'R', 'ese': 'S',
            'te': 'T', 'u': 'U', 'uve': 'V', 'equis': 'X', 'ye': 'Y', 'zeta': 'Z'
        };
        
        return wordToLetterMap[word] || null;
    }

    levenshteinDistance(str1, str2) {
        const matrix = [];
        
        for (let i = 0; i <= str2.length; i++) {
            matrix[i] = [i];
        }
        
        for (let j = 0; j <= str1.length; j++) {
            matrix[0][j] = j;
        }
        
        for (let i = 1; i <= str2.length; i++) {
            for (let j = 1; j <= str1.length; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        
        return matrix[str2.length][str1.length];
    }

    // Get suggestion for interim results
    getSuggestion(transcript) {
        if (!transcript) return null;
        
        const normalized = transcript.toLowerCase().trim();
        const match = this.recognizeLetter(normalized);
        
        return match ? { letter: match, confidence: this.calculateConfidence(normalized, match) } : null;
    }

    calculateConfidence(transcript, letter) {
        const sounds = this.letterSoundMap.get(letter) || [];
        
        // Direct match = high confidence
        if (sounds.includes(transcript)) return 0.9;
        
        // Fuzzy match = medium confidence
        const minDistance = Math.min(...sounds.map(sound => 
            this.levenshteinDistance(transcript, sound)
        ));
        
        if (minDistance <= 1) return 0.7;
        if (minDistance <= 2) return 0.5;
        
        return 0.3;
    }
}

// Global instance
let phoneticEngine = null;

// Initialize phonetic engine
async function initializePhoneticEngine() {
    if (!phoneticEngine) {
        phoneticEngine = new PhoneticEngine();
        await phoneticEngine.initialize();
    }
    return phoneticEngine;
}

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PhoneticEngine, initializePhoneticEngine };
}
