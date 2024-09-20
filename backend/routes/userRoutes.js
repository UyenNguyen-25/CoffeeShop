const express = require("express");
const userController = require("../controllers/userController");
const userRouter = express.Router();

userRouter.get("/get-all-user", userController.getAllUsers);

module.exports = userRouter;
