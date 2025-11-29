const express = require("express");

const app = express();
app.use("/about", (req, res) => {
  res.send("This about page");
});
app.use("/", (req, res) => {
  res.send("This home page");
});
app.listen(3001, () => {
  console.log("Server is running");
});
//Order of the rout matter if / will keep in top any routs will redirect to /
