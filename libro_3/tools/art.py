"""Python port of libro_1/tools/art.js (+ cleanCC from hq.js).

Crops a region of a scan page, re-renders it smooth at high resolution,
cleans specks / frame lines, and vectorizes it with tools/trace.cjs.

usage: python3 -I tools/art.py jobs.json [--only name1,name2] [--preview DIR]
jobs.json = [[name, page, [x1,y1,x2,y2], eraseRects, opts], ...]   (scan coords, scan/pNNN.jpg 827x1169)
opts: S (scale), blur, lo, hi, minArea, vmin, eps, keepLines, band
-> img/v/<name>.svg
"""
import json, os, subprocess, sys, tempfile

import cv2
import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def edge_lines(g, S):
    H, W = g.shape
    band, wipe = round(S * 14), round(S * 2.2)
    dark = g < 200
    rows = [y for y in list(range(band)) + list(range(H - band, H)) if 0 <= y < H and dark[y].mean() > 0.3]
    cols = [x for x in list(range(band)) + list(range(W - band, W)) if 0 <= x < W and dark[:, x].mean() > 0.3]
    for y in rows:
        g[max(0, y - wipe):y + wipe + 1, :] = 255
    for x in cols:
        g[:, max(0, x - wipe):x + wipe + 1] = 255


def clean_cc(g, min_area, band=None):
    H, W = g.shape
    n, lab, st, _ = cv2.connectedComponentsWithStats((g < 150).astype(np.uint8), connectivity=4)
    bw, bh = (round(W * band), round(H * band)) if band else (0, 0)
    kill = np.zeros(n, bool)
    for i in range(1, n):
        x, y, w, h, a = st[i]
        in_band = band and (x + w - 1 < bw or x > W - bw or y + h - 1 < bh or y > H - bh)
        if a < min_area or in_band:
            kill[i] = True
    g[kill[lab]] = 255


def remove_lines(g, S):
    H, W = g.shape
    n, lab, st, _ = cv2.connectedComponentsWithStats((g < 150).astype(np.uint8), connectivity=4)
    thin = S * 6
    kill = np.zeros(n, bool)
    for i in range(1, n):
        x, y, bw, bh, _ = st[i]
        line = (bw <= thin and bh > H * 0.25) or (bh <= thin and bw > W * 0.25)
        edge = x <= 2 or y <= 2 or x + bw - 1 >= W - 3 or y + bh - 1 >= H - 3
        if line and (edge or bw > W * 0.6 or bh > H * 0.6):
            kill[i] = True
    g[kill[lab]] = 255


def art(name, pn, box, erase=(), o=None):
    o = o or {}
    img = cv2.imread(os.path.join(ROOT, 'scan', 'p%03d.jpg' % pn))
    x1, y1, x2, y2 = box
    w, h = x2 - x1, y2 - y1
    S = o.get('S', min(6, 2400 / max(w, h)))
    W, H = round(w * S), round(h * S)
    crop = img[y1:y2, x1:x2]
    g = cv2.cvtColor(crop, cv2.COLOR_BGR2GRAY).astype(np.float32)
    g = cv2.resize(g, (W, H), interpolation=cv2.INTER_CUBIC)
    sig = o.get('blur', S * 0.3)
    if sig > 0:
        g = cv2.GaussianBlur(g, (0, 0), sig)
    for e in erase:
        ex1, ey1, ex2, ey2 = [round((v - off) * S) for v, off in zip(e, (x1, y1, x1, y1))]
        g[max(0, ey1):max(0, ey2), max(0, ex1):max(0, ex2)] = 255
    lo, hi = o.get('lo', 95), o.get('hi', 175)
    g = np.clip((g - lo) / (hi - lo), 0, 1) * 255
    g = g.astype(np.uint8)
    if not o.get('keepLines'):
        edge_lines(g, S)
    clean_cc(g, o.get('minArea', round(S * S * 2.5)), o.get('band'))
    if not o.get('keepLines'):
        remove_lines(g, S)
    return g


def main():
    args = sys.argv[1:]
    jobs = json.load(open(args[0]))
    only = None
    prev = None
    if '--only' in args:
        only = set(args[args.index('--only') + 1].split(','))
    if '--preview' in args:
        prev = args[args.index('--preview') + 1]
        os.makedirs(prev, exist_ok=True)
    tracer = os.path.join(ROOT, 'tools', 'trace.cjs')
    for job in jobs:
        name, pn, box = job[0], job[1], job[2]
        erase = job[3] if len(job) > 3 else []
        o = job[4] if len(job) > 4 else {}
        if only and name not in only:
            continue
        g = art(name, pn, box, erase, o)
        with tempfile.NamedTemporaryFile(suffix='.pgm', delete=False) as t:
            tmp = t.name
        cv2.imwrite(tmp, g)
        out = os.path.join(ROOT, 'img', 'v', name + '.svg')
        cmd = ['node', tracer, tmp, out, '150', str(o.get('vmin', 4)), str(o.get('eps', 0.8))]
        print(subprocess.run(cmd, capture_output=True, text=True, check=True).stdout.strip())
        if prev:
            small = cv2.resize(g, None, fx=min(1, 600 / max(g.shape)), fy=min(1, 600 / max(g.shape)), interpolation=cv2.INTER_AREA)
            cv2.imwrite(os.path.join(prev, name + '.png'), small)
        os.unlink(tmp)


if __name__ == '__main__':
    main()
