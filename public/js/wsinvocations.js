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
         // Mostrar el JSON formateado dentro de un <pre>
         $("#resOutput").html("<pre>" + JSON.stringify(data, null, 2) + "</pre>");
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
      success: function(data) {
         // Mostrar el JSON formateado dentro de un <pre>
         $("#resOutput").html("<pre>" + JSON.stringify(data, null, 2) + "</pre>");
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
         // Mostrar el JSON formateado dentro de un <pre>
         $("#resOutput").html("<pre>" + JSON.stringify(data, null, 2) + "</pre>");
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
         // Mostrar el JSON formateado dentro de un <pre>
         $("#resOutput").html("<pre>" + JSON.stringify(data, null, 2) + "</pre>");
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
         // Mostrar el mensaje de éxito dentro de un <pre>
         $("#resOutput").html("<pre>" + JSON.stringify(data, null, 2) + "</pre>");
      },
      error: function(res) {
         alert("ERROR: " + res.statusText);
      }
   });
   getAllReservas(); 
}

function deleteAllReservas() {
   let myUrl = "/reservas";
   $.ajax({
      type: "DELETE",
      url: myUrl,
      success: function(data) {
         // Mostrar el mensaje de éxito dentro de un <pre>
         $("#resOutput").html("<pre>" + JSON.stringify(data, null, 2) + "</pre>");
      },
      error: function(res) {
         alert("ERROR: " + res.statusText);
      }
   });
}

document.addEventListener('DOMContentLoaded', () => {
   getAllReservas();
});