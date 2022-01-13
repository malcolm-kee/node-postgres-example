const bcrypt = require('bcrypt');
const userService = require('../user/user.service');
const omit = require('../../utility/omit');

exports.register = ({ username, password, email }) =>
  bcrypt.hash(password, 3).then((hashedPassword) =>
    userService.createUser({
      username,
      password: hashedPassword,
      email,
    })
  );

exports.login = ({ username, password }) =>
  userService.getUser({ username }).then((storedUser) => {
    if (!storedUser) {
      return undefined;
    }

    return bcrypt
      .compare(password, storedUser.password)
      .then((isMatch) =>
        isMatch ? omit(storedUser, ['password']) : undefined
      );
  });

exports.isValid = ({ username, password }) =>
  userService
    .getUser({ username })
    .then((user) => !!user && bcrypt.compare(password, user.password));
