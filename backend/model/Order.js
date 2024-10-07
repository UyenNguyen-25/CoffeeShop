const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    orderCode: {
      type: Number,
      require: true,
    },
    orderItems: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "orderItem",
      required: true,
    }],
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
    discountAmount: {
      type: Number,
      default: 0, 
    },
    shippingAddress: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      require: true,
    },
    isMix: {
      type: Boolean,
      require: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("order", OrderSchema);

module.exports = Order;
