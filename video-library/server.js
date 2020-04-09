const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require('./server/connection');

const api = require('./server/routes/api');

const port = 3000;

const app = express();

connectDB();

app.use(express.static(path.join(__dirname, 'dist/video-library')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/video-library/index.html'));
});

app.listen(port, function () {
  console.log('server running on localhost: ' + port);
});
