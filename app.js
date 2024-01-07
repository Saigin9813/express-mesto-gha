const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const router = require('./routes/users');
const cardRouter = require('./routes/card');
const userRouter = require('./routes/users');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { signUp, signIn } = require('./utils/validation');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

app.use(helmet());

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

app.use('./cards', auth, cardRouter);
app.use('./user', auth, userRouter);

app.post('/signin', signIn, login);
app.post('/signup', signUp, createUser);

router.use('*', (req, res) => {
  res.status(404).send({ message: 'Мы не обрабатываем данный роут' });
});

app.listen(PORT);
