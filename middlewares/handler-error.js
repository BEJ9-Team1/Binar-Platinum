const { StatusCodes } = require('http-status-codes');
const clc = require('cli-color');
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Something went wrong try again later',
  };
  if (err.name === 'ValidationError') {
    customError.message = customError.message;
    customError.statusCode = 400;
  }

  if (err.code && err.code === 11000) {
    customError.message = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = 400;
  }
  if (err.name === 'CastError') {
    customError.message = `No item found with id : ${err.value}`;
    customError.statusCode = 404;
  }
  console.log(clc.red("\n⬇") + clc.bold.italic.red(` ${err.name}:`) + " " + clc.bold.italic.cyan(`${customError.message}`));
  return res.status(customError.statusCode).json({ message: customError.message });
};

module.exports = errorHandlerMiddleware;