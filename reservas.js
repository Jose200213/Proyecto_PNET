// Calcula el total de tickets seleccionados en el Paso 1
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

// Permite aumentar o disminuir la cantidad de tickets y recalcula el total
function cambiarCantidad(id, delta) {
  const input = document.getElementById(id);
  let cantidad = parseInt(input.value) || 0;
  cantidad += delta;
  if (cantidad < 0) cantidad = 0;
  input.value = cantidad;
  calcularTotal();
}

// Muestra el paso indicado y oculta los demás
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


// Valida cada campo del formulario del Paso 2 usando expresiones regulares
function validarFormularioPaso2() {
  const campos = [
    { 
      id: "nombre", 
      validaciones: [
        { regex: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, error: "El nombre no puede contener números ni caracteres especiales." },
        { regex: /^.{2,}$/, error: "El nombre debe tener al menos 2 caracteres." }
      ]
    },
    { 
      id: "apellido", 
      validaciones: [
        { regex: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, error: "El apellido no puede contener números ni caracteres especiales." },
        { regex: /^.{2,}$/, error: "El apellido debe tener al menos 2 caracteres." }
      ]
    },
    { 
      id: "email", 
      validaciones: [
        { regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, error: "El correo electrónico no es válido." }
      ]
    },
    { 
      id: "telefono", 
      validaciones: [
        { regex: /^\d+$/, error: "El teléfono solo puede contener números." },
        { regex: /^.{7,15}$/, error: "El teléfono debe tener entre 7 y 15 dígitos." }
      ]
    },
    { 
      id: "direccion", 
      validaciones: [
        { regex: /^.{3,}$/, error: "La dirección debe tener al menos 3 caracteres." }
      ]
    },
    { 
      id: "ciudad", 
      validaciones: [
        { regex: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, error: "La ciudad no puede contener números ni caracteres especiales." },
        { regex: /^.{2,}$/, error: "La ciudad debe tener al menos 2 caracteres." }
      ]
    },
    { 
      id: "codigo-postal", 
      validaciones: [
        { regex: /^\d+$/, error: "El código postal debe contener solo números." },
        { regex: /^.{3,10}$/, error: "El código postal debe tener entre 3 y 10 caracteres." }
      ]
    },
    { 
      id: "pais", 
      validaciones: [
        { regex: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, error: "El país no puede contener números ni caracteres especiales." },
        { regex: /^.{2,}$/, error: "El país debe tener al menos 2 caracteres." }
      ]
    }
  ];

  for (const campo of campos) {
    const input = document.getElementById(campo.id);
    const valor = input.value.trim();

    if (valor === "") {
      input.style.border = "4px solid red";
      alert(`El campo ${campo.id.replace("-", " ")} está vacío.`);
      return false; // Detenemos la validación en el primer error
    }

    for (const validacion of campo.validaciones) {
      if (!validacion.regex.test(valor)) {
        input.style.border = "4px solid red";
        alert(validacion.error);
        return false; // Detenemos la validación en el primer error
      }
    }

    input.style.border = ""; // Restablece el borde si el campo es válido
  }

  return true; // Si todos los campos son válidos
}

// Devuelve el total de tickets (para controlar la selección de asientos)
function getTotalTickets() {
  const ticketIds = [
    'entrada-nino',
    'entrada-adulto',
    'entrada-vip',
    'entrada-premium',
    'entrada-ticket',
    'entrada-joven'
  ];
  let total = 0;
  ticketIds.forEach(id => {
    const value = parseInt(document.getElementById(id).value) || 0;
    total += value;
  });
  return total;
}

function updateSeatSummary() {
  // Obtener el total de tickets seleccionados y el desglose por tipo.
  const ticketTypes = [
    { id: "entrada-nino", label: "Niño" },
    { id: "entrada-adulto", label: "Adulto" },
    { id: "entrada-vip", label: "VIP" },
    { id: "entrada-premium", label: "Premium" },
    { id: "entrada-ticket", label: "Ticket MyCinema" },
    { id: "entrada-joven", label: "Carne Joven" }
  ];
  
  let totalTickets = 0;
  let ticketSummary = [];
  ticketTypes.forEach(ticket => {
    const count = parseInt(document.getElementById(ticket.id).value) || 0;
    totalTickets += count;
    if (count > 0) {
      ticketSummary.push(`${ticket.label}: ${count}`);
    }
  });
  
  // Actualizar el resumen de asientos
  const selectedSeats = document.querySelectorAll('.zona-asientos .asiento.selected');
  const summaryDiv = document.getElementById('seat-summary');
  
  if (selectedSeats.length === 0) {
    summaryDiv.style.display = "none";
    summaryDiv.innerHTML = "";
  } else {
    summaryDiv.style.display = "block";
    // Obtenemos los datos del resumen de película, sala y horario (ajusta si es necesario)
    const pelicula = sessionStorage.getItem("nombrePelicula") ? sessionStorage.getItem("nombrePelicula") : "Sin definir";
    const sala = sessionStorage.getItem("nombreSala") ? sessionStorage.getItem("nombreSala") : "Sin definir";
    const horario = sessionStorage.getItem("horaPelicula") ? sessionStorage.getItem("horaPelicula") : "Sin definir";
    const seatList = Array.from(selectedSeats)
      .map(seat => seat.textContent.trim())
      .join(", ");
      
    // Crear el resumen combinando información de tickets y asientos seleccionados
    summaryDiv.innerHTML = `
      <p><strong>Tickets Seleccionados:</strong> ${ticketSummary.join(" | ")}<br>
      <strong>Total de Tickets:</strong> ${totalTickets}</p>
      <p><strong>Asientos Seleccionados:</strong> ${seatList}</p>
      <p><strong>Película:</strong> ${pelicula}<br>
      <strong>Sala:</strong> ${sala}<br>
      <strong>Horario:</strong> ${horario}</p>
    `;
  }
}

