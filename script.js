const nav = document.querySelector('.nav');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>24),{passive:true});

const observer = new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}})},{threshold:.08,rootMargin:'0px 0px -30px'});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const buttons = document.querySelectorAll('.filters button');
const cards = document.querySelectorAll('.modality');
buttons.forEach(btn=>btn.addEventListener('click',()=>{
  buttons.forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  const f = btn.dataset.filter;
  cards.forEach(card=>{
    const cats=(card.dataset.cat||'').split(' ');
    card.classList.toggle('hidden',f!=='all'&&!cats.includes(f));
  });
}));

const menuBtn=document.querySelector('.menu-btn');
menuBtn?.addEventListener('click',()=>{
  const links=[...document.querySelectorAll('.nav-links a')];
  if(!links.length)return;
  const menu=document.createElement('div');
  menu.className='mobile-popover';
  menu.style.cssText='position:fixed;inset:68px 14px auto;background:#fff;border:1px solid rgba(13,13,18,.12);border-radius:22px;padding:18px;z-index:60;box-shadow:0 20px 50px rgba(13,13,18,.14);display:grid;gap:8px';
  links.forEach(a=>{const x=a.cloneNode(true);x.style.cssText='padding:12px 8px;font-weight:700';x.onclick=()=>menu.remove();menu.appendChild(x)});
  const cta=document.createElement('a');cta.href='https://wa.me/351931486405?text=Olá%20FIARY!%20Gostava%20de%20marcar%20uma%20aula%20experimental.';cta.target='_blank';cta.textContent='Marcar aula experimental';cta.style.cssText='margin-top:8px;background:#0d0d12;color:#fff;padding:14px 16px;border-radius:999px;text-align:center;font-weight:700';menu.appendChild(cta);
  document.querySelector('.mobile-popover')?.remove();document.body.appendChild(menu);
});