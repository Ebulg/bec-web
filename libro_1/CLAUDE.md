# Bernal's English Course — rebuild notes

Goal: rebuild the scanned textbook (uploads/bernals-english-course.pdf, 180 pages) as a clean book. Remove all pencil/pen handwriting (answers, checkmarks); keep printed content.

- Main file: `Bernal's English Course.dc.html` (data-driven renderer). v1 backup: `... v1.dc.html`.
- Content: `content/book.json` lists files in order; each `content/<f>.json` = {running, pages:[{src:[scanPages], blocks:[...]}]}.
- Scans: `scan/pNNN.jpg` (686x904). Lessons done: front, l01–l10 complete, ALL lessons l01–l30 + app.json (appendices) complete. Printed p156 (L28 opener) also MISSING from scan. New art: `eval hq.js, trace.js, art.js`; `arts([[name,pn,[x1,y1,x2,y2],eraseRects,{lo,hi}]])` → img/v/<name>.svg directly from scan. Next: QA pass for overflow, then PDF export. Block "side"{img,lines,h,w,left} = text beside image. NOTE: printed page 63 (Lesson Eleven opener) is MISSING from the scan (p066=printed 62, p067=printed 64). Appendix 1 at p173, Appendix 2 at p178.
- Block types: lesson{n,title,sub}, chap, part{n,title}, h, inst, p, sign, steps, note, ex{items:[[l,r]]}, grid{cols,shape:box|circle|plain,head,cellH,gap,items[{img,cap}]}, img{src,h,w,cap}, write{items[{q,a,lines,below,noLine}],num,cols,start,below,rowGap,qw,lines}, olist{items,cols,start,num}, pairs{rows}, figs{items[{img,cap,h,w}]}, alpha{letters}, rhyme{img,line,h}, complete{items}, conj{groups}, spacer{h}. Text markup: _underline_, *bold*, ___ blank.
- Image pipeline (always use new filenames — images cache):
  1. `eval(tools/crop.js)`; `cropAll(prefix,{pNNN:{name:[x1,y1,x2,y2,mode,eraseRects]}})` → img/<prefix>-<name>.png (mode box|circle|free).
  2. `eval(tools/hq.js)`; `hqFromOld(name,[scanPages],{keepBand})` → img/hq/<name>.png (4x smooth re-render; keepBand:true for free/large crops).
  3. Vectorize: `eval(tools/trace.js)`; `traceToSvg('img/hq/<n>.png','img/v/<n>.svg',{scale:k,minArea})` (k so max dim ≈700 grid / 2200 large). JSON references img/v/*.svg (crisp vector redraws).
- Verify with `?pages=a-b` query (full doc is too heavy to screenshot); console logs "Overflow(late): ..." after ~7s.
- Style: blue oklch(0.5 0.17 258), navy oklch(0.36 0.11 258), Atkinson Hyperlegible + Source Serif 4, framed pages, centered blue page numbers.
