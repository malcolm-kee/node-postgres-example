const express = require('express');
const productService = require('./product.service');

const productController = express.Router();

productController.get('/', (_, res, next) => {
  productService
    .getProducts()
    .then((products) => res.json(products))
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
