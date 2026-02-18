(function () {
  if (window.__calendlyBubbleWidgetLoaded) {
    return;
  }
  window.__calendlyBubbleWidgetLoaded = true;

  var script = document.currentScript;
  if (!script) {
    var scripts = document.getElementsByTagName("script");
    for (var i = scripts.length - 1; i >= 0; i -= 1) {
      if (/app\.js(\?|$)/.test(scripts[i].src || "")) {
        script = scripts[i];
        break;
      }
    }
  }

  var calendlyUrl =
    (script && script.dataset && script.dataset.calendlyUrl) ||
    "https://calendly.com/dealershipsk/new-meeting";
  var right = (script && script.dataset && script.dataset.right) || "16px";
  var bottom = (script && script.dataset && script.dataset.bottom) || "16px";
  var zIndex = (script && script.dataset && script.dataset.zIndex) || "2147483000";

  var style = document.createElement("style");
  style.id = "calendly-bubble-widget-style";
  style.textContent = "" +
    "#cbw-root{position:fixed;right:" + right + ";bottom:" + bottom + ";z-index:" + zIndex + ";font-family:Segoe UI,Arial,sans-serif;}" +
    "#cbw-root *{box-sizing:border-box;}" +
    "#cbw-button{width:64px;height:64px;border-radius:50%;border:1px solid #d9d9d9;background:#fff;box-shadow:0 18px 40px rgba(0,0,0,.18);cursor:pointer;display:grid;place-items:center;padding:0;}" +
    "#cbw-button:hover{transform:translateY(-2px) scale(1.02);}" +
    "#cbw-panel{position:absolute;right:0;bottom:76px;width:360px;height:520px;background:#fff;border-radius:16px;box-shadow:0 18px 40px rgba(0,0,0,.18);overflow:hidden;transform:translateY(12px) scale(.98);transform-origin:bottom right;opacity:0;pointer-events:none;transition:transform .25s ease,opacity .25s ease;}" +
    "#cbw-root.open #cbw-panel{transform:translateY(0) scale(1);opacity:1;pointer-events:auto;}" +
    "#cbw-header{display:flex;align-items:center;justify-content:space-between;padding:16px 18px;background:#f4f1ec;border-bottom:1px solid #e0d9d1;}" +
    "#cbw-title{font-weight:600;color:#161616;font-size:16px;}" +
    "#cbw-close{background:none;border:none;font-size:24px;cursor:pointer;line-height:1;color:#333;}" +
    "#cbw-body{position:relative;height:calc(520px - 58px);}" +
    "#cbw-loading{position:absolute;inset:0;display:grid;place-items:center;font-size:14px;color:#666;background:#fff;z-index:1;}" +
    "#cbw-frame{border:0;width:100%;height:100%;}" +
    "@media (max-width:520px){#cbw-panel{width:92vw;height:70vh;}#cbw-body{height:calc(70vh - 58px);}}";
  document.head.appendChild(style);

  var root = document.createElement("div");
  root.id = "cbw-root";
  root.innerHTML = "" +
    "<button id=\"cbw-button\" aria-label=\"Open scheduler\">" +
    "<svg viewBox=\"0 0 128 128\" width=\"36\" height=\"36\" aria-hidden=\"true\" focusable=\"false\">" +
    "<rect width=\"128\" height=\"128\" fill=\"none\"/>" +
    "<rect x=\"12\" y=\"16\" width=\"80\" height=\"84\" rx=\"8\" fill=\"#0f1c2e\"/>" +
    "<rect x=\"24\" y=\"38\" width=\"56\" height=\"48\" rx=\"4\" fill=\"#ffffff\"/>" +
    "<rect x=\"28\" y=\"42\" width=\"10\" height=\"10\" rx=\"2\" fill=\"#0f1c2e\"/>" +
    "<rect x=\"44\" y=\"42\" width=\"10\" height=\"10\" rx=\"2\" fill=\"#0f1c2e\"/>" +
    "<rect x=\"60\" y=\"42\" width=\"10\" height=\"10\" rx=\"2\" fill=\"#0f1c2e\"/>" +
    "<rect x=\"28\" y=\"58\" width=\"10\" height=\"10\" rx=\"2\" fill=\"#0f1c2e\"/>" +
    "<rect x=\"44\" y=\"58\" width=\"10\" height=\"10\" rx=\"2\" fill=\"#0f1c2e\"/>" +
    "<rect x=\"60\" y=\"58\" width=\"10\" height=\"10\" rx=\"2\" fill=\"#0f1c2e\"/>" +
    "<rect x=\"28\" y=\"74\" width=\"10\" height=\"10\" rx=\"2\" fill=\"#0f1c2e\"/>" +
    "<rect x=\"44\" y=\"74\" width=\"10\" height=\"10\" rx=\"2\" fill=\"#0f1c2e\"/>" +
    "<rect x=\"60\" y=\"74\" width=\"10\" height=\"10\" rx=\"2\" fill=\"#0f1c2e\"/>" +
    "<circle cx=\"90\" cy=\"84\" r=\"26\" fill=\"#ffffff\" stroke=\"#0f1c2e\" stroke-width=\"8\"/>" +
    "<line x1=\"90\" y1=\"84\" x2=\"90\" y2=\"66\" stroke=\"#0f1c2e\" stroke-width=\"8\" stroke-linecap=\"round\"/>" +
    "<line x1=\"90\" y1=\"84\" x2=\"102\" y2=\"92\" stroke=\"#0f1c2e\" stroke-width=\"8\" stroke-linecap=\"round\"/>" +
    "</svg></button>" +
    "<div id=\"cbw-panel\" role=\"dialog\" aria-modal=\"false\" aria-label=\"Calendly\">" +
    "<div id=\"cbw-header\"><div id=\"cbw-title\">Rezervuj termin</div><button id=\"cbw-close\" aria-label=\"Close\">x</button></div>" +
    "<div id=\"cbw-body\"><div id=\"cbw-loading\">Nacitavam kalendar...</div><iframe id=\"cbw-frame\" title=\"Calendly\" loading=\"lazy\" src=\"\" allow=\"camera; microphone; fullscreen\"></iframe></div>" +
    "</div>";
  document.body.appendChild(root);

  var button = document.getElementById("cbw-button");
  var closeBtn = document.getElementById("cbw-close");
  var frame = document.getElementById("cbw-frame");
  var loading = document.getElementById("cbw-loading");
  var hasLoaded = false;

  function openPanel() {
    root.classList.add("open");
    if (!hasLoaded) {
      frame.src = calendlyUrl;
      hasLoaded = true;
    }
  }

  function closePanel() {
    root.classList.remove("open");
  }

  button.addEventListener("click", function () {
    if (root.classList.contains("open")) {
      closePanel();
    } else {
      openPanel();
    }
  });

  closeBtn.addEventListener("click", closePanel);

  frame.addEventListener("load", function () {
    loading.style.display = "none";
  });

  window.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closePanel();
    }
  });

  document.addEventListener("click", function (event) {
    if (!root.contains(event.target)) {
      closePanel();
    }
  });
})();
