export async function onRequestPost({ request, env }) {
  const { message } = await request.json();

  const resp = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.MISTRAL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mistral-large-latest",
      messages: [{ role: "user", content: message }],
    }),
  });

  const json = await resp.json();
  const text = json?.choices?.[0]?.message?.content ?? "";

  return new Response(JSON.stringify({ text }), {
    headers: { "Content-Type": "application/json" },
  });
}
