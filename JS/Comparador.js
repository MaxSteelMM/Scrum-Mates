(() => {
    const $ = s => document.querySelector(s);

    const comparativaData = {
        'Scrum': {
            planning: 'Sprints (1-4 semanas)',
            flexibility: 'Alta (Adaptativa)',
            roles: 'PO, Scrum Master, Developers',
            workflow: 'Iterativo e Incremental',
            delivery: 'Incrementos al final de cada Sprint',
            projectType: 'Proyectos complejos y cambiantes'
        },
        'Kanban': {
            planning: 'Flujo continuo',
            flexibility: 'Muy Alta (Evolutiva)',
            roles: 'No define roles específicos',
            workflow: 'Flujo continuo (Pull system)',
            delivery: 'Entrega continua según demanda',
            projectType: 'Mantenimiento y servicios'
        },
        'Waterfall': {
            planning: 'Upfront (Planificación inicial total)',
            flexibility: 'Baja (Rígida)',
            roles: 'Project Manager, Analistas, Devs, QA',
            workflow: 'Lineal y Secuencial',
            delivery: 'Entrega única al final del proyecto',
            projectType: 'Proyectos con requisitos muy claros'
        },
        'XP': {
            planning: 'Iteraciones muy cortas',
            flexibility: 'Alta',
            roles: 'Cliente, Programadores, Coach',
            workflow: 'Ciclos rápidos de feedback técnico',
            delivery: 'Entregas frecuentes y pequeñas',
            projectType: 'Proyectos con alto riesgo técnico'
        }
    };

    const features = [
        { key: 'planning', label: 'Planificación' },
        { key: 'flexibility', label: 'Flexibilidad' },
        { key: 'roles', label: 'Roles' },
        { key: 'workflow', label: 'Flujo de Trabajo' },
        { key: 'delivery', label: 'Entregas' },
        { key: 'projectType', label: 'Tipo de Proyecto' }
    ];

    const renderSelectors = () => {
        const container = $('#method-selectors');
        const methods = Object.keys(comparativaData);

        container.innerHTML = methods.map(m => `
            <label class="method-checkbox">
                <input type="checkbox" value="${m}" class="method-check">
                ${m}
            </label>
        `).join('');

        document.querySelectorAll('.method-check').forEach(check => {
            check.onchange = updateTable;
        });
    };

    const updateTable = () => {
        const selected = Array.from(document.querySelectorAll('.method-check:checked')).map(c => c.value);
        const container = $('#table-container');

        if (selected.length === 0) {
            container.innerHTML = `
                <div class="no-selection-msg">
                    <i class="bi bi-table"></i>
                    <p>Por favor, selecciona al menos una metodología para comenzar la comparación.</p>
                </div>`;
            return;
        }

        let tableHtml = `
            <table class="dynamic-table">
                <thead>
                    <tr>
                        <th>Características</th>
                        ${selected.map(m => `<th>${m}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${features.map(f => `
                        <tr>
                            <td>${f.label}</td>
                            ${selected.map(m => `<td>${comparativaData[m][f.key]}</td>`).join('')}
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
        container.innerHTML = tableHtml;
    };

    document.addEventListener('DOMContentLoaded', () => {
        renderSelectors();
        updateTable();
    });
})();
