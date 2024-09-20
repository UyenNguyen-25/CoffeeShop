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
    },
    paymentStatus: {
      type: String,
      default: "unpaid",
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("payment", PaymentSchema);

module.exports = Payment;
