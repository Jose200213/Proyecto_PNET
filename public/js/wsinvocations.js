function getHello(){
   $.ajax({
      type: "GET",
      url: "http://localhost:8080/",
      success: function(data){ $("#resGetHello").html(data); },
      error: function(res){ alert("ERROR: "+ res.statusText); }
   });
}

function getHelloAndGoodbye(){
   $.when(
      $.ajax({
         type: "GET",
         url: "http://localhost:8080/hello" }),
      $.ajax({
         type: "GET",
         url: "http://localhost:8080/goodbye" })
   ).done(function(helloRes, goodbyeRes) {
      $("#resGetHello").html(helloRes[0]);
      $("#resGetGoodbye").html(goodbyeRes[0]);}
   ).fail(function(res) {
      alert("ERROR: " + res.statusText);
   });
}

function getAllReservas() {
   let myUrl = "/reservas";
   $.ajax({
       type: "GET",
       dataType: "json",
       url: myUrl,
       success: function(data) {
           // Limpiar la tabla antes de agregar nuevas filas
           $("#reservasTable tbody").empty();

           // Recorrer los datos y agregarlos a la tabla
           data.forEach(reserva => {
               let row = `
                   <tr>
                       <td>${reserva._id}</td>
                       <td>${reserva.nomCliente}</td>
                       <td>${reserva.nomCine}</td>
                       <td>${reserva.nomPelicula}</td>
                       <td>${reserva.tipoSala}</td>
                       <td>${reserva.horaPelicula}</td>
                       <td>${reserva.numEntradas}</td>
                       <td>${reserva.idAsientos.join(", ")}</td>
                       <td>${reserva.precioTotal}</td>
                   </tr>
               `;
               $("#reservasTable tbody").append(row);
           });
       },
       error: function(res) {
           console.error("ERROR:", res.status, res.statusText);
       }
   });
}

function getReserva(reservaId) {
   let myUrl = "/reservas/" + reservaId;
   $.ajax({
       type: "GET",
       dataType: "json",
       url: myUrl,
       success: function(reserva) {
           // Limpiar la tabla antes de agregar la reserva
           $("#reservasTable tbody").empty();

           // Agregar la reserva a la tabla
           let row = `
               <tr>
                   <td>${reserva._id}</td>
                   <td>${reserva.nomCliente}</td>
                   <td>${reserva.nomCine}</td>
                   <td>${reserva.nomPelicula}</td>
                   <td>${reserva.tipoSala}</td>
                   <td>${reserva.horaPelicula}</td>
                   <td>${reserva.numEntradas}</td>
                   <td>${reserva.idAsientos.join(", ")}</td>
                   <td>${reserva.precioTotal}</td>
               </tr>
           `;
           $("#reservasTable tbody").append(row);
       },
       error: function(res) {
           let mensaje = JSON.parse(res.responseText);
           alert("ERROR: " + mensaje.msg);
       }
   });
}

function postReserva() {
   let reservaData = {
       nomCliente: $("#nomCliente").val(),
       nomCine: $("#nomCine").val(),
       nomPelicula: $("#nomPelicula").val(),
       tipoSala: $("#tipoSala").val(),
       horaPelicula: $("#horaPelicula").val(),
       numEntradas: parseInt($("#numEntradas").val()),
       idAsientos: $("#idAsientos").val().split(","),
       precioTotal: parseFloat($("#precioTotal").val())
   };

   $.ajax({
       type: "POST",
       url: "/reservas",
       contentType: "application/json",
       dataType: "json",
       data: JSON.stringify(reservaData),
       success: function(data) {
           alert("Reserva añadida correctamente.");
           getAllReservas(); // Actualizar la tabla
       },
       error: function(res) {
           alert("ERROR: " + res.statusText);
       }
   });
}

function putReserva(reservaId) {
   let reservaData = {
       nomCliente: $("#nomCliente").val(),
       nomCine: $("#nomCine").val(),
       nomPelicula: $("#nomPelicula").val(),
       tipoSala: $("#tipoSala").val(),
       horaPelicula: $("#horaPelicula").val(),
       numEntradas: parseInt($("#numEntradas").val()),
       idAsientos: $("#idAsientos").val().split(","),
       precioTotal: parseFloat($("#precioTotal").val())
   };

   let myUrl = "/reservas/" + reservaId;

   $.ajax({
       type: "PUT",
       url: myUrl,
       contentType: "application/json",
       dataType: "json",
       data: JSON.stringify(reservaData),
       success: function(data) {
           alert("Reserva modificada correctamente.");
           getAllReservas(); // Actualizar la tabla
       },
       error: function(res) {
           alert("ERROR: " + res.statusText);
       }
   });
}

function deleteReserva(reservaId) {
   let myUrl = "/reservas/" + reservaId;
   $.ajax({
       type: "DELETE",
       url: myUrl,
       success: function(data) {
           alert("Reserva eliminada correctamente.");
           getAllReservas(); // Actualizar la tabla
       },
       error: function(res) {
           alert("ERROR: " + res.statusText);
       }
   });
}

function deleteAllReservas() {
   let myUrl = "/reservas";
   $.ajax({
       type: "DELETE",
       url: myUrl,
       success: function(data) {
           alert("Todas las reservas eliminadas correctamente.");
           getAllReservas(); // Actualizar la tabla
       },
       error: function(res) {
           alert("ERROR: " + res.statusText);
       }
   });
}

document.addEventListener('DOMContentLoaded', () => {
   getAllReservas();
});