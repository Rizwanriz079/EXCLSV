/* ═══════════════════════════════
   EXCLSV — Shared Cart & UI
═══════════════════════════════ */

let cart     = [];
let wishlist = [];

/* ── Storage ── */
function loadStorage() {
  try { cart     = JSON.parse(localStorage.getItem('exclsv_cart')||'[]'); } catch(e){ cart=[]; }
  try { wishlist = JSON.parse(localStorage.getItem('exclsv_wl')  ||'[]'); } catch(e){ wishlist=[]; }
}
function saveCart() { localStorage.setItem('exclsv_cart', JSON.stringify(cart)); }
function saveWL()   { localStorage.setItem('exclsv_wl',   JSON.stringify(wishlist)); }

/* ── Cart Actions ── */
function addToCart(productId, size) {
  const p = getProduct(productId);
  if(!p) return;
  const key = `${productId}-${size}`;
  const ex  = cart.find(i=>i.key===key);
  if(ex) {
    if(ex.qty>=10){ showToast('Max quantity reached','err'); return; }
    ex.qty++;
  } else {
    cart.push({key, id:productId, name:p.name, price:p.price, img:p.img, size, qty:1});
  }
  saveCart(); renderCartDrawer(); updateBadges();
  bumpBadge('cart-badge');
  showToast('Added to bag ✓');
}

function removeFromCart(key) {
  cart = cart.filter(i=>i.key!==key);
  saveCart(); renderCartDrawer(); updateBadges();
}

function changeQty(key, delta) {
  const item = cart.find(i=>i.key===key);
  if(!item) return;
  item.qty = Math.max(1, Math.min(10, item.qty+delta));
  saveCart(); renderCartDrawer(); updateBadges();
}

function cartTotal() { return cart.reduce((s,i)=>s+i.price*i.qty,0); }
function cartCount() { return cart.reduce((s,i)=>s+i.qty,0); }

/* ── Wishlist ── */
function toggleWL(productId) {
  const idx = wishlist.indexOf(+productId);
  if(idx>-1){ wishlist.splice(idx,1); showToast('Removed from wishlist'); }
  else       { wishlist.push(+productId); showToast('Saved to wishlist ♥'); }
  saveWL(); updateBadges();
  // update all WL buttons on page
  document.querySelectorAll(`.wl-btn[data-id="${productId}"]`).forEach(b=>syncWLBtn(b,productId));
}
function isWL(id) { return wishlist.includes(+id); }
function syncWLBtn(btn, id) {
  if(!btn) return;
  const on = isWL(id);
  btn.classList.toggle('on',on);
  btn.querySelector('svg')?.setAttribute('fill', on?'#ff3b30':'none');
  btn.querySelector('svg')?.setAttribute('stroke', on?'#ff3b30':'currentColor');
}

/* ── Badges ── */
function updateBadges() {
  const cc = cartCount();
  const wc = wishlist.length;
  const cb = document.getElementById('cart-badge');
  const wb = document.getElementById('wl-badge');
  if(cb){ cb.textContent=cc; cb.style.display=cc>0?'flex':'none'; }
  if(wb){ wb.textContent=wc; wb.style.display=wc>0?'flex':'none'; }
}
function bumpBadge(id) {
  const b = document.getElementById(id);
  if(!b) return;
  b.classList.remove('bump');
  requestAnimationFrame(()=>requestAnimationFrame(()=>b.classList.add('bump')));
  setTimeout(()=>b.classList.remove('bump'),400);
}

/* ── Cart Drawer ── */
function openCart()  { document.getElementById('cart-drawer').classList.add('on'); openBD(); }
function closeCart() { document.getElementById('cart-drawer').classList.remove('on'); closeBD(); }

