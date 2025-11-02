/* ---------- Simple hash router ---------- */
function showPage(hash){
  const id = (hash || '#home').toLowerCase();
  document.querySelectorAll('.page').forEach(s => s.classList.remove('active'));
  const target = document.querySelector(id) || document.querySelector('#home');
  target.classList.add('active');

  // set active nav link
  document.querySelectorAll('.main-nav a').forEach(a=>{
    a.classList.toggle('active', a.getAttribute('href').toLowerCase() === id);
  });
}
window.addEventListener('hashchange', ()=>showPage(location.hash));
document.addEventListener('DOMContentLoaded', ()=>showPage(location.hash || '#home'));

/* ---------- Your existing product carousel code (unchanged) ---------- */
// helpers
const $  = (s, c=document) => c.querySelector(s);
const $$ = (s, c=document) => Array.from(c.querySelectorAll(s));

// elements
const viewer   = $('.viewer');
const frame    = $('#photo-frame');
const imgEl    = $('#product-image');
const nameEl   = $('#product-name');
const descEl   = $('#product-desc');
const leftBtn  = $('.arrow-left');
const rightBtn = $('.arrow-right');

// data (hidden list)
const items = $$('#product-data li').map(li => ({
  image: li.dataset.image || '',
  name : li.dataset.name  || 'Product name',
  desc : li.dataset.desc  || 'Product description'
}));

let i = 0;

// load & display
function show(index){
  if (!items.length || !viewer) return;

  i = (index + items.length) % items.length;

  // bounce
  viewer.classList.remove('bounce'); void viewer.offsetWidth;
  viewer.classList.add('bounce');

  // preload
  const next = new Image();
  next.onload = () => {
    if (imgEl){
      imgEl.src = next.src;
      imgEl.alt = items[i].name || 'Product photo';
      frame?.classList.add('loaded');
      imgEl.classList.remove('ready');
      requestAnimationFrame(() => imgEl.classList.add('ready'));
    }
  };
  next.src = items[i].image || '';

  if (nameEl) nameEl.textContent = items[i].name;
  if (descEl) descEl.textContent = items[i].desc;
}

// controls
leftBtn?.addEventListener('click',  () => show(i - 1));
rightBtn?.addEventListener('click', () => show(i + 1));

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft')  show(i - 1);
  if (e.key === 'ArrowRight') show(i + 1);
});

// init product viewer only when features section exists
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('#features')) show(0);
});
