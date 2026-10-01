/* Avaliações: CSS 3D, um único relógio para as órbitas, sem dependências. */
(() => {
  'use strict';
  const section = document.querySelector('#avaliacoes');
  if (!section || !window.HTMLDialogElement || !Element.prototype.animate) return;
  const track = section.querySelector('.review-track');
  const cards = [...track.querySelectorAll('.review-card')];
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const wide = matchMedia('(min-width:1200px)');
  const pause = section.querySelector('.review-pause');
  const previous = section.querySelector('.review-previous');
  const next = section.querySelector('.review-next');
  const status = section.querySelector('#review-status');
  const scene = document.createElement('div');
  scene.className = 'reviews-scene';
  track.before(scene);
  const center = document.createElement('div');
  center.className = 'reviews-center';
  center.innerHTML = '<p>POUSADA & RESTAURANTE</p><h3>Recanto<br><em>das Pedras</em></h3><small>NO VALE DO PERUAÇU</small>';
  scene.append(center, track);
  const hint = document.createElement('p');
  hint.className = 'sr-only';
  hint.id = 'reviews-reading-hint';
  hint.textContent = 'Pressione Enter ou espaço para ler o trecho. O link do Google abre a fonte original.';
  scene.append(hint);
  const states = cards.map((card, index) => {
    const orbit = document.createElement('div');
    const tilt = document.createElement('div');
    const focus = document.createElement('div');
    orbit.className = 'review-orbit'; tilt.className = 'review-tilt'; focus.className = 'review-focus';
    card.before(orbit); orbit.append(tilt); tilt.append(focus); focus.append(card);
    card.setAttribute('aria-describedby', hint.id);
    const read = document.createElement('button');
    read.type = 'button'; read.className = 'review-read'; read.textContent = 'Ler este trecho →';
    read.setAttribute('aria-haspopup', 'dialog');
    read.setAttribute('aria-label', `Ler trecho de ${card.querySelector('cite').textContent}`);
    card.append(read);
    return {card, orbit, tilt, focus, phase:index * Math.PI / 3, hover:false, focused:false, rx:0, ry:0, rz:0};
  });
  // Criado depois dos scripts existentes para não duplicar os eventos dos outros diálogos.
  const dialog = document.createElement('dialog');
  dialog.id = 'review-dialog';
  dialog.setAttribute('aria-labelledby', 'review-dialog-title');
  dialog.setAttribute('aria-describedby', 'review-dialog-note');
  dialog.innerHTML = '<div class="review-dialog-panel" tabindex="-1"><div class="review-focus"></div></div>';
  section.append(dialog);
  const panel = dialog.querySelector('.review-dialog-panel');
  const reading = panel.querySelector('.review-focus');
  let mode = '', userPaused = false, inView = !('IntersectionObserver' in window);
  let frame = 0, lastTime = null, active = null, transition = null, closing = false;
  let radiusX = 0, radiusY = 340, sceneWidth = 0, viewportHeight = innerHeight;
  const isRunning = () => mode === 'orbit' && !motion.matches && !userPaused && inView && !document.hidden && !active && states.some(s => !s.hover && !s.focused);
  const stop = () => {cancelAnimationFrame(frame); frame = 0; lastTime = null;};
  const reposition = action => {
    // `auto` respeita scroll-behavior. Desativar a suavização apenas durante
    // reposicionamentos garante retorno imediato, inclusive no documento.
    const nodes = [document.documentElement, track];
    const saved = nodes.map(node => node.style.scrollBehavior);
    nodes.forEach(node => {node.style.scrollBehavior = 'auto';});
    try {action();} finally {
      nodes.forEach((node, index) => {
        if (saved[index]) node.style.scrollBehavior = saved[index];
        else node.style.removeProperty('scroll-behavior');
      });
    }
  };
  const draw = state => {
    // Diferenças de velocidade limitadas: os seis setores mantêm distância entre si.
    const phase = state.phase;
    const angle = phase + Math.sin(phase * 1.3) * .035;
    const x = Math.cos(angle) * radiusX;
    const y = Math.sin(angle) * radiusY;
    const z = Math.sin(angle + .7) * 48;
    state.rx = Math.sin(angle) * 2;
    state.ry = Math.cos(angle) * -3;
    state.rz = Math.sin(angle + .5) * 1.5;
    state.orbit.style.transform = `translate3d(${x.toFixed(3)}px,${y.toFixed(3)}px,${z.toFixed(3)}px)`;
    state.tilt.style.transform = `rotateX(${state.rx.toFixed(3)}deg) rotateY(${state.ry.toFixed(3)}deg) rotateZ(${state.rz.toFixed(3)}deg)`;
    state.orbit.style.zIndex = state.hover || state.focused ? '20' : String(2 + Math.round((z + 48) / 12));
  };
  const tick = now => {
    frame = 0;
    if (!isRunning()) {lastTime = null; return;}
    const dt = lastTime === null ? 0 : Math.min((now - lastTime) / 1000, .05);
    lastTime = now;
    states.forEach(state => {
      if (!state.hover && !state.focused) {
        const candidate = state.phase + dt * .036;
        // Um cartão parado não pode ser alcançado pelos demais. Distância angular
        // calculada sem leituras de layout; os vizinhos aguardam suavemente.
        const crowded = states.some(other => other !== state && ((other.phase - candidate) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) < .96);
        if (!crowded) state.phase = candidate; // aproximadamente três minutos por volta
        draw(state);
      }
    });
    frame = requestAnimationFrame(tick);
  };
  const sync = () => {
    pause.setAttribute('aria-pressed', String(userPaused));
    pause.textContent = userPaused ? 'Retomar movimento' : 'Pausar movimento';
    pause.setAttribute('aria-label', userPaused ? 'Retomar órbitas das avaliações' : 'Pausar órbitas das avaliações');
    if (isRunning()) {if (!frame) frame = requestAnimationFrame(tick);}
    else stop();
  };
  const held = state => {
    state.orbit.classList.toggle('is-held', state.hover || state.focused);
    if (mode === 'orbit') state.orbit.style.zIndex = state.hover || state.focused ? '20' : String(2 + Math.round((Math.sin(state.phase + .7) * 48 + 48) / 12));
    sync();
  };
  const layout = () => {
    const geometryChanged = sceneWidth !== scene.clientWidth || viewportHeight !== innerHeight;
    sceneWidth = scene.clientWidth;
    viewportHeight = innerHeight;
    const selectedMode = motion.matches ? 'static' : wide.matches && sceneWidth >= 1080 ? 'orbit' : 'manual';
    const modeChanged = mode !== selectedMode;
    if (mode !== selectedMode) {
      stop(); mode = selectedMode; section.dataset.reviewsMode = mode;
      track.setAttribute('aria-label', mode === 'orbit' ? 'Seis relatos; Tab para selecionar e Enter para ler' : mode === 'static' ? 'Trechos de avaliações; Tab para selecionar e Enter para ler' : 'Avaliações; use as setas ou deslize para navegar');
      section.querySelector('.review-carousel').setAttribute('aria-roledescription', mode === 'manual' ? 'carrossel manual' : 'seleção de avaliações');
      states.forEach(state => {
        state.orbit.style.removeProperty('transform'); state.orbit.style.removeProperty('z-index'); state.tilt.style.removeProperty('transform');
        if (mode !== 'manual') state.card.classList.add('visible');
      });
    }
    radiusX = Math.min(480, sceneWidth * .34);
    if (mode === 'orbit') states.forEach(draw);
    if (modeChanged) {
      // Limpar os planos ANTES de posicionar o scroll evita o snap na antiga órbita.
      reposition(() => {
        track.scrollTo({left:active && mode === 'manual' ? active.state.orbit.offsetLeft - states[0].orbit.offsetLeft : 0,behavior:'auto'});
        if (active && mode !== 'orbit') active.state.card.scrollIntoView({behavior:'auto',block:'center',inline:'nearest'});
      });
    }
    if (active && (geometryChanged || modeChanged)) {
      if (closing) closeFlight();
      else {transition?.cancel(); transition = null;}
    }
    sync();
  };
  const go = direction => {
    if (mode !== 'manual') return;
    const offsets = states.map(s => s.orbit.offsetLeft - states[0].orbit.offsetLeft);
    let index = offsets.reduce((best, value, i) => Math.abs(value - track.scrollLeft) < Math.abs(offsets[best] - track.scrollLeft) ? i : best, 0) + direction;
    if (direction > 0 && track.scrollLeft >= track.scrollWidth - track.clientWidth - 8) index = 0;
    if (index < 0) index = cards.length - 1;
    index = Math.min(index, cards.length - 1);
    track.scrollTo({left:offsets[index], behavior:motion.matches ? 'auto' : 'smooth'});
    status.textContent = `Relato de ${cards[index].querySelector('cite').textContent}`;
  };
  const flightTransform = () => {
    const from = active.state.card.getBoundingClientRect();
    // O painel mantém a geometria de destino, mesmo durante uma transição.
    const to = panel.getBoundingClientRect();
    const dx = from.x + from.width / 2 - (to.x + to.width / 2);
    const dy = from.y + from.height / 2 - (to.y + to.height / 2);
    const {rx, ry, rz} = active.pose;
    return `translate3d(${dx}px,${dy}px,0) scale(${from.width / to.width},${from.height / to.height}) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)`;
  };
  const completeClose = () => {
    if (!active) return;
    const saved = active;
    transition?.cancel(); transition = null;
    saved.state.phase = saved.phase;
    if (mode === 'orbit') draw(saved.state);
    saved.state.focus.style.removeProperty('opacity');
    dialog.close();
    reading.replaceChildren();
    active = null; closing = false;
    if (!document.querySelector('dialog[open]')) document.body.classList.remove('modal-open');
    saved.returnFocus.focus({preventScroll:true});
    const bounds = saved.returnFocus.getBoundingClientRect();
    if (bounds.top < 0 || bounds.bottom > innerHeight || bounds.left < 0 || bounds.right > innerWidth) reposition(() => saved.returnFocus.scrollIntoView({behavior:'auto',block:'nearest',inline:'nearest'}));
    sync();
  };
  const closeFlight = () => {
    const current = getComputedStyle(reading).transform;
    transition?.cancel();
    const destination = flightTransform();
    const animation = reading.animate([{transform:current === 'none' ? 'none' : current,opacity:1},{transform:destination,opacity:.85}], {duration:420,easing:'cubic-bezier(.3,0,.2,1)',fill:'both'});
    transition = animation;
    animation.finished.then(() => {if (transition === animation) completeClose();}).catch(() => {});
  };
  const close = () => {
    if (!active || closing) return;
    closing = true;
    if (motion.matches) {completeClose(); return;}
    closeFlight();
  };
  const open = (state, returnFocus) => {
    if (active) return;
    active = {state, phase:state.phase, pose:{rx:state.rx,ry:state.ry,rz:state.rz}, returnFocus};
    stop();
    const copy = state.card.cloneNode(true);
    copy.classList.remove('reveal', 'reveal-immediate');
    copy.removeAttribute('tabindex'); copy.removeAttribute('aria-describedby'); copy.removeAttribute('aria-label');
    copy.querySelector('.review-read').remove();
    const heading = document.createElement('h3'); heading.id = 'review-dialog-title';
    heading.textContent = `Relato de ${copy.querySelector('cite').textContent}`;
    copy.querySelector('.review-card-top').after(heading);
    const note = document.createElement('p'); note.id = 'review-dialog-note'; note.className = 'review-dialog-note';
    note.textContent = 'Trecho de avaliação pública. Este é o texto disponível nesta seleção; leia o relato completo na fonte original, no Google.';
    copy.append(note);
    const closeButton = document.createElement('button'); closeButton.className = 'review-dialog-close'; closeButton.type = 'button'; closeButton.textContent = '×'; closeButton.setAttribute('aria-label', 'Fechar leitura da avaliação');
    copy.prepend(closeButton);
    reading.replaceChildren(copy);
    document.body.classList.add('modal-open');
    dialog.showModal();
    panel.focus({preventScroll:true});
    const from = flightTransform();
    state.focus.style.opacity = '0';
    if (!motion.matches) {
      transition = reading.animate([{transform:from,opacity:.85},{transform:'none',opacity:1}],{duration:500,easing:'cubic-bezier(.2,.7,.2,1)'});
      transition.finished.then(() => {transition = null;}).catch(() => {});
    }
  };
  section.classList.add('reviews-enhanced');
  states.forEach(state => {
    state.card.addEventListener('pointerenter', event => {if (event.pointerType !== 'touch') {state.hover = true; held(state);}});
    state.card.addEventListener('pointerleave', () => {state.hover = false; held(state);});
    state.card.addEventListener('focusin', () => {state.focused = true; held(state);});
    state.card.addEventListener('focusout', event => {state.focused = state.card.contains(event.relatedTarget); held(state);});
    state.card.addEventListener('click', event => {
      if (event.target.closest('a')) return;
      // Toque/arraste continuam nativos; o navegador não dispara click após um swipe.
      open(state, event.target.closest('button') || state.card);
    });
    state.card.addEventListener('keydown', event => {
      if (event.target !== state.card || !['Enter',' '].includes(event.key)) return;
      event.preventDefault(); open(state, state.card);
    });
  });
  pause.addEventListener('click', () => {userPaused = !userPaused; sync();});
  previous.addEventListener('click', () => go(-1)); next.addEventListener('click', () => go(1));
  track.addEventListener('keydown', event => {if (mode === 'manual' && ['ArrowLeft','ArrowRight'].includes(event.key)) {event.preventDefault(); go(event.key === 'ArrowRight' ? 1 : -1);}});
  dialog.addEventListener('cancel', event => {event.preventDefault(); close();});
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const controls = [...dialog.querySelectorAll('button,a[href]')];
    const first = controls[0], last = controls[controls.length - 1];
    if (event.shiftKey && (document.activeElement === first || document.activeElement === panel)) {event.preventDefault(); last.focus();}
    else if (!event.shiftKey && document.activeElement === last) {event.preventDefault(); first.focus();}
  });
  dialog.addEventListener('click', event => {if (event.target === dialog || event.target.closest('.review-dialog-close')) close();});
  // Sem autoplay alternativo: swipe, setas e teclado são os únicos movimentos no celular.
  document.addEventListener('visibilitychange', sync);
  motion.addEventListener('change', () => {
    if (motion.matches) {transition?.cancel(); transition = null; if (closing) completeClose();}
    layout();
  });
  wide.addEventListener('change', layout);
  addEventListener('resize', layout, {passive:true});
  if ('ResizeObserver' in window) new ResizeObserver(layout).observe(scene);
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => {inView = entries[0].isIntersecting; sync();},{threshold:0}).observe(scene);
  layout();
})();