function renderCartDrawer() {
  const cnt = cartCount();
  const tot = cartTotal();
  const lbl = document.getElementById('cart-count-lbl');
  const ft  = document.getElementById('cart-ft');
  const box = document.getElementById('cart-items');
  if(lbl) lbl.textContent = `${cnt} item${cnt!==1?'s':''}`;
  if(ft)  ft.style.display = cnt>0?'block':'none';
  const totEl = document.getElementById('cart-total');
  if(totEl) totEl.textContent = '$'+tot.toFixed(0);
  if(!box) return;
  if(cnt===0){
    box.innerHTML=`<div class="cart-empty"><div class="ce-icon">🛍</div><div class="ce-txt">Your bag is empty</div><a href="shop.html" class="ce-link" onclick="closeCart()">Start Shopping →</a></div>`;
    return;
  }
  box.innerHTML = cart.map(i=>`
    <div class="citem">
      <a href="product.html?id=${i.id}" class="ci-img" onclick="closeCart()"><img src="${i.img}" alt="${i.name}" loading="lazy"/></a>
      <div class="ci-info">
        <a href="product.html?id=${i.id}" class="ci-name" onclick="closeCart()">${i.name}</a>
        <div class="ci-meta">Size: ${i.size}</div>
        <div class="ci-row">
          <div class="qty-wrap">
            <button class="qty-b" onclick="changeQty('${i.key}',-1)">−</button>
            <span class="qty-n">${i.qty}</span>
            <button class="qty-b" onclick="changeQty('${i.key}',1)">+</button>
          </div>
          <span class="ci-price">$${(i.price*i.qty).toFixed(0)}</span>
        </div>
        <button class="ci-rm" onclick="removeFromCart('${i.key}')">Remove</button>
      </div>
    </div>`).join('');
}

/* ── Backdrop ── */
function openBD()  { document.getElementById('backdrop').classList.add('on'); document.body.style.overflow='hidden'; }
function closeBD() { document.getElementById('backdrop').classList.remove('on'); document.body.style.overflow=''; }

/* ── Toast ── */
function showToast(msg, type='') {
  const el = document.createElement('div');
  el.className = 'toast'+(type==='err'?' err':'');
  el.innerHTML = `<span class="t-icon">${type==='err'?'⚠':'✓'}</span>${msg}`;
  document.getElementById('toasts').appendChild(el);
  requestAnimationFrame(()=>requestAnimationFrame(()=>el.classList.add('show')));
  setTimeout(()=>{ el.classList.remove('show'); setTimeout(()=>el.remove(),500); },3000);
}

/* ── Mobile Nav ── */
function openMNav()  { document.getElementById('mnav').classList.add('on'); openBD(); }
function closeMNav() { document.getElementById('mnav').classList.remove('on'); closeBD(); }

/* ── Search ── */
function openSearch() {
  document.getElementById('search-overlay').classList.add('on');
  document.body.style.overflow='hidden';
  setTimeout(()=>document.getElementById('search-input')?.focus(),180);
  renderSearchResults('');
}
function closeSearch() {
  document.getElementById('search-overlay').classList.remove('on');
  document.body.style.overflow='';
  const inp = document.getElementById('search-input');
  if(inp) inp.value='';
}
function renderSearchResults(q) {
  const box = document.getElementById('search-results');
  if(!box) return;
  const term = q.trim().toLowerCase();
  const res  = term ? PRODUCTS.filter(p=>p.name.toLowerCase().includes(term)||p.cats.some(c=>c.includes(term))) : PRODUCTS.slice(0,8);
  if(!res.length){ box.innerHTML=`<div class="src-empty">No results for "${q}"</div>`; return; }
  box.innerHTML = res.map(p=>`
    <a href="product.html?id=${p.id}" class="src-card" onclick="closeSearch()">
      <div class="src-img"><img src="${p.img}" alt="${p.name}" loading="lazy"/></div>
      <div class="src-name">${p.name}</div>
      <div class="src-price">$${p.price}${p.oldPrice?` <s>$${p.oldPrice}</s>`:''}</div>
    </a>`).join('');
}

