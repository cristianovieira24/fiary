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

const teamHeroImg = document.querySelector('.team-hero img');
if (teamHeroImg) {
  teamHeroImg.src = 'https://storage.googleapis.com/msgsndr/djC46eaXX3eZ2g3YLF8o/media/65a4cd852aaf1b8594074ba4.jpeg';
}

document.querySelectorAll('.person-photo').forEach(photo => {
  photo.className = 'person-photo person-avatar';
  photo.innerHTML = '<span class="avatar-icon" aria-hidden="true"></span>';
});

const avatarStyles = document.createElement('style');
avatarStyles.textContent = `
.person-avatar,.teacher-avatar{background:linear-gradient(145deg,#d78397,#b85f75)!important;display:grid!important;place-items:center!important;position:relative;overflow:hidden;background-image:none!important}.person-avatar::before,.teacher-avatar::before{content:"";position:absolute;width:72%;aspect-ratio:1;border-radius:50%;background:rgba(255,255,255,.08);top:-22%;right:-16%}.avatar-icon{position:relative;width:46%;max-width:110px;aspect-ratio:1/1.15}.avatar-icon::before{content:"";position:absolute;left:50%;top:5%;transform:translateX(-50%);width:42%;aspect-ratio:1;border-radius:50%;background:#fff}.avatar-icon::after{content:"";position:absolute;left:50%;bottom:0;transform:translateX(-50%);width:82%;height:50%;border-radius:60px 60px 24px 24px;background:#fff}.modality{cursor:default!important}`;
document.head.appendChild(avatarStyles);

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
      <div class="teacher-photo teacher-avatar"><span class="avatar-icon" aria-hidden="true"></span></div>
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