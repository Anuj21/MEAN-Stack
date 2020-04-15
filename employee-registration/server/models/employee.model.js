const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
  name: {
    type: String,
  },
  position: {
    type: String,
  },
  office: {
    type: String,
  },
  salary: {
    type: Number,
  },
});

mongoose.model("Employee", employeeSchema);
