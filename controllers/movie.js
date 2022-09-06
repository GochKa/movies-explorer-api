const Movie = require('../models/movie');

const InvReqErr = require('../errors/InvalidRequest');
const ConflictErr = require('../errors/conflict');
const ForbiddenErr = require('../errors/ForbiddenError');
const NotFoundErr = require('../errors/NotFound');

const {
  NOT_FOUND_MOVIE_ERROR_MESSAGE,
  FORBIDDEN_DELETE_MOVIE_MESSAGE,
} = require('../utils/constants');

// Получение фильмов
const getMovies = (req, res, next) => {
  const owner = req.user._id;

  Movie.find({ owner })
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((err) => next(new NotFoundErr(err.message)))
    .catch((err) => {
      next(err);
    });
};

// Публикация фильма
const createMovie = (req, res, next) => {
  const owner = req.user._id;

  Movie.create(owner, ...req.body)
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new InvReqErr(err.message));
      }
      if (err.code === 11000) {
        return next(new ConflictErr(err.message));
      }
      return next(err);
    });
};

// Удаление карточки фильма
const deleatMovie = (req, res, next) => {
  const owner = req.user._id;
  const { movieId } = req.params;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundErr(NOT_FOUND_MOVIE_ERROR_MESSAGE);
      }
      if (movie.owner.toString() !== owner) {
        throw new ForbiddenErr(FORBIDDEN_DELETE_MOVIE_MESSAGE);
      } else {
        Movie.findByIdAndDelete(movieId)
          .then((deletedMovie) => {
            res.status(200).send({ data: deletedMovie });
          })
          .catch(next);
      }
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleatMovie,
};
