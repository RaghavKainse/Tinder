const validator = require("validator");

const emailValidator = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("all fieleds are require");
  }
  if (!emailId || !password) {
    throw new Error("Enter all fieleds!");
  }
  if (!validator.isEmail(emailId)) {
    throw new Error("Invailid Email address!");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Please entre the strong password!");
  }
};

module.exports = emailValidator;
