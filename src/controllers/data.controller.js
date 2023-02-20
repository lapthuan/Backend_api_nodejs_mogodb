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
  const { email, nhietdo, doam, mhsensor, ultrasonic, connect, control,limit } =
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
      sensor,
      limit,
    });
    res.send({ status: "Create 1 row" });
  } catch (error) {
    res.send({ status: "error" });
  }
};

const update_sensor = (req, res) => {

  DataModel.updateOne(

    { email: req.body.email, 'sensor.name': req.body.name },
    {
      $set: {
        'sensor.$[elm].status': req.body.status,
        'sensor.$[elm].timeout': req.body.timeout,
        'sensor.$[elm].timeword': req.body.timeword,
        'sensor.$[elm].nofi': req.body.nofi,
      }
    },
    {
      muti: false,
      arrayFilters: [{ 'elm.name': req.body.name }]
    },
    (err, data) => {
      if (err) {

        res.send({ status: "error" });

      } else {
        res.send({ status: "update success" });
      }
    }
  );
}

const update_controls = (req, res) => {

  DataModel.updateOne(

    { email: req.body.email, 'control.name': req.body.name },
    {
      $set: {
        'control.$[elm].status': req.body.status,
      }
    },
    {
      muti: false,
      arrayFilters: [{ 'elm.name': req.body.name }]
    },
    (err, data) => {
      if (err) {

        res.send({ status: "error" });

      } else {
        res.send({ status: "update success" });
      }
    }
  );
}


module.exports = { getAllData, data_details, update_dht, create_data, update_sensor,update_controls };
