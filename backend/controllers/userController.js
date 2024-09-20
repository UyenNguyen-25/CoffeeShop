const User = require("../model/User");

const userController = {
  getAll: async (req, res) => {
    const users = await User.find().exec();

    return res.json(users);
  },
};

module.exports = userController;
