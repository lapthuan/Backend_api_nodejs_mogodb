const mongoose = require("mongoose");

const DataScehma = new mongoose.Schema(
  {
    email: String,
    dht: [
      {
        nhietdo: Number,
        doam: Number,
      },
    ],
    sensor: [
      {
        mhsensor: Number,
        ultrasonic: Number,
      },
    ],
    connect: String,
    control: Number,
    dhtlog: Object,
  },
  {
    collection: "dhts",
  }
);

module.exports = mongoose.model("dhts", DataScehma);
