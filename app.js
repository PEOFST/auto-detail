const CALENDLY_URL = "https://calendly.com/dealershipsk/new-meeting";

const bubble = document.getElementById("chatBubble");
const button = document.getElementById("bubbleButton");
const panel = document.getElementById("bubblePanel");
const closeBtn = document.getElementById("panelClose");
const frame = document.getElementById("calendlyFrame");
const loading = document.getElementById("loadingState");

let hasLoaded = false;

function openPanel() {
  bubble.classList.add("open");
  bubble.setAttribute("aria-expanded", "true");

  if (!hasLoaded) {
    frame.src = CALENDLY_URL;
    hasLoaded = true;
  }
}

function closePanel() {
  bubble.classList.remove("open");
  bubble.setAttribute("aria-expanded", "false");
}

button.addEventListener("click", () => {
  if (bubble.classList.contains("open")) {
    closePanel();
  } else {
    openPanel();
  }
});

closeBtn.addEventListener("click", closePanel);

frame.addEventListener("load", () => {
  loading.style.display = "none";
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closePanel();
  }
});
