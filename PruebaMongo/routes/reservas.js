const express = require('express');
const router = express.Router();
/** Con routes */
const reservasService = require('./reservas-service');

/** Declarar sin routes */
/*let reservas = [
   {
      "title": "Jurassic Park",
      "director": "Steven Spielberg",
      "year": 1993
   },
   {
      "title": "The Lion King",
      "director": ["Rob Minkoff", "Roger Allers"],
      "year": 1994
   }
];*/


/** Recuperar todas las pelis */
router.get("/", async (req,res) => {
   /** Sin routes */
   /*res.status(200).send(reservas);*/

   /** Con routes */
   try {
      const reservas = await reservasService.getAll();
      if (reservas.length == 0) {
         res.status(404).send({msg: 'No se encontraron reservas' });
      } else {
         res.status(200).send(reservas);
      }
   } catch (error) {
      res.status(500).send({ msg: error.message });
   }
})

/** Crear nueva peli */
router.post("/", async (req,res) => {
   /** Sin routes */
   /*reservas.push(req.body);
   res.status(201).send("¡Película añadida!");*/

   /** Con routes */
   const reserva = req.body;
   if (Object.keys(reserva).length == 0) {
      res.status(400).send({ msg: 'La reserva está vacía' });
   } else {
      try {
         await reservasService.add(reserva);
         res.status(201).send({ msg: '!Reserva realizada!'});
      } catch (error) {
         res.status(500).send({ msg: error.message });
      }
   }
})

/** Eliminar todo */
router.delete("/", async (req,res) => {
   /** Sin routes */
   /*reservas = [];
   res.status(200).send("¡Películas borradas!");*/

   /** Con routes */
   try {
      await reservasService.removeAll();
      res.status(200).send({ msg: '!Reservas eliminadas!' });
   } catch (error) {
      console.error("Error al realizar la reserva:", error);
      res.status(500).send({ msg: error.message });
   }
})

/** Recuperar una por titulo */
router.get("/:_id", async (req,res) => {
   /** Sin routes */
   /*let title = req.params.title;
   res.status(200).send(reservas.filter(m => m.title === title));*/

   /** Con routes, cambiado el titulo por el id que genera Mongo */
   const { _id } = req.params;
   try {
      const reserva = await reservasService.get(_id);
      if (!reserva) {
         res.status(404).send({ msg: 'Reserva no encontrada' });
      } else {
         res.status(200).send(reserva);
      }
   } catch (error) {
      res.status(500).send({ msg: error.message });
   }
})

/* Actualizar pelicula por titulo */
router.put("/:_id", async (req,res) => {
   /** Sin routes */
   /*let title = req.params.title;
   reservas.splice(reservas.findIndex(m => m.title === title), 1);
   reservas.push(req.body);
   res.status(200).send("¡Película actaulizada!")*/

   /** Con routes, cambiando titulo por id de Mongo */
   const { _id } = req.params;
   const reservaData = req.body;
   try {
      const result = await reservasService.update(_id, reservaData);
      if (result.modifiedCount === 0) {
         return res.status(404).send({msg: "Reserva no encontrada o sin cambios."});
      }
      res.status(200).send({ msg: 'Reserva actualizada!' });
   } catch (error) {
      res.status(500).send({ msg: error.message });
   }
})

/** Borrar pelicula por titulo */
router.delete("/:_id", async (req,res) => {
   /** Sin routes */
   /*let title = req.params.title;
   reservas = reservas.filter(m => m.title !== title);
   res.status(200).send("¡Película eliminada!");*/

   /** Con routes */
   const { _id } = req.params;
   try {
      const result = await reservasService.remove(_id);
      if (!result) {
         return res.status(404).send({msg: "Reserva no encontrada o sin cambios."});
      }
      res.status(200).send({ msg: 'Reserva eliminada!' });
   } catch (error) {
      res.status(500).send({ msg: error.message });
   }
})

module.exports = router;