/* =========================================================
   POST /admin/api/translate
   { "from": "ar" | "en" | "ko", "to": "ar" | "en" | "ko", "texts": ["…", …] }
   → { "translations": ["…", …], "model": "@cf/…" }
   ---------------------------------------------------------
   Uses Cloudflare Workers AI (free daily allowance). Needs a
   Workers AI binding named AI on the Pages project:
   Workers & Pages → elf-shop → Settings → Bindings → Add → Workers AI.
   Only Cloudflare-hosted models (@cf/…) are used, so it stays within
   the free allowance. A chat model translates with shop-specific
   instructions; the dedicated m2m100 translator is the last fallback.
   Optional variable TRANSLATE_MODEL puts a specific model first.
   ========================================================= */
import { json } from "./_middleware.js";

const CHAT_MODELS = [
  "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
  "@cf/mistralai/mistral-small-3.1-24b-instruct",
  "@cf/google/gemma-3-12b-it",
  "@cf/meta/llama-3.1-8b-instruct-fast"
];
const FALLBACK = "@cf/meta/m2m100-1.2b";
const LANGS = { ar: "Arabic", en: "English", ko: "Korean" };
const MAX_TEXTS = 50, MAX_CHARS = 4000, BATCH_CHARS = 1800;
let workingModel = null; // remembered between requests while this worker instance lives

const systemPrompt = (from, to) =>
  `You are a professional translator for "The Elf Shop", an online store in Egypt selling authentic Korean skincare, sheet masks, Korean snacks and food, K-pop merchandise and Korean culture gifts. ` +
  `Translate each text from ${LANGS[from]} to ${LANGS[to]}. Rules: keep brand names, product model names, numbers, percentages, sizes and units (ml, g, pcs) and emoji exactly as they are; ` +
  `translate the meaning naturally as a shop would write it — short and clear for product names, fluent for descriptions; ` +
  (to === "ar" ? "write Modern Standard Arabic that Egyptian customers read easily; " : "") +
  `keep line breaks. Do not add explanations, quotes or notes. ` +
  `Input is a JSON array of strings. Reply with ONLY a JSON array of the translated strings, same length and same order.`;

function parseArray(out, n) {
  let v = out && (out.response !== undefined ? out.response : out.result !== undefined ? out.result : out);
  if (typeof v === "string") {
    const start = v.indexOf("["), end = v.lastIndexOf("]");
    if (start < 0 || end < start) return null;
    try { v = JSON.parse(v.slice(start, end + 1)); } catch (e) { return null; }
  }
  if (!Array.isArray(v) || v.length !== n || v.some(x => typeof x !== "string")) return null;
  return v.map(s => s.trim());
}

async function chatTranslate(env, model, texts, from, to) {
  const out = await env.AI.run(model, {
    messages: [{ role: "system", content: systemPrompt(from, to) }, { role: "user", content: JSON.stringify(texts) }],
    temperature: 0.2,
    max_tokens: 2048
  });
  return parseArray(out, texts.length);
}

async function m2mTranslate(env, texts, from, to) {
  const res = [];
  for (const text of texts) {
    const lines = [];
    for (const line of text.split(/\r?\n/)) {
      if (!line.trim()) { lines.push(line); continue; }
      const r = await env.AI.run(FALLBACK, { text: line, source_lang: from, target_lang: to });
      lines.push(String((r && r.translated_text) || "").trim());
    }
    res.push(lines.join("\n"));
  }
  return res;
}

// split into batches that keep each model reply short enough
function batches(items) {
  const out = []; let cur = [], size = 0;
  for (const it of items) {
    if (cur.length && (size + it.text.length > BATCH_CHARS || cur.length >= 12)) { out.push(cur); cur = []; size = 0; }
    cur.push(it); size += it.text.length;
  }
  if (cur.length) out.push(cur);
  return out;
}

async function translateBatch(env, texts, from, to) {
  const order = [...new Set([env.TRANSLATE_MODEL, workingModel, ...CHAT_MODELS].filter(Boolean))];
  let lastError = null;
  for (const model of order) {
    try {
      let res = await chatTranslate(env, model, texts, from, to);
      if (!res && texts.length > 1) { // reply wasn't a clean array — retry one by one
        res = [];
        for (const t of texts) { const one = await chatTranslate(env, model, [t], from, to); if (!one) { res = null; break; } res.push(one[0]); }
      }
      if (res && res.every((s, i) => s || !texts[i].trim())) { workingModel = model; return { translations: res, model }; }
    } catch (e) {
      lastError = e;
      if (/limit|quota|neuron|capacity|429/i.test(String(e && e.message))) throw e; // out of free allowance — stop here
    }
  }
  try { return { translations: await m2mTranslate(env, texts, from, to), model: FALLBACK }; }
  catch (e) { throw lastError || e; }
}

export async function onRequest({ request, env }) {
  if (request.method !== "POST") return json({ error: "Use POST." }, 405);
  if (!env.AI) return json({ error: "Auto-translate isn't switched on yet. In Cloudflare open Workers & Pages → elf-shop → Settings → Bindings, add a Workers AI binding named AI, then redeploy." }, 503);

  let body;
  try { body = await request.json(); } catch (e) { return json({ error: "Bad request." }, 400); }
  const { from, to } = body || {};
  const texts = body && body.texts;
  if (!LANGS[from] || !LANGS[to] || from === to || !Array.isArray(texts)) return json({ error: "Bad request." }, 400);
  if (texts.length > MAX_TEXTS || texts.some(t => typeof t !== "string" || t.length > MAX_CHARS)) return json({ error: "Too much text at once." }, 413);

  try {
    const translations = texts.map(() => "");
    const todo = texts.map((text, i) => ({ text, i })).filter(x => x.text.trim());
    let model = null;
    for (const group of batches(todo)) {
      const r = await translateBatch(env, group.map(x => x.text), from, to);
      group.forEach((x, k) => { translations[x.i] = r.translations[k]; });
      model = r.model;
    }
    return json({ translations, model });
  } catch (e) {
    const msg = String((e && e.message) || e);
    if (/limit|quota|neuron|capacity|429/i.test(msg)) return json({ error: "Today's free translation allowance is used up. Try again tomorrow, or type the translation yourself." }, 429);
    return json({ error: "The translator had a problem: " + msg.slice(0, 200) }, 502);
  }
}
