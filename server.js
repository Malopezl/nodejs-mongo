const express = require('express');
const app = express();
const server = require('http').Server(app);

const bodyParser = require('body-parser');
const socket = require('./socket');
const db = require('./db');
const router = require('./network/routes');
require('dotenv').config({ path: './.env' });

/* Conexion a la base de datos */
db(process.env.DB_CONNECT);

/* Codificacion */
app.use(bodyParser.json());

socket.connect(server);

/* Se carga el servidor a las rutas para que inicie */
router(app);

app.use('/app', express.static('public'));

server.listen(process.env.APP_PORT, () => {
    console.log(`La aplicacion esta escuchando en http://localhost:${process.env.APP_PORT}`);
});