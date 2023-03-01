const FeedBackModel = require("../models/feedback.model");
const mongoose = require('mongoose');

const sendFeedback = (req, res) => {
    FeedBackModel.find({}).then((data) => {
        res.json({ status: 200, data: data });
    }).catch((err) => {
        res.json({ err: err.message, status: 404 });
    });
}

const newFeedback = async (req, res) => {

    const { name , email, note ,gate } = req.body;

    await FeedBackModel.create({
        name,
        email,
        note,
        gate,
       }).then((data) => {
        res.send({ status: "new 1 row feedback",data: data });
       }).catch((err) => {
        res.send({ status: "error" });
       });


}

module.exports = { sendFeedback,newFeedback }