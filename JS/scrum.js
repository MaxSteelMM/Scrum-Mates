(() => {
    const $ = s => document.querySelector(s);

    /* ===== Datos de los eventos =====
       Las duraciones máximas de la Guía de Scrum son para un Sprint de 1 mes (4 semanas):
       Planning 8 h, Review 4 h, Retro 3 h. Se escalan según la duración elegida. */
    const EVENTS = [
        { id: 'planning', short: 'Planning', label: 'Sprint Planning', pos: 0.05, perWeek: 2,
          goal: 'Definir el Objetivo del Sprint y seleccionar los elementos del Product Backlog.',
          participants: 'Product Owner, Scrum Master, Developers' },
        { id: 'daily', short: 'Daily', label: 'Daily Scrum', pos: 0.5, fixed: '15 minutos.',
          goal: 'Inspeccionar el progreso hacia el Objetivo del Sprint y adaptar el plan para el día.',
          participants: 'Developers' },
        { id: 'review', short: 'Review', label: 'Sprint Review', pos: 0.88, perWeek: 1,
          goal: 'Inspeccionar el resultado del Sprint y adaptar el Product Backlog.',
          participants: 'Equipo Scrum e Interesados (Stakeholders)' },
        { id: 'retro', short: 'Retro', label: 'Sprint Retrospective', pos: 0.96, perWeek: 0.75,
          goal: 'Planificar mejoras en la calidad y efectividad del equipo.',
          participants: 'Equipo Scrum' }
    ];

    const hoursText = h => (h < 1 ? `${Math.round(h * 60)} minutos` : `${h} hora${h === 1 ? '' : 's'}`);
    const durationText = (ev, weeks) =>
        ev.fixed || `Máximo ${hoursText(ev.perWeek * weeks)} para un Sprint de ${weeks} semana${weeks === 1 ? '' : 's'}.`;

    /* ===== Roles interactivos (accesibles con teclado) ===== */
    const initRoles = () => {
        const cards = document.querySelectorAll('.role-card');
        const toggle = card => {
            const wasActive = card.classList.contains('active');
            cards.forEach(c => { c.classList.remove('active'); c.setAttribute('aria-expanded', 'false'); });
            if (!wasActive) { card.classList.add('active'); card.setAttribute('aria-expanded', 'true'); }
        };
        cards.forEach(card => {
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-expanded', 'false');
            card.addEventListener('click', () => toggle(card));
            card.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(card); }
            });
        });
    };

    /* ===== Cronograma del Sprint ===== */
    const initTimeline = () => {
        const timeline = $('#scrum-timeline');
        if (!timeline) return;

        const modalEl = document.getElementById('event-detail-modal');
        const modal = modalEl && window.bootstrap ? bootstrap.Modal.getOrCreateInstance(modalEl) : null;
        const setText = (sel, txt) => { const el = $(sel); if (el) el.textContent = txt; };

        const openEvent = (ev, weeks) => {
            setText('#event-title', ev.label);
            setText('#event-goal', ev.goal);
            setText('#event-participants', ev.participants);
            setText('#event-duration', durationText(ev, weeks));
            if (modal) modal.show();
        };

        const render = weeks => {
            timeline.innerHTML = '<div class="sprint-track"></div>';
            EVENTS.forEach((ev, i) => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'sprint-event' +
                    (i % 2 ? ' is-up' : '') +
                    (i === 0 ? ' is-start' : '') +
                    (i === EVENTS.length - 1 ? ' is-end' : '');
                btn.style.left = `${ev.pos * 100}%`;
                btn.setAttribute('aria-label', `${ev.label}: ver detalle`);
                btn.innerHTML = `<span class="event-dot"></span><span class="event-label">${ev.short}</span>`;
                btn.addEventListener('click', () => openEvent(ev, weeks));
                timeline.appendChild(btn);
            });
            setText('#sprint-caption', `Sprint de ${weeks} semana${weeks === 1 ? '' : 's'}. Tocá un evento para ver el detalle.`);
        };

        const buttons = document.querySelectorAll('.dur-btn');
        buttons.forEach(btn => {
            btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'false');
            btn.addEventListener('click', () => {
                buttons.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
                render(parseInt(btn.dataset.weeks, 10) || 1);
            });
        });

        const active = document.querySelector('.dur-btn.active');
        render(active ? parseInt(active.dataset.weeks, 10) || 1 : 1);
    };

    document.addEventListener('DOMContentLoaded', () => {
        initRoles();
        initTimeline();
    });
})();
