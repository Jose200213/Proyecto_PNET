document.addEventListener("DOMContentLoaded", function () {
    // Evento para los banners: al hacer clic, alterna la visibilidad del contenedor de películas
    const banners = document.querySelectorAll(".cinema-banner");
    banners.forEach(banner => {
        banner.addEventListener("click", function () {
        // Se asume que el contenedor de películas es el siguiente elemento después del banner
        const movieDisplay = banner.nextElementSibling;
        if (movieDisplay && movieDisplay.classList.contains("cinema-movie-display")) {
            movieDisplay.classList.toggle("hidden");
        }
        });
    });
    // Evento para las tarjetas de película: al hacer clic, alterna la visibilidad del contenedor de horarios
    const movieCards = document.querySelectorAll(".cinema-movie-card");
    movieCards.forEach(card => {
        card.addEventListener("click", function () {
        // Se busca el contenedor de películas (padre de la tarjeta)
        const movieDisplay = card.closest(".cinema-movie-display");
        if (movieDisplay) {
          // Se asume que el contenedor de horarios es el siguiente elemento después del movie display
            const roomDisplay = movieDisplay.nextElementSibling;
            if (roomDisplay && roomDisplay.classList.contains("cinema-room-display")) {
                roomDisplay.classList.toggle("hidden"); 
            }
        }
    });
    });
    // Evento para el botón "Ver info de salas": alterna la visibilidad de la tabla de info
    const infoButtons = document.querySelectorAll(".cinema-room-seemore");
    infoButtons.forEach(button => {
        button.addEventListener("click", function () {
        // Se asume que la tabla de info es el siguiente elemento después del contenedor de horarios
        const roomDisplay = button.closest(".cinema-room-display");
        if (roomDisplay) {
            const roomInfo = roomDisplay.nextElementSibling;
            if (roomInfo && roomInfo.classList.contains("cinema-room-info")) {
            roomInfo.classList.toggle("hidden");
            }
        }
    });
    });
});

//Los toggle lo que hacen en este caso es que si el elemento tiene la clase hidden se la quita y si no la tiene se la pone, 
//de esta manera se puede mostrar y ocultar el elemento con un solo evento. Lo hacemos para los banners, las tarjetas de película y el botón "Ver info de salas".
document.addEventListener("click", (event) => {
  console.log("Elemento clicado:", event.target);
});

/* %%%%%%%%%%% Guardar selección de cine, película, sala y horario %%%%%%%%%%% */  
document.addEventListener("DOMContentLoaded", () => {

  /* %%%%%%%%%%% Guardar selección de cine %%%%%%%%%%% */
  const cines = document.querySelectorAll(".cinema-banner");

  cines.forEach(cine => {
    cine.addEventListener("click", () => {
      const nombreCine = cine.getAttribute("id");
      sessionStorage.setItem("nombreCine", nombreCine);
    })
  })

  /* %%%%%%%%%%% Guardar selección de película %%%%%%%%%%% */
  const peliculas = document.querySelectorAll(".movie-img");

  peliculas.forEach(pelicula => {
    pelicula.addEventListener("click", () => {
      const nombrePelicula = pelicula.getAttribute("alt");
      sessionStorage.setItem("nombrePelicula", nombrePelicula);
      console.log("Guardado:", nombrePelicula);
    });
  });


  /* %%%%%%%%%%% Guardar selección de sala y horario %%%%%%%%%%% */ 
  const horarios = document.querySelectorAll(".schedule");

  horarios.forEach(horario => {
    console.log(horario.textContent)
    horario.addEventListener("click", (e) => {
      e.preventDefault;

      if(horario.parentElement.parentElement.parentElement.getAttribute("alt") == "Horario " + sessionStorage.getItem("nombrePelicula")) {
        const nombreSala = horario.parentElement.parentElement.firstElementChild.textContent;
        const horaPelicula = horario.textContent;
        sessionStorage.setItem("nombreSala", nombreSala);
        sessionStorage.setItem("horaPelicula", horaPelicula);
      }
    })
    
  })
});

