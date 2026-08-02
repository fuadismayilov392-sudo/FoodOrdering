const express = require('express');
const productRouter = express.Router();
const productController = require('../controllers/products.controller');
const Product = require('../models/product.model');

productRouter.get("/products", productController.getAll);
productRouter.post("/products", productController.post);
productRouter.patch("/products/:id", productController.patch);
productRouter.delete("/products/:id", productController.delete);

module.exports = productRouter;