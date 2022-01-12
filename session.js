const { v4: uuid } = require('uuid');

const sessionStore = {};

exports.createSession = (value) => {
  const id = uuid();
  sessionStore[id] = value;
  return id;
};

exports.getSession = (sessionId) => sessionStore[sessionId];
