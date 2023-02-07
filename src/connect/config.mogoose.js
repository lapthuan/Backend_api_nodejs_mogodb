const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
module.exports = mongoose.connect('mongodb+srv://lapthuan:lapthuan@cluster0.obtnrxv.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true,
  })
    .then(() => console.log('Connected!'))
    .catch(err => console.log(err.message))