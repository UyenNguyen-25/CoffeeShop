const express = require("express");
const orderItemController = require("../controllers/orderItemController");
const orderItemRouter = express.Router();

orderItemRouter.get("/get-all-orderItem", orderItemController.getAllOrderItem);

module.exports = orderItemRouter;
