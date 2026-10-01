(() => {
  'use strict';
  const settings = window.RECANTO_CONFIG || {};
  const phone = String(settings.whatsapp || '').replace(/\D/g, '');
  document.querySelectorAll('a[data-destination]').forEach(link => {
    const destination = link.dataset.destination;
    if (destination === 'whatsapp' && /^55\d{10,11}$/.test(phone)) {
      const message = settings.messages?.[link.dataset.messageKey];
      if (message) link.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    } else if (settings.destinations?.[destination]) {
      link.href = settings.destinations[destination];
    }
  });
  document.querySelectorAll('.contact-number').forEach(number => {
    if (settings.displayPhone) number.textContent = settings.displayPhone;
  });
  if (settings.reviews) {
    document.querySelector('[data-review-rating]').textContent = settings.reviews.rating;
    document.querySelector('.google-rating').setAttribute('aria-label', `Nota ${settings.reviews.rating} de 5 no Google`);
    document.querySelector('[data-review-count]').textContent = settings.reviews.countLabel;
    const date = document.querySelector('[data-review-date]');
    date.dateTime = settings.reviews.checkedOn;
    date.textContent = settings.reviews.checkedOnDisplay;
  }
  document.querySelector('#year').textContent = new Date().getFullYear();
  const toggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#navigation');
  const closeMenu = () => { toggle.setAttribute('aria-expanded', 'false'); navigation.classList.remove('open'); };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('open', open);
  });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navigation.classList.contains('open')) { closeMenu(); toggle.focus(); }
  });
  document.addEventListener('click', event => {
    if (navigation.classList.contains('open') && !event.target.closest('.header')) closeMenu();
  });
  window.matchMedia('(min-width: 961px)').addEventListener('change', closeMenu);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const revealElements = [...document.querySelectorAll('.reveal')];
  let revealObserver;
  const reveal = (element, immediate = false) => {
    if (immediate) element.classList.add('reveal-immediate');
    element.classList.add('visible');
    revealObserver?.unobserve(element);
  };
  const updateMotion = () => {
    const enabled = !reducedMotion.matches && 'IntersectionObserver' in window;
    document.body.classList.toggle('motion-enabled', enabled);
    if (!enabled) {
      revealObserver?.disconnect();
      revealElements.forEach(element => reveal(element, true));
      document.body.classList.remove('hero-entering');
      return;
    }
    // Entradas já concluídas nunca voltam a ser observadas ou escondidas.
    revealObserver ||= new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) reveal(entry.target);
    }), { threshold: 0.08 });
    revealElements.filter(element => !element.classList.contains('visible')).forEach(element => revealObserver.observe(element));
  };
  updateMotion();
  if (document.body.classList.contains('motion-enabled')) document.body.classList.add('hero-entering');
  document.querySelector('.hero-copy .actions').addEventListener('animationend', event => {
    if (event.target === event.currentTarget) document.body.classList.remove('hero-entering');
  });
  // Ao navegar por teclado, o destino focado fica visível imediatamente.
  document.addEventListener('focusin', event => {
    for (let element = event.target; element instanceof Element; element = element.parentElement) {
      if (element.matches('.reveal:not(.visible)')) reveal(element, true);
    }
  });
  const hero = document.querySelector('.hero');
  const header = document.querySelector('.header');
  const heroVisual = document.querySelector('.hero-visual');
  const heroCopy = document.querySelector('.hero-copy');
  const heroShade = document.querySelector('.hero-shade');
  const pointer = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 961px)');
  const frames = [...document.querySelectorAll('[data-depth]')];
  let heroVisible = true;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      heroVisible = entries[0].isIntersecting;
      hero.classList.toggle('hero-in-view', heroVisible);
    }).observe(hero);
  }
  let ticking = false;
  const updateParallax = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 40);
    if (heroVisible && !reducedMotion.matches && pointer.matches) {
      const progress = Math.min(window.scrollY / hero.offsetHeight, 1);
      heroVisual.style.setProperty('--hero-y', `${progress * 65}px`);
      heroCopy.style.setProperty('--copy-y', `${progress * -20}px`);
      heroShade.style.setProperty('--shade-y', `${progress * 10}px`);
    } else {
      heroVisual.style.removeProperty('--hero-y');
      heroCopy.style.removeProperty('--copy-y');
      heroShade.style.removeProperty('--shade-y');
    }
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { window.requestAnimationFrame(updateParallax); ticking = true; }
  }, { passive: true });
  reducedMotion.addEventListener('change', () => {
    updateMotion();
    resetDepth();
    updateParallax();
  });
  window.addEventListener('resize', updateParallax, { passive: true });
  const resetDepth = () => frames.forEach(frame => {
    frame.style.removeProperty('--tilt-x');
    frame.style.removeProperty('--tilt-y');
    frame.classList.remove('depth-active');
  });
  frames.forEach(frame => {
    let pointerFrame = 0;
    let latestPoint = null;
    frame.addEventListener('pointermove', event => {
      if (reducedMotion.matches || !pointer.matches || event.pointerType === 'touch') return;
      latestPoint = { x: event.clientX, y: event.clientY };
      if (pointerFrame) return;
      pointerFrame = window.requestAnimationFrame(() => {
        pointerFrame = 0;
        if (!latestPoint || reducedMotion.matches || !pointer.matches) return;
        const bounds = frame.getBoundingClientRect();
        const x = Math.max(-.5, Math.min(.5, (latestPoint.x - bounds.left) / bounds.width - .5));
        const y = Math.max(-.5, Math.min(.5, (latestPoint.y - bounds.top) / bounds.height - .5));
        frame.style.setProperty('--tilt-x', `${-y * 3.6}deg`);
        frame.style.setProperty('--tilt-y', `${x * 3.6}deg`);
        frame.classList.add('depth-active');
      });
    }, { passive: true });
    frame.addEventListener('pointerleave', () => {
      latestPoint = null;
      window.cancelAnimationFrame(pointerFrame);
      pointerFrame = 0;
      frame.style.removeProperty('--tilt-x');
      frame.style.removeProperty('--tilt-y');
      frame.classList.remove('depth-active');
    });
  });
  pointer.addEventListener('change', () => { resetDepth(); updateParallax(); });
  updateParallax();
  const photoDialog = document.querySelector('#photo-dialog');
  const allPhotographs = [...document.querySelectorAll('#galeria [data-photo]')];
  let photographs = allPhotographs;
  let currentPhoto = 0;
  const showPhoto = index => {
    currentPhoto = (index + photographs.length) % photographs.length;
    const button = photographs[currentPhoto];
    const image = document.querySelector('#dialog-image');
    image.classList.add('photo-changing');
    image.onload = () => image.classList.remove('photo-changing');
    image.onerror = () => image.classList.remove('photo-changing');
    image.src = button.dataset.photo;
    image.alt = button.querySelector('img').alt;
    document.querySelector('#dialog-caption').textContent = button.dataset.caption;
    document.querySelector('#photo-counter').textContent = `${currentPhoto + 1} / ${photographs.length}`;
  };
  allPhotographs.forEach(button => button.addEventListener('click', () => {
    photographs = allPhotographs.filter(photo => !photo.hidden);
    showPhoto(photographs.indexOf(button));
    photoDialog.showModal();
    document.body.classList.add('modal-open');
  }));
  document.querySelector('.photo-previous').addEventListener('click', () => showPhoto(currentPhoto - 1));
  document.querySelector('.photo-next').addEventListener('click', () => showPhoto(currentPhoto + 1));
  photoDialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showPhoto(currentPhoto + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  document.querySelector('.credits-toggle').addEventListener('click', () => document.querySelector('#credits-dialog').showModal());
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => {
      if (!document.querySelector('dialog[open]')) document.body.classList.remove('modal-open');
    });
    dialog.addEventListener('click', event => {
      const bounds = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
    });
  });
})();
