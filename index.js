const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors");
const bcrypt = require("bcryptjs");
const user = require('./src/routes/user.route')
const { connect } = require('./src/connect/config.mogoose')
const bodyParser = require('body-parser')

const port = 5000
const app = express()
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
connect

app.use('/users', user);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))