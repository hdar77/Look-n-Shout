const output = document.getElementById("webspeech-input");
const start = document.getElementById("record-button");
const webspeechDropdown = document.getElementById("webspeech-maindiv");
const dropdownmenu = document.getElementById("dropdownmenu");
let tester = document.getElementById("testerclass");
let upkeyy = document.getElementById("upkey");
let downkey = document.getElementById("downkey");
let leftkey = document.getElementById("leftkey");
let rightkey = document.getElementById("rightkey");
let recordedWord = document.getElementById("recorded-word");

const speechRecognition =
  window.speechRecognition || window.webkitSpeechRecognition;
let recognition;
webspeechDropdown.style.display = "none";

function startRecognition() {
  i = 0;
  recognition = new speechRecognition();
  recognition.lang = "en";
  recognition.interimResults = true;
  recognition.continuous = true;

  recognition.start();
  console.log("STARTED");
  tester.textContent = "Stop Recording";
  start.style.background = "#FF0000";
  start.removeEventListener("click", startRecognition);
  start.addEventListener("click", stopRecognition);

  recognition.onresult = (e) => {
    recordedWord.textContent = "Your Word: " + e.results[0][0].transcript;
    transcript = e.results[0][0].transcript.toLowerCase();
    console.log(i);
    console.log(e);

    triggerkeypress(transcript);

    /*
    if (transcript.includes("jump")) {
      console.log("TEST A");
      i++;
      triggerkeypress("w", "jump");
    } else if (transcript.includes("left")) {
      console.log("TESTTTTTTTTT");
      i++;
      triggerkeypress("a", "left");
    } else if (transcript.includes("right")) {
      console.log("TESTTTTTTTTT");
      i++;
      triggerkeypress("d", "right");
    } else if (transcript.includes("down")) {
      console.log("TESTTTTTTTTT");
      i++;
      triggerkeypress("d", "down");
    }
    */
    startRecognition();
  };
}

document.addEventListener("click", function (event) {
  // Send coordinates to background script
  chrome.runtime.sendMessage({
    type: "click",
    x: event.clientX,
    y: event.clientY,
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "exampleMessage") {
    // Handle the message
    sendResponse({ response: "Received your message" });
    console.log(message);
  }
});

function stopRecognition() {
  recognition.stop();
  i = 0;
  console.log("STOPPED");
  start.style.background = "#8e44ad";
  tester.textContent = "Start Recording";
  start.removeEventListener("click", stopRecognition);
  start.addEventListener("click", startRecognition);
}

window.addEventListener("keydown", (event) => {
  console.log("works");
  console.log("TEST event: " + event.key);
});

let i = 0;

function triggerkeypress(command) {
  key = "d";
  const event = new KeyboardEvent("keydown", { key });
  window.dispatchEvent(event);
  if (dropdownmenu.value == "jump") {
    console.log("INSIDE");
    upkeyy.textContent = "Move up:" + " " + command;
  } else if (dropdownmenu.value == "down") {
    console.log("DOWN TEST");
    downkey.textContent = "Move down:" + " " + command;
  } else if (dropdownmenu.value == "left") {
    leftkey.textContent = "Move left:" + " " + command;
  } else if (dropdownmenu.value == "right") {
    rightkey.textContent = "Move right:" + " " + command;
  }
  //output.dispatchEvent(event);

  //console.log(event);
}

start.addEventListener("click", startRecognition);

let checkbox = document.getElementById("toggleSwitchWebSpeech");

function isCheckedd() {
  if (checkbox.checked) {
    webspeechDropdown.style.display = "block";
    upkeyy.textContent = "Move up:";
    downkey.textContent = "Move down:";
    leftkey.textContent = "Move left:";
    rightkey.textContent = "Move right:";
  } else {
    recordedWord.textContent = "Your Word: ";
    webspeechDropdown.style.display = "none";
    upkeyy.textContent = "Look up:";
    downkey.textContent = "Look down:";
    leftkey.textContent = "Look left:";
    rightkey.textContent = "Look right:";
  }
}

checkbox.addEventListener("change", isCheckedd);

let test = document.getElementById("upkeyy");
