const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  image: String,
  caption: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", //isme hum bata te hai user konse collection se belong krega
  },
});

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;
