const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect(process.env.MONGOOSE_URL)
    .then(() => {
      console.log("connected to db");
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = connectDB;
