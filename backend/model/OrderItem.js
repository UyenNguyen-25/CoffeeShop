const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "product",
      require: true,
    },
    quantity: {
      type: Number,
      require: true,
    },
    typeId: {
      type: mongoose.Types.ObjectId,
      ref: "type",
    },
    price: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

const OrderItem = mongoose.model("orderItem", OrderItemSchema);

module.exports = OrderItem;
