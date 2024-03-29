const store = require("./store");
const { socket } = require("../../socket");

function addMessage(chat, user, message, file) {
  return new Promise((resolve, reject) => {
    if (!chat || !user || !message) {
      console.error("[MESSAGE-CONTROLLER] No hay chat, usuario o mensaje");
      reject("Los datos son incorrectos");
      return false;
    }

    let fileUrl = "";
    if (file) {
      fileUrl = `${process.env.HOST}/app/files/` + file.filename;
    }

    const fullMessage = {
      chat: chat,
      user: user,
      message: message,
      date: new Date(),
      file: fileUrl,
    };

    store.add(fullMessage);

    socket.io.emit("message", fullMessage);

    resolve(fullMessage);
  });
}

function getMessages(filterChat) {
  return Promise.resolve(store.list(filterChat));
}

function updateMessage(id, message) {
  return new Promise(async (resolve, reject) => {
    // console.log(`id: ${id} message: ${message}`);
    if (!id || !message) {
      reject("Invalid data");
      return false;
    }
    const result = await store.updateText(id, message);
    resolve(result);
  });
}

function deleteMessage(id) {
  return new Promise((resolve, reject) => {
    if (!id) {
      reject("Invalid ID");
      return false;
    }
    store
      .remove(id)
      .then(() => {
        resolve();
      })
      .catch((e) => {
        reject(e);
      });
  });
}

module.exports = {
  addMessage,
  getMessages,
  updateMessage,
  deleteMessage,
};
