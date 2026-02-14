window.SetupAnalyzer = (function () {
  const PATHS = {
    cpu: "setup/data/cpu.json",
    gpu: "setup/data/gpu.json",
    software: "setup/data/software.json",
  };

  let CPU_DB = [];
  let GPU_DB = [];
  let SOFTWARE = [];
  let els = null;

  function $(id) { return document.getElementById(id); }

  async function loadJson(path) {
    const res = await fetch(path, { cache: "no-store" });
    if (!res.ok) throw new Error(`Impossible de charger ${path} (${res.status})`);
    return res.json();
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

  function storageIsSSD(storage) {
    return storage === "ssd" || storage === "nvme";
  }

  function byName(db, name) {
    return db.find(x => x.name === name) || null;
  }

  function evaluate(sw, cfg) {
    const fail = [];
    const warn = [];

    if (cfg.cpuTier < sw.min.cpu) fail.push("CPU trop faible");
    else if (cfg.cpuTier < sw.rec.cpu) warn.push("CPU limite");

    if (cfg.gpuTier < sw.min.gpu) fail.push("GPU trop faible");
    else if (cfg.gpuTier < sw.rec.gpu) warn.push("GPU limite");

    if (cfg.ram < sw.min.ram) fail.push(`RAM < ${sw.min.ram} Go`);
    else if (cfg.ram < sw.rec.ram) warn.push(`RAM conseillée : ${sw.rec.ram} Go`);

    if (sw.min.ssd && !cfg.hasSSD) fail.push("SSD recommandé/nécessaire");
    else if (sw.rec.ssd && !cfg.hasSSD) warn.push("SSD conseillé");

    if (fail.length) return { status: "❌", label: "Pas recommandé", reasons: fail, tips: sw.tips || [] };
    if (warn.length) return { status: "⚠️", label: "Limite", reasons: warn, tips: sw.tips || [] };
    return { status: "✅", label: "OK", reasons: ["Configuration confortable"], tips: sw.tips || [] };
  }

  function renderResults(cfg) {
    els.results.innerHTML = "";
    for (const sw of SOFTWARE) {
      const ev = evaluate(sw, cfg);
      const div = document.createElement("div");
      div.className = "result-card";
      div.innerHTML = `
        <div class="topline">
          <div>
            <div class="software-title">${ev.status} ${sw.title}</div>
            <div class="small muted">${ev.label}</div>
          </div>
          <div class="meta">CPU ${cfg.cpuTier} • GPU ${cfg.gpuTier} • ${cfg.ram} Go</div>
        </div>
        <ul class="small" style="margin:10px 0 0; padding-left:18px;">
          ${ev.reasons.map(r => `<li>${r}</li>`).join("")}
        </ul>
      `;
      els.results.appendChild(div);
    }
  }

  function getConfigFromUI() {
    const cpu = byName(CPU_DB, els.cpu.value);
    const gpu = byName(GPU_DB, els.gpu.value);
    return {
      cpuTier: cpu ? cpu.tier : 1,
      gpuTier: gpu ? gpu.tier : 1,
      ram: Number(els.ram.value),
      hasSSD: storageIsSSD(els.storage.value),
    };
  }

  async function init() {
    // récupérer les éléments APRÈS injection du fragment
    els = {
      cpu: $("cpu"),
      gpu: $("gpu"),
      ram: $("ram"),
      storage: $("storage"),
      analyzeBtn: $("analyzeBtn"),
      resetBtn: $("resetBtn"),
      results: $("results"),
      statusBox: $("statusBox"),
    };

    if (!els.cpu || !els.gpu) return; // si le module n'est pas affiché

    els.statusBox.textContent = "Chargement...";
    CPU_DB = await loadJson(PATHS.cpu);
    GPU_DB = await loadJson(PATHS.gpu);
    SOFTWARE = await loadJson(PATHS.software);

    populateSelect(els.cpu, CPU_DB);
    populateSelect(els.gpu, GPU_DB);

    els.statusBox.textContent = "Choisis ta config puis clique “Analyser”.";
    els.results.innerHTML = "";

    els.analyzeBtn.onclick = () => {
      els.statusBox.textContent = "";
      renderResults(getConfigFromUI());
    };

    els.resetBtn.onclick = () => {
      els.ram.value = "16";
      els.storage.value = "ssd";
      els.results.innerHTML = "";
      els.statusBox.textContent = "Réinitialisé.";
    };
  }

  return { init };
})();
