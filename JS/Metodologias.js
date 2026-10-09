var S =
  'fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"';
var M = [
  {
    id: "cascada",
    n: "Cascada",
    s: "Secuencial y lineal",
    c: "#0077b6",
    t: "Modelo en cascada",
    d: "Las fases se completan en orden: requisitos, diseño, implementación, pruebas y mantenimiento. No se avanza hasta aprobar la anterior, y cada etapa cierra con documentación formal.",
    meta: ["Flujo: lineal", "Cambios: costosos", "Entrega: única, al final"],
    ico: '<path d="M5 8h14M12 22h14M19 36h14" ' + S + "/>",
    dia:
      "<g " +
      S +
      ' style="color:var(--acc)"><rect x="0" y="4" width="140" height="32" rx="6" fill="#fff"/><rect x="60" y="48" width="140" height="32" rx="6" fill="#fff"/><rect x="120" y="92" width="140" height="32" rx="6" fill="#fff"/><rect x="180" y="136" width="140" height="32" rx="6" fill="#fff"/><rect x="240" y="180" width="140" height="32" rx="6" fill="#fff"/></g><text x="12" y="25">Requisitos</text><text x="72" y="69">Diseño</text><text x="132" y="113">Implementación</text><text x="192" y="157">Pruebas</text><text x="252" y="201">Mantenimiento</text>',
    vb: "0 0 380 216",
    p: [
      "Estructura simple, fácil de explicar y gestionar.",
      "Cada fase tiene entregables y fechas claras.",
      "La documentación completa facilita el traspaso.",
      "Funciona bien con equipos nuevos o rotativos.",
    ],
    k: [
      "Es rígido: volver a una fase anterior sale caro.",
      "El cliente ve el producto recién al final.",
      "Los errores de requisitos aparecen tarde.",
      "No tolera bien los cambios de alcance.",
    ],
    w: "Cuando los requisitos están cerrados, la tecnología es conocida y el alcance es acotado.",
    u: ["Requisitos estables", "Alcance definido", "Contrato cerrado"],
  },
  {
    id: "modelo-v",
    n: "Modelo en V",
    s: "Verificación y validación",
    c: "#00b4d8",
    t: "Modelo en V",
    d: "Extiende la cascada: cada fase de desarrollo tiene una fase de prueba asociada, planificada desde el inicio. A la izquierda se construye; a la derecha se verifica y valida.",
    meta: [
      "Flujo: forma de V",
      "Foco: pruebas tempranas",
      "Entrega: única, al final",
    ],
    ico: '<path d="M6 8l16 28L38 8" ' + S + "/>",
    dia:
      '<path d="M30 20L190 176L350 20" ' +
      S +
      ' style="color:var(--acc)"/><g style="fill:var(--acc)"><circle cx="30" cy="20" r="6"/><circle cx="83" cy="72" r="6"/><circle cx="137" cy="124" r="6"/><circle cx="190" cy="176" r="7"/><circle cx="243" cy="124" r="6"/><circle cx="297" cy="72" r="6"/><circle cx="350" cy="20" r="6"/></g><g stroke="#48cae4" stroke-dasharray="4 5"><path d="M36 20H344"/><path d="M89 72H291"/><path d="M143 124H237"/></g><text x="0" y="8">Requisitos</text><text x="20" y="64">Diseño</text><text x="74" y="116">Detalle</text><text x="164" y="204">Código</text><text x="250" y="116">Unitarias</text><text x="304" y="64">Integración</text><text x="294" y="8">Aceptación</text>',
    vb: "0 0 380 216",
    p: [
      "Las pruebas se planifican desde el comienzo.",
      "Encuentra defectos antes que la cascada pura.",
      "Cada requisito queda ligado a una prueba concreta.",
      "Muy usado donde la calidad es crítica.",
    ],
    k: [
      "Tan rígido como la cascada ante cambios.",
      "No hay software funcionando hasta el final.",
      "Exige mucha planificación y documentación.",
      "Poco útil si los requisitos son inciertos.",
    ],
    w: "Cuando un fallo puede tener consecuencias graves y se necesita trazabilidad entre requisitos y pruebas.",
    u: ["Sistemas médicos", "Automotriz y aeronáutica", "Software crítico"],
  },
  {
    id: "iterativo",
    n: "Iterativo e incremental",
    s: "Entregas por ciclos",
    c: "#023e8a",
    t: "Modelos iterativos e incrementales",
    d: "El producto se construye por ciclos. En cada iteración se repiten análisis, diseño, código y pruebas, y cada incremento suma funcionalidad utilizable a lo ya entregado.",
    meta: [
      "Flujo: cíclico",
      "Cambios: entre ciclos",
      "Entrega: parcial y progresiva",
    ],
    ico: '<path d="M36 22a14 14 0 1 1-4-10M36 6v8h-8" ' + S + "/>",
    dia:
      "<g " +
      S +
      ' style="color:var(--acc)"><rect x="10" y="130" width="70" height="70" rx="6" fill="#fff"/><rect x="100" y="90" width="70" height="110" rx="6" fill="#fff"/><rect x="190" y="50" width="70" height="150" rx="6" fill="#fff"/><rect x="280" y="10" width="70" height="190" rx="6" fill="#fff"/></g><text x="20" y="170">Ciclo 1</text><text x="110" y="150">Ciclo 2</text><text x="200" y="130">Ciclo 3</text><text x="290" y="110">Ciclo 4</text><text x="10" y="120">↻ feedback</text><text x="100" y="80">↻ feedback</text><text x="190" y="40">↻ feedback</text>',
    vb: "0 0 360 216",
    p: [
      "Entrega valor temprano con versiones parciales.",
      "Incorpora feedback y cambios en cada ciclo.",
      "Reduce riesgos al detectarlos antes.",
      "Es la base conceptual de las metodologías ágiles.",
    ],
    k: [
      "Necesita una arquitectura pensada para crecer.",
      "Cuesta fijar costo y plazo totales desde el inicio.",
      "Puede generar retrabajo si no se controlan los ciclos.",
      "Exige comunicación y gestión constantes.",
    ],
    w: "Cuando los requisitos pueden evolucionar, hace falta mostrar avances pronto o el proyecto es grande.",
    u: ["Requisitos cambiantes", "Proyectos grandes", "Feedback frecuente"],
  },
];

