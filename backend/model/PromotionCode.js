const mongoose = require("mongoose");

const PromotionCodeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      require: true,
    },
    quantity: {
      type: Number,
      require: true,
    },
    discount: {
      type: Number,
      require: true,
    },
    expireDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const PromotionCode = mongoose.model("promotionCode", PromotionCodeSchema);

module.exports = PromotionCode;
