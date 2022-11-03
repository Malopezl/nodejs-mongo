const Model = require('./model');

function addMessage(message) {
    const myMessage = new Model(message);
    myMessage.save();
}

async function getMessages(filterChat) {
    return new Promise((resolve, reject) => {
        let filter = {};
        if (filterChat !== null) {
            /* Used RegExp for case-insensitive */
            filter = { chat: filterChat };
        }
        Model.find(filter).select('-__v')
            .populate('user', '-__v')
            .exec((error, populated) => {
                if (error) {
                    reject(error);
                    return false;
                }

                resolve(populated);
            });
    });
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