const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "product",
      require: true,
    },
    quuantity: {
      type: Number,
      require: true,
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
