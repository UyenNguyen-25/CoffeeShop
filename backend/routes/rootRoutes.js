const express = require("express");
const userRouter = require("./userRoutes");
const authRouter = require("./authRoutes");

const router = express.Router();

router.use("/auth", authRouter);

router.use("/api/user", userRouter);

module.exports = router;
