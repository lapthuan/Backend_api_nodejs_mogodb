const mongoose = require("mongoose");

const DataScehma = new mongoose.Schema(
  {
    email: String,
    nhietdo: Number,
    doam: Number,
    mhsensor: Number,
    ultrasonic: Number,
    connect: String,
    control: Array,
    sensor: Array,
    dhtlog: Array,
    mhlog: Array,
    ultralog: Array,
  },
  {
    collection: "data",
  }
);

module.exports = mongoose.model("data", DataScehma);
