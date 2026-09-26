(function(){var ham=document.getElementById('ham'),mnav=document.getElementById('mnav');if(!ham||!mnav)return;function close(){ham.setAttribute('aria-expanded','false');ham.setAttribute('aria-label','Open menu');mnav.hidden=true;document.body.style.overflow='';}function open(){ham.setAttribute('aria-expanded','true');ham.setAttribute('aria-label','Close menu');mnav.hidden=false;}ham.addEventListener('click',function(){var isOpen=ham.getAttribute('aria-expanded')==='true';isOpen?close():open();});mnav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',close);});document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!mnav.hidden)close();});document.addEventListener('click',function(e){if(!mnav.hidden&&!mnav.contains(e.target)&&!ham.contains(e.target))close();});window.addEventListener('resize',function(){if(window.innerWidth>900&&!mnav.hidden)close();});})();
(function(){var sel='.track,.ptrack,.cartpt';function set(p){document.querySelectorAll(sel).forEach(function(el){el.style.animationPlayState=p;});}document.addEventListener('visibilitychange',function(){set(document.hidden?'paused':'running');});})();
(function(){var ul=document.getElementById('arch'),items=[].slice.call(ul.children),f='all',open=false,mb=document.getElementById('more');
function draw(){items.forEach(function(li){var show=f==='all'?(open||!li.classList.contains('more')):li.dataset.fmt===f;li.hidden=!show;});}
var btns=[].slice.call(document.querySelectorAll('.ft'));
btns.forEach(function(b){b.addEventListener('click',function(){f=(b.classList.contains('ft')&&b.getAttribute('aria-pressed')==='true')?'all':b.dataset.f;btns.forEach(function(x){x.setAttribute('aria-pressed',x.dataset.f===f)});draw();});});
draw();})();
(function(){var t=document.getElementById('track');if(t){t.innerHTML+=t.innerHTML;[].forEach.call(t.querySelectorAll('img'),function(im,i){if(i>=t.children.length/2)im.setAttribute('aria-hidden','true')});}})();
(function(){var t=document.querySelector('.laugh .ptrack');if(!t)return;var k=[].slice.call(t.children);for(var i=k.length-1;i>0;i--){var j=(Math.random()*(i+1))|0,tmp=k[i];k[i]=k[j];k[j]=tmp;}k.forEach(function(e){t.appendChild(e);});})();
(function(){var t=document.querySelector('.laugh .ptrack');if(t){t.innerHTML+=t.innerHTML;[].forEach.call(t.querySelectorAll('img'),function(im,i){if(i>=t.children.length/2)im.setAttribute('aria-hidden','true')});}})();
(function(){[].forEach.call(document.querySelectorAll('.cartpt'),function(t){t.innerHTML+=t.innerHTML;[].forEach.call(t.querySelectorAll('figure'),function(f,i){if(i>=t.children.length/2)f.setAttribute('aria-hidden','true')});});})();
(function(){
/* scroll-linked marquees: position is tied to scrollY, so scrolling back up brings everything back to where it was */
var still=matchMedia('(prefers-reduced-motion: reduce)').matches;
function jjfill(r){r.innerHTML='';var s=document.createElement('span');s.textContent='just jokes:';r.appendChild(s);var w=s.getBoundingClientRect().width||200,n=Math.ceil(window.innerWidth*1.25/w)+1;r.innerHTML='';for(var k=0;k<n*2;k++){var e=document.createElement('span');e.textContent='just jokes:';r.appendChild(e);}}
var jj=[].slice.call(document.querySelectorAll('.jj .jjrow'));
jj.forEach(jjfill);
var specs=[
 {el:document.querySelector('.laugh .ptrack'),k:.35,ltr:true,photo:true},
 {el:document.getElementById('track'),k:.35,ltr:false,photo:true},
 {el:document.querySelector('.cartpt-1'),k:.3,ltr:true,photo:true},
 {el:document.querySelector('.cartpt-2'),k:.3,ltr:false,photo:true},
 {el:document.querySelector('.cartpt-3'),k:.3,ltr:true,photo:true}
].concat(jj.map(function(r,i){return{el:r,k:.45,ltr:i%2===0,base:i*97};})).filter(function(s){return s.el;});
function measure(){specs.forEach(function(s){s.half=s.el.scrollWidth/2||1;});}
specs.forEach(function(s){s.el.style.animation='none';s.cur=s.base||0;});
measure();
/* re-measure the loop point as lazy photos load in, so a dragged strip never hits a fake "end" */
var mt;function remeasure(){clearTimeout(mt);mt=setTimeout(function(){measure();specs.forEach(place);},120);}
specs.forEach(function(s){if(!s.el||s.el.classList.contains('jjrow'))return;[].forEach.call(s.el.querySelectorAll('img'),function(im){if(im.complete&&im.naturalWidth)return;im.addEventListener('load',remeasure);im.addEventListener('error',remeasure);});});
function place(s){var o=((s.cur%s.half)+s.half)%s.half;s.el.style.transform='translateX('+(s.ltr?o-s.half:-o)+'px)';}
/* drag any band with a finger or the mouse; all bands are meshed like gears, so dragging one pulls every other band along in its own direction (neighbours counter-move); a flick keeps them gliding for a moment */
specs.forEach(function(s){s.drag=0;s.vel=0;var el=s.el;
el.addEventListener('dragstart',function(e){e.preventDefault();});
el.addEventListener('pointerdown',function(e){if(e.button>0)return;s.dragging=true;s.lx=e.clientX;s.vel=0;s.last=0;try{el.setPointerCapture(e.pointerId);}catch(_){}el.classList.add('grabbing');});
el.addEventListener('pointermove',function(e){if(!s.dragging)return;var dx=e.clientX-s.lx;s.lx=e.clientX;var d=s.ltr?dx:-dx;s.drag+=d;s.cur+=d;s.last=d;place(s);specs.forEach(function(o){if(o===s||!o.el)return;o.drag+=d;o.cur+=d;place(o);});});
function end(){if(!s.dragging)return;s.dragging=false;el.classList.remove('grabbing');s.vel=still?0:s.last;if(!still&&s.last){specs.forEach(function(o){if(o===s||!o.el)return;o.vel+=s.last;});}}
el.addEventListener('pointerup',end);el.addEventListener('pointercancel',end);el.addEventListener('lostpointercapture',end);});
if(still){specs.forEach(place);return;}
function target(s){return (s.base||0)+(s.drag||0)+window.scrollY*s.k;}
specs.forEach(function(s){s.cur=target(s);place(s);});
function refit(){jj.forEach(jjfill);measure();specs.forEach(function(s){s.cur=target(s);place(s);});}
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(refit);
window.addEventListener('load',refit);
var rt;window.addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(refit,150);});
function frame(){specs.forEach(function(s){if(s.dragging)return;if(Math.abs(s.vel)>.1){s.drag+=s.vel;s.cur+=s.vel;s.vel*=.94;place(s);}var t=target(s),d=t-s.cur;if(Math.abs(d)<.05)return;s.cur+=d*.14;place(s);});requestAnimationFrame(frame);}
requestAnimationFrame(frame);
})();
/* poster rows load their tiles only when scrolled near (saves ~3MB upfront) */
(function(){var rows=[].slice.call(document.querySelectorAll('.pbelt .prow[data-bg]'));if(!rows.length)return;function load(r){r.style.backgroundImage='url("'+r.getAttribute('data-bg')+'")';r.removeAttribute('data-bg');}if(!('IntersectionObserver' in window)){rows.forEach(load);return;}var io=new IntersectionObserver(function(es){es.forEach(function(x){if(!x.isIntersecting)return;io.unobserve(x.target);load(x.target);});},{rootMargin:'600px 0px'});rows.forEach(function(r){io.observe(r);});})();
/* poster carousels: their own little gear cluster. drag one row and the neighbours counter-move like meshed gears, plus a flick gives them a glide and they keep auto-scrolling when left alone. completely separate from the bands above. */
(function(){var still=matchMedia('(prefers-reduced-motion: reduce)').matches;
var rows=[].slice.call(document.querySelectorAll('.pbelt .prow'));if(!rows.length)return;
var SH=480,durs=[34,35.5,34.5,35];
var gs=rows.map(function(el,i){var h=parseFloat(getComputedStyle(el).height)||76,w=parseFloat(el.getAttribute('data-w'))||1,half=h/SH*w;
el.style.animation='none';return{el:el,ltr:i%2===0,half:half,cur:0,drag:0,vel:0,last:0,spd:half/(durs[i]||34)/1000};});
function place(s){var o=((s.cur%s.half)+s.half)%s.half;s.el.style.backgroundPositionX=(s.ltr?o-s.half:0-o)+'px';}
gs.forEach(function(s){s.el.addEventListener('dragstart',function(e){e.preventDefault();});
s.el.addEventListener('pointerdown',function(e){if(e.button>0)return;s.dragging=true;s.lx=e.clientX;s.vel=0;s.last=0;try{s.el.setPointerCapture(e.pointerId);}catch(_){}});
s.el.addEventListener('pointermove',function(e){if(!s.dragging)return;var dx=e.clientX-s.lx;s.lx=e.clientX;var d=s.ltr?dx:-dx;gs.forEach(function(o){o.drag+=d;o.cur+=d;o.last=d;place(o);});});
function end(){if(!s.dragging)return;s.dragging=false;s.vel=still?0:s.last;if(!still&&s.last)gs.forEach(function(o){o.vel+=s.last;});}
s.el.addEventListener('pointerup',end);s.el.addEventListener('pointercancel',end);s.el.addEventListener('lostpointercapture',end);});
if(still){gs.forEach(place);return;}
/* only repaint rows that are on (or near) the screen; off-screen rows keep their place in the loop and catch up silently */
var vis=true;if('IntersectionObserver' in window){vis=false;var on=[];var io=new IntersectionObserver(function(es){es.forEach(function(x){var i=on.indexOf(x.target);if(x.isIntersecting&&i<0)on.push(x.target);if(!x.isIntersecting&&i>=0)on.splice(i,1);});vis=on.length>0;},{rootMargin:'200px 0px'});[].forEach.call(document.querySelectorAll('.pbelt'),function(b){io.observe(b);});}
var last=0;function frame(t){var dt=last?Math.min(50,t-last):0;last=t;
gs.forEach(function(s){if(s.dragging)return;if(Math.abs(s.vel)>.1){s.drag+=s.vel;s.vel*=.94;}s.drag+=s.spd*dt;var d=s.drag-s.cur;if(Math.abs(d)>.05)s.cur+=d*.14;if(vis)place(s);});
requestAnimationFrame(frame);}requestAnimationFrame(frame);})();
(function(){var phone=matchMedia('(max-width:900px)').matches;if(phone){var v=document.querySelector('video.mas-devil');if(v)v.remove();}else{var s=document.querySelector('img.mas-devil-sm');if(s)s.remove();var v2=document.querySelector('video.mas-devil');if(v2&&v2.dataset.src){v2.src=v2.dataset.src;v2.poster=v2.dataset.poster;}}})();
(function(){function wire(m,c){if(!m||!c)return;var n=0,done=false,cap=c.innerHTML;function hit(){if(done)return;n++;if(n===3)c.textContent="hey im warning you! don't press on me 5 more times and you'll regret it!";if(n===8){done=true;c.textContent='okay i warned you..';setTimeout(function(){document.documentElement.style.filter='invert(1)';},2000);setTimeout(function(){location.href='https://youtu.be/dQw4w9WgXcQ';},3000);}}
/* coming back from the rickroll with the back button restores the page as it was left, so undo the invert and re-arm the mask */
window.addEventListener('pageshow',function(e){if(!e.persisted||!done)return;document.documentElement.style.filter='';n=0;done=false;c.innerHTML=cap;});m.addEventListener('click',hit);m.addEventListener('keydown',function(e){if(e.repeat)return;if(e.key==='Enter'||e.key===' '){e.preventDefault();hit();}});m.addEventListener('dragstart',function(e){e.preventDefault();});}wire(document.querySelector('video.mas-devil'),document.querySelector('.devil-cap-d'));wire(document.querySelector('img.mas-devil-sm'),document.querySelector('.devil-cap'));})();
(function(){var v=document.querySelector('video.herobg');if(!v)return;
if(matchMedia('(max-width:900px)').matches){v.removeAttribute('autoplay');v.preload='none';return;}
/* hero video: pick the file for this screen, keep it playing while it's on screen */
var phone=matchMedia('(max-width:900px)').matches;

v.muted=true;v.defaultMuted=true;
if(matchMedia('(prefers-reduced-motion: reduce)').matches){v.removeAttribute('autoplay');v.pause();return;}
var onScreen=true;
function go(){if(!onScreen||document.hidden)return;var p=v.play();if(p&&p.catch)p.catch(function(){});}
v.addEventListener('ended',function(){v.currentTime=0;go();});
v.addEventListener('canplay',go);
v.addEventListener('pause',function(){setTimeout(function(){if(v.paused)go();},400);});
if('IntersectionObserver' in window){new IntersectionObserver(function(es){onScreen=es[0].isIntersecting;if(onScreen)go();else v.pause();},{threshold:0}).observe(v);}
document.addEventListener('visibilitychange',function(){if(document.hidden)v.pause();else go();});
window.addEventListener('pageshow',go);
function kick(){go();if(!v.paused){['touchstart','pointerdown','scroll'].forEach(function(e){window.removeEventListener(e,kick);});}}
['touchstart','pointerdown','scroll'].forEach(function(e){window.addEventListener(e,kick,{passive:true});});
go();})();
(function(){var l=document.querySelector('.logo');if(!l)return;l.addEventListener('touchstart',function(){l.classList.add('tap');clearTimeout(l._t);l._t=setTimeout(function(){l.classList.remove('tap');},600);},{passive:true});})();

