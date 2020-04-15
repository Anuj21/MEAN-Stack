const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

router.get('/employees', (req, res) => {
  console.log('Get request for all employees');

  Employee.find({}).exec(function (err, employees) {
    if (err) {
      console.log('Error retrieving employees');
    } else {
      res.json(employees);
    }
  });
});

router.post('/employee', (req, res, next) => {
  console.log('inside employee register function');
  Employee.create(req.body)
    .then((employee) => {
      res.send(employee);
    })
    .catch(next);
});

module.exports = router;
