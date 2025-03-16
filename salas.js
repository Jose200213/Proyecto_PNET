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