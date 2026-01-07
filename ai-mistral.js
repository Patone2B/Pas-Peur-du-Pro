document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("mistralPrompt");
  const send = document.getElementById("mistralSend");
  const clear = document.getElementById("mistralClear");
  const output = document.getElementById("mistralAnswer");

  if (!input || !send || !clear || !output) return;

  clear.addEventListener("click", () => {
    input.value = "";
    output.textContent = "";
    output.classList.remove("loading");
  });

  send.addEventListener("click", async () => {
    const message = input.value.trim();
    if (!message) {
      output.textContent = "Écris une question 🙂";
      return;
    }

    output.textContent = "⏳ Réponse en cours...";
    output.classList.add("loading");

    try {
      const r = await fetch("/api/mistral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await r.json().catch(() => ({}));
      const raw = data.text || data.error || "Réponse vide.";

      output.classList.remove("loading");
      output.innerHTML = DOMPurify.sanitize(marked.parse(raw));
    } catch {
      output.classList.remove("loading");
      output.textContent = "❌ Erreur réseau.";
    }
  });
});
