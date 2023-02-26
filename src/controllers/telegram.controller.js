
const TelegramBot = require('node-telegram-bot-api');
const DataModel = require("../models/data.model");
const mongoose = require('mongoose');
const dataModel = require('../models/data.model');

const botToken = '5995184582:AAEQJYwsFfiLw76exrotgPRioSyDZilnYIQ';

const bot = new TelegramBot(botToken, { polling: true });


bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    const parts = text.split('/');
    const emails = parts[0];
    const commant = parts[1];
    const commants = "/" + commant;
    console.log(emails); // lapthuan0805@gmail.com
    console.log(commants); // humidity
    console.log(chatId);
    // const nhietdo = "";


    if (commants === '/nhietdo') {
        bot.sendMessage(chatId, "Xin chào " + emails);
        await dataModel.find({ email: emails }).then((data) => {
            console.log(data[0].nhietdo);
            bot.sendMessage(chatId, `Nhiệt đô hiện tại : ${data[0].nhietdo}`);
        })

    } else if (commants === '/doam') {
        bot.sendMessage(chatId, "Xin chào " + emails);
        await dataModel.find({ email: emails }).then((data) => {
            console.log(data[0].doam);
            bot.sendMessage(chatId, `Độ ẩm hiện tại : ${data[0].doam}`);
        })
    }else if (commants === '/luongnuoc') {
        bot.sendMessage(chatId, "Xin chào " + emails);
        await dataModel.find({ email: emails }).then((data) => {
            console.log(data[0].ultrasonic);
            bot.sendMessage(chatId, `Lượng nước hiện tại : ${data[0].ultrasonic}`);
        })
    }else if (commants === '/doamdat') {
        bot.sendMessage(chatId, "Xin chào " + emails);
        await dataModel.find({ email: emails }).then((data) => {
            console.log(data[0].mhsensor);
            bot.sendMessage(chatId, `Độ ẩm đất hiện tại : ${data[0].mhsensor}`);
        })
    }
    else {
        bot.sendMessage(chatId, "Chào hiệp sĩ Đạt \n Các lệnh \n Lấy dữ liệu nhiệt độ <email>/nhietdo \n Lấy dữ liệu độ ẩm <email>/doam \n Lấy dữ liệu lượng nước <email>/luongnuoc \n Lấy dữ liệu độ ẩm đất <email>/doamdat");
    }

    return;


});

