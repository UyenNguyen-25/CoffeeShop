const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const authController = {
  login: async (req, res) => {
    const { phoneNumber, email, password } = req.body;
    if ((!phoneNumber || !email) && !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    var foundUser;

    if (phoneNumber) {
      console.log(phoneNumber.slice(0, 2));

      foundUser = await User.findOne({
        phoneNumber:
          phoneNumber.slice(0, 1) === "0"
            ? phoneNumber.replace(0, "84")
            : phoneNumber.slice(0, 2) === "84" && phoneNumber,
      });
    } else {
      foundUser = await User.findOne({
        email,
      });
    }

    if (!foundUser) {
      return res.status(404).json({ message: "User Not Found" });
    }

    bcrypt.compare(password, foundUser.password, async (err, response) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const accessToken = jwt.sign(
        {
          UserInfo: {
            phoneNumber: foundUser.phoneNumber,
            email: foundUser.email,
            fullName: foundUser.fullName,
            role: foundUser.role,
            user_id: foundUser._id,
          },
        },
        ACCESS_TOKEN_SECRET,
        { expiresIn: "10m" }
      );

      const refreshToken = jwt.sign(
        {
          UserInfo: {
            phoneNumber: foundUser.phoneNumber,
            email: foundUser.email,
            fullName: foundUser.fullName,
            role: foundUser.role,
            user_id: foundUser._id,
          },
        },
        REFRESH_TOKEN_SECRET,
        {
          expiresIn: "7d",
        }
      );

      // Create secure cookie with refresh token
      res.cookie("jwt", refreshToken, {
        httpOnly: true, //accessible only by web server
        secure: true, //https
        sameSite: "none", //cross-site cookie
        maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
      });

      // Send accessToken containing username and roles
      res.json({ accessToken });
    });
  },
  refresh: async (req, res) => {
    const cookies = req.cookies;
    console.log("req.cookies: ", req.cookies);

    if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

    const refreshToken = cookies.jwt;

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });
      console.log("decoded: ", decoded);

      const userInfo = { ...decoded.UserInfo };

      const foundUser = await User.findOne({
        phoneNumber:
          userInfo.phoneNumber.slice(0, 1) === "0"
            ? userInfo.phoneNumber.replace(0, "84")
            : userInfo.phoneNumber.slice(0, 2) === "84" && userInfo.phoneNumber,
      });

      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

      const accessToken = jwt.sign(
        {
          UserInfo: {
            phoneNumber: foundUser.phoneNumber,
            email: foundUser.email,
            fullName: foundUser.fullName,
            role: foundUser.role,
            user_id: foundUser._id,
          },
        },
        ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      res.json({ accessToken });
    });
  },
  forgotPassword: async (req, res) => {
    const { phoneNumber, email, newPassword } = req.body;
    if (!phoneNumber || (!email && !password)) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const foundUser = phoneNumber
      ? await User.findOne({
          phoneNumber,
        })
      : await User.findOne({
          email,
        });

    if (!foundUser) {
      return res.status(404).json({ message: "User Not Found" });
    }
    if (newPassword && user_password.length > 0) {
      foundUser.password = await bcrypt.hash(newPassword, 10);
      foundUser.save();
    } else {
      return res.json({ message: "Set New Password Fail" });
    }
    return res.status(200).json({
      message: `updated success`,
      newUser: foundUser,
    });
  },
  logout: async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    res.json({ message: "Cookie cleared" });
  },
};

module.exports = authController;
