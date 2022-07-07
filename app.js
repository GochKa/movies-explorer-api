require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors')
const { requestLogger, errorLogger } = require('./middlewares/logger');

const router = require('./routes/index');

const { PORT = 3006 } = process.env;
const Allowed_Cors = [
  'http://localhost:3006',
  'http://movies.gocha.nomoredomains.xyz',
  'https://movies.gocha.nomoredomains.xyz',
  'http://api.movies.gocha.nomoredomains.xyz',
  'https://api.movies.gocha.nomoredomains.xyz'
]

const app = express();

app.use(cors({
  origin: Allowed_Cors,
}));

mongoose.connect('mongodb://localhost:27017/moviesDB');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(requestLogger);

app.use(helmet());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', router);

app.use(errorLogger);
app.use(errors());

app.listen(PORT, () =>{
  console.log(`Приложение запущено на порту ${PORT}`);
});