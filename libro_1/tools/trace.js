// eval'd in run_script. traceToSvg(srcPng, outSvg, {scale, thr, minArea, eps}) -> crisp vector redraw of line art.
async function traceToSvg(src, out, o = {}) {
  const img = typeof src === 'string' ? await readImage(src) : src;
  const k = o.scale ?? Math.min(1, 1400 / Math.max(img.width, img.height));
  const W = Math.round(img.width * k), H = Math.round(img.height * k);
  const c = createCanvas(W, H), x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, W, H);
  x.imageSmoothingQuality = 'high'; x.filter = `blur(${o.blur ?? 0.6}px)`; x.drawImage(img, 0, 0, W, H);
  const d = x.getImageData(0, 0, W, H).data, thr = o.thr ?? 150;
  const B = new Uint8Array((W + 2) * (H + 2)), BW = W + 2;
  for (let yy = 0; yy < H; yy++) for (let xx = 0; xx < W; xx++) B[(yy + 1) * BW + xx + 1] = d[(yy * W + xx) * 4] < thr ? 1 : 0;
  const VW = BW + 1, NV = VW * (H + 3);
  const out1 = new Int8Array(NV).fill(-1), out2 = new Int8Array(NV).fill(-1);
  const add = (v, dir) => { if (out1[v] < 0) out1[v] = dir; else out2[v] = dir; };
  for (let yy = 1; yy <= H; yy++) for (let xx = 1; xx <= W; xx++) {
    if (!B[yy * BW + xx]) continue;
    if (!B[(yy - 1) * BW + xx]) add(yy * VW + xx, 0);
    if (!B[yy * BW + xx + 1]) add(yy * VW + xx + 1, 1);
    if (!B[(yy + 1) * BW + xx]) add((yy + 1) * VW + xx + 1, 2);
    if (!B[yy * BW + xx - 1]) add((yy + 1) * VW + xx, 3);
  }
  const DX = [1, 0, -1, 0], DY = [0, 1, 0, -1], used1 = new Uint8Array(NV), used2 = new Uint8Array(NV);
  const minA = o.minArea ?? 6, eps = o.eps ?? 0.7, parts = [];
  for (let v0 = 0; v0 < NV; v0++) {
    for (let s = 0; s < 2; s++) {
      const dir0 = s ? out2[v0] : out1[v0]; if (dir0 < 0 || (s ? used2[v0] : used1[v0])) continue;
      const pts = []; let v = v0, dir = dir0, prev = -1, guard = 0;
      (s ? used2 : used1)[v0] = 1;
      while (guard++ < 4e6) {
        if (dir !== prev) pts.push([v % VW, (v / VW) | 0]);
        prev = dir; v = v + DX[dir] + DY[dir] * VW;
        let nd;
        if (out2[v] >= 0) {
          const pr = (dir + 1) % 4;
          if (out1[v] === pr && !used1[v]) { nd = out1[v]; used1[v] = 1; }
          else if (out2[v] === pr && !used2[v]) { nd = out2[v]; used2[v] = 1; }
          else if (!used1[v]) { nd = out1[v]; used1[v] = 1; }
          else if (!used2[v]) { nd = out2[v]; used2[v] = 1; }
          else break;
        } else { if (used1[v]) break; nd = out1[v]; used1[v] = 1; }
        dir = nd;
      }
      let A = 0; for (let i = 0; i < pts.length; i++) { const p = pts[i], q = pts[(i + 1) % pts.length]; A += p[0] * q[1] - q[0] * p[1]; }
      if (Math.abs(A / 2) < minA) continue;
      // midpoints of pixel edges -> removes staircase, then RDP, then quadratic smoothing
      const m = []; for (let i = 0; i < pts.length; i++) { const p = pts[i], q = pts[(i + 1) % pts.length]; m.push([(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]); }
      let fi = 0, fd = 0; for (let i = 1; i < m.length; i++) { const dd = (m[i][0] - m[0][0]) ** 2 + (m[i][1] - m[0][1]) ** 2; if (dd > fd) { fd = dd; fi = i; } }
      const sp = rdp(m.slice(0, fi + 1), eps).concat(rdp(m.slice(fi).concat([m[0]]), eps).slice(1)); sp.pop(); if (sp.length < 3) continue;
      const f = n => (n - 1).toFixed(1).replace(/\.0$/, '');
      const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
      let s2 = 'M' + f(mid(sp[sp.length - 1], sp[0])[0]) + ' ' + f(mid(sp[sp.length - 1], sp[0])[1]);
      for (let i = 0; i < sp.length; i++) { const p = sp[i], q = mid(p, sp[(i + 1) % sp.length]); s2 += 'Q' + f(p[0]) + ' ' + f(p[1]) + ' ' + f(q[0]) + ' ' + f(q[1]); }
      parts.push(s2 + 'Z');
    }
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><path fill="#14171f" fill-rule="evenodd" d="${parts.join('')}"/></svg>`;
  await saveFile(out, svg); return out + ' ' + W + 'x' + H + ' ' + Math.round(svg.length / 1024) + 'KB';
}
function rdp(P, e) {
  if (P.length < 3) return P.slice(); const keep = new Uint8Array(P.length); keep[0] = keep[P.length - 1] = 1; const st = [[0, P.length - 1]];
  while (st.length) { const [a, b] = st.pop(); let md = 0, mi = -1; const ax = P[a][0], ay = P[a][1], bx = P[b][0], by = P[b][1], L = Math.hypot(bx - ax, by - ay) || 1;
    for (let i = a + 1; i < b; i++) { const dd = Math.abs((bx - ax) * (ay - P[i][1]) - (ax - P[i][0]) * (by - ay)) / L; if (dd > md) { md = dd; mi = i; } }
    if (md > e) { keep[mi] = 1; st.push([a, mi], [mi, b]); } }
  return P.filter((_, i) => keep[i]);
}
