const express = require("express");

const app = express();
// app.use("/about", (req, res) => {
//   res.send("This about page");
// });
// app.use("/", (req, res) => {
//   res.send("This home page");
// });
// app.get("/about", (req, res) => {
//   res.send("Hello");
// });
// app.post("/post", (req, res) => {
//   res.send("This is post call");
// });

// ================DYNAMIC ROUTING=================

// http://localhost:3001/about/12/sahoo
app.post("/about/:user_id/:name", (req, res) => {
  console.log(req.params);
  res.send(req.params);
});

//http://localhost:3001/contact?hello=12&hi=12
app.post("/contact", (req, res) => {
  console.log(req.query);
  res.send(req.query);
});

app.listen(3001, () => {
  console.log("Server is running");
});
//Order of the rout matter if / will keep in top any routs will redirect to /
