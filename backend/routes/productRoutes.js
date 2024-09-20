const express = require("express");
const productController = require("../controllers/productController");
const productRouter = express.Router();

productRouter.get("/get-all-product", productController.getAllProducts);

module.exports = productRouter;
