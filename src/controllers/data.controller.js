const DataModel = require("../models/data.model");

const getAllData = (req, res) => {
  DataModel.find({}, function (err, datas) {
    if (err) {
      res.json({ err: err.message, status: 404 });
    }
    res.json({ status: 200, data: datas });
  });
};

const data_details = (req, res) => {
  const email_detail = req.params.email;
  DataModel.findOne({ email: email_detail })
    .then((data) => {
      res.send({ status: "ok", data: data });
    })
    .catch((error) => {
      res.send({ status: "error", data: error });
    });
};

const update_dht = (req, res) => {
  const { nhietdo, doam, email, connect, control } = req.body;

  DataModel.findOneAndUpdate(
    { email: req.body.email },
    {
      $set: {
        nhietdo: req.body.nhietdo,
        doam: req.body.doam,
        mhsensor: req.body.mhsensor,
        ultrasonic: req.body.ultrasonic,
        connect: req.body.connect,
      },
    },
    { new: true },
    (err, data) => {
      if (err) {
        res.send(err);
      } else res.json(data);
    }
  );
};

const create_data = async (req, res) => {
  const { email, nhietdo, doam, mhsensor, ultrasonic, connect, control } =
    req.body;

  try {
    await DataModel.create({
      email,
      nhietdo,
      doam,
      mhsensor,
      ultrasonic,
      connect,
      control,
    });
    res.send({ status: "Create 1 row" });
  } catch (error) {
    res.send({ status: "error" });
  }
};
module.exports = { getAllData, data_details, update_dht, create_data };
