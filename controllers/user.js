const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../models/user');

const InvReqErr = require('../errors/InvalidRequest');
const ConflictErr = require('../errors/conflict');
const AuthErr = require('../errors/AuthError');

// Информация о  пользователе
const getCurrentUser = (req, res, next) => {
  const id = req.user._id;

  User.findById(id)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      next(err);
    });
};

// Обновление информации о пользователе
const updateUser = (req, res, next) => {
  const id = req.user._id;
  const newName = req.body.name;
  const newEmail = req.body.email;

  User.findOneAndUpdate(
    { _id: id },
    { name: newName, email: newEmail },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new InvReqErr('Переданы некорректные данные'));
      }
      return next(err);
    });
};

// Логин
const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      res.send({ token });
    })
    .catch((err) => {
      throw new AuthErr(err.message);
    })
    .catch(next);
};

// Создание нового пользователя
const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => res.status(200)
      .send({
        data: {
          name: user.name,
          email: user.email,
          _id: user._id,
        },
      }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new InvReqErr('не передан email или пароль'));
      }
      if (err.code === 11000) {
        return next(new ConflictErr('такой email уже занят'));
      }
      return next(err);
    });
};

module.exports = {
  getCurrentUser,
  updateUser,
  login,
  createUser,
};
