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

module.exports = {
    add: addMessage,
    list: getMessages,
    //get
    //update
    //delete
}