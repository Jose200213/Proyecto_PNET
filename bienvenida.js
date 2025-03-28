document.addEventListener('DOMContentLoaded', function() {
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%||                    ||%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%||                    ||%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|| APERTURA DEL TELÓN ||%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%||                    ||%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%||                    ||%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/
    const telon = document.getElementById('telon');
    setTimeout(() => {
        telon.classList.add('open');
    }, 400); // Espera 0.4 segundo antes de abrir el telón

/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%||                       ||%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%||                       ||%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|| AMPLIAR INFO DE PELIS ||%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%||                       ||%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%||                       ||%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/

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
                "Mickey 17": "https://www.youtube.com/watch?v=tA1s65o_kYM",
                "El dia que la tierra Explotó": "https://www.youtube.com/watch?v=BtHUWHXfDyU",
                "Lee Miller": "https://www.youtube.com/watch?v=DmFYkiUAAA8",
                "Presence": "https://www.youtube.com/watch?v=XfSNmYhV8Xc",
                "Grand Tour": "https://www.youtube.com/watch?v=kMMuifpLS94",
                "Capitán América": "https://www.youtube.com/watch?v=1pHDWnXmK7Y",
                "A Complete Unknown": "https://www.youtube.com/watch?v=FdV-Cs5o8mc",
                "Paddington 3: Aventura en la selva": "https://www.youtube.com/watch?v=W0p9jThOHEU",
                "Flow: Un Mundo que Salvar": "https://www.youtube.com/watch?v=mkOgoiqNLMY",
                "Vaiana 2": "https://www.youtube.com/watch?v=O5lPAcMEKvE",
                "Nosferatus": "https://www.youtube.com/watch?v=i7MM8_M4a8U",
                "La Vida Ante Nosotros": "https://www.youtube.com/watch?v=2YJXP8CKrNE",
                "Alto Knights": "https://www.youtube.com/watch?v=1aayuOp0AnE",
                "Novocaine": "https://www.youtube.com/watch?v=99BLnkAlC1M"
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



