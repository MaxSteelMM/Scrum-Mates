(() => {
  const $ = s => document.querySelector(s);

  /* ===== Datos ===== */
  const valores = [
    ['bi-people', 'Individuos e interacciones', 'procesos y herramientas'],
    ['bi-code-slash', 'Software funcionando', 'documentación extensiva'],
    ['bi-handshake', 'Colaboración con el cliente', 'negociación contractual'],
    ['bi-arrow-repeat', 'Respuesta ante el cambio', 'seguir un plan'],
  ];
  const principios = [
    ['Satisfacer al cliente', 'Entregar software con valor de forma temprana y continua es la máxima prioridad.'],
    ['Aceptar el cambio', 'Dar la bienvenida a los cambios de requisitos, incluso en etapas tardías del desarrollo.'],
    ['Entregar con frecuencia', 'Entregar software funcionando en ciclos cortos: de semanas a meses, prefiriendo los más breves.'],
    ['Colaborar cada día', 'Las personas de negocio y de desarrollo trabajan juntas diariamente durante el proyecto.'],
    ['Confiar en las personas', 'Construir con equipos motivados, darles apoyo y entorno, y confiar en su capacidad.'],
    ['Conversar cara a cara', 'La conversación cara a cara es el medio más eficaz para comunicar información dentro del equipo.'],
    ['Medir software funcionando', 'El software que funciona es la principal medida de progreso, no el volumen de tareas.'],
    ['Sostener el ritmo', 'Negocio, desarrollo y usuarios deben poder mantener un ritmo constante indefinidamente.'],
    ['Cuidar la excelencia técnica', 'La atención continua a la excelencia técnica y al buen diseño mejora la agilidad.'],
    ['Hacerlo simple', 'La simplicidad es esencial: maximizar la cantidad de trabajo que no es necesario realizar.'],
    ['Autoorganizarse', 'Las mejores arquitecturas, requisitos y diseños emergen de equipos autoorganizados.'],
    ['Reflexionar y adaptar', 'A intervalos regulares, el equipo reflexiona sobre cómo ser más eficaz y ajusta su forma de trabajar.'],
  ];
  const metodos = [
    {
      id: 'scrum', nombre: 'Scrum', icon: 'bi-arrow-repeat', color: '#0077b6', tag: 'ITERATIVO E INCREMENTAL',
      sub: 'Un marco ligero para generar valor ante problemas complejos.', nav: 'Valor en Sprints',
      que: '¿Qué es Scrum?',
      txt: 'Un equipo multifuncional y autogestionado construye incrementos útiles en Sprints de un mes o menos. Aprende de los resultados y adapta lo que hará después.',
      box: ['Empirismo: aprender de la experiencia', 'Transparencia para hacer visible el trabajo; inspección para evaluar resultados; adaptación para ajustar el rumbo.', 'Compromiso · Foco · Apertura · Respeto · Coraje'],
      side: ['Un ciclo de valor y aprendizaje', ['Product Backlog', 'Sprint · 1 mes o menos', 'Incremento utilizable'], 1, 'Inspeccionar el producto y mejorar el proceso en cada Sprint.'],
      grupos: [
        ['Roles', 'roles', 'Responsabilidades', [['Product Owner', 'Maximiza el valor del producto y gestiona eficazmente el Product Backlog.'], ['Scrum Master', 'Establece Scrum y ayuda al equipo y a la organización a mejorar su efectividad.'], ['Developers', 'Crean un incremento útil en cada Sprint y sostienen la calidad del producto.']]],
        ['Eventos', 'eventos', 'Eventos dentro del Sprint', [['Sprint Planning', 'Acordar por qué el Sprint es valioso, qué se hará y cómo abordarlo.'], ['Daily Scrum', '15 minutos para inspeccionar el avance hacia el Objetivo del Sprint y adaptar el plan.'], ['Sprint Review', 'Inspeccionar el resultado con interesados y decidir futuras adaptaciones.'], ['Sprint Retrospective', 'Planificar mejoras en calidad y efectividad para el siguiente Sprint.']]],
        ['Artefactos', 'artefactos', 'Artefactos y compromisos', [['Product Backlog → Objetivo del Producto', 'Lista ordenada y emergente de lo necesario para mejorar el producto.'], ['Sprint Backlog → Objetivo del Sprint', 'Objetivo, elementos elegidos y plan de acción elaborado por Developers.'], ['Incremento → Definición de Terminado', 'Paso concreto y utilizable que cumple las medidas de calidad acordadas.']]],
      ],
      pie: ['El Sprint es el contenedor de los demás eventos', 'No es una fase de desarrollo aislada: integra todo el trabajo necesario para crear valor. Se pueden entregar incrementos antes de la Sprint Review.'],
    },
    {
      id: 'kanban', nombre: 'Kanban', icon: 'bi-columns-gap', color: '#00b4d8', tag: 'FLUJO CONTINUO',
      sub: 'Mejorar el servicio optimizando el flujo de trabajo.', nav: 'Flujo continuo de trabajo',
      que: '¿Qué es Kanban?',
      txt: 'Un método para gestionar y mejorar el flujo de valor. Parte del proceso actual, hace visible el trabajo y permite introducir cambios evolutivos, sin exigir Sprints.',
      box: ['Ver el trabajo para mejorar el sistema', 'Visualizar el trabajo · Limitar el trabajo en curso (WIP) · Gestionar el flujo · Hacer explícitas las políticas · Establecer feedback · Mejorar de forma colaborativa.'],
      board: [['Por hacer', '4 pendientes', ['Filtro por metodología', 'Ayuda contextual', 'Perfil de usuario', 'Buscar recursos']], ['En curso', '2 / 2 · WIP', ['Crear historias', 'Diseñar tablero'], 1], ['En revisión', '1 / 2 · WIP', ['Validar registro']], ['Terminado', '2 entregadas', ['Acceso al curso', 'Vista de lecciones']]],
      boardNote: 'Política explícita: tomar una nueva tarjeta solo si hay capacidad. «Terminado» requiere pruebas aprobadas y aceptación del cliente.',
      grupos: [
        ['Roles', 'roles', 'Roles y responsabilidades', [['Conservar los roles existentes', 'Kanban no impone nuevos roles. El equipo acuerda quién gestiona, ejecuta y mejora el trabajo.']]],
        ['Revisiones', 'revisiones', 'Revisiones según el contexto', [['Feedback y reposición', 'No hay eventos obligatorios. Las revisiones de flujo y la reposición se ajustan a las necesidades del servicio.']]],
        ['Herramientas', 'artefactos', 'Artefactos y herramientas', [['Tablero, tarjetas y límites WIP', 'Métricas de flujo: WIP, tiempo de ciclo, edad del trabajo y throughput (elementos terminados por período).']]],
      ],
      pie: ['Empezar menos, terminar más', 'En el ejemplo, «En curso» alcanzó su límite de 2. Antes de iniciar otra tarea, el equipo ayuda a que el trabajo actual avance.'],
    },
    {
      id: 'xp', nombre: 'XP · Extreme Programming', icon: 'bi-code-slash', color: '#023e8a', tag: 'EXCELENCIA TÉCNICA', short: 'XP',
      sub: 'Calidad del software y feedback rápido como hábitos de equipo.', nav: 'Excelencia técnica y feedback',
      que: '¿Qué es XP?',
      txt: 'Una metodología ágil de desarrollo que combina colaboración cercana con el cliente y prácticas de ingeniería. Reduce el riesgo mediante cambios pequeños, pruebas y feedback constante.',
      box: ['Cinco valores que se refuerzan entre sí', 'Comunicación, simplicidad, feedback, coraje y respeto guían tanto el trabajo técnico como la relación entre las personas.'],
      side: ['TDD: desarrollar guiándose por pruebas', ['01 · Prueba que falla', '02 · Código mínimo', '03 · Refactorizar'], -1, 'Repetir en pasos pequeños, con todas las pruebas pasando.'],
      grupos: [
        ['Personas', 'roles', 'Personas y colaboración', [['Cliente y desarrolladores', 'El cliente aclara necesidades y prioridades; los desarrolladores estiman, construyen y prueban en colaboración.'], ['Coach según el equipo', 'Puede acompañar las prácticas y el aprendizaje. No son las responsabilidades obligatorias de Scrum.'], ['Propiedad colectiva', 'Todo el equipo cuida y puede mejorar el código compartido, con estándares comunes.']]],
        ['Prácticas', 'eventos', 'Prácticas y cadencia', [['Planificación y entregas pequeñas', 'Elegir historias valiosas y liberar versiones frecuentes para aprender pronto.'], ['TDD y programación en parejas', 'Escribir pruebas antes del código y trabajar de a dos para revisar decisiones continuamente.'], ['Integración continua y refactorización', 'Integrar y probar cambios con frecuencia; mejorar el diseño sin alterar el comportamiento.']]],
        ['Elementos', 'artefactos', 'Elementos de trabajo', [['Historias de usuario', 'Expresan necesidades desde el valor para el usuario y sirven para conversar y planificar.'], ['Pruebas de aceptación', 'Concretan con el cliente los resultados esperados y permiten comprobarlos.'], ['Software probado', 'El código integrado y sus pruebas automatizadas sostienen entregas confiables.']]],
      ],
      pie: ['Calidad sin agotamiento', 'XP promueve un ritmo sostenible: la calidad técnica, los cambios pequeños y el descanso ayudan a mantener la capacidad de entregar valor.'],
    },
  ];

  /* ===== Render ===== */
  $('#valores-grid').innerHTML = valores.map(v => `
    <div class="col"><div class="ag-card"><span class="mt-o"><i class="bi ${v[0]}"></i></span>
    <h3>${v[1]}</h3><small>SOBRE</small><p>${v[2]}</p></div></div>`).join('');

  $('#principios-grid').innerHTML = principios.map((p, i) => `
    <div class="col"><div class="ag-pr"><span class="n">${String(i + 1).padStart(2, '0')}</span>
    <div><h3>${p[0]}</h3><p>${p[1]}</p></div></div></div>`).join('');

  $('#metodo-nav').innerHTML = metodos.map(m => `
    <div class="col"><a class="ag-jump" href="#${m.id}" style="--c:${m.color}"><i class="bi ${m.icon}"></i>
    <div><b>${m.short || m.nombre}</b><span>${m.nav}</span></div></a></div>`).join('');

  const side = m => {
    if (!m.side) return '';
    const [t, steps, on, foot] = m.side;
    return `<div class="ag-box"><h4>${t}</h4><div class="ag-steps">${steps.map((s, i) => `<b class="${i === on ? 'on' : ''}">${s}</b>`).join('')}</div><p class="mb-0 text-primary fw-bold" style="font-size:12px">${foot}</p></div>`;
  };
  const board = m => !m.board ? '' : `
    <div class="ag-board">${m.board.map(c => `<div class="ag-col ${c[3] ? 'hl' : ''}"><h6>${c[0]}<em>${c[1]}</em></h6>${c[2].map(t => `<div>${t}</div>`).join('')}</div>`).join('')}</div>
    <p class="mt-2 mb-0" style="font-size:12px">${m.boardNote}</p>`;

  $('#metodo-list').innerHTML = metodos.map(m => `
    <article class="ag-m" id="${m.id}" data-toc="${m.short || m.nombre}" style="--c:${m.color}">
      <header class="ag-mh"><span class="mt-o"><i class="bi ${m.icon}"></i></span>
        <div><h3>${m.nombre}</h3><p>${m.sub}</p></div><span class="ag-tag">${m.tag}</span></header>
      <div class="ag-mb">
        <div class="row g-3">
          <div class="col-lg-6"><h4 class="fs-6 fw-bold">${m.que}</h4><p style="font-size:13.5px">${m.txt}</p>
            <div class="ag-box"><h5>${m.box[0]}</h5>${m.box[1]}${m.box[2] ? `<div class="chips">${m.box[2]}</div>` : ''}</div></div>
          <div class="col-lg-6">${side(m) || `<div class="ag-box"><h5>${m.box[0]}</h5>${m.box[1]}</div>`}</div>
        </div>
        ${board(m)}
        <div class="row g-4 ag-grp">${m.grupos.map(g => `
          <div class="col-lg-4 ag-g" id="${m.id}-${g[1]}" data-toc="${g[0]}" data-toc-level="2">
            <h4>${g[2]}</h4></div>`).join('')}
        </div>
        <div class="ag-note mt-4"><i class="bi bi-lightbulb"></i><span><b>${m.pie[0]}</b><br>${m.pie[1]}</span></div>
      </div>
    </article>`).join('');

  /* ===== Índice flotante ===== */
  const targets = [...document.querySelectorAll('[data-toc]')];
  const nav = document.createElement('nav');
  nav.className = 'toc';
  nav.setAttribute('aria-label', 'En esta página');
  nav.innerHTML = `<button class="toc__fab" type="button" aria-expanded="false" aria-label="Abrir índice de la página"><i class="bi bi-list-ul"></i></button>
    <div class="toc__panel"><p class="toc__title">EN ESTA PÁGINA</p><div class="toc__bar" aria-hidden="true"><i></i></div><ul></ul></div>`;
  const list = nav.querySelector('ul');
  list.innerHTML = targets.filter(t => t.dataset.tocLevel !== '2').map(t =>
    `<li><a href="#${t.id}">${t.dataset.toc}</a></li>`).join('');
  document.body.appendChild(nav);

  const links = [...list.querySelectorAll('a')];
  const fab = nav.querySelector('.toc__fab');
  const bar = nav.querySelector('.toc__bar i');
  const setActive = id => links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + id));


  const update = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = (max > 0 ? Math.min(100, scrollY / max * 100) : 0) + '%';
    let cur = targets[0], prevTop = null;
    targets.forEach(t => {
      const top = t.getBoundingClientRect().top;
      const sameRow = prevTop !== null && Math.abs(top - prevTop) < 4;
      if (top <= innerHeight * 0.3 && !sameRow) cur = t;
      prevTop = top;
    });
    setActive(cur.id);
  };
  addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update);
  update();

  const close = () => { nav.classList.remove('is-open'); fab.setAttribute('aria-expanded', 'false'); };
  list.addEventListener('click', e => {
    const a = e.target.closest('a');
    if (!a) return;
    e.preventDefault();
    const dest = document.querySelector(a.getAttribute('href'));
    dest.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    history.replaceState(null, '', a.getAttribute('href'));
    setActive(dest.id);
    close();
  });
  fab.addEventListener('click', () => fab.setAttribute('aria-expanded', nav.classList.toggle('is-open')));
  addEventListener('keydown', e => e.key === 'Escape' && close());
  document.addEventListener('click', e => { if (!nav.contains(e.target)) close(); });
})();