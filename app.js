/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const users = require('./routes/users');
const cards = require('./routes/cards');
const all = require('./routes/all');

const { PORT } = process.env;

const app = express();
async function start() {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    app.listen(PORT, () => {
      console.log(`App successfully starting on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
}

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/', users);
app.use('/', cards);
app.use('/', all);

start();
