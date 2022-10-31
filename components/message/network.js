const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');

const router = express.Router();

router.get('/', (req, res) => {
    controller.getMessages()
        .then((messageList) => {
            response.success(req, res, messageList, 201);
        }).catch((err) => {
            response.error(req, res, 'Unexpected error', 500, err);
        });
});
router.post('/', (req, res) => {
    controller.addMessage(req.body.user, req.body.message)
        .then((fullMessage) => {
            response.success(req, res, fullMessage, 201);
        }).catch((err) => {
            response.error(req, res, 'Informacion invalida', 400, 'Error en el controlador');
        });
});

module.exports = router;