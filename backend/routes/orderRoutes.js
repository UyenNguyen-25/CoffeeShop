const express = require("express");
const orderController = require("../controllers/orderController");
const orderRouter = express.Router();

orderRouter.get("/get-all-order", orderController.getAllorders);

module.exports = orderRouter;