/* ===== Render (HTML con clases de Bootstrap) ===== */
var L = function (a, f) {
  return a.map(f).join("");
};
var tabsBox = document.getElementById("mt-tabs");
var panels = document.getElementById("mt-panels");
var dots = document.querySelectorAll("#dots i");

tabsBox.innerHTML = L(M, function (m, i) {
  return (
    '<a class="mt-tab' +
    (i === 0 ? " active" : "") +
    '" id="t-' +
    m.id +
    '" href="#' +
    m.id +
    '" role="tab" data-bs-toggle="tab" data-bs-target="#' +
    m.id +
    '" aria-controls="' +
    m.id +
    '" aria-selected="' +
    (i === 0) +
    '" style="--c:' +
    m.c +
    '">' +
    '<svg viewBox="0 0 44 44" style="color:' +
    m.c +
    '">' +
    m.ico +
    "</svg>" +
    "<div><b>" +
    m.n +
    "</b><span>" +
    m.s +
    "</span></div></a>"
  );
});

panels.innerHTML = L(M, function (m, i) {
  return (
    '<div class="tab-pane fade' +
    (i === 0 ? " show active" : "") +
    '" id="' +
    m.id +
    '" role="tabpanel" aria-labelledby="t-' +
    m.id +
    '" tabindex="0" style="--acc:' +
    m.c +
    '">' +
    '<div class="card mt-stage overflow-hidden"><div class="row g-0">' +
    '<div class="col-lg-3 mt-sl"><div class="mt-ic"><svg viewBox="0 0 44 44">' +
    m.ico +
    "</svg></div>" +
    "<h3>" +
    m.n +
    "</h3><p>" +
    m.s +
    "</p>" +
    '<div class="mt-prog"><span>MODELO ACTIVO</span><span>' +
    (i + 1) +
    " / 3</span></div>" +
    '<div class="mt-pb"><i style="width:' +
    Math.round(((i + 1) / 3) * 100) +
    '%"></i></div></div>' +
    '<div class="col-lg-9 p-4"><div class="row g-4 align-items-center">' +
    '<div class="col-md-6"><h4>¿Qué es este modelo?</h4><p>' +
    m.d +
    "</p>" +
    '<div class="mt-feat"><h5>Características principales</h5><ul>' +
    L(m.meta, function (x) {
      var a = x.split(": ");
      return "<li><b>" + a[0] + ":</b> " + a[1] + "</li>";
    }) +
    "</ul></div></div>" +
    '<div class="col-md-6"><div class="mt-dg"><svg viewBox="' +
    m.vb +
    '" role="img" aria-label="Diagrama: ' +
    m.n +
    '">' +
    m.dia +
    "</svg></div></div>" +
    "</div></div></div></div>" +
    '<div class="row g-3 mt-1">' +
    '<div class="col-md-6"><div class="mt-col mt-pro"><h3><i class="bi bi-check-lg"></i>Ventajas</h3><ul>' +
    L(m.p, function (x) {
      return "<li>" + x + "</li>";
    }) +
    "</ul></div></div>" +
    '<div class="col-md-6"><div class="mt-col mt-con"><h3><i class="bi bi-x-lg"></i>Desventajas</h3><ul>' +
    L(m.k, function (x) {
      return "<li>" + x + "</li>";
    }) +
    "</ul></div></div>" +
    "</div>" +
    '<div class="mt-use row g-3 align-items-center mx-0 mt-3"><div class="col-lg"><h3>¿Cuándo utilizarlo?</h3><p>' +
    m.w +
    "</p></div>" +
    '<ul class="col-lg-auto d-flex flex-wrap gap-2 p-0 m-0">' +
    L(m.u, function (x) {
      return "<li>" + x + "</li>";
    }) +
    "</ul></div>" +
    "</div>"
  );
});

