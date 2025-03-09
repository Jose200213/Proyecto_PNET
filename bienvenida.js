document.addEventListener('DOMContentLoaded', function() {
    const telon = document.getElementById('telon');
    setTimeout(() => {
        telon.classList.add('open');
    }, 1000); // Espera 1 segundo antes de abrir el telón
});