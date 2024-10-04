const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    paymentMethod: {
      type: String,
      default: "COD",
    },
    orderId: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: "order"
    },
    paymentStatus: {
      type: String,
      default: "unpaid",
    },
    orderCode: {
      type: Number,
      required: true, 
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("payment", PaymentSchema);

module.exports = Payment;
