const UserModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

const getAllUser = (req, res) => {
  UserModel.find({}, function (err, user) {
    if (err) {

      res.json({ err: err.message, status: 404 });
    }
    res.json({ status: 200, data: user });
  });
};

const registers = async (req, res) => {
  const { fname, lname, email, password, userType } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await UserModel.findOne({ email });

    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    await UserModel.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
      userType,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.json({ error: "User not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: 60 * 24 * 7,
    });

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "InvAlid Password" });
};

const userData = (req, res) => {
  const { token } = req.body;
  console.log(token);
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    console.log(user);

    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }

    const useremail = user.email;
    console.log(useremail);

    UserModel.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) { }
};

const deleteUser = (req, res) => {
  const { userid } = req.body;
  try {
    UserModel.deleteOne({ __id: userid }, function (err, res) {
      console.log(err);
    });
    res.send({ status: "Ok", data: "Deleted" });
  } catch (error) {
    console.log(error);
  }
};

const changePassword = async (req, res) => {
  const { newpassword, tokenold, oldpassword } = req.body;

  const user = jwt.verify(tokenold, JWT_SECRET, (err, res) => {
    if (err) {
      return "token expired";
    }
    return res;
  });
  console.log(user);
  const useremail = user.email;
  console.log(useremail);
  const oldUser = await UserModel.findOne({ email: useremail });

  bcrypt.compare(oldpassword, oldUser.password, async (err, result) => {
    if (result === true) {
      try {

        const encryptedPassword = await bcrypt.hash(newpassword, 10);
        await UserModel.updateOne(
          {
            email: useremail,
          },
          {
            $set: {
              password: encryptedPassword,
            },
          }
        );

        res.json({ status: "verified" });
      } catch (error) {
        console.log(error);
        res.json({ status: "Something Went Wrong" });
      }
    } else {
      res.json({ error: "Passwords don't match" });
    }
  });


};
const editUser = async (req, res) => {
  const { token, lname, fname } = req.body;

  const user = jwt.verify(token, JWT_SECRET, (err, res) => {
    if (err) {
      return "token expired";
    }
    return res;
  });
  console.log(user);
  const useremail = user.email;
  console.log(useremail);
  const oldUser = await UserModel.findOne({ email: useremail });
  try {
    await UserModel.updateOne(
      {
        email: useremail,
      },
      {
        $set: {
          lname: lname,
          fname: fname,
        },
      }
    );
    UserModel.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "Update Success", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });    
  } catch (error) {
    console.log(error);
    res.json({ status: "Something Went Wrong" });
  }



};
module.exports = { getAllUser, registers, loginUser, userData, deleteUser, changePassword, editUser };
