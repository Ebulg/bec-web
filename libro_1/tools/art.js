// eval'd in run_script after tools/hq.js (cleanCC) and tools/trace.js.
// art(name, pn, [x1,y1,x2,y2], erase[[x1,y1,x2,y2]...] (scan coords), o) -> img/v/<name>.svg
async function art(name, pn, box, erase = [], o = {}) {
  const img = await readImage('scan/p' + String(pn).padStart(3, '0') + '.jpg');
  const [x1, y1, x2, y2] = box, w = x2 - x1, h = y2 - y1;
  const S = o.S ?? Math.min(6, 2400 / Math.max(w, h)), W = Math.round(w * S), H = Math.round(h * S);
  const c = createCanvas(W, H), ctx = c.getContext('2d'); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);
  ctx.imageSmoothingQuality = 'high'; ctx.filter = `blur(${o.blur ?? S * 0.3}px)`;
  ctx.drawImage(img, x1, y1, w, h, 0, 0, W, H); ctx.filter = 'none';
  ctx.fillStyle = '#fff'; for (const e of erase) ctx.fillRect((e[0] - x1) * S, (e[1] - y1) * S, (e[2] - e[0]) * S, (e[3] - e[1]) * S);
  const d = ctx.getImageData(0, 0, W, H), a = d.data, lo = o.lo ?? 95, hi = o.hi ?? 175;
  for (let i = 0; i < a.length; i += 4) { const v = 0.3 * a[i] + 0.59 * a[i + 1] + 0.11 * a[i + 2]; let t = (v - lo) / (hi - lo); t = t < 0 ? 0 : t > 1 ? 1 : t; a[i] = a[i + 1] = a[i + 2] = t * 255; a[i + 3] = 255; }
  if (!o.keepLines) edgeLines(a, W, H, S);
  cleanCC(a, W, H, { keepBand: !o.band, band: o.band ?? 0.05, minArea: o.minArea ?? Math.round(S * S * 2.5) });
  if (!o.keepLines) removeLines(a, W, H, S);
  ctx.putImageData(d, 0, 0);
  return traceToSvg(c, 'img/v/' + name + '.svg', { scale: 1, blur: 0, minArea: o.vmin ?? 4, eps: o.eps ?? 0.8 });
}
async function arts(list) { const r = []; for (const [n, pn, b, e, o] of list) r.push(await art(n, pn, b, e || [], o || {})); return r; }

function removeLines(a, W, H, S) {
  const N = W * H, lab = new Int32Array(N), st = new Int32Array(N); let id = 0;
  const dark = p => a[p * 4] < 150;
  for (let p = 0; p < N; p++) {
    if (lab[p] || !dark(p)) continue; id++; let sp = 0; st[sp++] = p; lab[p] = id; const comp = []; let x1 = W, y1 = H, x2 = 0, y2 = 0;
    while (sp) { const q = st[--sp]; comp.push(q); const x = q % W, y = (q / W) | 0; if (x < x1) x1 = x; if (x > x2) x2 = x; if (y < y1) y1 = y; if (y > y2) y2 = y;
      if (x > 0 && !lab[q - 1] && dark(q - 1)) { lab[q - 1] = id; st[sp++] = q - 1; } if (x < W - 1 && !lab[q + 1] && dark(q + 1)) { lab[q + 1] = id; st[sp++] = q + 1; }
      if (y > 0 && !lab[q - W] && dark(q - W)) { lab[q - W] = id; st[sp++] = q - W; } if (y < H - 1 && !lab[q + W] && dark(q + W)) { lab[q + W] = id; st[sp++] = q + W; } }
    const bw = x2 - x1 + 1, bh = y2 - y1 + 1, thin = S * 6;
    const line = (bw <= thin && bh > H * 0.25) || (bh <= thin && bw > W * 0.25);
    const edge = x1 <= 2 || y1 <= 2 || x2 >= W - 3 || y2 >= H - 3;
    if (line && (edge || bw > W * 0.6 || bh > H * 0.6)) for (const q of comp) a[q * 4] = a[q * 4 + 1] = a[q * 4 + 2] = 255;
  }
}
function edgeLines(a, W, H, S) {
  const band = Math.round(S * 14), wipe = Math.round(S * 2.2);
  const rowF = y => { let n = 0; for (let x = 0; x < W; x++) if (a[(y * W + x) * 4] < 200) n++; return n / W; };
  const colF = x => { let n = 0; for (let y = 0; y < H; y++) if (a[(y * W + x) * 4] < 200) n++; return n / H; };
  const wr = y => { if (y < 0 || y >= H) return; for (let x = 0; x < W; x++) { const i = (y * W + x) * 4; a[i] = a[i + 1] = a[i + 2] = 255; } };
  const wc = x => { if (x < 0 || x >= W) return; for (let y = 0; y < H; y++) { const i = (y * W + x) * 4; a[i] = a[i + 1] = a[i + 2] = 255; } };
  const hitR = [], hitC = [];
  for (let y = 0; y < band; y++) { if (rowF(y) > 0.3) hitR.push(y); if (rowF(H - 1 - y) > 0.3) hitR.push(H - 1 - y); }
  for (let x = 0; x < band; x++) { if (colF(x) > 0.3) hitC.push(x); if (colF(W - 1 - x) > 0.3) hitC.push(W - 1 - x); }
  for (const y of hitR) for (let k = -wipe; k <= wipe; k++) wr(y + k);
  for (const x of hitC) for (let k = -wipe; k <= wipe; k++) wc(x + k);
}