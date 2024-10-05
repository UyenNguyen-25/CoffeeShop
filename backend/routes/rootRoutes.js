const express = require("express");
const userRouter = require("./userRoutes");
const authRouter = require("./authRoutes");
const orderRouter = require("./orderRoutes");
const orderItemRouter = require("./orderItemRoutes");
const paymentRouter = require("./paymentRoutes");
const productRouter = require("./productRoutes");
const promotionCodeRouter = require("./promotionCodeRoutes");
const typeRouter = require("./typeRoutes");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.use("/auth", authRouter);
router.use("/api/user", userRouter);
router.use("/api/order", orderRouter);
router.use("/api/orderItem", orderItemRouter);
router.use("/api/payment", paymentRouter);
router.use("/api/product", productRouter);
router.use("/api/promotion", promotionCodeRouter);
router.use("/api/type", typeRouter);

module.exports = router;
