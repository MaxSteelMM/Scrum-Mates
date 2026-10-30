(() => {
    const $ = s => document.querySelector(s);

    const questions = [
        {
            id: 1,
            text: '¿Cómo son los requisitos de tu proyecto?',
            options: [
                { text: 'Muy claros y estables desde el inicio', scores: { waterfall: 3, scrum: 0, kanban: 0 } },
                { text: 'Claramente definidos pero pueden evolucionar', scores: { waterfall: 1, scrum: 2, kanban: 1 } },
                { text: 'Muy cambiantes o desconocidos al inicio', scores: { waterfall: 0, scrum: 3, kanban: 2 } }
            ]
        },
        {
            id: 2,
            text: '¿Cuál es la prioridad principal de entrega?',
            options: [
                { text: 'Entregar todo el producto final al terminar', scores: { waterfall: 3, scrum: 0, kanban: 0 } },
                { text: 'Entregar versiones funcionales cada pocas semanas', scores: { waterfall: 0, scrum: 3, kanban: 1 } },
                { text: 'Entregar flujo continuo de mejoras constantes', scores: { waterfall: 0, scrum: 1, kanban: 3 } }
            ]
        },
        {
            id: 3,
            text: '¿Cómo es la estructura de tu equipo?',
            options: [
                { text: 'Estructura jerárquica con roles muy definidos', scores: { waterfall: 3, scrum: 1, kanban: 1 } },
                { text: 'Equipo multifuncional y autogestionado', scores: { waterfall: 0, scrum: 3, kanban: 2 } },
                { text: 'Especialistas enfocados en optimizar el flujo', scores: { waterfall: 0, scrum: 1, kanban: 3 } }
            ]
        },
        {
            id: 4,
            text: '¿Cómo manejas los cambios en el camino?',
            options: [
                { text: 'Evitamos cambios una vez aprobado el plan', scores: { waterfall: 3, scrum: 0, kanban: 0 } },
                { text: 'Aceptamos cambios al inicio de cada iteración', scores: { waterfall: 0, scrum: 3, kanban: 1 } },
                { text: 'Cambiamos prioridades en tiempo real según la demanda', scores: { waterfall: 0, scrum: 1, kanban: 3 } }
            ]
        },
        {
            id: 5,
            text: '¿Cuál es la naturaleza del trabajo?',
            options: [
                { text: 'Proyecto con fecha final y alcance cerrado', scores: { waterfall: 3, scrum: 1, kanban: 0 } },
                { text: 'Producto evolutivo basado en feedback continuo', scores: { waterfall: 0, scrum: 3, kanban: 2 } },
                { text: 'Soporte, mantenimiento o servicios recurrentes', scores: { waterfall: 0, scrum: 1, kanban: 3 } }
            ]
        }
    ];

    const recommendations = {
        scrum: {
            title: 'Scrum',
            desc: 'Tu proyecto se beneficia de un marco iterativo. La estructura de Sprints te permitirá entregar valor rápidamente mientras adaptas el producto según el feedback del cliente.',
            reason: 'Alta variabilidad de requisitos y necesidad de entregas incrementales.'
        },
        kanban: {
            title: 'Kanban',
            desc: 'El flujo continuo es lo ideal para ti. Enfocarte en limitar el WIP y optimizar la entrega te dará la flexibilidad necesaria para manejar la demanda.',
            reason: 'Prioridad en la entrega continua y gestión de flujo de trabajo.'
        },
        waterfall: {
            title: 'Modelo en Cascada',
            desc: 'Un enfoque lineal es lo más seguro para tu caso. La planificación exhaustiva inicial garantiza que no haya sorpresas en el resultado final.',
            reason: 'Requisitos estables y estructura de proyecto predecible.'
        }
    };

    let currentStep = 0;
    const userAnswers = {};

    const renderSteps = () => {
        const container = $('#steps-container');
        container.innerHTML = questions.map((q, i) => `
            <div class="step ${i === 0 ? 'active' : ''}" id="step-${i}">
                <h3 class="text-center mb-4 fw-bold">${q.text}</h3>
                <div class="options-list">
                    ${q.options.map((opt, oi) => `
                        <label class="option-card" data-step="${i}" data-opt="${oi}">
                            <input type="radio" name="q${i}" value="${oi}">
                            <span>${opt.text}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        `).join('');

        document.querySelectorAll('.option-card input').forEach(input => {
            input.addEventListener('change', () => {
                const card = input.closest('.option-card');
                const stepIdx = card.dataset.step;
                document.querySelectorAll(`#step-${stepIdx} .option-card`).forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                userAnswers[stepIdx] = parseInt(card.dataset.opt, 10);
                const err = $('#step-error');
                if (err) err.textContent = '';
            });
        });
    };

    const updateWizard = () => {
        // Steps
        document.querySelectorAll('.step').forEach((s, i) => {
            s.classList.toggle('active', i === currentStep);
        });

        // Nav
        $('#prev-btn').disabled = currentStep === 0;
        $('#next-btn').innerHTML = currentStep === questions.length - 1
            ? 'Ver Resultado <i class="bi bi-trophy-fill ms-2"></i>'
            : 'Siguiente <i class="bi bi-arrow-right ms-2"></i>';

        // Progress
        const progress = ((currentStep) / (questions.length - 1)) * 100;
        $('#progress-fill').style.width = `${progress}%`;
        $('#step-counter').innerText = `Paso ${currentStep + 1} de ${questions.length}`;
        $('#progress-percent').innerText = `${Math.round(progress)}%`;
    };

    const calculateResult = () => {
        const scores = { scrum: 0, kanban: 0, waterfall: 0 };

        questions.forEach((q, i) => {
            const optIdx = userAnswers[i];
            if (optIdx !== undefined) {
                const s = q.options[optIdx].scores;
                scores.scrum += s.scrum;
                scores.kanban += s.kanban;
                scores.waterfall += s.waterfall;
            }
        });

        const keys = ['scrum', 'kanban', 'waterfall'];
        const total = keys.reduce((n, k) => n + scores[k], 0) || 1;

        // Porcentajes que siempre suman 100 (método del mayor resto)
        const percentages = {};
        let acc = 0;
        keys.forEach(k => { percentages[k] = Math.floor(scores[k] / total * 100); acc += percentages[k]; });
        keys.map(k => [k, scores[k] / total * 100 - percentages[k]])
            .sort((x, y) => y[1] - x[1])
            .slice(0, 100 - acc)
            .forEach(([k]) => { percentages[k]++; });

        // Si hay empate se muestra el primero y se menciona el resto
        const max = Math.max(...keys.map(k => scores[k]));
        const tied = keys.filter(k => scores[k] === max);
        const winner = tied[0];
        const rec = recommendations[winner];
        const tieNote = tied.length > 1
            ? `<p class="small mt-3 mb-0">También encaja muy bien: ${tied.slice(1).map(k => recommendations[k].title).join(' y ')}.</p>`
            : '';

        const wizard = $('#wizard');
        wizard.innerHTML = `
            <div class="result-box">
                <div class="recommendation-highlight">
                    <h2 class="fw-bold">La metodología ideal para ti es:</h2>
                    <h1 class="display-4 fw-bold">${rec.title}</h1>
                    <p class="lead">${rec.desc}</p>
                    <div class="badge bg-light text-dark p-2">Motivo: ${rec.reason}</div>
                    ${tieNote}
                </div>

                <h4 class="fw-bold mt-5 mb-3">Puntajes de Coincidencia:</h4>
                <div class="d-flex justify-content-center flex-wrap mb-4">
                    <div class="score-pill">Scrum: ${percentages.scrum}%</div>
                    <div class="score-pill">Kanban: ${percentages.kanban}%</div>
                    <div class="score-pill">Cascada: ${percentages.waterfall}%</div>
                </div>

                <button class="btn btn-primary px-5" onclick="location.reload()">Reiniciar Encuesta</button>
            </div>
        `;
    };

    $('#next-btn').onclick = () => {
        if (userAnswers[currentStep] === undefined) {
            $('#step-error').textContent = 'Elegí una opción para continuar.';
            return;
        }

        if (currentStep < questions.length - 1) {
            currentStep++;
            updateWizard();
        } else {
            calculateResult();
        }
    };

    $('#prev-btn').onclick = () => {
        if (currentStep > 0) {
            currentStep--;
            updateWizard();
        }
    };

    document.addEventListener('DOMContentLoaded', () => {
        renderSteps();
        updateWizard();
    });
})();
