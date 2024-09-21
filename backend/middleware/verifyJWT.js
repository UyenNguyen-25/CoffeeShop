const jwt = require("jsonwebtoken");
require("dotenv").config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    req.phoneNumber = decoded.UserInfo.phoneNumber;
    req.email = decoded.UserInfo.email;
    req.fullName = decoded.UserInfo.fullName;
    req.role = decoded.UserInfo.role;
    req.user_id = decoded.UserInfo.user_id;
    next();
  });
};

module.exports = { verifyJWT };
