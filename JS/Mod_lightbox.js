
(function () {
    'use strict';

    const esc = v => String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const TRIGGER = '[data-lightbox]';
    let modalEl, modal, carouselEl, carousel, countEl, lastFocus, builtFor = 0;

    function build(items) {
        const slides = items.map((btn, i) => {
            const img = btn.querySelector('img');
            const cap = btn.closest('figure').querySelector('figcaption');
            return '<div class="carousel-item' + (i === 0 ? ' active' : '') + '">' +
                '<img src="' + (btn.dataset.full || img.currentSrc || img.src) + '" class="d-block mx-auto img-fluid" alt="' + esc(img.alt) + '">' +
                '<p class="text-center text-white mt-3 px-5 mb-0">' + cap.innerHTML + '</p></div>';
        }).join('');
        const multi = items.length > 1;

        if (!modalEl) {
            modalEl = document.createElement('div');
            modalEl.className = 'modal fade';
            modalEl.id = 'mtLightbox';
            modalEl.tabIndex = -1;
            modalEl.setAttribute('role', 'dialog');
            modalEl.setAttribute('aria-label', 'Vista ampliada de la ilustración');
            modalEl.setAttribute('aria-hidden', 'true');
            document.body.appendChild(modalEl);
        }
        modalEl.innerHTML =
            '<div class="modal-dialog modal-xl modal-dialog-centered"><div class="modal-content border-0 text-white">' +
            '<div class="modal-header border-0"><span class="small text-info" id="mtLbCount" aria-live="polite"></span>' +
            '<button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar"></button></div>' +
            '<div class="modal-body pt-0"><div id="mtLbCarousel" class="carousel slide" data-bs-ride="false">' +
            '<div class="carousel-inner">' + slides + '</div>' +
            (multi ?
                '<button class="carousel-control-prev" type="button" data-bs-target="#mtLbCarousel" data-bs-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Anterior</span></button>' +
                '<button class="carousel-control-next" type="button" data-bs-target="#mtLbCarousel" data-bs-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Siguiente</span></button>' : '') +
            '</div></div></div></div>';

        carouselEl = modalEl.querySelector('#mtLbCarousel');
        countEl = modalEl.querySelector('#mtLbCount');
        carousel = new bootstrap.Carousel(carouselEl, { interval: false, ride: false, touch: true, wrap: true });
        modal = bootstrap.Modal.getOrCreateInstance(modalEl);
        builtFor = items.length;

        const updateCount = i => { countEl.textContent = (i + 1) + ' / ' + items.length; };
        carouselEl.addEventListener('slid.bs.carousel', e => updateCount(e.to));

        modalEl.addEventListener('keydown', e => {
            if (e.key === 'ArrowLeft') carousel.prev();
            else if (e.key === 'ArrowRight') carousel.next();
        });
        modalEl.addEventListener('hidden.bs.modal', () => lastFocus && lastFocus.focus());
    }

    document.addEventListener('click', e => {
        const btn = e.target.closest(TRIGGER);
        if (!btn) return;
        const items = [].slice.call(document.querySelectorAll(TRIGGER));
        const index = items.indexOf(btn);
        lastFocus = btn;

        if (!modalEl || builtFor !== items.length) build(items);
        carousel.to(index);
        countEl.textContent = (index + 1) + ' / ' + items.length;
        modal.show();
    });
})();