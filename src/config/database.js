const mongoose = require("mongoose");

connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://omprakashsahooind_db_user:QD35exdjGYKyCrHZ@namastenode.tumlfg3.mongodb.net/devTinder"
  );
};
module.exports = connectDB;
