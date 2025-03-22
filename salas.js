/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%||                                     ||%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%||                                     ||%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|| MANEJO DE APARICIÓN DE CONTENEDORES ||%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%||                                     ||%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%||                                     ||%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/
document.addEventListener("DOMContentLoaded", function () {
  // Función auxiliar que busca el siguiente hermano que tenga la clase "cinema-room-info"
  function getNextRoomInfo(element) {
    let next = element.nextElementSibling;
    while (next && !next.classList.contains("cinema-room-info")) {
      next = next.nextElementSibling;
    }
    return next;
  }

  // Evento para los banners: al hacer clic, alterna la visibilidad del contenedor de películas y oculta los horarios asociados.
  const banners = document.querySelectorAll(".cinema-banner");
  banners.forEach(banner => {
    banner.addEventListener("click", function () {
      const movieDisplay = banner.nextElementSibling;
      if (movieDisplay && movieDisplay.classList.contains("cinema-movie-display")) {
        // Alterna la visibilidad del contenedor de películas
        movieDisplay.classList.toggle("hidden");
        // Oculta todos los contenedores de horarios asociados a este banner
        let sibling = movieDisplay.nextElementSibling;
        while (sibling && sibling.classList.contains("cinema-room-display")) {
          sibling.classList.add("hidden");
          // Además, ocultamos la información asociada, si existe.
          const infoContainer = getNextRoomInfo(sibling);
          if (infoContainer) infoContainer.classList.add("hidden");
          sibling = sibling.nextElementSibling;
        }
      }
    });
  });

  // Para cada contenedor de películas en cada banner
  const movieDisplays = document.querySelectorAll(".cinema-movie-display");
  movieDisplays.forEach(movieDisplay => {
    const cards = Array.from(movieDisplay.querySelectorAll(".cinema-movie-card"));
    cards.forEach((card, localIndex) => {
      card.addEventListener("click", function () {
        // Primero, ocultamos todos los contenedores de horarios asociados a este banner
        let sibling = movieDisplay.nextElementSibling;
        const scheduleContainers = [];
        while (sibling && sibling.classList.contains("cinema-room-display")) {
          scheduleContainers.push(sibling);
          // Ocultamos la información asociada a cada horario
          const infoContainer = getNextRoomInfo(sibling);
          if (infoContainer) infoContainer.classList.add("hidden");
          sibling = sibling.nextElementSibling;
        }
        scheduleContainers.forEach(container => container.classList.add("hidden"));
        // Si existe un contenedor de horarios para la tarjeta clicada, lo mostramos.
        if (localIndex < scheduleContainers.length) {
          scheduleContainers[localIndex].classList.remove("hidden");
        }
      });
    });
  });

  // Evento para cada botón "Ver info de salas": se alterna la visibilidad de la tabla de información correspondiente.
  const infoButtons = document.querySelectorAll(".cinema-room-seemore");
  infoButtons.forEach(button => {
    button.addEventListener("click", function (event) {
      event.stopPropagation(); // Evita que el clic se propague a otros manejadores
      // Buscamos el contenedor de horarios (padre)
      const roomDisplay = button.closest(".cinema-room-display");
      if (roomDisplay) {
        const roomInfo = getNextRoomInfo(roomDisplay);
        if (roomInfo) {
          roomInfo.classList.toggle("hidden");
        }
      }
    });
  });
});


//Los toggle lo que hacen en este caso es que si el elemento tiene la clase hidden se la quita y si no la tiene se la pone, 
//de esta manera se puede mostrar y ocultar el elemento con un solo evento. Lo hacemos para los banners, las tarjetas de película y el botón "Ver info de salas".

/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%||                                       ||%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%||                                       ||%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%|| GUARDADO DE VARIABLES PARA FORMULARIO ||%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%||                                       ||%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%||                                       ||%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/
  
document.addEventListener("DOMContentLoaded", () => {

  /* Guardado en variables de etiquetas de interés */
  const cines = document.querySelectorAll(".cinema-banner");
  const peliculas = document.querySelectorAll(".movie-img");
  const horarios = document.querySelectorAll(".schedule");

  /* %%%%%%%%%%%%%%%%%%%%%%|| Interacciones con banner de cine ||%%%%%%%%%%%%%%%%%%%%%% */
  cines.forEach(cine => {
    /* Guardar selección de cine en click */
    cine.addEventListener("click", () => {
      const nombreCine = cine.getAttribute("id");
      sessionStorage.setItem("nombreCine", nombreCine);
    })
  })

  /* %%%%%%%%%%%%%%%%%%%%%%|| Interacciones con carteleras ||%%%%%%%%%%%%%%%%%%%%%% */
  peliculas.forEach(pelicula => {
    /* Guardar selección de película */
    pelicula.addEventListener("click", () => {
      const nombrePelicula = pelicula.getAttribute("alt");
      sessionStorage.setItem("nombrePelicula", nombrePelicula);
      console.log("Guardado:", nombrePelicula);
    });
  });


  /* %%%%%%%%%%%%%%%%%%%%%%|| Interacciones con sala y horario ||%%%%%%%%%%%%%%%%%%%%%% */ 
  horarios.forEach(horario => {
    /* Guardar selección de sala y horario */
    horario.addEventListener("click", (e) => {
      e.preventDefault;

      if(horario.parentElement.parentElement.parentElement.getAttribute("alt") == "Horario - " + sessionStorage.getItem("nombrePelicula") + " - " + sessionStorage.getItem("nombreCine")) {
        const nombreSala = horario.parentElement.parentElement.firstElementChild.textContent;
        const horaPelicula = horario.textContent;
        sessionStorage.setItem("nombreSala", nombreSala);
        sessionStorage.setItem("horaPelicula", horaPelicula);
      }
    })
  })

});

