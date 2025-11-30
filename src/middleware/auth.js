const adminAuth = (req, res, next) => {
  console.log("Admin auth is checked");
  const token = "xyz";
  const authorization = token == "xyz";
  if (!authorization) {
    res.status(401).send("Unauthorized");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("Admin auth is checked");
  const token = "xyz";
  const authorization = token == "xyz";
  if (!authorization) {
    res.status(401).send("Unauthorized");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
