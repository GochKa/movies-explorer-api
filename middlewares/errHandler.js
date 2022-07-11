const {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  ERROR_KIND_OBJECT_ID,
} = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  if (err.kind === ERROR_KIND_OBJECT_ID) {
    res.status(400).send({
      message: BAD_REQUEST,
    });
  } else {
    res.status(statusCode).send({
      message: statusCode === 500
        ? INTERNAL_SERVER_ERROR
        : message,
    });
  }
  if (next) {
    next();
  }
};

module.exports = errorHandler;
