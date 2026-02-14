// PasPeurduPro — Setup Analyzer
// Fonctionne en site statique : données locales en JSON + règles simples.

const PATHS = {
  cpu: "data/cpu.json",
  gpu: "data/gpu.json",
  software: "data/software.json",
};

let CPU_DB = [];
let GPU_DB = [];
let SOFTWARE = [];

const els = {
  cpu: document.getElementById("cpu"),
  gpu: document.getElementById("gpu"),
  os: document.getElementById("os"),
  ram: document.getElementById("ram"),
  storage: document.getElementById("storage"),
  analyzeBtn: document.getElementById("analyzeBtn"),
  resetBtn: document.getElementById("resetBtn"),
  results: document.getElementById("results"),
  statusBox: document.getElementById("statusBox"),
};

function storageIsSSD(storage) {
  return storage === "ssd" || storage === "nvme";
}

function byName(db, name) {
  return db.find((x) => x.name === name) || null;
}

function populateSelect(selectEl, items) {
  selectEl.innerHTML = "";
  for (const item of items) {
    const opt = document.createElement("option");
    opt.value = item.name;
    opt.textContent = item.name;
    selectEl.appendChild(opt);
  }
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

/**
 * Évaluation :
 * - Si en dessous du minimum => ❌
 * - Si entre min et rec => ⚠️
 * - Si >= rec => ✅
 */
function evaluate(sw, cfg) {
  const fail = [];
  const warn = [];

  // CPU
  if (cfg.cpuTier < sw.min.cpu) fail.push("CPU trop faible");
  else if (cfg.cpuTier < sw.rec.cpu) warn.push("CPU limite");

  // GPU
  if (cfg.gpuTier < sw.min.gpu) fail.push("GPU trop faible");
  else if (cfg.gpuTier < sw.rec.gpu) warn.push("GPU limite");

  // RAM
  if (cfg.ram < sw.min.ram) fail.push(`RAM < ${sw.min.ram} Go`);
  else if (cfg.ram < sw.rec.ram) warn.push(`RAM conseillée : ${sw.rec.ram} Go`);

  // SSD
  if (sw.min.ssd && !cfg.hasSSD) fail.push("SSD recommandé/nécessaire pour être à l’aise");
  else if (sw.rec.ssd && !cfg.hasSSD) warn.push("SSD conseillé");

  // OS (optionnel)
  if (sw.os && Array.isArray(sw.os.allowed) && !sw.os.allowed.includes(cfg.os)) {
    fail.push(`OS non pris en charge pour ce profil (test)`);
  }

  if (fail.length) return { status: "❌", label: "Pas recommandé", reasons: fail, tips: sw.tips || [] };
  if (warn.length) return { status: "⚠️", label: "Limite", reasons: warn, tips: sw.tips || [] };
  return { status: "✅", label: "OK", reasons: ["Configuration confortable pour cet usage"], tips: sw.tips || [] };
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderResults(cfg) {
  els.results.innerHTML = "";

  for (const sw of SOFTWARE) {
    const ev = evaluate(sw, cfg);

    const card = document.createElement("div");
    card.className = "result-card";
    card.innerHTML = `
      <div class="topline">
        <div>
          <div class="software-title">${escapeHtml(ev.status)} ${escapeHtml(sw.title)}</div>
          <div class="small muted">${escapeHtml(ev.label)}</div>
        </div>
        <div class="meta">CPU tier ${cfg.cpuTier} • GPU tier ${cfg.gpuTier} • ${cfg.ram} Go</div>
      </div>

      <div class="small" style="margin-top:10px;">
        <strong>Pourquoi ?</strong>
        <ul style="margin:6px 0 0; padding-left: 18px;">
          ${ev.reasons.map((r) => `<li>${escapeHtml(r)}</li>`).join("")}
        </ul>
      </div>

      ${
        ev.tips.length
          ? `<div class="small" style="margin-top:10px;">
              <strong>Conseils :</strong>
              <ul style="margin:6px 0 0; padding-left: 18px;">
                ${ev.tips.map((t) => `<li>${escapeHtml(t)}</li>`).join("")}
              </ul>
            </div>`
          : ""
      }
    `;

    els.results.appendChild(card);
  }
}

function showStatus(msg) {
  els.statusBox.classList.remove("hidden");
  els.statusBox.textContent = msg;
}

function hideStatus() {
  els.statusBox.classList.add("hidden");
  els.statusBox.textContent = "";
}

function getConfigFromUI() {
  const cpu = byName(CPU_DB, els.cpu.value);
  const gpu = byName(GPU_DB, els.gpu.value);

  return {
    os: els.os.value,
    cpuTier: clamp(cpu ? cpu.tier : 1, 1, 6),
    gpuTier: clamp(gpu ? gpu.tier : 1, 1, 6),
    ram: Number(els.ram.value),
    hasSSD: storageIsSSD(els.storage.value),
  };
}

function resetUI() {
  if (CPU_DB.length) els.cpu.value = CPU_DB[0].name;
  if (GPU_DB.length) els.gpu.value = GPU_DB[0].name;
  els.os.value = "windows";
  els.ram.value = "16";
  els.storage.value = "ssd";
  els.results.innerHTML = "";
  hideStatus();
}

async function loadJson(path) {
  const res = await fetch(path, { cache: "no-store" });
  if (!res.ok) throw new Error(`Impossible de charger ${path} (${res.status})`);
  return res.json();
}

async function init() {
  try {
    showStatus("Chargement des composants...");
    CPU_DB = await loadJson(PATHS.cpu);
    GPU_DB = await loadJson(PATHS.gpu);
    SOFTWARE = await loadJson(PATHS.software);

    populateSelect(els.cpu, CPU_DB);
    populateSelect(els.gpu, GPU_DB);

    resetUI();
    showStatus("Choisis ta config puis clique “Analyser”.");
  } catch (err) {
    console.error(err);
    showStatus("Erreur : données introuvables. Vérifie les chemins des fichiers JSON.");
  }
}

els.analyzeBtn.addEventListener("click", () => {
  hideStatus();
  const cfg = getConfigFromUI();
  renderResults(cfg);
});

els.resetBtn.addEventListener("click", () => resetUI());

init();
