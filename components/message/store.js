const db = require('mongoose');
const Model = require('./model');
require('dotenv').config();

db.Promise = global.Promise;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`;
console.log(uri);

db.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
console.log('[DB] Conectado con exito');


function addMessage(message) {
    const myMessage = new Model(message);
    myMessage.save();
}

async function getMessages(filterUser) {
    let filter = {};
    if (filterUser !== null) {
        /* Used RegExp for case-insensitive */
        filter = { user: new RegExp(filterUser, "i") };
    }
    const messages = await Model.find(filter).select('-__v');
    return messages;
}

async function updateText(id, message) {
    const updatedMessage = await Model.findByIdAndUpdate(id, { message: message }, { new: true }).select('-__v');
    return updatedMessage;
}

function removeMessage(id) {
    return Model.findByIdAndDelete(id);
}

module.exports = {
    add: addMessage,
    list: getMessages,
    updateText: updateText,
    remove: removeMessage,
}