/* ── Checkout ── */
function openCheckout() {
  if(cart.length===0){ showToast('Your bag is empty','err'); return; }
  closeCart();
  updateCheckoutSummary();
  goStep(1,false);
  document.getElementById('chkout-modal').classList.add('on');
  openBD();
}
function closeCheckout() {
  document.getElementById('chkout-modal').classList.remove('on');
  closeBD();
}
function updateCheckoutSummary() {
  const sub  = cartTotal();
  const ship = sub>=150?0:9.99;
  const tax  = sub*0.08;
  const total= sub+ship+tax;
  const si = document.getElementById('sum-items');
  if(si) si.innerHTML = cart.map(i=>`
    <div class="sum-item">
      <div class="sum-img"><img src="${i.img}" alt=""/><span class="sum-qty">${i.qty}</span></div>
      <div class="sum-info"><div class="sum-name">${i.name}</div><div class="sum-meta">Size: ${i.size}</div></div>
      <div class="sum-iprice">$${(i.price*i.qty).toFixed(0)}</div>
    </div>`).join('');
  const set = (id,v)=>{ const el=document.getElementById(id); if(el)el.textContent=v; };
  set('sum-sub',   '$'+sub.toFixed(2));
  set('sum-ship',  ship===0?'Free':'$'+ship.toFixed(2));
  set('sum-tax',   '$'+tax.toFixed(2));
  set('sum-total', '$'+total.toFixed(2));
}
function goStep(n, validate=true) {
  if(validate && n===2 && !validateStep1()) return;
  ['cstep1','cstep2'].forEach((id,i)=>{
    const el=document.getElementById(id);
    if(!el)return;
    el.className='cs'+(i+1===n?' act':i+1<n?' done':'');
  });
  document.querySelectorAll('.chk-step').forEach(s=>s.classList.remove('act'));
  const s=document.getElementById('step'+n);
  if(s) s.classList.add('act');
}
function validateStep1() {
  let ok=true;
  const rules=[
    {id:'f-fname',err:'e-fname',fn:v=>v.trim().length>1},
    {id:'f-lname',err:'e-lname',fn:v=>v.trim().length>1},
    {id:'f-email',err:'e-email',fn:v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)},
    {id:'f-addr', err:'e-addr', fn:v=>v.trim().length>3},
    {id:'f-city', err:'e-city', fn:v=>v.trim().length>1},
    {id:'f-zip',  err:'e-zip',  fn:v=>v.trim().length>2},
    {id:'f-country',err:'e-country',fn:v=>v!=''},
  ];
  rules.forEach(r=>{
    const i=document.getElementById(r.id);
    const e=document.getElementById(r.err);
    if(!i)return;
    const v=r.fn(i.value);
    i.classList.toggle('fi-err',!v);
    if(e) e.classList.toggle('ferr-show',!v);
    if(!v) ok=false;
  });
  return ok;
}
function validateStep2() {
  let ok=true;
  const cn=document.getElementById('f-cnum')?.value.replace(/\s/g,'')||'';
  const rules=[
    {id:'f-cname',err:'e-cname',fn:v=>v.trim().length>2},
    {id:'f-cnum', err:'e-cnum', fn:()=>/^\d{16}$/.test(cn)},
    {id:'f-exp',  err:'e-exp',  fn:v=>/^\d{2}\/\d{2}$/.test(v)},
    {id:'f-cvv',  err:'e-cvv',  fn:v=>/^\d{3,4}$/.test(v)},
  ];
  rules.forEach(r=>{
    const i=document.getElementById(r.id);
    const e=document.getElementById(r.err);
    if(!i)return;
    const v=r.fn(i.value);
    i.classList.toggle('fi-err',!v);
    if(e) e.classList.toggle('ferr-show',!v);
    if(!v) ok=false;
  });
  return ok;
}
function placeOrder() {
  if(!validateStep2()) return;
  const btn=document.querySelector('#step2 .btn-next');
  if(btn){ btn.textContent='Processing…'; btn.disabled=true; }
  setTimeout(()=>{
    closeCheckout();
    const id='EX'+Math.random().toString(36).slice(2,8).toUpperCase();
    document.getElementById('conf-id').textContent='ORDER #'+id;
    document.getElementById('conf-modal').classList.add('on');
    document.body.style.overflow='hidden';
    cart=[]; saveCart(); renderCartDrawer(); updateBadges();
  },1600);
}
function closeConfirm() {
  document.getElementById('conf-modal').classList.remove('on');
  document.body.style.overflow='';
  if(document.querySelector('#step2 .btn-next')){ document.querySelector('#step2 .btn-next').textContent='Place Order'; document.querySelector('#step2 .btn-next').disabled=false; }
  document.querySelectorAll('.fi').forEach(f=>f.value='');
}

