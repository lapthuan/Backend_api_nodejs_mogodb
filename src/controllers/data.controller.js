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

module.exports = { getAllData, data_details };
