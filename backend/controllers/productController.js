const Product = require("../model/Product");

const productController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find();
      return res.status(200).json(products);
    } catch (error) {
      console.log("Error: ", error);
      return res.status(500).json(error);
    }
  },
};

module.exports = productController;
