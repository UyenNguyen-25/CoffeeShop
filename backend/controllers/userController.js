const User = require("../model/User");

const userController = {
  getAll: async (req, res) => {
    const users = await User.find().exec();
    if (!users?.length) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json(users);
  },
  getUserDetail: async (req, res) => {
    try {
      const search = req.query.search;

      const foundUser =
        (await User.findOne({ phoneNumber: search })) ||
        (await User.findOne({ email: search }));

      if (!foundUser) {
        return res.status(404).json({ message: "Not Found" });
      }

      return res.status(200).json(foundUser);
    } catch (error) {
      return res.status(500).json("Internal server error");
    }
  },
  createNewUser: async (req, res) => {
    const newUserData = req.body;
    var phoneNumber;

    if (!newUserData) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (newUserData.phoneNumber) {
      phoneNumber =
        newUserData.phoneNumber.slice(0, 1) === "0"
          ? newUserData.phoneNumber.replace(0, "84")
          : newUserData.phoneNumber.slice(0, 2) === "84" &&
            newUserData.phoneNumber;

      const duplicatePhone = await User.findOne({
        phoneNumber: newUserData.phoneNumber,
      }).exec();

      if (duplicatePhone) {
        return res.status(409).json({ message: "Phone number existed" });
      }
    }

    const duplicateEmail = await User.findOne({
      email: newUserData.email,
    }).exec();

    if (duplicateEmail) {
      return res.status(409).json({ message: "Phone number existed" });
    }

    const hashedPwd = await bcrypt.hash(newUserData.password, 10);

    const user = await User.create({
      ...newUserData,
      phoneNumber,
      password: hashedPwd,
    });

    if (user) {
      res.status(200).json({ message: `Create success` });
    } else {
      res.json({ message: "Invalid user data received" });
    }
  },
  updateUser: async (req, res) => {
    const requestUser = req.body;

    //confirm data
    if (!requestUser.user_id) {
      return res.status(400).json({ message: "id is required" });
    }

    const user = await User.findById(requestUser.user_id).exec();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //check duplicate
    const duplicate =
      (await User.findOne({
        phoneNumber: requestUser.phoneNumber,
      }).exec()) ||
      (await User.findOne({
        email: requestUser.email,
      }).exec());

    if (
      duplicate &&
      duplicate?._id.toString() !== requestUser.user_id.toString()
    ) {
      return res.status(409).json({ message: "Phone number/Email existed" });
    }

    //hash password
    if (requestUser.password && requestUser.password.length > 0) {
      user.password = await bcrypt.hash(requestUser.password, 10);
    }

    user = requestUser;
    await user.save();
    const updatedUser = await User.findById(requestUser.user_id).exec();

    res.status(200).json({
      message: `${user.phoneNumber} updated success`,
      updatedUser,
    });
  },
  deleteUser: async (req, res) => {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ message: "User ID required" });
    }

    const deletedUser = await User.findByIdAndDelete(user_id).exec();

    res
      .status(200)
      .json({ message: `${deletedUser?.phoneNumber} deleted success` });
  },
};

module.exports = userController;