// Configura el evento de selección de asientos en el Paso 3
function setupSeatSelection() {
  const seatButtons = document.querySelectorAll('.zona-asientos .asiento');
  seatButtons.forEach(function (seat) {
    // Si el asiento no está ocupado, se puede seleccionar/deseleccionar
    if (!seat.classList.contains('ocupado')) {
      seat.addEventListener('click', function () {
        if (!seat.classList.contains('selected')) {
          const selectedSeats = document.querySelectorAll('.zona-asientos .asiento.selected');
          const maxAllowed = getTotalTickets();
          if (selectedSeats.length >= maxAllowed) {
            alert(`Solo puedes seleccionar hasta ${maxAllowed} asientos.`);
            return;
          }
          seat.classList.add('selected');
        } else {
          seat.classList.remove('selected');
        }
        updateSeatSummary();
      });
    }
  });
}

function validarFormularioPago() {
  const campos = [
    { 
      id: "tarjeta-numero", 
      regex: /^\d{4}-\d{4}-\d{4}-\d{4}$/, 
      error: "El número de tarjeta debe tener el formato XXXX-XXXX-XXXX-XXXX." 
    },
    { 
      id: "tarjeta-nombre", 
      regex: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/, 
      error: "El nombre en la tarjeta debe tener al menos 2 letras." 
    },
    { 
      id: "tarjeta-expiracion", 
      regex: /^(0[1-9]|1[0-2])\/\d{2}$/, 
      error: "La fecha de expiración debe tener el formato MM/AA." 
    },
    { 
      id: "tarjeta-cvc", 
      regex: /^\d{3}$/, 
      error: "El CVC debe ser un número de 3 dígitos." 
    }
  ];

  for (const campo of campos) {
    const input = document.getElementById(campo.id);
    const valor = input.value.trim();
    if (valor === "") {
      input.style.border = "4px solid red";
      alert(`El campo ${campo.id.replace("tarjeta-", "").replace("-", " ")} está vacío.`);
      return false; // Detenemos la validación en el primer error
    } else if (!campo.regex.test(valor)) {
      input.style.border = "4px solid red";
      alert(campo.error);
      return false; // Detenemos la validación en el primer error
    } else {
      input.style.border = ""; // Restablece el borde si el campo es válido
    }
  }

  return true; // Si todos los campos son válidos
}

// Inicialización y eventos
document.addEventListener('DOMContentLoaded', () => {
  calcularTotal();
  mostrarPaso(1);
  setupSeatSelection();

  // Botones del Paso 1
  document.querySelector('#paso-1 .btn-anterior').addEventListener('click', () => {
    window.location.href = 'salas.html';
  });
  document.querySelector('#paso-1 .btn-siguiente').addEventListener('click', () => {
    mostrarPaso(2);
  });


  // Botones del Paso 2 (Info Personal)
  document.querySelector('#paso-2 .btn-anterior').addEventListener('click', () => {
    mostrarPaso(1);
  });
  // Botones del Paso 2 (Info Personal)
  document.querySelector('#paso-2 .btn-siguiente').addEventListener('click', (e) => {
    e.preventDefault(); // Evita cualquier acción predeterminada del botón
  
    const formValido = validarFormularioPaso2(); // Llama a la función de validación
    if (formValido) {
      mostrarPaso(3); // Avanza al Paso 3 si el formulario es válido
    }
  });

  // Botones del Paso 3 (Asientos)
  document.querySelector('#paso-3 .btn-anterior').addEventListener('click', () => {
    mostrarPaso(2);
  });
  document.querySelector('#paso-3 .btn-siguiente').addEventListener('click', () => {
    mostrarPaso(4);
  });

  // Evento del formulario de Pago (Paso 4)
  const formPago = document.getElementById("form-pago");

  if (formPago) {
    formPago.addEventListener("submit", function(e) {
      e.preventDefault(); // Evita el envío del formulario si hay errores

      const formValido = validarFormularioPago(); // Llama a la función de validación
      if (formValido) {
        alert("Has realizado la reserva correctamente");
        // Aquí podrías limpiar el formulario o redirigir a otra página
      }
    });
  }

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

  });
});