document.getElementById("cards").innerHTML = L(M, function (m) {
  return (
    '<div class="col"><a class="mt-cd" href="#' +
    m.id +
    '" style="--c:' +
    m.c +
    '"><b>' +
    m.n +
    "</b><p>" +
    m.w +
    "</p><em>Ver detalle →</em></a></div>"
  );
});

/* ===== Navegación interna (Bootstrap Tab + anclajes) ===== */
var ids = M.map(function (m) {
  return m.id;
});
var tabs = ids.map(function (id) {
  return document.getElementById("t-" + id);
});
var cur = 0;

function showTab(n) {
  bootstrap.Tab.getOrCreateInstance(tabs[(n + ids.length) % ids.length]).show();
}

tabs.forEach(function (t, n) {
  t.addEventListener("shown.bs.tab", function () {
    cur = n;
    dots.forEach(function (d, j) {
      d.className = j === n ? "on" : "";
    });
    try {
      history.replaceState(null, "", "#" + ids[n]);
    } catch (e) {}
  });
});

document.getElementById("prev").onclick = function () {
  showTab(cur - 1);
};
document.getElementById("next").onclick = function () {
  showTab(cur + 1);
};

function fromHash(scroll) {
  var n = ids.indexOf(location.hash.slice(1));
  if (n < 0) return;
  showTab(n);
  if (scroll) document.getElementById("modelos").scrollIntoView();
}
window.addEventListener("hashchange", function () {
  fromHash(true);
});
dots[0].className = "on";
fromHash(true);
