const express = require("express");

const app = express();
app.use("/", (req, res) => {
  res.send("This home page");
});
app.use("/about", (req, res) => {
  res.send("This about page");
});
app.listen(3001, () => {
  console.log("Server is running");
});
