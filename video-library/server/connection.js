const mongoose = require('mongoose');

const uri =
  'mongodb+srv://anuj:demomongo@ajcluster-joy2d.mongodb.net/test?retryWrites=true&w=majority';

const connectDB = async () => {
  await mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  });
  console.log('dataBase has been connected...!!');
};

module.exports = connectDB;
