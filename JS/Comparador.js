(() => {
    const $ = s => document.querySelector(s);

    const LEVEL_LABELS = {
        flexibility: ['Muy baja', 'Baja', 'Media', 'Alta', 'Muy alta'],
        structure: ['Mínima', 'Baja', 'Media', 'Alta', 'Muy alta']
    };

    const comparativaData = {
        'Scrum': {
            tag: 'Marco ágil', sub: 'Marco ágil',
            focus: 'Entregar valor en Sprints',
            cadence: 'Sprints de 1 a 4 semanas',
            roles: 'Product Owner, Scrum Master y Developers',
            changes: 'Entre Sprints; el Sprint se protege',
            flexibility: 3, structure: 4,
            wip: false, techPractices: false,
            metric: 'Velocidad del equipo',
            ideal: 'Productos complejos con objetivos por etapas'
        },
        'Kanban': {
            tag: 'Método de flujo', sub: 'Método de flujo',
            focus: 'Optimizar el flujo continuo',
            cadence: 'Flujo continuo, sin iteraciones fijas',
            roles: 'Ninguno obligatorio',
            changes: 'En cualquier momento si hay capacidad',
            flexibility: 5, structure: 1,
            wip: true, techPractices: false,
            metric: 'Lead time y cycle time',
            ideal: 'Soporte, mantenimiento y flujos continuos'
        },
        'XP': {
            tag: 'Prácticas técnicas', sub: 'Prácticas técnicas',
            focus: 'Calidad técnica y feedback constante',
            cadence: 'Iteraciones de 1 a 2 semanas',
            roles: 'Cliente, Coach y Programadores',
            changes: 'Bienvenidos en cada iteración',
            flexibility: 4, structure: 3,
            wip: false, techPractices: true,
            metric: 'Pruebas aprobadas y feedback del cliente',
            ideal: 'Equipos pequeños con requisitos cambiantes'
        },
        'Cascada': {
            tag: 'Modelo secuencial', sub: 'Modelo secuencial',
            focus: 'Planificar todo al inicio y ejecutar por fases',
            cadence: 'Fases secuenciales, entrega única al final',
            roles: 'Project Manager, Analistas, Developers y QA',
            changes: 'Costosos; obligan a replanificar',
            flexibility: 1, structure: 5,
            wip: false, techPractices: false,
            metric: 'Cumplimiento de hitos y del plan',
            ideal: 'Proyectos con requisitos claros y estables'
        },
        'Incremental': {
            tag: 'Entrega por partes', sub: 'Entrega por partes',
            focus: 'Construir el producto en incrementos funcionales',
            cadence: 'Incrementos planificados (cada 1 a 3 meses)',
            roles: 'Project Manager, Analistas, Developers y QA',
            changes: 'Se incorporan en incrementos futuros',
            flexibility: 3, structure: 3,
            wip: false, techPractices: false,
            metric: 'Funcionalidades entregadas por incremento',
            ideal: 'Productos que pueden liberarse por módulos'
        },
        'V': {
            tag: 'Modelo en V', sub: 'Verificación y validación',
            focus: 'Verificar y validar cada fase de desarrollo',
            cadence: 'Fases secuenciales con pruebas asociadas',
            roles: 'Project Manager, Analistas, Developers y Testers',
            changes: 'Difíciles; impactan diseño y pruebas',
            flexibility: 2, structure: 5,
            wip: false, techPractices: false,
            metric: 'Cobertura de pruebas y defectos por fase',
            ideal: 'Sistemas críticos (salud, automotriz, aeroespacial)'
        }
    };

    const rows = [
        { label: 'Enfoque principal', type: 'text', key: 'focus' },
        { label: 'Cadencia', type: 'text', key: 'cadence' },
        { label: 'Roles definidos', type: 'text', key: 'roles' },
        { label: 'Cambios durante el desarrollo', type: 'text', key: 'changes' },
        { label: 'Flexibilidad', type: 'level', key: 'flexibility' },
        { label: 'Estructura y ceremonias', type: 'level', key: 'structure' },
        { label: 'Límite de WIP explícito', type: 'bool', key: 'wip' },
        { label: 'Prácticas técnicas obligatorias', type: 'bool', key: 'techPractices' },
        { label: 'Métrica clave', type: 'text', key: 'metric' },
        { label: 'Ideal para', type: 'text', key: 'ideal' }
    ];

    const methods = Object.keys(comparativaData);
    const NAMES = { V: 'Modelo en V' };
    const name = m => NAMES[m] || m;
    const selected = new Set(['Scrum', 'Kanban', 'XP']); // selección inicial

    const renderCell = (row, m) => {
        const v = comparativaData[m][row.key];

        if (row.type === 'text') return v;

        if (row.type === 'level') {
            const dots = [1, 2, 3, 4, 5]
                .map(i => `<span class="dot ${i <= v ? 'on' : ''}"></span>`).join('');
            return `<div class="dots">${dots}</div>
                    <span class="level-label">${LEVEL_LABELS[row.key][v - 1]}</span>`;
        }

        return v
            ? `<span class="bool yes"><i class="bi bi-check-circle-fill"></i> Sí</span>`
            : `<span class="bool no"><i class="bi bi-dash-circle"></i> No</span>`;
    };

    const renderSelectors = () => {
        const container = $('#method-selectors');
        if (!container) return;

        container.innerHTML = methods.map(m => `
            <label class="method-checkbox ${selected.has(m) ? 'active' : ''}">
                <input type="checkbox" value="${m}" class="method-check" ${selected.has(m) ? 'checked' : ''}>
                <span><strong>${name(m)}</strong><small>${comparativaData[m].sub}</small></span>
            </label>
        `).join('');

        container.querySelectorAll('.method-check').forEach(check => {
            check.onchange = () => {
                if (check.checked) selected.add(check.value);
                else selected.delete(check.value);
                update();
            };
        });
    };

    const updateCounter = () => {
        const el = $('#selection-counter');
        if (el) el.textContent = `${selected.size} de ${methods.length} seleccionadas`;
    };

    const updateTable = () => {
        const container = $('#table-container');
        if (!container) return;

        const cols = methods.filter(m => selected.has(m)); // respeta el orden original

        if (cols.length < 2) {
            container.innerHTML = `
                <div class="no-selection-msg">
                    <i class="bi bi-table"></i>
                    <p>Seleccioná al menos dos metodologías para ver la comparación.</p>
                </div>`;
            return;
        }

        container.innerHTML = `
            <div class="table-scroll">
                <table class="dynamic-table">
                    <thead>
                        <tr>
                            <th>Criterio<small>${cols.length} columnas activas</small></th>
                            ${cols.map(m => `
                                <th>
                                    <span class="th-title">${name(m)}</span>
                                    <span class="th-tag">${comparativaData[m].tag}</span>
                                </th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${rows.map(r => `
                            <tr>
                                <td>${r.label}</td>
                                ${cols.map(m => `<td>${renderCell(r, m)}</td>`).join('')}
                            </tr>`).join('')}
                    </tbody>
                </table>
            </div>`;
    };

    // Sincroniza los checkboxes sin volver a crearlos (así no se pierde el foco del teclado)
    const syncSelectors = () => {
        document.querySelectorAll('.method-check').forEach(c => {
            c.checked = selected.has(c.value);
            c.closest('.method-checkbox').classList.toggle('active', c.checked);
        });
    };

    const update = () => {
        syncSelectors();
        updateCounter();
        updateTable();
    };

    const init = () => {
        const all = $('#select-all');
        const clear = $('#clear-selection');
        if (all) all.onclick = () => { methods.forEach(m => selected.add(m)); update(); };
        if (clear) clear.onclick = () => { selected.clear(); update(); };
        renderSelectors();
        update();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();