const validator = require("validator");
const signUpValidation = (req) => {
  if (!validator.isEmail(req.body.emailId)) {
    throw new Error("In valid Email Id.");
  }
};
module.exports = {
  signUpValidation,
};
