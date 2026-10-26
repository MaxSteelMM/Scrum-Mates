(() => {
    const $ = s => document.querySelector(s);

    const validateEmail = email => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const showError = (id, show) => {
        const input = $(`#${id}`);
        const error = $(`#error-${id}`);
        if (show) {
            input.classList.add('is-invalid');
            error.style.display = 'block';
        } else {
            input.classList.remove('is-invalid');
            error.style.display = 'none';
        }
    };

    const validateForm = () => {
        let isValid = true;

        // Name
        const name = $('#name').value.trim();
        if (!name) {
            showError('name', true);
            isValid = false;
        } else {
            showError('name', false);
        }

        // Email
        const email = $('#email').value.trim();
        if (!email || !validateEmail(email)) {
            showError('email', true);
            isValid = false;
        } else {
            showError('email', false);
        }

        // Subject
        const subject = $('#subject').value.trim();
        if (!subject) {
            showError('subject', true);
            isValid = false;
        } else {
            showError('subject', false);
        }

        // Message
        const message = $('#message').value.trim();
        if (!message) {
            showError('message', true);
            isValid = false;
        } else {
            showError('message', false);
        }

        return isValid;
    };

    document.addEventListener('DOMContentLoaded', () => {
        const form = $('#contact-form');
        const submitBtn = $('#submit-btn');
        const formContainer = $('#form-container');
        const confirmation = $('#confirmation');

        // Real-time validation on input
        ['name', 'email', 'subject', 'message'].forEach(id => {
            $(`#${id}`).oninput = () => {
                if ($(`#${id}`).classList.contains('is-invalid')) {
                    if ($(`#${id}`).value.trim()) {
                        if (id === 'email') {
                            if (validateEmail($(`#${id}`).value.trim())) showError(id, false);
                        } else {
                            showError(id, false);
                        }
                    }
                }
            };
        });

        form.onsubmit = e => {
            e.preventDefault();

            if (validateForm()) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = 'Enviando... <i class="bi bi-hourglass-split ms-2"></i>';

                // Simulate network delay
                setTimeout(() => {
                    form.style.display = 'none';
                    confirmation.style.display = 'block';
                }, 1500);
            }
        };
    });
})();
