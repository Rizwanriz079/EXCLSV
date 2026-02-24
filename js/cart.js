/* ═══════════════════════════════
   EXCLSV — Shared Cart, UI & Auth
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
    const ordId='EX'+Math.random().toString(36).slice(2,8).toUpperCase();

    // Build and save order
    const order = {
      id: ordId,
      date: new Date().toISOString(),
      items: cart.map(i=>({...i})),
      subtotal: cartTotal(),
      shipCost: cartTotal()>=150?0:9.99,
      status: 'Processing',
      addr: {
        name: ((document.getElementById('f-fname')?.value||'')+' '+(document.getElementById('f-lname')?.value||'')).trim(),
        line: (document.getElementById('f-addr')?.value||'')+', '+(document.getElementById('f-city')?.value||''),
        country: document.getElementById('f-country')?.value||''
      }
    };
    const history = getOrderHistory();
    history.unshift(order);
    saveOrderHistory(history);

    document.getElementById('conf-id').textContent = 'ORDER #'+ordId;

    // If not logged in → show "Create Account" prompt in conf-modal
    const user = getUser();
    const confBox = document.querySelector('.conf-box');
    if(confBox && !user && !confBox.querySelector('.conf-auth-cta')) {
      const cta = document.createElement('div');
      cta.className = 'conf-auth-cta';
      cta.style.cssText = 'border-top:1px solid rgba(255,255,255,.08);padding-top:20px;margin:4px 0;text-align:center;';
      cta.innerHTML = '<p style="font-size:.58rem;color:rgba(255,255,255,.38);letter-spacing:.06em;line-height:1.8;margin-bottom:14px">Create a free account to track this order &amp; view your order history.</p>'
        +'<button onclick="closeConfirm();openAuthModal(\'signup\')" style="padding:12px 28px;background:transparent;color:var(--white);border:1px solid rgba(255,255,255,.22);font-size:.56rem;font-weight:800;letter-spacing:.18em;text-transform:uppercase;cursor:pointer;font-family:inherit;border-radius:2px;transition:border-color .2s">Create Account →</button>';
      const cb = confBox.querySelector('.conf-btn');
      if(cb) confBox.insertBefore(cta, cb); else confBox.appendChild(cta);
    }

    document.getElementById('conf-modal').classList.add('on');
    document.body.style.overflow='hidden';
    cart=[]; saveCart(); renderCartDrawer(); updateBadges();
    if(btn){ btn.textContent='Place Order'; btn.disabled=false; }
  },1600);
}

function closeConfirm() {
  document.getElementById('conf-modal').classList.remove('on');
  document.body.style.overflow='';
  document.querySelector('.conf-auth-cta')?.remove();
  if(document.querySelector('#step2 .btn-next')){ document.querySelector('#step2 .btn-next').textContent='Place Order'; document.querySelector('#step2 .btn-next').disabled=false; }
  document.querySelectorAll('.fi').forEach(f=>f.value='');
}

/* ── Auth Storage ── */
function getUser()         { try{ return JSON.parse(localStorage.getItem('exclsv_user')||'null'); }catch(e){ return null; } }
function saveUser(u)       { if(u) localStorage.setItem('exclsv_user', JSON.stringify(u)); else localStorage.removeItem('exclsv_user'); }
function getOrderHistory() { try{ return JSON.parse(localStorage.getItem('exclsv_orders')||'[]'); }catch(e){ return []; } }
function saveOrderHistory(o){ localStorage.setItem('exclsv_orders', JSON.stringify(o)); }
function getAccounts()     { try{ return JSON.parse(localStorage.getItem('exclsv_accounts')||'[]'); }catch(e){ return []; } }
function saveAccounts(a)   { localStorage.setItem('exclsv_accounts', JSON.stringify(a)); }

/* ── Auth Actions ── */
function authLogin(email, pass) {
  const accs = getAccounts();
  const acc  = accs.find(a=>a.email.toLowerCase()===email.toLowerCase());
  if(!acc) return 'No account found with this email.';
  if(acc.pass !== btoa(unescape(encodeURIComponent(pass)))) return 'Incorrect password.';
  saveUser({ id:acc.id, email:acc.email, name:acc.name, avatar:acc.avatar||null, since:acc.since });
  return null;
}
function authSignup(name, email, pass) {
  const accs = getAccounts();
  if(accs.find(a=>a.email.toLowerCase()===email.toLowerCase())) return 'An account with this email already exists.';
  const acc = { id:Date.now(), name, email, pass:btoa(unescape(encodeURIComponent(pass))), avatar:null, since:new Date().toISOString() };
  accs.push(acc);
  saveAccounts(accs);
  saveUser({ id:acc.id, email, name, avatar:null, since:acc.since });
  return null;
}
function authLogout() {
  saveUser(null);
  updateAuthUI();
  showToast('Logged out. See you next time!');
  if(window.location.pathname.replace(/\\/g,'/').endsWith('profile.html')) window.location.href='index.html';
}

