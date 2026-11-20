/* =========================================================
   ILLUSTRATED PRODUCT PLACEHOLDERS (inline SVG)
   Used automatically when a product has no real photos.
   ========================================================= */
(function () {
  const esc = s => String(s || "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function shape(type, c, label, uid) {
    const L = esc(label);
    const txt = (x, y, size, fill) => L ? `<text x="${x}" y="${y}" text-anchor="middle" font-family="Outfit,Arial" font-weight="800" font-size="${size}" fill="${fill || "#fff"}" letter-spacing="1">${L}</text>` : "";
    switch (type) {
      case "bottle":
        return `
          <rect x="88" y="22" width="24" height="30" rx="10" fill="#111"/>
          <rect x="84" y="48" width="32" height="14" rx="3" fill="${c}" opacity=".85"/>
          <rect x="62" y="60" width="76" height="118" rx="18" fill="url(#g${uid})"/>
          <rect x="70" y="70" width="10" height="90" rx="5" fill="#fff" opacity=".35"/>
          <rect x="74" y="104" width="52" height="34" rx="6" fill="#fff" opacity=".92"/>
          ${txt(100, 125, 9.5, c)}`;
      case "tube":
        return `
          <path d="M70 28 h60 l-6 120 a8 8 0 0 1 -8 8 h-32 a8 8 0 0 1 -8 -8z" fill="url(#g${uid})"/>
          <path d="M70 28 h60 v10 h-60z" fill="#fff" opacity=".5"/>
          <rect x="86" y="156" width="28" height="24" rx="5" fill="#111"/>
          <rect x="78" y="46" width="8" height="90" rx="4" fill="#fff" opacity=".35"/>
          <rect x="84" y="86" width="40" height="30" rx="5" fill="#fff" opacity=".92" transform="rotate(-90 104 101)"/>
          <text x="104" y="105" transform="rotate(-90 104 101)" text-anchor="middle" font-family="Outfit,Arial" font-weight="800" font-size="10" fill="${c}">${L}</text>`;
      case "jar":
        return `
          <rect x="52" y="62" width="96" height="26" rx="8" fill="#111"/>
          <rect x="48" y="84" width="104" height="84" rx="22" fill="url(#g${uid})"/>
          <rect x="60" y="96" width="10" height="56" rx="5" fill="#fff" opacity=".35"/>
          <rect x="74" y="110" width="56" height="30" rx="15" fill="#fff" opacity=".92"/>
          ${txt(102, 130, 12, c)}`;
      case "pouch":
        return `
          <path d="M56 36 l6 -6 6 6 6 -6 6 6 6 -6 6 6 6 -6 6 6 6 -6 6 6 6 -6 6 6 6 -6 6 6 v134 a8 8 0 0 1 -8 8 h-72 a8 8 0 0 1 -8 -8z" fill="url(#g${uid})"/>
          <ellipse cx="100" cy="98" rx="28" ry="34" fill="#fff" opacity=".92"/>
          <circle cx="90" cy="92" r="4" fill="${c}"/><circle cx="110" cy="92" r="4" fill="${c}"/>
          <path d="M90 108 q10 8 20 0" stroke="${c}" stroke-width="3" fill="none" stroke-linecap="round"/>
          <circle cx="84" cy="104" r="4" fill="#FF8FB3" opacity=".7"/><circle cx="116" cy="104" r="4" fill="#FF8FB3" opacity=".7"/>
          ${txt(100, 156, 13)}`;
      case "ramen":
        return `
          <rect x="40" y="34" width="120" height="140" rx="14" fill="url(#g${uid})"/>
          <path d="M58 104 h84 a42 42 0 0 1 -84 0z" fill="#fff"/>
          <path d="M66 100 q8 -12 16 0 t16 0 t16 0 t16 0" stroke="#F4C66A" stroke-width="5" fill="none" stroke-linecap="round"/>
          <path d="M70 90 q8 -12 16 0 t16 0 t16 0" stroke="#F4C66A" stroke-width="5" fill="none" stroke-linecap="round"/>
          <path d="M124 52 q14 8 6 26 q-10 -6 -6 -26z" fill="#fff" opacity=".9"/>
          ${txt(100, 70, 20)}`;
      case "snack":
        return `
          <path d="M48 30 l8 -6 8 6 8 -6 8 6 8 -6 8 6 8 -6 8 6 8 -6 8 6 8 -6 8 6 8 -6 v152 l-8 6 -8 -6 -8 6 -8 -6 -8 6 -8 -6 -8 6 -8 -6 -8 6 -8 -6 -8 6 -8 -6 -8 6z" fill="url(#g${uid})"/>
          <circle cx="100" cy="104" r="34" fill="#fff" opacity=".9"/>
          <ellipse cx="100" cy="104" rx="20" ry="14" fill="${c}" opacity=".85" transform="rotate(-20 100 104)"/>
          ${txt(100, 160, 14)}`;
      case "drink":
        return `
          <path d="M72 50 h56 v118 a10 10 0 0 1 -10 10 h-36 a10 10 0 0 1 -10 -10z" fill="url(#g${uid})"/>
          <path d="M80 30 h40 l8 20 h-56z" fill="${c}" opacity=".8"/>
          <rect x="90" y="16" width="20" height="16" rx="4" fill="#fff"/>
          <rect x="80" y="60" width="8" height="100" rx="4" fill="#fff" opacity=".35"/>
          <path d="M100 96 q20 6 14 28 q-18 -2 -14 -28z" fill="#fff"/>
          ${txt(100, 152, 12)}`;
      case "album":
        return `
          <circle cx="128" cy="96" r="52" fill="#111"/><circle cx="128" cy="96" r="14" fill="#ddd"/><circle cx="128" cy="96" r="44" fill="none" stroke="#333" stroke-width="2"/>
          <rect x="34" y="40" width="112" height="112" rx="8" fill="url(#g${uid})" transform="rotate(-6 90 96)"/>
          <g transform="rotate(-6 90 96)"><circle cx="90" cy="86" r="26" fill="#fff" opacity=".25"/><path d="M78 86 l10 10 18 -22" stroke="#fff" stroke-width="0" fill="none"/>
          <text x="90" y="138" text-anchor="middle" font-family="Outfit,Arial" font-weight="800" font-size="14" fill="#fff" letter-spacing="3">${L}</text>
          <path d="M80 80 l8 -10 8 10 8 -10 v26 h-24z" fill="#fff" opacity=".9"/></g>`;
      case "lightstick":
        return `
          <circle cx="100" cy="70" r="56" fill="${c}" opacity=".15"/>
          <circle cx="100" cy="70" r="40" fill="url(#g${uid})"/>
          <circle cx="86" cy="56" r="10" fill="#fff" opacity=".6"/>
          <path d="M100 52 l5 12 13 1 -10 8 3 13 -11 -7 -11 7 3 -13 -10 -8 13 -1z" fill="#fff"/>
          <rect x="90" y="108" width="20" height="74" rx="8" fill="#111"/>
          <circle cx="100" cy="128" r="4" fill="${c}"/>`;
      case "photocard":
        return `
          <rect x="62" y="32" width="84" height="124" rx="10" fill="${c}" opacity=".35" transform="rotate(10 104 94)"/>
          <rect x="54" y="38" width="84" height="124" rx="10" fill="url(#g${uid})" transform="rotate(-6 96 100)"/>
          <g transform="rotate(-6 96 100)"><rect x="62" y="46" width="68" height="84" rx="6" fill="#fff" opacity=".9"/>
          <path d="M96 106 c-14 -10 -18 -18 -10 -24 6 -4 10 0 10 4 0 -4 4 -8 10 -4 8 6 4 14 -10 24z" fill="${c}"/>
          <text x="96" y="148" text-anchor="middle" font-family="Outfit,Arial" font-weight="800" font-size="11" fill="#fff" letter-spacing="2">♥ ♥ ♥</text></g>`;
      case "fan":
        return `
          <path d="M100 150 L30 80 A100 100 0 0 1 170 80 Z" fill="url(#g${uid})"/>
          ${[40, 55, 70, 85, 100, 115, 130, 145, 160].map(x => `<line x1="100" y1="150" x2="${x}" y2="${x < 100 ? 80 - (100 - x) * 0.25 + 25 : 80 - (x - 100) * 0.25 + 25}" stroke="#fff" stroke-opacity=".35" stroke-width="2"/>`).join("")}
          <circle cx="100" cy="92" r="24" fill="#fff"/>
          <path d="M76 92 a12 12 0 0 1 24 0 a12 12 0 0 0 24 0 a24 24 0 0 0 -48 0z" fill="#C0392B"/>
          <path d="M76 92 a12 12 0 0 1 24 0 a12 12 0 0 0 24 0 a24 24 0 0 1 -48 0z" fill="#1E3A8A"/>
          <rect x="94" y="148" width="12" height="34" rx="5" fill="#5D3A1A"/>`;
      case "chopsticks":
        return `
          <rect x="70" y="24" width="10" height="160" rx="4" fill="url(#g${uid})" transform="rotate(-10 75 104)"/>
          <rect x="88" y="24" width="10" height="160" rx="4" fill="url(#g${uid})" transform="rotate(-4 93 104)"/>
          <ellipse cx="132" cy="48" rx="18" ry="24" fill="url(#g${uid})"/>
          <rect x="127" y="66" width="10" height="118" rx="4" fill="url(#g${uid})"/>
          <ellipse cx="128" cy="44" rx="6" ry="10" fill="#fff" opacity=".45"/>`;
      case "clip":
        return `
          <path d="M44 110 q56 -70 112 0" stroke="url(#g${uid})" stroke-width="22" fill="none" stroke-linecap="round"/>
          ${[56, 74, 92, 110, 128, 146].map(x => `<rect x="${x - 4}" y="112" width="8" height="46" rx="4" fill="url(#g${uid})"/>`).join("")}
          ${[60, 80, 100, 120, 140].map((x, i) => `<circle cx="${x}" cy="${[96, 80, 74, 80, 96][i]}" r="9" fill="#fff" stroke="#e6e6f0"/>`).join("")}`;
      case "keychain":
        return `
          <circle cx="100" cy="34" r="16" fill="none" stroke="#C9A44C" stroke-width="5"/>
          <rect x="97" y="48" width="6" height="18" fill="#C9A44C"/>
          <circle cx="72" cy="84" r="16" fill="url(#g${uid})"/><circle cx="128" cy="84" r="16" fill="url(#g${uid})"/>
          <circle cx="100" cy="116" r="48" fill="url(#g${uid})"/>
          <circle cx="84" cy="108" r="5" fill="#111"/><circle cx="116" cy="108" r="5" fill="#111"/>
          <ellipse cx="100" cy="128" rx="16" ry="12" fill="#fff"/><circle cx="100" cy="123" r="4" fill="#111"/>
          <circle cx="74" cy="124" r="6" fill="#FF8FB3" opacity=".7"/><circle cx="126" cy="124" r="6" fill="#FF8FB3" opacity=".7"/>`;
      default:
        return `<circle cx="100" cy="100" r="60" fill="url(#g${uid})"/>`;
    }
  }

  let n = 0;
  /** variant: 0..2 changes background composition (for gallery thumbnails) */
  window.elfArt = function (art, variant = 0) {
    const a = art || {};
    const uid = "a" + (++n);
    const c = a.c2 || "#2B35D8";
    const bg = a.c1 || "#EEF0FF";
    const deco = [
      `<circle cx="160" cy="40" r="26" fill="${c}" opacity=".10"/><circle cx="36" cy="170" r="18" fill="${c}" opacity=".10"/>`,
      `<rect x="-20" y="120" width="260" height="120" fill="${c}" opacity=".12" transform="rotate(-12 100 180)"/>`,
      `<circle cx="100" cy="104" r="86" fill="#fff" opacity=".7"/>`
    ][variant % 3];
    const sparkle = `<path d="M168 150 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3z" fill="#C9A44C"/><path d="M30 46 l2 6 6 2 -6 2 -2 6 -2 -6 -6 -2 6 -2z" fill="#C9A44C" opacity=".8"/>`;
    return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      <defs><linearGradient id="g${uid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c}" stop-opacity=".78"/><stop offset="1" stop-color="${c}"/></linearGradient></defs>
      <rect width="200" height="200" fill="${bg}"/>${deco}
      <g>${shape(a.type, c, a.label, uid)}</g>${sparkle}
    </svg>`;
  };
})();
