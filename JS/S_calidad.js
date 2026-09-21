document.addEventListener("click", function (e) {
    const btnFlip = e.target.closest(".domain-help");
    const btnBack = e.target.closest(".show-front-btn");

    if (btnFlip) {
        e.preventDefault();
        const container = btnFlip.closest(".gkit-block__inner");
        container.classList.add("flip");
    }

    if (btnBack) {
        e.preventDefault();
        const container = btnBack.closest(".gkit-block__inner");
        container.classList.remove("flip");
    }
});