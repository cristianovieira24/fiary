const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 24), { passive: true });

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .08, rootMargin: '0px 0px -30px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const filterButtons = document.querySelectorAll('.filters button');
const modalityCards = document.querySelectorAll('.modality');
filterButtons.forEach(btn => btn.addEventListener('click', () => {
  filterButtons.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const f = btn.dataset.filter;
  modalityCards.forEach(card => {
    const cats = (card.dataset.cat || '').split(' ');
    card.classList.toggle('hidden', f !== 'all' && !cats.includes(f));
  });
}));

modalityCards.forEach(card => {
  card.addEventListener('click', e => {
    if (e.target.closest('a,button')) return;
    if (card.dataset.href) window.open(card.dataset.href, '_blank', 'noopener');
  });
});

const teachers = {
  mafalda: {
    name: 'Mafalda Morgado',
    role: 'Direção artística · Professora · Coreógrafa',
    bio: 'Formada na Academia de Dança Contemporânea de Setúbal, com experiência em palco e projetos internacionais. Na FIARY, está ligada à direção artística e ao ensino.',
    photoClass: 'teacher-mafalda',
    msg: 'Olá FIARY! Quero experimentar uma aula com a Mafalda.'
  },
  tiago: {
    name: 'Tiago Luz',
    role: 'Professor · Dança urbana / performance',
    bio: 'Professor associado às atuações e dinâmicas de palco da escola. Um perfil adequado para modalidades mais performativas e de linguagem urbana.',
    photoClass: 'teacher-tiago',
    msg: 'Olá FIARY! Quero saber mais sobre uma aula com o Tiago.'
  },
  equipa: {
    name: 'Equipa FIARY',
    role: 'Professores especializados por modalidade',
    bio: 'A FIARY trabalha com diferentes professores e linguagens. Na versão final, esta área pode receber fotografia, experiência, especialidades e horários de cada professor.',
    photoClass: 'teacher-equipa',
    msg: 'Olá FIARY! Quero saber quem é o professor desta modalidade e experimentar uma aula.'
  }
};

function profileHTML(key, modal = false) {
  const t = teachers[key] || teachers.equipa;
  return `
    <div class="${modal ? 'modal-profile' : 'teacher-profile'}">
      <div class="teacher-photo ${t.photoClass}"></div>
      <div class="teacher-info">
        <span>${t.role}</span>
        <h3>${t.name}</h3>
        <p>${t.bio}</p>
        <a href="https://wa.me/351931486405?text=${encodeURIComponent(t.msg)}" target="_blank" rel="noopener">Experimentar uma aula ↗</a>
      </div>
    </div>`;
}

const teacherTabs = document.querySelectorAll('.teacher-tab');
teacherTabs.forEach(tab => tab.addEventListener('click', () => {
  teacherTabs.forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  const holder = document.getElementById('teacher-profile');
  holder.outerHTML = profileHTML(tab.dataset.teacher, false).replace('class="teacher-profile"', 'class="teacher-profile" id="teacher-profile"');
}));

const modal = document.querySelector('.teacher-modal');
const modalContent = document.getElementById('teacher-modal-content');
function openTeacher(key) {
  modalContent.innerHTML = profileHTML(key, true);
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeTeacher() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
document.querySelectorAll('.teacher-trigger').forEach(btn => btn.addEventListener('click', e => {
  e.stopPropagation();
  openTeacher(btn.dataset.teacher);
}));
document.querySelector('.teacher-modal-close')?.addEventListener('click', closeTeacher);
document.querySelector('.teacher-modal-backdrop')?.addEventListener('click', closeTeacher);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeTeacher(); });

const menuBtn = document.querySelector('.menu-btn');
menuBtn?.addEventListener('click', () => {
  document.querySelector('.mobile-popover')?.remove();
  const menu = document.createElement('div');
  menu.className = 'mobile-popover';
  menu.style.cssText = 'position:fixed;inset:68px 14px auto;background:#fff;border:1px solid rgba(13,13,18,.12);border-radius:22px;padding:18px;z-index:60;box-shadow:0 20px 50px rgba(13,13,18,.14);display:grid;gap:8px';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const x = a.cloneNode(true);
    x.style.cssText = 'padding:12px 8px;font-weight:700';
    x.onclick = () => menu.remove();
    menu.appendChild(x);
  });
  const cta = document.createElement('a');
  cta.href = 'https://wa.me/351931486405?text=Olá%20FIARY!%20Gostava%20de%20marcar%20uma%20aula%20experimental.';
  cta.target = '_blank';
  cta.textContent = 'Marcar aula grátis';
  cta.style.cssText = 'margin-top:8px;background:#c06a7f;color:#fff;padding:16px;border-radius:999px;text-align:center;font-weight:800';
  menu.appendChild(cta);
  document.body.appendChild(menu);
});