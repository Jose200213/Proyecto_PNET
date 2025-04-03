const express = require('express');
const app = express();
const logger = require('morgan');
const http = require('http');
const path = require('path');
const cors = require('cors');
const { connectDb } = require('./routes/db');
const PORT = process.env.PORT || 8080;
const baseAPI = '/api/v1';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(cors());

app.get('/hello', (req, res) => {
      res.status(200).send('Hello World!');
});

app.get('/goodbye', (req, res) => {
   res.status(200).send('Hello World!');
});

app.get('/', (req, res) => {
   res.status(200).send('Hello World!');
});

app.use(express.static(path.join(__dirname, 'public')));

/** Añadir para 'routes' */
const reservas = require('./routes/reservas');
app.use('/reservas', reservas);

const server = http.createServer(app);

/** Sin routes */
/*server.listen(PORT, function () {
   console.log('Server up and running on localhost:' + PORT);
});*/

/** Con routes */
async function startServer() {
   try {
      await connectDb();
      server.listen(PORT, function () {
         console.log("Server up and running on localhost:" + PORT);
      });
   } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      process.exit(1);
   }
}

startServer();



