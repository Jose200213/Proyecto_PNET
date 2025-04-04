document.addEventListener('DOMContentLoaded', () => {
    const formSection = document.getElementById('form-section');
    const panelSection = document.getElementById('panel-section');
    const accessForm = document.getElementById('access-form');
    const gestionReservas = document.getElementById('gestionReservas');

    // Asegurarse de que la sección de gestión de reservas esté oculta al inicio
    gestionReservas.style.display = 'none';

    // Manejar el evento de submit del formulario
    accessForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Evitar el comportamiento por defecto del formulario

        const accessCode = document.getElementById('access-code').value;

        // Verificar el código de acceso
        if (accessCode === "sagasgas") { // Cambia "sagasgas" por el código que desees
            // Ocultar el formulario de acceso
            formSection.style.display = 'none';

            // Mostrar el panel de control y la gestión de reservas
            panelSection.style.display = 'block';
            gestionReservas.style.display = 'block';
        } else {
            alert("Código de acceso incorrecto. Inténtalo de nuevo.");
        }
    });
});