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
            'b': '/be/', 'be': '/be/', 'bee': '/be/', 'bay': '/be/',
            'c': '/ce/', 'ce': '/ce/', 'see': '/ce/', 'say': '/ce/', 'ka': '/ka/', 'ca': '/ka/',
            'd': '/de/', 'de': '/de/', 'dee': '/de/', 'day': '/de/',
            'e': '/e/',
            'f': '/efe/', 'efe': '/efe/', 'ef': '/efe/', 'effe': '/efe/',
            'g': '/xe/', 'ge': '/xe/', 'je': '/xe/', 'heh': '/xe/', 'kh': '/xe/',
            'h': '/açe/', 'hache': '/açe/', 'hah': '/açe/', 'ache': '/açe/',
            'i': '/i/',
            'j': '/xota/', 'jota': '/xota/', 'hota': '/xota/', 'kh': '/xota/',
            'k': '/ka/', 'ka': '/ka/', 'kah': '/ka/', 'cay': '/ka/',
            'l': '/ele/', 'ele': '/ele/', 'el': '/ele/', 'ell': '/ele/',
            'm': '/eme/', 'eme': '/eme/', 'em': '/eme/', 'emme': '/eme/',
            'n': '/ene/', 'ene': '/ene/', 'en': '/ene/', 'enne': '/ene/',
            'ñ': '/eñe/', 'eñe': '/eñe/', 'enye': '/eñe/', 'ny': '/eñe/',
            'o': '/o/',
            'p': '/pe/', 'pe': '/pe/', 'peh': '/pe/', 'pay': '/pe/',
            'q': '/ku/', 'cu': '/ku/', 'kuh': '/ku/', 'koo': '/ku/',
            'r': '/ere/', 'ere': '/ere/', 'er': '/ere/', 'air': '/ere/',
            's': '/ese/', 'ese': '/ese/', 'es': '/ese/', 'ess': '/ese/',
            't': '/te/', 'te': '/te/', 'teh': '/te/', 'tay': '/te/',
            'u': '/u/',
            'v': '/ube/', 'uve': '/ube/', 've': '/ube/', 'veh': '/ube/', 'b': '/be/',
            'w': '/doble be/', 'doble ve': '/doble be/', 'double': '/doble be/',
            'x': '/ekis/', 'equis': '/ekis/', 'eks': '/ekis/', 'ecks': '/ekis/',
            'y': '/i griega/', 'ye': '/i griega/', 'yeh': '/i/', 'ee': '/i/',
            'z': '/zeta/', 'zeta': '/zeta/', 'zeh': '/zeta/', 'seta': '/seta/', 's': '/ese/'
        };

        Object.entries(fallbackIPA).forEach(([word, ipa]) => {
            this.spanishIPAData.set(word, ipa);
        });
    }

    buildLetterSoundMap() {
        // Enhanced Spanish letters to phonetic representations with more variations
        this.letterSoundMap.set('A', ['a', 'ah', 'á', 'eh', 'ai', 'ha', 'la', 'ma', 'na', 'pa', 'sa', 'ta', 'va']);
        this.letterSoundMap.set('B', ['be', 'bea', 'bei', 'bi', 'be larga', 'be corta', 'b', 'bee', 'bay', 'beh']);
        this.letterSoundMap.set('C', ['ce', 'cea', 'cei', 'ci', 'seh', 'se', 'theh', 'the', 'si', 'c', 'see', 'say', 'seh', 'k', 'ka', 'ki']);
        this.letterSoundMap.set('D', ['de', 'dea', 'dei', 'di', 'deh', 'dhe', 'd', 'dee', 'day', 'deh']);
        this.letterSoundMap.set('E', ['e', 'eh', 'é', 'ee', 'ei', 'he', 'le', 'me', 'ne', 'pe', 'se', 'te', 've']);
        this.letterSoundMap.set('F', ['efe', 'efea', 'efei', 'efi', 'efeh', 'ef', 'f', 'ef', 'effe', 'fay']);
        this.letterSoundMap.set('G', ['ge', 'gea', 'gei', 'gi', 'xe', 'je', 'jea', 'ghe', 'g', 'heh', 'hay', 'j', 'kh']);
        this.letterSoundMap.set('H', ['hache', 'ache', 'a-che', 'ashe', 'h', 'hah', 'ache', 'atch']);
        this.letterSoundMap.set('I', ['i', 'ih', 'í', 'ee', 'ei', 'hi', 'li', 'mi', 'ni', 'pi', 'si', 'ti', 'vi']);
        this.letterSoundMap.set('J', ['jota', 'hota', 'xota', 'shota', 'j', 'sho', 'h', 'kh', 'ho', 'hota']);
        this.letterSoundMap.set('K', ['ka', 'kah', 'ca', 'qua', 'que', 'k', 'kah', 'cay', 'kuh']);
        this.letterSoundMap.set('L', ['ele', 'ela', 'eli', 'el', 'elle', 'l', 'el', 'ell', 'lah']);
        this.letterSoundMap.set('M', ['eme', 'ema', 'emi', 'em', 'emea', 'm', 'em', 'emme', 'mah']);
        this.letterSoundMap.set('N', ['ene', 'ena', 'eni', 'en', 'enea', 'n', 'en', 'enne', 'nah']);
        this.letterSoundMap.set('Ñ', ['eñe', 'enie', 'enye', 'enieh', 'ñe', 'ny', 'enye', 'niah', 'gn']);
        this.letterSoundMap.set('O', ['o', 'oh', 'ó', 'ou', 'oi', 'ho', 'lo', 'mo', 'no', 'po', 'so', 'to', 'vo']);
        this.letterSoundMap.set('P', ['pe', 'pea', 'pei', 'pi', 'peh', 'phea', 'p', 'peh', 'pay', 'pee']);
        this.letterSoundMap.set('Q', ['cu', 'cuu', 'ku', 'qu', 'que', 'khu', 'k', 'kuh', 'koo', 'cue']);
        this.letterSoundMap.set('R', ['ere', 'era', 'eri', 'erre', 'ar', 'ari', 'r', 'er', 'air', 'are', 'arr']);
        this.letterSoundMap.set('S', ['ese', 'esa', 'esi', 'es', 'eseh', 'ce', 'se', 's', 'es', 'ess', 'say']);
        this.letterSoundMap.set('T', ['te', 'tea', 'tei', 'ti', 'teh', 'the', 't', 'teh', 'tay', 'tee']);
        this.letterSoundMap.set('U', ['u', 'uh', 'ú', 'ou', 'uu', 'hu', 'lu', 'mu', 'nu', 'pu', 'su', 'tu', 'vu']);
        this.letterSoundMap.set('V', ['uve', 'uva', 'vi', 've', 'vea', 'vei', 'bve', 'beh', 'v', 'veh', 'vay', 'vee', 'b']);
        this.letterSoundMap.set('W', ['doble ve', 'doble uve', 'doble be', 'doble u', 'doblebe', 'dobleuve', 'w', 'doble', 'double', 'doo', 'blay']);
        this.letterSoundMap.set('X', ['equis', 'ekis', 'xis', 'cs', 'xes', 'shis', 'x', 'ekis', 'ecks', 'ex']);
        this.letterSoundMap.set('Y', ['ye', 'yea', 'yei', 'i griega', 'i', 'y', 'sh', 'yeh', 'yay', 'ee', 'j']);
        this.letterSoundMap.set('Z', ['zeta', 'zetaa', 'seta', 'theta', 'theh', 's', 'ceta', 'z', 'zeh', 'zay', 'zee', 'th', 's']);
        
        // Add common variations and mispronunciations
        this.letterSoundMap.set('LL', ['elle', 'elleh', 'ye', 'sh', 'lli', 'zhi', 'ly', 'y', 'jah']);
        this.letterSoundMap.set('CH', ['che', 'cheh', 'tche', 'sh', 'tsh', 'ch', 'cheh', 'chay']);
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

    // Preprocess transcript to remove noise and filler words
    preprocessTranscript(transcript) {
        if (!transcript) return '';
        
        let cleaned = transcript.toLowerCase().trim();
        
        // Remove common filler words (Spanish and English)
        const fillerWords = [
            // Spanish fillers
            'eh', 'um', 'ah', 'oh', 'este', 'o sea', 'es decir', 'bueno', 'pues',
            'entonces', 'vale', 'ok', 'okay', 'sí', 'no', 'claro', 'exacto',
            'la letra', 'el letra', 'una letra', 'un letra', 'letra',
            'es', 'son', 'una', 'un', 'el', 'la', 'los', 'las', 'de', 'en', 'por', 'para',
            // English fillers
            'uh', 'um', 'like', 'you know', 'I mean', 'so', 'well', 'actually',
            'the letter', 'a letter', 'letter', 'is', 'are', 'a', 'an', 'the', 'of', 'in', 'by', 'for'
        ];
        
        // Remove filler words
        fillerWords.forEach(filler => {
            const regex = new RegExp(`\\b${filler}\\b`, 'gi');
            cleaned = cleaned.replace(regex, ' ');
        });
        
        // Remove extra spaces and trim
        cleaned = cleaned.replace(/\s+/g, ' ').trim();
        
        // Remove common noise patterns
        cleaned = cleaned.replace(/[^\w\sáéíóúñü]/g, '');
        
        return cleaned;
    }

    // Main recognition function with context awareness
    recognizeLetter(transcript, context = {}) {
        if (!transcript) return null;
        
        // Preprocess to remove noise and fillers
        const cleaned = this.preprocessTranscript(transcript);
        console.log(`Preprocessed: "${transcript}" -> "${cleaned}"`);
        
        const normalized = cleaned;
        const availableLetters = context.availableLetters || [];
        const guessedLetters = context.guessedLetters || [];
        
        // 1. Quick single character check (most common case)
        if (normalized.length === 1 && /[a-zñáéíóúü]/i.test(normalized)) {
            const result = normalized.toUpperCase();
            console.log(`Quick single char: ${normalized} -> ${result}`);
            return result;
        }
        
        // Collect all potential matches with their confidence scores
        const candidates = [];
        
        // 2. Direct match with confidence (fastest lookup)
        const directResult = this.findDirectMatch(normalized);
        if (directResult) {
            const confidence = this.calculateConfidence(normalized, directResult);
            console.log(`Direct match: ${normalized} -> ${directResult} (confidence: ${confidence})`);
            candidates.push({ letter: directResult, confidence, method: 'direct' });
        }
        
        // 3. Accent-aware matching with confidence (regional variations)
        const accentResult = this.findAccentMatch(normalized);
        if (accentResult) {
            const confidence = this.calculateConfidence(normalized, accentResult);
            console.log(`Accent match: ${normalized} -> ${accentResult} (confidence: ${confidence})`);
            candidates.push({ letter: accentResult, confidence, method: 'accent' });
        }
        
        // 4. Fuzzy matching with confidence (slowest, use last)
        const fuzzyResult = this.findFuzzyMatch(normalized);
        if (fuzzyResult) {
            const confidence = this.calculateConfidence(normalized, fuzzyResult);
            console.log(`Fuzzy match: ${normalized} -> ${fuzzyResult} (confidence: ${confidence})`);
            candidates.push({ letter: fuzzyResult, confidence, method: 'fuzzy' });
        }
        
        if (candidates.length === 0) {
            console.log(`No match found for: "${normalized}"`);
            return null;
        }
        
        // Apply context-aware scoring
        const scoredCandidates = candidates.map(candidate => {
            let adjustedConfidence = candidate.confidence;
            
            // Boost confidence if letter is available in game
            if (availableLetters.length > 0) {
                const isAvailable = availableLetters.includes(candidate.letter);
                if (isAvailable) {
                    adjustedConfidence += 0.15; // Boost available letters
                } else {
                    adjustedConfidence -= 0.2; // Penalize unavailable letters
                }
            }
            
            // Penalize already guessed letters
            if (guessedLetters.length > 0) {
                const isGuessed = guessedLetters.some(g => g.toUpperCase() === candidate.letter);
                if (isGuessed) {
                    adjustedConfidence -= 0.3; // Heavy penalty for already guessed
                }
            }
            
            return { ...candidate, adjustedConfidence };
        });
        
        // Sort by adjusted confidence
        scoredCandidates.sort((a, b) => b.adjustedConfidence - a.adjustedConfidence);
        
        const bestCandidate = scoredCandidates[0];
        console.log(`Best candidate: ${bestCandidate.letter} (adjusted confidence: ${bestCandidate.adjustedConfidence.toFixed(2)}, method: ${bestCandidate.method})`);
        
        // Return best candidate if it meets minimum threshold
        if (bestCandidate.adjustedConfidence >= 0.4) {
            return bestCandidate.letter;
        }
        
        console.log(`No candidate met threshold after context adjustment`);
        return null;
    }
    
    // Enhanced confidence calculation with adaptive thresholds
    calculateConfidence(transcript, letter) {
        const sounds = this.letterSoundMap.get(letter) || [];
        
        // Direct match = highest confidence
        if (sounds.includes(transcript)) return 0.98;
        
        // Check for partial matches with better scoring
        let bestPartialScore = 0;
        for (const sound of sounds) {
            if (sound.includes(transcript) || transcript.includes(sound)) {
                const similarity = Math.min(transcript.length, sound.length) / Math.max(transcript.length, sound.length);
                const score = 0.75 + (similarity * 0.23);
                bestPartialScore = Math.max(bestPartialScore, score);
            }
        }
        if (bestPartialScore > 0) return bestPartialScore;
        
        // Fuzzy match confidence based on distance with adaptive scoring
        const minDistance = Math.min(...sounds.map(sound => 
            this.levenshteinDistance(transcript, sound)
        ));
        
        // Adaptive scoring based on transcript length
        const lengthFactor = Math.min(1, transcript.length / 3);
        
        if (minDistance === 0) return 0.98;
        if (minDistance === 1) return 0.85 + (lengthFactor * 0.05);
        if (minDistance === 2) return 0.65 + (lengthFactor * 0.1);
        if (minDistance === 3) return 0.45 + (lengthFactor * 0.1);
        
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
