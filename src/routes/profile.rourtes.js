const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const validateProfileData = require("../validators/validateProfileData");

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
