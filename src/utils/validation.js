const validator = require("validator");

const validateEditProfileData = (req) => {
  const allowedEdit = [
    "firstName",
    "lastName",
    "age",
    "emailId",
    "skills",
    "avatar",
    "about",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEdit.includes(field)
  );
  return isEditAllowed;
};
module.exports = { validateEditProfileData };
