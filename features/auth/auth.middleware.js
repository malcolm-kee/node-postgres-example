const authService = require('./auth.service');
const jwt = require('./jwt');

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

exports.cookieAuthMiddleware = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({
      message: 'Please login',
    });
  }

  next();
};

exports.jwtAuthMiddleware = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (token) {
    try {
      jwt.verify(token);

      return next();
    } catch (err) {}
  }

  return res.status(401).json({
    message: 'Please login',
  });
};
