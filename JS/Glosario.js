(() => {
  const $ = (s) => document.querySelector(s);

  const glosarioData = [
    {
      term: "Agilidad",
      definition:
        "Capacidad de adaptarse rápidamente a los cambios en el entorno o los requisitos del proyecto.",
      category: "Metodologías",
    },
    {
      term: "Backlog",
      definition:
        "Lista priorizada de todas las funcionalidades, mejoras y correcciones necesarias para el producto.",
      category: "Scrum",
    },
    {
      term: "Bugs",
      definition:
        "Defectos o errores en el código que provocan un comportamiento inesperado o incorrecto del software.",
      category: "Calidad",
    },
    {
      term: "CI/CD",
      definition:
        "Integración Continua y Despliegue Continuo. Automatización de la integración de código y su entrega al entorno de producción.",
      category: "Herramientas",
    },
    {
      term: "Deuda Técnica",
      definition:
        "Costo implícito de elegir una solución rápida y fácil ahora en lugar de un enfoque mejor pero más lento.",
      category: "Desarrollo",
    },
    {
      term: "Daily Scrum",
      definition:
        "Reunión diaria de 15 minutos para sincronizar el trabajo del equipo y detectar impedimentos.",
      category: "Scrum",
    },
    {
      term: "Epic",
      definition:
        "Cuerpo de trabajo grande que puede dividirse en historias de usuario más pequeñas.",
      category: "Scrum",
    },
    {
      term: "Framework",
      definition:
        "Marco de trabajo que proporciona una estructura base para desarrollar aplicaciones de software.",
      category: "Desarrollo",
    },
    {
      term: "Garantía de Calidad (QA)",
      definition:
        "Procesos sistemáticos para asegurar que el producto final cumpla con los requisitos y estándares.",
      category: "Calidad",
    },
    {
      term: "Historia de Usuario",
      definition:
        "Descripción corta de una funcionalidad escrita desde la perspectiva del usuario final.",
      category: "Scrum",
    },
    {
      term: "Iteración",
      definition:
        "Ciclo de desarrollo corto y repetitivo que resulta en un incremento del producto.",
      category: "Metodologías",
    },
    {
      term: "Kanban",
      definition:
        "Método visual para gestionar el flujo de trabajo y limitar el trabajo en curso (WIP).",
      category: "Metodologías",
    },
    {
      term: "Linter",
      definition:
        "Herramienta que analiza el código fuente para detectar errores programáticos o estilísticos.",
      category: "Herramientas",
    },
    {
      term: "Métricas de Calidad",
      definition:
        "Medidas cuantitativas utilizadas para evaluar la calidad del software (ej. densidad de defectos).",
      category: "Calidad",
    },
    {
      term: "Normalization",
      definition:
        "Proceso de organizar los datos en una base de datos para reducir la redundancia.",
      category: "Desarrollo",
    },
    {
      term: "Objetivo del Sprint",
      definition:
        "Meta clara y concisa que el equipo se compromete a alcanzar al final del Sprint.",
      category: "Scrum",
    },
    {
      term: "Product Owner",
      definition:
        "Persona responsable de maximizar el valor del producto y gestionar el Product Backlog.",
      category: "Scrum",
    },
    {
      term: "QA Tester",
      definition:
        "Profesional encargado de ejecutar pruebas y validar que el software funcione según lo esperado.",
      category: "Calidad",
    },
    {
      term: "Refactorización",
      definition:
        "Proceso de mejorar la estructura interna del código sin cambiar su comportamiento externo.",
      category: "Desarrollo",
    },
    {
      term: "Scrum Master",
      definition:
        "Facilitador que asegura que el equipo comprenda y aplique la teoría y prácticas de Scrum.",
      category: "Scrum",
    },
    {
      term: "Sprint",
      definition:
        "Periodo de tiempo fijo (usualmente 1-4 semanas) donde se crea un incremento de software.",
      category: "Scrum",
    },
    {
      term: "TDD (Test Driven Development)",
      definition:
        "Práctica de escribir las pruebas antes del código funcional.",
      category: "Desarrollo",
    },
    {
      term: "Unit Testing",
      definition:
        "Pruebas que verifican el funcionamiento de la unidad más pequeña de código (ej. una función).",
      category: "Calidad",
    },
    {
      term: "User Acceptance Testing (UAT)",
      definition:
        "Pruebas realizadas por el usuario final para validar que el sistema cumple sus necesidades.",
      category: "Calidad",
    },
    {
      term: "Velocity",
      definition:
        "Medida de la cantidad de trabajo que un equipo puede completar en un Sprint.",
      category: "Scrum",
    },
    {
      term: "WIP Limit",
      definition:
        'Límite máximo de tareas que pueden estar "En Proceso" simultáneamente en Kanban.',
      category: "Metodologías",
    },
  ];

  const removeAccents = (text) => text.normalize("NFD").replace(/[̀-ͯ]/g, "");

  const renderTerms = (filterText = "", activeLetter = "") => {
    const grid = $("#terms-grid");
    const normalizedFilter = removeAccents(filterText.toLowerCase());

    const filtered = glosarioData
      .filter((item) => {
        const termMatch = removeAccents(item.term.toLowerCase()).includes(
          normalizedFilter,
        );
        const defMatch = removeAccents(item.definition.toLowerCase()).includes(
          normalizedFilter,
        );
        const letterMatch = activeLetter
          ? item.term.toUpperCase().startsWith(activeLetter)
          : true;
        return termMatch || defMatch;
      })
      .sort((a, b) => a.term.localeCompare(b.term));

    if (filtered.length === 0) {
      grid.innerHTML = `<div class="no-results">
                <i class="bi bi-search" style="font-size: 3rem; color: #dee2e6;"></i>
                <p class="mt-3">No se encontraron términos que coincidan con tu búsqueda.</p>
            </div>`;
      return;
    }

    grid.innerHTML = filtered
      .map(
        (item) => `
            <div class="col-md-6 col-lg-4">
                <div class="card h-100 term-card shadow-sm">
                    <div class="card-body">
                        <span class="term-category">${item.category}</span>
                        <h5 class="card-title fw-bold">${item.term}</h5>
                        <p class="card-text text-muted">${item.definition}</p>
                    </div>
                </div>
            </div>
        `,
      )
      .join("");
  };

  const renderAlphabet = () => {
    const index = $("#alphabet-index");
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    // Identificar qué letras tienen términos
    const activeLetters = new Set(
      glosarioData.map((i) => i.term.toUpperCase()[0]),
    );

    index.innerHTML = letters
      .map((l) => {
        const isDisabled = !activeLetters.has(l);
        return `
                <a href="#" class="letter-btn ${isDisabled ? "disabled" : ""}" data-letter="${l}">
                    ${l}
                </a>`;
      })
      .join("");

    document.querySelectorAll(".letter-btn").forEach((btn) => {
      btn.onclick = (e) => {
        e.preventDefault();
        document
          .querySelectorAll(".letter-btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        renderTerms("", btn.dataset.letter);
      };
    });
  };

  $("#glossary-search").oninput = (e) => {
    const letterBtn = document.querySelector(".letter-btn.active");
    if (letterBtn) letterBtn.classList.remove("active");
    renderTerms(e.target.value);
  };

  document.addEventListener("DOMContentLoaded", () => {
    renderAlphabet();
    renderTerms();
  });
})();
