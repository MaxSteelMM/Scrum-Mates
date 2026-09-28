document.addEventListener('DOMContentLoaded', () => {
    const filterDropdown = document.getElementById('hc-filter');
    const toolCards = document.querySelectorAll('.hc-card:not(.hc-card-guia)');

    if (!filterDropdown) return;

    filterDropdown.addEventListener('change', (e) => {
        const selectedCategory = e.target.value;

        toolCards.forEach(card => {
            const category = card.getAttribute('data-category');

            if (selectedCategory === 'all' || category === selectedCategory) {
                card.classList.remove('hc-hidden');
            } else {
                card.classList.add('hc-hidden');
            }
        });
    });
});
