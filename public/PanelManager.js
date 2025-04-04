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
        if (accessCode === "a") { // Cambia "sagasgas" por el código que desees
            // Ocultar el formulario de acceso
            formSection.style.display = 'none';

            // Mostrar el panel de control y la gestión de reservas
            panelSection.style.display = 'block';
            gestionReservas.style.display = 'block';
        } else {
            alert("Código de acceso incorrecto. Inténtalo de nuevo.");
        }
    });

    const mostrarForms = document.getElementById('mostrarForms');
    const botones_op = document.getElementById('opBtns').querySelectorAll('input');
    botones_op.forEach(boton => {
        boton.addEventListener('click', () => {
            mostrarForms.style.display = 'flex';
            mostrarForms.firstElementChild.style.display = 'none';
            mostrarForms.lastElementChild.style.display = 'none';

            if (boton.classList.contains('needId')) {
                mostrarForms.firstElementChild.style.display = 'block';
                if(boton.classList.contains('getId')) { mostrarForms.firstElementChild.querySelector('.getId').style.display = 'block';}

                else if (boton.classList.contains('putId')) { 
                    mostrarForms.firstElementChild.querySelector('.putId').style.display = 'block';
                    mostrarForms.firstElementChild.querySelector('.putId').addEventListener('click', () => {
                        mostrarForms.lastElementChild.style.display = 'block';
                    })

                    mostrarForms.lastElementChild.querySelector('.putId').style.display = 'block';
                }

                else if (boton.classList.contains('dltId')) { mostrarForms.firstElementChild.querySelector('.dltId').style.display = 'block';}

            } else if (boton.classList.contains('needForm')) {
                mostrarForms.lastElementChild.style.display = 'block';
                if(boton.classList.contains('post')) { mostrarForms.lastElementChild.querySelector('.post').style.display = 'block';}
            };
        })
    })
});
