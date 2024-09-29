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
  getProductById: async (req, res) => {
    try {
      const { productId } = req.params;
      if (!productId) {
        return res.status(400).json({ message: "Product ID required" });
      }
      const product = await Product.findOne({ _id: productId });
      if (product) {
        return res.status(200).json({ message: `Product: ${product?._id}`, product });
      } else {
        return res.status(400).json({ message: "Product not found" });
      }
    } catch (error) {
      console.log("Error: ", error);
      return res.status(500).json(error);
    }
  }
};

module.exports = productController;
