const express = require("express");
const promotionCodeController = require("../controllers/promotionCodeController");
const promotionCodeRouter = express.Router();

promotionCodeRouter.get("/get-all-promotionCode", promotionCodeController.getAllpromotionCodes);
promotionCodeRouter.get("/promotion-code/:code", promotionCodeController.getPromotionCode);

module.exports = promotionCodeRouter;
