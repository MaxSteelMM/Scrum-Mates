
(function () {
    'use strict';

    /* ---------- DATOS (editá acá el contenido) ---------- */
    const MODELS = [
        {
            id: 'cascada', color: '#0077b6', nombre: 'Cascada', lema: 'Secuencial y lineal',
            resumen: 'Fases en secuencia, una tras otra, con documentación formal.',
            que: 'Las fases se completan en orden: requisitos, diseño, implementación, pruebas y mantenimiento. No se avanza hasta aprobar la anterior, y cada etapa cierra con documentación formal.',
            caract: ['Flujo lineal', 'Cambios costosos', 'Entrega única al final'],
            ventajas: ['Estructura simple, fácil de explicar y gestionar.', 'Cada fase tiene entregables y fechas claras.', 'La documentación completa facilita el traspaso.', 'Funciona bien con equipos nuevos o rotativos.'],
            desventajas: ['Es rígido: volver a una fase anterior sale caro.', 'El cliente ve el producto recién al final.', 'Los errores de requisitos aparecen tarde.', 'No tolera bien los cambios de alcance.'],
            cuando: 'Cuando los requisitos están cerrados, la tecnología es conocida y el alcance es estable.',
            tags: ['Requisitos estables', 'Alcance definido', 'Cambios escasos']
        },
        {
            id: 'modelo-v', color: '#00b4d8', nombre: 'Modelo en V', lema: 'Verificación y validación',
            resumen: 'Cada fase de desarrollo tiene su fase de pruebas que la valida.',
            que: 'Extiende la cascada: cada fase de desarrollo tiene asociada una fase de pruebas que la valida. La prueba se planifica desde el inicio, no al final del proyecto.',
            caract: ['Pruebas planificadas desde el inicio', 'Cada fase tiene su validación', 'Alta trazabilidad'],
            ventajas: ['Las pruebas se planifican junto con cada fase.', 'Hay trazabilidad entre requisitos y pruebas.', 'Detecta defectos antes que la cascada.', 'Muy usado donde la calidad es crítica.'],
            desventajas: ['Sigue siendo poco flexible ante cambios.', 'No entrega software hasta el final.', 'Exige mucha documentación.', 'Cambiar un requisito obliga a rehacer sus pruebas.'],
            cuando: 'Cuando la calidad y la verificación son críticas y los requisitos se conocen desde el principio.',
            tags: ['Sistemas críticos', 'Alta trazabilidad', 'Requisitos claros']
        },
        {
            id: 'iterativo', color: '#023e8a', nombre: 'Iterativo e incremental', lema: 'Entregas por ciclos',
            resumen: 'El producto crece en ciclos cortos, con feedback en cada entrega.',
            que: 'El producto se construye en ciclos cortos. Cada iteración recorre planificación, desarrollo y pruebas, y cada incremento agrega funcionalidad sobre lo ya entregado.',
            caract: ['Ciclos cortos y repetibles', 'Entregas parciales funcionales', 'Feedback continuo del cliente'],
            ventajas: ['El cliente ve avances desde los primeros ciclos.', 'Los errores se detectan de forma temprana.', 'Permite incorporar cambios entre iteraciones.', 'Reduce el riesgo de entregar algo no deseado.'],
            desventajas: ['Requiere planificación y coordinación continuas.', 'La arquitectura puede degradarse si no se cuida.', 'Es difícil estimar costo y plazo totales al inicio.', 'Exige participación constante del cliente.'],
            cuando: 'Cuando los requisitos pueden evolucionar y conviene validar con el cliente en entregas tempranas.',
            tags: ['Requisitos cambiantes', 'Feedback temprano', 'Riesgo alto']
        }
    ];

    /* ---------- ÍCONOS (SVG, usan currentColor) ---------- */
    const PATHS = {
        cascada: 'M3 5h6v5h6v5h6',
        'modelo-v': 'M5 8l7 8 7-8',
        iterativo: 'M20 12a8 8 0 1 1-2.6-5.9M20 4v4.5h-4.5'
    };
    const icon = (id, st) => `<svg${st ? ` style="${st}"` : ''} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${PATHS[id]}"/></svg>`;

    /* ---------- ESQUEMAS (van dentro de .mt-dg; el CSS fija la tipografía del <text>) ---------- */
    const C = '#0077b6';
    const box = (x, y, w, t) => `<rect x="${x}" y="${y}" width="${w}" height="26" rx="6" fill="#fff" stroke="${C}" stroke-width="1.5"/><text x="${x + 10}" y="${y + 17}">${t}</text>`;
    const DIAGRAMS = {
        cascada: () => ['Requisitos', 'Diseño', 'Implementación', 'Pruebas', 'Mantenimiento'].map((t, i) => box(6 + i * 40, 6 + i * 31, 118, t)).join(''),
        'modelo-v': () => {
            const L = [['Requisitos', 6, 6], ['Diseño', 28, 44], ['Codificación', 50, 82]];
            const R = [['Aceptación', 202, 6], ['Integración', 180, 44], ['Unitarias', 158, 82]];
            return L.map((l, i) => `<line x1="${l[1] + 94}" y1="${l[2] + 13}" x2="${R[i][1]}" y2="${R[i][2] + 13}" stroke="${C}" stroke-dasharray="4 4" opacity=".5"/>`).join('') +
                L.concat(R).map(b => box(b[1], b[2], 94, b[0])).join('');
        },
        iterativo: () => [42, 78, 114].map((h, i) =>
            `<rect x="${12 + i * 98}" y="${132 - h}" width="88" height="${h}" rx="7" fill="${['#caf0f8', '#90e0ef', '#0077b6'][i]}" stroke="${C}" stroke-width="1.5"/>` +
            `<text x="${56 + i * 98}" y="${132 - h + 18}" text-anchor="middle"${i === 2 ? ' style="fill:#fff"' : ''}>Incremento ${i + 1}</text>`).join('') +
            '<text x="150" y="152" text-anchor="middle" style="font-weight:500;font-size:10px">Planificar → Construir → Probar → Entregar</text>'
    };
    const diagram = m => `<svg viewBox="0 0 300 158" role="img" aria-label="Esquema del modelo ${m.nombre}">${DIAGRAMS[m.id]()}</svg>`;

    /* ---------- TEMPLATES (clases de Modelos_tradicionales.css) ---------- */
    const li = arr => arr.map(t => `<li>${t}</li>`).join('');

    const tabHTML = (m, i) =>
        `<button type="button" class="mt-tab${i === 0 ? ' active' : ''}" id="tab-${m.id}" role="tab" style="--c:${m.color}"
            data-bs-toggle="tab" data-bs-target="#${m.id}" aria-controls="${m.id}" aria-selected="${i === 0}" data-i="${i}">
            ${icon(m.id, 'color:var(--c)')}
            <div><b>${m.nombre}</b><span>${m.lema}</span></div>
        </button>`;

    const panelHTML = (m, i) =>
        `<div class="tab-pane fade${i === 0 ? ' show active' : ''}" id="${m.id}" role="tabpanel" aria-labelledby="tab-${m.id}" tabindex="0" style="--acc:${m.color};--c:${m.color}">
            <div class="mt-stage overflow-hidden">
                <div class="row">
                    <div class="col-12 mt-sl">
                        <span class="mt-ic">${icon(m.id)}</span>
                        <h3>${m.nombre}</h3>
                        <p>${m.lema}</p>
                        <div class="mt-prog"><span>MODELO ACTIVO</span><span>${i + 1} / ${MODELS.length}</span></div>
                        <div class="mt-pb"><i style="width:${(i + 1) / MODELS.length * 100}%"></i></div>
                    </div>
                    <div class="col-lg-6 p-4">
                        <h4>¿Qué es este modelo?</h4>
                        <p>${m.que}</p>
                        <div class="mt-feat"><h5>Características principales</h5><ul>${li(m.caract)}</ul></div>
                    </div>
                    <div class="col-lg-5 p-4"><div class="mt-dg">${diagram(m)}</div></div>
                </div>
            </div>
            <div class="row g-3 mt-1">
                <div class="col-md-6"><div class="mt-col mt-pro"><h3><i class="bi bi-check-lg"></i>Ventajas</h3><ul>${li(m.ventajas)}</ul></div></div>
                <div class="col-md-6"><div class="mt-col mt-con"><h3><i class="bi bi-x-lg"></i>Desventajas</h3><ul>${li(m.desventajas)}</ul></div></div>
            </div>
            <div class="mt-use mt-3 d-flex flex-wrap align-items-center justify-content-between gap-3">
                <div><h3>¿Cuándo utilizarlo?</h3><p>${m.cuando}</p></div>
                <ul class="d-flex flex-wrap gap-2 m-0 p-0">${li(m.tags)}</ul>
            </div>
        </div>`;

    const cardHTML = m =>
        `<div class="col"><a class="mt-cd" href="#${m.id}" style="--c:${m.color}"><b>${m.nombre}</b><p>${m.resumen}</p><em>Ver modelo →</em></a></div>`;

    /* ---------- ELEMENTOS ---------- */
    const $ = s => document.querySelector(s);
    const tabsEl = $('#mt-tabs'), panelsEl = $('#mt-panels');
    if (!tabsEl || !panelsEl) return;
    if (typeof bootstrap === 'undefined') { console.error('Falta bootstrap.bundle.js antes de Modelos_Tradicionales.js'); return; }

    tabsEl.innerHTML = MODELS.map(tabHTML).join('');
    panelsEl.innerHTML = MODELS.map(panelHTML).join('');
    if ($('#cards')) $('#cards').innerHTML = MODELS.map(cardHTML).join('');
    const dotsEl = $('#dots');
    if (dotsEl) dotsEl.innerHTML = MODELS.map((_, i) => `<i${i === 0 ? ' class="on"' : ''}></i>`).join('');

    const tabs = [...tabsEl.querySelectorAll('.mt-tab')];
    const dots = dotsEl ? [...dotsEl.children] : [];
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let current = 0;
    const norm = i => (i + MODELS.length) % MODELS.length;

    function show(i, scroll) {
        i = norm(i);
        bootstrap.Tab.getOrCreateInstance(tabs[i]).show();
        if (scroll) $('#modelos').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    }

    // Bootstrap avisa cuando terminó de cambiar de pestaña (también con el teclado)
    tabsEl.addEventListener('shown.bs.tab', e => {
        current = +e.target.dataset.i;
        dots.forEach((d, k) => d.classList.toggle('on', k === current));
        history.replaceState(null, '', '#' + MODELS[current].id);
        e.target.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduce ? 'auto' : 'smooth' });
    });

    /* ---------- FLECHAS, PUNTOS, SWIPE ---------- */
    $('#prev') && $('#prev').addEventListener('click', () => show(current - 1));
    $('#next') && $('#next').addEventListener('click', () => show(current + 1));
    dots.forEach((d, k) => { d.style.cursor = 'pointer'; d.addEventListener('click', () => show(k)); });

    let x0 = null;
    panelsEl.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
    panelsEl.addEventListener('touchend', e => {
        if (x0 === null) return;
        const dx = e.changedTouches[0].clientX - x0; x0 = null;
        if (Math.abs(dx) > 60) show(current + (dx < 0 ? 1 : -1));
    });

    /* ---------- ENLACES INTERNOS (anillo del hero y tarjetas resumen) ---------- */
    document.addEventListener('click', e => {
        const a = e.target.closest('a[href^="#"]');
        if (!a) return;
        const i = MODELS.findIndex(m => '#' + m.id === a.getAttribute('href'));
        if (i > -1) { e.preventDefault(); show(i, true); }
    });

    // Hash en la URL: carga inicial y atrás/adelante del navegador
    const fromHash = () => MODELS.findIndex(m => '#' + m.id === location.hash);
    addEventListener('hashchange', () => { const i = fromHash(); if (i > -1 && i !== current) show(i, true); });
    const start = fromHash();
    if (start > 0) show(start, true);
})();