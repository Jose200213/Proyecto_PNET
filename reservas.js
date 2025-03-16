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
function validarFormulario() {
  const campos = [
    { id: "nombre", regex: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/, error: "El nombre debe tener al menos 2 letras." },
    { id: "apellido", regex: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/, error: "El apellido debe tener al menos 2 letras." },
    { id: "email", regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, error: "El correo electrónico no es válido." },
    { id: "telefono", regex: /^\+?\d{7,15}$/, error: "El teléfono debe contener solo números y tener entre 7 y 15 dígitos." },
    { id: "direccion", regex: /^.{3,}$/, error: "La dirección debe tener al menos 3 caracteres." },
    { id: "ciudad", regex: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/, error: "La ciudad debe tener al menos 2 letras." },
    { id: "codigo-postal", regex: /^[A-Za-z0-9\s\-]{3,10}$/, error: "El código postal debe tener entre 3 y 10 caracteres." },
    { id: "pais", regex: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/, error: "El país debe tener al menos 2 letras." }
  ];

  let valido = true;
  let errores = [];

  campos.forEach(campo => {
    const input = document.getElementById(campo.id);
    const valor = input.value.trim();
    if (valor === "") {
      input.style.border = "4px solid red";
      errores.push("Completa todos los campos.");
      valido = false;
    } else if (!campo.regex.test(valor)) {
      input.style.border = "4px solid red";
      errores.push(campo.error);
      valido = false;
    } else {
      input.style.border = "";
    }
  });
  
  if (!valido) {
    alert("Corrige los siguientes errores:\n" + errores.join("\n"));
  }
  return valido;
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
    const pelicula = document.getElementById('resumen-pelicula') ? document.getElementById('resumen-pelicula').textContent : "Sin definir";
    const sala = document.getElementById('resumen-sala') ? document.getElementById('resumen-sala').textContent : "Sin definir";
    const horario = document.getElementById('resumen-horario') ? document.getElementById('resumen-horario').textContent : "Sin definir";
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
  document.querySelector('#paso-2 .btn-siguiente').addEventListener('click', (e) => {
    e.preventDefault();
    if (!validarFormulario()) {
      // Si hay errores, se muestra el mensaje y se queda en el Paso 2
      return;
    }
    // Solo se avanza si la validación es correcta
    mostrarPaso(3);
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
  if (formPago) {
    formPago.addEventListener("submit", function(e) {
      e.preventDefault();
      const inputs = formPago.querySelectorAll("input[required]");
      let valid = true;
      inputs.forEach(input => {
        if (!input.value.trim()) {
          input.style.border = "4px solid red";
          valid = false;
        } else {
          input.style.border = "";
        }
      });
      if (valid) {
        alert("Has realizado la reserva correctamente");
        // Aquí podrías limpiar el formulario o redirigir a otra página
      } else {
        alert("Por favor, completa todos los campos");
      }
    });
  }
});
