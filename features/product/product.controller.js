const express = require('express');
const authService = require('../auth/auth.service');
const productService = require('./product.service');

const productController = express.Router();

productController.get('/', (req, res, next) => {
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

      productService
        .getProducts()
        .then((products) => res.json(products))
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});

productController.get('/:id', (req, res, next) => {
  productService
    .getProduct(req.params.id)
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          message: 'Not found',
        });
      }
      return res.status(200).json(product);
    })
    .catch((err) => next(err));
});

module.exports = productController;
