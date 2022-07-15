// Разрешённые источники запросов
const ALLOWED_CORS = [
  'http://localhost:3006',
  'http://movies.gocha.nomoredomains.xyz',
  'https://movies.gocha.nomoredomains.xyz',
  'http://api.movies.gocha.nomoredomains.xyz',
  'https://api.movies.gocha.nomoredomains.xyz',
];

// Адрес базы данных
const MONGO_DB_ADDRESS = 'mongodb://localhost:27017/moviesdb';
// Номер порта
const PORT_NUMBER = 3006;

// Сообщения ошибок
const BAD_REQUEST = 'Дпнные переданы неверно';
const INTERNAL_SERVER_ERROR = 'На сервере произошла ошибка';
const BAD_URL = 'Введённые данные не являются URL-ссылкой';
const NOT_FOUND_MOVIE_ERROR_MESSAGE = 'Фильм с таким id не найден';
const ERROR_KIND_OBJECT_ID = 'ObjectId';
const FORBIDDEN_DELETE_MOVIE_MESSAGE = 'Невозможно удалить выбранный фильм';
const NOT_FOUND_ERROR_MESSAGE = 'Запрашиваемый ресурс не найден';
const NOT_AUTH_ERROR = 'Необходима авторизация';
const NOT_AUTH_ERROR_WRONG_EMAIL_PASSWORD = 'Неправильно переданны почта или пароль';
const REQUEST_LOG_FILENAME = 'request.log';
const ERROR_LOG_FILENAME = 'error.log';

module.exports = {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  BAD_URL,
  NOT_FOUND_MOVIE_ERROR_MESSAGE,
  ERROR_KIND_OBJECT_ID,
  FORBIDDEN_DELETE_MOVIE_MESSAGE,
  NOT_FOUND_ERROR_MESSAGE,
  NOT_AUTH_ERROR,
  NOT_AUTH_ERROR_WRONG_EMAIL_PASSWORD,
  PORT_NUMBER,
  ALLOWED_CORS,
  REQUEST_LOG_FILENAME,
  ERROR_LOG_FILENAME,
  MONGO_DB_ADDRESS,
};
