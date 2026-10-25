(() => {
    const $ = s => document.querySelector(s);

    /* ===== US-10: Sprint Timeline Logic ===== */
    const initTimeline = () => {
        const container = $('.sprint-container');
        if (!container) return;

        const select = $('#sprint-duration');
        const timeline = $('#sprint-timeline');

        const events = [
            { id: 'planning', label: 'Planning', pos: 0.05, goal: 'Definir el objetivo del Sprint y el Backlog.', duration: 'Max 8h (para Sprint de 1 mes)' },
            { id: 'daily', label: 'Daily', pos: 0.5, goal: 'Sincronizar actividades y ajustar el plan diario.', duration: '15 min' },
            { id: 'review', label: 'Review', pos: 0.9, goal: 'Inspeccionar el incremento y adaptar el Backlog.', duration: 'Max 4h (para Sprint de 1 mes)' },
            { id: 'retro', label: 'Retro', pos: 0.98, goal: 'Planificar mejoras en calidad y efectividad.', duration: 'Max 3h (para Sprint de 1 mes)' },
        ];

        const renderTimeline = () => {
            const duration = select ? select.value : 1;
            timeline.innerHTML = '<div class="sprint-track"></div>';

            events.forEach(ev => {
                const node = document.createElement('div');
                node.className = 'sprint-event';
                node.dataset.label = ev.label;
                node.style.left = `${ev.pos * 100}%`;

                node.onclick = () => {
                    const modal = new bootstrap.Modal(document.getElementById('sprint-event-modal'));
                    $('#sprint-event-title').innerText = ev.label;
                    $('#sprint-event-goal').innerText = ev.goal;
                    $('#sprint-event-duration').innerText = ev.duration;
                    modal.show();
                };

                timeline.appendChild(node);
            });
        };

        if (select) select.onchange = renderTimeline;
        renderTimeline();
    };

    /* ===== US-11: Kanban Board Logic ===== */
    const initKanban = () => {
        const board = $('.kanban-board');
        if (!board) return;

        const columns = document.querySelectorAll('.kanban-col');

        columns.forEach(col => {
            col.ondragover = e => {
                e.preventDefault();
                col.classList.add('drag-over');
            };

            col.ondragleave = () => col.classList.remove('drag-over');

            col.ondrop = e => {
                e.preventDefault();
                col.classList.remove('drag-over');

                const cardId = e.dataTransfer.getData('text/plain');
                const card = document.getElementById(cardId);

                // WIP Limit Check
                const limit = parseInt(col.dataset.wipLimit || '999');
                const currentCards = col.querySelectorAll('.kanban-card').length;

                if (currentCards >= limit) {
                    col.classList.add('wip-blocked');
                    setTimeout(() => col.classList.remove('wip-blocked'), 500);
                    alert(`Límite WIP alcanzado (${limit}). No se pueden añadir más tarjetas a "${col.querySelector('h6').innerText.split(' ')[0]}".`);
                    return;
                }

                col.appendChild(card);
                updateWipBadge(col);
            };
        });

        document.querySelectorAll('.kanban-card').forEach(card => {
            card.draggable = true;
            card.ondragstart = e => {
                e.dataTransfer.setData('text/plain', card.id);
                card.classList.add('dragging');
            };
            card.ondragend = () => card.classList.remove('dragging');
        });
    };

    const updateWipBadge = (col) => {
        const badge = col.querySelector('.wip-badge');
        if (badge) {
            const limit = col.dataset.wipLimit || '∞';
            const current = col.querySelectorAll('.kanban-card').length;
            badge.innerText = `${current} / ${limit}`;
        }
    };

    // Initialize all when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        initTimeline();
        initKanban();
    });
})();
