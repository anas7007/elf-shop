/* =========================================================
   THE ELF SHOP — ADMIN PANEL
   ---------------------------------------------------------
   Edits a draft of assets/js/data.js in this browser, lets you
   preview it on the real site, then publishes it to GitHub.
   ========================================================= */
(function () {
  "use strict";

  const LANGS = [["ar", "Arabic"], ["en", "English"], ["ko", "Korean"]];
  const LS = { draft: "elf_admin_draft", dbase: "elf_admin_draft_base", base: "elf_admin_base", gh: "elf_admin_gh", token: "elf_admin_token", preview: "elf_admin_preview" };
  const ART_TYPES = ["bottle", "tube", "jar", "pouch", "ramen", "snack", "drink", "album", "lightstick", "photocard", "fan", "chopsticks", "clip", "keychain"];
  const DEFAULT_THEME = { blue: "#2230D9", navy: "#0A0F5C", gold: "#C9A44C" };
  const TEXTS = window.ELF_I18N;

  /* ---------- utils ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const clone = o => JSON.parse(JSON.stringify(o));
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const slugify = s => String(s || "").toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);
  const ls = {
    get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
    set(k, v) { localStorage.setItem(k, JSON.stringify(v)); },
    del(k) { try { localStorage.removeItem(k); } catch (e) {} }
  };
  const getPath = (o, path) => path.split(".").reduce((a, k) => (a == null ? a : a[k]), o);
  function setPath(o, path, v) {
    const ks = path.split("."); const last = ks.pop();
    const target = ks.reduce((a, k) => (a[k] == null ? (a[k] = {}) : a[k]), o);
    target[last] = v;
  }
  function toast(msg, err) {
    const el = $("#toast"); el.textContent = msg; el.className = "toast show" + (err ? " err" : "");
    clearTimeout(el._t); el._t = setTimeout(() => (el.className = "toast"), err ? 5000 : 2600);
  }

  /* ---------- data: published baseline + working draft ---------- */
  function normalize(d) {
    d.settings = d.settings || {};
    const s = d.settings;
    s.social = s.social || {}; s.shipping = s.shipping || { flat: null, freeOver: null };
    s.leadPopup = s.leadPopup || { enabled: true, delaySeconds: 25 };
    s.currency = s.currency || { ar: "ج.م", en: "EGP", ko: "EGP" };
    s.heroProducts = s.heroProducts || [];
    d.theme = d.theme || {}; d.categories = d.categories || []; d.products = d.products || []; d.reviews = d.reviews || [];
    d.texts = d.texts || {}; LANGS.forEach(([l]) => (d.texts[l] = d.texts[l] || {}));
    d.products.forEach(p => { p.images = p.images || []; p.tags = p.tags || []; p.art = p.art || { type: "bottle", c1: "#EEF0FF", c2: "#2B35D8", label: "" }; });
    return d;
  }
  let base = window.ELF_DATA;
  const savedBase = ls.get(LS.base);            // what this browser last published (the live file may lag a minute behind)
  if (savedBase && savedBase.updatedAt > base.updatedAt) base = savedBase; else ls.del(LS.base);
  base = normalize(clone(base));
  let data = normalize(ls.get(LS.draft) || clone(base));

  const fingerprint = d => JSON.stringify(Object.assign({}, d, { updatedAt: 0 }));
  const isDirty = () => fingerprint(data) !== fingerprint(base);
  let saveTimer;
  function save(now) {
    clearTimeout(saveTimer);
    const run = () => {
      try { ls.set(LS.draft, data); if (!ls.get(LS.dbase)) ls.set(LS.dbase, base.updatedAt); }
      catch (e) { toast("This browser's storage is full. Publish your changes to free space (photos are moved to the site when you publish).", true); }
      refreshChrome();
    };
    if (now) run(); else saveTimer = setTimeout(run, 250);
  }

  /* ---------- small render helpers ---------- */
  const uploaded = {}; // just-published photo path → local copy, shown until the live site has the file
  const show = src => uploaded[src] || src;
  const thumb = p => (p.images && p.images.length ? `<img src="${esc(show(p.images[0]))}" alt="">` : window.elfArt(p.art, 0));
  const catName = id => { const c = data.categories.find(c => c.id === id); return c ? (c.name.en || c.id) : id; };
  const field = (label, path, o = {}) => {
    const v = getPath(data, path);
    return `<label class="f"><span>${label}</span><input data-path="${path}" ${o.kind ? `data-kind="${o.kind}"` : ""} type="${o.type || "text"}" value="${esc(v == null ? "" : v)}" placeholder="${esc(o.ph || "")}" ${o.attrs || ""}>${o.hint ? `<small>${o.hint}</small>` : ""}</label>`;
  };
  const tri = (label, path, rows) => `<div class="tri"><span class="lbl">${label}</span><div class="tri-row">${LANGS.map(([l]) => {
    const v = esc(getPath(data, path + "." + l) || ""); const dir = l === "ar" ? 'dir="rtl"' : "";
    return `<div class="tri-f"><span class="tag">${l.toUpperCase()}</span>${rows ? `<textarea data-path="${path}.${l}" rows="${rows}" ${dir}>${v}</textarea>` : `<input data-path="${path}.${l}" value="${v}" ${dir}>`}</div>`;
  }).join("")}</div></div>`;
  const check = (label, path) => `<label class="check"><input type="checkbox" data-path="${path}" ${getPath(data, path) ? "checked" : ""}>${label}</label>`;
  const artEditor = path => {
    const a = getPath(data, path) || {};
    return `<div class="grid2" style="grid-template-columns:repeat(4,1fr)">
      <label class="f"><span>Illustration</span><select data-path="${path}.type">${ART_TYPES.map(t => `<option ${a.type === t ? "selected" : ""}>${t}</option>`).join("")}</select></label>
      <label class="f"><span>Background</span><input type="color" data-path="${path}.c1" value="${esc(a.c1 || "#EEF0FF")}"></label>
      <label class="f"><span>Main color</span><input type="color" data-path="${path}.c2" value="${esc(a.c2 || "#2B35D8")}"></label>
      <label class="f"><span>Label text</span><input data-path="${path}.label" value="${esc(a.label || "")}" maxlength="10"></label>
    </div>`;
  };

  /* ---------- navigation ---------- */
  const ICON = {
    dashboard: '<path d="M4 13h6V4H4zM14 20h6v-9h-6zM4 20h6v-4H4zM14 4v4h6V4z"/>',
    products: '<path d="M6 7h12l1 13H5L6 7z"/><path d="M9 7a3 3 0 0 1 6 0"/>',
    categories: '<path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/>',
    reviews: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
    texts: '<path d="M5 6h14M5 12h14M5 18h9"/>',
    appearance: '<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 0 0 18z" fill="currentColor"/>',
    publish: '<path d="M12 16V4M7 9l5-5 5 5M5 20h14"/>'
  };
  const NAV = [["dashboard", "Dashboard"], ["products", "Products"], ["categories", "Categories"], ["reviews", "Reviews"], ["settings", "Store settings"], ["texts", "Site texts"], ["appearance", "Colors"], ["publish", "Publish"]];
  const state = { q: "", cat: "", tgroup: "hero", tq: "", busy: "" };
  const route = () => { const [name, arg] = (location.hash.slice(1) || "dashboard").split("/"); return { name, arg: arg ? decodeURIComponent(arg) : "" }; };

  function refreshChrome() {
    const r = route(); const active = r.name === "product" ? "products" : r.name;
    const counts = { products: data.products.length, categories: data.categories.length, reviews: data.reviews.length };
    $("#nav").innerHTML = NAV.map(([id, label]) => `<a href="#${id}" class="${active === id ? "active" : ""}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICON[id]}</svg>${label}${counts[id] != null ? `<span class="n">${counts[id]}</span>` : ""}</a>`).join("");
    const d = isDirty(); const st = $("#status");
    st.className = "status " + (d ? "dirty" : "clean");
    st.textContent = d ? "Unpublished changes — customers don't see them yet" : "Everything is published";
  }

  /* =======================================================
     VIEWS
     ======================================================= */
  const views = {};
  let live = null; // optional function a view sets to update itself after each edit (without re-rendering inputs)

  /* ---------- Dashboard ---------- */
  views.dashboard = () => {
    const P = data.products; const visible = P.filter(p => !p.hidden);
    const noPhoto = visible.filter(p => !p.images.length).length;
    const placeholderReviews = data.reviews.filter(r => /^customer name$/i.test((r.name || "").trim())).length;
    const s = data.settings; const connected = !!ghCfg().token;
    const chk = (ok, title, sub, link, linkText) => `<li class="${ok ? "done" : "todo"}"><span class="dot">${ok ? "✓" : "!"}</span><span><b>${title}</b><small>${sub}</small></span>${link ? `<a class="btn sm" href="${link}">${linkText}</a>` : ""}</li>`;
    return `
      <div class="head"><div><h1>Dashboard</h1><p>An overview of your store. Changes you make here are saved as a draft in this browser until you publish.</p></div></div>
      <div class="stats">
        <div class="stat"><b>${visible.length}</b><span>Products on the site</span></div>
        <div class="stat"><b>${P.length - visible.length}</b><span>Hidden products</span></div>
        <div class="stat"><b>${visible.filter(p => p.oldPrice).length}</b><span>On sale</span></div>
        <div class="stat"><b>${visible.filter(p => p.soldOut).length}</b><span>Sold out</span></div>
        <div class="stat"><b>${data.categories.length}</b><span>Categories</span></div>
        <div class="stat"><b>${data.reviews.length}</b><span>Reviews</span></div>
      </div>
      <div class="card"><h2>Launch checklist</h2><p class="sub">Things to finish before sending customers to the site.</p>
        <ul class="checks">
          ${chk(noPhoto === 0, "Product photos", noPhoto ? `${noPhoto} of ${visible.length} visible products still use an illustration instead of a real photo.` : "Every visible product has a photo.", "#products", "Products")}
          ${chk(placeholderReviews === 0, "Real customer reviews", placeholderReviews ? `${placeholderReviews} review(s) are still placeholders. Replace them with reviews from your Facebook page.` : "No placeholder reviews left.", "#reviews", "Reviews")}
          ${chk(!!s.metaPixelId, "Facebook (Meta) Pixel", s.metaPixelId ? "Pixel ID is set — ad tracking is active." : "No Pixel ID yet. Add it to track ads and build audiences.", "#settings", "Settings")}
          ${chk(s.shipping.flat != null, "Shipping fee", s.shipping.flat != null ? `Fixed fee: ${s.shipping.flat} EGP.` : 'Not set — checkout shows "confirmed on WhatsApp". This is optional.', "#settings", "Settings")}
          ${chk(connected, "Publishing connection", connected ? "Connected to GitHub — you can publish from this browser." : "Connect to GitHub once so the Publish button can update the live site.", "#publish", "Publish")}
        </ul>
      </div>
      <div class="card"><h2>Orders and customers</h2>
        <p class="sub">The site has no database: every order, newsletter sign-up and contact message is emailed to <b>${esc(s.email)}</b>, and orders are also sent to WhatsApp. Open them here:</p>
        <div class="links">
          <a class="btn" target="_blank" rel="noopener" href="https://mail.google.com/mail/u/0/#search/${encodeURIComponent('subject:"New order"')}">Orders in Gmail ↗</a>
          <a class="btn" target="_blank" rel="noopener" href="https://mail.google.com/mail/u/0/#search/${encodeURIComponent('subject:"New subscriber"')}">Subscribers in Gmail ↗</a>
          <a class="btn" target="_blank" rel="noopener" href="https://mail.google.com/mail/u/0/#search/${encodeURIComponent('subject:"Website inquiry"')}">Inquiries in Gmail ↗</a>
          <a class="btn" target="_blank" rel="noopener" href="https://web.whatsapp.com/">WhatsApp Web ↗</a>
        </div>
      </div>`;
  };

  /* ---------- Products list ---------- */
  function productRows() {
    const q = state.q.trim().toLowerCase();
    const filtered = !!(q || state.cat);
    const list = data.products.map((p, i) => ({ p, i })).filter(({ p }) =>
      (!state.cat || p.cat === state.cat) && (!q || [p.id, p.name.ar, p.name.en, p.name.ko].join(" ").toLowerCase().includes(q)));
    if (!list.length) return `<tr><td colspan="5" class="empty">No products found.</td></tr>`;
    return list.map(({ p, i }) => `
      <tr>
        <td><a class="pname" href="#product/${encodeURIComponent(p.id)}"><span class="thumb">${thumb(p)}</span><span><b>${esc(p.name.en || p.name.ar || p.id)}</b><small dir="auto">${esc(p.name.ar || "")}</small></span></a></td>
        <td>${esc(catName(p.cat))}</td>
        <td class="num"><b>${Number(p.price || 0).toLocaleString("en-US")}</b> EGP${p.oldPrice ? `<br><small><s>${Number(p.oldPrice).toLocaleString("en-US")}</s></small>` : ""}</td>
        <td>${p.hidden ? '<span class="chip grey">Hidden</span>' : ""}${p.soldOut ? '<span class="chip dark">Sold out</span>' : ""}${p.oldPrice ? '<span class="chip red">Sale</span>' : ""}${p.tags.includes("best") ? '<span class="chip gold">Best seller</span>' : ""}${p.tags.includes("new") ? '<span class="chip">New</span>' : ""}${p.images.length ? "" : '<span class="chip grey">No photo</span>'}</td>
        <td class="acts">
          ${filtered ? "" : `<button class="btn sm icon" data-act="p-move" data-i="${i}" data-d="-1" title="Move up" ${i === 0 ? "disabled" : ""}>↑</button><button class="btn sm icon" data-act="p-move" data-i="${i}" data-d="1" title="Move down" ${i === data.products.length - 1 ? "disabled" : ""}>↓</button>`}
          <a class="btn sm" href="#product/${encodeURIComponent(p.id)}">Edit</a>
          <button class="btn sm" data-act="p-dup" data-i="${i}">Duplicate</button>
          <button class="btn sm danger" data-act="p-del" data-i="${i}">Delete</button>
        </td>
      </tr>`).join("");
  }
  views.products = () => `
    <div class="head"><div><h1>Products</h1><p>Add, edit, hide or delete products. The order here is the order customers see in the shop.</p></div>
      <button class="btn primary" data-act="p-add">+ Add product</button></div>
    <div class="card">
      <div class="bar">
        <input type="search" placeholder="Search products…" data-filter="q" value="${esc(state.q)}">
        <select data-filter="cat"><option value="">All categories</option>${data.categories.map(c => `<option value="${esc(c.id)}" ${state.cat === c.id ? "selected" : ""}>${esc(c.name.en || c.id)}</option>`).join("")}</select>
      </div>
      <div class="table-wrap"><table class="tbl"><thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Status</th><th></th></tr></thead><tbody id="rows">${productRows()}</tbody></table></div>
    </div>`;

  /* ---------- Product editor ---------- */
  views.product = id => {
    const i = data.products.findIndex(p => p.id === id);
    if (i < 0) return `<div class="card empty">Product not found. <a href="#products">Back to products</a></div>`;
    const p = data.products[i]; const P = `products.${i}`;
    live = () => {
      const pv = $("#pv"); if (!pv) return;
      pv.innerHTML = `<div class="pv-card"><div class="pv-media">${thumb(p)}</div><div class="pv-body"><small>${esc(catName(p.cat))}</small><b>${esc(p.name.en || "—")}</b><b dir="rtl" style="font-weight:600">${esc(p.name.ar || "")}</b><div class="pr">${Number(p.price || 0).toLocaleString("en-US")} EGP${p.oldPrice ? `<s>${Number(p.oldPrice).toLocaleString("en-US")}</s>` : ""}</div></div></div>`;
      const ap = $("#art-pv"); if (ap) ap.innerHTML = window.elfArt(p.art, 0);
    };
    return `
      <div class="head"><div><a href="#products">← All products</a><h1 style="margin-top:6px">${esc(p.name.en || p.name.ar || "New product")}</h1></div>
        <div class="links"><button class="btn" data-act="preview" data-url="product.html?id=${encodeURIComponent(p.id)}">👁 Preview on site</button><button class="btn danger" data-act="p-del" data-i="${i}">Delete</button></div></div>
      ${p.hidden ? `<div class="note">This product is <b>hidden</b> — customers can't see it. Untick “Hidden” below when it's ready.</div>` : ""}
      <div class="cols">
        <div>
          <div class="card"><h2>Name and description</h2><p class="sub">Fill in all three languages. If Korean or English is left empty, the English text is shown.</p>
            ${tri("Product name", P + ".name")}
            ${tri("Description", P + ".desc", 4)}
            ${tri("How to use", P + ".usage", 3)}
          </div>
          <div class="card"><h2>Price and details</h2>
            <div class="grid3" style="margin-bottom:14px">
              ${field("Price (EGP)", P + ".price", { type: "number", kind: "num", attrs: 'min="0" step="1"' })}
              ${field("Old price (optional)", P + ".oldPrice", { type: "number", kind: "num", attrs: 'min="0" step="1"', hint: "Fill this to show a Sale badge and discount %." })}
              ${field("Size / weight", P + ".size", { ph: "e.g. 100 ml" })}
            </div>
            <div class="grid2" style="margin-bottom:14px">
              <label class="f"><span>Category</span><select data-path="${P}.cat">${data.categories.map(c => `<option value="${esc(c.id)}" ${p.cat === c.id ? "selected" : ""}>${esc(c.name.en || c.id)}</option>`).join("")}</select></label>
              <label class="f"><span>Link name (ID)</span><input data-rename="product" data-i="${i}" value="${esc(p.id)}"><small>Used in the product's web address. Lowercase letters, numbers and dashes.</small></label>
            </div>
            <div class="checkrow">
              <label class="check"><input type="checkbox" data-tag="${i}|best" ${p.tags.includes("best") ? "checked" : ""}>Best seller (homepage)</label>
              <label class="check"><input type="checkbox" data-tag="${i}|new" ${p.tags.includes("new") ? "checked" : ""}>New badge</label>
              ${check("Sold out", P + ".soldOut")}
              <label class="check"><input type="checkbox" data-path="${P}.hidden" data-rerender ${p.hidden ? "checked" : ""}>Hidden</label>
            </div>
          </div>
          <div class="card"><h2>Photos</h2><p class="sub">Square photos look best. They are resized automatically. The first photo is the main one.</p>
            <div class="imgs">
              ${p.images.map((src, n) => `<div class="img"><img src="${esc(show(src))}" alt="">${n === 0 ? '<span class="main-tag">MAIN</span>' : ""}<div class="img-acts">${n ? `<button data-act="img-main" data-i="${i}" data-n="${n}">Make main</button>` : ""}<button data-act="img-del" data-i="${i}" data-n="${n}">Remove</button></div></div>`).join("")}
              <label class="upload"><input type="file" accept="image/*" multiple data-upload="${i}"><span>+ Add photos</span></label>
            </div>
          </div>
          ${p.images.length ? "" : `<div class="card"><h2>Illustration (used until you add a photo)</h2>
            <div style="display:grid;grid-template-columns:120px 1fr;gap:16px;align-items:center"><div class="thumb" id="art-pv" style="width:120px;height:120px">${window.elfArt(p.art, 0)}</div>${artEditor(P + ".art")}</div></div>`}
        </div>
        <aside class="pv"><div class="lbl" style="margin-bottom:8px">How it looks in the shop</div><div id="pv"></div></aside>
      </div>`;
  };

  /* ---------- Categories ---------- */
  views.categories = () => {
    live = () => data.categories.forEach((c, i) => { const el = $(`#cart-${i}`); if (el) el.innerHTML = window.elfArt(c.art, 2); });
    return `
    <div class="head"><div><h1>Categories</h1><p>The sections of your shop. They appear on the homepage, in the shop filter and in the menus, in this order.</p></div>
      <button class="btn primary" data-act="c-add">+ Add category</button></div>
    ${data.categories.map((c, i) => {
      const n = data.products.filter(p => p.cat === c.id).length; const C = `categories.${i}`;
      return `<div class="item">
        <div class="item-head"><div class="thumb" id="cart-${i}">${window.elfArt(c.art, 2)}</div><h3>${esc(c.name.en || c.id)} <span class="chip">${n} product${n === 1 ? "" : "s"}</span></h3>
          <button class="btn sm icon" data-act="c-move" data-i="${i}" data-d="-1" ${i === 0 ? "disabled" : ""}>↑</button>
          <button class="btn sm icon" data-act="c-move" data-i="${i}" data-d="1" ${i === data.categories.length - 1 ? "disabled" : ""}>↓</button>
          <button class="btn sm danger" data-act="c-del" data-i="${i}" ${n ? 'disabled title="Move or delete its products first"' : ""}>Delete</button></div>
        ${tri("Name", C + ".name")}
        ${tri("Short description", C + ".desc")}
        <div class="grid2" style="grid-template-columns:200px 1fr;align-items:end">
          <label class="f"><span>Link name (ID)</span><input data-rename="category" data-i="${i}" value="${esc(c.id)}"></label>
          ${artEditor(C + ".art")}
        </div>
      </div>`;
    }).join("")}`;
  };

  /* ---------- Reviews ---------- */
  views.reviews = () => `
    <div class="head"><div><h1>Customer reviews</h1><p>Shown on the homepage. Copy real reviews from your Facebook page — only publish reviews customers actually wrote.</p></div>
      <button class="btn primary" data-act="r-add">+ Add review</button></div>
    ${data.reviews.some(r => /^customer name$/i.test((r.name || "").trim())) ? `<div class="note">Some reviews below are still <b>placeholders</b>. Replace or delete them before launch.</div>` : ""}
    ${data.reviews.length ? "" : `<div class="card empty">No reviews yet — the reviews section is hidden on the homepage.</div>`}
    ${data.reviews.map((r, i) => `<div class="item">
      <div class="item-head"><h3>Review ${i + 1}</h3><button class="btn sm danger" data-act="r-del" data-i="${i}">Delete</button></div>
      <div class="grid2" style="margin-bottom:14px">${field("Customer name", `reviews.${i}.name`)}<span></span></div>
      ${tri("City", `reviews.${i}.city`)}
      ${tri("Review text", `reviews.${i}.text`, 3)}
    </div>`).join("")}`;

  /* ---------- Settings ---------- */
  views.settings = () => {
    const vis = data.products.filter(p => !p.hidden);
    const heroSel = n => `<label class="f"><span>Featured product ${n + 1}</span><select data-path="settings.heroProducts.${n}"><option value="">(automatic)</option>${vis.map(p => `<option value="${esc(p.id)}" ${data.settings.heroProducts[n] === p.id ? "selected" : ""}>${esc(p.name.en || p.id)}</option>`).join("")}</select></label>`;
    return `
    <div class="head"><div><h1>Store settings</h1><p>Contact numbers, payment, shipping, Facebook tracking and email.</p></div></div>
    <div class="card"><h2>Ordering and payment</h2><p class="sub">Numbers without + or spaces, starting with the country code (e.g. 2011…).</p>
      <div class="grid2">
        ${field("WhatsApp number for orders", "settings.whatsappOrders", { ph: "201144246362" })}
        ${field("…as shown to customers", "settings.whatsappOrdersDisplay", { ph: "+20 114 424 6362" })}
        ${field("WhatsApp number for payment screenshots", "settings.whatsappPayments", { ph: "201015044457" })}
        ${field("…as shown to customers", "settings.whatsappPaymentsDisplay", { ph: "+20 101 504 4457" })}
        ${field("InstaPay number", "settings.instapayNumber", { ph: "01015044457" })}
        ${field("Store email", "settings.email", { type: "email" })}
      </div>
    </div>
    <div class="card"><h2>Shipping</h2><p class="sub">Leave the fee empty to show “confirmed on WhatsApp” at checkout.</p>
      <div class="grid2">
        ${field("Fixed shipping fee (EGP)", "settings.shipping.flat", { type: "number", kind: "num", attrs: 'min="0"' })}
        ${field("Free shipping for orders over (EGP)", "settings.shipping.freeOver", { type: "number", kind: "num", attrs: 'min="0"' })}
      </div>
    </div>
    <div class="card"><h2>Social media</h2>
      <div class="grid3">${field("Facebook page link", "settings.social.facebook", { type: "url" })}${field("Instagram link", "settings.social.instagram", { type: "url" })}${field("TikTok link", "settings.social.tiktok", { type: "url" })}</div>
    </div>
    <div class="card"><h2>Facebook ads (Meta Pixel)</h2><p class="sub">Paste your Pixel ID from Meta Events Manager. The site then reports page views, add-to-cart, purchases and sign-ups to Facebook.</p>
      <div class="grid2">${field("Meta Pixel ID", "settings.metaPixelId", { ph: "123456789012345" })}</div>
    </div>
    <div class="card"><h2>Email delivery and newsletter</h2>
      <div class="grid2" style="margin-bottom:14px">
        ${field("Form delivery address (FormSubmit)", "settings.formEndpoint", { type: "url", hint: "Where orders and sign-ups are sent. Change only if you change the store email or get a FormSubmit alias." })}
        ${field("Show newsletter pop-up after (seconds)", "settings.leadPopup.delaySeconds", { type: "number", kind: "num", attrs: 'min="3"' })}
      </div>
      ${check("Show the newsletter pop-up to new visitors", "settings.leadPopup.enabled")}
    </div>
    <div class="card"><h2>Homepage</h2><p class="sub">The three products floating in the big banner at the top of the homepage.</p>
      <div class="grid3" style="margin-bottom:14px">${heroSel(0)}${heroSel(1)}${heroSel(2)}</div>
      <div class="grid3">${field("Store opened in (year)", "settings.since", { type: "number", kind: "num" })}</div>
    </div>`;
  };

  /* ---------- Site texts ---------- */
  const TEXT_GROUPS = [
    ["hero", "Homepage — main banner", ["hero"]], ["announce", "Top announcement bar", ["announce"]], ["marquee", "Scrolling band", ["marquee"]],
    ["home", "Homepage — sections", ["cats", "best", "offer", "why", "reviews", "social"]], ["news", "Newsletter and pop-up", ["news", "popup"]],
    ["shop", "Shop page", ["shop", "sort", "badge", "cat"]], ["p", "Product page", ["p"]], ["cart", "Cart", ["cart"]],
    ["co", "Checkout", ["co"]], ["ok", "Order confirmation", ["ok"]], ["about", "About us page", ["about", "loc"]],
    ["contact", "Contact page", ["contact"]], ["footer", "Footer", ["footer"]], ["nav", "Menu and header", ["nav", "brand", "wa", "lang"]]
  ];
  const ALL_KEYS = Object.keys(TEXTS.en).filter(k => k !== "meta.dir");
  function textRows() {
    const q = state.tq.trim().toLowerCase();
    const prefixes = (TEXT_GROUPS.find(g => g[0] === state.tgroup) || TEXT_GROUPS[0])[2];
    const keys = ALL_KEYS.filter(k => q
      ? LANGS.some(([l]) => String(data.texts[l][k] || TEXTS[l][k] || "").toLowerCase().includes(q)) || k.includes(q)
      : prefixes.includes(k.split(".")[0]));
    if (!keys.length) return `<div class="empty">No texts match.</div>`;
    return keys.map(k => `<div class="trow"><div class="k"><b>${esc(k)}</b>${esc(TEXTS.en[k])}</div>${LANGS.map(([l]) => {
      const over = data.texts[l][k]; const val = over || TEXTS[l][k] || "";
      return `<textarea rows="${val.length > 70 ? 3 : 1}" data-text="${l}|${esc(k)}" class="${over ? "changed" : ""}" ${l === "ar" ? 'dir="rtl"' : ""}>${esc(val)}</textarea>`;
    }).join("")}</div>`).join("");
  }
  views.texts = () => `
    <div class="head"><div><h1>Site texts</h1><p>Change any wording on the site in Arabic, English and Korean. Edited texts are highlighted; clear a box to go back to the original.</p></div></div>
    <div class="card">
      <div class="bar">
        <select data-filter="tgroup">${TEXT_GROUPS.map(g => `<option value="${g[0]}" ${state.tgroup === g[0] ? "selected" : ""}>${g[1]}</option>`).join("")}</select>
        <input type="search" placeholder="…or search all texts" data-filter="tq" value="${esc(state.tq)}">
      </div>
      <div class="trow" style="border-bottom:1.5px solid var(--line);padding-top:0"><div class="lbl">Text</div><div class="lbl">Arabic</div><div class="lbl">English</div><div class="lbl">Korean</div></div>
      <div id="trows">${textRows()}</div>
    </div>`;

  /* ---------- Colors ---------- */
  views.appearance = () => {
    const col = k => (/^#[0-9a-f]{6}$/i.test(data.theme[k] || "") ? data.theme[k] : DEFAULT_THEME[k]);
    live = () => {
      const s = $("#sample"); if (!s) return;
      s.querySelector(".s-hero").style.background = `linear-gradient(120deg, ${col("navy")}, ${col("blue")})`;
      s.querySelector(".gold").style.background = col("gold"); s.querySelector(".blue").style.background = col("blue");
      s.querySelector(".lnk").style.color = col("blue");
    };
    return `
    <div class="head"><div><h1>Colors</h1><p>The three brand colors. Lighter and darker shades across the site are calculated from them automatically.</p></div>
      <button class="btn" data-act="theme-reset">Reset to original colors</button></div>
    <div class="card">
      <div class="swatches">
        ${[["blue", "Main color (royal blue)"], ["navy", "Dark color (navy)"], ["gold", "Accent color (gold)"]].map(([k, label]) => `<label class="swatch"><input type="color" data-path="theme.${k}" value="${col(k)}"><span><b>${label}</b><br><small class="hint">${col(k).toUpperCase()}</small></span></label>`).join("")}
      </div>
      <div class="lbl" style="margin-bottom:8px">Sample</div>
      <div class="sample" id="sample"><div class="s-hero"><b>Bringing Korea to your hands</b>Banners, footer and buttons use these colors.</div>
        <div class="s-body"><span class="s-btn gold" style="color:#111">Shop Now</span><span class="s-btn blue" style="color:#fff">Add to cart</span><b class="lnk">Link text</b></div></div>
      <p class="hint" style="margin-top:14px">Use “Preview my changes” at the top to see the colors on the real site.</p>
    </div>`;
  };

  /* ---------- Publish ---------- */
  function ghCfg() {
    const saved = ls.get(LS.gh) || {};
    let owner = saved.owner, repo = saved.repo;
    if (!owner && /\.github\.io$/.test(location.hostname)) { owner = location.hostname.split(".")[0]; repo = location.pathname.split("/")[1] || `${owner}.github.io`; }
    let token = ""; try { token = sessionStorage.getItem(LS.token) || localStorage.getItem(LS.token) || ""; } catch (e) {}
    return { owner: owner || "anas7007", repo: repo || "elf-shop", branch: saved.branch || "main", remember: saved.remember !== false, token };
  }
  function saveGh(part) {
    const g = Object.assign(ghCfg(), part);
    ls.set(LS.gh, { owner: g.owner.trim(), repo: g.repo.trim(), branch: g.branch.trim(), remember: g.remember });
    try {
      sessionStorage.removeItem(LS.token); localStorage.removeItem(LS.token);
      if (g.token) (g.remember ? localStorage : sessionStorage).setItem(LS.token, g.token.trim());
    } catch (e) {}
  }
  views.publish = () => {
    const g = ghCfg(); const d = isDirty();
    const pending = data.products.reduce((n, p) => n + p.images.filter(s => s.startsWith("data:")).length, 0);
    return `
    <div class="head"><div><h1>Publish</h1><p>Send your changes to the live site. Until you publish, only you can see them (with “Preview my changes”).</p></div></div>
    <div class="card">
      <h2>${d ? "You have unpublished changes" : "Nothing new to publish"}</h2>
      <p class="sub">${d ? `Publishing updates the store for all customers within 1–2 minutes${pending ? ` and uploads ${pending} new photo${pending === 1 ? "" : "s"}` : ""}.` : "The live site matches what you see here."}</p>
      <div class="bar"><input id="pub-msg" placeholder="What did you change? (optional note)" style="max-width:420px"><button class="btn gold lg" data-act="publish" ${d && g.token ? "" : "disabled"}>Publish to live site</button>
        ${d ? `<button class="btn danger" data-act="discard">Discard my changes</button>` : ""}</div>
      ${g.token ? "" : `<div class="note">Connect to GitHub below first — it only needs to be done once on this device.</div>`}
      <div class="progress" id="pub-progress">${esc(state.busy)}</div>
    </div>
    <div class="card"><h2>GitHub connection</h2><p class="sub">The site's files live in your GitHub repository. The panel needs an access token to save changes there. The token is kept only in this browser — it is never written into the website.</p>
      <div class="grid3" style="margin-bottom:14px">
        <label class="f"><span>GitHub username / organisation</span><input id="gh-owner" value="${esc(g.owner)}"></label>
        <label class="f"><span>Repository</span><input id="gh-repo" value="${esc(g.repo)}"></label>
        <label class="f"><span>Branch the site is published from</span><input id="gh-branch" value="${esc(g.branch)}"></label>
      </div>
      <div class="grid2" style="margin-bottom:14px">
        <label class="f"><span>Access token</span><input id="gh-token" type="password" autocomplete="off" value="${esc(g.token)}" placeholder="github_pat_…"></label>
        <label class="check" style="align-self:end"><input type="checkbox" id="gh-remember" ${g.remember ? "checked" : ""}>Remember on this device</label>
      </div>
      <div class="bar"><button class="btn primary" data-act="gh-save">Save and test connection</button>${g.token ? `<button class="btn danger" data-act="gh-forget">Disconnect</button>` : ""}<span id="gh-result"></span></div>
      <details><summary><b>How do I get an access token?</b></summary>
        <ol class="steps" style="margin-top:10px">
          <li>Sign in to GitHub and open <a target="_blank" rel="noopener" href="https://github.com/settings/personal-access-tokens/new">Settings → Developer settings → Fine-grained tokens → Generate new token</a>.</li>
          <li>Name it “Elf Shop admin” and choose an expiry date.</li>
          <li>Under <b>Repository access</b> choose <b>Only select repositories</b> and pick <code>${esc(g.repo)}</code>.</li>
          <li>Under <b>Permissions → Repository permissions</b> set <b>Contents</b> to <b>Read and write</b>.</li>
          <li>Click <b>Generate token</b>, copy it, and paste it above.</li>
        </ol>
        <p class="hint" style="margin-top:10px">Treat the token like a password: anyone who has it can change the site. Don't use this panel on a shared computer with “Remember” ticked.</p>
      </details>
    </div>
    <div class="card"><h2>Backup and manual update</h2><p class="sub">Without GitHub you can download the data file and replace <code>assets/js/data.js</code> in the site's files yourself. You can also load a backup.</p>
      <div class="bar"><button class="btn" data-act="download">Download data.js</button><label class="btn">Load a backup file…<input type="file" accept=".js,.json" data-import hidden></label></div>
    </div>`;
  };

  /* =======================================================
     RENDER + EVENTS
     ======================================================= */
  function render() {
    const r = route(); live = null;
    const fn = views[r.name] || views.dashboard;
    $("#view").innerHTML = fn(r.arg);
    refreshChrome();
    if (live) live();
  }
  window.addEventListener("hashchange", () => { render(); window.scrollTo(0, 0); });

  document.addEventListener("input", e => {
    const el = e.target;
    if (el.dataset.path) {
      let v = el.type === "checkbox" ? el.checked : el.value;
      if (el.dataset.kind === "num") v = el.value === "" ? null : Number(el.value);
      setPath(data, el.dataset.path, v);
      if (el.dataset.path.startsWith("settings.heroProducts")) data.settings.heroProducts = [0, 1, 2].map(n => data.settings.heroProducts[n] || "");
      save(); if (live) live();
    } else if (el.dataset.text) {
      const [l, k] = el.dataset.text.split("|"); const v = el.value;
      if (!v.trim() || v === TEXTS[l][k]) { delete data.texts[l][k]; el.classList.remove("changed"); }
      else { data.texts[l][k] = v; el.classList.add("changed"); }
      save();
    } else if (el.dataset.tag) {
      const [i, tag] = el.dataset.tag.split("|"); const p = data.products[i];
      p.tags = p.tags.filter(t => t !== tag); if (el.checked) p.tags.push(tag);
      save();
    } else if (el.dataset.filter) {
      state[el.dataset.filter] = el.value;
      if ($("#rows")) $("#rows").innerHTML = productRows();
      if ($("#trows")) $("#trows").innerHTML = textRows();
    }
  });

  document.addEventListener("change", async e => {
    const el = e.target;
    if (el.dataset.rerender !== undefined) { save(true); render(); }
    else if (el.dataset.rename) rename(el);
    else if (el.dataset.upload !== undefined) { await addPhotos(Number(el.dataset.upload), el.files); }
    else if (el.dataset.import !== undefined) importFile(el.files[0]);
    else if (el.dataset.path && /\.name\.en$/.test(el.dataset.path) && /^products\.\d+\./.test(el.dataset.path)) {
      // give brand-new products a readable link name based on their English name
      const i = Number(el.dataset.path.split(".")[1]); const p = data.products[i];
      if (/^new-product/.test(p.id) && slugify(el.value)) { changeProductId(p, uniqueId(slugify(el.value), data.products, p)); save(true); history.replaceState(null, "", "#product/" + encodeURIComponent(p.id)); render(); }
    }
  });

  const uniqueId = (wanted, list, self) => { let id = wanted, n = 2; while (list.some(x => x !== self && x.id === id)) id = `${wanted}-${n++}`; return id; };
  function changeProductId(p, id) {
    data.settings.heroProducts = data.settings.heroProducts.map(h => (h === p.id ? id : h));
    p.id = id;
  }
  function rename(el) {
    const isProduct = el.dataset.rename === "product";
    const list = isProduct ? data.products : data.categories; const item = list[Number(el.dataset.i)];
    const id = slugify(el.value);
    if (!id) { el.value = item.id; return toast("Use letters, numbers and dashes only.", true); }
    if (list.some(x => x !== item && x.id === id)) { el.value = item.id; return toast("That link name is already used.", true); }
    if (isProduct) { changeProductId(item, id); history.replaceState(null, "", "#product/" + encodeURIComponent(id)); }
    else { data.products.forEach(p => { if (p.cat === item.id) p.cat = id; }); item.id = id; }
    save(true); render();
  }

  const actions = {
    preview(el) { save(true); ls.set(LS.preview, true); window.open(el.dataset.url || "index.html", "_blank"); },
    "p-add"() {
      const id = uniqueId("new-product", data.products);
      data.products.unshift({ id, cat: state.cat || (data.categories[0] || {}).id || "", price: 0, oldPrice: null, tags: ["new"], size: "", hidden: true, images: [],
        art: { type: "bottle", c1: "#EEF0FF", c2: "#2B35D8", label: "" }, name: { ar: "", en: "", ko: "" }, desc: { ar: "", en: "", ko: "" }, usage: { ar: "", en: "", ko: "" } });
      save(true); location.hash = "#product/" + id;
    },
    "p-dup"(el) {
      const src = data.products[el.dataset.i]; const copy = clone(src);
      copy.id = uniqueId(src.id + "-copy", data.products); copy.hidden = true;
      data.products.splice(Number(el.dataset.i) + 1, 0, copy); save(true); location.hash = "#product/" + copy.id;
    },
    "p-del"(el) {
      const p = data.products[el.dataset.i];
      if (!confirm(`Delete “${p.name.en || p.name.ar || p.id}”? This removes it from the shop when you publish.`)) return;
      data.products.splice(el.dataset.i, 1); data.settings.heroProducts = data.settings.heroProducts.map(h => (h === p.id ? "" : h));
      save(true); if (route().name === "product") location.hash = "#products"; else render();
    },
    "p-move"(el) { move(data.products, el); },
    "img-del"(el) { data.products[el.dataset.i].images.splice(el.dataset.n, 1); save(true); render(); },
    "img-main"(el) { const im = data.products[el.dataset.i].images; im.unshift(im.splice(el.dataset.n, 1)[0]); save(true); render(); },
    "c-add"() {
      const id = uniqueId("new-category", data.categories);
      data.categories.push({ id, art: { type: "jar", c1: "#EEF0FF", c2: "#2B35D8", label: "" }, name: { ar: "قسم جديد", en: "New category", ko: "새 카테고리" }, desc: { ar: "", en: "", ko: "" } });
      save(true); render(); window.scrollTo(0, document.body.scrollHeight);
    },
    "c-del"(el) { if (confirm("Delete this category?")) { data.categories.splice(el.dataset.i, 1); save(true); render(); } },
    "c-move"(el) { move(data.categories, el); },
    "r-add"() { data.reviews.push({ name: "", city: { ar: "", en: "", ko: "" }, text: { ar: "", en: "", ko: "" } }); save(true); render(); window.scrollTo(0, document.body.scrollHeight); },
    "r-del"(el) { if (confirm("Delete this review?")) { data.reviews.splice(el.dataset.i, 1); save(true); render(); } },
    "theme-reset"() { data.theme = {}; save(true); render(); },
    discard() {
      if (!confirm("Discard all unpublished changes and go back to the live version?")) return;
      data = normalize(clone(base)); clearTimeout(saveTimer); ls.del(LS.draft); ls.del(LS.dbase); ls.set(LS.preview, false); render(); toast("Changes discarded.");
    },
    download() {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([serialize(Object.assign(clone(data), { updatedAt: new Date().toISOString() }))], { type: "text/javascript" }));
      a.download = "data.js"; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    },
    async "gh-save"() {
      saveGh({ owner: $("#gh-owner").value, repo: $("#gh-repo").value, branch: $("#gh-branch").value || "main", token: $("#gh-token").value, remember: $("#gh-remember").checked });
      const out = $("#gh-result"); out.textContent = "Testing…";
      try {
        const repo = await gh("");
        if (repo.permissions && !repo.permissions.push) throw new Error("The token can read this repository but cannot write to it. Set Contents to “Read and write”.");
        await gh(`/git/ref/heads/${ghCfg().branch}`).catch(() => { throw new Error(`Branch “${ghCfg().branch}” was not found. The repository's main branch is “${repo.default_branch}”.`); });
        render(); $("#gh-result").innerHTML = `<span class="chip" style="background:var(--ok-bg);color:var(--ok)">✓ Connected to ${esc(repo.full_name)}</span>`;
      } catch (err) { out.innerHTML = `<span class="chip red">${esc(explain(err))}</span>`; }
    },
    "gh-forget"() { saveGh({ token: "" }); render(); toast("Disconnected. The token was removed from this browser."); },
    async publish(el) {
      el.disabled = true;
      try { await publish(($("#pub-msg").value || "").trim()); toast("Published! The live site updates in 1–2 minutes."); }
      catch (err) { state.busy = ""; toast("Publishing failed: " + explain(err), true); }
      render();
    }
  };
  function move(list, el) {
    const i = Number(el.dataset.i), j = i + Number(el.dataset.d);
    if (j < 0 || j >= list.length) return;
    [list[i], list[j]] = [list[j], list[i]]; save(true); render();
  }
  document.addEventListener("click", e => {
    const el = e.target.closest("[data-act]");
    if (el && actions[el.dataset.act]) { e.preventDefault(); actions[el.dataset.act](el); }
  });

  /* ---------- photos ---------- */
  function resizeImage(file, max = 900, quality = 0.82) {
    return new Promise((resolve, reject) => {
      const img = new Image(); const url = URL.createObjectURL(file);
      img.onload = () => {
        const k = Math.min(1, max / Math.max(img.width, img.height));
        const c = document.createElement("canvas"); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
        const ctx = c.getContext("2d"); ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, c.width, c.height); ctx.drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url); resolve(c.toDataURL("image/jpeg", quality));
      };
      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("not an image")); };
      img.src = url;
    });
  }
  async function addPhotos(i, files) {
    let bad = 0;
    for (const f of Array.from(files || [])) { try { data.products[i].images.push(await resizeImage(f)); } catch (e) { bad++; } }
    save(true); render();
    if (bad) toast(`${bad} file(s) could not be read as images.`, true);
  }

  /* ---------- import / export ---------- */
  const HEADER = `/* =========================================================
   THE ELF SHOP — STORE DATA
   ---------------------------------------------------------
   This file holds everything the admin panel manages:
   settings, colors, categories, products, reviews and
   text changes. Edit it from  /admin.html  (recommended).
   ========================================================= */
`;
  const serialize = d => `${HEADER}window.ELF_DATA = ${JSON.stringify(d, null, 2)};\n`;
  function importFile(file) {
    if (!file) return;
    const fr = new FileReader();
    fr.onload = () => {
      try {
        const txt = String(fr.result); const from = txt.indexOf("{", Math.max(0, txt.indexOf("window.ELF_DATA")));
        const d = JSON.parse(txt.slice(from, txt.lastIndexOf("}") + 1));
        if (!d.settings || !Array.isArray(d.products)) throw new Error("bad");
        if (!confirm(`Load this backup (${d.products.length} products)? It replaces your current draft.`)) return;
        data = normalize(d); save(true); render(); toast("Backup loaded as a draft. Publish to make it live.");
      } catch (e) { toast("That file is not a valid Elf Shop data file.", true); }
    };
    fr.readAsText(file);
  }

  /* ---------- GitHub ---------- */
  async function gh(path, opts = {}) {
    const g = ghCfg();
    if (!g.token) throw new Error("Not connected to GitHub.");
    const res = await fetch(`https://api.github.com/repos/${encodeURIComponent(g.owner)}/${encodeURIComponent(g.repo)}${path}`, {
      method: opts.method || "GET",
      headers: Object.assign({ Accept: opts.raw ? "application/vnd.github.raw+json" : "application/vnd.github+json", Authorization: `Bearer ${g.token}`, "X-GitHub-Api-Version": "2022-11-28" }, opts.body ? { "Content-Type": "application/json" } : {}),
      body: opts.body ? JSON.stringify(opts.body) : undefined
    });
    if (!res.ok) { const j = await res.json().catch(() => ({})); const err = new Error(j.message || res.statusText); err.status = res.status; throw err; }
    return opts.raw ? res.text() : res.json();
  }
  const explain = err => err.status === 401 ? "GitHub rejected the token (wrong or expired)."
    : err.status === 403 ? "The token is not allowed to do this. Check that Contents is set to “Read and write” for this repository."
    : err.status === 404 ? "Repository or branch not found — check the names, and that the token has access to this repository."
    : err.status === 409 || err.status === 422 ? "The site changed on GitHub while publishing. Please try again."
    : err.message || "Unknown error";
  function utf8ToB64(str) {
    const bytes = new TextEncoder().encode(str); let bin = "";
    for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    return btoa(bin);
  }
  async function publish(note) {
    const g = ghCfg(); const step = t => { state.busy = t; const el = $("#pub-progress"); if (el) el.textContent = t; };
    save(true);
    step("Checking the live site…");
    const ref = await gh(`/git/ref/heads/${g.branch}`);
    // don't silently overwrite changes published from another device
    const remote = await gh(`/contents/assets/js/data.js?ref=${encodeURIComponent(g.branch)}`, { raw: true }).catch(() => "");
    const m = /"updatedAt":\s*"([^"]+)"/.exec(remote);
    if (m && m[1] > (ls.get(LS.dbase) || base.updatedAt) && !confirm("The live site was updated from another device after you started editing. Publishing now will replace those changes with yours. Continue?")) { step(""); throw new Error("cancelled"); }

    const out = clone(data); const files = []; const stamp = Date.now().toString(36);
    out.products.forEach(p => {
      p.images = p.images.map((src, n) => {
        const d = /^data:image\/(\w+);base64,(.+)$/.exec(src); if (!d) return src;
        const path = `assets/products/${p.id}-${stamp}${n}.${d[1] === "jpeg" ? "jpg" : d[1]}`;
        files.push({ path, b64: d[2] }); uploaded[path] = src; return path;
      });
    });
    out.updatedAt = new Date().toISOString();
    files.push({ path: "assets/js/data.js", b64: utf8ToB64(serialize(out)) });

    const commit = await gh(`/git/commits/${ref.object.sha}`);
    const tree = [];
    for (let i = 0; i < files.length; i++) {
      step(`Uploading ${i + 1} of ${files.length}…`);
      const blob = await gh("/git/blobs", { method: "POST", body: { content: files[i].b64, encoding: "base64" } });
      tree.push({ path: files[i].path, mode: "100644", type: "blob", sha: blob.sha });
    }
    step("Saving…");
    const newTree = await gh("/git/trees", { method: "POST", body: { base_tree: commit.tree.sha, tree } });
    const newCommit = await gh("/git/commits", { method: "POST", body: { message: "Update store from admin panel" + (note ? ": " + note : ""), tree: newTree.sha, parents: [ref.object.sha] } });
    await gh(`/git/refs/heads/${g.branch}`, { method: "PATCH", body: { sha: newCommit.sha } });

    data = normalize(out); base = clone(data);
    ls.set(LS.base, base); ls.del(LS.draft); ls.del(LS.dbase); ls.set(LS.preview, false);
    step("");
  }

  /* ---------- boot ---------- */
  window.addEventListener("beforeunload", () => { clearTimeout(saveTimer); try { if (isDirty()) ls.set(LS.draft, data); } catch (e) {} });
  render();
})();
