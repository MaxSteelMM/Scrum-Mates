(() => {
    'use strict';

    const $ = s => document.querySelector(s);

    const TYPES = {
        web:   { section: 'Sitios web y artículos', badge: 'Web',          icon: 'bi-globe' },
        pdf:   { section: 'Guías en PDF',           badge: 'PDF',          icon: 'bi-file-earmark-text' },
        libro: { section: 'Libros',                 badge: 'Libro',        icon: 'bi-book' },
        org:   { section: 'Organizaciones',         badge: 'Organización', icon: 'bi-building' }
    };

    // meta = dominio (web, pdf, org) o autor (libro)
    const RESOURCES = [
        { type: 'web', title: 'Manifiesto por el Desarrollo Ágil de Software', meta: 'agilemanifesto.org',
          desc: 'El documento original de 2001 con los cuatro valores y los doce principios ágiles.',
          url: 'https://agilemanifesto.org/' },
        { type: 'web', title: 'Agile Coach · Atlassian', meta: 'atlassian.com/agile',
          desc: 'Guías prácticas sobre Scrum, Kanban, métricas y trabajo en equipos ágiles.',
          url: 'https://www.atlassian.com/agile' },
        { type: 'web', title: 'Artículos sobre agilidad y diseño de software', meta: 'martinfowler.com',
          desc: 'Textos de referencia sobre prácticas ágiles, pruebas y calidad del código.',
          url: 'https://martinfowler.com/' },

        { type: 'pdf', title: 'La Guía de Scrum', meta: 'scrumguides.org',
          desc: 'Definición oficial de Scrum: roles, eventos y artefactos, disponible en español.',
          url: 'https://scrumguides.org/' },
        { type: 'pdf', title: 'The Kanban Guide for Scrum Teams', meta: 'scrum.org',
          desc: 'Cómo combinar Kanban con Scrum para mejorar el flujo de trabajo.',
          url: 'https://www.scrum.org/resources/kanban-guide-scrum-teams' },
        { type: 'pdf', title: 'SWEBOK · Calidad del software', meta: 'computer.org',
          desc: 'Capítulo de calidad de la guía de conocimientos de la ingeniería de software.',
          url: 'https://www.computer.org/education/bodies-of-knowledge/software-engineering' },

        { type: 'libro', title: 'Extreme Programming Explained', meta: 'Kent Beck',
          desc: 'Introducción al enfoque de XP, sus valores y sus prácticas técnicas.',
          url: 'https://www.google.com/search?tbm=bks&q=Extreme+Programming+Explained+Kent+Beck' },
        { type: 'libro', title: 'Scrum: el arte de hacer el doble de trabajo en la mitad de tiempo', meta: 'Jeff Sutherland',
          desc: 'Una explicación cercana de cómo y por qué funciona Scrum.',
          url: 'https://www.google.com/search?tbm=bks&q=Scrum+el+arte+de+hacer+el+doble+de+trabajo+Jeff+Sutherland' },
        { type: 'libro', title: 'Clean Code', meta: 'Robert C. Martin',
          desc: 'Principios y ejemplos para escribir código legible, mantenible y de calidad.',
          url: 'https://www.google.com/search?tbm=bks&q=Clean+Code+Robert+C.+Martin' },

        { type: 'org', title: 'Agile Alliance', meta: 'agilealliance.org',
          desc: 'Organización sin fines de lucro que promueve los valores y principios ágiles.',
          url: 'https://www.agilealliance.org/' },
        { type: 'org', title: 'Scrum Alliance', meta: 'scrumalliance.org',
          desc: 'Comunidad y certificaciones para profesionales que trabajan con Scrum.',
          url: 'https://www.scrumalliance.org/' },
        { type: 'org', title: 'ISTQB', meta: 'istqb.org',
          desc: 'Junta internacional de certificación de pruebas de software.',
          url: 'https://www.istqb.org/' }
    ];

    let active = 'all';

    const cardHTML = r => `
        <article class="res-card">
            <div class="res-card__top">
                <span class="res-icon"><i class="bi ${TYPES[r.type].icon}" aria-hidden="true"></i></span>
                <span class="res-badge">${TYPES[r.type].badge}</span>
            </div>
            <h3 class="res-card__title">${r.title}</h3>
            <p class="res-card__meta">${r.meta}</p>
            <p class="res-card__desc">${r.desc}</p>
            <a class="res-card__link" href="${r.url}" target="_blank" rel="noopener noreferrer"
               aria-label="Abrir recurso: ${r.title} (se abre en una pestaña nueva)">
                Abrir recurso <i class="bi bi-arrow-up-right" aria-hidden="true"></i>
            </a>
        </article>`;

    const renderFilters = () => {
        const items = [['all', `Todos (${RESOURCES.length})`]]
            .concat(Object.entries(TYPES).map(([key, t]) => [key, t.badge]));
        $('#res-filters').innerHTML = items.map(([key, label]) => `
            <button type="button" class="res-pill${key === active ? ' is-active' : ''}"
                    data-filter="${key}" aria-pressed="${key === active}">${label}</button>
        `).join('');
    };

    const renderSections = () => {
        const html = Object.entries(TYPES)
            .filter(([key]) => active === 'all' || active === key)
            .map(([key, t]) => {
                const list = RESOURCES.filter(r => r.type === key);
                return `
                <section class="res-section res--${key}" aria-labelledby="sec-${key}">
                    <div class="res-section__head">
                        <span class="res-icon res-icon--lg"><i class="bi ${t.icon}" aria-hidden="true"></i></span>
                        <h2 id="sec-${key}">${t.section}</h2>
                        <span class="res-count">${list.length} recursos</span>
                    </div>
                    <div class="res-grid">${list.map(cardHTML).join('')}</div>
                </section>`;
            }).join('');
        $('#res-sections').innerHTML = html;
    };

    const render = () => { renderFilters(); renderSections(); };

    document.addEventListener('DOMContentLoaded', () => {
        $('#res-filters').addEventListener('click', e => {
            const btn = e.target.closest('[data-filter]');
            if (!btn) return;
            active = btn.dataset.filter;
            render();
            const el = document.querySelector(`[data-filter="${active}"]`);
            if (el) el.focus();
        });
        render();
    });
})();