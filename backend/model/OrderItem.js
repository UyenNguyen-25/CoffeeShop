const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "product",
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
    isMix: {
      type: Boolean,
      required: true,
      default: false, 
    },
    mixDetails: [
      {
        productId: {
          type: mongoose.Types.ObjectId,
          ref: "product",
          required: true,
        },
        percentage: {
          type: Number,
          required: true,
          min: 0,
          max: 100,
        },
      },
    ],
  },
  { timestamps: true }
);

const OrderItem = mongoose.model("orderItem", OrderItemSchema);

module.exports = OrderItem;
