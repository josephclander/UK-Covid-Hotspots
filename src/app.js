const path = require('path');
const express = require('express');
const coronaData = require('./utils/corona-data');

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/../public/index.html'));
});

app.get('/data', (req, res) => {
  coronaData(req.query.selection, (data) => {
    res.send(data);
  });
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../public/error.html'));
});
// this is how to send a static html page that doesn't use a view engine
// update later when we've got data to send

app.listen(port, () => {
  console.log('Server is up and running on port ' + port);
});
