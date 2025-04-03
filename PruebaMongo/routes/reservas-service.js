const { getCollection } = require('./db');
const { ObjectId } = require('mongodb');
const reservas = function () {};

/** Añadir a BD */
reservas.prototype.add = async (movieData) => {
   const reservasCollection = await getCollection("reservas");
   return await reservasCollection.insertOne(movieData);
};

/** Recuperar de BD */
reservas.prototype.get = async (_id) => {
   const reservasCollection = await getCollection("reservas");
   return await reservasCollection.findOne({ _id:ObjectId.createFromHexString(_id) });
};

reservas.prototype.getAll = async () => {
   const reservasCollection = await getCollection("reservas");
   return await reservasCollection.find({}).toArray();
};

/** Actualizar BD */
reservas.prototype.update = async (_id, updatedMovie) => {
   const reservasCollection = await getCollection("reservas");
   return await reservasCollection.updateOne({_id: ObjectId.createFromHexString(_id)}, { $set: updatedMovie });
};

/** Eliminar de BD */
reservas.prototype.remove = async (_id) => {
   const reservasCollection = await getCollection("reservas");
   return await reservasCollection.deleteOne({_id: ObjectId.createFromHexString(_id)}); 
};

reservas.prototype.removeAll = async () => {
   const reservasCollection = await getCollection("reservas");
   return await reservasCollection.deleteMany({});
};
   

module.exports = new reservas();
