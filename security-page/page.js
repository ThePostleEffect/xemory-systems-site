'use strict';
const form=document.querySelector('#brief');
form.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const body=['Hello Xemory Systems,','','I would like to discuss security setup.','For: '+d.get('audience'),'Preferred arrangement: '+d.get('delivery'),'','What I would like help with:',d.get('needs').trim()||'I would like to discuss additional security for my systems.','','Please contact me to discuss scope and a case-by-case quote.'].join('\n');document.querySelector('#result').textContent='Opening your email app…';window.location.href='mailto:contact@xemorysystems.com?subject='+encodeURIComponent('Security setup inquiry')+'&body='+encodeURIComponent(body);});
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const toggle=document.querySelector('.motion-toggle');
let paused=reduced.matches;
function setMotion(){document.body.classList.toggle('paused',paused);toggle.setAttribute('aria-pressed',String(paused));toggle.textContent=paused?'Resume motion ▷':'Pause motion Ⅱ';}
toggle.addEventListener('click',()=>{paused=!paused;setMotion();});
reduced.addEventListener('change',()=>{paused=reduced.matches;setMotion();});setMotion();
if('IntersectionObserver' in window&&!reduced.matches){const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.remove('pending');observer.unobserve(e.target);}});},{threshold:.08});document.querySelectorAll('.statement h2,.section-head,.cards article,.audience>div,.steps li,.faq details').forEach(el=>{el.classList.add('reveal','pending');observer.observe(el);});}
const canvas=document.querySelector('#field'),ctx=canvas.getContext('2d');
if(ctx){let width=0,height=0,t=0,last=0;function size(){const r=canvas.getBoundingClientRect();width=r.width;height=r.height;const dpr=Math.min(devicePixelRatio||1,2);canvas.width=width*dpr;canvas.height=height*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);}const resize=new ResizeObserver(size);resize.observe(canvas);size();function paint(now){requestAnimationFrame(paint);if(document.hidden||now-last<32)return;last=now;if(!paused)t+=.006;ctx.clearRect(0,0,width,height);for(let i=0;i<55;i++){const a=i*2.399+t*(i%2?1:-1)*.1;const r=.15+(i%17)/30;const x=width/2+Math.cos(a)*width*r,y=height/2+Math.sin(a)*height*r*.7;ctx.fillStyle=`rgba(216,220,187,${.12+(i%4)*.08})`;ctx.beginPath();ctx.arc(x,y,i%5===0?1.7:.8,0,Math.PI*2);ctx.fill();} }requestAnimationFrame(paint);}

