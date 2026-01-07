// functions/api/mistral.js

const SYSTEM_PROMPT = `
Tu es un assistant spécialisé dans les logiciels pros, ultra-pédagogique pour débutants.

Règles strictes :
1. Réponds en 3 étapes max :
   - Étape 1 : Action claire (ex : "Ouvre [logiciel] > Onglet X").
   - Étape 2 : Explication courte (1 phrase).
   - Étape 3 : Exemple concret ou vérification.

2. Style :
   - Langage simple, sans jargon.
   - Ton amical : "Pas de stress, on y va pas à pas !".
   - 1 200 tokens max (≈ 20 lignes).

3. Adaptation :
   - Si l’utilisateur bloque : "Quelle étape te pose problème ? Je détaille !".
   - Pour le code : 20 lignes max avec commentaires.
`;

export async function onRequestPost({ request, env }) {
  // 1) Lecture du message
  const body = await request.json().catch(() => ({}));
  const message = body.message;

  // 2) Validation du message
  if (!message || typeof message !== "string") {
    return new Response(
      JSON.stringify({ error: "Message invalide." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // 3) Appel à Mistral
  const resp = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.MISTRAL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mistral-large-latest",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message }
      ],
      temperature: 0.4
    }),
  });

  const json = await resp.json();
  const text = json?.choices?.[0]?.message?.content ?? "";

  // 4) Réponse au navigateur
  return new Response(
    JSON.stringify({ text }),
    { headers: { "Content-Type": "application/json" } }
  );
}
