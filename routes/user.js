const userRouter = require('express').Router();

const {
  validateId,
  validateUpdateCurrentUser
} = require('../middlewares/reqValidator');

const {
  getCurrentUser,
  updateUser,
} = require('../controllers/user');

userRouter.get('/users/me', validateId, getCurrentUser);
userRouter.patch('/users/me', validateUpdateCurrentUser, updateUser);

module.exports = userRouter;