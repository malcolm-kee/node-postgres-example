const express = require('express');
const { jwtAuthMiddleware } = require('../auth/auth.middleware');
const productService = require('./product.service');

const productController = express.Router();

productController.get('/', jwtAuthMiddleware, (req, res, next) => {
  productService
    .getProducts()
    .then((products) => res.json(products))
    .catch((err) => next(err));
});

productController.get('/:id', (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).setHeader('WWW-Authenticate', 'Basic').end();
  }

  const [, rawCredentials] = req.headers.authorization.split(' ');
  const [username, password] = decodeBase64(rawCredentials).split(':');

  if (username !== 'i-am-peanut' || password !== 'kaching') {
    return res.status(401).setHeader('WWW-Authenticate', 'Basic').end();
  }

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

const decodeBase64 = (base64String) =>
  Buffer.from(base64String, 'base64').toString('ascii');

module.exports = productController;
