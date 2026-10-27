(() => {
    'use strict';

    const $ = s => document.querySelector(s);

    /* ===== Datos iniciales ===== */
    const INITIAL_CARDS = [
        { id: 'K-101', title: 'Definir Arquitectura', desc: 'Diseñar la estructura base del sistema.' },
        { id: 'K-102', title: 'Crear Mockups UI', desc: 'Diseñar la interfaz de usuario en Figma.' },
        { id: 'K-103', title: 'Configurar DB', desc: 'Montar el servidor de base de datos.' },
        { id: 'K-104', title: 'API Auth', desc: 'Implementar el sistema de login y tokens.' },
        { id: 'K-105', title: 'Frontend Base', desc: 'Configurar el proyecto de React/Vue.' },
        { id: 'K-106', title: 'Pruebas Unitarias', desc: 'Escribir tests para la lógica de negocio.' },
    ];

    const COLS = ['todo', 'progress', 'done'];
    const COL_NAMES = { todo: 'Por Hacer', progress: 'En Proceso', done: 'Hecho' };
    const STORAGE_KEY = 'kanban_state';
    const WIP_KEY = 'kanban_wip';
    const DEFAULT_WIP = 3;

    /* ===== Estado ===== */
    let state = { todo: [], progress: [], done: [] };

    /* ===== Límite WIP (solo aplica a "En Proceso") ===== */
    const wipInput = () => $('#wip-input');

    const getWip = () => {
        const n = parseInt(wipInput().value, 10);
        if (!Number.isFinite(n)) return DEFAULT_WIP;
        return Math.min(6, Math.max(1, n));
    };

    const getLimit = colId => (colId === 'progress' ? getWip() : Infinity);

    /* ===== Mensajes de estado ===== */
    const setStatus = (msg, type = 'info') => {
        const el = $('#board-status');
        if (!el) return;
        el.dataset.type = type;
        el.textContent = msg;
    };

    const updateGuide = () => {
        const guide = $('#wip-guide');
        if (!guide) return;
        const used = state.progress.length;
        const limit = getWip();
        if (used > limit) {
            guide.textContent = `Hay ${used} tareas en proceso y el límite es ${limit}: terminá alguna antes de empezar otra.`;
        } else if (used === limit) {
            guide.textContent = `«En Proceso» está lleno (${used}/${limit}). Hay que terminar una tarea para empezar otra.`;
        } else {
            guide.textContent = `Podés empezar ${limit - used} tarea(s) más en «En Proceso».`;
        }
    };

    /* ===== Persistencia ===== */
    const isValidState = s =>
        s && COLS.every(c => Array.isArray(s[c])) &&
        COLS.flatMap(c => s[c]).every(id => INITIAL_CARDS.some(card => card.id === id));

    const resetState = () => ({
        todo: INITIAL_CARDS.map(c => c.id),
        progress: [],
        done: [],
    });

    const saveState = () => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
            localStorage.setItem(WIP_KEY, String(getWip()));
        } catch (_) { /* localStorage no disponible: se sigue sin persistir */ }
    };

    const loadState = () => {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
            if (isValidState(saved)) {
                state = saved;
            } else {
                state = resetState();
            }
            const wip = parseInt(localStorage.getItem(WIP_KEY), 10);
            if (Number.isFinite(wip)) wipInput().value = Math.min(6, Math.max(1, wip));
        } catch (_) {
            state = resetState();
        }
    };

    /* ===== Movimiento de tarjetas ===== */
    const findColumn = cardId => COLS.find(c => state[c].includes(cardId)) || null;

    const moveCard = (cardId, targetColId) => {
        const origin = findColumn(cardId);
        if (!origin || !COLS.includes(targetColId) || origin === targetColId) return false;

        const limit = getLimit(targetColId);
        if (state[targetColId].length >= limit) {
            const colEl = $(`#col-${targetColId}`);
            colEl.classList.add('wip-blocked');
            setTimeout(() => colEl.classList.remove('wip-blocked'), 500);
            setStatus(
                `Límite WIP alcanzado en «${COL_NAMES[targetColId]}» (${limit}). Terminá una tarea antes de empezar otra.`,
                'warn'
            );
            return false;
        }

        state[origin] = state[origin].filter(id => id !== cardId);
        state[targetColId].push(cardId);
        saveState();
        renderBoard();
        setStatus(`«${INITIAL_CARDS.find(c => c.id === cardId).title}» pasó a ${COL_NAMES[targetColId]}.`, 'ok');
        return true;
    };

    const moveByDirection = (cardId, dir) => {
        const origin = findColumn(cardId);
        const target = COLS[COLS.indexOf(origin) + dir];
        if (!target) return false;
        const moved = moveCard(cardId, target);
        if (moved) {
            const el = document.getElementById(cardId);
            if (el) el.focus();
        }
        return moved;
    };

    /* ===== Render ===== */
    const createCard = (cardData, colId) => {
        const el = document.createElement('div');
        el.className = 'kanban-card';
        el.id = cardData.id;
        el.draggable = true;
        el.tabIndex = 0;
        el.setAttribute('aria-label', `${cardData.title}, en ${COL_NAMES[colId]}`);

        const idx = COLS.indexOf(colId);
        const prev = idx > 0 ? COLS[idx - 1] : null;
        const next = idx < COLS.length - 1 ? COLS[idx + 1] : null;

        el.innerHTML = `
            <span class="card-id">${cardData.id}</span>
            <span class="card-title">${cardData.title}</span>
            <p class="card-desc">${cardData.desc}</p>
            <div class="card-actions">
                ${prev ? `<button type="button" class="btn btn-sm btn-outline-secondary" data-dir="-1"
                    aria-label="Mover a ${COL_NAMES[prev]}"><i class="bi bi-arrow-left" aria-hidden="true"></i></button>` : ''}
                ${next ? `<button type="button" class="btn btn-sm btn-outline-primary" data-dir="1"
                    aria-label="Mover a ${COL_NAMES[next]}"><i class="bi bi-arrow-right" aria-hidden="true"></i></button>` : ''}
            </div>
        `;

        // Drag and drop
        el.addEventListener('dragstart', e => {
            e.dataTransfer.setData('text/plain', cardData.id);
            e.dataTransfer.effectAllowed = 'move';
            el.style.opacity = '0.5';
        });
        el.addEventListener('dragend', () => { el.style.opacity = '1'; });

        // Botones
        el.querySelectorAll('button[data-dir]').forEach(btn => {
            btn.addEventListener('click', () => moveByDirection(cardData.id, parseInt(btn.dataset.dir, 10)));
        });

        // Teclado (flechas)
        el.addEventListener('keydown', e => {
            if (e.target !== el) return;
            if (e.key === 'ArrowRight') { e.preventDefault(); moveByDirection(cardData.id, 1); }
            if (e.key === 'ArrowLeft') { e.preventDefault(); moveByDirection(cardData.id, -1); }
        });

        return el;
    };

    const renderColumn = colId => {
        const list = $(`#list-${colId}`);
        const count = $(`#count-${colId}`);
        const cards = state[colId];
        const limit = getLimit(colId);

        list.innerHTML = '';
        cards.forEach(cardId => {
            const cardData = INITIAL_CARDS.find(c => c.id === cardId);
            if (cardData) list.appendChild(createCard(cardData, colId));
        });

        const hasLimit = Number.isFinite(limit);
        count.textContent = hasLimit ? `${cards.length} / ${limit}` : String(cards.length);
        count.classList.toggle('over', hasLimit && cards.length >= limit);
        count.setAttribute(
            'aria-label',
            hasLimit
                ? `${cards.length} tarjetas en ${COL_NAMES[colId]} de un límite de ${limit}`
                : `${cards.length} tarjetas en ${COL_NAMES[colId]}`
        );
    };

    const renderBoard = () => {
        COLS.forEach(renderColumn);
        const label = $('#wip-label');
        if (label) label.textContent = getWip();
        updateGuide();
    };

    /* ===== Drag and drop en columnas ===== */
    const initDragAndDrop = () => {
        COLS.forEach(colId => {
            const col = $(`#col-${colId}`);

            col.addEventListener('dragover', e => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                col.classList.add('drag-over');
            });

            col.addEventListener('dragleave', e => {
                if (!col.contains(e.relatedTarget)) col.classList.remove('drag-over');
            });

            col.addEventListener('drop', e => {
                e.preventDefault();
                col.classList.remove('drag-over');
                const cardId = e.dataTransfer.getData('text/plain');
                moveCard(cardId, colId);
            });
        });
    };

    /* ===== Controles ===== */
    const initControls = () => {
        wipInput().addEventListener('input', () => {
            renderBoard();
            saveState();
            const used = state.progress.length;
            const limit = getWip();
            if (used > limit) {
                setStatus(`El nuevo límite (${limit}) es menor que las tareas en proceso (${used}). Terminá alguna.`, 'warn');
            } else {
                setStatus(`Límite WIP actualizado a ${limit}.`, 'info');
            }
        });

        $('#btn-reset').addEventListener('click', () => {
            if (!confirm('¿Estás seguro de que querés reiniciar el tablero?')) return;
            state = resetState();
            wipInput().value = DEFAULT_WIP;
            saveState();
            renderBoard();
            setStatus('Tablero reiniciado.', 'info');
        });
    };

    /* ===== Inicio ===== */
    const init = () => {
        loadState();
        initDragAndDrop();
        initControls();
        renderBoard();
        setStatus('Tablero listo.', 'info');
    };

    // El script se carga con "defer", pero por las dudas:
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();