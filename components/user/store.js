const Model = require('./model');

function addUser(user) {
    const myUser = new Model(user);
    return myUser.save();
}

async function getUsers(filterUser) {
    let filter = {};
    if (filterUser !== null) {
        /* Used RegExp for case-insensitive */
        filter = { name: new RegExp(filterUser, "i") };
    }
    const users = await Model.find(filter).select('-__v');
    return users;
}

module.exports = {
    add: addUser,
    list: getUsers,
}