const CustomAPIError = require('./custom-api-errors');
const BadRequestError = require('./bad-request');
const NotFoundError = require('./not-found');
const UnauthorizedError = require('./unauthorized');
const UnauthenticatedError = require('./unauthenticated');

module.exports = {
  CustomAPIError,
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  UnauthenticatedError
};