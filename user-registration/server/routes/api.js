const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');

router.post('/register', (req, res, next) => {
  console.log('inside register function');
  User.create(req.body)
    .then((user) => {
      res.send(user);
    })
    .catch(next);
});

module.exports = router;
