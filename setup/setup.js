const view = document.getElementById("view");

function ensureCss(href, id) {
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

function ensureScript(src, id, onload) {
  if (document.getElementById(id)) {
    if (onload) onload();
    return;
  }
  const s = document.createElement("script");
  s.id = id;
  s.src = src;
  s.defer = true;
  s.onload = onload || null;
  document.body.appendChild(s);
}

async function loadFragment(file) {
  const res = await fetch(file, { cache: "no-store" });
  if (!res.ok) throw new Error("Impossible de charger " + file);
  return res.text();
}

async function showSetup() {
  ensureCss("setup.css", "setup-css");
  view.innerHTML = await loadFragment("setup.html");
  ensureScript("setup.js", "setup-js", () => {
    if (window.SetupAnalyzer) {
      window.SetupAnalyzer.init();
    }
  });
}

window.addEventListener("hashchange", () => {
  if (location.hash === "#setup") showSetup();
});

if (location.hash === "#setup") showSetup();
