
document.addEventListener('DOMContentLoaded', ()=>{
  const y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear();
  if(document.getElementById('featuredGrid')) renderFeatured();
  if(document.getElementById('toursGrid')) renderTours();
  // fill search q if present
  const url=new URL(window.location.href); const q=url.searchParams.get('q'); if(q) document.getElementById('qTours').value=q;
});

const TOURS = [
  {id:'inca-jungle-4d', title:'Inca Jungle 4D', cat:'Aventura', price:379, img:'/assets/banner.jpg', url:'/tour-inca-jungle-4d.html', short:'Bici, trek y Machu Picchu', popular:5},
  {id:'machu-picchu-full', title:'Machu Picchu Full Day', cat:'Cultural', price:279, img:'/assets/banner.jpg', url:'/tours.html', short:'Tren + guía oficial', popular:4},
  {id:'rainbow-mountain', title:'Rainbow Mountain', cat:'Full Day', price:49, img:'/assets/banner.jpg', url:'/tours.html', short:'Salida temprana', popular:3}
];

function renderFeatured(){
  const el=document.getElementById('featuredGrid'); if(!el) return;
  el.innerHTML = TOURS.slice(0,3).map(t=>cardHtml(t)).join('');
}

function renderTours(){
  const el=document.getElementById('toursGrid'); if(!el) return;
  const q=(document.getElementById('qTours')||{value:''}).value.toLowerCase();
  const cat=(document.getElementById('catTours')||{value:''}).value;
  const sort=(document.getElementById('sortTours')||{value:'popular'}).value;
  let items = TOURS.filter(t=> (t.title.toLowerCase().includes(q) || t.short.toLowerCase().includes(q)) && (!cat || t.cat===cat));
  if(sort==='price_asc') items.sort((a,b)=>a.price-b.price);
  if(sort==='price_desc') items.sort((a,b)=>b.price-a.price);
  if(sort==='popular') items.sort((a,b)=>b.popular-a.popular);
  el.innerHTML = items.map(t=>cardHtml(t)).join('') || '<div class="card">No se encontraron tours.</div>';
}

function cardHtml(t){ return `<article class="card-t"><img src="${t.img}" alt="${t.title}"/><div class="p"><h3>${t.title}</h3><div class="muted small">${t.short}</div><div style="display:flex;justify-content:space-between;align-items:center;margin-top:10px"><div style="font-weight:800;color:var(--accent)">$${t.price}</div><a class="btn" href="${t.url}">Ver</a></div></div></article>`; }

function goToTours(){ const q=document.getElementById('qHome').value; const cat=document.getElementById('catHome').value; window.location.href='tours.html?q='+encodeURIComponent(q)+'&cat='+encodeURIComponent(cat); }

function bookMail(form){ const data=new FormData(form); let body=''; data.forEach((v,k)=> body+=k+': '+v+'\n'); const mailto='mailto:info@haku.travel.com?subject='+encodeURIComponent('Reserva')+'&body='+encodeURIComponent(body); window.location.href=mailto; return false; }
