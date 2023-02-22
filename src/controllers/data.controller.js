const DataModel = require("../models/data.model");
const mongoose = require('mongoose');

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
  const { email, nhietdo, doam, mhsensor, ultrasonic, connect, control, sensor, dhtlog, mhlog, ultralog } = req.body;

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
      dhtlog,
      mhlog,
      ultralog,
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
        'sensor.$[elm].limit': req.body.limit,
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

const update_controlsNewData = (req, res) => {
  const { email, name, status } = req.body;

  DataModel.findOne({ email: email }, (err, user) => {
    if (err) {
      console.log(err);
    } else if (user) {
      DataModel.findOne({
        control: {
          $elemMatch: {
            name: name,
          }
        }
      }, (err, data) => {
        if (err) {
          console.log(err);
        } else if (data) {
          res.send({ status: "name already exist" });
          return;
        } else {

          const query = DataModel.updateOne({ email: email },
            {
              $push: {
                control: {
                  name: name,
                  status: status
                }
              }
            }, {
            new: true,
          });

          if (query instanceof mongoose.Query) {
            query.exec((err, result) => {
              if (err) {
                res.send({ status: "error" });
              } else {
                res.send({ status: "update success" });
              }
            });
          } else {
            res.send({ status: "error" });
            return;
          }
        }
      });
    } else {
      res.send({ status: "email not already exist" });
      return;
    }
  });
}

const update_dhtlog = (req, res) => {
  const { email, nhietdo, doam,createAt } = req.body;

  DataModel.findOne({ email: email }, (err, user) => {
    if (err) {
      console.log(err);
    } else if (user) {

      const query = DataModel.updateOne({ email: email },
        {
          $push: {
            dhtlog: {
              nhietdo: nhietdo,
              doam: doam,
              createAt: createAt,
            }
          }
        }, {
        new: true,
      });

      if (query instanceof mongoose.Query) {
        query.exec((err, result) => {
          if (err) {
            res.send({ status: "error" });
          } else {
            res.send({ status: "update success" });
          }
        });
      } else {
        res.send({ status: "error" });
        return;
      }
    } else {
      res.send({ status: "email not already exist" });
      return;
    }
  });
}

const update_mhlog = (req, res) => {
  const { email,mh,createAt } = req.body;

  DataModel.findOne({ email: email }, (err, user) => {
    if (err) {
      console.log(err);
    } else if (user) {

      const query = DataModel.updateOne({ email: email },
        {
          $push: {
            mhlog: {
              mh: mh,
              createAt: createAt,
            }
          }
        }, {
        new: true,
      });

      if (query instanceof mongoose.Query) {
        query.exec((err, result) => {
          if (err) {
            res.send({ status: "error" });
          } else {
            res.send({ status: "update success" });
          }
        });
      } else {
        res.send({ status: "error" });
        return;
      }
    } else {
      res.send({ status: "email not already exist" });
      return;
    }
  });
}


const update_ultralog = (req, res) => {
  const { email, ultra ,createAt } = req.body;

  DataModel.findOne({ email: email }, (err, user) => {
    if (err) {
      console.log(err);
    } else if (user) {

      const query = DataModel.updateOne({ email: email },
        {
          $push: {
            ultralog: {
              ultra: ultra,
              createAt: createAt,
            }
          }
        }, {
        new: true,
      });

      if (query instanceof mongoose.Query) {
        query.exec((err, result) => {
          if (err) {
            res.send({ status: "error" });
          } else {
            res.send({ status: "update success" });
          }
        });
      } else {
        res.send({ status: "error" });
        return;
      }
    } else {
      res.send({ status: "email not already exist" });
      return;
    }
  });
}
// const reset_esp = async (req, res) => {
//   const { token, lname, fname } = req.body;

//   const user = jwt.verify(token, JWT_SECRET, (err, res) => {
//     if (err) {
//       return "token expired";
//     }
//     return res;
//   });
//   console.log(user);
//   const useremail = user.email;
//   console.log(useremail);
//   const oldUser = await UserModel.findOne({ email: useremail });
//   try {
//     await UserModel.updateOne(
//       {
//         email: useremail,
//       },
//       {
//         $set: {
//           lname: lname,
//           fname: fname,
//         },
//       }
//     );
//     UserModel.findOne({ email: useremail })
//       .then((data) => {
//         res.send({ status: "Update Success", data: data });
//       })
//       .catch((error) => {
//         res.send({ status: "error", data: error });
//       });
//   } catch (error) {
//     console.log(error);
//     res.json({ status: "Something Went Wrong" });
//   }
// };

module.exports = { getAllData, data_details, update_dht, create_data, update_sensor, update_controls, update_controlsNewData,update_dhtlog,update_mhlog,update_ultralog };
