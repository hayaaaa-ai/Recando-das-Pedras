(() => {
  'use strict';
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const reputation = document.querySelector('.reputation');
  const data = window.RECANTO_CONFIG?.reviews;
  let countFrame = 0;
  const finishCount = () => {
    cancelAnimationFrame(countFrame);
    document.querySelector('[data-review-rating]').textContent = data.rating;
    document.querySelector('[data-review-count]').textContent = `${data.count} avaliações no Google`;
    reputation.classList.add('counted');
    reputation.style.setProperty('--rating-percent', `${parseFloat(data.rating.replace(',','.')) / 5 * 100}%`);
  };
  const animateCount = () => {
    reputation.classList.add('counted');
    if (motion.matches) return finishCount();
    const started = performance.now();
    const rating = parseFloat(data.rating.replace(',','.'));
    const ratingNode = document.querySelector('[data-review-rating]');
    const countNode = document.querySelector('[data-review-count]');
    // Visual count only: the accessible rating label remains the final, real value.
    ratingNode.setAttribute('aria-hidden','true');
    countNode.setAttribute('aria-label',`${data.count} avaliações no Google`);
    const tick = now => {
      const progress = Math.min((now - started) / 700,1);
      const eased = 1 - Math.pow(1 - progress,3);
      ratingNode.textContent = (rating * eased).toFixed(1).replace('.',',');
      countNode.textContent = `${Math.round(data.count * eased)} avaliações no Google`;
      if (progress < 1 && !motion.matches) countFrame = requestAnimationFrame(tick);
      else finishCount();
    };
    countFrame = requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window && data) {
    const counterObserver = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { animateCount(); counterObserver.disconnect(); }
    },{threshold:.25});
    counterObserver.observe(reputation);
  } else if (data) finishCount();

  // A leitura e navegação dos relatos pertencem exclusivamente a reviews-3d.js.
  motion.addEventListener('change',()=>{if(motion.matches && data)finishCount()});

  const galleryItems=[...document.querySelectorAll('.gallery-item')];
  const galleryGrid=document.querySelector('.gallery-grid');
  let galleryAnimation;
  motion.addEventListener('change',()=>{if(motion.matches)galleryAnimation?.cancel()});
  document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
    const filter=button.dataset.filter;
    if (button.getAttribute('aria-pressed')==='true') return;
    galleryAnimation?.cancel();
    document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    galleryItems.forEach(item=>{item.hidden=filter!=='todos'&&item.dataset.category!==filter;if(!item.hidden)item.classList.add('visible')});
    galleryGrid.classList.toggle('is-filtered',filter!=='todos');
    // Primeiro rearranjar os itens; depois animar o grupo sem lacunas ou timers.
    if(!motion.matches && typeof galleryGrid.animate==='function') {
      galleryAnimation=galleryGrid.animate([{opacity:.6,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:240,easing:'cubic-bezier(.2,.6,.2,1)'});
    }
    document.querySelector('#gallery-status').textContent=`${galleryItems.filter(i=>!i.hidden).length} fotografias: ${button.textContent}`;
  }));
  document.querySelector('.map-load').addEventListener('click',event=>{
    const button=event.currentTarget;
    const iframe=document.createElement('iframe');
    iframe.title='Localização do Recanto das Pedras, Fabião I, Januária, no Google Maps';
    iframe.src=button.dataset.mapUrl;
    iframe.loading='lazy';
    iframe.referrerPolicy='strict-origin-when-cross-origin';
    const parent=button.closest('.map-preview');
    parent.replaceWith(iframe);
    iframe.addEventListener('load',()=>iframe.focus());
  });
  const destination=document.querySelector('.destination');
  let landscapeVisible=false;
  let landscapeTick=false;
  const finePointer=matchMedia('(hover:hover) and (pointer:fine) and (min-width:961px)');
  const updateLandscape=()=>{
    landscapeTick=false;
    if(!landscapeVisible||motion.matches||!finePointer.matches){destination.style.removeProperty('--landscape-y');return}
    const bounds=destination.getBoundingClientRect();
    const progress=(innerHeight-bounds.top)/(innerHeight+bounds.height);
    destination.style.setProperty('--landscape-y',`${(progress-.5)*45}px`);
  };
  if('IntersectionObserver' in window)new IntersectionObserver(entries=>{landscapeVisible=entries[0].isIntersecting;updateLandscape()}).observe(destination);
  addEventListener('scroll',()=>{if(landscapeVisible&&!landscapeTick){landscapeTick=true;requestAnimationFrame(updateLandscape)}},{passive:true});
  motion.addEventListener('change',updateLandscape);
  finePointer.addEventListener('change',updateLandscape);
})();