(function(){if('scrollRestoration' in history)history.scrollRestoration='manual';
var raf=0,settle=0,reaim=null,lt=0;
function off(){var v=parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop);return isNaN(v)?72:v}
function stop(){cancelAnimationFrame(raf);clearInterval(settle);clearTimeout(lt);if(reaim){document.removeEventListener('load',reaim,true);reaim=null}}
function go(t){stop();var pad=0,j=t&&t.getAttribute('data-jump'),q=j&&t.querySelector(j);if(q){t=q;pad=16}var dest=function(){return t?Math.max(0,Math.round(t.getBoundingClientRect().top+window.pageYOffset-off()-pad)):0};
 var jump=function(y){window.scrollTo({top:y,behavior:'instant'})};
 if(matchMedia('(prefers-reduced-motion: reduce)').matches){jump(dest());return}
 var y0=window.pageYOffset,t0=performance.now(),dur=Math.min(1200,350+Math.abs(dest()-y0)*.22);
 function ease(p){return p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2}
 function step(now){var p=Math.min(1,(now-t0)/dur);jump(y0+(dest()-y0)*ease(p));if(p<1)raf=requestAnimationFrame(step);else settleUp()}
 // Safari has no scroll anchoring: lazy photos above the target grow when they load and push it down the screen.
 // So start loading every image above the target now, and keep re-aiming until they have all landed.
 var at=t?t.getBoundingClientRect().top+window.pageYOffset:0;
 var above=function(){return [].slice.call(document.images).filter(function(i){return i.getBoundingClientRect().top+window.pageYOffset<at})};
 above().forEach(function(i){if(i.loading==='lazy')i.loading='eager'});
 // slow connections: photos can still land long after we arrive, so re-aim on every image load until the user takes over
 reaim=function(){if(Math.abs(dest()-window.pageYOffset)>2)jump(dest())};document.addEventListener('load',reaim,true);lt=setTimeout(stop,90000);
 function settleUp(){var n=0,calm=0;settle=setInterval(function(){var d=dest()-window.pageYOffset;if(Math.abs(d)>2){jump(dest());calm=0}else calm++;var busy=above().some(function(i){return !i.complete});if(++n>=150||(!busy&&calm>=8))clearInterval(settle)},80)}
 raf=requestAnimationFrame(step)}
['wheel','touchstart','keydown','mousedown'].forEach(function(ev){window.addEventListener(ev,stop,{passive:true})});
if(location.hash){history.replaceState(null,'',location.pathname+location.search);window.scrollTo(0,0);}
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href^="#"]');if(!a)return;var id=a.getAttribute('href').slice(1);
 var t=id==='top'?document.body:document.getElementById(id);if(!t)return;e.preventDefault();
 if(id==='top')go(null);else go(t);
 history.replaceState(null,'',location.pathname+location.search);});})();
