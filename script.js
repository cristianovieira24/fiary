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

// Visual fixes: consistent avatars, play icon and simplified plan area.
const uiFixStyles = document.createElement('style');
uiFixStyles.textContent = `
.person-avatar,.teacher-avatar{background:#fff4f6!important;display:grid!important;place-items:center!important;background-image:none!important;overflow:hidden}
.avatar-svg{width:46%;max-width:116px;height:auto;fill:#df7187}
.teacher-avatar .avatar-svg{width:42%;max-width:150px}
.price-footer{display:block!important;margin-top:0!important}
.price-details,.trial-price-cta{display:none!important}
.price-notes{display:flex;gap:12px 24px;flex-wrap:wrap;margin-top:18px;padding:0 2px;color:rgba(255,255,255,.62);font-size:13px}
.price-notes span{position:relative;padding-left:14px}.price-notes span::before{content:'•';position:absolute;left:0;color:#c06a7f}
.trial-question{margin-top:26px;padding:26px 0 0;border-top:1px solid rgba(255,255,255,.13);display:flex;align-items:center;justify-content:space-between;gap:28px}
.trial-question small{display:block;font:800 9px/1 Manrope,sans-serif;letter-spacing:.18em;color:#ef9caf;margin-bottom:10px}
.trial-question strong{display:block;font:700 26px/1.1 Manrope,sans-serif;letter-spacing:-.04em}
.trial-question p{margin:8px 0 0;color:rgba(255,255,255,.62);font-size:14px;line-height:1.6}
.trial-question a{flex:0 0 auto;display:flex;align-items:center;gap:16px;padding:16px 18px;border-radius:16px;background:#fff;color:#0d0d12;font-size:14px;font-weight:800;transition:.22s}
.trial-question a:hover{transform:translateY(-2px);background:#f7eef1}
@media(max-width:760px){.trial-question{align-items:flex-start;flex-direction:column}.trial-question a{width:100%;justify-content:space-between}}
`;
document.head.appendChild(uiFixStyles);

const teamPlay = document.querySelectorAll('.showcase-play')[2];
if (teamPlay) teamPlay.textContent = '▶';

const priceFooter = document.querySelector('.price-footer');
if (priceFooter) {
  priceFooter.innerHTML = `
    <div class="price-notes">
      <span>Aula experimental gratuita</span>
      <span>Inscrição: 30€</span>
      <span>Seguro anual: aprox. 12,50€</span>
      <span>-10% para mães com filhos inscritos</span>
    </div>
    <div class="trial-question">
      <div><small>AINDA COM DÚVIDAS?</small><strong>Experimenta uma aula antes de escolher o plano.</strong><p>Conhece o estúdio, sente a dinâmica da aula e decide depois — sem compromisso.</p></div>
      <a href="https://wa.me/351931486405?text=Olá%20FIARY!%20Quero%20marcar%20uma%20aula%20experimental%20gratuita." target="_blank" rel="noopener">Marcar aula experimental <b>↗</b></a>
    </div>`;
}

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

const teamHeroImg = document.querySelector('.team-hero img');
if (teamHeroImg) teamHeroImg.src = 'equipa.jpg';

const teamShowcaseImg = document.querySelector('.showcase-card[href="#equipa"] img');
if (teamShowcaseImg) teamShowcaseImg.src = 'equipa.jpg';

document.querySelectorAll('.person-photo').forEach(photo => {
  photo.className = 'person-photo person-avatar';
  photo.innerHTML = '<svg class="avatar-svg" viewBox="0 0 120 140" aria-hidden="true" focusable="false"><circle cx="60" cy="38" r="24"></circle><path d="M18 124c0-31 18-51 42-51s42 20 42 51v6H18z"></path></svg>';
});

const teachers = {
  mafalda: {
    name: 'Mafalda Morgado',
    role: 'Direção artística · Professora · Coreógrafa',
    bio: 'À frente da direção artística, acompanha o crescimento dos alunos com uma abordagem que combina técnica, expressão e confiança. Em cada aula, o objetivo é evoluir sem perder o prazer de dançar.',
    photoClass: 'teacher-mafalda',
    msg: 'Olá FIARY! Quero experimentar uma aula com a Mafalda.'
  },
  tiago: {
    name: 'Tiago Luz',
    role: 'Professor · Dança urbana / performance',
    bio: 'Nas aulas, trabalha presença, musicalidade e performance, ajudando cada aluno a ganhar segurança e a desenvolver a sua própria forma de se mover.',
    photoClass: 'teacher-tiago',
    msg: 'Olá FIARY! Quero saber mais sobre uma aula com o Tiago.'
  },
  equipa: {
    name: 'Equipa FIARY',
    role: 'Professores especializados por modalidade',
    bio: 'Cada modalidade é acompanhada por um professor preparado para orientar a turma de forma próxima, adaptar a aula ao nível dos alunos e criar um ambiente onde é possível aprender com confiança.',
    photoClass: 'teacher-equipa',
    msg: 'Olá FIARY! Quero saber quem é o professor desta modalidade e experimentar uma aula.'
  }
};

function profileHTML(key, modal = false) {
  const t = teachers[key] || teachers.equipa;
  return `
    <div class="${modal ? 'modal-profile' : 'teacher-profile'}">
      <div class="teacher-photo teacher-avatar"><svg class="avatar-svg" viewBox="0 0 120 140" aria-hidden="true" focusable="false"><circle cx="60" cy="38" r="24"></circle><path d="M18 124c0-31 18-51 42-51s42 20 42 51v6H18z"></path></svg></div>
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