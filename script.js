window.addEventListener("DOMContentLoaded", () => {
  renderNewQuote();
});
const wordBank = [
  "code", "keyboard", "speed", "practice", "javascript", "html", "css", "web",
  "developer", "react", "typing", "game", "design", "focus", "logic", "accuracy",
  "test", "challenge", "learn", "project", "random", "browser", "user", "content",
  "line", "debug", "style", "function", "input", "output", "variable", "array",
  "object", "syntax", "performance", "interface", "button", "scroll", "event",
  "listener", "script", "query", "select", "option", "dark", "theme", "light",
  "mobile", "desktop", "responsive", "clone", "component", "route", "file",
  "server", "client", "fetch", "display", "hover", "click", "toggle", "access",
  "layout", "padding", "margin", "shadow", "border", "color", "background",
  "blur", "text", "align", "font", "bold", "underline", "transition", "animation",
  "container", "grid", "flex", "position", "relative", "absolute", "fixed",
  "element", "attribute", "class", "id", "loop", "condition", "terminal", "upload",
  "download", "search", "filter", "sort", "value", "length", "width", "height"
];

function generateRandomText(wordCount) {
  if (wordCount > wordBank.length) wordCount = wordBank.length;

  const shuffled = [...wordBank].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, wordCount);
  return selected.join(" ");
}

function renderNewQuote() {
  const wordCount = parseInt(document.getElementById("words").value);
  const quote = generateRandomText(wordCount);
  quoteDisplay.innerHTML = "";

  quote.split("").forEach(char => {
    const span = document.createElement("span");
    span.innerText = char;
    span.classList.add("neutral");
    quoteDisplay.appendChild(span);
  });

  quoteInput.value = "";
  quoteInput.focus();
}




document.getElementById("words").addEventListener("change", () => {
  renderNewQuote();
});

  quoteInput.addEventListener("input", () => {
  const quoteSpans = quoteDisplay.querySelectorAll("span");
  const inputValue = quoteInput.value.split("");

  quoteSpans.forEach((charSpan, index) => {
    const typedChar = inputValue[index];

    if (typedChar == null) {
      charSpan.classList.remove("correct", "incorrect");
      charSpan.classList.add("neutral"); // not typed yet
    } else if (typedChar === charSpan.innerText) {
      charSpan.classList.add("correct");
      charSpan.classList.remove("incorrect", "neutral");
    } else {
      charSpan.classList.add("incorrect");
      charSpan.classList.remove("correct", "neutral");
    }
  });
});

let startTime;
let timerInterval;
let totalTyped = 0;
let correctTyped = 0;

quoteInput.addEventListener("keydown", (e) => {
  if (!startTime) {
    startTime = new Date();
    timerInterval = setInterval(updateTimer, 1000);
  }
});


let mistakeCount = 0;

quoteInput.addEventListener("input", () => {
  const quoteSpans = quoteDisplay.querySelectorAll("span");
  const inputValue = quoteInput.value.split("");

  totalTyped = inputValue.length;
  correctTyped = 0;
  mistakeCount = 0; // Reset at each input, we'll recount based on data

  quoteSpans.forEach((charSpan, index) => {
    const typedChar = inputValue[index];

    if (typedChar == null) {
      charSpan.classList.remove("correct", "incorrect");
      charSpan.removeAttribute("data-mistake");
      charSpan.classList.add("neutral");
    } else if (typedChar === charSpan.innerText) {
      charSpan.classList.add("correct");
      charSpan.classList.remove("incorrect", "neutral");
      correctTyped++;
    } else {
      charSpan.classList.add("incorrect");
      charSpan.classList.remove("correct", "neutral");
      // ✅ Set mistake attribute once
      if (!charSpan.dataset.mistake) {
        charSpan.dataset.mistake = "true";
      }
    }

    // ✅ Count total mistakes
    if (charSpan.dataset.mistake === "true") {
      mistakeCount++;
    }
  });

  updateWPMandAccuracy();

  // Finish check
  if (
    inputValue.length === quoteSpans.length
   
  ) {
    clearInterval(timerInterval);
  }
});





function updateTimer() {
  const elapsed = Math.floor((new Date() - startTime) / 1000);
  document.getElementById("timer").innerText = elapsed;
  updateWPMandAccuracy();
}

function updateWPMandAccuracy() {
  const timeElapsed = Math.floor((Date.now() - startTime) / 1000) || 1;
  const wpm = Math.round((correctTyped / 5) / (timeElapsed / 60));
  const accuracy = Math.max(0, Math.round(((correctTyped - mistakeCount) / totalTyped) * 100));

  document.getElementById("wpm").innerText = isNaN(wpm) ? 0 : wpm;
  document.getElementById("accuracy").innerText = isNaN(accuracy) ? 0 : accuracy;
}

document.getElementById("restart-btn").addEventListener("click", () => {
  clearInterval(timerInterval);
  startTime = null;
  totalTyped = 0;
  correctTyped = 0;
  document.getElementById("timer").innerText = "0";
  document.getElementById("wpm").innerText = "0";
  document.getElementById("accuracy").innerText = "0";
  renderNewQuote();
});

 const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;

toggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark'); // light ↔ dark

  // icon change
  if (body.classList.contains('dark')) {
    toggleBtn.textContent = '🌙';
  } else {
    toggleBtn.textContent = '🌞';
  }
});
 
