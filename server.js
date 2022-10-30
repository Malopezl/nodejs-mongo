const express = require('express');
const bodyParser = require('body-parser');

// const response = require('./network/response');

// const router = require('./components/message/network')
const router = require('./network/routes');

var app = express();
/*
* Si se quisiera utilizar url encoded seria de esta manera:
* app.use(bodyParser.urlencoded({ extended: false }));
*/
app.use(bodyParser.json());
// app.use(router);

router(app);


app.use('/app', express.static('public'));

app.listen(3000);
console.log('La aplicacion esta escuchando en http://localhost:3000');