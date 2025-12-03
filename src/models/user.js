const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    passWord: {
      type: String,
    },
    age: {
      type: Number,
      min: 18,
    },
    emaiId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    description: {
      type: String,
      default: "This is a default value",
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female"],
        message: "{VALUE} is not a supported gender",
      },
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

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
