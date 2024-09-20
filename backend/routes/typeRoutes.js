const express = require("express");
const typeController = require("../controllers/typeController");
const typeRouter = express.Router();

typeRouter.get("/get-all-type", typeController.getAllTypes);

module.exports = typeRouter;
