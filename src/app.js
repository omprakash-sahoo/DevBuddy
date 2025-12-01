const express = require("express");
// const { adminAuth, userAuth } = require("./middleware/auth");

const app = express();
// app.use("/about", (req, res) => {
//   res.send("This about page");
// });
// app.use("/", (req, res) => {
//   res.send("This home page");
// });
// app.get("/about", (req, res) => {c
//   res.send("Hello");
// });
// app.post("/post", (req, res) => {
//   res.send("This is post call");
// });

// ================DYNAMIC ROUTING=================

// http://localhost:3001/about/12/sahoo
// app.post("/about/:user_id/:name", (req, res) => {
//   console.log(req.params);
//   res.send(req.params);
// });

//http://localhost:3001/contact?hello=12&hi=12
// app.post("/contact", (req, res) => {
//   console.log(req.query);
//   res.send(req.query);
// });

// =============== MIDDLEWARE =================

// app.get(
//   "/user",
//   (req, res, next) => {
//     console.log("Handler 1");
//     next(); // go to next handler
//   },
//   (req, res, next) => {
//     console.log("Handler 2");
//     next(); // go to next
//   },
//   (req, res) => {
//     res.send("Final Response");
//   }
// );

//================Handle Auth middle ware for all request============
// app.use("/admin", adminAuth);

// app.get("/admin/getAlluser", (req, res) => {
//   res.send("Get all user");
// });

// app.get("/admin/deleteUser", (req, res) => {
//   res.send("delete a user");
// });

// app.get("/user", userAuth, (req, res) => {
//   res.send("User api callled");
// });
app.get("/getUserData", (req, res) => {
  throw new Error("Ranfom error");
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Somwthing went wrong");
  }
});
app.listen(3001, () => {
  console.log("Server is running");
});
//
//Order of the rout matter if / will keep in top any routs will redirect to /
