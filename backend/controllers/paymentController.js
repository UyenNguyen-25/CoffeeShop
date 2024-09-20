const Payment = require("../model/payment");

const paymentController = {
  getAllPayments: async (req, res) => {
    try {
      const payments = await Payment.find();
      return res.status(200).json(payments);
    } catch (error) {
      console.log("Error: ", error);
      return res.status(500).json(error);
    }
  },
};

module.exports = paymentController;
