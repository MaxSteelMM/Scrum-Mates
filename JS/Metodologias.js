(() => {
  'use strict';

  const $ = s => document.querySelector(s);

  /* ===== Modal de eventos del Sprint =====
     El texto vive en el HTML (data-goal / data-duration de cada botón). */
  const initSprintEvents = () => {
    const modalEl = $('#sprint-event-modal');
    const buttons = document.querySelectorAll('.sprint-event');
    if (!modalEl || !buttons.length || !window.bootstrap) return;

    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        $('#sprint-event-title').textContent = btn.textContent.trim();
        $('#sprint-event-goal').textContent = btn.dataset.goal || '';
        $('#sprint-event-duration').textContent = btn.dataset.duration || '';
        modal.show();
      });
    });
  };

  /* ===== Índice flotante ===== */
  const initToc = () => {
    const targets = [...document.querySelectorAll('[data-toc]')];
    if (!targets.length) return;

    const nav = document.createElement('nav');
    nav.className = 'toc';
    nav.setAttribute('aria-label', 'En esta página');
    nav.innerHTML = `
      <button class="toc__fab" type="button" aria-expanded="false" aria-label="Abrir índice de la página">
        <i class="bi bi-list-ul" aria-hidden="true"></i>
      </button>
      <div class="toc__panel">
        <p class="toc__title">EN ESTA PÁGINA</p>
        <div class="toc__bar" aria-hidden="true"><i></i></div>
        <ul></ul>
      </div>`;

    const list = nav.querySelector('ul');
    list.innerHTML = targets
      .filter(t => t.dataset.tocLevel !== '2')
      .map(t => `<li><a href="#${t.id}">${t.dataset.toc}</a></li>`)
      .join('');
    document.body.appendChild(nav);

    const links = [...list.querySelectorAll('a')];
    const fab = nav.querySelector('.toc__fab');
    const bar = nav.querySelector('.toc__bar i');

    const setActive = id =>
      links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + id));

    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.width = (max > 0 ? Math.min(100, scrollY / max * 100) : 0) + '%';

      let cur = targets[0];
      let prevTop = null;
      targets.forEach(t => {
        const top = t.getBoundingClientRect().top;
        const sameRow = prevTop !== null && Math.abs(top - prevTop) < 4;
        if (top <= innerHeight * 0.3 && !sameRow) cur = t;
        prevTop = top;
      });
      setActive(cur.id);
    };

    const close = () => {
      nav.classList.remove('is-open');
      fab.setAttribute('aria-expanded', 'false');
    };

    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    update();

    list.addEventListener('click', e => {
      const a = e.target.closest('a');
      if (!a) return;
      e.preventDefault();
      const dest = document.querySelector(a.getAttribute('href'));
      if (!dest) return;
      const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
      dest.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
      history.replaceState(null, '', a.getAttribute('href'));
      setActive(dest.id);
      close();
    });

    fab.addEventListener('click', () =>
      fab.setAttribute('aria-expanded', nav.classList.toggle('is-open')));
    addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    document.addEventListener('click', e => { if (!nav.contains(e.target)) close(); });
  };

  initSprintEvents();
  initToc();
})();