const bcrypt = require('bcrypt');
const userService = require('../user/user.service');

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

    const { password: storedPw, ...userData } = storedUser;

    return bcrypt
      .compare(password, storedPw)
      .then((isMatch) => (isMatch ? userData : undefined));
  });

exports.isValid = ({ username, password }) =>
  userService
    .getUser({ username })
    .then((user) => !!user && bcrypt.compare(password, user.password));
