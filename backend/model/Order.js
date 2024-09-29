const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    orderCode: {
      type: String,
      require: true,
    },
    orderItems: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderItem",
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
  },
  { timestamps: true }
);

const Order = mongoose.model("order", OrderSchema);

module.exports = Order;
