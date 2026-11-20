/* =========================================================
   THE ELF SHOP — CORE (shared by every page)
   ========================================================= */
(function () {
  const CFG = window.ELF_CONFIG;
  const I18N = window.ELF_I18N;
  const PRODUCTS = window.ELF_PRODUCTS;
  const LANGS = ["ar", "en", "ko"];

  /* ---------- safe storage ---------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };

  /* ---------- language ---------- */
  function detectLang() {
    const q = new URLSearchParams(location.search).get("lang");
    if (LANGS.includes(q)) return q;
    const saved = store.get("elf_lang");
    if (LANGS.includes(saved)) return saved;
    return "ar";
  }
  let lang = detectLang();
  const t = (k) => (I18N[lang] && I18N[lang][k]) || I18N.en[k] || k;
  const L = (obj) => (obj && (obj[lang] || obj.en)) || "";

  function applyLang() {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = t("meta.dir");
    html.dataset.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll("[data-i18n-ph]").forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
    document.querySelectorAll("[data-i18n-aria]").forEach(el => { el.setAttribute("aria-label", t(el.dataset.i18nAria)); });
    document.querySelectorAll(".lang-switch button").forEach(b => b.setAttribute("aria-pressed", b.dataset.lang === lang));
    const titleKey = document.body.dataset.title;
    document.title = (titleKey ? t(titleKey) + " | " : "") + CFG.storeName + " — " + t("brand.tagline");
  }
  function setLang(l) {
    if (!LANGS.includes(l) || l === lang) return;
    lang = l; store.set("elf_lang", l);
    applyLang(); renderCart();
    document.dispatchEvent(new CustomEvent("elf:lang", { detail: l }));
  }

  /* ---------- helpers ---------- */
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const money = n => {
    const v = Number(n).toLocaleString("en-US");
    return lang === "ar" ? `${v} ${CFG.currency.ar}` : `${CFG.currency[lang] || "EGP"} ${v}`;
  };
  const getProduct = id => PRODUCTS.find(p => p.id === id);
  const productUrl = p => `product.html?id=${encodeURIComponent(p.id)}`;
  const absUrl = rel => new URL(rel, location.href).href;
  const waLink = (num, text) => `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
  const media = (p, i = 0) => {
    const imgs = p.images || [];
    if (imgs.length) {
      const src = imgs[i % imgs.length];
      return `<img src="${esc(src)}" alt="${esc(L(p.name))}" loading="lazy">`;
    }
    return window.elfArt(p.art, i);
  };
  const mediaCount = p => (p.images && p.images.length) || 3;

  /* ---------- icons ---------- */
  const I = {
    bag: '<path d="M6 7h12l1 13H5L6 7z"/><path d="M9 7a3 3 0 0 1 6 0"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h10"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    check: '<path d="m5 12 5 5L20 7"/>',
    shield: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3z"/><path d="m9 12 2 2 4-4"/>',
    truck: '<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
    wallet: '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M16 15h2"/>',
    chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    pin: '<path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a1 1 0 0 1 1-1h10"/>',
    share: '<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.6-4.6M8.2 13.2l7.6 4.6"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',
    star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    whatsapp: '<path d="M12 2.5a9.5 9.5 0 0 0-8.2 14.3L2.5 21.5l4.8-1.3A9.5 9.5 0 1 0 12 2.5z" fill="none"/><path d="M8.6 7.4c.3-.6.6-.6.9-.6h.6c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .6l-.5.7c-.1.2-.2.3 0 .6.5.9 1.2 1.6 2.1 2.1.3.2.4.1.6 0l.7-.8c.2-.2.4-.2.6-.1l1.8.9c.3.1.4.2.4.4 0 .5-.1 1.2-.6 1.6-.5.5-1.4.8-2.2.6-1.2-.3-2.6-1-3.9-2.3-1.3-1.3-2-2.6-2.3-3.7-.2-.8 0-1.6.4-2.4z" fill="currentColor" stroke="none"/>',
    facebook: '<path d="M14 8h3V4h-3c-2.8 0-4 1.8-4 4.3V10H7v4h3v8h4v-8h3l1-4h-4V8.6c0-.4.3-.6.6-.6z" fill="currentColor" stroke="none"/>',
    instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor"/>',
    tiktok: '<path d="M15.5 3c.3 2.2 1.8 3.8 4.2 4v3.2c-1.5 0-2.9-.4-4.2-1.2v6a6 6 0 1 1-6-6v3.3a2.8 2.8 0 1 0 2.8 2.7V3z" fill="currentColor" stroke="none"/>'
  };
  const icon = (name, cls = "") => `<svg class="ic ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[name] || ""}</svg>`;

  /* ---------- Meta (Facebook) Pixel ---------- */
  function initPixel() {
    if (!CFG.metaPixelId) return;
    /* eslint-disable */
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
    window.fbq("init", CFG.metaPixelId);
    window.fbq("track", "PageView");
  }
  const track = (event, params) => { try { if (window.fbq) window.fbq("track", event, params || {}); } catch (e) {} };

  /* ---------- ad attribution (UTM / fbclid) ---------- */
  function captureAttribution() {
    const q = new URLSearchParams(location.search);
    const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"];
    const found = {};
    keys.forEach(k => { if (q.get(k)) found[k] = q.get(k); });
    if (Object.keys(found).length) {
      found.landing_page = location.pathname; found.first_seen = new Date().toISOString();
      store.set("elf_attrib", Object.assign(store.get("elf_attrib", {}), found));
    }
  }
  const attribution = () => store.get("elf_attrib", {});

  /* ---------- email delivery (FormSubmit) ---------- */
  async function sendForm(subject, data) {
    const payload = Object.assign({ _subject: subject, _template: "table", _captcha: "false", language: lang, page: location.href }, data);
    const a = attribution();
    Object.keys(a).forEach(k => { payload["ad_" + k] = a[k]; });
    const res = await fetch(CFG.formEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error("send failed");
    return res.json().catch(() => ({}));
  }

  /* ---------- toast ---------- */
  function toast(msg) {
    let el = document.querySelector(".toast");
    if (!el) { el = document.createElement("div"); el.className = "toast"; el.setAttribute("role", "status"); document.body.appendChild(el); }
    el.innerHTML = icon("check") + `<span>${esc(msg)}</span>`;
    el.classList.add("show");
    clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove("show"), 2400);
  }

  /* ---------- cart ---------- */
  let cart = store.get("elf_cart", []).filter(i => getProduct(i.id));
  const saveCart = () => { store.set("elf_cart", cart); renderCart(); document.dispatchEvent(new CustomEvent("elf:cart")); };
  const Cart = {
    items: () => cart.map(i => ({ ...i, p: getProduct(i.id) })).filter(i => i.p),
    count: () => cart.reduce((s, i) => s + i.qty, 0),
    subtotal: () => Cart.items().reduce((s, i) => s + i.p.price * i.qty, 0),
    add(id, qty = 1, silent) {
      const p = getProduct(id); if (!p) return;
      const it = cart.find(i => i.id === id);
      if (it) it.qty = Math.min(99, it.qty + qty); else cart.push({ id, qty });
      saveCart();
      track("AddToCart", { content_ids: [id], content_type: "product", value: p.price * qty, currency: "EGP" });
      if (!silent) { toast(`${L(p.name)} — ${t("p.added")}`); bumpCart(); }
    },
    set(id, qty) { const it = cart.find(i => i.id === id); if (!it) return; it.qty = Math.max(1, Math.min(99, qty)); saveCart(); },
    remove(id) { cart = cart.filter(i => i.id !== id); saveCart(); },
    clear() { cart = []; saveCart(); },
    shipping() {
      const s = CFG.shipping || {};
      if (s.flat == null) return null;
      if (s.freeOver != null && Cart.subtotal() >= s.freeOver) return 0;
      return s.flat;
    },
    waText(extraLines) {
      const lines = [t("cart.wa.msg"), ""];
      Cart.items().forEach(i => lines.push(`• ${L(i.p.name)} × ${i.qty} — ${money(i.p.price * i.qty)}`));
      lines.push("", `${t("cart.subtotal")}: ${money(Cart.subtotal())}`);
      if (extraLines) lines.push("", ...extraLines);
      return lines.join("\n");
    }
  };
  function bumpCart() {
    document.querySelectorAll(".cart-btn").forEach(b => { b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump"); });
  }

  function renderCart() {
    document.querySelectorAll("[data-cart-count]").forEach(el => {
      const c = Cart.count(); el.textContent = c; el.hidden = c === 0;
    });
    const body = document.querySelector(".drawer-body");
    const foot = document.querySelector(".drawer-foot");
    if (!body) return;
    const items = Cart.items();
    if (!items.length) {
      body.innerHTML = `<div class="cart-empty">${icon("bag")}<p>${esc(t("cart.empty"))}</p><a class="btn btn-dark" href="shop.html">${esc(t("hero.cta"))}</a></div>`;
      foot.hidden = true; return;
    }
    foot.hidden = false;
    body.innerHTML = items.map(i => `
      <div class="cart-item">
        <a class="ci-media" href="${productUrl(i.p)}">${media(i.p)}</a>
        <div class="ci-info">
          <a class="ci-name" href="${productUrl(i.p)}">${esc(L(i.p.name))}</a>
          <div class="ci-price">${money(i.p.price)}</div>
          <div class="ci-row">
            <div class="qty sm" data-id="${i.id}">
              <button type="button" data-q="-1" aria-label="-">${icon("minus")}</button>
              <span>${i.qty}</span>
              <button type="button" data-q="1" aria-label="+">${icon("plus")}</button>
            </div>
            <button class="ci-remove" type="button" data-remove="${i.id}" aria-label="${esc(t("cart.remove"))}">${icon("trash")}</button>
          </div>
        </div>
      </div>`).join("");
    foot.querySelector("[data-subtotal]").textContent = money(Cart.subtotal());
    foot.querySelector("[data-cart-wa]").href = waLink(CFG.whatsappOrders, Cart.waText());
  }

  /* ---------- product card ---------- */
  function badges(p) {
    const b = [];
    if (p.oldPrice) b.push(`<span class="badge badge-sale" dir="ltr">-${Math.round((1 - p.price / p.oldPrice) * 100)}%</span>`);
    if ((p.tags || []).includes("new")) b.push(`<span class="badge badge-new">${esc(t("badge.new"))}</span>`);
    if ((p.tags || []).includes("best")) b.push(`<span class="badge badge-best">${icon("star")}${esc(t("badge.best"))}</span>`);
    return b.join("");
  }
  function productCard(p) {
    return `
    <article class="card reveal">
      <a class="card-media" href="${productUrl(p)}" aria-label="${esc(L(p.name))}">
        ${media(p)}
        <div class="card-badges">${badges(p)}</div>
      </a>
      <div class="card-body">
        <span class="card-cat">${esc(t("cat." + p.cat))}</span>
        <h3 class="card-title"><a href="${productUrl(p)}">${esc(L(p.name))}</a></h3>
        <div class="card-foot">
          <div class="price">${money(p.price)}${p.oldPrice ? `<s>${money(p.oldPrice)}</s>` : ""}</div>
          <div class="card-actions">
            <a class="icon-btn wa" href="${waLink(CFG.whatsappOrders, `${t("p.wa.msg")}\n• ${L(p.name)} — ${money(p.price)}\n${absUrl(productUrl(p))}`)}" target="_blank" rel="noopener" aria-label="${esc(t("p.wa"))}" title="${esc(t("p.wa"))}" data-wa="${p.id}">${icon("whatsapp")}</a>
            <button class="icon-btn add" type="button" data-add="${p.id}" aria-label="${esc(t("p.add"))}" title="${esc(t("p.add"))}">${icon("bag")}</button>
          </div>
        </div>
      </div>
    </article>`;
  }

  /* ---------- layout: header / footer / drawers ---------- */
  function logo(cls = "") {
    return `<a class="logo ${cls}" href="index.html" aria-label="The Elf Shop">
      <span class="logo-mark">E</span>
      <span class="logo-text"><span class="logo-the">THE</span><span class="logo-elf">ELF</span><span class="logo-shop">Shop</span></span>
    </a>`;
  }
  const navItems = [["index.html", "nav.home", "home"], ["shop.html", "nav.shop", "shop"], ["about.html", "nav.about", "about"], ["contact.html", "nav.contact", "contact"]];
  const langSwitch = () => `<div class="lang-switch" role="group" data-i18n-aria="lang.label">
      <button type="button" data-lang="ar">ع</button><button type="button" data-lang="en">EN</button><button type="button" data-lang="ko">한</button>
    </div>`;
  const socialLinks = (cls = "") => `
    <a class="${cls}" href="${CFG.social.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${icon("facebook")}</a>
    <a class="${cls}" href="${CFG.social.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${icon("instagram")}</a>
    <a class="${cls}" href="${CFG.social.tiktok}" target="_blank" rel="noopener" aria-label="TikTok">${icon("tiktok")}</a>`;

  function renderLayout() {
    const page = document.body.dataset.page;
    const header = document.getElementById("site-header");
    if (header) header.outerHTML = `
      <div class="announce"><div class="announce-track">
        <span data-i18n="announce.1"></span><i>✦</i><span data-i18n="announce.2"></span><i>✦</i><span data-i18n="announce.3"></span><i>✦</i>
        <span data-i18n="announce.1"></span><i>✦</i><span data-i18n="announce.2"></span><i>✦</i><span data-i18n="announce.3"></span><i>✦</i>
      </div></div>
      <header class="header">
        <div class="container header-inner">
          <button class="icon-btn ghost burger" type="button" data-open="menu" data-i18n-aria="nav.menu">${icon("menu")}</button>
          ${logo()}
          <nav class="nav" aria-label="Main">
            ${navItems.map(([h, k, id]) => `<a href="${h}" class="${page === id ? "active" : ""}" data-i18n="${k}"></a>`).join("")}
          </nav>
          <div class="header-actions">
            ${langSwitch()}
            <button class="icon-btn ghost" type="button" data-open="search" data-i18n-aria="nav.search">${icon("search")}</button>
            <button class="icon-btn ghost cart-btn" type="button" data-open="cart" data-i18n-aria="nav.cart">${icon("bag")}<b data-cart-count hidden>0</b></button>
          </div>
        </div>
      </header>
      <div class="overlay" data-close></div>
      <aside class="drawer drawer-cart" aria-hidden="true" data-i18n-aria="cart.title">
        <div class="drawer-head"><h2 data-i18n="cart.title"></h2><button class="icon-btn ghost" type="button" data-close aria-label="close">${icon("close")}</button></div>
        <div class="drawer-body"></div>
        <div class="drawer-foot" hidden>
          <div class="row-between"><span data-i18n="cart.subtotal"></span><strong data-subtotal></strong></div>
          <a class="btn btn-gold block" href="checkout.html"><span data-i18n="cart.checkout"></span>${icon("arrow", "flip")}</a>
          <a class="btn btn-wa block" data-cart-wa target="_blank" rel="noopener">${icon("whatsapp")}<span data-i18n="cart.wa"></span></a>
        </div>
      </aside>
      <aside class="drawer drawer-menu" aria-hidden="true">
        <div class="drawer-head">${logo("sm")}<button class="icon-btn ghost" type="button" data-close aria-label="close">${icon("close")}</button></div>
        <nav class="mnav">
          ${navItems.map(([h, k, id]) => `<a href="${h}" class="${page === id ? "active" : ""}"><span data-i18n="${k}"></span>${icon("arrow", "flip")}</a>`).join("")}
        </nav>
        <div class="mnav-cats">${["skincare", "sheetmask", "kitchen", "kpop", "culture", "accessories"].map(c => `<a href="shop.html?cat=${c}" data-i18n="cat.${c}"></a>`).join("")}</div>
        <div class="mnav-foot">${langSwitch()}<div class="socials">${socialLinks("soc")}</div></div>
      </aside>
      <div class="search-pop" aria-hidden="true">
        <form class="container search-form" action="shop.html">
          ${icon("search")}<input type="search" name="q" data-i18n-ph="nav.search" autocomplete="off">
          <button class="icon-btn ghost" type="button" data-close aria-label="close">${icon("close")}</button>
        </form>
      </div>`;

    const footer = document.getElementById("site-footer");
    if (footer) footer.outerHTML = `
      <footer class="footer">
        <div class="footer-wave" aria-hidden="true"></div>
        <div class="container footer-grid">
          <div class="f-brand">
            ${logo("light")}
            <p data-i18n="footer.about"></p>
            <div class="socials">${socialLinks("soc light")}</div>
          </div>
          <div>
            <h4 data-i18n="footer.shop"></h4>
            ${["skincare", "sheetmask", "kitchen", "kpop", "culture", "accessories"].map(c => `<a href="shop.html?cat=${c}" data-i18n="cat.${c}"></a>`).join("")}
          </div>
          <div>
            <h4 data-i18n="footer.help"></h4>
            <a href="about.html" data-i18n="nav.about"></a>
            <a href="contact.html" data-i18n="nav.contact"></a>
            <a href="checkout.html" data-i18n="cart.checkout"></a>
            <a href="https://wa.me/${CFG.whatsappOrders}" target="_blank" rel="noopener" dir="ltr">${icon("whatsapp")} ${CFG.whatsappOrdersDisplay}</a>
            <a href="mailto:${CFG.email}" dir="ltr">${icon("mail")} ${CFG.email}</a>
          </div>
          <div>
            <h4 data-i18n="footer.payment"></h4>
            <div class="pay-chips"><span class="pay-chip">InstaPay</span><span class="pay-chip" data-i18n="co.cod"></span></div>
            <div class="f-loc">${icon("pin")}<span data-i18n="loc.seoul"></span></div>
            <div class="f-loc">${icon("pin")}<span data-i18n="loc.alex"></span></div>
          </div>
        </div>
        <div class="container footer-bottom">
          <span>© ${new Date().getFullYear()} The Elf Shop · <span data-i18n="footer.rights"></span></span>
          <span data-i18n="footer.made"></span>
        </div>
      </footer>
      <a class="wa-float" href="https://wa.me/${CFG.whatsappOrders}?text=${encodeURIComponent("Hello The Elf Shop 👋")}" target="_blank" rel="noopener" data-i18n-aria="wa.float">${icon("whatsapp")}<span data-i18n="wa.float"></span></a>`;
  }

  /* ---------- drawers / overlays ---------- */
  function openPanel(name) {
    closePanels();
    const map = { cart: ".drawer-cart", menu: ".drawer-menu", search: ".search-pop" };
    const el = document.querySelector(map[name]); if (!el) return;
    el.classList.add("open"); el.setAttribute("aria-hidden", "false");
    document.querySelector(".overlay").classList.add("open");
    document.body.classList.add("locked");
    if (name === "search") setTimeout(() => el.querySelector("input").focus(), 50);
  }
  function closePanels() {
    document.querySelectorAll(".drawer.open, .search-pop.open, .overlay.open, .modal.open").forEach(el => { el.classList.remove("open"); el.setAttribute("aria-hidden", "true"); });
    document.body.classList.remove("locked");
  }

  /* ---------- lead capture (newsletter forms) ---------- */
  function leadForm(source) {
    return `<form class="lead-form" data-lead="${source}" novalidate>
      <div class="lead-fields">
        <input name="name" type="text" required data-i18n-ph="news.name" autocomplete="name">
        <input name="email" type="email" required data-i18n-ph="news.email" autocomplete="email" dir="ltr">
        <input name="phone" type="tel" data-i18n-ph="news.phone" autocomplete="tel" dir="ltr">
      </div>
      <input type="text" name="_honey" class="hp" tabindex="-1" autocomplete="off">
      <button class="btn btn-gold" type="submit"><span data-i18n="news.btn"></span>${icon("sparkle")}</button>
      <p class="form-note">${icon("shield")}<span data-i18n="news.privacy"></span></p>
      <p class="form-msg" role="status"></p>
    </form>`;
  }
  async function handleLead(form) {
    const msg = form.querySelector(".form-msg");
    const fd = Object.fromEntries(new FormData(form));
    if (fd._honey) return;
    if (!fd.name || !/^\S+@\S+\.\S+$/.test(fd.email || "")) { msg.className = "form-msg err"; msg.textContent = t("co.required"); return; }
    const btn = form.querySelector("button[type=submit]"); btn.disabled = true;
    try {
      await sendForm(`💙 New subscriber — ${fd.name}`, { type: "Newsletter / Lead", source: form.dataset.lead, name: fd.name, email: fd.email, phone: fd.phone || "-" });
      track("Lead", { content_name: "newsletter_" + form.dataset.lead });
      store.set("elf_subscribed", true);
      msg.className = "form-msg ok"; msg.textContent = t("news.ok"); form.reset();
      if (form.closest(".modal")) setTimeout(closePanels, 1800);
    } catch (e) {
      msg.className = "form-msg err"; msg.textContent = t("news.err");
    } finally { btn.disabled = false; }
  }
  function leadPopup() {
    const P = CFG.leadPopup || {};
    if (!P.enabled || store.get("elf_popup_seen") || store.get("elf_subscribed")) return;
    if (["checkout"].includes(document.body.dataset.page)) return;
    setTimeout(() => {
      if (document.querySelector(".drawer.open, .modal.open")) return;
      const m = document.createElement("div");
      m.className = "modal"; m.setAttribute("role", "dialog"); m.setAttribute("aria-modal", "true");
      m.innerHTML = `<div class="modal-card">
          <button class="icon-btn ghost modal-x" type="button" data-close data-i18n-aria="popup.close">${icon("close")}</button>
          <div class="modal-art" aria-hidden="true"><span>엘프샵</span></div>
          <div class="modal-content"><h3 data-i18n="popup.title"></h3><p data-i18n="popup.text"></p>${leadForm("popup")}</div>
        </div>`;
      document.body.appendChild(m);
      applyLang();
      requestAnimationFrame(() => { m.classList.add("open"); document.querySelector(".overlay").classList.add("open"); });
      store.set("elf_popup_seen", true);
    }, (P.delaySeconds || 25) * 1000);
  }

  /* ---------- reveal on scroll ---------- */
  let io;
  function observeReveals(root = document) {
    if (!("IntersectionObserver" in window)) { root.querySelectorAll(".reveal").forEach(el => el.classList.add("in")); return; }
    io = io || new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -40px 0px" });
    root.querySelectorAll(".reveal:not(.in)").forEach(el => io.observe(el));
  }

  /* ---------- global events ---------- */
  function bindGlobal() {
    document.addEventListener("click", e => {
      const el = e.target.closest("[data-open],[data-close],[data-add],[data-remove],[data-lang],.qty.sm [data-q],[data-wa]");
      if (!el) { if (e.target.classList.contains("modal")) closePanels(); return; }
      if (el.dataset.open) { e.preventDefault(); openPanel(el.dataset.open); }
      else if (el.hasAttribute("data-close")) { e.preventDefault(); closePanels(); }
      else if (el.dataset.add) { e.preventDefault(); Cart.add(el.dataset.add); }
      else if (el.dataset.remove) { Cart.remove(el.dataset.remove); }
      else if (el.dataset.lang) { setLang(el.dataset.lang); }
      else if (el.dataset.q) { const id = el.closest(".qty").dataset.id; const it = cart.find(i => i.id === id); if (it) Cart.set(id, it.qty + Number(el.dataset.q)); }
      else if (el.dataset.wa) { track("Contact", { content_ids: [el.dataset.wa], method: "whatsapp" }); }
    });
    document.addEventListener("keydown", e => { if (e.key === "Escape") closePanels(); });
    document.addEventListener("submit", e => {
      const f = e.target.closest("form[data-lead]");
      if (f) { e.preventDefault(); handleLead(f); }
    });
    window.addEventListener("scroll", () => document.body.classList.toggle("scrolled", window.scrollY > 10), { passive: true });
  }

  /* ---------- public API ---------- */
  window.ELF = {
    CFG, t, L, esc, money, icon, media, mediaCount, getProduct, productUrl, absUrl, waLink, productCard, badges,
    Cart, track, sendForm, toast, leadForm, observeReveals, applyLang, store,
    get lang() { return lang; },
    get products() { return PRODUCTS; }
  };

  /* ---------- bind static links/text to config ---------- */
  function bindConfig() {
    const links = {
      "wa-orders": "https://wa.me/" + CFG.whatsappOrders,
      "wa-payments": "https://wa.me/" + CFG.whatsappPayments,
      email: "mailto:" + CFG.email,
      facebook: CFG.social.facebook, instagram: CFG.social.instagram, tiktok: CFG.social.tiktok
    };
    document.querySelectorAll("[data-link]").forEach(a => { if (links[a.dataset.link]) a.href = links[a.dataset.link]; });
    document.querySelectorAll("[data-text]").forEach(el => { if (CFG[el.dataset.text]) el.textContent = CFG[el.dataset.text]; });
    document.querySelectorAll("[data-years]").forEach(el => { el.textContent = new Date().getFullYear() - CFG.since; });
  }

  /* ---------- boot ---------- */
  renderLayout();
  bindConfig();
  document.querySelectorAll("[data-lead-slot]").forEach(el => { el.outerHTML = leadForm(el.dataset.leadSlot); });
  applyLang();
  renderCart();
  bindGlobal();
  captureAttribution();
  initPixel();
  leadPopup();
  document.addEventListener("DOMContentLoaded", () => observeReveals());
  if (document.readyState !== "loading") observeReveals();
})();
