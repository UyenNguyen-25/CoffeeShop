const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    quantity: {
      type: Number,
      require: true,
    },
    typeId: {
      type: mongoose.Types.ObjectId,
      ref: "Type",
    },
    code: {
      type: String,
    },
    category: {
      type: String,
      require: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      require: true,
    },
    img: {
      type: String,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("product", ProductSchema);

module.exports = Product;
