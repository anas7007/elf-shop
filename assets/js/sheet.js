/* =========================================================
   THE ELF SHOP — SPREADSHEET READER (admin bulk import)
   ---------------------------------------------------------
   Reads the first sheet of an Excel .xlsx file, or a .csv file,
   into rows of cell values. No external libraries: an .xlsx is a
   zip of XML files, unpacked with the browser's DecompressionStream.
   window.ELF_SHEET.read(file) → Promise<Array<Array<string|number>>>
   ========================================================= */
(function () {
  "use strict";

  /* ---------- CSV ---------- */
  function decodeText(buf) {
    const bytes = new Uint8Array(buf);
    // UTF-8 (with or without BOM) first; Excel on Arabic Windows saves CSV as Windows-1256
    try { return new TextDecoder("utf-8", { fatal: true }).decode(bytes).replace(/^﻿/, ""); }
    catch (e) {
      if (bytes[0] === 0xFF && bytes[1] === 0xFE) return new TextDecoder("utf-16le").decode(bytes).replace(/^﻿/, "");
      return new TextDecoder("windows-1256").decode(bytes);
    }
  }
  function parseCsv(text) {
    const firstLine = text.split(/\r?\n/, 1)[0] || "";
    const count = ch => firstLine.split(ch).length - 1;
    const delim = [",", ";", "\t"].sort((a, b) => count(b) - count(a))[0];
    const rows = []; let row = [], cell = "", q = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (q) {
        if (c === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else q = false; }
        else cell += c;
      } else if (c === '"' && cell === "") q = true;
      else if (c === delim) { row.push(cell); cell = ""; }
      else if (c === "\n" || c === "\r") {
        if (c === "\r" && text[i + 1] === "\n") i++;
        row.push(cell); rows.push(row); row = []; cell = "";
      } else cell += c;
    }
    if (cell !== "" || row.length) { row.push(cell); rows.push(row); }
    rows.forEach((r, i) => { r.n = i + 1; }); // the row number as the spreadsheet shows it
    return rows;
  }

  /* ---------- ZIP (just enough for .xlsx) ---------- */
  function openZip(buf) {
    const dv = new DataView(buf);
    let eocd = -1;
    for (let i = buf.byteLength - 22; i >= Math.max(0, buf.byteLength - 65557); i--) {
      if (dv.getUint32(i, true) === 0x06054b50) { eocd = i; break; }
    }
    if (eocd < 0) throw new Error("This file is not a valid .xlsx file.");
    const count = dv.getUint16(eocd + 10, true);
    let off = dv.getUint32(eocd + 16, true);
    const files = {};
    for (let k = 0; k < count; k++) {
      if (dv.getUint32(off, true) !== 0x02014b50) throw new Error("This .xlsx file looks damaged.");
      const method = dv.getUint16(off + 10, true), size = dv.getUint32(off + 20, true);
      const nameLen = dv.getUint16(off + 28, true), extraLen = dv.getUint16(off + 30, true), commentLen = dv.getUint16(off + 32, true);
      const local = dv.getUint32(off + 42, true);
      const name = new TextDecoder().decode(new Uint8Array(buf, off + 46, nameLen));
      files[name] = { method, size, local };
      off += 46 + nameLen + extraLen + commentLen;
    }
    return async function readText(name) {
      const f = files[name.replace(/^\//, "")];
      if (!f) return null;
      const start = f.local + 30 + dv.getUint16(f.local + 26, true) + dv.getUint16(f.local + 28, true);
      const data = new Uint8Array(buf, start, f.size);
      if (f.method === 0) return new TextDecoder().decode(data);
      if (f.method !== 8) throw new Error("This .xlsx file uses an unsupported compression.");
      if (typeof DecompressionStream === "undefined") throw new Error("This browser can't open .xlsx files. Update it, or save the sheet as CSV.");
      const stream = new Blob([data]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
      return new Response(stream).text();
    };
  }

  /* ---------- XLSX ---------- */
  const xml = s => new DOMParser().parseFromString(s, "application/xml");
  const all = (node, tag) => Array.from(node.getElementsByTagNameNS("*", tag));
  const colIndex = ref => { let n = 0; for (const ch of ref.replace(/[0-9]/g, "")) n = n * 26 + (ch.charCodeAt(0) - 64); return n - 1; };
  const textOf = node => all(node, "t").filter(t => !t.closest || !t.closest("rPh")).map(t => t.textContent).join("");

  async function parseXlsx(buf) {
    const read = openZip(buf);
    const wb = xml(await read("xl/workbook.xml") || "");
    const firstSheet = all(wb, "sheet")[0];
    if (!firstSheet) throw new Error("This .xlsx file has no sheets.");
    const relId = firstSheet.getAttributeNS("http://schemas.openxmlformats.org/officeDocument/2006/relationships", "id") || firstSheet.getAttribute("r:id");
    let target = "worksheets/sheet1.xml";
    const rels = await read("xl/_rels/workbook.xml.rels");
    if (rels) { const rel = all(xml(rels), "Relationship").find(r => r.getAttribute("Id") === relId); if (rel) target = rel.getAttribute("Target"); }
    const sheetPath = target.startsWith("/") ? target.slice(1) : "xl/" + target.replace(/^\.\//, "");
    const shared = [];
    const ss = await read("xl/sharedStrings.xml");
    if (ss) all(xml(ss), "si").forEach(si => shared.push(textOf(si)));
    const sheetXml = await read(sheetPath);
    if (!sheetXml) throw new Error("Couldn't find the first sheet in this .xlsx file.");
    const rows = [];
    all(xml(sheetXml), "row").forEach(r => {
      const rowNum = Number(r.getAttribute("r")) || rows.length + 1;
      const row = [];
      all(r, "c").forEach((c, i) => {
        const ref = c.getAttribute("r"); const col = ref ? colIndex(ref) : i;
        const type = c.getAttribute("t"); const v = all(c, "v")[0];
        let val = "";
        if (type === "s") val = v ? shared[Number(v.textContent)] || "" : "";
        else if (type === "inlineStr") val = textOf(c);
        else if (type === "str" || type === "e") val = v ? v.textContent : "";
        else if (type === "b") val = v ? (v.textContent === "1" ? "TRUE" : "FALSE") : "";
        else val = v ? Number(v.textContent) : "";
        row[col] = val;
      });
      const cells = Array.from(row, x => (x === undefined ? "" : x));
      cells.n = rowNum; // the row number as Excel shows it
      if (cells.some(x => String(x).trim() !== "")) rows.push([rowNum, cells]); // blank / formatting-only rows are skipped
    });
    return rows.sort((a, b) => a[0] - b[0]).map(r => r[1]);
  }

  async function read(file) {
    const buf = await file.arrayBuffer();
    const head = new Uint8Array(buf, 0, Math.min(4, buf.byteLength));
    const isZip = head[0] === 0x50 && head[1] === 0x4B;
    if (isZip) return parseXlsx(buf);
    if (/\.xls$/i.test(file.name)) throw new Error("Old .xls files aren't supported. In Excel choose File → Save As → Excel Workbook (.xlsx) or CSV.");
    return parseCsv(decodeText(buf));
  }

  window.ELF_SHEET = { read, parseCsv };
})();
