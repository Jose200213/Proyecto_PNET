function calcularTotal() {
  const precios = {
      'entrada-nino': 6,
      'entrada-adulto': 7.5,
      'entrada-vip': 10,
      'entrada-premium': 20,
      'entrada-ticket': 4,
      'entrada-joven': 6.7
  };

  let total = 0;
  for (const [id, precio] of Object.entries(precios)) {
      const cantidad = parseInt(document.getElementById(id).value) || 0;
      total += cantidad * precio;
  }

  document.getElementById('total').value = `${total.toFixed(2)} €`;
  return total.toFixed(2);
}

function cambiarCantidad(id, delta) {
  const input = document.getElementById(id);
  let cantidad = parseInt(input.value) || 0;
  cantidad += delta;
  if (cantidad < 0) cantidad = 0;
  input.value = cantidad;
  calcularTotal();
}

function mostrarPaso(paso) {
  const pasos = document.querySelectorAll('.paso-contenido');
  pasos.forEach((p, index) => {
      p.style.display = (index + 1 === paso) ? 'block' : 'none';
  });

  const indicadores = document.querySelectorAll('.paso');
  indicadores.forEach((indicador, index) => {
      indicador.style.backgroundColor = (index + 1 === paso) ? '#D3D3D3' : '#fff';
  });
}

// Inicializar el primer paso y agregar eventos para los botones
document.addEventListener('DOMContentLoaded', () => {
  calcularTotal();
  mostrarPaso(1);

  document.querySelector('.btn-anterior').addEventListener('click', () => {
      window.location.href = 'salas.html';
  });

  document.querySelector('.btn-siguiente').addEventListener('click', () => {
      const pasoActual = document.querySelector('.paso-contenido:not([style*="display: none"])');
      const pasoSiguiente = pasoActual.nextElementSibling;
      if (pasoSiguiente && pasoSiguiente.classList.contains('paso-contenido')) {
          const pasoIndex = Array.from(document.querySelectorAll('.paso-contenido')).indexOf(pasoSiguiente) + 1;
          if (pasoIndex === 3 && !validarFormulario()) {
              return;
          }
          mostrarPaso(pasoIndex);
      }
  });

  const formPago = document.getElementById("form-pago");

  formPago.addEventListener("submit", function(e) {
    e.preventDefault();
    
    // Validar que todos los campos requeridos estén completos
    const inputs = formPago.querySelectorAll("input[required]");
    let valid = true;
    inputs.forEach(input => {
      if (!input.value.trim()) {
        valid = false;
      }
    });

    if (valid) {
      alert("Has realizado la reserva correctamente");
      // Aquí podrías limpiar el formulario o redirigir a otra página
    } else {
      alert("Por favor, completa todos los campos");
    }
  });


  /* %%%%%%%%%% Usar variables de salas.html %%%%%%%%%% */
  console.log(document.querySelectorAll(".resumen p"))
  const infoCompra = document.querySelectorAll(".resumen p");

  infoCompra.forEach(info => {
  switch(info.getAttribute("alt")) {
    case "Cine":
      info.textContent = "" + info.getAttribute("alt") + ": " + sessionStorage.getItem("nombreCine");
      break;

    case "Pelicula":
      info.textContent = "" + info.getAttribute("alt") + ": " + sessionStorage.getItem("nombrePelicula");
      break;

    case "Sala":
      info.textContent = "" + info.getAttribute("alt") + ": " + sessionStorage.getItem("nombreSala");
      break;

    case "Horario":
      info.textContent = "" + info.getAttribute("alt") + ": " + sessionStorage.getItem("horaPelicula");
      break;
  }
  })
});