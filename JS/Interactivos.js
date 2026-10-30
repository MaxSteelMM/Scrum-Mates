(() => {
    const $ = s => document.querySelector(s);

    /* ===== US-10: Sprint Timeline ===== */
    const initTimeline = () => {
        const container = $('.sprint-container');
        const timeline = $('#sprint-timeline');
        if (!container || !timeline) return;

        const select = $('#sprint-duration');
        const modalEl = document.getElementById('sprint-event-modal');
        const modal = modalEl && window.bootstrap ? bootstrap.Modal.getOrCreateInstance(modalEl) : null;

        const events = [
            { label: 'Planning', pos: 0.05, goal: 'Definir el objetivo del Sprint y el Backlog.', duration: 'Máx. 8 h (para un Sprint de 1 mes)' },
            { label: 'Daily', pos: 0.5, goal: 'Sincronizar actividades y ajustar el plan diario.', duration: '15 min' },
            { label: 'Review', pos: 0.88, goal: 'Inspeccionar el incremento y adaptar el Backlog.', duration: 'Máx. 4 h (para un Sprint de 1 mes)' },
            { label: 'Retro', pos: 0.96, goal: 'Planificar mejoras en calidad y efectividad.', duration: 'Máx. 3 h (para un Sprint de 1 mes)' },
        ];

        const render = () => {
            timeline.innerHTML = '<div class="sprint-track"></div>';
            events.forEach((ev, i) => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'sprint-event' +
                    (i % 2 ? ' is-up' : '') +
                    (i === 0 ? ' is-start' : '') +
                    (i === events.length - 1 ? ' is-end' : '');
                btn.style.left = `${ev.pos * 100}%`;
                btn.setAttribute('aria-label', `${ev.label}: ver detalle`);
                btn.innerHTML = `<span class="event-dot"></span><span class="event-label">${ev.label}</span>`;
                btn.addEventListener('click', () => {
                    const set = (sel, txt) => { const el = $(sel); if (el) el.textContent = txt; };
                    set('#sprint-event-title', ev.label);
                    set('#sprint-event-goal', ev.goal);
                    set('#sprint-event-duration', ev.duration);
                    if (modal) modal.show();
                });
                timeline.appendChild(btn);
            });
        };

        if (select) select.addEventListener('change', render);
        render();
    };

    /* ===== US-11: Kanban simple =====
       Se desactiva si la página ya usa el tablero completo (Kanban.js). */
    const updateWipBadge = col => {
        const badge = col.querySelector('.wip-badge');
        if (!badge) return;
        const limit = col.dataset.wipLimit || '∞';
        badge.textContent = `${col.querySelectorAll('.kanban-card').length} / ${limit}`;
    };

    const initKanban = () => {
        const board = $('.kanban-board');
        if (!board || document.getElementById('main-board')) return;

        board.querySelectorAll('.kanban-col').forEach(col => {
            col.addEventListener('dragover', e => { e.preventDefault(); col.classList.add('drag-over'); });
            col.addEventListener('dragleave', () => col.classList.remove('drag-over'));
            col.addEventListener('drop', e => {
                e.preventDefault();
                col.classList.remove('drag-over');

                const card = document.getElementById(e.dataTransfer.getData('text/plain'));
                if (!card) return;

                const limit = parseInt(col.dataset.wipLimit || '999', 10);
                const current = col.querySelectorAll('.kanban-card').length;
                const alreadyHere = card.parentElement === col;

                if (!alreadyHere && current >= limit) {
                    col.classList.add('wip-blocked');
                    setTimeout(() => col.classList.remove('wip-blocked'), 500);
                    const head = col.querySelector('h6, h3');
                    const name = head ? head.childNodes[0].textContent.trim() : 'esta columna';
                    alert(`Límite WIP alcanzado (${limit}). No se pueden añadir más tarjetas a «${name}».`);
                    return;
                }

                const prevCol = card.closest('.kanban-col');
                col.appendChild(card);
                updateWipBadge(col);
                if (prevCol && prevCol !== col) updateWipBadge(prevCol);
            });
        });

        board.querySelectorAll('.kanban-card').forEach(card => {
            card.draggable = true;
            card.addEventListener('dragstart', e => {
                e.dataTransfer.setData('text/plain', card.id);
                card.classList.add('dragging');
            });
            card.addEventListener('dragend', () => card.classList.remove('dragging'));
        });
    };

    document.addEventListener('DOMContentLoaded', () => {
        initTimeline();
        initKanban();
    });
})();
