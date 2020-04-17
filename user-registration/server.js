const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const connectDB = require('./server/connection');

const api = require('./server/routes/api');

const port = 4000;

const app = express();

connectDB();

app.use(express.static(path.join(__dirname, 'dist/user-registration')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', api);

// error handling middleware
app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/user-registration/index.html'));
});

app.listen(port, function () {
  console.log('server running on localhost: ' + port);
});
