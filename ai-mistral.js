document.addEventListener("DOMContentLoaded", () => {

  const input = document.getElementById("mistralPrompt");
  const send = document.getElementById("mistralSend");
  const clear = document.getElementById("mistralClear");
  const output = document.getElementById("mistralAnswer");

  if (!input || !send || !clear || !output) return;

  clear.onclick = () => {
    input.value = "";
    output.textContent = "";
  };

  send.onclick = async () => {
    output.textContent = "⏳ Réponse en cours...";

    const response = await fetch("/api/mistral", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input.value })
    });

    const data = await response.json();
    output.textContent = data.text || data.error;
  };

});
