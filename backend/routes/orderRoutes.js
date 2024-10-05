const express = require("express");
const orderController = require("../controllers/orderController");
const orderRouter = express.Router();

orderRouter.get("/get-all-order", orderController.getAllorders);
orderRouter.post("/create-order", orderController.createOrder);

module.exports = orderRouter;
