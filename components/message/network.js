const express = require('express');
const multer = require('multer');

const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

const upload = multer({
    dest: 'uploads/',
});

router.get('/', (req, res) => {
    /* This is used to filter messages if needed */
    const filterMessages = req.query.chat || null;

    controller.getMessages(filterMessages)
        .then((messageList) => {
            response.success(req, res, messageList, 201);
        }).catch((err) => {
            response.error(req, res, 'Unexpected error', 500, err);
        });
});
router.post('/', upload.single('file'), (req, res) => {
    controller.addMessage(req.body.chat, req.body.user, req.body.message, req.file)
        .then((fullMessage) => {
            response.success(req, res, fullMessage, 201);
        }).catch((err) => {
            response.error(req, res, 'Informacion invalida', 400, err);
        });
});
router.patch('/:id', (req, res) => {
    controller.updateMessage(req.params.id, req.body.message)
        .then((data) => {
            response.success(req, res, data, 200);
        }).catch((err) => {
            response.error(req, res, 'Error interno', 500, err);
        });
});
router.delete('/:id', (req, res) => {
    controller.deleteMessage(req.params.id)
        .then(() => {
            response.success(req, res, `Mensaje ${req.params.id} eliminado`, 200);
        }).catch((err) => {
            response.error(req, res, 'Error interno', 500, err);
        });
});

module.exports = router;