/* ============================================
   YASMINE GHARSALLAH · PORTFOLIO
   Interactive behaviours
   ============================================ */

/* ---------- LOADER ---------- */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader')?.classList.add('done');
  }, 1400);
});

/* ---------- CUSTOM CURSOR ---------- */
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
if (dot && ring && window.matchMedia('(pointer: fine)').matches) {
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
  });
  const animate = () => {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(animate);
  };
  animate();

  document.querySelectorAll('a, button, .project-card, .highlight, .achievement, .cert-card, .community-card, .club-card, .ctf-card, .path-card, .skill-group, .filter, input, textarea')
    .forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });
}

/* ---------- NAV SCROLL ---------- */
const nav = document.getElementById('nav');
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  nav?.classList.toggle('scrolled', y > 40);
  backTop?.classList.toggle('visible', y > 400);
  updateActiveLink();
});

/* ---------- MOBILE NAV ---------- */
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');
burger?.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(a =>
  a.addEventListener('click', () => {
    burger?.classList.remove('open');
    navLinks?.classList.remove('open');
  })
);

/* ---------- ACTIVE NAV LINK ---------- */
function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const fromTop = window.scrollY + 120;
  sections.forEach(sec => {
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (!link) return;
    if (sec.offsetTop <= fromTop && sec.offsetTop + sec.offsetHeight > fromTop) {
      document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
      link.classList.add('active');
    }
  });
}

/* ---------- TYPEWRITER ROLES ---------- */
const roles = [
  'Aspiring SOC Analyst',
  'DevSecOps Enthusiast',
  'CTF Player',
  'Cloud & Network Security',
  'Security Researcher'
];
const roleText = document.getElementById('roleText');
let roleIdx = 0, charIdx = 0, deleting = false;

function typeRole() {
  if (!roleText) return;
  const current = roles[roleIdx];
  if (!deleting) {
    roleText.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      deleting = true;
      return setTimeout(typeRole, 1800);
    }
  } else {
    roleText.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
    }
  }
  setTimeout(typeRole, deleting ? 40 : 80);
}
setTimeout(typeRole, 1800);

/* ---------- STAT COUNTERS ---------- */
const counters = document.querySelectorAll('.stat-num');
const countObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = +el.dataset.target;
      const duration = 1600;
      const start = performance.now();
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * ease);
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      countObs.unobserve(el);
    }
  });
}, { threshold: 0.4 });
counters.forEach(c => countObs.observe(c));

/* ---------- SCROLL REVEAL ---------- */
const revealTargets = document.querySelectorAll(
  '.section-head, .about-text, .about-card, .timeline-item, .project-card, .achievement, .skill-group, .cert-card, .community-card, .club-card, .ctf-card, .path-card, .vol-feature, .contact-info, .contact-form, .award-feature'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
revealTargets.forEach(el => revealObs.observe(el));

/* skill bars */
const skillObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      skillObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-group').forEach(el => skillObs.observe(el));

/* ---------- PROJECT FILTERS ---------- */
const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.project-card');
filters.forEach(btn => {
  btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    cards.forEach(card => {
      const match = cat === 'all' || card.dataset.category.split(' ').includes(cat);
      card.classList.toggle('hidden', !match);
    });
  });
});

/* ---------- PARTICLES BACKGROUND ---------- */
const canvas = document.getElementById('particles');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H, particles;
  const COLORS = ['#8a5cff', '#00e5ff', '#ff4d9d', '#7dff9e'];

  const resize = () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    const count = Math.min(70, Math.floor(W * H / 22000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.8 + 0.5,
      c: COLORS[Math.floor(Math.random() * COLORS.length)]
    }));
  };
  resize();
  window.addEventListener('resize', resize);

  const loop = () => {
    ctx.clearRect(0, 0, W, H);
    particles.forEach((p, i) => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.c;
      ctx.globalAlpha = 0.6;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 130) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = p.c;
          ctx.globalAlpha = (1 - d / 130) * 0.15;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(loop);
  };
  loop();
}

/* ---------- CONTACT FORM ---------- */
function handleContact(e) {
  e.preventDefault();
  const note = document.getElementById('formNote');
  const form = e.target;
  const data = new FormData(form);
  const name = data.get('name');
  const email = data.get('email');
  const subject = data.get('subject');
  const message = data.get('message');

  const body = encodeURIComponent(
    `Hi Yasmine,\n\n${message}\n\n— ${name}\n${email}`
  );
  window.location.href = `mailto:yasmine.gharsallah@eurecom.fr?subject=${encodeURIComponent(subject)}&body=${body}`;

  if (note) {
    note.textContent = `✓ Thanks ${name.split(' ')[0]}! Opening your email client…`;
    setTimeout(() => { note.textContent = ''; form.reset(); }, 4500);
  }
  return false;
}

/* ---------- YEAR ---------- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
