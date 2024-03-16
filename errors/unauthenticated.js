const {StatusCodes} = require('http-status-codes');
const CustomAPIError = require('./custom-api-errors');

class UnauthenticatedError extends CustomAPIError {
    constructor(message){
     super(message);
     this.statusCodes = StatusCodes.UNATUHORIZED;   
    }
};
module.exports = UnauthenticatedError;
