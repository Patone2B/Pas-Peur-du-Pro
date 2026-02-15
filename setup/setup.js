// SetupAnalyzer — version autonome (sans JSON)
// Tu peux étendre CPU_DB / GPU_DB / SOFTWARE quand tu veux.

window.SetupAnalyzer = (function () {
  const CPU_DB = [
    { name: "Intel Core i5-8400", tier: 2 },
    { name: "Intel Core i5-10400", tier: 3 },
    { name: "Intel Core i7-10700K", tier: 4 },
    { name: "AMD Ryzen 5 3600", tier: 3 },
    { name: "AMD Ryzen 5 5600", tier: 4 },
    { name: "AMD Ryzen 7 5800X", tier: 5 },
    { name: "Apple M1", tier: 4 },
    { name: "Apple M2", tier: 5 }
  ];

  const GPU_DB = [
    { name: "Intel UHD (iGPU)", tier: 1 },
    { name: "NVIDIA GeForce GTX 1050 Ti", tier: 2 },
    { name: "NVIDIA GeForce GTX 1650", tier: 2 },
    { name: "NVIDIA GeForce RTX 2060", tier: 3 },
    { name: "NVIDIA GeForce RTX 3060", tier: 4 },
    { name: "NVIDIA GeForce RTX 4060", tier: 5 },
    { name: "AMD Radeon RX 580", tier: 2 },
    { name: "AMD Radeon RX 6600", tier: 4 },
    { name: "Apple GPU (M1/M2)", tier: 4 }
  ];

  const SOFTWARE = [
    {
      title: "DaVinci Resolve (montage 1080p)",
      min: { cpu: 3, gpu: 3, ram: 16, ssd: true },
      rec: { cpu: 4, gpu: 4, ram: 32, ssd: true },
      tips: ["Active Proxys / Optimized Media", "Active le cache pour les effets"]
    },
    {
      title: "DaVinci Resolve (montage 4K)",
      min: { cpu: 4, gpu: 4, ram: 32, ssd: true },
      rec: { cpu: 5, gpu: 5, ram: 64, ssd: true },
      tips: ["Proxys quasi obligatoires", "Attention NR + Fusion (très lourd)"]
    },
    {
      title: "Unreal Engine (projets simples)",
      min: { cpu: 3, gpu: 3, ram: 16, ssd: true },
      rec: { cpu: 4, gpu: 4, ram: 32, ssd: true },
      tips: ["Évite Lumen/Nanite si ⚠️", "Ferme les applis en arrière-plan"]
    },
    {
      title: "Unreal Engine (Lumen / Nanite)",
      min: { cpu: 4, gpu: 5, ram: 32, ssd: true },
      rec: { cpu: 5, gpu: 6, ram: 64, ssd: true },
      tips: ["Prévois un GPU solide", "Surveille VRAM + compilation shaders"]
    },
    {
      title: "Blender (modélisation / rendu léger)",
      min: { cpu: 3, gpu: 2, ram: 16, ssd: false },
      rec: { cpu: 4, gpu: 4, ram: 32, ssd: true },
      tips: ["Réduis subdivisions si ⚠️", "Rendu : privilégie GPU si possible"]
    }
  ];

  function $(id){ return document.getElementById(id); }
  function byName(db, name){ return db.find(x => x.name === name) || null; }
  function hasSSD(v){ return v === "ssd" || v === "nvme"; }

  function populateSelect(selectEl, items){
    selectEl.innerHTML = "";
    items.forEach(item => {
      const opt = document.createElement("option");
      opt.value = item.name;
      opt.textContent = item.name;
      selectEl.appendChild(opt);
    });
  }

  function evaluate(sw, cfg){
    const fail = [];
    const warn = [];

    if (cfg.cpuTier < sw.min.cpu) fail.push("CPU trop faible");
    else if (cfg.cpuTier < sw.rec.cpu) warn.push("CPU limite");

    if (cfg.gpuTier < sw.min.gpu) fail.push("GPU trop faible");
    else if (cfg.gpuTier < sw.rec.gpu) warn.push("GPU limite");

    if (cfg.ram < sw.min.ram) fail.push(`RAM < ${sw.min.ram} Go`);
    else if (cfg.ram < sw.rec.ram) warn.push(`RAM conseillée : ${sw.rec.ram} Go`);

    if (sw.min.ssd && !cfg.ssd) fail.push("SSD recommandé/nécessaire");
    else if (sw.rec.ssd && !cfg.ssd) warn.push("SSD conseillé");

    if (fail.length) return { status:"❌", label:"Pas recommandé", reasons: fail, tips: sw.tips };
    if (warn.length) return { status:"⚠️", label:"Limite", reasons: warn, tips: sw.tips };
    return { status:"✅", label:"OK", reasons:["Configuration confortable"], tips: sw.tips };
  }

  function renderResults(resultsEl, cfg){
    resultsEl.innerHTML = "";
    SOFTWARE.forEach(sw => {
      const ev = evaluate(sw, cfg);
      const div = document.createElement("div");
      div.className = "result";
      div.innerHTML = `
        <div class="result__top">
          <div class="result__title">${ev.status} ${sw.title}</div>
          <div class="badge">CPU ${cfg.cpuTier} • GPU ${cfg.gpuTier} • ${cfg.ram} Go</div>
        </div>

        <div class="small" style="margin-top:10px;">
          <strong>${ev.label}</strong>
          <ul>
            ${ev.reasons.map(r => `<li>${r}</li>`).join("")}
          </ul>
        </div>

        <div class="small" style="margin-top:10px;">
          <strong>Conseils :</strong>
          <ul>
            ${ev.tips.map(t => `<li>${t}</li>`).join("")}
          </ul>
        </div>
      `;
      resultsEl.appendChild(div);
    });
  }

  function init(){
    // Ces éléments n’existent que quand setup.html est injecté
    const cpuSel = $("cpu");
    const gpuSel = $("gpu");
    const ramSel = $("ram");
    const storageSel = $("storage");
    const statusBox = $("statusBox");
    const resultsEl = $("results");
    const analyzeBtn = $("analyzeBtn");
    const resetBtn = $("resetBtn");

    if (!cpuSel || !gpuSel || !resultsEl || !analyzeBtn) return;

    populateSelect(cpuSel, CPU_DB);
    populateSelect(gpuSel, GPU_DB);

    statusBox.textContent = "Choisis ta config puis clique “Analyser”.";

    analyzeBtn.onclick = () => {
      const cpu = byName(CPU_DB, cpuSel.value);
      const gpu = byName(GPU_DB, gpuSel.value);

      const cfg = {
        cpuTier: cpu ? cpu.tier : 1,
        gpuTier: gpu ? gpu.tier : 1,
        ram: Number(ramSel.value),
        ssd: hasSSD(storageSel.value)
      };

      statusBox.textContent = "";
      renderResults(resultsEl, cfg);
    };

    resetBtn.onclick = () => {
      ramSel.value = "16";
      storageSel.value = "ssd";
      resultsEl.innerHTML = "";
      statusBox.textContent = "Réinitialisé. Choisis ta config puis clique “Analyser”.";
    };
  }

  return { init };
})();