/* ── Scroll Reveal ── */
function setupReveal() {
  const els = document.querySelectorAll('.rv:not(.vis)');
  if(!('IntersectionObserver' in window)){ els.forEach(e=>e.classList.add('vis')); return; }
  const obs = new IntersectionObserver(ens=>{
    ens.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('vis'); obs.unobserve(en.target); } });
  },{threshold:0.1});
  els.forEach(e=>obs.observe(e));
}

/* ── Stats Counter ── */
function setupStats() {
  const els = document.querySelectorAll('.snum[data-target]');
  if(!els.length) return;
  const obs = new IntersectionObserver(ens=>{
    ens.forEach(en=>{ if(en.isIntersecting){ animCount(en.target,+en.target.dataset.target); obs.unobserve(en.target); } });
  },{threshold:0.4});
  els.forEach(e=>obs.observe(e));
}
function animCount(el, target) {
  const dur=1800, start=performance.now();
  const lbl=el.nextElementSibling?.textContent||'';
  const suf=lbl.includes('%')?'%':target>=1000?'+':'';
  (function step(now){
    const p=Math.min((now-start)/dur,1), e=1-Math.pow(1-p,3);
    const v=Math.round(e*target);
    el.textContent=(v>=1000?(v/1000).toFixed(0)+'K':v)+suf;
    if(p<1) requestAnimationFrame(step);
  })(start);
}

/* ── Card Formatting ── */
function setupCardFmt() {
  const cn=document.getElementById('f-cnum');
  if(cn) cn.addEventListener('input',e=>{
    let v=e.target.value.replace(/\D/g,'').slice(0,16);
    e.target.value=v.replace(/(.{4})/g,'$1 ').trim();
  });
  const ex=document.getElementById('f-exp');
  if(ex) ex.addEventListener('input',e=>{
    let v=e.target.value.replace(/\D/g,'').slice(0,4);
    if(v.length>2) v=v.slice(0,2)+'/'+v.slice(2);
    e.target.value=v;
  });
  document.querySelectorAll('.fi').forEach(i=>{
    i.addEventListener('input',()=>{
      i.classList.remove('fi-err');
      const e=document.getElementById('e-'+i.id.slice(2));
      if(e) e.classList.remove('ferr-show');
    });
  });
}

/* ── Header scroll ── */
function setupHeaderScroll() {
  window.addEventListener('scroll',()=>{
    document.getElementById('hdr')?.classList.toggle('scrolled',window.scrollY>60);
    document.getElementById('btt')?.classList.toggle('show',window.scrollY>500);
  });
}

/* ── Keyboard ── */
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){ closeSearch(); closeCart(); closeMNav(); closeCheckout(); closeBD(); }
});

/* ── Init shared ── */
function initShared() {
  loadStorage();
  renderCartDrawer();
  updateBadges();
  setupReveal();
  setupStats();
  setupCardFmt();
  setupHeaderScroll();
  // sync all WL buttons on page
  document.querySelectorAll('.wl-btn[data-id]').forEach(btn=>syncWLBtn(btn, +btn.dataset.id));
  // search input listener
  document.getElementById('search-input')?.addEventListener('input', e=>renderSearchResults(e.target.value));
}
