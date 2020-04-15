/// <reference types="cypress" />

const UserRepository = require("./userRepository");
const repository = new UserRepository();

module.exports = (on, config) => {
    on('task', {
      "user": {
        "deleteAll": () => repository.deleteAll(),
        "insert": (object) => repository.insertNew(object),
        "ids": () => repository.recoverIds()
      }
    });    
}
