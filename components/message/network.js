const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');

const router = express.Router();

router.get('/', (req, res) => {
    console.log(req.headers);
    /* se pueden definir headers de respuesta */
    res.header({
        "custom-header": "Nuestro valor personalizado"
    });
    // res.send('Lista de mensajes');
    response.success(req, res, 'Lista de mensajes');
});
router.post('/', (req, res) => {
    // console.log(req.query);
    // console.log(req.body);
    controller.addMessage(req.body.user, req.body.message)
        .then((fullMessage) => {
            response.success(req, res, fullMessage, 201);
        }).catch((err) => {
            response.error(req, res, 'Informacion invalida', 400, 'Error en el controlador');
        });

    // if (req.query.error == "ok") {
    //     response.error(req, res, 'Error inesperado', 500, 'Es solo una simulacion de los errores');
    // } else {
    //     response.success(req, res, 'Creado correctamente', 201);
    // }
    // res.status(201).send({ error: '', body: 'Creado correctamente' });
});

module.exports = router;