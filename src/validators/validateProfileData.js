const validateProfileData = (req) => {
  const validData = ["firstName", "lastName", "emailId", "age", "gender"];
  const isValidData = Object.keys(req.body).every((data) => {
    return validData.includes(data);
  });
};

module.exports = validateProfileData;
