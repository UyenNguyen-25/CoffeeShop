const express = require("express");
const paymentController = require("../controllers/paymentController");
const paymentRouter = express.Router();

paymentRouter.get("/get-all-payment", paymentController.getAllPayments);
paymentRouter.post("/create-payment", paymentController.createPaymentPayOS);
paymentRouter.post("/get-payment", paymentController.getPayment);

module.exports = paymentRouter;
