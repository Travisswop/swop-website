/* Product page kit: behaviour shared by every product page. Load after GSAP 3.12.5, ScrollTrigger and Lenis 1.1.13.
   Everything degrades: no JS shows the static page, prefers-reduced-motion skips smooth scroll, splits and the shader. */
(()=>{
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE=matchMedia('(hover:hover) and (pointer:fine)').matches;
document.documentElement.classList.add('js');

/* every product page, so each page can link to all the others (status = what is true today) */
const IC={
 owl:'<circle cx="8.5" cy="11" r="3.2"/><circle cx="15.5" cy="11" r="3.2"/><path d="M12 13.5l-1 1.5h2zM5 6l3 2M19 6l-3 2M6 18c3 3 9 3 12 0"/>',
 world:'<path d="M3 20h18M5 20V9l4-3 4 3v11M13 20v-7l3-2 3 2v7"/>',
 market:'<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5v17M12 12l6-5"/>',
 plug:'<path d="M8 3v5M16 3v5M6 8h12v3a6 6 0 0 1-12 0zM12 17v4"/>',
 key:'<circle cx="8" cy="12" r="4"/><path d="M12 12h9M18 12v3M21 12v2"/>',
 id:'<circle cx="12" cy="8" r="3.5"/><path d="M5 20c1.4-4 12.6-4 14 0"/>',
 pay:'<rect x="3" y="6" width="18" height="12" rx="3"/><path d="M3 10h18M7 15h3"/>',
 pin:'<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
 trade:'<path d="M3 17l6-6 4 4 8-8M15 7h6v6"/>',
 live:'<rect x="3" y="6" width="13" height="12" rx="3"/><path d="M16 10l5-3v10l-5-3"/>',
 coin:'<circle cx="12" cy="12" r="8.5"/><path d="M14.5 9.5c-.5-1-1.5-1.5-2.5-1.5-1.7 0-2.8.9-2.8 2s1.1 1.7 2.8 2c1.7.3 2.8.9 2.8 2s-1.1 2-2.8 2c-1 0-2-.5-2.5-1.5M12 6.5v11"/>',
 card:'<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M15 9.5a4 4 0 0 1 0 5M17.5 8a6.5 6.5 0 0 1 0 8"/>'
};
const P=[
 ['swopid','swop.id','live','Your name, your page, your wallet.','id','#3FE08F'],
 ['pay','Swop Pay','live','One link. People and AI agents pay you.','pay','#3FE08F'],
 ['geobucks','Geo Bucks','live','Store credit and drops on the map.','pin','#f5c842'],
 ['trade','Trading','live','Swaps, perps and predictions, social.','trade','#38bdf8'],
 ['ovi','Ovi','beta','The AI that does it, after you approve.','owl','#c084fc'],
 ['mcp','Swop MCP','live','Swop inside Claude, ChatGPT and Grok.','plug','#3FE08F'],
 ['eldorado','El Dorado','beta','The virtual world of Swop.','world','#f5c842'],
 ['decentrabet','Decentrabet','beta','Set the odds. Deploy your own market.','market','#38bdf8'],
 ['live','Swop Live','live','Go live and sell while you stream.','live','#ff5d6c'],
 ['token','SWOP','live','The token that powers the ecosystem.','coin','#f5c842'],
 ['swivy','Swivy','building','Wallets and login, for every app.','key','#38bdf8'],
 ['shop','Swop Shop','live','The NFC card that opens your page.','card','#3FE08F']
];
const svgI=(k,s=20)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[k]||''}</svg>`;
const SL={live:'Live',beta:'Beta',building:'Building',planned:'Planned'};
window.SwopKit={icon:svgI,products:P};

/* fill [data-ic="name"] icons */
$$('[data-ic]').forEach(el=>{el.innerHTML=svgI(el.dataset.ic,+el.dataset.s||20)});

/* "More from Swop" rail: every product but this one */
const me=document.body.dataset.p;
$$('[data-more]').forEach(el=>{
  el.innerHTML=P.filter(p=>p[0]!==me).map(([k,n,s,d,i,c])=>`<a class="mc" href="/${k}" style="--pc:${c}"><div class="pi">${svgI(i,22)}</div><b>${n}</b><span>${d}</span><em class="st ${s}">${SL[s]}</em></a>`).join('');
});
/* "Plugs into" chips: data-plugs="pay:One line on how it connects|ovi:..." */
$$('[data-plugs]').forEach(el=>{
  el.innerHTML=el.dataset.plugs.split('|').map(x=>{const [k,t]=x.split(':');const p=P.find(q=>q[0]===k);if(!p)return'';
    return `<a class="plug" href="/${k}" style="--pc:${p[5]}"><div class="pi">${svgI(p[4],20)}</div><b>${p[1]} <em class="st ${p[2]}">${SL[p[2]]}</em></b><span>${t}</span></a>`}).join('');
});

/* split headings into words + chars for the masked reveal */
$$('[data-split]').forEach(el=>{
  let i=0;
  const walk=n=>{
    [...n.childNodes].forEach(c=>{
      if(c.nodeType===3){
        const f=document.createDocumentFragment();
        c.textContent.split(/(\s+)/).forEach(t=>{
          if(!t)return; if(/^\s+$/.test(t)){f.appendChild(document.createTextNode(t));return}
          const w=document.createElement('span');w.className='w';
          [...t].forEach(ch=>{const s=document.createElement('span');s.className='ch';s.textContent=ch;s.style.setProperty('--i',i++);w.appendChild(s)});
          f.appendChild(w);
        });
        c.replaceWith(f);
      }else if(c.nodeType===1&&!c.classList.contains('roll'))walk(c);
    });
  };
  walk(el);el.classList.add('split-in','split-mask');
});

/* reveal on enter */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in','go');io.unobserve(e.target)}}),{rootMargin:'0px 0px -10% 0px'});
const inView=el=>{const r=el.getBoundingClientRect();return r.top<innerHeight&&r.bottom>0};
$$('[data-rv],.split-in').forEach(el=>{if(inView(el))setTimeout(()=>el.classList.add('in','go'),60);else io.observe(el)});
/* belt and braces: IO can stall in background tabs, so anything already scrolled past gets shown on scroll */
addEventListener('scroll',()=>$$('[data-rv]:not(.in),.split-in:not(.go)').forEach(el=>{if(el.getBoundingClientRect().top<innerHeight*.92){el.classList.add('in','go');io.unobserve(el)}}),{passive:true});

/* scrub one-liner: wrap words, light them as the block crosses the viewport */
$$('[data-scrub]').forEach(el=>{
  const walk=n=>[...n.childNodes].forEach(c=>{
    if(c.nodeType===3){const f=document.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(t=>{if(!t)return;if(/^\s+$/.test(t)){f.appendChild(document.createTextNode(t));return}const w=document.createElement('span');w.className='w'+(n.tagName==='EM'?' k':'');w.textContent=t;f.appendChild(w)});c.replaceWith(f)}
    else if(c.nodeType===1){walk(c);if(c.tagName==='EM')c.replaceWith(...c.childNodes)}
  });
  walk(el);
});

/* nav, progress bar, section links */
const nav=$('nav.top'),bar=$('.pbar');
const links=$$('.navlinks a[href^="#"]');
const onScroll=()=>{
  const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;
  nav&&nav.classList.toggle('solid',y>30);
  bar&&(bar.style.transform=`scaleX(${h>0?y/h:0})`);
  $$('[data-scrub]').forEach(el=>{
    const r=el.getBoundingClientRect(),ws=$$('.w',el);
    const p=Math.min(1,Math.max(0,(innerHeight*.8-r.top)/(r.height+innerHeight*.35)));
    const n=Math.round(p*ws.length);ws.forEach((w,i)=>w.classList.toggle('on',i<n));
  });
  $$('.flow').forEach(f=>{
    const r=f.getBoundingClientRect(),p=Math.min(1,Math.max(0,(innerHeight*.75-r.top)/(r.height+innerHeight*.15)));
    f.style.setProperty('--p',p.toFixed(3));
    const st=$$('.fs',f);st.forEach((s,i)=>s.classList.toggle('on',p>=(i/(st.length-.6))));
  });
  let cur=null;links.forEach(a=>{const s=$(a.getAttribute('href'));if(s&&s.getBoundingClientRect().top<innerHeight*.4)cur=a});
  links.forEach(a=>a.classList.toggle('on',a===cur));
};
let tick=false;addEventListener('scroll',()=>{if(!tick){tick=true;requestAnimationFrame(()=>{onScroll();tick=false})}},{passive:true});
addEventListener('resize',onScroll);onScroll();

/* sticky story: the beat nearest the middle drives the device screen */
$$('.story').forEach(st=>{
  const beats=$$('.beat',st),scrs=$$('.stick .scr',st);
  const set=i=>{beats.forEach((b,j)=>b.classList.toggle('on',j===i));scrs.forEach(s=>{const on=+s.dataset.i===i;if(on&&!s.classList.contains('on')){s.classList.add('on');play(s)}else if(!on)s.classList.remove('on')});};
  const bo=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)set(beats.indexOf(e.target))}),{rootMargin:'-45% 0px -45% 0px'});
  beats.forEach(b=>bo.observe(b));set(0);
});
/* chat screens: bubbles appear one after another (data-delay ms between them) */
function play(scr){
  const ms=$$('.msg,.approve,[data-step]',scr);if(!ms.length)return;
  ms.forEach(m=>m.classList.remove('in'));
  if(RM){ms.forEach(m=>m.classList.add('in'));return}
  clearTimeout(scr._t);let k=0;const gap=+scr.dataset.delay||650;
  const nx=()=>{if(k<ms.length&&scr.classList.contains('on')){ms[k++].classList.add('in');scr._t=setTimeout(nx,gap)}};scr._t=setTimeout(nx,250);
}
window.SwopKit.play=play;
$$('[data-play]').forEach(s=>{const o=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){s.classList.add('on');play(s)}}),{threshold:.4});o.observe(s)});

/* typed lines: <span data-type="text"> types when visible */
$$('[data-type]').forEach(el=>{
  const txt=el.dataset.type;el.textContent=RM?txt:'';
  if(RM)return;
  const o=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting||el._d)return;el._d=1;let i=0;const t=()=>{el.textContent=txt.slice(0,++i);if(i<txt.length)setTimeout(t,18+Math.random()*30)};setTimeout(t,+el.dataset.wait||0)}),{threshold:.6});o.observe(el);
});

/* counters: <b data-count="1011" data-dec="0" data-pre="$" data-suf="+"> */
$$('[data-count]').forEach(el=>{
  const to=+el.dataset.count,dec=+(el.dataset.dec||0),pre=el.dataset.pre||'',suf=el.dataset.suf||'';
  const fmt=v=>pre+v.toLocaleString('en-US',{minimumFractionDigits:dec,maximumFractionDigits:dec})+suf;
  if(RM){el.textContent=fmt(to);return}
  el.textContent=fmt(0);
  const o=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;o.disconnect();const t0=performance.now(),d=1400;
    const f=t=>{const p=Math.min(1,(t-t0)/d),v=to*(1-Math.pow(1-p,4));el.textContent=fmt(v);if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)}),{threshold:.5});o.observe(el);
});

/* marquee: duplicate the track so it loops */
$$('.marq .tr').forEach(t=>{t.innerHTML+=t.innerHTML;$$('.it',t).slice(t.children.length/2).forEach(x=>x.setAttribute('aria-hidden','true'))});

/* cursor spotlight on bento cards + magnetic primary buttons */
if(FINE){
  $$('.bx,.cta').forEach(b=>b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.setProperty('--mx',e.clientX-r.left+'px');b.style.setProperty('--my',e.clientY-r.top+'px')}));
  if(!RM)$$('.btn-a').forEach(b=>{b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.18}px,${(e.clientY-r.top-r.height/2)*.3-2}px)`});b.addEventListener('pointerleave',()=>b.style.transform='')});
}

