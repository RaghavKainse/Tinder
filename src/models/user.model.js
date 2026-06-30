const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt= require("bcryptjs")

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxLength: 40,
    minLength: 4,
  },
  lastName: {
    type: String,
    required: true,
    maxLength: 40,
    minLength: 4,
  },
  emailId: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    minLength: 6,
    required: true,
  },
  age: {
    type: Number,
    min: 18,
  },
  gender: {
    type: String,
    validate(value) {
      if (!["male", "female", "others"].includes(value)) {
        throw new Error("Gender data is not vailid!");
      }
    },
  },
});

userSchema.methods.getJWT = function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, "raghavdev123", {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.verifingPass = async function (giveByUser) {
  const user = this;
  const hassedPass = user.password;
  const iseVailidPassword = await bcrypt.compare(giveByUser, hassedPass);
  return iseVailidPassword;
};
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