(function(){var els=[].slice.call(document.querySelectorAll('b[data-n]'));if(matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window))return;
function fmt(n){return n.toLocaleString('en-US')}
els.forEach(function(e){e.textContent='0'+e.dataset.s});
var io=new IntersectionObserver(function(en){en.forEach(function(x){if(!x.isIntersecting)return;io.unobserve(x.target);var el=x.target,N=+el.dataset.n,t0=null,D=1400;
function step(ts){if(!t0)t0=ts;var p=Math.min((ts-t0)/D,1),v=Math.round(N*(1-Math.pow(1-p,3)));el.textContent=fmt(v)+el.dataset.s;if(p<1)requestAnimationFrame(step);}
requestAnimationFrame(step);});},{threshold:.5});els.forEach(function(e){io.observe(e)});})();
(function(){var live=[],run=false;function st(p){for(var i=0;i<live.length;i++)if(live[i].p===p)return live[i];var s={p:p,tx:50,ty:50,cx:50,cy:50};live.push(s);return s;}function aim(e,p){var r=p.getBoundingClientRect(),s=st(p);s.tx=(e.clientX-r.left)/r.width*100;s.ty=(e.clientY-r.top)/r.height*100;if(!run){run=true;requestAnimationFrame(step);}}function step(){run=false;for(var i=live.length-1;i>=0;i--){var s=live[i];if(!s.p.isConnected){live.splice(i,1);continue;}s.cx+=(s.tx-s.cx)*.1;s.cy+=(s.ty-s.cy)*.1;if(Math.abs(s.tx-s.cx)<.05&&Math.abs(s.ty-s.cy)<.05){s.cx=s.tx;s.cy=s.ty;}else run=true;s.p.style.setProperty('--jx',s.cx.toFixed(2)+'%');s.p.style.setProperty('--jy',s.cy.toFixed(2)+'%');}if(run)requestAnimationFrame(step);}function tap(e,p){var r=p.getBoundingClientRect(),s=st(p);s.tx=s.cx=(e.clientX-r.left)/r.width*100;s.ty=s.cy=(e.clientY-r.top)/r.height*100;p.style.setProperty('--jx',s.cx.toFixed(2)+'%');p.style.setProperty('--jy',s.cy.toFixed(2)+'%');p.classList.remove('tap');void p.offsetWidth;p.classList.add('tap');clearTimeout(p._t);p._t=setTimeout(function(){p.classList.remove('tap')},1200);}document.addEventListener('pointerdown',function(e){var p=e.target.closest('.pop');if(!p||e.pointerType!=='touch')return;if(e.target.closest('a,button'))return;tap(e,p);},true);document.addEventListener('pointermove',function(e){var p=e.target.closest('.pop');if(!p||e.pointerType!=='mouse')return;aim(e,p);},true);})();
(function(){var sel='.mas:not(.mas-devil):not(.mas-devil-sm),.audience .sit,.off .stk,.pig-stat,.stagewrap .onstage';var els=[].slice.call(document.querySelectorAll(sel));var floaters=[];
// Mascots you pick up are lifted out of their section and left where you drop them (page coordinates), so they can never end up
// hidden behind another section or clipped by it. A rotated/mirrored mascot keeps its exact size and angle when picked up.
function docW(){return document.documentElement.clientWidth}
function docH(){return Math.max(document.documentElement.scrollHeight,document.body.scrollHeight)}
function cl(v,a,b){return Math.min(Math.max(v,a),Math.max(a,b))}
els.forEach(function(el){el.style.pointerEvents='auto';el.style.touchAction='none';el.style.cursor='grab';el.style.userSelect='none';el.style.webkitUserSelect='none';el.style.webkitTouchCallout='none';
el.addEventListener('dragstart',function(e){e.preventDefault();});
el.addEventListener('contextmenu',function(e){e.preventDefault();});
var st=null,me=null;
function put(s,x,y,lift){el.style.transform='translate('+(x-s.w/2)+'px,'+(y-s.h/2)+'px)'+(lift?' scale(1.07)':'')+(s.lin?' '+s.lin:'');}
el.addEventListener('pointerdown',function(e){if(st)return;if(e.pointerType==='mouse'&&e.button>0)return;
 var r=el.getBoundingClientRect(),cs=getComputedStyle(el),w=el.offsetWidth||r.width,h=el.offsetHeight||r.height,lin='',m=cs.transform,v=m&&m.match(/^matrix\(([^)]+)\)/);
 if(v){var q=v[1].split(',').map(parseFloat);lin='matrix('+q[0]+','+q[1]+','+q[2]+','+q[3]+',0,0)';}
 var cx=r.left+r.width/2+window.pageXOffset,cy=r.top+r.height/2+window.pageYOffset;
 if(el.parentNode!==document.body)document.body.appendChild(el);
 var o=el.style;o.position='absolute';o.left='0';o.top='0';o.right='auto';o.bottom='auto';o.margin='0';o.width=w+'px';o.height=h+'px';o.maxWidth='none';o.zIndex='9999';o.willChange='transform';o.filter='drop-shadow(0 12px 12px rgba(0,0,0,.35))';o.cursor='grabbing';
 st={pid:e.pointerId,sx:e.clientX,sy:e.clientY,cx:cx,cy:cy,x:cx,y:cy,w:w,h:h,bw:r.width,bh:r.height,lin:lin,raf:0};put(st,cx,cy,true);
 try{el.setPointerCapture(e.pointerId);}catch(_){}e.preventDefault();});
el.addEventListener('pointermove',function(e){if(!st||e.pointerId!==st.pid)return;
 st.x=cl(st.cx+e.clientX-st.sx,st.bw/2,docW()-st.bw/2);st.y=cl(st.cy+e.clientY-st.sy,st.bh/2,docH()-st.bh/2);
 if(!st.raf)st.raf=requestAnimationFrame(function(){if(!st)return;st.raf=0;put(st,st.x,st.y,true);});});
function up(e){if(!st||(e&&e.pointerId!==st.pid))return;cancelAnimationFrame(st.raf);var s=st;st=null;
 var from=el.style.transform;put(s,s.x,s.y,false);var to=el.style.transform;
 var o=el.style;o.zIndex='15';o.filter='';o.willChange='';o.cursor='grab';
 try{el.animate([{transform:from},{transform:to}],{duration:220,easing:'cubic-bezier(.2,.9,.3,1.35)'});}catch(_){}
 if(me){me.fx=s.x/docW();me.y=s.y;me.lin=s.lin;}else{me={el:el,fx:s.x/docW(),y:s.y,w:s.w,h:s.h,bw:s.bw,bh:s.bh,lin:s.lin};floaters.push(me);}}
el.addEventListener('pointerup',up);el.addEventListener('pointercancel',up);});
var rz=0;window.addEventListener('resize',function(){cancelAnimationFrame(rz);rz=requestAnimationFrame(function(){floaters.forEach(function(f){var x=cl(f.fx*docW(),f.bw/2,docW()-f.bw/2);f.el.style.transform='translate('+(x-f.w/2)+'px,'+(f.y-f.h/2)+'px)'+(f.lin?' '+f.lin:'');});});});})();