/* WebGL aura: a slow accent-tinted noise field behind the hero. One draw call, paused off-screen, DPR capped. */
$$('canvas[data-shader]').forEach(cv=>{
  if(RM)return;
  const gl=cv.getContext('webgl',{premultipliedAlpha:false,antialias:false});if(!gl)return;
  const hex=getComputedStyle(document.body).getPropertyValue('--acc').trim()||'#3FE08F';
  const c=hex.match(/[0-9a-f]{2}/gi).map(x=>parseInt(x,16)/255);
  const vs='attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  const fs=`precision mediump float;uniform vec2 r;uniform float t;uniform vec2 m;uniform vec3 a;
  float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
  float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
  float fb(vec2 p){float v=0.,s=.5;for(int i=0;i<5;i++){v+=s*n(p);p*=2.02;s*=.5;}return v;}
  void main(){vec2 u=gl_FragCoord.xy/r;vec2 q=u*vec2(r.x/r.y,1.)*2.2;
    float f=fb(q+vec2(t*.04,-t*.03)+fb(q*1.3-t*.05));
    float g=smoothstep(.45,.95,f)*(1.-distance(u,m)*.9);
    vec3 col=mix(vec3(.004,.004,.03),a,g*.4)+vec3(.22,.74,.97)*smoothstep(.62,1.,fb(q*.7+t*.02))*.10;
    gl_FragColor=vec4(col,1.);}`;
  const sh=(t,s)=>{const o=gl.createShader(t);gl.shaderSource(o,s);gl.compileShader(o);return o};
  const pr=gl.createProgram();gl.attachShader(pr,sh(gl.VERTEX_SHADER,vs));gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,fs));gl.linkProgram(pr);gl.useProgram(pr);
  const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
  const lp=gl.getAttribLocation(pr,'p');gl.enableVertexAttribArray(lp);gl.vertexAttribPointer(lp,2,gl.FLOAT,false,0,0);
  const ur=gl.getUniformLocation(pr,'r'),ut=gl.getUniformLocation(pr,'t'),um=gl.getUniformLocation(pr,'m');gl.uniform3f(gl.getUniformLocation(pr,'a'),c[0],c[1],c[2]);
  let mx=.65,my=.55,tx=mx,ty=my,vis=true,raf;
  const size=()=>{const d=Math.min(devicePixelRatio,1.5)*.5;cv.width=cv.clientWidth*d;cv.height=cv.clientHeight*d;gl.viewport(0,0,cv.width,cv.height);gl.uniform2f(ur,cv.width,cv.height)};
  size();addEventListener('resize',size);
  if(FINE)addEventListener('pointermove',e=>{tx=e.clientX/innerWidth;ty=1-e.clientY/innerHeight},{passive:true});
  new IntersectionObserver(es=>{vis=es[0].isIntersecting;if(vis)loop()}).observe(cv);
  const t0=performance.now();
  function loop(){cancelAnimationFrame(raf);if(!vis||document.hidden)return;mx+=(tx-mx)*.04;my+=(ty-my)*.04;gl.uniform2f(um,mx,my);gl.uniform1f(ut,(performance.now()-t0)/1000);gl.drawArrays(gl.TRIANGLE_STRIP,0,4);raf=requestAnimationFrame(loop)}
  document.addEventListener('visibilitychange',loop);loop();
});

/* smooth scroll (Lenis) wired into GSAP when present */
if(!RM&&window.Lenis){
  const lenis=new Lenis({lerp:.11,smoothWheel:true});window.SwopKit.lenis=lenis;
  if(window.gsap&&window.ScrollTrigger){gsap.registerPlugin(ScrollTrigger);lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(t=>lenis.raf(t*1000));gsap.ticker.lagSmoothing(0)}
  else{const r=t=>{lenis.raf(t);requestAnimationFrame(r)};requestAnimationFrame(r)}
  $$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const id=a.getAttribute('href');if(id.length>1&&$(id)){e.preventDefault();lenis.scrollTo(id,{offset:-70})}}));
}
})();
