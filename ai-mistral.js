document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("mistralPrompt");
  const send = document.getElementById("mistralSend");
  const clear = document.getElementById("mistralClear");
  const output = document.getElementById("mistralAnswer");

  if (!input || !send || !clear || !output) return;

  clear.addEventListener("click", () => {
    input.value = "";
    output.textContent = "";
  });

  send.addEventListener("click", async () => {
    const message = input.value.trim();
    if (!message) {
      output.textContent = "Écris une question 🙂";
      return;
    }

    output.textContent = "⏳ Réponse en cours...";

    try {
      const r = await fetch("/api/mistral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await r.json().catch(() => ({}));
      output.textContent = data.text || data.error || "Réponse vide.";
    } catch {
      output.textContent = "❌ Erreur réseau.";
    }
  });
});
