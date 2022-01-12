const express = require('express');
const authService = require('./auth.service');

const authController = express.Router();

authController.post('/login', (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: 'Username and password are required.',
    });
  }

  authService
    .login({
      username,
      password,
    })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: 'Incorrect username/password.',
        });
      }
      return res
        .status(200)
        .setHeader('Set-Cookie', [
          `email=${user.email}; Path=/`,
          `username=${user.username}; Path=/`,
        ])
        .json(user);
    })
    .catch((err) => next(err));
});

authController.post('/register', (req, res, next) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({
      message: 'Username, password, and email are required.',
    });
  }

  authService
    .register({
      username,
      password,
      email,
    })
    .then(() => {
      return res.status(201).json({
        message: 'Register successfully',
      });
    })
    .catch((err) => next(err));
});

authController.post('/logout', (_, res) =>
  res
    .status(200)
    .setHeader('Set-Cookie', [
      `email=none; Path=/; Expires=${new Date(0).toUTCString()}`,
      `username=none; Path=/; Expires=${new Date(0).toUTCString()}`,
    ])
    .end()
);

module.exports = authController;
