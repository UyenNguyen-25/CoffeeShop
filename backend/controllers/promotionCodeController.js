const PromotionCode = require("../model/PromotionCode");

const promotionCodeController = {
  getAllpromotionCodes: async (req, res) => {
    try {
      const promotionCodes = await PromotionCode.find();
      return res.status(200).json(promotionCodes);
    } catch (error) {
      console.log("Error: ", error);
      return res.status(500).json(error);
    }
  },
};

module.exports = promotionCodeController;
