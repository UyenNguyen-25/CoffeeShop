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
  getPromotionCode: async (req, res) => {
    try {
      const { code } = req.params;
      const promotionCode = await PromotionCode.findOne({ code });
  
      if (!promotionCode) {
        return res.status(404).json({ message: 'Code not found' });
      }
  
      res.json(promotionCode);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
};

module.exports = promotionCodeController;
