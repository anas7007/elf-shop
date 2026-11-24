/* =========================================================
   PAGE CONTROLLERS
   ========================================================= */
(function () {
  const E = window.ELF;
  const { t, L, esc, money, icon, CFG } = E;
  const CATS = E.cats.map(c => c.id);
  const CAT_ART = Object.fromEntries(E.cats.map(c => [c.id, c.art]));
  const $ = (s, r = document) => r.querySelector(s);
  const on = (fn) => { fn(); document.addEventListener("elf:lang", fn); };

  /* =================== HOME =================== */
  function home() {
    on(() => {
      $("#cats").innerHTML = CATS.map((c, i) => `
        <a class="cat-tile reveal" style="--d:${i * 60}ms" href="shop.html?cat=${c}">
          <div class="cat-art">${window.elfArt(CAT_ART[c], 2)}</div>
          <div class="cat-info"><h3>${esc(t("cat." + c))}</h3><p>${esc(t("cat." + c + ".d"))}</p></div>
          <span class="cat-go">${icon("arrow", "flip")}</span>
        </a>`).join("");

      const best = E.products.filter(p => (p.tags || []).includes("best")).slice(0, 8);
      $("#best").innerHTML = best.map(E.productCard).join("");

      const offers = E.products.filter(p => p.oldPrice).slice(0, 4);
      $("#offers").innerHTML = offers.map(E.productCard).join("");
      $("#offers").closest("section").hidden = !offers.length;
      $("#reviews").closest("section").hidden = !window.ELF_REVIEWS.length;

      $("#reviews").innerHTML = window.ELF_REVIEWS.map(E.reviewCard).join("");

      // hero floating product cards
      let heroP = (CFG.heroProducts || []).map(E.getProduct).filter(Boolean);
      if (heroP.length < 3) heroP = heroP.concat(E.products.filter(p => !heroP.includes(p))).slice(0, 3);
      $("#hero-cards").innerHTML = heroP.map((p, i) => `
        <a class="hero-card hc${i + 1}" href="${E.productUrl(p)}">
          <div class="hc-media">${E.media(p)}</div>
          <div><b>${esc(L(p.name))}</b><span>${money(p.price)}</span></div>
        </a>`).join("");
      E.observeReveals();
    });
  }

  /* =================== SHOP =================== */
  function shop() {
    const params = new URLSearchParams(location.search);
    const state = { cat: CATS.includes(params.get("cat")) ? params.get("cat") : "all", q: params.get("q") || "", sort: params.get("sort") || "featured", sale: params.get("sale") === "1" };
    const input = $("#shop-q");
    input.value = state.q;

    function renderChips() {
      $("#chips").innerHTML = ["all", ...CATS].map(c =>
        `<button type="button" class="chip ${state.cat === c ? "active" : ""}" data-cat="${c}">${esc(t("cat." + c))}<small>${c === "all" ? E.products.length : E.products.filter(p => p.cat === c).length}</small></button>`).join("");
      const sel = $("#shop-sort");
      sel.innerHTML = ["featured", "priceAsc", "priceDesc", "new"].map(s => `<option value="${s}" ${state.sort === s ? "selected" : ""}>${esc(t("sort." + s))}</option>`).join("");
      $("#shop-sale").checked = state.sale;
    }
    function render() {
      const q = state.q.trim().toLowerCase();
      let list = E.products.filter(p =>
        (state.cat === "all" || p.cat === state.cat) &&
        (!state.sale || p.oldPrice) &&
        (!q || [p.name.ar, p.name.en, p.name.ko, p.cat, t("cat." + p.cat)].join(" ").toLowerCase().includes(q)));
      if (state.sort === "priceAsc") list = list.slice().sort((a, b) => a.price - b.price);
      if (state.sort === "priceDesc") list = list.slice().sort((a, b) => b.price - a.price);
      if (state.sort === "new") list = list.slice().sort((a, b) => ((b.tags || []).includes("new") ? 1 : 0) - ((a.tags || []).includes("new") ? 1 : 0));
      $("#shop-count").textContent = `${list.length} ${t("shop.count")}`;
      $("#shop-title").textContent = state.cat === "all" ? t("shop.title") : t("cat." + state.cat);
      $("#grid").innerHTML = list.length ? list.map(E.productCard).join("") :
        `<div class="empty">${icon("search")}<p>${esc(t("shop.empty"))}</p><button type="button" class="btn btn-outline" id="reset">${esc(t("shop.reset"))}</button></div>`;
      E.observeReveals($("#grid"));
      const u = new URLSearchParams();
      if (state.cat !== "all") u.set("cat", state.cat);
      if (state.q) u.set("q", state.q);
      if (state.sort !== "featured") u.set("sort", state.sort);
      if (state.sale) u.set("sale", "1");
      history.replaceState(null, "", "shop.html" + (u.toString() ? "?" + u : ""));
    }
    document.addEventListener("click", e => {
      const c = e.target.closest("[data-cat]");
      if (c) { state.cat = c.dataset.cat; renderChips(); render(); }
      if (e.target.closest("#reset")) { Object.assign(state, { cat: "all", q: "", sale: false, sort: "featured" }); input.value = ""; renderChips(); render(); }
    });
    input.addEventListener("input", () => { state.q = input.value; render(); });
    $("#shop-sort").addEventListener("change", e => { state.sort = e.target.value; render(); });
    $("#shop-sale").addEventListener("change", e => { state.sale = e.target.checked; render(); });
    on(() => { renderChips(); render(); });
    if (state.q) E.track("Search", { search_string: state.q });
  }

  /* =================== PRODUCT =================== */
  function product() {
    const id = new URLSearchParams(location.search).get("id");
    const p = E.getProduct(id);
    const root = $("#product");
    if (!p) { root.innerHTML = `<div class="empty">${icon("search")}<h2>${esc(t("p.notfound"))}</h2><a class="btn btn-dark" href="shop.html">${esc(t("hero.cta"))}</a></div>`; return; }
    let qty = 1, active = 0, tab = "desc";
    E.track("ViewContent", { content_ids: [p.id], content_type: "product", value: p.price, currency: "EGP" });

    function waText() {
      return `${t("p.wa.msg")}\n• ${L(p.name)} × ${qty} — ${money(p.price * qty)}\n${E.absUrl(E.productUrl(p))}`;
    }
    function render() {
      document.title = `${L(p.name)} | ${CFG.storeName}`;
      const n = E.mediaCount(p);
      // reviews about this product first, then general store reviews (not ones about other products)
      const allRevs = (window.ELF_REVIEWS || []).filter(r => !/^customer name$/i.test((r.name || "").trim())); // skip unfilled placeholders
      const revs = allRevs.filter(r => r.product === p.id).concat(allRevs.filter(r => !r.product)).slice(0, 6);
      const related = E.products.filter(x => x.cat === p.cat && x.id !== p.id).concat(E.products.filter(x => x.cat !== p.cat && (x.tags || []).includes("best"))).slice(0, 4);
      root.innerHTML = `
        <nav class="crumbs"><a href="index.html">${esc(t("nav.home"))}</a><span>/</span><a href="shop.html?cat=${p.cat}">${esc(t("cat." + p.cat))}</a><span>/</span><b>${esc(L(p.name))}</b></nav>
        <div class="pd">
          <div class="pd-gallery">
            <div class="pd-main">${E.media(p, active)}<div class="card-badges">${E.badges(p)}</div></div>
            <div class="pd-thumbs">${Array.from({ length: n }, (_, i) => `<button type="button" class="${i === active ? "active" : ""}" data-img="${i}" aria-label="${i + 1}">${E.media(p, i)}</button>`).join("")}</div>
          </div>
          <div class="pd-info">
            <a class="pd-cat" href="shop.html?cat=${p.cat}">${esc(t("cat." + p.cat))}</a>
            <h1>${esc(L(p.name))}</h1>
            <div class="pd-price">${money(p.price)}${p.oldPrice ? `<s>${money(p.oldPrice)}</s><span class="save" dir="ltr">-${Math.round((1 - p.price / p.oldPrice) * 100)}%</span>` : ""}</div>
            <p class="pd-short">${esc(L(p.desc))}</p>
            ${p.size ? `<div class="pd-meta"><span>${esc(t("p.size"))}</span><b dir="ltr">${esc(p.size)}</b></div>` : ""}
            <div class="pd-buy">
              <div class="qty lg">
                <button type="button" data-pq="-1" aria-label="-">${icon("minus")}</button>
                <span>${qty}</span>
                <button type="button" data-pq="1" aria-label="+">${icon("plus")}</button>
              </div>
              <button type="button" class="btn btn-dark grow" id="pd-add" ${p.soldOut ? "disabled" : ""}>${icon("bag")}<span>${esc(t(p.soldOut ? "badge.soldout" : "p.add"))}</span></button>
            </div>
            <a class="btn btn-wa block lg" id="pd-wa" href="${E.waLink(CFG.whatsappOrders, waText())}" target="_blank" rel="noopener">${icon("whatsapp")}<span>${esc(t("p.wa"))}</span></a>
            <ul class="pd-perks">
              <li>${icon("shield")}${esc(t("p.authentic"))}</li>
              <li>${icon("truck")}${esc(t("p.cod"))}</li>
              <li>${icon("wallet")}InstaPay</li>
            </ul>
            <div class="tabs" role="tablist">
              ${["desc", "usage", "delivery"].map(k => `<button type="button" role="tab" class="${tab === k ? "active" : ""}" data-tab="${k}" aria-selected="${tab === k}">${esc(t("p." + k))}</button>`).join("")}
            </div>
            <div class="tab-panel" role="tabpanel">${tab === "delivery"
              ? `<p>${esc(t("p.delivery.t"))}</p><ul class="ship-rules">${E.shippingRules().map(l => `<li>${icon("truck")}<span>${esc(l)}</span></li>`).join("")}</ul>`
              : esc(tab === "desc" ? L(p.desc) : L(p.usage))}</div>
            <button type="button" class="link-btn" id="pd-share">${icon("share")}${esc(t("p.share"))}</button>
          </div>
        </div>
        ${revs.length ? `<section class="section-sm pd-reviews">
          <div class="sec-head"><h2>${esc(t("p.reviews"))}</h2><a class="link-btn" href="${esc(CFG.social.facebook)}" target="_blank" rel="noopener">${esc(t("reviews.more"))} →</a></div>
          <div class="reviews">${revs.map(E.reviewCard).join("")}</div>
        </section>` : ""}
        <section class="section-sm">
          <div class="sec-head"><h2>${esc(t("p.related"))}</h2></div>
          <div class="grid">${related.map(E.productCard).join("")}</div>
        </section>`;
      E.observeReveals(root);
    }
    root.addEventListener("click", async e => {
      const img = e.target.closest("[data-img]");
      if (img) { active = Number(img.dataset.img); render(); return; }
      const pq = e.target.closest("[data-pq]");
      if (pq) { qty = Math.max(1, Math.min(99, qty + Number(pq.dataset.pq))); render(); return; }
      const tb = e.target.closest("[data-tab]");
      if (tb) { tab = tb.dataset.tab; render(); return; }
      if (e.target.closest("#pd-add")) { E.Cart.add(p.id, qty); return; }
      if (e.target.closest("#pd-wa")) { E.track("Contact", { content_ids: [p.id], method: "whatsapp" }); return; }
      if (e.target.closest("#pd-share")) {
        const url = location.href;
        try { if (navigator.share) await navigator.share({ title: L(p.name), url }); else { await navigator.clipboard.writeText(url); E.toast(t("p.copied")); } } catch (err) {}
      }
    });
    on(render);
  }

  /* =================== CHECKOUT =================== */
  function checkout() {
    const root = $("#checkout");
    let pay = "cod", done = null, initiated = false;
    const form = {};

    const shipText = ship => ship == null ? t(form.gov ? "co.shipping.tbc" : "co.shipping.choose") : ship === 0 ? t("co.shipping.free") : money(ship);
    function summary() {
      const items = E.Cart.items();
      const ship = E.Cart.shipping(form.gov);
      const total = E.Cart.subtotal() + (ship || 0);
      return `
        <aside class="co-summary">
          <h3>${esc(t("co.summary"))}</h3>
          <div class="co-items">${items.map(i => `
            <div class="co-item">
              <div class="ci-media">${E.media(i.p)}<b>${i.qty}</b></div>
              <span>${esc(L(i.p.name))}</span>
              <strong>${money(i.p.price * i.qty)}</strong>
            </div>`).join("")}</div>
          ${E.shipBar()}
          <div class="row-between"><span>${esc(t("cart.subtotal"))}</span><b>${money(E.Cart.subtotal())}</b></div>
          <div class="row-between"><span>${esc(t("co.shipping"))}${form.gov && ship != null ? ` <small class="muted">(${esc(E.govName(form.gov))})</small>` : ""}</span><b class="${ship == null ? "muted" : ""}">${esc(shipText(ship))}</b></div>
          <div class="row-between total"><span>${esc(t("co.total"))}</span><b>${money(total)}</b></div>
          <p class="form-note">${icon("shield")}<span>${esc(t("co.secure"))}</span></p>
        </aside>`;
    }
    const field = (name, label, type = "text", req = true, extra = "") =>
      `<label class="field ${type === "textarea" ? "full" : ""}"><span>${esc(t(label))}${req ? " *" : ""}</span>${type === "textarea"
        ? `<textarea name="${name}" rows="3" ${req ? "required" : ""}>${esc(form[name] || "")}</textarea>`
        : `<input name="${name}" type="${type}" ${req ? "required" : ""} value="${esc(form[name] || "")}" ${extra}>`}</label>`;

    function instapayBox(orderId) {
      return `<ol class="ip-steps">
        <li>${esc(t("co.ip.step1"))} <span class="ip-num" dir="ltr">${CFG.instapayNumber}</span>
          <button type="button" class="mini-btn" data-copy="${CFG.instapayNumber}">${icon("copy")}${esc(t("co.copy"))}</button></li>
        <li>${esc(t("co.ip.step2"))}</li>
        <li>${esc(t("co.ip.step3"))}<div class="ip-links">
          <a href="${E.waLink(CFG.whatsappPayments, `InstaPay screenshot${orderId ? " — Order " + orderId : ""}`)}" target="_blank" rel="noopener">${icon("whatsapp")}<span dir="ltr">${CFG.whatsappPaymentsDisplay}</span></a>
          <a href="mailto:${CFG.email}?subject=${encodeURIComponent("InstaPay payment" + (orderId ? " — " + orderId : ""))}">${icon("mail")}<span dir="ltr">${CFG.email}</span></a>
        </div></li>
      </ol>`;
    }

    function render() {
      if (done) return renderDone();
      const items = E.Cart.items();
      if (!items.length) {
        root.innerHTML = `<div class="empty">${icon("bag")}<p>${esc(t("co.empty"))}</p><a class="btn btn-dark" href="shop.html">${esc(t("hero.cta"))}</a></div>`;
        return;
      }
      if (!initiated) { initiated = true; E.track("InitiateCheckout", { value: E.Cart.subtotal(), currency: "EGP", num_items: E.Cart.count() }); }
      const govs = window.ELF_GOVERNORATES;
      root.innerHTML = `
        <div class="co">
          <form class="co-form" id="co-form" novalidate>
            <section class="co-card">
              <h3><span class="step">1</span>${esc(t("co.details"))}</h3>
              <div class="fields">
                ${field("name", "co.name", "text", true, 'autocomplete="name"')}
                ${field("phone", "co.phone", "tel", true, 'autocomplete="tel" dir="ltr" inputmode="tel"')}
                ${field("whatsapp", "co.phone2", "tel", false, 'dir="ltr" inputmode="tel"')}
                ${field("email", "co.email", "email", false, 'autocomplete="email" dir="ltr"')}
                <label class="field"><span>${esc(t("co.gov"))} *</span>
                  <select name="gov" required><option value="">${esc(t("co.gov.choose"))}</option>
                  ${govs.map(g => { const v = g[1]; return `<option value="${v}" ${form.gov === v ? "selected" : ""}>${E.lang === "ar" ? g[0] : g[1]}</option>`; }).join("")}</select></label>
                ${field("city", "co.city")}
                ${field("address", "co.address", "textarea")}
                ${field("notes", "co.notes", "textarea", false)}
              </div>
            </section>
            <section class="co-card">
              <h3><span class="step">2</span>${esc(t("co.payment"))}</h3>
              <div class="pay-opts">
                <label class="pay-opt ${pay === "cod" ? "active" : ""}">
                  <input type="radio" name="pay" value="cod" ${pay === "cod" ? "checked" : ""}>
                  <span class="po-ic">${icon("truck")}</span>
                  <span><b>${esc(t("co.cod"))}</b><small>${esc(t("co.cod.d"))}</small></span>
                </label>
                <label class="pay-opt ${pay === "instapay" ? "active" : ""}">
                  <input type="radio" name="pay" value="instapay" ${pay === "instapay" ? "checked" : ""}>
                  <span class="po-ic ip">${icon("wallet")}</span>
                  <span><b>${esc(t("co.instapay"))}</b><small>${esc(t("co.instapay.d"))}</small></span>
                </label>
              </div>
              ${pay === "instapay" ? `<div class="ip-box">${instapayBox()}</div>` : ""}
            </section>
            <p class="form-msg" role="status"></p>
            <button class="btn btn-gold block lg" type="submit" id="co-submit">${icon("check")}<span>${esc(t("co.place"))}</span></button>
            <div class="or"><span>${esc(t("co.or"))}</span></div>
            <a class="btn btn-wa block" id="co-wa" href="#" target="_blank" rel="noopener">${icon("whatsapp")}<span>${esc(t("co.wa"))}</span></a>
          </form>
          ${summary()}
        </div>`;
      updateWa();
    }

    function readForm() {
      const f = $("#co-form"); if (!f) return;
      new FormData(f).forEach((v, k) => { if (k !== "pay") form[k] = v; });
    }
    function orderLines(orderId) {
      const lines = [];
      if (orderId) lines.push(`Order: ${orderId}`);
      if (form.name) lines.push(`${t("co.name")}: ${form.name}`);
      if (form.phone) lines.push(`${t("co.phone")}: ${form.phone}`);
      if (form.gov || form.city) lines.push(`${t("co.gov")}: ${[form.gov && E.govName(form.gov), form.city].filter(Boolean).join(" — ")}`);
      if (form.address) lines.push(`${t("co.address")}: ${form.address}`);
      if (form.notes) lines.push(`${t("co.notes")}: ${form.notes}`);
      lines.push(`${t("co.payment")}: ${pay === "cod" ? t("co.cod") : t("co.instapay")}`);
      const ship = E.Cart.shipping(form.gov);
      lines.push(`${t("co.shipping")}: ${shipText(ship)}`);
      lines.push(`${t("co.total")}: ${money(E.Cart.subtotal() + (ship || 0))}`);
      return lines;
    }
    function refreshSummary() {
      const old = $(".co-summary", root); if (!old) return;
      old.outerHTML = summary();
    }
    function updateWa() {
      const a = $("#co-wa"); if (a) a.href = E.waLink(CFG.whatsappOrders, E.Cart.waText(orderLines()));
    }

    root.addEventListener("input", () => { readForm(); updateWa(); });
    root.addEventListener("change", e => {
      readForm();
      if (e.target.name === "pay") { pay = e.target.value; render(); }
      else if (e.target.name === "gov") { refreshSummary(); updateWa(); }
    });
    root.addEventListener("click", async e => {
      const cp = e.target.closest("[data-copy]");
      if (cp) { try { await navigator.clipboard.writeText(cp.dataset.copy); } catch (err) {} cp.innerHTML = icon("check") + esc(t("co.copied")); return; }
      if (e.target.closest("#co-wa")) E.track("Contact", { method: "whatsapp_checkout" });
    });
    root.addEventListener("submit", async e => {
      e.preventDefault();
      readForm();
      const msg = $(".form-msg", root);
      const f = $("#co-form");
      const missing = [...f.querySelectorAll("[required]")].filter(i => !String(i.value).trim());
      f.querySelectorAll(".invalid").forEach(i => i.classList.remove("invalid"));
      if (missing.length) { missing.forEach(i => i.classList.add("invalid")); msg.className = "form-msg err"; msg.textContent = t("co.required"); missing[0].focus(); return; }
      if (!/^\+?[0-9\s-]{10,15}$/.test(form.phone.trim())) { f.phone.classList.add("invalid"); msg.className = "form-msg err"; msg.textContent = t("co.badphone"); f.phone.focus(); return; }

      const d = new Date();
      const orderId = `ELF-${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}-${Math.floor(1000 + Math.random() * 9000)}`;
      const items = E.Cart.items();
      const ship = E.Cart.shipping(form.gov);
      const total = E.Cart.subtotal() + (ship || 0);
      const btn = $("#co-submit"); btn.disabled = true; btn.querySelector("span").textContent = t("co.sending");

      const waText = E.Cart.waText(orderLines(orderId));
      try {
        await E.sendForm(`🛍️ New order ${orderId} — ${total} EGP (${pay === "cod" ? "COD" : "InstaPay"})`, {
          type: "Order", order_id: orderId, name: form.name, phone: form.phone, whatsapp: form.whatsapp || "-", email: form.email || "-",
          governorate: form.gov, city: form.city, address: form.address, notes: form.notes || "-",
          payment: pay === "cod" ? "Cash on Delivery" : "InstaPay (awaiting screenshot)",
          items: items.map(i => `${i.p.name.en} (${i.p.id}) × ${i.qty} = ${i.p.price * i.qty} EGP`).join(" | "),
          subtotal: E.Cart.subtotal() + " EGP", shipping: ship == null ? "To confirm" : ship === 0 ? "Free (0 EGP)" : ship + " EGP", total: total + " EGP"
        });
      } catch (err) { /* email is best-effort — WhatsApp step below still completes the order */ }

      E.track("Purchase", { value: total, currency: "EGP", content_ids: items.map(i => i.id), content_type: "product", num_items: E.Cart.count() });
      done = { orderId, total, pay, waText };
      E.store.set("elf_last_order", done);
      E.Cart.clear();
      window.scrollTo({ top: 0, behavior: "smooth" });
      render();
    });

    function renderDone() {
      root.innerHTML = `
        <div class="done">
          <div class="done-ic">${icon("check")}</div>
          <h2>${esc(t("ok.title"))}</h2>
          <p>${esc(t("ok.text"))}</p>
          <div class="order-id" dir="ltr">${esc(done.orderId)}</div>
          <div class="done-card">
            <h3>${esc(t("ok.next"))}</h3>
            <p>${esc(done.pay === "cod" ? t("ok.cod") : t("ok.ip"))}</p>
            ${done.pay === "instapay" ? `<div class="ip-box">${instapayBox(done.orderId)}</div>` : ""}
            <a class="btn btn-wa block lg" href="${E.waLink(CFG.whatsappOrders, done.waText)}" target="_blank" rel="noopener">${icon("whatsapp")}<span>${esc(t("ok.wa"))}</span></a>
            ${done.pay === "instapay" ? `<a class="btn btn-outline block" href="${E.waLink(CFG.whatsappPayments, `InstaPay screenshot — Order ${done.orderId} — ${done.total} EGP`)}" target="_blank" rel="noopener">${icon("whatsapp")}<span>${esc(t("ok.wa.pay"))}</span></a>
            <a class="btn btn-outline block" href="mailto:${CFG.email}?subject=${encodeURIComponent("InstaPay payment — " + done.orderId)}&body=${encodeURIComponent(`Order: ${done.orderId}\nTotal: ${done.total} EGP\n\n(attach screenshot)`)}">${icon("mail")}<span>${esc(t("ok.mail"))}</span></a>` : ""}
          </div>
          <a class="link-btn" href="shop.html">${esc(t("ok.home"))}</a>
        </div>`;
    }
    on(render);
    document.addEventListener("elf:cart", () => { if (!done) { readForm(); render(); } });
  }

  /* =================== CONTACT =================== */
  function contact() {
    const f = $("#contact-form");
    f.addEventListener("submit", async e => {
      e.preventDefault();
      const msg = $(".form-msg", f);
      const fd = Object.fromEntries(new FormData(f));
      if (fd._honey) return;
      if (!fd.name || !fd.message || (!fd.email && !fd.phone)) { msg.className = "form-msg err"; msg.textContent = t("co.required"); return; }
      const btn = f.querySelector("button[type=submit]"); btn.disabled = true;
      try {
        await E.sendForm(`✉️ Website inquiry — ${fd.subject || fd.name}`, { type: "Contact form", name: fd.name, email: fd.email || "-", phone: fd.phone || "-", subject: fd.subject || "-", message: fd.message });
        E.track("Contact", { method: "form" });
        if (fd.email) E.track("Lead", { content_name: "contact_form" });
        msg.className = "form-msg ok"; msg.textContent = t("contact.ok"); f.reset();
      } catch (err) { msg.className = "form-msg err"; msg.textContent = t("news.err"); }
      finally { btn.disabled = false; }
    });
  }

  const pages = { home, shop, product, checkout, contact };
  const fn = pages[document.body.dataset.page];
  if (fn) fn();
})();
