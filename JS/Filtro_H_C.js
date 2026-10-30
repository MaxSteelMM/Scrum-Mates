document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.getElementById('hc-filter');
    const toolCards = document.querySelectorAll('.hc-card:not(.hc-card-guia)');
    if (!dropdown) return;

    const apply = category => {
        toolCards.forEach(card => {
            const show = category === 'all' || card.dataset.category === category;
            card.classList.toggle('hc-hidden', !show);
        });
    };

    dropdown.addEventListener('change', e => apply(e.target.value));

    // Los enlaces "Ver solo ..." de cada tarjeta aplican el mismo filtro
    document.querySelectorAll('.hc-link[data-filter]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            dropdown.value = link.dataset.filter;
            apply(dropdown.value);
            const top = document.getElementById('tipos');
            if (top) top.scrollIntoView({ behavior: 'smooth' });
        });
    });
});
