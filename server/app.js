const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const api = require('./api');
const app = express();

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(morgan('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, './public')));

app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
  console.log(`server running in port ${PORT}`);
});

module.exports = app;
