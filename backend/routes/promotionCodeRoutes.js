const express = require("express");
const promotionCodeController = require("../controllers/promotionCodeController");
const promotionCodeRouter = express.Router();

promotionCodeRouter.get("/get-all-promotionCode", promotionCodeController.getAllpromotionCodes);

module.exports = promotionCodeRouter;
