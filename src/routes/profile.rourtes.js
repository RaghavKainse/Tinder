const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const validateProfileData = require("../validators/validateProfileData");
const validator = require("validator");
const bcrypt = require("bcryptjs");

router.patch("/profile/passwordupdate", auth, async (req, res) => {
  try {
    let { password } = req.body;
    if (!password) throw new Error("Password is required");
    else if (!validator.isStrongPassword(password))
      throw new Error("enter the strong password");
    let hashedPassword = await bcrypt.hash(password, 10);
    let updatedUser = await req.user.updateOne({ password: hashedPassword });
    res.json({
      message: "Data updated success!",
    });
  } catch (error) {
    res.send("Err: " + error.message);
  }
});

router.patch("/profile/edit", auth, async (req, res) => {
  try {
    if (validateProfileData(req)) {
      throw new Error("Please provide required fieled!!");
    }
    let logedInUser = req.user;
    Object.keys(req.body).forEach((key) => (logedInUser[key] = req.body[key]));
    await logedInUser.save();
    res.json({
      message: "Data update success",
      data: logedInUser,
    });
  } catch (error) {
    res.send("Err" + error.message);
  }
});

router.get("/profile", auth, (req, res) => {
  try {
    const profileData = req.user;
    profileData.password = undefined;
    res.send(profileData);
  } catch (error) {
    res.send("Err" + error.message);
  }
});

module.exports = router;
