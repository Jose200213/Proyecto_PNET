document.addEventListener('DOMContentLoaded', () => {
    const formSection = document.getElementById('form-section');
    const panelSection = document.getElementById('panel-section');
    const accessForm = document.getElementById('access-form');

    // Manejar el evento de submit del formulario
    accessForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Evitar el comportamiento por defecto del formulario

        // Ocultar el formulario
        formSection.style.display = 'none';

        // Mostrar el panel de control
        panelSection.style.display = 'block';
    });
});