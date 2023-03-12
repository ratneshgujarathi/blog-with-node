import {RESPONSE_CONSTANTS} from '../constants/responseConstants.js';

export class SuccessResponse {
  constructor(payload, status_code = 200) {
    this.response = {
      status: 'success',
      result: payload,
    };
    this.status_code = status_code;
  }
}

export class ErrorResponse {
    constructor(args) {
      const error = {};
      const types = args.name !== 'Error'? args.name : args.message.split(':')[0];
      let error_format;
      try {
            error_format = RESPONSE_CONSTANTS[types];
            if (!error_format){
                console.log('error formating issue : '+args.message+' Type : '+typeof(args.message));
                error_format = ()=> [args.message, 400];
            }
      } catch (err) {
            console.log(err);
            error_format = RESPONSE_CONSTANTS.InternalServerError;
      } 
      error.message = error_format()[0];
  
      this.response = {
        status: 'error',
        error,
      };
      this.status_code = error_format()[1];
    }
  }