/* ── Auth Modal ── */
function openAuthModal(mode='login') {
  document.getElementById('auth-modal')?.classList.add('on');
  openBD();
  showAuthTab(mode);
}
function closeAuthModal() {
  document.getElementById('auth-modal')?.classList.remove('on');
  closeBD();
}
function showAuthTab(tab) {
  const lf = document.getElementById('auth-login-form');
  const sf = document.getElementById('auth-signup-form');
  if(!lf||!sf) return;
  document.querySelectorAll('.auth-tab').forEach(t=>t.classList.toggle('act', t.dataset.tab===tab));
  lf.style.display = tab==='login'  ? 'flex' : 'none';
  sf.style.display = tab==='signup' ? 'flex' : 'none';
  document.querySelectorAll('.auth-err').forEach(e=>e.textContent='');
}
function submitLogin(e) {
  e.preventDefault();
  const email = document.getElementById('li-email')?.value.trim()||'';
  const pass  = document.getElementById('li-pass')?.value||'';
  const err   = authLogin(email, pass);
  if(err){ document.getElementById('li-err').textContent=err; return; }
  closeAuthModal();
  updateAuthUI();
  showToast('Welcome back! 👋');
}
function submitSignup(e) {
  e.preventDefault();
  const name  = document.getElementById('su-name')?.value.trim()||'';
  const email = document.getElementById('su-email')?.value.trim()||'';
  const pass  = document.getElementById('su-pass')?.value||'';
  const errEl = document.getElementById('su-err');
  if(name.length<2){ errEl.textContent='Please enter your full name.'; return; }
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ errEl.textContent='Please enter a valid email.'; return; }
  if(pass.length<6){ errEl.textContent='Password must be at least 6 characters.'; return; }
  const err = authSignup(name, email, pass);
  if(err){ errEl.textContent=err; return; }
  closeAuthModal();
  updateAuthUI();
  showToast('Account created! Welcome to EXCLSV 🎉');
}

function updateAuthUI() {
  const user = getUser();
  const acts = document.querySelector('.nav-acts');
  if(!acts) return;
  let pb = document.getElementById('nav-prof-btn');
  if(!pb){
    pb = document.createElement('button');
    pb.id = 'nav-prof-btn';
    pb.className = 'nav-btn';
    const ham = acts.querySelector('.hamburger');
    if(ham) acts.insertBefore(pb, ham); else acts.appendChild(pb);
  }
  if(user){
    pb.title = user.name;
    pb.innerHTML = `<span style="width:24px;height:24px;border-radius:50%;background:var(--white);color:var(--black);font-size:.52rem;font-weight:900;display:flex;align-items:center;justify-content:center;letter-spacing:0;flex-shrink:0">${user.name.trim()[0].toUpperCase()}</span>`;
    pb.onclick = ()=> window.location.href='profile.html';
  } else {
    pb.title = 'Log In';
    pb.innerHTML = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
    pb.onclick = ()=> openAuthModal('login');
  }
}

