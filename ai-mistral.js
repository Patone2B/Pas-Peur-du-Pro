// functions/api/mistral.js

const SYSTEM_PROMPT = `
Tu es un assistant spécialisé dans les logiciels professionnels, conçu pour aider les débutants à comprendre et utiliser des outils techniques sans se sentir submergés.
(… ton prompt complet ici …)
`;

export async function onRequestPost({ request, env }) {
  try {
    // 1) Vérif clé API
    if (!env.MISTRAL_API_KEY) {
      return new Response(
        JSON.stringify({ error: "MISTRAL_API_KEY manquante dans Cloudflare (Settings → Variables/Secrets)." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // 2) Lecture message
    const body = await request.json().catch(() => ({}));
    const message = body.message;

    if (!message || typeof message !== "string") {
      return new Response(
        JSON.stringify({ error: "Message invalide (champ 'message')." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 3) Appel Mistral
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
          { role: "user", content: message },
        ],
        temperature: 0.4,
      }),
    });

    const json = await resp.json().catch(() => ({}));

    // 4) Gestion des erreurs Mistral (clé invalide, quota, etc.)
    if (!resp.ok) {
      return new Response(
        JSON.stringify({
          error: "Erreur Mistral",
          status: resp.status,
          details: json,
        }),
        { status: resp.status, headers: { "Content-Type": "application/json" } }
      );
    }

    // 5) Extraction réponse
    const text = json?.choices?.[0]?.message?.content ?? "";

    return new Response(JSON.stringify({ text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ error: "Erreur serveur Cloudflare", details: String(e?.message || e) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}