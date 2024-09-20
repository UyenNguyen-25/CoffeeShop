const User = require("../model/User");

const getAll = (req, res) => {
  const users = User.find();

  return res.status(200).json(users);
};

module.exports = { getAll };
