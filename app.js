/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const cards = require('./routes/cards');
const all = require('./routes/all');

const {
  PORT = 3000,
} = process.env;

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
    console.log(err);
  }
}

app.use((req, res, next) => {
  req.user = {
    _id: '5efb76e268da516e1c74caea', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use(bodyParser.json());
app.use('/', users);
app.use('/', cards);
app.use('/', all);

start();
