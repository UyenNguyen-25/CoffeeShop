const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    orderCode: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    phoneNumber: {
      type: String,
      require: true,
    },
    fullName: {
      type: String,
      require: true,
    },
    shippingFee: {
      type: Number,
      require: true,
    },
    totalPrice: {
      type: Number,
      require: true,
    },
    promotionCodeId: {
      type: mongoose.Types.ObjectId,
      ref: "promotionCode",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("order", OrderSchema);

module.exports = Order;
