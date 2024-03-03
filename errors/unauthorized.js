const {StatusCodes} = require('http-status-codes');
const CustomAPIError = require('./custom-api-errors');

class UnauthorizedError extends CustomAPIError {
  constructor(message) {
    super(message);
    // memberikan statusCode not found
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}
module.exports = UnauthorizedError;