const Order = require("../model/Order");

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
};

module.exports = orderController;
