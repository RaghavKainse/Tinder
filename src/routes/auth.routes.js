const express = require("express");
const router = express.Router();
const velidations = require("../validators/emailValidator.js");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model.js");
const auth = require("../middlewares/auth.middleware.js");

router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password } = req.body;
    velidations(req);
    const hassedPass = await bcrypt.hash(password, 10);
    const savedUser = new User({
      firstName,
      lastName,
      emailId,
      password: hassedPass,
    });
    const userSaved = await savedUser.save();
    const token = await userSaved.getJWT();
    res.cookie("token", token);
    res.status(200).json({
      message: "cookie added success",
    });
  } catch (error) {
    res.send("Err: " + error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!emailId || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invailid credentials");
    }
    const isPasswordVailid = await user.verifingPass(password);
    if (isPasswordVailid) {
      user.password = undefined;
      let token = user.getJWT(req);
      res.cookie("token", token);
      res.status(200).json({
        message: "Login success!",
        data: user,
      });
    } else {
      throw new Error("Invailid credentials");
    }
  } catch (error) {
    res.send("Err: " + error.message);
  }
});

router.post('/logout',(req,res)=>{
  res.cookie('token', null, {
    expires:new Date(Date.now())
  }).send("Logout successful!!")
})


module.exports = router;
