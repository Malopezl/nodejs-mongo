const express = require('express');
const bodyParser = require('body-parser');
const router = require('./network/routes');
const db = require('./db');
require('dotenv').config({ path: './.env' });

/* Conexion a la base de datos */
db(process.env.DB_CONNECT);

const app = express();

/* Codificacion */
app.use(bodyParser.json());

/* Se carga el servidor a las rutas para que inicie */
router(app);

app.use('/app', express.static('public'));

app.listen(process.env.APP_PORT, () => {
    console.log(`La aplicacion esta escuchando en http://localhost:${process.env.APP_PORT}`);
});