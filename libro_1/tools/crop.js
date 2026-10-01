// eval'd inside run_script. Exposes cropAll(prefix, C) where C = {pageKey:{name:[x1,y1,x2,y2, mode]}}
// mode: 'box' (default) snaps to frame lines and crops inside; 'circle' keeps circle; 'free' crops as given.
const lv=(v,lo,hi)=>v<=lo?0:v>=hi?255:Math.round((v-lo)/(hi-lo)*255);
function gray(d,w,x,y){const i=(y*w+x)*4;return 0.3*d[i]+0.59*d[i+1]+0.11*d[i+2];}
function snap(d,W,H,box){let [x1,y1,x2,y2]=box;const R=16;
  const colScore=(x,ya,yb)=>{let n=0;for(let y=ya;y<yb;y++)if(gray(d,W,x,y)<110)n++;return n/(yb-ya);};
  const rowScore=(y,xa,xb)=>{let n=0;for(let x=xa;x<xb;x++)if(gray(d,W,x,y)<110)n++;return n/(xb-xa);};
  const best=(f,c,lo,hi)=>{let bv=-1,bc=c;for(let k=Math.max(lo,c-R);k<=Math.min(hi,c+R);k++){const v=f(k);if(v>bv){bv=v;bc=k;}}return [bc,bv];};
  const my1=y1+(y2-y1)*0.2|0,my2=y2-(y2-y1)*0.2|0,mx1=x1+(x2-x1)*0.2|0,mx2=x2-(x2-x1)*0.2|0;
  const L=best(x=>colScore(x,my1,my2),x1,0,W-1),Rr=best(x=>colScore(x,my1,my2),x2,0,W-1);
  const T=best(y=>rowScore(y,mx1,mx2),y1,0,H-1),B=best(y=>rowScore(y,mx1,mx2),y2,0,H-1);
  const ok=v=>v>0.45;
  return [ok(L[1])?L[0]+4:x1, ok(T[1])?T[0]+4:y1, ok(Rr[1])?Rr[0]-3:x2, ok(B[1])?B[0]-3:y2];}
async function cropAll(prefix,C,opts={}){const out=[];
 for(const pg in C){const img=await readImage('scan/'+pg+'.jpg');const W=img.width,H=img.height;
  const sc=createCanvas(W,H);const sctx=sc.getContext('2d');sctx.drawImage(img,0,0);const sd=sctx.getImageData(0,0,W,H).data;
  for(const name in C[pg]){const spec=C[pg][name];const mode=spec[4]||'box';let b=spec.slice(0,4);
   if(mode==='box')b=[b[0]-10,b[1]-10,b[2]+10,b[3]+(opts.bot??2)];
   if(mode==='circle')b=[b[0]-8,b[1]-8,b[2]+8,b[3]+8];
   b=[Math.max(0,b[0]),Math.max(0,b[1]),Math.min(W,b[2]),Math.min(H,b[3])];
   const w=b[2]-b[0],h=b[3]-b[1],S=2;const er=spec[5]||[];const c=createCanvas(w*S,h*S);const ctx=c.getContext('2d');ctx.imageSmoothingQuality='high';
   ctx.drawImage(img,b[0],b[1],w,h,0,0,w*S,h*S);ctx.fillStyle='#fff';for(const e of er)ctx.fillRect((e[0]-b[0])*S,(e[1]-b[1])*S,(e[2]-e[0])*S,(e[3]-e[1])*S);const d=ctx.getImageData(0,0,w*S,h*S);const a=d.data;
   const lo=opts.lo??60,hi=opts.hi??150;
   for(let i=0;i<a.length;i+=4){const g=0.3*a[i]+0.59*a[i+1]+0.11*a[i+2];const v=lv(g,lo,hi);a[i]=a[i+1]=a[i+2]=v;}
   if(mode==='box'){const WW=w*S,HH=h*S,B=opts.band??34;for(let y=0;y<HH;y++)for(let x=0;x<WW;x++){if(x<B||y<B||x>=WW-B||y>=HH-B){const i=(y*WW+x)*4;if(a[i]>(opts.bandT??110)){a[i]=a[i+1]=a[i+2]=255;}}}
   const fr=(y)=>{let n=0;for(let x=0;x<WW;x++)if(a[(y*WW+x)*4]<200)n++;return n/WW;},fc=(x)=>{let n=0;for(let y=0;y<HH;y++)if(a[(y*WW+x)*4]<200)n++;return n/HH;};
   const wr=y=>{for(let x=0;x<WW;x++){const i=(y*WW+x)*4;a[i]=a[i+1]=a[i+2]=255;}},wc=x=>{for(let y=0;y<HH;y++){const i=(y*WW+x)*4;a[i]=a[i+1]=a[i+2]=255;}};
   for(let y=0;y<B;y++){if(fr(y)>0.22)wr(y);} for(let y=HH-B;y<HH;y++){if(fr(y)>0.22)wr(y);} for(let x=0;x<B;x++){if(fc(x)>0.22)wc(x);} for(let x=WW-B;x<WW;x++){if(fc(x)>0.22)wc(x);}}
   ctx.putImageData(d,0,0);const t=trim(a,w*S,h*S);let outC=c;if(t){const pad=10;const tw=t[2]-t[0]+pad*2,th=t[3]-t[1]+pad*2;outC=createCanvas(tw,th);const o=outC.getContext('2d');o.fillStyle='#fff';o.fillRect(0,0,tw,th);o.drawImage(c,t[0],t[1],t[2]-t[0],t[3]-t[1],pad,pad,t[2]-t[0],t[3]-t[1]);}
   await saveFile('img/'+prefix+'-'+name+'.png',outC);out.push(name+':'+b.join(','));}}
 return out;}
