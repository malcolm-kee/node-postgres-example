const authService = require('./auth.service');

exports.basicAuthMiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).setHeader('WWW-Authenticate', 'Basic').end();
  }

  const [, credentialsRaw] = req.headers.authorization.split(' ');
  const [username, password] = Buffer.from(credentialsRaw, 'base64')
    .toString('ascii')
    .split(':');

  authService
    .isValid({
      username,
      password,
    })
    .then((isValid) => {
      if (!isValid) {
        return res.status(401).setHeader('WWW-Authenticate', 'Basic').end();
      }

      next();
    })
    .catch((err) => next(err));
};
