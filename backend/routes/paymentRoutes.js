const express = require("express");
const paymentController = require("../controllers/paymentController");
const paymentRouter = express.Router();

paymentRouter.get("/get-all-payment", paymentController.getAllPayments);

module.exports = paymentRouter;
