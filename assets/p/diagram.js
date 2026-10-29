/* Explorable diagrams. Markup: <div class="dg" data-dg><script type="application/json">{...}</script></div>
   JSON: {ar:"16/7", nodes:[{id,x,y,label,sub,icon,big}], edges:[{from,to,label,step}], steps:["caption", ...], note}
   x/y are 0-100 (% of the stage). On narrow screens a node uses mx/my if given, else x and y swap so the diagram reads top to bottom.
   Nodes are clamped inside the stage.
   Steps light the edges whose step <= current and travel a packet along the newest ones; they auto-play while visible. */
(()=>{
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const NS='http://www.w3.org/2000/svg';
document.querySelectorAll('[data-dg]').forEach(root=>{
  let d;try{d=JSON.parse(root.querySelector('script[type="application/json"]').textContent)}catch(e){return}
  const ic=k=>(window.SwopKit&&SwopKit.icon&&k)?SwopKit.icon(k,15):'';
  root.classList.add('dg');
  const stage=document.createElement('div');stage.className='dg-stage';root.appendChild(stage);
  const svg=document.createElementNS(NS,'svg');svg.setAttribute('class','dg-wires');svg.setAttribute('aria-hidden','true');stage.appendChild(svg);
  const nodes={};
  d.nodes.forEach(n=>{const el=document.createElement('div');el.className='dg-node'+(n.big?' big':'');
    el.innerHTML=`<b>${n.icon?`<i>${ic(n.icon)}</i>`:''}${n.label}</b>${n.sub?`<small>${n.sub}</small>`:''}`;stage.appendChild(el);nodes[n.id]={...n,el}});
  const wires=d.edges.map(e=>{const p=document.createElementNS(NS,'path');p.setAttribute('class','dg-wire');svg.appendChild(p);
    const c=document.createElementNS(NS,'circle');c.setAttribute('r','4.5');c.setAttribute('class','dg-pkt');svg.appendChild(c);
    let t=null;if(e.label){t=document.createElementNS(NS,'text');t.setAttribute('class','dg-elab');t.setAttribute('text-anchor','middle');t.textContent=e.label;svg.appendChild(t)}
    return {...e,p,c,t}});
  const narrow=()=>stage.clientWidth<640;
  const layout=()=>{
    const n=narrow();stage.style.aspectRatio=n?(d.arMobile||'3/4'):(d.ar||'16/7');
    const W=stage.clientWidth,H=stage.clientHeight;svg.setAttribute('viewBox',`0 0 ${W} ${H}`);
    Object.values(nodes).forEach(o=>{const x=n?(o.mx??o.y):o.x,y=n?(o.my??o.x):o.y;
      const hw=o.el.offsetWidth/2,hh=o.el.offsetHeight/2;
      o.px=Math.min(W-hw,Math.max(hw,x/100*W));o.py=Math.min(H-hh,Math.max(hh,y/100*H));o.el.style.left=o.px+'px';o.el.style.top=o.py+'px'});
    wires.forEach(w=>{const a=nodes[w.from],b=nodes[w.to];if(!a||!b)return;
      const dx=b.px-a.px,dy=b.py-a.py,hz=Math.abs(dx)>=Math.abs(dy);
      const c1=hz?[a.px+dx*.5,a.py]:[a.px,a.py+dy*.5],c2=hz?[b.px-dx*.5,b.py]:[b.px,b.py-dy*.5];
      w.p.setAttribute('d',`M${a.px},${a.py} C${c1} ${c2} ${b.px},${b.py}`);
      if(w.t){w.t.style.display=n?'none':'';const k=n?.74:.5,lx=a.px+dx*k,ly=a.py+dy*k;
        w.t.setAttribute('x',hz?lx:lx+10);w.t.setAttribute('y',hz?ly-10:ly);w.t.setAttribute('text-anchor',hz?'middle':'start')}});
  };
  // step bar
  const steps=d.steps||[];let cur=-1,timer=null,vis=false,hover=false;
  const bar=document.createElement('div');bar.className='dg-steps';
  bar.innerHTML=steps.map((s,i)=>`<button type="button"><em>STEP ${String(i+1).padStart(2,'0')}</em>${s}<i></i></button>`).join('');
  bar.setAttribute('aria-label','Steps');if(steps.length)root.appendChild(bar);root.setAttribute('role','group');if(!root.getAttribute('aria-label')){const h=root.closest('section')&&root.closest('section').querySelector('h2');if(h)root.setAttribute('aria-label',h.textContent.trim())}
  if(d.note){const nt=document.createElement('p');nt.className='dg-note';nt.textContent=d.note;root.appendChild(nt)}
  const btns=[...bar.children];
  let raf;
  const run=(w)=>{const L=w.p.getTotalLength();if(!L)return;const t0=performance.now(),dur=1400;
    const f=t=>{const k=((t-t0)%dur)/dur,pt=w.p.getPointAtLength(L*k);w.c.setAttribute('cx',pt.x);w.c.setAttribute('cy',pt.y);if(w.c.classList.contains('on')&&vis)w._r=requestAnimationFrame(f)};
    cancelAnimationFrame(w._r);w._r=requestAnimationFrame(f)};
  const show=i=>{cur=i;const s=i+1;
    btns.forEach((b,j)=>{b.classList.toggle('on',j===i);b.classList.toggle('done',j<i);if(j===i)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current')});
    const live=new Set();
    wires.forEach(w=>{const on=!w.step||w.step<=s;w.p.classList.toggle('on',on);const newest=w.step===s||(!steps.length);
      w.c.classList.toggle('on',on&&newest&&!RM);if(on){live.add(w.from);live.add(w.to)}if(on&&newest&&!RM)run(w);if(w.t)w.t.style.opacity=on?1:.35});
    Object.entries(nodes).forEach(([id,o])=>{o.el.classList.toggle('hot',wires.some(w=>(w.step===s)&&(w.from===id||w.to===id)));o.el.classList.toggle('dim',steps.length>0&&!live.has(id))});
  };
  const tick=()=>{clearTimeout(timer);if(!vis||hover||RM||!steps.length)return;const dur=+(d.stepMs||2800);root.style.setProperty('--dgt',dur+'ms');
    timer=setTimeout(()=>{show((cur+1)%steps.length);tick()},dur)};
  btns.forEach((b,i)=>b.addEventListener('click',()=>{show(i);tick()}));
  root.addEventListener('pointerenter',()=>{hover=true;clearTimeout(timer)});root.addEventListener('pointerleave',()=>{hover=false;tick()});
  root.addEventListener('focusin',()=>{hover=true;clearTimeout(timer)});root.addEventListener('focusout',e=>{if(!root.contains(e.relatedTarget)){hover=false;tick()}});
  // hover a node: light its edges
  Object.entries(nodes).forEach(([id,o])=>{const lit=()=>wires.forEach(w=>w.p.classList.toggle('on',w.from===id||w.to===id)),back=()=>show(Math.max(cur,0));
    o.el.tabIndex=0;o.el.addEventListener('pointerenter',lit);o.el.addEventListener('focus',lit);o.el.addEventListener('pointerleave',back);o.el.addEventListener('blur',back)});
  layout();show(steps.length?0:-1);if(!steps.length)wires.forEach(w=>{w.p.classList.add('on');if(!RM){w.c.classList.add('on');run(w)}});
  new ResizeObserver(layout).observe(stage);
  new IntersectionObserver(es=>{vis=es[0].isIntersecting;if(vis){tick();wires.forEach(w=>{if(w.c.classList.contains('on'))run(w)})}else clearTimeout(timer)},{threshold:.35}).observe(root);
});
})();
