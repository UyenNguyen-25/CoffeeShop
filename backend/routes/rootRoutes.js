const express = require("express");
const userRouter = require("./userRoutes");

const router = express.Router();

router.use("/", userRouter);

module.exports = router;