async function sheet(prefix,names,path='scan/check.jpg'){const n=names.length,cols=6,rows=Math.ceil(n/cols);
 const c=createCanvas(cols*200,rows*200);const ctx=c.getContext('2d');ctx.fillStyle='#bbb';ctx.fillRect(0,0,c.width,c.height);
 for(let i=0;i<n;i++){const im=await readImage('img/'+prefix+'-'+names[i]+'.png');const s=Math.min(190/im.width,190/im.height);ctx.drawImage(im,(i%cols)*200+5,Math.floor(i/cols)*200+5,im.width*s,im.height*s);}
 await saveFile(path,await c.convertToBlob({type:'image/jpeg',quality:0.7}));}

function deframe(a,w,h){const dark=(x,y)=>a[(y*w+x)*4]<225;
 const rowF=y=>{let n=0;for(let x=0;x<w;x++)if(dark(x,y))n++;return n/w;};
 const colF=x=>{let n=0;for(let y=0;y<h;y++)if(dark(x,y))n++;return n/h;};
 const clearRows=(ya,yb)=>{for(let y=ya;y<=yb;y++)for(let x=0;x<w;x++){const i=(y*w+x)*4;a[i]=a[i+1]=a[i+2]=255;}};
 const clearCols=(xa,xb)=>{for(let x=xa;x<=xb;x++)for(let y=0;y<h;y++){const i=(y*w+x)*4;a[i]=a[i+1]=a[i+2]=255;}};
 const bh=Math.floor(h*0.22),bw=Math.floor(w*0.22),T=0.45,O=7;const isL=(f,k,n)=>{const v=f(k);if(v<=T)return false;const a1=k-O>=0?f(k-O):0,a2=k+O<n?f(k+O):0;return a1<v*0.45&&a2<v*0.45;};
 let t=-1;for(let y=0;y<bh;y++)if(isL(rowF,y,h))t=y; if(t>=0)clearRows(0,Math.min(h-1,t+3));
 let b=-1;for(let y=h-1;y>h-bh;y--)if(isL(rowF,y,h))b=y; if(b>=0)clearRows(Math.max(0,b-3),h-1);
 let l=-1;for(let x=0;x<bw;x++)if(isL(colF,x,w))l=x; if(l>=0)clearCols(0,Math.min(w-1,l+3));
 let r=-1;for(let x=w-1;x>w-bw;x--)if(isL(colF,x,w))r=x; if(r>=0)clearCols(Math.max(0,r-3),w-1);}
function trim(a,w,h){let x1=w,y1=h,x2=-1,y2=-1;for(let y=0;y<h;y++)for(let x=0;x<w;x++){if(a[(y*w+x)*4]<160){if(x<x1)x1=x;if(x>x2)x2=x;if(y<y1)y1=y;if(y>y2)y2=y;}}return x2<0?null:[x1,y1,x2+1,y2+1];}
