const express = require("express");
const productController = require("../controllers/productController");
const productRouter = express.Router();

productRouter.get("/get-all-product", productController.getAllProducts);
productRouter.get("/get-product-by-id/:productId", productController.getProductById);

module.exports = productRouter;
