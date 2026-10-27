(() => {
    'use strict';

    const $ = s => document.querySelector(s);

    /* ===== Datos Iniciales ===== */
    const INITIAL_CARDS = [
        { id: 'K-101', title: 'Definir Arquitectura', desc: 'Diseñar la estructura base del sistema.' },
        { id: 'K-102', title: 'Crear Mockups UI', desc: 'Diseñar la interfaz de usuario en Figma.' },
        { id: 'K-103', title: 'Configurar DB', desc: 'Montar el servidor de base de datos.' },
        { id: 'K-104', title: 'API Auth', desc: 'Implementar el sistema de login y tokens.' },
        { id: 'K-105', title: 'Frontend Base', desc: 'Configurar el proyecto de React/Vue.' },
        { id: 'K-106', title: 'Pruebas Unitarias', desc: 'Escribir tests para la lógica de negocio.' },
    ];

    /* ===== Estado del Tablero ===== */
    let state = {
        todo: [],
        progress: [],
        done: []
    };

    /* ===== Lógica Principal ===== */
    const initBoard = () => {
        // Cargar desde LocalStorage o usar iniciales
        const saved = localStorage.getItem('kanban_state');
        if (saved) {
            state = JSON.parse(saved);
        } else {
            state.todo = INITIAL_CARDS.map(c => c.id);
        }
        renderBoard();
    };

    const saveState = () => {
        localStorage.setItem('kanban_state', JSON.stringify(state));
    };

    const renderBoard = () => {
        renderColumn('todo', 'list-todo', 'count-todo');
        renderColumn('progress', 'list-progress', 'count-progress');
        renderColumn('done', 'list-done', 'count-done');
    };

    const renderColumn = (colId, listId, countId) => {
        const list = $(`#${listId}`);
        const count = $(`#${countId}`);
        const limit = $(`#col-${colId}`).dataset.wip;

        list.innerHTML = '';
        const cards = state[colId];

        cards.forEach(cardId => {
            const cardData = INITIAL_CARDS.find(c => c.id === cardId);
            if (!cardData) return;

            const cardEl = document.createElement('div');
            cardEl.className = 'kanban-card';
            cardEl.id = cardId;
            cardEl.draggable = true;
            cardEl.innerHTML = `
                <span class="card-id">${cardData.id}</span>
                <span class="card-title">${cardData.title}</span>
                <p class="card-desc">${cardData.desc}</p>
            `;

            cardEl.ondragstart = e => {
                e.dataTransfer.setData('text/plain', cardId);
                cardEl.style.opacity = '0.5';
            };
            cardEl.ondragend = () => cardEl.style.opacity = '1';

            list.appendChild(cardEl);
        });

        // Actualizar contador
        if (limit === '999') {
            count.innerText = cards.length;
        } else {
            count.innerText = `${cards.length} / ${limit}`;
        }
    };

    /* ===== Eventos de Drag and Drop ===== */
    const initDragAndDrop = () => {
        const cols = document.querySelectorAll('.kanban-col');
        const wipModal = new bootstrap.Modal($('#wip-modal'));

        cols.forEach(col => {
            col.ondragover = e => {
                e.preventDefault();
                col.classList.add('drag-over');
            };

            col.ondragleave = () => col.classList.remove('drag-over');

            col.ondrop = e => {
                e.preventDefault();
                col.classList.remove('drag-over');

                const cardId = e.dataTransfer.getData('text/plain');
                const targetColId = col.id.replace('col-', '');

                // Encontrar columna origen
                let originColId = '';
                if (state.todo.includes(cardId)) originColId = 'todo';
                else if (state.progress.includes(cardId)) originColId = 'progress';
                else if (state.done.includes(cardId)) originColId = 'done';

                if (!originColId || originColId === targetColId) return;

                // Verificar Límite WIP
                const limit = parseInt(col.dataset.wip);
                const currentCount = state[targetColId].length;

                if (currentCount >= limit) {
                    col.classList.add('wip-blocked');
                    setTimeout(() => col.classList.remove('wip-blocked'), 500);
                    wipModal.show();
                    return;
                }

                // Mover la tarjeta
                state[originColId] = state[originColId].filter(id => id !== cardId);
                state[targetColId].push(cardId);

                saveState();
                renderBoard();
            };
        });
    };

    /* ===== Otros Controles ===== */
    const initControls = () => {
        $('#btn-reset').onclick = () => {
            if (confirm('¿Estás seguro de que querés reiniciar el tablero?')) {
                state = {
                    todo: INITIAL_CARDS.map(c => c.id),
                    progress: [],
                    done: []
                };
                saveState();
                renderBoard();
            }
        };
    };

    document.addEventListener('DOMContentLoaded', () => {
        initBoard();
        initDragAndDrop();
        initControls();
    });
})();
