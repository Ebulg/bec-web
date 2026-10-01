// eval'd in run_script. enhanceAll(names[]) : img/<n>.png -> img/hq/<n>.png
async function enhanceOne(name, o = {}) {
  const img = await readImage('img/' + name + '.png');
  const S = o.scale ?? 2, W = Math.round(img.width * S), H = Math.round(img.height * S);
  const c = createCanvas(W, H), ctx = c.getContext('2d');
  ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);
  ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
  ctx.filter = `blur(${o.blur ?? 1.1}px)`; ctx.drawImage(img, 0, 0, W, H); ctx.filter = 'none';
  const d = ctx.getImageData(0, 0, W, H), a = d.data, lo = o.lo ?? 150, hi = o.hi ?? 215;
  const g = new Uint8Array(W * H);
  for (let i = 0, p = 0; i < a.length; i += 4, p++) {
    let t = (a[i] - lo) / (hi - lo); t = t < 0 ? 0 : t > 1 ? 1 : t; t = t * t * (3 - 2 * t);
    g[p] = Math.round(t * 255);
  }
  // despeckle: remove small dark components
  const minA = o.minArea ?? 40, lab = new Int32Array(W * H), stack = new Int32Array(W * H);
  let id = 0;
  for (let p = 0; p < W * H; p++) {
    if (g[p] >= 140 || lab[p]) continue;
    id++; let sp = 0, n = 0; stack[sp++] = p; lab[p] = id; const comp = [];
    while (sp) { const q = stack[--sp]; comp.push(q); n++; const x = q % W, y = (q / W) | 0;
      if (x > 0 && !lab[q - 1] && g[q - 1] < 140) { lab[q - 1] = id; stack[sp++] = q - 1; }
      if (x < W - 1 && !lab[q + 1] && g[q + 1] < 140) { lab[q + 1] = id; stack[sp++] = q + 1; }
      if (y > 0 && !lab[q - W] && g[q - W] < 140) { lab[q - W] = id; stack[sp++] = q - W; }
      if (y < H - 1 && !lab[q + W] && g[q + W] < 140) { lab[q + W] = id; stack[sp++] = q + W; } }
    if (n < minA) for (const q of comp) g[q] = 255;
  }
  for (let i = 0, p = 0; i < a.length; i += 4, p++) { a[i] = a[i + 1] = a[i + 2] = g[p]; a[i + 3] = 255; }
  ctx.putImageData(d, 0, 0);
  await saveFile('img/hq/' + name + '.png', c);
}
async function enhanceAll(names, o) { for (const n of names) await enhanceOne(n, o); }
