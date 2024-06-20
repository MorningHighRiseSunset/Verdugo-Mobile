* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

body {
  background-image: url('https://64.media.tumblr.com/7288fb9c5a568fc033a233b1b5862886/27bd7103dd700c5a-de/s500x750/8e8261cf6e76222c6ca0ab275a5dcae5e2fbd7cb.gifv');
  background-size: cover; /* Cover the entire screen */
  background-position: center; /* Center the background image */
  background-repeat: no-repeat; /* Do not repeat the image */
  height: 100vh; /* Full height of the viewport */
  margin: 0; /* Remove default margin */
}

.container {
  font-size: 16px;
  background-color: rgba(255, 255, 255, 0.5); /* 50% opacity */
  width: 90vw;
  max-width: 34em;
  height: 80vh; /* Fixed height */
  overflow-y: auto; /* Enable vertical scrolling */
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%; /* Centered vertically */
  left: 50%; /* Centered horizontally */
  padding: 3em;
  border-radius: 0.6em;
  box-shadow: 0 1.2em 2.4em rgba(111, 85, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px; /* Added gap between child elements */
  
  /* Styles to hide scrollbar but allow scrolling */
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */
}

.container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

#options-container {
  text-align: center;
  width: 100%;
}

#options-container div {
  display: flex;
  justify-content: space-between;
  margin: 1.2em 0;
}

#options-container button {
  padding: 0.6em 1.2em;
  border: 3px solid #000000;
  background-color: #ffffff;
  color: #000000;
  border-radius: 0.3em;
  text-transform: capitalize;
  cursor: pointer;
}

#options-container button:disabled {
  border: 3px solid #808080;
  color: #808080;
  background-color: #efefef;
}

#options-container button.active {
  background-color: rgba(255, 255, 255, 0.5);
  border: 3px solid #000000;
  color: #fff;
}

.letter-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.6em;
}

#letter-container button {
  height: 2.4em;
  width: 2.4em;
  border-radius: 0.3em;
  background-color: #ffffff;
  cursor: pointer;
  border: 1px solid black;
}

.new-game-popup {
  background-color: #ffffff;
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 0.6em;
}

#user-input-section {
  display: flex;
  justify-content: center;
  font-size: 1.8em;
  width: 100%;
}

.hide {
  display: none;
}

#result-text h2 {
  font-size: 1.8em;
  text-align: center;
}

#result-text p {
  font-size: 1.25em;
  margin: 1em 0;
}

#result-text span {
  font-weight: 600;
}

#new-game-button {
  font-size: 1.25em;
  padding: 0.5em 1em;
  background-color: #66636d;
  border: 3px solid #000000;
  color: #fff;
  border-radius: 0.2em;
  cursor: pointer;
}

.win-msg {
  color: #39d78d;
}

.lose-msg {
  color: #fe5152;
}

#changeBackground {
  position: fixed;
  right: 10px;
  bottom: 90px;
  padding: 5px 20px;
  font-size: 16px;
  cursor: pointer;
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.8);
}

.visually-hidden {
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

#instructionsPopup {
  position: fixed;
  left: 10px;
  bottom: 60px;
  width: 600px;
  padding: 20px;
  box-shadow: 0 0 15px rgba(0,0,0,0.2);
  background-color: white;
  border-radius: 8px;
  display: none;
}

#toggle:checked + #instructionsButton + #instructionsPopup {
  display: block;
}

#instructionsButton, #closeInstructions {
  cursor: pointer;
  display: inline-block;
  margin: 10px;
  padding: 5px 80px;
  background-color: rgba(240, 240, 240);
  border: 1px solid #ccc;
  border-radius: 5px;
}

#instructionsButton {
  position: fixed;
  left: 10px;
  bottom: 10px;
  z-index: 1000; /* Ensures it is above other elements */
}

.correct-words-container {
  padding: 10px;
  position: relative;
  width: 100%;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  min-height: 200px;
  max-height: 550px;
  overflow-y: auto; /* Enable vertical scrolling */
  margin-top: 20px; /* Reduced margin for less spacing */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Added shadow */
  
  /* Styles to hide scrollbar but allow scrolling */
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */
}

.correct-words-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.correct-words-container::before {
  content: "definiciones(Definitions)";
  display: block;
  font-size: 1.0em; /* Adjust font size as needed */
  text-align: center;
  padding: 10px;
  width: 100%;
  color: #333; /* Text color */
}

#streak, #showHighestScore {
  position: relative; /* Changed to relative for stacking */
  width: 100%; /* Full width to center align */
  background-color: #f9f9f9;
  border: 2px solid #ccc;
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.3);
  margin-top: 20px; /* Added margin for spacing */
}

button {
  background-color: #ffffff;
  border: none;
  color: black;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 2px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #e0e0e0;
}
