const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  position: {
    type: String,
    require: true,
  },
  office: {
    type: String,
    require: true,
  },
  salary: {
    type: Number,
    require: true,
  },
});

mongoose.model('Employee', employeeSchema, 'employees');
