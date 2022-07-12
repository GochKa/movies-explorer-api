require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const router = require('./routes/index');

const {
  PORT_NUMBER,
  ALLOWED_CORS,
} = require('./utils/constants');

const rateLimiter = require('./middlewares/rateLimmiter');
const errHandler = require('./middlewares/errHandler');

const { PORT = PORT_NUMBER } = process.env;
const app = express();

app.use(cors({
  origin: ALLOWED_CORS,
}));

mongoose.connect(process.env.MONGO_DB_ADDRESS);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(helmet());

app.use(rateLimiter);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', router);

app.use(errorLogger);
app.use(errors());

app.use(errHandler);

app.listen(PORT);