function createAuthModal() {
  if(document.getElementById('auth-modal')) return;
  // Inject CSS
  const style = document.createElement('style');
  style.textContent = `
    #auth-modal{position:fixed;inset:0;z-index:10002;display:none;align-items:center;justify-content:center;padding:20px}
    #auth-modal.on{display:flex}
    .auth-box{background:#0a0a0a;border:1px solid rgba(255,255,255,.1);padding:clamp(28px,4vw,48px);width:100%;max-width:430px;position:relative;border-radius:3px}
    .auth-x{position:absolute;top:14px;right:16px;background:none;border:none;color:rgba(255,255,255,.4);font-size:1.15rem;cursor:pointer;transition:color .2s;padding:4px}
    .auth-x:hover{color:var(--white)}
    .auth-logo{font-size:1rem;font-weight:900;letter-spacing:.28em;margin-bottom:26px;color:var(--white)}
    .auth-tabs{display:flex;margin-bottom:28px;border-bottom:1px solid rgba(255,255,255,.07)}
    .auth-tab{background:none;border:none;color:rgba(255,255,255,.3);font-family:inherit;font-size:.52rem;font-weight:800;letter-spacing:.24em;text-transform:uppercase;padding:10px 0;margin-right:22px;cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-1px;transition:color .2s,border-color .2s}
    .auth-tab.act{color:var(--white);border-bottom-color:var(--white)}
    .auth-form{display:flex;flex-direction:column;gap:16px}
    .auth-fg{display:flex;flex-direction:column;gap:7px}
    .auth-fl{font-size:.48rem;font-weight:800;letter-spacing:.32em;text-transform:uppercase;color:rgba(255,255,255,.32)}
    .auth-fi{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);border-radius:2px;padding:13px 15px;color:var(--white);font-family:inherit;font-size:.76rem;outline:none;transition:border-color .25s;width:100%}
    .auth-fi:focus{border-color:rgba(255,255,255,.35)}
    .auth-err{font-size:.58rem;color:#ff5a5a;letter-spacing:.04em;min-height:1.2em;line-height:1.5}
    .auth-btn{padding:15px;background:var(--white);color:var(--black);border:none;font-family:inherit;font-size:.6rem;font-weight:900;letter-spacing:.24em;text-transform:uppercase;cursor:pointer;transition:opacity .2s;border-radius:2px;margin-top:2px}
    .auth-btn:hover{opacity:.86}
    .auth-switch{font-size:.56rem;color:rgba(255,255,255,.28);letter-spacing:.04em;text-align:center;margin-top:2px}
    .auth-switch span{color:rgba(255,255,255,.7);cursor:pointer;text-decoration:underline}
    .auth-switch span:hover{color:var(--white)}
  `;
  document.head.appendChild(style);
  // Inject modal HTML
  const div = document.createElement('div');
  div.id = 'auth-modal';
  div.innerHTML = `
    <div class="auth-box">
      <button class="auth-x" onclick="closeAuthModal()">✕</button>
      <div class="auth-logo">EXCLSV</div>
      <div class="auth-tabs">
        <button class="auth-tab act" data-tab="login" onclick="showAuthTab('login')">Log In</button>
        <button class="auth-tab" data-tab="signup" onclick="showAuthTab('signup')">Create Account</button>
      </div>
      <form id="auth-login-form" class="auth-form" onsubmit="submitLogin(event)">
        <div class="auth-fg"><label class="auth-fl">Email</label><input class="auth-fi" id="li-email" type="email" placeholder="john@example.com" required/></div>
        <div class="auth-fg"><label class="auth-fl">Password</label><input class="auth-fi" id="li-pass" type="password" placeholder="Your password" required/></div>
        <div class="auth-err" id="li-err"></div>
        <button class="auth-btn" type="submit">Log In →</button>
        <p class="auth-switch">No account? <span onclick="showAuthTab('signup')">Create one free</span></p>
      </form>
      <form id="auth-signup-form" class="auth-form" style="display:none" onsubmit="submitSignup(event)">
        <div class="auth-fg"><label class="auth-fl">Full Name</label><input class="auth-fi" id="su-name" type="text" placeholder="John Doe" required/></div>
        <div class="auth-fg"><label class="auth-fl">Email</label><input class="auth-fi" id="su-email" type="email" placeholder="john@example.com" required/></div>
        <div class="auth-fg"><label class="auth-fl">Password</label><input class="auth-fi" id="su-pass" type="password" placeholder="At least 6 characters" required/></div>
        <div class="auth-err" id="su-err"></div>
        <button class="auth-btn" type="submit">Create Account →</button>
        <p class="auth-switch">Already have one? <span onclick="showAuthTab('login')">Log in</span></p>
      </form>
    </div>`;
  document.body.appendChild(div);
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
  if(e.key==='Escape'){ closeSearch(); closeCart(); closeMNav(); closeCheckout(); closeAuthModal(); closeBD(); }
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
  createAuthModal();
  updateAuthUI();
  // Also close auth modal on backdrop click
  document.getElementById('backdrop')?.addEventListener('click', closeAuthModal);
  document.querySelectorAll('.wl-btn[data-id]').forEach(btn=>syncWLBtn(btn, +btn.dataset.id));
  document.getElementById('search-input')?.addEventListener('input', e=>renderSearchResults(e.target.value));
}
