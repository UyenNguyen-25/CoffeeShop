const mongoose = require("mongoose");

const TypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

const Type = mongoose.model("type", TypeSchema);

module.exports = Type;
