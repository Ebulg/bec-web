# Bernal's English Course — Second Book (rebuild notes)

Same architecture as `libro_1` (see `../libro_1/CLAUDE.md`): `index.html` is the data-driven renderer, `content/book.json` lists the parts in order and each `content/<f>.json` = {running, pages:[{src:[scanPages], blocks:[...]}]}.

- Source: `uploads/bernals-english-course-second-book.pdf` (88 scanned pages) → `scan/pNNN.jpg` (827x1169). `src` numbers = scan page = printed page number.
- 25 lessons (l01–l25), no appendices. Front = cover (art: `img/v/cover-art.svg`) + title page.
- Block types: all of libro_1's, plus `brace{groups:[{label,items,after}],justify}` (word-substitution braces) and `table{head,rows,colsW,w,align}`.
- Image pipeline (Python/Node port of libro_1's art.js + trace.js, runs without a browser):
  `python3 -I tools/art.py tools/jobs/<lesson>.json [--only a,b] [--preview DIR]`
  job = [name, scanPage, [x1,y1,x2,y2], eraseRects, {keepLines, lo, hi, S, blur, minArea}] → `img/v/<name>.svg`.
  Use `keepLines:true` for framed boxes / speech balloons / grammar charts. Needs `opencv-python-headless`.
- Style identical to libro_1 (blue oklch(0.5 0.17 258)); the cover uses a navy palette instead of red to tell the books apart.
