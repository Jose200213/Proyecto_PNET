const uri = "mongodb+srv://DiZaster:ProyectoPNET_DB!@cdg-pnet-2025.6k0cl.mongodb.net/?retryWrites=true&w=majority&appName=CDG-pnet-2025";

const dbName = "MyCinema";

const { MongoClient, ServerApiVersion } = require("mongodb");
const clientOptions = {
   serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
   }
};
const client = new MongoClient(uri, clientOptions);
let db;

async function connectDb() {
   try {
      await client.connect();
      db = client.db(dbName);
      console.log("Conexión correcta a la base de datos");
   } catch (error) {
      console.error("Error conectando a base de datos:", error);
      throw error;
   }
}

function getCollection(collectionName) {
   if (!db) {
      throw new Error("No hay conexión a la base de datos"); 
   }
   return db.collection(collectionName);
}

module.exports = {
   connectDb, 
   getCollection
};

