/* ==========================================================
   nav.js — Navbar único para todo el sitio (SCRUMATES)
   Se edita el menú SOLO acá y se actualizan las 13 páginas.

   Estructura esperada:
     /index.html
     /Paginas/*.html
     /JS/nav.js        <- este archivo
     /CSS/nav.css
     /Img/Logo/LOGO-SCRUMATES.svg
   ========================================================== */
(function () {
  'use strict';

  // Raíz del sitio, calculada a partir de la ubicación de este script (JS/ -> ../)
  var ROOT = new URL('../', document.currentScript.src);
  var url = function (p) { return new URL(p, ROOT); };

  /* ---------- 1. MENÚ (único lugar a editar) ---------- */
  var MENU = [
    { label: 'Inicio', href: 'index.html' },
    {
      label: 'Calidad',
      items: [
        { label: 'Fundamentos de calidad',  href: 'Paginas/Calidad.html' },
        { label: 'Herramientas de calidad', href: 'Paginas/Herramientas_calidad.html' }
      ]
    },
    {
      label: 'Procesos',
      items: [
        { label: 'Ciclo de vida (SDLC)',  href: 'Paginas/Ciclo_vida.html' },
        { label: 'Modelos tradicionales', href: 'Paginas/Modelos_Tradicionales.html' },
        { label: 'Metodologías ágiles',   href: 'Paginas/Metodologias.html' }
      ]
    },
    {
      label: 'Aprender',
      items: [
        { label: 'Glosario',   href: 'Paginas/Glosario.html' },
        { label: 'FAQ',        href: 'Paginas/FAQ.html' },
        { label: 'Recursos',   href: 'Paginas/Recursos.html' },
        { label: 'Ejercicios', href: 'Paginas/Ejercicios.html' }
      ]
    },
    {
      label: 'Herramientas',
      items: [
        { label: 'Comparador de metodologías', href: 'Paginas/Comparador.html' },
        { label: 'Encuesta de preferencias',   href: 'Paginas/Encuesta.html' }
      ]
    },
    { label: 'Nosotros', href: 'Paginas/Nosotros.html' },
    { label: 'Contacto', href: 'Paginas/Contacto.html', cta: true }
  ];

  /* ---------- 2. PÁGINA ACTUAL ---------- */
  function normalize(path) {
    path = decodeURIComponent(path);
    if (path.charAt(path.length - 1) === '/') path += 'index.html';
    return path.toLowerCase();
  }
  var current = normalize(location.pathname);
  var isCurrent = function (href) { return normalize(url(href).pathname) === current; };

  /* ---------- 3. HTML ---------- */
  function linkHTML(item, cls) {
    var active = isCurrent(item.href);
    return '<a class="' + cls + (active ? ' is-active' : '') + '" href="' + url(item.href).href + '"' +
           (active ? ' aria-current="page"' : '') + '>' + item.label + '</a>';
  }

  function itemHTML(item, i) {
    if (!item.items) {
      return '<li class="site-nav__item' + (item.cta ? ' site-nav__item--cta' : '') + '">' +
             linkHTML(item, item.cta ? 'site-nav__link site-nav__link--cta' : 'site-nav__link') + '</li>';
    }
    var childActive = item.items.some(function (c) { return isCurrent(c.href); });
    var id = 'sub-' + i;
    return '<li class="site-nav__item has-sub' + (childActive ? ' has-active-child' : '') + '">' +
             '<button type="button" class="site-nav__trigger" aria-expanded="false" aria-controls="' + id + '">' +
               item.label +
               '<svg class="site-nav__caret" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">' +
               '<path d="M1.5 3.5 5 7l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
             '</button>' +
             '<ul class="site-nav__sub" id="' + id + '">' +
               item.items.map(function (c) { return '<li>' + linkHTML(c, 'site-nav__sublink') + '</li>'; }).join('') +
             '</ul>' +
           '</li>';
  }

  var html =
    '<nav class="site-nav" aria-label="Navegación principal">' +
      '<div class="site-nav__bar">' +
        '<a class="site-nav__logo" href="' + url('index.html').href + '">' +
          '<img src="' + url('Img/Logo/LOGO-SCRUMATES.svg').href + '" alt="SCRUMATES — ir al inicio">' +
        '</a>' +
        '<button type="button" class="site-nav__burger" aria-expanded="false" aria-controls="site-nav-menu" aria-label="Abrir menú">' +
          '<span></span><span></span><span></span>' +
        '</button>' +
        '<ul class="site-nav__menu" id="site-nav-menu">' + MENU.map(itemHTML).join('') + '</ul>' +
      '</div>' +
    '</nav>';

  /* ---------- 4. MONTAJE ---------- */
  // CSS se carga solo, no hace falta <link> en cada página
  if (!document.querySelector('link[data-site-nav]')) {
    var css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = url('CSS/nav.css').href;
    css.setAttribute('data-site-nav', '');
    document.head.appendChild(css);
  }

  function mount() {
    var host = document.getElementById('site-nav');
    if (!host) {
      host = document.createElement('div');
      host.id = 'site-nav';
      document.body.insertBefore(host, document.body.firstChild);
    }
    host.innerHTML = html;
    behavior(host.querySelector('.site-nav'));
  }

  /* ---------- 5. COMPORTAMIENTO ---------- */
  function behavior(nav) {
    var burger = nav.querySelector('.site-nav__burger');
    var triggers = nav.querySelectorAll('.site-nav__trigger');

    function setBurger(open) {
      nav.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open);
      burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      document.body.classList.toggle('site-nav-locked', open);
    }

    function closeSubs(except) {
      triggers.forEach(function (t) {
        if (t === except) return;
        t.setAttribute('aria-expanded', 'false');
        t.parentElement.classList.remove('open');
      });
    }

    burger.addEventListener('click', function () {
      setBurger(burger.getAttribute('aria-expanded') !== 'true');
    });

    triggers.forEach(function (t) {
      t.addEventListener('click', function () {
        var open = t.getAttribute('aria-expanded') !== 'true';
        closeSubs(t);
        t.setAttribute('aria-expanded', open);
        t.parentElement.classList.toggle('open', open);
      });
    });

    // Clic afuera o Escape cierran todo
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target)) { closeSubs(); setBurger(false); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeSubs(); setBurger(false); burger.focus(); }
    });

    // Al navegar desde el menú móvil, cerrarlo
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setBurger(false); closeSubs(); });
    });

    // Si se agranda la ventana, resetear estado móvil
    window.matchMedia('(min-width: 981px)').addEventListener('change', function () {
      setBurger(false); closeSubs();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();