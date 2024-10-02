const Order = require("../model/Order");
const Payment = require("../model/payment");
const PayOS = require("@payos/node");
require("dotenv");

const payos = new PayOS(
  process.env.CLIENT_ID,
  process.env.API_KEY,
  process.env.CHECK_SUM
);

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
  createPaymentPayOS: async (req, res) => {
    try {
      const { orderId, amount } = req.body;
      const orderDetail = await Order.findById(orderId);
      if(!orderDetail) {
        return res.status(404).json("order not found");
      }
      const order = {
        orderCode: orderDetail.orderCode,
        amount: amount,
        description: "HOA DAT",
        returnUrl: "http://localhost:5173/order-confirmation",
        cancelUrl: "http://localhost:5173",
      }
      console.log(order)
      console.log('tới đây')
      const paymentLink = await payos.createPaymentLink(order);
      console.log('paymentLink', paymentLink);
      // res.redirect(303, paymentLink.checkoutUrl);
      return res.status(200).json({ payUrl: paymentLink.checkoutUrl });
    } catch (error) {
      console.log("Error: ", error);
      return res.status(500).json(error);
    }
  },
  getPayment: async (req, res) => {
    console.log('get payment', req.body);
    try {
      const checkPaymentStatus = req.body.success;
      let status;
        if (checkPaymentStatus) {
            status = "Paid";
            const order = await Order.findOneAndUpdate(
                { orderCode: req.body.data.orderCode },
                { status: "in-transit" }, 
                { new: true }
            );

            if (!order) {
                return res.status(400).json({ message: 'Order not found' });
            }

            const payment = await Payment.findOneAndUpdate(
              { orderId: order._id },
              { paymentStatus: status },
              { new: true }
          );
    
          if (!payment) {
              return res.status(400).json({ message: 'Payment not found' });
          }
        } else {
            status = "Unpaid";
            return res.status(200).json({ message: 'Payment failed, order remains unpaid' });
        }

        
      // res.json();
    } catch (error) {
      console.log(error);
        res.status(500).json('Internal server error.');
    }
    
  }
};

module.exports = paymentController;
