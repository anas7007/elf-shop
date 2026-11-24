/* =========================================================
   /admin/api/* — only for signed-in admins
   ---------------------------------------------------------
   Cloudflare Access already blocks /admin for everyone except the
   allowed emails. This middleware double-checks the Access sign-in
   token on every API call, so the API stays closed even if the
   Access application were changed by mistake.
   Optional settings (Pages → Settings → Variables):
     ACCESS_TEAM_DOMAIN  e.g. empty-mud-7a35.cloudflareaccess.com
     ACCESS_AUD          the Access application's "Application Audience (AUD) tag"
   With both set, the token's signature, audience and expiry are verified.
   ========================================================= */
export const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex" }
});

const b64url = s => Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((s.length + 3) % 4)), c => c.charCodeAt(0));
const parse = s => JSON.parse(new TextDecoder().decode(b64url(s)));

async function verifyAccessToken(token, env) {
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [h, p, sig] = parts;
  let header, payload;
  try { header = parse(h); payload = parse(p); } catch (e) { return false; }
  if (!env.ACCESS_TEAM_DOMAIN || !env.ACCESS_AUD) return true; // not configured: rely on Cloudflare Access at the edge
  const now = Date.now() / 1000;
  if (!payload.exp || payload.exp < now) return false;
  if (payload.nbf && payload.nbf > now + 60) return false;
  const aud = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
  if (!aud.includes(env.ACCESS_AUD)) return false;
  if (payload.iss !== `https://${env.ACCESS_TEAM_DOMAIN}`) return false;
  const res = await fetch(`https://${env.ACCESS_TEAM_DOMAIN}/cdn-cgi/access/certs`, { cf: { cacheTtl: 3600, cacheEverything: true } });
  const certs = await res.json();
  const jwk = (certs.keys || []).find(k => k.kid === header.kid);
  if (!jwk) return false;
  const key = await crypto.subtle.importKey("jwk", jwk, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]);
  return crypto.subtle.verify("RSASSA-PKCS1-v1_5", key, b64url(sig), new TextEncoder().encode(`${h}.${p}`));
}

export async function onRequest({ request, env, next }) {
  const token = request.headers.get("Cf-Access-Jwt-Assertion");
  let ok = false;
  try { ok = !!token && await verifyAccessToken(token, env); } catch (e) { ok = false; }
  if (!ok) return json({ error: "Your admin sign-in has expired. Reload the page and sign in again." }, 401);
  return next();
}
