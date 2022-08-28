const movieRouter = require('express').Router();

const {
  validateCreateMovie,
  validateDeleteMovie,
} = require('../middlewares/reqValidator');

const {
  getMovies,
  createMovie,
  deleatMovie,
} = require('../controllers/movie');

movieRouter.get('/movies', getMovies);
movieRouter.post('/movies/:movieId', validateCreateMovie, createMovie);
movieRouter.delete('/movies/:movieId', validateDeleteMovie, deleatMovie);

module.exports = movieRouter;
