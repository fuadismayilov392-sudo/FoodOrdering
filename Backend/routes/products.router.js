const express = require('express');
const productRouter = express.Router();
const productController = require('../controllers/products.controller');

productRouter.get('/restaurant/:restaurantId', productController.getByRestaurant);
productRouter.get("/products", productController.getAll);
productRouter.post("/products", productController.post);
productRouter.patch("/products/:id", productController.patch);
productRouter.delete("/products/:id", productController.delete);
productRouter.get('/category/:category', productController.getByCategory);

module.exports = productRouter;