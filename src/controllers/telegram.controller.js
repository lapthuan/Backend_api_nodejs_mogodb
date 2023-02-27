
const TelegramBot = require('node-telegram-bot-api');
const DataModel = require("../models/data.model");
const mongoose = require('mongoose');
const dataModel = require('../models/data.model');

const botToken = '5995184582:AAEQJYwsFfiLw76exrotgPRioSyDZilnYIQ';

const bot = new TelegramBot(botToken, { polling: true });


bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === '/nhietdo') {

        await dataModel.find({ idtelegram: chatId }).then((data) => {
            console.log(data[0].nhietdo);
            bot.sendMessage(chatId, `Nhiệt đô hiện tại : ${data[0].nhietdo}`);
        }).catch((error) => {
            bot.sendMessage(chatId, `Không tìm thấy id chat`);
        })

    } else if (text === '/doam') {

        await dataModel.find({ idtelegram: chatId }).then((data) => {
            console.log(data[0].doam);
            bot.sendMessage(chatId, `Độ ẩm hiện tại : ${data[0].doam}`);
        }).catch((error) => {
            bot.sendMessage(chatId, `Không tìm thấy id chat`);
        })
    } else if (text === '/luongnuoc') {

        await dataModel.find({ idtelegram: chatId }).then((data) => {
            console.log(data[0].ultrasonic);
            bot.sendMessage(chatId, `Lượng nước hiện tại : ${data[0].ultrasonic}`);
        }).catch((error) => {
            bot.sendMessage(chatId, `Không tìm thấy id chat`);
        })
    } else if (text === '/doamdat') {

        await dataModel.find({ idtelegram: chatId }).then((data) => {
            console.log(data[0].mhsensor);
            bot.sendMessage(chatId, `Độ ẩm đất hiện tại : ${data[0].mhsensor}`);
        }).catch((error) => {
            bot.sendMessage(chatId, `Không tìm thấy id chat`);
        })
    }
    else if(text === '/start'){
        bot.sendMessage(chatId, "Các lệnh \n Lấy dữ liệu nhiệt độ /nhietdo \n Lấy dữ liệu độ ẩm /doam \n Lấy dữ liệu lượng nước /luongnuoc \n Lấy dữ liệu độ ẩm đất /doamdat");
    }else {
        bot.sendMessage(chatId,"Xin chào");
    }

    return;


});

