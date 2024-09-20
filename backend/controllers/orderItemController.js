const Order = require("../model/Order");
const OrderItem = require("../model/OrderItem");

const orderItemController = {
  getAllOrderItem: async (req, res) => {
    try {
      const orderItems = await OrderItem.find();
      return res.status(200).json(orderItems);
    } catch (error) {
      console.log("Error: ", error);
      return res.status(500).json(error);
    }
  },
};

module.exports = orderItemController;
