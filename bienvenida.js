document.addEventListener('DOMContentLoaded', function() {
    const telon = document.getElementById('telon');
    setTimeout(() => {
        telon.classList.add('open');
    }, 400); // Espera 1 segundo antes de abrir el telón

    const verMasButtons = document.querySelectorAll(".pelicula button.ver-mas");

    verMasButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const pelicula = this.parentElement;
            const categoria = pelicula.closest(".categoria");
            const peliculas = categoria.querySelectorAll(".pelicula");
            const categoriaTitulo = categoria.querySelector("h3");

            // Si ya está activa, restaurar la vista
            if (pelicula.classList.contains("activa")) {
                const detalle = categoria.querySelector(".detalle-pelicula");
                if (detalle) detalle.remove();
                peliculas.forEach((p) => {
                    p.style.display = "block";
                    p.classList.remove("activa");
                });
                if (categoriaTitulo) categoriaTitulo.style.display = "block";
                return;
            }

            // Ocultar el título de la categoría
            if (categoriaTitulo) categoriaTitulo.style.display = "none";

            // Ocultar todas las películas de la categoría
            peliculas.forEach((p) => p.style.display = "none");

            // Marcar la película seleccionada como activa
            pelicula.classList.add("activa");

            // Definir los enlaces a los tráilers
            const trailers = {
                "Película 1": "https://www.youtube.com/watch?v=2YJXP8CKrNE",
                "Película 2": "https://www.youtube.com/watch?v=2YJXP8CKrNE",
                "Película 3": "https://www.youtube.com/watch?v=2YJXP8CKrNE",
                "Película 4": "https://www.youtube.com/watch?v=2YJXP8CKrNE",
                "Película 5": "https://www.youtube.com/watch?v=2YJXP8CKrNE",
                "Capitán América": "https://www.youtube.com/watch?v=1pHDWnXmK7Y",
                "A Complete Unknown": "https://www.youtube.com/watch?v=FdV-Cs5o8mc",
                "Paddington 3: Aventura en la Selva": "https://www.youtube.com/watch?v=QDQJlGxy81g",
                "Flow: Un Mundo que Salvar": "https://www.youtube.com/watch?v=mkOgoiqNLMY",
                "Vaiana 2": "https://www.youtube.com/watch?v=2YJXP8CKrNE",
                "Nosferatus": "https://www.youtube.com/watch?v=2YJXP8CKrNE",
                "La Vida Ante Nosotros": "https://www.youtube.com/watch?v=2YJXP8CKrNE",
                "Alto Knights": "https://www.youtube.com/watch?v=2YJXP8CKrNE",
                "Novocaine": "https://www.youtube.com/watch?v=2YJXP8CKrNE"
            };

            // Crear el contenedor de detalle sin fondo ni borde extra (transparente)
            const detalle = document.createElement("div");
            detalle.classList.add("detalle-pelicula");
            detalle.innerHTML = `
                <div class="detalle-imagen">
                    <img src="${pelicula.querySelector("img").src}" alt="${pelicula.dataset.titulo}">
                </div>
                <div class="detalle-info">
                    <h3>${pelicula.dataset.titulo}</h3>
                    <p>${pelicula.dataset.sinopsis}</p>
                    <a href="${trailers[pelicula.dataset.titulo]}" target="_blank" class="trailer-link">🎬 Ver tráiler oficial</a>
                    <button class="cerrar">Ver menos</button>
                </div>
            `;
            // Agregar el contenedor de detalle al final de la categoría
            categoria.appendChild(detalle);

            // Evento para cerrar y restaurar la vista
            detalle.querySelector("button.cerrar").addEventListener("click", function () {
                detalle.remove();
                peliculas.forEach((p) => {
                    p.style.display = "block";
                    p.classList.remove("activa");
                });
                if (categoriaTitulo) categoriaTitulo.style.display = "block";
            });
        });
    });
});



