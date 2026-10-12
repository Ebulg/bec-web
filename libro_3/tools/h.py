import json, os, sys
R='/home/user/bec-web/libro_3'
def lesson(n, word, ordw, sub=None): return {"t":"lesson","n":n,"title":"Lesson "+word,"sub":sub or f"{ordw} Lesson"}
def part(n,t): return {"t":"part","n":n,"title":t}
def h(t): return {"t":"h","text":t}
def inst(t): return {"t":"inst","text":t}
def p(t): return {"t":"p","text":t}
def note(t): return {"t":"note","text":t}
def img(s,hh,**k): return {"t":"img","src":f"img/v/{s}.svg","h":hh,**k}
def dlg(*lines, num=False): return {"t":"olist","num":num,"items":list(lines)}
def ol(*items, **k): return {"t":"olist","items":list(items),**k}
def wb(*qs, rg="8px", **k): return {"t":"write","below":True,"rowGap":rg,"items":[q if isinstance(q,dict) else {"q":q} for q in qs],**k}
def wi(*qs, rg="10px", **k): return {"t":"write","rowGap":rg,"items":[q if isinstance(q,dict) else {"q":q} for q in qs],**k}
def lines(n, rg="8px"): return {"t":"write","num":False,"rowGap":rg,"items":[{"q":""} for _ in range(n)]}
def pairs(*rows): return {"t":"pairs","rows":[list(r) for r in rows]}
def table(rows, **k): return {"t":"table","rows":[list(r) for r in rows],**k}
def pg(src,*blocks): return {"src":src if isinstance(src,list) else [src],"blocks":list(blocks)}
def save(f, running, pages, jobs=None):
    json.dump({"running":running,"pages":pages}, open(f'{R}/content/{f}.json','w'), ensure_ascii=False)
    if jobs is not None:
        json.dump(jobs, open(f'{R}/tools/jobs/{f}.json','w'))
    b=json.load(open(f'{R}/content/book.json')) if os.path.exists(f'{R}/content/book.json') else {"files":["front"]}
    if f not in b['files']: b['files'].append(f); b['files']=["front"]+sorted(x for x in b['files'] if x!='front')
    json.dump(b, open(f'{R}/content/book.json','w'))
