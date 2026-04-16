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
        // Enhanced Spanish letters to phonetic representations with more variations
        this.letterSoundMap.set('A', ['a', 'ah', 'á', 'eh', 'ai']);
        this.letterSoundMap.set('B', ['be', 'bea', 'bei', 'bi', 'be larga', 'be corta']);
        this.letterSoundMap.set('C', ['ce', 'cea', 'cei', 'ci', 'seh', 'se', 'theh', 'the', 'si']);
        this.letterSoundMap.set('D', ['de', 'dea', 'dei', 'di', 'deh', 'dhe']);
        this.letterSoundMap.set('E', ['e', 'eh', 'é', 'ee', 'ei']);
        this.letterSoundMap.set('F', ['efe', 'efea', 'efei', 'efi', 'efeh', 'ef']);
        this.letterSoundMap.set('G', ['ge', 'gea', 'gei', 'gi', 'xe', 'je', 'jea', 'ghe']);
        this.letterSoundMap.set('H', ['hache', 'ache', 'a-che', 'ashe', 'h']);
        this.letterSoundMap.set('I', ['i', 'ih', 'í', 'ee', 'ei']);
        this.letterSoundMap.set('J', ['jota', 'hota', 'xota', 'shota', 'j', 'sho']);
        this.letterSoundMap.set('K', ['ka', 'kah', 'ca', 'qua', 'que']);
        this.letterSoundMap.set('L', ['ele', 'ela', 'eli', 'el', 'elle']);
        this.letterSoundMap.set('M', ['eme', 'ema', 'emi', 'em', 'emea']);
        this.letterSoundMap.set('N', ['ene', 'ena', 'eni', 'en', 'enea']);
        this.letterSoundMap.set('Ñ', ['eñe', 'enie', 'enye', 'enieh', 'ñe']);
        this.letterSoundMap.set('O', ['o', 'oh', 'ó', 'ou', 'oi']);
        this.letterSoundMap.set('P', ['pe', 'pea', 'pei', 'pi', 'peh', 'phea']);
        this.letterSoundMap.set('Q', ['cu', 'cuu', 'ku', 'qu', 'que', 'khu']);
        this.letterSoundMap.set('R', ['ere', 'era', 'eri', 'erre', 'ar', 'ari', 'r']);
        this.letterSoundMap.set('S', ['ese', 'esa', 'esi', 'es', 'eseh', 'ce', 'se']);
        this.letterSoundMap.set('T', ['te', 'tea', 'tei', 'ti', 'teh', 'the']);
        this.letterSoundMap.set('U', ['u', 'uh', 'ú', 'ou', 'uu']);
        this.letterSoundMap.set('V', ['uve', 'uva', 'vi', 've', 'vea', 'vei', 'bve', 'beh']);
        this.letterSoundMap.set('W', ['doble ve', 'doble uve', 'doble be', 'doble u', 'doblebe', 'dobleuve']);
        this.letterSoundMap.set('X', ['equis', 'ekis', 'xis', 'cs', 'xes', 'shis']);
        this.letterSoundMap.set('Y', ['ye', 'yea', 'yei', 'i griega', 'i', 'y', 'sh']);
        this.letterSoundMap.set('Z', ['zeta', 'zetaa', 'seta', 'theta', 'theh', 's', 'ceta']);
        
        // Add common variations and mispronunciations
        this.letterSoundMap.set('LL', ['elle', 'elleh', 'ye', 'sh', 'lli', 'zhi']);
        this.letterSoundMap.set('CH', ['che', 'cheh', 'tche', 'sh', 'tsh']);
    }

    buildAccentVariations() {
        // Enhanced regional accent variations
        this.accentVariations.set('mexico', {
            'a': ['ah', 'a', 'á'],
            'b': ['be', 'bei', 'bi'],
            'c': ['seh', 'se', 'ce', 'si'],
            'd': ['deh', 'de', 'di'],
            'e': ['eh', 'e', 'é'],
            'f': ['efe', 'efei', 'fi'],
            'g': ['heh', 'je', 'xi'],
            'h': ['ache', 'hache', 'a-che'],
            'i': ['i', 'í', 'ee'],
            'j': ['hota', 'jota', 'shota'],
            'k': ['ka', 'kah', 'que'],
            'l': ['ele', 'eli', 'el'],
            'm': ['eme', 'emi', 'em'],
            'n': ['ene', 'eni', 'en'],
            'ñ': ['enye', 'eñe', 'enie'],
            'o': ['oh', 'o', 'ó'],
            'p': ['peh', 'pe', 'pi'],
            'q': ['kuh', 'cu', 'qu'],
            'r': ['ere', 'erre', 'ari'],
            's': ['ese', 'seh', 'es', 'ce'],
            't': ['teh', 'te', 'ti'],
            'u': ['uh', 'u', 'ú'],
            'v': ['beh', 've', 'bve', 'uve'],
            'w': ['doble-be', 'doble-ve', 'doble-u'],
            'x': ['ekis', 'equis', 'xis'],
            'y': ['ye', 'i-griega', 'yei'],
            'z': ['seta', 's', 'theta', 'zeta']
        });
        
        this.accentVariations.set('spain', {
            'a': ['a', 'ah', 'á'],
            'b': ['be', 'be-larga', 'be-corta'],
            'c': ['ce', 'theh', 'the', 'ze'],
            'd': ['de', 'deh', 'dhe'],
            'e': ['e', 'eh', 'é'],
            'f': ['efe', 'ef', 'efe'],
            'g': ['ge', 'je', 'xe', 'ghe'],
            'h': ['hache', 'ache', 'a-che'],
            'i': ['i', 'ee', 'í'],
            'j': ['jota', 'hota', 'xota'],
            'k': ['ka', 'kah', 'ca'],
            'l': ['ele', 'el', 'eli'],
            'm': ['eme', 'em', 'emi'],
            'n': ['ene', 'en', 'eni'],
            'ñ': ['eñe', 'enye', 'enie'],
            'o': ['o', 'oh', 'ó'],
            'p': ['pe', 'peh', 'pi'],
            'q': ['cu', 'ku', 'qu'],
            'r': ['ere', 'erre', 'r'],
            's': ['ese', 'eseh', 'es'],
            't': ['te', 'teh', 'ti'],
            'u': ['u', 'uh', 'ú'],
            'v': ['uve', 've', 'bve'],
            'w': ['doble-ve', 'doble-u', 'u-ve'],
            'x': ['equis', 'ekis', 'cs'],
            'y': ['ye', 'i-griega', 'y'],
            'z': ['zeta', 'theta', 'th', 'ceta'],
            'll': ['lli', 'ye', 'shi', 'lli'],
            'ch': ['che', 'tche', 'cheh']
        });
        
        this.accentVariations.set('argentina', {
            'a': ['a', 'ah', 'á'],
            'b': ['be', 'bea', 'bia'],
            'c': ['se', 'ce', 'sa'],
            'd': ['de', 'dea', 'dia'],
            'e': ['e', 'eh', 'é'],
            'f': ['efe', 'efi', 'efe'],
            'g': ['ye', 'je', 'ge'],
            'h': ['ashe', 'ache', 'hache'],
            'i': ['i', 'í', 'ee'],
            'j': ['sho', 'jota', 'yota'],
            'k': ['ka', 'ca', 'qua'],
            'l': ['ele', 'ele', 'eli'],
            'm': ['eme', 'emi', 'eme'],
            'n': ['ene', 'eni', 'ene'],
            'ñ': ['enie', 'eñe', 'enie'],
            'o': ['o', 'oh', 'ó'],
            'p': ['pe', 'pea', 'pia'],
            'q': ['cu', 'ku', 'kú'],
            'r': ['erre', 'r', 'rr'],
            's': ['ese', 'eseh', 'es'],
            't': ['te', 'tea', 'tia'],
            'u': ['u', 'uh', 'ú'],
            'v': ['be', 've', 'bve'],
            'w': ['doble-be', 'doble-ve', 'doble-u'],
            'x': ['ekis', 'equis', 'shis'],
            'y': ['sh', 'ye', 'i-griega'],
            'z': ['se', 'seta', 's'],
            'll': ['sh', 'zh', 'y', 'j'],
            'ch': ['sh', 'tsh', 'ch']
        });
        
        this.accentVariations.set('caribbean', {
            'a': ['a', 'ah', 'á'],
            'b': ['be', 'bei'],
            'c': ['se', 'ce', 'su'],
            'd': ['de', 'dei', ''],
            'e': ['e', 'eh', 'é'],
            'f': ['efe', 'efi'],
            'g': ['je', 'ge', 'he'],
            'h': ['ache', 'a-che'],
            'i': ['i', 'í'],
            'j': ['hota', 'jota'],
            'k': ['ka', 'ca'],
            'l': ['ele', 'eli'],
            'm': ['eme', 'emi'],
            'n': ['ene', 'eni'],
            'ñ': ['enie', 'eñe'],
            'o': ['o', 'oh', 'ó'],
            'p': ['pe', 'pei'],
            'q': ['cu', 'ku'],
            'r': ['ere', 'ere', 'l', ''],
            's': ['ese', 'eseh', 'h', ''],
            't': ['te', 'tei'],
            'u': ['u', 'uh', 'ú'],
            'v': ['be', 've', 'bve'],
            'w': ['doble-be', 'doble-ve'],
            'x': ['ekis', 'equis'],
            'y': ['ye', 'yei'],
            'z': ['se', 'seta', 's']
        });
        
        this.accentVariations.set('central_america', {
            'a': ['a', 'ah', 'á'],
            'b': ['be', 'bei', 'bi'],
            'c': ['se', 'ce', 'si'],
            'd': ['de', 'deh', 'di'],
            'e': ['e', 'eh', 'é'],
            'f': ['efe', 'efi', 'fi'],
            'g': ['he', 'je', 'xe'],
            'h': ['hache', 'ache'],
            'i': ['i', 'í', 'ee'],
            'j': ['hota', 'jota'],
            'k': ['ka', 'ca', 'qua'],
            'l': ['ele', 'eli', 'el'],
            'm': ['eme', 'emi', 'em'],
            'n': ['ene', 'eni', 'en'],
            'ñ': ['enie', 'eñe', 'enye'],
            'o': ['o', 'oh', 'ó'],
            'p': ['pe', 'peh', 'pi'],
            'q': ['cu', 'ku', 'qu'],
            'r': ['ere', 'erre', 'ari'],
            's': ['ese', 'eseh', 'ce'],
            't': ['te', 'teh', 'ti'],
            'u': ['u', 'uh', 'ú'],
            'v': ['be', 've', 'bve'],
            'w': ['doble-be', 'doble-ve'],
            'x': ['ekis', 'equis', 'xis'],
            'y': ['ye', 'i-griega', 'yei'],
            'z': ['seta', 'se', 'theta']
        });
    }

    // Main recognition function
    recognizeLetter(transcript) {
        if (!transcript) return null;
        
        const normalized = transcript.toLowerCase().trim();
        
        // 1. Quick single character check (most common case)
        if (normalized.length === 1 && /[a-zñáéíóúü]/i.test(normalized)) {
            const result = normalized.toUpperCase();
            console.log(`Quick single char: ${normalized} -> ${result}`);
            return result;
        }
        
        // 2. Direct match with confidence (fastest lookup)
        const directResult = this.findDirectMatch(normalized);
        if (directResult) {
            const confidence = this.calculateConfidence(normalized, directResult);
            console.log(`Direct match: ${normalized} -> ${directResult} (confidence: ${confidence})`);
            if (confidence >= 0.7) return directResult;
        }
        
        // 3. Accent-aware matching with confidence (regional variations)
        const accentResult = this.findAccentMatch(normalized);
        if (accentResult) {
            const confidence = this.calculateConfidence(normalized, accentResult);
            console.log(`Accent match: ${normalized} -> ${accentResult} (confidence: ${confidence})`);
            if (confidence >= 0.6) return accentResult;
        }
        
        // 4. Fuzzy matching with confidence (slowest, use last)
        const fuzzyResult = this.findFuzzyMatch(normalized);
        if (fuzzyResult) {
            const confidence = this.calculateConfidence(normalized, fuzzyResult);
            console.log(`Fuzzy match: ${normalized} -> ${fuzzyResult} (confidence: ${confidence})`);
            if (confidence >= 0.5) return fuzzyResult;
        }
        
        console.log(`No match found for: "${normalized}"`);
        return null;
    }
    
    // Enhanced confidence calculation
    calculateConfidence(transcript, letter) {
        const sounds = this.letterSoundMap.get(letter) || [];
        
        // Direct match = highest confidence
        if (sounds.includes(transcript)) return 0.95;
        
        // Check for partial matches
        for (const sound of sounds) {
            if (sound.includes(transcript) || transcript.includes(sound)) {
                const similarity = Math.min(transcript.length, sound.length) / Math.max(transcript.length, sound.length);
                return 0.7 + (similarity * 0.2);
            }
        }
        
        // Fuzzy match confidence based on distance
        const minDistance = Math.min(...sounds.map(sound => 
            this.levenshteinDistance(transcript, sound)
        ));
        
        if (minDistance === 0) return 0.95;
        if (minDistance === 1) return 0.8;
        if (minDistance === 2) return 0.6;
        if (minDistance === 3) return 0.4;
        
        return 0.3;
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
        // Enhanced fuzzy matching with multiple algorithms
        let bestMatch = null;
        let bestScore = Infinity;
        
        for (const [letter, sounds] of this.letterSoundMap) {
            for (const sound of sounds) {
                // 1. Levenshtein distance
                const levenshteinDist = this.levenshteinDistance(transcript, sound);
                if (levenshteinDist < bestScore && levenshteinDist <= 2) {
                    bestScore = levenshteinDist;
                    bestMatch = letter;
                }
                
                // 2. Soundex-like phonetic similarity
                const soundexDist = this.soundexDistance(transcript, sound);
                if (soundexDist < bestScore && soundexDist <= 1) {
                    bestScore = soundexDist;
                    bestMatch = letter;
                }
                
                // 3. Contains matching (for partial matches)
                if (sound.includes(transcript) || transcript.includes(sound)) {
                    const containsScore = Math.abs(sound.length - transcript.length);
                    if (containsScore < bestScore && containsScore <= 3) {
                        bestScore = containsScore;
                        bestMatch = letter;
                    }
                }
            }
        }
        
        return bestMatch;
    }
    
    // Soundex-like phonetic distance calculation
    soundexDistance(str1, str2) {
        const soundex1 = this.simpleSoundex(str1);
        const soundex2 = this.simpleSoundex(str2);
        
        if (soundex1 === soundex2) return 0;
        if (soundex1[0] === soundex2[0]) return 1;
        return 2;
    }
    
    // Simple Soundex implementation for Spanish
    simpleSoundex(str) {
        if (!str) return '';
        
        // Spanish consonant mapping for similar sounds
        const consonants = {
            'b': '1', 'v': '1',  // B/V often sound similar
            'c': '2', 's': '2', 'z': '2', 'x': '2',  // S/C/Z/X sounds
            'd': '3', 't': '3',  // D/T sounds
            'f': '4', 'j': '4', 'h': '4',  // F/J/H sounds
            'g': '5', 'k': '5', 'q': '5',  // G/K/Q sounds
            'l': '6', 'll': '6',  // L/LL sounds
            'm': '7', 'n': '7', 'ñ': '7',  // M/N/Ñ sounds
            'p': '8', 'r': '8', 'rr': '8',  // P/R/RR sounds
            'y': '9', 'i': '9', 'll': '9'  // Y/I/LL sounds
        };
        
        // Remove vowels and accents, keep first character
        const first = str[0].toLowerCase();
        let result = first;
        
        for (let i = 1; i < str.length; i++) {
            const char = str[i].toLowerCase();
            if (consonants[char]) {
                result += consonants[char];
            }
        }
        
        // Remove consecutive duplicates
        result = result.replace(/(.)\1+/g, '$1');
        
        // Return first 4 characters or pad with zeros
        return result.substring(0, 4).padEnd(4, '0');
    }

    findAccentMatch(transcript) {
        // Enhanced accent matching with better scoring
        let bestMatch = null;
        let bestScore = Infinity;
        
        for (const [region, variations] of this.accentVariations) {
            for (const [letter, sounds] of Object.entries(variations)) {
                for (const sound of sounds) {
                    // Exact match
                    if (transcript === sound) {
                        return letter.toUpperCase();
                    }
                    
                    // Contains match with scoring
                    if (transcript.includes(sound) || sound.includes(transcript)) {
                        const score = Math.abs(transcript.length - sound.length);
                        if (score < bestScore) {
                            bestScore = score;
                            bestMatch = letter.toUpperCase();
                        }
                    }
                    
                    // Fuzzy match within accent variations
                    const fuzzyScore = this.levenshteinDistance(transcript, sound);
                    if (fuzzyScore <= 1 && fuzzyScore < bestScore) {
                        bestScore = fuzzyScore;
                        bestMatch = letter.toUpperCase();
                    }
                }
            }
        }
        
        return bestMatch;
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
