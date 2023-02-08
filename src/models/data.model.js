const mongoose = require("mongoose");

const DataScehma = new mongoose.Schema(
  {
    email: String,
    nhietdo: Number,
    doam: Number,
    mhsensor: Number,
    ultrasonic: Number,
    connect: String,
    control: Number
  },
  {
    collection: "data",
  }
);

module.exports = mongoose.model("data", DataScehma);
