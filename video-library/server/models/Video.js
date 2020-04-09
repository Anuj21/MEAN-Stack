const mongoose = require('mongoose');

const schema = mongoose.Schema;

const video = new schema({
  title: {
    type: String,
  },
  url: {
    type: String,
  },
  description: {
    type: String,
  },
});

module.exports = Video = mongoose.model('video', video);
