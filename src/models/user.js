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

// const mongoose = require("mongoose");

// const UserSchema = mongoose.Schema({

// });

// const User = mongoose.model("User", UserSchema);

// module.export = User;

// // const mongoose = require("mongoose");

// // const userSchema = mongoose.Schema({

// // });
// // const User = mongoose.model("User", userSchema);

// // module.exports = User;
