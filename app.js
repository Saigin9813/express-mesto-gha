const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const router = require('./routes/users');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

app.use(helmet());

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '655a0fad6cc6252483b27b9c',
  };

  next();
});

app.use(express.json());

app.use('/', require('./routes/users'));
app.use('/', require('./routes/card'));

router.use('*', (req, res) => {
  res.status(404).send({ message: 'Мы не обрабатываем данный роут' });
});

app.listen(PORT);
