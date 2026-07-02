const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const cookie = req.cookies.token;
    if (!cookie) {
      return res.status(401).json({
        message: "User is unauthorized",
      });
    }
    const veryfideUser = await jwt.verify(cookie, "raghavdev123");
    const user = await User.findById(veryfideUser._id);
    if (!user._id) {
      return res.status(401).json({
        message: "User not found!",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    res.send("Err:" + error.message);
  }
};

module.exports = auth;
