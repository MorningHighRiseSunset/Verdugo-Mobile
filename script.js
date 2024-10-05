// Import options from vocab.js
import { options } from './vocab.js';

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
      hyphenButton.innerText = 'Please Click'; // Change button text
      hyphenButton.classList.add('letter-button', 'hyphen-button', 'flashing-slow'); // Add flashing class
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

  const phoneticReplacements = {
    "CARLINGAS": "car-ling-gas",
    "tocopherol": "to-co-fer-ol"
    // Add more words and their phonetic equivalents as needed
  };

  function speakText(text, lang) {
    // Replace problematic words with their phonetic equivalents
    const modifiedText = text.replace(/\b\w+\b/g, word => phoneticReplacements[word.toUpperCase()] || word);

    const utterance = new SpeechSynthesisUtterance(modifiedText);
    utterance.lang = lang; // Set the language for the utterance
    utterance.onerror = function(event) {
      console.error('Speech synthesis error', event);
      alert(`Speech synthesis error: ${event.error}`); // Display the error to the user
    };
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

  let usedWords = new Set(); // Track used words

  function displayOptions() {
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = ''; // Clear previous options
    for (const mode in options) {
      const button = document.createElement('button');
      button.innerText = mode;
      button.classList.add('option-button');
      button.onclick = () => {
        // Filter out used words
        const availableWords = options[mode].filter(wordObj => !usedWords.has(wordObj.word));
        if (availableWords.length === 0) {
          alert('No more words available in this category.');
          return; // Exit if no words are available
        }
        const wordObj = availableWords[Math.floor(Math.random() * availableWords.length)];
        while (wordObj.word === selectedWord) {
          // Ensure no back-to-back or repeating words
          wordObj = availableWords[Math.floor(Math.random() * availableWords.length)];
        }
        selectedWord = wordObj.word.toUpperCase();
        usedWords.add(selectedWord); // Mark the word as used
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
    console.error('Speech recognition error', event);
    alert(`Speech recognition error: ${event.error}`); // Display the error to the user
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
