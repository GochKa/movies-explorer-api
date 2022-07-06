const router = require('express').Router();

const {
  validateLogin,
  validateSignup
} = require('../middlewares/reqValidator');

const {
  login,
  createUser
} = require('../controllers/user');

const auth = require('../middlewares/auth');

const userRouter = require('./user');
const movieRouter = require('./movies');

const notFoundErr = require('../errors/NotFound');

router.post('/signin', validateLogin, login);
router.post('/signup', validateSignup, createUser);

router.use(auth, userRouter);
router.use(auth, movieRouter);

router.use('/*', () =>{
  throw new notFoundErr('Страница не найдена')
});

module.exports = router;