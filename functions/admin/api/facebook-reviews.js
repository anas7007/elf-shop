/* =========================================================
   GET /admin/api/facebook-reviews
   → { "reviews": [{ id, name, text, date, rating, recommend, url }] }
   ---------------------------------------------------------
   Reads the recommendations/reviews on the store's Facebook page
   with the Meta Graph API. The admin panel shows them so the owner
   can pick which ones to publish on the site. The page token stays
   here on Cloudflare — it is never sent to the browser.
   Secrets (Pages → Settings → Variables and Secrets):
     FB_PAGE_ID     the Facebook page's numeric ID
     FB_PAGE_TOKEN  a Page access token with pages_read_user_content
   Optional: FB_GRAPH_VERSION (e.g. v23.0) — otherwise the app's default version.
   ========================================================= */
import { json } from "./_middleware.js";

const FIELDS = ["created_time,recommendation_type,review_text,rating,reviewer{name},open_graph_story{id}", "created_time,recommendation_type,review_text,rating,open_graph_story{id}"];

function explain(err) {
  const code = err && err.code;
  if (code === 190) return { error: "Facebook says the page token is wrong or has expired. Make a new long-lived page token and update FB_PAGE_TOKEN in Cloudflare.", setup: true };
  if (code === 10 || code === 200 || (code >= 200 && code < 300)) return { error: "The Facebook token doesn't have permission to read the page's reviews. It needs pages_read_user_content (and pages_show_list), and you must be an admin of the page.", setup: true };
  if (code === 100) return { error: "Facebook didn't recognise the page. Check that FB_PAGE_ID is your page's numeric ID.", setup: true };
  if (code === 4 || code === 17 || code === 32 || code === 613) return { error: "Facebook is rate-limiting requests right now. Try again in a few minutes." };
  return { error: "Facebook returned an error: " + String((err && err.message) || "unknown").slice(0, 200) };
}

export async function onRequest({ request, env }) {
  if (request.method !== "GET") return json({ error: "Use GET." }, 405);
  const pageId = String(env.FB_PAGE_ID || "").trim(), token = String(env.FB_PAGE_TOKEN || "").trim();
  if (!pageId || !token) return json({ error: "Facebook isn't connected yet.", setup: true }, 503);
  if (!/^\d+$/.test(pageId)) return json({ error: "FB_PAGE_ID must be the page's numeric ID.", setup: true }, 503);
  const ver = env.FB_GRAPH_VERSION ? String(env.FB_GRAPH_VERSION).replace(/^\/+|\/+$/g, "") + "/" : "";
  const pageReviews = `https://www.facebook.com/${pageId}/reviews`;

  for (const fields of FIELDS) {
    let url = `https://graph.facebook.com/${ver}${pageId}/ratings?fields=${encodeURIComponent(fields)}&limit=100`;
    const reviews = []; let failed = null;
    for (let page = 0; page < 5 && url; page++) {
      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      const j = await res.json().catch(() => ({}));
      if (!res.ok || j.error) { failed = j.error || { message: `HTTP ${res.status}` }; break; }
      for (const r of j.data || []) {
        const name = (r.reviewer && r.reviewer.name) || "";
        const rating = r.rating ? Math.max(1, Math.min(5, Math.round(Number(r.rating)))) : null;
        reviews.push({
          id: (r.open_graph_story && r.open_graph_story.id) || `${r.created_time || ""}|${name}|${String(r.review_text || "").slice(0, 40)}`,
          name, text: String(r.review_text || "").trim(), date: r.created_time || "", rating,
          recommend: r.recommendation_type ? r.recommendation_type === "positive" : rating ? rating >= 4 : null,
          url: pageReviews
        });
      }
      url = j.paging && j.paging.next ? j.paging.next : null;
    }
    if (!failed) return json({ reviews });
    // the reviewer's name needs extra permission on some pages — retry once without it
    if (fields !== FIELDS[FIELDS.length - 1] && [10, 100, 200].includes(failed.code)) continue;
    const e = explain(failed);
    return json(e, 502);
  }
  return json({ error: "Couldn't read reviews from Facebook." }, 502);
}
