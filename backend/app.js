/* eslint-disable no-console */
const express = require('express');

// eslint-disable-next-line import/order
const auth = require('./middlewares/auth');

// eslint-disable-next-line import/order
const { login, createUser } = require('./controllers/users');

const mongoose = require('mongoose');

const { errors, celebrate, Joi } = require('celebrate');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// eslint-disable-next-line import/no-unresolved
const cors = require('./middlewares/cors');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(cors);

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^(https|http)?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/i),
  }),
}), createUser);

app.use(auth);

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use(errorLogger);

app.use('*', (req, res) => res.status(404).send({ message: 'Страница не найдена' }));

app.use(errors()); // обработчик ошибок celebrate

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
