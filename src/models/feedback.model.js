const mongoose = require("mongoose");

const FeedBackScehma = new mongoose.Schema(
  {
    name: String,
    email: String,
    note: String,
    gate: Number
  },
  {
    collection: "feedback",
  }
);

module.exports = mongoose.model("feedback", FeedBackScehma);
