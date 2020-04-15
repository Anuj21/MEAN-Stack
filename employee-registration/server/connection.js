const mongoose = require("mongoose");

const uri =
  "mongodb+srv://anuj:demomongo@ajcluster-joy2d.mongodb.net/MEANStackDB?retryWrites=true&w=majority";

const connectDB = async () => {
  await mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  console.log("dataBase has been connected...!!");
};

mongoose.Promise = global.Promise;

require("./models/employee.model");

module.exports = connectDB;
