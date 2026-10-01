// eval'd in run_script. hqFromOld(name, pages[]) re-renders img/<name>.png from the original scan at 4x, using the old crop as a cleanliness mask.
const _scanCache = {};
async function scanGray(pn) {
  if (_scanCache[pn]) return _scanCache[pn];
  const img = await readImage('scan/p' + String(pn).padStart(3, '0') + '.jpg');
  const c = createCanvas(img.width, img.height), x = c.getContext('2d'); x.drawImage(img, 0, 0);
  const d = x.getImageData(0, 0, img.width, img.height).data, g = new Float32Array(img.width * img.height);
  for (let i = 0, p = 0; i < d.length; i += 4, p++) g[p] = 0.3 * d[i] + 0.59 * d[i + 1] + 0.11 * d[i + 2];
  return (_scanCache[pn] = { img, g, W: img.width, H: img.height });
}
function grayOf(canvasOrImg, w, h) {
  const c = createCanvas(w, h), x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, w, h);
  x.imageSmoothingQuality = 'high'; x.drawImage(canvasOrImg, 0, 0, w, h);
  const d = x.getImageData(0, 0, w, h).data, g = new Float32Array(w * h);
  for (let i = 0, p = 0; i < d.length; i += 4, p++) g[p] = d[i]; return g;
}
function down(g, W, H, f) { const w = Math.floor(W / f), h = Math.floor(H / f), o = new Float32Array(w * h);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { let s = 0; for (let j = 0; j < f; j++) for (let i = 0; i < f; i++) s += g[(y * f + j) * W + x * f + i]; o[y * w + x] = s / (f * f); }
  return { g: o, w, h }; }
function bin(g,t){const o=new Uint8Array(g.length);for(let i=0;i<g.length;i++)o[i]=g[i]<t?1:0;return o;}
function sadB(S,SW,T,tw,th,ox,oy){let s=0;for(let y=0;y<th;y++){const so=(oy+y)*SW+ox,to=y*tw;for(let x=0;x<tw;x++)s+=S[so+x]^T[to+x];}return s;}
async function locate(old, pages) {
  const tw = Math.round(old.width / 2), th = Math.round(old.height / 2);
  const T1 = grayOf(old, tw, th); const T1b = bin(T1, 215); let best = null;
  for (const pn of pages) {
    const sc = await scanGray(pn); const F = 4;
    if (!sc.b) { sc.b = bin(sc.g, 160); const Sd = down(sc.g, sc.W, sc.H, F); sc.db = bin(Sd.g, 205); sc.dw = Sd.w; sc.dh = Sd.h; }
    const Td = down(T1, tw, th, F); const Tdb = bin(Td.g, 235);
    let b = { s: 1e18 };
    for (let y = 0; y + Td.h <= sc.dh; y++) for (let x = 0; x + Td.w <= sc.dw; x++) { const v = sadB(sc.db, sc.dw, Tdb, Td.w, Td.h, x, y); if (v < b.s) b = { s: v, x, y }; }
    let r = { s: 1e18 };
    for (let y = Math.max(0, b.y * F - 6); y <= Math.min(sc.H - th, b.y * F + 6); y++) for (let x = Math.max(0, b.x * F - 6); x <= Math.min(sc.W - tw, b.x * F + 6); x++) { const v = sadB(sc.b, sc.W, T1b, tw, th, x, y); if (v < r.s) r = { s: v, x, y }; }
    const ink = T1b.reduce((a, v) => a + v, 0) || 1; const score = r.s / ink;
    if (!best || score < best.score) best = { pn, x: r.x, y: r.y, w: tw, h: th, score };
  }
  return best;
}
async function hqFromOld(name, pages, o = {}) {
  const old = await readImage('img/' + name + '.png');
  const L = await locate(old, pages); const sc = await scanGray(L.pn);
  const S = 4, W = L.w * S, H = L.h * S;
  const c = createCanvas(W, H), ctx = c.getContext('2d'); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);
  ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
  ctx.filter = `blur(${o.blur ?? 1.4}px)`; ctx.drawImage(sc.img, L.x, L.y, L.w, L.h, 0, 0, W, H); ctx.filter = 'none';
  const d = ctx.getImageData(0, 0, W, H), a = d.data;
  // mask from old crop (dilated): only keep ink where the old cleaned crop had ink nearby
  const m = createCanvas(W, H), mx = m.getContext('2d'); mx.fillStyle = '#fff'; mx.fillRect(0, 0, W, H);
  mx.filter = 'blur(5px)'; mx.drawImage(old, 0, 0, W, H); mx.filter = 'none';
  const md = mx.getImageData(0, 0, W, H).data;
  const lo = o.lo ?? 100, hi = o.hi ?? 172;
  for (let i = 0; i < a.length; i += 4) {
    const v = 0.3 * a[i] + 0.59 * a[i + 1] + 0.11 * a[i + 2];
    let t = (v - lo) / (hi - lo); t = t < 0 ? 0 : t > 1 ? 1 : t; t = t * t * (3 - 2 * t);
    let out = t * 255; if (md[i] > 250) out = 255;
    a[i] = a[i + 1] = a[i + 2] = out; a[i + 3] = 255;
  }
  cleanCC(a, W, H, o);
  for (let i = 0; i < a.length; i += 4) if (a[i] > 188) a[i] = a[i + 1] = a[i + 2] = 255;
  ctx.putImageData(d, 0, 0);
  await saveFile('img/hq/' + (o.out || name) + '.png', c);
  return name + '@p' + L.pn + ' ' + L.x + ',' + L.y + ' s=' + L.score.toFixed(1);
}

function cleanCC(a, W, H, o = {}) {
  const N = W * H, lab = new Int32Array(N), st = new Int32Array(N), bw = Math.round(W * (o.band ?? 0.07)), bh = Math.round(H * (o.band ?? 0.07)), minA = o.minArea ?? 70;
  const dark = p => a[p * 4] < 150; let id = 0;
  for (let p = 0; p < N; p++) {
    if (lab[p] || !dark(p)) continue; id++; let sp = 0; st[sp++] = p; lab[p] = id; const comp = []; let x1 = W, y1 = H, x2 = 0, y2 = 0;
    while (sp) { const q = st[--sp]; comp.push(q); const x = q % W, y = (q / W) | 0; if (x < x1) x1 = x; if (x > x2) x2 = x; if (y < y1) y1 = y; if (y > y2) y2 = y;
      for (const nb of [x > 0 ? q - 1 : -1, x < W - 1 ? q + 1 : -1, y > 0 ? q - W : -1, y < H - 1 ? q + W : -1]) if (nb >= 0 && !lab[nb] && dark(nb)) { lab[nb] = id; st[sp++] = nb; } }
    const inBand = x2 < bw || x1 > W - bw || y2 < bh || y1 > H - bh;
    if (comp.length < minA || (inBand && !o.keepBand)) for (const q of comp) { a[q * 4] = a[q * 4 + 1] = a[q * 4 + 2] = 255; }
  }
}
