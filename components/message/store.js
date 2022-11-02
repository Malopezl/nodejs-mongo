const Model = require('./model');

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