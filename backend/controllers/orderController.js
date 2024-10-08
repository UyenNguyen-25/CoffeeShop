const Order = require("../model/Order");
const OrderItem = require("../model/OrderItem");
const Payment = require("../model/payment");
const sendMail = require("../util/sendMail");

const orderController = {
  getAllorders: async (req, res) => {
    try {
      const orders = await Order.find();
      return res.status(200).json(orders);
    } catch (error) {
      console.log("Error: ", error);
      return res.status(500).json(error);
    }
  },
  generateUniqueOrderCode: async () => {
    const lastOrder = await Order.findOne().sort({ orderCode: -1 }).exec();

    if (lastOrder) {
      return lastOrder.orderCode >= 18 ? lastOrder.orderCode + 1 : 18;
    } else {
      return 18;
    }
  },

  createOrder: async (req, res) => {
    try {
      const {
        email,
        phoneNumber,
        fullName,
        shippingFee,
        totalPrice,
        discountAmount,
        shippingAddress,
        payment_method,
        orderItems,
      } = req.body;
  
      const orderCode = await orderController.generateUniqueOrderCode();
      console.log("orderCode", orderCode);
      console.log("orderItems", orderItems);
  
      const savedOrderItems = await Promise.all(
        orderItems.map(async (item) => {
          if (item.isMix && item.mixDetails && item.mixDetails.length > 0) {
            const mixDetails = await Promise.all(
              item.mixDetails.map(async (mixItem) => {
                const newMixItem = new OrderItem({
                  productId: mixItem.productId,
                  quantity: item.quantity, 
                  price: (item.price * mixItem.percentage) / 100, 
                });
                return await newMixItem.save();
              })
            );
  
            return mixDetails;
          } else {
            const newOrderItem = new OrderItem({
              productId: item.productId,
              quantity: item.quantity,
              typeId: item.typeId,
              price: item.price,
            });
            return await newOrderItem.save();
          }
        })
      );
  
      const flatSavedOrderItems = savedOrderItems.flat();
  
      const newOrder = new Order({
        orderCode,
        orderItems: flatSavedOrderItems.map((item) => item._id),
        email,
        phoneNumber,
        fullName,
        shippingFee,
        totalPrice,
        shippingAddress,
        payment_method,
        discountAmount,
        status: "pending",
      });
  
      await newOrder.save();
  
      const newPayment = new Payment({
        orderId: newOrder._id,
        orderCode: newOrder.orderCode,
        paymentMethod: payment_method,
        paymentStatus: "Unpaid",
      });
      await newPayment.save();
  
      sendMail(email, newOrder);
  
      return res.status(201).json(newOrder);
    } catch (error) {
      console.log("Error: ", error);
      return res.status(500).json(error);
    }
  },
  
};

module.exports = orderController;
