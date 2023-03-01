
const TelegramBot = require('node-telegram-bot-api');
const DataModel = require("../models/data.model");
const mongoose = require('mongoose');
const dataModel = require('../models/data.model');

const botToken = '5995184582:AAEQJYwsFfiLw76exrotgPRioSyDZilnYIQ';
var nodemailer = require("nodemailer");
const bot = new TelegramBot(botToken, { polling: true });


bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === '/nhietdo') {

        await dataModel.find({ idtelegram: chatId }).then((data) => {
            console.log(data[0].nhietdo);
            bot.sendMessage(chatId, `Nhiệt đô hiện tại : ${data[0].nhietdo}`);
        }).catch((error) => {
            bot.sendMessage(chatId, `Không tìm thấy ID chat \nHãy lấy ID chat bằng cách vào tìm kiếm nhập Get My ID\nNhấn Start và lấy ID nhập vào trang thông tin cá nhân`);
        })

    } else if (text === '/doam') {

        await dataModel.find({ idtelegram: chatId }).then((data) => {
            console.log(data[0].doam);
            bot.sendMessage(chatId, `Độ ẩm hiện tại : ${data[0].doam}`);
        }).catch((error) => {
            bot.sendMessage(chatId, `Không tìm thấy ID chat \nHãy lấy ID chat bằng cách vào tìm kiếm nhập Get My ID\nNhấn Start và lấy ID nhập vào trang thông tin cá nhân`);
        })
    } else if (text === '/luongnuoc') {

        await dataModel.find({ idtelegram: chatId }).then((data) => {
            console.log(data[0].ultrasonic);
            bot.sendMessage(chatId, `Lượng nước hiện tại : ${data[0].ultrasonic}`);
        }).catch((error) => {
            bot.sendMessage(chatId, `Không tìm thấy ID chat \nHãy lấy ID chat bằng cách vào tìm kiếm nhập Get My ID\nNhấn Start và lấy ID nhập vào trang thông tin cá nhân`);
        })
    } else if (text === '/doamdat') {

        await dataModel.find({ idtelegram: chatId }).then((data) => {
            console.log(data[0].mhsensor);
            bot.sendMessage(chatId, `Độ ẩm đất hiện tại : ${data[0].mhsensor}`);
        }).catch((error) => {
            bot.sendMessage(chatId, `Không tìm thấy ID chat \nHãy lấy ID chat bằng cách vào tìm kiếm nhập Get My ID\nNhấn Start và lấy ID nhập vào trang thông tin cá nhân`);
        })
    }
    else if (text === '/key') {
        bot.sendMessage(chatId, "Các lệnh \n Lấy dữ liệu nhiệt độ /nhietdo \n Lấy dữ liệu độ ẩm /doam \n Lấy dữ liệu lượng nước /luongnuoc \n Lấy dữ liệu độ ẩm đất /doamdat");
    } else {
        bot.sendMessage(chatId, "Nhập /key để lấy các từ khóa");
    }

    return;


});

const telegramMessage = (req, res) => {
    const { message, chatId } = req.body;
    bot.sendMessage(chatId, "Cảnh báo " + message);
    res.send({ Status: "Cảnh báo " + message });
}

const emailMessage = (req, res) => {
    const { message, email } = req.body;


    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "greenhousedatb@gmail.com",
            pass: "aegxzephireuetgv",
        },
    });

    const mailOptions = {
        from: "greenhousedatb@gmail.com",
        to: email,
        subject: "Cảnh báo",
        html: `<table style="background:#EEE;padding:40px;border:1px solid #DDD;margin:0 auto;font-family:calibri;">
        <tr>
          <td>
            <table style="background:#FFF;width:100%;border:1px solid #CCC;padding:0;margin:0;border-collapse:collapse;max-width:100%;width:550px;border-radius:10px;">
              <!-- Logo -->
              <tr>
                <td style="padding:10px 30px;text-align:center;margin:0">
                  <p>
                    <a href="#">
                                      <img src="https://greenhouse-git-dev-lapthuan0805-gmailcom.vercel.app/static/media/LOGOCHU.4c08abbc560be3a344fc.png" width="100">
                    </a>
                  </p>
                </td>
              </tr>
      
              <!-- Welcome Salutation -->
              <tr>
                <td style="padding:10px 30px;margin:0;font-size:2.5em;color: red;text-align:center;">
                  <b>Cảnh báo ${message}!</b>
                </td>
              </tr>
              <!-- User Msg -->
              <tr>
                <td style="padding:10px 30px;margin:0;background: #F36565;color: #FFFFFF;font-size:1.5em">
                 
           
                   <br>
                   <br>
                  <p>Chào bạn,</p>
                  <p>Thiết bị đã phát hiện ${message} hiện tại quá mức cho phép, xin hãy kiểm tra lại !</p>
                  <br>
               
                   <br>
                   
                  
                </td>
              </tr>
            
             
              <!-- Footer Content -->
              <tr>
                <td style="padding:10px 30px;margin:0;background-image: linear-gradient(90deg, rgb(45, 173, 45), rgb(31, 243, 11));color:#F8F8FF;border-top:1px solid #CCC;">
                  <p>Green House DATB</p>
                  <p>Cần hỗ trợ xin liên hệ :</p>
                  <p style="margin: 30px 0;text-align: center;">
                    <a style="display: inline-block;" href="https://www.facebook.com/profile.php?id=100090029812864">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Facebook_logo_36x36.svg/480px-Facebook_logo_36x36.svg.png" width="30px" height="30px">
                    </a>
                    
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.send({Status: 'error'});
        } else {
            res.send({Status: 'oke'});
        }
    });
}


module.exports = { telegramMessage, emailMessage }