const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  passWord: {
    type: String,
  },
  age: {
    type: Number,
  },
  emaiId: {
    type: String,
  },
});
const User = mongoose.model("User", userSchema);

module.exports = User;
