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

router.get('/employees/:id', (req, res) => {
  console.log('Get request for single employee');

  Employee.findById(req.params.id).exec(function (err, employee) {
    if (err) {
      res.send('Error retrieving video');
    } else {
      res.json(employee);
    }
  });
});

router.put('/employee/:id', (req, res) => {
  console.log('Update employee');

  const { name, position, office, salary } = req.body;
  let updateEmployee = {};

  updateEmployee.name = name;
  updateEmployee.position = position;
  updateEmployee.office = office;
  updateEmployee.salary = salary;

  console.log(req.params.id, 'requested id');

  Employee.findByIdAndUpdate(
    req.params.id,
    {
      $set: updateEmployee,
    },
    {
      new: true,
    },
    function (err, updatedEmployee) {
      if (err) {
        res.send('Error updating employee');
      } else {
        res.json(updatedEmployee);
      }
    }
  );
});

router.delete('/employee/:id', (req, res) => {
  console.log('deleting employee');

  Employee.findByIdAndDelete(req.params.id, function (err, deletedEmployee) {
    if (err) {
      res.send('Error deleting employee');
    } else {
      res.json(deletedEmployee);
    }
  });
});

module.exports = router;
