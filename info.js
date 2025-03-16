document.addEventListener("DOMContentLoaded", function () {
    // Selecciona todos los iframes de video
    const videos = document.querySelectorAll(".video");
    let currentIndex = 0;
    
    // Asegurarse de que solo el primer video esté visible
    videos.forEach((video, index) => {
        if (index !== 0) {
            video.classList.add("hidden");
        }
    }); 
    // Suponemos que el primer elemento .video-slider es el botón "anterior" y el segundo es "siguiente"
    const sliders = document.querySelectorAll(".video-slider");
    const prevButton = sliders[0];
    const nextButton = sliders[1];

    // Evento para el botón anterior
    prevButton.addEventListener("click", function () {
        videos[currentIndex].classList.add("hidden");
        currentIndex = (currentIndex - 1 + videos.length) % videos.length;
        videos[currentIndex].classList.remove("hidden");
    });
    // Evento para el botón siguiente
    nextButton.addEventListener("click", function () {
        videos[currentIndex].classList.add("hidden");
        currentIndex = (currentIndex + 1) % videos.length;
        videos[currentIndex].classList.remove("hidden");
    });
});