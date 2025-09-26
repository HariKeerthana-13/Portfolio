// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const mobileMenu = document.getElementById('mobileMenu');
const menuBtn = document.getElementById('menuBtn');
const yearSpan = document.getElementById('year');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const root = document.documentElement;

function setTheme(dark) {
  if (dark) document.body.classList.add('dark');
  else document.body.classList.remove('dark');
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}

(function initTheme() {
  const stored = localStorage.getItem('theme');
  if (stored) setTheme(stored === 'dark');
  else setTheme(prefersDark);
})();

themeToggle?.addEventListener('click', () => {
  setTheme(!document.body.classList.contains('dark'));
});

menuBtn?.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

// Footer year
yearSpan.textContent = new Date().getFullYear();

// Smooth scroll (explicit for browsers without CSS behavior)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href.length > 1) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (!mobileMenu.classList.contains('hidden')) mobileMenu.classList.add('hidden');
    }
  });
});

// Project search & filter
const searchInput = document.getElementById('searchInput');
const techFilter = document.getElementById('techFilter');
const projectCards = [...document.querySelectorAll('.project-card')];

function applyFilters() {
  const q = (searchInput.value || '').toLowerCase();
  const tech = (techFilter.value || '').toLowerCase();
  projectCards.forEach(card => {
    const title = card.dataset.title.toLowerCase();
    const stack = card.dataset.tech.toLowerCase();
    const matchesQ = !q || title.includes(q) || stack.includes(q);
    const matchesTech = !tech || stack.includes(tech);
    card.style.display = (matchesQ && matchesTech) ? '' : 'none';
  });
}

searchInput?.addEventListener('input', applyFilters);
techFilter?.addEventListener('change', applyFilters);
applyFilters();

// Hover effect: subtle scale
projectCards.forEach(card => {
  card.addEventListener('mouseenter', () => { card.style.transform = 'translateY(-2px) scale(1.01)'; });
  card.addEventListener('mouseleave', () => { card.style.transform = 'translateY(0) scale(1)'; });
});
