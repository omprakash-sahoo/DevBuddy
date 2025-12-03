const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
app.use(express.json());

app.post("/signup", async (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send("Sign up Successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("SignUp Error" + err.message);
  }
});

app.get("/user", async (req, res) => {
  try {
    const userEmail = await User.findOne({ emailId: "rahul@gmai.com" });
    if (!userEmail) return res.status(404).send("User not found");
    res.send(userEmail);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const getAlluser = await User.find({});
    res.send(getAlluser);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/delete", async (req, res) => {
  try {
    const firstName = req.body.firstName;
    if (!firstName) return res.status(400).send("emailId is required");
    const deletedUser = await User.deleteMany({ firstName: firstName });
    if (!deletedUser) return res.status(404).send("User not found");
    res.send("Deleted the user");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.patch("/update", async (req, res) => {
  const userId = req.body.userId;
  const updateUser = await User.findByIdAndUpdate({ _id: userId }, req.body, {
    // returnDocument: "before",
    lean: false,
  });

  res.send(updateUser);
});

connectDB()
  .then(() => {
    app.listen(3001, () => {
      console.log("Server is Running");
    });
  })
  .catch((err) => {
    console.log(err);
  });
