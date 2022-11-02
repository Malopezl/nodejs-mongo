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
    // list.push(message);
    const myMessage = new Model(message);
    myMessage.save();
}

async function getMessages() {
    // return list;
    const messages = await Model.find().select('-__v');
    return messages;
}

async function updateText(id, message) {
    // const myMessage = await Model.findById(id).select('-__v');

    // myMessage.message = message;
    // const newMessage = await myMessage.save();
    const updatedMessage = await Model.findByIdAndUpdate(id, { message: message }, { new: true }).select('-__v');
    return updatedMessage;
}

module.exports = {
    add: addMessage,
    list: getMessages,
    //get
    updateText: updateText,
    //delete
}