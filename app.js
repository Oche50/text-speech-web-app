// initialize speech API
let synth = window.speechSynthesis;
// DOM Elements
let form = document.querySelector("form");
let textInput = document.querySelector("#text-input");
let voiceSelect = document.querySelector("#voice-select");
let rate = document.querySelector("#rate");
let rateValue = document.querySelector("#rate-value");
let pitch = document.querySelector("#pitch");
let pitchValue = document.querySelector("#pitch-value");
let body = document.querySelector("body");
// initialize voices array
let voices = [];

function getVoices() {
  voices = synth.getVoices();
  // loop through voices and create option for each one

  voices.map(function (voice) {
    // create option Element
    let option = document.createElement("option");
    // fill option with voice and language
    option.textContent = voice.name + "(" + voice.lang + ")";
    // set needed option attributes
    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    voiceSelect.appendChild(option);
  });
}
getVoices();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

// speak
let speak = () => {
  // check if speaking
  if (synth.speaking) {
    console.error("already speaking....");
    return;
  }
  if (textInput.value !== "") {
    // Add background animation
    body.style.background = "#141414 url(images/wave.gif)";
    body.style.backgroundRepeat = "repeat-x";
    body.style.backgroundSize = "100% 100%";
    // Get speak text
    let speakText = new SpeechSynthesisUtterance(textInput.value);
    // Speak end
    speakText.onend = (e) => {
      console.log("done speaking..");
      body.style.background='#141414'
    };
    // speak error
    speakText.onerror = (e) => {
      console.log("something went wrong");
    };
    // selected voice
    let selectVoice = voiceSelect.selectedOptions[0].getAttribute("data-name");
    // Loop through voices
    voices.map(function (voice) {
      if (voice.name == selectVoice) {
        speakText.voice = voice;
      }
    });
    // set pitch and rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;
    // speak
    synth.speak(speakText);
  }
};
// eventListeners
// text form submit
form.addEventListener("submit", function (e) {
  e.preventDefault();
  speak();
});
// rate value change
rate.addEventListener("change", function (e) {
  rateValue.textContent = rate.value;
});
// pitch value change
pitch.addEventListener("change", function (e) {
  pitchValue.textContent = pitch.value;
});
// Voice select change
voiceSelect.addEventListener("change", function (e) {
  speak();
});
