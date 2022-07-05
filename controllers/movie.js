const Movie = require('../models/movie');

const InvReqErr = require('../errors/InvalidRequest');
const ConflictErr = require('../errors/conflict');
const ForbiddenErr = require('../errors/ForbiddenError');
const NotFoundErr = require('../errors/NotFound');

// Получение фильмов
const getMovies = (req, res, next) => {
  const owner = req.user._id;

  Movie.find({owner})
  .then((cards) =>{
    res.status(200).send(cards);
  })
  .catch(() =>{
    return next(new NotFoundErr('Фильм не найден'))
  })
  .catch((err) =>{
    next(err);
  });
}

// Публикация фильма
const createMovie = (req, res, next) => {
  const owner = req.user._id;

  Movie.create({ owner, ...req.body })
  .then((movie) =>{
    res.status(201).send({data: movie});
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      return next(new InvReqErr('Переданы некорректные данные при создании карточки'));
    }
    if (err.code === 11000) {
      return next(new ConflictErr('Такой фильм уже существует'))
    }
    return next(err);
  });
}

// Удаление карточки фильма
const deleatMovie = (req, res, next) => {
  const owner = req.user._id;
  const { movieId } = req.params;

  Movie.findById(movieId)
  .then((movie) =>{
    if (!movie) {
      return next(new NotFoundErr('Фильм не найден'))
    }
    if (movie.owner.toString() !== owner) {
      return next(new ForbiddenErr('Невозможно удалить фильм другого пользователя'))
    } else {
      Movie.findByIdAndDelete(movieId)
      .then((deleatedMovie) =>{
        res.status(200).send({data: deleatedMovie});
      })
      .catch(next);
    }
  })
  .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
