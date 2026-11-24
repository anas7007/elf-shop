/* =========================================================
   POST /admin/api/translate
   { "from": "ar" | "en" | "ko", "to": "ar" | "en" | "ko", "texts": ["…", …] }
   → { "translations": ["…", …] }
   ---------------------------------------------------------
   Uses Cloudflare Workers AI (free daily allowance). Needs a
   Workers AI binding named AI on the Pages project:
   Workers & Pages → elf-shop → Settings → Bindings → Add → Workers AI.
   ========================================================= */
import { json } from "./_middleware.js";

const MODEL = "@cf/meta/m2m100-1.2b";
const LANGS = ["ar", "en", "ko"];
const MAX_TEXTS = 50, MAX_CHARS = 4000;

async function translateText(env, text, from, to) {
  // translate line by line so paragraphs and bullet lists keep their shape
  const out = [];
  for (const line of text.split(/\r?\n/)) {
    if (!line.trim()) { out.push(line); continue; }
    const r = await env.AI.run(env.TRANSLATE_MODEL || MODEL, { text: line, source_lang: from, target_lang: to });
    out.push(String((r && r.translated_text) || "").trim());
  }
  return out.join("\n");
}

export async function onRequest({ request, env }) {
  if (request.method !== "POST") return json({ error: "Use POST." }, 405);
  if (!env.AI) return json({ error: "Auto-translate isn't switched on yet. In Cloudflare open Workers & Pages → elf-shop → Settings → Bindings, add a Workers AI binding named AI, then redeploy." }, 503);

  let body;
  try { body = await request.json(); } catch (e) { return json({ error: "Bad request." }, 400); }
  const { from, to } = body || {};
  const texts = body && body.texts;
  if (!LANGS.includes(from) || !LANGS.includes(to) || from === to || !Array.isArray(texts)) return json({ error: "Bad request." }, 400);
  if (texts.length > MAX_TEXTS || texts.some(t => typeof t !== "string" || t.length > MAX_CHARS)) return json({ error: "Too much text at once." }, 413);

  try {
    const translations = [];
    for (let i = 0; i < texts.length; i += 5) {
      translations.push(...await Promise.all(texts.slice(i, i + 5).map(t => (t.trim() ? translateText(env, t, from, to) : ""))));
    }
    return json({ translations });
  } catch (e) {
    const msg = String((e && e.message) || e);
    if (/limit|quota|neuron|capacity|429/i.test(msg)) return json({ error: "Today's free translation allowance is used up. Try again tomorrow, or type the translation yourself." }, 429);
    return json({ error: "The translator had a problem: " + msg.slice(0, 200) }, 502);
  }
}
