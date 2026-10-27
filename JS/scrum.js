(() => {
    const $ = s => document.querySelector(s);

    /* ===== Configuración de Datos ===== */
    const eventsData = {
        'planning': {
            label: 'Sprint Planning',
            goal: 'Definir el Objetivo del Sprint y seleccionar los elementos del Product Backlog.',
            participants: 'Product Owner, Scrum Master, Developers',
            duration: 'Máximo 8 horas para un Sprint de un mes.'
        },
        'daily': {
            label: 'Daily Scrum',
            goal: 'Inspeccionar el progreso hacia el Objetivo del Sprint y adaptar el plan para el día.',
            participants: 'Developers',
            duration: '15 minutos.'
        },
        'review': {
            label: 'Sprint Review',
            goal: 'Inspeccionar el resultado del Sprint y adaptar el Product Backlog.',
            participants: 'Equipo Scrum e Interesados (Stakeholders)',
            duration: 'Máximo 4 horas para un Sprint de un mes.'
        },
        'retro': {
            label: 'Sprint Retrospective',
            goal: 'Planificar mejoras en la calidad y efectividad del equipo.',
            participants: 'Equipo Scrum',
            duration: 'Máximo 3 horas para un Sprint de un mes.'
        }
    };

    /* ===== Lógica de Roles Interactivos ===== */
    const initRoles = () => {
        document.querySelectorAll('.role-card').forEach(card => {
            card.onclick = () => {
                const isActive = card.classList.contains('active');
                document.querySelectorAll('.role-card').forEach(c => c.classList.remove('active'));
                if (!isActive) card.classList.add('active');
            };
        });
    };

    /* ===== Lógica del Cronograma Interactivo ===== */
    const initTimeline = () => {
        const timeline = $('#scrum-timeline');
        const modal = new bootstrap.Modal(document.getElementById('event-detail-modal'));

        const render = (weeks) => {
            timeline.innerHTML = '<div class="sprint-track"></div>';

            // Posiciones relativas (0 a 1)
            const positions = {
                'planning': 0.05,
                'daily': 0.5,
                'review': 0.9,
                'retro': 0.98
            };

            Object.entries(positions).forEach(([id, pos]) => {
                const event = eventsData[id];
                const dot = document.createElement('div');
                dot.className = 'sprint-event';
                dot.dataset.label = event.label;
                dot.style.left = `calc(${pos * 100}% + 40px)`; // Ajuste por padding del contenedor

                // Ajuste para que el 100% no se salga del borde derecho
                const rightOffset = 40;
                const availableWidth = timeline.offsetWidth - (rightOffset * 2);
                dot.style.left = `${40 + (pos * availableWidth)}px`;

                dot.onclick = () => {
                    $('#event-title').innerText = event.label;
                    $('#event-goal').innerText = event.goal;
                    $('#event-participants').innerText = event.participants;
                    $('#event-duration').innerText = event.duration;
                    modal.show();
                };
                timeline.appendChild(dot);
            });
        };

        document.querySelectorAll('.dur-btn').forEach(btn => {
            btn.onclick = () => {
                document.querySelectorAll('.dur-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // En un cronograma simplificado, la posición relativa se mantiene,
                // pero podríamos cambiar colores o añadir marcas de días según semanas.
                render(parseInt(btn.dataset.weeks));
            };
        });

        // Render inicial
        window.addEventListener('load', () => render(1));
        // Re-render al cambiar tamaño de ventana para recalcular posiciones px
        window.addEventListener('resize', () => render(1));
    };

    document.addEventListener('DOMContentLoaded', () => {
        initRoles();
        initTimeline();
    });
})();
