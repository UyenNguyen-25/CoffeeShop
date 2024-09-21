const Type = require("../model/Type");

const typeController = {
  getAllTypes: async (req, res) => {
    try {
      const types = await Type.find();
      return res.status(200).json(types);
    } catch (error) {
      console.log("Error: ", error);
      return res.status(500).json(error);
    }
  },
};

module.exports = typeController;
