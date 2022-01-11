const userService = require('../user/user.service');

exports.register = ({ username, password, email }) =>
  userService.createUser({
    username,
    password,
    email,
  });

exports.login = ({ username, password }) =>
  userService.getUser({ username, password });

exports.isValid = ({ username, password }) =>
  userService.getUser({ username, password }).then((user) => !!user);
