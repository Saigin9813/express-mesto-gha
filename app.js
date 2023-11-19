const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
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

app.listen(PORT);
